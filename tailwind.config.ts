import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './modules/**/*.{js,ts,jsx,tsx,mdx}',
    './shared/**/*.{js,ts,jsx,tsx,mdx}',
    './domains/**/*.{js,ts,jsx,tsx,mdx}',
    './core/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#000000',
          darkest: '#111111',
          darker: '#222222',
          brown: '#74642F',
          gray: {
            dark: '#7A7A7A',
            DEFAULT: '#777777',
            medium: '#888888',
            muted: '#94928B',
            light: '#9F9F9F',
            lighter: '#999999',
          },
          neutral: {
            DEFAULT: '#C8C8C8',
            warm: '#CAC0C0',
            sand: '#D7D5CC',
            light: '#E0E0E0',
            cream: '#E5E3DA',
            ivory: '#EBEBE4',
            beige: '#EFEFE0',
            lightest: '#F0F0F0',
            pale: '#F3F2EC',
            white: '#F8F8F8',
            off: '#FAF9F9',
          },
          white: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
