import { SleepCalculatorInput, SleepCalculatorResult } from '../schemas/sleep'

export function calculateSleepSchedule(input: SleepCalculatorInput): SleepCalculatorResult {
  const { calculationType, targetTime, sleepDuration, fallAsleepTime, includeCycles } = input
  
  // Convert time string to minutes since midnight
  const timeToMinutes = (timeStr: string): number => {
    const [hours, minutes] = timeStr.split(':').map(Number)
    return hours * 60 + minutes
  }
  
  // Convert minutes since midnight to time string
  const minutesToTime = (minutes: number): string => {
    // Handle negative minutes (previous day)
    if (minutes < 0) minutes += 24 * 60
    // Handle minutes over 24 hours (next day)
    if (minutes >= 24 * 60) minutes -= 24 * 60
    
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`
  }
  
  const targetMinutes = timeToMinutes(targetTime)
  const sleepDurationMinutes = sleepDuration * 60
  const fallAsleepMinutes = fallAsleepTime
  
  // Sleep cycle is 90 minutes on average
  const sleepCycleLength = 90
  const recommendedCycles = [4, 5, 6] // 6, 7.5, 9 hours
  
  let recommendedTimes: SleepCalculatorResult['recommendedTimes'] = []
  
  if (calculationType === 'bedtime') {
    // Calculate when to go to bed based on wake time
    if (includeCycles) {
      recommendedCycles.forEach(cycles => {
        const totalSleepTime = cycles * sleepCycleLength
        const bedtimeMinutes = targetMinutes - totalSleepTime - fallAsleepMinutes
        
        recommendedTimes.push({
          time: minutesToTime(bedtimeMinutes),
          cycles,
          quality: cycles === 5 ? 'Excellent' : cycles === 6 ? 'Good' : 'Fair',
          description: `${cycles} sleep cycles (${(totalSleepTime / 60).toFixed(1)} hours of sleep)`
        })
      })
    } else {
      const bedtimeMinutes = targetMinutes - sleepDurationMinutes - fallAsleepMinutes
      const cycles = Math.round(sleepDurationMinutes / sleepCycleLength)
      
      recommendedTimes.push({
        time: minutesToTime(bedtimeMinutes),
        cycles,
        quality: cycles === 5 ? 'Excellent' : cycles >= 4 ? 'Good' : 'Fair',
        description: `${sleepDuration} hours of sleep (approximately ${cycles} cycles)`
      })
    }
  } else {
    // Calculate when to wake up based on bedtime
    if (includeCycles) {
      recommendedCycles.forEach(cycles => {
        const totalSleepTime = cycles * sleepCycleLength
        const wakeTimeMinutes = targetMinutes + fallAsleepMinutes + totalSleepTime
        
        recommendedTimes.push({
          time: minutesToTime(wakeTimeMinutes),
          cycles,
          quality: cycles === 5 ? 'Excellent' : cycles === 6 ? 'Good' : 'Fair',
          description: `${cycles} sleep cycles (${(totalSleepTime / 60).toFixed(1)} hours of sleep)`
        })
      })
    } else {
      const wakeTimeMinutes = targetMinutes + fallAsleepMinutes + sleepDurationMinutes
      const cycles = Math.round(sleepDurationMinutes / sleepCycleLength)
      
      recommendedTimes.push({
        time: minutesToTime(wakeTimeMinutes),
        cycles,
        quality: cycles === 5 ? 'Excellent' : cycles >= 4 ? 'Good' : 'Fair',
        description: `${sleepDuration} hours of sleep (approximately ${cycles} cycles)`
      })
    }
  }
  
  // Sort by quality and number of cycles
  recommendedTimes.sort((a, b) => {
    if (a.quality === 'Excellent' && b.quality !== 'Excellent') return -1
    if (b.quality === 'Excellent' && a.quality !== 'Excellent') return 1
    return b.cycles - a.cycles
  })
  
  // Determine chronotype based on preferred bedtime/wake time
  const getChronotype = (): 'Early Bird' | 'Night Owl' | 'Intermediate' => {
    const preferredBedtime = calculationType === 'bedtime' ? targetMinutes : timeToMinutes(recommendedTimes[0].time)
    const preferredBedtimeHours = preferredBedtime / 60
    
    if (preferredBedtimeHours <= 22 || preferredBedtimeHours >= 21) return 'Early Bird'
    if (preferredBedtimeHours >= 24 || preferredBedtimeHours <= 2) return 'Night Owl'
    return 'Intermediate'
  }
  
  const chronotype = getChronotype()
  
  return {
    calculationType,
    targetTime,
    recommendedTimes: recommendedTimes.slice(0, 3), // Top 3 recommendations
    sleepCycles: {
      totalCycles: recommendedTimes[0]?.cycles || 5,
      cycleDuration: sleepCycleLength,
      remPhases: Math.round((recommendedTimes[0]?.cycles || 5) * 0.25), // ~25% REM
      deepSleepPhases: Math.round((recommendedTimes[0]?.cycles || 5) * 0.2), // ~20% Deep sleep
    },
    tips: [
      'Avoid caffeine 6 hours before bedtime',
      'Keep your bedroom cool (60-67°F/15-19°C)',
      'Use blackout curtains or an eye mask',
      'Establish a consistent bedtime routine',
      'Avoid screens 1 hour before bed',
      'Exercise regularly, but not close to bedtime'
    ],
    circadianInfo: {
      idealBedtime: chronotype === 'Early Bird' ? '21:30' : chronotype === 'Night Owl' ? '23:30' : '22:30',
      idealWakeTime: chronotype === 'Early Bird' ? '06:00' : chronotype === 'Night Owl' ? '08:00' : '07:00',
      chronotype
    }
  }
}

// Additional functions for the SleepCalculator component
export function calculateOptimalSleep(
  time: string, 
  type: 'wake' | 'bed', 
  age: number
) {
  const timeToMinutes = (timeStr: string): number => {
    const [hours, minutes] = timeStr.split(':').map(Number)
    return hours * 60 + minutes
  }
  
  const minutesToTime = (minutes: number): string => {
    if (minutes < 0) minutes += 24 * 60
    if (minutes >= 24 * 60) minutes -= 24 * 60
    
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`
  }

  const targetMinutes = timeToMinutes(time)
  const sleepCycleLength = 90 // minutes
  const fallAsleepTime = 15 // minutes to fall asleep
  
  // Recommended sleep cycles based on age
  const getRecommendedCycles = (age: number) => {
    if (age < 18) return [5, 6] // 7.5-9 hours for teens
    if (age < 65) return [5, 6] // 7.5-9 hours for adults
    return [4, 5] // 6-7.5 hours for seniors
  }

  const cycles = getRecommendedCycles(age)
  let optimalBedtimes: string[] = []
  let optimalWakeTime = time

  if (type === 'wake') {
    // Calculate bedtimes for given wake time
    cycles.forEach(cycleCount => {
      const totalSleepTime = cycleCount * sleepCycleLength
      const bedtimeMinutes = targetMinutes - totalSleepTime - fallAsleepTime
      optimalBedtimes.push(minutesToTime(bedtimeMinutes))
    })
  } else {
    // Calculate wake times for given bedtime
    const wakeTimeOptions: string[] = []
    cycles.forEach(cycleCount => {
      const totalSleepTime = cycleCount * sleepCycleLength
      const wakeTimeMinutes = targetMinutes + fallAsleepTime + totalSleepTime
      wakeTimeOptions.push(minutesToTime(wakeTimeMinutes))
    })
    optimalWakeTime = wakeTimeOptions[0]
    optimalBedtimes = [time]
  }

  const totalSleepHours = (cycles[0] * sleepCycleLength) / 60

  const recommendations = [
    'Maintain consistent sleep and wake times',
    'Create a relaxing bedtime routine',
    'Keep your bedroom cool and dark',
    'Avoid screens 1 hour before bedtime',
    'Limit caffeine after 2 PM'
  ]

  return {
    optimalBedtimes,
    optimalWakeTime,
    sleepCycles: cycles[0],
    totalSleepHours,
    recommendations
  }
}

