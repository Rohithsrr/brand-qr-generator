'use client';

import React, { useRef, useState } from 'react';
import { UploadCloud, Trash2, ShieldAlert, Sparkles, Check } from 'lucide-react';
import { QRConfig } from '@/types/qr';

interface LogoUploadTabProps {
  config: QRConfig;
  onChange: (updates: Partial<QRConfig>) => void;
}

const BRAND_LOGOS = [
  { name: 'Google', url: '/logos/google.svg' },
  { name: 'Google Star', url: '/logos/google-star.svg' },
  { name: 'WhatsApp', url: '/logos/whatsapp.svg' },
  { name: 'Instagram', url: '/logos/instagram.svg' },
  { name: 'Wi-Fi', url: '/logos/wifi.svg' },
  { name: 'YouTube', url: '/logos/youtube.svg' },
  { name: 'LinkedIn', url: '/logos/linkedin.svg' },
  { name: 'X / Twitter', url: '/logos/x-twitter.svg' },
  { name: 'Spotify', url: '/logos/spotify.svg' },
  { name: 'Bitcoin', url: '/logos/bitcoin.svg' },
  { name: 'Restaurant', url: '/logos/restaurant.svg' },
  { name: 'App Store', url: '/logos/appstore.svg' },
];

export const LogoUploadTab: React.FC<LogoUploadTabProps> = ({ config, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (PNG, SVG, JPG, or WebP)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      onChange({
        logoUrl: dataUrl,
        logoName: file.name,
        errorCorrection: 'H', // Automatically bump error correction to H (30%) for logo safety
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Box */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2.5">
          Custom Brand Logo Upload
        </label>
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
            dragActive
              ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-950/20'
              : 'border-slate-300 dark:border-slate-700 hover:border-brand-400 dark:hover:border-brand-500 bg-slate-50/50 dark:bg-slate-800/30'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/svg+xml,image/jpeg,image/webp"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileChange(e.target.files[0]);
              }
            }}
          />
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="p-3 rounded-full bg-brand-100 dark:bg-brand-900/60 text-brand-600 dark:text-brand-300">
              <UploadCloud className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                Click to browse or drag and drop your logo
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                PNG, SVG, or high-res JPG (Transparent background recommended)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Logo Status */}
      {config.logoUrl && (
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center overflow-hidden p-1 shadow-sm">
              <img src={config.logoUrl} alt="Logo preview" className="max-w-full max-h-full object-contain" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[180px]">
                {config.logoName || 'Active Brand Logo'}
              </div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
                <Check className="w-3 h-3" />
                Error Correction set to 30% (Safe)
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onChange({ logoUrl: null, logoName: undefined })}
            className="p-2 text-rose-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors text-xs flex items-center gap-1 font-medium"
          >
            <Trash2 className="w-4 h-4" />
            <span>Remove</span>
          </button>
        </div>
      )}

      {/* Preset Brand Logos */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Popular Brand Logos & Icons
          </label>
          <span className="text-[11px] text-slate-400">1-Click Apply</span>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {BRAND_LOGOS.map((brand) => {
            const isSelected = config.logoUrl === brand.url;
            return (
              <button
                key={brand.name}
                type="button"
                onClick={() => {
                  onChange({
                    logoUrl: brand.url,
                    logoName: brand.name,
                    errorCorrection: 'H',
                  });
                }}
                className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                  isSelected
                    ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/40 shadow-sm ring-1 ring-brand-500'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/80'
                }`}
              >
                <div className="w-7 h-7 flex items-center justify-center">
                  <img src={brand.url} alt={brand.name} className="w-6 h-6 object-contain" />
                </div>
                <span className="text-[10px] font-medium text-slate-700 dark:text-slate-300 truncate w-full text-center">
                  {brand.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Logo Tuning Controls */}
      {config.logoUrl && (
        <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-4">
          <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-brand-500" />
            <span>Logo Dimensions & Margins</span>
          </div>

          {/* Logo Size Slider */}
          <div>
            <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
              <span>Logo Size</span>
              <span className="font-mono">{Math.round(config.logoSize * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.15"
              max="0.40"
              step="0.01"
              value={config.logoSize}
              onChange={(e) => onChange({ logoSize: parseFloat(e.target.value) })}
              className="w-full accent-brand-600 cursor-pointer"
            />
            {config.logoSize > 0.35 && (
              <p className="text-[11px] text-amber-600 dark:text-amber-400 mt-1 flex items-center gap-1">
                <ShieldAlert className="w-3 h-3" />
                Large logos require High Error Correction (30%) to guarantee scannability.
              </p>
            )}
          </div>

          {/* Logo Margin Slider */}
          <div>
            <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
              <span>Padding / Margin Around Logo</span>
              <span className="font-mono">{config.logoMargin}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="20"
              step="1"
              value={config.logoMargin}
              onChange={(e) => onChange({ logoMargin: parseInt(e.target.value) })}
              className="w-full accent-brand-600 cursor-pointer"
            />
          </div>

          {/* Hide Behind Logo */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
              Clear Background Dots Behind Logo
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.hideBehindLogo}
                onChange={(e) => onChange({ hideBehindLogo: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-slate-600 peer-checked:bg-brand-600"></div>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};
