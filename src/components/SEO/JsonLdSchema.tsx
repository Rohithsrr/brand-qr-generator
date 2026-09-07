'use client';

import React from 'react';
import { SEOPageData } from '@/types/qr';

interface JsonLdSchemaProps {
  pageData?: SEOPageData;
}

export const JsonLdSchema: React.FC<JsonLdSchemaProps> = ({ pageData }) => {
  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: pageData ? pageData.title : 'BrandQR Studio - Free Brand Logo QR Code Generator',
    operatingSystem: 'All (Web Browser, iOS, Android, Windows, macOS)',
    applicationCategory: 'DesignApplication',
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1428',
    },
    description: pageData
      ? pageData.metaDescription
      : 'Generate custom QR codes with brand logos, custom colors, eye shapes, and printable PDF standees for 100% free.',
  };

  const faqSchema = pageData?.faqs?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: pageData.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  );
};
