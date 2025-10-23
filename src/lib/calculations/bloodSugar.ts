import { BloodSugarCalculatorInput, BloodSugarCalculatorResult, GlucoseReading, HbA1cResult, DiabetesRiskAssessment } from '../schemas/bloodSugar'

export function calculateBloodSugar(input: BloodSugarCalculatorInput): BloodSugarCalculatorResult {
  const { calculationType } = input
  
  let glucoseReadings: GlucoseReading[] | undefined
  let hba1cResult: HbA1cResult | undefined
  let diabetesRisk: DiabetesRiskAssessment | undefined
  
  // Calculate based on type
  switch (calculationType) {
    case 'glucose_analysis':
      glucoseReadings = analyzeGlucoseReadings(input)
      break
    case 'hba1c_conversion':
      hba1cResult = convertHbA1c(input)
      break
    case 'diabetes_risk':
      diabetesRisk = assessDiabetesRisk(input)
      break
  }
  
  // Generate health insights
  const healthInsights = generateHealthInsights(input, glucoseReadings, hba1cResult, diabetesRisk)
  
  // Check for emergency warnings
  const emergencyWarning = checkEmergencyWarning(glucoseReadings, hba1cResult)
  
  // Generate educational information
  const educationalInfo = generateEducationalInfo(calculationType)
  
  // Generate lifestyle tips
  const lifestyleTips = generateLifestyleTips(input, glucoseReadings, hba1cResult, diabetesRisk)
  
  return {
    calculationType: getCalculationTypeLabel(calculationType),
    glucoseReadings,
    hba1cResult,
    diabetesRisk,
    healthInsights,
    emergencyWarning,
    educationalInfo,
    lifestyleTips
  }
}

function analyzeGlucoseReadings(input: BloodSugarCalculatorInput): GlucoseReading[] {
  const readings: GlucoseReading[] = []
  
  // Analyze fasting glucose
  if (input.fastingGlucose) {
    readings.push(analyzeGlucoseValue(input.fastingGlucose, 'fasting', input.glucoseUnit))
  }
  
  // Analyze random glucose
  if (input.randomGlucose) {
    readings.push(analyzeGlucoseValue(input.randomGlucose, 'random', input.glucoseUnit))
  }
  
  // Analyze post-meal glucose
  if (input.postMealGlucose) {
    readings.push(analyzeGlucoseValue(input.postMealGlucose, 'postMeal', input.glucoseUnit))
  }
  
  return readings
}

