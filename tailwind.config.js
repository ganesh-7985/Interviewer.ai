/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
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
        primary: "hsl(217, 100%, 51%)",
        "primary-content": "hsl(0, 0%, 100%)",
        "primary-dark": "hsl(217, 100%, 41%)",
        "primary-light": "hsl(217, 100%, 61%)",

        secondary: "hsl(347, 100%, 51%)",
        "secondary-content": "hsl(0, 0%, 100%)",
        "secondary-dark": "hsl(347, 100%, 41%)",
        "secondary-light": "hsl(347, 100%, 61%)",

        background: "#010817",
        foreground: "hsl(216, 13%, 15%)",
        border: "hsl(218, 13%, 25%)",

        copy: "hsl(240, 14%, 99%)",
        "copy-light": "hsl(216, 13%, 85%)",
        "copy-lighter": "hsl(218, 12%, 65%)",

        success: "hsl(120, 100%, 51%)",
        warning: "hsl(60, 100%, 51%)",
        error: "hsl(0, 100%, 51%)",

        "success-content": "hsl(120, 100%, 1%)",
        "warning-content": "hsl(60, 100%, 1%)",
        "error-content": "hsl(0, 0%, 100%)"
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}