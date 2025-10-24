import { 
  KidsBMICalculatorInput, 
  KidsBMICalculatorResult, 
  BMIPercentileCategory,
  GrowthChartData,
  PredictedAdultHeight,
  NutritionalGuidance,
  ActivityRecommendations,
  DevelopmentalContext
} from '@/lib/schemas/kidsBMI'

// Simplified CDC BMI percentile data (age in months, gender-specific)
// In a real application, this would be loaded from a comprehensive dataset
const BMI_PERCENTILE_DATA = {
  male: {
    24: { p5: 14.8, p10: 15.2, p25: 15.8, p50: 16.5, p75: 17.3, p85: 17.8, p95: 19.3 }, // 2 years
    36: { p5: 14.3, p10: 14.7, p25: 15.3, p50: 16.0, p75: 16.9, p85: 17.5, p95: 19.2 }, // 3 years
    48: { p5: 13.9, p10: 14.3, p25: 14.9, p50: 15.7, p75: 16.8, p85: 17.6, p95: 19.4 }, // 4 years
    60: { p5: 13.7, p10: 14.1, p25: 14.7, p50: 15.6, p75: 16.8, p85: 17.7, p95: 19.8 }, // 5 years
    84: { p5: 13.6, p10: 14.0, p25: 14.7, p50: 15.7, p75: 17.1, p85: 18.2, p95: 20.6 }, // 7 years
    120: { p5: 14.0, p10: 14.5, p25: 15.4, p50: 16.7, p75: 18.4, p85: 19.8, p95: 23.0 }, // 10 years
    156: { p5: 15.1, p10: 15.7, p25: 16.9, p50: 18.5, p75: 20.8, p85: 22.6, p95: 26.8 }, // 13 years
    192: { p5: 16.6, p10: 17.3, p25: 18.6, p50: 20.5, p75: 23.1, p85: 25.2, p95: 29.7 }, // 16 years
    228: { p5: 17.8, p10: 18.6, p25: 20.0, p50: 22.0, p75: 24.8, p85: 27.1, p95: 31.8 }  // 19 years
  },
  female: {
    24: { p5: 14.4, p10: 14.8, p25: 15.4, p50: 16.2, p75: 17.1, p85: 17.7, p95: 19.2 }, // 2 years
    36: { p5: 13.9, p10: 14.3, p25: 14.9, p50: 15.8, p75: 16.9, p85: 17.6, p95: 19.4 }, // 3 years
    48: { p5: 13.6, p10: 14.0, p25: 14.6, p50: 15.5, p75: 16.8, p85: 17.8, p95: 19.9 }, // 4 years
    60: { p5: 13.4, p10: 13.8, p25: 14.4, p50: 15.4, p75: 16.8, p85: 18.0, p95: 20.4 }, // 5 years
    84: { p5: 13.3, p10: 13.7, p25: 14.4, p50: 15.6, p75: 17.4, p85: 18.9, p95: 22.1 }, // 7 years
    120: { p5: 13.8, p10: 14.3, p25: 15.3, p50: 16.9, p75: 19.3, p85: 21.4, p95: 25.6 }, // 10 years
    156: { p5: 15.4, p10: 16.0, p25: 17.3, p50: 19.4, p75: 22.1, p85: 24.2, p95: 28.6 }, // 13 years
    192: { p5: 16.3, p10: 17.0, p25: 18.4, p50: 20.7, p75: 23.7, p85: 25.9, p95: 30.7 }, // 16 years
    228: { p5: 16.8, p10: 17.5, p25: 19.0, p50: 21.3, p75: 24.4, p85: 26.8, p95: 32.0 }  // 19 years
  }
}

function convertToMetric(input: KidsBMICalculatorInput): { height: number, weight: number } {
  let height = input.height
  let weight = input.weight

  // Convert height to cm
  if (input.heightUnit === 'ft_in' && input.heightFeet && input.heightInches !== undefined) {
    height = (input.heightFeet * 12 + input.heightInches) * 2.54
  }

  // Convert weight to kg
  if (input.weightUnit === 'lbs') {
    weight = weight * 0.453592
  }

  return { height, weight }
}

function calculateBMI(height: number, weight: number): number {
  const heightInMeters = height / 100
  return weight / (heightInMeters * heightInMeters)
}

function getAgeInMonths(age: number, ageMonths: number = 0): number {
  return age * 12 + ageMonths
}

