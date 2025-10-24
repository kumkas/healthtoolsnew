'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Select } from '@/components/ui/Select'
import { calculateHeartRateZones } from '@/lib/calculations/heartRateZone'
import { HeartRateZoneCalculatorInput, HeartRateZoneCalculatorResult } from '@/lib/schemas/heartRateZone'
import { 
  Heart, 
  Target, 
  Activity,
  RotateCcw,
  Loader2,
  AlertCircle
} from 'lucide-react'

interface HeartRateFormData {
  age: number
  restingHeartRate: number
  activityLevel: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'extremely_active'
  goals: ('fat_burn' | 'aerobic' | 'anaerobic' | 'vo2_max' | 'recovery')[]
}

export const HeartRateZoneCalculator: React.FC = () => {
  const [formData, setFormData] = useState<HeartRateFormData>({
    age: 30,
    restingHeartRate: 60,
    activityLevel: 'moderately_active',
    goals: ['fat_burn', 'aerobic']
  })
  const [result, setResult] = useState<HeartRateZoneCalculatorResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const activityLevels = [
    { value: 'sedentary', label: 'Sedentary', description: 'Little to no exercise' },
    { value: 'lightly_active', label: 'Lightly Active', description: 'Light exercise 1-3 days/week' },
    { value: 'moderately_active', label: 'Moderately Active', description: 'Moderate exercise 3-5 days/week' },
    { value: 'very_active', label: 'Very Active', description: 'Hard exercise 6-7 days/week' },
    { value: 'extremely_active', label: 'Extremely Active', description: 'Very hard exercise, physical job' }
  ]

  const goalOptions = [
    { value: 'fat_burn', label: 'Fat Burn', description: 'Weight loss and fat burning' },
    { value: 'aerobic', label: 'Aerobic Fitness', description: 'Cardiovascular endurance' },
    { value: 'anaerobic', label: 'Anaerobic Power', description: 'High intensity performance' },
    { value: 'vo2_max', label: 'VO2 Max', description: 'Maximum oxygen uptake' },
    { value: 'recovery', label: 'Recovery', description: 'Active recovery and warmup' }
  ]

  const handleCalculate = async () => {
    setIsCalculating(true)
    setErrors({})

    try {
      // Validate inputs
      const newErrors: { [key: string]: string } = {}
      
      if (!formData.age || formData.age < 10 || formData.age > 100) {
        newErrors.age = 'Please enter a valid age between 10 and 100'
      }
      
      if (!formData.restingHeartRate || formData.restingHeartRate < 30 || formData.restingHeartRate > 120) {
        newErrors.restingHeartRate = 'Please enter a resting heart rate between 30 and 120 bpm'
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors)
        setIsCalculating(false)
        return
      }

      // Simulate calculation delay for better UX
      await new Promise(resolve => setTimeout(resolve, 800))

      const input: HeartRateZoneCalculatorInput = {
        age: formData.age,
        restingHeartRate: formData.restingHeartRate,
        calculationMethod: 'karvonen',
        activityLevel: formData.activityLevel,
        goals: formData.goals
      }

      const calculationResult = calculateHeartRateZones(input)
      setResult(calculationResult)

      // Scroll to results
      setTimeout(() => {
        const resultsElement = document.getElementById('heart-rate-results')
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)

    } catch (error) {
      setErrors({ general: 'An error occurred during calculation. Please try again.' })
    } finally {
      setIsCalculating(false)
    }
  }

  const handleReset = () => {
    setFormData({
      age: 30,
      restingHeartRate: 60,
      activityLevel: 'moderately_active',
      goals: ['fat_burn', 'aerobic']
    })
    setResult(null)
    setErrors({})
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <Heart className="w-4 h-4" />
            <span>Heart Health & Fitness</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Heart Rate Zone Calculator
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Calculate your personalized heart rate training zones for optimal workout intensity and fitness goals
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
                  <Target className="w-5 h-5 text-red-600" />
                  <span>Calculate Heart Rate Zones</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Age */}
                <div>
                  <Label htmlFor="age" required>
                    Age (years)
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
                    placeholder="Enter your age"
                    min="10"
                    max="100"
                    className={errors.age ? 'border-red-500' : ''}
                  />
                  {errors.age && (
                    <div className="flex items-center space-x-1 text-red-600 text-sm mt-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.age}</span>
                    </div>
                  )}
                </div>

                {/* Resting Heart Rate */}
                <div>
                  <Label htmlFor="rhr" required>
                    Resting Heart Rate (bpm)
                  </Label>
                  <Input
                    id="rhr"
                    type="number"
                    value={formData.restingHeartRate}
                    onChange={(e) => setFormData({ ...formData, restingHeartRate: parseInt(e.target.value) || 0 })}
                    placeholder="Enter resting heart rate"
                    min="30"
                    max="120"
                    className={errors.restingHeartRate ? 'border-red-500' : ''}
                  />
                  {errors.restingHeartRate && (
                    <div className="flex items-center space-x-1 text-red-600 text-sm mt-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.restingHeartRate}</span>
                    </div>
                  )}
                  <p className="text-sm text-gray-500 mt-1">
                    Measure in the morning before getting up
                  </p>
                </div>

                {/* Activity Level */}
                <div>
                  <Label htmlFor="activity-level" required>
                    Activity Level
                  </Label>
                  <Select
                    value={formData.activityLevel}
                    onValueChange={(value) => 
                      setFormData({ ...formData, activityLevel: value as any })
                    }
                  >
                    {activityLevels.map((level) => (
                      <option key={level.value} value={level.value}>
                        {level.label} - {level.description}
                      </option>
                    ))}
                  </Select>
                </div>

                {/* Primary Goals */}
                <div>
                  <Label htmlFor="goals" required>
                    Primary Training Goals
                  </Label>
                  <div className="space-y-2 mt-2">
                    {goalOptions.map((goal) => (
                      <label key={goal.value} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.goals.includes(goal.value as any)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({ 
                                ...formData, 
                                goals: [...formData.goals, goal.value as any] 
                              })
                            } else {
                              setFormData({ 
                                ...formData, 
                                goals: formData.goals.filter(g => g !== goal.value) 
                              })
                            }
                          }}
                          className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                        />
                        <span className="text-sm text-gray-700">
                          <strong>{goal.label}</strong> - {goal.description}
                        </span>
                      </label>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Select one or more training goals
                  </p>
                </div>

                {/* Error Display */}
                {errors.general && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 text-red-600">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm">{errors.general}</span>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  <Button
                    onClick={handleCalculate}
                    disabled={isCalculating}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                  >
                    {isCalculating ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Calculating...
                      </>
                    ) : (
                      <>
                        <Heart className="w-4 h-4 mr-2" />
                        Calculate Zones
                      </>
                    )}
                  </Button>
                  
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    disabled={isCalculating}
                    className="px-4"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results Section */}
          <div className="lg:col-span-2" id="heart-rate-results">
            {result ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Basic Info Header */}
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="text-sm text-gray-500">Maximum Heart Rate:</div>
                    <div className="text-lg font-bold text-red-600">{result.maxHeartRate} bpm</div>
                  </div>
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="text-sm text-gray-500">Heart Rate Reserve:</div>
                    <div className="text-lg font-bold text-red-600">{result.heartRateReserve} bpm</div>
                  </div>
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="text-sm text-gray-500">Training Method:</div>
                    <div className="text-lg font-bold text-red-600">Karvonen Formula</div>
                  </div>
                </div>

                {/* Heart Rate Zones */}
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Activity className="w-5 h-5 text-red-600" />
                      <span>Your Training Zones</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {result.zones.map((zone, index) => (
                        <div key={zone.name} className="bg-gradient-to-r from-gray-50 to-white rounded-lg p-4 border border-gray-200">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className={`w-4 h-4 rounded-full ${getZoneColor(index)}`}></div>
                              <div>
                                <h4 className="font-semibold text-gray-900">{zone.name}</h4>
                                <p className="text-sm text-gray-600">{zone.description}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-gray-900">
                                {zone.minBpm} - {zone.maxBpm} bpm
                              </div>
                              <div className="text-sm text-gray-500">
                                {zone.minPercentage}% - {zone.maxPercentage}% HRR
                              </div>
                            </div>
                          </div>
                          <div className="mt-3">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${getZoneColor(index)}`}
                                style={{ width: `${(zone.maxPercentage - zone.minPercentage) * 1.5}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* BMI Calculator Cross-Reference */}
                <div className="text-center mt-6 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    Want to optimize your fitness further? 
                    <a 
                      href="/tools/general-health/bmi-calculator"
                      className="text-red-600 hover:text-red-800 underline ml-1 font-medium"
                    >
                      Check your BMI
                    </a>
                  </p>
                </div>
              
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center h-96"
              >
                <div className="text-center">
                  <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to Calculate</h3>
                  <p className="text-gray-600">Enter your information to calculate your heart rate training zones</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper function to get zone colors
function getZoneColor(index: number): string {
  const colors = [
    'bg-blue-500',    // Zone 1 - Recovery
    'bg-green-500',   // Zone 2 - Aerobic Base  
    'bg-yellow-500',  // Zone 3 - Aerobic
    'bg-orange-500',  // Zone 4 - Lactate Threshold
    'bg-red-500'      // Zone 5 - VO2 Max
  ]
  return colors[index] || 'bg-gray-500'
}