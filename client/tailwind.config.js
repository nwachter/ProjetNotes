module.exports = {
  content: [
    "./public/*.html",
    "./src/*.{js,jsx,ts,tsx}",
    // "./src/features/*.{js,jsx,ts,tsx}",
    // "./src/features/**/*.{js,jsx,ts,tsx}",
    // "./src/components/*.{js,jsx,ts,tsx}",
    // "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/**/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.css",
    "./index.html"
    //     "./templates/bundles/**/*.html.twig",  
    // Ajoutez d'autres chemins selon vos fichiers
  ],
  // content: [
  //      "./templates/*.twig",
  //      "./assets/*.js",
  //      "./assets/**/*.js",
  //      "./templates/**/*.html.twig",
  //      "./assets/**/*.vue",     // Fixed the .vue extension
  //      "./templates/bundles/**/*.html.twig",  // Make sure this line is present
  //      // Ajoutez d'autres chemins selon vos fichiers
  // ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
        oxygen: ['Oxygen', 'sans-serif'],
        raleway: ['Raleway', 'sans-serif'],
        sourceSans: ['Source Sans Pro', 'sans-serif'],
        quicksand: ['Quicksand', 'sans-serif'],
        reggaeOne: ['Reggae One', 'normal'],
      },

      colors: {
        clifford: {
          DEFAULT: '#da373d',
          50: '#fef2f2',
          100: '#fde6e6',
          200: '#fbd0d0',
          300: '#f7aeae',
          400: '#f27d7d',
          500: '#ea5757',
          600: '#da373d',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        },
        'custom-blue': {
          DEFAULT: '#1fb6ff',
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#b9e6fe',
          300: '#7cd4fd',
          400: '#36bffa',
          500: '#1fb6ff',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        'aero': {
          DEFAULT: '#5BC0EB',
        },
        'mint': {
          DEFAULT: '#09BC8A',
        },
        'custom-purple': {
          DEFAULT: '#7e5bef',
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e5bef',
          800: '#6b21a8',
          900: '#581c87',
          950: '#3b0764',
        },
        'tailwind-pink': {
          DEFAULT: '#ff49db',
          50: '#fdf2ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#ff49db',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
          950: '#4a044e',
        },
        'custom-pink': {
          DEFAULT: '#DB324D',

        },
        'auburn': {
          DEFAULT: '#A62639',
        },
        'rojo': {
          DEFAULT: '#DE1A1A',
        },
        'persian-red': {
          DEFAULT: '#C3423F',
        },
        'custom-orange': {
          DEFAULT: '#ff7849',
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#ff7849',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431407',
        },
        'custom-green': {
          DEFAULT: '#13ce66',
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#13ce66',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        'custom-yellow': {
          DEFAULT: '#ffc82c',
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#ffc82c',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
          950: '#422006',
        },
        "selective-yellow": {
          DEFAULT: '#fdb20b',
        },
        "melon": {
          DEFAULT: '#E55934',
          50: '#F8D4C9',
          100: '#F6C4B7',
          500: "#E55934",

        },
        gray: {
          DEFAULT: '#8492a6',
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#8492a6',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        },
      },

      fontFamily: {
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
        'echo-deco': ['Echo Decorative', 'sans-serif'],
        'neon-club-music': ['Neon Club Music', 'sans-serif'],
        'segdwick-ave-display': ['Segdwick Ave Display', 'sans-serif'],
        'rimouski': ['Rimouski', 'Corben', 'Arial', 'sans-serif', 'sans-serif'],
        'rimouski-sb': ['Rimouski', 'Corben', 'Arial', 'sans-serif', 'sans-serif'],
        'wavefont': ['Wavefont', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
        'jost': ['Jost', 'sans-serif'],
        'corben': ['Corben', 'sans-serif'],
        'caudex': ['Caudex', 'serif'],
        'cabin': ['Cabin', 'serif'],
        'allan': ['Allan', 'serif'],
        'cherry-cream-soda': ['Cherry Cream Soda', 'cursive'],
        'brawler': ['Brawler', 'serif'],
        'bebas-neue': ['Bebas Neue', 'cursive'],
        'bentham': ['Bentham', 'serif'],

      },
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
      fontSize: {
        '10xl': '10rem',
        '11xl': '12rem',
      },
      keyframes: {
        'chromatic-offset': {
          '0%': {
            textShadow: '1px 0 0 #DB324D, -1px 0 0 #5BC0EB', //avant : red, blue
          },
          '100%': {
            textShadow: '-1px 0 0 #DB324D, 1px 0 0 #5BC0EB', //avant : red, blue
            // [text-shadow:_-2px_0_0_#DB324D,_1px_0_0_#5BC0EB]  //avant : -1
          },
        },
      },
      animation: {
        'chromatic-title': 'chromatic-offset 2s ease-in-out infinite alternate',
      },

    }
  },
  plugins: [],
};