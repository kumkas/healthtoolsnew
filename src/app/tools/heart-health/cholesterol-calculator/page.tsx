import { Metadata } from 'next'
import { CholesterolCalculator } from '../../../../components/tools/CholesterolCalculator'
import { Card } from '../../../../components/ui/Card'
import { Header } from '../../../../components/layout/Header'
import { Footer } from '../../../../components/layout/Footer'

export const metadata: Metadata = {
  title: 'Cholesterol Calculator | Cardiovascular Risk Assessment Tool',
  description: 'Calculate your cholesterol levels and assess cardiovascular risk. Get personalized treatment recommendations based on your lipid panel and risk factors.',
  keywords: 'cholesterol calculator, LDL, HDL, triglycerides, cardiovascular risk, heart health, lipid panel, statin recommendation',
  openGraph: {
    title: 'Free Cholesterol Calculator - Assess Your Heart Health Risk',
    description: 'Calculate cholesterol levels and cardiovascular risk with our comprehensive tool. Get personalized recommendations for heart health.',
    type: 'website',
  },
  alternates: {
    canonical: '/tools/heart-health/cholesterol-calculator'
  }
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Cholesterol Calculator",
  "description": "Calculate cholesterol levels and assess cardiovascular risk with personalized treatment recommendations",
  "url": "/tools/heart-health/cholesterol-calculator",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Any",
  "permissions": "none",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "featureList": [
    "Cholesterol level analysis",
    "Cardiovascular risk assessment",
    "Treatment recommendations",
    "Statin therapy guidance",
    "Lifestyle intervention suggestions"
  ]
}

