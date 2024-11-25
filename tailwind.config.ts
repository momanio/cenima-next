import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background:
          "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(80,36,36,1) 51%, rgba(255,76,0,1) 100%)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
