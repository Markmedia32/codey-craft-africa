// Version 3.0 - Production Recruitment Fix
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   DATABASE
========================= */
const db = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false }
});

db.connect()
  .then(c => {
    console.log('Connected to Codey Craft DB');
    c.release();
  })
  .catch(err => console.error(err));

/* =========================
   EMAIL
========================= */
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

/* =========================
   JOBS
========================= */
app.get('/api/jobs', async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM jobs ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'jobs fetch failed' });
  }
});

app.get('/api/jobs/:id', async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM jobs WHERE id=$1',
      [req.params.id]
    );

    if (!result.rows.length)
      return res.status(404).json({ error: 'not found' });

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'job fetch failed' });
  }
});

app.post('/api/jobs', async (req, res) => {
  const { role, type, description, requirements, skills, questions } = req.body;

  try {
    const result = await db.query(
      `INSERT INTO jobs (role,type,description,requirements,skills,questions)
       VALUES ($1,$2,$3,$4,$5,$6)
       RETURNING *`,
      [
        role,
        type,
        description,
        JSON.stringify(requirements || []),
        JSON.stringify(skills || []),
        JSON.stringify(questions || [])
      ]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'job save failed' });
  }
});

app.delete('/api/jobs/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM jobs WHERE id=$1', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'delete failed' });
  }
});

/* =========================
   EMAIL ALERT
========================= */
const sendAlert = async (applicant) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'CodeyCraftAfrica@gmail.com',
      subject: `New Application: ${applicant.job_title}`,
      text: `
New Application Received

Name: ${applicant.name}
Email: ${applicant.email}
Role: ${applicant.job_title}
`
    });
  } catch (err) {
    console.error("Email alert failed", err);
  }
};

/* =========================
   APPLICATIONS (POSTGRES FIXED)
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
        JSON.stringify(responses || []),
        jobId,
        jobTitle
      ]
    );

    const saved = result.rows[0];

    await sendAlert(saved);

    res.json({ success: true, application: saved });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'application save failed' });
  }
});

app.get('/api/applications', async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM applications ORDER BY submitted_at DESC'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'fetch failed' });
  }
});

/* =========================
   SERVER
========================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on ${PORT}`)
);