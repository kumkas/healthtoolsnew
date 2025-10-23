import { BMIResult, BloodPressureResult, SleepCalculationResult } from './types'
import { BMI_CATEGORIES, BLOOD_PRESSURE_CATEGORIES } from './constants'
import { convertWeight, convertHeight, heightToCm, cmToFeetInches } from './utils'

export function calculateBMI(data: {
  height: number, 
  weight: number, 
  heightUnit?: 'cm' | 'ft-in',
  weightUnit?: 'kg' | 'lbs',
  feet?: number,
  inches?: number
}): BMIResult {
  const { height, weight, heightUnit = 'cm', weightUnit = 'kg', feet, inches } = data
  // Convert height to cm
  let heightInCm: number
  if (heightUnit === 'ft-in' && feet !== undefined && inches !== undefined) {
    heightInCm = heightToCm(feet, inches)
  } else {
    heightInCm = height
  }
  
  // Convert weight to kg
  const weightInKg = weightUnit === 'lbs' ? convertWeight(weight, 'lbs', 'kg') : weight
  
  // Calculate BMI
  const heightInM = heightInCm / 100
  const bmiValue = weightInKg / (heightInM * heightInM)
  const bmi = isNaN(bmiValue) || !isFinite(bmiValue) ? 0 : Math.round(bmiValue * 10) / 10
  
  // Determine category
  let category: BMIResult['category']
  let color: string
  let bgColor: string
  let interpretation: string
  let recommendations: string[]
  
  if (bmi < BMI_CATEGORIES.UNDERWEIGHT.max) {
    category = 'Underweight'
    color = 'text-blue-600'
    bgColor = 'bg-blue-50'
    interpretation = 'Your BMI indicates you are underweight. This may suggest you need to gain weight.'
    recommendations = [
      'Consult with a healthcare provider about healthy weight gain',
      'Focus on nutrient-dense, calorie-rich foods',
      'Consider strength training to build muscle mass',
      'Monitor your eating patterns and appetite'
    ]
  } else if (bmi < BMI_CATEGORIES.NORMAL.max) {
    category = 'Normal weight'
    color = 'text-green-600'
    bgColor = 'bg-green-50'
    interpretation = 'Your BMI is in the healthy weight range. Great job maintaining a healthy weight!'
    recommendations = [
      'Continue your current healthy lifestyle',
      'Maintain a balanced diet with regular exercise',
      'Monitor your weight regularly',
      'Focus on overall health, not just weight'
    ]
  } else if (bmi < BMI_CATEGORIES.OVERWEIGHT.max) {
    category = 'Overweight'
    color = 'text-amber-600'
    bgColor = 'bg-amber-50'
    interpretation = 'Your BMI indicates you are overweight. Consider making lifestyle changes to reach a healthier weight.'
    recommendations = [
      'Aim for a modest weight loss of 1-2 pounds per week',
      'Increase physical activity to at least 150 minutes per week',
      'Focus on portion control and balanced nutrition',
      'Consider consulting with a healthcare provider or nutritionist'
    ]
  } else {
    category = 'Obese'
    color = 'text-red-600'
    bgColor = 'bg-red-50'
    interpretation = 'Your BMI indicates obesity. This may increase your risk of health problems. Consider seeking professional guidance.'
    recommendations = [
      'Consult with a healthcare provider for a comprehensive weight management plan',
      'Consider working with a registered dietitian',
      'Start with moderate physical activity as approved by your doctor',
      'Focus on gradual, sustainable lifestyle changes'
    ]
  }
  
  // Calculate ideal weight range (BMI 18.5-24.9)
  const heightInMSquared = heightInM * heightInM
  const idealWeightMin = Math.round(18.5 * heightInMSquared * 10) / 10
  const idealWeightMax = Math.round(24.9 * heightInMSquared * 10) / 10
  
  const idealWeightRange = {
    min: weightUnit === 'lbs' ? convertWeight(idealWeightMin, 'kg', 'lbs') : idealWeightMin,
    max: weightUnit === 'lbs' ? convertWeight(idealWeightMax, 'kg', 'lbs') : idealWeightMax,
    unit: weightUnit
  }
  
  return {
    bmi,
    category,
    value: bmi,
    unit: '',
    interpretation,
    color,
    bgColor,
    recommendations,
    idealWeightRange,
    ranges: {
      low: BMI_CATEGORIES.UNDERWEIGHT.max,
      normal: BMI_CATEGORIES.NORMAL.max,
      high: BMI_CATEGORIES.OVERWEIGHT.max
    }
  }
}

