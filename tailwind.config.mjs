/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        atlas: {
          bg: '#0d0f14',
          surface: '#13161e',
          border: '#1e2330',
          accent: '#6366f1',
          'accent-hover': '#818cf8',
          secondary: '#22d3ee',
          'secondary-hover': '#67e8f9',
          muted: '#8b92a5',
          text: '#e2e8f0',
          'text-bright': '#f8fafc',
          code: '#0a0c10',
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
