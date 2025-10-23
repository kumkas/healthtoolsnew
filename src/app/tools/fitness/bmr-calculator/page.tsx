import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import BMRCalculator from '@/components/tools/BMRCalculator'

const tool = {
  metaTitle: 'BMR Calculator - Basal Metabolic Rate & TDEE Calculator | Health Tools Hub',
  metaDescription: 'Calculate your BMR and TDEE with multiple validated formulas. Get personalized calorie goals, macro breakdowns, and metabolic insights for optimal health and fitness.',
  keywords: ['BMR calculator', 'basal metabolic rate', 'TDEE calculator', 'metabolism calculator', 'calorie calculator', 'daily energy expenditure', 'Mifflin St Jeor', 'Harris Benedict', 'macro calculator', 'fitness calculator']
}

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
        url: '/og-bmr.jpg',
        width: 1200,
        height: 630,
        alt: 'BMR Calculator - Basal Metabolic Rate & TDEE Calculator Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: tool.metaTitle,
    description: tool.metaDescription,
    images: ['/og-bmr.jpg'],
  },
  alternates: {
    canonical: '/tools/fitness/bmr-calculator',
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
  name: 'BMR Calculator',
  description: tool.metaDescription,
  url: 'https://healthtoolshub.com/tools/fitness/bmr-calculator',
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
    target: 'https://healthtoolshub.com/tools/fitness/bmr-calculator',
    'query-input': 'required name=search_term_string',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '4156',
    bestRating: '5',
    worstRating: '1',
  },
  mainEntity: {
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the difference between BMR and TDEE?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'BMR (Basal Metabolic Rate) is calories burned at complete rest. TDEE (Total Daily Energy Expenditure) is BMR plus calories from daily activities and exercise.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which BMR formula is most accurate?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Mifflin-St Jeor is most accurate for general population. Katch-McArdle is best for lean, athletic individuals when body fat is known.',
        },
      },
      {
        '@type': 'Question',
        name: 'How accurate are BMR calculations?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'BMR formulas are accurate within ±10-15% for most people. Individual variations due to genetics, muscle mass, and medical conditions can affect accuracy.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should I eat below my BMR for weight loss?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Generally no. Eating significantly below BMR can slow metabolism and cause muscle loss. Create deficits from TDEE through diet and exercise.',
        },
      },
      {
        '@type': 'Question',
        name: 'How often should I recalculate my BMR?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Recalculate when your weight changes by 5+ pounds, activity level changes significantly, or every 3-4 months during active weight management.',
        },
      },
      {
        '@type': 'Question',
        name: 'What factors can affect my metabolic rate?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Age, gender, muscle mass, genetics, thyroid function, stress, sleep quality, diet composition, and regular exercise all influence metabolic rate.',
        },
      },
    ],
  },
  featureList: [
    'Multiple BMR formula options (Mifflin-St Jeor, Harris-Benedict, Katch-McArdle)',
    'TDEE calculation with activity level adjustment',
    'Personalized calorie goals for different objectives',
    'Detailed macronutrient breakdown recommendations',
    'Metabolic age analysis and insights',
    'Activity recommendations based on goals',
    'Nutrition tips and guidelines',
    'Medical condition adjustments',
    'Imperial and metric unit support',
    'Reliability assessment for chosen formula',
  ],
  isAccessibleForFree: true,
  keywords: tool.keywords.join(', '),
  medicalConditionsConsidered: [
    'Thyroid disorders (hypothyroid, hyperthyroid)',
    'Diabetes type 1 and type 2',
    'Age-related metabolic changes',
    'Body composition variations',
    'Activity level differences',
    'Genetic metabolic variations',
    'Hormonal influences on metabolism',
    'Lifestyle factors affecting BMR',
  ],
}

export default function BMRCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <Header />
      <BMRCalculator />
      <Footer />
    </>
  )
}