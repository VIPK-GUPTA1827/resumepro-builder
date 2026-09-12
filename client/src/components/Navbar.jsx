import React from 'react';
import { Sparkles, Zap, MessageSquare } from 'lucide-react';

export default function Navbar({ onStartBuilding, onNavigate, onOpenFeedback }) {
  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        borderBottom: '1px solid #e2e8f0',
        padding: '12px 32px'
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          gap: '24px'
        }}
      >
        {/* Logo */}
        <div
          onClick={() => onNavigate('landing')}
          style={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontFamily: 'var(--font-heading)',
            fontWeight: '800',
            fontSize: '1.35rem',
            color: '#0f172a',
            flexShrink: 0
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #2563eb, #d97706)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(217, 119, 6, 0.25)'
            }}
          >
            <Sparkles size={18} color="#fff" />
          </div>
          Resume<span className="gradient-text-gold">Pro</span>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
          <button
            onClick={() => onNavigate('landing')}
            style={{
              background: 'rgba(15, 23, 42, 0.04)',
              border: '1px solid #e2e8f0',
              padding: '8px 16px',
              borderRadius: '8px',
              color: '#475569',
              fontFamily: 'var(--font-body)',
              fontSize: '0.88rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.target.style.color = '#0f172a';
              e.target.style.background = 'rgba(15, 23, 42, 0.08)';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#475569';
              e.target.style.background = 'rgba(15, 23, 42, 0.04)';
            }}
          >
            Home
          </button>

          {onOpenFeedback && (
            <button
              onClick={onOpenFeedback}
              style={{
                background: '#eff6ff',
                border: '1px solid #bfdbfe',
                padding: '8px 14px',
                borderRadius: '8px',
                color: '#2563eb',
                fontFamily: 'var(--font-body)',
                fontSize: '0.88rem',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.15s ease'
              }}
            >
              <MessageSquare size={14} color="#2563eb" /> Feedback
            </button>
          )}

          <button
            onClick={() => onStartBuilding()}
            className="btn-primary"
            style={{ padding: '9px 18px', fontSize: '0.88rem' }}
          >
            <Zap size={15} color="#fef08a" /> Create My Resume
          </button>
        </div>
      </div>
    </nav>
  );
}
