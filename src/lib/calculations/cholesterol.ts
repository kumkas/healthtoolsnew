import { 
  CholesterolCalculatorInput, 
  CholesterolCalculatorResult, 
  CholesterolReading, 
  CholesterolRatios,
  CardiovascularRisk,
  TreatmentRecommendations
} from '../schemas/cholesterol'

export function calculateCholesterol(input: CholesterolCalculatorInput): CholesterolCalculatorResult {
  // Convert units to mg/dL if needed
  const convertedInput = convertUnitsToMgDl(input)
  
  // Calculate LDL if not provided
  const ldlValue = calculateLDL(convertedInput)
  
  // Analyze cholesterol readings
  const cholesterolReadings = analyzeCholesterolReadings(convertedInput, ldlValue)
  
  // Calculate cholesterol ratios
  const cholesterolRatios = calculateCholesterolRatios(convertedInput, ldlValue)
  
  // Assess cardiovascular risk
  const cardiovascularRisk = assessCardiovascularRisk(convertedInput, ldlValue)
  
  // Generate treatment recommendations
  const treatmentRecommendations = generateTreatmentRecommendations(convertedInput, cardiovascularRisk, ldlValue)
  
  // Generate health insights
  const healthInsights = generateHealthInsights(convertedInput, cholesterolReadings, cardiovascularRisk)
  
  // Check for warning flags
  const warningFlags = generateWarningFlags(convertedInput, cholesterolReadings, cardiovascularRisk)
  
  // Generate educational content
  const educationalContent = generateEducationalContent(convertedInput, cardiovascularRisk)

  return {
    cholesterolReadings,
    cholesterolRatios,
    cardiovascularRisk,
    treatmentRecommendations,
    healthInsights,
    warningFlags,
    educationalContent
  }
}

function convertUnitsToMgDl(input: CholesterolCalculatorInput): CholesterolCalculatorInput {
  if (input.cholesterolUnit === 'mg_dl') {
    return input
  }
  
  // Convert from mmol/L to mg/dL
  const totalCholesterol = input.totalCholesterol * 38.67
  const hdlCholesterol = input.hdlCholesterol * 38.67
  const ldlCholesterol = input.ldlCholesterol ? input.ldlCholesterol * 38.67 : undefined
  const triglycerides = input.triglycerides * 88.57
  
  return {
    ...input,
    totalCholesterol,
    hdlCholesterol,
    ldlCholesterol,
    triglycerides,
    cholesterolUnit: 'mg_dl'
  }
}

function calculateLDL(input: CholesterolCalculatorInput): number {
  if (input.ldlCholesterol) {
    return input.ldlCholesterol
  }
  
  // Friedewald equation: LDL = Total - HDL - (Triglycerides/5)
  // Only valid when triglycerides < 400 mg/dL
  if (input.triglycerides >= 400) {
    return 0 // Will need direct measurement
  }
  
  return input.totalCholesterol - input.hdlCholesterol - (input.triglycerides / 5)
}

function analyzeCholesterolReadings(input: CholesterolCalculatorInput, ldlValue: number): CholesterolReading[] {
  const readings: CholesterolReading[] = []
  
  // Total Cholesterol
  readings.push(analyzeSingleReading(
    'total',
    input.totalCholesterol,
    input.cholesterolUnit,
    'total'
  ))
  
  // LDL Cholesterol
  if (ldlValue > 0) {
    readings.push(analyzeSingleReading(
      'ldl',
      ldlValue,
      input.cholesterolUnit,
      'ldl'
    ))
  }
  
  // HDL Cholesterol
  readings.push(analyzeSingleReading(
    'hdl',
    input.hdlCholesterol,
    input.cholesterolUnit,
    'hdl'
  ))
  
  // Triglycerides
  readings.push(analyzeSingleReading(
    'triglycerides',
    input.triglycerides,
    input.cholesterolUnit,
    'triglycerides'
  ))
  
  // Non-HDL Cholesterol
  const nonHdl = input.totalCholesterol - input.hdlCholesterol
  readings.push(analyzeSingleReading(
    'non_hdl',
    nonHdl,
    input.cholesterolUnit,
    'non_hdl'
  ))
  
  return readings
}

