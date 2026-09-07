'use client';

import React, { useEffect } from 'react';

export interface AdSlotProps {
  slotId?: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  responsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
  label?: string;
  minHeight?: number;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export const AdSlot: React.FC<AdSlotProps> = ({
  slotId = '1234567890',
  format = 'auto',
  responsive = true,
  className = '',
  style = {},
  label = 'ADVERTISEMENT',
  minHeight = 90,
}) => {
  const adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const isProduction = process.env.NODE_ENV === 'production' && Boolean(adClient);

  useEffect(() => {
    if (isProduction && typeof window !== 'undefined') {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.warn('AdSense push error:', err);
      }
    }
  }, [isProduction]);

  return (
    <div
      className={`w-full flex flex-col items-center justify-center my-4 overflow-hidden ${className}`}
      style={{ minHeight: `${minHeight}px`, ...style }}
    >
      {/* Explicit policy-compliant labeling */}
      <span className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 font-semibold mb-1">
        {label}
      </span>

      {isProduction ? (
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', minHeight: `${minHeight}px` }}
          data-ad-client={adClient}
          data-ad-slot={slotId}
          data-ad-format={format}
          data-full-width-responsive={responsive ? 'true' : 'false'}
        />
      ) : (
        /* Development & Pre-Approval Placeholder Container (Zero CLS) */
        <div className="w-full max-w-4xl h-full border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 rounded-xl p-4 flex flex-col items-center justify-center text-center transition-all">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Programmatic Monetization Slot • {format.toUpperCase()}</span>
          </div>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 max-w-md">
            Responsive AdSense / Media.net Banner ({minHeight}px Min-Height for Zero-CLS Layout Protection)
          </p>
        </div>
      )}
    </div>
  );
};
