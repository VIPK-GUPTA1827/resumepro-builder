import React from 'react';
import { Sparkles, FileText, Zap, ShieldCheck, Download, CheckCircle2, ArrowRight, Award, TrendingUp, Users, Clock, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import Hero3D from '../components/Hero3D';
import ATSCalculator from '../components/ATSCalculator';
import FAQSection from '../components/FAQSection';
import FloatingOrbs from '../components/FloatingOrbs';

export default function Landing({ onStartBuilding }) {
  return (
    <div style={{ position: 'relative', zIndex: 1, paddingBottom: '60px' }}>
      {/* 3D Floating Background Glowing Orbs */}
      <FloatingOrbs />

      {/* Hero Section */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 40px 24px', position: 'relative' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '40px',
            alignItems: 'center'
          }}
        >
          {/* Hero Left Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.12 }
              }
            }}
          >
            <motion.div
              variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(37, 99, 235, 0.08)',
                border: '1px solid rgba(37, 99, 235, 0.25)',
                padding: '8px 16px',
                borderRadius: '30px',
                fontSize: '0.85rem',
                color: '#2563eb',
                fontWeight: '700',
                marginBottom: '20px'
              }}
            >
              <Sparkles size={16} color="#2563eb" /> Fast & Modern Resume Builder
            </motion.div>

            <motion.h1
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              style={{
                fontSize: '3.4rem',
                lineHeight: '1.15',
                fontWeight: '800',
                marginBottom: '20px',
                color: '#0f172a'
              }}
            >
              Build Your Dream Resume in <span className="gradient-text-gold">30 Seconds</span>
            </motion.h1>

            <motion.p
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              style={{
                fontSize: '1.15rem',
                lineHeight: '1.6',
                color: '#475569',
                marginBottom: '32px'
              }}
            >
              Build a world-class, ATS-friendly resume that gets you noticed by top companies and hiring managers anywhere in the world. Turn your work experience into impressive, high-impact achievements in just 30 seconds.
            </motion.p>

            {/* Framer Motion Interactive Buttons */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onStartBuilding}
                className="btn-primary"
              >
                <Zap size={18} /> Create Resume Free <ArrowRight size={18} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04, borderColor: '#2563eb', color: '#2563eb' }}
                whileTap={{ scale: 0.96 }}
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                style={{
                  background: '#ffffff',
                  border: '1.5px solid #cbd5e1',
                  color: '#334155',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  fontSize: '0.95rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
                  transition: 'all 0.2s ease'
                }}
              >
                <FileText size={18} color="#2563eb" /> See How It Works →
              </motion.button>
            </motion.div>

            {/* Quick Badges */}
            <motion.div
              className="trust-badges"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '16px',
                marginTop: '28px',
                fontSize: '0.9rem',
                color: '#1e293b',
                fontWeight: '700',
                position: 'relative',
                zIndex: 10
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} color="#16a34a" /> No Credit Card
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} color="#16a34a" /> 100% Free Export
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} color="#16a34a" /> ATS Score 98%+
              </span>
            </motion.div>
          </motion.div>

          {/* Hero Right 3D Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Hero3D />
          </motion.div>
        </div>
      </section>

      {/* STAT COUNTERS SECTION */}
      <section style={{ maxWidth: '1100px', margin: '0 auto 50px auto', padding: '0 24px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '16px'
          }}
        >
          {[
            { label: 'Optimization Engine', val: 'Built for Speed & ATS', icon: Users, color: '#2563eb', iconBg: 'rgba(37, 99, 235, 0.1)' },
            { label: 'Format Compliance', val: '100% Parser Safe', icon: Award, color: '#2563eb', iconBg: 'rgba(37, 99, 235, 0.1)' },
            { label: 'Avg Build Time', val: '< 30 Seconds', icon: Clock, color: '#2563eb', iconBg: 'rgba(37, 99, 235, 0.1)' },
            { label: 'Bullet Impact', val: 'Action-Quantified', icon: TrendingUp, color: '#2563eb', iconBg: 'rgba(37, 99, 235, 0.1)' }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              style={{
                padding: '20px 24px',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                background: 'rgba(255, 255, 255, 0.62)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(226, 232, 240, 0.8)',
                borderTop: '3.5px solid #2563eb',
                borderRadius: '16px',
                boxShadow: '0 4px 15px rgba(15, 23, 42, 0.03)'
              }}
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: stat.iconBg,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '8px',
                  color: stat.color
                }}
              >
                <stat.icon size={20} />
              </div>
              <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f172a', marginBottom: '2px' }}>
                {stat.val}
              </div>
              <div style={{ fontSize: '0.82rem', color: '#475569', fontWeight: '600' }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '0.78rem', color: '#94a3b8', fontWeight: '500' }}>
          * Performance standards benchmarks based on Workday, Greenhouse & Lever HR parser guidelines.
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" style={{ maxWidth: '1100px', margin: '0 auto 60px auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#2563eb', fontSize: '0.85rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
            <Sparkles size={16} /> Simple & Fast Process
          </div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#0f172a' }}>
            How It Works in <span className="gradient-text">3 Easy Steps</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {[
            {
              step: '01',
              title: 'Fill Your Details',
              desc: 'Enter your target job title, technical skills, and key projects in a clean step-by-step form.',
              icon: FileText,
              color: '#2563eb',
              bg: '#eff6ff',
              borderColor: 'rgba(37, 99, 235, 0.25)',
              topBorder: '#2563eb'
            },
            {
              step: '02',
              title: 'AI Bullet Optimization',
              desc: 'Smart algorithms rewrite your raw bullets into high-impact action verbs with quantified metrics.',
              icon: Zap,
              color: '#d97706',
              bg: '#fffbeb',
              borderColor: 'rgba(217, 119, 6, 0.25)',
              topBorder: '#d97706'
            },
            {
              step: '03',
              title: 'Instant ATS PDF Export',
              desc: 'Preview in high-res vector templates and download your 100% parser-safe PDF in 1 click.',
              icon: Download,
              color: '#16a34a',
              bg: '#f0fdf4',
              borderColor: 'rgba(22, 163, 74, 0.25)',
              topBorder: '#16a34a'
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 35, rotateX: 12 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, scale: 1.02 }}
              style={{
                background: 'rgba(255, 255, 255, 0.58)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: `1.5px solid ${item.borderColor}`,
                borderTop: `3.5px solid ${item.topBorder}`,
                borderRadius: '20px',
                padding: '32px 28px',
                position: 'relative',
                boxShadow: '0 10px 30px -10px rgba(15, 23, 42, 0.04)',
                transformStyle: 'preserve-3d'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                  style={{ width: '48px', height: '48px', borderRadius: '12px', background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.color }}
                >
                  <item.icon size={24} />
                </motion.div>
                <span style={{ fontSize: '1.8rem', fontWeight: '900', color: '#cbd5e1', fontFamily: 'var(--font-heading)' }}>
                  {item.step}
                </span>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', marginBottom: '10px' }}>
                {item.title}
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: '1.6' }}>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bento Grid Section */}
      <section style={{ maxWidth: '1100px', margin: '0 auto 50px auto', padding: '0 24px' }}>
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.52)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '40px 32px',
            border: '1px solid rgba(226, 232, 240, 0.8)',
            borderTop: '3.5px solid #2563eb',
            boxShadow: '0 10px 30px -10px rgba(15, 23, 42, 0.05)'
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: 'center', marginBottom: '36px' }}
          >
            <h2 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#0f172a', marginBottom: '10px' }}>
              Built with <span className="gradient-text">Pro Resume Features</span>
            </h2>
            <p style={{ color: '#64748b', fontSize: '1rem', maxWidth: '600px', margin: '0 auto' }}>
              Everything you need to bypass automated screening filters and secure top-tier tech interviews.
            </p>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px'
            }}
          >
            {/* Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.03, translateY: -6 }}
              style={{
                padding: '28px',
                background: 'rgba(255, 255, 255, 0.65)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1.5px solid rgba(37, 99, 235, 0.22)',
                borderTop: '3.5px solid #2563eb',
                borderRadius: '16px',
                boxShadow: '0 4px 15px rgba(15, 23, 42, 0.03)'
              }}
            >
              <motion.div
                whileHover={{ scale: 1.18, rotate: 8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'rgba(37, 99, 235, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#2563eb',
                  marginBottom: '16px'
                }}
              >
                <FileText size={22} />
              </motion.div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#0f172a', marginBottom: '8px' }}>
                Multiple Premium Templates
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.5' }}>
                Choose between Executive, Minimal, and Creative layouts tailored for modern software and engineering roles.
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.03, translateY: -6 }}
              style={{
                padding: '28px',
                background: 'rgba(255, 255, 255, 0.65)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1.5px solid rgba(2, 132, 199, 0.22)',
                borderTop: '3.5px solid #0284c7',
                borderRadius: '16px',
                boxShadow: '0 4px 15px rgba(15, 23, 42, 0.03)'
              }}
            >
              <motion.div
                whileHover={{ scale: 1.18, rotate: 8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'rgba(2, 132, 199, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0284c7',
                  marginBottom: '16px'
                }}
              >
                <ShieldCheck size={22} />
              </motion.div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#0f172a', marginBottom: '8px' }}>
                Real-Time Live Preview
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.5' }}>
                See your resume update instantly as you type bullet points, skills, and work experience.
              </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.03, translateY: -6 }}
              style={{
                padding: '28px',
                background: 'rgba(255, 255, 255, 0.65)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1.5px solid rgba(225, 29, 72, 0.22)',
                borderTop: '3.5px solid #e11d48',
                borderRadius: '16px',
                boxShadow: '0 4px 15px rgba(15, 23, 42, 0.03)'
              }}
            >
              <motion.div
                whileHover={{ scale: 1.18, rotate: 8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'rgba(225, 29, 72, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#e11d48',
                  marginBottom: '16px'
                }}
              >
                <Download size={22} />
              </motion.div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#0f172a', marginBottom: '8px' }}>
                Keyword Match & Gap Analysis
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.5' }}>
                Interactively test your resume against target job roles to highlight missing tech keywords before submitting.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive ATS Calculator Section */}
      <section style={{ maxWidth: '1100px', margin: '0 auto 50px auto', padding: '0 24px' }}>
        <ATSCalculator onStartBuilding={onStartBuilding} />
      </section>

      {/* FAQ Accordion Section */}
      <section style={{ maxWidth: '1100px', margin: '0 auto 60px auto', padding: '0 24px' }}>
        <FAQSection />
      </section>
    </div>
  );
}
