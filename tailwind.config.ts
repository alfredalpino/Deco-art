import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "luxury-gold": "#d4af37",
        "luxury-gold-dark": "#b8941e",
        "luxury-gold-light": "#f5e6d3",
        "luxury-black": "#0a0a0a",
        "luxury-gray": "#2c2c2c",
        "luxury-cream": "#faf8f3",
        "luxury-beige": "#e8e5dd",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "serif"],
        elegant: ["var(--font-cormorant)", "Cormorant Garamond", "serif"],
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      letterSpacing: {
        widest: "0.3em",
        wider: "0.15em",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        "fade-in": "fadeIn 1s cubic-bezier(0.4, 0, 0.2, 1) forwards",
      },
      keyframes: {
        fadeInUp: {
          from: {
            opacity: "0",
            transform: "translateY(30px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        fadeIn: {
          from: {
            opacity: "0",
          },
          to: {
            opacity: "1",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
