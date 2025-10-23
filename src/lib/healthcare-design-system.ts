// Healthcare Design System 2025
// Based on research of Mayo Clinic, Cleveland Clinic, WebMD, and modern healthcare UX principles

export const healthcareDesign = {
  // Medical-Grade Color Palette - Inspired by trusted healthcare brands
  colors: {
    // Primary Healthcare Blue - Trust, reliability, medical authority
    primary: {
      50: '#EFF6FF',   // Very light blue backgrounds
      100: '#DBEAFE',  // Light blue accents
      200: '#BFDBFE',  // Subtle blue highlights
      300: '#93C5FD',  // Medium blue elements
      400: '#60A5FA',  // Interactive blue
      500: '#3B82F6',  // Primary brand blue (Cleveland Clinic inspired)
      600: '#2563EB',  // Darker blue for emphasis
      700: '#1D4ED8',  // Deep blue for headers
      800: '#1E40AF',  // Very dark blue
      900: '#1E3A8A',  // Darkest blue for text
    },

    // Medical Green - Health, wellness, positive outcomes
    success: {
      50: '#F0FDF4',
      100: '#DCFCE7', 
      200: '#BBF7D0',
      300: '#86EFAC',
      400: '#4ADE80',
      500: '#22C55E',  // Primary success green
      600: '#16A34A',  // Mayo Clinic inspired green
      700: '#15803D',
      800: '#166534',
      900: '#14532D',
    },

    // Clinical Gray - Professional, neutral, accessible
    neutral: {
      50: '#FAFAFA',   // Pure white backgrounds
      100: '#F5F5F5',  // Very light gray
      200: '#E5E5E5',  // Light gray borders
      300: '#D4D4D4',  // Medium gray separators
      400: '#A3A3A3',  // Subtle text
      500: '#737373',  // Secondary text
      600: '#525252',  // Primary text light
      700: '#404040',  // Primary text
      800: '#262626',  // Dark text
      900: '#171717',  // Darkest text
    },

    // Warning Orange - Caution, attention needed
    warning: {
      50: '#FFFBEB',
      100: '#FEF3C7',
      200: '#FDE68A', 
      300: '#FCD34D',
      400: '#FBBF24',
      500: '#F59E0B',  // Primary warning
      600: '#D97706',
      700: '#B45309',
      800: '#92400E',
      900: '#78350F',
    },

    // Medical Red - Urgent, critical, alerts
    danger: {
      50: '#FEF2F2',
      100: '#FEE2E2',
      200: '#FECACA',
      300: '#FCA5A5', 
      400: '#F87171',
      500: '#EF4444',  // Primary danger red
      600: '#DC2626',
      700: '#B91C1C',
      800: '#991B1B',
      900: '#7F1D1D',
    },
  },

  // Typography - Clean, readable, accessible
  typography: {
    fontFamily: {
      // Primary font stack - System fonts for performance and familiarity
      sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      // Monospace for data/numbers
      mono: ['SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'monospace'],
    },
    fontSize: {
      xs: '0.75rem',    // 12px - Small annotations
      sm: '0.875rem',   // 14px - Secondary text
      base: '1rem',     // 16px - Body text (WCAG recommended minimum)
      lg: '1.125rem',   // 18px - Large body text
      xl: '1.25rem',    // 20px - Small headings
      '2xl': '1.5rem',  // 24px - Section headings
      '3xl': '1.875rem', // 30px - Page headings
      '4xl': '2.25rem', // 36px - Main headings
      '5xl': '3rem',    // 48px - Hero headings
    },
    fontWeight: {
      normal: '400',    // Body text
      medium: '500',    // Emphasized text
      semibold: '600',  // Subheadings
      bold: '700',      // Headings
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',    // WCAG recommended
      relaxed: '1.75',
    },
  },

  // Spacing - Consistent, logical scale
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '0.75rem',    // 12px
    lg: '1rem',       // 16px
    xl: '1.5rem',     // 24px
    '2xl': '2rem',    // 32px
    '3xl': '3rem',    // 48px
    '4xl': '4rem',    // 64px
    '5xl': '6rem',    // 96px
  },

  // Borders and Radius - Subtle, professional
  borderRadius: {
    none: '0',
    sm: '0.25rem',    // 4px - Small elements
    md: '0.5rem',     // 8px - Cards, buttons
    lg: '0.75rem',    // 12px - Larger cards
    xl: '1rem',       // 16px - Special emphasis
    full: '9999px',   // Pills, avatars
  },

  // Shadows - Subtle depth, medical feel
  boxShadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  },
}

// Component Design Patterns - Medical Grade
export const medicalComponents = {
  // Card patterns
  card: {
    base: 'bg-white rounded-lg border border-gray-200 shadow-sm',
    elevated: 'bg-white rounded-lg border border-gray-200 shadow-md',
    interactive: 'bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200',
  },

  // Button patterns  
  button: {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md transition-colors duration-200',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium px-4 py-2 rounded-md transition-colors duration-200',
    success: 'bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-md transition-colors duration-200',
    danger: 'bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-md transition-colors duration-200',
  },

  // Input patterns
  input: {
    base: 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
    error: 'w-full px-3 py-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500',
  },

  // Alert patterns
  alert: {
    info: 'bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-md',
    success: 'bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md',
    warning: 'bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-md', 
    error: 'bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md',
  },
}

// BMI-specific styling
export const bmiCategories = {
  underweight: {
    color: healthcareDesign.colors.primary[700],
    backgroundColor: healthcareDesign.colors.primary[50],
    borderColor: healthcareDesign.colors.primary[200],
    icon: healthcareDesign.colors.primary[600],
  },
  normal: {
    color: healthcareDesign.colors.success[700], 
    backgroundColor: healthcareDesign.colors.success[50],
    borderColor: healthcareDesign.colors.success[200],
    icon: healthcareDesign.colors.success[600],
  },
  overweight: {
    color: healthcareDesign.colors.warning[700],
    backgroundColor: healthcareDesign.colors.warning[50],
    borderColor: healthcareDesign.colors.warning[200],
    icon: healthcareDesign.colors.warning[600],
  },
  obese: {
    color: healthcareDesign.colors.danger[700],
    backgroundColor: healthcareDesign.colors.danger[50],
    borderColor: healthcareDesign.colors.danger[200],
    icon: healthcareDesign.colors.danger[600],
  },
}

// Accessibility standards
export const accessibility = {
  // Minimum contrast ratios (WCAG 2.1 AA)
  contrast: {
    normal: '4.5:1',   // Normal text
    large: '3:1',      // Large text (18pt+ or 14pt+ bold)
    nonText: '3:1',    // UI components
  },
  
  // Focus indicators
  focus: {
    ring: '2px solid #3B82F6',
    offset: '2px',
  },
  
  // Touch targets (minimum 44px)
  touchTarget: {
    minimum: '44px',
    recommended: '48px',
  },
}