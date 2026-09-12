import React from 'react';
import StepForm from '../components/StepForm';
import { ArrowLeft } from 'lucide-react';

export default function FormPage({ onGenerateAI, onBack }) {
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 24px 80px 24px', position: 'relative', zIndex: 1 }}>
      <button
        onClick={onBack}
        className="btn-secondary"
        style={{ marginBottom: '24px', padding: '8px 16px', fontSize: '0.85rem' }}
      >
        <ArrowLeft size={16} /> Back to Home
      </button>

      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '8px' }}>
          Enter Resume Details & <span className="gradient-text">Build Your Resume</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
          Fill out your information below. Professional templates will instantly format your resume for export.
        </p>
      </div>

      <StepForm onGenerateAI={onGenerateAI} />
    </div>
  );
}
