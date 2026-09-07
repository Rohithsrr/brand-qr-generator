'use client';

import QRCodeStyling, {
  DrawType,
  TypeNumber,
  Mode,
  ErrorCorrectionLevel,
  DotType,
  CornerSquareType,
  CornerDotType,
  Options,
} from 'qr-code-styling';
import { QRConfig } from '@/types/qr';

export function createQRInstance(config: QRConfig, size = 280): QRCodeStyling {
  const options: Options = {
    width: size,
    height: size,
    type: 'canvas' as DrawType,
    data: config.data || 'https://brandqr.io',
    margin: 10,
    qrOptions: {
      typeNumber: 0 as TypeNumber,
      mode: 'Byte' as Mode,
      errorCorrectionLevel: config.errorCorrection as ErrorCorrectionLevel,
    },
    imageOptions: {
      hideBackgroundDots: config.hideBehindLogo,
      imageSize: config.logoSize,
      margin: config.logoMargin,
      crossOrigin: 'anonymous',
    },
    dotsOptions: {
      type: config.dotsType as DotType,
      ...(config.dotsColorType === 'gradient'
        ? {
            gradient: {
              type: config.dotsGradient.type,
              rotation: (config.dotsGradient.rotation * Math.PI) / 180,
              colorStops: config.dotsGradient.colorStops,
            },
          }
        : {
            color: config.dotsColor,
          }),
    },
    cornersSquareOptions: {
      type: config.cornersSquareType as CornerSquareType,
      color: config.cornersSquareColor || config.dotsColor,
    },
    cornersDotOptions: {
      type: config.cornersDotType as CornerDotType,
      color: config.cornersDotColor || config.dotsColor,
    },
    backgroundOptions: {
      color: config.bgTransparent ? 'transparent' : config.bgColor,
    },
  };

  if (config.logoUrl && config.logoUrl.trim() !== '') {
    options.image = config.logoUrl;
  }

  return new QRCodeStyling(options);
}

/**
 * Exports a high-res PNG using an independent off-screen QRCodeStyling instance.
 * Completely isolates the export so the on-screen live preview canvas is NEVER resized or mutated.
 */
export async function exportQRCodePNG(
  config: QRConfig,
  resolution = 1024,
  includeWatermark = true,
  watermarkText = '⚡ Generated with BrandQR.io — 100% Free Custom Brand QRs'
): Promise<Blob> {
  // Create an independent off-screen instance at exact export resolution
  const exportInstance = createQRInstance(config, resolution);

  const rawBlob = await exportInstance.getRawData('png');
  if (!rawBlob) {
    throw new Error('Failed to render QR Code blob');
  }

  if (!includeWatermark) {
    return rawBlob as Blob;
  }

  // Draw watermark on extended canvas
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(rawBlob as Blob);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const paddingBottom = Math.round(resolution * 0.08); // 8% bottom bar for attribution
      const canvas = document.createElement('canvas');
      canvas.width = resolution;
      canvas.height = resolution + paddingBottom;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(rawBlob as Blob);
        return;
      }

      // Background fill
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw QR image
      ctx.drawImage(img, 0, 0, resolution, resolution);

      // Draw attribution banner
      ctx.fillStyle = '#64748B'; // slate-500
      ctx.font = `600 ${Math.round(resolution * 0.024)}px Inter, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(watermarkText, resolution / 2, resolution + paddingBottom / 2);

      canvas.toBlob((watermarkedBlob) => {
        if (watermarkedBlob) {
          resolve(watermarkedBlob);
        } else {
          resolve(rawBlob as Blob);
        }
      }, 'image/png');
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image for watermark'));
    };
    img.src = url;
  });
}

/**
 * Exports a vector SVG using an independent off-screen QRCodeStyling instance.
 */
export async function exportQRCodeSVG(config: QRConfig, resolution = 1024): Promise<Blob> {
  const exportInstance = createQRInstance(config, resolution);
  const svgBlob = await exportInstance.getRawData('svg');
  if (!svgBlob) {
    throw new Error('Failed to render SVG blob');
  }
  return svgBlob as Blob;
}

/**
 * Returns a data URL for the PDF generator using an independent off-screen instance.
 */
export async function getQRDataUrl(config: QRConfig, size = 600): Promise<string> {
  const exportInstance = createQRInstance(config, size);
  const blob = await exportInstance.getRawData('png');
  if (!blob) throw new Error('Failed to get QR blob');

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob as Blob);
  });
}
