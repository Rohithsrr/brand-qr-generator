'use client';

import React from 'react';
import { Sparkles, ShieldCheck, Zap, Download, Layers } from 'lucide-react';

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  badge?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title = 'Custom Brand Logo QR Code Generator',
  subtitle = 'Create high-converting branded QR codes with your business logo, custom gradient dots, and printable tabletop standees in seconds. 100% free forever.',
  badge = 'Zero Hosting Cost • Unlimited Scans • No Sign-Up',
}) => {
  return (
    <section className="w-full pt-8 pb-4 text-center px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Hero SVG Brand Emblem */}
        <div className="relative inline-flex items-center justify-center mb-1">
          <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-brand-500/20 via-indigo-500/20 to-cyan-500/20 blur-xl opacity-75 animate-pulse" />
          <div className="relative flex items-center gap-3 px-4 py-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md shadow-brand-500/5 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-cyan-500 p-0.5 shadow-sm">
              <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[10px] flex items-center justify-center overflow-hidden p-1.5">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-brand-600 dark:text-brand-400">
                  <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="3" />
                  <rect x="8" y="8" width="8" height="8" rx="2" fill="currentColor" />
                  <rect x="28" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="3" />
                  <rect x="32" y="8" width="8" height="8" rx="2" fill="currentColor" />
                  <rect x="4" y="28" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="3" />
                  <rect x="8" y="32" width="8" height="8" rx="2" fill="currentColor" />
                  <circle cx="36" cy="36" r="5" fill="#10B981" />
                  <circle cx="28" cy="28" r="3" fill="#06B6D4" />
                  <circle cx="42" cy="26" r="2.5" fill="#F59E0B" />
                  <circle cx="26" cy="42" r="2.5" fill="#EC4899" />
                </svg>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-tight text-slate-800 dark:text-slate-200">
                Brand<span className="text-brand-600">QR</span> Studio
              </span>
              <div className="h-3 w-px bg-slate-200 dark:bg-slate-750" />
              <div className="flex items-center -space-x-1">
                <img src="/logos/google.svg" alt="Google" className="w-4 h-4 rounded-full border border-white dark:border-slate-800 bg-white shadow-2xs" />
                <img src="/logos/whatsapp.svg" alt="WhatsApp" className="w-4 h-4 rounded-full border border-white dark:border-slate-800 bg-white shadow-2xs" />
                <img src="/logos/instagram.svg" alt="Instagram" className="w-4 h-4 rounded-full border border-white dark:border-slate-800 bg-white shadow-2xs" />
                <img src="/logos/wifi.svg" alt="WiFi" className="w-4 h-4 rounded-full border border-white dark:border-slate-800 bg-white shadow-2xs" />
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-200/80 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-xs font-semibold shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-brand-500" />
          <span>{badge}</span>
        </div>

        {/* Main H1 Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          {title}
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-medium text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            Never Expires (Static Links)
          </span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span className="flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            Instant Browser Canvas Rendering
          </span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span className="flex items-center gap-1">
            <Download className="w-3.5 h-3.5 text-indigo-500" />
            High-Res 4K & Vector SVG Export
          </span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span className="flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-cyan-500" />
            Table Tent PDF Standees
          </span>
        </div>
      </div>
    </section>
  );
};
