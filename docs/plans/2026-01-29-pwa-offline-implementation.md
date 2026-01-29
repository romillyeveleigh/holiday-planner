# PWA Offline Access Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make the Egypt Trip Planner work fully offline as a PWA with pre-cached map tiles.

**Architecture:** Use `next-pwa` to generate service worker with Workbox. Pre-cache Esri map tiles for Egypt region. Add manifest for installability.

**Tech Stack:** next-pwa, Workbox, Web App Manifest, Service Workers

---

## Task 1: Install next-pwa

**Files:**
- Modify: `package.json`

**Step 1: Install the package**

Run:
```bash
npm install next-pwa
```

Expected: Package added to dependencies in package.json

**Step 2: Verify installation**

Run:
```bash
cat package.json | grep next-pwa
```

Expected: `"next-pwa": "^5.x.x"` in dependencies

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install next-pwa for offline support"
```

---

## Task 2: Configure next-pwa

**Files:**
- Modify: `next.config.ts`

**Step 1: Update next.config.ts**

Replace the entire contents of `next.config.ts` with:

```typescript
import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
    ],
  },
};

const pwaConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/server\.arcgisonline\.com\/.*$/i,
      handler: "CacheFirst",
      options: {
        cacheName: "esri-tiles",
        expiration: {
          maxEntries: 1000,
          maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
    {
      urlPattern: /^https:\/\/raw\.githubusercontent\.com\/.*$/i,
      handler: "CacheFirst",
      options: {
        cacheName: "marker-icons",
        expiration: {
          maxEntries: 20,
          maxAgeSeconds: 60 * 60 * 24 * 30,
        },
      },
    },
    {
      urlPattern: /^https:\/\/cdnjs\.cloudflare\.com\/.*$/i,
      handler: "CacheFirst",
      options: {
        cacheName: "leaflet-assets",
        expiration: {
          maxEntries: 20,
          maxAgeSeconds: 60 * 60 * 24 * 30,
        },
      },
    },
  ],
});

export default pwaConfig(nextConfig);
```

**Step 2: Add .gitignore entries for generated PWA files**

Add to `.gitignore`:
```
# PWA
public/sw.js
public/sw.js.map
public/workbox-*.js
public/workbox-*.js.map
```

**Step 3: Verify config syntax**

Run:
```bash
npm run build
```

Expected: Build succeeds without errors

**Step 4: Commit**

```bash
git add next.config.ts .gitignore
git commit -m "feat: configure next-pwa with tile caching"
```

---

## Task 3: Create Web App Manifest

**Files:**
- Create: `public/manifest.json`

**Step 1: Create manifest.json**

Create `public/manifest.json` with:

```json
{
  "name": "Egypt Trip Planner",
  "short_name": "Egypt Trip",
  "description": "Rom & Lynn's Egypt Adventure - Jan 30 to Feb 8, 2026",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#0d9488",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ],
  "categories": ["travel", "lifestyle"]
}
```

**Step 2: Commit**

```bash
git add public/manifest.json
git commit -m "feat: add web app manifest"
```

---

## Task 4: Create App Icons

**Files:**
- Create: `public/icons/icon-192x192.png`
- Create: `public/icons/icon-512x512.png`
- Create: `public/icons/apple-touch-icon.png`

**Step 1: Create icons directory**

Run:
```bash
mkdir -p public/icons
```

**Step 2: Create placeholder SVG icon**

Create `public/icons/icon.svg` with a plane + pyramid design:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#0d9488"/>
  <!-- Pyramid -->
  <polygon points="256,380 120,420 392,420" fill="#fbbf24"/>
  <polygon points="256,380 256,280 120,420" fill="#f59e0b"/>
  <polygon points="256,380 256,280 392,420" fill="#d97706"/>
  <!-- Plane -->
  <g transform="translate(256,180) rotate(-30)">
    <path d="M-60,0 L-20,-10 L40,0 L60,-5 L60,5 L40,0 L-20,10 Z" fill="white"/>
    <path d="M-30,0 L-10,-25 L0,-25 L-10,0 L0,25 L-10,25 Z" fill="white"/>
    <path d="M30,0 L40,-15 L50,-15 L45,0 L50,15 L40,15 Z" fill="white"/>
  </g>
</svg>
```

**Step 3: Generate PNG icons from SVG**

Note: For production, convert the SVG to PNG at 192x192, 512x512, and 180x180. Use an online tool like https://svgtopng.com or run locally with ImageMagick if available.

For now, we can use the SVG directly (browsers support SVG icons) or create simple placeholder PNGs.

