import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      display: ['Inter', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: '#36e27b',
        'background-dark': '#111714',
        'surface-dark': '#1c2420',
        'text-secondary': '#8a9b93',
      },
    },
  },
  plugins: [],
};
export default config;
