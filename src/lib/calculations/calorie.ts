import { CalorieCalculatorInput, CalorieCalculatorResult } from '../schemas/calorie'

export function calculateCalories(input: CalorieCalculatorInput): CalorieCalculatorResult {
  const { gender, age, weight, height, activityLevel, goal, weightChangeRate } = input

  // Calculate BMR using Mifflin-St Jeor equation (most accurate)
  let bmr: number
  if (gender === 'male') {
    bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5
  } else {
    bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161
  }

  // Activity level multipliers based on scientific research
  const activityMultipliers = {
    sedentary: 1.2,        // Little to no exercise
    light: 1.375,          // Light exercise 1-3 days/week
    moderate: 1.55,        // Moderate exercise 3-5 days/week
    very_active: 1.725,    // Hard exercise 6-7 days/week
    extra_active: 1.9      // Very hard exercise, physical job, or 2x/day training
  }

  // Calculate TDEE (Total Daily Energy Expenditure)
  const tdee = bmr * activityMultipliers[activityLevel]
  const maintenanceCalories = Math.round(tdee)

  // Weight change rates (calories per day deficit/surplus)
  const weightChangeRates = {
    slow: 250,     // ~0.25 kg (0.5 lb) per week
    moderate: 500, // ~0.5 kg (1 lb) per week
    fast: 750      // ~0.75 kg (1.5 lb) per week
  }

  // Calculate goal calories based on desired outcome
  let goalCalories: number
  let weeklyWeightChange: number

  const calorieAdjustment = weightChangeRates[weightChangeRate]

  switch (goal) {
    case 'lose_weight':
      goalCalories = maintenanceCalories - calorieAdjustment
      weeklyWeightChange = -(calorieAdjustment / 1100) // 1100 calories ≈ 0.1 kg
      break
    case 'gain_weight':
      goalCalories = maintenanceCalories + calorieAdjustment
      weeklyWeightChange = calorieAdjustment / 1100
      break
    case 'maintain_weight':
    default:
      goalCalories = maintenanceCalories
      weeklyWeightChange = 0
      break
  }

  goalCalories = Math.round(goalCalories)

  // Ensure minimum calories for health (1200 for women, 1500 for men)
  const minCalories = gender === 'female' ? 1200 : 1500
  if (goalCalories < minCalories) {
    goalCalories = minCalories
  }

  // Calculate macro breakdown (moderate approach)
  // Protein: 25%, Carbs: 45%, Fat: 30%
  const proteinCalories = goalCalories * 0.25
  const carbCalories = goalCalories * 0.45
  const fatCalories = goalCalories * 0.30

  const macroBreakdown = {
    protein: {
      grams: Math.round(proteinCalories / 4), // 4 calories per gram
      calories: Math.round(proteinCalories),
      percentage: 25
    },
    carbs: {
      grams: Math.round(carbCalories / 4), // 4 calories per gram
      calories: Math.round(carbCalories),
      percentage: 45
    },
    fat: {
      grams: Math.round(fatCalories / 9), // 9 calories per gram
      calories: Math.round(fatCalories),
      percentage: 30
    }
  }

  // Activity level information
  const activityInfo = {
    sedentary: {
      level: 'Sedentary',
      description: 'Little to no exercise, desk job',
      examples: ['Office work', 'Watching TV', 'Reading', 'Computer work']
    },
    light: {
      level: 'Lightly Active',
      description: 'Light exercise 1-3 days per week',
      examples: ['Walking', 'Light yoga', 'Golf', 'Casual cycling']
    },
    moderate: {
      level: 'Moderately Active',
      description: 'Moderate exercise 3-5 days per week',
      examples: ['Jogging', 'Swimming', 'Weight training', 'Dancing']
    },
    very_active: {
      level: 'Very Active',
      description: 'Hard exercise 6-7 days per week',
      examples: ['Running', 'High-intensity training', 'Sports training', 'Heavy lifting']
    },
    extra_active: {
      level: 'Extra Active',
      description: 'Very hard exercise, physical job, or training twice a day',
      examples: ['Athletic training', 'Construction work', 'Military training', 'Professional sports']
    }
  }

  // Nutrition tips based on goal
  const nutritionTips = goal === 'lose_weight' ? [
    { category: 'Protein', tip: 'Prioritize lean protein sources to maintain muscle mass during weight loss' },
    { category: 'Hydration', tip: 'Drink water before meals to help control portion sizes' },
    { category: 'Fiber', tip: 'Include high-fiber foods to increase satiety and support digestion' },
    { category: 'Timing', tip: 'Consider eating larger meals earlier in the day when metabolism is higher' }
  ] : goal === 'gain_weight' ? [
    { category: 'Frequency', tip: 'Eat smaller, more frequent meals to increase total calorie intake' },
    { category: 'Protein', tip: 'Include protein with each meal to support muscle growth' },
    { category: 'Healthy Fats', tip: 'Add nuts, oils, and avocados for calorie-dense nutrition' },
    { category: 'Timing', tip: 'Have a protein-rich snack before bed to support overnight recovery' }
  ] : [
    { category: 'Balance', tip: 'Focus on a balanced diet with all macronutrients represented' },
    { category: 'Quality', tip: 'Choose whole, minimally processed foods when possible' },
    { category: 'Consistency', tip: 'Maintain consistent meal timing to support metabolic health' },
    { category: 'Hydration', tip: 'Aim for adequate water intake throughout the day' }
  ]

  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    maintenanceCalories,
    goalCalories,
    macroBreakdown,
    weeklyWeightChange: Math.round(weeklyWeightChange * 10) / 10, // Round to 1 decimal
    activityInfo: activityInfo[activityLevel],
    nutritionTips
  }
}