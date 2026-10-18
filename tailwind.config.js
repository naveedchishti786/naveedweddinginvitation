/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        body: ['"Jost"', 'sans-serif'],
        urdu: ['"Noto Nastaliq Urdu"', 'serif'],
      },
      colors: {
        gold: {
          50: '#fffdf0',
          100: '#fffbe0',
          200: '#fff3b0',
          300: '#ffe880',
          400: '#ffd94d',
          500: '#f5c842',
          600: '#c9a227',
          700: '#a07c18',
          800: '#7a5c10',
          900: '#5a420b',
        },
        // Mehndi - Deep Forest Green + Saffron Gold
        mehndi: {
          bg: '#0a1f0e',
          dark: '#0f2a14',
          mid: '#1a4023',
          light: '#2d6e3e',
          accent: '#e8a020',
          accent2: '#f5c842',
          text: '#f0f7f1',
        },
        // Barat - Royal Maroon + Pure Gold
        barat: {
          bg: '#180608',
          dark: '#280a0d',
          mid: '#4a0e16',
          light: '#7a1828',
          accent: '#d4a843',
          accent2: '#f5c842',
          text: '#fdf0f2',
        },
        // Walima - Champagne Ivory + Rose Gold
        walima: {
          bg: '#1a1008',
          dark: '#251810',
          mid: '#3d2818',
          light: '#5a3c28',
          accent: '#c4956a',
          accent2: '#e8c4a0',
          text: '#fdf6ef',
        },
        // Home - Rich Plum + Gold
        home: {
          bg: '#0d0814',
          dark: '#160c22',
          mid: '#2d1854',
          light: '#4a2d8a',
          accent: '#c9a227',
          accent2: '#f5c842',
          text: '#f5f0ff',
        },
      },
      animation: {
        'float': 'float 5s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-delay': 'float 5s ease-in-out 2.5s infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'rotate-slow': 'rotateSlow 20s linear infinite',
        'fade-up': 'fadeUp 1s ease-out forwards',
        'petal': 'petalFall linear infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'draw': 'drawLine 2s ease-out forwards',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(2deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-300% center' },
          '100%': { backgroundPosition: '300% center' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.7' },
          '50%': { opacity: '1' },
        },
        rotateSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        petalFall: {
          '0%': { transform: 'translateY(-10vh) translateX(0px) rotate(0deg)', opacity: '0.8' },
          '100%': { transform: 'translateY(110vh) translateX(80px) rotate(540deg)', opacity: '0' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        drawLine: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 15px currentColor', opacity: '0.8' },
          '50%': { boxShadow: '0 0 40px currentColor', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
