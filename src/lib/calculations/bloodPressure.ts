import { BloodPressureInput, BloodPressureResult } from '../schemas/bloodPressure'
import { BLOOD_PRESSURE_CATEGORIES } from '../constants'

interface BloodPressureAnalysis {
  systolic: number
  diastolic: number
  category: keyof typeof BLOOD_PRESSURE_CATEGORIES
  riskLevel: 'low' | 'moderate' | 'high' | 'critical'
  interpretation: string
  recommendations: string[]
  urgency: string
}

export function calculateBloodPressure(
  systolic: number,
  diastolic: number,
  unit: 'mmHg' | 'kPa' = 'mmHg',
  age?: number,
  gender?: 'male' | 'female'
): BloodPressureResult {
  // Convert kPa to mmHg if needed
  let sys = systolic
  let dia = diastolic
  
  if (unit === 'kPa') {
    sys = systolic * 7.50062  // 1 kPa = 7.50062 mmHg
    dia = diastolic * 7.50062
  }

  // Determine category based on AHA guidelines
  let category: BloodPressureResult['category']
  let interpretation: string
  let riskLevel: BloodPressureResult['riskLevel']
  let recommendations: string[]
  let color: string
  let bgColor: string

  if (sys < 120 && dia < 80) {
    category = 'Normal'
    interpretation = 'Your blood pressure is in the normal range. This is excellent for your heart health and overall well-being.'
    riskLevel = 'Low'
    color = 'text-green-700'
    bgColor = 'bg-green-50 border-green-200'
    recommendations = [
      'Maintain a healthy lifestyle with regular exercise',
      'Follow a balanced diet low in sodium',
      'Monitor your blood pressure regularly',
      'Avoid smoking and limit alcohol consumption'
    ]
  } else if (sys >= 120 && sys <= 129 && dia < 80) {
    category = 'Elevated'
    interpretation = 'Your blood pressure is elevated. Without changes, you may develop high blood pressure in the future.'
    riskLevel = 'Moderate'
    color = 'text-yellow-700'
    bgColor = 'bg-yellow-50 border-yellow-200'
    recommendations = [
      'Adopt heart-healthy lifestyle changes',
      'Increase physical activity to 150 minutes per week',
      'Reduce sodium intake to less than 2,300mg daily',
      'Monitor blood pressure monthly',
      'Consult your doctor about prevention strategies'
    ]
  } else if ((sys >= 130 && sys <= 139) || (dia >= 80 && dia <= 89)) {
    category = 'Stage 1 Hypertension'
    interpretation = 'You have Stage 1 high blood pressure. Lifestyle changes and possibly medication are recommended.'
    riskLevel = 'High'
    color = 'text-orange-700'
    bgColor = 'bg-orange-50 border-orange-200'
    recommendations = [
      'See your doctor within 1 month for evaluation',
      'Implement aggressive lifestyle changes',
      'Consider medication as prescribed by your doctor',
      'Monitor blood pressure weekly',
      'Follow DASH diet guidelines'
    ]
  } else if ((sys >= 140 && sys <= 179) || (dia >= 90 && dia <= 119)) {
    category = 'Stage 2 Hypertension'
    interpretation = 'You have Stage 2 high blood pressure. Immediate medical attention and medication are likely needed.'
    riskLevel = 'Very High'
    color = 'text-red-700'
    bgColor = 'bg-red-50 border-red-200'
    recommendations = [
      'See your doctor immediately (within 1-2 weeks)',
      'Medication will likely be prescribed',
      'Monitor blood pressure daily',
      'Make immediate lifestyle changes',
      'Regular follow-ups with healthcare provider'
    ]
  } else {
    category = 'Hypertensive Crisis'
    interpretation = 'This reading suggests a hypertensive crisis. Seek immediate medical attention or call emergency services.'
    riskLevel = 'Very High'
    color = 'text-red-800'
    bgColor = 'bg-red-100 border-red-300'
    recommendations = [
      'SEEK IMMEDIATE MEDICAL ATTENTION',
      'Call emergency services if experiencing symptoms',
      'Do not delay medical care',
      'Rest in a quiet place until help arrives',
      'Take prescribed emergency medication if available'
    ]
  }

  // Calculate estimated pulse pressure for additional insights
  const pulse = Math.round(sys - dia)

  return {
    systolic: Math.round(sys),
    diastolic: Math.round(dia),
    category,
    interpretation,
    riskLevel,
    recommendations,
    color,
    bgColor,
    pulse
  }
}

