
// Animation keyframes and configurations for Contiki
export const animations = {
  keyframes: {
    "accordion-down": {
      from: { height: "0" },
      to: { height: "var(--radix-accordion-content-height)" },
    },
    "accordion-up": {
      from: { height: "var(--radix-accordion-content-height)" },
      to: { height: "0" },
    },
    "fade-in": {
      "0%": { opacity: "0", transform: "translateY(10px)" },
      "100%": { opacity: "1", transform: "translateY(0)" }
    },
    "slide-up": {
      "0%": { opacity: "0", transform: "translateY(30px)" },
      "100%": { opacity: "1", transform: "translateY(0)" }
    },
    "scale-in": {
      "0%": { opacity: "0", transform: "scale(0.95)" },
      "100%": { opacity: "1", transform: "scale(1)" }
    },
  },
  animation: {
    "accordion-down": "accordion-down 0.2s ease-out",
    "accordion-up": "accordion-up 0.2s ease-out",
    "fade-in": "fade-in 0.6s ease-out",
    "slide-up": "slide-up 0.5s ease-out",
    "scale-in": "scale-in 0.3s ease-out",
  },
};
