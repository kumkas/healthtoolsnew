import { BMRCalculatorInput, BMRCalculatorResult, BMRResult, CalorieGoals, MacroBreakdown, MetabolicInsights } from '../schemas/bmr'

export function calculateBMR(input: BMRCalculatorInput): BMRCalculatorResult {
  // Convert units to metric
  const weightKg = input.weightUnit === 'lbs' ? input.weight * 0.453592 : input.weight
  const heightCm = input.heightUnit === 'ft_in' ? 
    (input.feet! * 12 + input.inches!) * 2.54 : input.height

  // Calculate BMR using selected formula
  const bmrResult = calculateBMRWithFormula(input, weightKg, heightCm)
  
  // Calculate calorie goals
  const calorieGoals = calculateCalorieGoals(bmrResult.tdee, input.goal, input.weightChangeRate)
  
  // Calculate macro breakdowns
  const macroBreakdowns = calculateMacroBreakdowns(bmrResult.tdee, calorieGoals.customGoal, input)
  
  // Generate metabolic insights
  const metabolicInsights = input.includeMetabolicAge ? 
    generateMetabolicInsights(input, bmrResult.bmr, weightKg, heightCm) : undefined
  
  // Generate activity recommendations
  const activityRecommendations = generateActivityRecommendations(input, calorieGoals.customGoal - bmrResult.tdee)
  
  // Generate nutrition tips
  const nutritionTips = generateNutritionTips(input, calorieGoals)
  
  // Check for warnings
  const warningMessages = generateWarningMessages(input, bmrResult, calorieGoals)

  return {
    bmrResult,
    calorieGoals,
    macroBreakdowns,
    metabolicInsights,
    activityRecommendations,
    nutritionTips,
    warningMessages
  }
}

function calculateBMRWithFormula(input: BMRCalculatorInput, weightKg: number, heightCm: number): BMRResult {
  let bmr: number
  let methodDescription: string
  let reliability: 'high' | 'moderate' | 'low' = 'high'

  switch (input.formula) {
    case 'mifflin_st_jeor':
      if (input.gender === 'male') {
        bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * input.age) + 5
      } else {
        bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * input.age) - 161
      }
      methodDescription = 'Mifflin-St Jeor equation (most accurate for general population)'
      reliability = 'high'
      break

    case 'harris_benedict':
      if (input.gender === 'male') {
        bmr = 88.362 + (13.397 * weightKg) + (4.799 * heightCm) - (5.677 * input.age)
      } else {
        bmr = 447.593 + (9.247 * weightKg) + (3.098 * heightCm) - (4.330 * input.age)
      }
      methodDescription = 'Harris-Benedict equation (revised 1984)'
      reliability = 'moderate'
      break

    case 'katch_mcardle':
      const leanBodyMass = weightKg * (1 - input.bodyFatPercentage! / 100)
      bmr = 370 + (21.6 * leanBodyMass)
      methodDescription = 'Katch-McArdle equation (most accurate for lean individuals)'
      reliability = input.bodyFatPercentage ? 'high' : 'low'
      break

    default:
      throw new Error('Invalid formula selected')
  }

  // Apply medical condition adjustments
  bmr = applyMedicalAdjustments(bmr, input)

  // Calculate TDEE
  const tdee = calculateTDEE(bmr, input.activityLevel)

  // Generate factors affecting BMR
  const factors = generateBMRFactors(input, weightKg, heightCm)

  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    formula: input.formula,
    methodDescription,
    reliability,
    factors
  }
}

function applyMedicalAdjustments(bmr: number, input: BMRCalculatorInput): number {
  let adjustedBMR = bmr

  // Thyroid condition adjustments
  switch (input.thyroidCondition) {
    case 'hypothyroid':
      adjustedBMR *= 0.85 // 15% reduction
      break
    case 'hyperthyroid':
      adjustedBMR *= 1.20 // 20% increase
      break
  }

  // Diabetes adjustments
  if (input.diabetesType !== 'none') {
    adjustedBMR *= 1.05 // Slight increase due to metabolic inefficiency
  }

  // Smoking status
  if (input.smokingStatus === 'current') {
    adjustedBMR *= 1.10 // 10% increase
  }

  // Caffeine effect (temporary boost)
  if (input.caffeineDrinks > 0) {
    const caffeineBoost = Math.min(input.caffeineDrinks * 0.02, 0.10) // Max 10% boost
    adjustedBMR *= (1 + caffeineBoost)
  }

  return adjustedBMR
}

function calculateTDEE(bmr: number, activityLevel: string): number {
  const activityMultipliers = {
    sedentary: 1.2,
    lightly_active: 1.375,
    moderately_active: 1.55,
    very_active: 1.725,
    extremely_active: 1.9
  }

  return bmr * activityMultipliers[activityLevel as keyof typeof activityMultipliers]
}

