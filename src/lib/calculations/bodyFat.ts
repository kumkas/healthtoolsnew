import { BodyFatCalculatorInput, BodyFatCalculatorResult } from '../schemas/bodyFat'

export function calculateBodyFat(input: BodyFatCalculatorInput): BodyFatCalculatorResult {
  const { method, gender, age, weight, height } = input
  
  let bodyFatPercentage: number = 0
  
  // Calculate BMI for additional insights
  const heightInMeters = height / 100
  const bmi = weight / (heightInMeters * heightInMeters)
  
  // Calculate body fat percentage based on selected method
  switch (method) {
    case 'us_navy':
      bodyFatPercentage = calculateUSNavyBodyFat(input)
      break
    case 'ymca':
      bodyFatPercentage = calculateYMCABodyFat(input)
      break
    case 'jackson_pollock_3':
      bodyFatPercentage = calculateJacksonPollock3(input)
      break
    case 'jackson_pollock_7':
      bodyFatPercentage = calculateJacksonPollock7(input)
      break
    default:
      throw new Error('Invalid calculation method')
  }
  
  // Calculate body composition
  const bodyFatMass = (bodyFatPercentage / 100) * weight
  const leanBodyMass = weight - bodyFatMass
  
  // Estimate muscle and bone mass (approximations)
  const boneMass = weight * 0.15 // Approximately 15% of body weight
  const muscleMass = leanBodyMass - boneMass
  
  // Determine body fat category
  const category = getBodyFatCategory(bodyFatPercentage, gender)
  
  // Get methodology information
  const methodology = getMethodologyInfo(method)
  
  // Generate health insights
  const healthInsights = generateHealthInsights(bodyFatPercentage, bmi, age, gender)
  
  // Generate recommendations
  const recommendations = generateRecommendations(bodyFatPercentage, category.label, gender)
  
  return {
    method: methodology.name,
    bodyFatPercentage: Math.round(bodyFatPercentage * 10) / 10,
    bodyFatMass: Math.round(bodyFatMass * 10) / 10,
    leanBodyMass: Math.round(leanBodyMass * 10) / 10,
    category,
    bmi: Math.round(bmi * 10) / 10,
    methodology,
    healthInsights,
    recommendations,
    bodyComposition: {
      fatMass: Math.round(bodyFatMass * 10) / 10,
      leanMass: Math.round(leanBodyMass * 10) / 10,
      muscleMass: Math.round(muscleMass * 10) / 10,
      boneMass: Math.round(boneMass * 10) / 10
    }
  }
}

function calculateUSNavyBodyFat(input: BodyFatCalculatorInput): number {
  const { gender, height, neck, waist, hip } = input
  
  if (gender === 'male') {
    // Male formula: 495 / (1.0324 - 0.19077 * log10(waist - neck) + 0.15456 * log10(height)) - 450
    const logWaistNeck = Math.log10(waist! - neck!)
    const logHeight = Math.log10(height)
    return 495 / (1.0324 - 0.19077 * logWaistNeck + 0.15456 * logHeight) - 450
  } else {
    // Female formula: 495 / (1.29579 - 0.35004 * log10(waist + hip - neck) + 0.22100 * log10(height)) - 450
    const logWaistHipNeck = Math.log10(waist! + hip! - neck!)
    const logHeight = Math.log10(height)
    return 495 / (1.29579 - 0.35004 * logWaistHipNeck + 0.22100 * logHeight) - 450
  }
}

function calculateYMCABodyFat(input: BodyFatCalculatorInput): number {
  const { gender, weight, abdomen } = input
  
  if (gender === 'male') {
    // YMCA Male formula
    return ((4.15 * abdomen!) - (0.082 * weight) - 98.42) / weight * 100
  } else {
    // YMCA Female formula  
    return ((4.15 * abdomen!) - (0.082 * weight) - 76.76) / weight * 100
  }
}

function calculateJacksonPollock3(input: BodyFatCalculatorInput): number {
  const { gender, age } = input
  let sumOfSkinfolds: number
  
  if (gender === 'male') {
    // Male 3-site: chest, abdomen, thigh
    sumOfSkinfolds = (input.chest || 0) + (input.abdominal || 0) + (input.thigh || 0)
    // Body density formula for males
    const bodyDensity = 1.10938 - (0.0008267 * sumOfSkinfolds) + (0.0000016 * Math.pow(sumOfSkinfolds, 2)) - (0.0002574 * age)
    return (495 / bodyDensity) - 450
  } else {
    // Female 3-site: tricep, suprailiac, thigh
    sumOfSkinfolds = (input.tricep || 0) + (input.suprailiac || 0) + (input.thigh || 0)
    // Body density formula for females
    const bodyDensity = 1.0994921 - (0.0009929 * sumOfSkinfolds) + (0.0000023 * Math.pow(sumOfSkinfolds, 2)) - (0.0001392 * age)
    return (495 / bodyDensity) - 450
  }
}

