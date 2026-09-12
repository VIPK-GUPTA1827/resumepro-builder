import React from 'react';

export default function FloatingOrbs() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 0
      }}
    >
      {/* Orb 1: Soft Indigo (Top Left) */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '-5%',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.14) 0%, transparent 70%)',
          filter: 'blur(80px)'
        }}
      />

      {/* Orb 2: Soft Royal Blue (Top Right) */}
      <div
        style={{
          position: 'absolute',
          top: '5%',
          right: '-10%',
          width: '750px',
          height: '750px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 70%)',
          filter: 'blur(85px)'
        }}
      />

      {/* Orb 3: Soft Violet (Center Bottom) */}
      <div
        style={{
          position: 'absolute',
          top: '35%',
          left: '30%',
          width: '650px',
          height: '650px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)',
          filter: 'blur(90px)'
        }}
      />
    </div>
  );
}
