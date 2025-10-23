'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { MEDICAL_DISCLAIMER } from '@/lib/constants'
import { calculateDueDateFromInput, getCurrentPregnancyInfo } from '@/lib/calculations/pregnancy'
import { 
  Calendar, 
  Baby, 
  Clock, 
  Info, 
  Star,
  Heart,
  CheckCircle,
  AlertCircle,
  Gift,
  Sparkles
} from 'lucide-react'

interface DueDateResult {
  dueDate: Date
  currentWeek: number
  currentDay: number
  trimester: number
  conception: Date
  daysUntilDue: number
  currentDevelopment: string
  milestones: {
    date: Date
    description: string
    week: number
  }[]
  recommendations: string[]
}

const PregnancyTimeline: React.FC<{ result: DueDateResult }> = ({ result }) => {
  const trimesters = [
    { name: '1st Trimester', weeks: '1-12', color: '#F59E0B', description: 'Foundation & Early Development' },
    { name: '2nd Trimester', weeks: '13-27', color: '#10B981', description: 'Growth & Movement' },
    { name: '3rd Trimester', weeks: '28-40', color: '#3B82F6', description: 'Final Preparation' },
  ]

  const currentTrimester = result.trimester
  const progressPercentage = (result.currentWeek / 40) * 100

  return (
    <div className="space-y-6">
      <h4 className="font-semibold text-gray-900 mb-4">Pregnancy Timeline</h4>
      
      {/* Progress Bar */}
      <div className="relative">
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div
            className="bg-gradient-to-r from-pink-500 to-purple-500 h-3 rounded-full relative"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <div className="absolute right-0 top-0 transform translate-x-1/2 -translate-y-1/2">
              <div className="w-6 h-6 bg-white border-4 border-pink-500 rounded-full flex items-center justify-center">
                <Baby className="w-3 h-3 text-pink-500" />
              </div>
            </div>
          </motion.div>
        </div>
        <div className="text-center mt-2 text-sm text-gray-600">
          Week {result.currentWeek} of 40
        </div>
      </div>

      {/* Trimesters */}
      <div className="space-y-3">
        {trimesters.map((trimester, index) => {
          const trimesterNum = index + 1
          const isActive = currentTrimester === trimesterNum
          const isCompleted = currentTrimester > trimesterNum
          
          return (
            <motion.div
              key={trimester.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center space-x-4 p-4 rounded-lg border-2 transition-all ${
                isActive 
                  ? 'border-current bg-current/5 shadow-sm' 
                  : isCompleted
                    ? 'border-green-200 bg-green-50'
                    : 'border-gray-200 bg-white'
              }`}
              style={{ 
                borderColor: isActive ? trimester.color : undefined,
                color: isActive ? trimester.color : undefined
              }}
            >
              <div className="flex-shrink-0">
                {isCompleted ? (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                ) : (
                  <div 
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      isActive ? 'border-current' : 'border-gray-300'
                    }`}
                    style={{ borderColor: isActive ? trimester.color : undefined }}
                  >
                    {isActive && <div className="w-3 h-3 rounded-full bg-current" />}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className={`font-medium ${isActive ? 'text-current' : isCompleted ? 'text-green-700' : 'text-gray-700'}`}>
                  {trimester.name}
                </div>
                <div className={`text-sm ${isActive ? 'text-current opacity-80' : isCompleted ? 'text-green-600' : 'text-gray-500'}`}>
                  {trimester.description} • Weeks {trimester.weeks}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

const BabyDevelopment: React.FC<{ result: DueDateResult }> = ({ result }) => {
  const developmentStages = [
    { week: 4, size: "Poppy seed", length: "2mm", development: "Neural tube forming" },
    { week: 8, size: "Raspberry", length: "16mm", development: "All major organs present" },
    { week: 12, size: "Lime", length: "6cm", development: "Reflexes developing" },
    { week: 16, size: "Avocado", length: "11cm", development: "Gender may be visible" },
    { week: 20, size: "Banana", length: "16cm", development: "Hearing developing" },
    { week: 24, size: "Corn", length: "21cm", development: "Viable outside womb" },
    { week: 28, size: "Eggplant", length: "25cm", development: "Eyes can open" },
    { week: 32, size: "Jicama", length: "28cm", development: "Bones hardening" },
    { week: 36, size: "Romaine", length: "32cm", development: "Lungs nearly mature" },
    { week: 40, size: "Watermelon", length: "36cm", development: "Ready for birth!" },
  ]

  const getCurrentStage = () => {
    const currentWeek = result.currentWeek
    return developmentStages.reduce((prev, current) => 
      (current.week <= currentWeek) ? current : prev
    )
  }

  const currentStage = getCurrentStage()

  return (
    <div className="text-center space-y-4">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        <div className="w-32 h-32 mx-auto bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center mb-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-200/30 to-purple-200/30 rounded-full animate-pulse" />
          <Baby className="w-16 h-16 text-pink-500 relative z-10" />
          <Sparkles className="absolute top-4 right-4 w-6 h-6 text-purple-400 animate-pulse" />
        </div>
      </motion.div>
      
      <div className="space-y-2">
        <h4 className="text-lg font-semibold text-gray-900">Week {result.currentWeek}</h4>
        <p className="text-2xl font-bold text-pink-600">Size of a {currentStage.size}</p>
        <p className="text-sm text-gray-600">Approximately {currentStage.length} long</p>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mt-4">
          <p className="text-purple-800 text-sm font-medium">{currentStage.development}</p>
        </div>
      </div>
    </div>
  )
}

export const DueDateCalculator: React.FC = () => {
  const [lastMenstrualPeriod, setLastMenstrualPeriod] = useState('')
  const [calculationMethod, setCalculationMethod] = useState<'lmp' | 'conception' | 'ultrasound'>('lmp')
  const [conceptionDate, setConceptionDate] = useState('')
  const [ultrasoundDate, setUltrasoundDate] = useState('')
  const [ultrasoundWeeks, setUltrasoundWeeks] = useState('')
  const [result, setResult] = useState<DueDateResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [errors, setErrors] = useState<{ date?: string; weeks?: string }>({})

  const validateInputs = () => {
    const newErrors: { date?: string; weeks?: string } = {}
    
    if (calculationMethod === 'lmp') {
      if (!lastMenstrualPeriod) {
        newErrors.date = 'Please enter your last menstrual period date'
      } else {
        const lmpDate = new Date(lastMenstrualPeriod)
        const today = new Date()
        const daysDiff = (today.getTime() - lmpDate.getTime()) / (1000 * 3600 * 24)
        if (daysDiff < 0) {
          newErrors.date = 'Date cannot be in the future'
        } else if (daysDiff > 300) {
          newErrors.date = 'Date seems too far in the past'
        }
      }
    } else if (calculationMethod === 'conception') {
      if (!conceptionDate) {
        newErrors.date = 'Please enter your conception date'
      }
    } else if (calculationMethod === 'ultrasound') {
      if (!ultrasoundDate) {
        newErrors.date = 'Please enter your ultrasound date'
      }
      if (!ultrasoundWeeks) {
        newErrors.weeks = 'Please enter gestational weeks from ultrasound'
      } else {
        const weeks = parseFloat(ultrasoundWeeks)
        if (weeks < 4 || weeks > 42) {
          newErrors.weeks = 'Weeks must be between 4-42'
        }
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleCalculate = async () => {
    if (!validateInputs()) return

    setIsCalculating(true)
    await new Promise(resolve => setTimeout(resolve, 500))

    let baseDate: Date
    let gestationalAge = 0

    if (calculationMethod === 'lmp') {
      baseDate = new Date(lastMenstrualPeriod)
    } else if (calculationMethod === 'conception') {
      baseDate = new Date(conceptionDate)
      gestationalAge = 14 // Add 2 weeks for conception date
    } else {
      baseDate = new Date(ultrasoundDate)
      gestationalAge = parseFloat(ultrasoundWeeks) * 7 // Convert to days
    }

    const dueDateInfo = calculateDueDateFromInput(baseDate, calculationMethod, gestationalAge)
    const pregnancyInfo = getCurrentPregnancyInfo(dueDateInfo.currentWeek)
    
    const result: DueDateResult = {
      ...dueDateInfo,
      currentDevelopment: pregnancyInfo.development,
      milestones: pregnancyInfo.milestones,
      recommendations: pregnancyInfo.recommendations
    }
    
    setResult(result)
    setIsCalculating(false)
  }

  const handleReset = () => {
    setLastMenstrualPeriod('')
    setConceptionDate('')
    setUltrasoundDate('')
    setUltrasoundWeeks('')
    setResult(null)
    setErrors({})
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 bg-pink-100 text-pink-800 px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <Baby className="w-4 h-4" />
            <span>Pregnancy Journey</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Due Date Calculator
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Calculate your baby's due date and track your pregnancy journey with personalized insights and milestones
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
                  <Calendar className="w-5 h-5 text-pink-600" />
                  <span>Calculate Due Date</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Calculation Method Selector */}
                <div>
                  <Label>Calculation Method</Label>
                  <div className="mt-2 space-y-2">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        value="lmp"
                        checked={calculationMethod === 'lmp'}
                        onChange={(e) => setCalculationMethod(e.target.value as any)}
                        className="w-4 h-4 text-pink-600"
                      />
                      <span className="text-sm">Last Menstrual Period</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        value="conception"
                        checked={calculationMethod === 'conception'}
                        onChange={(e) => setCalculationMethod(e.target.value as any)}
                        className="w-4 h-4 text-pink-600"
                      />
                      <span className="text-sm">Conception Date</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        value="ultrasound"
                        checked={calculationMethod === 'ultrasound'}
                        onChange={(e) => setCalculationMethod(e.target.value as any)}
                        className="w-4 h-4 text-pink-600"
                      />
                      <span className="text-sm">Ultrasound Results</span>
                    </label>
                  </div>
                </div>

                {/* Date Inputs */}
                {calculationMethod === 'lmp' && (
                  <div>
                    <Label htmlFor="lmp" required>
                      Last Menstrual Period (First Day)
                    </Label>
                    <Input
                      id="lmp"
                      type="date"
                      value={lastMenstrualPeriod}
                      onChange={(e) => setLastMenstrualPeriod(e.target.value)}
                      error={!!errors.date}
                      className="mt-1"
                    />
                    {errors.date && (
                      <p className="text-red-600 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.date}
                      </p>
                    )}
                  </div>
                )}

                {calculationMethod === 'conception' && (
                  <div>
                    <Label htmlFor="conception" required>
                      Conception Date
                    </Label>
                    <Input
                      id="conception"
                      type="date"
                      value={conceptionDate}
                      onChange={(e) => setConceptionDate(e.target.value)}
                      error={!!errors.date}
                      className="mt-1"
                    />
                    {errors.date && (
                      <p className="text-red-600 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.date}
                      </p>
                    )}
                  </div>
                )}

                {calculationMethod === 'ultrasound' && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="ultrasound" required>
                        Ultrasound Date
                      </Label>
                      <Input
                        id="ultrasound"
                        type="date"
                        value={ultrasoundDate}
                        onChange={(e) => setUltrasoundDate(e.target.value)}
                        error={!!errors.date}
                        className="mt-1"
                      />
                      {errors.date && (
                        <p className="text-red-600 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.date}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="weeks" required>
                        Gestational Weeks (from ultrasound)
                      </Label>
                      <Input
                        id="weeks"
                        type="number"
                        step="0.1"
                        value={ultrasoundWeeks}
                        onChange={(e) => setUltrasoundWeeks(e.target.value)}
                        placeholder="e.g., 12.3"
                        error={!!errors.weeks}
                        className="mt-1"
                      />
                      {errors.weeks && (
                        <p className="text-red-600 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.weeks}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  <Button
                    onClick={handleCalculate}
                    disabled={isCalculating}
                    className="flex-1 h-12 bg-pink-600 hover:bg-pink-700"
                  >
                    {isCalculating ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Calculating...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
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
                {/* Due Date Result Card */}
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <BabyDevelopment result={result} />
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-4">Your Pregnancy Details</h3>
                          
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-pink-50 rounded-lg">
                              <span className="text-sm font-medium text-gray-700">Due Date</span>
                              <span className="font-bold text-pink-600">{formatDate(result.dueDate)}</span>
                            </div>
                            
                            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                              <span className="text-sm font-medium text-gray-700">Current Week</span>
                              <span className="font-bold text-purple-600">{result.currentWeek} weeks, {result.currentDay} days</span>
                            </div>
                            
                            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                              <span className="text-sm font-medium text-gray-700">Trimester</span>
                              <span className="font-bold text-blue-600">{result.trimester === 1 ? '1st' : result.trimester === 2 ? '2nd' : '3rd'} Trimester</span>
                            </div>
                            
                            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                              <span className="text-sm font-medium text-gray-700">Days Until Due</span>
                              <span className="font-bold text-green-600">{result.daysUntilDue} days</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Timeline and Recommendations */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Clock className="w-5 h-5 text-purple-600" />
                        <span>Pregnancy Timeline</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <PregnancyTimeline result={result} />
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Heart className="w-5 h-5 text-pink-500" />
                        <span>This Week's Focus</span>
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
                            <Star className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
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
                  <Baby className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to Calculate</h3>
                  <p className="text-gray-600">Enter your information to calculate your due date</p>
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
                  <p className="text-amber-800 text-sm leading-relaxed mt-2">
                    Due dates are estimates. Only about 5% of babies are born on their exact due date. Regular prenatal care is essential.
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