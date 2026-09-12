import React from 'react';

export default function ResumeTemplate3({ data }) {
  const {
    personal = {},
    experiences = [],
    education = [],
    skills = []
  } = data || {};

  return (
    <div
      id="resume-content"
      style={{
        width: '100%',
        minHeight: '1050px',
        backgroundColor: '#0f0f23',
        color: '#f1f5f9',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        padding: '0',
        boxSizing: 'border-box',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 20px 50px rgba(0,0,0,0.4)'
      }}
    >
      {/* Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)',
          padding: '40px 48px',
          color: '#fff'
        }}
      >
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', fontFamily: "'Space Grotesk', sans-serif" }}>
          {personal.fullName || 'Alex Morgan'}
        </h1>
        <p style={{ fontSize: '1.2rem', fontWeight: '600', opacity: 0.9, marginTop: '4px' }}>
          {personal.jobTitle || 'Full Stack Developer'}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '16px', fontSize: '0.88rem', opacity: 0.95 }}>
          {personal.email && <span>📧 {personal.email}</span>}
          {personal.phone && <span>📞 {personal.phone}</span>}
          {personal.location && <span>📍 {personal.location}</span>}
          {personal.github && <span>💻 {personal.github}</span>}
        </div>
      </div>

      <div style={{ padding: '40px 48px' }}>
        {/* Summary */}
        {personal.summary && (
          <div style={{ marginBottom: '28px' }}>
            <h3 style={{ fontSize: '1.05rem', color: '#38bdf8', fontWeight: '700', textTransform: 'uppercase', marginBottom: '8px' }}>
              About Me
            </h3>
            <p style={{ color: '#cbd5e1', lineHeight: '1.6', fontSize: '0.92rem' }}>{personal.summary}</p>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div style={{ marginBottom: '28px' }}>
            <h3 style={{ fontSize: '1.05rem', color: '#38bdf8', fontWeight: '700', textTransform: 'uppercase', marginBottom: '10px' }}>
              Skills & Expertise
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {skills.map((skill, i) => (
                <span
                  key={i}
                  style={{
                    background: 'rgba(6, 182, 212, 0.15)',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    color: '#e0f2fe',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.82rem',
                    fontWeight: '600'
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <div style={{ marginBottom: '28px' }}>
            <h3 style={{ fontSize: '1.05rem', color: '#38bdf8', fontWeight: '700', textTransform: 'uppercase', marginBottom: '14px' }}>
              Projects & Work Experience
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {experiences.map((exp, i) => (
                <div key={i} style={{ borderLeft: '2px solid #7c3aed', paddingLeft: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff', fontWeight: '700' }}>
                    <span>{exp.role || exp.title} <span style={{ color: '#38bdf8', fontWeight: '500' }}>@ {exp.company}</span></span>
                    <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{exp.duration}</span>
                  </div>
                  <p style={{ color: '#cbd5e1', fontSize: '0.88rem', lineHeight: '1.5', marginTop: '6px', whiteSpace: 'pre-line' }}>
                    {exp.enhancedDescription || exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <h3 style={{ fontSize: '1.05rem', color: '#38bdf8', fontWeight: '700', textTransform: 'uppercase', marginBottom: '12px' }}>
              Education
            </h3>
            {education.map((edu, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1', fontSize: '0.9rem', marginBottom: '4px' }}>
                <span><strong>{edu.degree}</strong> — {edu.institution}</span>
                <span style={{ color: '#94a3b8' }}>{edu.year}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
