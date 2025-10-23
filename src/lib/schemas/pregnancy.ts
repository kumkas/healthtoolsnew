import { z } from 'zod'

export const DueDateCalculatorSchema = z.object({
  calculationType: z.enum(['lmp', 'conception', 'ultrasound']).default('lmp'),
  lastMenstrualPeriod: z.string().optional(),
  conceptionDate: z.string().optional(),
  ultrasoundDate: z.string().optional(),
  ultrasoundWeeks: z.number().min(4).max(42).optional(),
  ultrasoundDays: z.number().min(0).max(6).optional(),
  cycleLength: z.number().min(21).max(45).default(28)
}).refine((data) => {
  if (data.calculationType === 'lmp' && !data.lastMenstrualPeriod) {
    return false
  }
  if (data.calculationType === 'conception' && !data.conceptionDate) {
    return false
  }
  if (data.calculationType === 'ultrasound' && (!data.ultrasoundDate || data.ultrasoundWeeks === undefined)) {
    return false
  }
  return true
}, {
  message: 'Required date field is missing for selected calculation type',
  path: ['calculationType']
})

export type DueDateCalculatorInput = z.infer<typeof DueDateCalculatorSchema>

export interface DueDateCalculatorResult {
  calculationType: 'lmp' | 'conception' | 'ultrasound'
  dueDate: string
  currentWeek: number
  currentDay: number
  daysRemaining: number
  weeksRemaining: number
  trimester: 1 | 2 | 3
  gestationalAge: {
    weeks: number
    days: number
    totalDays: number
  }
  keyDates: {
    conception: string
    implantation: string
    firstTrimesterEnd: string
    secondTrimesterEnd: string
    viabilityDate: string
    fullTerm: string
  }
  milestones: {
    week: number
    title: string
    description: string
    category: 'checkup' | 'milestone'
  }[]
  accuracyInfo: {
    method: 'lmp' | 'conception' | 'ultrasound'
    reliability: string
    note: string
  }
  deliveryWindows: {
    preterm: number
    fullTerm: number
    dueDate: number
    postTerm: number
  }
}