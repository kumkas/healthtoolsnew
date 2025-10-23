'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { MEDICAL_DISCLAIMER } from '@/lib/constants'
import { calculateBloodSugar } from '@/lib/calculations/bloodSugar'
import { BloodSugarCalculatorInput } from '@/lib/schemas/bloodSugar'
import { 
  Droplets, 
  Target, 
  AlertTriangle, 
  Info, 
  TrendingUp,
  Shield,
  CheckCircle,
  AlertCircle,
  Activity
} from 'lucide-react'

interface BloodSugarResult {
  fastingGlucose: number
  postMealGlucose?: number
  hba1c?: number
  category: string
  riskLevel: 'low' | 'moderate' | 'high' | 'critical'
  interpretation: string
  recommendations: string[]
}

const BloodSugarGauge: React.FC<{ value: number; type: string; category: string }> = ({ 
  value, 
  type,
  category 
}) => {
  const maxValue = type === 'fasting' ? 200 : type === 'postmeal' ? 300 : 15
  const percentage = Math.min((value / maxValue) * 100, 100)

  const getColorByCategory = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'normal': return '#10B981'
      case 'prediabetes': return '#F59E0B'
      case 'diabetes': return '#EF4444'
      case 'high': return '#F97316'
      case 'very high': return '#B91C1C'
      default: return '#6B7280'
    }
  }

  const color = getColorByCategory(category)

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
          stroke={color}
          strokeWidth="20"
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={2 * Math.PI * 80}
          strokeDashoffset={2 * Math.PI * 80 * (1 - percentage / 100)}
          initial={{ strokeDashoffset: 2 * Math.PI * 80 }}
          animate={{ strokeDashoffset: 2 * Math.PI * 80 * (1 - percentage / 100) }}
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
          <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
          <div className="text-sm text-gray-600">
            {type === 'fasting' ? 'mg/dL' : type === 'postmeal' ? 'mg/dL' : '%'}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

