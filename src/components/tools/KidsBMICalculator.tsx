'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Select } from '@/components/ui/Select'
import { calculateKidsBMI } from '@/lib/calculations/kidsBMI'
import { KidsBMICalculatorInput, KidsBMICalculatorResult } from '@/lib/schemas/kidsBMI'
import { 
  Baby, 
  Heart, 
  AlertCircle,
  TrendingUp,
  Activity,
  Apple,
  Clock
} from 'lucide-react'

interface KidsFormData {
  age: number
  ageMonths: number
  gender: 'male' | 'female'
  height: number
  heightUnit: 'cm' | 'ft_in'
  heightFeet: number
  heightInches: number
  weight: number
  weightUnit: 'kg' | 'lbs'
  measurementContext: 'home' | 'clinic' | 'school'
  recentGrowthConcerns: boolean
  motherHeight?: number
  fatherHeight?: number
}

const GrowthChartVisual: React.FC<{ result: KidsBMICalculatorResult }> = ({ result }) => {
  const percentile = result.growthChart.percentile
  const category = result.growthChart.category
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">BMI Percentile Chart</h3>
        <p className="text-sm text-gray-600">Compared to children of the same age and sex</p>
      </div>
      
      {/* Percentile Visualization */}
      <div className="relative mb-6">
        <div className="w-full h-8 bg-gradient-to-r from-blue-200 via-green-200 via-yellow-200 to-red-200 rounded-full">
          <div 
            className="absolute top-0 w-4 h-8 bg-gray-800 rounded-full transform -translate-x-2"
            style={{ left: `${percentile}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>0%</span>
          <span>25%</span>
          <span>50%</span>
          <span>75%</span>
          <span>100%</span>
        </div>
      </div>
      
      {/* Category Information */}
      <div className={`p-4 rounded-lg border-2 ${
        category.category === 'underweight' ? 'bg-blue-50 border-blue-200' :
        category.category === 'healthy_weight' ? 'bg-green-50 border-green-200' :
        category.category === 'overweight' ? 'bg-yellow-50 border-yellow-200' :
        'bg-red-50 border-red-200'
      }`}>
        <div className="text-center">
          <div className={`text-2xl font-bold ${category.color}`}>
            {percentile}th Percentile
          </div>
          <div className={`text-lg font-semibold ${category.color} mt-1`}>
            {category.label}
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {category.description}
          </p>
        </div>
      </div>
      
      {/* Percentile Ranges */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-blue-600 font-semibold">Underweight</div>
          <div className="text-xs text-blue-600">&lt; 5th percentile</div>
        </div>
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="text-green-600 font-semibold">Healthy</div>
          <div className="text-xs text-green-600">5th - 85th percentile</div>
        </div>
        <div className="text-center p-3 bg-yellow-50 rounded-lg">
          <div className="text-yellow-600 font-semibold">Overweight</div>
          <div className="text-xs text-yellow-600">85th - 95th percentile</div>
        </div>
        <div className="text-center p-3 bg-red-50 rounded-lg">
          <div className="text-red-600 font-semibold">Obese</div>
          <div className="text-xs text-red-600">≥ 95th percentile</div>
        </div>
      </div>
    </div>
  )
}

const NutritionalGuidanceCard: React.FC<{ guidance: KidsBMICalculatorResult['nutritionalGuidance'] }> = ({ guidance }) => {
  const [activeTab, setActiveTab] = useState<'calories' | 'servings' | 'hydration'>('calories')
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Apple className="w-5 h-5 text-green-600" />
        <h3 className="text-lg font-semibold text-gray-900">Nutritional Guidance</h3>
      </div>
      
      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-4 bg-gray-100 rounded-lg p-1">
        {[
          { key: 'calories', label: 'Calories' },
          { key: 'servings', label: 'Servings' },
          { key: 'hydration', label: 'Hydration' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? 'bg-white text-green-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {/* Tab Content */}
      {activeTab === 'calories' && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-blue-600 font-semibold">{guidance.dailyCalories.sedentary}</div>
              <div className="text-xs text-blue-600">Sedentary</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-green-600 font-semibold">{guidance.dailyCalories.moderatelyActive}</div>
              <div className="text-xs text-green-600">Moderate</div>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <div className="text-orange-600 font-semibold">{guidance.dailyCalories.active}</div>
              <div className="text-xs text-orange-600">Active</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span className="text-sm font-medium">Protein</span>
              <span className="text-sm text-gray-600">{guidance.macronutrients.protein.grams}g ({guidance.macronutrients.protein.percentage}%)</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span className="text-sm font-medium">Carbohydrates</span>
              <span className="text-sm text-gray-600">{guidance.macronutrients.carbohydrates.grams}g ({guidance.macronutrients.carbohydrates.percentage}%)</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span className="text-sm font-medium">Fats</span>
              <span className="text-sm text-gray-600">{guidance.macronutrients.fats.grams}g ({guidance.macronutrients.fats.percentage}%)</span>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'servings' && (
        <div className="space-y-3">
          {guidance.servingSizes.map((serving, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-3">
              <div className="flex justify-between items-start mb-2">
                <div className="font-medium text-gray-900">{serving.category}</div>
                <div className="text-sm text-green-600 font-semibold">{serving.dailyServings}</div>
              </div>
              <div className="text-sm text-gray-600 mb-2">Serving size: {serving.servingSize}</div>
              <div className="flex flex-wrap gap-1">
                {serving.examples.map((example, idx) => (
                  <span key={idx} className="px-2 py-1 bg-gray-100 rounded text-xs">{example}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {activeTab === 'hydration' && (
        <div className="space-y-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{guidance.hydrationNeeds.dailyWater}</div>
            <div className="text-blue-600 font-medium">{guidance.hydrationNeeds.unit} per day</div>
          </div>
          <p className="text-sm text-gray-600 text-center">
            {guidance.hydrationNeeds.activityAdjustment}
          </p>
        </div>
      )}
    </div>
  )
}

const ActivityRecommendationsCard: React.FC<{ recommendations: KidsBMICalculatorResult['activityRecommendations'] }> = ({ recommendations }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Activity className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Activity Recommendations</h3>
      </div>
      
      {/* Daily Activity Goals */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-blue-600 font-semibold">{recommendations.dailyActivity.moderateIntensity}</div>
          <div className="text-xs text-blue-600">Minutes Moderate</div>
        </div>
        <div className="text-center p-3 bg-orange-50 rounded-lg">
          <div className="text-orange-600 font-semibold">{recommendations.dailyActivity.vigorousIntensity}</div>
          <div className="text-xs text-orange-600">Minutes Vigorous</div>
        </div>
      </div>
      
      {/* Age-Appropriate Activities */}
      <div className="space-y-3 mb-6">
        <h4 className="font-medium text-gray-900">Recommended Activities</h4>
        {recommendations.ageAppropriateActivities.map((activity, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-3">
            <div className="flex justify-between items-start mb-1">
              <div className="font-medium text-gray-900">{activity.activity}</div>
              <div className="text-sm text-blue-600 font-semibold">{activity.frequency}</div>
            </div>
            <p className="text-sm text-gray-600">{activity.benefits}</p>
          </div>
        ))}
      </div>
      
      {/* Screen Time & Sleep */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-yellow-50 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="w-4 h-4 text-yellow-600" />
            <span className="font-medium text-yellow-800">Screen Time</span>
          </div>
          <div className="text-yellow-600 font-semibold">Max {recommendations.screenTimeGuidelines.maxDailyHours} hours/day</div>
        </div>
        <div className="p-3 bg-purple-50 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Heart className="w-4 h-4 text-purple-600" />
            <span className="font-medium text-purple-800">Sleep</span>
          </div>
          <div className="text-purple-600 font-semibold">{recommendations.sleepRequirements.hoursPerNight}</div>
        </div>
      </div>
    </div>
  )
}

const DevelopmentalInsights: React.FC<{ context: KidsBMICalculatorResult['developmentalContext'], predictedHeight: KidsBMICalculatorResult['predictedAdultHeight'] }> = ({ context, predictedHeight }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-4">
        <TrendingUp className="w-5 h-5 text-purple-600" />
        <h3 className="text-lg font-semibold text-gray-900">Growth & Development</h3>
      </div>
      
      {/* Growth Phase */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-2">Current Growth Phase</h4>
        <div className="p-3 bg-purple-50 rounded-lg">
          <div className="font-semibold text-purple-800 capitalize">{context.growthPhase.replace('_', ' ')}</div>
          <p className="text-sm text-purple-700 mt-1">{context.typicalGrowthPattern}</p>
        </div>
      </div>
      
      {/* Predicted Adult Height */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-2">Predicted Adult Height</h4>
        <div className="p-3 bg-green-50 rounded-lg">
          <div className="text-green-600 font-semibold text-lg">{predictedHeight.height} cm</div>
          <div className="text-sm text-green-700">
            Range: {predictedHeight.range.min}-{predictedHeight.range.max} cm
          </div>
          <div className="text-xs text-green-600 mt-1">
            {predictedHeight.confidence} confidence • {predictedHeight.method}
          </div>
        </div>
      </div>
      
      {/* Developmental Milestones */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-2">Key Developmental Areas</h4>
        <div className="space-y-2">
          {context.developmentalMilestones.map((milestone, index) => (
            <div key={index} className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
              <span className="text-sm text-gray-700">{milestone}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Parenting Tips */}
      <div>
        <h4 className="font-medium text-gray-900 mb-2">Parenting Tips</h4>
        <div className="space-y-2">
          {context.parentingTips.map((tip, index) => (
            <div key={index} className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
              <span className="text-sm text-gray-700">{tip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export const KidsBMICalculator: React.FC = () => {
  const [formData, setFormData] = useState<KidsFormData>({
    age: 8,
    ageMonths: 0,
    gender: 'male',
    height: 125,
    heightUnit: 'cm',
    heightFeet: 4,
    heightInches: 1,
    weight: 25,
    weightUnit: 'kg',
    measurementContext: 'home',
    recentGrowthConcerns: false,
    motherHeight: undefined,
    fatherHeight: undefined
  })
  const [result, setResult] = useState<KidsBMICalculatorResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {}
    
    if (formData.age < 2 || formData.age > 19) {
      newErrors.age = 'Age must be between 2 and 19 years'
    }

    if (formData.heightUnit === 'ft_in') {
      if (formData.heightFeet < 1 || formData.heightFeet > 8) {
        newErrors.heightFeet = 'Height must be realistic'
      }
      if (formData.heightInches < 0 || formData.heightInches > 11) {
        newErrors.heightInches = 'Inches must be 0-11'
      }
    } else {
      if (formData.height < 50 || formData.height > 250) {
        newErrors.height = 'Height must be between 50-250 cm'
      }
    }

    if (formData.weight < 5 || formData.weight > 200) {
      newErrors.weight = 'Weight must be realistic'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleCalculate = async () => {
    if (!validateForm()) return

    setIsCalculating(true)
    
    await new Promise(resolve => setTimeout(resolve, 800))

    try {
      const input: KidsBMICalculatorInput = {
        age: formData.age,
        ageMonths: formData.ageMonths,
        gender: formData.gender,
        height: formData.height,
        heightUnit: formData.heightUnit,
        heightFeet: formData.heightFeet,
        heightInches: formData.heightInches,
        weight: formData.weight,
        weightUnit: formData.weightUnit,
        measurementContext: formData.measurementContext,
        recentGrowthConcerns: formData.recentGrowthConcerns,
        parentHeights: formData.motherHeight || formData.fatherHeight ? {
          motherHeight: formData.motherHeight,
          fatherHeight: formData.fatherHeight
        } : undefined
      }

      const calculationResult = calculateKidsBMI(input)
      setResult(calculationResult)
      
      setTimeout(() => {
        const resultsElement = document.querySelector('#kids-bmi-results')
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    } catch (error) {
      console.error('Calculation error:', error)
    } finally {
      setIsCalculating(false)
    }
  }

  const handleReset = () => {
    setFormData({
      age: 8,
      ageMonths: 0,
      gender: 'male',
      height: 125,
      heightUnit: 'cm',
      heightFeet: 4,
      heightInches: 1,
      weight: 25,
      weightUnit: 'kg',
      measurementContext: 'home',
      recentGrowthConcerns: false,
      motherHeight: undefined,
      fatherHeight: undefined
    })
    setResult(null)
    setErrors({})
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <Baby className="w-4 h-4" />
            <span>Pediatric Health & Growth</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Kids BMI Calculator
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Track your child's healthy growth with age and sex-specific BMI percentiles and developmental guidance
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
                  <Baby className="w-5 h-5 text-blue-600" />
                  <span>Child's Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Age */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="age" required>Age (years)</Label>
                    <Input
                      id="age"
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 8 })}
                      min={2}
                      max={19}
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
                  <div>
                    <Label htmlFor="ageMonths">Additional Months</Label>
                    <Input
                      id="ageMonths"
                      type="number"
                      value={formData.ageMonths}
                      onChange={(e) => setFormData({ ...formData, ageMonths: parseInt(e.target.value) || 0 })}
                      min={0}
                      max={11}
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* Gender */}
                <div>
                  <Label htmlFor="gender" required>Gender</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value: 'male' | 'female') => setFormData({ ...formData, gender: value })}
                    className="mt-1"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Select>
                </div>

                {/* Height */}
                <div>
                  <Label htmlFor="height" required>Height</Label>
                  <div className="flex space-x-2 mt-1">
                    <Select
                      value={formData.heightUnit}
                      onValueChange={(value: 'cm' | 'ft_in') => setFormData({ ...formData, heightUnit: value })}
                      className="w-20"
                    >
                      <option value="cm">cm</option>
                      <option value="ft_in">ft/in</option>
                    </Select>
                    {formData.heightUnit === 'cm' ? (
                      <Input
                        type="number"
                        value={formData.height}
                        onChange={(e) => setFormData({ ...formData, height: parseFloat(e.target.value) || 125 })}
                        min={50}
                        max={250}
                        error={!!errors.height}
                        className="flex-1"
                      />
                    ) : (
                      <div className="flex space-x-1 flex-1">
                        <Input
                          type="number"
                          value={formData.heightFeet}
                          onChange={(e) => setFormData({ ...formData, heightFeet: parseInt(e.target.value) || 4 })}
                          min={1}
                          max={8}
                          error={!!errors.heightFeet}
                          placeholder="ft"
                          className="flex-1"
                        />
                        <Input
                          type="number"
                          value={formData.heightInches}
                          onChange={(e) => setFormData({ ...formData, heightInches: parseInt(e.target.value) || 1 })}
                          min={0}
                          max={11}
                          error={!!errors.heightInches}
                          placeholder="in"
                          className="flex-1"
                        />
                      </div>
                    )}
                  </div>
                  {(errors.height || errors.heightFeet || errors.heightInches) && (
                    <p className="text-red-600 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.height || errors.heightFeet || errors.heightInches}
                    </p>
                  )}
                </div>

                {/* Weight */}
                <div>
                  <Label htmlFor="weight" required>Weight</Label>
                  <div className="flex space-x-2 mt-1">
                    <Select
                      value={formData.weightUnit}
                      onValueChange={(value: 'kg' | 'lbs') => setFormData({ ...formData, weightUnit: value })}
                      className="w-20"
                    >
                      <option value="kg">kg</option>
                      <option value="lbs">lbs</option>
                    </Select>
                    <Input
                      type="number"
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: parseFloat(e.target.value) || 25 })}
                      min={5}
                      max={200}
                      error={!!errors.weight}
                      className="flex-1"
                    />
                  </div>
                  {errors.weight && (
                    <p className="text-red-600 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.weight}
                    </p>
                  )}
                </div>

                {/* Optional Parent Heights */}
                <div className="border-t pt-4">
                  <Label className="text-sm font-medium text-gray-700 mb-3 block">
                    Parent Heights (optional - for height prediction)
                  </Label>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="motherHeight" className="text-sm">Mother (cm)</Label>
                      <Input
                        id="motherHeight"
                        type="number"
                        value={formData.motherHeight || ''}
                        onChange={(e) => setFormData({ ...formData, motherHeight: parseFloat(e.target.value) || undefined })}
                        min={120}
                        max={200}
                        placeholder="Optional"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="fatherHeight" className="text-sm">Father (cm)</Label>
                      <Input
                        id="fatherHeight"
                        type="number"
                        value={formData.fatherHeight || ''}
                        onChange={(e) => setFormData({ ...formData, fatherHeight: parseFloat(e.target.value) || undefined })}
                        min={120}
                        max={220}
                        placeholder="Optional"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  <Button
                    onClick={handleCalculate}
                    disabled={isCalculating}
                    className="flex-1 h-12"
                  >
                    {isCalculating ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Calculating...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4" />
                        <span>Calculate BMI</span>
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
                id="kids-bmi-results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Quick Stats */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="text-sm text-gray-500">BMI</div>
                    <div className="text-2xl font-bold text-blue-600">{result.bmi}</div>
                    <div className="text-xs text-gray-500">{result.bmiUnit}</div>
                  </div>
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="text-sm text-gray-500">Percentile</div>
                    <div className="text-2xl font-bold text-green-600">{result.growthChart.percentile}th</div>
                    <div className="text-xs text-gray-500">For age & sex</div>
                  </div>
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="text-sm text-gray-500">Category</div>
                    <div className={`text-lg font-bold ${result.growthChart.category.color}`}>
                      {result.growthChart.category.label}
                    </div>
                    <div className="text-xs text-gray-500">{result.growthChart.category.percentileRange}</div>
                  </div>
                </div>

                {/* Growth Chart */}
                <GrowthChartVisual result={result} />
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
                  <p className="text-gray-600">Enter your child's information to assess their growth and get personalized guidance</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Additional Results - Show only with results */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 grid lg:grid-cols-3 gap-8"
          >
            <NutritionalGuidanceCard guidance={result.nutritionalGuidance} />
            <ActivityRecommendationsCard recommendations={result.activityRecommendations} />
            <DevelopmentalInsights context={result.developmentalContext} predictedHeight={result.predictedAdultHeight} />
          </motion.div>
        )}

        {/* Educational Content - Always visible */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16"
        >
          {/* General Educational Cards */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Understanding BMI for Kids */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Baby className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Understanding Kids BMI</h3>
              </div>
              <p className="text-gray-700 text-sm mb-4">
                Children's BMI is interpreted using age and sex-specific percentiles, not adult standards. 
                A healthy range is typically between the 5th and 85th percentiles.
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full" />
                  <span className="text-sm text-gray-600">Accounts for normal growth patterns</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span className="text-sm text-gray-600">Compares to children of same age/sex</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full" />
                  <span className="text-sm text-gray-600">One indicator among many for health</span>
                </div>
              </div>
            </div>

            {/* Healthy Growth Tips */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">Healthy Growth Tips</h3>
              </div>
              <p className="text-gray-700 text-sm mb-4">
                Support your child's healthy development with these evidence-based strategies 
                recommended by pediatric health experts.
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span className="text-sm text-gray-600">Regular family meals together</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full" />
                  <span className="text-sm text-gray-600">Daily physical activity and play</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full" />
                  <span className="text-sm text-gray-600">Adequate sleep for age group</span>
                </div>
              </div>
            </div>

            {/* When to Consult Doctor */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                <h3 className="text-lg font-semibold text-gray-900">When to Consult Doctor</h3>
              </div>
              <p className="text-gray-700 text-sm mb-4">
                Regular pediatric check-ups are important for monitoring growth. Consult your healthcare 
                provider for concerning changes or questions.
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full" />
                  <span className="text-sm text-gray-600">Significant percentile changes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <span className="text-sm text-gray-600">Eating or growth concerns</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <span className="text-sm text-gray-600">Body image or self-esteem issues</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}