function calculateJacksonPollock7(input: BodyFatCalculatorInput): number {
  const { gender, age } = input
  
  // 7-site: chest, subscapular, tricep, suprailiac, abdomen, thigh, axilla
  const sumOfSkinfolds = (input.chest || 0) + (input.subscapular || 0) + (input.tricep || 0) + 
                        (input.suprailiac || 0) + (input.abdominal || 0) + (input.thigh || 0) + (input.axilla || 0)
  
  if (gender === 'male') {
    const bodyDensity = 1.112 - (0.00043499 * sumOfSkinfolds) + (0.00000055 * Math.pow(sumOfSkinfolds, 2)) - (0.00028826 * age)
    return (495 / bodyDensity) - 450
  } else {
    const bodyDensity = 1.097 - (0.00046971 * sumOfSkinfolds) + (0.00000056 * Math.pow(sumOfSkinfolds, 2)) - (0.00012828 * age)
    return (495 / bodyDensity) - 450
  }
}

function getBodyFatCategory(bodyFatPercentage: number, gender: 'male' | 'female') {
  const categories = gender === 'male' ? {
    essential: { min: 2, max: 5, label: 'Essential Fat', description: 'Minimum fat needed for physiological functions', color: 'blue', range: '2-5%' },
    athletic: { min: 6, max: 13, label: 'Athletic', description: 'Typical for athletes and very fit individuals', color: 'green', range: '6-13%' },
    fitness: { min: 14, max: 17, label: 'Fitness', description: 'Fit and healthy range', color: 'emerald', range: '14-17%' },
    average: { min: 18, max: 24, label: 'Average', description: 'Average range for general population', color: 'yellow', range: '18-24%' },
    obese: { min: 25, max: 100, label: 'Obese', description: 'Above healthy range, may pose health risks', color: 'red', range: '25%+' }
  } : {
    essential: { min: 10, max: 13, label: 'Essential Fat', description: 'Minimum fat needed for physiological functions', color: 'blue', range: '10-13%' },
    athletic: { min: 14, max: 20, label: 'Athletic', description: 'Typical for female athletes', color: 'green', range: '14-20%' },
    fitness: { min: 21, max: 24, label: 'Fitness', description: 'Fit and healthy range', color: 'emerald', range: '21-24%' },
    average: { min: 25, max: 31, label: 'Average', description: 'Average range for general population', color: 'yellow', range: '25-31%' },
    obese: { min: 32, max: 100, label: 'Obese', description: 'Above healthy range, may pose health risks', color: 'red', range: '32%+' }
  }
  
  for (const [key, category] of Object.entries(categories)) {
    if (bodyFatPercentage >= category.min && bodyFatPercentage <= category.max) {
      return category
    }
  }
  
  return categories.obese // Default to obese if above all ranges
}

function getMethodologyInfo(method: string) {
  const methodologies = {
    us_navy: {
      name: 'US Navy Method',
      description: 'Uses circumference measurements to estimate body fat percentage',
      accuracy: 'Good (±3-4%)',
      pros: [
        'Simple measurements with tape measure',
        'No special equipment required',
        'Widely validated and used',
        'Good for general population'
      ],
      cons: [
        'Less accurate than skinfold methods',
        'Affected by measurement technique',
        'May overestimate in very lean individuals',
        'Limited precision for athletes'
      ]
    },
    ymca: {
      name: 'YMCA Method',
      description: 'Uses waist/abdominal circumference and weight for estimation',
      accuracy: 'Moderate (±4-5%)',
      pros: [
        'Simple single measurement',
        'Quick and easy to perform',
        'Good for tracking changes over time',
        'Correlates well with health risks'
      ],
      cons: [
        'Less accurate than multi-site methods',
        'May not account for muscle mass',
        'Affected by bloating and posture',
        'Limited research validation'
      ]
    },
    jackson_pollock_3: {
      name: 'Jackson-Pollock 3-Site',
      description: 'Uses skinfold measurements at three specific body sites',
      accuracy: 'Very Good (±2-3%)',
      pros: [
        'More accurate than circumference methods',
        'Validated by extensive research',
        'Gender-specific measurement sites',
        'Widely used in fitness industry'
      ],
      cons: [
        'Requires skinfold calipers',
        'Technique-dependent accuracy',
        'May be less accurate for obese individuals',
        'Requires trained practitioner'
      ]
    },
    jackson_pollock_7: {
      name: 'Jackson-Pollock 7-Site',
      description: 'Most comprehensive skinfold method using seven measurement sites',
      accuracy: 'Excellent (±1-2%)',
      pros: [
        'Highest accuracy of field methods',
        'Comprehensive body assessment',
        'Excellent for athletes and fitness',
        'Research gold standard for skinfolds'
      ],
      cons: [
        'Requires extensive training',
        'Time-consuming measurements',
        'Requires high-quality calipers',
        'May be impractical for routine use'
      ]
    }
  }
  
  return methodologies[method as keyof typeof methodologies]
}

