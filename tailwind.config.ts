import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // All semantic colors reference CSS variables — they flip automatically with .dark
        base:     'var(--bg-base)',
        surface:  'var(--bg-surface)',
        card:     'var(--bg-card)',
        border:   'var(--border-c)',
        primary:  'var(--text-primary)',
        muted:    'var(--text-muted)',
        positive: 'var(--positive)',
        negative: 'var(--negative)',
        // Accent colors are identical in both modes
        'accent-yt':       '#f5a623',
        'accent-store':    '#22d3c5',
        'accent-combined': '#a78bfa',
      },
      fontFamily: {
        mono: ['"IBM Plex Mono"', 'monospace'],
        sans: ['"DM Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
