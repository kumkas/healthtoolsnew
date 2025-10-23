import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { OvulationCalculator } from '@/components/tools/OvulationCalculator'
import { HEALTH_TOOLS, MEDICAL_DISCLAIMER } from '@/lib/constants'
import { Info } from 'lucide-react'

const tool = HEALTH_TOOLS.find(t => t.slug === 'ovulation-calculator')!

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
        url: '/og-ovulation.jpg',
        width: 1200,
        height: 630,
        alt: 'Ovulation Calculator - Fertility Tracker Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: tool.metaTitle,
    description: tool.metaDescription,
    images: ['/og-ovulation.jpg'],
  },
  alternates: {
    canonical: '/tools/pregnancy-womens-health/ovulation-calculator',
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

// FAQ Data for SEO
const FAQ_DATA = [
  {
    question: "How accurate is the ovulation calculator?",
    answer: "Our ovulation calculator is based on the standard 28-day cycle model and assumes ovulation occurs 14 days before your next period. It's about 80-85% accurate for women with regular cycles. However, many factors can affect ovulation timing, including stress, illness, travel, and hormonal changes. For the most accurate prediction, combine this calculator with other fertility signs like basal body temperature tracking and cervical mucus monitoring."
  },
  {
    question: "When is the best time to try to conceive?",
    answer: "The best time to conceive is during your fertile window, which typically spans 6 days: the 5 days leading up to ovulation plus the day of ovulation. Sperm can live in the female reproductive tract for up to 5 days, while an egg is viable for about 12-24 hours after ovulation. Having intercourse every other day during your fertile window maximizes your chances of conception."
  },
  {
    question: "What if my cycle is irregular?",
    answer: "If your cycle varies by more than 7 days each month, this calculator may be less accurate. Track your cycles for 3-6 months to identify patterns. Consider using ovulation predictor kits, monitoring basal body temperature, or tracking cervical mucus changes. Irregular cycles can indicate underlying hormonal issues, so consult with a healthcare provider if your cycles are consistently unpredictable."
  },
  {
    question: "How long should we try to conceive before seeking help?",
    answer: "Most healthcare providers recommend trying for 12 months if you're under 35, or 6 months if you're over 35, before seeking fertility evaluation. However, if you have irregular periods, known fertility issues, or other health concerns, don't hesitate to consult with a healthcare provider sooner. Early intervention can often identify and address potential issues."
  },
  {
    question: "Can stress affect ovulation timing?",
    answer: "Yes, stress can significantly impact ovulation timing and even prevent ovulation entirely. High stress levels can disrupt the hormonal signals between your brain and ovaries, leading to delayed or missed ovulation. Managing stress through relaxation techniques, regular exercise, adequate sleep, and healthy lifestyle choices can help regulate your cycle and improve fertility."
  },
  {
    question: "What other signs indicate ovulation?",
    answer: "Besides tracking your cycle, watch for these ovulation signs: changes in cervical mucus (becomes clear, stretchy, and egg-white-like), slight increase in basal body temperature, mild pelvic pain or cramping on one side, increased sex drive, breast tenderness, and slight spotting. Ovulation predictor kits can also detect the LH surge that precedes ovulation by 12-36 hours."
  }
]

// Generate structured data for SEO
const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Ovulation Calculator',
    description: tool.metaDescription,
    url: 'https://healthtoolshub.com/tools/pregnancy-womens-health/ovulation-calculator',
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript',
    permissions: 'no special permissions required',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      validFrom: '2024-01-15',
    },
    author: {
      '@type': 'Organization',
      name: 'Health Tools Hub',
      url: 'https://healthtoolshub.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Health Tools Hub',
      url: 'https://healthtoolshub.com',
    },
    datePublished: '2024-01-15',
    dateModified: new Date().toISOString().split('T')[0],
    inLanguage: 'en-US',
    keywords: tool.keywords.join(', '),
    featureList: [
      'Free ovulation calculation',
      'Fertile window prediction',
      'Menstrual cycle tracking',
      'Future cycles planning',
      'Fertility recommendations',
      'Multiple cycle lengths support',
      'Mobile-friendly interface'
    ],
    potentialAction: {
      '@type': 'UseAction',
      target: 'https://healthtoolshub.com/tools/pregnancy-womens-health/ovulation-calculator',
      name: 'Calculate Ovulation',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: 'Ovulation Calculator - Fertility Tracker Tool',
    description: tool.metaDescription,
    url: 'https://healthtoolshub.com/tools/pregnancy-womens-health/ovulation-calculator',
    about: {
      '@type': 'MedicalCondition',
      name: 'Ovulation',
      description: 'Ovulation is the release of an egg from the ovary, typically occurring mid-cycle',
    },
    mainContentOfPage: {
      '@type': 'MedicalWebPageElement',
      about: 'Ovulation calculation and fertility tracking',
    },
    medicalAudience: {
      '@type': 'MedicalAudience',
      audienceType: 'Patient',
    },
    lastReviewed: new Date().toISOString().split('T')[0],
    reviewedBy: {
      '@type': 'Organization',
      name: 'Health Tools Hub Medical Team',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Calculate Your Ovulation',
    description: 'Step-by-step guide to calculate your ovulation and fertile window',
    totalTime: 'PT3M',
    supply: [
      {
        '@type': 'HowToSupply',
        name: 'Last menstrual period date',
      },
      {
        '@type': 'HowToSupply',
        name: 'Average cycle length',
      },
      {
        '@type': 'HowToSupply',
        name: 'Average period length',
      },
    ],
    step: [
      {
        '@type': 'HowToStep',
        name: 'Enter your last menstrual period date',
        text: 'Input the first day of your last menstrual period',
        position: 1,
      },
      {
        '@type': 'HowToStep',
        name: 'Enter your cycle length',
        text: 'Input your average cycle length (21-35 days, typically 28 days)',
        position: 2,
      },
      {
        '@type': 'HowToStep',
        name: 'Enter your period length',
        text: 'Input your average period length (3-8 days, typically 5 days)',
        position: 3,
      },
      {
        '@type': 'HowToStep',
        name: 'Calculate ovulation',
        text: 'Click the calculate button to get your ovulation date and fertile window',
        position: 4,
      },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_DATA.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  },
]

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-600">Loading Ovulation Calculator...</p>
      </div>
    </div>
  )
}

