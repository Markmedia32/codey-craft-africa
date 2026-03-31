import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaPlus, FaTrash, FaTimes, FaBriefcase, FaUsers, 
  FaCheckCircle, FaLayerGroup, FaFilePdf, FaQuestionCircle, FaClock, FaEye 
} from 'react-icons/fa';

const RecruitAdmin = () => {
  const [activeTab, setActiveTab] = useState('manage');
  const [showModal, setShowModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);

  // 1. Initialize data from localStorage
  const [jobs, setJobs] = useState(() => JSON.parse(localStorage.getItem('cca_jobs')) || []);
  const [applications, setApplications] = useState(() => JSON.parse(localStorage.getItem('cca_apps')) || []);

  // 2. Persist changes to localStorage
  useEffect(() => { localStorage.setItem('cca_jobs', JSON.stringify(jobs)); }, [jobs]);
  useEffect(() => { localStorage.setItem('cca_apps', JSON.stringify(applications)); }, [applications]);

  const [newJob, setNewJob] = useState({ role: '', type: 'Full-time', desc: '', requirements: '', skills: '', questions: '' });

  const handlePublish = (e) => {
    e.preventDefault();
    const jobObj = {
      id: Date.now(),
      role: newJob.role,
      type: newJob.type,
      desc: newJob.desc,
      requirements: newJob.requirements.split('\n').filter(r => r.trim() !== ''),
      skills: newJob.skills.split(',').map(s => s.trim()).filter(s => s !== ''),
      questions: newJob.questions.split('\n').filter(q => q.trim() !== '')
    };
    setJobs([...jobs, jobObj]);
    setShowModal(false);
    setNewJob({ role: '', type: 'Full-time', desc: '', requirements: '', skills: '', questions: '' });
  };

  // 3. SECURE FILE VIEWER (Blob URL Logic)
  const openFile = (dataUrl, fileName) => {
    if (!dataUrl) return alert("No file data found for this application.");

    try {
      // Split the metadata from the base64 string
      const parts = dataUrl.split(',');
      const byteString = atob(parts[1]);
      const mimeString = parts[0].split(':')[1].split(';')[0];
      
      // Create a buffer and view
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      // Create a Blob and a Virtual URL
      const blob = new Blob([ab], { type: mimeString });
      const url = URL.createObjectURL(blob);

      // Create a hidden link and trigger it
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      
      // If it's a Word Doc, we force a download name
      if (mimeString.includes('word') || mimeString.includes('officedocument')) {
        link.download = fileName || "Candidate-Document";
      }

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the memory
      setTimeout(() => URL.revokeObjectURL(url), 100);
    } catch (err) {
      console.error("File Conversion Error:", err);
      alert("Could not open file. It may be corrupted or too large for local storage.");
    }
  };

  return (
    <div className="admin-dashboard-view" style={{ background: '#fcfcfc', minHeight: '100vh', paddingTop: '100px' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        
        {/* Header Section */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
          <div>
            <span className="sub-head" style={{ color: 'var(--cca-red)' }}>ADMINISTRATION PORTAL</span>
            <h1 className="title-medium" style={{ margin: 0 }}>Recruitment Management</h1>
          </div>
          <div style={{ display: 'flex', gap: '15px' }}>
            <button className={activeTab === 'manage' ? 'cta-btn-primary' : 'cta-btn-secondary'} onClick={() => setActiveTab('manage')} style={{ width: '180px' }}>
              <FaBriefcase /> ROLES
            </button>
            <button className={activeTab === 'review' ? 'cta-btn-primary' : 'cta-btn-secondary'} onClick={() => setActiveTab('review')} style={{ width: '220px' }}>
              <FaUsers /> APPLICANTS ({applications.length})
            </button>
          </div>
        </header>

        {/* Tab 1: Manage Roles */}
        {activeTab === 'manage' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div style={{ background: 'white', padding: '30px', border: '1px solid #eee', marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ opacity: 0.6 }}>Manage the job openings currently visible on the public careers page.</p>
                <button className="cta-btn-primary" onClick={() => setShowModal(true)}>+ CREATE NEW ROLE</button>
            </div>
            
            <div className="admin-job-grid">
              {jobs.map(job => (
                <div key={job.id} style={{ background: 'white', border: '1px solid #eee', padding: '25px', marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ margin: 0 }}>{job.role}</h3>
                    <span style={{ fontSize: '0.8rem', color: 'var(--cca-red)', fontWeight: 'bold' }}>{job.type} • {job.questions.length} Assessment Questions</span>
                  </div>
                  <button onClick={() => setJobs(jobs.filter(j => j.id !== job.id))} style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer' }}>
                    <FaTrash /> REMOVE
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Tab 2: Review Applications */}
        {activeTab === 'review' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '30px' }}>
            {/* Applicant Sidebar */}
            <div style={{ maxHeight: '75vh', overflowY: 'auto', background: '#fff', border: '1px solid #eee' }}>
              {applications.length === 0 ? <p style={{padding:'20px', opacity:0.5}}>No applications found.</p> : applications.map(app => (
                <div key={app.id} onClick={() => setSelectedApp(app)} style={{ padding: '20px', borderBottom: '1px solid #eee', cursor: 'pointer', background: selectedApp?.id === app.id ? '#fef2f2' : 'transparent', borderLeft: selectedApp?.id === app.id ? '5px solid var(--cca-red)' : 'none' }}>
                  <h4 style={{ margin: 0 }}>{app.name}</h4>
                  <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>{app.jobTitle}</p>
                </div>
              ))}
            </div>

            {/* Application Details View */}
            <div style={{ background: 'white', padding: '40px', border: '1px solid #eee', minHeight: '60vh' }}>
              {selectedApp ? (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
                    <div>
                      <h2 style={{ fontSize: '2.2rem' }}>{selectedApp.name}</h2>
                      <p style={{ color: 'var(--cca-red)', fontWeight: 'bold', fontSize: '1.1rem' }}>{selectedApp.jobTitle}</p>
                    </div>
                    <button onClick={() => { if(window.confirm("Delete this application?")) setApplications(applications.filter(a => a.id !== selectedApp.id)); setSelectedApp(null); }} style={{ color: '#ccc', border: 'none', background: 'none', cursor: 'pointer' }}><FaTrash /> DELETE</button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '40px', background: '#fafafa', padding: '25px' }}>
                    <div>
                      <p style={{marginBottom:'8px'}}><strong>Email:</strong> {selectedApp.email}</p>
                      <p style={{marginBottom:'8px'}}><strong>Experience:</strong> {selectedApp.experience} Years</p>
                      <p style={{marginBottom:'8px'}}><strong>Education:</strong> {selectedApp.education}</p>
                      <p><FaClock /> <span style={{fontSize:'0.8rem'}}>Received: {selectedApp.submittedAt}</span></p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                      <button className="cta-btn-secondary" onClick={() => openFile(selectedApp.cvData, selectedApp.cvName)} style={{justifyContent:'center'}}>
                        <FaFilePdf color="red"/> VIEW CV ({selectedApp.cvName})
                      </button>
                      <button className="cta-btn-secondary" onClick={() => openFile(selectedApp.coverData, selectedApp.coverName)} style={{justifyContent:'center'}}>
                        <FaEye /> VIEW COVER LETTER
                      </button>
                    </div>
                  </div>

                  <h3 style={{ borderBottom: '2px solid #f0f0f0', paddingBottom: '10px', marginBottom: '25px' }}>Assessment Responses</h3>
                  {selectedApp.responses && selectedApp.responses.map((res, i) => (
                    <div key={i} style={{ marginBottom: '30px' }}>
                      <p style={{ fontWeight: '900', color: '#333' }}>Q: {res.question}</p>
                      <p style={{ background: '#fff', border: '1px solid #eee', padding: '20px', marginTop: '10px', fontStyle: 'italic', lineHeight: '1.6' }}>
                        {res.answer}
                      </p>
                    </div>
                  ))}
                </div>
              ) : <div style={{ textAlign: 'center', paddingTop: '150px', opacity: 0.3 }}>Select an application from the sidebar to review details.</div>}
            </div>
          </motion.div>
        )}

        {/* Modal: Create Role */}
        {showModal && (
          <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.9)', zIndex: 3000, overflowY: 'auto' }}>
            <div className="modal-content" style={{ maxWidth: '800px', margin: '50px auto', background: '#fff', padding: '50px', position: 'relative' }}>
              <FaTimes onClick={() => setShowModal(false)} style={{ position: 'absolute', right: '30px', top: '30px', cursor: 'pointer', fontSize: '1.5rem' }} />
              <h2 className="title-medium">Define New Opportunity</h2>
              <form onSubmit={handlePublish} style={{ marginTop: '30px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <input required placeholder="Role Title (e.g. Lead Engineer)" style={inputStyle} value={newJob.role} onChange={e => setNewJob({...newJob, role: e.target.value})} />
                  <select style={inputStyle} value={newJob.type} onChange={e => setNewJob({...newJob, type: e.target.value})}>
                    <option>Full-time</option><option>Part-time</option><option>Contract</option><option>Internship</option>
                  </select>
                </div>
                <textarea required placeholder="Job Overview / Description" style={{ ...inputStyle, height: '100px', marginBottom: '20px' }} value={newJob.desc} onChange={e => setNewJob({...newJob, desc: e.target.value})} />
                
                <h4 style={{marginBottom:'10px'}}><FaCheckCircle/> Candidate Requirements (One per line)</h4>
                <textarea required placeholder="Enter requirements here..." style={{ ...inputStyle, height: '100px', marginBottom: '20px' }} value={newJob.requirements} onChange={e => setNewJob({...newJob, requirements: e.target.value})} />
                
                <h4 style={{marginBottom:'10px'}}><FaLayerGroup/> Skills / Tech Stack (Comma separated)</h4>
                <input required placeholder="React, Node.js, Express, MySQL" style={{ ...inputStyle, marginBottom: '20px' }} value={newJob.skills} onChange={e => setNewJob({...newJob, skills: e.target.value})} />
                
                <h4 style={{marginBottom:'10px'}}><FaQuestionCircle/> Custom Assessment (One per line)</h4>
                <textarea required placeholder="Add questions the applicant must answer..." style={{ ...inputStyle, height: '120px', marginBottom: '30px' }} value={newJob.questions} onChange={e => setNewJob({...newJob, questions: e.target.value})} />
                
                <button type="submit" className="cta-btn-primary" style={{ width: '100%', padding: '20px', fontSize: '1.1rem' }}>
                  PUBLISH TO CAREERS PAGE
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const inputStyle = { width: '100%', padding: '15px', border: '1px solid #eee', fontSize: '1rem', outlineColor: 'var(--cca-red)' };

export default RecruitAdmin;