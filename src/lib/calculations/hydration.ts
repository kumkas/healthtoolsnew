import { HydrationCalculatorInput, HydrationCalculatorResult } from '../schemas/hydration'

export function calculateHydration(input: HydrationCalculatorInput): HydrationCalculatorResult {
  const { 
    weight, height, age, gender, activityLevel, climate, exerciseDuration, exerciseIntensity, 
    sweatRate, healthConditions, pregnancyBreastfeeding, caffeine, alcohol, currentIntake 
  } = input

  // Calculate baseline fluid needs using multiple methods
  const baselineNeed = calculateBaselineNeed(weight, height, age, gender)
  
  // Calculate activity-based adjustments
  const activityAdjustment = calculateActivityAdjustment(exerciseDuration, exerciseIntensity, sweatRate, weight)
  
  // Calculate climate-based adjustments
  const climateAdjustment = calculateClimateAdjustment(climate, baselineNeed)
  
  // Calculate health condition adjustments
  const conditionAdjustment = calculateConditionAdjustment(healthConditions, pregnancyBreastfeeding, caffeine, alcohol, baselineNeed)
  
  // Calculate total daily need
  const totalDailyNeed = baselineNeed + activityAdjustment + climateAdjustment + conditionAdjustment
  
  // Convert to different units
  const totalDailyNeedOz = totalDailyNeed * 33.814 // liters to fluid ounces
  const totalDailyNeedCups = totalDailyNeedOz / 8 // 8oz cups
  const hourlyIntake = (totalDailyNeed * 1000) / 16 // ml per hour (assuming 16 waking hours)
  
  // Generate recommendations
  const recommendations = generateRecommendations(totalDailyNeed, activityLevel, exerciseDuration, climate)
  
  // Generate hydration tips
  const hydrationTips = generateHydrationTips(activityLevel, climate, healthConditions, pregnancyBreastfeeding)
  
  // Warning signs
  const warningsigns = getWarningSignsAndFAQ()
  
  // Fluid sources information
  const fluidSources = getFluidSources()
  
  // Personalized insights
  const personalizedInsights = generatePersonalizedInsights(input, totalDailyNeed)
  
  // Compare with current intake if provided
  let intakeComparison
  if (currentIntake !== undefined) {
    const difference = currentIntake - totalDailyNeed
    const percentageDiff = Math.abs(difference) / totalDailyNeed * 100
    
    let status: 'adequate' | 'low' | 'high'
    if (percentageDiff <= 10) status = 'adequate'
    else if (difference < 0) status = 'low'
    else status = 'high'
    
    intakeComparison = {
      current: currentIntake,
      recommended: totalDailyNeed,
      difference,
      status
    }
  }
  
  return {
    baselineNeed: Math.round(baselineNeed * 100) / 100,
    activityAdjustment: Math.round(activityAdjustment * 100) / 100,
    climateAdjustment: Math.round(climateAdjustment * 100) / 100,
    conditionAdjustment: Math.round(conditionAdjustment * 100) / 100,
    totalDailyNeed: Math.round(totalDailyNeed * 100) / 100,
    totalDailyNeedOz: Math.round(totalDailyNeedOz),
    totalDailyNeedCups: Math.round(totalDailyNeedCups * 10) / 10,
    hourlyIntake: Math.round(hourlyIntake),
    recommendations,
    hydrationTips,
    warningsigns,
    fluidSources,
    personalizedInsights,
    intakeComparison
  }
}

