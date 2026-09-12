import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { MessageSquare, Star, Send, X, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';

export default function FeedbackModal({ onClose }) {
  const [category, setCategory] = useState('suggestion'); // 'suggestion' | 'review' | 'bug'
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);

    // Save feedback draft in LocalStorage backup array
    try {
      const existing = JSON.parse(localStorage.getItem('resumepro_feedbacks') || '[]');
      existing.push({
        category,
        rating,
        name: name.trim() || 'Anonymous User',
        email: email.trim() || 'N/A',
        message: message.trim(),
        date: new Date().toISOString()
      });
      localStorage.setItem('resumepro_feedbacks', JSON.stringify(existing));
    } catch (err) {
      console.warn('Could not persist feedback to storage:', err);
    }

    // Simulate instant 500ms network submit transition
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 450);
  };

  return createPortal(
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 999999,
        background: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          zIndex: 100000,
          background: '#ffffff',
          borderRadius: '20px',
          maxWidth: '540px',
          width: '100%',
          boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.45)',
          border: '1.5px solid #cbd5e1',
          overflow: 'hidden',
          animation: 'fadeInModal 0.25s ease-out'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid #f1f5f9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#f8fafc'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: '#2563eb15', padding: '8px', borderRadius: '10px' }}>
              <MessageSquare size={20} color="#2563eb" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                Share Feedback & Suggestions
              </h2>
              <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: '600' }}>
                Help us make ResumePro even better for everyone
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: '#f1f5f9',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#64748b'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        {submitted ? (
          <div style={{ padding: '40px 24px', textAlign: 'center' }}>
            <div style={{ width: '64px', height: '64px', background: '#f0fdf4', borderRadius: '50%', border: '2px solid #bbf7d0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', color: '#16a34a' }}>
              <CheckCircle2 size={36} />
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#0f172a', margin: '0 0 8px 0' }}>
              Thank You for Your Feedback! ❤️
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.6', margin: '0 0 24px 0' }}>
              Your suggestions help us continuously improve ResumePro. We review every single idea to build the features you need most!
            </p>
            <button
              onClick={onClose}
              className="btn-primary"
              style={{ padding: '10px 24px', fontSize: '0.88rem' }}
            >
              Done & Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
            
            {/* Category Selector */}
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#475569', marginBottom: '8px' }}>
                What kind of feedback do you have?
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => setCategory('suggestion')}
                  style={{
                    padding: '8px 10px',
                    borderRadius: '10px',
                    border: category === 'suggestion' ? '1.5px solid #2563eb' : '1px solid #cbd5e1',
                    background: category === 'suggestion' ? '#eff6ff' : '#ffffff',
                    color: category === 'suggestion' ? '#2563eb' : '#475569',
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px'
                  }}
                >
                  <Sparkles size={14} /> Suggestion
                </button>

                <button
                  type="button"
                  onClick={() => setCategory('review')}
                  style={{
                    padding: '8px 10px',
                    borderRadius: '10px',
                    border: category === 'review' ? '1.5px solid #0284c7' : '1px solid #cbd5e1',
                    background: category === 'review' ? '#f0f9ff' : '#ffffff',
                    color: category === 'review' ? '#0284c7' : '#475569',
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px'
                  }}
                >
                  <Star size={14} /> Review
                </button>

                <button
                  type="button"
                  onClick={() => setCategory('bug')}
                  style={{
                    padding: '8px 10px',
                    borderRadius: '10px',
                    border: category === 'bug' ? '1.5px solid #e11d48' : '1px solid #cbd5e1',
                    background: category === 'bug' ? '#fff1f2' : '#ffffff',
                    color: category === 'bug' ? '#e11d48' : '#475569',
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px'
                  }}
                >
                  <AlertCircle size={14} /> Report Bug
                </button>
              </div>
            </div>

            {/* Star Rating Picker */}
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>
                How would you rate your experience with ResumePro?
              </label>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={24}
                    style={{ cursor: 'pointer', transition: 'transform 0.1s ease' }}
                    fill={(hoverRating || rating) >= star ? '#f59e0b' : 'transparent'}
                    color={(hoverRating || rating) >= star ? '#f59e0b' : '#cbd5e1'}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                  />
                ))}
                <span style={{ fontSize: '0.82rem', fontWeight: '700', color: '#64748b', marginLeft: '8px' }}>
                  {rating === 5 ? '⭐ Excellent' : rating === 4 ? '👍 Good' : rating === 3 ? '😐 Okay' : '👎 Needs Improvement'}
                </span>
              </div>
            </div>

            {/* Optional Name & Email Inputs */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>
                  Your Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Alex Smith"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.85rem',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>
                  Email (Optional)
                </label>
                <input
                  type="email"
                  placeholder="alex@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.85rem',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            {/* Main Message Textarea */}
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>
                Your Feedback or Feature Request <span style={{ color: '#e11d48' }}>*</span>
              </label>
              <textarea
                rows={4}
                required
                placeholder="Tell us what new feature you would like to see, or any idea to improve the templates..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.88rem',
                  lineHeight: '1.5',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit',
                  resize: 'none'
                }}
              />
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '4px' }}>
              <button
                type="button"
                onClick={onClose}
                style={{
                  padding: '8px 16px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  background: '#f8fafc',
                  color: '#475569',
                  fontWeight: '700',
                  fontSize: '0.84rem',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !message.trim()}
                className="btn-primary"
                style={{
                  padding: '8px 20px',
                  fontSize: '0.84rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  opacity: (!message.trim() || isSubmitting) ? 0.6 : 1,
                  cursor: (!message.trim() || isSubmitting) ? 'not-allowed' : 'pointer'
                }}
              >
                <Send size={14} /> {isSubmitting ? 'Sending...' : 'Submit Feedback'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>,
    document.body
  );
}
