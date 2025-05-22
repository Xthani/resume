import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#111827',
        foreground: '#f1f5f9',
        muted: '#cbd5e1',
        accent: '#10b981',
        cta: '#ec4899'
      }
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('tailwindcss-debug-screens')
  ],
}

export default config 