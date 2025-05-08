/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'mica': 'rgba(255, 255, 255, 0.6)', // Example Mica-like background
        'mica-dark': 'rgba(32, 32, 32, 0.85)', // Dark Mica effect
        'mica-darker': 'rgba(25, 25, 25, 0.9)',
        'mica-component': 'rgba(45, 45, 45, 0.6)', // Component background
      },
      screens: {
        'xs': '480px',
      },
      colors: {
        customColor: {
          blue: "#3a9fe0",
          green: "#16cca2",
          darkBg: "#202020",
          darkCard: "#2a2a2a",
          darkInput: "#3a3a3a",
          darkBtn: "#3e3e3e",
          darkBorder: "#4a4a4a",
          red: '#e15a5a',
          yellow: '#e1c75a',
        },
        customGray: "#3e3e3e",
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

