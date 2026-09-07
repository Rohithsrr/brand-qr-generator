import React from 'react';
import { HeroSection } from '@/components/HeroSection';
import { HeaderLeaderboard } from '@/components/Monetization/HeaderLeaderboard';
import { SidebarStickyAd } from '@/components/Monetization/SidebarStickyAd';
import { QRStudio } from '@/components/QRStudio/QRStudio';
import { JsonLdSchema } from '@/components/SEO/JsonLdSchema';
import {
  ShieldCheck,
  Zap,
  TrendingUp,
  Smartphone,
  Printer,
  Sparkles,
  QrCode,
  CheckCircle,
} from 'lucide-react';
import Link from 'next/link';
import { SEO_PAGES } from '@/data/seoPagesData';

export default function HomePage() {
  return (
    <>
      <JsonLdSchema />
      
      {/* Top Banner Hero */}
      <HeroSection />

      {/* Header Monetization Slot */}
      <HeaderLeaderboard />

      {/* Main Studio + Sidebar Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col xl:flex-row gap-8 items-start justify-center">
        <div className="flex-1 w-full">
          <QRStudio />
        </div>
        <SidebarStickyAd />
      </div>

      {/* Value Pillars & Educational Growth Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mt-12 border-t border-slate-200/80 dark:border-slate-800">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-brand-600 uppercase tracking-widest">
            High-Performance QR Engineering
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            Why Generic Black & White QR Codes Hurt Your Business
          </h2>
          <p className="text-sm text-slate-600 mt-3 leading-relaxed">
            Standard black & white QR codes trigger hesitation in consumers due to phishing concerns. Custom brand logos in the center increase scan rates by up to <strong>42%</strong> and guarantee immediate brand recognition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">42% Higher Scan Rates</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Customers scan codes they trust. Embedding your official Google, WhatsApp, or business logo provides the security cue users look for.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Zero Expiration Guarantee</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Never pay \$30/month for active QR codes again. All static and direct links generated here are encoded directly into the QR matrix forever.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Printer className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Instant PDF Table Tents</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Skip Figma or Photoshop. Download folding table tents and cashier standees directly formatted for standard office and home printers.
            </p>
          </div>
        </div>

        {/* Popular SEO Landing Category Cards */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-brand-600 to-indigo-700 text-white shadow-xl">
          <div className="max-w-3xl">
            <span className="text-xs uppercase font-bold tracking-widest text-brand-200">
              Free Growth Solutions
            </span>
            <h3 className="text-2xl sm:text-3xl font-black mt-2">
              Ready-to-Use Pre-Configured QR Generators
            </h3>
            <p className="text-sm text-brand-100 mt-2 leading-relaxed">
              Browse our purpose-built templates designed for local business owners, restaurants, creators, and event organizers.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mt-6">
            {Object.values(SEO_PAGES).map((page) => (
              <Link
                key={page.slug}
                href={`/${page.slug}/`}
                className="p-3 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 transition-colors text-xs font-semibold text-white flex flex-col justify-between"
              >
                <span>{page.h1}</span>
                <span className="text-[10px] text-brand-200 mt-2">Open Generator →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
