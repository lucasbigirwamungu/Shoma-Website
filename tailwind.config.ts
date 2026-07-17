import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        shoma: {
          // Hoofdkleur: donkerbruin uit het Shoma-logo (#6e4d1c)
          teal: {
            DEFAULT: '#6e4d1c',
            light: '#a16b14',
            dark: '#4a3010',
          },
          // Accentkleur: oranje voor CTAs (#ef9403)
          terracotta: {
            DEFAULT: '#ef9403',
            light: '#fbd101',
            dark: '#c19b11',
          },
          // Tekstkleur: zeer donkerbruin
          slate: '#3d2807',
          // Achtergrondkleur: warm gebroken wit
          sand: '#faf6ee',
          // Extra merkkleuren
          tan: '#beb3a4',
          muted: '#9c886f',
          mid: '#856b49',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'count-up': 'countUp 2s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