export function calculateBloodPressure(systolic: number, diastolic: number): BloodPressureResult {
  let category: BloodPressureResult['category']
  let color: string
  let bgColor: string
  let interpretation: string
  let recommendations: string[]
  let riskLevel: BloodPressureResult['riskLevel']
  
  // Determine category based on highest classification
  if (systolic >= BLOOD_PRESSURE_CATEGORIES.CRISIS.systolic.min || 
      diastolic >= BLOOD_PRESSURE_CATEGORIES.CRISIS.diastolic.min) {
    category = 'Hypertensive Crisis'
    color = 'text-red-600'
    bgColor = 'bg-red-50'
    riskLevel = 'Very High'
    interpretation = 'This is a medical emergency! Seek immediate medical attention.'
    recommendations = [
      '🚨 Seek emergency medical care immediately',
      'Do not wait - call emergency services',
      'This level requires immediate professional intervention'
    ]
  } else if (systolic >= BLOOD_PRESSURE_CATEGORIES.STAGE_2.systolic.min || 
             diastolic >= BLOOD_PRESSURE_CATEGORIES.STAGE_2.diastolic.min) {
    category = 'Stage 2 Hypertension'
    color = 'text-red-600'
    bgColor = 'bg-red-50'
    riskLevel = 'High'
    interpretation = 'You have Stage 2 high blood pressure. Medical treatment is typically needed.'
    recommendations = [
      'Schedule an appointment with your doctor promptly',
      'Lifestyle changes and medication may be necessary',
      'Monitor blood pressure regularly',
      'Reduce sodium intake and increase physical activity'
    ]
  } else if (systolic >= BLOOD_PRESSURE_CATEGORIES.STAGE_1.systolic.min || 
             diastolic >= BLOOD_PRESSURE_CATEGORIES.STAGE_1.diastolic.min) {
    category = 'Stage 1 Hypertension'
    color = 'text-orange-600'
    bgColor = 'bg-orange-50'
    riskLevel = 'Moderate'
    interpretation = 'You have Stage 1 high blood pressure. Lifestyle changes and possible medication may help.'
    recommendations = [
      'Consult with your healthcare provider',
      'Implement lifestyle changes: diet, exercise, stress management',
      'Monitor blood pressure at home',
      'Limit alcohol and quit smoking if applicable'
    ]
  } else if (systolic >= BLOOD_PRESSURE_CATEGORIES.ELEVATED.systolic.min && 
             diastolic < BLOOD_PRESSURE_CATEGORIES.ELEVATED.diastolic.max) {
    category = 'Elevated'
    color = 'text-amber-600'
    bgColor = 'bg-amber-50'
    riskLevel = 'Moderate'
    interpretation = 'Your blood pressure is elevated. Without lifestyle changes, it may develop into high blood pressure.'
    recommendations = [
      'Focus on lifestyle modifications',
      'Increase physical activity',
      'Adopt a heart-healthy diet (like DASH diet)',
      'Maintain a healthy weight',
      'Monitor blood pressure regularly'
    ]
  } else {
    category = 'Normal'
    color = 'text-green-600'
    bgColor = 'bg-green-50'
    riskLevel = 'Low'
    interpretation = 'Your blood pressure is in the normal range. Keep up the good work!'
    recommendations = [
      'Maintain your current healthy lifestyle',
      'Continue regular physical activity',
      'Keep a balanced, low-sodium diet',
      'Monitor blood pressure annually',
      'Manage stress effectively'
    ]
  }
  
  return {
    systolic,
    diastolic,
    category,
    interpretation,
    color,
    bgColor,
    recommendations,
    riskLevel
  }
}

