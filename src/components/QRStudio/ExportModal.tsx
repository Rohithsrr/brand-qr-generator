'use client';

import React, { useState } from 'react';
import QRCodeStyling from 'qr-code-styling';
import {
  X,
  Download,
  FileImage,
  FileCode,
  Printer,
  Sparkles,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { QRConfig } from '@/types/qr';
import { exportQRCodePNG, exportQRCodeSVG, getQRDataUrl } from '@/lib/qrEngine';
import { generatePrintablePDF } from '@/lib/pdfGenerator';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: QRConfig;
  qrInstanceRef: React.MutableRefObject<QRCodeStyling | null>;
  onExportSuccess: (format: string, generatedBlob?: Blob) => void;
  initialFormat?: 'png' | 'svg' | 'pdf';
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  config,
  qrInstanceRef,
  onExportSuccess,
  initialFormat = 'png',
}) => {
  const [activeTab, setActiveTab] = useState<'png' | 'svg' | 'pdf'>(initialFormat);
  const [pngResolution, setPngResolution] = useState<number>(2048);
  const [isExporting, setIsExporting] = useState(false);

  // PDF options
  const [pdfLayout, setPdfLayout] = useState<'standee' | 'counter' | 'stickers'>('standee');
  const [pdfTitle, setPdfTitle] = useState(
    config.contentType === 'google-review'
      ? 'REVIEW US ON GOOGLE'
      : config.contentType === 'wifi'
      ? 'FREE GUEST WI-FI'
      : 'SCAN ME'
  );
  const [pdfSubtitle, setPdfSubtitle] = useState(
    'Point your smartphone camera to connect instantly'
  );
  const [includeWatermark, setIncludeWatermark] = useState(config.includeWatermark);

  if (!isOpen) return null;

  const triggerDownload = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadPNG = async () => {
    setIsExporting(true);
    try {
      const blob = await exportQRCodePNG(
        config,
        pngResolution,
        includeWatermark,
        config.watermarkText
      );
      triggerDownload(blob, `brand-qr-${pngResolution}px.png`);
      onClose();
      onExportSuccess('PNG Image', blob);
    } catch (err) {
      console.error('PNG export failed:', err);
      alert('Failed to export PNG. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadSVG = async () => {
    setIsExporting(true);
    try {
      const blob = await exportQRCodeSVG(config, 1024);
      triggerDownload(blob, 'brand-qr-vector.svg');
      onClose();
      // Generate a quick PNG blob for social sharing fallback
      const pngBlob = await exportQRCodePNG(config, 1024, includeWatermark, config.watermarkText).catch(() => undefined);
      onExportSuccess('Vector SVG', pngBlob);
    } catch (err) {
      console.error('SVG export failed:', err);
      alert('Failed to export SVG. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadPDF = async () => {
    setIsExporting(true);
    try {
      const qrDataUrl = await getQRDataUrl(config, 800);
      const pdfBlob = await generatePrintablePDF({
        title: pdfTitle,
        subtitle: pdfSubtitle,
        qrDataUrl,
        layout: pdfLayout,
        includeWatermark,
        watermarkText: config.watermarkText,
      });
      triggerDownload(pdfBlob, `brand-qr-${pdfLayout}-sheet.pdf`);
      onClose();
      // Generate a PNG blob for social sharing fallback
      const pngBlob = await exportQRCodePNG(config, 1024, includeWatermark, config.watermarkText).catch(() => undefined);
      onExportSuccess('Printable PDF', pngBlob);
    } catch (err) {
      console.error('PDF export failed:', err);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-6 max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Download className="w-5 h-5 text-brand-600" />
            <span>Export Production Assets</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Select your desired format and print specifications.
          </p>
        </div>

        {/* Format Selector Tabs */}
        <div className="grid grid-cols-3 gap-2 mt-5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveTab('png')}
            className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'png'
                ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <FileImage className="w-4 h-4" />
            <span>PNG Raster</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('svg')}
            className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'svg'
                ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>Vector SVG</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('pdf')}
            className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'pdf'
                ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Printer className="w-4 h-4" />
            <span>PDF Print Sheet</span>
          </button>
        </div>

        {/* Tab 1: PNG Options */}
        {activeTab === 'png' && (
          <div className="mt-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Select Resolution
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { res: 1024, label: '1024 x 1024', desc: 'Web & Digital' },
                  { res: 2048, label: '2048 x 2048', desc: 'HD Print (300 DPI)' },
                  { res: 4096, label: '4096 x 4096', desc: 'Ultra 4K Signage' },
                ].map(({ res, label, desc }) => (
                  <button
                    key={res}
                    type="button"
                    onClick={() => setPngResolution(res)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      pngResolution === res
                        ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 ring-1 ring-brand-500'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="text-xs font-bold font-mono">{label}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Attribution Watermark Toggle */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  Include Viral Attribution Credit
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  Adds subtle "Generated with BrandQR.io" watermark below image.
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeWatermark}
                  onChange={(e) => setIncludeWatermark(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-600"></div>
              </label>
            </div>

            <button
              type="button"
              disabled={isExporting}
              onClick={handleDownloadPNG}
              className="w-full py-3 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-md shadow-brand-600/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{isExporting ? 'Generating PNG...' : `Download ${pngResolution}px PNG`}</span>
            </button>
          </div>
        )}

        {/* Tab 2: SVG Options */}
        {activeTab === 'svg' && (
          <div className="mt-5 space-y-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-brand-500" />
                <span>Lossless Vector Graphic</span>
              </div>
              <p>
                SVG files retain infinite resolution and can be scaled from a business card to a billboard with zero pixelation.
              </p>
              <p>Ideal for Adobe Illustrator, Figma, CorelDraw, laser cutting, and commercial offset print shops.</p>
            </div>

            <button
              type="button"
              disabled={isExporting}
              onClick={handleDownloadSVG}
              className="w-full py-3 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-md shadow-brand-600/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{isExporting ? 'Generating SVG...' : 'Download Vector SVG'}</span>
            </button>
          </div>
        )}

        {/* Tab 3: PDF Print Sheet Options */}
        {activeTab === 'pdf' && (
          <div className="mt-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Select Display Template
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'standee', label: 'Table Tent', desc: 'Folding A4 card' },
                  { id: 'counter', label: 'Countertop Sign', desc: 'Framed full sign' },
                  { id: 'stickers', label: 'Sticker Grid', desc: '3x3 (9 Stickers)' },
                ].map(({ id, label, desc }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setPdfLayout(id as any)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      pdfLayout === id
                        ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 ring-1 ring-brand-500'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="text-xs font-bold">{label}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Card Headline Title
                </label>
                <input
                  type="text"
                  value={pdfTitle}
                  onChange={(e) => setPdfTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Instructions Subtitle
                </label>
                <input
                  type="text"
                  value={pdfSubtitle}
                  onChange={(e) => setPdfSubtitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs outline-none"
                />
              </div>
            </div>

            {/* Watermark toggle */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  Include Attribution Credit
                </div>
                <div className="text-[10px] text-slate-500">
                  Non-intrusive footer credit on printable sheet.
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeWatermark}
                  onChange={(e) => setIncludeWatermark(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-600"></div>
              </label>
            </div>

            <button
              type="button"
              disabled={isExporting}
              onClick={handleDownloadPDF}
              className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md shadow-indigo-600/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              <Printer className="w-4 h-4" />
              <span>{isExporting ? 'Generating PDF...' : 'Download Printable PDF'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
