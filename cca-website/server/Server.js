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
  ssl: { rejectUnauthorized: false }
});

db.connect()
  .then(client => {
    console.log('Connected to Codey Craft Cloud DB!');
    client.release();
  })
  .catch(err => console.error('Cloud DB Connection Error:', err.message));

/* =========================
   EMAIL SETUP
========================= */
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

/* =========================
   EMAIL ENDPOINT
========================= */
app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await transporter.sendMail({
      from: email,
      to: 'CodeyCraftAfrica@gmail.com',
      subject: `Project Inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

/* =========================
   JOBS
========================= */

app.get('/api/jobs', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM jobs ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

app.get('/api/jobs/:id', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM jobs WHERE id=$1', [req.params.id]);

    if (!result.rows.length) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch job' });
  }
});

app.post('/api/jobs', async (req, res) => {
  const { role, type, description, requirements, skills, questions } = req.body;

  try {
    const result = await db.query(
      `INSERT INTO jobs (role, type, description, requirements, skills, questions)
       VALUES ($1,$2,$3,$4,$5,$6)
       RETURNING *`,
      [
        role,
        type,
        description,
        JSON.stringify(requirements),
        JSON.stringify(skills),
        JSON.stringify(questions)
      ]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save job' });
  }
});

app.delete('/api/jobs/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM jobs WHERE id=$1', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete job' });
  }
});

/* =========================
   APPLICATION ALERT EMAIL
========================= */
const sendApplicantAlert = async (applicant) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'CodeyCraftAfrica@gmail.com',
      subject: `🚨 New Application: ${applicant.job_title}`,
      text: `
New Application Received:

Name: ${applicant.name}
Email: ${applicant.email}
Role: ${applicant.job_title}
      `
    });
  } catch (err) {
    console.error(err);
  }
};

/* =========================
   APPLICATIONS (POSTGRES)
========================= */

app.post('/api/applications', async (req, res) => {
  const {
    name,
    email,
    education,
    experience,
    cvData,
    cvName,
    coverData,
    coverName,
    responses,
    jobId,
    jobTitle
  } = req.body;

  try {
    const result = await db.query(
      `INSERT INTO applications 
      (name,email,education,experience,cvdata,cvname,coverdata,covername,responses,job_id,job_title)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
      RETURNING *`,
      [
        name,
        email,
        education,
        experience,
        cvData,
        cvName,
        coverData,
        coverName,
        JSON.stringify(responses),
        jobId,
        jobTitle
      ]
    );

    const saved = result.rows[0];

    await sendApplicantAlert(saved);

    res.json({ success: true, application: saved });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save application' });
  }
});

app.get('/api/applications', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM applications ORDER BY submitted_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

/* =========================
   SERVER
========================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));