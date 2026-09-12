import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQS = [
  {
    q: 'Will this resume pass ATS (Applicant Tracking System) screening?',
    a: 'Yes, 100%! The app formats your resume using clean, ATS-compliant typography, standard section headers, and action-verb lead bullet points that parsers at Workday, Greenhouse, and Lever read perfectly.'
  },
  {
    q: 'How does the builder enhance my project descriptions?',
    a: 'The smart template engine formats your raw project notes into quantified achievements (e.g., "Built API" becomes "Engineered high-throughput REST API using Node.js, reducing response latency by 42%").'
  },
  {
    q: 'Can I download my resume as a high-resolution PDF for free?',
    a: 'Absolutely! You can export a crisp, printable A4 PDF vector document without any watermarks or hidden payment walls.'
  },
  {
    q: 'What makes this different from generic resume builders?',
    a: 'Generic builders offer cluttered designs. This builder uses clean semantic templates designed specifically for high-paying remote tech jobs.'
  },
  {
    q: 'Is my data private and secure?',
    a: 'Yes. All data processing happens on-the-fly and your personal information is never stored or sold to third-party advertisers.'
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#2563eb', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
          <HelpCircle size={16} /> Got Questions?
        </div>
        <h2 style={{ fontSize: '2.2rem', fontWeight: '800' }}>
          Frequently Asked <span className="gradient-text">Questions</span>
        </h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {FAQS.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className="glass-card"
              style={{
                borderRadius: '14px',
                overflow: 'hidden',
                border: isOpen ? '1px solid rgba(37, 99, 235, 0.45)' : '1px solid rgba(226, 232, 240, 0.8)',
                background: isOpen ? 'rgba(239, 246, 255, 0.75)' : 'rgba(255, 255, 255, 0.55)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                transition: 'all 0.3s ease'
              }}
            >
              <button
                onClick={() => toggle(i)}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '20px 24px',
                  background: 'none',
                  border: 'none',
                  color: '#0f172a',
                  fontSize: '1.05rem',
                  fontWeight: '700',
                  textAlign: 'left',
                  cursor: 'pointer'
                }}
              >
                <span>{faq.q}</span>
                <ChevronDown
                  size={18}
                  style={{
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                    color: isOpen ? '#2563eb' : '#94a3b8'
                  }}
                />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div
                      style={{
                        padding: '0 24px 20px 24px',
                        color: '#475569',
                        lineHeight: '1.6',
                        fontSize: '0.95rem',
                        borderTop: '1px solid #e2e8f0',
                        paddingTop: '14px'
                      }}
                    >
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
