import { z } from 'zod'

export const BloodPressureSchema = z.object({
  systolic: z.number()
    .min(50, 'Systolic pressure must be at least 50 mmHg')
    .max(300, 'Systolic pressure cannot exceed 300 mmHg'),
  diastolic: z.number()
    .min(30, 'Diastolic pressure must be at least 30 mmHg')
    .max(200, 'Diastolic pressure cannot exceed 200 mmHg'),
  age: z.number()
    .min(1, 'Age must be at least 1')
    .max(120, 'Age cannot exceed 120')
    .optional(),
  gender: z.enum(['male', 'female']).optional(),
  unit: z.enum(['mmHg', 'kPa']).default('mmHg')
}).refine(
  (data) => data.systolic > data.diastolic,
  {
    message: 'Systolic pressure must be higher than diastolic pressure',
    path: ['systolic']
  }
)

export type BloodPressureInput = z.infer<typeof BloodPressureSchema>

export interface BloodPressureResult {
  systolic: number
  diastolic: number
  category: 'Normal' | 'Elevated' | 'Stage 1 Hypertension' | 'Stage 2 Hypertension' | 'Hypertensive Crisis'
  interpretation: string
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Very High'
  recommendations: string[]
  color: string
  bgColor: string
  pulse: number
}