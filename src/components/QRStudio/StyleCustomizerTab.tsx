'use client';

import React from 'react';
import { DotType, CornerSquareType, CornerDotType, ErrorCorrectionLevel, QRConfig } from '@/types/qr';
import { Palette, Layers, ShieldCheck } from 'lucide-react';

interface StyleCustomizerTabProps {
  config: QRConfig;
  onChange: (updates: Partial<QRConfig>) => void;
}

const DOT_TYPES: { type: DotType; label: string }[] = [
  { type: 'rounded', label: 'Rounded' },
  { type: 'dots', label: 'Dots' },
  { type: 'classy', label: 'Classy' },
  { type: 'classy-rounded', label: 'Classy Round' },
  { type: 'square', label: 'Square' },
  { type: 'extra-rounded', label: 'Extra Round' },
];

const CORNER_SQUARE_TYPES: { type: CornerSquareType; label: string }[] = [
  { type: 'extra-rounded', label: 'Extra Round' },
  { type: 'dot', label: 'Circle' },
  { type: 'square', label: 'Square' },
];

const CORNER_DOT_TYPES: { type: CornerDotType; label: string }[] = [
  { type: 'dot', label: 'Dot' },
  { type: 'square', label: 'Square' },
];

const COLOR_PALETTES = [
  '#000000',
  '#4F46E5', // Indigo
  '#0284C7', // Sky
  '#059669', // Emerald
  '#DC2626', // Red
  '#D97706', // Amber
  '#7C3AED', // Violet
  '#DB2777', // Pink
];

