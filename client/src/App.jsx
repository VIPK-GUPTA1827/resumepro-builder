import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FeedbackModal from './components/FeedbackModal';
import LegalModal from './components/LegalModal';
import ParticlesBG from './components/ParticlesBG';
import Landing from './pages/Landing';
import FormPage from './pages/FormPage';
import Preview from './pages/Preview';
import { initSecurityGuard } from './utils/security';

export default function App() {
  const [view, setView] = useState('landing'); // 'landing' | 'form' | 'preview'
  const [resumeData, setResumeData] = useState(null);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [legalTab, setLegalTab] = useState(null); // 'privacy' | 'terms' | 'about' | 'security'

  useEffect(() => {
    initSecurityGuard();
  }, []);

  const handleGenerateResume = (formData) => {
    setResumeData(formData);
    setView('preview');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      {/* Top-Level Global Modals (Outside all stacking contexts) */}
      {isFeedbackOpen && (
        <FeedbackModal onClose={() => setIsFeedbackOpen(false)} />
      )}

      {legalTab && (
        <LegalModal initialTab={legalTab} onClose={() => setLegalTab(null)} />
      )}

      <div>
        {/* 3D Space Particles Background */}
        <ParticlesBG />

        {/* Aurora Ambient Mesh Background */}
        <div className="aurora-bg">
          <div className="aurora-orb orb-purple" />
          <div className="aurora-orb orb-cyan" />
          <div className="aurora-orb orb-gold" />
          <div className="aurora-orb orb-pink" />
          <div className="aurora-orb orb-emerald" />
          <div className="aurora-orb orb-sky" />
        </div>

        {/* Main Navbar */}
        <Navbar
          onStartBuilding={() => setView('form')}
          onNavigate={(page) => setView(page)}
          onOpenFeedback={() => setIsFeedbackOpen(true)}
          onOpenLegal={(tab) => setLegalTab(tab)}
        />

        {/* Page Routing */}
        {view === 'landing' && <Landing onStartBuilding={() => setView('form')} />}
        {view === 'form' && (
          <FormPage onGenerateAI={handleGenerateResume} onBack={() => setView('landing')} />
        )}
        {view === 'preview' && (
          <Preview
            resumeData={resumeData}
            onEdit={() => setView('form')}
            onReGenerate={() => handleGenerateResume(resumeData)}
            onRestoreData={(restored) => setResumeData(restored)}
          />
        )}
      </div>

      {/* Persistent Legal & Trust Footer */}
      <Footer
        onOpenFeedback={() => setIsFeedbackOpen(true)}
        onOpenLegal={(tab) => setLegalTab(tab)}
      />
    </div>
  );
}
