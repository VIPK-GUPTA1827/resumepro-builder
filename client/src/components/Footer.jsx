import React, { useState } from 'react';
import { Shield, Lock, FileText, Info, Heart, MessageSquare } from 'lucide-react';
import LegalModal from './LegalModal';

export default function Footer({ onOpenFeedback, onOpenLegal }) {
  const [internalLegalTab, setInternalLegalTab] = useState(null);

  const handleOpenTab = (tab) => {
    if (onOpenLegal) {
      onOpenLegal(tab);
    } else {
      setInternalLegalTab(tab);
    }
  };

  return (
    <footer
      style={{
        background: '#ffffff',
        borderTop: '1px solid #e2e8f0',
        padding: '36px 24px 28px 24px',
        marginTop: '60px',
        position: 'relative',
        zIndex: 10
      }}
    >
      {/* Fallback Legal Modal Trigger if parent onOpenLegal not passed */}
      {internalLegalTab && (
        <LegalModal
          initialTab={internalLegalTab}
          onClose={() => setInternalLegalTab(null)}
        />
      )}

      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>

          {/* Logo & Tagline */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: '#2563eb', color: '#fff', padding: '6px 10px', borderRadius: '10px', fontWeight: '900', fontSize: '1rem' }}>
              RP
            </div>
            <div>
              <div style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0f172a' }}>
                Resume<span style={{ color: '#2563eb' }}>Pro</span>
              </div>
              <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: '600' }}>
                100% Free & Private ATS Resume Builder
              </div>
            </div>
          </div>

          {/* Clickable Legal & Trust Links */}
          <div style={{ display: 'flex', gap: '18px', flexWrap: 'wrap', alignItems: 'center' }}>
            {onOpenFeedback && (
              <button
                onClick={onOpenFeedback}
                style={{
                  background: '#eff6ff',
                  border: '1px solid #bfdbfe',
                  color: '#2563eb',
                  padding: '5px 12px',
                  borderRadius: '20px',
                  fontSize: '0.82rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.15s ease'
                }}
              >
                <MessageSquare size={14} color="#2563eb" /> Feedback & Suggestions
              </button>
            )}

            <button
              onClick={() => handleOpenTab('privacy')}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#475569',
                fontSize: '0.85rem',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'color 0.15s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#2563eb'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#475569'}
            >
              <Lock size={14} color="#2563eb" /> Privacy Policy
            </button>

            <button
              onClick={() => handleOpenTab('terms')}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#475569',
                fontSize: '0.85rem',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'color 0.15s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#2563eb'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#475569'}
            >
              <FileText size={14} color="#0284c7" /> Terms of Service
            </button>

            <button
              onClick={() => handleOpenTab('about')}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#475569',
                fontSize: '0.85rem',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'color 0.15s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#2563eb'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#475569'}
            >
              <Info size={14} color="#16a34a" /> About Us
            </button>

            <button
              onClick={() => handleOpenTab('security')}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#475569',
                fontSize: '0.85rem',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'color 0.15s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#2563eb'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#475569'}
            >
              <Shield size={14} color="#7c3aed" /> Security Guarantee
            </button>
          </div>
        </div>

        {/* Divider & Copyright Notice */}
        <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px', fontSize: '0.82rem', color: '#64748b' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>Designed & Built with <Heart size={13} color="#ec4899" style={{ display: 'inline', verticalAlign: 'middle' }} /> by</span>
            <strong style={{ color: '#2563eb' }}>Vipin Gupta</strong>
          </div>

          <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
            © 2026 ResumePro. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
