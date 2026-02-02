/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
        serif: ['var(--font-cormorant)', 'Cormorant Garamond', 'serif'],
      },
      colors: {
        valentine: {
          cream: '#FFF8F5',
          blush: '#F5E6E3',
          rose: '#9D6B7A',
          burgundy: '#5C3A47',
          gold: '#C4A77D',
          charcoal: '#3D3230',
        },
      },
    },
  },
  plugins: [],
}

