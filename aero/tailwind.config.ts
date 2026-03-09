import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['DitMagi', 'Cormorant Garamond', 'serif'],
        body: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      colors: {
        obsidian: '#0a0a0a',
        ivory: '#f5f0e8',
        gold: {
          DEFAULT: '#c9a84c',
          light: '#e8c97a',
          dark: '#a07830',
        },
        platinum: '#e5e4e2',
        smoke: '#1a1a1a',
        mist: '#2a2a2a',
      },
      animation: {
        shimmer: 'shimmer 4s linear infinite',
        'fade-up': 'fadeUp 0.8s ease forwards',
        'fade-in': 'fadeIn 1s ease forwards',
        'slide-in': 'slideIn 0.6s ease forwards',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
