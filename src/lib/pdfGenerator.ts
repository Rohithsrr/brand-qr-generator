import { jsPDF } from 'jspdf';

export interface PDFExportOptions {
  title: string;
  subtitle: string;
  qrDataUrl: string;
  layout: 'standee' | 'counter' | 'stickers';
  includeWatermark: boolean;
  watermarkText?: string;
  accentColor?: string;
}

export async function generatePrintablePDF(options: PDFExportOptions): Promise<Blob> {
  const {
    title = 'SCAN ME',
    subtitle = 'Point your smartphone camera at the code below',
    qrDataUrl,
    layout = 'standee',
    includeWatermark = true,
    watermarkText = '⚡ Created for Free with BrandQR.io — High-Res Custom Brand QRs',
    accentColor = '#4F46E5',
  } = options;

  // Standard A4 portrait: 210 x 297 mm
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;

  if (layout === 'standee') {
    // Folding Table Tent layout (2 sides: front and back so it can be folded in half)
    const halfHeight = pageHeight / 2;

    // Fold line indicator
    doc.setDrawColor(200, 200, 200);
    doc.setLineDashPattern([3, 3], 0);
    doc.line(10, halfHeight, pageWidth - 10, halfHeight);

    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    doc.text('--- FOLD HERE FOR TABLE TENT ---', pageWidth / 2, halfHeight - 2, { align: 'center' });

    // Render Side 1 (Bottom Half)
    renderCardSide(doc, {
      startY: halfHeight + 10,
      width: pageWidth,
      height: halfHeight - 20,
      title,
      subtitle,
      qrDataUrl,
      qrSize: 75,
      includeWatermark,
      watermarkText,
      accentColor,
    });

    // Render Side 2 (Top Half - Inverted or upright)
    renderCardSide(doc, {
      startY: 15,
      width: pageWidth,
      height: halfHeight - 25,
      title,
      subtitle,
      qrDataUrl,
      qrSize: 75,
      includeWatermark,
      watermarkText,
      accentColor,
    });

  } else if (layout === 'counter') {
    // Single Elegant Countertop Sign (Framed full A4)
    // Outer decorative frame
    doc.setDrawColor(220, 226, 235);
    doc.setLineWidth(1.5);
    doc.roundedRect(15, 15, pageWidth - 30, pageHeight - 30, 8, 8);

    // Inner subtle card
    doc.setFillColor(250, 252, 255);
    doc.roundedRect(25, 25, pageWidth - 50, pageHeight - 50, 6, 6, 'F');

    // Accent header pill
    doc.setFillColor(79, 70, 229);
    doc.roundedRect((pageWidth - 70) / 2, 38, 70, 12, 6, 6, 'F');
    doc.setFontSize(11);
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.text('QUICK SCAN', pageWidth / 2, 45.5, { align: 'center' });

    // Main Title
    doc.setFontSize(26);
    doc.setTextColor(24, 24, 27);
    doc.setFont('helvetica', 'bold');
    doc.text(title, pageWidth / 2, 68, { align: 'center' });

    // Subtitle
    doc.setFontSize(13);
    doc.setTextColor(100, 116, 139);
    doc.setFont('helvetica', 'normal');
    const splitSub = doc.splitTextToSize(subtitle, 140);
    doc.text(splitSub, pageWidth / 2, 78, { align: 'center' });

    // Center QR Code Image
    const qrSize = 100;
    const qrX = (pageWidth - qrSize) / 2;
    const qrY = 95;

    // White QR container box with shadow border
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(qrX - 5, qrY - 5, qrSize + 10, qrSize + 10, 4, 4, 'FD');

    doc.addImage(qrDataUrl, 'PNG', qrX, qrY, qrSize, qrSize);

    // 3 Quick Scan Step Icons/Text
    const stepY = 215;
    doc.setFontSize(10);
    doc.setTextColor(71, 85, 105);
    doc.text('1. Open Camera', pageWidth / 2 - 45, stepY, { align: 'center' });
    doc.text('2. Aim at Code', pageWidth / 2, stepY, { align: 'center' });
    doc.text('3. Tap the Notification', pageWidth / 2 + 45, stepY, { align: 'center' });

    // Watermark / Viral Attribution
    if (includeWatermark) {
      doc.setFontSize(9);
      doc.setTextColor(148, 163, 184);
      doc.text(watermarkText, pageWidth / 2, 255, { align: 'center' });
    }

  } else if (layout === 'stickers') {
    // 3x3 Grid of 9 QR stickers
    const cols = 3;
    const rows = 3;
    const stickerWidth = 55;
    const stickerHeight = 75;
    const marginX = (pageWidth - cols * stickerWidth) / 4;
    const marginY = 20;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = marginX + c * (stickerWidth + marginX);
        const y = marginY + r * (stickerHeight + 12);

        // Dashed cutout border
        doc.setDrawColor(203, 213, 225);
        doc.setLineDashPattern([2, 2], 0);
        doc.roundedRect(x, y, stickerWidth, stickerHeight, 4, 4);

        // Header
        doc.setFontSize(9);
        doc.setTextColor(30, 41, 59);
        doc.setFont('helvetica', 'bold');
        doc.text(title.length > 20 ? title.substring(0, 20) + '...' : title, x + stickerWidth / 2, y + 8, { align: 'center' });

        // QR Code
        const sqSize = 42;
        doc.addImage(qrDataUrl, 'PNG', x + (stickerWidth - sqSize) / 2, y + 12, sqSize, sqSize);

        // Footer
        doc.setFontSize(7);
        doc.setTextColor(100, 116, 139);
        doc.setFont('helvetica', 'normal');
        doc.text('Scan with phone camera', x + stickerWidth / 2, y + 60, { align: 'center' });

        if (includeWatermark) {
          doc.setFontSize(5.5);
          doc.setTextColor(160, 174, 192);
          doc.text('BrandQR.io', x + stickerWidth / 2, y + 68, { align: 'center' });
        }
      }
    }
  }

  return doc.output('blob');
}

function renderCardSide(
  doc: jsPDF,
  opts: {
    startY: number;
    width: number;
    height: number;
    title: string;
    subtitle: string;
    qrDataUrl: string;
    qrSize: number;
    includeWatermark: boolean;
    watermarkText: string;
    accentColor: string;
  }
) {
  const { startY, width, height, title, subtitle, qrDataUrl, qrSize, includeWatermark, watermarkText } = opts;
  const centerX = width / 2;

  // Title
  doc.setFontSize(18);
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.text(title, centerX, startY + 10, { align: 'center' });

  // Subtitle
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'normal');
  const splitSub = doc.splitTextToSize(subtitle, 120);
  doc.text(splitSub, centerX, startY + 17, { align: 'center' });

  // QR Code
  const qrX = (width - qrSize) / 2;
  const qrY = startY + 23;

  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(qrX - 3, qrY - 3, qrSize + 6, qrSize + 6, 3, 3, 'FD');
  doc.addImage(qrDataUrl, 'PNG', qrX, qrY, qrSize, qrSize);

  // Bottom action hint
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  doc.text('Open Phone Camera to Scan', centerX, qrY + qrSize + 8, { align: 'center' });

  // Attribution
  if (includeWatermark) {
    doc.setFontSize(7.5);
    doc.setTextColor(156, 163, 175);
    doc.text(watermarkText, centerX, qrY + qrSize + 15, { align: 'center' });
  }
}
