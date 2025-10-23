import { ToolCategory, HealthTool } from './types'

export const SITE_CONFIG = {
  name: 'Health Tools Hub',
  domain: 'healthtoolshub.com',
  description: 'Free online health calculators and tools. Calculate BMI, blood pressure, sleep cycles, and more with our medically accurate health assessment tools.',
  keywords: [
    'health calculator',
    'medical calculator',
    'BMI calculator',
    'blood pressure calculator',
    'health tools',
    'medical tools',
    'wellness calculator',
    'health assessment'
  ],
  author: 'Health Tools Hub',
  social: {
    twitter: '@healthtoolshub',
    facebook: 'healthtoolshub'
  }
}

export const TOOL_CATEGORIES: ToolCategory[] = [
  {
    id: 'general-health',
    name: 'General Health',
    description: 'Essential health calculators for everyday wellness monitoring',
    icon: 'Heart',
    color: 'primary',
    slug: 'general-health'
  },
  {
    id: 'heart-health',
    name: 'Heart Health',
    description: 'Cardiovascular health assessment and monitoring tools',
    icon: 'HeartPulse',
    color: 'red',
    slug: 'heart-health'
  },
  {
    id: 'nutrition',
    name: 'Nutrition',
    description: 'Nutrition and dietary planning calculators',
    icon: 'Apple',
    color: 'green',
    slug: 'nutrition'
  },
  {
    id: 'sleep-health',
    name: 'Sleep Health',
    description: 'Sleep optimization and circadian rhythm tools',
    icon: 'Moon',
    color: 'indigo',
    slug: 'sleep-health'
  },
  {
    id: 'mental-health',
    name: 'Mental Health',
    description: 'Mental wellness assessment and screening tools',
    icon: 'Brain',
    color: 'purple',
    slug: 'mental-health'
  },
  {
    id: 'pregnancy',
    name: 'Pregnancy & Women\'s Health',
    description: 'Tools for maternal health and women\'s wellness',
    icon: 'Baby',
    color: 'pink',
    slug: 'pregnancy-womens-health'
  },
  {
    id: 'pediatrics',
    name: 'Pediatrics',
    description: 'Child health and development tracking tools',
    icon: 'Users',
    color: 'orange',
    slug: 'pediatrics'
  },
  {
    id: 'diabetes',
    name: 'Diabetes',
    description: 'Blood sugar management and diabetes care tools',
    icon: 'Zap',
    color: 'amber',
    slug: 'diabetes'
  },
  {
    id: 'fitness',
    name: 'Fitness',
    description: 'Exercise and physical fitness calculation tools',
    icon: 'Dumbbell',
    color: 'cyan',
    slug: 'fitness'
  }
]

