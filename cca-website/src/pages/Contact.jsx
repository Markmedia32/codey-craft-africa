import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';

const Contact = () => {
  const [formStatus, setFormStatus] = useState('idle'); // 'idle', 'sending', 'sent'

  // ✅ NEW: form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Web Development',
    message: ''
  });

  // ✅ NEW: handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // ✅ UPDATED: submit to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');

    try {
      const response = await fetch('http://localhost:5000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: `
Project Type: ${formData.projectType}

Message:
${formData.message}
          `
        })
      });

      const data = await response.json();

      if (data.success) {
        setFormStatus('sent');
        setFormData({
          name: '',
          email: '',
          projectType: 'Web Development',
          message: ''
        });
      } else {
        alert('Failed to send message');
        setFormStatus('idle');
      }

    } catch (error) {
      console.error(error);
      alert('Error sending message');
      setFormStatus('idle');
    }
  };

  return (
    <div className="contact-page" style={{ paddingTop: '120px', background: '#fff' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Header Section */}
        <header style={{ marginBottom: '80px', textAlign: 'center' }}>
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="sub-head" 
            style={{ color: 'var(--cca-red)', display: 'block', marginBottom: '15px' }}
          >
            GET IN TOUCH
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="title-large"
          >
            Let’s Build the Future <br /> of African Tech.
          </motion.h1>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '80px', marginBottom: '100px' }}>
          
          {/* Left: Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 style={{ fontSize: '1.8rem', marginBottom: '30px' }}>Our Office</h3>
            
            <div style={infoItem}>
              <div style={iconCircle}><FaMapMarkerAlt /></div>
              <div>
                <h4 style={{ margin: 0 }}>Visit Us</h4>
                <p style={{ opacity: 0.6 }}>Nairobi, Kenya</p>
              </div>
            </div>

            <div style={infoItem}>
              <div style={iconCircle}><FaEnvelope /></div>
              <div>
                <h4 style={{ margin: 0 }}>Email Us</h4>
                <p style={{ opacity: 0.6 }}>CodeyCraftAfrica@gmail.com</p>
              </div>
            </div>

            <div style={infoItem}>
              <div style={iconCircle}><FaPhoneAlt /></div>
              <div>
                <h4 style={{ margin: 0 }}>Call Us</h4>
                <p style={{ opacity: 0.6 }}>+254 795 875 370</p>
              </div>
            </div>

            <div style={{ marginTop: '50px' }}>
              <h4 style={{ marginBottom: '20px' }}>Connect with us</h4>
              <div style={{ display: 'flex', gap: '20px' }}>
                <a href="#" style={socialIcon}><FaLinkedin /></a>
                <a href="#" style={socialIcon}><FaTwitter /></a>
                <a href="#" style={socialIcon}><FaGithub /></a>
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            style={{ background: '#fcfcfc', padding: '50px', border: '1px solid #eee' }}
          >
            {formStatus === 'sent' ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <h2 style={{ color: 'var(--cca-red)', marginBottom: '10px' }}>Message Sent!</h2>
                <p>We'll get back to you within 24 hours.</p>
                <button 
                  className="cta-btn-secondary" 
                  style={{ marginTop: '20px' }}
                  onClick={() => setFormStatus('idle')}
                >
                  SEND ANOTHER
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <label style={labelStyle}>Full Name</label>
                    <input 
                      required 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      style={inputStyle} 
                      placeholder="John Doe" 
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <label style={labelStyle}>Email</label>
                    <input 
                      required 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      style={inputStyle} 
                      placeholder="john@example.com" 
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                  <label style={labelStyle}>Project Type</label>
                  <select 
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    style={inputStyle}
                  >
                    <option>Web Development</option>
                    <option>Mobile App (Android/iOS)</option>
                    <option>Property Management System</option>
                    <option>UI/UX Design</option>
                    <option>Other</option>
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '30px' }}>
                  <label style={labelStyle}>Your Message</label>
                  <textarea 
                    required 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    style={{ ...inputStyle, height: '150px' }} 
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>

                <button 
                  disabled={formStatus === 'sending'}
                  type="submit" 
                  className="cta-btn-primary" 
                  style={{ width: '100%', padding: '20px' }}
                >
                  {formStatus === 'sending' ? 'TRANSMITTING...' : 'SEND MESSAGE'}
                </button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Map Placeholder */}
        <div style={{ width: '100%', height: '450px', background: '#eee', marginBottom: '100px', border: '1px solid #ddd' }}>
          <iframe 
            title="Nairobi Office"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.162440167!2d36.817223!3d-1.286389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d5f50f4d3b%3A0x6b1626f6345d1d64!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2ske!4v1700000000000!5m2!1sen!2ske" 
            width="100%" 
            height="100%" 
            style={{ border: 0, filter: 'grayscale(100%) invert(90%)' }} 
            allowFullScreen="" 
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

// Styles
const infoItem = { display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' };
const iconCircle = { 
  width: '50px', height: '50px', borderRadius: '50%', background: '#fff1f1', 
  color: 'var(--cca-red)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' 
};
const socialIcon = { fontSize: '1.5rem', color: '#333', transition: '0.3s' };
const labelStyle = { fontWeight: '900', fontSize: '0.8rem', letterSpacing: '1px' };
const inputStyle = { 
  padding: '15px', border: '1px solid #ddd', background: '#fff', fontSize: '1rem', outlineColor: 'var(--cca-red)' 
};

export default Contact;