import { HeartRateZoneCalculatorInput, HeartRateZoneCalculatorResult, HeartRateZone } from '../schemas/heartRate'

export function calculateHeartRateZones(input: HeartRateZoneCalculatorInput): HeartRateZoneCalculatorResult {
  const { age, restingHeartRate, maxHeartRate, calculationMethod, activityLevel, goals } = input
  
  // Calculate maximum heart rate based on method
  let calculatedMaxHR: number
  let calculatedRestingHR: number | null = restingHeartRate || null
  
  switch (calculationMethod) {
    case 'age_formula':
      calculatedMaxHR = 220 - age
      break
    case 'karvonen':
      calculatedMaxHR = 220 - age
      calculatedRestingHR = restingHeartRate!
      break
    case 'custom_max':
      calculatedMaxHR = maxHeartRate!
      break
    default:
      calculatedMaxHR = 220 - age
  }
  
  // Calculate heart rate reserve for Karvonen method
  const heartRateReserve = calculatedRestingHR ? calculatedMaxHR - calculatedRestingHR : null
  
  // Calculate heart rate zones
  const zones = calculateZones(calculatedMaxHR, calculatedRestingHR, calculationMethod)
  
  // Get methodology information
  const methodology = getMethodologyInfo(calculationMethod)
  
  // Generate personalized recommendations
  const recommendations = generateRecommendations(goals, zones, activityLevel)
  
  // Generate training tips
  const trainingTips = generateTrainingTips(goals, activityLevel)
  
  // Generate fitness insights
  const fitnessInsights = generateFitnessInsights(calculatedMaxHR, calculatedRestingHR, age, activityLevel)
  
  return {
    calculationMethod: methodology.name,
    maxHeartRate: calculatedMaxHR,
    restingHeartRate: calculatedRestingHR,
    heartRateReserve,
    zones,
    recommendations,
    trainingTips,
    methodology,
    fitnessInsights
  }
}

function calculateZones(maxHR: number, restingHR: number | null, method: string): HeartRateZone[] {
  const zones: HeartRateZone[] = []
  
  // Define zone percentages based on method
  const zoneDefinitions = [
    {
      name: 'Recovery Zone',
      minPercent: 50,
      maxPercent: 60,
      description: 'Active recovery and warm-up',
      purpose: 'Recovery, warm-up, and cool-down',
      benefits: ['Promotes recovery', 'Improves circulation', 'Reduces muscle soreness', 'Safe for daily activity'],
      color: 'blue',
      intensity: 'Very Light',
      duration: '20-60 minutes',
      examples: ['Walking', 'Light stretching', 'Easy yoga', 'Gentle cycling']
    },
    {
      name: 'Fat Burn Zone',
      minPercent: 60,
      maxPercent: 70,
      description: 'Optimal fat burning and base building',
      purpose: 'Fat burning and aerobic base development',
      benefits: ['Burns fat efficiently', 'Builds aerobic base', 'Low stress on body', 'Sustainable for long duration'],
      color: 'green',
      intensity: 'Light',
      duration: '30-90 minutes',
      examples: ['Brisk walking', 'Easy jogging', 'Leisure cycling', 'Swimming laps']
    },
    {
      name: 'Aerobic Zone',
      minPercent: 70,
      maxPercent: 80,
      description: 'Cardiovascular fitness improvement',
      purpose: 'Cardiovascular fitness and endurance',
      benefits: ['Improves cardiovascular fitness', 'Increases stamina', 'Enhances oxygen delivery', 'Burns calories efficiently'],
      color: 'yellow',
      intensity: 'Moderate',
      duration: '20-60 minutes',
      examples: ['Steady running', 'Cycling', 'Group fitness classes', 'Dance workouts']
    },
    {
      name: 'Anaerobic Zone',
      minPercent: 80,
      maxPercent: 90,
      description: 'High-intensity training and lactate threshold',
      purpose: 'Lactate threshold and high-intensity performance',
      benefits: ['Improves lactate threshold', 'Increases power output', 'Enhances speed', 'Builds mental toughness'],
      color: 'orange',
      intensity: 'Hard',
      duration: '10-40 minutes',
      examples: ['Interval training', 'Tempo runs', 'Hill climbing', 'Circuit training']
    },
    {
      name: 'VO2 Max Zone',
      minPercent: 90,
      maxPercent: 100,
      description: 'Maximum oxygen uptake and peak performance',
      purpose: 'Maximum oxygen uptake and neuromuscular power',
      benefits: ['Maximizes VO2 max', 'Improves peak power', 'Enhances speed and agility', 'Develops anaerobic capacity'],
      color: 'red',
      intensity: 'Maximum',
      duration: '30 seconds - 8 minutes',
      examples: ['Sprint intervals', 'High-intensity intervals', 'Race pace efforts', 'Plyometric exercises']
    }
  ]
  
  zoneDefinitions.forEach(zoneDef => {
    let minBpm: number, maxBpm: number
    
    if (method === 'karvonen' && restingHR) {
      // Karvonen formula: HR = (HRmax - HRrest) × %Intensity + HRrest
      const hrReserve = maxHR - restingHR
      minBpm = Math.round((hrReserve * (zoneDef.minPercent / 100)) + restingHR)
      maxBpm = Math.round((hrReserve * (zoneDef.maxPercent / 100)) + restingHR)
    } else {
      // Simple percentage of max HR
      minBpm = Math.round(maxHR * (zoneDef.minPercent / 100))
      maxBpm = Math.round(maxHR * (zoneDef.maxPercent / 100))
    }
    
    zones.push({
      name: zoneDef.name,
      description: zoneDef.description,
      purpose: zoneDef.purpose,
      benefits: zoneDef.benefits,
      minBpm,
      maxBpm,
      minPercentage: zoneDef.minPercent,
      maxPercentage: zoneDef.maxPercent,
      color: zoneDef.color,
      intensity: zoneDef.intensity,
      duration: zoneDef.duration,
      examples: zoneDef.examples
    })
  })
  
  return zones
}

