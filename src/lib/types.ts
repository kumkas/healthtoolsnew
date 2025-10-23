export interface ToolCategory {
  id: string
  name: string
  description: string
  icon: string
  color: string
  slug: string
}

export interface HealthTool {
  id: string
  name: string
  description: string
  category: string
  slug: string
  icon: string
  featured: boolean
  metaTitle: string
  metaDescription: string
  keywords: string[]
  estimatedReadTime: number
  lastUpdated: Date
}

export interface CalculationResult {
  value: number | string
  unit?: string
  category: string
  interpretation: string
  color: string
  bgColor: string
  recommendations: string[]
  warnings?: string[]
  ranges?: {
    low: number
    normal: number
    high: number
    veryHigh?: number
  }
}

export interface BMIResult extends CalculationResult {
  bmi: number
  category: 'Underweight' | 'Normal weight' | 'Overweight' | 'Obese'
  idealWeightRange: {
    min: number
    max: number
    unit: string
  }
}

export interface BloodPressureResult {
  systolic: number
  diastolic: number
  category: 'Normal' | 'Elevated' | 'Stage 1 Hypertension' | 'Stage 2 Hypertension' | 'Hypertensive Crisis'
  interpretation: string
  color: string
  bgColor: string
  recommendations: string[]
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Very High'
}

export interface SleepCalculationResult {
  recommendedBedtimes: Date[]
  recommendedWakeTimes: Date[]
  cycles: number
  totalSleepTime: number
  interpretation: string
  tips: string[]
}

export interface FormFieldProps {
  label: string
  placeholder?: string
  required?: boolean
  type?: 'text' | 'number' | 'select' | 'radio'
  options?: { value: string; label: string }[]
  min?: number
  max?: number
  step?: number
  unit?: string
}

export interface ToolPageProps {
  tool: HealthTool
  relatedTools: HealthTool[]
}

export interface SEOProps {
  title: string
  description: string
  keywords?: string[]
  canonical?: string
  ogImage?: string
  schemaType?: 'MedicalWebPage' | 'MedicalCalculator' | 'HowTo'
  lastModified?: Date
}