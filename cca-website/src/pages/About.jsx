import React from 'react';
import { motion } from 'framer-motion';
import founderImg from '../assets/Founder.png'; 

const About = () => {
  const values = [
    { 
      title: "Architectural Integrity", 
      desc: "We don't just 'code'—we architect. Every system is built for 10x scale from day one." 
    },
    { 
      title: "African Innovation", 
      desc: "We build global-standard software designed specifically for the unique nuances of the African market." 
    },
    { 
      title: "Radical Transparency", 
      desc: "From blueprinting to deployment, our clients have full visibility into our logic and progress." 
    },
    { 
      title: "Performance First", 
      desc: "If it's not ultra-fast, it's not finished. We obsess over milliseconds and optimization." 
    }
  ];

  const differentiators = [
    { title: "Customer-Centric Approach", desc: "We design solutions tailored to your business goals, ensuring every project delivers real impact" },
    { title: "Innovation at Every Step", desc: "We use modern tools and techniques to solve real business problems efficiently." },
    { title: "Proven Results", desc: "From websites to SaaS platforms, our solutions generate traffic, leads, and improved business operations." }
  ];

  return (
    <div className="about-page">
      {/* --- About Hero --- */}
      <section className="about-hero section-padding">
        <motion.div 
          className="about-hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="sub-head">WHO WE ARE</span>
          <h1 className="title-large">Engineering the <br/> Digital Frontier</h1>
          <p className="hero-p">
            Codey Craft Africa (CCA) is a premier software development agency and SaaS lab based in Nairobi. 
            We specialize in transforming complex business bottlenecks into automated, high-performance systems.
          </p>
        </motion.div>
      </section>

      {/* --- Company Overview Section --- */}
      <section className="section-padding overview-section">
        <div className="overview-container">
          <span className="sub-head">OVERVIEW</span>
          <h2 className="title-medium">Beyond Just Development</h2>
          <p className="overview-text">
            Codey Craft Africa was established to redefine how software is built in the region. We are not just a 
            vendor; we are an engineering partner. We operate as a hybrid 
            Software Agency and SaaS Laboratory, where we experiment with, build, and scale proprietary 
            solutions that solve real-world African problems.
          </p>
          <p className="overview-text">
            Our expertise spans full-stack development, enterprise ERP architecture, and digital automation. 
            Whether we are building a bespoke system for a client or launching a new product under the CCA 
            brand, our commitment to speed, security, and scalability remains absolute.
          </p>
        </div>
      </section>

      {/* --- What Makes Us Different Section --- */}
      <section className="section-padding different-section">
        <div className="different-header">
          <span className="sub-head" style={{ color: 'white' }}>DIFFERENTIATION</span>
          <h2 className="title-large" style={{ color: 'white' }}>Why Choose CCA?</h2>
        </div>
        <div className="different-grid">
          {differentiators.map((item, i) => (
            <div key={i} className="different-card">
              <div className="diff-icon">/0{i+1}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- Core Values --- */}
      <section className="section-padding values-bg">
        <span className="sub-head">THE CCA PHILOSOPHY</span>
        <h2 className="title-large">Core Values</h2>
        <div className="services-grid">
          {values.map((v, i) => (
            <div key={i} className="service-card">
              <h3>{v.title}</h3>
              <p style={{ opacity: 0.7 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- Leadership Section: Founder & CEO --- */}
      <section className="section-padding">
        <div className="founder-item">
          <div className="work-info">
            <span className="sub-head">LEADERSHIP</span>
            <h3 style={{ fontSize: '3rem', marginBottom: '10px' }}>The Founder</h3>
            <h4 style={{ color: 'var(--cca-red)', fontWeight: '700', marginBottom: '25px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Founder & Chief Executive Officer
            </h4>
            <p style={{ fontSize: '1.15rem', opacity: 0.7, lineHeight: '1.8' }}>
              A visionary tech entrepreneur and software engineer dedicated to building high-performance 
              digital products. Under his leadership, Codey Craft Africa has evolved into a specialized 
              SaaS lab, focusing on architectural excellence and the development of proprietary ERP systems 
              like Property Flow.
            </p>
            
            <div className="stats-row" style={{ marginTop: '40px', display: 'flex', gap: '50px' }}>
              <div>
                <h3 style={{ color: 'var(--cca-red)', fontSize: '2.5rem', fontFamily: 'Montserrat' }}>30+</h3>
                <p style={{ fontWeight: 'bold', fontSize: '0.8rem', textTransform: 'uppercase' }}>Digital Products</p>
              </div>
              <div>
                <h3 style={{ color: 'var(--cca-red)', fontSize: '2.5rem', fontFamily: 'Montserrat' }}>99%</h3>
                <p style={{ fontWeight: 'bold', fontSize: '0.8rem', textTransform: 'uppercase' }}>Uptime Logic</p>
              </div>
            </div>
          </div>

          <div className="founder-img-wrapper">
            <img src={founderImg} alt="Founder and CEO of CCA" className="founder-portrait" />
            <div className="founder-accent-box"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;