function calculateBaselineNeed(weight: number, height: number, age: number, gender: 'male' | 'female'): number {
  // Use multiple formulas and average them for accuracy
  
  // Formula 1: Simple weight-based (35ml per kg)
  const weightBased = (weight * 35) / 1000
  
  // Formula 2: Holliday-Segar method adapted for adults
  let hollidaySegar: number
  if (weight <= 10) {
    hollidaySegar = weight * 100 / 1000
  } else if (weight <= 20) {
    hollidaySegar = (1000 + (weight - 10) * 50) / 1000
  } else {
    hollidaySegar = (1500 + (weight - 20) * 20) / 1000
  }
  
  // Formula 3: Age and gender adjusted
  let ageGenderAdjusted: number
  if (gender === 'male') {
    if (age < 30) ageGenderAdjusted = weight * 40 / 1000
    else if (age < 55) ageGenderAdjusted = weight * 35 / 1000
    else ageGenderAdjusted = weight * 30 / 1000
  } else {
    if (age < 30) ageGenderAdjusted = weight * 35 / 1000
    else if (age < 55) ageGenderAdjusted = weight * 31 / 1000
    else ageGenderAdjusted = weight * 27 / 1000
  }
  
  // Average the methods with weights
  return (weightBased * 0.4 + hollidaySegar * 0.3 + ageGenderAdjusted * 0.3)
}

function calculateActivityAdjustment(duration: number, intensity: 'low' | 'moderate' | 'high', sweatRate: 'low' | 'normal' | 'high', weight: number): number {
  if (duration === 0) return 0
  
  // Base fluid loss per hour of exercise
  const intensityMultipliers = {
    low: 0.3,    // 300ml per hour
    moderate: 0.5, // 500ml per hour
    high: 0.8     // 800ml per hour
  }
  
  const sweatMultipliers = {
    low: 0.8,
    normal: 1.0,
    high: 1.3
  }
  
  // Weight adjustment (heavier people generally sweat more)
  const weightAdjustment = weight > 70 ? 1.1 : weight < 60 ? 0.9 : 1.0
  
  const hoursOfExercise = duration / 60
  const baseFluidLoss = intensityMultipliers[intensity] * hoursOfExercise
  
  return baseFluidLoss * sweatMultipliers[sweatRate] * weightAdjustment
}

function calculateClimateAdjustment(climate: string, baselineNeed: number): number {
  const climateMultipliers = {
    cool: 0,        // No additional need
    temperate: 0.05, // 5% increase
    warm: 0.15,     // 15% increase
    hot: 0.25,      // 25% increase
    very_hot: 0.4   // 40% increase
  }
  
  return baselineNeed * (climateMultipliers[climate as keyof typeof climateMultipliers] || 0)
}

function calculateConditionAdjustment(
  healthConditions: string[], 
  pregnancyBreastfeeding: string, 
  caffeine: number, 
  alcohol: number, 
  baselineNeed: number
): number {
  let adjustment = 0
  
  // Health conditions
  healthConditions.forEach(condition => {
    switch (condition) {
      case 'diabetes':
        adjustment += baselineNeed * 0.1 // 10% increase
        break
      case 'kidney_disease':
        // Note: Should consult doctor, but generally need more careful monitoring
        adjustment += baselineNeed * 0.05
        break
      case 'heart_disease':
        adjustment += baselineNeed * 0.05
        break
      case 'fever':
        adjustment += baselineNeed * 0.13 // 13% increase per degree above normal
        break
      case 'vomiting_diarrhea':
        adjustment += baselineNeed * 0.2 // 20% increase
        break
    }
  })
  
  // Pregnancy and breastfeeding
  if (pregnancyBreastfeeding === 'pregnant') {
    adjustment += 0.3 // Additional 300ml
  } else if (pregnancyBreastfeeding === 'breastfeeding') {
    adjustment += 0.7 // Additional 700ml
  }
  
  // Caffeine (diuretic effect)
  if (caffeine > 400) { // High caffeine intake
    adjustment += 0.2 // Additional 200ml
  } else if (caffeine > 200) { // Moderate caffeine
    adjustment += 0.1 // Additional 100ml
  }
  
  // Alcohol (diuretic effect)
  if (alcohol > 0) {
    adjustment += alcohol * 0.1 // 100ml per standard drink
  }
  
  return adjustment
}

