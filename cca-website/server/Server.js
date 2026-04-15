const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const { Pool } = require('pg'); 
require('dotenv').config();

const app = express();

/* =========================
   CORS CONFIGURATION
========================= */
// Updated to trust your live domain and local development
app.use(cors({
  origin: ['https://www.codeycraft.africa', 'https://codeycraft.africa', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

/* =========================
   DATABASE CONNECTION (NEON)
========================= */
const db = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false 
  }
});

// Improved Connection Check for Postgres
db.connect()
  .then(client => {
    console.log('Connected to Codey Craft Cloud DB!');
    client.release(); // Release the client back to the pool
  })
  .catch(err => {
    console.error('Cloud DB Connection Error:', err.message);
  });

/* =========================
   EMAIL ENDPOINT
========================= */
app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: email,
      to: 'CodeyCraftAfrica@gmail.com',
      subject: `Project Inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Email failed to send' });
  }
});

/* =========================
   JOBS DATABASE (CLOUD POSTGRES)
========================= */

// GET ALL JOBS
app.get('/api/jobs', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM jobs ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

// CREATE JOB
app.post('/api/jobs', async (req, res) => {
  const { role, type, description, requirements, skills, questions } = req.body;

  const sql = `
    INSERT INTO jobs (role, type, description, requirements, skills, questions)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *`;
  
  const values = [
    role, 
    type, 
    description, 
    JSON.stringify(requirements), 
    JSON.stringify(skills), 
    JSON.stringify(questions)
  ];

  try {
    const result = await db.query(sql, values);
    res.json({ success: true, job: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save job' });
  }
});

// DELETE JOB
app.delete('/api/jobs/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await db.query('DELETE FROM jobs WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete job' });
  }
});

// DYNAMIC PORT FOR RENDER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));