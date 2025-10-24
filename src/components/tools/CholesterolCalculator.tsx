'use client'

import { useState } from 'react'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Label } from '../ui/Label'
import { Card } from '../ui/Card'
import { Select } from '../ui/Select'
import { RadioGroup } from '../ui/RadioGroup'
import { Checkbox } from '../ui/Checkbox'
import { CholesterolCalculatorSchema, type CholesterolCalculatorInput, type CholesterolCalculatorResult } from '../../lib/schemas/cholesterol'
import { calculateCholesterol } from '../../lib/calculations/cholesterol'

export function CholesterolCalculator() {
  const [formData, setFormData] = useState<Partial<CholesterolCalculatorInput>>({
    totalCholesterol: 200,
    hdlCholesterol: 50,
    triglycerides: 150,
    cholesterolUnit: 'mg_dl',
    age: 45,
    gender: 'male',
    smokingStatus: 'never',
    diabetesStatus: 'none',
    familyHistory: 'none',
    physicalActivity: 'moderate',
    diet: 'average',
    riskAssessment: 'basic',
    priorCVD: false,
    kidneyDisease: false,
    inflammatoryCondition: false,
    hypertensionTreatment: false,
    statinUse: false,
    otherLipidMeds: false
  })
  
  const [result, setResult] = useState<CholesterolCalculatorResult | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isCalculating, setIsCalculating] = useState(false)

  const handleInputChange = (field: keyof CholesterolCalculatorInput, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleCalculate = async () => {
    setIsCalculating(true)
    setErrors({})
    
    try {
      const input = CholesterolCalculatorSchema.parse(formData)
      const calculationResult = calculateCholesterol(input)
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
    return formData.totalCholesterol && formData.hdlCholesterol && formData.triglycerides && 
           formData.age && formData.gender
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Calculator Form */}
        <div className="lg:col-span-1">
        <Card className="p-6 bg-white border border-emerald-100 shadow-lg">
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Cholesterol Calculator</h2>
              <p className="text-gray-600 text-sm">Assess your cardiovascular risk and cholesterol levels</p>
            </div>

            {/* Cholesterol Panel */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-emerald-200 pb-2 flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Cholesterol Panel
              </h3>
              
              <div className="space-y-3">
                <div>
                  <Label htmlFor="cholesterolUnit">Units</Label>
                  <Select
                    value={formData.cholesterolUnit || 'mg_dl'}
                    onValueChange={(value) => handleInputChange('cholesterolUnit', value)}
                  >
                    <option value="mg_dl">mg/dL (US)</option>
                    <option value="mmol_l">mmol/L (International)</option>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="totalCholesterol">
                    Total Cholesterol ({formData.cholesterolUnit === 'mg_dl' ? 'mg/dL' : 'mmol/L'})
                  </Label>
                  <Input
                    id="totalCholesterol"
                    type="number"
                    value={formData.totalCholesterol || ''}
                    onChange={(e) => handleInputChange('totalCholesterol', Number(e.target.value))}
                    className={errors.totalCholesterol ? 'border-red-500' : 'border-emerald-200 focus:border-emerald-500'}
                  />
                  {errors.totalCholesterol && <p className="text-red-500 text-xs mt-1">{errors.totalCholesterol}</p>}
                </div>

                <div>
                  <Label htmlFor="hdlCholesterol">
                    HDL Cholesterol ({formData.cholesterolUnit === 'mg_dl' ? 'mg/dL' : 'mmol/L'})
                  </Label>
                  <Input
                    id="hdlCholesterol"
                    type="number"
                    value={formData.hdlCholesterol || ''}
                    onChange={(e) => handleInputChange('hdlCholesterol', Number(e.target.value))}
                    className={errors.hdlCholesterol ? 'border-red-500' : 'border-emerald-200 focus:border-emerald-500'}
                  />
                  {errors.hdlCholesterol && <p className="text-red-500 text-xs mt-1">{errors.hdlCholesterol}</p>}
                </div>

                <div>
                  <Label htmlFor="ldlCholesterol">
                    LDL Cholesterol ({formData.cholesterolUnit === 'mg_dl' ? 'mg/dL' : 'mmol/L'}) (Optional)
                  </Label>
                  <Input
                    id="ldlCholesterol"
                    type="number"
                    value={formData.ldlCholesterol || ''}
                    onChange={(e) => handleInputChange('ldlCholesterol', Number(e.target.value) || undefined)}
                    className={errors.ldlCholesterol ? 'border-red-500' : 'border-emerald-200 focus:border-emerald-500'}
                    placeholder="Will be calculated if not provided"
                  />
                  {errors.ldlCholesterol && <p className="text-red-500 text-xs mt-1">{errors.ldlCholesterol}</p>}
                </div>

                <div>
                  <Label htmlFor="triglycerides">
                    Triglycerides ({formData.cholesterolUnit === 'mg_dl' ? 'mg/dL' : 'mmol/L'})
                  </Label>
                  <Input
                    id="triglycerides"
                    type="number"
                    value={formData.triglycerides || ''}
                    onChange={(e) => handleInputChange('triglycerides', Number(e.target.value))}
                    className={errors.triglycerides ? 'border-red-500' : 'border-emerald-200 focus:border-emerald-500'}
                  />
                  {errors.triglycerides && <p className="text-red-500 text-xs mt-1">{errors.triglycerides}</p>}
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-emerald-200 pb-2 flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    className={errors.age ? 'border-red-500' : 'border-emerald-200 focus:border-emerald-500'}
                  />
                  {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
                </div>

                <div>
                  <Label>Gender</Label>
                  <RadioGroup
                    value={formData.gender || 'male'}
                    onValueChange={(value) => handleInputChange('gender', value)}
                    options={[
                      { value: 'male', label: 'Male' },
                      { value: 'female', label: 'Female' }
                    ]}
                    className="flex gap-4 mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Risk Factors */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-emerald-200 pb-2 flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Risk Factors
              </h3>
              
              <div className="space-y-3">
                <div>
                  <Label>Smoking Status</Label>
                  <Select
                    value={formData.smokingStatus || 'never'}
                    onValueChange={(value) => handleInputChange('smokingStatus', value)}
                  >
                    <option value="never">Never smoked</option>
                    <option value="former">Former smoker</option>
                    <option value="current">Current smoker</option>
                  </Select>
                </div>

                <div>
                  <Label>Diabetes Status</Label>
                  <Select
                    value={formData.diabetesStatus || 'none'}
                    onValueChange={(value) => handleInputChange('diabetesStatus', value)}
                  >
                    <option value="none">No diabetes</option>
                    <option value="prediabetes">Prediabetes</option>
                    <option value="type1">Type 1 diabetes</option>
                    <option value="type2">Type 2 diabetes</option>
                  </Select>
                </div>

                <div>
                  <Label>Family History</Label>
                  <Select
                    value={formData.familyHistory || 'none'}
                    onValueChange={(value) => handleInputChange('familyHistory', value)}
                  >
                    <option value="none">No family history</option>
                    <option value="premature_cad">Premature coronary disease</option>
                    <option value="stroke">Stroke</option>
                    <option value="both">Both</option>
                  </Select>
                </div>

                <div>
                  <Label>Physical Activity Level</Label>
                  <Select
                    value={formData.physicalActivity || 'moderate'}
                    onValueChange={(value) => handleInputChange('physicalActivity', value)}
                  >
                    <option value="sedentary">Sedentary</option>
                    <option value="low">Low activity</option>
                    <option value="moderate">Moderate activity</option>
                    <option value="high">High activity</option>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="priorCVD"
                      checked={formData.priorCVD || false}
                      onCheckedChange={(checked) => handleInputChange('priorCVD', checked)}
                    />
                    <Label htmlFor="priorCVD">Prior cardiovascular disease</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hypertensionTreatment"
                      checked={formData.hypertensionTreatment || false}
                      onCheckedChange={(checked) => handleInputChange('hypertensionTreatment', checked)}
                    />
                    <Label htmlFor="hypertensionTreatment">Taking blood pressure medication</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="statinUse"
                      checked={formData.statinUse || false}
                      onCheckedChange={(checked) => handleInputChange('statinUse', checked)}
                    />
                    <Label htmlFor="statinUse">Currently taking statin</Label>
                  </div>
                </div>
              </div>
            </div>

            <Button
              onClick={handleCalculate}
              disabled={!isValid() || isCalculating}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
            >
              {isCalculating ? 'Analyzing...' : 'Calculate Risk'}
            </Button>
          </div>
        </Card>
        </div>

        {/* Results */}
        {result ? (
          <div className="lg:col-span-2 space-y-6">
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

          {/* Cardiovascular Risk Overview */}
          <Card className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              Cardiovascular Risk Assessment
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">{result.cardiovascularRisk.tenYearRisk}%</div>
                <div className="text-sm text-gray-600">10-Year Risk</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-teal-600">{result.cardiovascularRisk.lifetimeRisk}%</div>
                <div className="text-sm text-gray-600">Lifetime Risk</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold capitalize ${
                  result.cardiovascularRisk.riskCategory === 'low' ? 'text-green-600' :
                  result.cardiovascularRisk.riskCategory === 'borderline' ? 'text-yellow-600' :
                  result.cardiovascularRisk.riskCategory === 'intermediate' ? 'text-orange-600' :
                  'text-red-600'
                }`}>
                  {result.cardiovascularRisk.riskCategory}
                </div>
                <div className="text-sm text-gray-600">Risk Category</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{result.treatmentRecommendations.ldlTarget}</div>
                <div className="text-sm text-gray-600">LDL Target mg/dL</div>
              </div>
            </div>
          </Card>

          {/* Cholesterol Readings */}
          <Card className="p-6 bg-white border border-emerald-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Cholesterol Analysis</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.cholesterolReadings.map((reading) => (
                <div key={reading.type} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 capitalize">
                      {reading.type.replace('_', ' ')} Cholesterol
                    </h3>
                    <div className={`w-4 h-4 rounded-full ${
                      reading.category.color === 'green' ? 'bg-green-500' :
                      reading.category.color === 'yellow' ? 'bg-yellow-500' :
                      reading.category.color === 'orange' ? 'bg-orange-500' :
                      reading.category.color === 'red' ? 'bg-red-500' :
                      'bg-gray-500'
                    }`}></div>
                  </div>
                  
                  <div className="mb-2">
                    <span className="text-2xl font-bold text-gray-900">{reading.value}</span>
                    <span className="text-sm text-gray-600 ml-1">{reading.unit === 'mg_dl' ? 'mg/dL' : 'mmol/L'}</span>
                  </div>
                  
                  <div className="mb-2">
                    <span className={`text-sm font-medium ${
                      reading.category.color === 'green' ? 'text-green-700' :
                      reading.category.color === 'yellow' ? 'text-yellow-700' :
                      reading.category.color === 'orange' ? 'text-orange-700' :
                      reading.category.color === 'red' ? 'text-red-700' :
                      'text-gray-700'
                    }`}>
                      {reading.category.label}
                    </span>
                  </div>
                  
                  <div className="text-xs text-gray-600 mb-2">
                    Target: {reading.targetRange}
                  </div>
                  
                  <div className="text-xs text-gray-600">
                    Range: {reading.category.range}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Cholesterol Ratios */}
          <Card className="p-6 bg-white border border-emerald-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Cholesterol Ratios</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900">Total/HDL</div>
                <div className="text-2xl font-bold text-emerald-600">{result.cholesterolRatios.totalToHdl.value}</div>
                <div className={`text-sm font-medium ${
                  result.cholesterolRatios.totalToHdl.category.color === 'green' ? 'text-green-700' :
                  result.cholesterolRatios.totalToHdl.category.color === 'yellow' ? 'text-yellow-700' :
                  'text-red-700'
                }`}>
                  {result.cholesterolRatios.totalToHdl.category.label}
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900">LDL/HDL</div>
                <div className="text-2xl font-bold text-teal-600">{result.cholesterolRatios.ldlToHdl.value}</div>
                <div className={`text-sm font-medium ${
                  result.cholesterolRatios.ldlToHdl.category.color === 'green' ? 'text-green-700' :
                  result.cholesterolRatios.ldlToHdl.category.color === 'yellow' ? 'text-yellow-700' :
                  'text-red-700'
                }`}>
                  {result.cholesterolRatios.ldlToHdl.category.label}
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900">Triglycerides/HDL</div>
                <div className="text-2xl font-bold text-cyan-600">{result.cholesterolRatios.triglycerideToHdl.value}</div>
                <div className={`text-sm font-medium ${
                  result.cholesterolRatios.triglycerideToHdl.category.color === 'green' ? 'text-green-700' :
                  result.cholesterolRatios.triglycerideToHdl.category.color === 'yellow' ? 'text-yellow-700' :
                  'text-red-700'
                }`}>
                  {result.cholesterolRatios.triglycerideToHdl.category.label}
                </div>
              </div>
            </div>
          </Card>

          {/* Treatment Recommendations */}
          <Card className="p-6 bg-white border border-emerald-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Treatment Recommendations</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Statin Recommendation</h3>
                  <div className={`p-3 rounded-lg ${
                    result.treatmentRecommendations.statinRecommendation.indicated ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50 border border-gray-200'
                  }`}>
                    <div className="font-medium text-gray-900">
                      {result.treatmentRecommendations.statinRecommendation.indicated ? 
                        `${result.treatmentRecommendations.statinRecommendation.intensity.charAt(0).toUpperCase() + result.treatmentRecommendations.statinRecommendation.intensity.slice(1)} intensity statin` :
                        'No statin indicated'
                      }
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {result.treatmentRecommendations.statinRecommendation.reasoning}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Treatment Priority</h3>
                  <div className={`p-3 rounded-lg ${
                    result.treatmentRecommendations.treatmentPriority === 'medication_indicated' ? 'bg-red-50 border border-red-200' :
                    result.treatmentRecommendations.treatmentPriority === 'medication_consideration' ? 'bg-yellow-50 border border-yellow-200' :
                    'bg-green-50 border border-green-200'
                  }`}>
                    <div className="font-medium text-gray-900 capitalize">
                      {result.treatmentRecommendations.treatmentPriority.replace('_', ' ')}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      LDL target: &lt;{result.treatmentRecommendations.ldlTarget} mg/dL
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Lifestyle Interventions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {result.treatmentRecommendations.lifestyleInterventions.map((intervention, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-gray-900">{intervention.category}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          intervention.priority === 'high' ? 'bg-red-100 text-red-700' :
                          intervention.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {intervention.priority}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mb-1">{intervention.intervention}</div>
                      <div className="text-xs text-emerald-600 font-medium">{intervention.expectedBenefit}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Health Insights */}
          {result.healthInsights.length > 0 && (
            <Card className="p-6 bg-white border border-emerald-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Health Insights</h2>
              
              <div className="space-y-3">
                {result.healthInsights.map((insight, index) => (
                  <div key={index} className="border-l-4 border-emerald-500 pl-4 py-2 bg-emerald-50">
                    <h3 className="font-semibold text-gray-900">{insight.category}</h3>
                    <p className="text-sm text-gray-700">{insight.insight}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Cross-reference */}
          <div className="text-center py-4 border-t border-emerald-200">
            <p className="text-sm text-gray-600">
              Want to assess overall cardiovascular health? 
              <a href="/tools/heart-health/blood-pressure-calculator" className="text-emerald-600 hover:text-emerald-700 underline ml-1">
                Check your blood pressure
              </a>
            </p>
          </div>
          </div>
        ) : (
          /* Ready to Calculate State */
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-emerald-100 shadow-lg p-8 text-center">
              <div className="max-w-md mx-auto">
                {/* Heart Health Icon */}
                <div className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Calculate</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Enter your cholesterol panel values and personal information to get your cardiovascular risk assessment and personalized treatment recommendations.
                </p>
                
                {/* Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                    <div className="flex items-center justify-center w-8 h-8 bg-emerald-500 rounded-full mx-auto mb-2">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-emerald-800 mb-1">Accurate Analysis</h4>
                    <p className="text-sm text-emerald-700">Evidence-based risk assessment using clinical guidelines</p>
                  </div>
                  
                  <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                    <div className="flex items-center justify-center w-8 h-8 bg-teal-500 rounded-full mx-auto mb-2">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-teal-800 mb-1">Instant Results</h4>
                    <p className="text-sm text-teal-700">Get comprehensive analysis in seconds</p>
                  </div>
                </div>
                
                {/* Quick Tips */}
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <svg className="w-5 h-5 text-emerald-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <h5 className="font-medium text-emerald-800 mb-1">💡 Quick Tip</h5>
                      <p className="text-sm text-emerald-700">
                        If you don't have your LDL value, that's okay! We'll calculate it using your total cholesterol, HDL, and triglycerides.
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
  )
}