function calculateCalorieGoals(tdee: number, goal: string, weightChangeRate: number): CalorieGoals {
  const maintenance = Math.round(tdee)
  
  // 1 kg fat = 7700 calories, so weekly deficit/surplus
  const weeklyCalorieChange = weightChangeRate * 7700
  const dailyCalorieChange = weeklyCalorieChange / 7

  return {
    maintenance,
    weightLoss: {
      conservative: Math.round(tdee - (0.25 * 7700 / 7)), // 0.25kg/week
      moderate: Math.round(tdee - (0.5 * 7700 / 7)),      // 0.5kg/week
      aggressive: Math.round(tdee - (1 * 7700 / 7))       // 1kg/week
    },
    weightGain: {
      lean: Math.round(tdee + (0.25 * 7700 / 7)),     // 0.25kg/week
      moderate: Math.round(tdee + (0.5 * 7700 / 7)),  // 0.5kg/week
      bulking: Math.round(tdee + (1 * 7700 / 7))      // 1kg/week
    },
    customGoal: goal === 'maintain' ? maintenance :
                goal === 'lose_weight' ? Math.round(tdee - dailyCalorieChange) :
                goal === 'gain_weight' ? Math.round(tdee + dailyCalorieChange) :
                Math.round(tdee + dailyCalorieChange * 0.7) // gain_muscle (smaller surplus)
  }
}

function calculateMacroBreakdowns(tdee: number, goalCalories: number, input: BMRCalculatorInput): {
  maintenance: MacroBreakdown
  goal: MacroBreakdown
} {
  const weightKg = input.weightUnit === 'lbs' ? input.weight * 0.453592 : input.weight

  // Protein: 1.6-2.2g per kg body weight (higher for muscle gain)
  const proteinGPerKg = input.goal === 'gain_muscle' ? 2.2 : 
                       input.goal === 'lose_weight' ? 2.0 : 1.8
  const proteinG = Math.round(weightKg * proteinGPerKg)

  // Fat: 25-35% of calories
  const fatPercentage = input.goal === 'gain_muscle' ? 25 : 30

  function createMacroBreakdown(calories: number): MacroBreakdown {
    const proteinCals = proteinG * 4
    const fatCals = Math.round(calories * (fatPercentage / 100))
    const carbCals = calories - proteinCals - fatCals
    
    return {
      calories,
      protein: { grams: proteinG, percentage: Math.round((proteinCals / calories) * 100) },
      carbs: { grams: Math.round(carbCals / 4), percentage: Math.round((carbCals / calories) * 100) },
      fat: { grams: Math.round(fatCals / 9), percentage: fatPercentage },
      fiber: Math.round(calories / 1000 * 14) // 14g per 1000 calories
    }
  }

  return {
    maintenance: createMacroBreakdown(Math.round(tdee)),
    goal: createMacroBreakdown(goalCalories)
  }
}

function generateMetabolicInsights(input: BMRCalculatorInput, bmr: number, weightKg: number, heightCm: number): MetabolicInsights {
  // Calculate expected BMR for age group
  const avgBMRMale = (10 * 70) + (6.25 * 175) - (5 * input.age) + 5
  const avgBMRFemale = (10 * 60) + (6.25 * 165) - (5 * input.age) - 161
  const avgBMR = input.gender === 'male' ? avgBMRMale : avgBMRFemale
  
  // Estimate metabolic age
  const bmrRatio = bmr / avgBMR
  const metabolicAge = Math.round(input.age / bmrRatio)
  
  const comparison = bmr > avgBMR * 1.1 ? 'above average' :
                    bmr < avgBMR * 0.9 ? 'below average' : 'average'

  const factors = [
    {
      factor: 'Muscle Mass',
      status: input.bodyFatPercentage && input.bodyFatPercentage < (input.gender === 'male' ? 15 : 25) ? 'positive' : 'neutral' as const,
      description: 'More muscle mass increases metabolic rate'
    },
    {
      factor: 'Activity Level',
      status: ['very_active', 'extremely_active'].includes(input.activityLevel) ? 'positive' : 
              input.activityLevel === 'sedentary' ? 'negative' : 'neutral' as const,
      description: 'Regular exercise boosts metabolism'
    },
    {
      factor: 'Age Factor',
      status: input.age < 30 ? 'positive' : input.age > 50 ? 'negative' : 'neutral' as const,
      description: 'Metabolism naturally slows with age'
    }
  ]

  const recommendations = [
    {
      category: 'Strength Training',
      recommendation: 'Include resistance training 2-3x per week to build muscle mass',
      priority: 'high' as const
    },
    {
      category: 'Protein Intake',
      recommendation: 'Consume adequate protein to support muscle maintenance',
      priority: 'high' as const
    },
    {
      category: 'Sleep Quality',
      recommendation: 'Aim for 7-9 hours of quality sleep to optimize metabolism',
      priority: 'medium' as const
    }
  ]

  return {
    metabolicAge,
    comparison,
    factors,
    recommendations
  }
}

