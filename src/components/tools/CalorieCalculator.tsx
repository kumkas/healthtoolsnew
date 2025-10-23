'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { MEDICAL_DISCLAIMER } from '@/lib/constants'
import { calculateCalories } from '@/lib/calculations/calorie'
import { CalorieCalculatorResult } from '@/lib/schemas/calorie'
import { 
  Flame, 
  TrendingUp, 
  Target, 
  Info, 
  Zap,
  CheckCircle,
  AlertCircle,
  PieChart,
  Activity
} from 'lucide-react'


const CalorieDonut: React.FC<{ tdee: number; goalCalories: any }> = ({ tdee, goalCalories }) => {
  const radius = 80
  const strokeWidth = 20
  const normalizedRadius = radius - strokeWidth * 2
  const circumference = normalizedRadius * 2 * Math.PI

  return (
    <div className="relative w-48 h-48 mx-auto">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
        {/* Background circle */}
        <circle
          cx="80"
          cy="80"
          r={normalizedRadius}
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="opacity-20"
        />
        
        {/* TDEE circle */}
        <motion.circle
          cx="80"
          cy="80"
          r={normalizedRadius}
          stroke="#F59E0B"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * 0.25}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference * 0.25 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center"
        >
          <div className="text-2xl font-bold text-gray-900 mb-1">{tdee}</div>
          <div className="text-sm text-gray-600 mb-1">TDEE</div>
          <div className="text-xs text-gray-500">calories/day</div>
        </motion.div>
      </div>
    </div>
  )
}


