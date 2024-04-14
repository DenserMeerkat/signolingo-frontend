import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/theme";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  prefix: "",
  theme: {
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
  plugins: [
    require("tailwindcss-animate"),
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              50: "#f2fcf8",
              100: "#e8faf2",
              200: "#c9f5dd",
              300: "#a8edc4",
              400: "#6ee08e",
              500: "#39d450",
              600: "#2ebf44",
              700: "#209e30",
              800: "#148021",
              900: "#0b5e15",
              // 950: "#053d0b",
              DEFAULT: "#39d450",
              foreground: "#052e19",
            },
            secondary: {
              50: "#f5fcfc",
              100: "#edfcfc",
              200: "#d5f7f7",
              300: "#bcf5f4",
              400: "#8aebe9",
              500: "#60e2df",
              600: "#4eccc4",
              700: "#35ab9b",
              800: "#228771",
              900: "#13664f",
              // 950: "#08422d",
              DEFAULT: "#60e2df",
              foreground: "#052e2d",
            },
            danger: {
              50: "#fff1f1",
              100: "#ffdfdf",
              200: "#ffc5c5",
              300: "#ff9d9d",
              400: "#ff6464",
              500: "#ff4b4b",
              600: "#ed1515",
              700: "#c80d0d",
              800: "#a50f0f",
              900: "#881414",
              // 950: "#4b0404",
              DEFAULT: "#ff4b4b",
              foreground: "#2d0f0f",
            },
            focus: "#60e2df",
          },
        },
        dark: {
          colors: {
            primary: {
              50: "#f5fffa",
              100: "#e6fcf0",
              200: "#c3fad8",
              300: "#9df5b7",
              400: "#5aed70",
              500: "#1ae61b",
              600: "#15cf15",
              700: "#0eab0e",
              800: "#0a8a0a",
              900: "#056605",
              // 950: "#024202",
              DEFAULT: "#1ae61b",
              foreground: "#052e19",
            },
            secondary: {
              50: "#f5ffff",
              100: "#e6fcfc",
              200: "#c3faf9",
              300: "#9df5f3",
              400: "#5aedeb",
              500: "#1ae6e2",
              600: "#15cfc2",
              700: "#0eab96",
              800: "#0a8a6e",
              900: "#05664b",
              // 950: "#02422b",
              DEFAULT: "#1ae6e2",
              foreground: "#052e2d",
            },
            danger: {
              50: "#fff1f1",
              100: "#ffdfdf",
              200: "#ffc5c5",
              300: "#ff9d9d",
              400: "#ff6464",
              500: "#ff4b4b",
              600: "#ed1515",
              700: "#c80d0d",
              800: "#a50f0f",
              900: "#881414",
              // 950: "#4b0404",
              DEFAULT: "#ff4b4b",
              foreground: "#2d0f0f",
            },
            focus: "#1ae6e2",
          },
        },
      },
    }),
  ],
} satisfies Config;

export default config;
