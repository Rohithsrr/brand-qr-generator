'use client';

import React from 'react';
import Link from 'next/link';
import { QrCode, Sparkles, ShieldCheck, Heart, Github } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <header className="w-full border-b border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 text-white flex items-center justify-center shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
            <QrCode className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight leading-none">
              Brand<span className="text-brand-600">QR</span>
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
              Studio Pro • 100% Free
            </span>
          </div>
        </Link>

        {/* Center Pill: Zero-Cost Proof */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Zero Server Compute • Infinite Free Scans</span>
        </div>

        {/* Right Action Links */}
        <div className="flex items-center gap-3">
          <Link
            href="/google-review-qr-generator/"
            className="hidden sm:inline-flex text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 px-3 py-2 rounded-lg transition-colors"
          >
            Google Reviews
          </Link>
          <Link
            href="/whatsapp-qr-code-generator-with-logo/"
            className="hidden sm:inline-flex text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 px-3 py-2 rounded-lg transition-colors"
          >
            WhatsApp
          </Link>

          <a
            href="https://github.com/Rohithsrr/brand-qr-generator"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:border-slate-300 transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            <span>Open Source</span>
          </a>
        </div>
      </div>
    </header>
  );
};
