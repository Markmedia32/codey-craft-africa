// Version 3.1 - Multer + Cloudinary Fix (FINAL FIX)

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const { Pool } = require('pg');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
require('dotenv').config();

const app = express();

/* =========================
   CORS + BODY LIMIT
========================= */
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

/* =========================
   MULTER CONFIG
========================= */
const upload = multer({ storage: multer.memoryStorage() });

/* =========================
   CLOUDINARY CONFIG
========================= */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

/* =========================
   DATABASE (NEON)
========================= */
const db = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false }
});

db.connect()
  .then(client => {
    console.log('Connected to DB!');
    client.release();
  })
  .catch(err => console.error('DB Error:', err.message));

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
   JOBS (UNCHANGED)
========================= */
app.get('/api/jobs', async (req, res) => {
  const result = await db.query('SELECT * FROM jobs ORDER BY created_at DESC');
  res.json(result.rows);
});

app.get('/api/jobs/:id', async (req, res) => {
  const result = await db.query('SELECT * FROM jobs WHERE id=$1', [req.params.id]);
  res.json(result.rows[0]);
});

app.post('/api/jobs', async (req, res) => {
  const { role, type, description, requirements, skills, questions } = req.body;

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
});

/* =========================
   🔥 UPDATED DELETE JOB (CASCADE DELETE ADDED)
========================= */
app.delete('/api/jobs/:id', async (req, res) => {

  const jobId = req.params.id;

  try {

    // 1. DELETE JOB
    await db.query('DELETE FROM jobs WHERE id=$1', [jobId]);

    // 2. 🔥 DELETE ALL APPLICATIONS LINKED TO THIS JOB
    await db.query('DELETE FROM applications WHERE job_id=$1', [jobId]);

    res.json({
      success: true,
      message: "Job and related applications deleted successfully"
    });

  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ error: "Failed to delete job" });
  }
});

/* =========================
   EMAIL ALERT
========================= */
const sendApplicantAlert = async (applicant) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: 'CodeyCraftAfrica@gmail.com',
    subject: `🚨 New Application`,
    text: `
Name: ${applicant.name}
Email: ${applicant.email}
Role: ${applicant.job_id}

CV: ${applicant.cv_url}
Cover Letter: ${applicant.cover_url}
    `
  });
};

/* =========================
   APPLICATIONS (FIXED WITH MULTER)
========================= */
app.post(
  '/api/applications',
  upload.fields([
    { name: 'cv', maxCount: 1 },
    { name: 'cover', maxCount: 1 }
  ]),
  async (req, res) => {

    try {
      const {
        name,
        email,
        education,
        experience,
        responses,
        jobId
      } = req.body;

      const cvFile = req.files?.cv?.[0];
      const coverFile = req.files?.cover?.[0];

      if (!cvFile || !coverFile) {
        return res.status(400).json({ error: "Missing files" });
      }

      // Upload CV to Cloudinary
      const cvUpload = await cloudinary.uploader.upload(
        `data:application/pdf;base64,${cvFile.buffer.toString('base64')}`,
        {
          folder: 'cca/cv',
          resource_type: 'raw'
        }
      );

      // Upload Cover Letter to Cloudinary
      const coverUpload = await cloudinary.uploader.upload(
        `data:application/pdf;base64,${coverFile.buffer.toString('base64')}`,
        {
          folder: 'cca/cover',
          resource_type: 'raw'
        }
      );

      // Save to Neon DB
      const result = await db.query(
        `INSERT INTO applications
        (name,email,education,experience,cv_url,cv_name,cover_url,cover_name,responses,job_id)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
        RETURNING *`,
        [
          name,
          email,
          education,
          experience,
          cvUpload.secure_url,
          cvFile.originalname,
          coverUpload.secure_url,
          coverFile.originalname,
          JSON.stringify(responses || []),
          jobId
        ]
      );

      const saved = result.rows[0];

      await sendApplicantAlert(saved);

      res.json({ success: true });

    } catch (err) {
      console.error("APPLICATION ERROR:", err);
      res.status(500).json({ error: "Upload failed" });
    }
  }
);

/* =========================
   GET APPLICATIONS
========================= */
app.get('/api/applications', async (req, res) => {
  const result = await db.query('SELECT * FROM applications ORDER BY submitted_at DESC');
  res.json(result.rows);
});

/* =========================
   SERVER
========================= */
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));