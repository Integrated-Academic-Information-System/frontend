/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("nativewind/preset")],
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Semantic and custom color naming
        schoolPrimary: '#6F120A', // Dark Red/Maroon from image
        bgMain: '#F7F7F7',      // Very light gray background
        cardBg: '#FFFFFF',      // White card
        borderLight: '#E0E0E0', // Standard light border
        textLight: '#9E9E9E',  // Placeholder text gray
        bgInput: '#EEEEEE',     // Input field background
        textBody: '#4F4F4F',    // Welcome/description text
        schoolPrimaryLight: '#6f120a1a', // 10% opacity primary for secondary buttons
      },
    },
  },
  plugins: [],
};
