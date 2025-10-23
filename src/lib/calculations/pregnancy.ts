import { DueDateCalculatorInput, DueDateCalculatorResult } from '../schemas/pregnancy'

export function calculateDueDate(input: DueDateCalculatorInput): DueDateCalculatorResult {
  const { calculationType, lastMenstrualPeriod, conceptionDate, ultrasoundDate, ultrasoundWeeks, ultrasoundDays, cycleLength } = input
  
  // Helper function to add days to a date
  const addDays = (date: Date, days: number): Date => {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
  }
  
  // Helper function to format date as YYYY-MM-DD
  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0]
  }
  
  // Helper function to calculate difference in days
  const daysDifference = (date1: Date, date2: Date): number => {
    const diffTime = Math.abs(date2.getTime() - date1.getTime())
    return Math.floor(diffTime / (1000 * 60 * 60 * 24))
  }
  
  let conceptionEstimate: Date
  let dueDate: Date
  
  const today = new Date()
  
  // Calculate conception date and due date based on method
  switch (calculationType) {
    case 'lmp':
      const lmpDate = new Date(lastMenstrualPeriod!)
      // Conception typically occurs around day 14 of cycle (ovulation)
      const ovulationDay = cycleLength === 28 ? 14 : Math.round(cycleLength - 14)
      conceptionEstimate = addDays(lmpDate, ovulationDay)
      // Due date is 280 days (40 weeks) from LMP
      dueDate = addDays(lmpDate, 280)
      break
      
    case 'conception':
      conceptionEstimate = new Date(conceptionDate!)
      // Due date is 266 days (38 weeks) from conception
      dueDate = addDays(conceptionEstimate, 266)
      break
      
    case 'ultrasound':
      const usDate = new Date(ultrasoundDate!)
      const usWeeksTotal = ultrasoundWeeks! + (ultrasoundDays || 0) / 7
      // Calculate conception date from ultrasound
      const daysSinceConception = (usWeeksTotal - 2) * 7 // Subtract 2 weeks for LMP dating
      conceptionEstimate = addDays(usDate, -daysSinceConception)
      // Due date is 40 weeks from LMP (which is 2 weeks before conception)
      const estimatedLMP = addDays(conceptionEstimate, -14)
      dueDate = addDays(estimatedLMP, 280)
      break
      
    default:
      throw new Error('Invalid calculation type')
  }
  
  // Calculate current gestational age
  const estimatedLMP = addDays(conceptionEstimate, -14)
  const daysSinceLMP = daysDifference(estimatedLMP, today)
  const currentWeek = Math.floor(daysSinceLMP / 7)
  const currentDay = daysSinceLMP % 7
  
  // Calculate days and weeks remaining
  const daysRemaining = Math.max(0, daysDifference(today, dueDate))
  const weeksRemaining = Math.floor(daysRemaining / 7)
  
  // Determine trimester
  let trimester: 1 | 2 | 3
  if (currentWeek < 13) trimester = 1
  else if (currentWeek < 27) trimester = 2
  else trimester = 3
  
  // Calculate key dates
  const keyDates = {
    conception: formatDate(conceptionEstimate),
    implantation: formatDate(addDays(conceptionEstimate, 6)), // 6-12 days after conception
    firstTrimesterEnd: formatDate(addDays(estimatedLMP, 91)), // 13 weeks
    secondTrimesterEnd: formatDate(addDays(estimatedLMP, 189)), // 27 weeks
    viabilityDate: formatDate(addDays(estimatedLMP, 168)), // 24 weeks (viability)
    fullTerm: formatDate(addDays(estimatedLMP, 259)) // 37 weeks (full term)
  }
  
  // Key medical testing milestones (focused on timing)
  const medicalMilestones = [
    { week: 8, title: 'First Prenatal Visit', description: 'Initial checkup and dating ultrasound', category: 'checkup' as const },
    { week: 11, title: 'Genetic Screening Window', description: 'NIPT, CVS testing available', category: 'checkup' as const },
    { week: 18, title: 'Anatomy Scan', description: 'Detailed fetal anatomy ultrasound', category: 'checkup' as const },
    { week: 24, title: 'Glucose Screening', description: 'Gestational diabetes testing', category: 'checkup' as const },
    { week: 28, title: 'Third Trimester Monitoring', description: 'More frequent checkups begin', category: 'checkup' as const },
    { week: 36, title: 'Group B Strep Test', description: 'GBS screening for delivery', category: 'checkup' as const },
    { week: 37, title: 'Full Term', description: 'Baby is considered full term', category: 'milestone' as const },
    { week: 40, title: 'Due Date', description: 'Your estimated due date', category: 'milestone' as const }
  ]
  
  // Filter milestones for current and upcoming weeks
  const relevantMilestones = medicalMilestones.filter(m => 
    m.week >= currentWeek && m.week <= currentWeek + 12
  ).slice(0, 4)
  
  // Due date calculation accuracy information
  const accuracyInfo = {
    method: calculationType,
    reliability: calculationType === 'ultrasound' ? 'High (±5-7 days)' : 
                calculationType === 'conception' ? 'High (±7 days)' : 
                'Moderate (±14 days)',
    note: calculationType === 'lmp' ? `Based on ${cycleLength}-day cycle` : 
          calculationType === 'conception' ? 'Based on known conception date' : 
          'Based on early ultrasound measurements'
  }
  
  // Calculate weeks until key delivery milestones
  const deliveryWindows = {
    preterm: Math.max(0, 37 - currentWeek),
    fullTerm: Math.max(0, 39 - currentWeek),
    dueDate: Math.max(0, 40 - currentWeek),
    postTerm: Math.max(0, 42 - currentWeek)
  }
  
  return {
    calculationType,
    dueDate: formatDate(dueDate),
    currentWeek: Math.max(0, currentWeek),
    currentDay,
    daysRemaining,
    weeksRemaining,
    trimester,
    gestationalAge: {
      weeks: Math.max(0, currentWeek),
      days: currentDay,
      totalDays: daysSinceLMP
    },
    keyDates,
    milestones: relevantMilestones,
    accuracyInfo,
    deliveryWindows
  }
}

