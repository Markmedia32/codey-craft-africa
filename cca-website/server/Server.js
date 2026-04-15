// Version 2.0 - Universal CORS Fix
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const { Pool } = require('pg'); 
require('dotenv').config();

const app = express();

/* =========================
   UNIVERSAL CORS CONFIGURATION
========================= */
app.use(cors()); 
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

db.connect()
  .then(client => {
    console.log('Connected to Codey Craft Cloud DB!');
    client.release();
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

app.get('/api/jobs', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM jobs ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});


// ✅ ADDED: SINGLE JOB FETCH (THIS FIXES YOUR "LOADING ROLE DETAILS")
app.get('/api/jobs/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const result = await db.query('SELECT * FROM jobs WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching single job:", err);
    res.status(500).json({ error: 'Failed to fetch job' });
  }
});

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

// Use the port provided by Render or default to 5000 for local testing
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));