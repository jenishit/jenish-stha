/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'royal-dark': '#0a0a14',
        'royal-navy': '#0f1034',
        'royal-deep': '#1a1a3e',
        'luxury-gold': '#c89b4b',
        'accent-gold': '#d4a574',
        'royal-purple': '#6b3fb0',
        'royal-mauve': '#8b5cf6',
        'royal-teal': '#06b6d4',
        'frost-white': '#f0f4ff',
        'soft-silver': '#d4d4e6',
      },
      fontFamily: {
        serif: ['Georgia', 'Garamond', 'serif'],
        display: ['Poppins', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        'luxury': '0 20px 50px rgba(200, 155, 75, 0.15)',
        'glow-gold': '0 0 30px rgba(200, 155, 75, 0.3)',
        'glow-purple': '0 0 30px rgba(107, 63, 176, 0.3)',
        'royal': '0 10px 40px rgba(0, 0, 0, 0.4)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
