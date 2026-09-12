import React, { useState, useRef } from 'react';
import { Download, Edit3, Sparkles, ArrowLeft, Layers, CheckCircle2, ShieldCheck, AlertTriangle, XCircle, Info, Maximize2, ChevronLeft, ChevronRight, ChevronDown, Printer, FileJson, Upload, Palette, Type } from 'lucide-react';
import confetti from 'canvas-confetti';
import SVGRadialGauge from '../components/SVGRadialGauge';
import ResumeLightbox from '../components/ResumeLightbox';
import TemplateRenderer from '../components/TemplateRenderer';
import { resumeTemplates } from '../config/resumeTemplates.config';
import { exportToPDF } from '../utils/pdfExport';

// Color Swatch Presets for Customizer
const ACCENT_COLOR_SWATCHES = [
  { name: 'Default', value: null, bg: 'linear-gradient(135deg, #2563eb, #0284c7)' },
  { name: 'Royal Blue', value: '#2563eb', bg: '#2563eb' },
  { name: 'Emerald', value: '#16a34a', bg: '#16a34a' },
  { name: 'Deep Plum', value: '#4a2342', bg: '#4a2342' },
  { name: 'Warm Gold', value: '#d97706', bg: '#d97706' },
  { name: 'Indigo', value: '#4338ca', bg: '#4338ca' },
  { name: 'Deep Teal', value: '#0f766e', bg: '#0f766e' },
  { name: 'Crimson', value: '#e11d48', bg: '#e11d48' },
  { name: 'Slate Dark', value: '#0f172a', bg: '#0f172a' },
];

// Font Family Options for Customizer
const FONT_FAMILY_OPTIONS = [
  { name: 'Default', value: null },
  { name: 'Inter (Modern)', value: "'Inter', sans-serif" },
  { name: 'Outfit (Tech)', value: "'Outfit', sans-serif" },
  { name: 'Space Grotesk (Sleek)', value: "'Space Grotesk', sans-serif" },
  { name: 'Roboto (Clean)', value: "'Roboto', sans-serif" },
  { name: 'Merriweather (Executive)', value: "'Merriweather', serif" },
  { name: 'Georgia (Classic)', value: "'Georgia', serif" },
];