export const HEALTH_TOOLS: HealthTool[] = [
  {
    id: 'bmi-calculator',
    name: 'BMI Calculator',
    description: 'Calculate your Body Mass Index and get personalized health insights',
    category: 'general-health',
    slug: 'bmi-calculator',
    icon: 'Scale',
    featured: true,
    metaTitle: 'Free BMI Calculator - Calculate Body Mass Index Instantly | Health Tools Hub',
    metaDescription: 'Calculate your BMI instantly with our free, accurate Body Mass Index calculator. Get your BMI score, weight category (underweight, normal, overweight, obese), and personalized health recommendations. Includes visual BMI chart and ideal weight range.',
    keywords: ['BMI calculator', 'body mass index calculator', 'BMI chart', 'healthy weight calculator', 'obesity calculator', 'weight category', 'ideal weight calculator', 'BMI score', 'body mass index chart', 'free BMI tool', 'weight status', 'BMI categories', 'underweight calculator', 'overweight calculator', 'healthy BMI range', 'BMI formula', 'body weight calculator', 'health assessment tool'],
    estimatedReadTime: 3,
    lastUpdated: new Date('2024-01-15')
  },
  {
    id: 'blood-pressure-calculator',
    name: 'Blood Pressure Calculator',
    description: 'Check your blood pressure readings and understand your cardiovascular health',
    category: 'heart-health',
    slug: 'blood-pressure-calculator',
    icon: 'Activity',
    featured: true,
    metaTitle: 'Blood Pressure Calculator - Check Your BP Reading | Health Tools Hub',
    metaDescription: 'Evaluate your blood pressure readings instantly with our free BP calculator. Understand if your reading is normal, elevated, or indicates hypertension based on AHA guidelines.',
    keywords: ['blood pressure calculator', 'BP calculator', 'hypertension', 'cardiovascular health'],
    estimatedReadTime: 4,
    lastUpdated: new Date('2024-01-15')
  },
  {
    id: 'sleep-calculator',
    name: 'Sleep Calculator',
    description: 'Find your optimal bedtime and wake time based on sleep cycles',
    category: 'sleep-health',
    slug: 'sleep-calculator',
    icon: 'Moon',
    featured: true,
    metaTitle: 'Sleep Calculator - Optimal Bedtime & Wake Time | Health Tools Hub',
    metaDescription: 'Calculate your ideal sleep schedule based on 90-minute sleep cycles. Find the perfect bedtime and wake time for quality rest with our free sleep calculator.',
    keywords: ['sleep calculator', 'bedtime calculator', 'sleep cycles', 'circadian rhythm'],
    estimatedReadTime: 3,
    lastUpdated: new Date('2024-01-15')
  },
  {
    id: 'due-date-calculator',
    name: 'Due Date Calculator',
    description: 'Calculate your pregnancy due date and track your baby\'s development',
    category: 'pregnancy',
    slug: 'due-date-calculator',
    icon: 'Calendar',
    featured: true,
    metaTitle: 'Due Date Calculator - Pregnancy Calculator | Health Tools Hub',
    metaDescription: 'Calculate your baby\'s due date with our free pregnancy calculator. Track important milestones, development stages, and get personalized pregnancy timeline.',
    keywords: ['due date calculator', 'pregnancy calculator', 'conception calculator', 'pregnancy timeline'],
    estimatedReadTime: 4,
    lastUpdated: new Date('2024-01-15')
  },
  {
    id: 'ovulation-calculator',
    name: 'Ovulation Calculator',
    description: 'Track your ovulation cycle and predict your most fertile days for conception',
    category: 'pregnancy',
    slug: 'ovulation-calculator',
    icon: 'Heart',
    featured: true,
    metaTitle: 'Ovulation Calculator - Fertility Calendar & Ovulation Tracker | Health Tools Hub',
    metaDescription: 'Calculate your ovulation dates and fertile window with our free ovulation calculator. Track your menstrual cycle, predict fertility, and plan conception with accurate ovulation predictions.',
    keywords: ['ovulation calculator', 'fertility calculator', 'ovulation tracker', 'fertile days calculator', 'menstrual cycle calculator', 'conception calculator', 'fertility calendar', 'ovulation calendar'],
    estimatedReadTime: 5,
    lastUpdated: new Date('2024-01-15')
  },
  {
    id: 'calorie-calculator',
    name: 'Calorie Calculator',
    description: 'Calculate your daily calorie needs based on your goals and activity level',
    category: 'nutrition',
    slug: 'calorie-calculator',
    icon: 'Flame',
    featured: false,
    metaTitle: 'Calorie Calculator - Daily Calorie Needs | Health Tools Hub',
    metaDescription: 'Calculate how many calories you need per day to lose, maintain, or gain weight. Get personalized recommendations.',
    keywords: ['calorie calculator', 'TDEE calculator', 'daily calories', 'weight loss calculator'],
    estimatedReadTime: 3,
    lastUpdated: new Date('2024-01-15')
  },
  {
    id: 'body-fat-calculator',
    name: 'Body Fat Calculator',
    description: 'Calculate your body fat percentage using scientifically validated methods',
    category: 'fitness',
    slug: 'body-fat-calculator',
    icon: 'BarChart3',
    featured: true,
    metaTitle: 'Body Fat Calculator - Accurate Body Fat Percentage Calculator | Health Tools Hub',
    metaDescription: 'Calculate your body fat percentage using scientifically validated methods. Get detailed body composition analysis, health insights, and personalized recommendations.',
    keywords: ['body fat calculator', 'body fat percentage', 'body composition', 'US Navy method', 'Jackson Pollock', 'fitness calculator'],
    estimatedReadTime: 5,
    lastUpdated: new Date('2024-01-15')
  },
  {
    id: 'heart-rate-zone-calculator',
    name: 'Heart Rate Zone Calculator',
    description: 'Calculate your personalized heart rate training zones for optimal workout intensity',
    category: 'heart-health',
    slug: 'heart-rate-zone-calculator',
    icon: 'Heart',
    featured: true,
    metaTitle: 'Heart Rate Zone Calculator - Training Zone Calculator | Health Tools Hub',
    metaDescription: 'Calculate your personalized heart rate training zones using Karvonen method or age formula. Optimize your workout intensity for fat burning, endurance, and performance goals.',
    keywords: ['heart rate zones', 'training zones', 'Karvonen method', 'heart rate calculator', 'target heart rate', 'cardio zones', 'fitness zones'],
    estimatedReadTime: 4,
    lastUpdated: new Date('2024-01-15')
  },
  {
    id: 'hydration-calculator',
    name: 'Hydration Calculator',
    description: 'Calculate your personalized daily water intake needs based on your lifestyle and health factors',
    category: 'general-health',
    slug: 'hydration-calculator',
    icon: 'Droplets',
    featured: true,
    metaTitle: 'Hydration Calculator - Daily Water Intake Calculator | Health Tools Hub',
    metaDescription: 'Calculate your personalized daily water intake needs based on your lifestyle, activity, and health factors. Get timing recommendations and hydration tips.',
    keywords: ['hydration calculator', 'water intake calculator', 'daily water needs', 'hydration needs', 'water consumption', 'dehydration prevention'],
    estimatedReadTime: 4,
    lastUpdated: new Date('2024-01-15')
  },
  {
    id: 'blood-sugar-calculator',
    name: 'Blood Sugar Calculator',
    description: 'Comprehensive blood sugar analysis, HbA1c conversion, and diabetes risk assessment tool',
    category: 'diabetes',
    slug: 'blood-sugar-calculator',
    icon: 'Zap',
    featured: true,
    metaTitle: 'Blood Sugar Calculator - Glucose Analysis & Diabetes Risk Assessment | Health Tools Hub',
    metaDescription: 'Comprehensive blood sugar calculator for glucose analysis, HbA1c conversion, and diabetes risk assessment. Get personalized insights and medical recommendations based on ADA guidelines.',
    keywords: ['blood sugar calculator', 'glucose calculator', 'diabetes calculator', 'HbA1c converter', 'blood glucose test', 'diabetes risk assessment'],
    estimatedReadTime: 6,
    lastUpdated: new Date('2024-01-15')
  },
  {
    id: 'bmr-calculator',
    name: 'BMR Calculator',
    description: 'Calculate your Basal Metabolic Rate and Total Daily Energy Expenditure with multiple validated formulas',
    category: 'fitness',
    slug: 'bmr-calculator',
    icon: 'Flame',
    featured: true,
    metaTitle: 'BMR Calculator - Basal Metabolic Rate & TDEE Calculator | Health Tools Hub',
    metaDescription: 'Calculate your BMR and TDEE with multiple validated formulas. Get personalized calorie goals, macro breakdowns, and metabolic insights for optimal health and fitness.',
    keywords: ['BMR calculator', 'basal metabolic rate', 'TDEE calculator', 'metabolism calculator', 'calorie calculator', 'daily energy expenditure'],
    estimatedReadTime: 5,
    lastUpdated: new Date('2024-01-15')
  }
]

