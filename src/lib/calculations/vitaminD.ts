import { 
  VitaminDCalculatorInput, 
  VitaminDCalculatorResult, 
  VitaminDStatus,
  DeficiencyRisk,
  SunExposureRecommendations,
  SupplementationGuidance,
  DietaryRecommendations
} from '../schemas/vitaminD'

export function calculateVitaminD(input: VitaminDCalculatorInput): VitaminDCalculatorResult {
  // Convert units to ng/mL if needed
  const convertedInput = convertUnitsToNgMl(input)
  
  // Analyze current vitamin D status
  const vitaminDStatus = analyzeVitaminDStatus(convertedInput)
  
  // Assess deficiency risk
  const deficiencyRisk = assessDeficiencyRisk(convertedInput)
  
  // Generate sun exposure recommendations
  const sunExposureRecommendations = generateSunExposureRecommendations(convertedInput)
  
  // Generate supplementation guidance
  const supplementationGuidance = generateSupplementationGuidance(convertedInput, vitaminDStatus)
  
  // Generate dietary recommendations
  const dietaryRecommendations = generateDietaryRecommendations(convertedInput)
  
  // Generate health insights
  const healthInsights = generateHealthInsights(convertedInput, vitaminDStatus, deficiencyRisk)
  
  // Check for warning flags
  const warningFlags = generateWarningFlags(convertedInput, vitaminDStatus)
  
  // Generate educational content
  const educationalContent = generateEducationalContent(convertedInput, deficiencyRisk)

  return {
    vitaminDStatus,
    deficiencyRisk,
    sunExposureRecommendations,
    supplementationGuidance,
    dietaryRecommendations,
    healthInsights,
    warningFlags,
    educationalContent
  }
}

function convertUnitsToNgMl(input: VitaminDCalculatorInput): VitaminDCalculatorInput {
  if (input.vitaminDUnit === 'ng_ml' || !input.currentVitaminDLevel) {
    return input
  }
  
  // Convert from nmol/L to ng/mL (divide by 2.5)
  const convertedLevel = input.currentVitaminDLevel / 2.5
  
  return {
    ...input,
    currentVitaminDLevel: convertedLevel,
    vitaminDUnit: 'ng_ml'
  }
}

function analyzeVitaminDStatus(input: VitaminDCalculatorInput): VitaminDStatus {
  if (!input.currentVitaminDLevel) {
    // If no current level, estimate based on risk factors
    const estimatedLevel = estimateVitaminDLevel(input)
    return analyzeLevel(estimatedLevel, input.vitaminDUnit)
  }
  
  return analyzeLevel(input.currentVitaminDLevel, input.vitaminDUnit)
}

function estimateVitaminDLevel(input: VitaminDCalculatorInput): number {
  let baseLevel = 25 // Start with average level
  
  // Adjust for sun exposure
  if (input.sunExposureHours > 4) baseLevel += 10
  else if (input.sunExposureHours < 1) baseLevel -= 10
  
  // Adjust for skin type
  if (input.skinType === 'very_fair' || input.skinType === 'fair') baseLevel += 5
  else if (input.skinType === 'brown' || input.skinType === 'very_dark') baseLevel -= 10
  
  // Adjust for season
  if (input.season === 'winter') baseLevel -= 8
  else if (input.season === 'summer') baseLevel += 8
  
  // Adjust for supplements
  if (input.supplementUse === 'high_dose') baseLevel += 15
  else if (input.supplementUse === 'moderate_dose') baseLevel += 10
  else if (input.supplementUse === 'low_dose') baseLevel += 5
  
  // Adjust for dietary intake
  if (input.dietaryIntake === 'high') baseLevel += 5
  else if (input.dietaryIntake === 'very_low') baseLevel -= 5
  
  return Math.max(10, Math.min(60, baseLevel))
}

