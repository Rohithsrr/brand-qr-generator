'use client';

import React from 'react';
import { PRESET_THEMES } from '@/data/presets';
import { PresetTheme, QRConfig } from '@/types/qr';
import { Sparkles } from 'lucide-react';

interface PresetsGalleryProps {
  onApplyPreset: (preset: PresetTheme) => void;
  activePresetId?: string;
}

export const PresetsGallery: React.FC<PresetsGalleryProps> = ({ onApplyPreset, activePresetId }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Curated Brand Presets</span>
        </label>
        <span className="text-[11px] text-slate-400">1-Click Apply</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {PRESET_THEMES.map((preset) => {
          const isActive = activePresetId === preset.id;
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => onApplyPreset(preset)}
              className={`text-left p-3 rounded-xl border transition-all relative overflow-hidden flex flex-col justify-between ${
                isActive
                  ? 'border-brand-500 bg-brand-50/70 dark:bg-brand-950/40 ring-2 ring-brand-500 shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 hover:border-brand-400 dark:hover:border-brand-600 hover:shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 truncate">
                    {preset.badge}
                  </span>
                  {preset.logoUrl && (
                    <img src={preset.logoUrl} alt="" className="w-4 h-4 object-contain shrink-0" />
                  )}
                </div>
                <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  {preset.name}
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-tight">
                  {preset.description}
                </p>
              </div>

              {/* Color swatch bar */}
              <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center gap-1">
                <div
                  className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                  style={{ backgroundColor: preset.dotsColor }}
                />
                <div
                  className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                  style={{ backgroundColor: preset.cornersSquareColor }}
                />
                <span className="text-[10px] text-slate-400 dark:text-slate-500 ml-auto font-mono">
                  {preset.dotsType}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
