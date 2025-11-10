require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const dbConfig = require('./config');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // Serve static files like HTML, CSS, JS

// Create a MySQL connection pool
const pool = mysql.createPool({
    ...dbConfig,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// --- API Endpoints for Stories ---

// GET all stories
app.get('/api/stories', (req, res) => {
    pool.query('SELECT * FROM stories ORDER BY id DESC', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error fetching stories');
        }
        res.json(results);
    });
});

// GET a single story by ID
app.get('/api/stories/:id', (req, res) => {
    const storyId = req.params.id;
    pool.query('SELECT * FROM stories WHERE id = ?', [storyId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error fetching story');
        }
        if (results.length === 0) {
            return res.status(404).send('Story not found');
        }
        res.json(results[0]);
    });
});

// POST a new story
app.post('/api/stories', (req, res) => {
    const { title, content, category } = req.body;

    // Basic validation
    if (!title || !content || !category) {
        return res.status(400).send('Title, content, and category are required');
    }

    // Server-side validation
    if (title.length > 255) {
        return res.status(400).send('Title cannot exceed 255 characters.');
    }
    if (category.length > 50) {
        return res.status(400).send('Category cannot exceed 50 characters.');
    }

    const newStory = { title, content, category };
    pool.query('INSERT INTO stories SET ?', newStory, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error creating story');
        }
        res.status(201).json({ id: result.insertId, ...newStory });
    });
});

// DELETE a story by ID (with transaction)
app.delete('/api/stories/:id', async (req, res) => {
    const storyId = req.params.id;
    let connection;
    try {
        // Get a connection from the pool
        connection = await pool.promise().getConnection();
        
        // Start a transaction
        await connection.beginTransaction();

        // Delete comments associated with the story
        await connection.query('DELETE FROM comments WHERE story_id = ?', [storyId]);

        // Delete the story itself
        const [result] = await connection.query('DELETE FROM stories WHERE id = ?', [storyId]);

        // Check if the story was actually found and deleted
        if (result.affectedRows === 0) {
            // If not found, roll back and send a 404 error
            await connection.rollback();
            return res.status(404).send('Story not found');
        }

        // If all queries were successful, commit the transaction
        await connection.commit();
        
        res.status(204).send(); // Success, no content

    } catch (err) {
        console.error('Transaction Error:', err);
        // If there's an error, roll back the transaction
        if (connection) {
            await connection.rollback();
        }
        res.status(500).send('Error deleting story');
    } finally {
        // Finally, release the connection back to the pool
        if (connection) {
            connection.release();
        }
    }
});


// --- API Endpoints for Comments ---

// GET all comments for a story
app.get('/api/stories/:id/comments', (req, res) => {
    const storyId = req.params.id;
    pool.query('SELECT * FROM comments WHERE story_id = ? ORDER BY created_at ASC', [storyId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error fetching comments');
        }
        res.json(results);
    });
});

// POST a new comment for a story
app.post('/api/stories/:id/comments', (req, res) => {
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

    const newComment = { story_id: storyId, name, text };
    pool.query('INSERT INTO comments SET ?', newComment, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error creating comment');
        }
        res.status(201).json({ id: result.insertId, ...newComment });
    });
});


// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
