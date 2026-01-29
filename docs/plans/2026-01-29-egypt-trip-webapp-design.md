# Egypt Trip Web App - Design Document

## Overview

A Next.js web app to view and navigate the Egypt trip (Jan 30 - Feb 8, 2026) with itinerary, temple details, interactive map, and restaurant finder.

## Tech Stack

- **Framework:** Next.js 14 with App Router
- **Styling:** Tailwind CSS
- **Maps:** Leaflet + OpenStreetMap (no API key required)
- **Images:** Wikimedia Commons URLs for temples
- **Data:** Static JSON files parsed from markdown
- **Deployment:** Vercel

## Pages

### 1. Home/Itinerary (`/`)
- Timeline view showing all 10 days vertically
- Each day card shows: date, location, hotel, activities with times
- Current day highlighted (based on actual date during trip)
- Click a day to expand full details
- Small map thumbnail showing that day's location

### 2. Temples (`/temples`)
- Grid of cards (2 columns mobile, 3-4 desktop)
- Each card: Wikimedia photo, name, rating stars, visit date
- Click to expand: full description, hours, entry cost, address, "Open in Maps" link
- Filter buttons: "All", "Giza", "Aswan", "Luxor", "Day Trips"

### 3. Map (`/map`)
- Full-screen Leaflet map centered on Egypt
- Markers for: hotels (bed icon), temples (pyramid icon)
- Route polyline: Cairo -> Aswan -> Luxor -> Hurghada
- Click marker for popup with name, date, link to details

### 4. Restaurants (`/restaurants`)
- Tabs/dropdown to select location: Giza, Aswan, Luxor, Soma Bay, Hurghada
- List view: name, rating, price range, cuisine type
- "Open in Google Maps" link for each
- Hotel shown at top of each location section

## File Structure

```
holiday-planner/
├── app/
│   ├── layout.tsx        # Nav bar, Egypt theme colors
│   ├── page.tsx          # Itinerary (home)
│   ├── temples/page.tsx
│   ├── map/page.tsx
│   └── restaurants/page.tsx
├── components/
│   ├── DayCard.tsx       # Single day in itinerary
│   ├── TempleCard.tsx    # Temple grid item
│   ├── MapView.tsx       # Leaflet wrapper
│   └── RestaurantList.tsx
├── data/
│   ├── itinerary.json
│   ├── temples.json
│   ├── restaurants.json
│   └── hotels.json
└── public/
    └── (any local assets)
```

## Navigation

- **Mobile:** Fixed bottom nav (4 icons: Calendar, Pyramid, Map, Utensils)
- **Desktop:** Top nav bar with same 4 links
- Trip title "Egypt Jan-Feb 2026" always visible

## Color Theme

- Sandy gold accent: `#C9A227`
- Dark navy headers: `#1A1A2E`
- Warm cream background: `#FDF5E6`

## Data Sources

All data extracted from `egypt-trip-jan-2026.md`:
- 10 days of itinerary with activities
- 14 temples/sites with details, coordinates, Wikimedia images
- ~30 restaurants grouped by location
- 5 hotels with contact details

## Constraints

- No API keys or signups required
- Fully static (works offline once loaded)
- Mobile-first responsive design