function analyzeSingleReading(
  type: 'total' | 'ldl' | 'hdl' | 'triglycerides' | 'non_hdl',
  value: number,
  unit: 'mg_dl' | 'mmol_l',
  analysisType: string
): CholesterolReading {
  // Convert to mg/dL for analysis
  const mgDlValue = unit === 'mmol_l' ? 
    (type === 'triglycerides' ? value * 88.57 : value * 38.67) : value
  
  const convertedValue = unit === 'mg_dl' ? 
    (type === 'triglycerides' ? value / 88.57 : value / 38.67) : value
  
  let category: { label: string; description: string; color: string; range: string }
  let targetRange = ''
  let recommendations: string[] = []
  
  switch (type) {
    case 'total':
      if (mgDlValue < 200) {
        category = { label: 'Desirable', description: 'Optimal total cholesterol', color: 'green', range: '<200 mg/dL' }
        recommendations = [
          'Maintain current healthy lifestyle',
          'Continue regular monitoring',
          'Focus on heart-healthy diet'
        ]
      } else if (mgDlValue < 240) {
        category = { label: 'Borderline High', description: 'Borderline high total cholesterol', color: 'yellow', range: '200-239 mg/dL' }
        recommendations = [
          'Adopt heart-healthy diet',
          'Increase physical activity',
          'Consider lifestyle counseling'
        ]
      } else {
        category = { label: 'High', description: 'High total cholesterol', color: 'red', range: '≥240 mg/dL' }
        recommendations = [
          'Implement comprehensive lifestyle changes',
          'Consult healthcare provider',
          'Consider medication evaluation'
        ]
      }
      targetRange = '<200 mg/dL'
      break

    case 'ldl':
      if (mgDlValue < 100) {
        category = { label: 'Optimal', description: 'Optimal LDL cholesterol', color: 'green', range: '<100 mg/dL' }
        recommendations = [
          'Maintain excellent control',
          'Continue current management',
          'Regular monitoring'
        ]
      } else if (mgDlValue < 130) {
        category = { label: 'Near Optimal', description: 'Near optimal LDL cholesterol', color: 'yellow', range: '100-129 mg/dL' }
        recommendations = [
          'Optimize diet and exercise',
          'Consider risk factor modification',
          'Monitor closely'
        ]
      } else if (mgDlValue < 160) {
        category = { label: 'Borderline High', description: 'Borderline high LDL cholesterol', color: 'orange', range: '130-159 mg/dL' }
        recommendations = [
          'Implement therapeutic lifestyle changes',
          'Consider medication if high risk',
          'Regular follow-up required'
        ]
      } else if (mgDlValue < 190) {
        category = { label: 'High', description: 'High LDL cholesterol', color: 'red', range: '160-189 mg/dL' }
        recommendations = [
          'Aggressive lifestyle modifications',
          'Likely medication needed',
          'Consult cardiologist'
        ]
      } else {
        category = { label: 'Very High', description: 'Very high LDL cholesterol', color: 'red', range: '≥190 mg/dL' }
        recommendations = [
          'Immediate medical attention',
          'High-intensity statin likely needed',
          'Screen for genetic causes'
        ]
      }
      targetRange = '<100 mg/dL (varies by risk)'
      break

    case 'hdl':
      if (mgDlValue < 40) {
        category = { label: 'Low', description: 'Low HDL cholesterol (major risk factor)', color: 'red', range: '<40 mg/dL (men), <50 mg/dL (women)' }
        recommendations = [
          'Increase physical activity',
          'Quit smoking if applicable',
          'Consider niacin or fibrate therapy',
          'Weight loss if overweight'
        ]
      } else if (mgDlValue < 60) {
        category = { label: 'Borderline', description: 'Borderline HDL cholesterol', color: 'yellow', range: '40-59 mg/dL' }
        recommendations = [
          'Regular aerobic exercise',
          'Moderate alcohol if appropriate',
          'Maintain healthy weight',
          'Monitor regularly'
        ]
      } else {
        category = { label: 'High', description: 'High HDL cholesterol (protective)', color: 'green', range: '≥60 mg/dL' }
        recommendations = [
          'Excellent! Maintain current lifestyle',
          'Continue regular exercise',
          'This provides cardioprotection'
        ]
      }
      targetRange = '>40 mg/dL (men), >50 mg/dL (women)'
      break

    case 'triglycerides':
      if (mgDlValue < 150) {
        category = { label: 'Normal', description: 'Normal triglycerides', color: 'green', range: '<150 mg/dL' }
        recommendations = [
          'Maintain current lifestyle',
          'Continue healthy diet',
          'Regular physical activity'
        ]
      } else if (mgDlValue < 200) {
        category = { label: 'Borderline High', description: 'Borderline high triglycerides', color: 'yellow', range: '150-199 mg/dL' }
        recommendations = [
          'Reduce refined carbohydrates',
          'Limit alcohol consumption',
          'Increase omega-3 fatty acids'
        ]
      } else if (mgDlValue < 500) {
        category = { label: 'High', description: 'High triglycerides', color: 'orange', range: '200-499 mg/dL' }
        recommendations = [
          'Significant dietary changes needed',
          'Consider medication',
          'Address insulin resistance'
        ]
      } else {
        category = { label: 'Very High', description: 'Very high triglycerides', color: 'red', range: '≥500 mg/dL' }
        recommendations = [
          'Immediate medical attention',
          'Risk of pancreatitis',
          'Aggressive treatment needed'
        ]
      }
      targetRange = '<150 mg/dL'
      break

    case 'non_hdl':
      if (mgDlValue < 130) {
        category = { label: 'Optimal', description: 'Optimal non-HDL cholesterol', color: 'green', range: '<130 mg/dL' }
      } else if (mgDlValue < 160) {
        category = { label: 'Near Optimal', description: 'Near optimal non-HDL cholesterol', color: 'yellow', range: '130-159 mg/dL' }
      } else if (mgDlValue < 190) {
        category = { label: 'Borderline High', description: 'Borderline high non-HDL cholesterol', color: 'orange', range: '160-189 mg/dL' }
      } else {
        category = { label: 'High', description: 'High non-HDL cholesterol', color: 'red', range: '≥190 mg/dL' }
      }
      targetRange = '<130 mg/dL (varies by risk)'
      recommendations = [
        'Focus on reducing total cholesterol',
        'Address all atherogenic lipoproteins',
        'Consider comprehensive therapy'
      ]
      break

    default:
      category = { label: 'Unknown', description: 'Unknown category', color: 'gray', range: '' }
      break
  }

  return {
    type,
    value,
    unit,
    convertedValue,
    category,
    targetRange,
    recommendations
  }
}

