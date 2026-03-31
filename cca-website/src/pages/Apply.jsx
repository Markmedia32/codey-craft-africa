import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFileUpload, FaArrowLeft, FaCheckCircle, FaFilePdf, FaRegFileAlt } from 'react-icons/fa';

const Apply = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '', email: '', education: '', experience: '',
    cvData: '', cvName: '',
    coverData: '', coverName: '',
    responses: []
  });

  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem('cca_jobs')) || [];
    const found = savedJobs.find(j => j.id === parseInt(jobId));
    if (found) {
      setJob(found);
      setFormData(prev => ({ 
        ...prev, 
        responses: found.questions.map(q => ({ question: q, answer: '' })) 
      }));
    }
  }, [jobId]);

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'cv') {
          setFormData(prev => ({ ...prev, cvData: reader.result, cvName: file.name }));
        } else {
          setFormData(prev => ({ ...prev, coverData: reader.result, coverName: file.name }));
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
    const existingApps = JSON.parse(localStorage.getItem('cca_apps')) || [];
    const newApp = {
      ...formData,
      id: Date.now(),
      jobId: jobId,
      jobTitle: job.role,
      submittedAt: new Date().toLocaleString()
    };
    localStorage.setItem('cca_apps', JSON.stringify([...existingApps, newApp]));
    setIsSubmitted(true);
    window.scrollTo(0, 0);
  };

  if (!job) return <div style={{ paddingTop: '200px', textAlign: 'center' }}><h2>Loading Role Details...</h2></div>;

  if (isSubmitted) {
    return (
      <motion.div initial={{opacity:0}} animate={{opacity:1}} style={{ paddingTop: '200px', textAlign: 'center', minHeight: '80vh' }}>
        <FaCheckCircle size={80} color="var(--cca-red)" />
        <h1 className="title-medium" style={{marginTop:'20px'}}>Application Submitted</h1>
        <p>Thank you for applying to Codey Craft Africa. We will review your assessment shortly.</p>
        <button onClick={() => navigate('/careers')} className="cta-btn-primary" style={{ marginTop: '30px' }}>RETURN TO CAREERS</button>
      </motion.div>
    );
  }

  return (
    <div className="apply-page" style={{ paddingTop: '120px', paddingBottom: '100px', background: '#fff' }}>
      <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}>
        <button onClick={() => navigate('/careers')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '30px', fontWeight: '900' }}>
          <FaArrowLeft /> BACK TO CAREERS
        </button>

        <span className="sub-head" style={{ color: 'var(--cca-red)' }}>OFFICIAL APPLICATION</span>
        <h1 className="title-large" style={{ marginBottom: '10px' }}>{job.role}</h1>
        <p style={{ opacity: 0.6, marginBottom: '50px' }}>{job.type} • Complete the form and technical assessment below.</p>

        <form onSubmit={handleSubmit}>
          {/* Section 1: Bio */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
            <div>
              <label style={{ fontWeight: '900', display: 'block', marginBottom: '10px' }}>Full Name *</label>
              <input required style={inputStyle} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            <div>
              <label style={{ fontWeight: '900', display: 'block', marginBottom: '10px' }}>Email Address *</label>
              <input required type="email" style={inputStyle} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '40px' }}>
            <div>
              <label style={{ fontWeight: '900', display: 'block', marginBottom: '10px' }}>Highest Education *</label>
              <input required style={inputStyle} onChange={e => setFormData({...formData, education: e.target.value})} />
            </div>
            <div>
              <label style={{ fontWeight: '900', display: 'block', marginBottom: '10px' }}>Years of Experience *</label>
              <input required type="number" style={inputStyle} onChange={e => setFormData({...formData, experience: e.target.value})} />
            </div>
          </div>

          {/* Section 2: Files */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '50px' }}>
            <div style={fileBoxStyle}>
              <FaFileUpload size={30} color="#ccc" />
              <p style={{ margin: '10px 0', fontSize: '0.8rem', fontWeight: '700' }}>Upload CV (PDF/DOC) *</p>
              <input required type="file" accept=".pdf,.doc,.docx" onChange={e => handleFileChange(e, 'cv')} />
              {formData.cvName && <p style={{fontSize:'0.7rem', color:'var(--cca-red)', marginTop:'5px'}}><FaFilePdf/> {formData.cvName}</p>}
            </div>
            <div style={fileBoxStyle}>
              <FaFileUpload size={30} color="#ccc" />
              <p style={{ margin: '10px 0', fontSize: '0.8rem', fontWeight: '700' }}>Upload Cover Letter *</p>
              <input required type="file" accept=".pdf,.doc,.docx" onChange={e => handleFileChange(e, 'cover')} />
              {formData.coverName && <p style={{fontSize:'0.7rem', color:'var(--cca-red)', marginTop:'5px'}}><FaFilePdf/> {formData.coverName}</p>}
            </div>
          </div>

          {/* Section 3: Assessment */}
          <h3 className="title-medium" style={{ fontSize: '1.5rem', marginBottom: '30px', borderBottom: '4px solid var(--cca-red)', display: 'inline-block' }}>Technical Assessment</h3>
          {job.questions.map((q, i) => (
            <div key={i} style={{ marginBottom: '35px' }}>
              <label style={{ fontWeight: '900', display: 'block', marginBottom: '15px', lineHeight: '1.4' }}>{q}</label>
              <textarea 
                required 
                style={{ ...inputStyle, height: '150px', resize: 'vertical' }} 
                placeholder="Enter your detailed response here..."
                onChange={e => handleAssessmentChange(i, e.target.value)} 
              />
            </div>
          ))}

          <button type="submit" className="cta-btn-primary" style={{ width: '100%', padding: '25px', fontSize: '1.1rem', marginTop: '20px' }}>
            SUBMIT FINAL APPLICATION
          </button>
        </form>
      </div>
    </div>
  );
};

const inputStyle = { width: '100%', padding: '15px', border: '1px solid #ddd', fontSize: '1rem', outlineColor: 'var(--cca-red)' };
const fileBoxStyle = { border: '2px dashed #eee', padding: '30px', textAlign: 'center', background: '#fcfcfc', borderRadius: '8px' };

export default Apply;