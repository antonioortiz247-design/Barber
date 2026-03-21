import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        accent: 'var(--accent)',
        bg: 'var(--bg)',
        fg: 'var(--fg)'
      }
    }
  },
  plugins: []
};

export default config;
