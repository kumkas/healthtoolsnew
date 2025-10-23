'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { MEDICAL_DISCLAIMER } from '@/lib/constants'
import { calculateBodyFat } from '@/lib/calculations/bodyFat'
import { BodyFatCalculatorInput } from '@/lib/schemas/bodyFat'
import { 
  User, 
  Target, 
  Ruler,
  CheckCircle
} from 'lucide-react'

export const BodyFatCalculator: React.FC = () => {
  const [age, setAge] = useState('')
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [neck, setNeck] = useState('')
  const [waist, setWaist] = useState('')
  const [hip, setHip] = useState('')
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [method, setMethod] = useState<'navy' | 'ymca' | 'covert_bailey'>('navy')
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric')
  const [result, setResult] = useState<any>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const methods = [
    { value: 'navy', label: 'Navy Method', description: 'US Navy body fat formula' },
    { value: 'ymca', label: 'YMCA Method', description: 'YMCA body fat formula' },
    { value: 'covert_bailey', label: 'Covert Bailey', description: 'Covert Bailey formula' }
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

    if (!neck || parseFloat(neck) <= 0) {
      newErrors.neck = 'Please enter a valid neck measurement'
    }

    if (!waist || parseFloat(waist) <= 0) {
      newErrors.waist = 'Please enter a valid waist measurement'
    }

    if (gender === 'female' && (!hip || parseFloat(hip) <= 0)) {
      newErrors.hip = 'Please enter a valid hip measurement'
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
    const neckNum = parseFloat(neck)
    const waistNum = parseFloat(waist)
    const hipNum = hip ? parseFloat(hip) : undefined

    // Convert imperial to metric if needed
    const heightCm = unit === 'imperial' ? heightNum * 2.54 : heightNum
    const weightKg = unit === 'imperial' ? weightNum * 0.453592 : weightNum
    const neckCm = unit === 'imperial' ? neckNum * 2.54 : neckNum
    const waistCm = unit === 'imperial' ? waistNum * 2.54 : waistNum
    const hipCm = hipNum && unit === 'imperial' ? hipNum * 2.54 : hipNum

    const bodyFatData = calculateBodyFat({
      age: ageNum,
      height: heightCm,
      weight: weightKg,
      heightUnit: 'cm',
      weightUnit: 'kg',
      neck: neckCm,
      waist: waistCm,
      hip: hipCm,
      gender,
      method: method === 'navy' ? 'us_navy' : method === 'ymca' ? 'ymca' : 'jackson_pollock_3'
    } as BodyFatCalculatorInput)
    
    setResult(bodyFatData)
    setIsCalculating(false)
  }

  const handleReset = () => {
    setAge('')
    setHeight('')
    setWeight('')
    setNeck('')
    setWaist('')
    setHip('')
    setResult(null)
    setErrors({})
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Body Fat Calculator
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Calculate your body fat percentage using proven measurement methods for better health insights
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
                  <Ruler className="w-5 h-5 text-green-600" />
                  <span>Calculate Body Fat</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Unit Toggle */}
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setUnit('metric')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      unit === 'metric'
                        ? 'bg-white text-green-600 shadow-sm'
                        : 'text-gray-600'
                    }`}
                  >
                    Metric
                  </button>
                  <button
                    onClick={() => setUnit('imperial')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      unit === 'imperial'
                        ? 'bg-white text-green-600 shadow-sm'
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
                            ? 'bg-white text-green-600 shadow-sm'
                            : 'text-gray-600'
                        }`}
                      >
                        Male
                      </button>
                      <button
                        onClick={() => setGender('female')}
                        className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                          gender === 'female'
                            ? 'bg-white text-green-600 shadow-sm'
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

                {/* Body Measurements */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Body Measurements ({unit === 'metric' ? 'cm' : 'inches'})</h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="neck">Neck</Label>
                      <Input
                        id="neck"
                        type="number"
                        value={neck}
                        onChange={(e) => setNeck(e.target.value)}
                        placeholder={unit === 'metric' ? 'e.g., 35' : 'e.g., 14'}
                        className={errors.neck ? 'border-red-500' : ''}
                      />
                      {errors.neck && <p className="text-red-500 text-sm mt-1">{errors.neck}</p>}
                    </div>
                    <div>
                      <Label htmlFor="waist">Waist</Label>
                      <Input
                        id="waist"
                        type="number"
                        value={waist}
                        onChange={(e) => setWaist(e.target.value)}
                        placeholder={unit === 'metric' ? 'e.g., 80' : 'e.g., 32'}
                        className={errors.waist ? 'border-red-500' : ''}
                      />
                      {errors.waist && <p className="text-red-500 text-sm mt-1">{errors.waist}</p>}
                    </div>
                  </div>

                  {gender === 'female' && (
                    <div>
                      <Label htmlFor="hip">Hip (Required for females)</Label>
                      <Input
                        id="hip"
                        type="number"
                        value={hip}
                        onChange={(e) => setHip(e.target.value)}
                        placeholder={unit === 'metric' ? 'e.g., 95' : 'e.g., 37'}
                        className={errors.hip ? 'border-red-500' : ''}
                      />
                      {errors.hip && <p className="text-red-500 text-sm mt-1">{errors.hip}</p>}
                    </div>
                  )}
                </div>

                {/* Method Selection */}
                <div>
                  <Label>Calculation Method</Label>
                  <div className="space-y-2 mt-2">
                    {methods.map((methodOption) => (
                      <button
                        key={methodOption.value}
                        onClick={() => setMethod(methodOption.value as any)}
                        className={`w-full text-left p-3 rounded-lg border transition-colors ${
                          method === methodOption.value
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-medium">{methodOption.label}</div>
                        <div className="text-sm text-gray-600">{methodOption.description}</div>
                      </button>
                    ))}
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
                    className="flex-1 h-12 bg-green-600 hover:bg-green-700"
                  >
                    {isCalculating ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Calculating...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Ruler className="w-4 h-4" />
                        <span>Calculate Body Fat</span>
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
                      <Target className="w-5 h-5 text-green-600" />
                      <span>Your Body Fat Results</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="text-center p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl">
                        <div className="text-3xl font-bold text-green-600">{result.bodyFatPercentage}%</div>
                        <div className="text-sm text-gray-600">Body Fat</div>
                        <div className="font-medium">Percentage</div>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                        <div className="text-3xl font-bold text-blue-600">{result.category.label}</div>
                        <div className="text-sm text-gray-600">Classification</div>
                        <div className="font-medium">Health Category</div>
                      </div>
                    </div>

                    {result.leanBodyMass && (
                      <div className="mt-6 p-4 bg-yellow-50 rounded-xl">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-yellow-600">{result.leanBodyMass} {unit === 'metric' ? 'kg' : 'lbs'}</div>
                          <div className="text-sm text-gray-600">Lean Body Mass</div>
                        </div>
                      </div>
                    )}

                    <div className="mt-6 space-y-3">
                      <h4 className="font-semibold text-gray-900">Understanding Your Results</h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p>• <strong>Body Fat %:</strong> Percentage of your body weight that is fat</p>
                        <p>• <strong>Category:</strong> Health classification based on your body fat</p>
                        <p>• <strong>Lean Mass:</strong> Your body weight minus fat weight</p>
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
                  <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to Calculate</h3>
                  <p className="text-gray-600">Enter your measurements to get your body fat percentage</p>
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

export default BodyFatCalculator