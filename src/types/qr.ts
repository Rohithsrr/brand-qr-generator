export type ContentType =
  | 'url'
  | 'google-review'
  | 'wifi'
  | 'whatsapp'
  | 'instagram'
  | 'vcard'
  | 'text';

export type DotType = 'dots' | 'rounded' | 'classy' | 'classy-rounded' | 'square' | 'extra-rounded';
export type CornerSquareType = 'dot' | 'square' | 'extra-rounded';
export type CornerDotType = 'dot' | 'square';
export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export interface GradientConfig {
  type: 'linear' | 'radial';
  rotation: number;
  colorStops: { offset: number; color: string }[];
}

export interface QRConfig {
  data: string;
  contentType: ContentType;
  
  // Specific data helpers
  wifiConfig: {
    ssid: string;
    password: string;
    encryption: 'WPA' | 'WEP' | 'nopass';
    hidden: boolean;
  };
  whatsappConfig: {
    phone: string;
    message: string;
  };
  vcardConfig: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    company: string;
    title: string;
    url: string;
  };
  googleReviewConfig: {
    placeIdOrUrl: string;
  };
  instagramConfig: {
    username: string;
  };

  // Aesthetic styling
  dotsType: DotType;
  dotsColorType: 'single' | 'gradient';
  dotsColor: string;
  dotsGradient: GradientConfig;

  cornersSquareType: CornerSquareType;
  cornersSquareColor: string;
  cornersDotType: CornerDotType;
  cornersDotColor: string;

  bgColor: string;
  bgTransparent: boolean;

  // Logo & Branding
  logoUrl: string | null;
  logoName?: string;
  logoSize: number; // 0.15 - 0.40
  logoMargin: number; // 0 - 20
  hideBehindLogo: boolean;

  // Correction & Quality
  errorCorrection: ErrorCorrectionLevel;

  // Growth & Viral Attribution
  includeWatermark: boolean;
  watermarkText: string;
}

export interface PresetTheme {
  id: string;
  name: string;
  badge: string;
  description: string;
  contentType: ContentType;
  logoUrl: string;
  logoName: string;
  dotsType: DotType;
  dotsColorType: 'single' | 'gradient';
  dotsColor: string;
  dotsGradient: GradientConfig;
  cornersSquareType: CornerSquareType;
  cornersSquareColor: string;
  cornersDotType: CornerDotType;
  cornersDotColor: string;
  bgColor: string;
}

export interface SEOPageData {
  slug: string;
  title: string;
  metaDescription: string;
  targetKeyword: string;
  h1: string;
  heroSubtitle: string;
  badge: string;
  presetId: string;
  contentType: ContentType;
  initialValue: string;
  whyChoosePoints: { title: string; desc: string; icon: string }[];
  howToSteps: { step: number; title: string; desc: string }[];
  faqs: { question: string; answer: string }[];
}