function calculateCholesterolRatios(input: CholesterolCalculatorInput, ldlValue: number): CholesterolRatios {
  const totalToHdl = input.totalCholesterol / input.hdlCholesterol
  const ldlToHdl = ldlValue / input.hdlCholesterol
  const triglycerideToHdl = input.triglycerides / input.hdlCholesterol

  return {
    totalToHdl: {
      value: Math.round(totalToHdl * 10) / 10,
      category: {
        label: totalToHdl < 3.5 ? 'Excellent' : totalToHdl < 5 ? 'Good' : totalToHdl < 6 ? 'Borderline' : 'Poor',
        description: totalToHdl < 3.5 ? 'Excellent ratio' : totalToHdl < 5 ? 'Good ratio' : totalToHdl < 6 ? 'Borderline ratio' : 'Poor ratio',
        color: totalToHdl < 3.5 ? 'green' : totalToHdl < 5 ? 'green' : totalToHdl < 6 ? 'yellow' : 'red'
      }
    },
    ldlToHdl: {
      value: Math.round(ldlToHdl * 10) / 10,
      category: {
        label: ldlToHdl < 2 ? 'Excellent' : ldlToHdl < 3 ? 'Good' : ldlToHdl < 4 ? 'Borderline' : 'Poor',
        description: ldlToHdl < 2 ? 'Excellent ratio' : ldlToHdl < 3 ? 'Good ratio' : ldlToHdl < 4 ? 'Borderline ratio' : 'Poor ratio',
        color: ldlToHdl < 2 ? 'green' : ldlToHdl < 3 ? 'green' : ldlToHdl < 4 ? 'yellow' : 'red'
      }
    },
    triglycerideToHdl: {
      value: Math.round(triglycerideToHdl * 10) / 10,
      category: {
        label: triglycerideToHdl < 2 ? 'Excellent' : triglycerideToHdl < 4 ? 'Good' : triglycerideToHdl < 6 ? 'Borderline' : 'Poor',
        description: triglycerideToHdl < 2 ? 'Excellent ratio' : triglycerideToHdl < 4 ? 'Good ratio' : triglycerideToHdl < 6 ? 'Borderline ratio' : 'Poor ratio',
        color: triglycerideToHdl < 2 ? 'green' : triglycerideToHdl < 4 ? 'green' : triglycerideToHdl < 6 ? 'yellow' : 'red'
      }
    }
  }
}