function calculateATSScore(data) {
  if (!data || !data.personal || !data.personal.fullName || data.personal.fullName.trim().length === 0) {
    return {
      score: 0,
      breakdown: [],
      label: 'Blank Form — 0%',
      color: '#94a3b8',
      gradientBg: 'rgba(148, 163, 184, 0.08)',
      issues: ['Please fill out your name and resume details to calculate ATS Rating']
    };
  }

  const { personal = {}, experiences = [], education = [], skills = [] } = data;
  const breakdown = [];
  const issues = [];
  let total = 0;

  // 1. Full Name present (8 pts)
  if (personal.fullName && personal.fullName.trim().length > 2) {
    total += 8;
    breakdown.push({ label: 'Full Name', score: 8, max: 8 });
  } else {
    issues.push('Full name is missing');
    breakdown.push({ label: 'Full Name', score: 0, max: 8 });
  }

  // 2. Job Title / Target Role (6 pts)
  if (personal.jobTitle && personal.jobTitle.trim().length > 2) {
    total += 6;
    breakdown.push({ label: 'Target Job Title', score: 6, max: 6 });
  } else {
    issues.push('Target job title is missing');
    breakdown.push({ label: 'Target Job Title', score: 0, max: 6 });
  }

  // 3. Email address (6 pts)
  const emailValid = personal.email && /\S+@\S+\.\S+/.test(personal.email);
  if (emailValid) {
    total += 6;
    breakdown.push({ label: 'Email Address', score: 6, max: 6 });
  } else {
    issues.push('Valid email address is missing');
    breakdown.push({ label: 'Email Address', score: 0, max: 6 });
  }

  // 4. Phone number (4 pts)
  if (personal.phone && personal.phone.trim().length > 6) {
    total += 4;
    breakdown.push({ label: 'Phone Number', score: 4, max: 4 });
  } else {
    issues.push('Phone number is missing');
    breakdown.push({ label: 'Phone Number', score: 0, max: 4 });
  }

  // 5. Location (4 pts)
  if (personal.location && personal.location.trim().length > 2) {
    total += 4;
    breakdown.push({ label: 'Location', score: 4, max: 4 });
  } else {
    issues.push('Location/City is missing');
    breakdown.push({ label: 'Location', score: 0, max: 4 });
  }

  // 6. Professional Links (6 pts - LinkedIn & GitHub/Portfolio)
  let linksScore = 6;
  const hasLinkedIn = personal.linkedin && personal.linkedin.trim().length > 5;
  const hasGithubOrWeb = (personal.github && personal.github.trim().length > 5) || (personal.website && personal.website.trim().length > 5);
  
  if (!hasLinkedIn) {
    linksScore -= 3;
    issues.push('LinkedIn URL is missing (-3 pts)');
  }
  if (!hasGithubOrWeb) {
    linksScore -= 3;
    issues.push('GitHub or Portfolio link is missing (-3 pts)');
  }
  total += linksScore;
  breakdown.push({ label: 'Professional Links', score: linksScore, max: 6 });

  // 7. Professional Summary (12 pts)
  const summaryLen = personal.summary ? personal.summary.trim().length : 0;
  let summaryScore = 0;
  let summaryTitleMatch = false;

  if (summaryLen >= 80) {
    summaryScore += 8;
  } else if (summaryLen >= 30) {
    summaryScore += 4;
    issues.push('Summary is too short — aim for 80+ characters');
  } else {
    issues.push('Professional summary is missing or too short');
  }

  if (personal.jobTitle && personal.summary) {
    const cleanJobTitle = personal.jobTitle.toLowerCase();
    const jobTitleKeywords = cleanJobTitle
      .split(/\s+/)
      .filter(word => word.length > 2 && !['and', 'the', 'for', 'with', 'developer', 'engineer'].includes(word));
    
    const summaryLower = personal.summary.toLowerCase();
    summaryTitleMatch = jobTitleKeywords.some(keyword => summaryLower.includes(keyword)) || summaryLower.includes(cleanJobTitle);
  }

  if (summaryLen > 0 && !summaryTitleMatch) {
    issues.push('Include target job title keywords in summary for ATS matching');
  } else if (summaryLen >= 80 && summaryTitleMatch) {
    summaryScore += 4; // Max out at 12
  }

  total += summaryScore;
  breakdown.push({ label: 'Professional Summary', score: summaryScore, max: 12 });

  // 8. Work Experience / Projects (26 pts - Base, Action Verbs, and Metrics)
  let expScore = 0;
  if (experiences.length >= 2) {
    expScore += 16;
  } else if (experiences.length === 1) {
    expScore += 10;
    issues.push('Add at least 2 experience/project items for maximum score');
  } else {
    issues.push('No work experience or project items added');
  }

  // Keyword density & Action verbs in experience
  const criticalVerbs = ['managed', 'developed', 'increased', 'reduced', 'designed', 'built', 'created', 'implemented', 'led', 'analyzed', 'optimized', 'executed', 'formulated', 'directed'];
  const fullExperienceText = experiences.map(exp => (exp.description || '') + ' ' + (exp.role || '')).join(' ').toLowerCase();
  const foundVerbs = criticalVerbs.filter(verb => fullExperienceText.includes(verb));
  const hasActionVerbs = foundVerbs.length >= 3;

  if (experiences.length > 0 && !hasActionVerbs) {
    issues.push('Include critical action verbs in experience (e.g. managed, developed, optimized)');
  } else if (experiences.length >= 2 && hasActionVerbs) {
    expScore += 5; // Keyword bonus
  }

  // Quantification metrics
  const metricRegex = /\b\d+%\b|\$\d+|\b\d+\s*(?:users|projects|years|clients|people|dollars|employees|hours|days|months)\b/i;
  const hasMetrics = metricRegex.test(fullExperienceText) || /\d+/.test(fullExperienceText);

  if (experiences.length > 0 && !hasMetrics) {
    issues.push('Quantify experience with numbers, metrics or growth stats');
  } else if (experiences.length >= 2 && hasMetrics) {
    expScore += 5; // Metrics bonus
  }

  total += expScore;
  breakdown.push({ label: 'Work Experience & Impact', score: expScore, max: 26 });

  // 9. Technical Skills (18 pts)
  if (skills.length >= 6) {
    total += 18;
    breakdown.push({ label: 'Technical & Key Skills', score: 18, max: 18 });
  } else if (skills.length >= 3) {
    total += 10;
    issues.push('Add at least 6 key skills to boost ATS keyword match');
    breakdown.push({ label: 'Technical & Key Skills', score: 10, max: 18 });
  } else {
    issues.push('Add key skills to pass ATS keyword filtering');
    breakdown.push({ label: 'Technical & Key Skills', score: 0, max: 18 });
  }

  // 10. Education (10 pts)
  if (education.length > 0 && education[0].degree) {
    total += 10;
    breakdown.push({ label: 'Education & Degree', score: 10, max: 10 });
  } else {
    issues.push('Education details are incomplete');
    breakdown.push({ label: 'Education & Degree', score: 0, max: 10 });
  }

  // Label & Color Assignment based on Sug 5:
  let scoreLabel = 'Low — Fix Issues';
  let scoreColor = '#ef4444';
  let gradientBg = 'rgba(239, 68, 68, 0.08)';

  if (total === 0) {
    scoreLabel = 'Blank Form — Fill Details to Calculate';
    scoreColor = '#94a3b8';
    gradientBg = 'rgba(148, 163, 184, 0.08)';
  } else if (total >= 86) {
    scoreLabel = 'Excellent — ATS Ready!';
    scoreColor = '#10b981';
    gradientBg = 'rgba(16, 185, 129, 0.08)';
  } else if (total >= 71) {
    scoreLabel = 'Very Good — Ready to Apply';
    scoreColor = '#3b82f6';
    gradientBg = 'rgba(59, 130, 246, 0.08)';
  } else if (total >= 41) {
    scoreLabel = 'Good — Minor Fixes Needed';
    scoreColor = '#f59e0b';
    gradientBg = 'rgba(245, 158, 11, 0.08)';
  }

  return { score: total, label: scoreLabel, color: scoreColor, gradientBg, issues, breakdown };
}

