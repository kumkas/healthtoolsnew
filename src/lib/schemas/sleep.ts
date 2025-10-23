import { z } from 'zod'

export const SleepCalculatorSchema = z.object({
  calculationType: z.enum(['bedtime', 'waketime']).default('bedtime'),
  targetTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),
  sleepDuration: z.number()
    .min(4, 'Sleep duration must be at least 4 hours')
    .max(12, 'Sleep duration cannot exceed 12 hours')
    .default(8),
  fallAsleepTime: z.number()
    .min(5, 'Fall asleep time must be at least 5 minutes')
    .max(60, 'Fall asleep time cannot exceed 60 minutes')
    .default(15),
  includeCycles: z.boolean().default(true)
})

export type SleepCalculatorInput = z.infer<typeof SleepCalculatorSchema>

export interface SleepCalculatorResult {
  calculationType: 'bedtime' | 'waketime'
  targetTime: string
  recommendedTimes: {
    time: string
    cycles: number
    quality: 'Excellent' | 'Good' | 'Fair'
    description: string
  }[]
  sleepCycles: {
    totalCycles: number
    cycleDuration: number
    remPhases: number
    deepSleepPhases: number
  }
  tips: string[]
  circadianInfo: {
    idealBedtime: string
    idealWakeTime: string
    chronotype: 'Early Bird' | 'Night Owl' | 'Intermediate'
  }
}