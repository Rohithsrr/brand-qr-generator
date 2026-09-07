'use client';

import React from 'react';
import { AdSlot } from './AdSlot';

export const SidebarStickyAd: React.FC = () => {
  return (
    <div className="hidden xl:block w-72 shrink-0">
      <div className="sticky top-24 space-y-4">
        <AdSlot
          slotId="5566778899"
          format="rectangle"
          minHeight={250}
          label="SPONSORED"
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-2"
        />
        <div className="p-4 rounded-xl bg-gradient-to-br from-brand-50 to-indigo-50/50 dark:from-brand-950/40 dark:to-indigo-950/20 border border-brand-100 dark:border-brand-900/50 text-xs text-slate-600 dark:text-slate-400">
          <div className="font-semibold text-brand-700 dark:text-brand-300 mb-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span>
            100% Free Forever
          </div>
          This tool is supported by non-intrusive programmatic sponsors. Zero paywalls, zero watermarks required.
        </div>
      </div>
    </div>
  );
};
