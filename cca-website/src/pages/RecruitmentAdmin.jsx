import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaPlus, FaTrash, FaTimes, FaBriefcase, FaUsers, 
  FaCheckCircle, FaLayerGroup, FaFilePdf, FaQuestionCircle, FaClock, FaEye 
} from 'react-icons/fa';

const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000' 
  : 'https://cca-server-lu7l.onrender.com';

const RecruitAdmin = () => {
  const [activeTab, setActiveTab] = useState('manage');
  const [showModal, setShowModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);

  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchJobs();
    fetchApplications();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/jobs`);
      const data = await response.json();
      setJobs(data);
    } catch (err) { console.error("Error loading jobs:", err); }
  };

  const fetchApplications = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/applications`);
      const data = await response.json();
      setApplications(data);
    } catch (err) { console.error("Error loading applications:", err); }
  };

  const [newJob, setNewJob] = useState({ role: '', type: 'Full-time', desc: '', requirements: '', skills: '', questions: '' });

  const handlePublish = async (e) => {
    e.preventDefault();
    const jobObj = {
      role: newJob.role,
      type: newJob.type,
      description: newJob.desc,
      requirements: newJob.requirements.split('\n').filter(r => r.trim() !== ''),
      skills: newJob.skills.split(',').map(s => s.trim()).filter(s => s !== ''),
      questions: newJob.questions.split('\n').filter(q => q.trim() !== '')
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobObj)
      });
      if (response.ok) {
        setShowModal(false);
        setNewJob({ role: '', type: 'Full-time', desc: '', requirements: '', skills: '', questions: '' });
        fetchJobs();
      }
    } catch (err) { alert("Failed to publish to cloud."); }
  };

  const deleteJob = async (id) => {
    if(!window.confirm("Delete this job role from the public site?")) return;
    try {
      await fetch(`${API_BASE_URL}/api/jobs/${id}`, { method: 'DELETE' });
      fetchJobs();
    } catch (err) { console.error("Delete failed"); }
  };

  // ✅ UPDATED: Open Cloudinary URL directly
  const openFile = (url) => {
    if (!url) return alert("No file found.");
    window.open(url, '_blank');
  };

  return (
    <div className="admin-dashboard-view" style={{ background: '#fcfcfc', minHeight: '100vh', paddingTop: '100px' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
          <div>
            <span className="sub-head" style={{ color: 'var(--cca-red)' }}>ADMINISTRATION PORTAL</span>
            <h1 className="title-medium" style={{ margin: 0 }}>Recruitment Management</h1>
          </div>
          <div style={{ display: 'flex', gap: '15px' }}>
            <button className={activeTab === 'manage' ? 'cta-btn-primary' : 'cta-btn-secondary'} onClick={() => setActiveTab('manage')} style={{ width: '180px' }}><FaBriefcase /> ROLES</button>
            <button className={activeTab === 'review' ? 'cta-btn-primary' : 'cta-btn-secondary'} onClick={() => setActiveTab('review')} style={{ width: '220px' }}><FaUsers /> APPLICANTS ({applications.length})</button>
          </div>
        </header>

        {activeTab === 'manage' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div style={{ background: 'white', padding: '30px', border: '1px solid #eee', marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ opacity: 0.6 }}>Manage job openings hosted on Codey Craft Cloud Database.</p>
                <button className="cta-btn-primary" onClick={() => setShowModal(true)}>+ CREATE NEW ROLE</button>
            </div>
            <div className="admin-job-grid">
              {jobs.map(job => (
                <div key={job.id} style={{ background: 'white', border: '1px solid #eee', padding: '25px', marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div><h3 style={{ margin: 0 }}>{job.role}</h3><span style={{ fontSize: '0.8rem', color: 'var(--cca-red)', fontWeight: 'bold' }}>{job.type} • Cloud Sync Active</span></div>
                  <button onClick={() => deleteJob(job.id)} style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer' }}><FaTrash /> REMOVE</button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'review' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '30px' }}>
            <div style={{ maxHeight: '75vh', overflowY: 'auto', background: '#fff', border: '1px solid #eee' }}>
              {applications.length === 0 ? <p style={{padding:'20px', opacity:0.5}}>No applications found.</p> : applications.map(app => (
                <div key={app.id} onClick={() => setSelectedApp(app)} style={{ padding: '20px', borderBottom: '1px solid #eee', cursor: 'pointer', background: selectedApp?.id === app.id ? '#fef2f2' : 'transparent', borderLeft: selectedApp?.id === app.id ? '5px solid var(--cca-red)' : 'none' }}>
                  <h4 style={{ margin: 0 }}>{app.name}</h4>
                  <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>{app.job_title || app.jobTitle}</p>
                </div>
              ))}
            </div>

            <div style={{ background: 'white', padding: '40px', border: '1px solid #eee', minHeight: '60vh' }}>
              {selectedApp ? (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
                    <div>
                      <h2 style={{ fontSize: '2.2rem' }}>{selectedApp.name}</h2>
                      <p style={{ color: 'var(--cca-red)', fontWeight: 'bold', fontSize: '1.1rem' }}>{selectedApp.job_title || selectedApp.jobTitle}</p>
                    </div>
                    <button onClick={() => { if(window.confirm("Delete application?")) setApplications(applications.filter(a => a.id !== selectedApp.id)); setSelectedApp(null); }} style={{ color: '#ccc', border: 'none', background: 'none', cursor: 'pointer' }}><FaTrash /> DELETE</button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '40px', background: '#fafafa', padding: '25px' }}>
                    <div>
                      <p><strong>Email:</strong> {selectedApp.email}</p>
                      <p><strong>Experience:</strong> {selectedApp.experience} Years</p>
                      <p><strong>Education:</strong> {selectedApp.education}</p>
                    </div>

                    {/* ✅ UPDATED BUTTONS */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                      <button className="cta-btn-secondary" onClick={() => openFile(selectedApp.cv_url)} style={{justifyContent:'center'}}>
                        <FaFilePdf color="red"/> VIEW CV
                      </button>

                      <button className="cta-btn-secondary" onClick={() => openFile(selectedApp.cover_url)} style={{justifyContent:'center'}}>
                        <FaEye /> VIEW COVER
                      </button>
                    </div>
                  </div>

                  {/* RESPONSES */}
                  <div style={{ marginTop: '30px' }}>
                    <h3 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px', marginBottom: '20px' }}>
                      Technical Assessment Responses
                    </h3>

                    {selectedApp.responses ? (
                      JSON.parse(typeof selectedApp.responses === 'string'
                        ? selectedApp.responses
                        : JSON.stringify(selectedApp.responses)
                      ).map((res, index) => (
                        <div key={index} style={{ marginBottom: '20px', background: '#f9f9f9', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #eee' }}>
                          <p style={{ fontWeight: 'bold' }}>Q: {res.question}</p>
                          <p style={{ whiteSpace: 'pre-wrap' }}>A: {res.answer}</p>
                        </div>
                      ))
                    ) : <p style={{opacity:0.5}}>No responses.</p>}
                  </div>

                </div>
              ) : <div style={{ textAlign: 'center', paddingTop: '150px', opacity: 0.3 }}>Select an applicant to review.</div>}
            </div>
          </motion.div>
        )}

        {showModal && (
          <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.9)', zIndex: 3000 }}>
            <div style={{ maxWidth: '800px', margin: '50px auto', background: '#fff', padding: '50px', position: 'relative' }}>
              <FaTimes onClick={() => setShowModal(false)} style={{ position: 'absolute', right: '30px', top: '30px', cursor: 'pointer' }} />
              <h2>Define Cloud Opportunity</h2>

              <form onSubmit={handlePublish}>
                <input required placeholder="Role Title" style={inputStyle} value={newJob.role} onChange={e => setNewJob({...newJob, role: e.target.value})} />
                <button type="submit" className="cta-btn-primary" style={{ width: '100%', marginTop: '20px' }}>
                  PUBLISH
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const inputStyle = { width: '100%', padding: '15px', border: '1px solid #eee' };

export default RecruitAdmin;