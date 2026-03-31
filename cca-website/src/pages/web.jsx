import React from 'react';
import { motion } from 'framer-motion';
import { FaLaptopCode, FaMobileAlt, FaShoppingCart, FaTools, FaSearchDollar } from 'react-icons/fa';

// Assets
import pFlowImg from '../assets/Rency.png'; 
import ccaImg from '../assets/Pro-Trans Ltd.png';
import webHeroImg from '../assets/Web-hero.png'; 

const Web = () => {
  const webServices = [
    {
      icon: <FaLaptopCode />,
      title: "Custom Websites",
      desc: "Tailored designs for your brand, built from scratch with high-performance code."
    },
    {
      icon: <FaMobileAlt />,
      title: "Responsive Design",
      desc: "Mobile-first architecture ensuring your site works perfectly on desktop, tablet, and mobile."
    },
    {
      icon: <FaShoppingCart />,
      title: "E-commerce Development",
      desc: "Robust online stores with secure checkout and inventory management that convert visitors."
    },
    {
      icon: <FaSearchDollar />,
      title: "SEO-Friendly Design",
      desc: "Strategic structure and meta-optimization to help your business rank higher on search results."
    },
    {
      icon: <FaTools />,
      title: "Maintenance & Support",
      desc: "Reliable updates and 24/7 monitoring to keep your website secure and up-to-date."
    }
  ];

  // Function for smooth scroll to contact section
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If contact isn't on this page (since it's in Home.jsx), redirect home to contact
      window.location.href = '/#contact';
    }
  };

  return (
    <div className="web-service-page">
      {/* --- Service Hero --- */}
      <section className="service-hero" style={{ backgroundImage: `url(${webHeroImg})` }}>
        <div className="service-hero-overlay">
          <motion.div 
            className="service-hero-content"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="sub-head" style={{ color: 'var(--cca-red)' }}>SERVICES / WEB DEVELOPMENT</span>
            <h1 className="title-large" style={{ color: 'white', marginBottom: '20px' }}>
                Digital Architecture <br/> for Global Brands
            </h1>
            <p className="hero-p" style={{ color: 'white', opacity: 0.9, maxWidth: '600px' }}>
              Modern, responsive websites built to grow your business.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- Why Your Business Needs a Website --- */}
      <section className="section-padding">
        <div className="overview-grid">
          <div>
            <span className="sub-head">THE NECESSITY</span>
            <h2 className="title-medium">Why Your Business <br/> Needs a Website?</h2>
          </div>
          <div className="overview-text">
            <p>In the modern economy, your website is your 24/7 digital headquarters. It's the first point of trust for your customers. A professional website doesn't just display information—it establishes authority, automates sales, and expands your market reach far beyond your physical location.</p>
            <p style={{ marginTop: '20px' }}>Without a high-performance web presence, you are invisible to the 80% of consumers who research a brand online before making a purchase.</p>
          </div>
        </div>
      </section>

      {/* --- What We Offer --- */}
      <section className="section-padding values-bg">
        <span className="sub-head">WHAT WE OFFER</span>
        <h2 className="title-large">Web Solutions</h2>
        <div className="services-grid">
          {webServices.map((service, i) => (
            <div key={i} className="service-card">
              <div className="service-icon-red">{service.icon}</div>
              <h3>{service.title}</h3>
              <p style={{ opacity: 0.7 }}>{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- Portfolio --- */}
      <section className="section-padding">
        <span className="sub-head">PORTFOLIO</span>
        <h2 className="title-large">Past Work</h2>
        <div className="work-item">
          <div className="work-info">
            <h3>Kusini Pro Trans Ltd – Corporate Logistics Website</h3>
            <p style={{opacity: 0.6}}>A professional logistics company website designed to showcase services and improve client engagement.</p>
          </div>
          <div className="work-img-container">
            <img src={ccaImg} alt="CCA Global" />
          </div>
        </div>
        <div className="work-item">
          <div className="work-info">
            <h3>Rency Insurance Group</h3>
            <p style={{opacity: 0.6}}>A complete website redesign for Rency Insurance Group aimed at improving digital presence and user engagement. We delivered a modern, responsive interface with optimized navigation, making it easier for clients to explore insurance services and interact with the brand online.</p>
          </div>
          <div className="work-img-container">
            <img src={pFlowImg} alt="Property Flow" />
          </div>
        </div>
      </section>

      {/* --- CTA Section --- */}
      <section className="section-padding cta-section">
        <div className="cta-box">
          <h2>Ready to Build?</h2>
          <p>Let's start engineering your success with a world-class digital presence.</p>
          <div className="cta-btns">
            <button 
              className="cta-btn-primary" 
              onClick={scrollToContact}
            >
              START PROJECT →
            </button>
            <button 
              className="cta-btn-secondary"
              onClick={() => window.location.href = 'mailto:CodeyCraftAfrica@gmail.com?subject=Inquiry for Web Development Quote'}
            >
              GET A QUOTE
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Web;