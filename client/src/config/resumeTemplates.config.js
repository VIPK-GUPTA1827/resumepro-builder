/**
 * Resume Template Theme Configuration (10 Unique Professional & ATS Layouts)
 * ------------------------------------------------------------------
 * Har template ka apna distinct border style, color accent, font family aur layout system hai.
 */

export const resumeTemplates = {

  // 1. ATS CLASSIC — Corporate Royal Blue Section Underlines
  atsClassic: {
    id: 'atsClassic',
    name: 'ATS Classic',
    tagline: 'Clean corporate section underlines — 100% recruiter & ATS safe',
    atsSafety: 'high',
    layout: 'singleColumn',
    colors: {
      background: '#ffffff',
      surface: '#ffffff',
      text: '#1e293b',
      textMuted: '#475569',
      accent: '#2563eb',       // Royal Blue
      border: '#e2e8f0',
    },
    fonts: {
      heading: '"Georgia", "Times New Roman", serif',
      body: '"Arial", "Helvetica", sans-serif',
    },
    spacing: {
      sectionGap: '24px',
      lineHeight: '1.5',
    },
  },

  // 2. STEEL BLUE SLANTED (Photo 1 Style) — Slanted Top Shape & Round Dots
  canvaSlanted: {
    id: 'canvaSlanted',
    name: 'Steel Blue Slanted',
    tagline: 'Photo 1 Style — Slanted top-left blue shape & round timeline dots',
    atsSafety: 'medium',
    layout: 'layoutSlantedCut',
    colors: {
      background: '#ffffff',
      sidebar: '#f8fafc',
      surface: '#ffffff',
      text: '#1e293b',
      textMuted: '#64748b',
      accent: '#5b82b6',       // Steel Blue
      accentDark: '#3b5998',
      border: '#cbd5e1',
    },
    fonts: {
      heading: '"Space Grotesk", sans-serif',
      body: '"Plus Jakarta Sans", sans-serif',
    },
    spacing: {
      sectionGap: '22px',
      lineHeight: '1.5',
    },
  },

  // 3. DEEP PLUM BANNER (Photo 2 Style) — Plum Header & Square Nodes
  canvaPlum: {
    id: 'canvaPlum',
    name: 'Deep Plum Banner',
    tagline: 'Photo 2 Style — Deep plum header banner & square timeline nodes',
    atsSafety: 'medium',
    layout: 'layoutPlumBanner',
    colors: {
      background: '#ffffff',
      sidebar: '#f4eff2',
      bannerBg: '#4a2342',      // Deep Plum/Wine
      surface: '#ffffff',
      text: '#2d1b28',
      textMuted: '#6b5364',
      accent: '#4a2342',
      border: '#e4dbe0',
    },
    fonts: {
      heading: '"Space Grotesk", sans-serif',
      body: '"Plus Jakarta Sans", sans-serif',
    },
    spacing: {
      sectionGap: '22px',
      lineHeight: '1.5',
    },
  },

  // 4. CENTER SPLIT LAYOUT (Photo 3 Style) — Full-Height Vertical Center Divider
  canvaCenterSplit: {
    id: 'canvaCenterSplit',
    name: 'Center Split Layout',
    tagline: 'Photo 3 Style — Full-height vertical center divider border',
    atsSafety: 'high',
    layout: 'layoutCenterSplit',
    colors: {
      background: '#ffffff',
      surface: '#ffffff',
      text: '#1e293b',
      textMuted: '#475569',
      accent: '#0f766e',       // Deep Teal
      border: '#cbd5e1',
    },
    fonts: {
      heading: '"Space Grotesk", sans-serif',
      body: '"Inter", sans-serif',
    },
    spacing: {
      sectionGap: '24px',
      lineHeight: '1.5',
    },
  },

  // 5. DUAL-TONE MINIMAL (Photo 4 Style) — Bold/Light Name & Crisp Underlines
  canvaDualTone: {
    id: 'canvaDualTone',
    name: 'Dual-Tone Minimal',
    tagline: 'Photo 4 Style — Bold/Light name title & crisp horizontal lines',
    atsSafety: 'high',
    layout: 'layoutDualTone',
    colors: {
      background: '#ffffff',
      surface: '#ffffff',
      text: '#0f172a',
      textMuted: '#475569',
      accent: '#4338ca',       // Indigo Blue
      border: '#e2e8f0',
    },
    fonts: {
      heading: '"Space Grotesk", sans-serif',
      body: '"Plus Jakarta Sans", sans-serif',
    },
    spacing: {
      sectionGap: '22px',
      lineHeight: '1.5',
    },
  },

  // 6. DOUBLE GOLD FRAME — Double Outer Border Frame
  canvaDoubleFrame: {
    id: 'canvaDoubleFrame',
    name: 'Double Gold Frame',
    tagline: 'Elegant double outer border frame & serif headings',
    atsSafety: 'high',
    layout: 'layoutDoubleFrame',
    colors: {
      background: '#fafaf9',
      surface: '#ffffff',
      text: '#1c1917',
      textMuted: '#57534e',
      accent: '#d97706',       // Warm Gold
      border: '#d6d3d1',
      frameBorder: '#d97706',
    },
    fonts: {
      heading: '"Georgia", "Times New Roman", serif',
      body: '"Georgia", serif',
    },
    spacing: {
      sectionGap: '26px',
      lineHeight: '1.6',
    },
  },

  // 7. MODERN ICE BLUE SPLIT — Ice Blue Sidebar & Cyan Accents
  modernTwoCol: {
    id: 'modernTwoCol',
    name: 'Modern Ice Blue Split',
    tagline: 'Soft Ice Blue sidebar with clean vertical divider border',
    atsSafety: 'medium',
    layout: 'twoColumnLight',
    colors: {
      background: '#ffffff',
      sidebar: '#f0f9ff',      // Soft Ice Blue
      surface: '#ffffff',
      text: '#0f172a',
      textMuted: '#64748b',
      accent: '#0284c7',       // Ocean Cyan
      border: '#bae6fd',
    },
    fonts: {
      heading: '"Space Grotesk", sans-serif',
      body: '"Plus Jakarta Sans", sans-serif',
    },
    spacing: {
      sectionGap: '20px',
      lineHeight: '1.5',
    },
  },

  // 8. EMERALD CARDS LAYOUT — Emerald Section Cards with 3.5px Top Bar
  canvaGlassCards: {
    id: 'canvaGlassCards',
    name: 'Emerald Cards Layout',
    tagline: 'Sections wrapped inside rounded white cards with top emerald accent bar',
    atsSafety: 'medium',
    layout: 'layoutGlassCards',
    colors: {
      background: '#f0fdf4',
      surface: '#ffffff',
      text: '#064e3b',
      textMuted: '#047857',
      accent: '#16a34a',       // Emerald Green
      border: '#bbf7d0',
    },
    fonts: {
      heading: '"Space Grotesk", sans-serif',
      body: '"Inter", sans-serif',
    },
    spacing: {
      sectionGap: '20px',
      lineHeight: '1.5',
    },
  },

  // 9. DASHED CREATIVE — Dashed Section Dividers & Purple Bullets
  canvaDashed: {
    id: 'canvaDashed',
    name: 'Dashed Creative',
    tagline: 'Modern dashed section dividers & purple dot accents',
    atsSafety: 'creative',
    layout: 'layoutDashedCreative',
    colors: {
      background: '#ffffff',
      sidebar: '#f3e8ff',
      surface: '#ffffff',
      text: '#1e1b4b',
      textMuted: '#6b21a8',
      accent: '#9333ea',       // Purple Accent
      border: '#d8b4fe',
    },
    fonts: {
      heading: '"Space Grotesk", sans-serif',
      body: '"Plus Jakarta Sans", sans-serif',
    },
    spacing: {
      sectionGap: '20px',
      lineHeight: '1.5',
    },
  },

  // 10. CRIMSON RIBBON EDGE — 6px Thick Solid Crimson Left Edge Ribbon
  canvaLeftRibbon: {
    id: 'canvaLeftRibbon',
    name: 'Crimson Ribbon Edge',
    tagline: 'Full-height 6px solid crimson left ribbon edge border',
    atsSafety: 'high',
    layout: 'layoutLeftRibbon',
    colors: {
      background: '#ffffff',
      surface: '#ffffff',
      text: '#111827',
      textMuted: '#4b5563',
      accent: '#e11d48',       // Crimson Rose
      border: '#fecdd3',
    },
    fonts: {
      heading: '"Space Grotesk", sans-serif',
      body: '"Inter", sans-serif',
    },
    spacing: {
      sectionGap: '24px',
      lineHeight: '1.5',
    },
  },

  // 11. OXFORD CLASSIC — Traditional Serif Headings & Left-Border Highlights
  oxfordClassic: {
    id: 'oxfordClassic',
    name: 'Oxford Classic',
    tagline: 'Traditional serif headings & left-border highlights — highly ATS-safe',
    atsSafety: 'high',
    layout: 'oxfordClassic',
    colors: {
      background: '#ffffff',
      surface: '#ffffff',
      text: '#1e293b',
      textMuted: '#475569',
      accent: '#1e3a5f',       // Corporate Navy Blue
      border: '#cbd5e1',
    },
    fonts: {
      heading: '"Georgia", "Times New Roman", serif',
      body: '"Inter", sans-serif',
    },
    spacing: {
      sectionGap: '22px',
      lineHeight: '1.5',
    },
  },
};

// Helper: badge text/color based on ATS safety level
export const atsSafetyBadge = {
  high: { label: 'ATS-Safe', color: '#16a34a', bg: '#dcfce7', border: '#86efac' },
  medium: { label: 'ATS-Friendly', color: '#0284c7', bg: '#e0f2fe', border: '#7dd3fc' },
  creative: { label: 'Creative Style', color: '#9333ea', bg: '#f3e8ff', border: '#d8b4fe' },
};
