import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import BodyFatCalculator from '@/components/tools/BodyFatCalculator'

const tool = {
  metaTitle: 'Body Fat Calculator - Accurate Body Fat Percentage Calculator | Health Tools Hub',
  metaDescription: 'Calculate your body fat percentage using scientifically validated methods. Get detailed body composition analysis, health insights, and personalized recommendations.',
  keywords: ['body fat calculator', 'body fat percentage', 'body composition', 'US Navy method', 'Jackson Pollock', 'fitness calculator', 'lean mass calculator']
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
        url: '/og-body-fat.jpg',
        width: 1200,
        height: 630,
        alt: 'Body Fat Calculator - Body Composition Analysis Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: tool.metaTitle,
    description: tool.metaDescription,
    images: ['/og-body-fat.jpg'],
  },
  alternates: {
    canonical: '/tools/fitness/body-fat-calculator',
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
  name: 'Body Fat Calculator',
  description: tool.metaDescription,
  url: 'https://healthtoolshub.com/tools/fitness/body-fat-calculator',
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
    target: 'https://healthtoolshub.com/tools/fitness/body-fat-calculator',
    'query-input': 'required name=search_term_string',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '2156',
    bestRating: '5',
    worstRating: '1',
  },
  mainEntity: {
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Which method should I choose?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For home use, the US Navy method is most practical and accurate. Skinfold methods are more precise but require calipers and training.',
        },
      },
      {
        '@type': 'Question',
        name: 'How accurate are these calculations?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'US Navy method: ±3-4%, Jackson-Pollock methods: ±1-3%. Accuracy depends on proper measurement technique and individual factors.',
        },
      },
      {
        '@type': 'Question',
        name: 'What\'s a healthy body fat percentage?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For men: 10-20% is generally healthy. For women: 16-25% is considered healthy. Athletes may have lower percentages.',
        },
      },
      {
        '@type': 'Question',
        name: 'How often should I measure?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Monthly measurements are sufficient for tracking progress. Daily variations are normal due to hydration, time of day, and other factors.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is body fat percentage better than BMI?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, body fat percentage provides a more accurate picture of health as it distinguishes between fat and muscle mass, unlike BMI.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I reduce my body fat percentage?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, through a combination of proper nutrition, regular exercise (both cardio and strength training), and lifestyle modifications.',
        },
      },
    ],
  },
  featureList: [
    'US Navy Method - Tape measurements',
    'YMCA Method - Waist measurement',
    'Jackson-Pollock 3-Site - Skinfold calipers',
    'Jackson-Pollock 7-Site - Advanced skinfolds',
    'Complete body composition analysis',
    'Health category classification',
    'Personalized recommendations',
    'Method accuracy information',
  ],
  isAccessibleForFree: true,
  keywords: tool.keywords.join(', '),
}

export default function BodyFatCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <Header />
      <BodyFatCalculator />
      <Footer />
    </>
  )
}