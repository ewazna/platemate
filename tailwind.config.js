/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pm-white': '#FCFAF8',
        'pm-black': '#140F1F',
        'pm-grey': {
          'light': '#F6F6F6',
          'base': '#E6E6E6',
          'dark': '#C4C4C4',
          'darker': '#A5A5A5',
          'hover': '#E5E2E3',
        },
        'pm-orange': {
          'lighter': '#FFF3E0',
          'light': '#FFB44C',
          'base': '#FF8A00',
          'dark': '#FA4B04',
          'hover':'#E67C00',
        },
        'pm-green': {
          'lighter': '#F7FCE6',
          'light': '#C5E84C',
          'base': '#A1BB0D',
          'dark': '#7A7D00',
          'hover':'#91A90C',
        },
        'pm-success': '#3ABB0D',
        'pm-error': {
          'base':'#FF2E2E',
          'hover':'#E62929',
        }
      },
      fontFamily: {
        roboto: '"Roboto", sans-serif',
        raleway: '"Raleway", sans-serif'
      },
      dropShadow: {
        'xl': '0 4px 4px rgba(0, 0, 0, 0.25)'
      },
      boxShadow: {
        'inner': '0px 3px 5px 0px rgba(0,0,0,0.15) inset'
      },
      fontSize: {
        xs: '0.75rem',
        s: '1rem',
        m: '1.25rem',
        l:'1.875rem',
        xl: '2.5rem',
      },
      plugins: [],
    }
  }
}
