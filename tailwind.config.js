module.exports = {
  darkMode: 'class', // IMPORTANT for the toggle to work
  content: [
    './src/**/*.{ts,tsx,js,jsx,mdx}',
    './app/**/*.{ts,tsx,js,jsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          50:  '#faf7f2',
          100: '#f4efe5',
          200: '#e8decc',
          300: '#dccdb3',
          400: '#cdb48d',
          500: '#b7996a',
          600: '#9b7f58',
          700: '#7c6646',
          800: '#5e4d35',
          900: '#423726',
        },
        acacia: {
          50:  '#eef7f1',
          100: '#d9efdf',
          200: '#b3dfbf',
          300: '#8dd09f',
          400: '#67c07f',
          500: '#41b05f',
          600: '#2e8d4b',
          700: '#216a39',
          800: '#154726',
          900: '#0a2615',
        },
        dusk: {
          900: '#0f1a14',
        },
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.08)',
        softLg: '0 20px 45px rgba(0,0,0,0.12)',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
    },
  },
  plugins: [],
};