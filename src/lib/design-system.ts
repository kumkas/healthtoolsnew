// Design System for Health Tools Hub
// Consistent colors, spacing, and styling across the entire application

export const designSystem = {
  // Primary Color Palette - Medical/Health focused
  colors: {
    primary: {
      50: '#F0F9FF',   // Very light blue
      100: '#E0F2FE',  // Light blue
      200: '#BAE6FD',  // Lighter blue
      300: '#7DD3FC',  // Light blue
      400: '#38BDF8',  // Medium blue
      500: '#0EA5E9',  // Primary blue
      600: '#0284C7',  // Darker blue
      700: '#0369A1',  // Dark blue
      800: '#075985',  // Very dark blue
      900: '#0C4A6E',  // Darkest blue
    },
    
    // Success/Health Green
    success: {
      50: '#F0FDF4',
      100: '#DCFCE7',
      200: '#BBF7D0',
      300: '#86EFAC',
      400: '#4ADE80',
      500: '#22C55E',  // Main success color
      600: '#16A34A',
      700: '#15803D',
      800: '#166534',
      900: '#14532D',
    },
    
    // Warning/Caution Orange
    warning: {
      50: '#FFFBEB',
      100: '#FEF3C7',
      200: '#FDE68A',
      300: '#FCD34D',
      400: '#FBBF24',
      500: '#F59E0B',  // Main warning color
      600: '#D97706',
      700: '#B45309',
      800: '#92400E',
      900: '#78350F',
    },
    
    // Danger/Risk Red
    danger: {
      50: '#FEF2F2',
      100: '#FEE2E2',
      200: '#FECACA',
      300: '#FCA5A5',
      400: '#F87171',
      500: '#EF4444',  // Main danger color
      600: '#DC2626',
      700: '#B91C1C',
      800: '#991B1B',
      900: '#7F1D1D',
    },
    
    // Neutral grays
    neutral: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#E5E5E5',
      300: '#D4D4D4',
      400: '#A3A3A3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
    },
  },
  
  // Spacing system
  spacing: {
    xs: '0.5rem',    // 8px
    sm: '0.75rem',   // 12px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
    '3xl': '4rem',   // 64px
    '4xl': '6rem',   // 96px
  },
  
  // Typography
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },
  
  // Border radius
  borderRadius: {
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
    '2xl': '2rem',
    full: '9999px',
  },
  
  // Shadows
  boxShadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  },
}

// BMI Category specific styling
export const bmiStyles = {
  underweight: {
    color: designSystem.colors.primary[600],
    bgColor: designSystem.colors.primary[50],
    borderColor: designSystem.colors.primary[200],
    icon: designSystem.colors.primary[500],
  },
  normal: {
    color: designSystem.colors.success[700],
    bgColor: designSystem.colors.success[50],
    borderColor: designSystem.colors.success[200],
    icon: designSystem.colors.success[600],
  },
  overweight: {
    color: designSystem.colors.warning[700],
    bgColor: designSystem.colors.warning[50],
    borderColor: designSystem.colors.warning[200],
    icon: designSystem.colors.warning[600],
  },
  obese: {
    color: designSystem.colors.danger[700],
    bgColor: designSystem.colors.danger[50],
    borderColor: designSystem.colors.danger[200],
    icon: designSystem.colors.danger[600],
  },
}

// Common component styles
export const componentStyles = {
  card: {
    base: `bg-white rounded-${designSystem.borderRadius.xl} shadow-${designSystem.boxShadow.md} border border-${designSystem.colors.neutral[200]}`,
    padding: designSystem.spacing['2xl'],
  },
  
  section: {
    base: 'bg-white',
    padding: `py-${designSystem.spacing['3xl']} px-${designSystem.spacing.xl}`,
  },
  
  container: {
    base: 'max-w-7xl mx-auto',
  },
  
  button: {
    primary: `bg-${designSystem.colors.primary[600]} hover:bg-${designSystem.colors.primary[700]} text-white font-${designSystem.typography.fontWeight.semibold} rounded-${designSystem.borderRadius.md} px-${designSystem.spacing.xl} py-${designSystem.spacing.md} shadow-${designSystem.boxShadow.base} transition-all duration-200`,
  },
}