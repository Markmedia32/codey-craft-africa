import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaPlus, FaTrash, FaTimes, FaBriefcase, FaUsers,
  FaFilePdf, FaEye
} from 'react-icons/fa';

const API_BASE_URL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : 'https://cca-server-lu7l.onrender.com';

const RecruitAdmin = () => {
  const [activeTab, setActiveTab] = useState('manage');
  const [showModal, setShowModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);

  const [jobs, setJobs] = useState([]);

  // =========================
  // FIX 1: SAFE DEFAULT STATE
  // =========================
  const [applications, setApplications] = useState([]);

  const [newJob, setNewJob] = useState({
    role: '',
    type: 'Full-time',
    desc: '',
    requirements: '',
    skills: '',
    questions: ''
  });

  /* =========================
     FETCH JOBS (FIXED SAFETY)
  ========================= */
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/jobs`);

      // FIX: prevent crash if backend fails
      if (!res.ok) throw new Error("Jobs fetch failed");

      const data = await res.json();
      setJobs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setJobs([]); // FIX: fallback safe state
    }
  };

  /* =========================
     FETCH APPLICATIONS (REAL DB ONLY)
  ========================= */
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/applications`);

        if (!res.ok) throw new Error("Applications fetch failed");

        const data = await res.json();

        // =========================
        // FIX 2: SAFE PARSING
        // =========================
        const formatted = (Array.isArray(data) ? data : []).map(app => ({
          ...app,
          responses: typeof app.responses === 'string'
            ? JSON.parse(app.responses || '[]')
            : (app.responses || [])
        }));

        setApplications(formatted);
      } catch (err) {
        console.error(err);
        setApplications([]); // FIX fallback
      }
    };

    fetchApplications();

    // REAL TIME SYNC
    const interval = setInterval(fetchApplications, 8000);
    return () => clearInterval(interval);
  }, []);

  /* =========================
     PUBLISH JOB
  ========================= */
  const handlePublish = async (e) => {
    e.preventDefault();

    const jobObj = {
      role: newJob.role,
      type: newJob.type,
      description: newJob.desc,
      requirements: newJob.requirements.split('\n'),
      skills: newJob.skills.split(','),
      questions: newJob.questions.split('\n')
    };

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
  };

  /* =========================
     DELETE JOB
  ========================= */
  const deleteJob = async (id) => {
    if (!window.confirm("Delete this job?")) return;

    await fetch(`${API_BASE_URL}/api/jobs/${id}`, {
      method: 'DELETE'
    });

    fetchJobs();
  };

  /* =========================
     UI
  ========================= */
  return (
    <div style={{ paddingTop: '100px', background: '#f9f9f9', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 20 }}>

        {/* HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h2>Recruitment Admin</h2>

          <div>
            <button onClick={() => setActiveTab('manage')}>
              <FaBriefcase /> Jobs
            </button>

            <button onClick={() => setActiveTab('review')}>
              <FaUsers /> Applicants ({applications.length})
            </button>
          </div>
        </div>

        {/* ================= JOBS ================= */}
        {activeTab === 'manage' && (
          <div>
            <button onClick={() => setShowModal(true)}>+ Create Job</button>

            {jobs.map(job => (
              <div key={job.id} style={{ background: '#fff', padding: 15, marginTop: 10 }}>
                <h3>{job.role}</h3>
                <button onClick={() => deleteJob(job.id)}>
                  <FaTrash /> Delete
                </button>
              </div>
            ))}
          </div>
        )}

        {/* ================= APPLICANTS ================= */}
        {activeTab === 'review' && (
          <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 20 }}>

            {/* LIST */}
            <div>
              {applications.map(app => (
                <div
                  key={app.id}
                  onClick={() => setSelectedApp(app)}
                  style={{
                    padding: 10,
                    background: selectedApp?.id === app.id ? '#eee' : '#fff',
                    cursor: 'pointer'
                  }}
                >
                  <h4>{app.name}</h4>
                  <p>{app.job_title}</p>
                </div>
              ))}
            </div>

            {/* DETAILS */}
            <div style={{ background: '#fff', padding: 20 }}>
              {!selectedApp ? (
                <p>Select applicant</p>
              ) : (
                <>
                  <h2>{selectedApp.name}</h2>
                  <p>{selectedApp.email}</p>

                  <h3>Assessment Answers</h3>

                  {/* FIX 3: SAFE LOOP */}
                  {(selectedApp.responses || []).map((r, i) => (
                    <div key={i} style={{ marginBottom: 15 }}>
                      <b>{r?.question}</b>
                      <p>{r?.answer}</p>
                    </div>
                  ))}

                  <button>
                    <FaFilePdf /> View CV
                  </button>

                  <button>
                    <FaEye /> View Cover
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* ================= MODAL ================= */}
        {showModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
            <div style={{ background: '#fff', padding: 30 }}>
              <FaTimes onClick={() => setShowModal(false)} />

              <form onSubmit={handlePublish}>
                <input
                  placeholder="Role"
                  value={newJob.role}
                  onChange={e => setNewJob({ ...newJob, role: e.target.value })}
                />

                <textarea
                  placeholder="Description"
                  onChange={e => setNewJob({ ...newJob, desc: e.target.value })}
                />

                <textarea
                  placeholder="Questions (one per line)"
                  onChange={e => setNewJob({ ...newJob, questions: e.target.value })}
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