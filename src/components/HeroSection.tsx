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
