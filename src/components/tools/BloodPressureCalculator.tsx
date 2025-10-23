'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { BLOOD_PRESSURE_CATEGORIES, MEDICAL_DISCLAIMER } from '@/lib/constants'
import { analyzeBloodPressure } from '@/lib/calculations/bloodPressure'
import { 
  Activity, 
  Heart, 
  AlertTriangle, 
  Info, 
  TrendingUp,
  Shield,
  CheckCircle,
  AlertCircle,
  Target
} from 'lucide-react'

interface BPResult {
  systolic: number
  diastolic: number
  category: keyof typeof BLOOD_PRESSURE_CATEGORIES
  riskLevel: 'low' | 'moderate' | 'high' | 'critical'
  interpretation: string
  recommendations: string[]
  urgency: string
}

const BloodPressureGauge: React.FC<{ systolic: number; diastolic: number; category: keyof typeof BLOOD_PRESSURE_CATEGORIES }> = ({ 
  systolic, 
  diastolic, 
  category 
}) => {
  const categoryData = BLOOD_PRESSURE_CATEGORIES[category]
  const maxValue = 200
  const systolicPercentage = Math.min((systolic / maxValue) * 100, 100)
  const diastolicPercentage = Math.min((diastolic / 120) * 100, 100)

  const getColorByCategory = (cat: keyof typeof BLOOD_PRESSURE_CATEGORIES) => {
    switch (cat) {
      case 'NORMAL': return '#10B981'
      case 'ELEVATED': return '#F59E0B'
      case 'STAGE_1': return '#F97316'
      case 'STAGE_2': return '#EF4444'
      case 'CRISIS': return '#B91C1C'
      default: return '#6B7280'
    }
  }

  const color = getColorByCategory(category)

  return (
    <div className="relative w-64 h-64 mx-auto">
      {/* Background circles */}
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
        {/* Systolic (outer ring) */}
        <circle
          cx="100"
          cy="100"
          r="85"
          stroke="#E5E7EB"
          strokeWidth="12"
          fill="transparent"
          className="opacity-30"
        />
        <motion.circle
          cx="100"
          cy="100"
          r="85"
          stroke={color}
          strokeWidth="12"
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={2 * Math.PI * 85}
          strokeDashoffset={2 * Math.PI * 85 * (1 - systolicPercentage / 100)}
          initial={{ strokeDashoffset: 2 * Math.PI * 85 }}
          animate={{ strokeDashoffset: 2 * Math.PI * 85 * (1 - systolicPercentage / 100) }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        
        {/* Diastolic (inner ring) */}
        <circle
          cx="100"
          cy="100"
          r="65"
          stroke="#E5E7EB"
          strokeWidth="10"
          fill="transparent"
          className="opacity-30"
        />
        <motion.circle
          cx="100"
          cy="100"
          r="65"
          stroke={color}
          strokeWidth="10"
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={2 * Math.PI * 65}
          strokeDashoffset={2 * Math.PI * 65 * (1 - diastolicPercentage / 100)}
          initial={{ strokeDashoffset: 2 * Math.PI * 65 }}
          animate={{ strokeDashoffset: 2 * Math.PI * 65 * (1 - diastolicPercentage / 100) }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
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
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {systolic}/{diastolic}
          </div>
          <div className="text-sm text-gray-600 mb-2">mmHg</div>
          <div 
            className="text-xs font-medium px-2 py-1 rounded-full"
            style={{ 
              backgroundColor: `${color}20`, 
              color: color 
            }}
          >
            {categoryData.label}
          </div>
        </motion.div>
      </div>
      
      {/* Legend */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4 text-xs">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
          <span className="text-gray-600">Systolic</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
          <span className="text-gray-600">Diastolic</span>
        </div>
      </div>
    </div>
  )
}

const BloodPressureChart: React.FC<{ systolic: number; diastolic: number }> = ({ systolic, diastolic }) => {
  const categories = [
    { 
      name: 'Normal', 
      systolic: '< 120', 
      diastolic: '< 80', 
      color: '#10B981', 
      key: 'NORMAL' as const 
    },
    { 
      name: 'Elevated', 
      systolic: '120-129', 
      diastolic: '< 80', 
      color: '#F59E0B', 
      key: 'ELEVATED' as const 
    },
    { 
      name: 'Stage 1 Hypertension', 
      systolic: '130-139', 
      diastolic: '80-89', 
      color: '#F97316', 
      key: 'STAGE_1' as const 
    },
    { 
      name: 'Stage 2 Hypertension', 
      systolic: '140-179', 
      diastolic: '90-119', 
      color: '#EF4444', 
      key: 'STAGE_2' as const 
    },
    { 
      name: 'Hypertensive Crisis', 
      systolic: '≥ 180', 
      diastolic: '≥ 120', 
      color: '#B91C1C', 
      key: 'CRISIS' as const 
    },
  ]

  const getCurrentCategory = () => {
    const bpData = BLOOD_PRESSURE_CATEGORIES
    
    if (systolic >= 180 || diastolic >= 120) return 'CRISIS'
    if (systolic >= 140 || diastolic >= 90) return 'STAGE_2'
    if (systolic >= 130 || diastolic >= 80) return 'STAGE_1'
    if (systolic >= 120 && diastolic < 80) return 'ELEVATED'
    return 'NORMAL'
  }

  const currentCategory = getCurrentCategory()

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-gray-900 mb-4">Blood Pressure Categories</h4>
      {categories.map((category, index) => {
        const isActive = currentCategory === category.key
        
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
              <span className={`font-medium text-sm ${isActive ? 'text-current' : 'text-gray-700'}`}>
                {category.name}
              </span>
            </div>
            <div className={`text-xs text-right ${isActive ? 'text-current font-medium' : 'text-gray-500'}`}>
              <div>Sys: {category.systolic}</div>
              <div>Dia: {category.diastolic}</div>
            </div>
            {isActive && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="ml-2"
              >
                <CheckCircle className="w-4 h-4" />
              </motion.div>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}

export const BloodPressureCalculator: React.FC = () => {
  const [systolic, setSystolic] = useState('')
  const [diastolic, setDiastolic] = useState('')
  const [age, setAge] = useState('')
  const [result, setResult] = useState<BPResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [errors, setErrors] = useState<{ systolic?: string; diastolic?: string; age?: string }>({})

  const validateInputs = () => {
    const newErrors: { systolic?: string; diastolic?: string; age?: string } = {}
    
    const systolicNum = parseInt(systolic)
    const diastolicNum = parseInt(diastolic)
    const ageNum = parseInt(age)

    if (!systolic || systolicNum <= 0 || systolicNum > 300) {
      newErrors.systolic = 'Systolic pressure must be between 1-300 mmHg'
    }

    if (!diastolic || diastolicNum <= 0 || diastolicNum > 200) {
      newErrors.diastolic = 'Diastolic pressure must be between 1-200 mmHg'
    }

    if (systolicNum && diastolicNum && systolicNum <= diastolicNum) {
      newErrors.systolic = 'Systolic must be higher than diastolic'
    }

    if (!age || ageNum < 1 || ageNum > 120) {
      newErrors.age = 'Age must be between 1-120 years'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleCalculate = async () => {
    if (!validateInputs()) return

    setIsCalculating(true)
    
    await new Promise(resolve => setTimeout(resolve, 500))

    const systolicNum = parseInt(systolic)
    const diastolicNum = parseInt(diastolic)
    const ageNum = parseInt(age)

    const analysis = analyzeBloodPressure(systolicNum, diastolicNum, ageNum)
    
    setResult(analysis)
    setIsCalculating(false)
  }

  const handleReset = () => {
    setSystolic('')
    setDiastolic('')
    setAge('')
    setResult(null)
    setErrors({})
  }

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return <Shield className="w-5 h-5 text-green-500" />
      case 'moderate': return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      case 'high': return <AlertCircle className="w-5 h-5 text-orange-500" />
      case 'critical': return <AlertCircle className="w-5 h-5 text-red-500" />
      default: return <Info className="w-5 h-5 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <Heart className="w-4 h-4" />
            <span>Heart Health Monitor</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Blood Pressure Calculator
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Check your blood pressure readings and understand your cardiovascular health with our AHA-compliant analysis
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
                  <Activity className="w-5 h-5 text-red-600" />
                  <span>Check Your Blood Pressure</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Systolic Input */}
                <div>
                  <Label htmlFor="systolic" required>
                    Systolic Pressure (mmHg)
                  </Label>
                  <Input
                    id="systolic"
                    type="number"
                    value={systolic}
                    onChange={(e) => setSystolic(e.target.value)}
                    placeholder="e.g., 120"
                    error={!!errors.systolic}
                    className="mt-1"
                  />
                  {errors.systolic && (
                    <p className="text-red-600 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.systolic}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">The higher number (when heart beats)</p>
                </div>

                {/* Diastolic Input */}
                <div>
                  <Label htmlFor="diastolic" required>
                    Diastolic Pressure (mmHg)
                  </Label>
                  <Input
                    id="diastolic"
                    type="number"
                    value={diastolic}
                    onChange={(e) => setDiastolic(e.target.value)}
                    placeholder="e.g., 80"
                    error={!!errors.diastolic}
                    className="mt-1"
                  />
                  {errors.diastolic && (
                    <p className="text-red-600 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.diastolic}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">The lower number (when heart rests)</p>
                </div>

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
                    placeholder="e.g., 35"
                    error={!!errors.age}
                    className="mt-1"
                  />
                  {errors.age && (
                    <p className="text-red-600 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.age}
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  <Button
                    onClick={handleCalculate}
                    disabled={isCalculating}
                    className="flex-1 h-12 bg-red-600 hover:bg-red-700"
                  >
                    {isCalculating ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Analyzing...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Activity className="w-4 h-4" />
                        <span>Analyze BP</span>
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

                {/* How to measure tip */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                  <div className="flex items-start space-x-3">
                    <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-medium text-blue-900 mb-1">Measurement Tips</h4>
                      <ul className="text-xs text-blue-800 space-y-1">
                        <li>• Rest for 5 minutes before measuring</li>
                        <li>• Sit with feet flat on floor</li>
                        <li>• Use properly sized cuff</li>
                        <li>• Take 2-3 readings, 1 minute apart</li>
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
                {/* BP Result Card */}
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      <div>
                        <BloodPressureGauge 
                          systolic={result.systolic} 
                          diastolic={result.diastolic} 
                          category={result.category} 
                        />
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">Your Blood Pressure Analysis</h3>
                          <div className="flex items-center space-x-3 mb-3">
                            <span className="text-3xl font-bold text-red-600">
                              {result.systolic}/{result.diastolic}
                            </span>
                            <div>
                              <div className="text-lg font-semibold text-gray-900">
                                {BLOOD_PRESSURE_CATEGORIES[result.category].label}
                              </div>
                              <div className="text-sm text-gray-500">mmHg</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2 mb-4">
                            {getRiskIcon(result.riskLevel)}
                            <span className="text-sm font-medium capitalize text-gray-700">
                              {result.riskLevel} Risk Level
                            </span>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-gray-700 leading-relaxed">{result.interpretation}</p>
                        </div>
                        
                        {result.urgency && (
                          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <div className="flex items-start space-x-3">
                              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <h4 className="font-medium text-red-900 mb-1">Important</h4>
                                <p className="text-red-800 text-sm">{result.urgency}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* BP Chart and Recommendations */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <TrendingUp className="w-5 h-5 text-red-600" />
                        <span>BP Categories</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <BloodPressureChart systolic={result.systolic} diastolic={result.diastolic} />
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Heart className="w-5 h-5 text-red-500" />
                        <span>Recommendations</span>
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
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to Analyze</h3>
                  <p className="text-gray-600">Enter your blood pressure readings to get your analysis</p>
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
                    <strong>Emergency:</strong> If your blood pressure is extremely high (≥180/120 mmHg), seek immediate medical attention.
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