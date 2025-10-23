'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { BMI_CATEGORIES, MEDICAL_DISCLAIMER } from '@/lib/constants'
import { calculateBMI, getBMICategory, getIdealWeight } from '@/lib/calculations/bmi'
import { bmiCategories } from '@/lib/healthcare-design-system'
import { 
  Scale, 
  Calculator, 
  TrendingUp, 
  Info, 
  AlertCircle,
  Target,
  Activity,
  BarChart3,
  Heart,
  CheckCircle
} from 'lucide-react'

interface BMIResult {
  bmi: number
  category: keyof typeof BMI_CATEGORIES
  idealWeightRange: { min: number; max: number }
  interpretation: string
  recommendations: string[]
}

const BMIGauge: React.FC<{ bmi: number; category: keyof typeof BMI_CATEGORIES }> = ({ bmi, category }) => {
  const categoryData = BMI_CATEGORIES[category]
  const gaugePercentage = Math.min((bmi / 40) * 100, 100) // Scale to 40 BMI max for gauge
  const colors = bmiCategories[category.toLowerCase() as keyof typeof bmiCategories]

  return (
    <div className="relative w-48 h-48 mx-auto">
      {/* Background Circle */}
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
        <circle
          cx="100"
          cy="100"
          r="80"
          stroke="#E5E7EB"
          strokeWidth="20"
          fill="transparent"
          className="opacity-20"
        />
        
        {/* Progress Circle */}
        <motion.circle
          cx="100"
          cy="100"
          r="80"
          stroke={colors.icon}
          strokeWidth="20"
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={2 * Math.PI * 80}
          strokeDashoffset={2 * Math.PI * 80 * (1 - gaugePercentage / 100)}
          initial={{ strokeDashoffset: 2 * Math.PI * 80 }}
          animate={{ strokeDashoffset: 2 * Math.PI * 80 * (1 - gaugePercentage / 100) }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      
      {/* Center Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center"
        >
          <div className="text-3xl font-bold text-gray-900 mb-1">{bmi.toFixed(1)}</div>
          <div className="text-sm text-gray-600">BMI</div>
        </motion.div>
      </div>
    </div>
  )
}

const BMIChart: React.FC<{ bmi: number }> = ({ bmi }) => {
  const categories = [
    { name: 'Underweight', range: '< 18.5', color: '#3B82F6', min: 0, max: 18.5 },
    { name: 'Normal', range: '18.5 - 24.9', color: '#10B981', min: 18.5, max: 25 },
    { name: 'Overweight', range: '25 - 29.9', color: '#F59E0B', min: 25, max: 30 },
    { name: 'Obese', range: '30+', color: '#EF4444', min: 30, max: 40 },
  ]

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-gray-900 mb-4">BMI Categories</h4>
      {categories.map((category, index) => {
        const isActive = bmi >= category.min && bmi < category.max
        
        return (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-center justify-between p-3 rounded-lg border-2 transition-all ${
              isActive 
                ? 'border-current bg-current/5 shadow-sm' 
                : 'border-gray-200 bg-white'
            }`}
            style={{ 
              borderColor: isActive ? category.color : undefined,
              color: isActive ? category.color : undefined
            }}
          >
            <div className="flex items-center space-x-3">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <span className={`font-medium ${isActive ? 'text-current' : 'text-gray-700'}`}>
                {category.name}
              </span>
            </div>
            <span className={`text-sm ${isActive ? 'text-current font-medium' : 'text-gray-500'}`}>
              {category.range}
              {isActive && (
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="ml-2 inline-flex items-center"
                >
                  <CheckCircle className="w-4 h-4" />
                </motion.span>
              )}
            </span>
          </motion.div>
        )
      })}
    </div>
  )
}

export const BMICalculator: React.FC = () => {
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric')
  const [result, setResult] = useState<BMIResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [errors, setErrors] = useState<{ height?: string; weight?: string }>({})

  const validateInputs = () => {
    const newErrors: { height?: string; weight?: string } = {}
    
    const heightNum = parseFloat(height)
    const weightNum = parseFloat(weight)

    if (!height || heightNum <= 0) {
      newErrors.height = 'Please enter a valid height'
    } else if (unit === 'metric' && (heightNum < 50 || heightNum > 300)) {
      newErrors.height = 'Height must be between 50-300 cm'
    } else if (unit === 'imperial' && (heightNum < 20 || heightNum > 120)) {
      newErrors.height = 'Height must be between 20-120 inches'
    }

    if (!weight || weightNum <= 0) {
      newErrors.weight = 'Please enter a valid weight'
    } else if (unit === 'metric' && (weightNum < 20 || weightNum > 500)) {
      newErrors.weight = 'Weight must be between 20-500 kg'
    } else if (unit === 'imperial' && (weightNum < 44 || weightNum > 1100)) {
      newErrors.weight = 'Weight must be between 44-1100 lbs'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleCalculate = async () => {
    if (!validateInputs()) return

    setIsCalculating(true)
    
    // Simulate calculation delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500))

    const heightNum = parseFloat(height)
    const weightNum = parseFloat(weight)

    const bmi = calculateBMI(weightNum, heightNum, unit)
    const category = getBMICategory(bmi)
    const idealWeightRange = getIdealWeight(heightNum, unit)
    
    const categoryData = BMI_CATEGORIES[category]
    
    let interpretation = ''
    let recommendations: string[] = []

    switch (category) {
      case 'UNDERWEIGHT':
        interpretation = 'Your BMI indicates you are underweight. Consider consulting with a healthcare provider or nutritionist for guidance.'
        recommendations = [
          'Increase calorie intake with nutrient-dense foods',
          'Include healthy fats and proteins in your diet',
          'Consider strength training to build muscle mass',
          'Consult a healthcare provider for personalized advice'
        ]
        break
      case 'NORMAL':
        interpretation = 'Congratulations! Your BMI is in the normal range. Continue maintaining a healthy lifestyle.'
        recommendations = [
          'Maintain regular physical activity (150+ minutes/week)',
          'Follow a balanced diet with fruits and vegetables',
          'Stay hydrated and get adequate sleep',
          'Monitor your weight regularly'
        ]
        break
      case 'OVERWEIGHT':
        interpretation = 'Your BMI indicates you are overweight. Small lifestyle changes can help you reach a healthier weight.'
        recommendations = [
          'Create a moderate caloric deficit (300-500 calories/day)',
          'Increase physical activity gradually',
          'Focus on whole foods and reduce processed foods',
          'Consider consulting a healthcare provider'
        ]
        break
      case 'OBESE':
        interpretation = 'Your BMI indicates obesity. We recommend consulting with a healthcare provider for a comprehensive health plan.'
        recommendations = [
          'Consult a healthcare provider for personalized guidance',
          'Consider working with a registered dietitian',
          'Start with low-impact exercises like walking',
          'Focus on sustainable, long-term lifestyle changes'
        ]
        break
    }

    setResult({
      bmi,
      category,
      idealWeightRange,
      interpretation,
      recommendations
    })
    
    setIsCalculating(false)
  }

  const handleReset = () => {
    setHeight('')
    setWeight('')
    setResult(null)
    setErrors({})
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <Scale className="w-4 h-4" />
            <span>Most Popular Health Tool</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            BMI Calculator
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Calculate your Body Mass Index and get personalized health insights with our professional-grade BMI calculator
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calculator Input */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1"
          >
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2 text-xl">
                  <Calculator className="w-5 h-5 text-blue-600" />
                  <span>Calculate Your BMI</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Unit Toggle */}
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setUnit('metric')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      unit === 'metric'
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600'
                    }`}
                  >
                    Metric (cm/kg)
                  </button>
                  <button
                    onClick={() => setUnit('imperial')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      unit === 'imperial'
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600'
                    }`}
                  >
                    Imperial (in/lbs)
                  </button>
                </div>

                {/* Height Input */}
                <div>
                  <Label htmlFor="height" required>
                    Height ({unit === 'metric' ? 'cm' : 'inches'})
                  </Label>
                  <Input
                    id="height"
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder={unit === 'metric' ? 'e.g., 170' : 'e.g., 67'}
                    error={!!errors.height}
                    className="mt-1"
                  />
                  {errors.height && (
                    <p className="text-red-600 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.height}
                    </p>
                  )}
                </div>

                {/* Weight Input */}
                <div>
                  <Label htmlFor="weight" required>
                    Weight ({unit === 'metric' ? 'kg' : 'lbs'})
                  </Label>
                  <Input
                    id="weight"
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder={unit === 'metric' ? 'e.g., 70' : 'e.g., 154'}
                    error={!!errors.weight}
                    className="mt-1"
                  />
                  {errors.weight && (
                    <p className="text-red-600 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.weight}
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  <Button
                    onClick={handleCalculate}
                    disabled={isCalculating}
                    className="flex-1 h-12"
                  >
                    {isCalculating ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Calculating...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Calculator className="w-4 h-4" />
                        <span>Calculate BMI</span>
                      </div>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleReset}
                    disabled={isCalculating}
                    className="px-4"
                  >
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results Section */}
          <div className="lg:col-span-2">
            {result ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* BMI Result Card */}
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      <div>
                        <BMIGauge bmi={result.bmi} category={result.category} />
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">Your BMI Result</h3>
                          <div className="flex items-center space-x-3">
                            <span className="text-4xl font-bold text-blue-600">{result.bmi.toFixed(1)}</span>
                            <div>
                              <div className="text-lg font-semibold" style={{ color: bmiCategories[result.category.toLowerCase() as keyof typeof bmiCategories].icon }}>
                                {BMI_CATEGORIES[result.category].label}
                              </div>
                              <div className="text-sm text-gray-500">Body Mass Index</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-gray-700 leading-relaxed">{result.interpretation}</p>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Target className="w-4 h-4" />
                          <span>
                            Ideal weight range: {result.idealWeightRange.min.toFixed(0)} - {result.idealWeightRange.max.toFixed(0)} {unit === 'metric' ? 'kg' : 'lbs'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* BMI Chart and Recommendations */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <BarChart3 className="w-5 h-5 text-blue-600" />
                        <span>BMI Categories</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <BMIChart bmi={result.bmi} />
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Heart className="w-5 h-5 text-red-500" />
                        <span>Health Recommendations</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {result.recommendations.map((recommendation, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start space-x-3"
                          >
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 text-sm leading-relaxed">{recommendation}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center h-96"
              >
                <div className="text-center">
                  <Activity className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to Calculate</h3>
                  <p className="text-gray-600">Enter your height and weight to get your BMI result</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Medical Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 max-w-4xl mx-auto"
        >
          <Card className="bg-amber-50 border-amber-200">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <Info className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-amber-900 mb-2">Medical Disclaimer</h4>
                  <p className="text-amber-800 text-sm leading-relaxed">{MEDICAL_DISCLAIMER}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}