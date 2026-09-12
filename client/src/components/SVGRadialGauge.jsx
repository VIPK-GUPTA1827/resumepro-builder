import React, { useEffect, useState } from 'react';

export default function SVGRadialGauge({ score = 0, size = 120, strokeWidth = 10, showLabel = true }) {
  const [animatedScore, setAnimatedScore] = useState(0);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    let start = 0;
    const duration = 1200; // ms
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = score / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.round(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [score]);

  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  let strokeColor = '#10b981'; // Green (>= 70)
  let glowColor = 'rgba(16, 185, 129, 0.35)';
  if (score === 0) {
    strokeColor = '#cbd5e1'; // Neutral Gray (0)
    glowColor = 'transparent';
  } else if (score < 40) {
    strokeColor = '#ef4444'; // Red (< 40)
    glowColor = 'rgba(239, 68, 68, 0.35)';
  } else if (score < 70) {
    strokeColor = '#f59e0b'; // Amber (40 - 69)
    glowColor = 'rgba(245, 158, 11, 0.35)';
  }

  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', filter: `drop-shadow(0 0 10px ${glowColor})`, transition: 'filter 0.5s ease' }}>
        {/* Track Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e2e8f0"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Animated Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          style={{ transition: 'stroke-dashoffset 0.6s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.5s ease' }}
        />
      </svg>

      {showLabel && (
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center'
          }}
        >
          <span style={{ fontSize: `${size * 0.28}px`, fontWeight: '800', color: '#0f172a', lineHeight: 1, fontFamily: 'var(--font-heading)' }}>
            {animatedScore}
          </span>
          <span style={{ fontSize: `${size * 0.12}px`, color: '#64748b', fontWeight: '700', marginTop: '2px' }}>
            / 100
          </span>
        </div>
      )}
    </div>
  );
}
