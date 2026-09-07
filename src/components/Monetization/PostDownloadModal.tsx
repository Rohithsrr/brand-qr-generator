'use client';

import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  X,
  Share2,
  Twitter,
  Linkedin,
  MessageCircle,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  Instagram,
  Smartphone,
  Image as ImageIcon,
} from 'lucide-react';
import { getShareUrls, shareNative, copyToClipboard, shareQRImage } from '@/lib/shareHelpers';
import { AdSlot } from './AdSlot';

interface PostDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  downloadFormat: string;
  qrContent: string;
  qrBlob?: Blob;
}

export const PostDownloadModal: React.FC<PostDownloadModalProps> = ({
  isOpen,
  onClose,
  downloadFormat,
  qrContent,
  qrBlob,
}) => {
  const [copied, setCopied] = useState(false);
  const [copiedImage, setCopiedImage] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const shareUrls = getShareUrls(
    qrContent && qrContent.startsWith('http') ? qrContent : 'https://brandqr.io',
    `Check out my custom brand QR code for ${qrContent || 'my business'}! Created for 100% free with BrandQR:`
  );

  useEffect(() => {
    if (isOpen) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#ec4899'],
        });
      } catch (e) {
        // Graceful fallback
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCopyLink = async () => {
    const success = await copyToClipboard(qrContent || 'https://brandqr.io');
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
      showToast('Link copied to clipboard!');
    }
  };

  // Direct Mobile App Image Share (WhatsApp, Instagram, Telegram, AirDrop)
  const handleShareQRImage = async () => {
    if (!qrBlob) {
      // Fallback to native text share
      shareNative({
        title: 'My Custom Brand QR Code',
        text: `Scan my custom brand QR code: ${qrContent}`,
        url: 'https://brandqr.io',
      });
      return;
    }

    const result = await shareQRImage(
      qrBlob,
      'my-brand-qr.png',
      'My Custom Brand QR Code',
      `Check out my custom brand QR code: ${qrContent}`
    );

    if (result.method === 'clipboard' && result.success) {
      setCopiedImage(true);
      setTimeout(() => setCopiedImage(false), 3000);
      showToast('QR Image copied to clipboard! Ready to paste directly into Instagram or WhatsApp.');
    } else if (result.method === 'native' && result.success) {
      showToast('Shared successfully!');
    }
  };

  // Instagram Sharing Helper: Copies image to clipboard & offers deep link
  const handleInstagramShare = async () => {
    if (qrBlob) {
      const result = await shareQRImage(
        qrBlob,
        'instagram-brand-qr.png',
        'My Brand QR Code',
        `Check out my custom brand QR code: ${qrContent}`
      );
      if (result.method === 'clipboard' && result.success) {
        setCopiedImage(true);
        setTimeout(() => setCopiedImage(false), 3000);
        showToast('QR Image copied! Open Instagram to paste into Story or Direct Message.');
        return;
      }
    }
    // Fallback: Copy link and open Instagram
    await copyToClipboard(qrContent || 'https://brandqr.io');
    showToast('Link copied! Paste into your Instagram Bio or Story sticker.');
    window.open('https://instagram.com', '_blank');
  };

  // WhatsApp Sharing Helper
  const handleWhatsAppShare = async () => {
    // Try image share first on mobile
    if (qrBlob && typeof navigator !== 'undefined' && 'canShare' in navigator) {
      const result = await shareQRImage(
        qrBlob,
        'whatsapp-brand-qr.png',
        'My Brand QR Code',
        `Check out my custom brand QR code: ${qrContent}`
      );
      if (result.method === 'native' && result.success) return;
    }

    // Direct WhatsApp share URL fallback
    window.open(shareUrls.whatsapp, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-6 max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Header */}
        <div className="text-center pt-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-600 dark:text-emerald-400 mb-3 shadow-inner">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Your {downloadFormat.toUpperCase()} is Ready!
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
            High-resolution asset created in your browser with zero server compute. Free forever.
          </p>
        </div>

        {/* Toast Notification */}
        {toastMessage && (
          <div className="mt-3 p-2.5 rounded-xl bg-slate-900 text-white text-xs text-center font-medium shadow-lg animate-in fade-in slide-in-from-top-1">
            {toastMessage}
          </div>
        )}

        {/* Primary Mobile App Social Sharing Suite */}
        <div className="mt-5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200">
              <Smartphone className="w-4 h-4 text-brand-500" />
              <span>Share QR Code to Social Apps</span>
            </div>
            <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full font-medium">
              1-Click Share
            </span>
          </div>

          {/* Dedicated Big Mobile App Share Button */}
          <button
            type="button"
            onClick={handleShareQRImage}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white font-semibold text-xs shadow-md shadow-brand-500/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            <Share2 className="w-4 h-4" />
            <span>📱 Share QR Image Directly to Apps (WhatsApp, Insta, etc.)</span>
          </button>

          {/* Social App Grid */}
          <div className="grid grid-cols-4 gap-2 pt-1">
            {/* WhatsApp */}
            <button
              type="button"
              onClick={handleWhatsAppShare}
              className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-[#25D366] text-white hover:bg-[#1faa52] transition-transform active:scale-95 text-[11px] font-semibold gap-1 shadow-xs"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp</span>
            </button>

            {/* Instagram */}
            <button
              type="button"
              onClick={handleInstagramShare}
              className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-gradient-to-tr from-[#FD1D1D] to-[#833AB4] text-white hover:opacity-95 transition-transform active:scale-95 text-[11px] font-semibold gap-1 shadow-xs"
            >
              <Instagram className="w-4 h-4" />
              <span>Instagram</span>
            </button>

            {/* X / Twitter */}
            <a
              href={shareUrls.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-black text-white hover:bg-slate-800 transition-transform active:scale-95 text-[11px] font-semibold gap-1 shadow-xs"
            >
              <Twitter className="w-4 h-4 fill-white" />
              <span>X (Twitter)</span>
            </a>

            {/* LinkedIn */}
            <a
              href={shareUrls.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-[#0A66C2] text-white hover:bg-[#084e96] transition-transform active:scale-95 text-[11px] font-semibold gap-1 shadow-xs"
            >
              <Linkedin className="w-4 h-4 fill-white" />
              <span>LinkedIn</span>
            </a>
          </div>

          {/* Direct Copy URL / Referral */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="text"
              readOnly
              value={qrContent || 'https://brandqr.io'}
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-700 dark:text-slate-300 font-mono outline-none"
            />
            <button
              onClick={handleCopyLink}
              className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Link'}</span>
            </button>
          </div>
        </div>

        {/* Compliant Ad Container */}
        <div className="mt-4">
          <AdSlot
            slotId="4433221100"
            format="rectangle"
            minHeight={140}
            label="SPONSORED PROMOTION"
            className="my-1"
          />
        </div>

        {/* Modal Action Footer */}
        <div className="mt-5 flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={onClose}
            className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs transition-colors shadow-md text-center"
          >
            Create More Free QRs
          </button>
        </div>
      </div>
    </div>
  );
};