function assessCardiovascularRisk(input: CholesterolCalculatorInput, ldlValue: number): CardiovascularRisk {
  let riskScore = 0
  const riskFactors: CardiovascularRisk['riskFactors'] = []

  // Age factor
  if (input.age >= 45) {
    riskScore += input.gender === 'male' ? 2 : 1
    riskFactors.push({
      factor: 'Age',
      present: true,
      impact: 'moderate',
      description: `Age ${input.age} increases cardiovascular risk`
    })
  }

  // Gender factor
  if (input.gender === 'male') {
    riskScore += 1
    riskFactors.push({
      factor: 'Male Gender',
      present: true,
      impact: 'moderate',
      description: 'Male gender is an independent risk factor'
    })
  }

  // HDL factor
  if (input.hdlCholesterol >= 60) {
    riskScore -= 1
    riskFactors.push({
      factor: 'High HDL',
      present: true,
      impact: 'protective',
      description: 'High HDL cholesterol provides cardioprotection'
    })
  } else if (input.hdlCholesterol < 40) {
    riskScore += 1
    riskFactors.push({
      factor: 'Low HDL',
      present: true,
      impact: 'high',
      description: 'Low HDL cholesterol significantly increases risk'
    })
  }

  // Smoking
  if (input.smokingStatus === 'current') {
    riskScore += 2
    riskFactors.push({
      factor: 'Current Smoking',
      present: true,
      impact: 'high',
      description: 'Smoking dramatically increases cardiovascular risk'
    })
  }

  // Diabetes
  if (input.diabetesStatus !== 'none') {
    riskScore += input.diabetesStatus === 'type1' || input.diabetesStatus === 'type2' ? 2 : 1
    riskFactors.push({
      factor: 'Diabetes',
      present: true,
      impact: 'high',
      description: 'Diabetes significantly increases cardiovascular risk'
    })
  }

  // Family history
  if (input.familyHistory !== 'none') {
    riskScore += 1
    riskFactors.push({
      factor: 'Family History',
      present: true,
      impact: 'moderate',
      description: 'Family history of premature cardiovascular disease'
    })
  }

  // Prior CVD
  if (input.priorCVD) {
    riskScore += 3
    riskFactors.push({
      factor: 'Prior CVD',
      present: true,
      impact: 'high',
      description: 'Previous cardiovascular disease significantly increases risk'
    })
  }

  // Calculate 10-year risk percentage (simplified)
  let tenYearRisk = Math.min(Math.max(riskScore * 3, 1), 40)
  
  // Adjust based on cholesterol levels
  if (ldlValue > 160) tenYearRisk *= 1.3
  if (input.triglycerides > 200) tenYearRisk *= 1.2

  const riskCategory: 'low' | 'borderline' | 'intermediate' | 'high' = 
    tenYearRisk < 5 ? 'low' :
    tenYearRisk < 7.5 ? 'borderline' :
    tenYearRisk < 20 ? 'intermediate' : 'high'

  // Estimate lifetime risk (simplified)
  const lifetimeRisk = Math.min(tenYearRisk * 2.5, 60)

  return {
    tenYearRisk: Math.round(tenYearRisk * 10) / 10,
    riskCategory,
    lifetimeRisk: Math.round(lifetimeRisk),
    riskFactors
  }
}

