import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { HealthIcon } from '@/components/ui/HealthIcon'
import { FloatingElements } from '@/components/ui/FloatingElements'
import { TOOL_CATEGORIES, HEALTH_TOOLS, SITE_CONFIG } from '@/lib/constants'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { 
  Heart, 
  Calculator, 
  Shield, 
  Users, 
  ArrowRight,
  CheckCircle,
  Star,
  TrendingUp,
  Sparkles,
  Zap,
  Play,
  Award,
  Smile
} from 'lucide-react'

export default function Home() {
  const featuredTools = HEALTH_TOOLS.filter(tool => tool.featured)
  const stats = [
    { label: 'Health Calculators', value: '10+' },
    { label: 'Medical Categories', value: '9' },
    { label: 'Free to Use', value: '100%' },
    { label: 'Medical Accuracy', value: 'Verified' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-orange-50">
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "HealthTools - Free Health Calculators",
            "description": "Professional-grade health calculators including BMI, heart rate, blood pressure, and more. Free, accurate, and medically verified.",
            "url": "https://healthtools.ai",
            "applicationCategory": "HealthApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "creator": {
              "@type": "Organization",
              "name": "HealthTools"
            }
          })
        }}
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 lg:pt-20 lg:pb-28">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-br from-rose-100/60 via-orange-50/40 to-amber-50/30 rounded-full blur-3xl" />
          <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-blue-100/50 to-purple-100/30 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-10 w-96 h-96 bg-gradient-to-tr from-green-100/40 to-teal-100/30 rounded-full blur-2xl" />
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="relative">
              {/* Hero Headline */}
              <h1 className="mb-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl font-manrope leading-tight">
                <span className="block">Free Health Calculators &</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                  Medical Assessment Tools
                </span>
              </h1>
              
              <p className="mb-8 max-w-lg text-base sm:text-lg leading-7 sm:leading-8 text-gray-600">
                Professional-grade health calculators designed for accuracy and simplicity. 
                Get instant insights about your health metrics, completely free.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12">
                <Button size="lg" className="h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base font-semibold bg-gray-900 hover:bg-gray-800 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5">
                  <Play className="mr-2 h-4 sm:h-5 w-4 sm:w-5" />
                  Try Now
                </Button>
                <Button variant="outline" size="lg" className="h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base font-semibold border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300">
                  Learn More
                </Button>
              </div>

            </div>

            {/* Right Visual */}
            <div className="relative lg:block hidden">
              <div className="relative mx-auto w-full max-w-lg">
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/2382/2382533.png"
                  alt="Health Calculator and Medical Tools"
                  className="w-full h-auto object-contain drop-shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-manrope">Our Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive health calculators and AI-powered insights for your personal wellbeing
            </p>
          </div>
          
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12 lg:mb-16">
            {/* BMI & Body Analysis Card */}
            <div className="relative group">
              <div className="h-96 rounded-3xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-8 text-white relative overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
                {/* Background decoration */}
                <div className="absolute top-8 right-8 w-32 h-32 rounded-full bg-white/10 blur-2xl" />
                <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-white/5 blur-3xl" />
                
                {/* Medical illustration */}
                <div className="absolute top-6 right-6 w-24 h-24 opacity-20">
                  <img 
                    src="https://cdn-icons-png.flaticon.com/512/2966/2966327.png" 
                    alt="BMI Scale" 
                    className="w-full h-full object-contain filter brightness-0 invert"
                  />
                </div>
                
                <div className="relative z-10 h-full flex flex-col">
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                        <Calculator className="h-7 w-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">BMI & Body Analysis</h3>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="h-3 w-3 text-yellow-300 fill-current" />
                          <span className="text-xs text-emerald-100">Most Popular</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-emerald-100 text-sm leading-relaxed">
                      Calculate your Body Mass Index and get comprehensive body composition analysis with health recommendations.
                    </p>
                  </div>
                  
                  <div className="space-y-3 mb-8 flex-grow">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center">
                        <CheckCircle className="h-3 w-3 text-white" />
                      </div>
                      <span>BMI Calculator with Categories</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center">
                        <CheckCircle className="h-3 w-3 text-white" />
                      </div>
                      <span>Body Fat Percentage</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center">
                        <CheckCircle className="h-3 w-3 text-white" />
                      </div>
                      <span>Ideal Weight Range</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center">
                        <CheckCircle className="h-3 w-3 text-white" />
                      </div>
                      <span>Health Recommendations</span>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm font-semibold transition-all duration-300 hover:scale-105">
                    <Calculator className="mr-2 h-4 w-4" />
                    Calculate BMI Now
                  </Button>
                </div>
              </div>
            </div>

            {/* Cardiovascular Health Card */}
            <div className="relative group">
              <div className="h-96 rounded-3xl bg-gradient-to-br from-rose-500 via-pink-500 to-red-500 p-8 text-white relative overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
                {/* Background decoration */}
                <div className="absolute top-8 left-8 w-32 h-32 rounded-full bg-white/10 blur-2xl" />
                <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-white/5 blur-3xl" />
                
                {/* Medical illustration */}
                <div className="absolute top-6 right-6 w-24 h-24 opacity-20">
                  <img 
                    src="https://cdn-icons-png.flaticon.com/512/3004/3004458.png" 
                    alt="Heart Monitor" 
                    className="w-full h-full object-contain filter brightness-0 invert"
                  />
                </div>
                
                <div className="relative z-10 h-full flex flex-col">
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                        <Heart className="h-7 w-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">Cardiovascular Health</h3>
                        <div className="flex items-center gap-1 mt-1">
                          <Shield className="h-3 w-3 text-blue-200" />
                          <span className="text-xs text-rose-100">Medically Verified</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-rose-100 text-sm leading-relaxed">
                      Monitor your heart health with professional-grade cardiovascular assessment tools and analysis.
                    </p>
                  </div>
                  
                  <div className="space-y-3 mb-8 flex-grow">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center">
                        <CheckCircle className="h-3 w-3 text-white" />
                      </div>
                      <span>Blood Pressure Analysis</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center">
                        <CheckCircle className="h-3 w-3 text-white" />
                      </div>
                      <span>Heart Rate Calculator</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center">
                        <CheckCircle className="h-3 w-3 text-white" />
                      </div>
                      <span>Target Heart Rate Zones</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center">
                        <CheckCircle className="h-3 w-3 text-white" />
                      </div>
                      <span>Cardiovascular Risk Assessment</span>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm font-semibold transition-all duration-300 hover:scale-105">
                    <Heart className="mr-2 h-4 w-4" />
                    Check Heart Health
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Additional Health Tools Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Pregnancy Calculator</h4>
              <p className="text-sm text-gray-600 mb-4">Due date, week tracking, and pregnancy milestones.</p>
              <Button variant="outline" size="sm" className="text-xs">
                Calculate <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Calorie Calculator</h4>
              <p className="text-sm text-gray-600 mb-4">Daily caloric needs and weight management.</p>
              <Button variant="outline" size="sm" className="text-xs">
                Calculate <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Sleep Calculator</h4>
              <p className="text-sm text-gray-600 mb-4">Optimal sleep time and sleep cycle analysis.</p>
              <Button variant="outline" size="sm" className="text-xs">
                Calculate <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Health Age</h4>
              <p className="text-sm text-gray-600 mb-4">Calculate your biological vs chronological age.</p>
              <Button variant="outline" size="sm" className="text-xs">
                Calculate <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmOWZhZmIiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxLjUiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 font-manrope text-gray-900">Key Features</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive health monitoring tools designed for modern healthcare needs
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="group relative">
              <div className="h-80 rounded-3xl bg-gradient-to-br from-amber-900 to-amber-800 p-6 text-white relative overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
                
                <div className="relative z-10 h-full flex flex-col">
                  <div className="mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                      <TrendingUp className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Vitals Monitor</h3>
                  </div>
                  
                  <div className="space-y-2 mb-6 flex-grow">
                    <p className="text-amber-100 text-sm">Live charts, real-time updates</p>
                    <p className="text-amber-100 text-sm">Spot early health warnings</p>
                    <p className="text-amber-100 text-sm">Simple daily/weekly trends</p>
                    <p className="text-amber-100 text-sm">Secure long-term storage</p>
                  </div>
                  
                  <Button variant="outline" className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20">
                    Try Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="h-80 rounded-3xl bg-gradient-to-br from-orange-400 to-yellow-400 p-6 text-white relative overflow-hidden shadow-xl">
                <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
                  <Calculator className="h-10 w-10 text-white/80" />
                </div>
                
                <div className="relative z-10 h-full flex flex-col">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold mb-2">Health Tracker</h3>
                  </div>
                  
                  <div className="space-y-2 mb-6 flex-grow">
                    <p className="text-orange-100 text-sm">Track health metrics</p>
                    <p className="text-orange-100 text-sm">Quick calculations</p>
                    <p className="text-orange-100 text-sm">Progress monitoring</p>
                  </div>
                  
                  <Button variant="outline" className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20">
                    Try Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Medical Assistant */}
            <div className="group relative">
              <div className="h-80 rounded-3xl bg-gradient-to-br from-blue-50 to-white p-6 text-gray-800 relative overflow-hidden shadow-xl border border-gray-200">
                <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-blue-600" />
                </div>
                
                <div className="relative z-10 h-full flex flex-col">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold mb-2 text-gray-900">Medical Assistant</h3>
                  </div>
                  
                  <div className="space-y-2 mb-6 flex-grow">
                    <p className="text-gray-600 text-sm">Ask health questions</p>
                    <p className="text-gray-600 text-sm">Trained on medical data</p>
                    <p className="text-gray-600 text-sm">24/7 health support</p>
                  </div>
                  
                  <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white">
                    Try Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Health Connect */}
            <div className="group relative">
              <div className="h-80 rounded-3xl bg-gradient-to-br from-blue-500 to-blue-700 p-6 text-white relative overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIxMCIgY3k9IjEwIiByPSIxIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
                
                <div className="relative z-10 h-full flex flex-col">
                  <div className="mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                      <Shield className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Health Connect</h3>
                  </div>
                  
                  <div className="space-y-2 mb-6 flex-grow">
                    <p className="text-blue-100 text-sm">Sync health devices</p>
                    <p className="text-blue-100 text-sm">Unusual alerts triggered</p>
                    <p className="text-blue-100 text-sm">Reports & Analytics</p>
                  </div>
                  
                  <Button variant="outline" className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20">
                    Try Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* A Deeper Look Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50/30 via-transparent to-blue-50/30" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 font-manrope">A Deeper Look</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-600 leading-relaxed">
                At HealthTools AI, we believe everyone deserves access to professional-grade health insights. 
                Through real-time calculations and intelligent analysis, we help you understand your health 
                metrics better than ever. With cutting-edge technology and medically accurate algorithms 
                tailored to give you the health insights you deserve.
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
            {/* Left Column - Benefits */}
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-100 to-green-100 flex items-center justify-center flex-shrink-0">
                  <Shield className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Medically Accurate</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    All health calculations based on established medical guidelines and peer-reviewed research
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center flex-shrink-0">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy to Use</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Simple, intuitive interfaces designed for users of all technical backgrounds
                  </p>
                </div>
              </div>
            </div>

            <div className="relative order-first lg:order-none">
              <div className="aspect-square max-w-xs sm:max-w-sm mx-auto relative">
                {/* Main circle */}
                <div className="w-full h-full rounded-full bg-gradient-to-br from-rose-100 via-orange-50 to-amber-50 border border-rose-200/50 flex items-center justify-center relative overflow-hidden">
                  {/* Floating elements inside */}
                  <div className="absolute inset-4 rounded-full border-2 border-dashed border-rose-200 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-white to-rose-50 flex items-center justify-center shadow-lg">
                      <Heart className="h-10 w-10 text-rose-500" />
                    </div>
                  </div>
                  
                  {/* Orbiting elements */}
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-blue-500 shadow-lg animate-pulse" />
                  <div className="absolute bottom-8 right-8 w-6 h-6 rounded-full bg-emerald-500 shadow-lg animate-bounce" />
                  <div className="absolute left-8 top-1/2 transform -translate-y-1/2 w-7 h-7 rounded-full bg-amber-500 shadow-lg animate-pulse" />
                </div>
                
                {/* Floating badges */}
                <div className="absolute -top-2 -right-2 bg-white rounded-full px-3 py-1 shadow-lg border border-gray-200">
                  <span className="text-xs font-medium text-gray-700">24/7 Monitor</span>
                </div>
                <div className="absolute -bottom-2 -left-2 bg-white rounded-full px-3 py-1 shadow-lg border border-gray-200">
                  <span className="text-xs font-medium text-gray-700">AI Powered</span>
                </div>
              </div>
            </div>

            {/* Right Column - More Benefits */}
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-100 to-violet-100 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Always Free</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    No hidden fees, subscriptions, or registration required. Health tools for everyone
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center flex-shrink-0">
                  <Award className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Trusted by Doctors</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Developed in partnership with medical professionals and health experts
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <Footer />
    </div>
  )
}
