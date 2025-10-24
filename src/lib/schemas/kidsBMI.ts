import { z } from 'zod'

export const KidsBMICalculatorSchema = z.object({
  // Child's information
  age: z.number().min(2).max(19), // 2-19 years
  ageMonths: z.number().min(0).max(11).optional(), // Additional months for more precision
  gender: z.enum(['male', 'female']),
  
  // Physical measurements
  height: z.number().min(50).max(250), // cm
  heightUnit: z.enum(['cm', 'ft_in']).default('cm'),
  heightFeet: z.number().min(1).max(8).optional(), // for imperial
  heightInches: z.number().min(0).max(11).optional(), // for imperial
  
  weight: z.number().min(5).max(200), // kg or lbs
  weightUnit: z.enum(['kg', 'lbs']).default('kg'),
  
  // Context for interpretation
  measurementContext: z.enum(['home', 'clinic', 'school']).default('home'),
  recentGrowthConcerns: z.boolean().default(false),
  
  // Optional parent information for genetic context
  parentHeights: z.object({
    motherHeight: z.number().min(120).max(200).optional(), // cm
    fatherHeight: z.number().min(120).max(220).optional(), // cm
  }).optional(),
}).superRefine((data, ctx) => {
  // Validate imperial height inputs
  if (data.heightUnit === 'ft_in') {
    if (!data.heightFeet || !data.heightInches) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Both feet and inches are required for imperial height',
        path: ['heightFeet']
      })
    }
  }
  
  // Validate age-appropriate measurements
  if (data.age < 5 && data.height > 150) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Height seems unusually high for this age',
      path: ['height']
    })
  }
  
  if (data.age > 15 && data.height < 120) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Height seems unusually low for this age',
      path: ['height']
    })
  }
})

export type KidsBMICalculatorInput = z.infer<typeof KidsBMICalculatorSchema>

// BMI Percentile Categories based on CDC guidelines
export interface BMIPercentileCategory {
  category: 'underweight' | 'healthy_weight' | 'overweight' | 'obese'
  label: string
  description: string
  percentileRange: string
  color: string
  recommendations: string[]
}

export interface GrowthChartData {
  percentile: number
  zscore: number
  category: BMIPercentileCategory
  comparisonToAverage: string
}

export interface PredictedAdultHeight {
  height: number
  unit: 'cm' | 'ft_in'
  range: {
    min: number
    max: number
  }
  confidence: 'high' | 'moderate' | 'low'
  method: string
}

export interface NutritionalGuidance {
  dailyCalories: {
    sedentary: number
    moderatelyActive: number
    active: number
  }
  macronutrients: {
    protein: { grams: number; percentage: number }
    carbohydrates: { grams: number; percentage: number }
    fats: { grams: number; percentage: number }
  }
  servingSizes: {
    category: string
    servingSize: string
    dailyServings: string
    examples: string[]
  }[]
  hydrationNeeds: {
    dailyWater: number
    unit: 'cups' | 'ml'
    activityAdjustment: string
  }
}

export interface ActivityRecommendations {
  dailyActivity: {
    moderateIntensity: number // minutes
    vigorousIntensity: number // minutes
    strengthActivities: number // days per week
  }
  ageAppropriateActivities: {
    activity: string
    benefits: string
    frequency: string
  }[]
  screenTimeGuidelines: {
    maxDailyHours: number
    recommendations: string[]
  }
  sleepRequirements: {
    hoursPerNight: string
    recommendations: string[]
  }
}

export interface DevelopmentalContext {
  growthPhase: 'early_childhood' | 'middle_childhood' | 'pre_adolescent' | 'adolescent'
  typicalGrowthPattern: string
  developmentalMilestones: string[]
  parentingTips: string[]
}

export interface KidsBMICalculatorResult {
  // Basic calculations
  bmi: number
  bmiUnit: 'kg/m²'
  
  // Percentile information
  growthChart: GrowthChartData
  
  // Height and weight percentiles separately
  heightPercentile: number
  weightPercentile: number
  
  // Predicted adult height
  predictedAdultHeight: PredictedAdultHeight
  
  // Guidance and recommendations
  nutritionalGuidance: NutritionalGuidance
  activityRecommendations: ActivityRecommendations
  developmentalContext: DevelopmentalContext
  
  // Health insights specific to children
  healthInsights: {
    category: string
    insight: string
    priority: 'high' | 'medium' | 'low'
    actionable: boolean
  }[]
  
  // Warning flags for concerning patterns
  warningFlags?: {
    level: 'info' | 'caution' | 'medical_consultation'
    message: string
    recommendations: string[]
  }[]
  
  // Educational content for parents
  educationalContent: {
    topic: string
    explanation: string
    importance: 'high' | 'medium' | 'low'
    ageRelevance: string
  }[]
  
  // When to see healthcare provider
  medicalGuidance: {
    routine: string
    concerns: string[]
    urgentSigns: string[]
  }
}