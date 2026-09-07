export interface ShareOptions {
  title?: string;
  text?: string;
  url?: string;
}

const DEFAULT_SHARE_TEXT = 'I just created a custom branded QR code with my logo for 100% free! Zero subscriptions, zero expiration. Try it out:';
const DEFAULT_URL = 'https://brandqr.io';

export function getShareUrls(customUrl = DEFAULT_URL, customText = DEFAULT_SHARE_TEXT) {
  const encodedUrl = encodeURIComponent(customUrl);
  const encodedText = encodeURIComponent(customText);

  return {
    twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}&hashtags=Branding,QRCode,Design,Productivity`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    reddit: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedText}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
  };
}

/**
 * Shares the actual QR code image file to WhatsApp, Instagram, Telegram, etc. via Web Share API Level 2 (Mobile).
 * On desktop or unsupported browsers, falls back to copying the image to the clipboard.
 */
export async function shareQRImage(
  blob: Blob,
  filename = 'brand-qr-code.png',
  title = 'My Custom Brand QR Code',
  text = 'Check out my custom brand QR code created with BrandQR.io!'
): Promise<{ success: boolean; method: 'native' | 'clipboard' | 'unsupported'; error?: string }> {
  const file = new File([blob], filename, { type: 'image/png' });

  // 1. Mobile Web Share API Level 2: Shares directly into WhatsApp, Instagram Stories/Direct, Messages, etc.
  if (typeof navigator !== 'undefined' && 'canShare' in navigator && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({
        files: [file],
        title,
        text,
      });
      return { success: true, method: 'native' };
    } catch (err: any) {
      if (err.name === 'AbortError') {
        return { success: false, method: 'native' };
      }
      console.warn('Native share failed, attempting fallback:', err);
    }
  }

  // 2. Desktop Fallback: Copy image to system clipboard so user can paste into WhatsApp Web, Instagram, Slack, etc.
  if (typeof navigator !== 'undefined' && navigator.clipboard && typeof ClipboardItem !== 'undefined') {
    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          'image/png': blob,
        }),
      ]);
      return { success: true, method: 'clipboard' };
    } catch (err) {
      console.warn('Clipboard write image failed:', err);
    }
  }

  return { success: false, method: 'unsupported' };
}

export async function shareNative(options: ShareOptions): Promise<boolean> {
  if (typeof window !== 'undefined' && 'share' in navigator) {
    try {
      await navigator.share({
        title: options.title || 'BrandQR Studio - Free Custom Logo QR Code Generator',
        text: options.text || DEFAULT_SHARE_TEXT,
        url: options.url || window.location.href,
      });
      return true;
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        console.error('Error sharing:', err);
      }
      return false;
    }
  }
  return false;
}

export function copyToClipboard(text: string): Promise<boolean> {
  if (typeof window === 'undefined') return Promise.resolve(false);
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text).then(() => true).catch(() => false);
  }
  // Fallback
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
    document.body.removeChild(textarea);
    return Promise.resolve(true);
  } catch {
    document.body.removeChild(textarea);
    return Promise.resolve(false);
  }
}