function generateRecommendations(totalNeed: number, activityLevel: string, exerciseDuration: number, climate: string) {
  const recommendations = []
  
  // Morning hydration
  recommendations.push({
    timing: 'Upon Waking',
    amount: '500-750ml',
    reason: 'Rehydrate after overnight fluid loss and kickstart metabolism'
  })
  
  // Pre-exercise
  if (exerciseDuration > 0) {
    recommendations.push({
      timing: '2-3 hours before exercise',
      amount: '400-600ml',
      reason: 'Ensure optimal hydration status before activity'
    })
    
    recommendations.push({
      timing: '15-20 minutes before exercise',
      amount: '200-300ml',
      reason: 'Top off fluid levels without causing discomfort'
    })
  }
  
  // During exercise
  if (exerciseDuration > 30) {
    recommendations.push({
      timing: 'Every 15-20 minutes during exercise',
      amount: '150-250ml',
      reason: 'Replace fluid losses and maintain performance'
    })
  }
  
  // Post-exercise
  if (exerciseDuration > 0) {
    recommendations.push({
      timing: 'Within 2 hours after exercise',
      amount: '150% of fluid lost',
      reason: 'Fully restore hydration status and aid recovery'
    })
  }
  
  // Throughout the day
  const hourlyAmount = Math.round((totalNeed * 1000) / 16)
  recommendations.push({
    timing: 'Throughout the day',
    amount: `${hourlyAmount}ml per hour`,
    reason: 'Maintain steady hydration without overwhelming kidneys'
  })
  
  // Before meals
  recommendations.push({
    timing: '30 minutes before meals',
    amount: '200-300ml',
    reason: 'Aid digestion and help control appetite'
  })
  
  return recommendations
}

function generateHydrationTips(activityLevel: string, climate: string, healthConditions: string[], pregnancyBreastfeeding: string) {
  const tips = []
  
  // General tips
  tips.push({
    category: 'Daily Habits',
    tip: 'Start each day with a glass of water and keep a water bottle with you at all times.'
  })
  
  tips.push({
    category: 'Monitoring',
    tip: 'Check your urine color - pale yellow indicates good hydration, dark yellow suggests dehydration.'
  })
  
  // Activity-specific tips
  if (activityLevel === 'active' || activityLevel === 'very_active') {
    tips.push({
      category: 'Exercise Hydration',
      tip: 'Weigh yourself before and after exercise. Drink 150% of the weight lost as fluids.'
    })
  }
  
  // Climate-specific tips
  if (climate === 'hot' || climate === 'very_hot') {
    tips.push({
      category: 'Hot Weather',
      tip: 'In hot climates, drink cool (not ice-cold) fluids and include electrolyte replacement for prolonged exposure.'
    })
  }
  
  // Health condition tips
  if (healthConditions.includes('diabetes')) {
    tips.push({
      category: 'Diabetes Management',
      tip: 'Monitor blood sugar levels as dehydration can affect glucose control. Stay extra vigilant about fluid intake.'
    })
  }
  
  // Pregnancy/breastfeeding tips
  if (pregnancyBreastfeeding === 'pregnant') {
    tips.push({
      category: 'Pregnancy',
      tip: 'Increase fluid intake gradually and choose water over sugary drinks. Dehydration can trigger contractions.'
    })
  }
  
  if (pregnancyBreastfeeding === 'breastfeeding') {
    tips.push({
      category: 'Breastfeeding',
      tip: 'Drink a glass of water each time you nurse. Your milk production depends on adequate hydration.'
    })
  }
  
  // Food sources
  tips.push({
    category: 'Food Sources',
    tip: 'Include water-rich foods: watermelon, cucumber, oranges, lettuce, and soups contribute to hydration.'
  })
  
  // Timing
  tips.push({
    category: 'Timing',
    tip: 'Avoid drinking large amounts with meals as it can dilute digestive enzymes. Sip throughout the day instead.'
  })
  
  return tips
}

function getWarningSignsAndFAQ() {
  return {
    dehydration: [
      'Dark yellow urine or decreased urination',
      'Thirst, dry mouth, or sticky saliva',
      'Fatigue, dizziness, or headache',
      'Dry skin that tents when pinched',
      'Rapid heartbeat or breathing'
    ],
    overhydration: [
      'Clear, colorless urine with frequent urination',
      'Headache, nausea, or vomiting',
      'Confusion or disorientation',
      'Muscle weakness or cramps',
      'Swelling in hands, feet, or lips'
    ]
  }
}

