/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "editor-bg": "#0d0d0d",
        "sidebar-bg": "#161617",
        "panel-bg": "#1a1a1b",
        "text-primary": "#e0e0e0",
        "text-secondary": "#6a9955",
        "text-keyword": "#569cd6",
        "text-string": "#ce9178",
        "text-number": "#b5cea8",
        "border-color": "#2a2a2a",
        "active-tab": "#262627",
      },
      fontFamily: {
        mono: ["Monaco", "Menlo", "Ubuntu Mono", "monospace"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
