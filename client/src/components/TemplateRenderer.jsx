import React from 'react';
import { resumeTemplates } from '../config/resumeTemplates.config';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

export default function TemplateRenderer({ resumeData = {}, selectedTemplateId = 'atsClassic', customAccentColor = null, customFontFamily = null }) {
  const baseTheme = resumeTemplates[selectedTemplateId] || resumeTemplates.atsClassic;
  const colors = {
    ...baseTheme.colors,
    ...(customAccentColor ? { accent: customAccentColor, bannerBg: customAccentColor, frameBorder: customAccentColor } : {})
  };
  const fonts = {
    heading: customFontFamily || baseTheme.fonts.heading,
    body: customFontFamily || baseTheme.fonts.body
  };
  const { layout } = baseTheme;

  // Extract resume data with clean fallbacks for placeholder state
  const personal = resumeData?.personalInfo || resumeData?.personal || {};
  const name = resumeData?.fullName || personal?.fullName || 'Your Name';
  const role = resumeData?.targetRole || resumeData?.jobTitle || personal?.jobTitle || '';
  const email = resumeData?.email || personal?.email || '';
  const phone = resumeData?.phone || personal?.phone || '';
  const location = resumeData?.location || personal?.location || '';
  const linkedin = resumeData?.linkedin || personal?.linkedin || '';
  const github = resumeData?.github || personal?.github || '';

  const summary = (resumeData?.summary || resumeData?.professionalSummary || personal?.summary || '').trim();
  const skills = Array.isArray(resumeData?.skills) ? resumeData.skills.filter(Boolean) : [];
  const experiences = Array.isArray(resumeData?.experiences) ? resumeData.experiences.filter(e => e.company || e.role) : [];
  const projects = Array.isArray(resumeData?.projects) ? resumeData.projects.filter(p => p.name) : [];
  const education = Array.isArray(resumeData?.education) ? resumeData.education.filter(e => e.degree || e.institution) : [];

  // Helper for Dual-tone Name Title (Photo 4)
  const nameParts = name.split(' ');
  const firstName = nameParts[0] || name;
  const lastName = nameParts.slice(1).join(' ');

  // =========================================================================
  // LAYOUT 1: ATS CLASSIC (Corporate Royal Blue)
  // =========================================================================
  if (layout === 'singleColumn') {
    return (
      <div
        id="resume-pdf-content"
        style={{
          background: colors.background,
          color: colors.text,
          fontFamily: fonts.body,
          padding: '40px 48px',
          minHeight: '842px',
          borderRadius: '12px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
          border: `1px solid ${colors.border}`,
          lineHeight: '1.5'
        }}
      >
        <div style={{ marginBottom: '24px', borderBottom: `2.5px solid ${colors.accent}`, paddingBottom: '16px' }}>
          <h1 style={{ fontFamily: fonts.heading, fontSize: '2.2rem', fontWeight: '800', color: colors.accent, marginBottom: '4px', letterSpacing: '-0.5px' }}>
            {name}
          </h1>
          <div style={{ fontSize: '1.1rem', fontWeight: '700', color: colors.textMuted, marginBottom: '10px' }}>
            {role}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '0.85rem', color: colors.textMuted }}>
            {email && <span>📧 {email}</span>}
            {phone && <span>📞 {phone}</span>}
            {location && <span>📍 {location}</span>}
            {linkedin && <span>🔗 {linkedin}</span>}
            {github && <span>💻 {github}</span>}
          </div>
        </div>

        {summary ? (
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontFamily: fonts.heading, fontSize: '1.05rem', fontWeight: '800', color: colors.accent, textTransform: 'uppercase', letterSpacing: '0.8px', borderBottom: `1.5px solid ${colors.border}`, paddingBottom: '4px', marginBottom: '8px' }}>
              Professional Summary
            </h3>
            <p style={{ fontSize: '0.9rem', color: colors.text, lineHeight: '1.6' }}>{summary}</p>
          </div>
        ) : null}

        {skills.length > 0 ? (
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontFamily: fonts.heading, fontSize: '1.05rem', fontWeight: '800', color: colors.accent, textTransform: 'uppercase', letterSpacing: '0.8px', borderBottom: `1.5px solid ${colors.border}`, paddingBottom: '4px', marginBottom: '8px' }}>
              Technical & Industry Skills
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {skills.map((skill, i) => (
                <span key={i} style={{ background: '#f1f5f9', color: colors.text, border: `1px solid ${colors.border}`, padding: '3px 10px', borderRadius: '4px', fontSize: '0.82rem', fontWeight: '600' }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        {experiences.length > 0 ? (
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontFamily: fonts.heading, fontSize: '1.05rem', fontWeight: '800', color: colors.accent, textTransform: 'uppercase', letterSpacing: '0.8px', borderBottom: `1.5px solid ${colors.border}`, paddingBottom: '4px', marginBottom: '12px' }}>
              Work Experience
            </h3>
            {experiences.map((exp, i) => (
              <div key={i} style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                  <strong style={{ fontSize: '0.98rem', color: colors.text }}>{exp.role}</strong>
                  <span style={{ fontSize: '0.82rem', color: colors.textMuted, fontWeight: '600' }}>{exp.dates}</span>
                </div>
                <div style={{ fontSize: '0.88rem', color: colors.accent, fontWeight: '700', marginBottom: '6px' }}>{exp.company}</div>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.86rem', color: colors.text }}>
                  {exp.bullets?.map((bullet, idx) => (
                    <li key={idx} style={{ marginBottom: '4px', lineHeight: '1.5' }}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : null}

        {projects.length > 0 ? (
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontFamily: fonts.heading, fontSize: '1.05rem', fontWeight: '800', color: colors.accent, textTransform: 'uppercase', letterSpacing: '0.8px', borderBottom: `1.5px solid ${colors.border}`, paddingBottom: '4px', marginBottom: '10px' }}>
              Key Projects
            </h3>
            {projects.map((proj, i) => (
              <div key={i} style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <strong style={{ fontSize: '0.94rem', color: colors.text }}>{proj.name}</strong>
                  {proj.link && <span style={{ fontSize: '0.8rem', color: colors.textMuted }}>{proj.link}</span>}
                </div>
                {proj.techStack && (
                  <div style={{ fontSize: '0.8rem', fontStyle: 'italic', color: colors.accent, marginBottom: '2px' }}>
                    Tech Stack: {proj.techStack}
                  </div>
                )}
                {proj.description && (
                  <p style={{ fontSize: '0.86rem', color: colors.text, margin: 0, lineHeight: '1.5' }}>{proj.description}</p>
                )}
              </div>
            ))}
          </div>
        ) : null}

        {education.length > 0 ? (
          <div>
            <h3 style={{ fontFamily: fonts.heading, fontSize: '1.05rem', fontWeight: '800', color: colors.accent, textTransform: 'uppercase', letterSpacing: '0.8px', borderBottom: `1.5px solid ${colors.border}`, paddingBottom: '4px', marginBottom: '8px' }}>
              Education
            </h3>
            {education.map((edu, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                <div>
                  <strong>{edu.degree}</strong> — <span style={{ color: colors.textMuted }}>{edu.institution}</span>
                </div>
                <span style={{ color: colors.textMuted, fontWeight: '600' }}>{edu.year}</span>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }

  // =========================================================================
  // LAYOUT 2: CANVA STEEL SLANTED (Photo 1 Cut & Round Timeline)
  // =========================================================================
  if (layout === 'layoutSlantedCut') {
    return (
      <div
        id="resume-pdf-content"
        style={{
          background: colors.background,
          color: colors.text,
          fontFamily: fonts.body,
          minHeight: '842px',
          borderRadius: '12px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
          border: `1px solid ${colors.border}`,
          display: 'grid',
          gridTemplateColumns: '270px 1fr',
          overflow: 'hidden'
        }}
      >
        {/* Left Column with Slanted Top Cut Accent */}
        <div style={{ background: colors.sidebar, padding: '0 24px 32px 24px', borderRight: `1px solid ${colors.border}`, position: 'relative' }}>
          {/* Slanted Steel Cut */}
          <div style={{ background: colors.accent, margin: '0 -24px 24px -24px', padding: '36px 24px 28px 24px', color: '#ffffff', clipPath: 'polygon(0 0, 100% 0, 100% 82%, 0 100%)' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#ffffff', border: '3px solid rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', fontWeight: '900', color: colors.accent, marginBottom: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
              {name.charAt(0)}
            </div>
            <h1 style={{ fontFamily: fonts.heading, fontSize: '1.6rem', fontWeight: '800', margin: '0 0 4px 0', lineHeight: '1.2', color: '#ffffff' }}>
              {name}
            </h1>
            <div style={{ fontSize: '0.88rem', fontWeight: '700', color: '#e0f2fe' }}>{role}</div>
          </div>

          {/* Contact */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', color: colors.accent, borderBottom: `1.5px solid ${colors.accent}44`, paddingBottom: '4px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              📞 Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem', color: colors.text }}>
              {email && <span>📧 {email}</span>}
              {phone && <span>📞 {phone}</span>}
              {location && <span>📍 {location}</span>}
              {linkedin && <span style={{ wordBreak: 'break-all' }}>🔗 {linkedin}</span>}
              {github && <span style={{ wordBreak: 'break-all' }}>💻 {github}</span>}
            </div>
          </div>

          {/* About Me */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', color: colors.accent, borderBottom: `1.5px solid ${colors.accent}44`, paddingBottom: '4px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              👤 About Me
            </h4>
            <p style={{ fontSize: '0.8rem', color: colors.textMuted, lineHeight: '1.5', margin: 0 }}>{summary}</p>
          </div>

          {/* Skills */}
          <div>
            <h4 style={{ fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', color: colors.accent, borderBottom: `1.5px solid ${colors.accent}44`, paddingBottom: '4px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              🛠️ Skills
            </h4>
            <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.82rem', color: colors.text }}>
              {skills.map((s, i) => (
                <li key={i} style={{ marginBottom: '4px', fontWeight: '600' }}>{s}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Main Column with Round Timeline Dots */}
        <div style={{ padding: '36px 36px', background: colors.surface }}>
          {/* Education Section */}
          <div style={{ marginBottom: '28px' }}>
            <h3 style={{ fontFamily: fonts.heading, fontSize: '1.1rem', fontWeight: '800', color: colors.accent, borderBottom: `2px solid ${colors.accent}33`, paddingBottom: '6px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              🎓 Education
            </h3>
            <div style={{ position: 'relative', paddingLeft: '18px', borderLeft: `2px solid ${colors.accent}44` }}>
              {education.map((edu, i) => (
                <div key={i} style={{ position: 'relative', marginBottom: '14px' }}>
                  <div style={{ position: 'absolute', left: '-23px', top: '5px', width: '8px', height: '8px', borderRadius: '50%', background: colors.accent, border: '2px solid #ffffff' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <strong style={{ fontSize: '0.94rem', color: colors.text }}>{edu.degree}</strong>
                    <span style={{ fontSize: '0.78rem', color: colors.textMuted, fontWeight: '600' }}>{edu.year}</span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: colors.accent, fontWeight: '700' }}>{edu.institution}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Work Experience Section with Round Dots */}
          <div>
            <h3 style={{ fontFamily: fonts.heading, fontSize: '1.1rem', fontWeight: '800', color: colors.accent, borderBottom: `2px solid ${colors.accent}33`, paddingBottom: '6px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              💼 Experience
            </h3>
            <div style={{ position: 'relative', paddingLeft: '18px', borderLeft: `2px solid ${colors.accent}44` }}>
              {experiences.map((exp, i) => (
                <div key={i} style={{ position: 'relative', marginBottom: '20px' }}>
                  <div style={{ position: 'absolute', left: '-23px', top: '5px', width: '8px', height: '8px', borderRadius: '50%', background: colors.accent, border: '2px solid #ffffff' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <strong style={{ fontSize: '0.96rem', color: colors.text }}>{exp.role}</strong>
                    <span style={{ fontSize: '0.78rem', color: colors.textMuted, fontWeight: '600' }}>{exp.dates}</span>
                  </div>
                  <div style={{ fontSize: '0.84rem', color: colors.accent, fontWeight: '700', marginBottom: '6px' }}>{exp.company}</div>
                  <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.84rem', color: colors.textMuted }}>
                    {exp.bullets?.map((b, idx) => (
                      <li key={idx} style={{ marginBottom: '4px' }}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // LAYOUT 3: CANVA DEEP PLUM BANNER (Photo 2 Square Timeline Nodes)
  // =========================================================================
  if (layout === 'layoutPlumBanner') {
    return (
      <div
        id="resume-pdf-content"
        style={{
          background: colors.background,
          color: colors.text,
          fontFamily: fonts.body,
          minHeight: '842px',
          borderRadius: '12px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
          border: `1px solid ${colors.border}`,
          overflow: 'hidden'
        }}
      >
        {/* Top Header Grid: Avatar Left + Plum Banner Right */}
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr' }}>
          <div style={{ background: colors.sidebar, padding: '24px 20px', display: 'flex', alignItems: 'center', gap: '14px', borderRight: `1px solid ${colors.border}` }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: colors.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: '900', color: '#ffffff', boxShadow: '0 4px 10px rgba(74, 35, 66, 0.2)' }}>
              {name.charAt(0)}
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: colors.accent, letterSpacing: '0.8px' }}>Resume</div>
            </div>
          </div>

          <div style={{ background: colors.bannerBg, padding: '24px 32px', color: '#ffffff', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h1 style={{ fontFamily: fonts.heading, fontSize: '1.8rem', fontWeight: '800', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>
              {name}
            </h1>
            <div style={{ fontSize: '0.9rem', color: '#e4dbe0', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.8px', marginTop: '2px' }}>
              {role}
            </div>
          </div>
        </div>

        {/* 2-Column Body */}
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', minHeight: '740px' }}>
          {/* Left Plum Tint Sidebar */}
          <div style={{ background: colors.sidebar, padding: '28px 20px', borderRight: `1px solid ${colors.border}` }}>
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '0.78rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', color: colors.accent, borderBottom: `1.5px solid ${colors.accent}`, paddingBottom: '4px', marginBottom: '10px' }}>
                Contact
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem', color: colors.text }}>
                {phone && <span>📞 {phone}</span>}
                {email && <span>📧 {email}</span>}
                {location && <span>📍 {location}</span>}
                {linkedin && <span style={{ wordBreak: 'break-all' }}>🔗 {linkedin}</span>}
                {github && <span style={{ wordBreak: 'break-all' }}>💻 {github}</span>}
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '0.78rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', color: colors.accent, borderBottom: `1.5px solid ${colors.accent}`, paddingBottom: '4px', marginBottom: '10px' }}>
                Tech Skills
              </h4>
              <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.8rem', color: colors.text }}>
                {skills.map((s, i) => (
                  <li key={i} style={{ marginBottom: '4px', fontWeight: '600' }}>{s}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Main Content with Square Timeline Nodes */}
          <div style={{ padding: '28px 36px', background: colors.surface }}>
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontFamily: fonts.heading, fontSize: '1.05rem', fontWeight: '800', color: colors.accent, borderBottom: `1.5px solid ${colors.border}`, paddingBottom: '4px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                👤 PROFILE
              </h3>
              <p style={{ fontSize: '0.88rem', color: colors.text, lineHeight: '1.6' }}>{summary}</p>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontFamily: fonts.heading, fontSize: '1.05rem', fontWeight: '800', color: colors.accent, borderBottom: `1.5px solid ${colors.border}`, paddingBottom: '4px', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                🎓 EDUCATION
              </h3>
              <div style={{ position: 'relative', paddingLeft: '18px', borderLeft: `2px solid ${colors.accent}` }}>
                {education.map((edu, i) => (
                  <div key={i} style={{ position: 'relative', marginBottom: '14px' }}>
                    {/* Square Node */}
                    <div style={{ position: 'absolute', left: '-23px', top: '5px', width: '8px', height: '8px', background: colors.accent }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <strong style={{ fontSize: '0.94rem', color: colors.text }}>{edu.degree}</strong>
                      <span style={{ fontSize: '0.78rem', color: colors.textMuted, fontWeight: '600' }}>{edu.year}</span>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: colors.accent, fontWeight: '700' }}>{edu.institution}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 style={{ fontFamily: fonts.heading, fontSize: '1.05rem', fontWeight: '800', color: colors.accent, borderBottom: `1.5px solid ${colors.border}`, paddingBottom: '4px', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                💼 PROJECTS & EXPERIENCE
              </h3>
              <div style={{ position: 'relative', paddingLeft: '18px', borderLeft: `2px solid ${colors.accent}` }}>
                {experiences.map((exp, i) => (
                  <div key={i} style={{ position: 'relative', marginBottom: '18px' }}>
                    {/* Square Node */}
                    <div style={{ position: 'absolute', left: '-23px', top: '5px', width: '8px', height: '8px', background: colors.accent }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <strong style={{ fontSize: '0.96rem', color: colors.text }}>{exp.role}</strong>
                      <span style={{ fontSize: '0.78rem', color: colors.textMuted, fontWeight: '600' }}>{exp.dates}</span>
                    </div>
                    <div style={{ fontSize: '0.84rem', color: colors.accent, fontWeight: '700', marginBottom: '4px' }}>{exp.company}</div>
                    <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.84rem', color: colors.text }}>
                      {exp.bullets?.map((b, idx) => (
                        <li key={idx} style={{ marginBottom: '4px' }}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // LAYOUT 4: CANVA CENTER SPLIT (Photo 3 Full Height Vertical Center Divider)
  // =========================================================================
  if (layout === 'layoutCenterSplit') {
    return (
      <div
        id="resume-pdf-content"
        style={{
          background: colors.background,
          color: colors.text,
          fontFamily: fonts.body,
          padding: '40px 48px',
          minHeight: '842px',
          borderRadius: '12px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
          border: `1px solid ${colors.border}`
        }}
      >
        {/* Centered Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px', borderBottom: `1.5px solid ${colors.border}`, paddingBottom: '16px' }}>
          <h1 style={{ fontFamily: fonts.heading, fontSize: '2.3rem', fontWeight: '800', color: '#0f172a', margin: '0 0 4px 0', letterSpacing: '-0.5px' }}>
            {name}
          </h1>
          <div style={{ fontSize: '1.05rem', fontWeight: '700', color: colors.accent, marginBottom: '12px' }}>
            {role}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '12px', fontSize: '0.84rem', color: colors.textMuted }}>
            {location && <span>📍 {location}</span>}
            {email && <span>📧 {email}</span>}
            {phone && <span>📞 {phone}</span>}
            {linkedin && <span>🔗 {linkedin}</span>}
            {github && <span>💻 {github}</span>}
          </div>
        </div>

        {/* 2-Column Layout with Full Height Solid Center Vertical Border */}
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr' }}>
          {/* Left Column */}
          <div style={{ paddingRight: '28px', borderRight: `1.5px solid ${colors.border}` }}>
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontFamily: fonts.heading, fontSize: '0.95rem', fontWeight: '800', color: colors.accent, textTransform: 'uppercase', letterSpacing: '1px', borderBottom: `1.5px solid ${colors.border}`, paddingBottom: '4px', marginBottom: '12px' }}>
                EDUCATION:
              </h3>
              {education.map((edu, i) => (
                <div key={i} style={{ fontSize: '0.84rem', marginBottom: '12px' }}>
                  <strong style={{ display: 'block', color: colors.text }}>{edu.institution}</strong>
                  <div style={{ fontSize: '0.78rem', color: colors.textMuted, fontWeight: '600' }}>{edu.year}</div>
                  <div style={{ color: colors.accent, fontWeight: '700' }}>{edu.degree}</div>
                </div>
              ))}
            </div>

            <div>
              <h3 style={{ fontFamily: fonts.heading, fontSize: '0.95rem', fontWeight: '800', color: colors.accent, textTransform: 'uppercase', letterSpacing: '1px', borderBottom: `1.5px solid ${colors.border}`, paddingBottom: '4px', marginBottom: '12px' }}>
                SKILLS:
              </h3>
              <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.84rem', color: colors.text }}>
                {skills.map((s, i) => (
                  <li key={i} style={{ marginBottom: '4px', fontWeight: '600' }}>{s}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column */}
          <div style={{ paddingLeft: '28px' }}>
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontFamily: fonts.heading, fontSize: '0.95rem', fontWeight: '800', color: colors.accent, textTransform: 'uppercase', letterSpacing: '1px', borderBottom: `1.5px solid ${colors.border}`, paddingBottom: '4px', marginBottom: '10px' }}>
                SUMMARY:
              </h3>
              <p style={{ fontSize: '0.88rem', color: colors.text, lineHeight: '1.6' }}>{summary}</p>
            </div>

            <div>
              <h3 style={{ fontFamily: fonts.heading, fontSize: '0.95rem', fontWeight: '800', color: colors.accent, textTransform: 'uppercase', letterSpacing: '1px', borderBottom: `1.5px solid ${colors.border}`, paddingBottom: '4px', marginBottom: '12px' }}>
                EXPERIENCE:
              </h3>
              {experiences.map((exp, i) => (
                <div key={i} style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <strong style={{ fontSize: '0.95rem', color: colors.text, textTransform: 'uppercase' }}>{exp.role}</strong>
                    <span style={{ fontSize: '0.78rem', color: colors.textMuted, fontWeight: '700' }}>{exp.dates}</span>
                  </div>
                  <div style={{ fontSize: '0.84rem', color: colors.accent, fontWeight: '700', marginBottom: '4px' }}>{exp.company}</div>
                  <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.84rem', color: colors.text }}>
                    {exp.bullets?.map((b, idx) => (
                      <li key={idx} style={{ marginBottom: '4px' }}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // LAYOUT 5: CANVA DUAL-TONE MINIMAL (Photo 4 Style Bold/Light Typography & Lines)
  // =========================================================================
  if (layout === 'layoutDualTone') {
    return (
      <div
        id="resume-pdf-content"
        style={{
          background: colors.background,
          color: colors.text,
          fontFamily: fonts.body,
          padding: '40px 48px',
          minHeight: '842px',
          borderRadius: '12px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
          border: `1px solid ${colors.border}`
        }}
      >
        {/* Header with Dual Tone Typography */}
        <div style={{ marginBottom: '28px', borderBottom: `2px solid ${colors.border}`, paddingBottom: '18px' }}>
          <h1 style={{ fontFamily: fonts.heading, fontSize: '2.4rem', margin: '0 0 2px 0', letterSpacing: '1px' }}>
            <span style={{ fontWeight: '900', color: '#0f172a' }}>{firstName.toUpperCase()} </span>
            <span style={{ fontWeight: '300', color: colors.accent }}>{lastName.toUpperCase()}</span>
          </h1>
          <div style={{ fontSize: '1rem', fontWeight: '700', color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '1.5px' }}>
            {role}
          </div>
        </div>

        {/* 2-Column Content */}
        <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '32px' }}>
          {/* Left Column */}
          <div>
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '0.88rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', color: '#0f172a', borderBottom: `1.5px solid ${colors.border}`, paddingBottom: '4px', marginBottom: '10px' }}>
                CONTACT
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.82rem', color: colors.text }}>
                <span>📞 {phone}</span>
                <span>📧 {email}</span>
                <span>📍 {location}</span>
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '0.88rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', color: '#0f172a', borderBottom: `1.5px solid ${colors.border}`, paddingBottom: '4px', marginBottom: '10px' }}>
                EDUCATION
              </h4>
              {education.map((edu, i) => (
                <div key={i} style={{ fontSize: '0.82rem', marginBottom: '10px' }}>
                  <div style={{ fontWeight: '700', color: colors.textMuted }}>{edu.year}</div>
                  <strong style={{ color: colors.text }}>{edu.institution}</strong>
                  <div style={{ color: colors.accent, fontWeight: '600' }}>{edu.degree}</div>
                </div>
              ))}
            </div>

            <div>
              <h4 style={{ fontSize: '0.88rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', color: '#0f172a', borderBottom: `1.5px solid ${colors.border}`, paddingBottom: '4px', marginBottom: '10px' }}>
                SKILLS
              </h4>
              <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.82rem', color: colors.text }}>
                {skills.map((s, i) => (
                  <li key={i} style={{ marginBottom: '4px', fontWeight: '600' }}>{s}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column */}
          <div>
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontFamily: fonts.heading, fontSize: '0.98rem', fontWeight: '800', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: `1.5px solid ${colors.border}`, paddingBottom: '4px', marginBottom: '10px' }}>
                PROFILE
              </h3>
              <p style={{ fontSize: '0.88rem', color: colors.text, lineHeight: '1.6' }}>{summary}</p>
            </div>

            <div>
              <h3 style={{ fontFamily: fonts.heading, fontSize: '0.98rem', fontWeight: '800', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: `1.5px solid ${colors.border}`, paddingBottom: '4px', marginBottom: '14px' }}>
                WORK EXPERIENCE
              </h3>
              <div style={{ position: 'relative', paddingLeft: '16px', borderLeft: `2px solid ${colors.border}` }}>
                {experiences.map((exp, i) => (
                  <div key={i} style={{ position: 'relative', marginBottom: '18px' }}>
                    <div style={{ position: 'absolute', left: '-21px', top: '5px', width: '8px', height: '8px', borderRadius: '50%', background: colors.accent }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <strong style={{ fontSize: '0.95rem', color: colors.text }}>{exp.company}</strong>
                      <span style={{ fontSize: '0.78rem', color: colors.textMuted, fontWeight: '700' }}>{exp.dates}</span>
                    </div>
                    <div style={{ fontSize: '0.84rem', color: colors.accent, fontWeight: '700', marginBottom: '4px' }}>{exp.role}</div>
                    <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.84rem', color: colors.text }}>
                      {exp.bullets?.map((b, idx) => (
                        <li key={idx} style={{ marginBottom: '4px' }}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // LAYOUT 6: CANVA DOUBLE GOLD FRAME (Double Outer Border Frame)
  // =========================================================================
  if (layout === 'layoutDoubleFrame') {
    return (
      <div
        id="resume-pdf-content"
        style={{
          background: colors.background,
          color: colors.text,
          fontFamily: fonts.body,
          padding: '36px 44px',
          minHeight: '842px',
          borderRadius: '12px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
          border: `3px double ${colors.accent}`, // Double Gold Outer Frame!
          lineHeight: '1.6'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '24px', borderBottom: `2px solid ${colors.accent}`, paddingBottom: '16px' }}>
          <h1 style={{ fontFamily: fonts.heading, fontSize: '2.3rem', fontWeight: '700', color: colors.accent, margin: '0 0 4px 0', letterSpacing: '0.5px' }}>
            {name}
          </h1>
          <div style={{ fontSize: '1.05rem', fontWeight: '600', color: colors.text, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '10px' }}>
            {role}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px', fontSize: '0.84rem', color: colors.textMuted }}>
            <span>📧 {email}</span>
            <span>•</span>
            <span>📞 {phone}</span>
            <span>•</span>
            <span>📍 {location}</span>
          </div>
        </div>

        <div style={{ marginBottom: '22px' }}>
          <h3 style={{ fontFamily: fonts.heading, fontSize: '1.05rem', fontWeight: '700', color: colors.accent, textTransform: 'uppercase', letterSpacing: '1px', borderBottom: `1px solid ${colors.border}`, paddingBottom: '4px', marginBottom: '8px' }}>
            Executive Summary
          </h3>
          <p style={{ fontSize: '0.9rem', color: colors.text, lineHeight: '1.6' }}>{summary}</p>
        </div>

        <div style={{ marginBottom: '22px' }}>
          <h3 style={{ fontFamily: fonts.heading, fontSize: '1.05rem', fontWeight: '700', color: colors.accent, textTransform: 'uppercase', letterSpacing: '1px', borderBottom: `1px solid ${colors.border}`, paddingBottom: '4px', marginBottom: '10px' }}>
            Core Competencies
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {skills.map((s, i) => (
              <span key={i} style={{ background: '#fff', color: '#b45309', border: '1px solid #fde68a', padding: '4px 12px', borderRadius: '4px', fontSize: '0.82rem', fontWeight: '600' }}>
                {s}
              </span>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '22px' }}>
          <h3 style={{ fontFamily: fonts.heading, fontSize: '1.05rem', fontWeight: '700', color: colors.accent, textTransform: 'uppercase', letterSpacing: '1px', borderBottom: `1px solid ${colors.border}`, paddingBottom: '4px', marginBottom: '12px' }}>
            Professional Experience
          </h3>
          {experiences.map((exp, i) => (
            <div key={i} style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: '0.98rem', color: colors.text }}>{exp.role}</strong>
                <span style={{ fontSize: '0.82rem', color: colors.textMuted, fontWeight: '600' }}>{exp.dates}</span>
              </div>
              <div style={{ fontSize: '0.86rem', color: colors.accent, fontWeight: '700', marginBottom: '6px' }}>{exp.company}</div>
              <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.86rem', color: colors.text }}>
                {exp.bullets?.map((b, idx) => (
                  <li key={idx} style={{ marginBottom: '4px' }}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div>
          <h3 style={{ fontFamily: fonts.heading, fontSize: '1.05rem', fontWeight: '700', color: colors.accent, textTransform: 'uppercase', letterSpacing: '1px', borderBottom: `1px solid ${colors.border}`, paddingBottom: '4px', marginBottom: '10px' }}>
            Education & Credentials
          </h3>
          {education.map((edu, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
              <div>
                <strong>{edu.degree}</strong> — <span style={{ color: colors.textMuted }}>{edu.institution}</span>
              </div>
              <span style={{ color: colors.textMuted, fontWeight: '600' }}>{edu.year}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // =========================================================================
  // LAYOUT 8: CANVA GLASS CARDS (Emerald Section Cards with 3.5px Top Accent Bar)
  // =========================================================================
  if (layout === 'layoutGlassCards') {
    return (
      <div
        id="resume-pdf-content"
        style={{
          background: colors.background,
          color: colors.text,
          fontFamily: fonts.body,
          padding: '36px 40px',
          minHeight: '842px',
          borderRadius: '12px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
          border: `1px solid ${colors.border}`
        }}
      >
        <div style={{ background: colors.surface, padding: '24px 28px', borderRadius: '14px', border: `1px solid ${colors.border}`, borderTop: `4px solid ${colors.accent}`, marginBottom: '20px' }}>
          <h1 style={{ fontFamily: fonts.heading, fontSize: '2.1rem', fontWeight: '800', color: colors.text, margin: '0 0 4px 0' }}>
            {name}
          </h1>
          <div style={{ fontSize: '1rem', fontWeight: '700', color: colors.accent, marginBottom: '10px' }}>{role}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', fontSize: '0.84rem', color: colors.textMuted }}>
            <span>📧 {email}</span>
            <span>📞 {phone}</span>
            <span>📍 {location}</span>
          </div>
        </div>

        <div style={{ background: colors.surface, padding: '20px 24px', borderRadius: '14px', border: `1px solid ${colors.border}`, borderTop: `3.5px solid ${colors.accent}`, marginBottom: '20px' }}>
          <h3 style={{ fontFamily: fonts.heading, fontSize: '1rem', fontWeight: '800', color: colors.accent, marginBottom: '8px' }}>
            Summary
          </h3>
          <p style={{ fontSize: '0.88rem', color: colors.text, lineHeight: '1.6', margin: 0 }}>{summary}</p>
        </div>

        <div style={{ background: colors.surface, padding: '20px 24px', borderRadius: '14px', border: `1px solid ${colors.border}`, borderTop: `3.5px solid ${colors.accent}`, marginBottom: '20px' }}>
          <h3 style={{ fontFamily: fonts.heading, fontSize: '1rem', fontWeight: '800', color: colors.accent, marginBottom: '10px' }}>
            Technical Expertise
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {skills.map((s, i) => (
              <span key={i} style={{ background: '#ecfdf5', color: '#047857', border: '1px solid #a7f3d0', padding: '4px 10px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '700' }}>
                ✓ {s}
              </span>
            ))}
          </div>
        </div>

        <div style={{ background: colors.surface, padding: '20px 24px', borderRadius: '14px', border: `1px solid ${colors.border}`, borderTop: `3.5px solid ${colors.accent}` }}>
          <h3 style={{ fontFamily: fonts.heading, fontSize: '1rem', fontWeight: '800', color: colors.accent, marginBottom: '12px' }}>
            Work Experience
          </h3>
          {experiences.map((exp, i) => (
            <div key={i} style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: '0.94rem', color: colors.text }}>{exp.role}</strong>
                <span style={{ fontSize: '0.78rem', color: colors.accent, fontWeight: '700' }}>{exp.dates}</span>
              </div>
              <div style={{ fontSize: '0.84rem', color: colors.textMuted, fontWeight: '700', marginBottom: '4px' }}>{exp.company}</div>
              <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.84rem', color: colors.text }}>
                {exp.bullets?.map((b, idx) => (
                  <li key={idx} style={{ marginBottom: '3px' }}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // =========================================================================
  // LAYOUT 9: CANVA DASHED CREATIVE (Dashed 2px Section Dividers & Purple Dot Bullets)
  // =========================================================================
  if (layout === 'layoutDashedCreative') {
    return (
      <div
        id="resume-pdf-content"
        style={{
          background: colors.background,
          color: colors.text,
          fontFamily: fonts.body,
          padding: '40px 48px',
          minHeight: '842px',
          borderRadius: '12px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
          border: `1px solid ${colors.border}`
        }}
      >
        <div style={{ marginBottom: '24px', borderBottom: `2px dashed ${colors.accent}`, paddingBottom: '16px' }}>
          <h1 style={{ fontFamily: fonts.heading, fontSize: '2.2rem', fontWeight: '800', color: colors.accent, margin: '0 0 4px 0' }}>
            {name}
          </h1>
          <div style={{ fontSize: '1.05rem', fontWeight: '700', color: colors.textMuted, marginBottom: '10px' }}>{role}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '0.84rem', color: colors.textMuted }}>
            <span>📧 {email}</span>
            <span>📞 {phone}</span>
            <span>📍 {location}</span>
          </div>
        </div>

        <div style={{ marginBottom: '22px' }}>
          <h3 style={{ fontFamily: fonts.heading, fontSize: '1.05rem', fontWeight: '800', color: colors.accent, borderBottom: `2px dashed ${colors.border}`, paddingBottom: '4px', marginBottom: '8px' }}>
            Professional Summary
          </h3>
          <p style={{ fontSize: '0.9rem', color: colors.text, lineHeight: '1.6' }}>{summary}</p>
        </div>

        <div style={{ marginBottom: '22px' }}>
          <h3 style={{ fontFamily: fonts.heading, fontSize: '1.05rem', fontWeight: '800', color: colors.accent, borderBottom: `2px dashed ${colors.border}`, paddingBottom: '4px', marginBottom: '10px' }}>
            Key Skills
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {skills.map((s, i) => (
              <span key={i} style={{ background: '#faf5ff', color: '#7e22ce', border: '1px dashed #d8b4fe', padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '700' }}>
                • {s}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 style={{ fontFamily: fonts.heading, fontSize: '1.05rem', fontWeight: '800', color: colors.accent, borderBottom: `2px dashed ${colors.border}`, paddingBottom: '4px', marginBottom: '12px' }}>
            Work Experience
          </h3>
          {experiences.map((exp, i) => (
            <div key={i} style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: '0.96rem', color: colors.text }}>{exp.role}</strong>
                <span style={{ fontSize: '0.8rem', color: colors.accent, fontWeight: '700' }}>{exp.dates}</span>
              </div>
              <div style={{ fontSize: '0.84rem', color: colors.textMuted, fontWeight: '700', marginBottom: '6px' }}>{exp.company}</div>
              <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.85rem', color: colors.text }}>
                {exp.bullets?.map((b, idx) => (
                  <li key={idx} style={{ marginBottom: '4px' }}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // =========================================================================
  // LAYOUT 10: CANVA LEFT RIBBON (6px Solid Left Crimson Edge Ribbon)
  // =========================================================================
  if (layout === 'layoutLeftRibbon') {
    return (
      <div
        id="resume-pdf-content"
        style={{
          background: colors.background,
          color: colors.text,
          fontFamily: fonts.body,
          padding: '40px 48px',
          minHeight: '842px',
          borderRadius: '12px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
          border: `1px solid ${colors.border}`,
          borderLeft: `7px solid ${colors.accent}`, // 7px Solid Crimson Left Ribbon!
          lineHeight: '1.5'
        }}
      >
        <div style={{ marginBottom: '24px', borderBottom: `2px solid ${colors.accent}`, paddingBottom: '16px' }}>
          <h1 style={{ fontFamily: fonts.heading, fontSize: '2.3rem', fontWeight: '900', color: colors.accent, margin: '0 0 4px 0', letterSpacing: '-0.5px' }}>
            {name}
          </h1>
          <div style={{ fontSize: '1.05rem', fontWeight: '700', color: colors.textMuted, marginBottom: '10px' }}>{role}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '0.85rem', color: colors.textMuted }}>
            <span>📧 {email}</span>
            <span>📞 {phone}</span>
            <span>📍 {location}</span>
            {linkedin && <span>🔗 {linkedin}</span>}
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ fontFamily: fonts.heading, fontSize: '1.05rem', fontWeight: '800', color: colors.accent, textTransform: 'uppercase', letterSpacing: '0.8px', borderBottom: `1.5px solid ${colors.border}`, paddingBottom: '4px', marginBottom: '8px' }}>
            Professional Summary
          </h3>
          <p style={{ fontSize: '0.9rem', color: colors.text, lineHeight: '1.6' }}>{summary}</p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ fontFamily: fonts.heading, fontSize: '1.05rem', fontWeight: '800', color: colors.accent, textTransform: 'uppercase', letterSpacing: '0.8px', borderBottom: `1.5px solid ${colors.border}`, paddingBottom: '4px', marginBottom: '10px' }}>
            Core Skills
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {skills.map((s, i) => (
              <span key={i} style={{ background: '#fff1f2', color: '#be123c', border: '1px solid #fecdd3', padding: '4px 10px', borderRadius: '4px', fontSize: '0.82rem', fontWeight: '700' }}>
                {s}
              </span>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ fontFamily: fonts.heading, fontSize: '1.05rem', fontWeight: '800', color: colors.accent, textTransform: 'uppercase', letterSpacing: '0.8px', borderBottom: `1.5px solid ${colors.border}`, paddingBottom: '4px', marginBottom: '12px' }}>
            Work Experience
          </h3>
          {experiences.map((exp, i) => (
            <div key={i} style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: '0.96rem', color: colors.text }}>{exp.role}</strong>
                <span style={{ fontSize: '0.8rem', color: colors.accent, fontWeight: '700' }}>{exp.dates}</span>
              </div>
              <div style={{ fontSize: '0.84rem', color: colors.textMuted, fontWeight: '700', marginBottom: '6px' }}>{exp.company}</div>
              <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.85rem', color: colors.text }}>
                {exp.bullets?.map((b, idx) => (
                  <li key={idx} style={{ marginBottom: '4px' }}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div>
          <h3 style={{ fontFamily: fonts.heading, fontSize: '1.05rem', fontWeight: '800', color: colors.accent, textTransform: 'uppercase', letterSpacing: '0.8px', borderBottom: `1.5px solid ${colors.border}`, paddingBottom: '4px', marginBottom: '8px' }}>
            Education
          </h3>
          {education.map((edu, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
              <div>
                <strong>{edu.degree}</strong> — <span style={{ color: colors.textMuted }}>{edu.institution}</span>
              </div>
              <span style={{ color: colors.textMuted, fontWeight: '600' }}>{edu.year}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // =========================================================================
  // LAYOUT 11: OXFORD CLASSIC (Traditional Serif Headings & Left-Border Highlights)
  // =========================================================================
  if (layout === 'oxfordClassic') {
    return (
      <div
        id="resume-pdf-content"
        style={{
          background: colors.background,
          color: colors.text,
          fontFamily: fonts.body,
          padding: '44px 50px',
          minHeight: '842px',
          borderRadius: '12px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
          border: `1px solid ${colors.border}`,
          lineHeight: '1.5'
        }}
      >
        {/* Header section - Traditional Left Align with Navy Divider line */}
        <div style={{ marginBottom: '24px', borderBottom: `2px solid ${colors.accent}`, paddingBottom: '14px' }}>
          <h1 style={{ fontFamily: fonts.heading, fontSize: '2.1rem', fontWeight: '700', color: colors.accent, marginBottom: '2px', letterSpacing: '-0.3px' }}>
            {name}
          </h1>
          <div style={{ fontSize: '1rem', fontWeight: '600', color: colors.textMuted, fontStyle: 'italic', marginBottom: '8px' }}>
            {role}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', fontSize: '0.82rem', color: colors.textMuted }}>
            {email && <span>📧 {email}</span>}
            {phone && <span>📞 {phone}</span>}
            {location && <span>📍 {location}</span>}
            {linkedin && <span>🔗 {linkedin}</span>}
            {github && <span>💻 {github}</span>}
          </div>
        </div>

        {summary ? (
          <div style={{ marginBottom: '22px' }}>
            <h3 style={{ fontFamily: fonts.heading, fontSize: '1.05rem', fontWeight: '700', color: colors.accent, borderLeft: `3.5px solid ${colors.accent}`, paddingLeft: '10px', marginBottom: '8px' }}>
              Professional Summary
            </h3>
            <p style={{ fontSize: '0.88rem', color: colors.text, lineHeight: '1.58' }}>{summary}</p>
          </div>
        ) : null}

        {skills.length > 0 ? (
          <div style={{ marginBottom: '22px' }}>
            <h3 style={{ fontFamily: fonts.heading, fontSize: '1.05rem', fontWeight: '700', color: colors.accent, borderLeft: `3.5px solid ${colors.accent}`, paddingLeft: '10px', marginBottom: '10px' }}>
              Core Competencies
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {skills.map((skill, i) => (
                <span key={i} style={{ background: '#f8fafc', color: colors.text, border: `1px solid ${colors.border}`, padding: '4px 10px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '600' }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        {experiences.length > 0 ? (
          <div style={{ marginBottom: '22px' }}>
            <h3 style={{ fontFamily: fonts.heading, fontSize: '1.05rem', fontWeight: '700', color: colors.accent, borderLeft: `3.5px solid ${colors.accent}`, paddingLeft: '10px', marginBottom: '12px' }}>
              Professional Experience
            </h3>
            {experiences.map((exp, i) => (
              <div key={i} style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                  <strong style={{ fontSize: '0.96rem', color: colors.text }}>{exp.role}</strong>
                  <span style={{ fontSize: '0.8rem', color: colors.textMuted, fontWeight: '600' }}>{exp.dates}</span>
                </div>
                <div style={{ fontSize: '0.86rem', color: colors.accent, fontWeight: '700', marginBottom: '6px' }}>{exp.company}</div>
                <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.84rem', color: colors.text }}>
                  {exp.bullets?.map((bullet, idx) => (
                    <li key={idx} style={{ marginBottom: '4px', lineHeight: '1.45' }}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : null}

        {projects.length > 0 ? (
          <div style={{ marginBottom: '22px' }}>
            <h3 style={{ fontFamily: fonts.heading, fontSize: '1.05rem', fontWeight: '700', color: colors.accent, borderLeft: `3.5px solid ${colors.accent}`, paddingLeft: '10px', marginBottom: '10px' }}>
              Key Projects
            </h3>
            {projects.map((proj, i) => (
              <div key={i} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <strong style={{ fontSize: '0.94rem', color: colors.text }}>{proj.name}</strong>
                  {proj.link && <span style={{ fontSize: '0.8rem', color: colors.textMuted }}>{proj.link}</span>}
                </div>
                {proj.techStack && (
                  <div style={{ fontSize: '0.78rem', fontStyle: 'italic', color: colors.accent, marginBottom: '2px' }}>
                    Technologies: {proj.techStack}
                  </div>
                )}
                {proj.description && (
                  <p style={{ fontSize: '0.84rem', color: colors.text, margin: 0, lineHeight: '1.45' }}>{proj.description}</p>
                )}
              </div>
            ))}
          </div>
        ) : null}

        {education.length > 0 ? (
          <div>
            <h3 style={{ fontFamily: fonts.heading, fontSize: '1.05rem', fontWeight: '700', color: colors.accent, borderLeft: `3.5px solid ${colors.accent}`, paddingLeft: '10px', marginBottom: '10px' }}>
              Education
            </h3>
            {education.map((edu, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem', marginBottom: '4px' }}>
                <div>
                  <strong>{edu.degree}</strong> — <span style={{ color: colors.textMuted }}>{edu.institution}</span>
                </div>
                <span style={{ color: colors.textMuted, fontWeight: '600' }}>{edu.year}</span>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }

  // =========================================================================
  // FALLBACK DEFAULT (twoColumnLight)
  // =========================================================================
  return (
    <div
      id="resume-pdf-content"
      style={{
        background: colors.background || '#ffffff',
        color: colors.text || '#0f172a',
        fontFamily: fonts.body,
        display: 'grid',
        gridTemplateColumns: '260px 1fr',
        minHeight: '842px',
        borderRadius: '12px',
        boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
        border: `1px solid ${colors.border}`,
        overflow: 'hidden'
      }}
    >
      <div style={{ background: colors.sidebar || '#f0f9ff', padding: '32px 24px', borderRight: `1px solid ${colors.border}` }}>
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontFamily: fonts.heading, fontSize: '1.7rem', fontWeight: '800', color: colors.text, lineHeight: '1.2', marginBottom: '6px' }}>
            {name}
          </h1>
          <span style={{ fontSize: '0.9rem', color: colors.accent, fontWeight: '700', display: 'block' }}>
            {role}
          </span>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '0.78rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', color: colors.textMuted, marginBottom: '10px' }}>
            Contact
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem', color: colors.text }}>
            <span>📧 {email}</span>
            <span>📞 {phone}</span>
            <span>📍 {location}</span>
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '0.78rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', color: colors.textMuted, marginBottom: '10px' }}>
            Core Skills
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {skills.map((skill, i) => (
              <span key={i} style={{ background: '#ffffff', color: colors.accent, border: `1px solid ${colors.border}`, padding: '3px 8px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: '700' }}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: '32px 36px', background: colors.surface }}>
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontFamily: fonts.heading, fontSize: '1.1rem', fontWeight: '800', color: colors.accent, borderBottom: `2px solid ${colors.border}`, paddingBottom: '4px', marginBottom: '10px' }}>
            Professional Summary
          </h3>
          <p style={{ fontSize: '0.9rem', color: colors.text, lineHeight: '1.6' }}>{summary}</p>
        </div>

        <div>
          <h3 style={{ fontFamily: fonts.heading, fontSize: '1.1rem', fontWeight: '800', color: colors.accent, borderBottom: `2px solid ${colors.border}`, paddingBottom: '4px', marginBottom: '12px' }}>
            Work Experience
          </h3>
          {experiences.map((exp, i) => (
            <div key={i} style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: '0.98rem', color: colors.text }}>{exp.role}</strong>
                <span style={{ fontSize: '0.8rem', color: colors.textMuted, fontWeight: '600' }}>{exp.dates}</span>
              </div>
              <div style={{ fontSize: '0.86rem', color: colors.accent, fontWeight: '700', marginBottom: '6px' }}>{exp.company}</div>
              <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.85rem', color: colors.text }}>
                {exp.bullets?.map((b, idx) => (
                  <li key={idx} style={{ marginBottom: '4px' }}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