export const StyleCustomizerTab: React.FC<StyleCustomizerTabProps> = ({ config, onChange }) => {
  return (
    <div className="space-y-6">
      {/* Dots Pattern Styling */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2.5">
          QR Code Pattern Style
        </label>
        <div className="grid grid-cols-3 gap-2">
          {DOT_TYPES.map(({ type, label }) => {
            const active = config.dotsType === type;
            return (
              <button
                key={type}
                type="button"
                onClick={() => onChange({ dotsType: type })}
                className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all ${
                  active
                    ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 ring-1 ring-brand-500'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Dots Color / Gradient */}
      <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200">
            <Palette className="w-3.5 h-3.5 text-brand-500" />
            <span>Pattern Colors</span>
          </div>
          <div className="flex items-center bg-slate-200/70 dark:bg-slate-700/60 p-0.5 rounded-lg text-[11px] font-medium">
            <button
              type="button"
              onClick={() => onChange({ dotsColorType: 'single' })}
              className={`px-2.5 py-1 rounded-md transition-all ${
                config.dotsColorType === 'single'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Solid
            </button>
            <button
              type="button"
              onClick={() => onChange({ dotsColorType: 'gradient' })}
              className={`px-2.5 py-1 rounded-md transition-all ${
                config.dotsColorType === 'gradient'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Gradient
            </button>
          </div>
        </div>

        {config.dotsColorType === 'single' ? (
          <div>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={config.dotsColor}
                onChange={(e) => onChange({ dotsColor: e.target.value })}
                className="w-10 h-10 rounded-lg cursor-pointer border-0 bg-transparent p-0"
              />
              <input
                type="text"
                value={config.dotsColor}
                onChange={(e) => onChange({ dotsColor: e.target.value })}
                className="w-28 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono uppercase"
              />
              {/* Quick Swatches */}
              <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                {COLOR_PALETTES.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => onChange({ dotsColor: color })}
                    style={{ backgroundColor: color }}
                    className="w-5 h-5 rounded-full border border-black/10 shrink-0 hover:scale-110 transition-transform"
                    aria-label={`Select color ${color}`}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-slate-500 mb-1">Start Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={config.dotsGradient.colorStops[0]?.color || '#4F46E5'}
                    onChange={(e) => {
                      const stops = [...config.dotsGradient.colorStops];
                      stops[0] = { offset: 0, color: e.target.value };
                      onChange({
                        dotsGradient: { ...config.dotsGradient, colorStops: stops },
                      });
                    }}
                    className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent"
                  />
                  <input
                    type="text"
                    value={config.dotsGradient.colorStops[0]?.color || '#4F46E5'}
                    onChange={(e) => {
                      const stops = [...config.dotsGradient.colorStops];
                      stops[0] = { offset: 0, color: e.target.value };
                      onChange({
                        dotsGradient: { ...config.dotsGradient, colorStops: stops },
                      });
                    }}
                    className="w-20 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono uppercase"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] text-slate-500 mb-1">End Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={config.dotsGradient.colorStops[1]?.color || '#06B6D4'}
                    onChange={(e) => {
                      const stops = [...config.dotsGradient.colorStops];
                      stops[1] = { offset: 1, color: e.target.value };
                      onChange({
                        dotsGradient: { ...config.dotsGradient, colorStops: stops },
                      });
                    }}
                    className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent"
                  />
                  <input
                    type="text"
                    value={config.dotsGradient.colorStops[1]?.color || '#06B6D4'}
                    onChange={(e) => {
                      const stops = [...config.dotsGradient.colorStops];
                      stops[1] = { offset: 1, color: e.target.value };
                      onChange({
                        dotsGradient: { ...config.dotsGradient, colorStops: stops },
                      });
                    }}
                    className="w-20 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono uppercase"
                  />
                </div>
              </div>
            </div>

            {/* Rotation Slider */}
            <div>
              <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
                <span>Gradient Angle</span>
                <span className="font-mono">{config.dotsGradient.rotation}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                value={config.dotsGradient.rotation}
                onChange={(e) =>
                  onChange({
                    dotsGradient: {
                      ...config.dotsGradient,
                      rotation: parseInt(e.target.value),
                    },
                  })
                }
                className="w-full accent-brand-600 cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>

      {/* Eye Corners Customization */}
      <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-4">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200">
          <Layers className="w-3.5 h-3.5 text-brand-500" />
          <span>Eye & Corner Styling</span>
        </div>

        {/* Corner Square Shape */}
        <div>
          <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1.5">
            Corner Outer Frame
          </label>
          <div className="grid grid-cols-3 gap-2">
            {CORNER_SQUARE_TYPES.map(({ type, label }) => (
              <button
                key={type}
                type="button"
                onClick={() => onChange({ cornersSquareType: type })}
                className={`py-1.5 px-2 rounded-lg text-xs font-medium border text-center transition-all ${
                  config.cornersSquareType === type
                    ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Corner Dot Shape */}
        <div>
          <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1.5">
            Corner Inner Dot
          </label>
          <div className="grid grid-cols-2 gap-2">
            {CORNER_DOT_TYPES.map(({ type, label }) => (
              <button
                key={type}
                type="button"
                onClick={() => onChange({ cornersDotType: type })}
                className={`py-1.5 px-2 rounded-lg text-xs font-medium border text-center transition-all ${
                  config.cornersDotType === type
                    ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Corner Accent Colors */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <div>
            <label className="block text-[11px] text-slate-500 mb-1">Outer Frame Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={config.cornersSquareColor || config.dotsColor}
                onChange={(e) => onChange({ cornersSquareColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent"
              />
              <input
                type="text"
                value={config.cornersSquareColor || config.dotsColor}
                onChange={(e) => onChange({ cornersSquareColor: e.target.value })}
                className="w-20 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono uppercase"
              />
            </div>
          </div>
          <div>
            <label className="block text-[11px] text-slate-500 mb-1">Inner Dot Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={config.cornersDotColor || config.dotsColor}
                onChange={(e) => onChange({ cornersDotColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent"
              />
              <input
                type="text"
                value={config.cornersDotColor || config.dotsColor}
                onChange={(e) => onChange({ cornersDotColor: e.target.value })}
                className="w-20 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono uppercase"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Background & Error Correction */}
      <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">
              Background Color
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                disabled={config.bgTransparent}
                value={config.bgColor}
                onChange={(e) => onChange({ bgColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent disabled:opacity-40"
              />
              <input
                type="text"
                disabled={config.bgTransparent}
                value={config.bgTransparent ? 'TRANSPARENT' : config.bgColor}
                onChange={(e) => onChange({ bgColor: e.target.value })}
                className="w-24 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono uppercase disabled:opacity-40"
              />
            </div>
          </div>
          <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer pt-4">
            <input
              type="checkbox"
              checked={config.bgTransparent}
              onChange={(e) => onChange({ bgTransparent: e.target.checked })}
              className="rounded text-brand-600 focus:ring-brand-500"
            />
            <span>Transparent Background</span>
          </label>
        </div>

        {/* Error Correction Level */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Error Correction Level</span>
            </label>
            <span className="text-[11px] text-slate-500">
              {config.errorCorrection === 'H'
                ? 'High 30% (Best with Logo)'
                : config.errorCorrection === 'Q'
                ? 'Quartile 25%'
                : config.errorCorrection === 'M'
                ? 'Medium 15%'
                : 'Low 7%'}
            </span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {(['L', 'M', 'Q', 'H'] as ErrorCorrectionLevel[]).map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => onChange({ errorCorrection: lvl })}
                className={`py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                  config.errorCorrection === lvl
                    ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 ring-1 ring-brand-500'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                Level {lvl}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