export default function Preview({ resumeData = {}, onEdit, onReGenerate, onRestoreData }) {
  const [template, setTemplate] = useState('atsClassic');
  const [customAccentColor, setCustomAccentColor] = useState(null);
  const [customFontFamily, setCustomFontFamily] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const fileInputRef = useRef(null);

  const { score, label, color, gradientBg, issues, breakdown } = calculateATSScore(resumeData);
  const templatesList = Object.values(resumeTemplates);

  const handleDownload = async () => {
    setIsExporting(true);
    confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    const nameStr = resumeData?.personal?.fullName || resumeData?.fullName || resumeData?.personalInfo?.fullName;
    const name = nameStr ? `${nameStr.replace(/\s+/g, '_')}_Resume.pdf` : 'Vipin_Gupta_Resume.pdf';
    await exportToPDF(name);
    setIsExporting(false);
  };

  const handleDirectPrint = () => {
    window.print();
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(resumeData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `ResumeData_Backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJSONClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (onRestoreData) {
          onRestoreData(parsed);
          alert('✓ Resume Data Backup Restored Successfully!');
        } else {
          alert('✓ Backup JSON Parsed Successfully!');
        }
      } catch (err) {
        alert('⚠ Invalid JSON File Format. Please upload a valid resume backup file.');
      }
      e.target.value = '';
    };
    reader.readAsText(file);
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px 80px 24px', position: 'relative', zIndex: 1 }}>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <ResumeLightbox
          data={resumeData}
          template={template}
          onClose={() => setIsLightboxOpen(false)}
        />
      )}

      {/* ── Real ATS Score Banner ── */}
      <div
        style={{
          background: '#ffffff',
          border: `1.5px solid ${score > 0 ? color : '#cbd5e1'}`,
          borderRadius: '16px',
          padding: '18px 24px',
          marginBottom: '20px',
          boxShadow: '0 4px 20px rgba(15, 23, 42, 0.05)'
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
          {/* Animated SVG Radial Score Gauge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <SVGRadialGauge score={score} size={76} strokeWidth={7} />

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: '700' }}>ATS Resume Rating:</span>
                <span
                  style={{
                    background: `${color}15`,
                    border: `1px solid ${color}44`,
                    color: score > 0 ? color : '#64748b',
                    padding: '2px 10px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '800'
                  }}
                >
                  {label}
                </span>
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                {score >= 85 ? '🎉 Ready for Remote & Global Job Applications!' : score > 0 ? '⚠️ Optimization Recommended' : '💡 Fill out your details to calculate ATS score'}
              </h3>
            </div>
          </div>

          <div>
            <button
              onClick={() => setShowBreakdown(!showBreakdown)}
              style={{
                background: '#f8fafc',
                border: '1px solid #cbd5e1',
                color: '#0f172a',
                padding: '8px 14px',
                borderRadius: '10px',
                fontSize: '0.82rem',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Info size={15} color="#0284c7" /> {showBreakdown ? 'Hide Details' : 'View ATS Breakdown'}
            </button>
          </div>
        </div>

        {/* Breakdown Panel */}
        {showBreakdown && (
          <div style={{ marginTop: '20px', borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px', marginBottom: '16px' }}>
              {breakdown.map((item, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '4px', background: '#f8fafc', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                    <span style={{ color: '#475569', fontWeight: '600' }}>{item.label}</span>
                    <span style={{ color: item.score === item.max ? '#16a34a' : item.score > 0 ? '#d97706' : '#dc2626', fontWeight: '700' }}>
                      {item.score}/{item.max}
                    </span>
                  </div>
                  <div style={{ height: '5px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                    <div
                      style={{
                        height: '100%',
                        width: `${(item.score / item.max) * 100}%`,
                        background: item.score === item.max ? '#16a34a' : item.score > 0 ? '#d97706' : '#dc2626',
                        borderRadius: '3px'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Issues List */}
            {issues.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', background: '#fef2f2', padding: '14px', borderRadius: '10px', border: '1px solid #fecaca' }}>
                <div style={{ fontSize: '0.85rem', color: '#dc2626', fontWeight: '700', marginBottom: '4px' }}>
                  ⚠️ Action Required to Maximize ATS Score:
                </div>
                {issues.map((issue, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#991b1b', fontSize: '0.82rem' }}>
                    <XCircle size={14} color="#dc2626" /> {issue}
                  </div>
                ))}
                <button
                  onClick={onEdit}
                  style={{
                    marginTop: '10px',
                    background: 'linear-gradient(135deg, #2563eb, #0284c7)',
                    border: 'none',
                    color: '#fff',
                    padding: '8px 18px',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    width: 'fit-content'
                  }}
                >
                  ← Edit Form & Fix Issues
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Sleek Single-Line Control Bar (Uncluttered & No Overflow) ── */}
      <div
        style={{
          background: '#ffffff',
          borderRadius: '14px',
          padding: '8px 12px',
          border: '1px solid #cbd5e1',
          boxShadow: '0 4px 16px rgba(15, 23, 42, 0.05)',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '6px',
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        {/* Hidden File Input for JSON Backup Import */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".json"
          style={{ display: 'none' }}
        />

        {/* Left Dropdowns: Template, Color, Font, Tools */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
          {/* Template Selector Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#f8fafc', padding: '6px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', flexShrink: 0 }}>
            <Layers size={14} color="#2563eb" />
            <select
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              style={{
                border: 'none',
                background: 'transparent',
                fontSize: '0.82rem',
                fontWeight: '700',
                color: '#0f172a',
                cursor: 'pointer',
                outline: 'none',
                minWidth: '160px'
              }}
            >
              {templatesList.map((t) => (
                <option key={t.id} value={t.id} style={{ background: '#ffffff', color: '#0f172a', padding: '6px' }}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* Accent Color Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#f8fafc', padding: '6px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', flexShrink: 0, minWidth: '140px' }}>
            <Palette size={14} color="#2563eb" />
            <select
              value={customAccentColor || ''}
              onChange={(e) => setCustomAccentColor(e.target.value || null)}
              style={{
                border: 'none',
                background: 'transparent',
                fontSize: '0.82rem',
                fontWeight: '700',
                color: '#0f172a',
                cursor: 'pointer',
                outline: 'none',
                width: '100%'
              }}
            >
              {ACCENT_COLOR_SWATCHES.map((s) => (
                <option key={s.name} value={s.value || ''} style={{ background: '#ffffff', color: '#0f172a' }}>
                  Color: {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Font Family Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#f8fafc', padding: '6px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', flexShrink: 0, minWidth: '150px' }}>
            <Type size={14} color="#0284c7" />
            <select
              value={customFontFamily || ''}
              onChange={(e) => setCustomFontFamily(e.target.value || null)}
              style={{
                border: 'none',
                background: 'transparent',
                fontSize: '0.82rem',
                fontWeight: '700',
                color: '#0f172a',
                cursor: 'pointer',
                outline: 'none',
                width: '100%'
              }}
            >
              {FONT_FAMILY_OPTIONS.map((f) => (
                <option key={f.name} value={f.value || ''} style={{ background: '#ffffff', color: '#0f172a' }}>
                  Font: {f.name}
                </option>
              ))}
            </select>
          </div>

          {/* Tools & Backup Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#f8fafc', padding: '6px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', flexShrink: 0, minWidth: '105px' }}>
            <select
              defaultValue=""
              onChange={(e) => {
                const val = e.target.value;
                if (val === 'export') handleExportJSON();
                if (val === 'import') handleImportJSONClick();
                if (val === 'fullscreen') setIsLightboxOpen(true);
                e.target.value = '';
              }}
              style={{
                border: 'none',
                background: 'transparent',
                fontSize: '0.82rem',
                fontWeight: '700',
                color: '#0f172a',
                cursor: 'pointer',
                outline: 'none',
                width: '100%'
              }}
            >
              <option value="" disabled style={{ background: '#ffffff', color: '#64748b' }}>⚙️ Tools</option>
              <option value="fullscreen" style={{ background: '#ffffff', color: '#0f172a' }}>🔍 Fullscreen Zoom</option>
              <option value="export" style={{ background: '#ffffff', color: '#0f172a' }}>📥 Backup Data (JSON)</option>
              <option value="import" style={{ background: '#ffffff', color: '#0f172a' }}>📤 Restore Data (JSON)</option>
            </select>
          </div>
        </div>

        {/* Right Primary Action Buttons */}
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center', flexWrap: 'nowrap' }}>
          <button onClick={handleDirectPrint} className="btn-secondary" style={{ padding: '6px 10px', fontSize: '0.78rem' }}>
            <Printer size={13} color="#0f172a" /> Print
          </button>
          <button onClick={onEdit} className="btn-secondary" style={{ padding: '6px 10px', fontSize: '0.78rem' }}>
            <Edit3 size={13} /> Edit
          </button>
          <button onClick={handleDownload} disabled={isExporting} className="btn-primary" style={{ padding: '6px 12px', fontSize: '0.78rem', whiteSpace: 'nowrap' }}>
            <Download size={13} /> {isExporting ? 'Exporting...' : 'Download PDF'}
          </button>
        </div>
      </div>

      {/* ── Resume Render Area ── */}
      <div style={{ maxWidth: '850px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', padding: '0 4px' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            📄 Live Print Preview (Standard A4 Dimension)
          </span>
          <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#16a34a', background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '2px 8px', borderRadius: '10px' }}>
            ✓ 100% Vector PDF Multi-Page Ready
          </span>
        </div>
        <TemplateRenderer resumeData={resumeData} selectedTemplateId={template} customAccentColor={customAccentColor} customFontFamily={customFontFamily} />
      </div>
    </div>
  );
}