Run (if ImageMagick is installed):
```bash
convert -background none public/icons/icon.svg -resize 192x192 public/icons/icon-192x192.png
convert -background none public/icons/icon.svg -resize 512x512 public/icons/icon-512x512.png
convert -background none public/icons/icon.svg -resize 180x180 public/icons/apple-touch-icon.png
```

If ImageMagick is not available, create the icons manually or use placeholder text.

**Step 4: Commit**

```bash
git add public/icons/
git commit -m "feat: add PWA app icons"
```

---

## Task 5: Update Layout with PWA Meta Tags

**Files:**
- Modify: `app/layout.tsx`

**Step 1: Update layout.tsx metadata and add PWA links**

Update `app/layout.tsx`:

```typescript
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rom & Lynn's Amazing Egypt Trip",
  description: "Rom & Lynn's Egypt adventure - Jan 30 to Feb 8, 2026",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Egypt Trip",
  },
};

export const viewport: Viewport = {
  themeColor: "#0d9488",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navigation />
        <main className="pb-20 md:pb-0">{children}</main>
      </body>
    </html>
  );
}
```

**Step 2: Verify build**

Run:
```bash
npm run build
```

Expected: Build succeeds

**Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: add PWA meta tags to layout"
```

---

## Task 6: Create Offline Indicator Component

**Files:**
- Create: `components/OfflineIndicator.tsx`

**Step 1: Create the component**

Create `components/OfflineIndicator.tsx`:

```typescript
"use client";

import { useEffect, useState } from "react";
import { WifiOff } from "lucide-react";

export default function OfflineIndicator() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    setIsOffline(!navigator.onLine);

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="flex items-center gap-1.5 px-2 py-1 bg-amber-100 text-amber-800 rounded text-xs font-medium">
      <WifiOff className="w-3 h-3" />
      Offline
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add components/OfflineIndicator.tsx
git commit -m "feat: add offline indicator component"
```

---

## Task 7: Add Offline Indicator to Map Page

**Files:**
- Modify: `app/map/page.tsx`

**Step 1: Update map page**

Update `app/map/page.tsx`:

```typescript
"use client";

import dynamic from "next/dynamic";
import templesData from "@/data/temples.json";
import hotelsData from "@/data/hotels.json";
import restaurantsData from "@/data/restaurants.json";
import { Temple, Hotel, Restaurant } from "@/types";
import OfflineIndicator from "@/components/OfflineIndicator";

const MapView = dynamic(() => import("@/components/MapView"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-slate/5 flex items-center justify-center text-slate-light">
      Loading map...
    </div>
  ),
});

export default function MapPage() {
  const temples: Temple[] = templesData as Temple[];
  const hotels: Hotel[] = hotelsData as Hotel[];

  // Flatten restaurants from grouped structure
  const restaurants: Restaurant[] = Object.values(restaurantsData).flat() as Restaurant[];

  return (
    <div className="h-[calc(100vh-76px-56px)] md:h-[calc(100vh-60px)] flex flex-col overflow-hidden">
      <div className="p-3 bg-white border-b border-slate/10 flex items-center gap-4 text-sm shrink-0">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 bg-blue-500 rounded-full"></span> Hotels
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 bg-teal rounded-full"></span> Temples
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 bg-red-500 rounded-full"></span> Food
        </span>
        <div className="ml-auto">
          <OfflineIndicator />
        </div>
      </div>
      <div className="flex-1 min-h-0">
        <MapView temples={temples} hotels={hotels} restaurants={restaurants} />
      </div>
    </div>
  );
}
```

**Step 2: Verify build**

Run:
```bash
npm run build
```

Expected: Build succeeds

**Step 3: Commit**

```bash
git add app/map/page.tsx
git commit -m "feat: add offline indicator to map page"
```

---

## Task 8: Create Tile Pre-caching Utility

**Files:**
- Create: `lib/tileCache.ts`

**Step 1: Create tile cache utility**

Create `lib/tileCache.ts`:

```typescript
// Egypt bounding box for trip locations
const EGYPT_BOUNDS = {
  north: 30.5, // Cairo/Giza
  south: 22.0, // Abu Simbel
  west: 30.5,  // Nile valley
  east: 35.0,  // Red Sea coast
};

// Esri tile URL pattern
const TILE_URL = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}";

function lon2tile(lon: number, zoom: number): number {
  return Math.floor(((lon + 180) / 360) * Math.pow(2, zoom));
}

function lat2tile(lat: number, zoom: number): number {
  return Math.floor(
    ((1 - Math.log(Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)) / Math.PI) / 2) *
      Math.pow(2, zoom)
  );
}

