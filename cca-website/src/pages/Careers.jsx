import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUserClock, FaCheckCircle, FaLayerGroup } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// --- ADDED DYNAMIC URL LOGIC ---
const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000' 
  : 'https://cca-server.onrender.com'; // Replace with your actual Render URL
// -------------------------------

const Careers = () => {
  const [openPositions, setOpenPositions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // UPDATED TO USE API_BASE_URL
    fetch(`${API_BASE_URL}/api/jobs`)
      .then(res => res.json())
      .then(data => {
        const formattedData = data.map(job => ({
          ...job,
          requirements: typeof job.requirements === 'string' ? JSON.parse(job.requirements) : job.requirements,
          skills: typeof job.skills === 'string' ? JSON.parse(job.skills) : job.skills
        }));
        setOpenPositions(formattedData);
      })
      .catch(err => console.error("Error loading cloud jobs:", err));
  }, []);

  const hasJobs = openPositions.length > 0;

  return (
    <div className="careers-page">
      <div style={{ height: '100px' }}></div>

      <section className="section-padding">
        <div style={{ textAlign: 'center' }}>
          <span className="sub-head" style={{ color: 'var(--cca-red)' }}>JOIN THE TEAM</span>
          <h1 className="title-large">Shape the Future of <br/> Enterprise Tech</h1>
        </div>
      </section>

      <section className="section-padding" style={{ background: '#fcfcfc', minHeight: '500px' }}>
        <div className="container">
          {hasJobs ? (
            <div className="jobs-list">
              <h2 className="title-medium" style={{ marginBottom: '50px' }}>Available Roles</h2>
              <div style={{ display: 'grid', gap: '30px' }}>
                {openPositions.map((job) => (
                  <div key={job.id} className="job-card-expanded" style={{ 
                    background: 'white', padding: '50px', border: '1px solid #eee', 
                    boxShadow: '0 10px 30px rgba(0,0,0,0.02)' 
                  }}>
                    <div className="job-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
                      <div>
                        <span style={{ fontSize: '0.7rem', fontWeight: '900', color: 'var(--cca-red)', letterSpacing: '2px' }}>{(job.type || "").toUpperCase()}</span>
                        <h3 style={{ fontSize: '2.2rem', marginTop: '10px', marginBottom: '15px' }}>{job.role}</h3>
                        <p style={{ fontSize: '1.1rem', color: '#555', maxWidth: '800px', lineHeight: '1.6' }}>{job.description || job.desc}</p>
                      </div>
                      <button className="cta-btn-primary" style={{ padding: '20px 40px', fontSize: '0.9rem' }} onClick={() => navigate(`/apply/${job.id}`)}>
                        APPLY FOR THIS ROLE →
                      </button>
                    </div>

                    <div className="job-details-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginTop: '40px', paddingTop: '40px', borderTop: '1px solid #f0f0f0' }}>
                      <div>
                        <h4 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                          <FaCheckCircle color="var(--cca-red)"/> Requirements
                        </h4>
                        <ul style={{ paddingLeft: '20px', color: '#666' }}>
                          {Array.isArray(job.requirements) && job.requirements.map((req, i) => (
                            <li key={i} style={{ marginBottom: '10px' }}>{req}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                          <FaLayerGroup color="var(--cca-red)"/> Desired Skills
                        </h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                          {Array.isArray(job.skills) && job.skills.map((skill, i) => (
                            <span key={i} style={{ background: '#f0f0f0', padding: '8px 16px', fontSize: '0.8rem', fontWeight: '700', borderRadius: '4px' }}>
                              {skill.toUpperCase()}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '100px 0' }}>
              <FaUserClock style={{ fontSize: '4rem', color: '#ddd', marginBottom: '20px' }} />
              <h2 className="title-medium" style={{ color: '#aaa' }}>No Current Openings</h2>
              <p style={{ opacity: 0.5 }}>Check back soon or follow Codey Craft Africa for updates!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Careers;