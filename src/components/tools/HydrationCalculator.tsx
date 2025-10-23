'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { MEDICAL_DISCLAIMER } from '@/lib/constants'
import { calculateHydration } from '@/lib/calculations/hydration'
import { HydrationCalculatorInput } from '@/lib/schemas/hydration'
import { 
  Droplets, 
  Sun, 
  Activity, 
  Clock, 
  Info, 
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Target
} from 'lucide-react'

interface HydrationResult {
  dailyIntake: {
    liters: number
    ounces: number
    cups: number
  }
  hourlyIntake: {
    liters: number
    ounces: number
  }
  factors: string[]
  schedule: Array<{
    time: string
    amount: string
    description: string
  }>
  recommendations: string[]
  hydrationTips: string[]
}

const WaterWave: React.FC<{ percentage: number }> = ({ percentage }) => {
  return (
    <div className="relative w-48 h-48 mx-auto">
      <div className="w-full h-full rounded-full border-4 border-blue-200 bg-gradient-to-b from-blue-50 to-blue-100 overflow-hidden relative">
        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-500 to-blue-400"
          initial={{ height: 0 }}
          animate={{ height: `${percentage}%` }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          {/* Wave animation */}
          <div className="absolute top-0 left-0 right-0 h-4">
            <motion.div
              className="absolute inset-0 bg-blue-300 opacity-50"
              animate={{
                transform: ['translateX(-100%)', 'translateX(100%)']
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                borderRadius: '50% 50% 0 0',
                width: '200%'
              }}
            />
          </div>
        </motion.div>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="text-center text-white drop-shadow-lg"
          >
            <Droplets className="w-8 h-8 mx-auto mb-2" />
            <div className="text-xs font-medium">Daily Goal</div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}


const HydrationSchedule: React.FC<{ schedule: { timing: string; amount: string; reason: string }[] }> = ({ schedule }) => {
  return (
    <div className="space-y-3">
      <h4 className="font-semibold text-gray-900 mb-4">Hydration Schedule</h4>
      {schedule.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg"
        >
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
            {item.timing}
          </div>
          <div className="flex-1">
            <div className="font-medium text-gray-900">{item.amount}</div>
            <div className="text-sm text-gray-600">{item.reason}</div>
          </div>
          <Droplets className="w-5 h-5 text-blue-500" />
        </motion.div>
      ))}
    </div>
  )
}


