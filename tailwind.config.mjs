/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        atlas: {
          bg: '#0a0b0f',
          surface: '#0f1117',
          'surface-2': '#161820',
          border: '#1c1f2e',
          'border-2': '#2a2d3e',
          accent: '#6366f1',
          'accent-dim': '#4f46e5',
          'accent-hover': '#818cf8',
          secondary: '#22d3ee',
          'secondary-hover': '#67e8f9',
          cyan: '#22d3ee',
          muted: '#64748b',
          'muted-2': '#94a3b8',
          text: '#f1f5f9',
          'text-bright': '#f8fafc',
          code: '#0a0c10',
          success: '#10b981',
          line: '#1e2235',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 20px rgba(99, 102, 241, 0.15)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
