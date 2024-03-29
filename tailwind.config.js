/** @type {import('tailwindcss').Config} */

/* TODO: standardise transition animation */

module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        default: "1000px"
      }
    },
    extend: {
      colors: {
        /*custom: {
          primary: {
            500: "#20b887",
            600: "#118968"
          },
          secondary: {
            500: "#ebebeb",
            600: "#dbdbdb"
          },
          white: "#FFFFFF",
          background: "#f7f7f7",
          lightGreen: "#e0eeee",
          black: "#1e293a"
        },*/
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      keyframes: {
        slideDown: { 
          from: { height: 0 }, 
          to: { height: "var(--radix-accordion-content-height)" } 
        },
        slideUp: { 
          from: { height: "var(--radix-accordion-content-height)" }, 
          to: { height: 0 } 
        }
      },
      animation: { 
        "accordion-down": "slideDown 300ms ease-out", 
        "accordion-up": "slideUp 300ms ease-in" 
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};
