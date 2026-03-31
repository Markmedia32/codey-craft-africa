import React from 'react';
import { motion } from 'framer-motion';
import { FaBuilding, FaUserShield, FaMoneyBillWave, FaFileInvoiceDollar, FaChartLine, FaMobileAlt } from 'react-icons/fa';

// Assets
import pFlowHeroImg from '../assets/Logo - PropertyFlow.png'; // High-res dashboard mockup or architectural render
import pFlowDashboard from '../assets/PropertyFlow.png'; 

const PropertyFlow = () => {
  const features = [
    {
      icon: <FaFileInvoiceDollar />,
      title: "Automated Billing",
      desc: "Generate and send professional invoices to all tenants via email or SMS with a single click."
    },
    {
      icon: <FaMoneyBillWave />,
      title: "Payment Reconciliation",
      desc: "Direct integration with M-Pesa and bank APIs to automatically match payments to tenant accounts."
    },
    {
      icon: <FaUserShield />,
      title: "Tenant Management",
      desc: "Centralized database for tenant profiles, lease agreements, and communication history."
    },
    {
      icon: <FaBuilding />,
      title: "Unit & Asset Tracking",
      desc: "Real-time visibility into occupancy rates, maintenance status, and unit-specific ROI."
    },
    {
      icon: <FaChartLine />,
      title: "Financial Analytics",
      desc: "Comprehensive reports on rent collection, expenses, and overall portfolio performance."
    },
    {
      icon: <FaMobileAlt />,
      title: "Mobile Optimization",
      desc: "Manage your properties on the go with a fully responsive dashboard built for speed."
    }
  ];

  return (
    <div className="product-page">
      {/* --- Product Hero --- */}
      <section className="service-hero" style={{ backgroundImage: `url(${pFlowHeroImg})` }}>
        <div className="service-hero-overlay">
          <motion.div 
            className="service-hero-content"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="sub-head" style={{ color: 'var(--cca-red)' }}>PRODUCT / PROPERTY FLOW</span>
            <h1 className="title-large" style={{ color: 'white', marginBottom: '20px' }}>
                Property Flow
            </h1>
            <p className="hero-p" style={{ color: 'white', opacity: 0.9, maxWidth: '600px' }}>
              Property Flow is a cloud-based platform designed to help real estate businesses manage properties, tenants, payments, and operations from a single system
            </p>
            <button className="cta-btn-primary" style={{ marginTop: '30px' }} onClick={() => window.location.href = '#demo'}>
                REQUEST A DEMO
            </button>
          </motion.div>
        </div>
      </section>

      {/* --- Problem/Solution Overview --- */}
      <section className="section-padding">
        <div className="overview-grid">
          <div>
            <span className="sub-head">THE SOLUTION</span>
            <h2 className="title-medium">Efficiency for Every <br/> Square Foot</h2>
          </div>
          <div className="overview-text">
            <p>Property managers often get bogged down by manual tracking in spreadsheets, leading to missed payments and accounting errors. Property Flow replaces chaos with a streamlined, automated engine.</p>
            <p style={{ marginTop: '20px' }}>By centralizing your operations, you reduce delinquency rates by up to 30% and eliminate 90% of the manual labor involved in monthly rent cycles.</p>
          </div>
        </div>
      </section>

      {/* --- Feature Grid --- */}
      <section className="section-padding values-bg">
        <span className="sub-head">CORE MODULES</span>
        <h2 className="title-large">System Features</h2>
        <div className="services-grid">
          {features.map((feature, i) => (
            <div key={i} className="service-card">
              <div className="service-icon-red">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p style={{ opacity: 0.7 }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- System Logic Diagram --- */}
      <section className="section-padding" style={{ textAlign: 'center' }}>
        <span className="sub-head">SYSTEM ARCHITECTURE</span>
        <h2 className="title-medium">How It Works</h2>
        <p style={{ maxWidth: '700px', margin: '0 auto 50px', opacity: 0.7 }}>
          Property Flow operates on a 3-tier architecture ensuring high-speed data delivery and bank-grade security for your financial records.
        </p>
        
      </section>

      {/* --- Visual Showcase --- */}
      <section className="section-padding">
        <div className="work-item">
          <div className="work-info">
            <span className="sub-head">DASHBOARD</span>
            <h3>Intuitive Interface</h3>
            <p style={{opacity: 0.6, marginTop: '20px'}}>
              Designed for ease of use, the Property Flow dashboard gives you an instant bird's-eye view of your entire portfolio—from total collected rent to pending maintenance requests.
            </p>
          </div>
          <div className="work-img-container">
            <img src={pFlowDashboard} alt="Property Flow Dashboard Preview" style={{ border: '1px solid var(--border)' }} />
          </div>
        </div>
      </section>

      {/* --- Product CTA --- */}
      <section id="demo" className="section-padding cta-section">
        <div className="cta-box">
          <h2 style={{ fontSize: '3.5rem' }}>Automate Your <br/> Portfolio Today.</h2>
          <p>Join the property managers who have traded spreadsheets for Property Flow.</p>
          <div className="cta-btns">
            <button 
              className="cta-btn-primary" 
              onClick={() => window.location.href = 'mailto:CodeyCraftAfrica@gmail.com?subject=Property Flow Demo Request'}
            >
              REQUEST LIVE DEMO →
            </button>
            <button 
              className="cta-btn-secondary"
              onClick={() => window.open('https://propertyflow.co.ke', '_blank')}
            >
              VISIT WEBSITE
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PropertyFlow;