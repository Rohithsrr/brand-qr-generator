# Zero-Cost Production Deployment & Dynamic Monitoring Guide

This guide details how to deploy the **Custom Brand Logo QR Code Generator** to Cloudflare Pages or Vercel with **\$0.00 ongoing hosting costs**, set up automated health checks, and activate programmatic monetization.

---

## Architecture Summary (Zero Ongoing Cost Stack)

| Component | Platform / Service | Free Tier Allowance | Ongoing Cost |
| :--- | :--- | :--- | :--- |
| **Frontend CDN** | Cloudflare Pages / Vercel | Unlimited bandwidth, global edge CDN | **\$0.00 / mo** |
| **Canvas Rendering** | Browser-side (`qr-code-styling`) | 100% Client compute | **\$0.00 / mo** |
| **Dynamic Links** | Cloudflare Workers + KV | 100,000 requests / day | **\$0.00 / mo** |
| **Uptime Monitoring** | Cron-job.org / Cloudflare Health | Unlimited 5-min pings | **\$0.00 / mo** |
| **SSL & Security** | Cloudflare Universal SSL | Automatic HTTPS & DDoS Shield | **\$0.00 / mo** |

---

## Option A: 1-Click Deploy to Cloudflare Pages (Recommended)

1. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "feat: custom brand logo qr generator"
   git remote add origin https://github.com/YOUR_USERNAME/brand-qr-generator.git
   git push -u origin main
   ```

2. **Connect to Cloudflare Pages**:
   - Log into [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**
   - Select your repository `brand-qr-generator`
   - Build Settings:
     - **Framework Preset**: Next.js (Static HTML Export)
     - **Build command**: `npm run build`
     - **Build output directory**: `out`
   - Environment Variables (Optional):
     - `NEXT_PUBLIC_ADSENSE_CLIENT_ID`: `ca-pub-XXXXXXXXXXXXXXXX`
     - `NEXT_PUBLIC_ANALYTICS_DOMAIN`: `yourdomain.com`
   - Click **Save and Deploy**.

---

## Option B: Deploy via Vercel CLI (Alternative Free Tier)

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```
2. Deploy directly from terminal:
   ```bash
   vercel --prod
   ```

---

## Deploying Cloudflare Worker for Dynamic QR Shortlinks

To enable dynamic redirect links (`/r/:slug`) with scan analytics:

1. In `worker/` directory:
   ```bash
   cd worker
   npx wrangler login
   npx wrangler kv:namespace create REDIRECTS
   npx wrangler kv:namespace create ANALYTICS
   ```
2. Paste the generated KV namespace IDs into `worker/wrangler.toml`.
3. Deploy the worker to edge:
   ```bash
   npx wrangler deploy
   ```
4. Test the health endpoint:
   ```bash
   curl https://brandqr-redirect-worker.YOUR_SUBDOMAIN.workers.dev/health
   ```

---

## Automated Dynamic Uptime Monitoring Setup (100% Free)

To ensure high availability and monitor traffic spikes without paid services:

### 1. Using Cron-job.org (Free forever, 1-minute intervals):
1. Sign up for a free account at [cron-job.org](https://cron-job.org).
2. Click **Create Cronjob**:
   - **Title**: `BrandQR Site Uptime Monitor`
   - **URL**: `https://yourdomain.com/` (or worker `/health` endpoint)
   - **Execution Schedule**: Every 5 minutes (`*/5 * * * *`)
   - **Failure Notifications**: Enable email alert on 2 consecutive HTTP failures.
3. Save the job.

### 2. Using UptimeRobot (Free 50 monitors):
- Create an HTTP(s) monitor pointing to `https://yourdomain.com`.
- Monitoring interval: 5 minutes.
- Receive instant alerts via Email, Slack, or SMS if edge routing goes down.

---

## Activating Programmatic Ads (Google AdSense)

1. Register your site on [Google AdSense](https://www.google.com/adsense/).
2. Submit your custom domain for approval.
3. Once approved, retrieve your Publisher Client ID (starts with `ca-pub-`).
4. Set the environment variable in your production build:
   ```env
   NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
   ```
5. Re-run `npm run build`. The ad container placeholders will immediately switch to live responsive ad units with zero CLS layout shifts!
