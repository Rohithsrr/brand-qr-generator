import { SEOPageData } from '@/types/qr';

export const SEO_PAGES: Record<string, SEOPageData> = {
  'google-review-qr-generator': {
    slug: 'google-review-qr-generator',
    title: 'Free Google Review QR Code Generator with Logo - Boost 5-Star Reviews',
    metaDescription: 'Create custom Google Review QR codes with your business logo for free. Print on table tents, receipts, and counter standees to collect 10x more 5-star customer reviews.',
    targetKeyword: 'google review qr code generator with logo',
    h1: 'Free Google Review QR Code Generator with Logo',
    heroSubtitle: 'Turn in-person customers into glowing 5-star Google reviews. Generate a branded QR code linked directly to your Google Business review box in seconds.',
    badge: '10x Your Local Google Ranking',
    presetId: 'google-review',
    contentType: 'google-review',
    initialValue: 'https://g.page/r/your-place-id/review',
    whyChoosePoints: [
      {
        title: 'Direct Link to 5-Star Form',
        desc: 'Bypasses search results and opens the rating popup directly on mobile phones.',
        icon: 'Star',
      },
      {
        title: 'Official Google Badge',
        desc: 'Embed high-res Google G logo or 5-Star badge to build instant trust with customers.',
        icon: 'ShieldCheck',
      },
      {
        title: 'Printable Standee Sheets',
        desc: 'Download 300 DPI PDF table tent templates ready to place on cashier desks and dining tables.',
        icon: 'Printer',
      },
    ],
    howToSteps: [
      {
        step: 1,
        title: 'Enter Your Google Review Link or Place ID',
        desc: 'Grab your short review link from your Google Business Profile (e.g. g.page/r/...).',
      },
      {
        step: 2,
        title: 'Customize with Google Stars or Your Logo',
        desc: 'Choose vibrant Google colors or upload your own cafe or salon logo to reinforce your brand.',
      },
      {
        step: 3,
        title: 'Export in High-Res & Display Everywhere',
        desc: 'Download SVG, PNG, or instant printable PDF standees to place on checkout counters and bills.',
      },
    ],
    faqs: [
      {
        question: 'How do I find my Google Review short link?',
        answer: 'Search for your business on Google, click "Ask for reviews" in your Google Business Profile dashboard, and copy the short link that starts with g.page/r/ or search.google.com.',
      },
      {
        question: 'Does this Google Review QR code ever expire?',
        answer: 'No! Our QR codes encode your direct Google review link permanently. As long as your Google Business listing exists, the QR will work forever with zero recurring fees.',
      },
      {
        question: 'Can I print this QR code on restaurant table tents?',
        answer: 'Yes! Use our built-in PDF Table Tent export tool to get a print-ready folding tent card formatted for standard US Letter or A4 paper.',
      },
    ],
  },

  'whatsapp-qr-code-generator-with-logo': {
    slug: 'whatsapp-qr-code-generator-with-logo',
    title: 'WhatsApp QR Code Generator with Logo - Free 1-Click Chat Link',
    metaDescription: 'Generate customized WhatsApp QR codes with the official WhatsApp logo and pre-filled greeting messages. No phone number saving needed for customers.',
    targetKeyword: 'whatsapp qr code generator with logo',
    h1: 'WhatsApp QR Code Generator with Logo',
    heroSubtitle: 'Connect leads straight to WhatsApp chat with zero friction. Include pre-filled inquiry messages and your company brand logo.',
    badge: 'Zero Friction Customer Support',
    presetId: 'whatsapp-chat',
    contentType: 'whatsapp',
    initialValue: 'https://wa.me/15551234567?text=Hi!%20I%20have%20an%20inquiry',
    whyChoosePoints: [
      {
        title: '1-Tap Chat Without Saving Number',
        desc: 'Customers do not have to manually save your digits to contacts; chat opens instantly.',
        icon: 'MessageCircle',
      },
      {
        title: 'Pre-filled Welcome Message',
        desc: 'Set pre-formatted text like "Hi, I would like to book an appointment" for higher conversion.',
        icon: 'Send',
      },
      {
        title: 'Branded WhatsApp Emerald Aesthetic',
        desc: 'Pre-styled with official WhatsApp green and crisp centered emblem for immediate recognition.',
        icon: 'Sparkles',
      },
    ],
    howToSteps: [
      {
        step: 1,
        title: 'Enter Country Code and Phone Number',
        desc: 'Type your WhatsApp Business or personal mobile number with full international dialing code.',
      },
      {
        step: 2,
        title: 'Add an Optional Pre-Filled Message',
        desc: 'Type the standard prompt you want your customers to send when the chat window launches.',
      },
      {
        step: 3,
        title: 'Download and Place on Flyers & Web Banners',
        desc: 'Export high-definition PNG/SVG to print on vehicle decals, business cards, or product labels.',
      },
    ],
    faqs: [
      {
        question: 'Does the customer need to save my number first?',
        answer: 'No. Scanning the WhatsApp QR code automatically launches WhatsApp and opens a direct chat thread without saving the contact first.',
      },
      {
        question: 'Can I use this for WhatsApp Business API?',
        answer: 'Yes! It works identically with standard WhatsApp, WhatsApp Business app, and enterprise WhatsApp Business Cloud API numbers.',
      },
      {
        question: 'Is it completely free?',
        answer: 'Yes, 100% free with unlimited scans and zero subscription requirements.',
      },
    ],
  },

  'restaurant-menu-qr-maker': {
    slug: 'restaurant-menu-qr-maker',
    title: 'Restaurant Menu QR Code Maker - Free Printable Table Standees',
    metaDescription: 'Generate beautiful contactless restaurant menu QR codes with your restaurant logo. Download printable PDF table tents and counter standees for free.',
    targetKeyword: 'restaurant menu qr code maker printable',
    h1: 'Contactless Restaurant Menu QR Code Maker',
    heroSubtitle: 'Eliminate dirty paper menus and costly reprints. Create contactless digital menu QR codes with your restaurant emblem and download ready-to-print table cards.',
    badge: 'Hospitality & Dining Favorite',
    presetId: 'restaurant-menu',
    contentType: 'url',
    initialValue: 'https://yourrestaurant.com/menu',
    whyChoosePoints: [
      {
        title: 'Instant Menu Updates',
        desc: 'Link to your PDF menu, website, or Instagram story menu without reprinting QR cards.',
        icon: 'Utensils',
      },
      {
        title: 'Sanitary & Cost-Effective',
        desc: 'Diners scan with their own smartphone camera—no apps or physical menus required.',
        icon: 'Shield',
      },
      {
        title: 'Printable Table Tent PDF',
        desc: 'Generates folding table tents and bar stickers formatted with "Scan for Menu" callouts.',
        icon: 'Printer',
      },
    ],
    howToSteps: [
      {
        step: 1,
        title: 'Paste Your Digital Menu URL',
        desc: 'Enter the link to your online PDF menu, Square/Toast ordering page, or website.',
      },
      {
        step: 2,
        title: 'Upload Your Restaurant Logo',
        desc: 'Drop your restaurant emblem into the center and match the colors to your dining room ambiance.',
      },
      {
        step: 3,
        title: 'Print Table Tents in PDF',
        desc: 'Export our PDF sheet and fold it directly onto dining tables, bar tops, and takeout bags.',
      },
    ],
    faqs: [
      {
        question: 'What happens if my restaurant menu changes?',
        answer: 'If you host your PDF menu on Google Drive, Dropbox, or your website, simply update the file at that same URL. The QR code on your tables will automatically display the new menu.',
      },
      {
        question: 'Can guests scan without downloading an app?',
        answer: 'Yes, modern iOS and Android cameras read QR codes natively in under 0.5 seconds.',
      },
    ],
  },

  'wifi-qr-code-generator-free': {
    slug: 'wifi-qr-code-generator-free',
    title: 'Free Wi-Fi QR Code Generator - Scan to Connect Instantly',
    metaDescription: 'Create Wi-Fi QR codes with SSID, password, and security type. Guests scan to connect automatically without typing complex passwords.',
    targetKeyword: 'free wifi qr code generator with password',
    h1: 'Free Wi-Fi QR Code Generator (Instant Connect)',
    heroSubtitle: 'Stop writing your Wi-Fi password on chalkboards. Create an automatic Wi-Fi QR code that connects guests to your network with one tap.',
    badge: 'No Password Typing Needed',
    presetId: 'wifi-connect',
    contentType: 'wifi',
    initialValue: 'WIFI:S:Guest_WiFi;T:WPA;P:guest12345;;',
    whyChoosePoints: [
      {
        title: 'Instant 1-Tap Connection',
        desc: 'iOS and Android devices prompt "Join Network" immediately upon camera scan.',
        icon: 'Wifi',
      },
      {
        title: 'WPA/WPA2/WEP Support',
        desc: 'Full compatibility with modern wireless routers, guest networks, and hidden SSIDs.',
        icon: 'Lock',
      },
      {
        title: 'Airbnb & Hotel Ready',
        desc: 'Print on bedside standees, refrigerator magnets, or lobby welcome cards.',
        icon: 'Home',
      },
    ],
    howToSteps: [
      {
        step: 1,
        title: 'Enter Network Name (SSID) & Password',
        desc: 'Provide your wireless network name and security credentials exactly as configured.',
      },
      {
        step: 2,
        title: 'Choose Wi-Fi Icon or Brand Logo',
        desc: 'Select our clean Wi-Fi icon or upload your cafe or hotel logo.',
      },
      {
        step: 3,
        title: 'Print for Guest Rooms & Counters',
        desc: 'Download the print-ready PDF standee with clear "Scan to Connect" instructions.',
      },
    ],
    faqs: [
      {
        question: 'Is my Wi-Fi password stored on your servers?',
        answer: 'Never. All QR codes are generated 100% client-side inside your browser canvas. Your Wi-Fi credentials never leave your device.',
      },
      {
        question: 'Does this work on iPhones and Android?',
        answer: 'Yes! Both iOS 11+ and Android 10+ have native Wi-Fi QR network join capabilities built directly into their camera apps.',
      },
    ],
  },

  'instagram-qr-code-generator': {
    slug: 'instagram-qr-code-generator',
    title: 'Instagram QR Code Generator with Logo - Boost Profile Followers',
    metaDescription: 'Generate custom Instagram QR codes with vibrant gradient colors and the official Instagram icon. Deep links directly into the Instagram mobile app.',
    targetKeyword: 'instagram qr code generator with logo',
    h1: 'Instagram QR Code Generator with Logo',
    heroSubtitle: 'Grow your Instagram followers from real-world packaging, events, and print flyers. Deep-links directly to your @profile in the Instagram app.',
    badge: 'Viral Follower Engine',
    presetId: 'instagram-gradient',
    contentType: 'instagram',
    initialValue: 'https://instagram.com/yourbrand',
    whyChoosePoints: [
      {
        title: 'Direct App Deep Link',
        desc: 'Opens directly in the native Instagram mobile application for a seamless 1-tap "Follow".',
        icon: 'ExternalLink',
      },
      {
        title: 'Signature Sunset Gradient',
        desc: 'Pre-styled with Instagram iconic violet-pink-yellow gradient palette.',
        icon: 'Palette',
      },
      {
        title: 'Product Packaging Ready',
        desc: 'Export high-res vector SVG files suitable for garment tags, boxes, and event banners.',
        icon: 'Package',
      },
    ],
    howToSteps: [
      {
        step: 1,
        title: 'Enter Your Instagram Username',
        desc: 'Type your handle (e.g. yourbrand), and we format the deep link automatically.',
      },
      {
        step: 2,
        title: 'Customize Gradient Colors and Corners',
        desc: 'Match your feed aesthetic with smooth gradients, custom dots, and the Instagram logo.',
      },
      {
        step: 3,
        title: 'Export in High-Res Vector SVG or PNG',
        desc: 'Include on packaging inserts, physical storefront windows, and business cards.',
      },
    ],
    faqs: [
      {
        question: 'Will it open the Instagram app or browser?',
        answer: 'On smartphones with Instagram installed, the link opens directly in the Instagram app to your profile page so users can immediately hit Follow.',
      },
      {
        question: 'Can I put my personal portrait or logo in the center?',
        answer: 'Yes! You can either use the official Instagram logo or upload your own avatar or brand logo.',
      },
    ],
  },

  'vcard-business-card-qr-generator': {
    slug: 'vcard-business-card-qr-generator',
    title: 'vCard QR Code Generator - Digital Business Card with Logo',
    metaDescription: 'Create digital business card vCard QR codes. When scanned, contacts are instantly added to iPhone Contacts or Google Contacts with 1 tap.',
    targetKeyword: 'vcard qr code generator digital business card',
    h1: 'Digital Business Card (vCard) QR Code Generator',
    heroSubtitle: 'Never run out of business cards again. Generate a vCard QR code that saves your name, phone, email, company, and portfolio into phone contacts in 1 second.',
    badge: 'Networking & Sales Superpower',
    presetId: 'minimal-luxe',
    contentType: 'vcard',
    initialValue: 'BEGIN:VCARD\nVERSION:3.0\nN:Doe;John;;;\nFN:John Doe\nORG:Acme Corp\nTITLE:Founder\nTEL:+15551234567\nEMAIL:john@acme.com\nURL:https://acme.com\nEND:VCARD',
    whyChoosePoints: [
      {
        title: '1-Tap "Save to Contacts"',
        desc: 'Prompts users immediately to save your contact card with full details pre-filled.',
        icon: 'UserPlus',
      },
      {
        title: 'Zero Paper Waste',
        desc: 'Add the QR code to your lock screen, Apple Wallet, or back of your phone case.',
        icon: 'Smartphone',
      },
      {
        title: 'Professional Luxe Styling',
        desc: 'Polished obsidian and gold palettes designed to leave a lasting executive impression.',
        icon: 'Award',
      },
    ],
    howToSteps: [
      {
        step: 1,
        title: 'Fill In Your Contact Details',
        desc: 'Enter your full name, phone number, email, company name, title, and website URL.',
      },
      {
        step: 2,
        title: 'Upload Company Logo or Avatar',
        desc: 'Place your startup logo or monogram directly inside the QR code center.',
      },
      {
        step: 3,
        title: 'Save to Phone Wallpaper or Print',
        desc: 'Export as PNG to set as your lock screen wallpaper for conferences and networking meetups.',
      },
    ],
    faqs: [
      {
        question: 'Does it work offline?',
        answer: 'Yes! vCard data is encoded directly inside the QR code matrix. It requires zero internet connection to transfer contact info to the scanner phone.',
      },
      {
        question: 'Is it compatible with both iPhone and Android?',
        answer: 'Yes, all modern smartphones recognize standard vCard 3.0 format natively in their default camera apps.',
      },
    ],
  },

  'youtube-channel-qr-code-maker': {
    slug: 'youtube-channel-qr-code-maker',
    title: 'YouTube QR Code Maker with Play Logo - Grow Subscribers Fast',
    metaDescription: 'Create custom YouTube QR codes with the official YouTube Play button logo. Direct fans to your channel, live stream, or specific video.',
    targetKeyword: 'youtube channel qr code maker with logo',
    h1: 'YouTube Channel & Video QR Code Maker with Logo',
    heroSubtitle: 'Bridge offline fans to your YouTube channel. Perfect for podcast artwork, merchandise tags, billboard ads, and video promotions.',
    badge: 'Creator Growth Tool',
    presetId: 'youtube-sub',
    contentType: 'url',
    initialValue: 'https://youtube.com/@yourchannel?sub_confirmation=1',
    whyChoosePoints: [
      {
        title: 'Auto-Subscribe Link Support',
        desc: 'Use our auto-subscribe parameter to present an instant "Subscribe?" popup to visitors.',
        icon: 'Youtube',
      },
      {
        title: 'Iconic Red Play Button Emblem',
        desc: 'Instant visual association with YouTube boosts scan rates by over 40%.',
        icon: 'PlayCircle',
      },
      {
        title: 'High-Density Merchandise Print',
        desc: 'Print clearly on hoodies, stickers, album covers, and event wristbands.',
        icon: 'Shirt',
      },
    ],
    howToSteps: [
      {
        step: 1,
        title: 'Enter YouTube Channel or Video URL',
        desc: 'Paste your custom @handle link, playlist URL, or video shortlink.',
      },
      {
        step: 2,
        title: 'Style with YouTube Crimson Theme',
        desc: 'Preset styling with YouTube red, smooth rounded dots, and centered play button.',
      },
      {
        step: 3,
        title: 'Download Vector SVG for Merch',
        desc: 'Scale indefinitely without quality loss for screen printing and merchandise production.',
      },
    ],
    faqs: [
      {
        question: 'Can I link directly to a specific video or playlist?',
        answer: 'Yes! You can link to any YouTube URL including specific videos, playlists, YouTube Shorts, or live streams.',
      },
      {
        question: 'Can I trigger the subscribe confirmation prompt?',
        answer: 'Yes, append ?sub_confirmation=1 to your channel URL to prompt desktop visitors to subscribe immediately.',
      },
    ],
  },

  'spotify-playlist-qr-generator': {
    slug: 'spotify-playlist-qr-generator',
    title: 'Spotify QR Code Generator for Songs, Artists & Playlists',
    metaDescription: 'Generate customized Spotify QR codes with the Spotify logo. Deep link listeners directly to your songs, albums, and curated playlists.',
    targetKeyword: 'spotify playlist qr code generator with logo',
    h1: 'Spotify Playlist & Music QR Code Generator',
    heroSubtitle: 'Share your track, EP, or playlist with listeners in the physical world. Deep links straight into the Spotify app with vibrant music aesthetics.',
    badge: 'Artist & DJ Essential',
    presetId: 'spotify-music',
    contentType: 'url',
    initialValue: 'https://open.spotify.com/playlist/your-playlist-id',
    whyChoosePoints: [
      {
        title: 'Universal Camera Scanning',
        desc: 'Unlike proprietary Spotify Sound Codes, this QR code scans with ANY normal phone camera!',
        icon: 'Radio',
      },
      {
        title: 'Spotify Green Brand Styling',
        desc: 'Centered official soundwave logo and signature Spotify emerald gradient.',
        icon: 'Music',
      },
      {
        title: 'Gig Posters & Album Covers',
        desc: 'Ready for print on tour posters, vinyl sleeves, stickers, and venue banners.',
        icon: 'Disc',
      },
    ],
    howToSteps: [
      {
        step: 1,
        title: 'Copy Spotify Share Link',
        desc: 'In the Spotify app, click Share > Copy Link on any song, artist profile, or playlist.',
      },
      {
        step: 2,
        title: 'Customize with Music Waveforms',
        desc: 'Adjust dots, gradient colors, and error correction for maximum readability on dark posters.',
      },
      {
        step: 3,
        title: 'Print for Gig Promotion & Merch',
        desc: 'Download 4K PNG or SVG for promotional flyers, stickers, and festival banners.',
      },
    ],
    faqs: [
      {
        question: 'How is this different from Spotify Sound Codes?',
        answer: 'Spotify Codes can ONLY be scanned inside the Spotify search bar. Our QR codes can be scanned by any smartphone camera app, giving you 5x higher scan conversion rates!',
      },
      {
        question: 'Does it open the Spotify app directly?',
        answer: 'Yes, smartphone operating systems route open.spotify.com links directly to the Spotify mobile app.',
      },
    ],
  },

  'crypto-bitcoin-qr-code-generator': {
    slug: 'crypto-bitcoin-qr-code-generator',
    title: 'Crypto & Bitcoin Wallet QR Code Generator - Safe & Verified',
    metaDescription: 'Create secure Bitcoin, Ethereum, and cryptocurrency wallet QR codes with currency logos. Prevent costly address typing errors.',
    targetKeyword: 'bitcoin qr code generator with logo cryptocurrency',
    h1: 'Crypto & Bitcoin Wallet QR Code Generator',
    heroSubtitle: 'Prevent costly copy-paste and typing errors. Generate verified QR codes for Bitcoin, Ethereum, Solana, and USDT wallet addresses with cryptocurrency emblems.',
    badge: 'Zero Typo Crypto Payments',
    presetId: 'bitcoin-wallet',
    contentType: 'text',
    initialValue: 'bitcoin:1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
    whyChoosePoints: [
      {
        title: 'Typo-Proof Transactions',
        desc: 'Eliminates mistyped 40-character blockchain addresses that cause lost funds.',
        icon: 'CheckCircle2',
      },
      {
        title: 'Currency Emblems for Visual Safety',
        desc: 'Embed Bitcoin, Ethereum, or Solana logos so senders verify the correct blockchain.',
        icon: 'Coins',
      },
      {
        title: 'Point of Sale & Donation Ready',
        desc: 'Print on countertop signs, live streams, or invoice footers for easy crypto acceptance.',
        icon: 'CreditCard',
      },
    ],
    howToSteps: [
      {
        step: 1,
        title: 'Enter Wallet Address or BIP21 URI',
        desc: 'Paste your public wallet address (e.g. bitcoin:bc1q... or 0x...). Never enter private keys!',
      },
      {
        step: 2,
        title: 'Select Bitcoin or Crypto Logo',
        desc: 'Center the cryptocurrency icon to reassure senders of the intended token.',
      },
      {
        step: 3,
        title: 'Export for Merchant POS or Stream',
        desc: 'Save as high-res PNG for OBS stream overlays or printable PDF countertop display.',
      },
    ],
    faqs: [
      {
        question: 'Is it safe to generate crypto QR codes on this site?',
        answer: 'Yes! Generation runs entirely in your local browser sandbox. Your public address is never transmitted to our servers.',
      },
      {
        question: 'Can I specify an amount in the QR code?',
        answer: 'Yes! Use standard BIP21 format such as bitcoin:ADDRESS?amount=0.005 to automatically fill the payment amount in the sender wallet.',
      },
    ],
  },

  'app-store-download-qr-generator': {
    slug: 'app-store-download-qr-generator',
    title: 'App Store & Google Play Download QR Code Generator with Logo',
    metaDescription: 'Generate smart app download QR codes with App Store logo. Direct users to iOS App Store and Android Google Play store effortlessly.',
    targetKeyword: 'app store download qr code generator with logo',
    h1: 'App Store & Google Play Download QR Code Generator',
    heroSubtitle: 'Drive mobile app installs from offline campaigns. Create branded app download QR codes for billboard ads, product packaging, and conference booths.',
    badge: 'Boost Mobile App Installs',
    presetId: 'minimal-luxe',
    contentType: 'url',
    initialValue: 'https://apps.apple.com/app/id123456789',
    whyChoosePoints: [
      {
        title: 'Direct Store Routing',
        desc: 'Links straight to your iOS App Store or Google Play Store download page.',
        icon: 'Download',
      },
      {
        title: 'Official Apple & Android Badges',
        desc: 'Center the Apple logo or Android badge to build consumer confidence.',
        icon: 'Apple',
      },
      {
        title: 'Billboard & OOH Advertising Ready',
        desc: 'Vector SVG export retains pinpoint sharpness on massive outdoor displays.',
        icon: 'Tv',
      },
    ],
    howToSteps: [
      {
        step: 1,
        title: 'Paste App Store or Smart Link URL',
        desc: 'Enter your iOS App Store link, Google Play URL, or Firebase Dynamic Link.',
      },
      {
        step: 2,
        title: 'Add App Icon or Store Badge',
        desc: 'Upload your app launcher icon to give users instant visual recognition.',
      },
      {
        step: 3,
        title: 'Print on Packaging and Banners',
        desc: 'Deploy on product boxes, flyers, TV spots, and billboard advertisements.',
      },
    ],
    faqs: [
      {
        question: 'Can one QR code route to both iOS and Android?',
        answer: 'Yes! If you use a smart routing service (like Firebase Dynamic Links, AppsFlyer, or a Cloudflare Worker redirect), the QR code can detect the device OS and route to Apple App Store or Google Play automatically.',
      },
      {
        question: 'Can I track how many app downloads came from each poster?',
        answer: 'Yes, append UTM parameters (e.g. ?utm_source=billboard) to your store link or dynamic link to track conversions in App Store Connect and Google Play Console.',
      },
    ],
  },
};
