'use client';

import React from 'react';
import {
  Link as LinkIcon,
  Star,
  Wifi,
  MessageCircle,
  Instagram,
  UserCheck,
  FileText,
  HelpCircle,
} from 'lucide-react';
import { ContentType, QRConfig } from '@/types/qr';

interface ContentInputTabProps {
  config: QRConfig;
  onChange: (updates: Partial<QRConfig>) => void;
}

export const ContentInputTab: React.FC<ContentInputTabProps> = ({ config, onChange }) => {
  const contentTypes: { type: ContentType; label: string; icon: React.FC<{ className?: string }> }[] = [
    { type: 'url', label: 'Website URL', icon: LinkIcon },
    { type: 'google-review', label: 'Google Review', icon: Star },
    { type: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
    { type: 'wifi', label: 'Wi-Fi Network', icon: Wifi },
    { type: 'instagram', label: 'Instagram', icon: Instagram },
    { type: 'vcard', label: 'vCard Contact', icon: UserCheck },
    { type: 'text', label: 'Text / Crypto', icon: FileText },
  ];

  // Helper to re-compile encoded data string
  const updateContent = (type: ContentType, updates: Partial<QRConfig>) => {
    const nextConfig = { ...config, ...updates, contentType: type };
    let compiledData = nextConfig.data;

    if (type === 'url') {
      compiledData = nextConfig.data;
    } else if (type === 'google-review') {
      const input = nextConfig.googleReviewConfig.placeIdOrUrl.trim();
      if (input.startsWith('http://') || input.startsWith('https://')) {
        compiledData = input;
      } else if (input.length > 0) {
        compiledData = `https://search.google.com/local/writereview?placeid=${input}`;
      }
    } else if (type === 'whatsapp') {
      const cleanPhone = nextConfig.whatsappConfig.phone.replace(/[^0-9]/g, '');
      const msg = encodeURIComponent(nextConfig.whatsappConfig.message);
      compiledData = cleanPhone ? `https://wa.me/${cleanPhone}?text=${msg}` : '';
    } else if (type === 'wifi') {
      const { ssid, password, encryption, hidden } = nextConfig.wifiConfig;
      compiledData = `WIFI:S:${ssid};T:${encryption};P:${password};H:${hidden ? 'true' : 'false'};;`;
    } else if (type === 'instagram') {
      const user = nextConfig.instagramConfig.username.replace('@', '').trim();
      compiledData = user ? `https://instagram.com/${user}` : '';
    } else if (type === 'vcard') {
      const { firstName, lastName, phone, email, company, title, url } = nextConfig.vcardConfig;
      compiledData = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `N:${lastName};${firstName};;;`,
        `FN:${firstName} ${lastName}`.trim(),
        company ? `ORG:${company}` : '',
        title ? `TITLE:${title}` : '',
        phone ? `TEL:${phone}` : '',
        email ? `EMAIL:${email}` : '',
        url ? `URL:${url}` : '',
        'END:VCARD',
      ]
        .filter(Boolean)
        .join('\n');
    }

    onChange({
      ...updates,
      contentType: type,
      data: compiledData || 'https://brandqr.io',
    });
  };

  return (
    <div className="space-y-6">
      {/* Content Type Selector Pill Grid */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2.5">
          Select Content Type
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {contentTypes.map(({ type, label, icon: Icon }) => {
            const active = config.contentType === type;
            return (
              <button
                key={type}
                type="button"
                onClick={() => updateContent(type, {})}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium border transition-all ${
                  active
                    ? 'bg-brand-600 text-white border-brand-600 shadow-sm shadow-brand-500/20'
                    : 'bg-white dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-brand-400 dark:hover:border-brand-500 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                <span className="truncate">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Type Inputs */}
      <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-4">
        {/* URL Input */}
        {config.contentType === 'url' && (
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Destination URL
            </label>
            <div className="relative">
              <input
                type="url"
                value={config.data}
                onChange={(e) => {
                  let val = e.target.value;
                  onChange({ data: val });
                }}
                placeholder="https://yourwebsite.com/promotion"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
              />
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5" />
              Tip: Include https:// so modern camera apps open your page immediately.
            </p>
          </div>
        )}

        {/* Google Review Input */}
        {config.contentType === 'google-review' && (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Google Business Review Link or Place ID
              </label>
              <input
                type="text"
                value={config.googleReviewConfig.placeIdOrUrl}
                onChange={(e) => {
                  const placeIdOrUrl = e.target.value;
                  updateContent('google-review', {
                    googleReviewConfig: { placeIdOrUrl },
                  });
                }}
                placeholder="e.g. g.page/r/your-id/review or ChIJN1t_tDeuEmsRUsoyG83frY4"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 outline-none"
              />
            </div>
            <div className="text-[11px] text-slate-600 dark:text-slate-400 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 p-3 rounded-xl space-y-1">
              <span className="font-semibold text-amber-800 dark:text-amber-300">How to get your direct review link:</span>
              <p>1. Google your business name.</p>
              <p>2. In your Google Business Profile panel, click <strong>"Ask for reviews"</strong>.</p>
              <p>3. Copy the short link (starts with <code>g.page/r/</code>) and paste it here.</p>
            </div>
          </div>
        )}

        {/* WhatsApp Input */}
        {config.contentType === 'whatsapp' && (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Phone Number (with country code)
              </label>
              <input
                type="tel"
                value={config.whatsappConfig.phone}
                onChange={(e) => {
                  const phone = e.target.value;
                  updateContent('whatsapp', {
                    whatsappConfig: { ...config.whatsappConfig, phone },
                  });
                }}
                placeholder="e.g. +1 555 123 4567 or 447911123456"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Pre-Filled Greeting Message (Optional)
              </label>
              <textarea
                rows={2}
                value={config.whatsappConfig.message}
                onChange={(e) => {
                  const message = e.target.value;
                  updateContent('whatsapp', {
                    whatsappConfig: { ...config.whatsappConfig, message },
                  });
                }}
                placeholder="Hi! I saw your QR code and would like to learn more about..."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 outline-none resize-none"
              />
            </div>
          </div>
        )}

        {/* Wi-Fi Input */}
        {config.contentType === 'wifi' && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Network SSID Name
                </label>
                <input
                  type="text"
                  value={config.wifiConfig.ssid}
                  onChange={(e) => {
                    updateContent('wifi', {
                      wifiConfig: { ...config.wifiConfig, ssid: e.target.value },
                    });
                  }}
                  placeholder="Guest_WiFi"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Network Password
                </label>
                <input
                  type="text"
                  value={config.wifiConfig.password}
                  onChange={(e) => {
                    updateContent('wifi', {
                      wifiConfig: { ...config.wifiConfig, password: e.target.value },
                    });
                  }}
                  placeholder="SecretPassword123"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 outline-none font-mono"
                />
              </div>
            </div>
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <label className="text-xs font-medium text-slate-600 dark:text-slate-400">Security:</label>
                <select
                  value={config.wifiConfig.encryption}
                  onChange={(e) => {
                    updateContent('wifi', {
                      wifiConfig: {
                        ...config.wifiConfig,
                        encryption: e.target.value as 'WPA' | 'WEP' | 'nopass',
                      },
                    });
                  }}
                  className="text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1 text-slate-800 dark:text-slate-200 outline-none"
                >
                  <option value="WPA">WPA / WPA2 / WPA3 (Standard)</option>
                  <option value="WEP">WEP (Legacy)</option>
                  <option value="nopass">None (Open Network)</option>
                </select>
              </div>
              <label className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.wifiConfig.hidden}
                  onChange={(e) => {
                    updateContent('wifi', {
                      wifiConfig: { ...config.wifiConfig, hidden: e.target.checked },
                    });
                  }}
                  className="rounded text-brand-600 focus:ring-brand-500"
                />
                <span>Hidden Network</span>
              </label>
            </div>
          </div>
        )}

        {/* Instagram Input */}
        {config.contentType === 'instagram' && (
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Instagram Username
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-slate-400 text-sm font-semibold">@</span>
              <input
                type="text"
                value={config.instagramConfig.username}
                onChange={(e) => {
                  const username = e.target.value.replace('@', '');
                  updateContent('instagram', {
                    instagramConfig: { username },
                  });
                }}
                placeholder="yourhandle"
                className="w-full pl-8 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 outline-none"
              />
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">
              Generates deep link that opens directly inside the native Instagram mobile app.
            </p>
          </div>
        )}

        {/* vCard Input */}
        {config.contentType === 'vcard' && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  value={config.vcardConfig.firstName}
                  onChange={(e) => {
                    updateContent('vcard', {
                      vcardConfig: { ...config.vcardConfig, firstName: e.target.value },
                    });
                  }}
                  placeholder="Alex"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  value={config.vcardConfig.lastName}
                  onChange={(e) => {
                    updateContent('vcard', {
                      vcardConfig: { ...config.vcardConfig, lastName: e.target.value },
                    });
                  }}
                  placeholder="Morgan"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white outline-none"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={config.vcardConfig.phone}
                  onChange={(e) => {
                    updateContent('vcard', {
                      vcardConfig: { ...config.vcardConfig, phone: e.target.value },
                    });
                  }}
                  placeholder="+1 555 234 5678"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={config.vcardConfig.email}
                  onChange={(e) => {
                    updateContent('vcard', {
                      vcardConfig: { ...config.vcardConfig, email: e.target.value },
                    });
                  }}
                  placeholder="alex@example.com"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white outline-none"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Company / Organization
                </label>
                <input
                  type="text"
                  value={config.vcardConfig.company}
                  onChange={(e) => {
                    updateContent('vcard', {
                      vcardConfig: { ...config.vcardConfig, company: e.target.value },
                    });
                  }}
                  placeholder="Studio Corp"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Job Title
                </label>
                <input
                  type="text"
                  value={config.vcardConfig.title}
                  onChange={(e) => {
                    updateContent('vcard', {
                      vcardConfig: { ...config.vcardConfig, title: e.target.value },
                    });
                  }}
                  placeholder="Creative Director"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Text / Crypto Input */}
        {config.contentType === 'text' && (
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Plain Text, Note, or Crypto Address
            </label>
            <textarea
              rows={3}
              value={config.data}
              onChange={(e) => onChange({ data: e.target.value })}
              placeholder="Paste any plain text or Bitcoin/Ethereum address..."
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-mono focus:ring-2 focus:ring-brand-500 outline-none"
            />
          </div>
        )}
      </div>
    </div>
  );
};