export default function OvulationCalculatorPage() {
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
        <OvulationCalculator />
      </Suspense>
      
      {/* Server-Side Rendered SEO Content */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Educational Content */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Understanding Ovulation & Fertility</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">Learn about your menstrual cycle, ovulation timing, and fertility signs to optimize your conception journey</p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border-0 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-rose-600 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Ovulation Basics</h3>
                </div>
                <div className="space-y-2 text-gray-600">
                  <div><strong>Timing:</strong> Usually 12-16 days before next period</div>
                  <div><strong>Egg lifespan:</strong> 12-24 hours after release</div>
                  <div><strong>Sperm lifespan:</strong> Up to 5 days in reproductive tract</div>
                  <div><strong>Fertile window:</strong> 6 days total (5 before + ovulation day)</div>
                </div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border-0 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-rose-600 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Cycle Phases</h3>
                </div>
                <div className="space-y-2 text-gray-600">
                  <div><strong>Menstrual:</strong> Shedding of uterine lining (Days 1-5)</div>
                  <div><strong>Follicular:</strong> Egg development and maturation (Days 1-13)</div>
                  <div><strong>Ovulation:</strong> Egg release from ovary (Day 14)</div>
                  <div><strong>Luteal:</strong> Uterine lining preparation (Days 15-28)</div>
                </div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border-0 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-rose-600 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Fertility Signs</h3>
                </div>
                <div className="space-y-2 text-gray-600">
                  <div>Clear, stretchy cervical mucus (egg white consistency)</div>
                  <div>Slight basal body temperature rise (0.5-1°F)</div>
                  <div>Mild pelvic pain or cramping (mittelschmerz)</div>
                  <div>Increased libido and energy levels</div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">Get answers to common questions about ovulation tracking and fertility</p>
            </div>
            
            <div className="max-w-7xl mx-auto">
              <div className="grid gap-6">
                {FAQ_DATA.map((faq, index) => (
                  <div key={index} className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border-0 p-6">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-6 h-6 bg-rose-600 rounded-md flex items-center justify-center">
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
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Fertility & Pregnancy Resources</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">Explore trusted medical resources and related health tools</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border-0 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-rose-600 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Medical Guidelines</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <a href="https://www.acog.org/womens-health/faqs/fertility-awareness-based-methods-of-family-planning" 
                       target="_blank" rel="noopener noreferrer" 
                       className="text-blue-600 hover:text-blue-800 font-medium">
                      ACOG Fertility Awareness Guidelines
                    </a>
                    <p className="text-gray-600 text-sm">American College of Obstetricians and Gynecologists fertility guidance</p>
                  </div>
                  <div>
                    <a href="https://www.cdc.gov/reproductivehealth/infertility/index.htm" 
                       target="_blank" rel="noopener noreferrer" 
                       className="text-blue-600 hover:text-blue-800 font-medium">
                      CDC Reproductive Health Information
                    </a>
                    <p className="text-gray-600 text-sm">Centers for Disease Control fertility and reproductive health resources</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border-0 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-rose-600 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Related Health Tools</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <a href="/tools/pregnancy-womens-health/due-date-calculator" 
                       className="text-blue-600 hover:text-blue-800 font-medium">
                      Due Date Calculator
                    </a>
                    <p className="text-gray-600 text-sm">Calculate your pregnancy due date and track milestones</p>
                  </div>
                  <div>
                    <a href="/tools/general-health/bmi-calculator" 
                       className="text-blue-600 hover:text-blue-800 font-medium">
                      BMI Calculator
                    </a>
                    <p className="text-gray-600 text-sm">Maintain healthy weight for optimal fertility</p>
                  </div>
                  <div>
                    <a href="/tools/nutrition/calorie-calculator" 
                       className="text-blue-600 hover:text-blue-800 font-medium">
                      Calorie Calculator
                    </a>
                    <p className="text-gray-600 text-sm">Plan nutrition for preconception health</p>
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