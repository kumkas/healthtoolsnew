import { z } from 'zod'

export const HydrationCalculatorSchema = z.object({
  weight: z.number().min(40).max(300),
  height: z.number().min(100).max(250),
  age: z.number().min(18).max(100),
  gender: z.enum(['male', 'female']),
  activityLevel: z.enum(['sedentary', 'light', 'moderate', 'active', 'very_active']),
  climate: z.enum(['cool', 'temperate', 'warm', 'hot', 'very_hot']),
  exerciseDuration: z.number().min(0).max(480).default(0), // minutes per day
  exerciseIntensity: z.enum(['low', 'moderate', 'high']).default('moderate'),
  sweatRate: z.enum(['low', 'normal', 'high']).default('normal'),
  healthConditions: z.array(z.enum(['none', 'diabetes', 'kidney_disease', 'heart_disease', 'fever', 'vomiting_diarrhea'])).default(['none']),
  pregnancyBreastfeeding: z.enum(['none', 'pregnant', 'breastfeeding']).default('none'),
  caffeine: z.number().min(0).max(2000).default(0), // mg per day
  alcohol: z.number().min(0).max(20).default(0), // standard drinks per day
  currentIntake: z.number().min(0).max(10).optional() // liters per day
})

export type HydrationCalculatorInput = z.infer<typeof HydrationCalculatorSchema>

export interface HydrationCalculatorResult {
  baselineNeed: number // liters
  activityAdjustment: number // additional liters
  climateAdjustment: number // additional liters
  conditionAdjustment: number // additional liters
  totalDailyNeed: number // liters
  totalDailyNeedOz: number // fluid ounces
  totalDailyNeedCups: number // 8oz cups
  hourlyIntake: number // ml per hour
  recommendations: {
    timing: string
    amount: string
    reason: string
  }[]
  hydrationTips: {
    category: string
    tip: string
  }[]
  warningsigns: {
    dehydration: string[]
    overhydration: string[]
  }
  fluidSources: {
    source: string
    hydrationValue: number // percentage
    description: string
    examples: string[]
  }[]
  personalizedInsights: {
    category: string
    insight: string
  }[]
  intakeComparison?: {
    current: number
    recommended: number
    difference: number
    status: 'adequate' | 'low' | 'high'
  }
}