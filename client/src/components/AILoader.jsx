import React from 'react';
import { Bot, Sparkles } from 'lucide-react';

export default function AILoader({ status = "Gemini AI is enhancing your resume..." }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(5, 5, 16, 0.85)',
        backdropFilter: 'blur(16px)',
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff'
      }}
    >
      <div style={{ position: 'relative', width: '120px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Outer Pulsing Rings */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: '2px solid rgba(124, 58, 237, 0.5)',
            boxShadow: '0 0 30px var(--primary-glow)',
            animation: 'pingRing 2s cubic-bezier(0, 0, 0.2, 1) infinite'
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '80%',
            height: '80%',
            borderRadius: '50%',
            border: '2px dashed rgba(6, 182, 212, 0.7)',
            animation: 'spinRing 4s linear infinite'
          }}
        />
        
        {/* Center Icon */}
        <div
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 25px var(--pink-glow)'
          }}
        >
          <Bot size={32} color="#fff" />
        </div>
      </div>

      <div style={{ marginTop: '32px', textAlign: 'center' }}>
        <h3
          className="gradient-text"
          style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Sparkles size={20} /> Gemini AI Working Magic
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{status}</p>
      </div>

      <style>{`
        @keyframes spinRing {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pingRing {
          0% { transform: scale(0.85); opacity: 0.8; }
          50% { transform: scale(1.15); opacity: 0.4; }
          100% { transform: scale(0.85); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}