function analyzeLevel(level: number, unit: 'ng_ml' | 'nmol_l'): VitaminDStatus {
  // Convert to ng/mL for analysis
  const ngMlLevel = unit === 'nmol_l' ? level / 2.5 : level
  const convertedLevel = unit === 'ng_ml' ? level * 2.5 : level
  
  let category: { label: string; description: string; color: string; range: string }
  let recommendations: string[] = []
  
  if (ngMlLevel < 12) {
    category = { 
      label: 'Severe Deficiency', 
      description: 'Severely deficient vitamin D levels', 
      color: 'red', 
      range: '<12 ng/mL (<30 nmol/L)' 
    }
    recommendations = [
      'Immediate medical consultation required',
      'High-dose vitamin D supplementation',
      'Increase sun exposure with proper protection',
      'Include vitamin D-rich foods in diet',
      'Consider underlying causes of deficiency'
    ]
  } else if (ngMlLevel < 20) {
    category = { 
      label: 'Deficiency', 
      description: 'Insufficient vitamin D levels', 
      color: 'orange', 
      range: '12-19 ng/mL (30-49 nmol/L)' 
    }
    recommendations = [
      'Consult healthcare provider for supplementation',
      'Increase safe sun exposure',
      'Add vitamin D supplements to routine',
      'Include fortified foods in diet',
      'Monitor levels regularly'
    ]
  } else if (ngMlLevel < 30) {
    category = { 
      label: 'Insufficient', 
      description: 'Below optimal vitamin D levels', 
      color: 'yellow', 
      range: '20-29 ng/mL (50-74 nmol/L)' 
    }
    recommendations = [
      'Consider moderate supplementation',
      'Optimize sun exposure safely',
      'Include vitamin D-rich foods',
      'Monitor seasonal changes',
      'Maintain current positive habits'
    ]
  } else if (ngMlLevel < 50) {
    category = { 
      label: 'Sufficient', 
      description: 'Adequate vitamin D levels', 
      color: 'green', 
      range: '30-49 ng/mL (75-124 nmol/L)' 
    }
    recommendations = [
      'Maintain current vitamin D intake',
      'Continue safe sun exposure habits',
      'Keep up healthy diet',
      'Monitor during winter months',
      'Excellent vitamin D status!'
    ]
  } else if (ngMlLevel < 100) {
    category = { 
      label: 'High Normal', 
      description: 'High but safe vitamin D levels', 
      color: 'green', 
      range: '50-99 ng/mL (125-249 nmol/L)' 
    }
    recommendations = [
      'Excellent vitamin D status',
      'Monitor supplement dosage',
      'Continue current maintenance approach',
      'No need to increase intake further',
      'Regular monitoring recommended'
    ]
  } else {
    category = { 
      label: 'Excessive', 
      description: 'Potentially toxic vitamin D levels', 
      color: 'red', 
      range: '≥100 ng/mL (≥250 nmol/L)' 
    }
    recommendations = [
      'Immediate medical consultation required',
      'Reduce or stop supplementation',
      'Monitor for toxicity symptoms',
      'Check calcium and phosphorus levels',
      'Professional medical management needed'
    ]
  }

  return {
    level,
    unit,
    convertedLevel,
    category,
    recommendations
  }
}

