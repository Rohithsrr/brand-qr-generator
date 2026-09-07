'use client';

import React from 'react';
import Link from 'next/link';
import { QrCode, Heart, Sparkles } from 'lucide-react';
import { SEO_PAGES } from '@/data/seoPagesData';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-900 text-slate-400 border-t border-slate-800 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-600 text-white flex items-center justify-center">
                <QrCode className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Brand<span className="text-brand-400">QR</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              The high-performance, client-side brand QR code generator with zero hosting fees. Free forever for businesses, restaurants, creators, and marketers.
            </p>
            <div className="text-[11px] text-slate-500">
              Zero Server Compute • Powered by Client-Side Canvas & Cloudflare Edge CDN
            </div>
          </div>

          {/* Col 2 & 3: Programmatic SEO Landing Pages Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Free Custom QR Solutions
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {Object.values(SEO_PAGES).map((page) => (
                <Link
                  key={page.slug}
                  href={`/${page.slug}/`}
                  className="hover:text-white transition-colors truncate"
                >
                  • {page.h1}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 4: Compliance & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Transparency & Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#privacy" className="hover:text-white transition-colors">
                  Privacy Policy (No Data Storage)
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#ads" className="hover:text-white transition-colors">
                  AdChoices & Cookie Policies
                </a>
              </li>
              <li>
                <a href="#api" className="hover:text-white transition-colors">
                  Zero-Cost Deployment Docs
                </a>
              </li>
            </ul>
            <div className="pt-2 text-[11px] text-slate-500">
              Compliant with Google Publisher Policies & General Data Protection Regulation (GDPR).
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} BrandQR Studio. Built for unlimited free distribution.
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Engineered with precision for zero-cost hosting</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
