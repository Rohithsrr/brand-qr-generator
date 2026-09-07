import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://brand-qr-generator.brandqr.workers.dev'),
  title: 'Free Custom Brand Logo QR Code Generator | Zero Expiration Standees',
  description:
    'Design, customize, and export print-ready QR codes with your business logo, custom gradient dots, and printable tabletop PDF standees for 100% free with zero hosting costs.',
  keywords: [
    'custom qr code with logo',
    'free logo qr generator',
    'google review qr generator',
    'whatsapp qr generator with logo',
    'restaurant menu qr code maker',
    'wifi qr code generator',
    'printable table tent qr',
    'vector svg qr code',
  ],
  authors: [{ name: 'BrandQR Studio' }],
  creator: 'BrandQR Studio',
  publisher: 'BrandQR Studio',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  verification: {
    google: 'google799232760a336dc1',
  },
  openGraph: {
    title: 'Free Custom Brand Logo QR Code Generator | Zero Expiration',
    description:
      'Design, customize, and export print-ready QR codes with your business logo, custom gradient dots, and printable tabletop PDF standees for 100% free.',
    url: 'https://brand-qr-generator.brandqr.workers.dev',
    siteName: 'BrandQR Studio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Custom Brand Logo QR Code Generator',
    description:
      'Create high-converting QR codes with your logo, gradient styling, and printable standees for $0.',
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const analyticsDomain = process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN || 'brandqr.io';

  return (
    <html lang="en">
      <head>
        {/* Google AdSense Programmatic Monetization Script */}
        {adsenseClientId && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
            crossOrigin="anonymous"
            strategy="lazyOnload"
          />
        )}

        {/* Lightweight Privacy-Friendly Analytics (Plausible / Cloudflare Web Analytics) */}
        <Script
          defer
          data-domain={analyticsDomain}
          src="https://plausible.io/js/script.js"
          strategy="lazyOnload"
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-900 selection:bg-brand-500 selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
