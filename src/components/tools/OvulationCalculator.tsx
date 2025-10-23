'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { calculateOvulation } from '@/lib/calculations/ovulation'
import { OvulationCalculatorInput, OvulationCalculatorResult } from '@/lib/schemas/ovulation'
import { 
  Calendar, 
  Heart, 
  AlertCircle
} from 'lucide-react'

interface OvulationFormData {
  lastMenstrualPeriod: string
  cycleLength: number
  periodLength: number
}

const FertilityTimeline: React.FC<{ result: OvulationCalculatorResult }> = ({ result }) => {
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null)
  
  const timelineEvents = [
    {
      id: 'fertile-window',
      icon: '🌸',
      title: 'Fertile Window',
      dateRange: `${new Date(result.fertileWindowStart).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${new Date(result.fertileWindowEnd).toLocaleDateString('en-US', { day: 'numeric' })}`,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-800',
      content: 'Your most fertile days when conception is most likely to occur. Sperm can survive up to 5 days, so intercourse during this window maximizes your chances of pregnancy.'
    },
    {
      id: 'ovulation',
      icon: '🥚',
      title: 'Approximate Ovulation',
      dateRange: new Date(result.ovulationDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-800',
      content: 'The day when your ovary releases an egg. This is your peak fertility day. The egg is viable for 12-24 hours after ovulation.'
    },
    {
      id: 'next-period',
      icon: '🔴',
      title: 'Next Period',
      dateRange: new Date(result.nextPeriodDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-800',
      content: 'Expected start date of your next menstrual period. If pregnancy occurs, your period will be delayed or missed entirely.'
    },
    {
      id: 'pregnancy-test',
      icon: '🧪',
      title: 'Pregnancy Test Day',
      dateRange: new Date(new Date(result.nextPeriodDate).getTime() + 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-800',
      content: 'The earliest recommended day to take a home pregnancy test for accurate results. Testing too early may give false negatives.'
    },
    {
      id: 'due-date',
      icon: '👶',
      title: 'Estimated Due Date',
      dateRange: new Date(new Date(result.ovulationDate).getTime() + 266 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-800',
      content: 'If conception occurs during ovulation, this would be your estimated due date. Only about 5% of babies are born on their exact due date.'
    }
  ]

  const toggleEvent = (eventId: string) => {
    setExpandedEvent(expandedEvent === eventId ? null : eventId)
  }

  return (
    <div className="space-y-2">
      {timelineEvents.map((event, index) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`rounded-lg border ${event.bgColor} ${event.borderColor} hover:shadow-sm transition-all`}
        >
          <div 
            className="flex items-center justify-between p-3 cursor-pointer"
            onClick={() => toggleEvent(event.id)}
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                <span className="text-lg">{event.icon}</span>
              </div>
              <div>
                <h4 className={`font-medium text-sm ${event.textColor}`}>{event.title}</h4>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`font-semibold text-sm ${event.textColor}`}>{event.dateRange}</div>
              <motion.div
                animate={{ rotate: expandedEvent === event.id ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.div>
            </div>
          </div>
          
          {expandedEvent === event.id && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="px-3 pb-3"
            >
              <div className="pl-11">
                <p className={`text-xs leading-relaxed ${event.textColor} opacity-80`}>
                  {event.content}
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  )
}

const InteractiveCalendar: React.FC<{ result: OvulationCalculatorResult }> = ({ result }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  
  // Get the current month and year
  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()
  
  // Get first day of the month and number of days
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  
  // Create array of days
  const days = Array.from({ length: daysInMonth }, (_, index) => index + 1)
  const emptyDays = Array.from({ length: firstDay }, () => null)
  
  // Parse result dates
  const fertileStart = new Date(result.fertileWindowStart)
  const fertileEnd = new Date(result.fertileWindowEnd)
  const ovulationDate = new Date(result.ovulationDate)
  const nextPeriod = new Date(result.nextPeriodDate)
  
  const getDayStyle = (day: number) => {
    const currentDate = new Date(year, month, day)
    const today = new Date()
    const isToday = currentDate.toDateString() === today.toDateString()
    
    // Normalize dates to avoid timezone issues
    const normalizeDate = (date: Date) => {
      const normalized = new Date(date)
      normalized.setHours(0, 0, 0, 0)
      return normalized
    }
    
    const normalizedCurrent = normalizeDate(currentDate)
    const normalizedFertileStart = normalizeDate(fertileStart)
    const normalizedFertileEnd = normalizeDate(fertileEnd)
    const normalizedOvulation = normalizeDate(ovulationDate)
    const normalizedNextPeriod = normalizeDate(nextPeriod)
    
    // Check if day is in fertile window (inclusive of start and end dates)
    if (normalizedCurrent >= normalizedFertileStart && normalizedCurrent <= normalizedFertileEnd) {
      if (normalizedCurrent.getTime() === normalizedOvulation.getTime()) {
        return 'bg-green-400 text-white font-bold ring-2 ring-green-300' // Ovulation day
      }
      return 'bg-blue-300 text-white font-medium' // Fertile window
    }
    
    // Check if it's period day
    if (normalizedCurrent.getTime() === normalizedNextPeriod.getTime()) {
      return 'bg-red-400 text-white font-bold'
    }
    
    // Today
    if (isToday) {
      return 'bg-gray-800 text-white font-bold ring-2 ring-blue-300'
    }
    
    // Regular day
    return 'hover:bg-gray-100 text-gray-700'
  }
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]
  
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev)
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 h-fit">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-blue-100 rounded-md flex items-center justify-center">
            <span className="text-blue-600 text-sm">🗓️</span>
          </div>
          <h3 className="text-base font-bold text-blue-800">
            {monthNames[month]} {year}
          </h3>
        </div>
        <div className="flex space-x-1">
          <button 
            onClick={() => navigateMonth('prev')}
            className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={() => navigateMonth('next')}
            className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Week Days Header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day, index) => (
          <div key={index} className="text-center py-1 text-xs font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 mb-3">
        {/* Empty days for month start */}
        {emptyDays.map((_, index) => (
          <div key={`empty-${index}`} className="w-7 h-7"></div>
        ))}
        
        {/* Days of the month */}
        {days.map(day => (
          <motion.div
            key={day}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: day * 0.01 }}
            className={`w-7 h-7 flex items-center justify-center text-xs rounded-md cursor-pointer transition-all ${getDayStyle(day)}`}
          >
            {day}
          </motion.div>
        ))}
      </div>
      
      {/* Legend */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="flex items-center space-x-1.5">
          <div className="w-3 h-3 bg-blue-300 rounded"></div>
          <span className="text-gray-600">Fertile Window</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <div className="w-3 h-3 bg-green-400 rounded"></div>
          <span className="text-gray-600">Ovulation</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <div className="w-3 h-3 bg-red-400 rounded"></div>
          <span className="text-gray-600">Period</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <div className="w-3 h-3 bg-gray-800 rounded"></div>
          <span className="text-gray-600">Today</span>
        </div>
      </div>
    </div>
  )
}

const FutureCyclesCalendar: React.FC<{ cycles: OvulationCalculatorResult['futureCycles'] }> = ({ cycles }) => {
  const [selectedCycle, setSelectedCycle] = useState<number>(1)
  
  return (
    <div className="space-y-8">
      {/* Header Section with Predictive Analytics Insight */}
      <div className="text-center">
        <h4 className="text-3xl font-bold text-gray-900 mb-2">Future Cycle Planning</h4>
        <p className="text-gray-600 max-w-2xl mx-auto">Smart predictions based on your unique cycle patterns. Plan ahead for the next 6 months with confidence.</p>
      </div>

      {/* Timeline Navigator */}
      <div className="relative">
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-gray-100 rounded-full p-1">
            {cycles.slice(0, 6).map((cycle) => (
              <button
                key={cycle.cycle}
                onClick={() => setSelectedCycle(cycle.cycle)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCycle === cycle.cycle
                    ? 'bg-white text-rose-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Cycle {cycle.cycle}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Cycle Details */}
        {cycles.map((cycle) => 
          selectedCycle === cycle.cycle && (
            <motion.div
              key={cycle.cycle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-8 border border-rose-200"
            >
              <div className="grid md:grid-cols-2 gap-8">
                {/* Cycle Overview */}
                <div>
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{cycle.cycle}</span>
                    </div>
                    <div>
                      <h5 className="text-xl font-bold text-gray-900">Cycle {cycle.cycle}</h5>
                      <p className="text-gray-600 text-sm">
                        {new Date(cycle.periodStart).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                  </div>

                  {/* Key Dates */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                          <span className="text-red-600 text-sm">🔴</span>
                        </div>
                        <span className="font-medium text-gray-900">Period Starts</span>
                      </div>
                      <span className="font-bold text-red-600">
                        {new Date(cycle.periodStart).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 text-sm">🌸</span>
                        </div>
                        <span className="font-medium text-gray-900">Fertile Window</span>
                      </div>
                      <span className="font-bold text-blue-600">
                        {new Date(cycle.fertileWindowStart).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(cycle.fertileWindowEnd).toLocaleDateString('en-US', { day: 'numeric' })}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border-2 border-green-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 text-sm">🥚</span>
                        </div>
                        <span className="font-medium text-gray-900">Peak Ovulation</span>
                      </div>
                      <span className="font-bold text-green-600">
                        {new Date(cycle.ovulationDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Visual Progress Circle */}
                <div className="flex items-center justify-center">
                  <div className="relative w-48 h-48">
                    {/* Background Circle */}
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                      <circle
                        cx="100"
                        cy="100"
                        r="80"
                        stroke="#E5E7EB"
                        strokeWidth="8"
                        fill="transparent"
                      />
                      {/* Fertile Window Arc */}
                      <circle
                        cx="100"
                        cy="100"
                        r="80"
                        stroke="#3B82F6"
                        strokeWidth="8"
                        fill="transparent"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 80 * 0.2} ${2 * Math.PI * 80 * 0.8}`}
                        strokeDashoffset={2 * Math.PI * 80 * 0.15}
                      />
                      {/* Ovulation Point */}
                      <circle
                        cx="100"
                        cy="100"
                        r="80"
                        stroke="#10B981"
                        strokeWidth="12"
                        fill="transparent"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 80 * 0.05} ${2 * Math.PI * 80 * 0.95}`}
                        strokeDashoffset={2 * Math.PI * 80 * 0.25}
                      />
                    </svg>
                    
                    {/* Center Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <div className="text-3xl font-bold text-gray-900">{cycle.cycle}</div>
                      <div className="text-sm text-gray-600">Cycle</div>
                      <div className="text-xs text-gray-500 mt-1">28 days</div>
                    </div>
                  </div>
                </div>
              </div>
          
            </motion.div>
          )
        )}
      </div>

      {/* Quick Overview Grid */}
      <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-3">
        {cycles.map((cycle, index) => (
          <motion.div
            key={cycle.cycle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setSelectedCycle(cycle.cycle)}
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
              selectedCycle === cycle.cycle
                ? 'border-rose-300 bg-rose-50 shadow-lg'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
            }`}
          >
            <div className="text-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 ${
                selectedCycle === cycle.cycle ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-600'
              }`}>
                <span className="text-sm font-bold">{cycle.cycle}</span>
              </div>
              <div className="text-xs font-medium text-gray-900 mb-1">
                {new Date(cycle.ovulationDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </div>
              <div className="text-xs text-gray-500">Ovulation</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Insights & Tips */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h6 className="font-semibold text-amber-900 mb-2">Smart Planning Tips</h6>
            <ul className="space-y-1 text-sm text-amber-800">
              <li>• Plan intimate moments 2-3 days before predicted ovulation</li>
              <li>• Track basal body temperature for more accurate predictions</li>
              <li>• Consider ovulation test kits during fertile windows</li>
              <li>• Maintain a healthy lifestyle to support regular cycles</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export const OvulationCalculator: React.FC = () => {
  const [formData, setFormData] = useState<OvulationFormData>({
    lastMenstrualPeriod: '',
    cycleLength: 28,
    periodLength: 5,
  })
  const [result, setResult] = useState<OvulationCalculatorResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {}
    
    if (!formData.lastMenstrualPeriod) {
      newErrors.lastMenstrualPeriod = 'Please enter your last menstrual period date'
    } else {
      const lmpDate = new Date(formData.lastMenstrualPeriod)
      const maxDate = new Date()
      maxDate.setDate(maxDate.getDate() - 1) // Yesterday
      
      if (lmpDate > maxDate) {
        newErrors.lastMenstrualPeriod = 'Last menstrual period cannot be in the future'
      }
      
      const monthsAgo = new Date()
      monthsAgo.setMonth(monthsAgo.getMonth() - 3)
      if (lmpDate < monthsAgo) {
        newErrors.lastMenstrualPeriod = 'Please enter a date within the last 3 months'
      }
    }

    if (formData.cycleLength < 21 || formData.cycleLength > 35) {
      newErrors.cycleLength = 'Cycle length must be between 21 and 35 days'
    }

    if (formData.periodLength < 3 || formData.periodLength > 8) {
      newErrors.periodLength = 'Period length must be between 3 and 8 days'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleCalculate = async () => {
    if (!validateForm()) return

    setIsCalculating(true)
    
    // Simulate calculation delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800))

    try {
      const input: OvulationCalculatorInput = {
        lastMenstrualPeriod: formData.lastMenstrualPeriod,
        cycleLength: formData.cycleLength,
        periodLength: formData.periodLength,
      }

      const calculationResult = calculateOvulation(input)
      setResult(calculationResult)
      
      // Scroll to results
      setTimeout(() => {
        const resultsElement = document.querySelector('#ovulation-results')
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
      lastMenstrualPeriod: '',
      cycleLength: 28,
      periodLength: 5,
    })
    setResult(null)
    setErrors({})
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 bg-rose-100 text-rose-800 px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <Heart className="w-4 h-4" />
            <span>Fertility & Family Planning</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Ovulation Calculator
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Track your ovulation cycle and predict your most fertile days for conception planning
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
                  <Calendar className="w-5 h-5 text-rose-600" />
                  <span>Calculate Ovulation</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Last Menstrual Period */}
                <div>
                  <Label htmlFor="lmp" required>
                    Last Menstrual Period (First Day)
                  </Label>
                  <Input
                    id="lmp"
                    type="date"
                    value={formData.lastMenstrualPeriod}
                    onChange={(e) => setFormData({ ...formData, lastMenstrualPeriod: e.target.value })}
                    error={!!errors.lastMenstrualPeriod}
                    className="mt-1"
                    max={new Date().toISOString().split('T')[0]}
                  />
                  {errors.lastMenstrualPeriod && (
                    <p className="text-red-600 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.lastMenstrualPeriod}
                    </p>
                  )}
                </div>

                {/* Cycle Length */}
                <div>
                  <Label htmlFor="cycleLength" required>
                    Average Cycle Length (days)
                  </Label>
                  <Input
                    id="cycleLength"
                    type="number"
                    value={formData.cycleLength}
                    onChange={(e) => setFormData({ ...formData, cycleLength: parseInt(e.target.value) || 28 })}
                    min={21}
                    max={35}
                    error={!!errors.cycleLength}
                    className="mt-1"
                  />
                  {errors.cycleLength && (
                    <p className="text-red-600 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.cycleLength}
                    </p>
                  )}
                  <p className="text-gray-500 text-sm mt-1">Typical range: 21-35 days (average: 28 days)</p>
                </div>

                {/* Period Length */}
                <div>
                  <Label htmlFor="periodLength" required>
                    Average Period Length (days)
                  </Label>
                  <Input
                    id="periodLength"
                    type="number"
                    value={formData.periodLength}
                    onChange={(e) => setFormData({ ...formData, periodLength: parseInt(e.target.value) || 5 })}
                    min={3}
                    max={8}
                    error={!!errors.periodLength}
                    className="mt-1"
                  />
                  {errors.periodLength && (
                    <p className="text-red-600 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.periodLength}
                    </p>
                  )}
                  <p className="text-gray-500 text-sm mt-1">Typical range: 3-8 days (average: 5 days)</p>
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
                        <Heart className="w-4 h-4" />
                        <span>Calculate Ovulation</span>
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
                id="ovulation-results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Cycle Information Header */}
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="text-sm text-gray-500">Your Last period:</div>
                    <div className="text-lg font-bold text-blue-600">
                      {new Date(formData.lastMenstrualPeriod).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'numeric', 
                        day: 'numeric' 
                      })}
                    </div>
                  </div>
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="text-sm text-gray-500">Your Cycle Length:</div>
                    <div className="text-lg font-bold text-blue-600">{formData.cycleLength} Days</div>
                  </div>
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="text-sm text-gray-500">Current Status:</div>
                    <div className="text-lg font-bold text-rose-600">{result.currentPhase} Phase</div>
                  </div>
                </div>

                {/* Main Timeline and Calendar Layout */}
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="grid lg:grid-cols-2 gap-6">
                      {/* Timeline Section */}
                      <div>
                        <FertilityTimeline result={result} />
                      </div>
                      
                      {/* Calendar Section */}
                      <div>
                        <InteractiveCalendar result={result} />
                      </div>
                    </div>
                     {/* Due Date Cross-Reference */}
                    <div className="text-center mt-6 pt-4 ">
                      <p className="text-sm text-gray-600">
                        Already pregnant? 
                        <a 
                          href="/tools/pregnancy-womens-health/due-date-calculator"
                          className="text-blue-600 hover:text-blue-800 underline ml-1 font-medium"
                        >
                          Calculate your due date
                        </a>
                      </p>
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
                  <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to Calculate</h3>
                  <p className="text-gray-600">Enter your cycle information to predict ovulation and fertile days</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Future Cycles Calendar - Below the main grid */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12"
          >
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <FutureCyclesCalendar cycles={result.futureCycles} />
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>

    </div>
  )
}