function analyzeGlucoseValue(value: number, type: 'fasting' | 'random' | 'postMeal', unit: 'mg_dl' | 'mmol_l'): GlucoseReading {
  // Convert to mg/dL if needed
  const mgDlValue = unit === 'mmol_l' ? value * 18.0182 : value
  const mmolLValue = unit === 'mg_dl' ? value / 18.0182 : value
  
  let category: { label: string; description: string; color: string; range: string }
  let recommendations: string[] = []
  
  // Categorize based on type and ADA guidelines
  switch (type) {
    case 'fasting':
      if (mgDlValue < 70) {
        category = { label: 'Hypoglycemia', description: 'Low blood sugar', color: 'blue', range: '<70 mg/dL' }
        recommendations = [
          'Treat immediately with 15g fast-acting carbs',
          'Recheck in 15 minutes',
          'Contact healthcare provider if frequent episodes'
        ]
      } else if (mgDlValue < 100) {
        category = { label: 'Normal', description: 'Normal fasting glucose', color: 'green', range: '70-99 mg/dL' }
        recommendations = [
          'Maintain healthy lifestyle',
          'Continue regular monitoring if at risk',
          'Annual screening recommended'
        ]
      } else if (mgDlValue < 126) {
        category = { label: 'Prediabetes', description: 'Impaired fasting glucose', color: 'yellow', range: '100-125 mg/dL' }
        recommendations = [
          'Lifestyle modifications recommended',
          'Weight loss if overweight',
          'Increase physical activity',
          'Follow up with healthcare provider'
        ]
      } else {
        category = { label: 'Diabetes Range', description: 'Meets criteria for diabetes', color: 'red', range: '≥126 mg/dL' }
        recommendations = [
          'Consult healthcare provider immediately',
          'Confirm with repeat testing',
          'Begin diabetes management plan',
          'Monitor blood sugar regularly'
        ]
      }
      break
      
    case 'random':
      if (mgDlValue < 70) {
        category = { label: 'Hypoglycemia', description: 'Low blood sugar', color: 'blue', range: '<70 mg/dL' }
        recommendations = [
          'Treat immediately with 15g fast-acting carbs',
          'Recheck in 15 minutes',
          'Identify potential causes'
        ]
      } else if (mgDlValue < 140) {
        category = { label: 'Normal', description: 'Normal random glucose', color: 'green', range: '<140 mg/dL' }
        recommendations = [
          'Continue healthy habits',
          'Regular screening if at risk'
        ]
      } else if (mgDlValue < 200) {
        category = { label: 'Elevated', description: 'Elevated random glucose', color: 'yellow', range: '140-199 mg/dL' }
        recommendations = [
          'Further testing recommended',
          'Consider glucose tolerance test',
          'Lifestyle modifications'
        ]
      } else {
        category = { label: 'Diabetes Range', description: 'Meets criteria for diabetes', color: 'red', range: '≥200 mg/dL' }
        recommendations = [
          'Seek immediate medical attention',
          'Confirm with additional testing',
          'Begin diabetes management'
        ]
      }
      break
      
    case 'postMeal':
      if (mgDlValue < 70) {
        category = { label: 'Hypoglycemia', description: 'Low blood sugar', color: 'blue', range: '<70 mg/dL' }
        recommendations = [
          'Treat hypoglycemia immediately',
          'Review meal timing and medication',
          'Consult healthcare provider'
        ]
      } else if (mgDlValue < 140) {
        category = { label: 'Normal', description: 'Normal post-meal glucose', color: 'green', range: '<140 mg/dL' }
        recommendations = [
          'Good glucose control',
          'Continue current management'
        ]
      } else if (mgDlValue < 200) {
        category = { label: 'Elevated', description: 'Elevated post-meal glucose', color: 'yellow', range: '140-199 mg/dL' }
        recommendations = [
          'Consider meal composition adjustments',
          'Increase physical activity after meals',
          'Discuss with healthcare provider'
        ]
      } else {
        category = { label: 'High', description: 'High post-meal glucose', color: 'red', range: '≥200 mg/dL' }
        recommendations = [
          'Review diabetes management plan',
          'Consider medication adjustment',
          'Consult healthcare provider'
        ]
      }
      break
  }
  
  return {
    type,
    value,
    unit,
    convertedValue: unit === 'mg_dl' ? mmolLValue : mgDlValue,
    category,
    recommendations
  }
}

