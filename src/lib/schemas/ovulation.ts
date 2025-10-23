import { z } from 'zod'

export const ovulationCalculatorSchema = z.object({
  lastMenstrualPeriod: z.string().min(1, 'Last menstrual period date is required'),
  cycleLength: z.number().min(21, 'Cycle length must be at least 21 days').max(35, 'Cycle length cannot exceed 35 days'),
  periodLength: z.number().min(3, 'Period length must be at least 3 days').max(8, 'Period length cannot exceed 8 days'),
})

export type OvulationCalculatorInput = z.infer<typeof ovulationCalculatorSchema>

export interface OvulationCalculatorResult {
  ovulationDate: string
  fertileWindowStart: string
  fertileWindowEnd: string
  nextPeriodDate: string
  currentPhase: string
  cycleDay: number
  daysUntilOvulation: number
  fertilityStatus: string
  futureCycles: {
    cycle: number
    periodStart: string
    ovulationDate: string
    fertileWindowStart: string
    fertileWindowEnd: string
  }[]
  recommendations: string[]
  cyclePhases: {
    menstrual: {
      start: string
      end: string
      description: string
    }
    follicular: {
      start: string
      end: string
      description: string
    }
    ovulation: {
      date: string
      description: string
    }
    luteal: {
      start: string
      end: string
      description: string
    }
  }
}