export interface ScannabilityResult {
  contrastRatio: number;
  score: 'Excellent' | 'Good' | 'Fair' | 'Poor (Risk of Failure)';
  color: string;
  isSafe: boolean;
  recommendation: string;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  let cleaned = hex.replace(/^#/, '');
  if (cleaned.length === 3) {
    cleaned = cleaned.split('').map(c => c + c).join('');
  }
  if (cleaned.length !== 6) return null;
  const num = parseInt(cleaned, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(c => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

export function checkScannability(fgColor: string, bgColor: string): ScannabilityResult {
  const fg = hexToRgb(fgColor) || { r: 0, g: 0, b: 0 };
  const bg = hexToRgb(bgColor) || { r: 255, g: 255, b: 255 };

  const l1 = getLuminance(fg.r, fg.g, fg.b);
  const l2 = getLuminance(bg.r, bg.g, bg.b);

  const brighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  const ratio = (brighter + 0.05) / (darker + 0.05);

  const roundedRatio = Math.round(ratio * 10) / 10;

  if (ratio >= 7.0) {
    return {
      contrastRatio: roundedRatio,
      score: 'Excellent',
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
      isSafe: true,
      recommendation: 'Perfect contrast. Instant scan on all smartphone cameras in any lighting.',
    };
  } else if (ratio >= 4.5) {
    return {
      contrastRatio: roundedRatio,
      score: 'Good',
      color: 'text-sky-500 bg-sky-500/10 border-sky-500/20',
      isSafe: true,
      recommendation: 'Strong contrast. Will scan reliably on modern smartphones.',
    };
  } else if (ratio >= 3.0) {
    return {
      contrastRatio: roundedRatio,
      score: 'Fair',
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
      isSafe: true,
      recommendation: 'Borderline contrast. May be difficult to scan in dim lighting or at a distance.',
    };
  } else {
    return {
      contrastRatio: roundedRatio,
      score: 'Poor (Risk of Failure)',
      color: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
      isSafe: false,
      recommendation: 'Dangerous contrast! Increase darkness of dots or use a lighter background.',
    };
  }
}
