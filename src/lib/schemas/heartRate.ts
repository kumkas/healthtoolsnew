import { z } from 'zod'

export const HeartRateZoneCalculatorSchema = z.object({
  age: z.number().min(15).max(100),
  restingHeartRate: z.number().min(40).max(120).optional(),
  maxHeartRate: z.number().min(120).max(220).optional(),
  calculationMethod: z.enum(['age_formula', 'karvonen', 'custom_max']).default('karvonen'),
  activityLevel: z.enum(['sedentary', 'lightly_active', 'moderately_active', 'very_active', 'extremely_active']).default('moderately_active'),
  goals: z.array(z.enum(['fat_burn', 'aerobic', 'anaerobic', 'vo2_max', 'recovery'])).default(['fat_burn', 'aerobic'])
}).superRefine((data, ctx) => {
  // Karvonen method requires resting heart rate
  if (data.calculationMethod === 'karvonen' && !data.restingHeartRate) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Resting heart rate is required for Karvonen method',
      path: ['restingHeartRate']
    })
  }
  
  // Custom max method requires max heart rate
  if (data.calculationMethod === 'custom_max' && !data.maxHeartRate) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Maximum heart rate is required for custom method',
      path: ['maxHeartRate']
    })
  }
  
  // Validate max heart rate is reasonable
  if (data.maxHeartRate && data.maxHeartRate < (220 - data.age) * 0.8) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Maximum heart rate seems too low for your age',
      path: ['maxHeartRate']
    })
  }
  
  // Validate resting heart rate is reasonable
  if (data.restingHeartRate && data.maxHeartRate && data.restingHeartRate >= data.maxHeartRate) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Resting heart rate must be lower than maximum heart rate',
      path: ['restingHeartRate']
    })
  }
})

export type HeartRateZoneCalculatorInput = z.infer<typeof HeartRateZoneCalculatorSchema>

export interface HeartRateZone {
  name: string
  description: string
  purpose: string
  benefits: string[]
  minBpm: number
  maxBpm: number
  minPercentage: number
  maxPercentage: number
  color: string
  intensity: string
  duration: string
  examples: string[]
}

export interface HeartRateZoneCalculatorResult {
  calculationMethod: string
  maxHeartRate: number
  restingHeartRate: number | null
  heartRateReserve: number | null
  zones: HeartRateZone[]
  recommendations: {
    zone: string
    recommendation: string
    reason: string
  }[]
  trainingTips: {
    category: string
    tip: string
  }[]
  methodology: {
    name: string
    description: string
    accuracy: string
    advantages: string[]
    limitations: string[]
  }
  fitnessInsights: {
    category: string
    insight: string
  }[]
}