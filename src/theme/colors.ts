
// Define Contiki brand colors and variants
export const colors = {
  border: 'hsl(var(--border))',
  input: 'hsl(var(--input))',
  ring: 'hsl(var(--ring))',
  background: 'hsl(var(--background))',
  foreground: 'hsl(var(--foreground))',
  
  // Contiki Brand Colors
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
  
  // Contiki Green color (#cf0)
  secondary: {
    DEFAULT: '#cf0;', // Main Contiki green color
    foreground: '#000000',
    50: '#f9ffe6',
    100: '#efffb3',
    200: '#e2ff80',
    300: '#ccff4d',
    400: '#cf0', // Main green
    500: '#cf0', // Main green
    600: '#b8e600',
    700: '#a3cc00',
    800: '#8bb300',
    900: '#739900',
  },
  
  accent: {
    DEFAULT: '#cf0;', // Contiki Green
    foreground: '#000000',
    50: '#f9ffe6',
    100: '#efffb3',
    200: '#e2ff80',
    300: '#ccff4d',
    400: '#cf0',
    500: '#cf0',
    600: '#b8e600',
    700: '#a3cc00',
    800: '#8bb300',
    900: '#739900',
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
