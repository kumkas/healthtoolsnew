import { BMI_CATEGORIES } from '../constants'

export function calculateBMI(weight: number, height: number, unit: 'metric' | 'imperial'): number {
  let weightKg = weight
  let heightCm = height

  // Convert to metric if needed
  if (unit === 'imperial') {
    weightKg = weight * 0.453592 // lbs to kg
    heightCm = height * 2.54 // inches to cm
  }

  const heightM = heightCm / 100
  return Number((weightKg / (heightM * heightM)).toFixed(1))
}

export function getBMICategory(bmi: number): keyof typeof BMI_CATEGORIES {
  if (bmi < BMI_CATEGORIES.UNDERWEIGHT.max) return 'UNDERWEIGHT'
  if (bmi < BMI_CATEGORIES.NORMAL.max) return 'NORMAL'
  if (bmi < BMI_CATEGORIES.OVERWEIGHT.max) return 'OVERWEIGHT'
  return 'OBESE'
}

export function getIdealWeight(height: number, unit: 'metric' | 'imperial'): { min: number; max: number } {
  let heightM: number

  if (unit === 'metric') {
    heightM = height / 100
  } else {
    heightM = (height * 2.54) / 100
  }

  const minWeightKg = 18.5 * heightM * heightM
  const maxWeightKg = 24.9 * heightM * heightM

  if (unit === 'imperial') {
    return {
      min: Number((minWeightKg * 2.20462).toFixed(1)), // kg to lbs
      max: Number((maxWeightKg * 2.20462).toFixed(1))
    }
  }

  return {
    min: Number(minWeightKg.toFixed(1)),
    max: Number(maxWeightKg.toFixed(1))
  }
}