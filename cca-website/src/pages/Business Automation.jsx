import React from 'react';
import { motion } from 'framer-motion';
import { FaSync, FaRobot, FaNetworkWired, FaDatabase, FaMicrochip, FaChartPie } from 'react-icons/fa';

// Assets
import autoHeroImg from '../assets/Automation-hero.png'; // Recommended: A 3D render of gears or digital nodes
import pFlowImg from '../assets/PF1.png'; 

const BusinessAutomation = () => {
  const automationFeatures = [
    {
      icon: <FaRobot />,
      title: "Process Auto-Pilot",
      desc: "Eliminating repetitive manual tasks by creating intelligent triggers and automated digital workflows."
    },
    {
      icon: <FaSync />,
      title: "System Integration",
      desc: "Connecting your existing tools (CRM, ERP, Accounting) to ensure data flows seamlessly without human entry."
    },
    {
      icon: <FaDatabase />,
      title: "Centralized Data Hubs",
      desc: "Building a single source of truth for your business data to eliminate silos and inconsistencies."
    },
    {
      icon: <FaNetworkWired />,
      title: "Custom Middleware",
      desc: "Developing specialized bridge software that allows legacy systems to communicate with modern cloud apps."
    },
    {
      icon: <FaChartPie />,
      title: "Automated Reporting",
      desc: "Real-time dashboards that pull data automatically, providing instant insights into your KPIs."
    },
    {
      icon: <FaMicrochip />,
      title: "AI Implementation",
      desc: "Integrating machine learning models to predict trends, categorize data, and assist in decision making."
    }
  ];

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/#contact';
    }
  };

  return (
    <div className="automation-service-page">
      {/* --- Service Hero --- */}
      <section className="service-hero" style={{ backgroundImage: `url(${autoHeroImg})` }}>
        <div className="service-hero-overlay">
          <motion.div 
            className="service-hero-content"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="sub-head" style={{ color: 'var(--cca-red)' }}>SERVICES / BUSINESS AUTOMATION</span>
            <h1 className="title-large" style={{ color: 'white', marginBottom: '20px' }}>
                Delete Manual <br/> Bottlenecks
            </h1>
            <p className="hero-p" style={{ color: 'white', opacity: 0.9, maxWidth: '600px' }}>
              We engineer intelligent systems that do the heavy lifting for you. Scale your operations without increasing your headcount.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- The Automation Philosophy --- */}
      <section className="section-padding">
        <div className="overview-grid">
          <div>
            <span className="sub-head">OPERATIONAL EXCELLENCE</span>
            <h2 className="title-medium">Why Automate <br/> Your Business?</h2>
          </div>
          <div className="overview-text">
            <p>Most businesses lose up to 30% of their revenue to operational inefficiencies. Manual data entry, lost emails, and disconnected spreadsheets aren't just annoying—they are a tax on your growth. Automation turns these liabilities into assets.</p>
            <p style={{ marginTop: '20px' }}>By architecting custom automation flows, we allow your team to focus on high-value strategy while our code handles the routine execution. From Nairobi to the world, we build the engines that power modern enterprise.</p>
          </div>
        </div>
      </section>

      {/* --- Automation Logic Visualizer (Optional placeholder for instructions) --- */}
      <div style={{ textAlign: 'center', padding: '0 8%' }}>
        
      </div>

      {/* --- Capabilities Grid --- */}
      <section className="section-padding values-bg">
        <span className="sub-head">SOLUTIONS</span>
        <h2 className="title-large">Automation Stack</h2>
        <div className="services-grid">
          {automationFeatures.map((feature, i) => (
            <div key={i} className="service-card">
              <div className="service-icon-red">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p style={{ opacity: 0.7 }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- Case Study (Property Flow) --- */}
      <section className="section-padding">
        <span className="sub-head">FLAGSHIP AUTOMATION</span>
        <h2 className="title-large">Property Flow ERP</h2>
        <div className="work-item">
          <div className="work-info">
            <h3>Automated Real Estate</h3>
            <p style={{opacity: 0.6, marginBottom: '20px'}}>
              Property Flow is the ultimate case study in business automation. It automates the entire tenant lifecycle—from invoice generation to payment reconciliation—eliminating the need for manual bookkeeping.
            </p>
            <ul style={{ listStyle: 'none', opacity: 0.8, fontSize: '0.9rem' }}>
              <li style={{ marginBottom: '10px' }}>✓ Auto-Generated Invoices</li>
              <li style={{ marginBottom: '10px' }}>✓ M-Pesa Payment Auto-Matching</li>
              <li style={{ marginBottom: '10px' }}>✓ Instant Delinquency Alerts</li>
            </ul>
          </div>
          <div className="work-img-container">
            <img src={pFlowImg} alt="Business Automation Case Study" />
          </div>
        </div>
      </section>

      {/* --- CTA Section --- */}
      <section className="section-padding cta-section">
        <div className="cta-box">
          <h2>Stop Doing <br/> Busy Work.</h2>
          <p>Let's sit down and map out your business workflows for total automation.</p>
          <div className="cta-btns">
            <button 
              className="cta-btn-primary" 
              onClick={scrollToContact}
            >
              AUTOMATE NOW →
            </button>
            <button 
              className="cta-btn-secondary"
              onClick={() => window.location.href = 'mailto:CodeyCraftAfrica@gmail.com?subject=Automation Strategy Consultation'}
            >
              FREE AUDIT
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BusinessAutomation;