export const HydrationCalculator: React.FC = () => {
  const [weight, setWeight] = useState('')
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric')
  const [activityLevel, setActivityLevel] = useState<'low' | 'moderate' | 'high'>('moderate')
  const [climate, setClimate] = useState<'cool' | 'moderate' | 'hot'>('moderate')
  const [pregnancy, setPregnancy] = useState<'none' | 'pregnant' | 'breastfeeding'>('none')
  const [age, setAge] = useState('')
  const [result, setResult] = useState<HydrationResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [errors, setErrors] = useState<{ weight?: string; age?: string }>({})

  const validateInputs = () => {
    const newErrors: { weight?: string; age?: string } = {}
    
    if (!weight || parseFloat(weight) <= 0) {
      newErrors.weight = 'Please enter a valid weight'
    }
    
    if (!age || parseInt(age) < 1 || parseInt(age) > 120) {
      newErrors.age = 'Age must be between 1-120 years'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleCalculate = async () => {
    if (!validateInputs()) return

    setIsCalculating(true)
    await new Promise(resolve => setTimeout(resolve, 500))

    const weightNum = parseFloat(weight)
    const ageNum = parseInt(age)

    const hydrationData = calculateHydration({
      weight: weightNum,
      height: 170, // Default height since it's not collected in this component
      age: ageNum,
      gender: 'male' as const, // Default gender since it's not collected in this component
      activityLevel: activityLevel === 'low' ? 'sedentary' : activityLevel === 'moderate' ? 'moderate' : 'active',
      climate: climate === 'cool' ? 'cool' : climate === 'moderate' ? 'temperate' : 'hot',
      exerciseDuration: 0, // Default values
      exerciseIntensity: 'moderate' as const,
      sweatRate: 'normal' as const,
      healthConditions: ['none'] as const,
      pregnancyBreastfeeding: pregnancy,
      caffeine: 0,
      alcohol: 0,
      currentIntake: undefined
    })
    
    setResult(hydrationData)
    setIsCalculating(false)
  }

  const handleReset = () => {
    setWeight('')
    setAge('')
    setResult(null)
    setErrors({})
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <Droplets className="w-4 h-4" />
            <span>Hydration Health</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Hydration Calculator
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Calculate your personalized daily water intake needs based on your lifestyle, activity level, and health factors
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
                  <Droplets className="w-5 h-5 text-blue-600" />
                  <span>Calculate Hydration Needs</span>
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
                    Metric (kg)
                  </button>
                  <button
                    onClick={() => setUnit('imperial')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      unit === 'imperial'
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600'
                    }`}
                  >
                    Imperial (lbs)
                  </button>
                </div>

                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4">
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
                  <div>
                    <Label htmlFor="age" required>Age</Label>
                    <Input
                      id="age"
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="30"
                      error={!!errors.age}
                      className="mt-1"
                    />
                    {errors.age && (
                      <p className="text-red-600 text-xs mt-1">{errors.age}</p>
                    )}
                  </div>
                </div>

                {/* Activity Level */}
                <div>
                  <Label className="flex items-center space-x-2">
                    <Activity className="w-4 h-4" />
                    <span>Activity Level</span>
                  </Label>
                  <div className="mt-2 grid grid-cols-1 gap-2">
                    {[
                      { value: 'low', label: 'Low Activity', description: 'Minimal exercise, desk job' },
                      { value: 'moderate', label: 'Moderate Activity', description: 'Regular exercise 3-4 times/week' },
                      { value: 'high', label: 'High Activity', description: 'Intense exercise, physical job' }
                    ].map((level) => (
                      <label key={level.value} className="flex items-start space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          value={level.value}
                          checked={activityLevel === level.value}
                          onChange={(e) => setActivityLevel(e.target.value as any)}
                          className="w-4 h-4 text-blue-600 mt-0.5"
                        />
                        <div className="flex-1">
                          <span className="text-sm font-medium text-gray-700">{level.label}</span>
                          <p className="text-xs text-gray-500">{level.description}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Climate */}
                <div>
                  <Label className="flex items-center space-x-2">
                    <Sun className="w-4 h-4" />
                    <span>Climate</span>
                  </Label>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {[
                      { value: 'cool', label: 'Cool', icon: '❄️' },
                      { value: 'moderate', label: 'Moderate', icon: '🌤️' },
                      { value: 'hot', label: 'Hot', icon: '🌞' }
                    ].map((climateOption) => (
                      <button
                        key={climateOption.value}
                        onClick={() => setClimate(climateOption.value as any)}
                        className={`p-3 rounded-lg border-2 transition-all text-center ${
                          climate === climateOption.value
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-lg mb-1">{climateOption.icon}</div>
                        <span className="text-xs font-medium">{climateOption.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Special Conditions */}
                <div>
                  <Label>Special Conditions</Label>
                  <div className="mt-2 space-y-2">
                    {[
                      { value: 'none', label: 'None' },
                      { value: 'pregnant', label: 'Pregnant' },
                      { value: 'breastfeeding', label: 'Breastfeeding' }
                    ].map((condition) => (
                      <label key={condition.value} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          value={condition.value}
                          checked={pregnancy === condition.value}
                          onChange={(e) => setPregnancy(e.target.value as any)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-sm font-medium text-gray-700">{condition.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  <Button
                    onClick={handleCalculate}
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
                        <Droplets className="w-4 h-4" />
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

                {/* Hydration Tips */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-medium text-blue-900 mb-1">Quick Tips</h4>
                      <ul className="text-xs text-blue-800 space-y-1">
                        <li>• Start your day with a glass of water</li>
                        <li>• Drink before you feel thirsty</li>
                        <li>• Monitor urine color (pale yellow is ideal)</li>
                        <li>• Increase intake during exercise and hot weather</li>
                      </ul>
                    </div>
                  </div>
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
                {/* Hydration Result Card */}
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <WaterWave percentage={75} />
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-4">Your Hydration Needs</h3>
                          
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                              <span className="text-sm font-medium text-gray-700">Daily Water Intake</span>
                              <span className="font-bold text-blue-600">{result.totalDailyNeed.toFixed(1)} L</span>
                            </div>
                            
                            <div className="flex items-center justify-between p-3 bg-cyan-50 rounded-lg">
                              <span className="text-sm font-medium text-gray-700">In Ounces</span>
                              <span className="font-bold text-cyan-600">{Math.round(result.totalDailyNeedOz)} oz</span>
                            </div>
                            
                            <div className="flex items-center justify-between p-3 bg-teal-50 rounded-lg">
                              <span className="text-sm font-medium text-gray-700">In Cups (8 oz)</span>
                              <span className="font-bold text-teal-600">{Math.round(result.totalDailyNeedCups)} cups</span>
                            </div>
                            
                            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                              <span className="text-sm font-medium text-gray-700">Hourly Target</span>
                              <span className="font-bold text-green-600">{Math.round(result.hourlyIntake.ounces)} oz/hr</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Schedule and Recommendations */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Clock className="w-5 h-5 text-blue-600" />
                        <span>Hydration Schedule</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <HydrationSchedule schedule={result.recommendations} />
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Target className="w-5 h-5 text-green-500" />
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
                            <span className="text-gray-700 text-sm leading-relaxed">{recommendation.reason}</span>
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
                  <Droplets className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to Calculate</h3>
                  <p className="text-gray-600">Enter your information to get personalized hydration recommendations</p>
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
                  <h4 className="font-medium text-amber-900 mb-2">Hydration Disclaimer</h4>
                  <p className="text-amber-800 text-sm leading-relaxed">{MEDICAL_DISCLAIMER}</p>
                  <p className="text-amber-800 text-sm leading-relaxed mt-2">
                    Individual hydration needs may vary. Consult healthcare providers for specific medical conditions affecting fluid balance.
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

export default HydrationCalculator