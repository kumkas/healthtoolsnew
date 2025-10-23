import { OvulationCalculatorInput, OvulationCalculatorResult } from '../schemas/ovulation'

export function calculateOvulation(input: OvulationCalculatorInput): OvulationCalculatorResult {
  const { lastMenstrualPeriod, cycleLength, periodLength } = input
  
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
  
  const lmpDate = new Date(lastMenstrualPeriod)
  const today = new Date()
  
  // Calculate ovulation day (typically 14 days before next period)
  const ovulationDay = cycleLength - 14
  const ovulationDate = addDays(lmpDate, ovulationDay)
  
  // Calculate fertile window (5 days before ovulation + ovulation day)
  const fertileWindowStart = addDays(ovulationDate, -5)
  const fertileWindowEnd = ovulationDate
  
  // Calculate next period
  const nextPeriodDate = addDays(lmpDate, cycleLength)
  
  // Calculate cycle phases
  const menstrualPhaseStart = lmpDate
  const menstrualPhaseEnd = addDays(lmpDate, periodLength - 1)
  
  const follicularPhaseStart = lmpDate
  const follicularPhaseEnd = addDays(ovulationDate, -1)
  
  const lutealPhaseStart = addDays(ovulationDate, 1)
  const lutealPhaseEnd = addDays(nextPeriodDate, -1)
  
  // Determine current phase
  let currentPhase: string
  let daysUntilOvulation = Math.ceil((ovulationDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  
  if (today >= menstrualPhaseStart && today <= menstrualPhaseEnd) {
    currentPhase = 'Menstrual'
  } else if (today >= follicularPhaseStart && today < ovulationDate) {
    currentPhase = 'Follicular'
  } else if (today.toDateString() === ovulationDate.toDateString()) {
    currentPhase = 'Ovulation'
    daysUntilOvulation = 0
  } else if (today > ovulationDate && today <= lutealPhaseEnd) {
    currentPhase = 'Luteal'
  } else {
    currentPhase = 'Pre-menstrual'
  }
  
  // Determine fertility status
  let fertilityStatus: string
  if (today >= fertileWindowStart && today <= fertileWindowEnd) {
    fertilityStatus = 'High'
  } else if (today >= addDays(fertileWindowStart, -2) && today < fertileWindowStart) {
    fertilityStatus = 'Medium'
  } else if (today > fertileWindowEnd && today <= addDays(fertileWindowEnd, 2)) {
    fertilityStatus = 'Medium'
  } else {
    fertilityStatus = 'Low'
  }
  
  // Calculate cycle day
  const cycleDay = Math.floor((today.getTime() - lmpDate.getTime()) / (1000 * 60 * 60 * 24)) + 1
  
  // Generate next 6 cycles for planning
  const futureCycles = []
  for (let i = 1; i <= 6; i++) {
    const cycleStart = addDays(lmpDate, cycleLength * i)
    const cycleOvulation = addDays(cycleStart, ovulationDay)
    const cycleFertileStart = addDays(cycleOvulation, -5)
    const cycleFertileEnd = cycleOvulation
    
    futureCycles.push({
      cycle: i + 1,
      periodStart: formatDate(cycleStart),
      ovulationDate: formatDate(cycleOvulation),
      fertileWindowStart: formatDate(cycleFertileStart),
      fertileWindowEnd: formatDate(cycleFertileEnd),
    })
  }
  
  // Generate recommendations based on current phase and fertility goals
  const recommendations = generateRecommendations(currentPhase, fertilityStatus, daysUntilOvulation)
  
  return {
    ovulationDate: formatDate(ovulationDate),
    fertileWindowStart: formatDate(fertileWindowStart),
    fertileWindowEnd: formatDate(fertileWindowEnd),
    nextPeriodDate: formatDate(nextPeriodDate),
    currentPhase,
    cycleDay: Math.max(1, cycleDay),
    daysUntilOvulation: Math.max(0, daysUntilOvulation),
    fertilityStatus,
    futureCycles,
    recommendations,
    cyclePhases: {
      menstrual: {
        start: formatDate(menstrualPhaseStart),
        end: formatDate(menstrualPhaseEnd),
        description: 'Menstruation occurs'
      },
      follicular: {
        start: formatDate(follicularPhaseStart),
        end: formatDate(follicularPhaseEnd),
        description: 'Eggs mature in ovaries'
      },
      ovulation: {
        date: formatDate(ovulationDate),
        description: 'Egg is released'
      },
      luteal: {
        start: formatDate(lutealPhaseStart),
        end: formatDate(lutealPhaseEnd),
        description: 'Uterine lining thickens'
      }
    }
  }
}

function generateRecommendations(phase: string, fertilityStatus: string, daysUntilOvulation: number): string[] {
  const recommendations: string[] = []
  
  switch (phase) {
    case 'Menstrual':
      recommendations.push(
        'Stay hydrated and consider iron-rich foods',
        'Light exercise like walking or yoga can help with cramps',
        'Track your flow and symptoms in a fertility app',
        'Rest and self-care are important during this time'
      )
      break
      
    case 'Follicular':
      recommendations.push(
        'Start tracking cervical mucus changes',
        'Maintain a healthy diet rich in folate and antioxidants',
        'Consider ovulation predictor kits as you approach ovulation',
        'Regular exercise can help regulate hormones'
      )
      break
      
    case 'Ovulation':
      recommendations.push(
        'This is your most fertile time - ideal for conception',
        'Cervical mucus will be clear and stretchy',
        'Basal body temperature may rise slightly',
        'Consider timing intercourse every other day during fertile window'
      )
      break
      
    case 'Luteal':
      recommendations.push(
        'Focus on progesterone-supporting foods',
        'Monitor for early pregnancy symptoms if trying to conceive',
        'Reduce stress and maintain regular sleep schedule',
        'Avoid excessive caffeine and alcohol'
      )
      break
  }
  
  if (fertilityStatus === 'High') {
    recommendations.push('Peak fertility window - optimal time for conception')
  } else if (fertilityStatus === 'Medium') {
    recommendations.push('Moderately fertile - consider tracking ovulation signs')
  }
  
  if (daysUntilOvulation > 0 && daysUntilOvulation <= 7) {
    recommendations.push(`Ovulation in ${daysUntilOvulation} days - prepare for fertile window`)
  }
  
  return recommendations
}