export const BMI_CATEGORIES = {
  UNDERWEIGHT: { min: 0, max: 18.5, label: 'Underweight', color: 'blue' },
  NORMAL: { min: 18.5, max: 25, label: 'Normal weight', color: 'green' },
  OVERWEIGHT: { min: 25, max: 30, label: 'Overweight', color: 'amber' },
  OBESE: { min: 30, max: 100, label: 'Obese', color: 'red' }
}

export const BLOOD_PRESSURE_CATEGORIES = {
  NORMAL: { 
    systolic: { min: 0, max: 120 }, 
    diastolic: { min: 0, max: 80 }, 
    label: 'Normal', 
    color: 'green' 
  },
  ELEVATED: { 
    systolic: { min: 120, max: 129 }, 
    diastolic: { min: 0, max: 80 }, 
    label: 'Elevated', 
    color: 'amber' 
  },
  STAGE_1: { 
    systolic: { min: 130, max: 139 }, 
    diastolic: { min: 80, max: 89 }, 
    label: 'Stage 1 Hypertension', 
    color: 'orange' 
  },
  STAGE_2: { 
    systolic: { min: 140, max: 179 }, 
    diastolic: { min: 90, max: 119 }, 
    label: 'Stage 2 Hypertension', 
    color: 'red' 
  },
  CRISIS: { 
    systolic: { min: 180, max: 300 }, 
    diastolic: { min: 120, max: 200 }, 
    label: 'Hypertensive Crisis', 
    color: 'red' 
  }
}

export const MEDICAL_DISCLAIMER = `
**Medical Disclaimer:** The information provided by this calculator is for educational and informational purposes only and should not be considered as medical advice. Always consult with a qualified healthcare provider before making any decisions about your health or treatment. This tool is not intended to diagnose, treat, cure, or prevent any disease.
`

export const CRISIS_RESOURCES = {
  suicide: {
    us: '988',
    international: 'https://findahelpline.com',
    text: 'Text HOME to 741741'
  },
  domestic_violence: {
    us: '1-800-799-7233',
    text: 'Text START to 88788'
  }
}