const MacroChart: React.FC<{ macros: CalorieCalculatorResult['macroBreakdown'] }> = ({ macros }) => {
  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-gray-900 mb-4">Macro Distribution</h4>
      
      {/* Protein */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-2"
      >
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">Protein</span>
          <span className="text-sm text-blue-600 font-semibold">{macros.protein.grams}g</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div
            className="bg-blue-500 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${macros.protein.percentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>{macros.protein.percentage}%</span>
          <span>{macros.protein.calories} cal</span>
        </div>
      </motion.div>

      {/* Carbs */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-2"
      >
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">Carbohydrates</span>
          <span className="text-sm text-green-600 font-semibold">{macros.carbs.grams}g</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div
            className="bg-green-500 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${macros.carbs.percentage}%` }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>{macros.carbs.percentage}%</span>
          <span>{macros.carbs.calories} cal</span>
        </div>
      </motion.div>

      {/* Fats */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-2"
      >
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">Fats</span>
          <span className="text-sm text-orange-600 font-semibold">{macros.fat.grams}g</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div
            className="bg-orange-500 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${macros.fat.percentage}%` }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>{macros.fat.percentage}%</span>
          <span>{macros.fat.calories} cal</span>
        </div>
      </motion.div>
    </div>
  )
}

export const CalorieCalculator: React.FC = () => {
  const [age, setAge] = useState('')
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [activityLevel, setActivityLevel] = useState<'sedentary' | 'light' | 'moderate' | 'active' | 'very-active'>('moderate')
  const [goal, setGoal] = useState<'maintain' | 'lose' | 'gain'>('maintain')
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric')
  const [result, setResult] = useState<CalorieCalculatorResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const activityLevels = [
    { value: 'sedentary', label: 'Sedentary', description: 'Little or no exercise' },
    { value: 'light', label: 'Light Activity', description: 'Light exercise 1-3 days/week' },
    { value: 'moderate', label: 'Moderate Activity', description: 'Moderate exercise 3-5 days/week' },
    { value: 'active', label: 'Active', description: 'Hard exercise 6-7 days/week' },
    { value: 'very-active', label: 'Very Active', description: 'Very hard exercise, physical job' }
  ]

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {}
    
    if (!age || parseInt(age) < 15 || parseInt(age) > 100) {
      newErrors.age = 'Age must be between 15-100 years'
    }
    
    if (!height || parseFloat(height) <= 0) {
      newErrors.height = 'Please enter a valid height'
    }
    
    if (!weight || parseFloat(weight) <= 0) {
      newErrors.weight = 'Please enter a valid weight'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleCalculate = async () => {
    if (!validateInputs()) return

    setIsCalculating(true)
    await new Promise(resolve => setTimeout(resolve, 500))

    const ageNum = parseInt(age)
    const heightNum = parseFloat(height)
    const weightNum = parseFloat(weight)

    const calorieData = calculateCalories({
      age: ageNum,
      gender,
      height: heightNum,
      weight: weightNum,
      activityLevel,
      goal,
      unit
    })
    
    setResult(calorieData)
    setIsCalculating(false)
  }

  const handleReset = () => {
    setAge('')
    setHeight('')
    setWeight('')
    setResult(null)
    setErrors({})
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <Flame className="w-4 h-4" />
            <span>Nutrition Planning</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Calorie Calculator
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Calculate your daily calorie needs and macro distribution for optimal health and fitness goals
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
                  <Flame className="w-5 h-5 text-orange-600" />
                  <span>Calculate Your Needs</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Unit Toggle */}
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setUnit('metric')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      unit === 'metric'
                        ? 'bg-white text-orange-600 shadow-sm'
                        : 'text-gray-600'
                    }`}
                  >
                    Metric
                  </button>
                  <button
                    onClick={() => setUnit('imperial')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      unit === 'imperial'
                        ? 'bg-white text-orange-600 shadow-sm'
                        : 'text-gray-600'
                    }`}
                  >
                    Imperial
                  </button>
                </div>

                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="age" required>Age</Label>
                    <Input
                      id="age"
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="25"
                      error={!!errors.age}
                      className="mt-1"
                    />
                    {errors.age && (
                      <p className="text-red-600 text-xs mt-1">{errors.age}</p>
                    )}
                  </div>
                  <div>
                    <Label>Gender</Label>
                    <div className="flex bg-gray-100 rounded-lg p-1 mt-1">
                      <button
                        onClick={() => setGender('male')}
                        className={`flex-1 py-1 px-2 rounded-md text-sm transition-colors ${
                          gender === 'male'
                            ? 'bg-white text-orange-600 shadow-sm'
                            : 'text-gray-600'
                        }`}
                      >
                        Male
                      </button>
                      <button
                        onClick={() => setGender('female')}
                        className={`flex-1 py-1 px-2 rounded-md text-sm transition-colors ${
                          gender === 'female'
                            ? 'bg-white text-orange-600 shadow-sm'
                            : 'text-gray-600'
                        }`}
                      >
                        Female
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="height" required>
                      Height ({unit === 'metric' ? 'cm' : 'inches'})
                    </Label>
                    <Input
                      id="height"
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder={unit === 'metric' ? '170' : '67'}
                      error={!!errors.height}
                      className="mt-1"
                    />
                    {errors.height && (
                      <p className="text-red-600 text-xs mt-1">{errors.height}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="weight" required>
                      Weight ({unit === 'metric' ? 'kg' : 'lbs'})
                    </Label>
                    <Input
                      id="weight"
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder={unit === 'metric' ? '70' : '154'}
                      error={!!errors.weight}
                      className="mt-1"
                    />
                    {errors.weight && (
                      <p className="text-red-600 text-xs mt-1">{errors.weight}</p>
                    )}
                  </div>
                </div>

                {/* Activity Level */}
                <div>
                  <Label>Activity Level</Label>
                  <div className="mt-2 space-y-2">
                    {activityLevels.map((level) => (
                      <label key={level.value} className="flex items-start space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          value={level.value}
                          checked={activityLevel === level.value}
                          onChange={(e) => setActivityLevel(e.target.value as any)}
                          className="w-4 h-4 text-orange-600 mt-0.5"
                        />
                        <div className="flex-1">
                          <span className="text-sm font-medium text-gray-700">{level.label}</span>
                          <p className="text-xs text-gray-500">{level.description}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Goal */}
                <div>
                  <Label>Goal</Label>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {[
                      { value: 'lose', label: 'Lose Weight', icon: TrendingUp },
                      { value: 'maintain', label: 'Maintain', icon: Target },
                      { value: 'gain', label: 'Gain Weight', icon: Zap }
                    ].map((goalOption) => (
                      <button
                        key={goalOption.value}
                        onClick={() => setGoal(goalOption.value as any)}
                        className={`p-3 rounded-lg border-2 transition-all text-center ${
                          goal === goalOption.value
                            ? 'border-orange-500 bg-orange-50 text-orange-700'
                            : 'border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        <goalOption.icon className="w-4 h-4 mx-auto mb-1" />
                        <span className="text-xs font-medium">{goalOption.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  <Button
                    onClick={handleCalculate}
                    disabled={isCalculating}
                    className="flex-1 h-12 bg-orange-600 hover:bg-orange-700"
                  >
                    {isCalculating ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Calculating...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Flame className="w-4 h-4" />
                        <span>Calculate</span>
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
                {/* Calorie Result Card */}
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <CalorieDonut tdee={result.tdee} goalCalories={result.goalCalories} />
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-4">Your Calorie Needs</h3>
                          
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                              <span className="text-sm font-medium text-gray-700">BMR (Base Metabolic Rate)</span>
                              <span className="font-bold text-blue-600">{result.bmr} cal</span>
                            </div>
                            
                            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                              <span className="text-sm font-medium text-gray-700">TDEE (Total Daily Energy)</span>
                              <span className="font-bold text-orange-600">{result.tdee} cal</span>
                            </div>
                            
                            <div className="space-y-2 pt-2">
                              <h4 className="font-medium text-gray-700">Goal-Based Calories:</h4>
                              <div className="grid grid-cols-3 gap-2 text-sm">
                                <div className="text-center p-2 bg-red-50 rounded">
                                  <div className="font-semibold text-red-600">{result.goalCalories.loseWeight}</div>
                                  <div className="text-xs text-gray-600">Lose Weight</div>
                                </div>
                                <div className="text-center p-2 bg-green-50 rounded">
                                  <div className="font-semibold text-green-600">{result.goalCalories.maintain}</div>
                                  <div className="text-xs text-gray-600">Maintain</div>
                                </div>
                                <div className="text-center p-2 bg-blue-50 rounded">
                                  <div className="font-semibold text-blue-600">{result.goalCalories.gainWeight}</div>
                                  <div className="text-xs text-gray-600">Gain Weight</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Macros and Recommendations */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <PieChart className="w-5 h-5 text-orange-600" />
                        <span>Macro Breakdown</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <MacroChart macros={result.macroBreakdown} />
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Target className="w-5 h-5 text-green-500" />
                        <span>Recommendations</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {result.nutritionTips.map((recommendation, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start space-x-3"
                          >
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 text-sm leading-relaxed">{recommendation.tip}</span>
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
                  <Flame className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to Calculate</h3>
                  <p className="text-gray-600">Enter your information to get personalized calorie recommendations</p>
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
                  <h4 className="font-medium text-amber-900 mb-2">Nutritional Disclaimer</h4>
                  <p className="text-amber-800 text-sm leading-relaxed">{MEDICAL_DISCLAIMER}</p>
                  <p className="text-amber-800 text-sm leading-relaxed mt-2">
                    Calorie recommendations are estimates. Consult a registered dietitian for personalized nutrition advice.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default CalorieCalculator