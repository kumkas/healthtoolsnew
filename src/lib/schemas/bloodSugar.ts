import { z } from 'zod'

export const BloodSugarCalculatorSchema = z.object({
  calculationType: z.enum(['glucose_analysis', 'hba1c_conversion', 'diabetes_risk']).default('glucose_analysis'),
  
  // Glucose readings
  fastingGlucose: z.number().min(50).max(500).optional(), // mg/dL
  randomGlucose: z.number().min(50).max(500).optional(), // mg/dL
  postMealGlucose: z.number().min(50).max(500).optional(), // mg/dL (2 hours after meal)
  
  // HbA1c values
  hba1cPercentage: z.number().min(3).max(20).optional(), // %
  hba1cMmol: z.number().min(10).max(200).optional(), // mmol/mol
  
  // Personal information for risk assessment
  age: z.number().min(18).max(100).optional(),
  gender: z.enum(['male', 'female']).optional(),
  weight: z.number().min(40).max(300).optional(), // kg
  height: z.number().min(100).max(250).optional(), // cm
  
  // Risk factors
  familyHistory: z.enum(['none', 'parent', 'sibling', 'both']).default('none'),
  ethnicity: z.enum(['caucasian', 'african_american', 'hispanic', 'asian', 'native_american', 'other']).optional(),
  physicalActivity: z.enum(['low', 'moderate', 'high']).default('moderate'),
  bloodPressure: z.enum(['normal', 'elevated', 'high']).default('normal'),
  
  // Medical history
  prediabetes: z.boolean().default(false),
  gestationalDiabetes: z.boolean().default(false),
  pcosHistory: z.boolean().default(false),
  
  // Lifestyle factors
  smokingStatus: z.enum(['never', 'former', 'current']).default('never'),
  sleepHours: z.number().min(3).max(12).default(7),
  stressLevel: z.enum(['low', 'moderate', 'high']).default('moderate'),
  
  // Measurement unit preference
  glucoseUnit: z.enum(['mg_dl', 'mmol_l']).default('mg_dl')
}).superRefine((data, ctx) => {
  if (data.calculationType === 'glucose_analysis') {
    if (!data.fastingGlucose && !data.randomGlucose && !data.postMealGlucose) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'At least one glucose reading is required for glucose analysis',
        path: ['fastingGlucose']
      })
    }
  }
  
  if (data.calculationType === 'hba1c_conversion') {
    if (!data.hba1cPercentage && !data.hba1cMmol) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'HbA1c value is required for conversion',
        path: ['hba1cPercentage']
      })
    }
  }
  
  if (data.calculationType === 'diabetes_risk') {
    if (!data.age || !data.gender || !data.weight || !data.height) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Basic information is required for risk assessment',
        path: ['age']
      })
    }
  }
})

export type BloodSugarCalculatorInput = z.infer<typeof BloodSugarCalculatorSchema>

export interface GlucoseReading {
  type: 'fasting' | 'random' | 'postMeal'
  value: number
  unit: 'mg_dl' | 'mmol_l'
  convertedValue?: number
  category: {
    label: string
    description: string
    color: string
    range: string
  }
  recommendations: string[]
}

export interface HbA1cResult {
  percentage: number
  mmolMol: number
  estimatedAverageGlucose: {
    mgDl: number
    mmolL: number
  }
  category: {
    label: string
    description: string
    color: string
    range: string
  }
  recommendations: string[]
}

export interface DiabetesRiskAssessment {
  riskScore: number
  riskLevel: 'low' | 'moderate' | 'high' | 'very_high'
  riskPercentage: number
  riskFactors: {
    factor: string
    present: boolean
    impact: 'low' | 'moderate' | 'high'
  }[]
  recommendations: {
    category: string
    recommendation: string
    priority: 'high' | 'medium' | 'low'
  }[]
}

export interface BloodSugarCalculatorResult {
  calculationType: string
  glucoseReadings?: GlucoseReading[]
  hba1cResult?: HbA1cResult
  diabetesRisk?: DiabetesRiskAssessment
  healthInsights: {
    category: string
    insight: string
  }[]
  emergencyWarning?: {
    level: 'severe' | 'urgent' | 'caution'
    message: string
    actions: string[]
  }
  educationalInfo: {
    topic: string
    explanation: string
  }[]
  lifestyleTips: {
    category: string
    tip: string
  }[]
}