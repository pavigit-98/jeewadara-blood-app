/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        jeeva: {
          navy: {
            DEFAULT: '#002147',
            light: '#0A3161',
            dark: '#00142A',
            soft: '#E8EFF7'
          },
          red: {
            DEFAULT: '#B30006',
            hover: '#8A0004',
            light: '#FFECEC'
          },
          orange: {
            DEFAULT: '#E65C00',
            light: '#FFF3E0'
          },
          green: {
            DEFAULT: '#2E7D32',
            light: '#E8F5E9'
          },
          blue: {
            DEFAULT: '#1976D2',
            light: '#E3F2FD'
          },
          slate: {
            DEFAULT: '#5C6B73',
            light: '#F4F6F8'
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'scale-up': 'scaleUp 0.2s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleUp: {
          '0%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        }
      }
    },
  },
  plugins: [],
}
