import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(value: number, decimals: number = 1): string {
  return value.toFixed(decimals)
}

export function convertHeight(value: number, fromUnit: 'cm' | 'ft-in', toUnit: 'cm' | 'ft-in'): number {
  if (fromUnit === toUnit) return value
  
  if (fromUnit === 'cm' && toUnit === 'ft-in') {
    const totalInches = value / 2.54
    return Math.round(totalInches * 10) / 10
  }
  
  if (fromUnit === 'ft-in' && toUnit === 'cm') {
    return Math.round(value * 2.54 * 10) / 10
  }
  
  return value
}

export function convertWeight(value: number, fromUnit: 'kg' | 'lbs', toUnit: 'kg' | 'lbs'): number {
  if (fromUnit === toUnit) return value
  
  if (fromUnit === 'kg' && toUnit === 'lbs') {
    return Math.round(value * 2.20462 * 10) / 10
  }
  
  if (fromUnit === 'lbs' && toUnit === 'kg') {
    return Math.round(value / 2.20462 * 10) / 10
  }
  
  return value
}

export function parseHeightInput(input: string): { feet?: number; inches?: number; cm?: number } {
  const trimmed = input.trim()
  
  // Try to parse as feet and inches (e.g., "5'8" or "5 8" or "5ft 8in")
  const feetInchesMatch = trimmed.match(/(\d+)['′]?\s*(\d+)["″]?|(\d+)\s*ft\s*(\d+)\s*in|(\d+)\s+(\d+)/)
  if (feetInchesMatch) {
    const feet = parseInt(feetInchesMatch[1] || feetInchesMatch[3] || feetInchesMatch[5])
    const inches = parseInt(feetInchesMatch[2] || feetInchesMatch[4] || feetInchesMatch[6])
    return { feet, inches }
  }
  
  // Try to parse as just feet (e.g., "5" when expecting feet)
  const feetMatch = trimmed.match(/^(\d+)$/)
  if (feetMatch) {
    return { feet: parseInt(feetMatch[1]), inches: 0 }
  }
  
  // Try to parse as cm
  const cmMatch = trimmed.match(/(\d+\.?\d*)\s*cm/)
  if (cmMatch) {
    return { cm: parseFloat(cmMatch[1]) }
  }
  
  // Default to cm if just a number
  const numberMatch = trimmed.match(/^(\d+\.?\d*)$/)
  if (numberMatch) {
    const value = parseFloat(numberMatch[1])
    // Assume cm if > 50, feet if <= 8
    if (value <= 8) {
      return { feet: Math.floor(value), inches: Math.round((value % 1) * 12) }
    } else {
      return { cm: value }
    }
  }
  
  return {}
}

export function heightToCm(feet: number, inches: number): number {
  return Math.round((feet * 12 + inches) * 2.54 * 10) / 10
}

export function cmToFeetInches(cm: number): { feet: number; inches: number } {
  const totalInches = cm / 2.54
  const feet = Math.floor(totalInches / 12)
  const inches = Math.round(totalInches % 12)
  return { feet, inches }
}

export function calculateAge(birthDate: Date): number {
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  
  return age
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export function getResultColor(value: number, ranges: { low: number; high: number }): string {
  if (value < ranges.low) return 'text-blue-600'
  if (value > ranges.high) return 'text-red-600'
  return 'text-green-600'
}

export function getResultCategory(value: number, ranges: { low: number; normal: number; high: number }): {
  category: string
  color: string
  bgColor: string
} {
  if (value < ranges.low) {
    return { category: 'Low', color: 'text-blue-600', bgColor: 'bg-blue-50' }
  } else if (value <= ranges.normal) {
    return { category: 'Normal', color: 'text-green-600', bgColor: 'bg-green-50' }
  } else if (value <= ranges.high) {
    return { category: 'High', color: 'text-amber-600', bgColor: 'bg-amber-50' }
  } else {
    return { category: 'Very High', color: 'text-red-600', bgColor: 'bg-red-50' }
  }
}