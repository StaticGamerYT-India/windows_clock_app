/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
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
        'customColor-blue': '#78b6e4',
      },
      backdropBlur: {
        'xl': '40px', // Example blur intensity
        'mica': '20px',
      },
    },
  },
  plugins: [],
};