export function analyzeSleepQuality(sleepHours: number, age: number) {
  const getIdealSleep = (age: number) => {
    if (age < 18) return { min: 8, max: 10 }
    if (age < 65) return { min: 7, max: 9 }
    return { min: 7, max: 8 }
  }

  const ideal = getIdealSleep(age)
  let quality: 'excellent' | 'good' | 'fair' | 'poor'
  let insights: string[] = []

  if (sleepHours >= ideal.min && sleepHours <= ideal.max) {
    quality = 'excellent'
    insights.push('You\'re getting the optimal amount of sleep for your age')
    insights.push('This sleep duration supports memory consolidation and immune function')
  } else if (sleepHours >= ideal.min - 1 && sleepHours <= ideal.max + 1) {
    quality = 'good'
    insights.push('Your sleep duration is close to optimal')
    insights.push('Small adjustments could help optimize your rest')
  } else if (sleepHours >= ideal.min - 2 && sleepHours <= ideal.max + 2) {
    quality = 'fair'
    insights.push('Your sleep duration could be improved')
    insights.push('Consider adjusting your schedule for better rest')
  } else {
    quality = 'poor'
    insights.push('Your sleep duration is significantly off the recommended range')
    insights.push('This may impact your health and cognitive function')
  }

  return { quality, insights }
}