function generateBMRFactors(input: BMRCalculatorInput, weightKg: number, heightCm: number): Array<{name: string; value: string; impact: string}> {
  return [
    {
      name: 'Age',
      value: `${input.age} years`,
      impact: 'BMR decreases ~1-2% per decade after age 30'
    },
    {
      name: 'Gender',
      value: input.gender === 'male' ? 'Male' : 'Female',
      impact: 'Males typically have 10-15% higher BMR than females'
    },
    {
      name: 'Body Weight',
      value: `${Math.round(weightKg)} kg`,
      impact: 'Larger bodies require more energy to maintain basic functions'
    },
    {
      name: 'Height',
      value: `${Math.round(heightCm)} cm`,
      impact: 'Taller individuals have larger organ sizes requiring more energy'
    },
    {
      name: 'Activity Level',
      value: input.activityLevel.replace('_', ' '),
      impact: 'Regular exercise increases overall metabolic rate'
    }
  ]
}

function generateActivityRecommendations(input: BMRCalculatorInput, calorieGap: number): Array<{
  type: string
  duration: string
  frequency: string
  caloriesBurned: number
}> {
  const recommendations = []
  
  if (calorieGap < 0) { // Weight loss
    recommendations.push(
      {
        type: 'Brisk Walking',
        duration: '45 minutes',
        frequency: '5 days/week',
        caloriesBurned: 300
      },
      {
        type: 'Strength Training',
        duration: '45 minutes',
        frequency: '3 days/week',
        caloriesBurned: 250
      },
      {
        type: 'High-Intensity Interval Training',
        duration: '20 minutes',
        frequency: '3 days/week',
        caloriesBurned: 400
      }
    )
  } else if (calorieGap > 0) { // Weight gain
    recommendations.push(
      {
        type: 'Strength Training',
        duration: '60 minutes',
        frequency: '4 days/week',
        caloriesBurned: 300
      },
      {
        type: 'Light Cardio',
        duration: '30 minutes',
        frequency: '2 days/week',
        caloriesBurned: 200
      }
    )
  } else { // Maintenance
    recommendations.push(
      {
        type: 'Mixed Cardio',
        duration: '30 minutes',
        frequency: '4 days/week',
        caloriesBurned: 250
      },
      {
        type: 'Strength Training',
        duration: '45 minutes',
        frequency: '2 days/week',
        caloriesBurned: 200
      }
    )
  }
  
  return recommendations
}

function generateNutritionTips(input: BMRCalculatorInput, calorieGoals: CalorieGoals): Array<{
  category: string
  tip: string
  importance: 'high' | 'medium' | 'low'
}> {
  const tips = [
    {
      category: 'Meal Timing',
      tip: 'Eat regular meals every 3-4 hours to maintain stable metabolism',
      importance: 'medium' as const
    },
    {
      category: 'Hydration',
      tip: 'Drink plenty of water - dehydration can slow metabolism by 2-3%',
      importance: 'high' as const
    },
    {
      category: 'Protein',
      tip: 'Include protein in every meal to support muscle maintenance and metabolism',
      importance: 'high' as const
    },
    {
      category: 'Fiber',
      tip: 'Choose high-fiber foods - they require more energy to digest',
      importance: 'medium' as const
    }
  ]

  if (input.goal === 'lose_weight') {
    tips.push({
      category: 'Calorie Cycling',
      tip: 'Consider having 1-2 higher calorie days per week to prevent metabolic adaptation',
      importance: 'medium'
    })
  }

  if (input.goal === 'gain_muscle') {
    tips.push({
      category: 'Post-Workout',
      tip: 'Consume protein and carbs within 30 minutes after strength training',
      importance: 'high'
    })
  }

  return tips
}

function generateWarningMessages(input: BMRCalculatorInput, bmrResult: BMRResult, calorieGoals: CalorieGoals): Array<{
  level: 'caution' | 'warning' | 'critical'
  message: string
  recommendations: string[]
}> | undefined {
  const warnings = []

  // Very low calorie warning
  if (calorieGoals.customGoal < bmrResult.bmr * 0.8) {
    warnings.push({
      level: 'critical' as const,
      message: 'Your target calories are significantly below your BMR, which may slow metabolism and cause muscle loss',
      recommendations: [
        'Consider a more moderate calorie deficit',
        'Increase physical activity instead of restricting calories severely',
        'Consult with a healthcare provider or registered dietitian'
      ]
    })
  }

  // Very high calorie surplus warning
  if (calorieGoals.customGoal > bmrResult.tdee + 1000) {
    warnings.push({
      level: 'warning' as const,
      message: 'A very large calorie surplus may lead to excessive fat gain',
      recommendations: [
        'Consider a more moderate surplus (300-500 calories)',
        'Focus on strength training to promote muscle growth',
        'Monitor body composition changes regularly'
      ]
    })
  }

  // Age-related warnings
  if (input.age > 65) {
    warnings.push({
      level: 'caution' as const,
      message: 'Metabolic rate calculations may be less accurate for older adults',
      recommendations: [
        'Monitor your response to calorie targets carefully',
        'Consider consulting with a healthcare provider',
        'Focus on maintaining muscle mass through strength training'
      ]
    })
  }

  return warnings.length > 0 ? warnings : undefined
}