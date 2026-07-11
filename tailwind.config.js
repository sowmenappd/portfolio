const defaultTheme = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config}
 *  Direction 1a — "Aurora" (refined dark).
 *  Light + dark are both driven off CSS variables defined in globals.css,
 *  toggled by next-themes' `.dark` class on <html>.
 */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./ui/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts}",
    "./content/posts/**/*.mdx",
  ],
  darkMode: "class", // now actually used — next-themes toggles `.dark`
  theme: {
    extend: {
      fontFamily: {
        // identity display face
        display: ["var(--font-bricolage)", ...defaultTheme.fontFamily.sans],
        // body + UI
        sans: ["var(--font-hanken)", ...defaultTheme.fontFamily.sans],
        // meta / dates / code — the new second voice
        mono: ["var(--font-jetbrains)", ...defaultTheme.fontFamily.mono],
      },
      colors: {
        // semantic tokens — resolve to CSS vars so one class works in both themes
        surface: {
          base: "rgb(var(--surface-base) / <alpha-value>)",
          raised: "rgb(var(--surface-raised) / <alpha-value>)",
          overlay: "rgb(var(--surface-overlay) / <alpha-value>)",
        },
        ink: {
          primary: "rgb(var(--ink) / 0.92)",
          secondary: "rgb(var(--ink) / 0.70)",
          muted: "rgb(var(--ink) / 0.48)",
        },
        accent: {
          warm: "rgb(var(--accent-warm) / <alpha-value>)", // identity / primary action
          cool: "rgb(var(--accent-cool) / <alpha-value>)", // links / informational
        },
        border: "rgb(var(--border) / <alpha-value>)",
      },
      fontSize: {
        // one scale — pages stop hand-rolling text-3xl/lg:text-4xl
        display: ["3rem", { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "600" }],
        h1: ["2.25rem", { lineHeight: "1.15", letterSpacing: "-0.01em", fontWeight: "600" }],
        h2: ["1.75rem", { lineHeight: "1.2", fontWeight: "600" }],
        h3: ["1.375rem", { lineHeight: "1.3", fontWeight: "500" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6" }],
        body: ["1rem", { lineHeight: "1.6" }],
        meta: ["0.875rem", { lineHeight: "1.4" }],
      },
      borderRadius: {
        md: "8px",   // pills, small controls
        xl: "12px",  // asides, secondary surfaces
        "2xl": "18px", // cards, nav bar
      },
      transitionDuration: {
        fast: "150ms", // hover states
        base: "300ms", // card transitions
      },
      animation: {
        slideDown: "slideDown 0.2s ease-out",
      },
      keyframes: {
        slideDown: {
          from: { opacity: "0", transform: "translateY(-10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      boxShadow: ({ theme }) => ({
        // unchanged — best-considered part of the old system (Josh Comeau method)
        "surface-glass": `
          inset 0.25px 1px 0 0 rgba(255,225,230,0.03),
          0px 0.3px 0.3px rgba(3,2,2,0.02),
          0px 2.2px 2.5px -0.4px rgba(3,2,2,0.02),
          0px 4.3px 4.8px -0.8px rgba(3,2,2,0.02),
          0px 7.5px 8.4px -1.2px rgba(3,2,2,0.02),
          0px 12.8px 14.4px -1.7px rgba(3,2,2,0.02),
          0px 21px 23.6px -2.1px rgba(3,2,2,0.02),
          0px 33.2px 37.4px -2.5px rgba(3,2,2,0.02)`,
        "surface-elevation-low": `
          inset 0.25px 1px 1px 0 rgba(255,225,230,0.015),
          0.3px 0.5px 0.7px rgba(3,2,2,0.2),
          0.4px 0.8px 1px -1.2px rgba(3,2,2,0.2),
          1px 2px 2.5px -2.5px rgba(3,2,2,0.2)`,
        "surface-elevation-medium": `
          inset 0.25px 1px 1px 0 rgba(255,225,230,0.03),
          0.3px 0.5px 0.7px rgba(3,2,2,0.1),
          0.8px 1.6px 2px -0.8px rgba(3,2,2,0.1),
          2.1px 4.1px 5.2px -1.7px rgba(3,2,2,0.1),
          5px 10px 12.6px -2.5px rgba(3,2,2,0.1)`,
      }),
    },
  },
  plugins: [require("@tailwindcss/line-clamp"), require("@tailwindcss/forms")],
}
