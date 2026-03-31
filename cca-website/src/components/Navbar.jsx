import React, { useState } from 'react';
import logo from '../assets/Logo - White Canvas Version.png';
import { FaBars, FaTimes } from 'react-icons/fa';

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="nav-container">
      <img 
        src={logo} 
        alt="Codey Craft Africa" 
        className="nav-logo" 
        onClick={() => window.location.href='/'}
      />

      <div className={`nav-links ${open ? 'active' : ''}`}>
        <div className="nav-item"><a href="/about">About Us</a></div>

        <div className="nav-item">
          <a href="#services">Services ▾</a>
          <div className="dropdown-menu">
            <a href="/Web">Web Development</a>
            <a href="/Saas">Saas Development</a>
            <a href="/DigitalGrowth">Digital Growth Optimization</a>
            <a href="/BusinessAutomation">Business Automation</a>
          </div>
        </div>

        <div className="nav-item">
          <a href="#products">Products ▾</a>
          <div className="dropdown-menu">
            <a href="/PropertyFlow">Property Flow</a>
            <a href="/Bizara">Bizara ERP</a>
          </div>
        </div>

        <div className="nav-item"><a href="/careers">Careers</a></div>
        <div className="nav-item"><a href="/Blog">Blog</a></div>
        <div className="nav-item"><a href="/contact" style={{color: 'var(--cca-red)'}}>Contacts</a></div>
      </div>

      <div className="menu-icon" onClick={() => setOpen(!open)}>
        {open ? <FaTimes /> : <FaBars />}
      </div>
    </nav>
  );
};

export default Navbar;