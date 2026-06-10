import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';
import SEO from '../components/SEO';
import ContactForm from '../components/ContactForm';

const Contact = () => {
  return (
    <>
      <SEO page="contact" />
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
              Let's Build the Future <br /> of African Tech.
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

            {/* Right: Contact Form — now a standalone component */}
            <ContactForm />

          </div>

          {/* Map */}
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
    </>
  );
};

// Styles
const infoItem = { display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' };
const iconCircle = {
  width: '50px', height: '50px', borderRadius: '50%', background: '#fff1f1',
  color: 'var(--cca-red)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem'
};
const socialIcon = { fontSize: '1.5rem', color: '#333', transition: '0.3s' };

export default Contact;