function convertHbA1c(input: BloodSugarCalculatorInput): HbA1cResult {
  let percentage: number
  let mmolMol: number
  
  if (input.hba1cPercentage) {
    percentage = input.hba1cPercentage
    mmolMol = (percentage - 2.15) * 10.929
  } else {
    mmolMol = input.hba1cMmol!
    percentage = (mmolMol / 10.929) + 2.15
  }
  
  // Calculate estimated average glucose (eAG)
  const eAGmgDl = (28.7 * percentage) - 46.7
  const eAGmmolL = eAGmgDl / 18.0182
  
  // Categorize HbA1c
  let category: { label: string; description: string; color: string; range: string }
  let recommendations: string[] = []
  
  if (percentage < 5.7) {
    category = { label: 'Normal', description: 'Normal HbA1c', color: 'green', range: '<5.7%' }
    recommendations = [
      'Maintain healthy lifestyle',
      'Annual screening recommended',
      'Continue preventive measures'
    ]
  } else if (percentage < 6.5) {
    category = { label: 'Prediabetes', description: 'Increased diabetes risk', color: 'yellow', range: '5.7-6.4%' }
    recommendations = [
      'Intensive lifestyle modifications',
      'Weight loss program if overweight',
      'Regular exercise routine',
      'Monitor every 3-6 months'
    ]
  } else if (percentage < 7.0) {
    category = { label: 'Diabetes - Good Control', description: 'Diabetes with good control', color: 'orange', range: '6.5-6.9%' }
    recommendations = [
      'Maintain current diabetes management',
      'Regular monitoring and follow-up',
      'Continue lifestyle modifications'
    ]
  } else if (percentage < 8.0) {
    category = { label: 'Diabetes - Fair Control', description: 'Diabetes with fair control', color: 'orange', range: '7.0-7.9%' }
    recommendations = [
      'Review diabetes management plan',
      'Consider medication adjustments',
      'Intensive lifestyle modifications',
      'More frequent monitoring'
    ]
  } else {
    category = { label: 'Diabetes - Poor Control', description: 'Diabetes with poor control', color: 'red', range: '≥8.0%' }
    recommendations = [
      'Urgent medical consultation required',
      'Comprehensive diabetes management review',
      'Intensive blood sugar monitoring',
      'Risk of complications assessment'
    ]
  }
  
  return {
    percentage: Math.round(percentage * 10) / 10,
    mmolMol: Math.round(mmolMol),
    estimatedAverageGlucose: {
      mgDl: Math.round(eAGmgDl),
      mmolL: Math.round(eAGmmolL * 10) / 10
    },
    category,
    recommendations
  }
}

function assessDiabetesRisk(input: BloodSugarCalculatorInput): DiabetesRiskAssessment {
  let riskScore = 0
  const riskFactors: { factor: string; present: boolean; impact: 'low' | 'moderate' | 'high' }[] = []
  
  const { age, gender, weight, height, familyHistory, ethnicity, physicalActivity, bloodPressure, prediabetes, gestationalDiabetes, pcosHistory } = input
  
  // Calculate BMI
  const bmi = weight! / Math.pow(height! / 100, 2)
  
  // Age factor
  if (age! >= 45) {
    riskScore += 5
    riskFactors.push({ factor: 'Age ≥45 years', present: true, impact: 'moderate' })
  } else {
    riskFactors.push({ factor: 'Age <45 years', present: false, impact: 'low' })
  }
  
  // BMI factor
  if (bmi >= 30) {
    riskScore += 8
    riskFactors.push({ factor: 'Obesity (BMI ≥30)', present: true, impact: 'high' })
  } else if (bmi >= 25) {
    riskScore += 5
    riskFactors.push({ factor: 'Overweight (BMI 25-29.9)', present: true, impact: 'moderate' })
  } else {
    riskFactors.push({ factor: 'Normal weight', present: false, impact: 'low' })
  }
  
  // Family history
  if (familyHistory === 'both') {
    riskScore += 8
    riskFactors.push({ factor: 'Both parents with diabetes', present: true, impact: 'high' })
  } else if (familyHistory === 'parent' || familyHistory === 'sibling') {
    riskScore += 5
    riskFactors.push({ factor: 'Family history of diabetes', present: true, impact: 'moderate' })
  } else {
    riskFactors.push({ factor: 'No family history', present: false, impact: 'low' })
  }
  
  // Ethnicity (high-risk ethnicities)
  if (ethnicity && ['african_american', 'hispanic', 'asian', 'native_american'].includes(ethnicity)) {
    riskScore += 5
    riskFactors.push({ factor: 'High-risk ethnicity', present: true, impact: 'moderate' })
  }
  
  // Physical activity
  if (physicalActivity === 'low') {
    riskScore += 5
    riskFactors.push({ factor: 'Low physical activity', present: true, impact: 'moderate' })
  } else {
    riskFactors.push({ factor: 'Regular physical activity', present: false, impact: 'low' })
  }
  
  // Blood pressure
  if (bloodPressure === 'high') {
    riskScore += 5
    riskFactors.push({ factor: 'High blood pressure', present: true, impact: 'moderate' })
  } else if (bloodPressure === 'elevated') {
    riskScore += 3
    riskFactors.push({ factor: 'Elevated blood pressure', present: true, impact: 'low' })
  }
  
  // Medical history
  if (prediabetes) {
    riskScore += 10
    riskFactors.push({ factor: 'History of prediabetes', present: true, impact: 'high' })
  }
  
  if (gestationalDiabetes && gender === 'female') {
    riskScore += 8
    riskFactors.push({ factor: 'History of gestational diabetes', present: true, impact: 'high' })
  }
  
  if (pcosHistory && gender === 'female') {
    riskScore += 5
    riskFactors.push({ factor: 'History of PCOS', present: true, impact: 'moderate' })
  }
  
  // Determine risk level
  let riskLevel: 'low' | 'moderate' | 'high' | 'very_high'
  let riskPercentage: number
  
  if (riskScore <= 10) {
    riskLevel = 'low'
    riskPercentage = 5
  } else if (riskScore <= 20) {
    riskLevel = 'moderate'
    riskPercentage = 15
  } else if (riskScore <= 30) {
    riskLevel = 'high'
    riskPercentage = 35
  } else {
    riskLevel = 'very_high'
    riskPercentage = 55
  }
  
  // Generate recommendations
  const recommendations = generateRiskRecommendations(riskLevel, riskFactors)
  
  return {
    riskScore,
    riskLevel,
    riskPercentage,
    riskFactors,
    recommendations
  }
}

