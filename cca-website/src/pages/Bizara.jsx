import React from 'react';
import { motion } from 'framer-motion';
import { FaCogs, FaRocket, FaLock, FaThLarge, FaPlug, FaGlobeAfrica } from 'react-icons/fa';

const Bizara = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/#contact';
    }
  };

  return (
    <div className="bizara-product-page">
      {/* --- Coming Soon Hero --- */}
      <section className="service-hero" style={{ backgroundColor: '#050505', minHeight: '100vh' }}>
        <div className="service-hero-overlay" style={{ background: 'radial-gradient(circle at center, rgba(186, 12, 47, 0.15) 0%, transparent 70%)' }}>
          <motion.div 
            className="service-hero-content"
            style={{ textAlign: 'center', margin: '0 auto' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="sub-head" style={{ color: 'var(--cca-red)', letterSpacing: '5px' }}>
                PROJECT BIZARA
            </span>
            <h1 className="title-large" style={{ color: 'white', fontSize: '4.5rem', marginBottom: '30px' }}>
                The Next Evolution <br/> of Enterprise ERP
            </h1>
            <p className="hero-p" style={{ color: 'white', opacity: 0.7, maxWidth: '700px', margin: '0 auto' }}>
              Bizara is currently being engineered as a comprehensive, modular Enterprise Resource Planning system 
              tailored for the African corporate landscape. High-speed, secure, and fully automated.
            </p>

            <div className="coming-soon-status" style={{ marginTop: '50px', display: 'flex', justifyContent: 'center', gap: '40px' }}>
                <div style={{ textAlign: 'center' }}>
                    <FaCogs style={{ fontSize: '2rem', color: 'var(--cca-red)', marginBottom: '10px' }} />
                    <p style={{ fontSize: '0.75rem', fontWeight: '900', textTransform: 'uppercase', color: 'white' }}>Architecture: 85%</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <FaLock style={{ fontSize: '2rem', color: 'var(--cca-red)', marginBottom: '10px' }} />
                    <p style={{ fontSize: '0.75rem', fontWeight: '900', textTransform: 'uppercase', color: 'white' }}>Security: 100%</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <FaRocket style={{ fontSize: '2rem', color: 'var(--cca-red)', marginBottom: '10px' }} />
                    <p style={{ fontSize: '0.75rem', fontWeight: '900', textTransform: 'uppercase', color: 'white' }}>Deployment: Q4 2026</p>
                </div>
            </div>

            <div className="cta-btns" style={{ marginTop: '60px' }}>
              <button 
                className="cta-btn-primary" 
                onClick={scrollToContact}
              >
                REQUEST EARLY ACCESS →
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- Teaser Section --- */}
      <section className="section-padding" style={{ background: '#0a0a0a', color: 'white' }}>
        <div className="container" style={{ textAlign: 'center' }}>
            <span className="sub-head">BIZARA ECOSYSTEM</span>
            <h2 className="title-medium" style={{ marginBottom: '40px' }}>One System. Total Control.</h2>
            <p style={{ maxWidth: '700px', margin: '0 auto 60px', opacity: 0.7 }}>
              Bizara eliminates fragmented workflows by unifying every department into a single digital nervous system.
            </p>
            
            

            <div className="services-grid" style={{ marginTop: '80px' }}>
                <div className="service-card" style={{ background: '#111', border: '1px solid #222', textAlign: 'left' }}>
                    <FaThLarge style={{ color: 'var(--cca-red)', fontSize: '2rem', marginBottom: '20px' }} />
                    <h3 style={{ color: 'white' }}>Modular Growth</h3>
                    <p style={{ color: 'white', opacity: 0.6 }}>Scale as you go. Add modules for Inventory, HR, or supply chain as your business expands.</p>
                </div>
                <div className="service-card" style={{ background: '#111', border: '1px solid #222', textAlign: 'left' }}>
                    <FaPlug style={{ color: 'var(--cca-red)', fontSize: '2rem', marginBottom: '20px' }} />
                    <h3 style={{ color: 'white' }}>API-First Logic</h3>
                    <p style={{ color: 'white', opacity: 0.6 }}>Deep-level integration with local tax systems and regional banking APIs for seamless compliance.</p>
                </div>
                <div className="service-card" style={{ background: '#111', border: '1px solid #222', textAlign: 'left' }}>
                    <FaGlobeAfrica style={{ color: 'var(--cca-red)', fontSize: '2rem', marginBottom: '20px' }} />
                    <h3 style={{ color: 'white' }}>Built for the Region</h3>
                    <p style={{ color: 'white', opacity: 0.6 }}>Designed to solve the unique operational challenges of businesses within the East African market.</p>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Bizara;