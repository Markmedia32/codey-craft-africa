// ============================================================
// contact.js — Secure Node.js API route for contact form
// Place in: /api/contact.js  (or your Express routes folder)
// Install: npm install express-rate-limit nodemailer
// ============================================================

// If using Express (server.js), import and use this route:
// const contactRoute = require('./api/contact');
// app.use('/api', contactRoute);

const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');

// ── Rate limiter: max 5 submissions per IP per 15 minutes ──
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many messages sent. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// ── Input sanitizer (no external library needed) ──
function sanitize(str = '') {
  return String(str)
    .trim()
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .slice(0, 2000); // max length per field
}

// ── Email transporter (Gmail example) ──
// Set these in your Vercel environment variables:
//   GMAIL_USER = codeycraftafrica@gmail.com
//   GMAIL_APP_PASSWORD = (16-char App Password from Google)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

router.post('/contact', contactLimiter, async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // ── Validate required fields ──
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return res.status(400).json({ error: 'Invalid email address.' });
    }

    // ── Sanitize all inputs ──
    const cleanName    = sanitize(name);
    const cleanEmail   = sanitize(email);
    const cleanPhone   = sanitize(phone);
    const cleanMessage = sanitize(message);

    // ── Send email to CCA inbox ──
    await transporter.sendMail({
      from: `"CCA Website" <${process.env.GMAIL_USER}>`,
      to: 'codeycraftafrica@gmail.com',
      replyTo: cleanEmail,
      subject: `New enquiry from ${cleanName} — CCA Website`,
      html: `
        <h2>New Contact Form Submission</h2>
        <table>
          <tr><td><strong>Name:</strong></td><td>${cleanName}</td></tr>
          <tr><td><strong>Email:</strong></td><td>${cleanEmail}</td></tr>
          <tr><td><strong>Phone:</strong></td><td>${cleanPhone || 'Not provided'}</td></tr>
          <tr><td><strong>Message:</strong></td><td>${cleanMessage}</td></tr>
        </table>
      `,
    });

    // ── Auto-reply to the sender ──
    await transporter.sendMail({
      from: `"Codey Craft Africa" <${process.env.GMAIL_USER}>`,
      to: cleanEmail,
      subject: 'We received your message — Codey Craft Africa',
      html: `
        <p>Hi ${cleanName},</p>
        <p>Thank you for reaching out to <strong>Codey Craft Africa</strong>. We have received your message and will get back to you within 24 hours.</p>
        <p>In the meantime, feel free to reach us directly:</p>
        <ul>
          <li>Phone: +254 795 875 370</li>
          <li>Email: codeycraftafrica@gmail.com</li>
        </ul>
        <p><em>We Build. You Grow.</em></p>
        <p>— The CCA Team</p>
      `,
    });

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error('Contact form error:', err);
    return res.status(500).json({ error: 'Failed to send message. Please try again.' });
  }
});

module.exports = router;

// ============================================================
// VERCEL ENV VARIABLES to set in your Vercel dashboard:
// Settings → Environment Variables
//
//   GMAIL_USER            = codeycraftafrica@gmail.com
//   GMAIL_APP_PASSWORD    = your-16-char-google-app-password
//
// To get a Gmail App Password:
//   1. Go to myaccount.google.com/security
//   2. Enable 2-Step Verification
//   3. Go to App Passwords → create one for "Mail"
//   4. Copy the 16-character password into Vercel
// ============================================================