function assessDeficiencyRisk(input: VitaminDCalculatorInput): DeficiencyRisk {
  let riskScore = 0
  const riskFactors: DeficiencyRisk['riskFactors'] = []

  // Age factor
  if (input.age > 65) {
    riskScore += 2
    riskFactors.push({
      factor: 'Advanced Age',
      present: true,
      impact: 'moderate',
      description: 'Older adults have reduced ability to synthesize vitamin D'
    })
  } else if (input.age < 18) {
    riskScore += 1
    riskFactors.push({
      factor: 'Young Age',
      present: true,
      impact: 'moderate',
      description: 'Growing children and adolescents have higher vitamin D needs'
    })
  }

  // Skin type factor
  if (input.skinType === 'brown' || input.skinType === 'very_dark') {
    riskScore += 3
    riskFactors.push({
      factor: 'Dark Skin Pigmentation',
      present: true,
      impact: 'high',
      description: 'Higher melanin reduces vitamin D synthesis from sun exposure'
    })
  } else if (input.skinType === 'very_fair') {
    riskFactors.push({
      factor: 'Fair Skin',
      present: true,
      impact: 'protective',
      description: 'Fair skin synthesizes vitamin D more efficiently from sun exposure'
    })
  }

  // Sun exposure factor
  if (input.sunExposureHours < 1) {
    riskScore += 3
    riskFactors.push({
      factor: 'Limited Sun Exposure',
      present: true,
      impact: 'high',
      description: 'Minimal sun exposure significantly reduces vitamin D synthesis'
    })
  } else if (input.sunExposureHours > 3) {
    riskFactors.push({
      factor: 'Adequate Sun Exposure',
      present: true,
      impact: 'protective',
      description: 'Regular sun exposure supports vitamin D synthesis'
    })
  }

  // Season factor
  if (input.season === 'winter') {
    riskScore += 2
    riskFactors.push({
      factor: 'Winter Season',
      present: true,
      impact: 'moderate',
      description: 'Reduced UV exposure during winter months decreases vitamin D synthesis'
    })
  }

  // Geographic factor (if provided)
  if (input.latitude && Math.abs(input.latitude) > 35) {
    riskScore += 2
    riskFactors.push({
      factor: 'High Latitude Location',
      present: true,
      impact: 'moderate',
      description: 'Living at higher latitudes reduces year-round UV exposure'
    })
  }

  // Sunscreen use
  if (input.sunscreenUse === 'always') {
    riskScore += 1
    riskFactors.push({
      factor: 'Frequent Sunscreen Use',
      present: true,
      impact: 'moderate',
      description: 'Regular sunscreen use can reduce vitamin D synthesis'
    })
  }

  // BMI factor
  if (input.bmi && input.bmi > 30) {
    riskScore += 2
    riskFactors.push({
      factor: 'Obesity',
      present: true,
      impact: 'moderate',
      description: 'Higher BMI is associated with lower vitamin D bioavailability'
    })
  }

  // Medical conditions
  if (input.medicalConditions.includes('malabsorption')) {
    riskScore += 3
    riskFactors.push({
      factor: 'Malabsorption Disorder',
      present: true,
      impact: 'high',
      description: 'Malabsorption conditions significantly impair vitamin D absorption'
    })
  }

  // Pregnancy/breastfeeding
  if (input.pregnancyStatus === 'pregnant' || input.pregnancyStatus === 'breastfeeding') {
    riskScore += 1
    riskFactors.push({
      factor: 'Pregnancy/Breastfeeding',
      present: true,
      impact: 'moderate',
      description: 'Increased vitamin D needs during pregnancy and breastfeeding'
    })
  }

  // Protective factors
  if (input.supplementUse !== 'none') {
    riskScore -= 2
    riskFactors.push({
      factor: 'Vitamin D Supplementation',
      present: true,
      impact: 'protective',
      description: 'Regular supplementation helps maintain adequate vitamin D levels'
    })
  }

  if (input.dietaryIntake === 'high') {
    riskScore -= 1
    riskFactors.push({
      factor: 'High Dietary Intake',
      present: true,
      impact: 'protective',
      description: 'Diet rich in vitamin D sources supports adequate levels'
    })
  }

  // Determine risk level
  const riskLevel: DeficiencyRisk['riskLevel'] = 
    riskScore <= 0 ? 'very_low' :
    riskScore <= 2 ? 'low' :
    riskScore <= 4 ? 'moderate' :
    riskScore <= 7 ? 'high' : 'very_high'

  return {
    riskLevel,
    riskScore: Math.max(0, riskScore),
    riskFactors,
    seasonalVariation: {
      season: input.season,
      expectedChange: input.season === 'winter' ? 'Levels typically 10-15% lower' : 'Levels typically higher with increased sun exposure',
      recommendation: input.season === 'winter' ? 'Consider increasing supplementation during winter months' : 'Optimize safe sun exposure during warmer months'
    }
  }
}

