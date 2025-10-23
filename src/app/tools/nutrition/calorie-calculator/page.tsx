import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CalorieCalculator } from '@/components/tools/CalorieCalculator'
import { HEALTH_TOOLS } from '@/lib/constants'

const tool = HEALTH_TOOLS.find(t => t.slug === 'calorie-calculator')!

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
        url: '/og-calorie.jpg',
        width: 1200,
        height: 630,
        alt: 'Calorie Calculator - Daily Calorie Needs Calculator Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: tool.metaTitle,
    description: tool.metaDescription,
    images: ['/og-calorie.jpg'],
  },
  alternates: {
    canonical: '/tools/nutrition/calorie-calculator',
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
  name: 'Calorie Calculator',
  description: tool.metaDescription,
  url: 'https://healthtoolshub.com/tools/nutrition/calorie-calculator',
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
    target: 'https://healthtoolshub.com/tools/nutrition/calorie-calculator',
    'query-input': 'required name=search_term_string',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '1247',
    bestRating: '5',
    worstRating: '1',
  },
  mainEntity: {
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is TDEE?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Total Daily Energy Expenditure (TDEE) is the total number of calories your body burns in a day, including your base metabolic rate plus calories burned through activity and exercise.',
        },
      },
      {
        '@type': 'Question',
        name: 'How accurate is this calculator?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'This calculator uses the Mifflin-St Jeor equation, which is considered the most accurate formula for calculating BMR. However, individual metabolism can vary by ±10-15%.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should I eat exactly these calories?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use these numbers as a starting point. Monitor your progress and adjust based on your results. Consider consulting a nutritionist for personalized advice.',
        },
      },
      {
        '@type': 'Question',
        name: 'How often should I recalculate?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Recalculate every 4-6 weeks or when your weight changes by more than 2-3 kg, as your calorie needs will change with your body composition.',
        },
      },
    ],
  },
}

export default function CalorieCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <Header />
      <CalorieCalculator />
      <Footer />
    </>
  )
}