// Define Contiki brand colors and variants
export const colors = {
  border: 'hsl(var(--border))',
  input: 'hsl(var(--input))',
  ring: 'hsl(var(--ring))',
  background: 'hsl(var(--background))',
  foreground: 'hsl(var(--foreground))',
  
  // Contiki Brand Colors - Corrected to match official brand
  primary: {
    DEFAULT: '#000000', // Contiki Black
    foreground: '#FFFFFF',
    50: '#f7f7f7',
    100: '#e3e3e3',
    200: '#c8c8c8',
    300: '#a4a4a4',
    400: '#818181',
    500: '#666666',
    600: '#515151',
    700: '#434343',
    800: '#383838',
    900: '#000000',
  },
  
  // Contiki Lime Green (official secondary color)
  secondary: {
    DEFAULT: '#CCFF00', // Official Contiki Lime Green
    foreground: '#FFFFFF',
    50: '#fff3e6',
    100: '#ffe0b3',
    200: '#ffcc80',
    300: '#ffb74d',
    400: '#ffa726',
    500: '#CCFF00', // Main lime green
    600: '#e65100',
    700: '#cc4700',
    800: '#b33c00',
    900: '#992f00',
  },
  
  accent: {
    DEFAULT: '#CCFF00', // Contiki Lime Green
    foreground: '#FFFFFF',
    50: '#fff3e6',
    100: '#ffe0b3',
    200: '#ffcc80',
    300: '#ffb74d',
    400: '#ffa726',
    500: '#CCFF00',
    600: '#e65100',
    700: '#cc4700',
    800: '#b33c00',
    900: '#992f00',
  },
  
  // Neutral grays for Contiki
  gray: {
    DEFAULT: '#F7F7F7',
    50: '#FAFAFA',
    100: '#F7F7F7',
    200: '#E6E6E6',
    300: '#D1D1D1',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#333333',
    900: '#171717',
  },
  
  // Specific Contiki brand colors from blueprint
  contikiYellow: '#FFEB3B',
  contikiPink: '#FF0080',

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
};
