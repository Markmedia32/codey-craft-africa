import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTrash, FaTimes, FaBriefcase, FaUsers, FaFilePdf, FaEye } from 'react-icons/fa';

const API_BASE_URL =
  window.location.hostname === 'localhost'
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
      const res = await fetch(`${API_BASE_URL}/api/jobs`);
      const data = await res.json();
      setJobs(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchApplications = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/applications`);
      const data = await res.json();
      setApplications(data);
    } catch (err) {
      console.error(err);
    }
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
      requirements: newJob.requirements.split('\n').filter(Boolean),
      skills: newJob.skills.split(',').map(s => s.trim()).filter(Boolean),
      questions: newJob.questions.split('\n').filter(Boolean)
    };

    try {
      await fetch(`${API_BASE_URL}/api/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobObj)
      });

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
    } catch (err) {
      alert('Failed to publish');
    }
  };

  const deleteJob = async (id) => {
    if (!window.confirm('Delete job?')) return;
    await fetch(`${API_BASE_URL}/api/jobs/${id}`, { method: 'DELETE' });
    fetchJobs();
  };

  /* =========================
     FIXED FILE DOWNLOAD SYSTEM
  ========================= */
  const openFile = (url, filename = '') => {
    if (!url) return alert('No file found');

    const link = document.createElement('a');
    link.href = url;

    // 🔥 FORCE PROPER FILE NAME + TYPE
    link.download = filename || 'document';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /* =========================
     SAFE RESPONSE PARSER
  ========================= */
  const parseResponses = (responses) => {
    try {
      if (!responses) return [];
      return typeof responses === 'string'
        ? JSON.parse(responses)
        : responses;
    } catch {
      return [];
    }
  };

  return (
    <div className="admin-dashboard-view" style={{ background: '#fcfcfc', minHeight: '100vh', paddingTop: '100px' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>

        {/* HEADER */}
        <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
          <div>
            <span className="sub-head" style={{ color: 'var(--cca-red)' }}>ADMIN PANEL</span>
            <h1>Recruitment Management</h1>
          </div>

          <div style={{ display: 'flex', gap: '15px' }}>
            <button onClick={() => setActiveTab('manage')}>
              <FaBriefcase /> Roles
            </button>
            <button onClick={() => setActiveTab('review')}>
              <FaUsers /> Applicants ({applications.length})
            </button>
          </div>
        </header>

        {/* ================= JOBS ================= */}
        {activeTab === 'manage' && (
          <motion.div>
            {jobs.map(job => (
              <div key={job.id} style={{ background: '#fff', padding: '20px', marginBottom: '10px' }}>
                <h3>{job.role}</h3>
                <button onClick={() => deleteJob(job.id)}>
                  <FaTrash /> Delete
                </button>
              </div>
            ))}
          </motion.div>
        )}

        {/* ================= APPLICANTS ================= */}
        {activeTab === 'review' && (
          <motion.div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '20px' }}>

            {/* LIST */}
            <div style={{ background: '#fff', maxHeight: '75vh', overflowY: 'auto' }}>
              {applications.map(app => (
                <div
                  key={app.id}
                  onClick={() => setSelectedApp(app)}
                  style={{
                    padding: '15px',
                    cursor: 'pointer',
                    borderBottom: '1px solid #eee',
                    background: selectedApp?.id === app.id ? '#fef2f2' : '#fff'
                  }}
                >
                  <h4>{app.name}</h4>
                  <small>{app.job_title || app.jobTitle}</small>
                </div>
              ))}
            </div>

            {/* DETAILS */}
            <div style={{ background: '#fff', padding: '30px' }}>
              {!selectedApp ? (
                <p>Select applicant</p>
              ) : (
                <>
                  <h2>{selectedApp.name}</h2>
                  <p style={{ color: 'var(--cca-red)' }}>
                    {selectedApp.job_title || selectedApp.jobTitle}
                  </p>

                  <p><b>Email:</b> {selectedApp.email}</p>
                  <p><b>Experience:</b> {selectedApp.experience}</p>
                  <p><b>Education:</b> {selectedApp.education}</p>

                  {/* FILE BUTTONS */}
                  <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                    <button
                      onClick={() => openFile(selectedApp.cv_url, selectedApp.cv_name)}
                    >
                      <FaFilePdf /> Download CV
                    </button>

                    <button
                      onClick={() => openFile(selectedApp.cover_url, selectedApp.cover_name)}
                    >
                      <FaEye /> Download Cover
                    </button>
                  </div>

                  {/* SCREENING QUESTIONS */}
                  <div style={{ marginTop: '30px' }}>
                    <h3>Screening Questions</h3>

                    {parseResponses(selectedApp.responses).length > 0 ? (
                      parseResponses(selectedApp.responses).map((res, i) => (
                        <div key={i} style={{ padding: '15px', background: '#f9f9f9', marginBottom: '10px' }}>
                          <p><b>Q:</b> {res.question}</p>
                          <p><b>A:</b> {res.answer}</p>
                        </div>
                      ))
                    ) : (
                      <p style={{ opacity: 0.5 }}>No responses submitted</p>
                    )}
                  </div>

                </>
              )}
            </div>
          </motion.div>
        )}

        {/* MODAL */}
        {showModal && (
          <div className="modal-overlay">
            <div style={{ background: '#fff', padding: '30px', maxWidth: '600px', margin: '100px auto' }}>
              <FaTimes onClick={() => setShowModal(false)} style={{ float: 'right' }} />
              <h2>Create Role</h2>

              <form onSubmit={handlePublish}>
                <input
                  placeholder="Role Title"
                  value={newJob.role}
                  onChange={(e) => setNewJob({ ...newJob, role: e.target.value })}
                  style={{ width: '100%', padding: '10px' }}
                />

                <button type="submit">Publish</button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default RecruitAdmin;