function generateTreatmentRecommendations(
  input: CholesterolCalculatorInput, 
  risk: CardiovascularRisk, 
  ldlValue: number
): TreatmentRecommendations {
  let ldlTarget = 100
  let treatmentPriority: 'lifestyle' | 'medication_consideration' | 'medication_indicated' = 'lifestyle'
  let statinIntensity: 'low' | 'moderate' | 'high' | 'none' = 'none'
  let statinReasoning = ''

  // Determine targets and treatment based on risk category
  if (input.priorCVD || risk.riskCategory === 'high') {
    ldlTarget = 70
    treatmentPriority = 'medication_indicated'
    statinIntensity = 'high'
    statinReasoning = 'High-intensity statin recommended for very high risk patients'
  } else if (risk.riskCategory === 'intermediate' || ldlValue >= 190) {
    ldlTarget = 100
    treatmentPriority = 'medication_consideration'
    statinIntensity = 'moderate'
    statinReasoning = 'Moderate-intensity statin should be considered'
  } else if (risk.riskCategory === 'borderline') {
    ldlTarget = 130
    treatmentPriority = 'medication_consideration'
    statinIntensity = 'low'
    statinReasoning = 'Consider statin if lifestyle changes insufficient'
  } else {
    ldlTarget = 130
    treatmentPriority = 'lifestyle'
    statinReasoning = 'Focus on lifestyle modifications first'
  }

  const lifestyleInterventions = [
    {
      category: 'Diet',
      intervention: 'Adopt heart-healthy diet (Mediterranean or DASH)',
      priority: 'high' as const,
      expectedBenefit: '5-15% LDL reduction'
    },
    {
      category: 'Exercise',
      intervention: 'Regular aerobic exercise (150 min/week moderate intensity)',
      priority: 'high' as const,
      expectedBenefit: '5-10% LDL reduction, HDL increase'
    },
    {
      category: 'Weight Management',
      intervention: 'Achieve and maintain healthy weight',
      priority: 'high' as const,
      expectedBenefit: '5-20% lipid improvement'
    },
    {
      category: 'Smoking Cessation',
      intervention: input.smokingStatus === 'current' ? 'Complete smoking cessation' : 'Maintain tobacco-free status',
      priority: input.smokingStatus === 'current' ? 'high' as const : 'medium' as const,
      expectedBenefit: input.smokingStatus === 'current' ? 'Significant risk reduction' : 'Continued protection'
    }
  ]

  const monitoringPlan = {
    frequency: risk.riskCategory === 'high' ? 'Every 6-12 weeks initially, then every 3-6 months' :
               risk.riskCategory === 'intermediate' ? 'Every 3-6 months' : 'Annually',
    tests: ['Lipid panel', 'Liver function tests (if on statin)', 'CK if muscle symptoms'],
    followUpActions: [
      'Assess adherence to lifestyle changes',
      'Monitor for medication side effects',
      'Adjust therapy based on response',
      'Screen for new risk factors'
    ]
  }

  return {
    riskCategory: risk.riskCategory,
    ldlTarget,
    treatmentPriority,
    statinRecommendation: {
      indicated: statinIntensity !== 'none',
      intensity: statinIntensity,
      reasoning: statinReasoning
    },
    lifestyleInterventions,
    monitoringPlan
  }
}

