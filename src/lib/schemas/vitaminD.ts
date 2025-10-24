import { z } from 'zod'

export const VitaminDCalculatorSchema = z.object({
  // Current vitamin D status
  currentVitaminDLevel: z.number().min(5).max(200).optional(), // ng/mL
  vitaminDUnit: z.enum(['ng_ml', 'nmol_l']).default('ng_ml'),
  
  // Personal information
  age: z.number().min(1).max(100),
  gender: z.enum(['male', 'female']),
  
  // Physical characteristics
  skinType: z.enum(['very_fair', 'fair', 'medium', 'olive', 'brown', 'very_dark']).default('fair'),
  bodyWeight: z.number().min(20).max(300), // kg
  
  // Geographic and lifestyle factors
  latitude: z.number().min(-90).max(90).optional(),
  season: z.enum(['spring', 'summer', 'fall', 'winter']).default('summer'),
  sunExposureHours: z.number().min(0).max(12).default(2), // hours per day
  sunscreenUse: z.enum(['never', 'sometimes', 'usually', 'always']).default('sometimes'),
  
  // Lifestyle factors
  dietaryIntake: z.enum(['very_low', 'low', 'moderate', 'high']).default('low'),
  supplementUse: z.enum(['none', 'low_dose', 'moderate_dose', 'high_dose']).default('none'),
  currentSupplementDose: z.number().min(0).max(10000).optional(), // IU per day
  
  // Health factors
  bmi: z.number().min(15).max(50).optional(),
  pregnancyStatus: z.enum(['not_pregnant', 'pregnant', 'breastfeeding']).default('not_pregnant'),
  
  // Medical conditions
  medicalConditions: z.array(z.enum([
    'osteoporosis',
    'kidney_disease',
    'liver_disease',
    'malabsorption',
    'hyperparathyroidism',
    'sarcoidosis',
    'none'
  ])).default(['none']),
  
  // Medications
  medications: z.array(z.enum([
    'steroids',
    'anticonvulsants',
    'weight_loss_drugs',
    'cholesterol_drugs',
    'none'
  ])).default(['none']),
  
  // Assessment type
  assessmentType: z.enum(['basic', 'comprehensive']).default('basic')
}).superRefine((data, ctx) => {
  // If supplement use is specified, require dose
  if (data.supplementUse !== 'none' && !data.currentSupplementDose) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Current supplement dose is required when using supplements',
      path: ['currentSupplementDose']
    })
  }
  
  // Validate BMI range
  if (data.bmi && (data.bmi < 15 || data.bmi > 50)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'BMI should be between 15 and 50',
      path: ['bmi']
    })
  }
})

export type VitaminDCalculatorInput = z.infer<typeof VitaminDCalculatorSchema>

export interface VitaminDStatus {
  level: number
  unit: 'ng_ml' | 'nmol_l'
  convertedLevel?: number
  category: {
    label: string
    description: string
    color: string
    range: string
  }
  recommendations: string[]
}

export interface DeficiencyRisk {
  riskLevel: 'very_low' | 'low' | 'moderate' | 'high' | 'very_high'
  riskScore: number
  riskFactors: {
    factor: string
    present: boolean
    impact: 'protective' | 'neutral' | 'moderate' | 'high'
    description: string
  }[]
  seasonalVariation: {
    season: string
    expectedChange: string
    recommendation: string
  }
}

export interface SunExposureRecommendations {
  dailyExposureTime: {
    minimum: number
    optimal: number
    maximum: number
    unit: 'minutes'
  }
  timeOfDay: string[]
  skinProtection: {
    spfRecommendation: number
    clothingRecommendation: string
    additionalPrecautions: string[]
  }
  seasonalAdjustments: {
    season: string
    adjustment: string
    reasoning: string
  }[]
}

export interface SupplementationGuidance {
  recommended: boolean
  dailyDose: {
    minimum: number
    optimal: number
    maximum: number
    unit: 'IU'
  }
  supplementType: string
  timing: string
  duration: string
  monitoringAdvice: string
  contraindications: string[]
}

export interface DietaryRecommendations {
  foodSources: {
    category: string
    foods: string[]
    vitaminDContent: string
    servingSize: string
  }[]
  fortifiedFoods: {
    food: string
    content: string
    availability: string
  }[]
  mealPlanningTips: string[]
}

export interface VitaminDCalculatorResult {
  vitaminDStatus: VitaminDStatus
  deficiencyRisk: DeficiencyRisk
  sunExposureRecommendations: SunExposureRecommendations
  supplementationGuidance: SupplementationGuidance
  dietaryRecommendations: DietaryRecommendations
  healthInsights: {
    category: string
    insight: string
    actionable: boolean
  }[]
  warningFlags?: {
    level: 'caution' | 'warning' | 'urgent'
    message: string
    recommendations: string[]
  }[]
  educationalContent: {
    topic: string
    explanation: string
    importance: 'high' | 'medium' | 'low'
  }[]
}