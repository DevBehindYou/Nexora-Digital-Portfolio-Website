/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'base': '#03040a',
        'surface': '#0d1117',
        'accent-blue': '#3b82f6',
        'accent-purple': '#8b5cf6',
        'accent-cyan': '#06b6d4',
        'accent-pink': '#ec4899',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float-slow': 'floatSlow 25s ease-in-out infinite',
        'float-medium': 'floatMedium 18s ease-in-out infinite',
        'float-fast': 'floatFast 12s ease-in-out infinite',
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'spin-slow': 'spin 20s linear infinite',
        'count-up': 'countUp 2s ease-out forwards',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '25%': { transform: 'translate(40px, -30px) scale(1.05)' },
          '50%': { transform: 'translate(-25px, 40px) scale(0.95)' },
          '75%': { transform: 'translate(-35px, -15px) scale(1.03)' },
        },
        floatMedium: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(-50px, 25px) scale(1.08)' },
          '66%': { transform: 'translate(35px, -40px) scale(0.92)' },
        },
        floatFast: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '50%': { transform: 'translate(30px, -20px) scale(1.06)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        countUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
        'glass-hover': '0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.12), 0 0 0 1px rgba(99,102,241,0.3)',
        'glow-blue': '0 0 30px rgba(59,130,246,0.4)',
        'glow-purple': '0 0 30px rgba(139,92,246,0.4)',
        'glow-cyan': '0 0 30px rgba(6,182,212,0.4)',
      },
    },
  },
  plugins: [],
};
