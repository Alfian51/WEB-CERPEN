import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import pool from './lib/db.js'; // pastikan path ke db.js benar

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('.')); // serve static files (index.html, dll)

// Endpoint test koneksi database dengan debug lengkap
app.get('/api/test-db', async (req, res) => {
  try {
    // Test koneksi ke PostgreSQL Neon
    const result = await pool.query('SELECT NOW()');
    res.status(200).json({
      success: true,
      message: 'Database connected successfully!',
      time: result.rows[0].now,
      envCheck: {
        POSTGRES_URL_exists: !!process.env.POSTGRES_URL,
        port: port
      }
    });
  } catch (err) {
    console.error('Database connection error:', err);
    res.status(500).json({
      success: false,
      message: 'Koneksi database gagal!',
      error: err.message,
      stack: err.stack
    });
  }
});

// Optional: endpoint root untuk cek server hidup
app.get('/', (req, res) => {
  res.send('Server running! Akses /api/test-db untuk cek koneksi database.');
});

app.listen(port, () => console.log(`Server running on port ${port}`));
