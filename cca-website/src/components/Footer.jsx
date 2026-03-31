import React from 'react';
import logo from '../assets/CCA Official Logo.png';
import { FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <img src={logo} alt="CCA" className="footer-logo-img" />
          <p style={{opacity: 0.5, maxWidth: '350px'}}>Software development agency and SaaS lab engineering the future of African commerce.</p>
          
          <div className="social-icons">
            <a href="https://instagram.com/codey_craft_africa" target="_blank" rel="noreferrer"><FaInstagram /></a>
            <a href="https://linkedin.com/company/codey-craft-africa" target="_blank" rel="noreferrer"><FaLinkedin /></a>
            <a href="mailto:CodeyCraftAfrica@gmail.com"><FaEnvelope /></a>
          </div>
        </div>

        <div>
          <h4 className="footer-head">DIRECTORY</h4>
          <a href="/about" className="footer-link">About Us</a>
          <a href="/careers" className="footer-link">Careers</a>
          <a href="/blog" className="footer-link">Blog</a>
          <a href="#contact" className="footer-link">Contact</a>
        </div>

        <div>
          <h4 className="footer-head">CONNECT</h4>
          <p className="footer-link">Nairobi, Kenya</p>
          <a href="mailto:CodeyCraftAfrica@gmail.com" className="footer-link">CodeyCraftAfrica@gmail.com</a>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© 2026 CODEY CRAFT AFRICA. SYSTEMS ENGINEERED BY CCA LABS.</p>
        <p>LOCATED IN NAIROBI, KENYA</p>
      </div>
    </footer>
  );
};

export default Footer;