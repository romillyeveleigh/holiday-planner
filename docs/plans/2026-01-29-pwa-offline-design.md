# PWA Offline Access Design

## Overview

Add Progressive Web App (PWA) capabilities to the Egypt Trip Planner so it works fully offline, including pre-cached map tiles for the trip region.

## Goals

- Full offline functionality for all pages and features
- Installable on mobile home screen (iOS & Android)
- Pre-cached map tiles for Egypt trip locations
- Minimal intrusion on user experience

## Technical Approach

### PWA Implementation

Use `next-pwa` package which wraps Workbox and integrates with Next.js.

**Caching Strategy:**
- Pages & assets: Cache-first (serve from cache, update in background)
- JSON data: Cache-first (itinerary, hotels, temples data)
- Images: Cache-first with size limit
- Map tiles: Pre-cache Egypt region on first load

### Map Tile Caching

**Bounding Box (Egypt trip area):**
- North: 30.0°N (Cairo/Giza)
- South: 22.3°N (Abu Simbel)
- West: 31.0°E (Nile valley)
- East: 34.0°E (Hurghada/Red Sea)

**Zoom Levels:**
- 5-7: Overview of Egypt
- 8-10: Regional view (Giza, Aswan, Luxor, Red Sea coast)
- 11-13: Street-level detail for hotels/temples

**Estimated Size:** ~500-800 tiles, 5-8MB

**Fallback:** Grey placeholder tile for uncached areas.

### Web App Manifest

```json
{
  "name": "Egypt Trip Planner",
  "short_name": "Egypt Trip",
  "description": "Rom & Lynn's Egypt Adventure",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#0d9488"
}
```

### App Icons

Plane + pyramid combo design in three sizes:
- 192x192 - Android home screen
- 512x512 - Android splash screen
- 180x180 - iOS (apple-touch-icon)

### Offline Indicators

- **Map page only:** Subtle "Offline" badge when disconnected
- **Initial cache:** "Downloading for offline use..." progress, then "Ready for offline use" toast
- **Map page:** "Map cached" indicator when tiles ready

### iOS Install Hint

One-time dismissible tip: "Add to Home Screen for offline access"

## Files to Create/Modify

| File | Action | Purpose |
|------|--------|---------|
| `next.config.ts` | Modify | Add PWA configuration |
| `public/manifest.json` | Create | Web app manifest |
| `public/icons/icon-192x192.png` | Create | Android home screen icon |
| `public/icons/icon-512x512.png` | Create | Android splash icon |
| `public/icons/apple-touch-icon.png` | Create | iOS home screen icon |
| `src/lib/tileCache.ts` | Create | Egypt tile URL generator |
| `src/components/OfflineIndicator.tsx` | Create | Connection status badge |
| `src/app/layout.tsx` | Modify | Add manifest link, theme meta |
| `src/app/map/page.tsx` | Modify | Add offline indicator |

## Out of Scope

- Push notifications
- Background sync
- Periodic updates

## Dependencies

- `next-pwa` - PWA wrapper for Next.js
