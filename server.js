import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import pool from './db.js'; // pastikan path ini benar

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('.')); // serve static files

// Endpoint test koneksi database Neon
app.get('/api/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()'); 
    res.status(200).json({
      success: true,
      message: 'Koneksi database berhasil!',
      time: result.rows[0].now,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Koneksi database gagal!',
      error: err.message,
    });
  }
});

// --- API Endpoints for Stories ---

// GET all stories
app.get('/api/stories', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM stories ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching stories');
    }
});

// GET a single story by ID
app.get('/api/stories/:id', async (req, res) => {
    const storyId = req.params.id;
    try {
        const result = await pool.query('SELECT * FROM stories WHERE id = $1', [storyId]);
        if (result.rows.length === 0) {
            return res.status(404).send('Story not found');
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching story');
    }
});

// POST a new story
app.post('/api/stories', async (req, res) => {
    const { title, content, category } = req.body;

    // Basic validation
    if (!title || !content || !category) {
        return res.status(400).send('Title, content, and category are required');
    }

    // Server-side validation (adjust as needed for PostgreSQL)
    if (title.length > 255) {
        return res.status(400).send('Title cannot exceed 255 characters.');
    }
    if (category.length > 50) {
        return res.status(400).send('Category cannot exceed 50 characters.');
    }

    try {
        const result = await pool.query(
            'INSERT INTO stories (title, content, category) VALUES ($1, $2, $3) RETURNING *',
            [title, content, category]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating story');
    }
});

// DELETE a story by ID (with transaction)
app.delete('/api/stories/:id', async (req, res) => {
    const storyId = req.params.id;
    const client = await pool.connect(); // Get a client from the pool for transaction
    try {
        await client.query('BEGIN'); // Start transaction

        // Delete comments associated with the story
        await client.query('DELETE FROM comments WHERE story_id = $1', [storyId]);

        // Delete the story itself
        const result = await client.query('DELETE FROM stories WHERE id = $1 RETURNING id', [storyId]);

        // Check if the story was actually found and deleted
        if (result.rows.length === 0) {
            await client.query('ROLLBACK'); // Roll back if not found
            return res.status(404).send('Story not found');
        }

        await client.query('COMMIT'); // Commit transaction
        res.status(204).send(); // Success, no content

    } catch (err) {
        await client.query('ROLLBACK'); // Roll back on error
        console.error('Transaction Error:', err);
        res.status(500).send('Error deleting story');
    } finally {
        client.release(); // Release the client back to the pool
    }
});


// --- API Endpoints for Comments ---

// GET all comments for a story
app.get('/api/stories/:id/comments', async (req, res) => {
    const storyId = req.params.id;
    try {
        const result = await pool.query('SELECT * FROM comments WHERE story_id = $1 ORDER BY created_at ASC', [storyId]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching comments');
    }
});

// POST a new comment for a story
app.post('/api/stories/:id/comments', async (req, res) => {
    const storyId = req.params.id;
    const { name, text } = req.body;

    // Basic validation
    if (!name || !text) {
        return res.status(400).send('Name and text are required');
    }

    // Server-side validation
    if (name.length > 100) {
        return res.status(400).send('Name cannot exceed 100 characters.');
    }

    try {
        const result = await pool.query(
            'INSERT INTO comments (story_id, name, text) VALUES ($1, $2, $3) RETURNING *',
            [storyId, name, text]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating comment');
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`);
});