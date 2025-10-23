import { z } from 'zod'

export const BMRCalculatorSchema = z.object({
  // Basic information
  age: z.number().min(10).max(120),
  gender: z.enum(['male', 'female']),
  weight: z.number().min(20).max(500), // kg
  height: z.number().min(50).max(300), // cm
  
  // Unit preferences
  weightUnit: z.enum(['kg', 'lbs']).default('kg'),
  heightUnit: z.enum(['cm', 'ft_in']).default('cm'),
  
  // For feet/inches input
  feet: z.number().min(2).max(9).optional(),
  inches: z.number().min(0).max(11).optional(),
  
  // Calculation method
  formula: z.enum(['mifflin_st_jeor', 'harris_benedict', 'katch_mcardle']).default('mifflin_st_jeor'),
  
  // For Katch-McArdle (requires body fat %)
  bodyFatPercentage: z.number().min(3).max(50).optional(),
  
  // Activity level for TDEE calculation
  activityLevel: z.enum(['sedentary', 'lightly_active', 'moderately_active', 'very_active', 'extremely_active']).default('sedentary'),
  
  // Goals and additional factors
  goal: z.enum(['maintain', 'lose_weight', 'gain_weight', 'gain_muscle']).default('maintain'),
  weightChangeRate: z.number().min(0.25).max(2).default(0.5), // kg per week
  
  // Medical conditions that affect BMR
  thyroidCondition: z.enum(['none', 'hypothyroid', 'hyperthyroid']).default('none'),
  diabetesType: z.enum(['none', 'type1', 'type2']).default('none'),
  
  // Lifestyle factors
  smokingStatus: z.enum(['never', 'former', 'current']).default('never'),
  caffeineDrinks: z.number().min(0).max(20).default(0), // cups per day
  
  // Advanced options
  includeBodyComposition: z.boolean().default(false),
  includeMetabolicAge: z.boolean().default(false)
}).superRefine((data, ctx) => {
  // Validate height input based on unit
  if (data.heightUnit === 'ft_in') {
    if (!data.feet || !data.inches) {
      ctx.addIssue({
        code: 'custom',
        message: 'Feet and inches are required when using ft/in format',
        path: ['feet']
      })
    }
  }
  
  // Validate body fat percentage for Katch-McArdle
  if (data.formula === 'katch_mcardle' && !data.bodyFatPercentage) {
    ctx.addIssue({
      code: 'custom',
      message: 'Body fat percentage is required for Katch-McArdle formula',
      path: ['bodyFatPercentage']
    })
  }
  
  // Validate realistic body fat ranges by gender
  if (data.bodyFatPercentage) {
    const minBF = data.gender === 'male' ? 3 : 10
    const maxBF = data.gender === 'male' ? 35 : 45
    
    if (data.bodyFatPercentage < minBF || data.bodyFatPercentage > maxBF) {
      ctx.addIssue({
        code: 'custom',
        message: `Body fat percentage should be between ${minBF}% and ${maxBF}% for ${data.gender}s`,
        path: ['bodyFatPercentage']
      })
    }
  }
})

export type BMRCalculatorInput = z.infer<typeof BMRCalculatorSchema>

export interface BMRResult {
  bmr: number
  tdee: number
  formula: string
  methodDescription: string
  reliability: 'high' | 'moderate' | 'low'
  factors: {
    name: string
    value: string
    impact: string
  }[]
}

export interface CalorieGoals {
  maintenance: number
  weightLoss: {
    conservative: number // 0.25kg/week
    moderate: number     // 0.5kg/week
    aggressive: number   // 1kg/week
  }
  weightGain: {
    lean: number      // 0.25kg/week
    moderate: number  // 0.5kg/week
    bulking: number   // 1kg/week
  }
  customGoal: number
}

export interface MacroBreakdown {
  calories: number
  protein: { grams: number; percentage: number }
  carbs: { grams: number; percentage: number }
  fat: { grams: number; percentage: number }
  fiber: number
}

export interface MetabolicInsights {
  metabolicAge: number
  comparison: string
  factors: {
    factor: string
    status: 'positive' | 'neutral' | 'negative'
    description: string
  }[]
  recommendations: {
    category: string
    recommendation: string
    priority: 'high' | 'medium' | 'low'
  }[]
}

export interface BMRCalculatorResult {
  bmrResult: BMRResult
  calorieGoals: CalorieGoals
  macroBreakdowns: {
    maintenance: MacroBreakdown
    goal: MacroBreakdown
  }
  metabolicInsights?: MetabolicInsights
  activityRecommendations: {
    type: string
    duration: string
    frequency: string
    caloriesBurned: number
  }[]
  nutritionTips: {
    category: string
    tip: string
    importance: 'high' | 'medium' | 'low'
  }[]
  warningMessages?: {
    level: 'caution' | 'warning' | 'critical'
    message: string
    recommendations: string[]
  }[]
}