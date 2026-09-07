import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SEO_PAGES } from '@/data/seoPagesData';
import { PRESET_THEMES } from '@/data/presets';
import { HeroSection } from '@/components/HeroSection';
import { HeaderLeaderboard } from '@/components/Monetization/HeaderLeaderboard';
import { SidebarStickyAd } from '@/components/Monetization/SidebarStickyAd';
import { QRStudio } from '@/components/QRStudio/QRStudio';
import { JsonLdSchema } from '@/components/SEO/JsonLdSchema';
import { SEOLandingContent } from '@/components/SEO/SEOLandingContent';
import { QRConfig } from '@/types/qr';

interface PageProps {
  params: {
    seoSlug: string;
  };
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return Object.keys(SEO_PAGES).map((slug) => ({
    seoSlug: slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const pageData = SEO_PAGES[params.seoSlug];
  if (!pageData) {
    return { title: 'Page Not Found | BrandQR Studio' };
  }

  return {
    title: pageData.title,
    description: pageData.metaDescription,
    keywords: [pageData.targetKeyword, 'free qr generator', 'qr code with logo', 'printable qr standee'],
    openGraph: {
      title: pageData.title,
      description: pageData.metaDescription,
      url: `https://brandqr.io/${pageData.slug}/`,
      siteName: 'BrandQR Studio',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageData.title,
      description: pageData.metaDescription,
    },
  };
}

export default function SEOLandingPage({ params }: PageProps) {
  const pageData = SEO_PAGES[params.seoSlug];
  if (!pageData) {
    notFound();
  }

  // Find matching preset to pre-fill the studio
  const preset = PRESET_THEMES.find((p) => p.id === pageData.presetId) || PRESET_THEMES[0];

  const initialConfig: Partial<QRConfig> = {
    data: pageData.initialValue,
    contentType: pageData.contentType,
    dotsType: preset.dotsType,
    dotsColorType: preset.dotsColorType,
    dotsColor: preset.dotsColor,
    dotsGradient: preset.dotsGradient,
    cornersSquareType: preset.cornersSquareType,
    cornersSquareColor: preset.cornersSquareColor,
    cornersDotType: preset.cornersDotType,
    cornersDotColor: preset.cornersDotColor,
    bgColor: preset.bgColor,
    logoUrl: preset.logoUrl || null,
    logoName: preset.logoName,
    errorCorrection: preset.logoUrl ? 'H' : 'M',
  };

  // Specific initial values
  if (pageData.contentType === 'google-review') {
    initialConfig.googleReviewConfig = { placeIdOrUrl: pageData.initialValue };
  } else if (pageData.contentType === 'wifi') {
    initialConfig.wifiConfig = {
      ssid: 'Guest_WiFi',
      password: 'guestpassword123',
      encryption: 'WPA',
      hidden: false,
    };
  } else if (pageData.contentType === 'whatsapp') {
    initialConfig.whatsappConfig = {
      phone: '15551234567',
      message: 'Hi! I am reaching out from your website QR code.',
    };
  } else if (pageData.contentType === 'instagram') {
    initialConfig.instagramConfig = {
      username: 'yourbrand',
    };
  }

  return (
    <>
      <JsonLdSchema pageData={pageData} />

      {/* Hero Headline specifically targeting keyword */}
      <HeroSection
        title={pageData.h1}
        subtitle={pageData.heroSubtitle}
        badge={pageData.badge}
      />

      {/* Programmatic Monetization Slot */}
      <HeaderLeaderboard />

      {/* Pre-Configured Interactive Studio */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col xl:flex-row gap-8 items-start justify-center">
        <div className="flex-1 w-full">
          <QRStudio initialConfig={initialConfig} initialPresetId={pageData.presetId} />
        </div>
        <SidebarStickyAd />
      </div>

      {/* Educational Content & FAQ Schema Section */}
      <SEOLandingContent pageData={pageData} />
    </>
  );
}