function generateRiskRecommendations(riskLevel: string, riskFactors: any[]) {
  const recommendations = []
  
  if (riskLevel === 'low') {
    recommendations.push(
      { category: 'Screening', recommendation: 'Continue annual diabetes screening', priority: 'medium' as const },
      { category: 'Lifestyle', recommendation: 'Maintain healthy diet and regular exercise', priority: 'medium' as const }
    )
  } else if (riskLevel === 'moderate') {
    recommendations.push(
      { category: 'Screening', recommendation: 'Diabetes screening every 6-12 months', priority: 'high' as const },
      { category: 'Weight Management', recommendation: 'Achieve and maintain healthy weight', priority: 'high' as const },
      { category: 'Exercise', recommendation: 'At least 150 minutes moderate exercise weekly', priority: 'high' as const }
    )
  } else if (riskLevel === 'high') {
    recommendations.push(
      { category: 'Medical Care', recommendation: 'Consult healthcare provider for prevention plan', priority: 'high' as const },
      { category: 'Screening', recommendation: 'Diabetes screening every 3-6 months', priority: 'high' as const },
      { category: 'Lifestyle Program', recommendation: 'Consider structured diabetes prevention program', priority: 'high' as const },
      { category: 'Weight Loss', recommendation: '7-10% weight loss if overweight', priority: 'high' as const }
    )
  } else {
    recommendations.push(
      { category: 'Urgent Care', recommendation: 'Immediate medical consultation required', priority: 'high' as const },
      { category: 'Intensive Screening', recommendation: 'Comprehensive diabetes testing', priority: 'high' as const },
      { category: 'Prevention Program', recommendation: 'Enroll in intensive lifestyle intervention', priority: 'high' as const },
      { category: 'Medical Management', recommendation: 'Consider preventive medications', priority: 'high' as const }
    )
  }
  
  return recommendations
}

