import { Metadata } from 'next'
import { VitaminDCalculator } from '../../../../components/tools/VitaminDCalculator'
import { Card } from '../../../../components/ui/Card'
import { Header } from '../../../../components/layout/Header'
import { Footer } from '../../../../components/layout/Footer'

export const metadata: Metadata = {
  title: 'Vitamin D Calculator | Deficiency Risk Assessment Tool',
  description: 'Calculate your vitamin D deficiency risk and get personalized recommendations for sun exposure, supplements, and dietary sources.',
  keywords: 'vitamin D calculator, vitamin D deficiency, sun exposure, vitamin D supplements, bone health, immune system',
  openGraph: {
    title: 'Free Vitamin D Calculator - Assess Your Deficiency Risk',
    description: 'Calculate vitamin D deficiency risk and get personalized recommendations for optimal vitamin D status.',
    type: 'website',
  },
  alternates: {
    canonical: '/tools/general-health/vitamin-d-calculator'
  }
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Vitamin D Calculator",
  "description": "Calculate vitamin D deficiency risk and get personalized recommendations for sun exposure, supplements, and diet",
  "url": "/tools/general-health/vitamin-d-calculator",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Any",
  "permissions": "none",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "featureList": [
    "Vitamin D status analysis",
    "Deficiency risk assessment", 
    "Sun exposure recommendations",
    "Supplementation guidance",
    "Dietary source recommendations"
  ]
}

