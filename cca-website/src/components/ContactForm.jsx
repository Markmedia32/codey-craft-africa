import { useState, useRef } from 'react';

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    honeypot: '', // hidden field — bots fill this, humans don't
  });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errors, setErrors] = useState({});
  const submitTime = useRef(Date.now());

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required';
    if (!form.message.trim() || form.message.length < 10) e.message = 'Message must be at least 10 characters';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ── Honeypot check — if filled, it's a bot ──
    if (form.honeypot) return;

    // ── Timing check — bots submit instantly ──
    const elapsed = Date.now() - submitTime.current;
    if (elapsed < 2000) return;

    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setStatus('loading');
    setErrors({});

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          message: form.message.trim(),
        }),
      });

      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', phone: '', message: '', honeypot: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate style={{ maxWidth: 540 }}>

      {/* ── Honeypot field — hidden from humans, visible to bots ── */}
      <div style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
        <label htmlFor="website">Website (leave blank)</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={form.honeypot}
          onChange={(e) => setForm({ ...form, honeypot: e.target.value })}
        />
      </div>

      {/* ── Name ── */}
      <div style={{ marginBottom: 16 }}>
        <label htmlFor="name" style={{ display: 'block', marginBottom: 4, fontSize: 14 }}>
          Full Name *
        </label>
        <input
          type="text"
          id="name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Jane Mwangi"
          style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: errors.name ? '1px solid #e24b4a' : '1px solid #ccc', fontSize: 14 }}
        />
        {errors.name && <p style={{ color: '#e24b4a', fontSize: 12, marginTop: 4 }}>{errors.name}</p>}
      </div>

      {/* ── Email ── */}
      <div style={{ marginBottom: 16 }}>
        <label htmlFor="email" style={{ display: 'block', marginBottom: 4, fontSize: 14 }}>
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="jane@company.co.ke"
          style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: errors.email ? '1px solid #e24b4a' : '1px solid #ccc', fontSize: 14 }}
        />
        {errors.email && <p style={{ color: '#e24b4a', fontSize: 12, marginTop: 4 }}>{errors.email}</p>}
      </div>

      {/* ── Phone ── */}
      <div style={{ marginBottom: 16 }}>
        <label htmlFor="phone" style={{ display: 'block', marginBottom: 4, fontSize: 14 }}>
          Phone Number (optional)
        </label>
        <input
          type="tel"
          id="phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="+254 7XX XXX XXX"
          style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #ccc', fontSize: 14 }}
        />
      </div>

      {/* ── Message ── */}
      <div style={{ marginBottom: 20 }}>
        <label htmlFor="message" style={{ display: 'block', marginBottom: 4, fontSize: 14 }}>
          Message *
        </label>
        <textarea
          id="message"
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Tell us about your project..."
          style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: errors.message ? '1px solid #e24b4a' : '1px solid #ccc', fontSize: 14, resize: 'vertical' }}
        />
        {errors.message && <p style={{ color: '#e24b4a', fontSize: 12, marginTop: 4 }}>{errors.message}</p>}
      </div>

      {/* ── Submit ── */}
      <button
        type="submit"
        disabled={status === 'loading'}
        style={{
          background: '#E85D24',
          color: '#fff',
          border: 'none',
          padding: '12px 28px',
          borderRadius: 6,
          fontSize: 15,
          fontWeight: 500,
          cursor: status === 'loading' ? 'not-allowed' : 'pointer',
          opacity: status === 'loading' ? 0.7 : 1,
        }}
      >
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>

      {/* ── Feedback messages ── */}
      {status === 'success' && (
        <p style={{ color: '#1d9e75', marginTop: 16, fontSize: 14 }}>
          ✓ Message sent! We'll get back to you within 24 hours.
        </p>
      )}
      {status === 'error' && (
        <p style={{ color: '#e24b4a', marginTop: 16, fontSize: 14 }}>
          Something went wrong. Please try again or email us at codeycraftafrica@gmail.com
        </p>
      )}
    </form>
  );
}