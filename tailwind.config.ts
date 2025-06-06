import type { Config } from "tailwindcss";
import daisyui from "daisyui";
import typography from "@tailwindcss/typography";

export default {
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#b09054",
          secondary: "#b4a897",
          accent: "#3ca68d",
          neutral: "#d8d2ca",
          "base-100": "#fbfbfe",
          info: "#00aeff",
          success: "#009257",
          warning: "#ffa400",
          error: "#C1360F",
        },
      },
    ],
  },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background))",
        foreground: "rgb(var(--foreground))",
        primary: "rgb(var(--primary))",
        secondary: "rgb(var(--secondary))",
        accent: "rgb(var(--accent))",
      },
      fontFamily: {
        sans: ["var(--font-montserrat)"],
        serif: ["var(--font-playfair-display)"],
      },
      spacing: {
        nav: "12rem",
        "nav-mobile": "8rem",
      },
      screens: {
        xs: "400px",
      },
    },
  },
  plugins: [daisyui, typography],
} satisfies Config;
