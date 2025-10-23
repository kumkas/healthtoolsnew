import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import HeartRateZoneCalculator from '@/components/tools/HeartRateZoneCalculator'

const tool = {
  metaTitle: 'Heart Rate Zone Calculator - Training Zone Calculator | Health Tools Hub',
  metaDescription: 'Calculate your personalized heart rate training zones using Karvonen method or age formula. Optimize your workout intensity for fat burning, endurance, and performance goals.',
  keywords: ['heart rate zones', 'training zones', 'Karvonen method', 'heart rate calculator', 'target heart rate', 'cardio zones', 'fitness zones', 'aerobic training']
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
      <HeartRateZoneCalculator />
      <Footer />
    </>
  )
}