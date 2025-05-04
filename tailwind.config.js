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
      colors: {
        customColor: {
          blue: "#73baed", 
        },
        'customColor-blue': '#4CC2FF',
      },
      backdropBlur: {
        'xl': '40px', // Example blur intensity
        'mica': '35px',
      },
      boxShadow: {
        'win11': '0 2px 8px 0 rgba(0, 0, 0, 0.2)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
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
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
};