export function analyzeBloodPressure(systolic: number, diastolic: number, age: number): BloodPressureAnalysis {
  let category: keyof typeof BLOOD_PRESSURE_CATEGORIES
  let riskLevel: 'low' | 'moderate' | 'high' | 'critical'
  let interpretation: string
  let recommendations: string[]
  let urgency = ''

  // Determine category based on AHA guidelines
  if (systolic >= 180 || diastolic >= 120) {
    category = 'CRISIS'
    riskLevel = 'critical'
    interpretation = 'This is a hypertensive crisis requiring immediate medical attention. Call emergency services now.'
    urgency = 'EMERGENCY: Seek immediate medical care. This level of blood pressure can cause organ damage.'
    recommendations = [
      'Call emergency services immediately (911)',
      'Do not drive yourself to the hospital',
      'Stay calm and rest until help arrives',
      'Take prescribed emergency medication if available'
    ]
  } else if (systolic >= 140 || diastolic >= 90) {
    category = 'STAGE_2'
    riskLevel = 'high'
    interpretation = 'You have Stage 2 hypertension. Medical treatment is typically recommended.'
    recommendations = [
      'Schedule an appointment with your doctor immediately',
      'Consider lifestyle changes and medication',
      'Monitor blood pressure daily',
      'Reduce sodium intake to less than 2,300mg/day',
      'Engage in regular physical activity',
      'Maintain a healthy weight',
      'Limit alcohol consumption'
    ]
  } else if (systolic >= 130 || diastolic >= 80) {
    category = 'STAGE_1'
    riskLevel = 'high'
    interpretation = 'You have Stage 1 hypertension. Lifestyle changes and possible medication may be recommended.'
    recommendations = [
      'Consult with your healthcare provider',
      'Implement the DASH diet',
      'Exercise at least 150 minutes per week',
      'Reduce sodium intake',
      'Manage stress through relaxation techniques',
      'Monitor blood pressure regularly',
      'Quit smoking if applicable'
    ]
  } else if (systolic >= 120 && systolic <= 129 && diastolic < 80) {
    category = 'ELEVATED'
    riskLevel = 'moderate'
    interpretation = 'Your blood pressure is elevated. Take action now to prevent it from developing into high blood pressure.'
    recommendations = [
      'Focus on lifestyle modifications',
      'Adopt a heart-healthy diet',
      'Increase physical activity',
      'Maintain a healthy weight',
      'Limit alcohol and quit smoking',
      'Monitor blood pressure monthly'
    ]
  } else {
    category = 'NORMAL'
    riskLevel = 'low'
    interpretation = 'Congratulations! Your blood pressure is in the normal range.'
    recommendations = [
      'Maintain your current healthy lifestyle',
      'Continue regular physical activity',
      'Follow a balanced diet',
      'Monitor blood pressure annually',
      'Stay hydrated and manage stress'
    ]
  }

  // Age-specific adjustments
  if (age >= 65) {
    recommendations.push('Discuss with your doctor about age-specific blood pressure targets')
    if (category === 'NORMAL') {
      recommendations.push('Continue excellent self-care as blood pressure tends to increase with age')
    }
  }

  return {
    systolic,
    diastolic,
    category,
    riskLevel,
    interpretation,
    recommendations,
    urgency
  }
}