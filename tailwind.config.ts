
import type { Config } from "tailwindcss";
import { colors } from "./src/theme/colors";
import { typography } from "./src/theme/typography";
import { animations } from "./src/theme/animations";
import { spacing } from "./src/theme/spacing";
import { shadows } from "./src/theme/shadows";
import { container } from "./src/theme/container";
import { transitions } from "./src/theme/transitions";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  safelist: [/^slick-/, /^slick$/, /^slick-theme$/, /slick-active/, /slick-current/, /slick-slide/, /slick-cloned/, /slick-dots/, /slick-list/, /slick-track/],
  prefix: "",
  theme: {
    container: container.container,
    extend: {
      fontFamily: typography.fontFamily,
      colors,
      spacing: spacing.spacing,
      fontSize: typography.fontSize,
      fontWeight: typography.fontWeight,
      borderRadius: spacing.borderRadius,
      boxShadow: shadows.boxShadow,
      keyframes: animations.keyframes,
      animation: animations.animation,
      transitionDuration: transitions.transitionDuration
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