function generateHealthInsights(
  input: CholesterolCalculatorInput,
  readings: CholesterolReading[],
  risk: CardiovascularRisk
): Array<{category: string; insight: string; actionable: boolean}> {
  const insights = []

  // Pattern recognition insights
  const hdlReading = readings.find(r => r.type === 'hdl')
  const trigReading = readings.find(r => r.type === 'triglycerides')

  if (hdlReading?.value && trigReading?.value) {
    const trigHdlRatio = trigReading.value / hdlReading.value
    if (trigHdlRatio > 3) {
      insights.push({
        category: 'Metabolic Pattern',
        insight: 'High triglyceride-to-HDL ratio suggests insulin resistance',
        actionable: true
      })
    }
  }

  // Risk factor clustering
  const highRiskFactors = risk.riskFactors.filter(f => f.impact === 'high').length
  if (highRiskFactors >= 2) {
    insights.push({
      category: 'Risk Clustering',
      insight: 'Multiple high-risk factors present - aggressive intervention needed',
      actionable: true
    })
  }

  // Age and gender insights
  if (input.age < 40 && risk.riskCategory !== 'low') {
    insights.push({
      category: 'Early Risk',
      insight: 'Elevated risk at young age may indicate genetic predisposition',
      actionable: true
    })
  }

  // Lifestyle factor insights
  if (input.physicalActivity === 'sedentary') {
    insights.push({
      category: 'Lifestyle',
      insight: 'Sedentary lifestyle significantly contributes to cardiovascular risk',
      actionable: true
    })
  }

  return insights
}

function generateWarningFlags(
  input: CholesterolCalculatorInput,
  readings: CholesterolReading[],
  risk: CardiovascularRisk
): Array<{level: 'caution' | 'warning' | 'urgent'; message: string; recommendations: string[]}> | undefined {
  const warnings = []

  // Very high LDL
  const ldlReading = readings.find(r => r.type === 'ldl')
  if (ldlReading && ldlReading.value >= 190) {
    warnings.push({
      level: 'urgent' as const,
      message: 'LDL cholesterol ≥190 mg/dL indicates possible familial hypercholesterolemia',
      recommendations: [
        'Immediate consultation with lipid specialist',
        'Family screening recommended',
        'Genetic testing consideration',
        'Aggressive treatment indicated'
      ]
    })
  }

  // Very high triglycerides
  const trigReading = readings.find(r => r.type === 'triglycerides')
  if (trigReading && trigReading.value >= 500) {
    warnings.push({
      level: 'urgent' as const,
      message: 'Triglycerides ≥500 mg/dL - risk of acute pancreatitis',
      recommendations: [
        'Immediate medical attention required',
        'Consider hospitalization if symptomatic',
        'Aggressive triglyceride-lowering therapy',
        'Strict dietary fat restriction'
      ]
    })
  }

  // High risk with multiple factors
  if (risk.riskCategory === 'high' && !input.priorCVD) {
    warnings.push({
      level: 'warning' as const,
      message: 'High cardiovascular risk equivalent to coronary disease',
      recommendations: [
        'Treat as secondary prevention',
        'Aggressive risk factor modification',
        'Consider cardiology consultation',
        'Frequent monitoring required'
      ]
    })
  }

  return warnings.length > 0 ? warnings : undefined
}

function generateEducationalContent(
  input: CholesterolCalculatorInput,
  risk: CardiovascularRisk
): Array<{topic: string; explanation: string; importance: 'high' | 'medium' | 'low'}> {
  return [
    {
      topic: 'Understanding Cholesterol Types',
      explanation: 'LDL ("bad") cholesterol builds up in arteries, while HDL ("good") cholesterol helps remove cholesterol from arteries. The balance between these is crucial for heart health.',
      importance: 'high'
    },
    {
      topic: 'Cardiovascular Risk Assessment',
      explanation: 'Your 10-year risk considers multiple factors beyond cholesterol, including age, gender, smoking, and diabetes. This comprehensive assessment guides treatment decisions.',
      importance: 'high'
    },
    {
      topic: 'Lifestyle vs. Medication',
      explanation: 'Lifestyle changes can reduce LDL by 15-30%, while statins can reduce it by 30-60%. Often, combination therapy provides the best outcomes.',
      importance: 'medium'
    },
    {
      topic: 'Monitoring and Follow-up',
      explanation: 'Regular monitoring ensures treatment effectiveness and safety. Adjustments may be needed based on response, side effects, and changing risk factors.',
      importance: 'medium'
    }
  ]
}