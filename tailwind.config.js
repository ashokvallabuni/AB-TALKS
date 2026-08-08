/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#08090C',
        surface: 'rgba(255,255,255,0.04)',
        border: 'rgba(255,255,255,0.10)',
        violet: '#6366F1',
        cyan: '#06B6D4',
        neon: '#8B5CF6',
        glow: '#06B6D4',
        muted: '#A1A1AA',
      },
      boxShadow: {
        'glass-soft': '0 30px 80px rgba(0,0,0,0.28)',
        'neon-glow': '0 0 24px rgba(99,102,241,0.28)',
        'button-glow': '0 0 20px rgba(99,102,241,0.28)',
      },
      backdropBlur: {
        xs: '6px',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 18px rgba(99,102,241,0.22)' },
          '50%': { boxShadow: '0 0 30px rgba(99,102,241,0.35)' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.8s infinite ease-in-out',
        'pulse-glow': 'pulseGlow 2.5s infinite ease-in-out',
      },
      fontFamily: {
        display: ['Inter', 'Plus Jakarta Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
