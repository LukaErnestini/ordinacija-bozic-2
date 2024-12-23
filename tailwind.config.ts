import type { Config } from "tailwindcss";
import daisyui from "daisyui";

export default {
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "var(--primary)",
          secondary: "var(--secondary)",
          accent: "var(--accent)",
          neutral: "#d8d2ca",
          "base-100": "#fbfbfe",
          info: "#00aeff",
          success: "#009257",
          warning: "#ffa400",
          error: "#C1360F"
        }
      }
    ]
  },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)"
      }
    }
  },
  plugins: [daisyui]
} satisfies Config;
