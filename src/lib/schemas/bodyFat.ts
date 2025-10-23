import { z } from 'zod'

export const BodyFatCalculatorSchema = z.object({
  method: z.enum(['us_navy', 'ymca', 'jackson_pollock_3', 'jackson_pollock_7']).default('us_navy'),
  gender: z.enum(['male', 'female']),
  age: z.number().min(18).max(100),
  weight: z.number().min(40).max(300),
  height: z.number().min(100).max(250),
  // US Navy Method measurements
  neck: z.number().min(20).max(60).optional(),
  waist: z.number().min(50).max(150).optional(),
  hip: z.number().min(70).max(160).optional(), // Required for females in US Navy method
  // YMCA Method measurements
  abdomen: z.number().min(50).max(150).optional(), // For YMCA method
  // Jackson-Pollock 3-site measurements
  chest: z.number().min(5).max(50).optional(), // Skinfold in mm
  thigh: z.number().min(5).max(50).optional(), // Skinfold in mm
  tricep: z.number().min(5).max(50).optional(), // Skinfold in mm
  // Jackson-Pollock 7-site additional measurements
  subscapular: z.number().min(5).max(50).optional(), // Skinfold in mm
  suprailiac: z.number().min(5).max(50).optional(), // Skinfold in mm
  axilla: z.number().min(5).max(50).optional(), // Skinfold in mm
  abdominal: z.number().min(5).max(50).optional() // Skinfold in mm
}).superRefine((data, ctx) => {
  // US Navy method validation
  if (data.method === 'us_navy') {
    if (!data.neck) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Neck circumference is required for US Navy method',
        path: ['neck']
      })
    }
    if (!data.waist) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Waist circumference is required for US Navy method',
        path: ['waist']
      })
    }
    if (data.gender === 'female' && !data.hip) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Hip circumference is required for females in US Navy method',
        path: ['hip']
      })
    }
  }
  
  // YMCA method validation
  if (data.method === 'ymca') {
    if (!data.abdomen) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Abdomen circumference is required for YMCA method',
        path: ['abdomen']
      })
    }
  }
  
  // Jackson-Pollock 3-site validation
  if (data.method === 'jackson_pollock_3') {
    if (data.gender === 'male') {
      if (!data.chest || !data.abdomen || !data.thigh) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Chest, abdomen, and thigh skinfold measurements are required for males',
          path: ['chest']
        })
      }
    } else {
      if (!data.tricep || !data.suprailiac || !data.thigh) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Tricep, suprailiac, and thigh skinfold measurements are required for females',
          path: ['tricep']
        })
      }
    }
  }
  
  // Jackson-Pollock 7-site validation
  if (data.method === 'jackson_pollock_7') {
    const required = ['chest', 'subscapular', 'tricep', 'suprailiac', 'abdomen', 'thigh', 'axilla']
    for (const field of required) {
      if (!data[field as keyof typeof data]) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `${field} skinfold measurement is required for 7-site method`,
          path: [field]
        })
      }
    }
  }
})

export type BodyFatCalculatorInput = z.infer<typeof BodyFatCalculatorSchema>

export interface BodyFatCalculatorResult {
  method: string
  bodyFatPercentage: number
  bodyFatMass: number
  leanBodyMass: number
  category: {
    label: string
    description: string
    color: string
    range: string
  }
  bmi: number
  methodology: {
    name: string
    description: string
    accuracy: string
    pros: string[]
    cons: string[]
  }
  healthInsights: {
    category: string
    insight: string
  }[]
  recommendations: {
    type: string
    recommendation: string
  }[]
  bodyComposition: {
    fatMass: number
    leanMass: number
    muscleMass: number
    boneMass: number
  }
}