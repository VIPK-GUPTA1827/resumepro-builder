import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Plus, Trash2, ArrowRight, ArrowLeft, CheckCircle, Zap } from 'lucide-react';
import JobRoleAutocomplete from './JobRoleAutocomplete';
import SkillAutocomplete from './SkillAutocomplete';
import { JOB_SKILLS_MAPPING } from '../data/jobSkillsMaster';

export default function StepForm({ onGenerateAI }) {
  const [step, setStep] = useState(1);

  // Form State - Auto-restored from localStorage if available
  const [personal, setPersonal] = useState(() => {
    const saved = localStorage.getItem('resumepro_personal');
    return saved ? JSON.parse(saved) : {
      fullName: '',
      jobTitle: '',
      email: '',
      phone: '',
      location: '',
      portfolio: '',
      github: '',
      summary: ''
    };
  });

  const [experiences, setExperiences] = useState(() => {
    const saved = localStorage.getItem('resumepro_experiences');
    return saved ? JSON.parse(saved) : [
      { company: '', role: '', duration: '', description: '' }
    ];
  });

  const [skills, setSkills] = useState(() => {
    const saved = localStorage.getItem('resumepro_skills');
    return saved ? JSON.parse(saved) : [];
  });

  const [skillInput, setSkillInput] = useState('');

  const [education, setEducation] = useState(() => {
    const saved = localStorage.getItem('resumepro_education');
    return saved ? JSON.parse(saved) : [
      { institution: '', degree: '', year: '' }
    ];
  });

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('resumepro_projects');
    return saved ? JSON.parse(saved) : [
      { name: '', description: '', techStack: '', link: '' }
    ];
  });

  // Derived ATS recommended skills based on selected Job Title
  const matchedRoleKey = personal.jobTitle
    ? Object.keys(JOB_SKILLS_MAPPING).find(k => k.toLowerCase() === personal.jobTitle.toLowerCase()) ||
      Object.keys(JOB_SKILLS_MAPPING).find(k => k.toLowerCase().includes(personal.jobTitle.toLowerCase()))
    : null;
  const recommendedSkills = matchedRoleKey ? JOB_SKILLS_MAPPING[matchedRoleKey] : [];
  const unaddedRecommendedSkills = recommendedSkills.filter(
    r => !skills.some(s => s.toLowerCase() === r.toLowerCase())
  );

  // Email format validation
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personal.email.trim());

  // Sync to LocalStorage on state change
  useEffect(() => {
    localStorage.setItem('resumepro_personal', JSON.stringify(personal));
  }, [personal]);

  useEffect(() => {
    localStorage.setItem('resumepro_experiences', JSON.stringify(experiences));
  }, [experiences]);

  useEffect(() => {
    localStorage.setItem('resumepro_skills', JSON.stringify(skills));
  }, [skills]);

  useEffect(() => {
    localStorage.setItem('resumepro_education', JSON.stringify(education));
  }, [education]);

  useEffect(() => {
    localStorage.setItem('resumepro_projects', JSON.stringify(projects));
  }, [projects]);

  // Handlers
  const handlePersonalChange = (e) => {
    setPersonal({ ...personal, [e.target.name]: e.target.value });
  };

  const handleExpChange = (index, field, value) => {
    const updated = [...experiences];
    updated[index][field] = value;
    setExperiences(updated);
  };

  const addExp = () => {
    setExperiences([...experiences, { company: '', role: '', duration: '', description: '' }]);
  };

  const removeExp = (index) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  const handleProjChange = (index, field, value) => {
    const updated = [...projects];
    updated[index][field] = value;
    setProjects(updated);
  };

  const addProj = () => {
    setProjects([...projects, { name: '', description: '', techStack: '', link: '' }]);
  };

  const removeProj = (index) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleEduChange = (index, field, value) => {
    const updated = [...education];
    updated[index][field] = value;
    setEducation(updated);
  };

  const addEdu = () => {
    setEducation([...education, { institution: '', degree: '', year: '' }]);
  };

  const removeEdu = (index) => {
    setEducation(education.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerateAI({ personal, experiences, skills, education, projects });
  };

  return (
    <div
      style={{
        padding: '36px',
        maxWidth: '850px',
        margin: '0 auto',
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius: '24px',
        border: '1.5px solid rgba(37, 99, 235, 0.25)',
        borderTop: '4px solid #2563eb',
        boxShadow: '0 10px 30px -10px rgba(15, 23, 42, 0.05)'
      }}
    >
      {/* Step Progress Header */}
      {/* Numbered Step Indicators (01) (02) (03) (04) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', position: 'relative', flexWrap: 'wrap', gap: '12px' }}>
        {[
          { num: 1, label: 'Personal' },
          { num: 2, label: 'Experience' },
          { num: 3, label: 'Skills' },
          { num: 4, label: 'Preview & Export' }
        ].map((s, idx, arr) => {
          const isActive = step >= s.num;
          const isCurrent = step === s.num;
          return (
            <React.Fragment key={s.num}>
              <div
                onClick={() => setStep(s.num)}
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  zIndex: 2
                }}
              >
                <motion.div
                  animate={isCurrent ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                  transition={{ repeat: isCurrent ? Infinity : 0, duration: 2.2, ease: 'easeInOut' }}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: isCurrent
                      ? 'linear-gradient(135deg, #2563eb, #0284c7)'
                      : isActive
                      ? 'rgba(37, 99, 235, 0.15)'
                      : '#f1f5f9',
                    border: isCurrent
                      ? '2px solid #2563eb'
                      : isActive
                      ? '1px solid rgba(37, 99, 235, 0.4)'
                      : '1px solid #cbd5e1',
                    color: isCurrent ? '#ffffff' : isActive ? '#2563eb' : '#64748b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.82rem',
                    fontWeight: '800',
                    boxShadow: isCurrent ? '0 4px 14px rgba(37, 99, 235, 0.35)' : 'none',
                    transition: 'background 0.3s, border 0.3s, color 0.3s'
                  }}
                >
                  0{s.num}
                </motion.div>
                <span
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: isCurrent ? '800' : isActive ? '700' : '500',
                    color: isCurrent ? '#0f172a' : isActive ? '#2563eb' : '#64748b'
                  }}
                >
                  {s.label}
                </span>
              </div>

              {idx < arr.length - 1 && (
                <div
                  style={{
                    flex: 1,
                    minWidth: '20px',
                    height: '2px',
                    margin: '0 8px',
                    background: step > s.num ? '#2563eb' : '#e2e8f0',
                    transition: 'all 0.4s'
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      <form onSubmit={handleSubmit}>
        <AnimatePresence mode="wait">
          {/* STEP 1: Personal Info */}
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
            >
              <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#0f172a', marginBottom: '4px' }}>Personal Details</h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: '#64748b', display: 'block', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '700' }}>Full Name</label>
                  <input className="line-input" name="fullName" placeholder="e.g. John Doe" value={personal.fullName} onChange={handlePersonalChange} required />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', color: '#64748b', display: 'block', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '700' }}>Target Job Title</label>
                  <JobRoleAutocomplete
                    value={personal.jobTitle}
                    onChange={(newVal) => setPersonal({ ...personal, jobTitle: newVal })}
                    placeholder="e.g. Full Stack Engineer, Clinical Pharmacist..."
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <label style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '700' }}>Email Address</label>
                    {personal.email.trim() && (
                      <span style={{ fontSize: '0.72rem', fontWeight: '700', color: isEmailValid ? '#16a34a' : '#e11d48', display: 'flex', alignItems: 'center', gap: '3px' }}>
                        {isEmailValid ? <><CheckCircle size={12} /> Valid Format</> : '⚠ Invalid Email Format'}
                      </span>
                    )}
                  </div>
                  <input className="line-input" type="email" name="email" placeholder="e.g. john.doe@example.com" value={personal.email} onChange={handlePersonalChange} required />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', color: '#64748b', display: 'block', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '700' }}>Phone Number</label>
                  <input className="line-input" name="phone" placeholder="e.g. +1 (555) 234-5678" value={personal.phone} onChange={handlePersonalChange} />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', color: '#64748b', display: 'block', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '700' }}>Location</label>
                  <input className="line-input" name="location" placeholder="e.g. San Francisco, CA" value={personal.location} onChange={handlePersonalChange} />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', color: '#64748b', display: 'block', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '700' }}>Portfolio URL</label>
                  <input className="line-input" name="portfolio" placeholder="e.g. https://myportfolio.dev" value={personal.portfolio} onChange={handlePersonalChange} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <label style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '700' }}>Summary / Objective</label>
                  <span style={{ fontSize: '0.72rem', color: personal.summary.length >= 100 && personal.summary.length <= 400 ? '#16a34a' : '#64748b', fontWeight: '700' }}>
                    {personal.summary.length} chars {personal.summary.length >= 100 && personal.summary.length <= 400 ? '(Good Length ✓)' : '(100-300 recommended)'}
                  </span>
                </div>
                <textarea
                  className="line-input"
                  name="summary"
                  rows={3}
                  value={personal.summary}
                  onChange={handlePersonalChange}
                  placeholder="e.g. Full Stack Developer with expertise in building web apps and REST APIs..."
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  onClick={() => setStep(2)}
                  className="btn-primary"
                >
                  Next: Experience <ArrowRight size={16} />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Work Experience */}
          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#0f172a' }}>Work Experience</h3>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  type="button"
                  onClick={addExp}
                  className="btn-secondary"
                  style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                >
                  <Plus size={14} /> Add Position
                </motion.button>
              </div>

              <AnimatePresence>
                {experiences.map((exp, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25 }}
                    style={{
                      background: '#f8fafc',
                      padding: '20px',
                      borderRadius: '16px',
                      border: '1px solid #e2e8f0',
                      position: 'relative'
                    }}
                  >
                    {experiences.length > 1 && (
                      <button type="button" onClick={() => removeExp(i)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                        <Trash2 size={16} />
                      </button>
                    )}

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '14px' }}>
                      <input
                        className="line-input"
                        placeholder="Company Name"
                        value={exp.company}
                        onChange={(e) => handleExpChange(i, 'company', e.target.value)}
                      />
                      <input
                        className="line-input"
                        placeholder="Job Title"
                        value={exp.role}
                        onChange={(e) => handleExpChange(i, 'role', e.target.value)}
                      />
                      <input
                        className="line-input"
                        placeholder="Duration (e.g. 2021 - Present)"
                        value={exp.duration}
                        onChange={(e) => handleExpChange(i, 'duration', e.target.value)}
                      />
                    </div>

                    <textarea
                      className="line-input"
                      rows={3}
                      placeholder="e.g. Built real-time backend API using Node.js, Express, and Socket.io..."
                      value={exp.description}
                      onChange={(e) => handleExpChange(i, 'description', e.target.value)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Key Projects (Optional) */}
              <div style={{ marginTop: '16px', borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Key Projects <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '500' }}>(Optional)</span></h4>
                    <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Highlight web apps, research, or key achievements</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    type="button"
                    onClick={addProj}
                    className="btn-secondary"
                    style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                  >
                    <Plus size={14} /> Add Project
                  </motion.button>
                </div>

                {projects.map((proj, i) => (
                  <div
                    key={i}
                    style={{
                      background: '#f8fafc',
                      padding: '16px',
                      borderRadius: '14px',
                      border: '1px solid #e2e8f0',
                      marginBottom: '12px',
                      position: 'relative'
                    }}
                  >
                    {projects.length > 1 && (
                      <button type="button" onClick={() => removeProj(i)} style={{ position: 'absolute', top: '12px', right: '12px', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                        <Trash2 size={15} />
                      </button>
                    )}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '10px' }}>
                      <input
                        className="line-input"
                        placeholder="Project Name (e.g. E-Commerce Platform)"
                        value={proj.name}
                        onChange={(e) => handleProjChange(i, 'name', e.target.value)}
                      />
                      <input
                        className="line-input"
                        placeholder="Tech Stack (e.g. React, Node.js, MongoDB)"
                        value={proj.techStack}
                        onChange={(e) => handleProjChange(i, 'techStack', e.target.value)}
                      />
                      <input
                        className="line-input"
                        placeholder="Project Link / URL (Optional)"
                        value={proj.link}
                        onChange={(e) => handleProjChange(i, 'link', e.target.value)}
                      />
                    </div>
                    <textarea
                      className="line-input"
                      rows={2}
                      placeholder="Brief description of your project outcomes and metrics..."
                      value={proj.description}
                      onChange={(e) => handleProjChange(i, 'description', e.target.value)}
                    />
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} type="button" onClick={() => setStep(1)} className="btn-secondary">
                  <ArrowLeft size={16} /> Back
                </motion.button>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} type="button" onClick={() => setStep(3)} className="btn-primary">
                  Next: Skills <ArrowRight size={16} />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Skills & Education */}
          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
            >
              <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#0f172a' }}>Skills & Education</h3>

              {/* Skills Tag Input */}
              <div>
                <label style={{ fontSize: '0.8rem', color: '#64748b', display: 'block', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '700' }}>
                  Technical & Industry Skills
                </label>
                <SkillAutocomplete
                  selectedRole={personal.jobTitle}
                  currentSkills={skills}
                  onAddSkill={(newSkill) => {
                    if (newSkill && !skills.some(s => s.toLowerCase() === newSkill.toLowerCase())) {
                      setSkills([...skills, newSkill]);
                    }
                  }}
                />

                {/* Smart Recommended Skills Bar */}
                {unaddedRecommendedSkills.length > 0 && (
                  <div style={{ marginTop: '12px', padding: '12px 14px', background: 'rgba(2, 132, 199, 0.05)', borderRadius: '12px', border: '1px solid rgba(2, 132, 199, 0.2)' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: '800', color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Zap size={14} color="#0284c7" /> Smart Recommended Skills for {personal.jobTitle || 'Your Role'} (Click to Add):
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {unaddedRecommendedSkills.slice(0, 8).map(rec => (
                        <button
                          key={rec}
                          type="button"
                          onClick={() => setSkills([...skills, rec])}
                          style={{
                            background: '#ffffff',
                            border: '1px solid #0284c7',
                            color: '#0284c7',
                            padding: '4px 10px',
                            borderRadius: '16px',
                            fontSize: '0.78rem',
                            fontWeight: '700',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#0284c7';
                            e.currentTarget.style.color = '#ffffff';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = '#ffffff';
                            e.currentTarget.style.color = '#0284c7';
                          }}
                        >
                          + {rec}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '14px' }}>
                  <AnimatePresence>
                    {skills.map((s, i) => (
                      <motion.span
                        key={s}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{
                          background: 'rgba(37, 99, 235, 0.08)',
                          border: '1px solid rgba(37, 99, 235, 0.25)',
                          color: '#2563eb',
                          padding: '6px 14px',
                          borderRadius: '20px',
                          fontSize: '0.85rem',
                          fontWeight: '700',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        {s}
                        <button
                          type="button"
                          onClick={() => removeSkill(s)}
                          style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center', fontWeight: '800', fontSize: '1rem' }}
                        >
                          ×
                        </button>
                      </motion.span>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f172a', margin: '16px 0 8px 0' }}>Education</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {education.map((edu, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 120px', gap: '16px' }}>
                    <input
                      className="line-input"
                      placeholder="University / Institute"
                      value={edu.institution}
                      onChange={(e) => {
                        const updated = [...education];
                        updated[i].institution = e.target.value;
                        setEducation(updated);
                      }}
                    />
                    <input
                      className="line-input"
                      placeholder="Degree / Major"
                      value={edu.degree}
                      onChange={(e) => {
                        const updated = [...education];
                        updated[i].degree = e.target.value;
                        setEducation(updated);
                      }}
                    />
                    <input
                      className="line-input"
                      placeholder="Year"
                      value={edu.year}
                      onChange={(e) => {
                        const updated = [...education];
                        updated[i].year = e.target.value;
                        setEducation(updated);
                      }}
                    />
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} type="button" onClick={() => setStep(2)} className="btn-secondary">
                  <ArrowLeft size={16} /> Back
                </motion.button>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} type="button" onClick={() => setStep(4)} className="btn-primary">
                  Next: Preview & Export <ArrowRight size={16} />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Generate Confirmation */}
          {step === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              style={{ textAlign: 'center', padding: '24px 0' }}
            >
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #2563eb, #0284c7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px auto',
                  boxShadow: '0 8px 25px rgba(37, 99, 235, 0.35)'
                }}
              >
                <Sparkles size={36} color="#fff" />
              </motion.div>

              <h3 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>
                Ready to Generate Your <span className="gradient-text">Professional Resume</span>?
              </h3>

              <p style={{ color: '#64748b', fontSize: '1rem', maxWidth: '480px', margin: '0 auto 32px auto', lineHeight: '1.6' }}>
                Your details will be formatted into high-impact templates optimized for ATS scanners and PDF export.
              </p>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} type="button" onClick={() => setStep(3)} className="btn-secondary">
                  <ArrowLeft size={16} /> Edit Details
                </motion.button>
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} type="submit" className="btn-primary" style={{ padding: '16px 36px', fontSize: '1.05rem' }}>
                  <Sparkles size={20} /> Generate Resume Now
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