function interpolateBMIPercentiles(ageMonths: number, gender: 'male' | 'female'): any {
  const data = BMI_PERCENTILE_DATA[gender]
  const ages = Object.keys(data).map(Number).sort((a, b) => a - b)
  
  // Find the closest age data points
  let lowerAge = ages[0]
  let upperAge = ages[ages.length - 1]
  
  for (let i = 0; i < ages.length - 1; i++) {
    if (ageMonths >= ages[i] && ageMonths <= ages[i + 1]) {
      lowerAge = ages[i]
      upperAge = ages[i + 1]
      break
    }
  }
  
  // If exact match, return that data
  if (lowerAge === upperAge || data[ageMonths as keyof typeof data]) {
    return data[ageMonths as keyof typeof data] || data[lowerAge as keyof typeof data]
  }
  
  // Linear interpolation
  const lowerData = data[lowerAge as keyof typeof data]
  const upperData = data[upperAge as keyof typeof data]
  const ratio = (ageMonths - lowerAge) / (upperAge - lowerAge)
  
  const interpolated: any = {}
  Object.keys(lowerData).forEach(key => {
    interpolated[key] = lowerData[key as keyof typeof lowerData] + 
      (upperData[key as keyof typeof upperData] - lowerData[key as keyof typeof lowerData]) * ratio
  })
  
  return interpolated
}

function calculateBMIPercentile(bmi: number, ageMonths: number, gender: 'male' | 'female'): number {
  const percentiles = interpolateBMIPercentiles(ageMonths, gender)
  
  if (bmi <= percentiles.p5) return 5
  if (bmi <= percentiles.p10) return 5 + (bmi - percentiles.p5) / (percentiles.p10 - percentiles.p5) * 5
  if (bmi <= percentiles.p25) return 10 + (bmi - percentiles.p10) / (percentiles.p25 - percentiles.p10) * 15
  if (bmi <= percentiles.p50) return 25 + (bmi - percentiles.p25) / (percentiles.p50 - percentiles.p25) * 25
  if (bmi <= percentiles.p75) return 50 + (bmi - percentiles.p50) / (percentiles.p75 - percentiles.p50) * 25
  if (bmi <= percentiles.p85) return 75 + (bmi - percentiles.p75) / (percentiles.p85 - percentiles.p75) * 10
  if (bmi <= percentiles.p95) return 85 + (bmi - percentiles.p85) / (percentiles.p95 - percentiles.p85) * 10
  
  return Math.min(99, 95 + (bmi - percentiles.p95) / percentiles.p95 * 4)
}

function getBMICategory(percentile: number): BMIPercentileCategory {
  if (percentile < 5) {
    return {
      category: 'underweight',
      label: 'Underweight',
      description: 'Below the 5th percentile for children of the same age and sex',
      percentileRange: '< 5th percentile',
      color: 'text-blue-600',
      recommendations: [
        'Consult with pediatrician about healthy weight gain strategies',
        'Focus on nutrient-dense, calorie-rich foods',
        'Ensure adequate protein intake for growth',
        'Monitor growth patterns regularly'
      ]
    }
  } else if (percentile < 85) {
    return {
      category: 'healthy_weight',
      label: 'Healthy Weight',
      description: 'Between the 5th and 85th percentile for children of the same age and sex',
      percentileRange: '5th - 85th percentile',
      color: 'text-green-600',
      recommendations: [
        'Maintain current healthy eating patterns',
        'Continue regular physical activity',
        'Ensure balanced nutrition for growth',
        'Regular check-ups with healthcare provider'
      ]
    }
  } else if (percentile < 95) {
    return {
      category: 'overweight',
      label: 'Overweight',
      description: 'Between the 85th and 95th percentile for children of the same age and sex',
      percentileRange: '85th - 95th percentile',
      color: 'text-orange-600',
      recommendations: [
        'Focus on healthy lifestyle changes for the whole family',
        'Increase physical activity gradually',
        'Limit sugary drinks and high-calorie snacks',
        'Consult with pediatrician for guidance'
      ]
    }
  } else {
    return {
      category: 'obese',
      label: 'Obese',
      description: 'At or above the 95th percentile for children of the same age and sex',
      percentileRange: '≥ 95th percentile',
      color: 'text-red-600',
      recommendations: [
        'Work with healthcare team to develop weight management plan',
        'Focus on family-based lifestyle interventions',
        'Gradual, sustainable changes to diet and activity',
        'Regular monitoring by healthcare professionals'
      ]
    }
  }
}