function generateSunExposureRecommendations(input: VitaminDCalculatorInput): SunExposureRecommendations {
  // Base recommendations adjusted for skin type
  let baseTime = 15 // minutes
  let spfRecommendation = 30
  
  switch (input.skinType) {
    case 'very_fair':
      baseTime = 10
      spfRecommendation = 50
      break
    case 'fair':
      baseTime = 15
      spfRecommendation = 30
      break
    case 'medium':
      baseTime = 20
      spfRecommendation = 30
      break
    case 'olive':
      baseTime = 25
      spfRecommendation = 20
      break
    case 'brown':
      baseTime = 30
      spfRecommendation = 20
      break
    case 'very_dark':
      baseTime = 40
      spfRecommendation = 15
      break
  }

  // Adjust for season
  if (input.season === 'winter') baseTime *= 1.5
  else if (input.season === 'summer') baseTime *= 0.8

  return {
    dailyExposureTime: {
      minimum: Math.round(baseTime * 0.5),
      optimal: baseTime,
      maximum: Math.round(baseTime * 2),
      unit: 'minutes'
    },
    timeOfDay: ['10:00 AM - 3:00 PM (peak UV hours)', 'Avoid 11:00 AM - 1:00 PM for extended exposure'],
    skinProtection: {
      spfRecommendation,
      clothingRecommendation: 'Light, long-sleeved clothing after recommended exposure time',
      additionalPrecautions: [
        'Wear UV-protective sunglasses',
        'Use wide-brimmed hat for face protection',
        'Seek shade during peak UV hours',
        'Start with shorter exposure times and gradually increase'
      ]
    },
    seasonalAdjustments: [
      {
        season: 'Spring',
        adjustment: 'Gradually increase exposure time as UV strength increases',
        reasoning: 'UV levels are building but skin may still be sensitive from winter'
      },
      {
        season: 'Summer',
        adjustment: 'Shorter exposure times due to intense UV',
        reasoning: 'High UV levels require less time for vitamin D synthesis'
      },
      {
        season: 'Fall',
        adjustment: 'Maximize exposure as UV levels decline',
        reasoning: 'Build vitamin D stores before winter months'
      },
      {
        season: 'Winter',
        adjustment: 'Focus on dietary sources and supplements',
        reasoning: 'Limited UV exposure makes synthesis difficult in most locations'
      }
    ]
  }
}

function generateSupplementationGuidance(input: VitaminDCalculatorInput, status: VitaminDStatus): SupplementationGuidance {
  let recommended = false
  let dailyDose = { minimum: 0, optimal: 0, maximum: 0, unit: 'IU' as const }
  let supplementType = 'Vitamin D3 (cholecalciferol)'
  let duration = 'Ongoing maintenance'
  
  // Determine if supplementation is recommended
  const ngMlLevel = status.unit === 'nmol_l' ? status.level / 2.5 : status.level
  
  if (!input.currentVitaminDLevel || ngMlLevel < 30) {
    recommended = true
  }
  
  // Base dose recommendations
  if (ngMlLevel < 12) {
    dailyDose = { minimum: 2000, optimal: 4000, maximum: 6000, unit: 'IU' }
    duration = '3-6 months, then maintenance dose'
  } else if (ngMlLevel < 20) {
    dailyDose = { minimum: 1000, optimal: 2000, maximum: 4000, unit: 'IU' }
    duration = '2-4 months, then maintenance dose'
  } else if (ngMlLevel < 30) {
    dailyDose = { minimum: 800, optimal: 1000, maximum: 2000, unit: 'IU' }
    duration = '1-3 months, then maintenance dose'
  } else if (ngMlLevel < 50) {
    dailyDose = { minimum: 400, optimal: 800, maximum: 1000, unit: 'IU' }
    duration = 'Maintenance dose'
  }
  
  // Adjust for risk factors
  if (input.age > 65) {
    dailyDose.optimal += 400
    dailyDose.maximum += 400
  }
  
  if (input.pregnancyStatus === 'pregnant' || input.pregnancyStatus === 'breastfeeding') {
    dailyDose.optimal += 400
    dailyDose.maximum += 600
  }
  
  if (input.bmi && input.bmi > 30) {
    dailyDose.optimal *= 1.5
    dailyDose.maximum *= 1.5
  }

  const contraindications = []
  if (input.medicalConditions.includes('kidney_disease')) {
    contraindications.push('Kidney disease - requires medical supervision')
  }
  if (input.medicalConditions.includes('sarcoidosis')) {
    contraindications.push('Sarcoidosis - may worsen hypercalcemia')
  }
  if (input.medicalConditions.includes('hyperparathyroidism')) {
    contraindications.push('Hyperparathyroidism - may exacerbate calcium elevation')
  }

  return {
    recommended,
    dailyDose,
    supplementType,
    timing: 'Take with meals containing fat for better absorption',
    duration,
    monitoringAdvice: 'Recheck vitamin D levels in 3-6 months',
    contraindications
  }
}

