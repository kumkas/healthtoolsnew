'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { MEDICAL_DISCLAIMER } from '@/lib/constants'
import { calculateHeartRateZones } from '@/lib/calculations/heartRateZone'
import { HeartRateZoneCalculatorInput } from '@/lib/schemas/heartRateZone'
import { 
  Heart, 
  Target, 
  Activity,
  CheckCircle
} from 'lucide-react'

export const HeartRateZoneCalculator: React.FC = () => {
  const [age, setAge] = useState('')
  const [restingHeartRate, setRestingHeartRate] = useState('')
  const [fitnessLevel, setFitnessLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate')
  const [goal, setGoal] = useState<'weight_loss' | 'endurance' | 'performance'>('endurance')
  const [result, setResult] = useState<any>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const fitnessLevels = [
    { value: 'beginner', label: 'Beginner', description: 'New to regular exercise' },
    { value: 'intermediate', label: 'Intermediate', description: 'Regular exercise 2-3 times/week' },
    { value: 'advanced', label: 'Advanced', description: 'Intense training 4+ times/week' }
  ]

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {}
    
    if (!age || parseInt(age) < 15 || parseInt(age) > 100) {
      newErrors.age = 'Please enter a valid age (15-100)'
    }
    
    if (!restingHeartRate || parseInt(restingHeartRate) < 40 || parseInt(restingHeartRate) > 120) {
      newErrors.restingHeartRate = 'Please enter a valid resting heart rate (40-120 bpm)'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleCalculate = async () => {
    if (!validateInputs()) return

    setIsCalculating(true)
    await new Promise(resolve => setTimeout(resolve, 500))

    const ageNum = parseInt(age)
    const rhrNum = parseInt(restingHeartRate)

    const hrZoneData = calculateHeartRateZones({
      age: ageNum,
      restingHeartRate: rhrNum,
      calculationMethod: 'karvonen',
      activityLevel: fitnessLevel === 'beginner' ? 'lightly_active' : 
                    fitnessLevel === 'intermediate' ? 'moderately_active' : 'very_active',
      goals: goal === 'weight_loss' ? ['fat_burn'] : 
             goal === 'endurance' ? ['fat_burn', 'aerobic'] : ['aerobic', 'anaerobic']
    } as HeartRateZoneCalculatorInput)
    
    setResult(hrZoneData)
    setIsCalculating(false)
  }

  const handleReset = () => {
    setAge('')
    setRestingHeartRate('')
    setResult(null)
    setErrors({})
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Heart Rate Zone Calculator
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Calculate your optimal heart rate zones for different training goals and maximize your workout efficiency
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
                  <Heart className="w-5 h-5 text-red-600" />
                  <span>Calculate Heart Rate Zones</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="Enter your age"
                      className={errors.age ? 'border-red-500' : ''}
                    />
                    {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
                  </div>
                  <div>
                    <Label htmlFor="restingHeartRate">Resting Heart Rate (bpm)</Label>
                    <Input
                      id="restingHeartRate"
                      type="number"
                      value={restingHeartRate}
                      onChange={(e) => setRestingHeartRate(e.target.value)}
                      placeholder="e.g., 60"
                      className={errors.restingHeartRate ? 'border-red-500' : ''}
                    />
                    {errors.restingHeartRate && <p className="text-red-500 text-sm mt-1">{errors.restingHeartRate}</p>}
                    <p className="text-sm text-gray-500 mt-1">Measure when you wake up, before getting out of bed</p>
                  </div>
                </div>

                {/* Fitness Level */}
                <div>
                  <Label>Fitness Level</Label>
                  <div className="space-y-2 mt-2">
                    {fitnessLevels.map((level) => (
                      <button
                        key={level.value}
                        onClick={() => setFitnessLevel(level.value as any)}
                        className={`w-full text-left p-3 rounded-lg border transition-colors ${
                          fitnessLevel === level.value
                            ? 'border-red-500 bg-red-50'
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
                  <Label>Training Goal</Label>
                  <div className="flex bg-gray-100 rounded-lg p-1 mt-2">
                    <button
                      onClick={() => setGoal('weight_loss')}
                      className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                        goal === 'weight_loss'
                          ? 'bg-white text-red-600 shadow-sm'
                          : 'text-gray-600'
                      }`}
                    >
                      Fat Burn
                    </button>
                    <button
                      onClick={() => setGoal('endurance')}
                      className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                        goal === 'endurance'
                          ? 'bg-white text-red-600 shadow-sm'
                          : 'text-gray-600'
                      }`}
                    >
                      Endurance
                    </button>
                    <button
                      onClick={() => setGoal('performance')}
                      className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                        goal === 'performance'
                          ? 'bg-white text-red-600 shadow-sm'
                          : 'text-gray-600'
                      }`}
                    >
                      Performance
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
                    className="flex-1 h-12 bg-red-600 hover:bg-red-700"
                  >
                    {isCalculating ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Calculating...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Heart className="w-4 h-4" />
                        <span>Calculate Zones</span>
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
                      <Target className="w-5 h-5 text-red-600" />
                      <span>Your Heart Rate Zones</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="text-center p-4 bg-gradient-to-br from-red-50 to-pink-50 rounded-xl mb-4">
                        <div className="text-3xl font-bold text-red-600">{result.maxHeartRate}</div>
                        <div className="text-sm text-gray-600">Max Heart Rate</div>
                        <div className="font-medium">bpm</div>
                      </div>

                      {result.zones && result.zones.map((zone: any, index: number) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <div className="font-semibold text-gray-900">{zone.name}</div>
                            <div className="text-sm bg-gray-100 px-2 py-1 rounded">{zone.intensity}</div>
                          </div>
                          <div className="text-2xl font-bold text-red-600 mb-1">
                            {zone.minBpm} - {zone.maxBpm} bpm
                          </div>
                          <div className="text-sm text-gray-600 mb-2">
                            {zone.minPercentage}% - {zone.maxPercentage}% of max HR
                          </div>
                          <div className="text-sm text-gray-700">{zone.description}</div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 space-y-3">
                      <h4 className="font-semibold text-gray-900">Understanding Your Zones</h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p>• <strong>Zone 1-2:</strong> Fat burning and recovery</p>
                        <p>• <strong>Zone 3:</strong> Aerobic base building</p>
                        <p>• <strong>Zone 4-5:</strong> Performance and anaerobic training</p>
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
                  <p className="text-gray-600">Enter your information to get your heart rate training zones</p>
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

export default HeartRateZoneCalculator