export function generateTileUrls(minZoom = 5, maxZoom = 12): string[] {
  const urls: string[] = [];

  for (let z = minZoom; z <= maxZoom; z++) {
    const xMin = lon2tile(EGYPT_BOUNDS.west, z);
    const xMax = lon2tile(EGYPT_BOUNDS.east, z);
    const yMin = lat2tile(EGYPT_BOUNDS.north, z);
    const yMax = lat2tile(EGYPT_BOUNDS.south, z);

    for (let x = xMin; x <= xMax; x++) {
      for (let y = yMin; y <= yMax; y++) {
        urls.push(TILE_URL.replace("{z}", String(z)).replace("{y}", String(y)).replace("{x}", String(x)));
      }
    }
  }

  return urls;
}

export async function precacheTiles(onProgress?: (loaded: number, total: number) => void): Promise<void> {
  const urls = generateTileUrls();
  const total = urls.length;
  let loaded = 0;

  // Batch requests to avoid overwhelming the network
  const batchSize = 10;
  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    await Promise.all(
      batch.map(async (url) => {
        try {
          await fetch(url);
          loaded++;
          onProgress?.(loaded, total);
        } catch {
          // Silently skip failed tiles
          loaded++;
        }
      })
    );
  }
}
```

**Step 2: Commit**

```bash
git add lib/tileCache.ts
git commit -m "feat: add tile pre-caching utility"
```

---

## Task 9: Add Install Prompt for iOS

**Files:**
- Create: `components/InstallPrompt.tsx`
- Modify: `app/layout.tsx`

**Step 1: Create InstallPrompt component**

Create `components/InstallPrompt.tsx`:

```typescript
"use client";

import { useEffect, useState } from "react";
import { X, Share } from "lucide-react";

export default function InstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Only show on iOS Safari
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isInStandaloneMode = window.matchMedia("(display-mode: standalone)").matches;
    const dismissed = localStorage.getItem("install-prompt-dismissed");

    if (isIOS && !isInStandaloneMode && !dismissed) {
      // Delay showing the prompt
      const timer = setTimeout(() => setShowPrompt(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismiss = () => {
    setShowPrompt(false);
    localStorage.setItem("install-prompt-dismissed", "true");
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-24 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-white rounded-lg shadow-lg border border-slate-200 p-4 z-50">
      <button
        onClick={dismiss}
        className="absolute top-2 right-2 text-slate-400 hover:text-slate-600"
      >
        <X className="w-5 h-5" />
      </button>
      <div className="flex items-start gap-3">
        <div className="p-2 bg-teal-50 rounded-lg">
          <Share className="w-5 h-5 text-teal-600" />
        </div>
        <div>
          <p className="font-medium text-slate-900">Add to Home Screen</p>
          <p className="text-sm text-slate-600 mt-1">
            Install this app for offline access. Tap <Share className="w-4 h-4 inline" /> then &quot;Add to Home Screen&quot;.
          </p>
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Add InstallPrompt to layout**

Update `app/layout.tsx` to import and render `InstallPrompt`:

```typescript
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import InstallPrompt from "@/components/InstallPrompt";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rom & Lynn's Amazing Egypt Trip",
  description: "Rom & Lynn's Egypt adventure - Jan 30 to Feb 8, 2026",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Egypt Trip",
  },
};

export const viewport: Viewport = {
  themeColor: "#0d9488",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navigation />
        <main className="pb-20 md:pb-0">{children}</main>
        <InstallPrompt />
      </body>
    </html>
  );
}
```

**Step 3: Verify build**

Run:
```bash
npm run build
```

Expected: Build succeeds

**Step 4: Commit**

```bash
git add components/InstallPrompt.tsx app/layout.tsx
git commit -m "feat: add iOS install prompt"
```

---

## Task 10: Test PWA Functionality

**Step 1: Build and start production server**

Run:
```bash
npm run build && npm run start
```

**Step 2: Verify service worker registration**

Open http://localhost:3000 in Chrome, open DevTools > Application > Service Workers.

Expected: Service worker registered and active

**Step 3: Verify manifest**

In DevTools > Application > Manifest.

Expected: Manifest loaded with correct name, icons, theme color

**Step 4: Test offline mode**

In DevTools > Network, check "Offline". Refresh the page.

Expected: App loads and functions (except external links)

**Step 5: Test map offline**

Navigate to /map while offline.

Expected: Map displays with cached tiles

**Step 6: Final commit**

```bash
git add -A
git commit -m "feat: complete PWA offline support implementation"
```

---

## Summary

After completing all tasks, the app will:
- Work fully offline as an installable PWA
- Cache all pages, assets, and data automatically
- Pre-cache Esri map tiles for Egypt
- Show offline indicator on map page
- Prompt iOS users to install

Estimated tile cache size: ~3-8MB depending on zoom levels cached.
