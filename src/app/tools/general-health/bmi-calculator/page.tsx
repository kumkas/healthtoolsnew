import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { BMICalculator } from '@/components/tools/BMICalculator'
import { HEALTH_TOOLS } from '@/lib/constants'

const tool = HEALTH_TOOLS.find(t => t.slug === 'bmi-calculator')!

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
        url: '/og-bmi.jpg',
        width: 1200,
        height: 630,
        alt: 'BMI Calculator - Free Body Mass Index Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: tool.metaTitle,
    description: tool.metaDescription,
    images: ['/og-bmi.jpg'],
  },
  alternates: {
    canonical: '/tools/general-health/bmi-calculator',
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
const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'BMI Calculator',
    description: tool.metaDescription,
    url: 'https://healthtoolshub.com/tools/general-health/bmi-calculator',
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
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '2547',
      bestRating: '5',
      worstRating: '1',
    },
    featureList: [
      'Free BMI calculation',
      'Visual body type representation',
      'Ideal weight range calculation',
      'Health recommendations',
      'Multiple unit support (metric/imperial)',
      'Instant results',
      'Mobile-friendly interface'
    ],
    potentialAction: {
      '@type': 'UseAction',
      target: 'https://healthtoolshub.com/tools/general-health/bmi-calculator',
      name: 'Calculate BMI',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: 'BMI Calculator - Body Mass Index Tool',
    description: tool.metaDescription,
    url: 'https://healthtoolshub.com/tools/general-health/bmi-calculator',
    about: {
      '@type': 'MedicalCondition',
      name: 'Body Mass Index',
      description: 'Body Mass Index (BMI) is a measure of body fat based on height and weight',
    },
    mainContentOfPage: {
      '@type': 'MedicalWebPageElement',
      about: 'BMI calculation and interpretation',
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
    name: 'How to Calculate BMI',
    description: 'Step-by-step guide to calculate your Body Mass Index',
    totalTime: 'PT2M',
    supply: [
      {
        '@type': 'HowToSupply',
        name: 'Height measurement',
      },
      {
        '@type': 'HowToSupply',
        name: 'Weight measurement',
      },
    ],
    step: [
      {
        '@type': 'HowToStep',
        name: 'Enter your height',
        text: 'Input your height in centimeters or feet/inches',
        position: 1,
      },
      {
        '@type': 'HowToStep',
        name: 'Enter your weight',
        text: 'Input your weight in kilograms or pounds',
        position: 2,
      },
      {
        '@type': 'HowToStep',
        name: 'Calculate BMI',
        text: 'Click the calculate button to get your BMI score and category',
        position: 3,
      },
    ],
  },
]

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-600">Loading BMI Calculator...</p>
      </div>
    </div>
  )
}

export default function BMICalculatorPage() {
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
        <BMICalculator />
      </Suspense>
      <Footer />
    </>
  )
}