function generateHealthInsights(
  input: BloodSugarCalculatorInput, 
  glucoseReadings?: GlucoseReading[], 
  hba1cResult?: HbA1cResult, 
  diabetesRisk?: DiabetesRiskAssessment
) {
  const insights = []
  
  // Glucose insights
  if (glucoseReadings) {
    const hasHigh = glucoseReadings.some(r => r.category.color === 'red')
    const hasElevated = glucoseReadings.some(r => r.category.color === 'yellow')
    
    if (hasHigh) {
      insights.push({
        category: 'Blood Sugar Control',
        insight: 'Your glucose readings suggest diabetes or poor control. Immediate medical attention is recommended to prevent complications.'
      })
    } else if (hasElevated) {
      insights.push({
        category: 'Prediabetes Risk',
        insight: 'Your glucose levels indicate prediabetes risk. Early intervention with lifestyle changes can prevent progression to diabetes.'
      })
    }
  }
  
  // HbA1c insights
  if (hba1cResult) {
    if (hba1cResult.percentage >= 7) {
      insights.push({
        category: 'Long-term Control',
        insight: 'Your HbA1c suggests diabetes management could be improved. Better control reduces risk of complications significantly.'
      })
    }
  }
  
  // Risk assessment insights
  if (diabetesRisk) {
    if (diabetesRisk.riskLevel === 'high' || diabetesRisk.riskLevel === 'very_high') {
      insights.push({
        category: 'Prevention Opportunity',
        insight: 'You have multiple risk factors for diabetes. The good news is that lifestyle changes can reduce your risk by up to 58%.'
      })
    }
  }
  
  // Lifestyle insights
  if (input.physicalActivity === 'low') {
    insights.push({
      category: 'Physical Activity',
      insight: 'Regular exercise is one of the most effective ways to prevent diabetes and improve blood sugar control.'
    })
  }
  
  if (input.sleepHours && (input.sleepHours < 6 || input.sleepHours > 9)) {
    insights.push({
      category: 'Sleep Quality',
      insight: 'Poor sleep quality affects blood sugar control. Aim for 7-9 hours of quality sleep nightly.'
    })
  }
  
  return insights
}

function checkEmergencyWarning(glucoseReadings?: GlucoseReading[], hba1cResult?: HbA1cResult) {
  if (glucoseReadings) {
    for (const reading of glucoseReadings) {
      const mgDlValue = reading.unit === 'mg_dl' ? reading.value : reading.value * 18.0182
      
      if (mgDlValue < 54) {
        return {
          level: 'severe' as const,
          message: 'Severe hypoglycemia detected - immediate action required',
          actions: [
            'Treat with 15-20g fast-acting carbs immediately',
            'Call emergency services if unconscious',
            'Recheck glucose in 15 minutes',
            'Seek medical attention'
          ]
        }
      } else if (mgDlValue < 70) {
        return {
          level: 'urgent' as const,
          message: 'Hypoglycemia detected - treat immediately',
          actions: [
            'Consume 15g fast-acting carbs',
            'Recheck in 15 minutes',
            'Repeat treatment if still low',
            'Contact healthcare provider if frequent episodes'
          ]
        }
      } else if (mgDlValue > 400) {
        return {
          level: 'severe' as const,
          message: 'Extremely high blood sugar - seek immediate medical care',
          actions: [
            'Contact emergency services immediately',
            'Do not delay seeking medical care',
            'Check for ketones if possible',
            'Stay hydrated'
          ]
        }
      } else if (mgDlValue > 300) {
        return {
          level: 'urgent' as const,
          message: 'Very high blood sugar - medical attention needed',
          actions: [
            'Contact healthcare provider immediately',
            'Check blood sugar frequently',
            'Stay hydrated',
            'Monitor for symptoms of DKA'
          ]
        }
      }
    }
  }
  
  if (hba1cResult && hba1cResult.percentage > 10) {
    return {
      level: 'caution' as const,
      message: 'HbA1c indicates very poor diabetes control',
      actions: [
        'Schedule urgent appointment with diabetes specialist',
        'Comprehensive diabetes management review needed',
        'Assess for diabetes complications',
        'Intensive blood sugar monitoring required'
      ]
    }
  }
  
  return undefined
}

