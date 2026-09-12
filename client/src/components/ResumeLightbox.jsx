import React, { useState } from 'react';
import { X, ZoomIn, ZoomOut, Maximize2, Download } from 'lucide-react';
import confetti from 'canvas-confetti';
import { exportToPDF } from '../utils/pdfExport';
import TemplateRenderer from './TemplateRenderer';

export default function ResumeLightbox({ data, template, onClose }) {
  const [zoom, setZoom] = useState(1);
  const [isExporting, setIsExporting] = useState(false);

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.15, 1.6));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.15, 0.6));

  const handleDownload = async () => {
    setIsExporting(true);
    confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    const nameStr = data?.personal?.fullName || data?.fullName || data?.personalInfo?.fullName;
    const name = nameStr ? `${nameStr.replace(/\s+/g, '_')}_Resume.pdf` : 'Vipin_Gupta_Resume.pdf';
    await exportToPDF(name);
    setIsExporting(false);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(5, 5, 16, 0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        display: 'flex',
        flexDirection: 'column',
        animation: 'fadeIn 0.3s ease-out'
      }}
    >
      {/* Top Controls Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 32px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'rgba(10, 10, 31, 0.8)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', fontWeight: '700', fontSize: '1.1rem' }}>
          <Maximize2 size={20} color="#06b6d4" /> Fullscreen Resume Inspector
        </div>

        {/* Zoom Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={handleZoomOut}
            className="btn-secondary"
            style={{ padding: '8px 14px', fontSize: '0.85rem' }}
            title="Zoom Out"
          >
            <ZoomOut size={16} />
          </button>
          <span style={{ color: '#fff', fontSize: '0.85rem', fontWeight: '700', minWidth: '45px', textAlign: 'center' }}>
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={handleZoomIn}
            className="btn-secondary"
            style={{ padding: '8px 14px', fontSize: '0.85rem' }}
            title="Zoom In"
          >
            <ZoomIn size={16} />
          </button>

          <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.15)', margin: '0 8px' }} />

          <button
            onClick={handleDownload}
            disabled={isExporting}
            className="btn-primary"
            style={{ padding: '8px 18px', fontSize: '0.85rem' }}
          >
            <Download size={16} /> {isExporting ? 'Exporting...' : 'Download PDF'}
          </button>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              color: '#fff',
              padding: '8px',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: '8px'
            }}
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Main Zoomable Viewer Body */}
      <div
        style={{
          flex: 1,
          overflow: 'auto',
          padding: '40px 20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start'
        }}
      >
        <div
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'top center',
            transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            maxWidth: '850px',
            width: '100%'
          }}
        >
          <TemplateRenderer resumeData={data} selectedTemplateId={template} />
        </div>
      </div>
    </div>
  );
}
