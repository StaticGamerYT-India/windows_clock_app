/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      backgroundColor: {
        'mica': 'rgba(255, 255, 255, 0.6)', // Example Mica-like background
        'mica-dark': 'rgba(32, 32, 32, 0.85)', // Dark Mica effect
        'mica-darker': 'rgba(25, 25, 25, 0.9)',
        'mica-component': 'rgba(45, 45, 45, 0.6)', // Component background
        'mica-component-light': 'rgba(240, 240, 240, 0.7)', // Light mode component
      },
      screens: {
        'xs': '480px',
        '3xl': '1920px',
      },
      colors: {
        customColor: {
          blue: "#3a9fe0",
          blueHover: "#2989cd",
          green: "#16cca2",
          greenHover: "#0fb993",
          darkBg: "#202020",
          lightBg: "#f5f5f5",
          darkCard: "#2a2a2a",
          lightCard: "#ffffff",
          darkInput: "#3a3a3a",
          lightInput: "#f0f0f0",
          darkBtn: "#3e3e3e",
          lightBtn: "#e0e0e0",
          darkBorder: "#4a4a4a",
          lightBorder: "#e0e0e0",
          red: '#e15a5a',
          redHover: '#d63d3d',
          yellow: '#e1c75a',
          yellowHover: '#d4b73f',
          purple: '#9c5fe0',
          purpleHover: '#8a4dce',
        },
        customGray: {
          DEFAULT: "#3e3e3e",
          100: "#f5f5f5",
          200: "#e0e0e0",
          300: "#c0c0c0",
          400: "#9e9e9e",
          500: "#757575",
          600: "#5e5e5e",
          700: "#3e3e3e",
          800: "#2a2a2a",
          900: "#1a1a1a",
        },
      },
      fontFamily: {
        sans: [
          '-apple-system', 
          'BlinkMacSystemFont', 
          'Segoe UI', 
          'Roboto', 
          'Oxygen', 
          'Ubuntu', 
          'Cantarell', 
          'Open Sans', 
          'Helvetica Neue', 
          'sans-serif'
        ]
      },
      backdropBlur: {
        'xl': '40px', // Example blur intensity
        'mica': '35px',
      },
      boxShadow: {
        'mica': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card': '0 2px 5px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 3s linear infinite',
        'bounce-subtle': 'bounce 2s infinite',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [
    function({ addUtilities, addVariant }) {
      const newUtilities = {
        '.scrollbar-thin': {
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
        },
        '.scrollbar-thumb-gray-600': {
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#4a5568',
            borderRadius: '4px',
          },
        },
        '.scrollbar-track-transparent': {
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
          },
        },
        '.backdrop-blur-mica': {
          backdropFilter: 'blur(35px) saturate(180%)',
          WebkitBackdropFilter: 'blur(35px) saturate(180%)',
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
      addVariant('hocus', ['&:hover', '&:focus']); // Enable `hocus` variant
    },
  ],
};

