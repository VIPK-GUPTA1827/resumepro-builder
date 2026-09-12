import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Shield, Lock, FileText, Info, X, CheckCircle } from 'lucide-react';

export default function LegalModal({ initialTab = 'privacy', onClose }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  return createPortal(
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 999999,
        background: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          zIndex: 100000,
          background: '#ffffff',
          borderRadius: '20px',
          maxWidth: '750px',
          width: '100%',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.45)',
          border: '1.5px solid #cbd5e1',
          overflow: 'hidden',
          animation: 'fadeInModal 0.25s ease-out'
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid #f1f5f9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#f8fafc'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: '#2563eb15', padding: '8px', borderRadius: '10px' }}>
              <Shield size={20} color="#2563eb" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                Trust, Privacy & Security
              </h2>
              <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '600' }}>
                Simple, transparent policies written for real humans
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: '#f1f5f9',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#64748b',
              transition: 'all 0.15s ease'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Selector Bar */}
        <div
          style={{
            display: 'flex',
            gap: '6px',
            padding: '12px 24px',
            borderBottom: '1px solid #f1f5f9',
            background: '#ffffff',
            overflowX: 'auto'
          }}
        >
          <button
            onClick={() => setActiveTab('privacy')}
            style={{
              padding: '8px 14px',
              borderRadius: '10px',
              border: activeTab === 'privacy' ? '1px solid #2563eb' : '1px solid #e2e8f0',
              background: activeTab === 'privacy' ? '#2563eb0a' : 'transparent',
              color: activeTab === 'privacy' ? '#2563eb' : '#64748b',
              fontSize: '0.84rem',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap'
            }}
          >
            <Lock size={14} /> Privacy Policy
          </button>

          <button
            onClick={() => setActiveTab('terms')}
            style={{
              padding: '8px 14px',
              borderRadius: '10px',
              border: activeTab === 'terms' ? '1px solid #2563eb' : '1px solid #e2e8f0',
              background: activeTab === 'terms' ? '#2563eb0a' : 'transparent',
              color: activeTab === 'terms' ? '#2563eb' : '#64748b',
              fontSize: '0.84rem',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap'
            }}
          >
            <FileText size={14} /> Terms of Service
          </button>

          <button
            onClick={() => setActiveTab('about')}
            style={{
              padding: '8px 14px',
              borderRadius: '10px',
              border: activeTab === 'about' ? '1px solid #2563eb' : '1px solid #e2e8f0',
              background: activeTab === 'about' ? '#2563eb0a' : 'transparent',
              color: activeTab === 'about' ? '#2563eb' : '#64748b',
              fontSize: '0.84rem',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap'
            }}
          >
            <Info size={14} /> About ResumePro
          </button>

          <button
            onClick={() => setActiveTab('security')}
            style={{
              padding: '8px 14px',
              borderRadius: '10px',
              border: activeTab === 'security' ? '1px solid #2563eb' : '1px solid #e2e8f0',
              background: activeTab === 'security' ? '#2563eb0a' : 'transparent',
              color: activeTab === 'security' ? '#2563eb' : '#64748b',
              fontSize: '0.84rem',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap'
            }}
          >
            <Shield size={14} /> Security Guarantee
          </button>
        </div>

        {/* Tab Body Content */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1, fontSize: '0.92rem', color: '#334155', lineHeight: '1.7' }}>

          {/* 1. PRIVACY POLICY */}
          {activeTab === 'privacy' && (
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f172a', marginTop: 0, marginBottom: '12px' }}>
                🔒 100% Local Privacy Guarantee
              </h3>
              <p>
                We believe your personal data belongs to you—and only you. That is why <strong>ResumePro is built with a 100% Client-Side Architecture.</strong>
              </p>

              <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '14px 18px', borderRadius: '12px', marginBottom: '16px' }}>
                <div style={{ fontWeight: '800', color: '#15803d', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <CheckCircle size={16} /> What this means in plain words:
                </div>
                <ul style={{ margin: 0, paddingLeft: '20px', color: '#166534', fontSize: '0.88rem' }}>
                  <li>Your name, phone number, email, and work history <strong>never leave your web browser</strong>.</li>
                  <li>We do NOT upload or save your resume to any cloud server or remote database.</li>
                  <li>We do NOT sell, track, or share your personal data with third-party advertisers.</li>
                </ul>
              </div>

              <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#0f172a', marginBottom: '6px' }}>
                How Your Drafts Are Saved
              </h4>
              <p style={{ margin: 0 }}>
                When you work on your resume, your draft is safely saved inside your browser's private Local Storage. You can clear your browser history or download a JSON backup file anytime to keep your data saved on your own computer.
              </p>
            </div>
          )}

          {/* 2. TERMS OF SERVICE */}
          {activeTab === 'terms' && (
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f172a', marginTop: 0, marginBottom: '12px' }}>
                📄 Terms of Service
              </h3>
              <p>
                Welcome to ResumePro! Our terms are simple and straightforward so you can focus on building a great resume.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '14px', borderRadius: '12px' }}>
                  <strong style={{ color: '#0f172a' }}>1. 100% Free & Unlimited Usage</strong>
                  <p style={{ margin: '4px 0 0 0', fontSize: '0.88rem', color: '#64748b' }}>
                    ResumePro is free to use. You can create, edit, print, and export as many vector PDF resumes as you want without hidden fees.
                  </p>
                </div>

                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '14px', borderRadius: '12px' }}>
                  <strong style={{ color: '#0f172a' }}>2. Full Data Ownership</strong>
                  <p style={{ margin: '4px 0 0 0', fontSize: '0.88rem', color: '#64748b' }}>
                    You own 100% of the content and resumes you create on ResumePro. We claim zero ownership or rights over your resume text.
                  </p>
                </div>

                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '14px', borderRadius: '12px' }}>
                  <strong style={{ color: '#0f172a' }}>3. Fair Use & Copyright Protection</strong>
                  <p style={{ margin: '4px 0 0 0', fontSize: '0.88rem', color: '#64748b' }}>
                    All template designs, software code, branding, and ATS engine logic are protected intellectual property. Redistribution or unauthorized cloning of the underlying software source code is strictly prohibited.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 3. ABOUT US */}
          {activeTab === 'about' && (
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f172a', marginTop: 0, marginBottom: '12px' }}>
                ✨ About ResumePro
              </h3>
              <p>
                ResumePro was created with a single mission: <strong>To help job seekers everywhere land their dream roles at top companies worldwide.</strong>
              </p>

              <p>
                Most online resume builders hide basic features behind expensive subscriptions or produce low-quality PDFs that fail ATS applicant tracking systems. ResumePro changes that by offering world-class, ATS-optimized vector templates that load fast and look stunning.
              </p>

              <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', padding: '14px 18px', borderRadius: '12px', color: '#1e40af', fontSize: '0.88rem', marginTop: '16px' }}>
                <strong>🚀 Why Job Seekers Love ResumePro:</strong>
                <ul style={{ margin: '6px 0 0 0', paddingLeft: '20px' }}>
                  <li>Instant ATS Score Calculation strictly based on real resume content</li>
                  <li>10 High-Impact Professional Templates for Tech, Executive & Creative roles</li>
                  <li>Instant 60FPS Client-Side Vector PDF Generation & JSON Data Backups</li>
                </ul>
              </div>

              {/* Continuous Innovation & Future Updates Block */}
              <div style={{ background: '#f0fdf4', border: '1.5px solid #bbf7d0', padding: '16px 18px', borderRadius: '14px', marginTop: '16px', color: '#14532d' }}>
                <div style={{ fontWeight: '800', fontSize: '0.95rem', color: '#16a34a', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  🚀 Continuous Innovation & Future Updates
                </div>
                <p style={{ margin: 0, fontSize: '0.88rem', color: '#166534', lineHeight: '1.6' }}>
                  We are constantly working to make ResumePro even better! New professional ATS templates, advanced AI bullet optimizers, and smart job-matching features will be continuously added over time. You will always get access to the latest updates automatically without any extra cost or subscription.
                </p>
              </div>

              {/* Software Ownership & Proprietary License Block */}
              <div style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', padding: '16px 18px', borderRadius: '14px', marginTop: '16px', color: '#0f172a' }}>
                <div style={{ fontWeight: '800', fontSize: '0.95rem', color: '#2563eb', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  📜 Software Ownership & Proprietary License
                </div>
                <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569', lineHeight: '1.6' }}>
                  Designed, architected, and built by <strong>Vipin Gupta</strong>. ResumePro is protected under an official <strong>Proprietary & Intellectual Property License (Copyright © 2026 Vipin Gupta. All Rights Reserved)</strong>. All software source code, UI/UX architecture, vector templates, and ATS evaluation logic are exclusively owned. Unauthorized copying, cloning, hosting, or commercial redistribution of this codebase is strictly prohibited.
                </p>
              </div>
            </div>
          )}

          {/* 4. SECURITY GUARANTEE */}
          {activeTab === 'security' && (
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f172a', marginTop: 0, marginBottom: '12px' }}>
                🛡️ Security & Source Code Protection
              </h3>
              <p>
                Security is built into every layer of ResumePro to protect both your personal information and our software integrity.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ background: '#f1f5f9', padding: '8px', borderRadius: '8px', fontWeight: '800', color: '#2563eb' }}>01</div>
                  <div>
                    <strong style={{ color: '#0f172a' }}>Zero Telemetry & Offline Capability</strong>
                    <div style={{ fontSize: '0.86rem', color: '#64748b' }}>No keyloggers, no analytics trackers, and zero server logging. Your resume data stays isolated inside your browser environment.</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ background: '#f1f5f9', padding: '8px', borderRadius: '8px', fontWeight: '800', color: '#2563eb' }}>02</div>
                  <div>
                    <strong style={{ color: '#0f172a' }}>Single-File Production Bundle Security</strong>
                    <div style={{ fontSize: '0.86rem', color: '#64748b' }}>Our production software is compiled into a single secure inline bundle with strict closure scope to protect internal code logic from external tampering.</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ background: '#f1f5f9', padding: '8px', borderRadius: '8px', fontWeight: '800', color: '#2563eb' }}>03</div>
                  <div>
                    <strong style={{ color: '#0f172a' }}>Encrypted JSON Backups</strong>
                    <div style={{ fontSize: '0.86rem', color: '#64748b' }}>JSON exports allow you to back up your full resume state securely onto your hard drive without relying on external cloud servers.</div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: '16px 24px',
            borderTop: '1px solid #f1f5f9',
            background: '#f8fafc',
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <button
            onClick={onClose}
            className="btn-primary"
            style={{ padding: '8px 20px', fontSize: '0.86rem' }}
          >
            Got It, Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
