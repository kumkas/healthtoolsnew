'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { MEDICAL_DISCLAIMER } from '@/lib/constants'
import { calculateOptimalSleep, analyzeSleepQuality } from '@/lib/calculations/sleep'
import { 
  Moon, 
  Sun, 
  Clock, 
  Bed, 
  Info, 
  Star,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Zap,
  Brain
} from 'lucide-react'

interface SleepResult {
  optimalBedtimes: string[]
  optimalWakeTime: string
  sleepCycles: number
  totalSleepHours: number
  sleepQuality: 'excellent' | 'good' | 'fair' | 'poor'
  recommendations: string[]
  insights: string[]
}

const SleepCycleVisualization: React.FC<{ cycles: number; quality: string }> = ({ cycles, quality }) => {
  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'excellent': return '#10B981'
      case 'good': return '#3B82F6'
      case 'fair': return '#F59E0B'
      case 'poor': return '#EF4444'
      default: return '#6B7280'
    }
  }

  const color = getQualityColor(quality)

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h4 className="font-semibold text-gray-900 mb-4">Sleep Cycles Visualization</h4>
        
        {/* Sleep Cycles Display */}
        <div className="flex justify-center items-center space-x-2 mb-6">
          {Array.from({ length: cycles }, (_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
              className="relative"
            >
              <div 
                className="w-12 h-12 rounded-full border-4 flex items-center justify-center"
                style={{ 
                  borderColor: color,
                  backgroundColor: `${color}20`
                }}
              >
                <Moon className="w-6 h-6" style={{ color }} />
              </div>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-600">
                {i + 1}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sleep Quality Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-50 rounded-lg p-4"
        >
          <div className="flex items-center justify-center space-x-3 mb-2">
            <div 
              className="w-6 h-6 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span className="font-medium capitalize" style={{ color }}>
              {quality} Sleep Quality
            </span>
          </div>
          <p className="text-sm text-gray-600">
            {cycles} complete sleep cycles × 90 minutes each
          </p>
        </motion.div>
      </div>
    </div>
  )
}

const SleepSchedule: React.FC<{ bedtimes: string[]; wakeTime: string }> = ({ bedtimes, wakeTime }) => {
  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-gray-900 mb-4">Optimal Sleep Schedule</h4>
      
      {/* Wake Time */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg p-4"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full flex items-center justify-center">
            <Sun className="w-5 h-5 text-white" />
          </div>
          <div>
            <h5 className="font-medium text-orange-900">Wake Up Time</h5>
            <p className="text-2xl font-bold text-orange-700">{wakeTime}</p>
          </div>
        </div>
      </motion.div>

      {/* Bedtimes */}
      <div>
        <h5 className="font-medium text-gray-700 mb-3">Recommended Bedtimes</h5>
        <div className="space-y-2">
          {bedtimes.map((bedtime, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-gradient-to-r ${
                index === 0 
                  ? 'from-blue-50 to-indigo-50 border-blue-200' 
                  : 'from-purple-50 to-blue-50 border-purple-200'
              } border rounded-lg p-3`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 ${
                    index === 0 ? 'bg-blue-500' : 'bg-purple-500'
                  } rounded-full flex items-center justify-center`}>
                    <Moon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{bedtime}</p>
                    <p className="text-xs text-gray-600">
                      {index === 0 ? 'Best option' : 'Alternative'}
                    </p>
                  </div>
                </div>
                {index === 0 && (
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export const SleepCalculator: React.FC = () => {
  const [calculationType, setCalculationType] = useState<'wakeTime' | 'bedTime'>('wakeTime')
  const [wakeTime, setWakeTime] = useState('')
  const [bedTime, setBedTime] = useState('')
  const [age, setAge] = useState('')
  const [result, setResult] = useState<SleepResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [errors, setErrors] = useState<{ time?: string; age?: string }>({})

  const validateInputs = () => {
    const newErrors: { time?: string; age?: string } = {}
    
    if (calculationType === 'wakeTime' && !wakeTime) {
      newErrors.time = 'Please enter your desired wake time'
    }

    if (calculationType === 'bedTime' && !bedTime) {
      newErrors.time = 'Please enter your desired bedtime'
    }

    if (!age) {
      newErrors.age = 'Please enter your age'
    } else {
      const ageNum = parseInt(age)
      if (ageNum < 1 || ageNum > 120) {
        newErrors.age = 'Age must be between 1-120 years'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleCalculate = async () => {
    if (!validateInputs()) return

    setIsCalculating(true)
    await new Promise(resolve => setTimeout(resolve, 500))

    const ageNum = parseInt(age)
    
    let sleepResult: SleepResult

    if (calculationType === 'wakeTime') {
      sleepResult = calculateOptimalSleep(wakeTime, 'wake', ageNum)
    } else {
      sleepResult = calculateOptimalSleep(bedTime, 'bed', ageNum)
    }

    const qualityAnalysis = analyzeSleepQuality(sleepResult.totalSleepHours, ageNum)
    
    setResult({
      ...sleepResult,
      sleepQuality: qualityAnalysis.quality,
      insights: qualityAnalysis.insights
    })
    
    setIsCalculating(false)
  }

  const handleReset = () => {
    setWakeTime('')
    setBedTime('')
    setAge('')
    setResult(null)
    setErrors({})
  }

  const getSleepQualityIcon = (quality: string) => {
    switch (quality) {
      case 'excellent': return <Star className="w-5 h-5 text-green-500" />
      case 'good': return <CheckCircle className="w-5 h-5 text-blue-500" />
      case 'fair': return <Clock className="w-5 h-5 text-yellow-500" />
      case 'poor': return <AlertCircle className="w-5 h-5 text-red-500" />
      default: return <Info className="w-5 h-5 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <Moon className="w-4 h-4" />
            <span>Sleep Optimization</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Sleep Calculator
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Find your optimal bedtime and wake time based on natural sleep cycles for better rest and recovery
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
                  <Bed className="w-5 h-5 text-indigo-600" />
                  <span>Optimize Your Sleep</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Calculation Type Selector */}
                <div>
                  <Label>What would you like to calculate?</Label>
                  <div className="mt-2 space-y-2">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        value="wakeTime"
                        checked={calculationType === 'wakeTime'}
                        onChange={(e) => setCalculationType(e.target.value as any)}
                        className="w-4 h-4 text-indigo-600"
                      />
                      <span className="text-sm">Find best bedtimes for my wake time</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        value="bedTime"
                        checked={calculationType === 'bedTime'}
                        onChange={(e) => setCalculationType(e.target.value as any)}
                        className="w-4 h-4 text-indigo-600"
                      />
                      <span className="text-sm">Find best wake times for my bedtime</span>
                    </label>
                  </div>
                </div>

                {/* Time Input */}
                {calculationType === 'wakeTime' ? (
                  <div>
                    <Label htmlFor="wakeTime" required>
                      Desired Wake Time
                    </Label>
                    <Input
                      id="wakeTime"
                      type="time"
                      value={wakeTime}
                      onChange={(e) => setWakeTime(e.target.value)}
                      error={!!errors.time}
                      className="mt-1"
                    />
                    {errors.time && (
                      <p className="text-red-600 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.time}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">When do you want to wake up?</p>
                  </div>
                ) : (
                  <div>
                    <Label htmlFor="bedTime" required>
                      Desired Bedtime
                    </Label>
                    <Input
                      id="bedTime"
                      type="time"
                      value={bedTime}
                      onChange={(e) => setBedTime(e.target.value)}
                      error={!!errors.time}
                      className="mt-1"
                    />
                    {errors.time && (
                      <p className="text-red-600 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.time}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">When do you want to go to bed?</p>
                  </div>
                )}

                {/* Age Input */}
                <div>
                  <Label htmlFor="age" required>
                    Age (years)
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="e.g., 30"
                    error={!!errors.age}
                    className="mt-1"
                  />
                  {errors.age && (
                    <p className="text-red-600 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.age}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">Age affects optimal sleep duration</p>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  <Button
                    onClick={handleCalculate}
                    disabled={isCalculating}
                    className="flex-1 h-12 bg-indigo-600 hover:bg-indigo-700"
                  >
                    {isCalculating ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Calculating...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Moon className="w-4 h-4" />
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

                {/* Sleep Facts */}
                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mt-6">
                  <div className="flex items-start space-x-3">
                    <Brain className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-medium text-indigo-900 mb-1">Sleep Cycle Facts</h4>
                      <ul className="text-xs text-indigo-800 space-y-1">
                        <li>• Complete sleep cycles last 90 minutes</li>
                        <li>• Waking between cycles feels more refreshing</li>
                        <li>• Most adults need 5-6 complete cycles</li>
                        <li>• Quality matters more than quantity</li>
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
                {/* Sleep Analysis Card */}
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <SleepCycleVisualization 
                          cycles={result.sleepCycles} 
                          quality={result.sleepQuality}
                        />
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-4">Your Sleep Analysis</h3>
                          
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg">
                              <span className="text-sm font-medium text-gray-700">Total Sleep</span>
                              <span className="font-bold text-indigo-600">{result.totalSleepHours} hours</span>
                            </div>
                            
                            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                              <span className="text-sm font-medium text-gray-700">Sleep Cycles</span>
                              <span className="font-bold text-purple-600">{result.sleepCycles} cycles</span>
                            </div>
                            
                            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                              <div className="flex items-center space-x-2">
                                {getSleepQualityIcon(result.sleepQuality)}
                                <span className="text-sm font-medium text-gray-700">Sleep Quality</span>
                              </div>
                              <span className="font-bold text-blue-600 capitalize">{result.sleepQuality}</span>
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
                        <Clock className="w-5 h-5 text-indigo-600" />
                        <span>Sleep Schedule</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <SleepSchedule 
                        bedtimes={result.optimalBedtimes} 
                        wakeTime={result.optimalWakeTime}
                      />
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Sparkles className="w-5 h-5 text-purple-500" />
                        <span>Sleep Recommendations</span>
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
                            <Zap className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 text-sm leading-relaxed">{recommendation}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Sleep Insights */}
                {result.insights.length > 0 && (
                  <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Brain className="w-5 h-5 text-green-500" />
                        <span>Personalized Insights</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        {result.insights.map((insight, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-green-50 border border-green-200 rounded-lg p-4"
                          >
                            <p className="text-green-800 text-sm leading-relaxed">{insight}</p>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center h-96"
              >
                <div className="text-center">
                  <Moon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to Optimize</h3>
                  <p className="text-gray-600">Enter your sleep preferences to get personalized recommendations</p>
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
                  <h4 className="font-medium text-amber-900 mb-2">Sleep Health Disclaimer</h4>
                  <p className="text-amber-800 text-sm leading-relaxed">{MEDICAL_DISCLAIMER}</p>
                  <p className="text-amber-800 text-sm leading-relaxed mt-2">
                    Sleep recommendations are general guidelines. Consult a sleep specialist for persistent sleep issues.
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