function getMethodologyInfo(method: string) {
  const methodologies = {
    age_formula: {
      name: 'Age-Based Formula (220 - Age)',
      description: 'Simple formula using age to estimate maximum heart rate',
      accuracy: 'Moderate (±10-12 bpm)',
      advantages: [
        'Simple and widely known',
        'No additional measurements needed',
        'Good starting point for beginners',
        'Easy to calculate'
      ],
      limitations: [
        'Does not account for individual fitness',
        'Less accurate for very fit or unfit individuals',
        'Ignores resting heart rate',
        'May overestimate for older adults'
      ]
    },
    karvonen: {
      name: 'Karvonen Method (Heart Rate Reserve)',
      description: 'Uses both maximum and resting heart rate for more personalized zones',
      accuracy: 'Good (±5-8 bpm)',
      advantages: [
        'More personalized than age formula',
        'Accounts for individual fitness level',
        'Better for trained athletes',
        'Provides more accurate training zones'
      ],
      limitations: [
        'Requires accurate resting heart rate',
        'Still estimates maximum heart rate',
        'More complex calculation',
        'Resting HR can vary with stress/health'
      ]
    },
    custom_max: {
      name: 'Custom Maximum Heart Rate',
      description: 'Uses your actual tested maximum heart rate for precise calculations',
      accuracy: 'Excellent (±2-3 bpm)',
      advantages: [
        'Most accurate method',
        'Uses your actual maximum HR',
        'Ideal for serious athletes',
        'Accounts for individual variation'
      ],
      limitations: [
        'Requires max HR testing',
        'Testing can be dangerous if not supervised',
        'Max HR can change over time',
        'Expensive to test regularly'
      ]
    }
  }
  
  return methodologies[method as keyof typeof methodologies]
}

function generateRecommendations(goals: string[], zones: HeartRateZone[], activityLevel: string) {
  const recommendations = []
  
  goals.forEach(goal => {
    switch (goal) {
      case 'fat_burn':
        const fatBurnZone = zones.find(z => z.name === 'Fat Burn Zone')!
        recommendations.push({
          zone: fatBurnZone.name,
          recommendation: `Train in ${fatBurnZone.minBpm}-${fatBurnZone.maxBpm} bpm for optimal fat burning`,
          reason: 'This zone maximizes fat oxidation while remaining sustainable for longer durations'
        })
        break
      case 'aerobic':
        const aerobicZone = zones.find(z => z.name === 'Aerobic Zone')!
        recommendations.push({
          zone: aerobicZone.name,
          recommendation: `Target ${aerobicZone.minBpm}-${aerobicZone.maxBpm} bpm for cardiovascular fitness`,
          reason: 'This zone improves your cardiovascular system and increases endurance capacity'
        })
        break
      case 'anaerobic':
        const anaerobicZone = zones.find(z => z.name === 'Anaerobic Zone')!
        recommendations.push({
          zone: anaerobicZone.name,
          recommendation: `Train at ${anaerobicZone.minBpm}-${anaerobicZone.maxBpm} bpm for power and speed`,
          reason: 'This zone improves your lactate threshold and high-intensity performance'
        })
        break
      case 'vo2_max':
        const vo2Zone = zones.find(z => z.name === 'VO2 Max Zone')!
        recommendations.push({
          zone: vo2Zone.name,
          recommendation: `Short intervals at ${vo2Zone.minBpm}-${vo2Zone.maxBpm} bpm for maximum oxygen uptake`,
          reason: 'This zone maximizes your body\'s ability to use oxygen and improves peak performance'
        })
        break
      case 'recovery':
        const recoveryZone = zones.find(z => z.name === 'Recovery Zone')!
        recommendations.push({
          zone: recoveryZone.name,
          recommendation: `Use ${recoveryZone.minBpm}-${recoveryZone.maxBpm} bpm for active recovery days`,
          reason: 'This zone promotes recovery while maintaining movement and circulation'
        })
        break
    }
  })
  
  return recommendations
}

