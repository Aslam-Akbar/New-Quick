/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Mapping variables.css to Tailwind colors for easier reference if needed, 
        // but we will aim to use standard Tailwind classes.
        slate: {
          900: '#0f172a',
          950: '#020617',
          800: '#1e293b',
          500: '#64748b',
          400: '#94a3b8',
          300: '#cbd5e1',
          50: '#f8fafc',
        },
        blue: {
          500: '#3b82f6',
          600: '#2563eb',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