// Additional functions for the DueDateCalculator component
export function calculateDueDateFromInput(
  baseDate: Date, 
  method: 'lmp' | 'conception' | 'ultrasound', 
  gestationalAge?: number
) {
  const addDays = (date: Date, days: number): Date => {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
  }

  let conceptionDate: Date
  let dueDate: Date

  if (method === 'lmp') {
    conceptionDate = addDays(baseDate, 14) // Ovulation typically 14 days after LMP
    dueDate = addDays(baseDate, 280) // 40 weeks from LMP
  } else if (method === 'conception') {
    conceptionDate = baseDate
    dueDate = addDays(baseDate, 266) // 38 weeks from conception
  } else { // ultrasound
    const daysSinceConception = gestationalAge! - 14 // Subtract 2 weeks
    conceptionDate = addDays(baseDate, -daysSinceConception)
    dueDate = addDays(conceptionDate, 266)
  }

  const today = new Date()
  const daysSinceConception = Math.floor((today.getTime() - conceptionDate.getTime()) / (1000 * 60 * 60 * 24))
  const currentWeek = Math.floor(daysSinceConception / 7) + 2 // Add 2 weeks for gestational age
  const currentDay = daysSinceConception % 7
  const trimester = currentWeek <= 12 ? 1 : currentWeek <= 27 ? 2 : 3
  const daysUntilDue = Math.max(0, Math.floor((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)))

  return {
    dueDate,
    conception: conceptionDate,
    currentWeek: Math.max(0, currentWeek),
    currentDay: Math.max(0, currentDay),
    trimester,
    daysUntilDue
  }
}

export function getCurrentPregnancyInfo(currentWeek: number) {
  const developmentStages = [
    { week: 4, development: "Neural tube forming, heart begins to beat" },
    { week: 8, development: "All major organs present, fingers and toes forming" },
    { week: 12, development: "Reflexes developing, external genitals forming" },
    { week: 16, development: "Gender may be visible, hair and nails growing" },
    { week: 20, development: "Hearing developing, movement felt by mother" },
    { week: 24, development: "Viable outside womb, lungs developing" },
    { week: 28, development: "Eyes can open, brain rapidly developing" },
    { week: 32, development: "Bones hardening, gaining weight rapidly" },
    { week: 36, development: "Lungs nearly mature, preparing for birth" },
    { week: 40, development: "Ready for birth! Fully developed baby" },
  ]

  const currentStage = developmentStages.reduce((prev, current) => 
    (current.week <= currentWeek) ? current : prev
  )

  const milestones = [
    { date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), description: "Next prenatal appointment", week: currentWeek + 1 },
    { date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), description: "Routine check-up", week: currentWeek + 2 },
    { date: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000), description: "Monthly milestone", week: currentWeek + 4 }
  ]

  const recommendations = [
    "Take prenatal vitamins daily",
    "Stay hydrated and eat nutrient-rich foods",
    "Get regular gentle exercise as approved by your doctor",
    "Attend all scheduled prenatal appointments",
    "Get adequate rest and manage stress"
  ]

  return {
    development: currentStage.development,
    milestones,
    recommendations
  }
}