import React, { useRef, useEffect } from 'react';
import { Award, Briefcase, FileCheck, Crown } from 'lucide-react';

export default function Hero3D() {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || !card.parentElement) return;

    const parent = card.parentElement;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animId;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      targetX = (y / (rect.height / 2)) * -18;
      targetY = (x / (rect.width / 2)) * 18;
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    parent.addEventListener('mousemove', handleMouseMove);
    parent.addEventListener('mouseleave', handleMouseLeave);

    // 120FPS LERP animation loop
    const animate = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      card.style.transform = `perspective(1000px) rotateX(${currentX}deg) rotateY(${currentY}deg) translateZ(20px)`;
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (parent) {
        parent.removeEventListener('mousemove', handleMouseMove);
        parent.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div style={{ perspective: '1000px', width: '100%', maxWidth: '480px', margin: '0 auto', position: 'relative' }}>
      {/* Decorative Card Backdrop Aura */}
      <div
        style={{
          position: 'absolute',
          top: '15px',
          left: '15px',
          right: '15px',
          bottom: '15px',
          background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.25), rgba(245, 158, 11, 0.2))',
          borderRadius: '30px',
          filter: 'blur(28px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />
      <div
        ref={cardRef}
        className="glass-card gpu-accelerated"
        style={{
          padding: '28px',
          background: '#ffffff',
          border: '1.5px solid rgba(37, 99, 235, 0.25)',
          borderTop: '4px solid #2563eb',
          borderRadius: '24px',
          position: 'relative',
          zIndex: 1,
          transformStyle: 'preserve-3d',
          boxShadow: '0 25px 60px -10px rgba(15, 23, 42, 0.18), 0 10px 30px -5px rgba(37, 99, 235, 0.15)'
        }}
      >
        {/* Floating 3D Gold Badge */}
        <div
          style={{
            position: 'absolute',
            top: '-14px',
            right: '-14px',
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            padding: '6px 14px',
            borderRadius: '20px',
            fontSize: '0.8rem',
            fontWeight: '700',
            color: '#fff',
            display: 'flex',
            align: 'center',
            gap: '6px',
            boxShadow: '0 6px 18px rgba(217, 119, 6, 0.35)',
            transform: 'translateZ(40px)'
          }}
        >
          <Crown size={15} /> 100% ATS Ready
        </div>

        {/* Resume Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px', transform: 'translateZ(30px)' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #2563eb 0%, #d97706 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '800',
              fontSize: '1.3rem',
              color: '#fff',
              boxShadow: '0 4px 14px rgba(217, 119, 6, 0.3)'
            }}
          >
            JD
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', color: '#0f172a', fontWeight: '800' }}>e.g. John Doe</h3>
            <p style={{ color: '#d97706', fontSize: '0.9rem', fontWeight: '700' }}>e.g. Full Stack Engineer</p>
          </div>
        </div>

        {/* Experience Section */}
        <div style={{ marginBottom: '16px', transform: 'translateZ(25px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '0.78rem', fontWeight: '700', marginBottom: '8px' }}>
            <Briefcase size={14} color="#d97706" /> FEATURED PROJECTS
          </div>
          <div
            style={{
              background: '#f8fafc',
              padding: '12px 14px',
              borderRadius: '12px',
              border: '1px solid #e2e8f0'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#0f172a', fontSize: '0.88rem', fontWeight: '700' }}>
              <span>e.g. Web Application</span>
              <span style={{ color: '#d97706', fontSize: '0.75rem', fontWeight: '700' }}>Full Stack</span>
            </div>
            <p style={{ color: '#475569', fontSize: '0.78rem', marginTop: '4px', lineHeight: '1.4' }}>
              Architected real-time WebSocket chat and high performance cloud engine.
            </p>
          </div>
        </div>

        {/* Skills Tags */}
        <div style={{ transform: 'translateZ(20px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '0.78rem', fontWeight: '700', marginBottom: '8px' }}>
            <Award size={14} color="#2563eb" /> TOP SKILLS
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {['React.js', 'Node.js', 'Express', 'MongoDB', 'Python', 'TypeScript'].map((skill, i) => (
              <span
                key={i}
                style={{
                  background: 'rgba(37, 99, 235, 0.08)',
                  border: '1px solid rgba(37, 99, 235, 0.25)',
                  color: '#2563eb',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  fontWeight: '700'
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Live Score Footnote */}
        <div
          style={{
            marginTop: '20px',
            paddingTop: '16px',
            borderTop: '1px solid #e2e8f0',
            display: 'flex',
            justify: 'space-between',
            alignItems: 'center',
            fontSize: '0.8rem',
            color: '#64748b',
            transform: 'translateZ(15px)'
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#16a34a', fontWeight: '700' }}>
            <FileCheck size={14} /> ATS Optimized
          </span>
          <span style={{ color: '#d97706', fontWeight: '700' }}>⚡ Ready for Export</span>
        </div>
      </div>
    </div>
  );
}
