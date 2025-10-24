'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Label } from '../ui/Label'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card'
import { Select } from '../ui/Select'
import { RadioGroup } from '../ui/RadioGroup'
import { Checkbox } from '../ui/Checkbox'
import { VitaminDCalculatorSchema, type VitaminDCalculatorInput, type VitaminDCalculatorResult } from '../../lib/schemas/vitaminD'
import { calculateVitaminD } from '../../lib/calculations/vitaminD'
import { Sun } from 'lucide-react'

export function VitaminDCalculator() {
  const [formData, setFormData] = useState<Partial<VitaminDCalculatorInput>>({
    age: 35,
    gender: 'female',
    skinType: 'fair',
    bodyWeight: 70,
    vitaminDUnit: 'ng_ml',
    season: 'summer',
    sunExposureHours: 2,
    sunscreenUse: 'sometimes',
    dietaryIntake: 'low',
    supplementUse: 'none',
    pregnancyStatus: 'not_pregnant',
    medicalConditions: ['none'],
    medications: ['none'],
    assessmentType: 'basic'
  })
  
  const [result, setResult] = useState<VitaminDCalculatorResult | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isCalculating, setIsCalculating] = useState(false)

  const handleInputChange = (field: keyof VitaminDCalculatorInput, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleCalculate = async () => {
    setIsCalculating(true)
    setErrors({})
    
    try {
      const input = VitaminDCalculatorSchema.parse(formData)
      const calculationResult = calculateVitaminD(input)
      setResult(calculationResult)
    } catch (error: any) {
      if (error.errors) {
        const newErrors: Record<string, string> = {}
        error.errors.forEach((err: any) => {
          if (err.path) {
            newErrors[err.path[0]] = err.message
          }
        })
        setErrors(newErrors)
      }
    } finally {
      setIsCalculating(false)
    }
  }

  const isValid = () => {
    return formData.age && formData.gender && formData.skinType && formData.bodyWeight
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <Sun className="w-4 h-4" />
            <span>Nutrition & Wellness</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Vitamin D Calculator
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Assess your vitamin D deficiency risk and get personalized recommendations for sun exposure, 
            supplementation, and dietary sources to optimize your vitamin D status
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calculator Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1"
          >
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-2 text-xl">
                <Sun className="w-5 h-5 text-orange-600" />
                <span>Calculate Vitamin D Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">

              {/* Current Vitamin D Level */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-orange-200 pb-2 flex items-center gap-2">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Current Vitamin D Level (Optional)
              </h3>
              
              <div className="space-y-3">
                <div>
                  <Label htmlFor="vitaminDUnit">Units</Label>
                  <Select
                    value={formData.vitaminDUnit || 'ng_ml'}
                    onValueChange={(value) => handleInputChange('vitaminDUnit', value)}
                  >
                    <option value="ng_ml">ng/mL (US)</option>
                    <option value="nmol_l">nmol/L (International)</option>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="currentVitaminDLevel">
                    Current Level ({formData.vitaminDUnit === 'ng_ml' ? 'ng/mL' : 'nmol/L'})
                  </Label>
                  <Input
                    id="currentVitaminDLevel"
                    type="number"
                    value={formData.currentVitaminDLevel || ''}
                    onChange={(e) => handleInputChange('currentVitaminDLevel', Number(e.target.value) || undefined)}
                    className={errors.currentVitaminDLevel ? 'border-red-500' : 'border-orange-200 focus:border-orange-500'}
                    placeholder="Leave blank if unknown"
                  />
                  {errors.currentVitaminDLevel && <p className="text-red-500 text-xs mt-1">{errors.currentVitaminDLevel}</p>}
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-orange-200 pb-2 flex items-center gap-2">
                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Personal Information
              </h3>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age || ''}
                    onChange={(e) => handleInputChange('age', Number(e.target.value))}
                    className={errors.age ? 'border-red-500' : 'border-orange-200 focus:border-orange-500'}
                  />
                  {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
                </div>

                <div>
                  <Label htmlFor="bodyWeight">Weight (kg)</Label>
                  <Input
                    id="bodyWeight"
                    type="number"
                    value={formData.bodyWeight || ''}
                    onChange={(e) => handleInputChange('bodyWeight', Number(e.target.value))}
                    className={errors.bodyWeight ? 'border-red-500' : 'border-orange-200 focus:border-orange-500'}
                  />
                  {errors.bodyWeight && <p className="text-red-500 text-xs mt-1">{errors.bodyWeight}</p>}
                </div>
              </div>

              <div>
                <Label>Gender</Label>
                <RadioGroup
                  value={formData.gender || 'female'}
                  onValueChange={(value) => handleInputChange('gender', value)}
                  options={[
                    { value: 'male', label: 'Male' },
                    { value: 'female', label: 'Female' }
                  ]}
                  className="flex gap-4 mt-1"
                />
              </div>

              <div>
                <Label>Skin Type</Label>
                <Select
                  value={formData.skinType || 'fair'}
                  onValueChange={(value) => handleInputChange('skinType', value)}
                >
                  <option value="very_fair">Very Fair (burns easily)</option>
                  <option value="fair">Fair (burns moderately)</option>
                  <option value="medium">Medium (tans easily)</option>
                  <option value="olive">Olive (rarely burns)</option>
                  <option value="brown">Brown</option>
                  <option value="very_dark">Very Dark</option>
                </Select>
              </div>
            </div>

            {/* Lifestyle Factors */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-orange-200 pb-2 flex items-center gap-2">
                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Sun Exposure & Lifestyle
              </h3>
              
              <div className="space-y-3">
                <div>
                  <Label>Current Season</Label>
                  <Select
                    value={formData.season || 'summer'}
                    onValueChange={(value) => handleInputChange('season', value)}
                  >
                    <option value="spring">Spring</option>
                    <option value="summer">Summer</option>
                    <option value="fall">Fall</option>
                    <option value="winter">Winter</option>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="sunExposureHours">Daily Sun Exposure (hours)</Label>
                  <Input
                    id="sunExposureHours"
                    type="number"
                    step="0.5"
                    value={formData.sunExposureHours || ''}
                    onChange={(e) => handleInputChange('sunExposureHours', Number(e.target.value))}
                    className="border-orange-200 focus:border-orange-500"
                  />
                </div>

                <div>
                  <Label>Sunscreen Use</Label>
                  <Select
                    value={formData.sunscreenUse || 'sometimes'}
                    onValueChange={(value) => handleInputChange('sunscreenUse', value)}
                  >
                    <option value="never">Never</option>
                    <option value="sometimes">Sometimes</option>
                    <option value="usually">Usually</option>
                    <option value="always">Always</option>
                  </Select>
                </div>

                <div>
                  <Label>Dietary Vitamin D Intake</Label>
                  <Select
                    value={formData.dietaryIntake || 'low'}
                    onValueChange={(value) => handleInputChange('dietaryIntake', value)}
                  >
                    <option value="very_low">Very Low (no fatty fish/fortified foods)</option>
                    <option value="low">Low (occasional fatty fish)</option>
                    <option value="moderate">Moderate (1-2x/week fatty fish)</option>
                    <option value="high">High (3+x/week fatty fish + fortified foods)</option>
                  </Select>
                </div>

                <div>
                  <Label>Current Supplement Use</Label>
                  <Select
                    value={formData.supplementUse || 'none'}
                    onValueChange={(value) => handleInputChange('supplementUse', value)}
                  >
                    <option value="none">No supplements</option>
                    <option value="low_dose">Low dose (&lt;1000 IU/day)</option>
                    <option value="moderate_dose">Moderate dose (1000-2000 IU/day)</option>
                    <option value="high_dose">High dose (&gt;2000 IU/day)</option>
                  </Select>
                </div>

                {formData.supplementUse !== 'none' && (
                  <div>
                    <Label htmlFor="currentSupplementDose">Current Daily Dose (IU)</Label>
                    <Input
                      id="currentSupplementDose"
                      type="number"
                      value={formData.currentSupplementDose || ''}
                      onChange={(e) => handleInputChange('currentSupplementDose', Number(e.target.value))}
                      className={errors.currentSupplementDose ? 'border-red-500' : 'border-orange-200 focus:border-orange-500'}
                    />
                    {errors.currentSupplementDose && <p className="text-red-500 text-xs mt-1">{errors.currentSupplementDose}</p>}
                  </div>
                )}
              </div>
            </div>

            <Button
              onClick={handleCalculate}
              disabled={!isValid() || isCalculating}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
            >
              {isCalculating ? 'Analyzing...' : 'Calculate Vitamin D Status'}
            </Button>
            </CardContent>
          </Card>
          </motion.div>

          {/* Results */}
          {result ? (
            <div className="lg:col-span-2 space-y-6" id="vitamin-d-results">
          {/* Warning Flags */}
          {result.warningFlags && result.warningFlags.length > 0 && (
            <div className="space-y-3">
              {result.warningFlags.map((warning, index) => (
                <Card key={index} className={`p-4 border-l-4 ${
                  warning.level === 'urgent' ? 'border-red-500 bg-red-50' :
                  warning.level === 'warning' ? 'border-orange-500 bg-orange-50' :
                  'border-yellow-500 bg-yellow-50'
                }`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      warning.level === 'urgent' ? 'bg-red-500' :
                      warning.level === 'warning' ? 'bg-orange-500' :
                      'bg-yellow-500'
                    }`}>
                      <span className="text-white text-xs font-bold">!</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">{warning.message}</h3>
                      <ul className="text-sm text-gray-700 space-y-1">
                        {warning.recommendations.map((rec, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-gray-500 mt-1">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Vitamin D Status */}
          <Card className="p-6 bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              Vitamin D Status Assessment
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{result.vitaminDStatus.level}</div>
                <div className="text-sm text-gray-600">{result.vitaminDStatus.unit === 'ng_ml' ? 'ng/mL' : 'nmol/L'}</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${
                  result.vitaminDStatus.category.color === 'green' ? 'text-green-600' :
                  result.vitaminDStatus.category.color === 'yellow' ? 'text-yellow-600' :
                  result.vitaminDStatus.category.color === 'orange' ? 'text-orange-600' :
                  'text-red-600'
                }`}>
                  {result.vitaminDStatus.category.label}
                </div>
                <div className="text-sm text-gray-600">Status</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold capitalize ${
                  result.deficiencyRisk.riskLevel === 'very_low' ? 'text-green-600' :
                  result.deficiencyRisk.riskLevel === 'low' ? 'text-green-600' :
                  result.deficiencyRisk.riskLevel === 'moderate' ? 'text-yellow-600' :
                  result.deficiencyRisk.riskLevel === 'high' ? 'text-orange-600' :
                  'text-red-600'
                }`}>
                  {result.deficiencyRisk.riskLevel.replace('_', ' ')}
                </div>
                <div className="text-sm text-gray-600">Risk Level</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{result.deficiencyRisk.riskScore}</div>
                <div className="text-sm text-gray-600">Risk Score</div>
              </div>
            </div>
          </Card>

          {/* Sun Exposure Recommendations */}
          <Card className="p-6 bg-white border border-orange-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Sun Exposure Recommendations</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Daily Exposure Time</h3>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="text-center mb-2">
                    <span className="text-2xl font-bold text-orange-600">{result.sunExposureRecommendations.dailyExposureTime.optimal}</span>
                    <span className="text-sm text-gray-600 ml-1">minutes</span>
                  </div>
                  <div className="text-xs text-gray-600 text-center">
                    Range: {result.sunExposureRecommendations.dailyExposureTime.minimum}-{result.sunExposureRecommendations.dailyExposureTime.maximum} minutes
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Sun Protection</h3>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <div className="text-center mb-2">
                    <span className="text-2xl font-bold text-amber-600">SPF {result.sunExposureRecommendations.skinProtection.spfRecommendation}</span>
                  </div>
                  <div className="text-xs text-gray-600 text-center">
                    Recommended sunscreen level
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold text-gray-900 mb-2">Best Times for Sun Exposure</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                {result.sunExposureRecommendations.timeOfDay.map((time, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>{time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          {/* Supplementation Guidance */}
          <Card className="p-6 bg-white border border-orange-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Supplementation Guidance</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Recommendation</h3>
                <div className={`p-4 rounded-lg ${
                  result.supplementationGuidance.recommended ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50 border border-gray-200'
                }`}>
                  <div className="font-medium text-gray-900 mb-2">
                    {result.supplementationGuidance.recommended ? 'Supplementation Recommended' : 'No Supplementation Needed'}
                  </div>
                  {result.supplementationGuidance.recommended && (
                    <div className="text-center">
                      <span className="text-2xl font-bold text-blue-600">{result.supplementationGuidance.dailyDose.optimal}</span>
                      <span className="text-sm text-gray-600 ml-1">IU/day</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Type & Timing</h3>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="text-sm text-gray-700 space-y-1">
                    <div><strong>Type:</strong> {result.supplementationGuidance.supplementType}</div>
                    <div><strong>Timing:</strong> {result.supplementationGuidance.timing}</div>
                    <div><strong>Duration:</strong> {result.supplementationGuidance.duration}</div>
                  </div>
                </div>
              </div>
            </div>

            {result.supplementationGuidance.contraindications.length > 0 && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <h4 className="font-medium text-red-800 mb-1">Important Considerations:</h4>
                <ul className="text-sm text-red-700 space-y-1">
                  {result.supplementationGuidance.contraindications.map((contraindication, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span>{contraindication}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Card>

          {/* Dietary Recommendations */}
          <Card className="p-6 bg-white border border-orange-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Dietary Sources</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Natural Food Sources</h3>
                <div className="space-y-3">
                  {result.dietaryRecommendations.foodSources.map((source, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-3">
                      <h4 className="font-medium text-gray-900">{source.category}</h4>
                      <p className="text-sm text-gray-600">{source.foods.join(', ')}</p>
                      <p className="text-xs text-orange-600 font-medium">{source.vitaminDContent}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Fortified Foods</h3>
                <div className="space-y-3">
                  {result.dietaryRecommendations.fortifiedFoods.map((food, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-3">
                      <h4 className="font-medium text-gray-900">{food.food}</h4>
                      <p className="text-xs text-orange-600 font-medium">{food.content}</p>
                      <p className="text-xs text-gray-600">{food.availability}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Health Insights */}
          {result.healthInsights.length > 0 && (
            <Card className="p-6 bg-white border border-orange-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Health Insights</h2>
              
              <div className="space-y-3">
                {result.healthInsights.map((insight, index) => (
                  <div key={index} className="border-l-4 border-orange-500 pl-4 py-2 bg-orange-50">
                    <h3 className="font-semibold text-gray-900">{insight.category}</h3>
                    <p className="text-sm text-gray-700">{insight.insight}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Cross-reference */}
          <div className="text-center py-4 border-t border-orange-200">
            <p className="text-sm text-gray-600">
              Want to assess bone health? 
              <a href="/tools/general-health/bmi-calculator" className="text-orange-600 hover:text-orange-700 underline ml-1">
                Check your BMI
              </a>
            </p>
          </div>
          </div>
        ) : (
          /* Ready to Calculate State */
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-orange-100 shadow-lg p-8 text-center">
              <div className="max-w-md mx-auto">
                {/* Vitamin D Icon */}
                <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Calculate</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Enter your personal information, sun exposure habits, and lifestyle factors to get your vitamin D deficiency risk assessment and personalized recommendations.
                </p>
                
                {/* Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <div className="flex items-center justify-center w-8 h-8 bg-orange-500 rounded-full mx-auto mb-2">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-orange-800 mb-1">Comprehensive Analysis</h4>
                    <p className="text-sm text-orange-700">Personalized risk assessment based on multiple factors</p>
                  </div>
                  
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex items-center justify-center w-8 h-8 bg-amber-500 rounded-full mx-auto mb-2">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    </div>
                    <h4 className="font-semibold text-amber-800 mb-1">Sun & Supplement Guidance</h4>
                    <p className="text-sm text-amber-700">Safe exposure recommendations and supplement advice</p>
                  </div>
                </div>
                
                {/* Quick Tips */}
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <svg className="w-5 h-5 text-orange-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <h5 className="font-medium text-orange-800 mb-1">☀️ Quick Tip</h5>
                      <p className="text-sm text-orange-700">
                        Even if you don't know your current vitamin D level, we can estimate your status and provide personalized recommendations based on your lifestyle and risk factors.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  )
}