import React, { useState } from 'react';
import { Target, AlertTriangle, Zap, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SVGRadialGauge from './SVGRadialGauge';
import JobRoleAutocomplete from './JobRoleAutocomplete';
import SkillAutocomplete from './SkillAutocomplete';
import { JOB_SKILLS_MAPPING } from '../data/jobSkillsMaster';

export default function ATSCalculator({ onStartBuilding }) {
  const [selectedRole, setSelectedRole] = useState('');
  const [experienceYears, setExperienceYears] = useState(0);
  const [skills, setSkills] = useState([]);

  // Case-insensitive & partial match lookup for JOB_SKILLS_MAPPING
  const matchedKey = selectedRole
    ? Object.keys(JOB_SKILLS_MAPPING).find(key => key.toLowerCase() === selectedRole.toLowerCase())
    || Object.keys(JOB_SKILLS_MAPPING).find(key => key.toLowerCase().includes(selectedRole.toLowerCase()))
    : null;

  const requiredSkills = matchedKey ? JOB_SKILLS_MAPPING[matchedKey] : [];

  // Calculate score logically:
  // If no job role and no skills are added, score MUST BE 0
  const hasRole = Boolean(selectedRole && selectedRole.trim().length > 0);
  const hasSkills = skills.length > 0;

  const matchedSkills = skills.filter(s =>
    requiredSkills.some(r => r.toLowerCase() === s.toLowerCase())
  );

  let totalScore = 0;
  if (hasRole || hasSkills) {
    const baseScore = hasRole ? 20 : 10;
    const skillRatio = requiredSkills.length > 0 ? (matchedSkills.length / requiredSkills.length) : (hasSkills ? 0.4 : 0);
    const skillScore = Math.round(skillRatio * 50);
    const expScore = Math.round(Math.min(experienceYears * 2, 20));
    const formatBonus = hasSkills ? 10 : 0;
    totalScore = Math.min(baseScore + skillScore + expScore + formatBonus, 98);
  }

  const missingSkills = requiredSkills.filter(r =>
    !skills.some(s => s.toLowerCase() === r.toLowerCase())
  );

  const defaultTargetSkills = ['Problem Solving', 'Project Management', 'Data Analysis', 'Communication', 'Team Leadership'];
  const displayTargetSkills = (selectedRole && missingSkills.length > 0)
    ? missingSkills
    : defaultTargetSkills.filter(d => !skills.some(s => s.toLowerCase() === d.toLowerCase()));

  const handleAddSkill = (newSkill) => {
    if (newSkill && !skills.some(s => s.toLowerCase() === newSkill.toLowerCase())) {
      setSkills([...skills, newSkill]);
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        borderRadius: '24px',
        padding: '36px',
        background: 'rgba(255, 255, 255, 0.58)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid #e2e8f0',
        borderTop: '3.5px solid #0284c7',
        boxShadow: '0 10px 30px -10px rgba(15, 23, 42, 0.05)',
        transformStyle: 'preserve-3d'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
        <motion.div
          whileHover={{ scale: 1.2, rotate: 15 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'rgba(2, 132, 199, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0284c7'
          }}
        >
          <Target size={18} />
        </motion.div>
        <span style={{ fontSize: '0.82rem', color: '#0284c7', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Interactive Tool
        </span>
      </div>

      <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '6px', color: '#0f172a' }}>
        Live <span className="gradient-text">ATS Resume Score</span> Calculator
      </h2>
      <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '28px' }}>
        Select your role & skills to test your estimated ATS pass probability before building.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}
      >
        {/* Left Form Inputs Column */}
        <div>
          {/* Searchable Role Autocomplete */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', color: '#334155', marginBottom: '8px' }}>
              Target Job Role (A-Z Searchable):
            </label>
            <JobRoleAutocomplete
              value={selectedRole}
              onChange={(newRole) => setSelectedRole(newRole)}
            />
          </div>

          {/* Exp slider */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.88rem', fontWeight: '700', color: '#334155' }}>
                Years of Experience:
              </label>
              <span style={{ fontSize: '0.88rem', fontWeight: '800', color: '#0284c7' }}>
                {experienceYears} {experienceYears === 1 ? 'Year' : 'Years'}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              value={experienceYears}
              onChange={(e) => setExperienceYears(parseInt(e.target.value))}
              style={{ width: '100%', accentColor: '#0284c7', cursor: 'pointer' }}
            />
          </div>

          {/* Searchable Skill Autocomplete */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', color: '#334155', marginBottom: '8px' }}>
              Your Key Technical & Industry Skills:
            </label>
            <SkillAutocomplete
              selectedRole={selectedRole}
              currentSkills={skills}
              onAddSkill={handleAddSkill}
            />

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '12px' }}>
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
                      padding: '4px 10px',
                      borderRadius: '16px',
                      fontSize: '0.8rem',
                      fontWeight: '700',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    {s}
                    <button
                      type="button"
                      onClick={() => removeSkill(s)}
                      style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', display: 'flex', padding: 0 }}
                    >
                      <X size={12} />
                    </button>
                  </motion.span>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Right Output Column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ translateY: -4 }}
          style={{
            background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
            padding: '24px',
            borderRadius: '20px',
            border: '1.5px solid rgba(37, 99, 235, 0.22)',
            borderTop: '3.5px solid #2563eb',
            boxShadow: '0 12px 28px -6px rgba(37, 99, 235, 0.09), 0 4px 12px rgba(15, 23, 42, 0.04)',
            display: 'flex',
            flexDirection: 'column',
            justify: 'space-between',
            alignItems: 'center'
          }}
        >
          <div style={{ width: '100%', textAlign: 'center' }}>
            <span style={{ fontSize: '0.9rem', color: '#475569', fontWeight: '700', display: 'block', marginBottom: '16px' }}>
              {totalScore > 0 ? 'Estimated ATS Pass Score:' : 'Estimated ATS Pass Score (Select Role):'}
            </span>

            {/* SVG Radial Gauge */}
            <div style={{ marginBottom: '20px' }}>
              <SVGRadialGauge score={totalScore} size={110} strokeWidth={9} />
            </div>

            {/* Missing Skills Insights & Improvement Advice */}
            <div style={{ textAlign: 'left', marginBottom: '20px' }}>
              <div style={{ fontSize: '0.82rem', color: '#d97706', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <AlertTriangle size={14} /> {selectedRole ? `Missing High-Impact Skills (${selectedRole}):` : 'High-Impact Skills to Target:'}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                {displayTargetSkills.map((ms, i) => (
                  <motion.button
                    key={i}
                    type="button"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => handleAddSkill(ms)}
                    style={{
                      background: '#fef3c7',
                      border: '1px solid #fde68a',
                      color: '#b45309',
                      padding: '4px 10px',
                      borderRadius: '14px',
                      fontSize: '0.78rem',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    + {ms}
                  </motion.button>
                ))}
              </div>
              <div style={{ background: '#f8fafc', padding: '10px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.78rem', color: '#475569' }}>
                💡 <strong>Action Tip:</strong> {selectedRole ? 'Click yellow skill chips or add keywords to push your ATS pass score above 90%+.' : 'Type your target job role or click yellow skill chips to calculate your ATS pass score.'}
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStartBuilding}
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '0.95rem' }}
          >
            <Zap size={16} /> Create High-Score Resume
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
