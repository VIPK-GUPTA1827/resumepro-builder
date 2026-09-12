import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, ChevronDown, Check } from 'lucide-react';
import { JOB_ROLES_MASTER } from '../data/jobSkillsMaster';

export default function JobRoleAutocomplete({ value, onChange, placeholder = "e.g. Full Stack Engineer, Pharmacist..." }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(value || '');
  const containerRef = useRef(null);

  useEffect(() => {
    setSearchQuery(value || '');
  }, [value]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredRoles = JOB_ROLES_MASTER.filter(role =>
    role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (role) => {
    setSearchQuery(role);
    onChange(role);
    setIsOpen(false);
  };

  const handleInputChange = (e) => {
    const newVal = e.target.value;
    setSearchQuery(newVal);
    onChange(newVal);
    setIsOpen(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === 'Escape' || e.key === 'Tab') {
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%' }}>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          className="line-input"
          placeholder={placeholder}
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onClick={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          style={{ width: '100%', paddingRight: '36px', cursor: 'pointer' }}
        />
        <ChevronDown
          size={18}
          style={{
            position: 'absolute',
            right: '12px',
            color: '#94a3b8',
            pointerEvents: 'none',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s'
          }}
        />
      </div>

      <AnimatePresence>
        {isOpen && filteredRoles.length > 0 && (
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
          {filteredRoles.map((role, i) => {
            const isSelected = value === role;
            return (
              <li
                key={i}
                onClick={() => handleSelect(role)}
                style={{
                  padding: '10px 16px',
                  fontSize: '0.9rem',
                  fontWeight: isSelected ? '700' : '500',
                  color: isSelected ? '#2563eb' : '#0f172a',
                  background: isSelected ? 'rgba(37, 99, 235, 0.08)' : 'transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'background 0.15s'
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) e.currentTarget.style.background = '#f8fafc';
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) e.currentTarget.style.background = 'transparent';
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Briefcase size={14} color="#64748b" /> {role}
                </span>
                {isSelected && <Check size={16} color="#2563eb" />}
              </li>
            );
          })}
        </motion.ul>
      )}
    </AnimatePresence>
  </div>
  );
}