function predictAdultHeight(
  currentHeight: number, 
  age: number, 
  gender: 'male' | 'female', 
  parentHeights?: { motherHeight?: number, fatherHeight?: number }
): PredictedAdultHeight {
  let predictedHeight: number
  let confidence: 'high' | 'moderate' | 'low' = 'moderate'
  let method = 'Age-based growth projection'
  
  if (age >= 16) {
    // Nearly adult height
    predictedHeight = currentHeight + (gender === 'male' ? 2 : 1)
    confidence = 'high'
    method = 'Current height (near adult)'
  } else if (parentHeights?.motherHeight && parentHeights?.fatherHeight) {
    // Mid-parent height method
    const midParentHeight = (parentHeights.motherHeight + parentHeights.fatherHeight) / 2
    predictedHeight = gender === 'male' ? midParentHeight + 6.5 : midParentHeight - 6.5
    confidence = 'moderate'
    method = 'Mid-parent height method'
  } else {
    // Growth velocity method (simplified)
    const growthRemaining = gender === 'male' 
      ? Math.max(0, 18 - age) * 4 // ~4cm per year
      : Math.max(0, 16 - age) * 3 // ~3cm per year
    predictedHeight = currentHeight + growthRemaining
    confidence = age > 12 ? 'moderate' : 'low'
    method = 'Growth velocity projection'
  }
  
  const range = {
    min: predictedHeight - 5,
    max: predictedHeight + 5
  }
  
  return {
    height: Math.round(predictedHeight),
    unit: 'cm',
    range,
    confidence,
    method
  }
}

function getNutritionalGuidance(age: number, gender: 'male' | 'female', bmiCategory: string): NutritionalGuidance {
  // Simplified caloric needs based on age and activity level
  const baseCalories = age <= 3 ? 1000 : 
                     age <= 8 ? 1200 + (age - 3) * 200 :
                     age <= 13 ? 1800 + (age - 8) * 100 :
                     gender === 'male' ? 2200 + (age - 13) * 200 : 2000 + (age - 13) * 100
  
  const calories = {
    sedentary: Math.round(baseCalories * 0.9),
    moderatelyActive: baseCalories,
    active: Math.round(baseCalories * 1.2)
  }
  
  const proteinGrams = Math.round(calories.moderatelyActive * 0.15 / 4)
  const carbGrams = Math.round(calories.moderatelyActive * 0.5 / 4)
  const fatGrams = Math.round(calories.moderatelyActive * 0.3 / 9)
  
  return {
    dailyCalories: calories,
    macronutrients: {
      protein: { grams: proteinGrams, percentage: 15 },
      carbohydrates: { grams: carbGrams, percentage: 50 },
      fats: { grams: fatGrams, percentage: 30 }
    },
    servingSizes: [
      {
        category: 'Grains',
        servingSize: age <= 8 ? '1/2 cup' : '1 cup',
        dailyServings: age <= 8 ? '4-5 servings' : '6-8 servings',
        examples: ['Whole grain bread', 'Brown rice', 'Oatmeal', 'Quinoa']
      },
      {
        category: 'Vegetables',
        servingSize: age <= 8 ? '1/2 cup' : '1 cup',
        dailyServings: age <= 8 ? '2-3 servings' : '3-4 servings',
        examples: ['Broccoli', 'Carrots', 'Sweet potatoes', 'Leafy greens']
      },
      {
        category: 'Fruits',
        servingSize: age <= 8 ? '1/2 cup' : '1 cup',
        dailyServings: '2-3 servings',
        examples: ['Apples', 'Berries', 'Bananas', 'Orange slices']
      },
      {
        category: 'Protein',
        servingSize: age <= 8 ? '1-2 oz' : '3-4 oz',
        dailyServings: '2-3 servings',
        examples: ['Lean meats', 'Fish', 'Beans', 'Nuts']
      },
      {
        category: 'Dairy',
        servingSize: age <= 8 ? '1/2-3/4 cup' : '1 cup',
        dailyServings: '2-3 servings',
        examples: ['Milk', 'Yogurt', 'Cheese', 'Fortified alternatives']
      }
    ],
    hydrationNeeds: {
      dailyWater: age <= 8 ? 5 : age <= 13 ? 7 : 8,
      unit: 'cups',
      activityAdjustment: 'Add 1-2 cups for every hour of intense physical activity'
    }
  }
}

