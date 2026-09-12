import React from 'react';

export default function ResumeTemplate1({ data }) {
  const {
    personal = {},
    experiences = [],
    education = [],
    skills = []
  } = data || {};

  // Auto skill percentages for progress bar visualization
  const autoLevels = [92, 86, 80, 75, 70, 68, 65, 60];

  return (
    <div
      id="resume-content"
      style={{
        width: '100%',
        minHeight: '1050px',
        backgroundColor: '#070719',
        color: '#f8fafc',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        boxSizing: 'border-box',
        border: '1px solid rgba(124, 58, 237, 0.35)',
        borderRadius: '16px',
        boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: '320px 1fr',
        overflow: 'hidden'
      }}
    >
      {/* LEFT SIDEBAR (Maxino Style) */}
      <div
        style={{
          background: 'rgba(15, 15, 38, 0.95)',
          padding: '40px 28px',
          borderRight: '1px solid rgba(124, 58, 237, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px'
        }}
      >
        {/* Profile Avatar / Header */}
        <div>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '800',
              fontSize: '1.4rem',
              color: '#fff',
              marginBottom: '16px',
              boxShadow: '0 4px 20px rgba(124, 58, 237, 0.4)'
            }}
          >
            {personal.fullName ? personal.fullName.substring(0, 2).toUpperCase() : 'AI'}
          </div>

          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#fff', lineHeight: '1.2' }}>
            {personal.fullName || 'e.g. Your Name'}
          </h2>
          <p style={{ color: '#06b6d4', fontSize: '0.9rem', fontWeight: '700', marginTop: '6px' }}>
            {personal.jobTitle || 'e.g. Full Stack Engineer'}
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h4 style={{ fontSize: '0.8rem', color: '#c084fc', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '14px', fontWeight: '800' }}>
            Contact Details
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', color: '#cbd5e1' }}>
            {personal.email && <div>📧 {personal.email}</div>}
            {personal.phone && <div>📞 {personal.phone}</div>}
            {personal.location && <div>📍 {personal.location}</div>}
            {personal.portfolio && <div style={{ wordBreak: 'break-all' }}>🌐 {personal.portfolio}</div>}
          </div>
        </div>

        {/* Technical Skill Progress Bars (Maxino Style) */}
        {skills.length > 0 && (
          <div>
            <h4 style={{ fontSize: '0.8rem', color: '#c084fc', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px', fontWeight: '800' }}>
              Skill Proficiency
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {skills.map((skill, i) => {
                const level = autoLevels[i % autoLevels.length];
                return (
                  <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#e2e8f0', marginBottom: '4px', fontWeight: '600' }}>
                      <span>{skill}</span>
                      <span style={{ color: '#06b6d4' }}>{level}%</span>
                    </div>
                    <div style={{ height: '6px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div
                        style={{
                          height: '100%',
                          width: `${level}%`,
                          background: 'linear-gradient(90deg, #7c3aed, #06b6d4)',
                          borderRadius: '3px',
                          animation: `fillBar 1s ease-out ${i * 0.1}s both`
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Education Sidebar */}
        {education.length > 0 && (
          <div>
            <h4 style={{ fontSize: '0.8rem', color: '#c084fc', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '14px', fontWeight: '800' }}>
              Education
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {education.map((edu, i) => (
                <div key={i} style={{ fontSize: '0.85rem' }}>
                  <div style={{ color: '#fff', fontWeight: '700' }}>{edu.degree}</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{edu.institution}</div>
                  <div style={{ color: '#06b6d4', fontSize: '0.78rem', marginTop: '2px' }}>{edu.year}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* RIGHT MAIN CONTENT AREA */}
      <div style={{ padding: '40px 48px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {/* Professional Summary */}
        {personal.summary && (
          <div>
            <h3 style={{ fontSize: '1rem', color: '#c084fc', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '12px', fontWeight: '800' }}>
              Professional Summary
            </h3>
            <p style={{ color: '#cbd5e1', lineHeight: '1.65', fontSize: '0.95rem' }}>{personal.summary}</p>
          </div>
        )}

        {/* Work Experience Timeline */}
        {experiences.length > 0 && (
          <div>
            <h3 style={{ fontSize: '1rem', color: '#c084fc', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '20px', fontWeight: '800' }}>
              Work Experience & Major Projects
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', borderLeft: '2px solid rgba(124, 58, 237, 0.3)', paddingLeft: '20px', marginLeft: '6px' }}>
              {experiences.map((exp, i) => (
                <div key={i} style={{ position: 'relative' }}>
                  {/* Timeline Dot */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '-27px',
                      top: '4px',
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: '#06b6d4',
                      boxShadow: '0 0 10px #06b6d4'
                    }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#fff' }}>{exp.role || exp.title}</h4>
                    <span style={{ color: '#06b6d4', fontSize: '0.85rem', fontWeight: '700', background: 'rgba(6, 182, 212, 0.1)', padding: '2px 8px', borderRadius: '4px' }}>
                      {exp.duration}
                    </span>
                  </div>
                  <div style={{ color: '#a7f3d0', fontSize: '0.9rem', fontWeight: '600', marginBottom: '10px' }}>{exp.company}</div>
                  <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: '1.6', whiteSpace: 'pre-line' }}>
                    {exp.enhancedDescription || exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