export default function VitaminDCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      
      {/* Calculator */}
      <VitaminDCalculator />

      <div className="bg-gradient-to-b from-orange-50 to-white">
        {/* Educational Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-12 border-t border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Understanding Vitamin D & Your Health
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-orange-700 mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm">1</span>
                    What is Vitamin D?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Vitamin D is a hormone-like vitamin that your body produces when skin is exposed to UVB radiation 
                    from sunlight. It's essential for bone health, immune function, and many other bodily processes. 
                    Unlike other vitamins, it's difficult to get enough from food alone.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-orange-700 mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm">2</span>
                    How Your Body Makes Vitamin D
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-orange-50 p-3 rounded-lg border-l-4 border-orange-500">
                      <h4 className="font-semibold text-orange-800">Sun Exposure</h4>
                      <p className="text-orange-700 text-sm">UVB radiation converts 7-dehydrocholesterol in skin to previtamin D3</p>
                    </div>
                    <div className="bg-amber-50 p-3 rounded-lg border-l-4 border-amber-500">
                      <h4 className="font-semibold text-amber-800">Liver Processing</h4>
                      <p className="text-amber-700 text-sm">Liver converts vitamin D3 to 25(OH)D - the storage form measured in blood tests</p>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-500">
                      <h4 className="font-semibold text-yellow-800">Kidney Activation</h4>
                      <p className="text-yellow-700 text-sm">Kidneys convert 25(OH)D to active hormone calcitriol [1,25(OH)2D]</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-orange-700 mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm">3</span>
                    Risk Factors for Deficiency
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Multiple factors affect your vitamin D status including skin color, geographic location, season, 
                    age, sun exposure habits, body weight, and medical conditions. Dark skin requires more sun exposure, 
                    while northern latitudes and winter months limit natural production.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-orange-700 mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm">4</span>
                    Optimal Vitamin D Levels
                  </h3>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium">Severe Deficiency:</span>
                        <span className="text-red-700">&lt; 12 ng/mL (&lt; 30 nmol/L)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Deficiency:</span>
                        <span className="text-orange-700">12-19 ng/mL (30-49 nmol/L)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Insufficient:</span>
                        <span className="text-yellow-700">20-29 ng/mL (50-74 nmol/L)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Sufficient:</span>
                        <span className="text-green-700">30-49 ng/mL (75-124 nmol/L)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">High Normal:</span>
                        <span className="text-green-700">50-99 ng/mL (125-249 nmol/L)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-orange-700 mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm">5</span>
                    Health Benefits
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-green-50 p-3 rounded-lg">
                      <h4 className="font-semibold text-green-800">Bone Health</h4>
                      <p className="text-green-700 text-sm">Essential for calcium absorption and bone mineralization</p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <h4 className="font-semibold text-blue-800">Immune Function</h4>
                      <p className="text-blue-700 text-sm">Supports immune system regulation and infection resistance</p>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <h4 className="font-semibold text-purple-800">Muscle Function</h4>
                      <p className="text-purple-700 text-sm">Important for muscle strength and fall prevention</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-orange-700 mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm">6</span>
                    Safe Sun Exposure
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Brief, regular sun exposure without sunscreen can help maintain vitamin D levels. The amount needed 
                    varies by skin type, location, and season. Fair skin may need only 10-15 minutes, while darker skin 
                    may require 30-40 minutes. Always balance vitamin D needs with skin cancer prevention.
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
                  <span>How accurate is this vitamin D assessment?</span>
                  <span className="transition group-open:rotate-180">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="mt-3 text-gray-700 leading-relaxed">
                  Our assessment uses evidence-based risk factors and clinical guidelines to estimate deficiency risk. 
                  While it provides valuable insights, the most accurate way to know your vitamin D status is through 
                  a blood test measuring 25(OH)D levels. Our calculator helps identify risk and guide supplementation decisions.
                </div>
              </details>

              <details className="group">
                <summary className="flex justify-between items-center font-semibold text-lg text-gray-900 cursor-pointer list-none">
                  <span>Can I get enough vitamin D from food alone?</span>
                  <span className="transition group-open:rotate-180">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="mt-3 text-gray-700 leading-relaxed">
                  It's very difficult to get adequate vitamin D from food alone. Fatty fish, egg yolks, and fortified 
                  foods provide some vitamin D, but most people need sun exposure or supplements to maintain optimal levels. 
                  The richest food source is fatty fish like salmon, which contains 400-1000 IU per serving.
                </div>
              </details>

              <details className="group">
                <summary className="flex justify-between items-center font-semibold text-lg text-gray-900 cursor-pointer list-none">
                  <span>Is it safe to take vitamin D supplements daily?</span>
                  <span className="transition group-open:rotate-180">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="mt-3 text-gray-700 leading-relaxed">
                  For most people, daily vitamin D3 supplements up to 4000 IU are safe. However, some individuals with 
                  certain medical conditions (kidney disease, sarcoidosis) should consult their healthcare provider before 
                  supplementing. Regular monitoring is recommended for doses above 2000 IU daily.
                </div>
              </details>

              <details className="group">
                <summary className="flex justify-between items-center font-semibold text-lg text-gray-900 cursor-pointer list-none">
                  <span>How does skin color affect vitamin D production?</span>
                  <span className="transition group-open:rotate-180">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="mt-3 text-gray-700 leading-relaxed">
                  Melanin in darker skin provides natural sun protection but also reduces vitamin D synthesis. People 
                  with darker skin may need 3-5 times longer sun exposure than those with fair skin to produce the same 
                  amount of vitamin D. This is why vitamin D deficiency is more common in people with darker skin, 
                  especially in northern climates.
                </div>
              </details>

              <details className="group">
                <summary className="flex justify-between items-center font-semibold text-lg text-gray-900 cursor-pointer list-none">
                  <span>When should I get my vitamin D level tested?</span>
                  <span className="transition group-open:rotate-180">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="mt-3 text-gray-700 leading-relaxed">
                  Consider testing if you have risk factors for deficiency, symptoms like fatigue or bone pain, 
                  or before starting high-dose supplementation. Testing is especially important for people with 
                  darker skin, limited sun exposure, older adults, or those with malabsorption disorders. 
                  The test measures 25(OH)D levels in blood.
                </div>
              </details>

              <details className="group">
                <summary className="flex justify-between items-center font-semibold text-lg text-gray-900 cursor-pointer list-none">
                  <span>What's the difference between vitamin D2 and D3?</span>
                  <span className="transition group-open:rotate-180">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="mt-3 text-gray-700 leading-relaxed">
                  Vitamin D3 (cholecalciferol) is the form made by your skin and found in animal sources. Vitamin D2 
                  (ergocalciferol) comes from plant sources and fortified foods. D3 is generally considered more effective 
                  at raising blood levels and maintaining them longer. Most supplements contain D3, which is preferred 
                  for treating deficiency.
                </div>
              </details>
            </div>
          </div>
        </div>

        {/* Vitamin D Health Resources */}
        <div className="w-full bg-gradient-to-br from-orange-50 to-amber-50 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Vitamin D Health & Wellness Resources
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-orange-700 mb-4">Safe Sun Exposure Guidelines</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Start Gradually</h4>
                        <p className="text-sm text-gray-600">Begin with short exposures and increase time slowly to avoid burning.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Optimal Timing</h4>
                        <p className="text-sm text-gray-600">Best vitamin D synthesis occurs between 10 AM and 3 PM when UVB is strongest.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Skin Protection</h4>
                        <p className="text-sm text-gray-600">Apply sunscreen after initial vitamin D synthesis time to prevent burning.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-orange-700 mb-4">Supplementation Best Practices</h3>
                  <div className="bg-white p-4 rounded-lg border border-orange-200">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Vitamin D3 Form:</span>
                        <span className="text-orange-600">Cholecalciferol preferred</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Take with Fat:</span>
                        <span className="text-orange-600">Improves absorption</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Timing:</span>
                        <span className="text-orange-600">With largest meal</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Monitor Levels:</span>
                        <span className="text-orange-600">Test every 3-6 months</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-orange-700 mb-4">Special Populations</h3>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded-lg border border-orange-200">
                      <h4 className="font-medium text-gray-900">Pregnancy & Breastfeeding</h4>
                      <p className="text-sm text-gray-600">Higher needs during pregnancy; adequate levels support fetal development</p>
                    </div>
                    
                    <div className="bg-white p-3 rounded-lg border border-orange-200">
                      <h4 className="font-medium text-gray-900">Older Adults (65+)</h4>
                      <p className="text-sm text-gray-600">Reduced skin synthesis capacity; supplements often necessary</p>
                    </div>
                    
                    <div className="bg-white p-3 rounded-lg border border-orange-200">
                      <h4 className="font-medium text-gray-900">Dark Skin Pigmentation</h4>
                      <p className="text-sm text-gray-600">Higher melanin requires longer sun exposure or supplementation</p>
                    </div>
                    
                    <div className="bg-white p-3 rounded-lg border border-orange-200">
                      <h4 className="font-medium text-gray-900">Limited Sun Exposure</h4>
                      <p className="text-sm text-gray-600">Indoor workers, northern latitudes, covered skin need extra attention</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-orange-700 mb-4">Related Health Tools</h3>
                  <div className="space-y-2">
                    <a href="/tools/general-health/bmi-calculator" className="block bg-white p-3 rounded-lg border border-orange-200 hover:bg-orange-50 transition-colors">
                      <h4 className="font-medium text-gray-900">BMI Calculator</h4>
                      <p className="text-sm text-gray-600">Higher BMI may affect vitamin D metabolism and requirements</p>
                    </a>
                    
                    <a href="/tools/heart-health/cholesterol-calculator" className="block bg-white p-3 rounded-lg border border-orange-200 hover:bg-orange-50 transition-colors">
                      <h4 className="font-medium text-gray-900">Cholesterol Calculator</h4>
                      <p className="text-sm text-gray-600">Vitamin D may influence cardiovascular health</p>
                    </a>
                    
                    <a href="/tools/general-health/hydration-calculator" className="block bg-white p-3 rounded-lg border border-orange-200 hover:bg-orange-50 transition-colors">
                      <h4 className="font-medium text-gray-900">Hydration Calculator</h4>
                      <p className="text-sm text-gray-600">Proper hydration supports overall nutrient absorption</p>
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
              This vitamin D calculator is for educational and informational purposes only and should not be considered 
              medical advice. The results are estimates based on the information you provide and established research on 
              vitamin D deficiency risk factors. Individual health conditions, medications, geographic location, and other 
              factors can significantly affect your vitamin D status and requirements. Always consult with qualified 
              healthcare professionals for personalized medical advice, diagnosis, and treatment recommendations. Do not 
              make changes to your medication regimen or start high-dose supplementation without consulting your doctor. 
              If you have symptoms of vitamin D deficiency or toxicity, seek appropriate medical evaluation.
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  )
}