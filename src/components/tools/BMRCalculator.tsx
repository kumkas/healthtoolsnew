'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { MEDICAL_DISCLAIMER } from '@/lib/constants'
import { calculateBMR } from '@/lib/calculations/bmr'
import { BMRCalculatorInput } from '@/lib/schemas/bmr'
import { 
  Activity, 
  Target, 
  Zap,
  CheckCircle
} from 'lucide-react'

export const BMRCalculator: React.FC = () => {
  const [age, setAge] = useState('')
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [activityLevel, setActivityLevel] = useState<'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'extremely_active'>('sedentary')
  const [goal, setGoal] = useState<'maintain' | 'lose_weight' | 'gain_weight' | 'gain_muscle'>('maintain')
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric')
  const [result, setResult] = useState<any>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const activityLevels = [
    { value: 'sedentary', label: 'Sedentary', description: 'Little or no exercise' },
    { value: 'lightly_active', label: 'Light Activity', description: 'Light exercise 1-3 days/week' },
    { value: 'moderately_active', label: 'Moderate Activity', description: 'Moderate exercise 3-5 days/week' },
    { value: 'very_active', label: 'Very Active', description: 'Hard exercise 6-7 days/week' },
    { value: 'extremely_active', label: 'Extra Active', description: 'Very hard exercise, physical job' }
  ]

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {}
    
    if (!age || parseInt(age) < 15 || parseInt(age) > 120) {
      newErrors.age = 'Please enter a valid age (15-120)'
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

    // Convert imperial to metric if needed
    const heightCm = unit === 'imperial' ? heightNum * 2.54 : heightNum
    const weightKg = unit === 'imperial' ? weightNum * 0.453592 : weightNum

    const bmrData = calculateBMR({
      age: ageNum,
      height: heightCm,
      weight: weightKg,
      heightUnit: 'cm',
      weightUnit: 'kg',
      gender,
      activityLevel,
      goal,
      formula: 'mifflin_st_jeor',
      weightChangeRate: 0.5
    } as BMRCalculatorInput)
    
    // Simplify the result structure for the UI
    const simplifiedResult = {
      bmr: bmrData.bmrResult.bmr,
      tdee: bmrData.bmrResult.tdee,
      goalCalories: bmrData.calorieGoals.customGoal,
      method: bmrData.bmrResult.methodDescription
    }
    
    setResult(simplifiedResult)
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            BMR Calculator
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Calculate your Basal Metabolic Rate and daily calorie needs for optimal health and fitness goals
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
                  <Zap className="w-5 h-5 text-blue-600" />
                  <span>Calculate Your BMR</span>
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
                    Metric
                  </button>
                  <button
                    onClick={() => setUnit('imperial')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      unit === 'imperial'
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600'
                    }`}
                  >
                    Imperial
                  </button>
                </div>

                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="Enter age"
                      className={errors.age ? 'border-red-500' : ''}
                    />
                    {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <div className="flex bg-gray-100 rounded-lg p-1 mt-1">
                      <button
                        onClick={() => setGender('male')}
                        className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                          gender === 'male'
                            ? 'bg-white text-blue-600 shadow-sm'
                            : 'text-gray-600'
                        }`}
                      >
                        Male
                      </button>
                      <button
                        onClick={() => setGender('female')}
                        className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                          gender === 'female'
                            ? 'bg-white text-blue-600 shadow-sm'
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
                    <Label htmlFor="height">
                      Height ({unit === 'metric' ? 'cm' : 'inches'})
                    </Label>
                    <Input
                      id="height"
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder={unit === 'metric' ? 'e.g., 170' : 'e.g., 67'}
                      className={errors.height ? 'border-red-500' : ''}
                    />
                    {errors.height && <p className="text-red-500 text-sm mt-1">{errors.height}</p>}
                  </div>
                  <div>
                    <Label htmlFor="weight">
                      Weight ({unit === 'metric' ? 'kg' : 'lbs'})
                    </Label>
                    <Input
                      id="weight"
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder={unit === 'metric' ? 'e.g., 70' : 'e.g., 154'}
                      className={errors.weight ? 'border-red-500' : ''}
                    />
                    {errors.weight && <p className="text-red-500 text-sm mt-1">{errors.weight}</p>}
                  </div>
                </div>

                {/* Activity Level */}
                <div>
                  <Label>Activity Level</Label>
                  <div className="space-y-2 mt-2">
                    {activityLevels.map((level) => (
                      <button
                        key={level.value}
                        onClick={() => setActivityLevel(level.value as any)}
                        className={`w-full text-left p-3 rounded-lg border transition-colors ${
                          activityLevel === level.value
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-medium">{level.label}</div>
                        <div className="text-sm text-gray-600">{level.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Goal */}
                <div>
                  <Label>Goal</Label>
                  <div className="flex bg-gray-100 rounded-lg p-1 mt-2">
                    <button
                      onClick={() => setGoal('lose_weight')}
                      className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                        goal === 'lose_weight'
                          ? 'bg-white text-blue-600 shadow-sm'
                          : 'text-gray-600'
                      }`}
                    >
                      Lose Weight
                    </button>
                    <button
                      onClick={() => setGoal('maintain')}
                      className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                        goal === 'maintain'
                          ? 'bg-white text-blue-600 shadow-sm'
                          : 'text-gray-600'
                      }`}
                    >
                      Maintain
                    </button>
                    <button
                      onClick={() => setGoal('gain_weight')}
                      className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                        goal === 'gain_weight'
                          ? 'bg-white text-blue-600 shadow-sm'
                          : 'text-gray-600'
                      }`}
                    >
                      Gain Weight
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  <Button
                    onClick={() => {
                      handleCalculate()
                      setTimeout(() => {
                        const resultsElement = document.querySelector('.results-panel')
                        if (resultsElement) {
                          resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
                        }
                      }, 600)
                    }}
                    disabled={isCalculating}
                    className="flex-1 h-12 bg-blue-600 hover:bg-blue-700"
                  >
                    {isCalculating ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Calculating...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Zap className="w-4 h-4" />
                        <span>Calculate BMR</span>
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

          {/* Results Panel */}
          <div className="lg:col-span-2 results-panel">
            {result ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="w-5 h-5 text-blue-600" />
                      <span>Your BMR Results</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                        <div className="text-3xl font-bold text-blue-600">{result.bmr}</div>
                        <div className="text-sm text-gray-600">Calories/day</div>
                        <div className="font-medium">Basal Metabolic Rate</div>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl">
                        <div className="text-3xl font-bold text-green-600">{result.tdee}</div>
                        <div className="text-sm text-gray-600">Calories/day</div>
                        <div className="font-medium">Total Daily Energy</div>
                      </div>
                    </div>

                    {result.goalCalories && (
                      <div className="mt-6 p-4 bg-yellow-50 rounded-xl">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-yellow-600">{result.goalCalories}</div>
                          <div className="text-sm text-gray-600">Calories/day for your goal</div>
                        </div>
                      </div>
                    )}

                    <div className="mt-6 space-y-3">
                      <h4 className="font-semibold text-gray-900">Understanding Your Results</h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p>• <strong>BMR:</strong> Calories your body burns at rest</p>
                        <p>• <strong>TDEE:</strong> Total calories including activity</p>
                        <p>• <strong>Goal Calories:</strong> Adjusted for your fitness goal</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
                  <p className="text-gray-600">Enter your information to get your BMR and daily calorie needs</p>
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
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <p className="text-sm text-gray-600">{MEDICAL_DISCLAIMER}</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default BMRCalculator