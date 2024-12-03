import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'tonearm-drop': 'tonearm-drop 1s ease-out forwards',
        'tonearm-lift': 'tonearm-lift 1s ease-in forwards',
        'vinyl-mount': 'vinyl-mount 0.5s ease-out forwards',
        'vinyl-unmount': 'vinyl-unmount 0.5s ease-in forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-out': 'fadeOut 0.5s ease-in forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'slide-down': 'slideDown 0.5s ease-in forwards',
        'scale-up': 'scaleUp 0.3s ease-out forwards',
        'scale-down': 'scaleDown 0.3s ease-in forwards',
        'tooltip-top': 'tooltipTop 0.2s ease-out forwards',
        'tooltip-right': 'tooltipRight 0.2s ease-out forwards',
        'tooltip-bottom': 'tooltipBottom 0.2s ease-out forwards',
        'tooltip-left': 'tooltipLeft 0.2s ease-out forwards'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        'tonearm-drop': {
          '0%': { transform: 'rotate(-25deg)' },
          '100%': { transform: 'rotate(12deg)' },
        },
        'tonearm-lift': {
          '0%': { transform: 'rotate(12deg)' },
          '100%': { transform: 'rotate(-25deg)' },
        },
        'vinyl-mount': {
          '0%': { transform: 'translateY(-200px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'vinyl-unmount': {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(200px)', opacity: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        slideDown: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(20px)', opacity: '0' }
        },
        scaleUp: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        scaleDown: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.95)', opacity: '0' }
        },
        spin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' }
        },
        tooltipTop: {
          '0%': { transform: 'translate(-50%, -90%) scale(0.95)', opacity: '0' },
          '100%': { transform: 'translate(-50%, -100%) scale(1)', opacity: '1' }
        },
        tooltipRight: {
          '0%': { transform: 'translate(90%, -50%) scale(0.95)', opacity: '0' },
          '100%': { transform: 'translate(100%, -50%) scale(1)', opacity: '1' }
        },
        tooltipBottom: {
          '0%': { transform: 'translate(-50%, 90%) scale(0.95)', opacity: '0' },
          '100%': { transform: 'translate(-50%, 100%) scale(1)', opacity: '1' }
        },
        tooltipLeft: {
          '0%': { transform: 'translate(-90%, -50%) scale(0.95)', opacity: '0' },
          '100%': { transform: 'translate(-100%, -50%) scale(1)', opacity: '1' }
        }
      },
      colors: {
        brand: {
          orange: {
            50: '#fff7ed',
            100: '#ffedd5',
            200: '#fed7aa',
            300: '#fdba74',
            400: '#fb923c',
            500: '#f97316',
            600: '#ea580c',
            700: '#c2410c',
            800: '#9a3412',
            900: '#7c2d12',
            950: '#431407',
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'vinyl-grooves': 'repeating-radial-gradient(circle at center, #222 0px, #111 1px, #222 2px, #111 3px)',
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionDuration: {
        '2000': '2000ms',
        '3000': '3000ms',
      },
      scale: {
        '98': '0.98',
        '102': '1.02',
      },
      rotate: {
        '12': '12deg',
        '15': '15deg',
        '25': '25deg',
        '30': '30deg',
      },
      transformOrigin: {
        'top-right-tonearm': '90% 10%',
      },
      boxShadow: {
        'vinyl': '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        'vinyl-hover': '0 35px 60px -15px rgba(0, 0, 0, 0.6)',
        'inner-lg': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.15)',
      },
      borderWidth: {
        '3': '3px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      }
    },
  },
  plugins: [],
}

export default config