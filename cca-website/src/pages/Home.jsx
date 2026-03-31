import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { Navbar } from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

// IMPORT ASSETS
import pFlowImg from '../assets/PF1.png'; 
import ccaImg from '../assets/Pro-Trans Ltd.png';

const Home = () => {
  const navigate = useNavigate();

  // STATE FOR FORM
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const processSteps = [
    {
      title: "Discovery",
      desc: "We start by understanding your business, goals, and requirements to ensure the solution solves the right problem."
    },
    {
      title: "Planning",
      desc: "We design the system architecture, user experience, and development roadmap before writing any code."
    },
    {
      title: "Development",
      desc: "Our team builds the product using modern technologies while ensuring performance, scalability, and security."
    },
    {
      title: "Deployment & Support",
      desc: "We deploy the solution, monitor performance, and provide ongoing updates and support as your business grows."
    }
  ];

  // HANDLE FORM INPUTS
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // HANDLE FORM SUBMISSION
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/send-email', { // replace with live backend URL when deployed
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        alert('Project brief sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert('Failed to send message. Please try again.');
      }

    } catch (error) {
      console.error(error);
      alert('Error sending message. Please try again.');
    }
  };

  return (
    <div className="site-wrapper">
      <Navbar />

      {/* HERO SECTION */}
      <section className="hero">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>WE ENGINEER</h1>
          <h1 className="typewriter-span">
            <Typewriter 
              words={['SAAS PRODUCTS', 'ERP SYSTEMS', 'CUSTOM WEB', 'DMS / POS']} 
              loop={0} cursor cursorStyle="_" typeSpeed={70} deleteSpeed={50} delaySpeed={1500}
            />
          </h1>
          <p className="hero-p">
            Codey Craft Africa is an elite Software Development Agency and SaaS Lab architecting 
            high-performance automated systems for the modern digital frontier.
          </p>
        </motion.div>
      </section>

      {/* WHAT WE DO */}
      <section id="services" className="section-padding">
        <h2 className="title-large">What We Do</h2>
        <div className="services-grid">
          <div className="service-card">
            <h3>Web Development</h3>
            <p>We design and develop modern, responsive websites that help businesses establish a strong online presence and attract customers</p>
          </div>
          <div className="service-card">
            <h3>SaaS Development</h3>
            <p>We build scalable Software-as-a-Service platforms that help businesses automate processes and manage operations efficiently.</p>
          </div>
          <div className="service-card">
            <h3>Digital Growth Optimization</h3>
            <p>We help organizations improve their existing websites and platforms by optimizing performance, search visibility, and user experience to generate more traffic and qualified leads.</p>
          </div>
          <div className="service-card">
            <h3>Business Automation</h3>
            <p>We create digital tools and systems that automate repetitive tasks and improve efficiency across organizations.</p>
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="section-padding process-section">
        <h2 className="title-large" style={{color: 'white'}}>How We Work</h2>
        <div className="process-grid">
          {processSteps.map((step, i) => (
            <div key={i} className="process-card">
              <div className="process-num">0{i+1}</div>
              <h3 style={{ marginBottom: '15px' }}>{step.title}</h3>
              <p style={{opacity: 0.6, lineHeight: '1.8'}}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SELECTED WORK */}
      <section id="work" className="section-padding">
        <h2 className="title-large">Selected Work</h2>
        
        <div className="work-item">
          <div className="work-info">
            <h3>Property Flow</h3>
            <p style={{opacity: 0.6}}>A property management platform that helps real estate companies manage listings, tenants, and rental payments efficiently.</p>
          </div>
          <div className="work-img-container">
            <img src={pFlowImg} alt="Property Flow" />
          </div>
        </div>

        <div className="work-item">
          <div className="work-info">
            <h3>Kusini Pro Trans Ltd – Corporate Logistics Website</h3>
            <p style={{opacity: 0.6}}>A professional logistics company website designed to showcase services and improve client engagement.</p>
          </div>
          <div className="work-img-container">
            <img src={ccaImg} alt="CCA Agency" />
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="section-padding pricing-section">
        <h2 className="title-large" style={{textAlign: 'center'}}>Web Pricing</h2>
        <div className="pricing-grid">
          <PriceCard 
            tier="Starter" 
            price="25,000" 
            features={['5 Pages', 'Basic SEO', 'Responsive UI', '1 Month Support']} 
            onClick={() => navigate('/contact')}
          />
          <PriceCard 
            tier="Business" 
            price="60,000" 
            featured={true} 
            features={['10 Pages', 'CMS Integration', 'Speed Optimization', '3 Months Support']} 
            onClick={() => navigate('/contact')}
          />
          <PriceCard 
            tier="E-Commerce" 
            price="130,000" 
            features={['Unlimited Products', 'Payment Gateway', 'Inventory Sync', '6 Months Support']} 
            onClick={() => navigate('/contact')}
          />
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="section-padding">
        <h2 className="title-large">Tell us about <br /> your project</h2>
        <form className="form-grid" onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Full Name" 
            className="input-underlined"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input 
            type="email" 
            placeholder="Email Address" 
            className="input-underlined"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea 
            placeholder="Detailed Project Description (Features, Timeline, Budget)..." 
            className="input-underlined" 
            style={{gridColumn: 'span 2'}} 
            rows="5"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button 
            type="submit" 
            className="submit-btn" 
            style={{gridColumn: 'span 2'}}
          >
            SUBMIT PROJECT BRIEF
          </button>
        </form>
      </section>
    </div>
  );
};

const PriceCard = ({ tier, price, features, featured, onClick }) => (
  <div className={`price-card ${featured ? 'featured' : ''}`}>
    {featured && <div className="price-badge">MOST POPULAR</div>}
    <h4>{tier}</h4>
    <div className="price-val">KES {price}</div>
    <ul className="price-list">
      {features.map((f, i) => <li key={i}>{f}</li>)}
    </ul>
    <button 
      onClick={onClick}
      className={`price-btn ${featured ? 'btn-red' : 'btn-black'}`}
    >
      Enquire Now
    </button>
  </div>
);

export default Home;