function getFluidSources() {
  return [
    {
      source: 'Plain Water',
      hydrationValue: 100,
      description: 'The gold standard for hydration',
      examples: ['Tap water', 'Bottled water', 'Filtered water']
    },
    {
      source: 'Herbal Teas',
      hydrationValue: 95,
      description: 'Caffeine-free teas provide excellent hydration',
      examples: ['Chamomile', 'Peppermint', 'Rooibos', 'Ginger tea']
    },
    {
      source: 'Milk',
      hydrationValue: 90,
      description: 'Contains electrolytes and provides sustained hydration',
      examples: ['Low-fat milk', 'Plant-based milk', 'Chocolate milk (post-exercise)']
    },
    {
      source: 'Fresh Fruit Juices',
      hydrationValue: 85,
      description: 'Good hydration but watch sugar content',
      examples: ['Orange juice', 'Apple juice', 'Watermelon juice']
    },
    {
      source: 'Sports Drinks',
      hydrationValue: 80,
      description: 'Beneficial during intense exercise over 1 hour',
      examples: ['Electrolyte drinks', 'Coconut water', 'Diluted sports drinks']
    },
    {
      source: 'Coffee/Tea',
      hydrationValue: 70,
      description: 'Mild diuretic effect but still contributes to hydration',
      examples: ['Black coffee', 'Green tea', 'Black tea']
    },
    {
      source: 'Water-Rich Foods',
      hydrationValue: 60,
      description: 'Contribute significantly to daily fluid intake',
      examples: ['Watermelon', 'Cucumber', 'Oranges', 'Lettuce', 'Soups']
    }
  ]
}

function generatePersonalizedInsights(input: HydrationCalculatorInput, totalNeed: number) {
  const insights = []
  
  // Weight-based insights
  if (input.weight > 90) {
    insights.push({
      category: 'Body Size',
      insight: 'Your larger body size means you need more fluids to maintain proper hydration. Your calculated needs account for this increased requirement.'
    })
  }
  
  // Age insights
  if (input.age > 65) {
    insights.push({
      category: 'Age Factor',
      insight: 'As we age, our kidney function and thirst sensation decrease. Pay extra attention to regular fluid intake and monitoring urine color.'
    })
  }
  
  // Activity insights
  if (input.exerciseDuration > 60) {
    insights.push({
      category: 'Exercise Duration',
      insight: 'Your extended exercise sessions significantly increase fluid needs. Consider electrolyte replacement for activities longer than 1 hour.'
    })
  }
  
  // Climate insights
  if (input.climate === 'hot' || input.climate === 'very_hot') {
    insights.push({
      category: 'Climate Impact',
      insight: 'Hot climates increase fluid losses through sweating and breathing. Your needs are adjusted upward to account for this increased loss.'
    })
  }
  
  // Health condition insights
  if (input.healthConditions.includes('diabetes')) {
    insights.push({
      category: 'Diabetes Management',
      insight: 'Diabetes affects fluid balance. Good hydration helps with blood sugar control and kidney function. Monitor your levels closely.'
    })
  }
  
  // High caffeine insight
  if (input.caffeine > 400) {
    insights.push({
      category: 'Caffeine Intake',
      insight: 'High caffeine intake has a mild diuretic effect. Your fluid needs are increased to compensate for this additional loss.'
    })
  }
  
  // Pregnancy/breastfeeding insights
  if (input.pregnancyBreastfeeding === 'pregnant') {
    insights.push({
      category: 'Pregnancy Needs',
      insight: 'Pregnancy increases blood volume and metabolic demands. Adequate hydration supports fetal development and prevents complications.'
    })
  }
  
  if (input.pregnancyBreastfeeding === 'breastfeeding') {
    insights.push({
      category: 'Breastfeeding Needs',
      insight: 'Breast milk is 87% water. Your increased fluid needs support milk production and your own health during this demanding time.'
    })
  }
  
  return insights
}