function generateDietaryRecommendations(input: VitaminDCalculatorInput): DietaryRecommendations {
  return {
    foodSources: [
      {
        category: 'Fatty Fish',
        foods: ['Salmon', 'Mackerel', 'Sardines', 'Tuna', 'Rainbow trout'],
        vitaminDContent: '400-1000 IU per 3.5 oz serving',
        servingSize: '3.5 oz (100g)'
      },
      {
        category: 'Fish Liver Oils',
        foods: ['Cod liver oil'],
        vitaminDContent: '1360 IU per tablespoon',
        servingSize: '1 tablespoon (15ml)'
      },
      {
        category: 'Egg Yolks',
        foods: ['Pasture-raised eggs', 'Free-range eggs'],
        vitaminDContent: '40-50 IU per yolk',
        servingSize: '1 large egg yolk'
      },
      {
        category: 'Mushrooms',
        foods: ['UV-exposed mushrooms', 'Maitake', 'Portobello'],
        vitaminDContent: '375-400 IU per cup',
        servingSize: '1 cup (85g)'
      }
    ],
    fortifiedFoods: [
      {
        food: 'Fortified milk',
        content: '100-140 IU per 8 oz',
        availability: 'Widely available'
      },
      {
        food: 'Fortified cereals',
        content: '40-100 IU per serving',
        availability: 'Common in most brands'
      },
      {
        food: 'Fortified orange juice',
        content: '100-140 IU per 8 oz',
        availability: 'Select brands'
      },
      {
        food: 'Fortified plant milks',
        content: '100-140 IU per 8 oz',
        availability: 'Almond, soy, oat milk varieties'
      }
    ],
    mealPlanningTips: [
      'Include fatty fish 2-3 times per week',
      'Choose fortified dairy or plant-based alternatives',
      'Add UV-exposed mushrooms to salads and stir-fries',
      'Consider cod liver oil as a concentrated source',
      'Combine vitamin D foods with healthy fats for absorption',
      'Read labels to identify fortified products',
      'Plan seasonal menus with more vitamin D foods in winter'
    ]
  }
}

