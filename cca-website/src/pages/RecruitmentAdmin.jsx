import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaPlus, FaTrash, FaTimes, FaBriefcase, FaUsers, 
  FaFilePdf, FaEye 
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

  const [newJob, setNewJob] = useState({
    role: '',
    type: 'Full-time',
    desc: '',
    requirements: '',
    skills: '',
    questions: ''
  });

  const handlePublish = async (e) => {
    e.preventDefault();

    const jobObj = {
      role: newJob.role,
      type: newJob.type,
      description: newJob.desc,
      requirements: newJob.requirements.split('\n').filter(r => r.trim()),
      skills: newJob.skills.split(',').map(s => s.trim()).filter(s => s),
      questions: newJob.questions.split('\n').filter(q => q.trim())
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobObj)
      });

      if (response.ok) {
        setShowModal(false);
        setNewJob({
          role: '',
          type: 'Full-time',
          desc: '',
          requirements: '',
          skills: '',
          questions: ''
        });
        fetchJobs();
      }
    } catch (err) {
      alert("Failed to publish to cloud.");
    }
  };

  const deleteJob = async (id) => {
    if (!window.confirm("Delete this job role?")) return;
    await fetch(`${API_BASE_URL}/api/jobs/${id}`, { method: 'DELETE' });
    fetchJobs();
  };

  const openFile = (url) => {
    if (!url) return alert("No file found.");
    const viewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`;
    window.open(viewerUrl, '_blank', 'noopener,noreferrer');
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
            <button
              className={activeTab === 'manage' ? 'cta-btn-primary' : 'cta-btn-secondary'}
              onClick={() => setActiveTab('manage')}
              style={{ width: '180px' }}
            >
              <FaBriefcase /> ROLES
            </button>

            <button
              className={activeTab === 'review' ? 'cta-btn-primary' : 'cta-btn-secondary'}
              onClick={() => setActiveTab('review')}
              style={{ width: '220px' }}
            >
              <FaUsers /> APPLICANTS ({applications.length})
            </button>
          </div>
        </header>

        {/* ================= JOBS ================= */}
        {activeTab === 'manage' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div style={{ background: 'white', padding: '30px', marginBottom: '30px', display: 'flex', justifyContent: 'space-between' }}>
              <p style={{ opacity: 0.6 }}>Manage job openings.</p>
              <button className="cta-btn-primary" onClick={() => setShowModal(true)}>
                + CREATE NEW ROLE
              </button>
            </div>

            {jobs.map(job => (
              <div key={job.id} style={{ background: 'white', padding: '20px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <h3>{job.role}</h3>
                  <small style={{ color: 'var(--cca-red)' }}>{job.type}</small>
                </div>
                <button onClick={() => deleteJob(job.id)} style={{ color: 'red', border: 'none', background: 'none' }}>
                  <FaTrash /> Delete
                </button>
              </div>
            ))}
          </motion.div>
        )}

        {/* ================= APPLICANTS ================= */}
        {activeTab === 'review' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '30px' }}>
            
            <div style={{ background: '#fff', overflowY: 'auto', maxHeight: '75vh' }}>
              {applications.map(app => (
                <div
                  key={app.id}
                  onClick={() => setSelectedApp(app)}
                  style={{
                    padding: '15px',
                    borderBottom: '1px solid #eee',
                    cursor: 'pointer',
                    background: selectedApp?.id === app.id ? '#fef2f2' : 'white'
                  }}
                >
                  <h4>{app.name}</h4>
                  <small>{app.job_title || app.jobTitle}</small>
                </div>
              ))}
            </div>

            <div style={{ background: 'white', padding: '30px' }}>
              {!selectedApp ? (
                <p style={{ opacity: 0.4 }}>Select applicant</p>
              ) : (
                <>
                  <h2>{selectedApp.name}</h2>
                  <p style={{ color: 'var(--cca-red)' }}>
                    {selectedApp.job_title || selectedApp.jobTitle}
                  </p>

                  <div style={{ margin: '20px 0' }}>
                    <p><b>Email:</b> {selectedApp.email}</p>
                    <p><b>Experience:</b> {selectedApp.experience}</p>
                    <p><b>Education:</b> {selectedApp.education}</p>
                  </div>

                  <div style={{ display: 'flex', gap: '15px' }}>
                    <button onClick={() => openFile(selectedApp.cv_url)} className="cta-btn-secondary">
                      <FaFilePdf /> View CV
                    </button>

                    <button onClick={() => openFile(selectedApp.cover_url)} className="cta-btn-secondary">
                      <FaEye /> View Cover
                    </button>
                  </div>

                  {selectedApp.cv_url && (
                    <div style={{ marginTop: '30px' }}>
                      <h4>CV Preview</h4>
                      <iframe
                        src={`https://docs.google.com/gview?url=${encodeURIComponent(selectedApp.cv_url)}&embedded=true`}
                        width="100%"
                        height="500px"
                        style={{ border: '1px solid #ddd' }}
                        title="CV Preview"
                      />
                    </div>
                  )}

                </>
              )}
            </div>
          </motion.div>
        )}

        {/* ================= MODAL (RESTORED FULL FORM - ADDED, NOT REMOVED) ================= */}
        {showModal && (
          <div className="modal-overlay">
            <div style={{ background: '#fff', padding: '30px', maxWidth: '600px', margin: '100px auto' }}>
              <FaTimes onClick={() => setShowModal(false)} style={{ float: 'right', cursor: 'pointer' }} />
              <h2>Create Role</h2>

              <form onSubmit={handlePublish}>

                {/* ORIGINAL FIELD */}
                <input
                  placeholder="Role Title"
                  value={newJob.role}
                  onChange={e => setNewJob({ ...newJob, role: e.target.value })}
                  style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                />

                {/* ADDED BACK FIELDS (THIS WAS MISSING BEFORE) */}
                <input
                  placeholder="Job Type (Full-time / Part-time / Contract)"
                  value={newJob.type}
                  onChange={e => setNewJob({ ...newJob, type: e.target.value })}
                  style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                />

                <textarea
                  placeholder="Job Description"
                  value={newJob.desc}
                  onChange={e => setNewJob({ ...newJob, desc: e.target.value })}
                  style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                />

                <textarea
                  placeholder="Requirements (one per line)"
                  value={newJob.requirements}
                  onChange={e => setNewJob({ ...newJob, requirements: e.target.value })}
                  style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                />

                <input
                  placeholder="Skills (comma separated)"
                  value={newJob.skills}
                  onChange={e => setNewJob({ ...newJob, skills: e.target.value })}
                  style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                />

                <textarea
                  placeholder="Interview Questions (one per line)"
                  value={newJob.questions}
                  onChange={e => setNewJob({ ...newJob, questions: e.target.value })}
                  style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
                />

                <button className="cta-btn-primary" style={{ marginTop: '10px', width: '100%' }}>
                  Publish
                </button>

              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default RecruitAdmin;