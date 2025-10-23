import { z } from 'zod'

export const CalorieCalculatorSchema = z.object({
  gender: z.enum(['male', 'female']),
  age: z.number().min(15).max(120),
  weight: z.number().min(30).max(300),
  height: z.number().min(100).max(250),
  activityLevel: z.enum(['sedentary', 'light', 'moderate', 'very_active', 'extra_active']),
  goal: z.enum(['lose_weight', 'maintain_weight', 'gain_weight']).default('maintain_weight'),
  weightChangeRate: z.enum(['slow', 'moderate', 'fast']).default('moderate')
})

export type CalorieCalculatorInput = z.infer<typeof CalorieCalculatorSchema>

export interface CalorieCalculatorResult {
  bmr: number
  tdee: number
  maintenanceCalories: number
  goalCalories: number
  macroBreakdown: {
    protein: {
      grams: number
      calories: number
      percentage: number
    }
    carbs: {
      grams: number
      calories: number
      percentage: number
    }
    fat: {
      grams: number
      calories: number
      percentage: number
    }
  }
  weeklyWeightChange: number
  timeToGoal?: {
    weeks: number
    months: number
  }
  activityInfo: {
    level: string
    description: string
    examples: string[]
  }
  nutritionTips: {
    category: string
    tip: string
  }[]
}