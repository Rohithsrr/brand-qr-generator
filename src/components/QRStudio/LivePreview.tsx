'use client';

import React, { useEffect, useRef, useState } from 'react';
import QRCodeStyling from 'qr-code-styling';
import {
  Download,
  Smartphone,
  Check,
  Copy,
  FileCode,
  Printer,
  Sparkles,
  Share2,
} from 'lucide-react';
import { QRConfig } from '@/types/qr';
import { createQRInstance, exportQRCodePNG } from '@/lib/qrEngine';
import { checkScannability } from '@/lib/contrastChecker';
import { shareQRImage } from '@/lib/shareHelpers';

interface LivePreviewProps {
  config: QRConfig;
  onOpenExportModal: (defaultFormat?: 'png' | 'svg' | 'pdf') => void;
  qrInstanceRef: React.MutableRefObject<QRCodeStyling | null>;
  onQuickShare?: () => void;
}

export const LivePreview: React.FC<LivePreviewProps> = ({
  config,
  onOpenExportModal,
  qrInstanceRef,
  onQuickShare,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showPhoneFrame, setShowPhoneFrame] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sharing, setSharing] = useState(false);

  // Diagnostic scannability
  const fg = config.dotsColorType === 'gradient' ? config.dotsGradient.colorStops[0]?.color || config.dotsColor : config.dotsColor;
  const bg = config.bgTransparent ? '#FFFFFF' : config.bgColor;
  const scannability = checkScannability(fg, bg);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous children
    containerRef.current.innerHTML = '';

    // Create fresh instance always fixed at 280px preview size
    const instance = createQRInstance(config, 280);
    qrInstanceRef.current = instance;
    instance.append(containerRef.current);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [
    config.data,
    config.dotsType,
    config.dotsColorType,
    config.dotsColor,
    config.dotsGradient,
    config.cornersSquareType,
    config.cornersSquareColor,
    config.cornersDotType,
    config.cornersDotColor,
    config.bgColor,
    config.bgTransparent,
    config.logoUrl,
    config.logoSize,
    config.logoMargin,
    config.hideBehindLogo,
    config.errorCorrection,
  ]);

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(config.data);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDirectShare = async () => {
    if (onQuickShare) {
      onQuickShare();
      return;
    }
    setSharing(true);
    try {
      const blob = await exportQRCodePNG(config, 1024, config.includeWatermark, config.watermarkText);
      await shareQRImage(
        blob,
        'brand-qr.png',
        'My Brand QR Code',
        `Check out my custom brand QR code for ${config.data}`
      );
    } catch (err) {
      console.error('Direct share failed:', err);
    } finally {
      setSharing(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Phone Preview / Minimal Frame Toggle */}
      <div className="w-full flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Live Vector Canvas</span>
        </div>
        <button
          type="button"
          onClick={() => setShowPhoneFrame(!showPhoneFrame)}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
            showPhoneFrame
              ? 'bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 border-brand-300'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>{showPhoneFrame ? 'Hide Phone Mock' : 'Phone Preview'}</span>
        </button>
      </div>

      {/* Main Preview Container */}
      <div
        className={`w-full flex flex-col items-center justify-center transition-all ${
          showPhoneFrame
            ? 'p-6 pb-8 rounded-[40px] bg-slate-900 border-4 border-slate-800 shadow-2xl relative max-w-sm'
            : 'p-6 rounded-3xl bg-slate-100/70 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 shadow-inner'
        }`}
      >
        {/* Phone Notch & Speaker (when phone mock is active) */}
        {showPhoneFrame && (
          <div className="w-28 h-4 bg-slate-800 rounded-full mb-4 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-slate-900 mr-2"></div>
            <div className="w-8 h-1 bg-slate-700 rounded-full"></div>
          </div>
        )}

        {/* QR Canvas Box (Locked to 280px max dimensions with strict overflow isolation) */}
        <div
          className="p-4 rounded-2xl transition-all shadow-md relative max-w-[312px] flex flex-col items-center"
          style={{
            backgroundColor: config.bgTransparent ? 'transparent' : config.bgColor,
            backgroundImage: config.bgTransparent
              ? 'radial-gradient(#cbd5e1 1px, transparent 1px)'
              : 'none',
            backgroundSize: config.bgTransparent ? '12px 12px' : 'auto',
          }}
        >
          <div
            ref={containerRef}
            className="w-[280px] h-[280px] max-w-[280px] max-h-[280px] flex items-center justify-center overflow-hidden [&_canvas]:max-w-full [&_canvas]:max-h-full [&_canvas]:w-auto [&_canvas]:h-auto [&_canvas]:object-contain"
          />

          {/* Non-intrusive watermark preview (if enabled) */}
          {config.includeWatermark && (
            <div className="w-full mt-3 text-center border-t border-slate-200/50 dark:border-slate-700/50 pt-2">
              <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 tracking-tight block truncate">
                {config.watermarkText}
              </span>
            </div>
          )}
        </div>

        {/* Target Data / Place ID pill */}
        <div className="mt-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300 max-w-[280px]">
          <span className="font-semibold text-brand-600 shrink-0 uppercase tracking-wider text-[10px]">
            {config.contentType}:
          </span>
          <span className="truncate font-mono">{config.data}</span>
          <button
            onClick={handleCopyLink}
            className="p-1 hover:text-brand-600 shrink-0 text-slate-400 transition-colors"
            title="Copy Target Link"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* Scannability Diagnostic Badge */}
      <div className="w-full mt-4 p-3 rounded-xl border flex items-start gap-2.5 text-xs transition-colors bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-800">
        <span
          className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider shrink-0 border ${scannability.color}`}
        >
          {scannability.score}
        </span>
        <div className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
          <div className="font-medium text-slate-800 dark:text-slate-200">
            Contrast Ratio: <span className="font-mono">{scannability.contrastRatio}:1</span>
          </div>
          {scannability.recommendation}
        </div>
      </div>

      {/* Primary Export Action Suite */}
      <div className="w-full mt-4 space-y-2">
        <button
          type="button"
          onClick={() => onOpenExportModal('png')}
          className="w-full py-3 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-md shadow-brand-600/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          <Download className="w-4 h-4" />
          <span>Download High-Res PNG (Free)</span>
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onOpenExportModal('svg')}
            className="py-2.5 px-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <FileCode className="w-3.5 h-3.5 text-brand-500" />
            <span>Vector SVG</span>
          </button>
          <button
            type="button"
            onClick={() => onOpenExportModal('pdf')}
            className="py-2.5 px-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-indigo-500" />
            <span>Print Standee (PDF)</span>
          </button>
        </div>

        {/* 1-Click Mobile Share to WhatsApp & Social */}
        <button
          type="button"
          disabled={sharing}
          onClick={handleDirectShare}
          className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-800 dark:hover:bg-slate-700 font-medium text-xs flex items-center justify-center gap-2 transition-colors active:scale-[0.98]"
        >
          <Share2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>{sharing ? 'Preparing Share...' : 'Share Directly to WhatsApp / Insta'}</span>
        </button>
      </div>
    </div>
  );
};
