/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#3B82F6',
          dark: '#2563EB',
        },
        secondary: {
          DEFAULT: '#8B5CF6',
        },
        accent: {
          DEFAULT: '#10B981',
        },
        background: '#0B1120',
        foreground: '#FFFFFF',
        card: '#1A1F2E',
        'card-hover': '#242B3D',
        border: 'rgba(255, 255, 255, 0.1)',
        input: 'rgba(255, 255, 255, 0.05)',
        ring: '#3B82F6',
        'text-primary': '#FFFFFF',
        'text-secondary': 'rgba(255, 255, 255, 0.7)',
        'text-muted': 'rgba(255, 255, 255, 0.5)',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
      },
      animation: {
        'shine': 'shine 3s infinite',
      },
      keyframes: {
        shine: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
} 