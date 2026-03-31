import React from 'react';
import { motion } from 'framer-motion';
import { FaChartBar, FaUserCheck, FaChartLine, FaBullseye, FaShareAlt, FaRocket } from 'react-icons/fa';

// Assets
import growthHeroImg from '../assets/hero4-img.png'; 
import ccaImg from '../assets/Rency.png';

const DigitalGrowth = () => {
  const growthServices = [
    {
      icon: <FaChartBar />,
      title: "Conversion Rate Optimization",
      desc: "Analyzing user behavior to turn more of your existing traffic into paying customers."
    },
    {
      icon: <FaChartLine />, 
      title: "Performance Marketing",
      desc: "Data-driven ad campaigns (Google/Meta) focused on high ROI and low customer acquisition costs."
    },
    {
      icon: <FaUserCheck />,
      title: "User Retention Strategy",
      desc: "Implementing systems to keep your users engaged and reduce churn within your SaaS products."
    },
    {
      icon: <FaBullseye />,
      title: "Search Engine Authority",
      desc: "Going beyond basic SEO to dominate your industry's search rankings and build long-term organic trust."
    },
    {
      icon: <FaShareAlt />,
      title: "Content & Social Velocity",
      desc: "Crafting digital assets and narratives that build brand authority across all major platforms."
    },
    {
      icon: <FaRocket />,
      title: "Growth Hacking",
      desc: "Rapid experimentation across marketing channels and product development to identify the most efficient ways to grow."
    }
  ];

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If contact section is not on this page, redirect to home with hash
      window.location.href = '/#contact';
    }
  };

  return (
    <div className="growth-service-page">
      {/* --- Service Hero --- */}
      <section className="service-hero" style={{ backgroundImage: `url(${growthHeroImg})` }}>
        <div className="service-hero-overlay">
          <motion.div 
            className="service-hero-content"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="sub-head" style={{ color: 'var(--cca-red)' }}>SERVICES / DIGITAL GROWTH</span>
            <h1 className="title-large" style={{ color: 'white', marginBottom: '20px' }}>
                Accelerating Your <br/> Market Dominance
            </h1>
            <p className="hero-p" style={{ color: 'white', opacity: 0.9, maxWidth: '600px' }}>
              We combine data science with creative engineering to scale your digital presence. At CCA, growth isn't a guess—it's a calculated outcome.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- The Growth Philosophy --- */}
      <section className="section-padding">
        <div className="overview-grid">
          <div>
            <span className="sub-head">DATA-DRIVEN SCALE</span>
            <h2 className="title-medium">Why Growth <br/> Optimization?</h2>
          </div>
          <div className="overview-text">
            <p>A world-class product is only effective if it's being used. Digital Growth Optimization is the bridge between a finished system and a market leader. We analyze the entire user journey—from the first click to the final transaction—to identify and remove friction.</p>
            <p style={{ marginTop: '20px' }}>By leveraging advanced analytics and behavioral psychology, we ensure your investment in technology translates directly into revenue and market share.</p>
          </div>
        </div>
      </section>

      {/* --- Growth Capabilities Grid --- */}
      <section className="section-padding values-bg">
        <span className="sub-head">THE GROWTH STACK</span>
        <h2 className="title-large">Strategic Optimization</h2>
        <div className="services-grid">
          {growthServices.map((service, i) => (
            <div key={i} className="service-card">
              <div className="service-icon-red">{service.icon}</div>
              <h3>{service.title}</h3>
              <p style={{ opacity: 0.7 }}>{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- Showcase Section --- */}
      <section className="section-padding">
        <span className="sub-head">SUCCESS METRIC</span>
        <h2 className="title-large">Proof of Concept</h2>
        <div className="work-item">
          <div className="work-info">
            <h3>Rency Insurance Group</h3>
            <p style={{opacity: 0.6, marginBottom: '20px'}}>
              Applying our growth framework, we helped redesign Rency Insurance Group brand with a focus on high-engagement social assets and strategic funneling, resulting in a rapid expansion of our client pipeline.
            </p>
            <ul style={{ listStyle: 'none', opacity: 0.8, fontSize: '0.9rem' }}>
              <li style={{ marginBottom: '10px' }}>✓ Targeted Audience Acquisition</li>
              <li style={{ marginBottom: '10px' }}>✓ Multi-Channel Brand Authority</li>
              <li style={{ marginBottom: '10px' }}>✓ High-Conversion Landing Architecture</li>
            </ul>
          </div>
          <div className="work-img-container">
            <img src={ccaImg} alt="Growth Project" />
          </div>
        </div>
      </section>

      {/* --- CTA Section --- */}
      <section className="section-padding cta-section">
        <div className="cta-box">
          <h2>Ready to scale <br/> your impact?</h2>
          <p>Let's optimize your digital presence for maximum reach and conversion.</p>
          <div className="cta-btns">
            <button 
              className="cta-btn-primary" 
              onClick={scrollToContact}
            >
              SCALE NOW →
            </button>
            <button 
              className="cta-btn-secondary"
              onClick={() => window.location.href = 'mailto:CodeyCraftAfrica@gmail.com?subject=Digital Growth Consultation'}
            >
              BOOK AUDIT
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DigitalGrowth;