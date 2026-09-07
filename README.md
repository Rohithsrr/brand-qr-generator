# BrandQR Studio - Custom Brand Logo QR Code Generator

A production-ready, client-side web application for generating high-converting, aesthetic QR codes with embedded brand logos, gradient styling, and print-ready PDF standees.

Built with **Zero Ongoing Hosting Costs** in mind.

---

## Key Features

- **Real-Time Client-Side Rendering**: Powered by `qr-code-styling` in the browser canvas. Zero server CPU/GPU compute needed.
- **Brand Logo Overlays**: Drag-and-drop custom logo uploads + 12 built-in SVG brand logos (Google, WhatsApp, Instagram, Wi-Fi, YouTube, LinkedIn, X/Twitter, Spotify, Bitcoin, etc.).
- **Aesthetic Customizer**:
  - 6 dot styles (Rounded, Dots, Classy, Classy Round, Square, Extra Round).
  - Linear & Radial gradient colors with angle rotation.
  - Custom eye corner outer frames and inner dots.
  - Transparent or solid background with contrast scannability diagnostics.
- **Print & Export Suite**:
  - High-res PNG (1024px, 2048px, 4096px 4K).
  - Vector SVG (lossless scaling).
  - Printable PDF Display Templates (Table Tent folding card, Countertop framed sign, 3x3 sticker sheet).
- **Viral Growth Loops**:
  - Non-intrusive watermark attribution below exports.
  - 1-Click post-download social sharing engine (Twitter/X, LinkedIn, WhatsApp, Reddit).
- **Programmatic SEO (pSEO)**:
  - 10 pre-rendered static landing pages targeting high-volume commercial keywords with Schema.org JSON-LD structured data and pre-loaded presets.
- **Monetization (In-Page Programmatic Ads)**:
  - High-viewability responsive ad units (Header Leaderboard, Sticky Sidebar, Post-Download Interstitial Modal) with zero CLS layout protection.
- **Dynamic Shortlinks Edge Engine**:
  - Cloudflare Worker + KV setup for dynamic URL redirects and anonymous scan counters.

---

## Local Development & Testing

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev
# Open http://localhost:3000

# 3. Build static production export
npm run build
# The compiled static assets are generated in /out
```

---

## Zero-Cost Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for step-by-step instructions on deploying to Cloudflare Pages / Vercel with automated GitHub Actions and setting up free uptime monitoring.
