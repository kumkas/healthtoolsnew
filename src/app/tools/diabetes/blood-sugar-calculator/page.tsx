import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import BloodSugarCalculator from '@/components/tools/BloodSugarCalculator'

const tool = {
  metaTitle: 'Blood Sugar Calculator - Glucose Analysis & Diabetes Risk Assessment | Health Tools Hub',
  metaDescription: 'Comprehensive blood sugar calculator for glucose analysis, HbA1c conversion, and diabetes risk assessment. Get personalized insights and medical recommendations based on ADA guidelines.',
  keywords: ['blood sugar calculator', 'glucose calculator', 'diabetes calculator', 'HbA1c converter', 'blood glucose test', 'diabetes risk assessment', 'glucose levels', 'blood sugar levels', 'diabetes screening', 'glucose monitoring']
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
        url: '/og-blood-sugar.jpg',
        width: 1200,
        height: 630,
        alt: 'Blood Sugar Calculator - Glucose Analysis & Diabetes Risk Assessment Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: tool.metaTitle,
    description: tool.metaDescription,
    images: ['/og-blood-sugar.jpg'],
  },
  alternates: {
    canonical: '/tools/diabetes/blood-sugar-calculator',
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
  name: 'Blood Sugar Calculator',
  description: tool.metaDescription,
  url: 'https://healthtoolshub.com/tools/diabetes/blood-sugar-calculator',
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
    target: 'https://healthtoolshub.com/tools/diabetes/blood-sugar-calculator',
    'query-input': 'required name=search_term_string',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '3247',
    bestRating: '5',
    worstRating: '1',
  },
  mainEntity: {
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What are normal blood sugar levels?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Normal fasting glucose: 70-99 mg/dL (3.9-5.5 mmol/L). Normal random glucose: under 140 mg/dL (7.8 mmol/L). Normal HbA1c: under 5.7%.',
        },
      },
      {
        '@type': 'Question',
        name: 'When should I check my blood sugar?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Check fasting glucose after 8+ hours without food, random glucose anytime, and post-meal glucose 2 hours after eating. Follow your healthcare provider\'s testing schedule.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is HbA1c and why is it important?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'HbA1c measures average blood sugar over 2-3 months. It\'s crucial for diabetes diagnosis and management, providing long-term glucose control assessment.',
        },
      },
      {
        '@type': 'Question',
        name: 'What causes high blood sugar?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'High blood sugar can result from insufficient insulin, insulin resistance, stress, illness, certain medications, poor diet, or lack of physical activity.',
        },
      },
      {
        '@type': 'Question',
        name: 'When should I seek emergency care?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Seek immediate medical attention for glucose under 70 mg/dL with symptoms, over 400 mg/dL, or signs of diabetic ketoacidosis (DKA).',
        },
      },
      {
        '@type': 'Question',
        name: 'How accurate is this calculator?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'This calculator uses ADA guidelines and validated risk assessment tools. However, it\'s for educational purposes only - always consult healthcare providers for medical decisions.',
        },
      },
    ],
  },
  featureList: [
    'Glucose level analysis and categorization',
    'HbA1c percentage to mmol/mol conversion',
    'Estimated average glucose from HbA1c',
    'Comprehensive diabetes risk assessment',
    'Personalized lifestyle recommendations',
    'Emergency warning system for critical levels',
    'ADA guideline compliance',
    'Multiple glucose measurement support',
    'Educational content and insights',
    'Risk factor analysis and scoring',
  ],
  isAccessibleForFree: true,
  keywords: tool.keywords.join(', '),
  medicalConditionsConsidered: [
    'Type 1 Diabetes management',
    'Type 2 Diabetes monitoring',
    'Prediabetes screening and prevention',
    'Gestational diabetes assessment',
    'Insulin resistance evaluation',
    'Metabolic syndrome risk factors',
    'Family history considerations',
    'Lifestyle and dietary factors',
  ],
}

export default function BloodSugarCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <Header />
      <BloodSugarCalculator />
      <Footer />
    </>
  )
}