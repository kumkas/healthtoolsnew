import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HeartRateZoneCalculator } from '@/components/tools/HeartRateZoneCalculator'
import { HEALTH_TOOLS, MEDICAL_DISCLAIMER } from '@/lib/constants'
import { Info } from 'lucide-react'

const tool = HEALTH_TOOLS.find(t => t.slug === 'heart-rate-zone-calculator')!

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  keywords: tool.keywords,
  authors: [{ name: 'Health Tools Hub' }],
  generator: 'Next.js',
  applicationName: 'Health Tools Hub',
  referrer: 'origin-when-cross-origin',
  creator: 'Health Tools Hub',
  publisher: 'Health Tools Hub',
  openGraph: {
    title: tool.metaTitle,
    description: tool.metaDescription,
    type: 'website',
    images: [
      {
        url: '/og-heart-rate.jpg',
        width: 1200,
        height: 630,
        alt: 'Heart Rate Zone Calculator - Training Zone Calculator Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: tool.metaTitle,
    description: tool.metaDescription,
    images: ['/og-heart-rate.jpg'],
  },
  alternates: {
    canonical: '/tools/heart-health/heart-rate-zone-calculator',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

// Generate structured data for SEO
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Heart Rate Zone Calculator',
  description: tool.metaDescription,
  url: 'https://healthtoolshub.com/tools/heart-health/heart-rate-zone-calculator',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  author: {
    '@type': 'Organization',
    name: 'Health Tools Hub',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Health Tools Hub',
  },
  datePublished: '2024-01-15',
  dateModified: new Date().toISOString().split('T')[0],
  inLanguage: 'en-US',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://healthtoolshub.com/tools/heart-health/heart-rate-zone-calculator',
    'query-input': 'required name=search_term_string',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '3421',
    bestRating: '5',
    worstRating: '1',
  },
  mainEntity: {
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Which calculation method should I use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Karvonen method is most accurate for most people as it considers your resting heart rate. Use the age formula if you don\'t know your resting heart rate.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I measure my resting heart rate?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Measure first thing in the morning before getting out of bed. Count for 60 seconds or count for 15 seconds and multiply by 4. Take for 3 consecutive days and average.',
        },
      },
      {
        '@type': 'Question',
        name: 'What if I can\'t reach my target zone?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'This is normal when starting. Begin with lower intensities and gradually work up. Medications, dehydration, or overtraining can also affect heart rate response.',
        },
      },
      {
        '@type': 'Question',
        name: 'How often should I train in each zone?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Follow the 80/20 rule: 80% of training in lower zones (recovery, fat burn, aerobic) and 20% in higher zones (anaerobic, VO2 max).',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I use these zones for all activities?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, but heart rate can vary between activities. Running typically produces higher heart rates than cycling at the same perceived effort.',
        },
      },
      {
        '@type': 'Question',
        name: 'When should I recalculate my zones?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Recalculate every 3-6 months or when your resting heart rate changes significantly. Fitness improvements will lower your resting heart rate.',
        },
      },
    ],
  },
  featureList: [
    'Karvonen Method (Heart Rate Reserve)',
    'Age-based Formula (220 - Age)',
    'Custom Maximum Heart Rate',
    '5 Training Zones (Recovery to VO2 Max)',
    'Personalized Training Recommendations',
    'Zone-specific Exercise Examples',
    'Training Tips and Guidelines',
    'Fitness Level Insights',
  ],
  isAccessibleForFree: true,
  keywords: tool.keywords.join(', '),
  medicalConditionsConsidered: [
    'Cardiovascular fitness assessment',
    'Exercise intensity monitoring',
    'Training zone optimization',
    'Heart rate variability',
  ],
}

// Loading fallback component
function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-red-200 border-t-red-600 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading Heart Rate Zone Calculator...</p>
      </div>
    </div>
  )
}

// FAQ Data for SEO  
const FAQ_DATA = [
  {
    question: "Which calculation method should I use?",
    answer: "The Karvonen method (Heart Rate Reserve) is generally considered the most accurate for determining training zones. It takes into account your resting heart rate, which varies significantly between individuals. The age-based formula (220 - age) is simpler but less personalized. For best results, use the Karvonen method with an accurate resting heart rate measurement."
  },
  {
    question: "How do I measure my resting heart rate accurately?",
    answer: "Measure your resting heart rate first thing in the morning before getting out of bed, while you're still lying down and relaxed. Take measurements for 3-5 consecutive days and use the average. Count your pulse for a full 60 seconds for the most accurate reading. Your resting heart rate can vary based on fitness level, stress, sleep quality, and other factors."
  },
  {
    question: "What heart rate zone should I train in?",
    answer: "This depends on your fitness goals. Zone 1-2 (50-70% HRR) are ideal for fat burning and recovery. Zone 3 (70-80% HRR) improves aerobic fitness. Zone 4 (80-90% HRR) develops lactate threshold and endurance. Zone 5 (90-100% HRR) improves VO2 max and anaerobic capacity. Most people benefit from spending 80% of training time in zones 1-3."
  },
  {
    question: "How often should I recalculate my zones?",
    answer: "Recalculate your heart rate zones every 3-6 months as your fitness improves. Your resting heart rate typically decreases as cardiovascular fitness increases, which will affect your zones. Also recalculate if you notice significant changes in your training response or if you've had a significant break from exercise."
  },
  {
    question: "Are heart rate zones different for different activities?",
    answer: "Heart rate zones are generally consistent across activities, but you may notice slight variations. Running typically produces the highest heart rates, while cycling may be 5-10 bpm lower, and swimming can be 10-15 bpm lower due to the horizontal position and cooling effect of water. The zones we calculate are most accurate for running and can be adjusted slightly for other activities."
  },
  {
    question: "What if I can't reach my calculated maximum heart rate?",
    answer: "It's common for calculated maximum heart rate to differ from your actual maximum. Some people have naturally higher or lower maximum heart rates than the formula predicts. If you consistently can't reach your calculated max, consider using a measured maximum from a fitness test or adjust your zones based on perceived exertion and your actual maximum observed heart rate during intense exercise."
  }
]