function generateEducationalInfo(calculationType: string) {
  const info = []
  
  if (calculationType === 'glucose_analysis') {
    info.push(
      {
        topic: 'Normal Blood Sugar Ranges',
        explanation: 'Normal fasting glucose is 70-99 mg/dL, random glucose <140 mg/dL, and post-meal <140 mg/dL. Values above these ranges may indicate prediabetes or diabetes.'
      },
      {
        topic: 'Hypoglycemia',
        explanation: 'Blood sugar below 70 mg/dL is hypoglycemia. Symptoms include shakiness, sweating, confusion, and irritability. Treat with 15g fast-acting carbs.'
      }
    )
  }
  
  if (calculationType === 'hba1c_conversion') {
    info.push(
      {
        topic: 'Understanding HbA1c',
        explanation: 'HbA1c measures average blood sugar over 2-3 months. It reflects how much glucose is attached to hemoglobin in red blood cells.'
      },
      {
        topic: 'Target HbA1c Levels',
        explanation: 'For most adults with diabetes, the target HbA1c is <7%. However, individualized targets may vary based on age, health conditions, and life expectancy.'
      }
    )
  }
  
  if (calculationType === 'diabetes_risk') {
    info.push(
      {
        topic: 'Type 2 Diabetes Prevention',
        explanation: 'Type 2 diabetes can often be prevented or delayed through lifestyle changes including weight loss, regular exercise, and healthy eating.'
      },
      {
        topic: 'Risk Factors',
        explanation: 'Major risk factors include age >45, BMI >25, family history, certain ethnicities, physical inactivity, and history of prediabetes or gestational diabetes.'
      }
    )
  }
  
  return info
}

function generateLifestyleTips(
  input: BloodSugarCalculatorInput, 
  glucoseReadings?: GlucoseReading[], 
  hba1cResult?: HbA1cResult, 
  diabetesRisk?: DiabetesRiskAssessment
) {
  const tips = []
  
  // General tips
  tips.push(
    {
      category: 'Diet',
      tip: 'Choose whole grains, lean proteins, healthy fats, and plenty of vegetables. Limit processed foods and sugary drinks.'
    },
    {
      category: 'Exercise',
      tip: 'Aim for at least 150 minutes of moderate exercise weekly, plus 2 days of strength training.'
    },
    {
      category: 'Weight Management',
      tip: 'Even modest weight loss (5-10% of body weight) can significantly improve blood sugar control.'
    }
  )
  
  // Specific tips based on results
  if (glucoseReadings?.some(r => r.category.color === 'yellow' || r.category.color === 'red')) {
    tips.push({
      category: 'Blood Sugar Monitoring',
      tip: 'Regular blood sugar monitoring helps track patterns and the effect of food, exercise, and medications.'
    })
  }
  
  if (hba1cResult && hba1cResult.percentage >= 7) {
    tips.push({
      category: 'Medication Adherence',
      tip: 'Take diabetes medications as prescribed and discuss any side effects with your healthcare provider.'
    })
  }
  
  if (diabetesRisk && (diabetesRisk.riskLevel === 'high' || diabetesRisk.riskLevel === 'very_high')) {
    tips.push({
      category: 'Prevention',
      tip: 'Consider joining a diabetes prevention program. These structured programs can reduce diabetes risk by up to 58%.'
    })
  }
  
  if (input.stressLevel === 'high') {
    tips.push({
      category: 'Stress Management',
      tip: 'Chronic stress can raise blood sugar. Try relaxation techniques, meditation, or counseling to manage stress.'
    })
  }
  
  return tips
}

function getCalculationTypeLabel(type: string): string {
  switch (type) {
    case 'glucose_analysis': return 'Blood Glucose Analysis'
    case 'hba1c_conversion': return 'HbA1c Analysis & Conversion'
    case 'diabetes_risk': return 'Diabetes Risk Assessment'
    default: return 'Blood Sugar Analysis'
  }
}