const BloodSugarChart: React.FC<{ value: number; type: string }> = ({ value, type }) => {
  const ranges = type === 'fasting' 
    ? [
        { name: 'Normal', range: '< 100', color: '#10B981', min: 0, max: 100 },
        { name: 'Prediabetes', range: '100-125', color: '#F59E0B', min: 100, max: 125 },
        { name: 'Diabetes', range: '≥ 126', color: '#EF4444', min: 126, max: 200 },
      ]
    : type === 'postmeal'
    ? [
        { name: 'Normal', range: '< 140', color: '#10B981', min: 0, max: 140 },
        { name: 'Prediabetes', range: '140-199', color: '#F59E0B', min: 140, max: 199 },
        { name: 'Diabetes', range: '≥ 200', color: '#EF4444', min: 200, max: 300 },
      ]
    : [
        { name: 'Normal', range: '< 5.7%', color: '#10B981', min: 0, max: 5.7 },
        { name: 'Prediabetes', range: '5.7-6.4%', color: '#F59E0B', min: 5.7, max: 6.4 },
        { name: 'Diabetes', range: '≥ 6.5%', color: '#EF4444', min: 6.5, max: 15 },
      ]

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-gray-900 mb-4">Blood Sugar Ranges</h4>
      {ranges.map((range, index) => {
        const isActive = value >= range.min && value < range.max
        
        return (
          <motion.div
            key={range.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
              isActive 
                ? 'border-blue-500 bg-blue-50 shadow-lg' 
                : 'border-gray-200 bg-gray-50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: range.color }}
              />
              <div>
                <div className={`font-medium ${isActive ? 'text-blue-900' : 'text-gray-700'}`}>
                  {range.name}
                </div>
                <div className={`text-sm ${isActive ? 'text-blue-700' : 'text-gray-500'}`}>
                  {range.range} {type === 'hba1c' ? '' : 'mg/dL'}
                </div>
              </div>
            </div>
            {isActive && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-blue-600"
              >
                <CheckCircle className="w-5 h-5" />
              </motion.div>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}

export const BloodSugarCalculator: React.FC = () => {
  const [fastingGlucose, setFastingGlucose] = useState('')
  const [postMealGlucose, setPostMealGlucose] = useState('')
  const [hba1c, setHba1c] = useState('')
  const [diabetesHistory, setDiabetesHistory] = useState<'none' | 'type1' | 'type2' | 'gestational'>('none')
  const [unit, setUnit] = useState<'mg_dl' | 'mmol_l'>('mg_dl')
  const [result, setResult] = useState<any>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {}
    
    if (!fastingGlucose || parseFloat(fastingGlucose) < 50 || parseFloat(fastingGlucose) > 500) {
      newErrors.fastingGlucose = 'Please enter a valid fasting glucose (50-500 mg/dL)'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleCalculate = async () => {
    if (!validateInputs()) return

    setIsCalculating(true)
    await new Promise(resolve => setTimeout(resolve, 500))

    const fastingNum = parseFloat(fastingGlucose)
    const postMealNum = postMealGlucose ? parseFloat(postMealGlucose) : undefined
    const hba1cNum = hba1c ? parseFloat(hba1c) : undefined

    const bloodSugarData = calculateBloodSugar({
      fastingGlucose: fastingNum,
      postMealGlucose: postMealNum,
      hba1c: hba1cNum,
      diabetesHistory,
      unit,
      includeTargetRanges: true,
      includeLongTermComplications: true
    } as BloodSugarCalculatorInput)
    
    setResult(bloodSugarData)
    setIsCalculating(false)
  }

  const handleReset = () => {
    setFastingGlucose('')
    setPostMealGlucose('')
    setHba1c('')
    setResult(null)
    setErrors({})
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Blood Sugar Calculator
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Analyze your blood glucose levels and get personalized diabetes risk assessment and recommendations
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
                  <span>Analyze Blood Sugar</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Unit Toggle */}
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setUnit('mg_dl')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      unit === 'mg_dl'
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600'
                    }`}
                  >
                    mg/dL
                  </button>
                  <button
                    onClick={() => setUnit('mmol_l')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      unit === 'mmol_l'
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600'
                    }`}
                  >
                    mmol/L
                  </button>
                </div>

                {/* Blood Sugar Readings */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fastingGlucose">
                      Fasting Glucose ({unit === 'mg_dl' ? 'mg/dL' : 'mmol/L'}) *
                    </Label>
                    <Input
                      id="fastingGlucose"
                      type="number"
                      value={fastingGlucose}
                      onChange={(e) => setFastingGlucose(e.target.value)}
                      placeholder={unit === 'mg_dl' ? 'e.g., 90' : 'e.g., 5.0'}
                      className={errors.fastingGlucose ? 'border-red-500' : ''}
                    />
                    {errors.fastingGlucose && <p className="text-red-500 text-sm mt-1">{errors.fastingGlucose}</p>}
                    <p className="text-sm text-gray-500 mt-1">Measured after 8+ hours of fasting</p>
                  </div>

                  <div>
                    <Label htmlFor="postMealGlucose">
                      Post-Meal Glucose ({unit === 'mg_dl' ? 'mg/dL' : 'mmol/L'})
                    </Label>
                    <Input
                      id="postMealGlucose"
                      type="number"
                      value={postMealGlucose}
                      onChange={(e) => setPostMealGlucose(e.target.value)}
                      placeholder={unit === 'mg_dl' ? 'e.g., 120' : 'e.g., 6.7'}
                    />
                    <p className="text-sm text-gray-500 mt-1">Measured 2 hours after eating (optional)</p>
                  </div>

                  <div>
                    <Label htmlFor="hba1c">HbA1c (%)</Label>
                    <Input
                      id="hba1c"
                      type="number"
                      step="0.1"
                      value={hba1c}
                      onChange={(e) => setHba1c(e.target.value)}
                      placeholder="e.g., 5.5"
                    />
                    <p className="text-sm text-gray-500 mt-1">Average blood sugar over 2-3 months (optional)</p>
                  </div>
                </div>

                {/* Diabetes History */}
                <div>
                  <Label>Diabetes History</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <button
                      onClick={() => setDiabetesHistory('none')}
                      className={`py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                        diabetesHistory === 'none'
                          ? 'bg-blue-100 text-blue-600 border border-blue-500'
                          : 'bg-gray-100 text-gray-600 border border-gray-200'
                      }`}
                    >
                      None
                    </button>
                    <button
                      onClick={() => setDiabetesHistory('type1')}
                      className={`py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                        diabetesHistory === 'type1'
                          ? 'bg-blue-100 text-blue-600 border border-blue-500'
                          : 'bg-gray-100 text-gray-600 border border-gray-200'
                      }`}
                    >
                      Type 1
                    </button>
                    <button
                      onClick={() => setDiabetesHistory('type2')}
                      className={`py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                        diabetesHistory === 'type2'
                          ? 'bg-blue-100 text-blue-600 border border-blue-500'
                          : 'bg-gray-100 text-gray-600 border border-gray-200'
                      }`}
                    >
                      Type 2
                    </button>
                    <button
                      onClick={() => setDiabetesHistory('gestational')}
                      className={`py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                        diabetesHistory === 'gestational'
                          ? 'bg-blue-100 text-blue-600 border border-blue-500'
                          : 'bg-gray-100 text-gray-600 border border-gray-200'
                      }`}
                    >
                      Gestational
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
                        <span>Analyzing...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Droplets className="w-4 h-4" />
                        <span>Analyze Blood Sugar</span>
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
                      <span>Your Blood Sugar Analysis</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-6">
                      {/* Fasting Glucose */}
                      <div className="text-center">
                        <BloodSugarGauge 
                          value={parseFloat(fastingGlucose)} 
                          type="fasting" 
                          category={result.fastingCategory || 'normal'} 
                        />
                        <div className="mt-4">
                          <h3 className="text-lg font-semibold text-gray-900">Fasting Glucose</h3>
                          <p className="text-sm text-gray-600">Normal: &lt; 100 mg/dL</p>
                        </div>
                      </div>

                      {/* Risk Assessment */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                          <div className="text-2xl font-bold text-blue-600">
                            {result.riskLevel || 'Low'}
                          </div>
                          <div className="text-sm text-gray-600">Risk Level</div>
                        </div>
                        <div className="text-center p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl">
                          <div className="text-2xl font-bold text-green-600">
                            {result.category || 'Normal'}
                          </div>
                          <div className="text-sm text-gray-600">Classification</div>
                        </div>
                      </div>
                    </div>

                    {/* Blood Sugar Chart */}
                    <div className="mt-8">
                      <BloodSugarChart 
                        value={parseFloat(fastingGlucose)} 
                        type="fasting" 
                      />
                    </div>

                    <div className="mt-6 space-y-3">
                      <h4 className="font-semibold text-gray-900">Understanding Your Results</h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p>• <strong>Normal:</strong> Fasting glucose &lt; 100 mg/dL</p>
                        <p>• <strong>Prediabetes:</strong> Fasting glucose 100-125 mg/dL</p>
                        <p>• <strong>Diabetes:</strong> Fasting glucose ≥ 126 mg/dL</p>
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
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to Analyze</h3>
                  <p className="text-gray-600">Enter your blood sugar readings to get detailed analysis and recommendations</p>
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

export default BloodSugarCalculator