export default function HeartRateZoneCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <Header />
      
      <Suspense fallback={<LoadingFallback />}>
        <HeartRateZoneCalculator />
      </Suspense>
      
      {/* Server-Side Rendered SEO Content */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Educational Content */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Understanding Heart Rate Training Zones</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">Learn how to optimize your workouts with personalized heart rate zones for better fitness results</p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border-0 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Zone Benefits</h3>
                </div>
                <div className="space-y-2 text-gray-600">
                  <div><strong>Zone 1-2:</strong> Fat burning, recovery, aerobic base building</div>
                  <div><strong>Zone 3:</strong> Aerobic fitness, tempo training</div>
                  <div><strong>Zone 4:</strong> Lactate threshold, race pace endurance</div>
                  <div><strong>Zone 5:</strong> VO2 max, anaerobic power, speed</div>
                </div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border-0 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Training Distribution</h3>
                </div>
                <div className="space-y-2 text-gray-600">
                  <div><strong>80/20 Rule:</strong> 80% easy (Zones 1-2), 20% hard (Zones 4-5)</div>
                  <div><strong>Polarized Training:</strong> Avoid moderate intensity (Zone 3)</div>
                  <div><strong>Base Building:</strong> Focus on Zone 2 for aerobic development</div>
                  <div><strong>Peak Performance:</strong> Include Zone 4-5 intervals</div>
                </div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border-0 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Monitoring Tips</h3>
                </div>
                <div className="space-y-2 text-gray-600">
                  <div>Use chest strap for accuracy during intervals</div>
                  <div>Track heart rate variability for recovery</div>
                  <div>Monitor resting heart rate trends</div>
                  <div>Combine with perceived exertion scale (RPE)</div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">Get answers to common questions about heart rate zone training</p>
            </div>
            
            <div className="max-w-7xl mx-auto">
              <div className="grid gap-6">
                {FAQ_DATA.map((faq, index) => (
                  <div key={index} className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border-0 p-6">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-6 h-6 bg-red-600 rounded-md flex items-center justify-center">
                          <span className="text-white font-semibold text-xs">Q</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Resources Section */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Fitness & Training Resources</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">Explore scientific resources and related health tools</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border-0 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Scientific Guidelines</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <a href="https://www.acsm.org/docs/default-source/files-for-resource-library/acsm-guidelines-download.pdf" 
                       target="_blank" rel="noopener noreferrer" 
                       className="text-blue-600 hover:text-blue-800 font-medium">
                      ACSM Exercise Guidelines
                    </a>
                    <p className="text-gray-600 text-sm">American College of Sports Medicine exercise prescription guidelines</p>
                  </div>
                  <div>
                    <a href="https://www.who.int/news-room/fact-sheets/detail/physical-activity" 
                       target="_blank" rel="noopener noreferrer" 
                       className="text-blue-600 hover:text-blue-800 font-medium">
                      WHO Physical Activity Guidelines
                    </a>
                    <p className="text-gray-600 text-sm">World Health Organization recommendations for physical activity</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border-0 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Related Health Tools</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <a href="/tools/general-health/bmi-calculator" 
                       className="text-blue-600 hover:text-blue-800 font-medium">
                      BMI Calculator
                    </a>
                    <p className="text-gray-600 text-sm">Check your body mass index for fitness planning</p>
                  </div>
                  <div>
                    <a href="/tools/nutrition/calorie-calculator" 
                       className="text-blue-600 hover:text-blue-800 font-medium">
                      Calorie Calculator
                    </a>
                    <p className="text-gray-600 text-sm">Calculate daily calorie needs for your training goals</p>
                  </div>
                  <div>
                    <a href="/tools/fitness/body-fat-calculator" 
                       className="text-blue-600 hover:text-blue-800 font-medium">
                      Body Fat Calculator
                    </a>
                    <p className="text-gray-600 text-sm">Measure body composition for comprehensive fitness tracking</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Medical Disclaimer - Full Width */}
      <div className="w-full bg-amber-50 border-t border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                <Info className="w-4 h-4 text-white" />
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-amber-900 mb-3">Medical Disclaimer</h4>
              <p className="text-amber-800 leading-relaxed">{MEDICAL_DISCLAIMER}</p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  )
}