function generateHealthInsights(bodyFatPercentage: number, bmi: number, age: number, gender: 'male' | 'female') {
  const insights = []
  
  // Body fat vs BMI insight
  if (bmi > 25 && bodyFatPercentage < (gender === 'male' ? 18 : 25)) {
    insights.push({
      category: 'Body Composition',
      insight: 'Your BMI indicates overweight, but your body fat percentage is healthy. This suggests you have higher muscle mass, which is positive for health.'
    })
  } else if (bmi < 25 && bodyFatPercentage > (gender === 'male' ? 20 : 28)) {
    insights.push({
      category: 'Body Composition',
      insight: 'Your BMI is normal, but body fat percentage is elevated. This may indicate lower muscle mass and could benefit from strength training.'
    })
  }
  
  // Age-related insights
  if (age > 40) {
    insights.push({
      category: 'Age Factor',
      insight: 'After age 40, maintaining muscle mass becomes increasingly important. Body fat percentage naturally tends to increase with age due to metabolic changes.'
    })
  }
  
  // Health risk insights
  if (bodyFatPercentage > (gender === 'male' ? 25 : 32)) {
    insights.push({
      category: 'Health Risk',
      insight: 'Higher body fat percentage is associated with increased risk of cardiovascular disease, diabetes, and metabolic syndrome. Consider lifestyle modifications.'
    })
  } else if (bodyFatPercentage < (gender === 'male' ? 6 : 14)) {
    insights.push({
      category: 'Health Risk',
      insight: 'Very low body fat can affect hormone production and immune function. Ensure adequate nutrition and avoid excessive restriction.'
    })
  }
  
  return insights
}

function generateRecommendations(bodyFatPercentage: number, category: string, gender: 'male' | 'female') {
  const recommendations = []
  
  if (category === 'Obese') {
    recommendations.push(
      {
        type: 'Nutrition',
        recommendation: 'Focus on creating a moderate calorie deficit through balanced nutrition. Prioritize protein intake to preserve muscle mass during weight loss.'
      },
      {
        type: 'Exercise',
        recommendation: 'Combine cardiovascular exercise with resistance training. Aim for 150+ minutes of moderate cardio and 2-3 strength sessions per week.'
      },
      {
        type: 'Lifestyle',
        recommendation: 'Ensure adequate sleep (7-9 hours) and manage stress levels, as both significantly impact body composition and weight management.'
      }
    )
  } else if (category === 'Average') {
    recommendations.push(
      {
        type: 'Fitness',
        recommendation: 'Consider incorporating more resistance training to improve body composition by increasing muscle mass and reducing fat percentage.'
      },
      {
        type: 'Nutrition',
        recommendation: 'Focus on nutrient-dense whole foods and adequate protein intake (0.8-1.2g per kg body weight) to support muscle maintenance.'
      }
    )
  } else if (category === 'Athletic' || category === 'Fitness') {
    recommendations.push(
      {
        type: 'Maintenance',
        recommendation: 'Maintain your current healthy body composition through consistent exercise routine and balanced nutrition habits.'
      },
      {
        type: 'Performance',
        recommendation: 'Consider periodized training and nutrition strategies to optimize performance while maintaining healthy body fat levels.'
      }
    )
  } else if (category === 'Essential Fat') {
    recommendations.push(
      {
        type: 'Health Warning',
        recommendation: 'Your body fat percentage is very low. Consult with a healthcare provider to ensure this is healthy for your individual situation.'
      },
      {
        type: 'Nutrition',
        recommendation: 'Ensure adequate calorie and fat intake to support hormone production and overall health. Consider working with a sports nutritionist.'
      }
    )
  }
  
  return recommendations
}