function generateTrainingTips(goals: string[], activityLevel: string) {
  const tips = []
  
  // General training tips based on goals
  if (goals.includes('fat_burn')) {
    tips.push({
      category: 'Fat Burning',
      tip: 'Exercise in the fat burn zone for 30-60 minutes, 3-5 times per week. Morning fasted cardio can be particularly effective.'
    })
  }
  
  if (goals.includes('aerobic')) {
    tips.push({
      category: 'Endurance',
      tip: 'Build your aerobic base with 80% of training in lower zones. This improves efficiency and allows for harder efforts when needed.'
    })
  }
  
  if (goals.includes('anaerobic') || goals.includes('vo2_max')) {
    tips.push({
      category: 'High Intensity',
      tip: 'High-intensity training should be limited to 1-3 sessions per week with adequate recovery between sessions.'
    })
  }
  
  // Activity level specific tips
  if (activityLevel === 'sedentary' || activityLevel === 'lightly_active') {
    tips.push({
      category: 'Getting Started',
      tip: 'Start with 20-30 minutes in the recovery and fat burn zones. Gradually increase duration before increasing intensity.'
    })
  }
  
  if (activityLevel === 'very_active' || activityLevel === 'extremely_active') {
    tips.push({
      category: 'Advanced Training',
      tip: 'Use heart rate zones to ensure proper intensity distribution. Include regular recovery sessions to prevent overtraining.'
    })
  }
  
  // General tips
  tips.push({
    category: 'Monitoring',
    tip: 'Check your heart rate regularly during exercise. If you can\'t reach your target zone, you may be overtraining or dehydrated.'
  })
  
  tips.push({
    category: 'Safety',
    tip: 'Always warm up gradually and cool down properly. Stop exercising if you feel dizzy, chest pain, or unusual shortness of breath.'
  })
  
  return tips
}

function generateFitnessInsights(maxHR: number, restingHR: number | null, age: number, activityLevel: string) {
  const insights = []
  
  // Max heart rate insights
  const expectedMaxHR = 220 - age
  if (maxHR > expectedMaxHR + 10) {
    insights.push({
      category: 'Maximum Heart Rate',
      insight: 'Your maximum heart rate is higher than average for your age, which may indicate good cardiovascular genetics or high fitness level.'
    })
  } else if (maxHR < expectedMaxHR - 10) {
    insights.push({
      category: 'Maximum Heart Rate',
      insight: 'Your maximum heart rate is lower than average for your age. This is normal for some individuals and doesn\'t necessarily indicate poor fitness.'
    })
  }
  
  // Resting heart rate insights
  if (restingHR) {
    if (restingHR < 60) {
      insights.push({
        category: 'Resting Heart Rate',
        insight: 'Your resting heart rate indicates excellent cardiovascular fitness. Elite athletes often have resting heart rates in the 40-60 bpm range.'
      })
    } else if (restingHR > 80) {
      insights.push({
        category: 'Resting Heart Rate',
        insight: 'Your resting heart rate suggests room for cardiovascular improvement. Regular aerobic exercise can help lower your resting heart rate.'
      })
    } else {
      insights.push({
        category: 'Resting Heart Rate',
        insight: 'Your resting heart rate is in the healthy range. Continue regular exercise to maintain good cardiovascular health.'
      })
    }
  }
  
  // Age-related insights
  if (age > 50) {
    insights.push({
      category: 'Age Considerations',
      insight: 'As we age, maximum heart rate naturally decreases. Focus on consistency and enjoyment rather than just intensity in your training.'
    })
  }
  
  // Activity level insights
  if (activityLevel === 'sedentary') {
    insights.push({
      category: 'Activity Level',
      insight: 'Starting a heart rate-based exercise program can significantly improve your cardiovascular health. Begin slowly and progress gradually.'
    })
  }
  
  return insights
}