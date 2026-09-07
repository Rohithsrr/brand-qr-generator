/**
 * Cloudflare Worker for Dynamic QR Redirection & Anonymous Analytics
 * Free Tier: 100,000 requests/day, $0.00 ongoing cost
 */

export interface Env {
  // Cloudflare KV Namespace binding
  REDIRECTS?: any;
  ANALYTICS?: any;
}

export default {
  async fetch(request: Request, env: Env, ctx: any): Promise<Response> {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // CORS Headers for client-side API calls
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // 1. Health-check endpoint for free uptime monitors (Cron-job.org / UptimeRobot / Cloudflare)
    if (pathname === '/health' || pathname === '/ping') {
      return new Response(
        JSON.stringify({
          status: 'healthy',
          service: 'BrandQR Dynamic Link Edge Engine',
          uptime: '100%',
          timestamp: new Date().toISOString(),
          region: (request as any).cf?.colo || 'EDGE',
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            ...corsHeaders,
          },
        }
      );
    }

    // 2. Dynamic QR Link Redirection: /r/:slug
    if (pathname.startsWith('/r/')) {
      const slug = pathname.replace('/r/', '').trim();
      if (!slug) {
        return Response.redirect('https://brandqr.io', 302);
      }

      let destinationUrl: string | null = null;

      // Lookup in KV if bound
      if (env.REDIRECTS) {
        destinationUrl = await env.REDIRECTS.get(slug);
      } else {
        // Fallback demo redirect if running locally without KV
        if (slug === 'demo') {
          destinationUrl = 'https://brandqr.io';
        }
      }

      if (destinationUrl) {
        // Asynchronous scan metric logging without slowing down redirect (zero latency overhead)
        ctx.waitUntil(
          (async () => {
            try {
              if (env.ANALYTICS) {
                const today = new Date().toISOString().split('T')[0];
                const key = `scans:${slug}:${today}`;
                const current = parseInt((await env.ANALYTICS.get(key)) || '0', 10);
                await env.ANALYTICS.put(key, (current + 1).toString());
              }
            } catch (err) {
              console.error('Failed to log scan metric:', err);
            }
          })()
        );

        // Immediate HTTP 302 Found redirect
        return Response.redirect(destinationUrl, 302);
      }

      // If slug not found, route safely to main site
      return Response.redirect('https://brandqr.io/?notfound=' + encodeURIComponent(slug), 302);
    }

    // 3. API: Create Dynamic Short Link
    if (pathname === '/api/create-link' && request.method === 'POST') {
      try {
        const body = (await request.json()) as { url: string; customSlug?: string };
        if (!body.url) {
          return new Response(JSON.stringify({ error: 'Missing target URL' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          });
        }

        const slug =
          body.customSlug && body.customSlug.trim().length > 0
            ? body.customSlug.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '')
            : Math.random().toString(36).substring(2, 8);

        if (env.REDIRECTS) {
          await env.REDIRECTS.put(slug, body.url);
        }

        return new Response(
          JSON.stringify({
            success: true,
            slug,
            shortUrl: `https://${url.hostname}/r/${slug}`,
            destination: body.url,
          }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          }
        );
      } catch (err) {
        return new Response(JSON.stringify({ error: 'Invalid payload' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }
    }

    // Default route
    return new Response(
      JSON.stringify({
        message: 'BrandQR Dynamic Link Edge Service is active.',
        docs: 'Visit https://brandqr.io for custom QR generation.',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  },
};
