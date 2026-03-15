/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ['LXGWWenKaiScreen', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['LXGWWenKaiMonoScreen', 'SF Mono', 'Monaco', 'Cascadia Code', 'Roboto Mono', 'Consolas', 'Courier New', 'monospace'],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        // Aha 字母波浪弹跳 - 0-2s (0-40%)
        "aha-bounce": {
          "0%, 12%, 40%, 100%": { transform: "translateY(0)" },
          "6%": { transform: "translateY(-24px)" },
        },
        // Know 字母冲击放大 - 2-3s (40-60%)
        "know-pulse": {
          "0%, 40%, 52%, 100%": { transform: "scale(1)" },
          "46%": { transform: "scale(1.35)" },
        },
        // 整体放大冲击 - 3.5-4.2s (70-84%)，等Know完全结束后
        "logo-impact": {
          "0%, 70%, 84%, 100%": { transform: "scale(1)" },
          "77%": { transform: "scale(1.1)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "aha-bounce": "aha-bounce 5s ease-out infinite",
        "know-pulse": "know-pulse 5s ease-out infinite",
        "logo-impact": "logo-impact 5s cubic-bezier(0.4, 0, 0.2, 1) infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
