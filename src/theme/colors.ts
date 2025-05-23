
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
  
  // Chartreuse color (#CF0)
  green: {
    DEFAULT: '#CCFF00',
    50: '#f7ffe0',
    100: '#eeffb3',
    200: '#e5ff80',
    300: '#ddff4d',
    400: '#d4ff1a',
    500: '#CCFF00', // Main Chartreuse color
    600: '#a3cc00',
    700: '#7a9900',
    800: '#526600',
    900: '#293300',
  },
  
  secondary: {
    DEFAULT: '#CCFF00', // Chartreuse
    foreground: '#000000', // Changed to black for better contrast
    50: '#f7ffe0',
    100: '#eeffb3',
    200: '#e5ff80',
    300: '#ddff4d',
    400: '#d4ff1a',
    500: '#CCFF00',
    600: '#a3cc00',
    700: '#7a9900',
    800: '#526600',
    900: '#293300',
  },
  
  accent: {
    DEFAULT: '#CCFF00', // Chartreuse
    foreground: '#000000', // Changed to black for better contrast
    50: '#f7ffe0',
    100: '#eeffb3',
    200: '#e5ff80',
    300: '#ddff4d',
    400: '#d4ff1a',
    500: '#CCFF00',
    600: '#a3cc00',
    700: '#7a9900',
    800: '#526600',
    900: '#293300',
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
