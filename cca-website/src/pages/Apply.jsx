import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFileUpload, FaArrowLeft, FaCheckCircle, FaFilePdf } from 'react-icons/fa';

const API_BASE_URL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : 'https://cca-server-lu7l.onrender.com';

const Apply = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    education: '',
    experience: '',
    cvData: '',
    cvName: '',
    coverData: '',
    coverName: '',
    responses: []
  });

  // ✅ FIXED: Now uses CLOUD API instead of localStorage
  useEffect(() => {
    setLoading(true);

    fetch(`${API_BASE_URL}/api/jobs/${jobId}`)
      .then(res => res.json())
      .then(data => {
        setJob(data);

        if (data && data.questions) {
          setFormData(prev => ({
            ...prev,
            responses: data.questions.map(q => ({
              question: q,
              answer: ''
            }))
          }));
        }

        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading job:", err);
        setLoading(false);
      });
  }, [jobId]);

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'cv') {
          setFormData(prev => ({
            ...prev,
            cvData: reader.result,
            cvName: file.name
          }));
        } else {
          setFormData(prev => ({
            ...prev,
            coverData: reader.result,
            coverName: file.name
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAssessmentChange = (index, val) => {
    const newResponses = [...formData.responses];
    newResponses[index].answer = val;
    setFormData(prev => ({ ...prev, responses: newResponses }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingApps =
      JSON.parse(localStorage.getItem('cca_apps')) || [];

    const newApp = {
      ...formData,
      id: Date.now(),
      jobId,
      jobTitle: job.role,
      submittedAt: new Date().toLocaleString()
    };

    localStorage.setItem(
      'cca_apps',
      JSON.stringify([...existingApps, newApp])
    );

    setIsSubmitted(true);
    window.scrollTo(0, 0);
  };

  // ✅ FIXED LOADING STATE
  if (loading) {
    return (
      <div style={{ paddingTop: '200px', textAlign: 'center' }}>
        <h2>Loading Role Details...</h2>
      </div>
    );
  }

  if (!job) {
    return (
      <div style={{ paddingTop: '200px', textAlign: 'center' }}>
        <h2>Job not found</h2>
        <button onClick={() => navigate('/careers')}>
          Back to Careers
        </button>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          paddingTop: '200px',
          textAlign: 'center',
          minHeight: '80vh'
        }}
      >
        <FaCheckCircle size={80} color="var(--cca-red)" />
        <h1 className="title-medium" style={{ marginTop: '20px' }}>
          Application Submitted
        </h1>
        <p>
          Thank you for applying to Codey Craft Africa.
        </p>
        <button
          onClick={() => navigate('/careers')}
          className="cta-btn-primary"
          style={{ marginTop: '30px' }}
        >
          RETURN TO CAREERS
        </button>
      </motion.div>
    );
  }

  return (
    <div
      className="apply-page"
      style={{
        paddingTop: '120px',
        paddingBottom: '100px',
        background: '#fff'
      }}
    >
      <div
        className="container"
        style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}
      >
        <button
          onClick={() => navigate('/careers')}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '30px',
            fontWeight: '900'
          }}
        >
          <FaArrowLeft /> BACK TO CAREERS
        </button>

        <span className="sub-head" style={{ color: 'var(--cca-red)' }}>
          OFFICIAL APPLICATION
        </span>

        <h1 className="title-large" style={{ marginBottom: '10px' }}>
          {job.role}
        </h1>

        <p style={{ opacity: 0.6, marginBottom: '50px' }}>
          {job.type} • Complete the form below.
        </p>

        <form onSubmit={handleSubmit}>
          {/* BIO */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '30px',
              marginBottom: '30px'
            }}
          >
            <input
              required
              placeholder="Full Name"
              style={inputStyle}
              onChange={e =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <input
              required
              type="email"
              placeholder="Email Address"
              style={inputStyle}
              onChange={e =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '30px',
              marginBottom: '40px'
            }}
          >
            <input
              required
              placeholder="Highest Education"
              style={inputStyle}
              onChange={e =>
                setFormData({ ...formData, education: e.target.value })
              }
            />

            <input
              required
              type="number"
              placeholder="Years of Experience"
              style={inputStyle}
              onChange={e =>
                setFormData({ ...formData, experience: e.target.value })
              }
            />
          </div>

          {/* FILES */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '30px',
              marginBottom: '50px'
            }}
          >
            <div style={fileBoxStyle}>
              <FaFileUpload size={30} color="#ccc" />
              <p>Upload CV *</p>
              <input
                required
                type="file"
                onChange={e => handleFileChange(e, 'cv')}
              />
              {formData.cvName && (
                <p>
                  <FaFilePdf /> {formData.cvName}
                </p>
              )}
            </div>

            <div style={fileBoxStyle}>
              <FaFileUpload size={30} color="#ccc" />
              <p>Upload Cover Letter *</p>
              <input
                required
                type="file"
                onChange={e => handleFileChange(e, 'cover')}
              />
              {formData.coverName && (
                <p>
                  <FaFilePdf /> {formData.coverName}
                </p>
              )}
            </div>
          </div>

          {/* QUESTIONS */}
          <h3 className="title-medium">Technical Assessment</h3>

          {job.questions &&
            job.questions.map((q, i) => (
              <div key={i} style={{ marginBottom: '30px' }}>
                <label style={{ fontWeight: 'bold' }}>{q}</label>
                <textarea
                  required
                  style={{ ...inputStyle, height: '120px' }}
                  onChange={e =>
                    handleAssessmentChange(i, e.target.value)
                  }
                />
              </div>
            ))}

          <button
            type="submit"
            className="cta-btn-primary"
            style={{ width: '100%', padding: '20px' }}
          >
            SUBMIT APPLICATION
          </button>
        </form>
      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '15px',
  border: '1px solid #ddd'
};

const fileBoxStyle = {
  border: '2px dashed #eee',
  padding: '30px',
  textAlign: 'center'
};

export default Apply;