'use client';

import React, { useRef, useState } from 'react';
import QRCodeStyling from 'qr-code-styling';
import {
  Sparkles,
  Link as LinkIcon,
  Image as ImageIcon,
  Palette,
  Sliders,
  CheckCircle,
} from 'lucide-react';
import { QRConfig, PresetTheme } from '@/types/qr';
import { PRESET_THEMES } from '@/data/presets';
import { ContentInputTab } from './ContentInputTab';
import { LogoUploadTab } from './LogoUploadTab';
import { StyleCustomizerTab } from './StyleCustomizerTab';
import { PresetsGallery } from './PresetsGallery';
import { LivePreview } from './LivePreview';
import { ExportModal } from './ExportModal';
import { PostDownloadModal } from '../Monetization/PostDownloadModal';
import { exportQRCodePNG } from '@/lib/qrEngine';

interface QRStudioProps {
  initialConfig?: Partial<QRConfig>;
  initialPresetId?: string;
}

export const QRStudio: React.FC<QRStudioProps> = ({
  initialConfig = {},
  initialPresetId,
}) => {
  const qrInstanceRef = useRef<QRCodeStyling | null>(null);

  // Default state initialized to Google Review or custom
  const [config, setConfig] = useState<QRConfig>({
    data: 'https://g.page/r/your-id/review',
    contentType: 'google-review',
    wifiConfig: {
      ssid: 'Guest_WiFi',
      password: '',
      encryption: 'WPA',
      hidden: false,
    },
    whatsappConfig: {
      phone: '',
      message: 'Hi! I saw your QR code and would like to learn more.',
    },
    vcardConfig: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      company: '',
      title: '',
      url: '',
    },
    googleReviewConfig: {
      placeIdOrUrl: 'https://g.page/r/your-id/review',
    },
    instagramConfig: {
      username: '',
    },
    dotsType: 'rounded',
    dotsColorType: 'single',
    dotsColor: '#EA4335',
    dotsGradient: {
      type: 'linear',
      rotation: 45,
      colorStops: [
        { offset: 0, color: '#EA4335' },
        { offset: 1, color: '#FBBC05' },
      ],
    },
    cornersSquareType: 'extra-rounded',
    cornersSquareColor: '#4285F4',
    cornersDotType: 'dot',
    cornersDotColor: '#34A853',
    bgColor: '#FFFFFF',
    bgTransparent: false,
    logoUrl: '/logos/google-star.svg',
    logoName: 'Google Star',
    logoSize: 0.28,
    logoMargin: 6,
    hideBehindLogo: true,
    errorCorrection: 'H',
    includeWatermark: true,
    watermarkText: '⚡ Generated with BrandQR.io — 100% Free Custom Brand QRs',
    ...initialConfig,
  });

  const [activeTab, setActiveTab] = useState<'content' | 'logo' | 'style'>('content');
  const [activePresetId, setActivePresetId] = useState<string | undefined>(
    initialPresetId || 'google-review'
  );

  // Modals state
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState<'png' | 'svg' | 'pdf'>('png');
  const [isPostDownloadModalOpen, setIsPostDownloadModalOpen] = useState(false);
  const [completedFormatName, setCompletedFormatName] = useState('PNG');
  const [currentQrBlob, setCurrentQrBlob] = useState<Blob | undefined>(undefined);

  const handleUpdateConfig = (updates: Partial<QRConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
    if (updates.dotsColor || updates.dotsType || updates.logoUrl) {
      // User customized away from preset
      setActivePresetId(undefined);
    }
  };

  const handleApplyPreset = (preset: PresetTheme) => {
    setActivePresetId(preset.id);
    handleUpdateConfig({
      dotsType: preset.dotsType,
      dotsColorType: preset.dotsColorType,
      dotsColor: preset.dotsColor,
      dotsGradient: preset.dotsGradient,
      cornersSquareType: preset.cornersSquareType,
      cornersSquareColor: preset.cornersSquareColor,
      cornersDotType: preset.cornersDotType,
      cornersDotColor: preset.cornersDotColor,
      bgColor: preset.bgColor,
      bgTransparent: false,
      logoUrl: preset.logoUrl || null,
      logoName: preset.logoName,
      errorCorrection: preset.logoUrl ? 'H' : 'M',
    });
  };

  const handleOpenExport = (defaultFormat: 'png' | 'svg' | 'pdf' = 'png') => {
    setExportFormat(defaultFormat);
    setIsExportModalOpen(true);
  };

  const handleExportSuccess = (formatName: string, blob?: Blob) => {
    setCompletedFormatName(formatName);
    setCurrentQrBlob(blob);
    setIsPostDownloadModalOpen(true);
  };

  const handleQuickShare = async () => {
    try {
      const blob = await exportQRCodePNG(config, 1024, config.includeWatermark, config.watermarkText);
      setCurrentQrBlob(blob);
      setCompletedFormatName('PNG Image');
      setIsPostDownloadModalOpen(true);
    } catch (err) {
      console.error('Quick share export failed:', err);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* 1-Click Brand Presets Gallery Carousel/Grid */}
      <div className="mb-8">
        <PresetsGallery onApplyPreset={handleApplyPreset} activePresetId={activePresetId} />
      </div>

      {/* Main Split-Screen Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left / Control Panel (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm p-6">
            {/* Tab Navigation Pill Header */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl mb-6">
              <button
                type="button"
                onClick={() => setActiveTab('content')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'content'
                    ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <LinkIcon className="w-4 h-4" />
                <span>1. Content & Link</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('logo')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'logo'
                    ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>2. Logo & Brand</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('style')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'style'
                    ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Palette className="w-4 h-4" />
                <span>3. Style & Color</span>
              </button>
            </div>

            {/* Active Tab View */}
            {activeTab === 'content' && (
              <ContentInputTab config={config} onChange={handleUpdateConfig} />
            )}
            {activeTab === 'logo' && (
              <LogoUploadTab config={config} onChange={handleUpdateConfig} />
            )}
            {activeTab === 'style' && (
              <StyleCustomizerTab config={config} onChange={handleUpdateConfig} />
            )}
          </div>
        </div>

        {/* Right / Live Preview Panel (5 cols) */}
        <div className="lg:col-span-5 sticky top-24">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm p-6">
            <LivePreview
              config={config}
              onOpenExportModal={handleOpenExport}
              qrInstanceRef={qrInstanceRef}
              onQuickShare={handleQuickShare}
            />
          </div>
        </div>
      </div>

      {/* Export Asset Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        config={config}
        qrInstanceRef={qrInstanceRef}
        onExportSuccess={handleExportSuccess}
        initialFormat={exportFormat}
      />

      {/* Post Download Viral Interstitial Modal */}
      <PostDownloadModal
        isOpen={isPostDownloadModalOpen}
        onClose={() => setIsPostDownloadModalOpen(false)}
        downloadFormat={completedFormatName}
        qrContent={config.data}
        qrBlob={currentQrBlob}
      />
    </div>
  );
};
