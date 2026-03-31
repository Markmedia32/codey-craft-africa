import React from 'react';
import { motion } from 'framer-motion';
import { FaCloud, FaShieldAlt, FaChartLine, FaCogs, FaDatabase, FaLayerGroup } from 'react-icons/fa';

// Assets
import saasHeroImg from '../assets/Hero-SEO.png'; // Recommended: A 3D abstract blue/dark render
import pFlowImg from '../assets/PF1.png'; 

const SaaS = () => {
  const saasFeatures = [
    {
      icon: <FaLayerGroup />,
      title: "Multi-Tenant Architecture",
      desc: "Architecting secure, isolated data environments for unlimited users on a single platform."
    },
    {
      icon: <FaCloud />,
      title: "Cloud-Native Scaling",
      desc: "Built on AWS/Azure logic to ensure your software handles 100 or 1,000,000 users without lag."
    },
    {
      icon: <FaShieldAlt />,
      title: "Enterprise Security",
      desc: "Implementing JWT authentication, end-to-end encryption, and rigorous data protection protocols."
    },
    {
      icon: <FaDatabase />,
      title: "Proprietary Database Design",
      desc: "Custom-tuned SQL/NoSQL schemas optimized for high-speed retrieval and complex reporting."
    },
    {
      icon: <FaCogs />,
      title: "API Ecosystems",
      desc: "Developing robust REST/GraphQL APIs for third-party integrations and mobile synchronization."
    },
    {
      icon: <FaChartLine />,
      title: "Subscription Logic",
      desc: "Seamlessly integrated billing cycles, usage tracking, and automated payment reconciliation."
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
    <div className="saas-service-page">
      {/* --- SaaS Hero --- */}
      <section className="service-hero" style={{ backgroundImage: `url(${saasHeroImg})` }}>
        <div className="service-hero-overlay">
          <motion.div 
            className="service-hero-content"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="sub-head" style={{ color: 'var(--cca-red)' }}>SERVICES / SAAS DEVELOPMENT</span>
            <h1 className="title-large" style={{ color: 'white', marginBottom: '20px' }}>
                Engineering Cloud <br/> Powerhouses
            </h1>
            <p className="hero-p" style={{ color: 'white', opacity: 0.9, maxWidth: '600px' }}>
              We transform complex ideas into scalable, subscription-based software products. At CCA, we don't just build apps; we architect digital businesses.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- Why SaaS Overview --- */}
      <section className="section-padding">
        <div className="overview-grid">
          <div>
            <span className="sub-head">THE PRODUCT LAB</span>
            <h2 className="title-medium">Why Build a SaaS <br/> with CCA?</h2>
          </div>
          <div className="overview-text">
            <p>Building a Software-as-a-Service product requires more than just code. It requires an understanding of scalability, security, and long-term maintenance. As a SaaS Lab, we use the same frameworks for our clients that we use for our internal products like Property Flow.</p>
            <p style={{ marginTop: '20px' }}>We focus on high-performance backends using Node.js and Express, paired with ultra-responsive React frontends, to deliver a product that is global-ready from day one.</p>
          </div>
        </div>
      </section>

      {/* --- SaaS Capabilities Grid --- */}
      <section className="section-padding values-bg">
        <span className="sub-head">CAPABILITIES</span>
        <h2 className="title-large">Product Engineering</h2>
        <div className="services-grid">
          {saasFeatures.map((feature, i) => (
            <div key={i} className="service-card">
              <div className="service-icon-red">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p style={{ opacity: 0.7 }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- SaaS Showcase (Property Flow) --- */}
      <section className="section-padding">
        <span className="sub-head">CASE STUDY</span>
        <h2 className="title-large">SaaS in Action</h2>
        <div className="work-item">
          <div className="work-info">
            <h3>Property Flow</h3>
            <p style={{opacity: 0.6, marginBottom: '20px'}}>A prime example of our SaaS engineering. Property Flow manages complex real estate portfolios with automated rent tracking, tenant portals, and financial reconciliation.</p>
            <ul style={{ listStyle: 'none', opacity: 0.8, fontSize: '0.9rem' }}>
              <li style={{ marginBottom: '10px' }}>✓ Real-time Data Sync</li>
              <li style={{ marginBottom: '10px' }}>✓ Automated Billing Engine</li>
              <li style={{ marginBottom: '10px' }}>✓ Multi-User Role Access</li>
            </ul>
          </div>
          <div className="work-img-container">
            <img src={pFlowImg} alt="SaaS Project" />
          </div>
        </div>
      </section>

      {/* --- CTA Section --- */}
      <section className="section-padding cta-section">
        <div className="cta-box">
          <h2>Ready to disrupt <br/> your industry?</h2>
          <p>Let's architect your SaaS product with a focus on scale and profitability.</p>
          <div className="cta-btns">
            <button 
              className="cta-btn-primary" 
              onClick={scrollToContact}
            >
              LAUNCH PRODUCT →
            </button>
            <button 
              className="cta-btn-secondary"
              onClick={() => window.location.href = 'mailto:CodeyCraftAfrica@gmail.com?subject=SaaS Project Inquiry'}
            >
              GET A QUOTE
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SaaS;