export default function CholesterolCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Cholesterol Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Assess your cardiovascular risk and understand your cholesterol levels with our comprehensive calculator. 
            Get personalized treatment recommendations and lifestyle guidance.
          </p>
        </div>

        {/* Calculator */}
        <CholesterolCalculator />

        {/* Educational Content */}
        <div className="mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-12 border-t border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Understanding Cholesterol & Heart Health
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-emerald-700 mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-sm">1</span>
                    What is Cholesterol?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Cholesterol is a waxy substance your body needs to build cells and make hormones. However, too much cholesterol 
                    in your blood can increase your risk of heart disease. Your body makes all the cholesterol it needs, but you 
                    also get cholesterol from food.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-emerald-700 mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-sm">2</span>
                    Types of Cholesterol
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-500">
                      <h4 className="font-semibold text-green-800">HDL (Good) Cholesterol</h4>
                      <p className="text-green-700 text-sm">Carries cholesterol away from arteries to the liver for disposal. Higher levels are protective.</p>
                    </div>
                    <div className="bg-red-50 p-3 rounded-lg border-l-4 border-red-500">
                      <h4 className="font-semibold text-red-800">LDL (Bad) Cholesterol</h4>
                      <p className="text-red-700 text-sm">Can build up in arteries, forming plaques that narrow blood vessels. Lower levels are better.</p>
                    </div>
                    <div className="bg-orange-50 p-3 rounded-lg border-l-4 border-orange-500">
                      <h4 className="font-semibold text-orange-800">Triglycerides</h4>
                      <p className="text-orange-700 text-sm">Another type of fat in blood. High levels often accompany other risk factors.</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-emerald-700 mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-sm">3</span>
                    Risk Assessment
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Cardiovascular risk assessment considers multiple factors beyond cholesterol, including age, gender, 
                    smoking status, diabetes, family history, and blood pressure. This comprehensive approach helps 
                    determine your personalized treatment plan.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-emerald-700 mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-sm">4</span>
                    Optimal Cholesterol Levels
                  </h3>
                  <div className="bg-emerald-50 p-4 rounded-lg">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium">Total Cholesterol:</span>
                        <span className="text-emerald-700">&lt; 200 mg/dL</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">LDL Cholesterol:</span>
                        <span className="text-emerald-700">&lt; 100 mg/dL</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">HDL Cholesterol:</span>
                        <span className="text-emerald-700">&gt; 60 mg/dL</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Triglycerides:</span>
                        <span className="text-emerald-700">&lt; 150 mg/dL</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-emerald-700 mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-sm">5</span>
                    Treatment Approaches
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <h4 className="font-semibold text-blue-800">Lifestyle Changes</h4>
                      <p className="text-blue-700 text-sm">Heart-healthy diet, regular exercise, weight management, and smoking cessation.</p>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <h4 className="font-semibold text-purple-800">Medication</h4>
                      <p className="text-purple-700 text-sm">Statins and other lipid-lowering medications when lifestyle changes aren't sufficient.</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-emerald-700 mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-sm">6</span>
                    Monitoring & Follow-up
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Regular cholesterol testing is essential for monitoring treatment effectiveness and adjusting therapy. 
                    The frequency depends on your risk level and current treatment. Most adults should be tested every 4-6 years, 
                    while those with risk factors or on treatment need more frequent monitoring.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-12 border-t border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              <details className="group">
                <summary className="flex justify-between items-center font-semibold text-lg text-gray-900 cursor-pointer list-none">
                  <span>How accurate is this cholesterol calculator?</span>
                  <span className="transition group-open:rotate-180">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="mt-3 text-gray-700 leading-relaxed">
                  Our calculator uses established clinical guidelines and risk assessment tools, including the 
                  Framingham Risk Score methodology. However, it's designed for educational purposes and should 
                  complement, not replace, professional medical evaluation. Always consult your healthcare provider 
                  for personalized medical advice.
                </div>
              </details>

              <details className="group">
                <summary className="flex justify-between items-center font-semibold text-lg text-gray-900 cursor-pointer list-none">
                  <span>What if I don't know my LDL cholesterol?</span>
                  <span className="transition group-open:rotate-180">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="mt-3 text-gray-700 leading-relaxed">
                  If you don't have a direct LDL measurement, our calculator will estimate it using the Friedewald 
                  equation: LDL = Total Cholesterol - HDL - (Triglycerides ÷ 5). This formula is accurate when 
                  triglycerides are below 400 mg/dL and you're fasting.
                </div>
              </details>

              <details className="group">
                <summary className="flex justify-between items-center font-semibold text-lg text-gray-900 cursor-pointer list-none">
                  <span>When should I start taking statins?</span>
                  <span className="transition group-open:rotate-180">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="mt-3 text-gray-700 leading-relaxed">
                  Statin therapy is recommended based on your overall cardiovascular risk, not just cholesterol levels. 
                  High-risk patients (10-year risk ≥20%) typically benefit from statins, while intermediate-risk patients 
                  (7.5-20% risk) should discuss benefits and risks with their doctor. Very high LDL (≥190 mg/dL) usually 
                  warrants statin therapy regardless of other risk factors.
                </div>
              </details>

              <details className="group">
                <summary className="flex justify-between items-center font-semibold text-lg text-gray-900 cursor-pointer list-none">
                  <span>Can I improve my cholesterol naturally?</span>
                  <span className="transition group-open:rotate-180">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="mt-3 text-gray-700 leading-relaxed">
                  Yes! Lifestyle changes can significantly improve cholesterol levels. A heart-healthy diet can reduce 
                  LDL by 15-30%, regular exercise increases HDL, weight loss improves all lipid parameters, and 
                  quitting smoking raises HDL while reducing overall cardiovascular risk. These changes are often 
                  the first line of treatment.
                </div>
              </details>

              <details className="group">
                <summary className="flex justify-between items-center font-semibold text-lg text-gray-900 cursor-pointer list-none">
                  <span>How often should I check my cholesterol?</span>
                  <span className="transition group-open:rotate-180">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="mt-3 text-gray-700 leading-relaxed">
                  For healthy adults with normal levels, testing every 4-6 years is sufficient. However, if you have 
                  risk factors, abnormal levels, or are on medication, more frequent testing is needed. People on 
                  statins typically need testing every 6-12 weeks initially, then every 3-6 months once stable.
                </div>
              </details>

              <details className="group">
                <summary className="flex justify-between items-center font-semibold text-lg text-gray-900 cursor-pointer list-none">
                  <span>What are cholesterol ratios and why do they matter?</span>
                  <span className="transition group-open:rotate-180">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="mt-3 text-gray-700 leading-relaxed">
                  Cholesterol ratios provide additional insight into cardiovascular risk. The total/HDL ratio should 
                  be below 5, LDL/HDL below 3, and triglycerides/HDL below 4. These ratios can sometimes reveal risk 
                  even when individual cholesterol levels appear normal, helping guide treatment decisions.
                </div>
              </details>
            </div>
          </div>
        </div>

        {/* Heart Health Resources */}
        <div className="w-full bg-gradient-to-br from-emerald-50 to-teal-50 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Heart Health & Cholesterol Resources
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-emerald-700 mb-4">Heart-Healthy Diet Tips</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Choose Healthy Fats</h4>
                        <p className="text-sm text-gray-600">Replace saturated fats with monounsaturated and polyunsaturated fats from olive oil, nuts, and fish.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Increase Fiber Intake</h4>
                        <p className="text-sm text-gray-600">Soluble fiber from oats, beans, and fruits can help lower cholesterol absorption.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Limit Trans Fats</h4>
                        <p className="text-sm text-gray-600">Avoid processed foods, fried foods, and baked goods with partially hydrogenated oils.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-emerald-700 mb-4">Exercise Guidelines</h3>
                  <div className="bg-white p-4 rounded-lg border border-emerald-200">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Aerobic Exercise:</span>
                        <span className="text-emerald-600">150 min/week moderate</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Strength Training:</span>
                        <span className="text-emerald-600">2+ days/week</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Daily Activity:</span>
                        <span className="text-emerald-600">10,000+ steps</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-emerald-700 mb-4">Risk Factor Management</h3>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded-lg border border-emerald-200">
                      <h4 className="font-medium text-gray-900">Blood Pressure Control</h4>
                      <p className="text-sm text-gray-600">Maintain &lt;130/80 mmHg through lifestyle and medication if needed</p>
                    </div>
                    
                    <div className="bg-white p-3 rounded-lg border border-emerald-200">
                      <h4 className="font-medium text-gray-900">Diabetes Management</h4>
                      <p className="text-sm text-gray-600">Keep HbA1c &lt;7% and manage blood sugar levels consistently</p>
                    </div>
                    
                    <div className="bg-white p-3 rounded-lg border border-emerald-200">
                      <h4 className="font-medium text-gray-900">Smoking Cessation</h4>
                      <p className="text-sm text-gray-600">Quitting smoking provides immediate and long-term cardiovascular benefits</p>
                    </div>
                    
                    <div className="bg-white p-3 rounded-lg border border-emerald-200">
                      <h4 className="font-medium text-gray-900">Weight Management</h4>
                      <p className="text-sm text-gray-600">Maintain healthy BMI (18.5-24.9) and waist circumference</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-emerald-700 mb-4">Related Tools</h3>
                  <div className="space-y-2">
                    <a href="/tools/heart-health/blood-pressure-calculator" className="block bg-white p-3 rounded-lg border border-emerald-200 hover:bg-emerald-50 transition-colors">
                      <h4 className="font-medium text-gray-900">Blood Pressure Calculator</h4>
                      <p className="text-sm text-gray-600">Assess your blood pressure and hypertension risk</p>
                    </a>
                    
                    <a href="/tools/heart-health/heart-rate-zone-calculator" className="block bg-white p-3 rounded-lg border border-emerald-200 hover:bg-emerald-50 transition-colors">
                      <h4 className="font-medium text-gray-900">Heart Rate Zone Calculator</h4>
                      <p className="text-sm text-gray-600">Optimize your cardiovascular exercise intensity</p>
                    </a>
                    
                    <a href="/tools/general-health/bmi-calculator" className="block bg-white p-3 rounded-lg border border-emerald-200 hover:bg-emerald-50 transition-colors">
                      <h4 className="font-medium text-gray-900">BMI Calculator</h4>
                      <p className="text-sm text-gray-600">Calculate your body mass index and weight status</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Medical Disclaimer */}
        <div className="w-full bg-gray-50 border-t border-gray-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Medical Disclaimer</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              This cholesterol calculator is for educational and informational purposes only and should not be considered 
              medical advice. The results are estimates based on the information you provide and established clinical guidelines. 
              Individual health conditions, medications, and other factors can significantly affect your cardiovascular risk 
              and treatment needs. Always consult with qualified healthcare professionals for personalized medical advice, 
              diagnosis, and treatment recommendations. Do not make changes to your medications or treatment plan without 
              consulting your doctor. If you have chest pain, shortness of breath, or other concerning symptoms, seek 
              immediate medical attention.
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  )
}