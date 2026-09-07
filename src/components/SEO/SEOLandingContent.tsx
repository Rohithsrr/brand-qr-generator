'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SEOPageData } from '@/types/qr';
import { SEO_PAGES } from '@/data/seoPagesData';
import {
  ChevronDown,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
} from 'lucide-react';

interface SEOLandingContentProps {
  pageData: SEOPageData;
}

export const SEOLandingContent: React.FC<SEOLandingContentProps> = ({ pageData }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // Other pSEO pages for internal linking
  const otherPages = Object.values(SEO_PAGES).filter((p) => p.slug !== pageData.slug);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-16">
      {/* Feature Value Props Grid */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest">
            Why Custom Branded QRs Outperform Plain Codes
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-2">
            Engineered for Higher Scan Engagement
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pageData.whyChoosePoints.map((point, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-brand-300 dark:hover:border-brand-700 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold text-base mb-4">
                0{i + 1}
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                {point.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {point.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Step-by-Step Walkthrough */}
      <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
        <div className="text-center max-w-xl mx-auto mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            How to Create Your {pageData.targetKeyword} in 30 Seconds
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            No design skills or software downloads required.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pageData.howToSteps.map((step) => (
            <div key={step.step} className="relative space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-brand-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  {step.step}
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  {step.title}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 pl-9">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive FAQ Section with Rich Schema.org Context */}
      <div>
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest">
            Common Questions
          </span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {pageData.faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-4 text-left font-semibold text-sm text-slate-900 dark:text-white hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ml-2 ${
                      isOpen ? 'rotate-180 text-brand-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Internal Linking Matrix for Programmatic SEO Authority */}
      <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 text-center">
          More Free Custom QR Code Generators
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {otherPages.map((page) => (
            <Link
              key={page.slug}
              href={`/${page.slug}/`}
              className="px-3 py-1.5 rounded-full text-xs bg-slate-100 dark:bg-slate-800 hover:bg-brand-50 dark:hover:bg-brand-950 text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 border border-slate-200 dark:border-slate-700 transition-colors flex items-center gap-1"
            >
              <span>{page.h1}</span>
              <ArrowRight className="w-3 h-3 text-slate-400" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