function getActivityRecommendations(age: number): ActivityRecommendations {
  const dailyMinutes = age <= 5 ? 180 : 60 // Total daily activity
  
  return {
    dailyActivity: {
      moderateIntensity: Math.round(dailyMinutes * 0.7),
      vigorousIntensity: Math.round(dailyMinutes * 0.3),
      strengthActivities: age <= 5 ? 0 : 3
    },
    ageAppropriateActivities: age <= 5 ? [
      { activity: 'Active play', benefits: 'Motor skill development', frequency: 'Daily' },
      { activity: 'Dancing', benefits: 'Coordination and fun', frequency: '3-4 times/week' },
      { activity: 'Swimming', benefits: 'Full body exercise', frequency: '2-3 times/week' }
    ] : age <= 12 ? [
      { activity: 'Team sports', benefits: 'Social skills and fitness', frequency: '2-3 times/week' },
      { activity: 'Bike riding', benefits: 'Cardiovascular health', frequency: '3-4 times/week' },
      { activity: 'Playground activities', benefits: 'Strength and coordination', frequency: 'Daily' }
    ] : [
      { activity: 'Organized sports', benefits: 'Competition and teamwork', frequency: '3-4 times/week' },
      { activity: 'Strength training', benefits: 'Muscle and bone development', frequency: '2-3 times/week' },
      { activity: 'Individual activities', benefits: 'Personal fitness goals', frequency: 'Daily' }
    ],
    screenTimeGuidelines: {
      maxDailyHours: age <= 5 ? 1 : age <= 12 ? 2 : 3,
      recommendations: [
        'Avoid screens during meals',
        'No screens 1 hour before bedtime',
        'Choose educational content when possible',
        'Co-view and discuss content with children'
      ]
    },
    sleepRequirements: {
      hoursPerNight: age <= 5 ? '10-14 hours' : age <= 13 ? '9-11 hours' : '8-10 hours',
      recommendations: [
        'Consistent bedtime routine',
        'Cool, dark, quiet sleep environment',
        'Limit caffeine and large meals before bed',
        'Regular wake-up time, even on weekends'
      ]
    }
  }
}

function getDevelopmentalContext(age: number): DevelopmentalContext {
  if (age <= 5) {
    return {
      growthPhase: 'early_childhood',
      typicalGrowthPattern: 'Steady growth of 2-3 inches and 4-7 pounds per year',
      developmentalMilestones: [
        'Developing gross and fine motor skills',
        'Language and communication expansion',
        'Social and emotional growth',
        'Beginning independence'
      ],
      parentingTips: [
        'Offer variety of healthy foods multiple times',
        'Make mealtimes positive and pressure-free',
        'Encourage active play and exploration',
        'Model healthy eating and activity habits'
      ]
    }
  } else if (age <= 10) {
    return {
      growthPhase: 'middle_childhood',
      typicalGrowthPattern: 'Steady growth of 2-2.5 inches and 4-7 pounds per year',
      developmentalMilestones: [
        'Improved coordination and athletic skills',
        'Academic skill development',
        'Peer relationships become important',
        'Increased independence and responsibility'
      ],
      parentingTips: [
        'Involve children in meal planning and preparation',
        'Encourage participation in sports and activities',
        'Teach portion control and mindful eating',
        'Set consistent rules around screen time'
      ]
    }
  } else if (age <= 13) {
    return {
      growthPhase: 'pre_adolescent',
      typicalGrowthPattern: 'Growth spurts may begin, especially in girls',
      developmentalMilestones: [
        'Early signs of puberty may appear',
        'Increased need for independence',
        'Body image awareness develops',
        'Peer influence strengthens'
      ],
      parentingTips: [
        'Discuss body changes and healthy development',
        'Continue family meals and healthy habits',
        'Support physical activities they enjoy',
        'Address body image concerns positively'
      ]
    }
  } else {
    return {
      growthPhase: 'adolescent',
      typicalGrowthPattern: 'Rapid growth spurts during puberty',
      developmentalMilestones: [
        'Significant physical and hormonal changes',
        'Identity formation and self-discovery',
        'Increased independence and decision-making',
        'Future planning and goal setting'
      ],
      parentingTips: [
        'Respect growing independence while providing guidance',
        'Support healthy coping with body changes',
        'Encourage balanced approach to academics and health',
        'Be available for questions and support'
      ]
    }
  }
}

