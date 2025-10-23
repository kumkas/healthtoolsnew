import { z } from 'zod'

export const BMICalculatorSchema = z.object({
  height: z.number().min(50, 'Height must be at least 50cm').max(300, 'Height must be less than 300cm'),
  weight: z.number().min(20, 'Weight must be at least 20kg').max(500, 'Weight must be less than 500kg'),
  age: z.number().min(2, 'Age must be at least 2 years').max(120, 'Age must be less than 120 years').optional(),
  gender: z.enum(['male', 'female']).optional(),
  heightUnit: z.enum(['cm', 'ft-in']).default('cm'),
  weightUnit: z.enum(['kg', 'lbs']).default('kg'),
  feet: z.number().min(3, 'Height must be at least 3 feet').max(8, 'Height must be less than 8 feet').optional(),
  inches: z.number().min(0, 'Inches must be at least 0').max(11, 'Inches must be less than 12').optional(),
})

export const BloodPressureSchema = z.object({
  systolic: z.number().min(60, 'Systolic pressure must be at least 60 mmHg').max(250, 'Systolic pressure must be less than 250 mmHg'),
  diastolic: z.number().min(40, 'Diastolic pressure must be at least 40 mmHg').max(150, 'Diastolic pressure must be less than 150 mmHg'),
  age: z.number().min(13, 'Age must be at least 13 years').max(120, 'Age must be less than 120 years').optional(),
  gender: z.enum(['male', 'female']).optional(),
})

export const SleepCalculatorSchema = z.object({
  bedtime: z.string().optional(),
  wakeTime: z.string().optional(),
  targetSleepHours: z.number().min(4, 'Sleep duration must be at least 4 hours').max(12, 'Sleep duration must be less than 12 hours').default(8),
  calculationType: z.enum(['bedtime', 'waketime']).default('bedtime'),
})

export const DueDateCalculatorSchema = z.object({
  lastMenstrualPeriod: z.date().optional(),
  conceptionDate: z.date().optional(),
  ultrasoundDate: z.date().optional(),
  ultrasoundWeeks: z.number().min(4, 'Ultrasound weeks must be at least 4').max(42, 'Ultrasound weeks must be less than 42').optional(),
  ultrasoundDays: z.number().min(0, 'Days must be at least 0').max(6, 'Days must be less than 7').optional(),
  calculationType: z.enum(['lmp', 'conception', 'ultrasound']).default('lmp'),
})

export const CalorieCalculatorSchema = z.object({
  age: z.number().min(13, 'Age must be at least 13 years').max(120, 'Age must be less than 120 years'),
  gender: z.enum(['male', 'female']),
  height: z.number().min(100, 'Height must be at least 100cm').max(250, 'Height must be less than 250cm'),
  weight: z.number().min(30, 'Weight must be at least 30kg').max(300, 'Weight must be less than 300kg'),
  activityLevel: z.enum(['sedentary', 'lightly_active', 'moderately_active', 'very_active', 'extremely_active']),
  goal: z.enum(['lose', 'maintain', 'gain']),
  heightUnit: z.enum(['cm', 'ft-in']).default('cm'),
  weightUnit: z.enum(['kg', 'lbs']).default('kg'),
})

export type BMICalculatorInput = z.infer<typeof BMICalculatorSchema>
export type BloodPressureInput = z.infer<typeof BloodPressureSchema>
export type SleepCalculatorInput = z.infer<typeof SleepCalculatorSchema>
export type DueDateCalculatorInput = z.infer<typeof DueDateCalculatorSchema>
export type CalorieCalculatorInput = z.infer<typeof CalorieCalculatorSchema>