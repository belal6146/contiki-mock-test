
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  safelist: [/^slick-/, /^slick$/, /^slick-theme$/],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1400px'
      }
    },
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: '#000000', // Black
          foreground: '#FFFFFF', // White text on black background
        },
        secondary: {
          DEFAULT: '#CCFF00', // Chartreuse
          foreground: '#000000', // Black text on chartreuse background
        },
        accent: {
          DEFAULT: '#CCFF00', // Chartreuse
          foreground: '#000000', // Black text on chartreuse background
        },
        highlight: {
          DEFAULT: '#CCFF00', // Chartreuse
          foreground: '#000000', // Black text on chartreuse background
        },
        bgLight: {
          DEFAULT: '#FFFFFF', // White
          foreground: '#000000', // Black text on white background
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
      },
      spacing: {
        '4': '4px',
        '8': '8px',
        '12': '12px',
        '16': '16px',
        '24': '24px',
        '32': '32px',
        '48': '48px',
        '64': '64px',
      },
      fontSize: {
        xs: ['12px', { lineHeight: '16px', letterSpacing: '0.025em' }],
        sm: ['14px', { lineHeight: '20px', letterSpacing: '0.025em' }],
        base: ['16px', { lineHeight: '24px', letterSpacing: '0.015em' }],
        lg: ['18px', { lineHeight: '28px', letterSpacing: '0.01em' }],
        xl: ['20px', { lineHeight: '28px', letterSpacing: '0' }],
        '2xl': ['24px', { lineHeight: '32px', letterSpacing: '-0.01em' }],
        '3xl': ['28px', { lineHeight: '36px', letterSpacing: '-0.0125em' }],
        '4xl': ['36px', { lineHeight: '40px', letterSpacing: '-0.02em' }],
        '5xl': ['48px', { lineHeight: '52px', letterSpacing: '-0.02em' }],
        '6xl': ['60px', { lineHeight: '64px', letterSpacing: '-0.025em' }],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        bold: '700',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
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
} satisfies Config;
