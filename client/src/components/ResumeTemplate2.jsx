import React from 'react';

export default function ResumeTemplate2({ data }) {
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
        backgroundColor: '#ffffff',
        color: '#1e293b',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        padding: '48px',
        boxSizing: 'border-box',
        borderRadius: '16px',
        boxShadow: '0 20px 50px rgba(0,0,0,0.2)'
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', borderBottom: '2px solid #0f172a', paddingBottom: '20px', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '2.4rem', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.5px' }}>
          {personal.fullName || 'Alex Morgan'}
        </h1>
        <p style={{ color: '#2563eb', fontSize: '1.1rem', fontWeight: '700', marginTop: '4px' }}>
          {personal.jobTitle || 'Full Stack Engineer'}
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px', marginTop: '12px', color: '#64748b', fontSize: '0.85rem' }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>• {personal.phone}</span>}
          {personal.location && <span>• {personal.location}</span>}
          {personal.portfolio && <span>• {personal.portfolio}</span>}
        </div>
      </div>

      {/* Summary */}
      {personal.summary && (
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '700', textTransform: 'uppercase', color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px', marginBottom: '8px' }}>
            Executive Summary
          </h3>
          <p style={{ color: '#334155', lineHeight: '1.6', fontSize: '0.92rem' }}>{personal.summary}</p>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '700', textTransform: 'uppercase', color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px', marginBottom: '8px' }}>
            Technical Expertise
          </h3>
          <p style={{ color: '#334155', fontSize: '0.9rem', lineHeight: '1.6' }}>
            <strong>Core Technologies:</strong> {skills.join(' • ')}
          </p>
        </div>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '700', textTransform: 'uppercase', color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px', marginBottom: '12px' }}>
            Experience & Projects
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {experiences.map((exp, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', fontSize: '0.98rem', color: '#0f172a' }}>
                  <span>{exp.role || exp.title} — <span style={{ color: '#2563eb' }}>{exp.company}</span></span>
                  <span style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: '500' }}>{exp.duration}</span>
                </div>
                <p style={{ color: '#334155', fontSize: '0.9rem', lineHeight: '1.5', marginTop: '6px', whiteSpace: 'pre-line' }}>
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
          <h3 style={{ fontSize: '1rem', fontWeight: '700', textTransform: 'uppercase', color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px', marginBottom: '12px' }}>
            Education
          </h3>
          {education.map((edu, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', color: '#334155', fontSize: '0.9rem', marginBottom: '6px' }}>
              <span><strong>{edu.degree}</strong>, {edu.institution}</span>
              <span style={{ color: '#64748b' }}>{edu.year}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
