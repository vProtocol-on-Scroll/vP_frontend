import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        kaleko: ["Kaleko105", "sans-serif"],
      },
      colors: {
        primary1: '#F23E62',
        primary2: '#9F2B99',
        primary3: '#700CC2',
      },
      keyframes: {



        slideRight: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        slideLeft: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        spinMid: {
          '0%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(45deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        spinMidLeft: {
          '0%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(-25deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
      },
      animation: {
        'slide-left-right': 'slideLeftRight 13s linear infinite',
        'slide-right-left': 'slideRightLeft 13s linear infinite',
        tilt: 'tilt 10s ease-in-out infinite',
        'pulse-slow': 'pulse 2s linear infinite',
        wave: 'wave 1s ease-in-out infinite',
        "slide-right": "slideRight 5s infinite linear",
        "slide-left": "slideLeft 5s infinite linear",
        'spin-slow': 'spin 10s linear infinite',
        'spin-mid': 'spinMid 8s linear infinite',
        'spin-mid-left': 'spinMidLeft 10s linear infinite',
      },
      scrollbar: {
        none: {
          '&::-webkit-scrollbar': { display: 'none' },
          '-ms-overflow-style': 'none', /* IE */
          'scrollbar-width': 'none', /* Firefox */
        },
      },
      screens: {
      //   xs: "260px",
      //   ss: "375px",
      //   sm: "412px",
      'between-lg-xl': { max: '1296px', min: '1024px' }, // Custom range
        max550: { max: '550px' }, // Custom max-width breakpoint for 580px
      },
    },
  },
  plugins: [plugin()],
}

