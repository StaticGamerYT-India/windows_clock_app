/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customColor: {
          blue: "#73baed", 
        },
      },
      backgroundColor: {
        'mica': 'rgba(255, 255, 255, 0.6)', // Example Mica-like background
      },
      backdropBlur: {
        'xl': '40px', // Example blur intensity
      },
    },
  },
  plugins: [],
};