export function calculateSleepSchedule(
  targetTime: string,
  calculationType: 'bedtime' | 'waketime' = 'bedtime',
  targetSleepHours: number = 8
): SleepCalculationResult {
  const sleepCycleMinutes = 90 // 90-minute sleep cycles
  const sleepCycles = Math.round((targetSleepHours * 60) / sleepCycleMinutes)
  const totalSleepTime = sleepCycles * sleepCycleMinutes
  
  const [hours, minutes] = targetTime.split(':').map(Number)
  const targetDate = new Date()
  targetDate.setHours(hours, minutes, 0, 0)
  
  const recommendations: Date[] = []
  
  if (calculationType === 'bedtime') {
    // Calculate wake times
    for (let cycles = 4; cycles <= 6; cycles++) {
      const wakeTime = new Date(targetDate)
      wakeTime.setMinutes(wakeTime.getMinutes() + (cycles * sleepCycleMinutes) + 15) // 15 min to fall asleep
      recommendations.push(wakeTime)
    }
  } else {
    // Calculate bedtimes
    for (let cycles = 4; cycles <= 6; cycles++) {
      const bedTime = new Date(targetDate)
      bedTime.setMinutes(bedTime.getMinutes() - (cycles * sleepCycleMinutes) - 15) // 15 min to fall asleep
      recommendations.push(bedTime)
    }
  }
  
  return {
    recommendedBedtimes: calculationType === 'waketime' ? recommendations : [],
    recommendedWakeTimes: calculationType === 'bedtime' ? recommendations : [],
    cycles: sleepCycles,
    totalSleepTime: totalSleepTime / 60, // Convert to hours
    interpretation: `Based on 90-minute sleep cycles, these times will help you wake up at the end of a sleep cycle, feeling more refreshed.`,
    tips: [
      'Try to maintain consistent sleep and wake times',
      'Create a relaxing bedtime routine',
      'Avoid screens 1 hour before bedtime',
      'Keep your bedroom cool, dark, and quiet',
      'Avoid caffeine 6 hours before bedtime'
    ]
  }
}

export function calculateDueDate(
  lastMenstrualPeriod?: Date,
  conceptionDate?: Date,
  ultrasoundDate?: Date,
  ultrasoundWeeks?: number,
  ultrasoundDays?: number
) {
  let estimatedDueDate: Date
  let conceptionEstimate: Date
  
  if (lastMenstrualPeriod) {
    // Add 280 days (40 weeks) to LMP
    estimatedDueDate = new Date(lastMenstrualPeriod)
    estimatedDueDate.setDate(estimatedDueDate.getDate() + 280)
    
    conceptionEstimate = new Date(lastMenstrualPeriod)
    conceptionEstimate.setDate(conceptionEstimate.getDate() + 14)
  } else if (conceptionDate) {
    // Add 266 days to conception date
    estimatedDueDate = new Date(conceptionDate)
    estimatedDueDate.setDate(estimatedDueDate.getDate() + 266)
    conceptionEstimate = conceptionDate
  } else if (ultrasoundDate && ultrasoundWeeks) {
    // Calculate based on ultrasound
    const totalDays = (ultrasoundWeeks * 7) + (ultrasoundDays || 0)
    const daysSinceConception = totalDays - 14 // Subtract 2 weeks
    
    conceptionEstimate = new Date(ultrasoundDate)
    conceptionEstimate.setDate(conceptionEstimate.getDate() - daysSinceConception)
    
    estimatedDueDate = new Date(conceptionEstimate)
    estimatedDueDate.setDate(estimatedDueDate.getDate() + 266)
  } else {
    throw new Error('At least one date must be provided')
  }
  
  const today = new Date()
  const daysSinceConception = Math.floor((today.getTime() - conceptionEstimate.getTime()) / (1000 * 60 * 60 * 24))
  const currentWeek = Math.floor(daysSinceConception / 7) + 2 // Add 2 weeks for gestational age
  const currentDay = (daysSinceConception % 7)
  
  const trimester = currentWeek <= 12 ? 1 : currentWeek <= 27 ? 2 : 3
  
  return {
    dueDate: estimatedDueDate,
    conceptionDate: conceptionEstimate,
    currentWeek: Math.max(0, currentWeek),
    currentDay: Math.max(0, currentDay),
    trimester,
    daysRemaining: Math.max(0, Math.floor((estimatedDueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)))
  }
}