function generateHealthInsights(input: VitaminDCalculatorInput, status: VitaminDStatus, risk: DeficiencyRisk): Array<{category: string; insight: string; actionable: boolean}> {
  const insights = []

  // Seasonal insights
  if (input.season === 'winter' && risk.riskLevel !== 'very_low') {
    insights.push({
      category: 'Seasonal Health',
      insight: 'Winter months significantly reduce vitamin D synthesis - consider increasing supplementation',
      actionable: true
    })
  }

  // Skin type insights
  if (input.skinType === 'brown' || input.skinType === 'very_dark') {
    insights.push({
      category: 'Genetic Factors',
      insight: 'Higher melanin content requires longer sun exposure for adequate vitamin D synthesis',
      actionable: true
    })
  }

  // Age-related insights
  if (input.age > 65) {
    insights.push({
      category: 'Age-Related Changes',
      insight: 'Aging reduces skin\'s ability to produce vitamin D - regular supplementation often necessary',
      actionable: true
    })
  }

  // Geographic insights
  if (input.latitude && Math.abs(input.latitude) > 40) {
    insights.push({
      category: 'Geographic Location',
      insight: 'Living at higher latitudes limits year-round vitamin D synthesis from sunlight',
      actionable: true
    })
  }

  // Lifestyle insights
  if (input.sunExposureHours < 1 && input.supplementUse === 'none') {
    insights.push({
      category: 'Lifestyle Pattern',
      insight: 'Limited sun exposure combined with no supplementation creates high deficiency risk',
      actionable: true
    })
  }

  return insights
}

function generateWarningFlags(input: VitaminDCalculatorInput, status: VitaminDStatus): Array<{level: 'caution' | 'warning' | 'urgent'; message: string; recommendations: string[]}> | undefined {
  const warnings = []

  // Severe deficiency
  if (status.category.label === 'Severe Deficiency') {
    warnings.push({
      level: 'urgent' as const,
      message: 'Severe vitamin D deficiency detected - immediate medical attention recommended',
      recommendations: [
        'Consult healthcare provider immediately',
        'Consider high-dose vitamin D therapy',
        'Evaluate for underlying causes',
        'Monitor for symptoms of deficiency',
        'Check calcium and phosphorus levels'
      ]
    })
  }

  // Excessive levels
  if (status.category.label === 'Excessive') {
    warnings.push({
      level: 'urgent' as const,
      message: 'Vitamin D levels are in the toxic range',
      recommendations: [
        'Stop all vitamin D supplementation immediately',
        'Seek immediate medical evaluation',
        'Monitor for symptoms of toxicity',
        'Check calcium and kidney function',
        'Professional medical management required'
      ]
    })
  }

  // High-risk medical conditions
  if (input.medicalConditions.includes('kidney_disease') && input.supplementUse !== 'none') {
    warnings.push({
      level: 'warning' as const,
      message: 'Vitamin D supplementation with kidney disease requires medical supervision',
      recommendations: [
        'Consult nephrologist before supplementing',
        'Monitor calcium and phosphorus levels',
        'Use only prescribed vitamin D forms',
        'Regular kidney function monitoring'
      ]
    })
  }

  return warnings.length > 0 ? warnings : undefined
}

function generateEducationalContent(input: VitaminDCalculatorInput, risk: DeficiencyRisk): Array<{topic: string; explanation: string; importance: 'high' | 'medium' | 'low'}> {
  return [
    {
      topic: 'Vitamin D Synthesis and Absorption',
      explanation: 'Your body produces vitamin D when skin is exposed to UVB radiation from sunlight. The vitamin is then converted in the liver and kidneys to its active form, which helps regulate calcium absorption and bone health.',
      importance: 'high'
    },
    {
      topic: 'Factors Affecting Vitamin D Levels',
      explanation: 'Multiple factors influence your vitamin D status including skin pigmentation, geographic location, season, age, sun exposure habits, dietary intake, and medical conditions.',
      importance: 'high'
    },
    {
      topic: 'Health Benefits Beyond Bone Health',
      explanation: 'Adequate vitamin D supports immune function, muscle strength, cardiovascular health, and may help reduce risk of certain cancers and autoimmune diseases.',
      importance: 'medium'
    },
    {
      topic: 'Safe Sun Exposure Guidelines',
      explanation: 'Brief, regular sun exposure can help maintain vitamin D levels while minimizing skin cancer risk. The key is finding the right balance for your skin type and location.',
      importance: 'medium'
    }
  ]
}