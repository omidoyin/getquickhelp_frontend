import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary, #007AFF)',
          dark: 'var(--color-primary-dark, #0066D6)',
        },
        foreground: {
          DEFAULT: 'var(--color-primary, #007AFF)',
          dark: 'var(--color-primary-dark, #0066D6)',
        },
        
        secondary: {
          DEFAULT: 'var(--color-secondary, #28A745)',
          dark: 'var(--color-secondary-dark, #218838)',
        },
        gray: {
          light: 'var(--color-gray-light, #F5F5F5)',
          DEFAULT: 'var(--color-gray-dark, #000000)',
        },
      },
      textColor: {
        default: '#000000',
        // foreground: {
        //   DEFAULT: '#000000',
        //   dark: '#000000',
        //   50: 'rgba(0, 0, 0, 0.5)',
        //   60: 'rgba(0, 0, 0, 0.6)',
        //   70: 'rgba(0, 0, 0, 0.7)',
        //   80: 'rgba(0, 0, 0, 0.8)',
        //   90: 'rgba(0, 0, 0, 0.9)',
        // },
      },
      fontFamily: {
        sans: ['var(--font-sans, Arial, sans-serif)'],
      },
    },
  },
  plugins: [],
};

export default config;
