import { z } from 'zod'

export const CholesterolCalculatorSchema = z.object({
  // Cholesterol panel values
  totalCholesterol: z.number().min(100).max(500), // mg/dL
  ldlCholesterol: z.number().min(30).max(400).optional(), // mg/dL
  hdlCholesterol: z.number().min(20).max(150), // mg/dL
  triglycerides: z.number().min(30).max(1000), // mg/dL
  
  // Unit preference
  cholesterolUnit: z.enum(['mg_dl', 'mmol_l']).default('mg_dl'),
  
  // Personal information
  age: z.number().min(20).max(100),
  gender: z.enum(['male', 'female']),
  
  // Cardiovascular risk factors
  smokingStatus: z.enum(['never', 'former', 'current']).default('never'),
  diabetesStatus: z.enum(['none', 'prediabetes', 'type1', 'type2']).default('none'),
  familyHistory: z.enum(['none', 'premature_cad', 'stroke', 'both']).default('none'),
  
  // Blood pressure
  systolicBP: z.number().min(70).max(250).optional(),
  diastolicBP: z.number().min(40).max(150).optional(),
  hypertensionTreatment: z.boolean().default(false),
  
  // Lifestyle factors
  physicalActivity: z.enum(['sedentary', 'low', 'moderate', 'high']).default('moderate'),
  diet: z.enum(['poor', 'average', 'good', 'excellent']).default('average'),
  
  // Medical history
  priorCVD: z.boolean().default(false), // Prior cardiovascular disease
  kidneyDisease: z.boolean().default(false),
  inflammatoryCondition: z.boolean().default(false),
  
  // Additional biomarkers (optional)
  cReactiveProtein: z.number().min(0).max(20).optional(), // mg/L
  lipoproteinA: z.number().min(0).max(200).optional(), // mg/dL
  apoB: z.number().min(30).max(200).optional(), // mg/dL
  
  // Medications
  statinUse: z.boolean().default(false),
  otherLipidMeds: z.boolean().default(false),
  
  // Assessment type
  riskAssessment: z.enum(['basic', 'comprehensive']).default('basic')
}).superRefine((data, ctx) => {
  // Calculate LDL if not provided using Friedewald equation
  if (!data.ldlCholesterol && data.triglycerides <= 400) {
    // This will be calculated in the logic
  }
  
  // Validate blood pressure readings
  if (data.systolicBP && data.diastolicBP) {
    if (data.systolicBP <= data.diastolicBP) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Systolic pressure must be higher than diastolic pressure',
        path: ['systolicBP']
      })
    }
  }
  
  // Age-based risk factor validation
  if (data.age < 40 && data.priorCVD) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Prior CVD at young age requires specialist consultation',
      path: ['priorCVD']
    })
  }
})

export type CholesterolCalculatorInput = z.infer<typeof CholesterolCalculatorSchema>

export interface CholesterolReading {
  type: 'total' | 'ldl' | 'hdl' | 'triglycerides' | 'non_hdl'
  value: number
  unit: 'mg_dl' | 'mmol_l'
  convertedValue?: number
  category: {
    label: string
    description: string
    color: string
    range: string
  }
  targetRange?: string
  recommendations: string[]
}

export interface CholesterolRatios {
  totalToHdl: {
    value: number
    category: {
      label: string
      description: string
      color: string
    }
  }
  ldlToHdl: {
    value: number
    category: {
      label: string
      description: string
      color: string
    }
  }
  triglycerideToHdl: {
    value: number
    category: {
      label: string
      description: string
      color: string
    }
  }
}

export interface CardiovascularRisk {
  tenYearRisk: number
  riskCategory: 'low' | 'borderline' | 'intermediate' | 'high'
  lifetimeRisk: number
  riskFactors: {
    factor: string
    present: boolean
    impact: 'protective' | 'neutral' | 'moderate' | 'high'
    description: string
  }[]
  framinghamScore?: number
  pooledCohortEquation?: number
}

export interface TreatmentRecommendations {
  riskCategory: string
  ldlTarget: number
  treatmentPriority: 'lifestyle' | 'medication_consideration' | 'medication_indicated'
  statinRecommendation: {
    indicated: boolean
    intensity: 'low' | 'moderate' | 'high' | 'none'
    reasoning: string
  }
  lifestyleInterventions: {
    category: string
    intervention: string
    priority: 'high' | 'medium' | 'low'
    expectedBenefit: string
  }[]
  monitoringPlan: {
    frequency: string
    tests: string[]
    followUpActions: string[]
  }
}

export interface CholesterolCalculatorResult {
  cholesterolReadings: CholesterolReading[]
  cholesterolRatios: CholesterolRatios
  cardiovascularRisk: CardiovascularRisk
  treatmentRecommendations: TreatmentRecommendations
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