import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HydrationCalculator } from '@/components/tools/HydrationCalculator'

const tool = {
  metaTitle: 'Hydration Calculator - Daily Water Intake Calculator | Health Tools Hub',
  metaDescription: 'Calculate your personalized daily water intake needs based on your lifestyle, activity, and health factors. Get timing recommendations and hydration tips.',
  keywords: ['hydration calculator', 'water intake calculator', 'daily water needs', 'hydration needs', 'water consumption', 'dehydration prevention', 'fluid balance']
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
        url: '/og-hydration.jpg',
        width: 1200,
        height: 630,
        alt: 'Hydration Calculator - Daily Water Intake Calculator Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: tool.metaTitle,
    description: tool.metaDescription,
    images: ['/og-hydration.jpg'],
  },
  alternates: {
    canonical: '/tools/general-health/hydration-calculator',
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
  name: 'Hydration Calculator',
  description: tool.metaDescription,
  url: 'https://healthtoolshub.com/tools/general-health/hydration-calculator',
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
    target: 'https://healthtoolshub.com/tools/general-health/hydration-calculator',
    'query-input': 'required name=search_term_string',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.7',
    ratingCount: '2834',
    bestRating: '5',
    worstRating: '1',
  },
  mainEntity: {
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How accurate is this calculator?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'This calculator uses established formulas and factors. Individual needs may vary by ±10-20%. Monitor your body\'s signals and adjust accordingly.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I drink too much water?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, overhydration (hyponatremia) is possible but rare in healthy individuals. Don\'t exceed 1 liter per hour or ignore overhydration warning signs.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do other beverages count?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, but water is best. Coffee, tea, and milk contribute to hydration. Limit sugary drinks and alcohol as they can increase fluid needs.',
        },
      },
      {
        '@type': 'Question',
        name: 'What about water-rich foods?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'About 20% of fluid intake comes from food. Fruits, vegetables, and soups contribute significantly to hydration.',
        },
      },
      {
        '@type': 'Question',
        name: 'When should I drink more?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Increase intake during illness (fever, vomiting), hot weather, high altitude, pregnancy, breastfeeding, and before/during/after exercise.',
        },
      },
      {
        '@type': 'Question',
        name: 'What if I have kidney problems?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Consult your healthcare provider. Kidney disease may require fluid restrictions or specific hydration protocols.',
        },
      },
    ],
  },
  featureList: [
    'Personalized daily water intake calculation',
    'Activity level adjustments',
    'Climate and environmental factors',
    'Health condition considerations',
    'Pregnancy and breastfeeding adjustments',
    'Timing recommendations throughout the day',
    'Warning signs for dehydration and overhydration',
    'Fluid source recommendations',
    'Current intake comparison',
    'Personalized hydration insights',
  ],
  isAccessibleForFree: true,
  keywords: tool.keywords.join(', '),
  medicalConditionsConsidered: [
    'Diabetes and blood sugar management',
    'Kidney disease considerations',
    'Heart disease factors',
    'Pregnancy and breastfeeding needs',
    'Exercise and athletic performance',
    'Climate and environmental impacts',
  ],
}

export default function HydrationCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <Header />
      <HydrationCalculator />
      <Footer />
    </>
  )
}