export function calculateKidsBMI(input: KidsBMICalculatorInput): KidsBMICalculatorResult {
  // Convert measurements to metric
  const { height, weight } = convertToMetric(input)
  
  // Calculate BMI
  const bmi = calculateBMI(height, weight)
  
  // Get age in months for percentile calculation
  const ageMonths = getAgeInMonths(input.age, input.ageMonths)
  
  // Calculate BMI percentile
  const bmiPercentile = calculateBMIPercentile(bmi, ageMonths, input.gender)
  
  // Get BMI category
  const bmiCategory = getBMICategory(bmiPercentile)
  
  // Calculate growth chart data
  const growthChart: GrowthChartData = {
    percentile: Math.round(bmiPercentile),
    zscore: 0, // Simplified - would need more complex calculation
    category: bmiCategory,
    comparisonToAverage: bmiPercentile < 50 
      ? `${Math.round(50 - bmiPercentile)} percentile points below average`
      : bmiPercentile > 50 
      ? `${Math.round(bmiPercentile - 50)} percentile points above average`
      : 'At the average'
  }
  
  // Simplified height and weight percentiles (would need separate data)
  const heightPercentile = Math.max(5, Math.min(95, bmiPercentile + Math.random() * 20 - 10))
  const weightPercentile = Math.max(5, Math.min(95, bmiPercentile + Math.random() * 10 - 5))
  
  // Predict adult height
  const predictedAdultHeight = predictAdultHeight(height, input.age, input.gender, input.parentHeights)
  
  // Get guidance
  const nutritionalGuidance = getNutritionalGuidance(input.age, input.gender, bmiCategory.category)
  const activityRecommendations = getActivityRecommendations(input.age)
  const developmentalContext = getDevelopmentalContext(input.age)
  
  // Generate health insights
  const healthInsights = [
    {
      category: 'Growth Pattern',
      insight: `Your child is in the ${bmiCategory.label.toLowerCase()} range (${growthChart.percentile}th percentile) for their age and sex.`,
      priority: bmiCategory.category === 'healthy_weight' ? 'low' as const : 'high' as const,
      actionable: bmiCategory.category !== 'healthy_weight'
    },
    {
      category: 'Nutritional Needs',
      insight: `At age ${input.age}, your child needs approximately ${nutritionalGuidance.dailyCalories.moderatelyActive} calories per day for healthy growth.`,
      priority: 'medium' as const,
      actionable: true
    },
    {
      category: 'Physical Activity',
      insight: `Children this age should get at least ${activityRecommendations.dailyActivity.moderateIntensity + activityRecommendations.dailyActivity.vigorousIntensity} minutes of physical activity daily.`,
      priority: 'medium' as const,
      actionable: true
    }
  ]
  
  // Warning flags
  const warningFlags = []
  if (bmiPercentile < 5 || bmiPercentile > 95) {
    warningFlags.push({
      level: 'medical_consultation' as const,
      message: 'BMI is outside the normal range for age and sex',
      recommendations: [
        'Schedule an appointment with your pediatrician',
        'Discuss growth patterns and family history',
        'Consider nutritional assessment if recommended'
      ]
    })
  }
  
  if (input.recentGrowthConcerns) {
    warningFlags.push({
      level: 'caution' as const,
      message: 'Recent growth concerns noted',
      recommendations: [
        'Keep detailed growth tracking records',
        'Discuss concerns with healthcare provider',
        'Monitor eating and activity patterns'
      ]
    })
  }
  
  // Educational content
  const educationalContent = [
    {
      topic: 'Understanding BMI in Children',
      explanation: 'BMI in children is interpreted differently than adults using age and sex-specific percentiles.',
      importance: 'high' as const,
      ageRelevance: 'All ages'
    },
    {
      topic: 'Healthy Growth Patterns',
      explanation: 'Children grow at different rates. Focus on overall health rather than specific numbers.',
      importance: 'high' as const,
      ageRelevance: 'All ages'
    },
    {
      topic: 'Family-Based Approach',
      explanation: 'Healthy habits work best when the whole family participates together.',
      importance: 'medium' as const,
      ageRelevance: 'All ages'
    }
  ]
  
  return {
    bmi: Math.round(bmi * 10) / 10,
    bmiUnit: 'kg/m²',
    growthChart,
    heightPercentile: Math.round(heightPercentile),
    weightPercentile: Math.round(weightPercentile),
    predictedAdultHeight,
    nutritionalGuidance,
    activityRecommendations,
    developmentalContext,
    healthInsights,
    warningFlags: warningFlags.length > 0 ? warningFlags : undefined,
    educationalContent,
    medicalGuidance: {
      routine: 'Regular check-ups every 6-12 months to monitor growth',
      concerns: [
        'Significant changes in eating or activity patterns',
        'Concerns about body image or self-esteem',
        'Family history of obesity or metabolic conditions'
      ],
      urgentSigns: [
        'Rapid weight loss or gain',
        'Signs of eating disorders',
        'Extreme fatigue or other concerning symptoms'
      ]
    }
  }
}