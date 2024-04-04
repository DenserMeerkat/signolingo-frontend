import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
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
        danger: {
          DEFAULT: "hsl(var(--danger))",
          foreground: "hsl(var(--danger-foreground))",
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
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              50: '#f2fcf8', 
              100: '#e8faf2', 
              200: '#c9f5dd', 
              300: '#a8edc4', 
              400: '#6ee08e', 
              500: '#39d450', 
              600: '#2ebf44', 
              700: '#209e30', 
              800: '#148021', 
              900: '#0b5e15', 
              950: '#053d0b',
              DEFAULT: "#39d450",
              foreground: "#052e19",
            },
            secondary: {
              50: '#f5fcfc', 
              100: '#edfcfc', 
              200: '#d5f7f7', 
              300: '#bcf5f4', 
              400: '#8aebe9', 
              500: '#60e2df', 
              600: '#4eccc4', 
              700: '#35ab9b', 
              800: '#228771', 
              900: '#13664f', 
              950: '#08422d',
              DEFAULT: '#60e2df', 
              foreground: "#052e2d",
            },
            focus: '#60e2df', 
          },
        },
        dark: {
          colors: {
            primary: {
              50: '#f5fffa', 
              100: '#e6fcf0', 
              200: '#c3fad8', 
              300: '#9df5b7', 
              400: '#5aed70', 
              500: '#1ae61b', 
              600: '#15cf15', 
              700: '#0eab0e', 
              800: '#0a8a0a', 
              900: '#056605', 
              950: '#024202',
              DEFAULT: "#1ae61b",
              foreground: "#052e19",
            },
            secondary: {
              50: '#f5ffff', 
              100: '#e6fcfc', 
              200: '#c3faf9', 
              300: '#9df5f3', 
              400: '#5aedeb', 
              500: '#1ae6e2', 
              600: '#15cfc2', 
              700: '#0eab96', 
              800: '#0a8a6e', 
              900: '#05664b', 
              950: '#02422b',
              DEFAULT: "#1ae6e2",
              foreground: "#052e2d",
            },
            focus: '#1ae6e2',
          },
        },
      },
    }),
  ],
};
