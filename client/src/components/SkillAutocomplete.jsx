import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Plus } from 'lucide-react';
import { ALL_SKILLS_MASTER, JOB_SKILLS_MAPPING } from '../data/jobSkillsMaster';

export default function SkillAutocomplete({ selectedRole = '', currentSkills = [], onAddSkill, placeholder = "e.g. React.js, Python, Pharmacovigilance..." }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter skills not already added
  const filteredSuggestions = ALL_SKILLS_MASTER.filter(s =>
    s.toLowerCase().includes(query.toLowerCase()) &&
    !currentSkills.some(existing => existing.toLowerCase() === s.toLowerCase())
  );

  // Recommended skills for current target role (fuzzy matched)
  const matchedKey = selectedRole 
    ? Object.keys(JOB_SKILLS_MAPPING).find(key => key.toLowerCase() === selectedRole.toLowerCase())
      || Object.keys(JOB_SKILLS_MAPPING).find(key => key.toLowerCase().includes(selectedRole.toLowerCase()))
    : null;

  const roleSkills = matchedKey ? JOB_SKILLS_MAPPING[matchedKey] : [];

  const recommendedSkills = roleSkills.filter(r =>
    !currentSkills.some(existing => existing.toLowerCase() === r.toLowerCase())
  );

  const handleSelectSkill = (skillName) => {
    if (skillName.trim()) {
      onAddSkill(skillName.trim());
      setQuery('');
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && query.trim()) {
      e.preventDefault();
      handleSelectSkill(query.trim());
    }
  };

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%' }}>
      {/* Search Input */}
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          className="line-input"
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onClick={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          style={{ width: '100%' }}
        />
      </div>

      {/* Floating Suggestions Dropdown */}
      <AnimatePresence>
        {isOpen && filteredSuggestions.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: 'calc(100% + 6px)',
              left: 0,
              right: 0,
              zIndex: 9999,
              background: '#ffffff',
              border: '1.5px solid #cbd5e1',
              borderRadius: '12px',
              boxShadow: '0 12px 30px -5px rgba(15, 23, 42, 0.15)',
              maxHeight: '220px',
              overflowY: 'auto',
              margin: 0,
              padding: '6px 0',
              listStyle: 'none'
            }}
          >
            {filteredSuggestions.slice(0, 30).map((s, i) => (
              <li
                key={i}
                onClick={() => handleSelectSkill(s)}
                style={{
                  padding: '10px 16px',
                  fontSize: '0.88rem',
                  color: '#0f172a',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'background 0.15s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(37, 99, 235, 0.08)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <span>{s}</span>
                <span style={{ fontSize: '0.75rem', color: '#2563eb', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <Plus size={13} /> Add
                </span>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      {/* Role Recommendations Badges */}
      {recommendedSkills.length > 0 && (
        <div style={{ marginTop: '10px' }}>
          <div style={{ fontSize: '0.78rem', color: '#2563eb', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '6px' }}>
            <Sparkles size={13} /> Suggested for {selectedRole || 'Your Role'}:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {recommendedSkills.map((rec, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectSkill(rec)}
                style={{
                  background: '#eff6ff',
                  border: '1px solid #dbeafe',
                  color: '#2563eb',
                  padding: '4px 10px',
                  borderRadius: '14px',
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  transition: 'all 0.15s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#dbeafe';
                  e.currentTarget.style.transform = 'scale(1.03)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#eff6ff';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                + {rec}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
