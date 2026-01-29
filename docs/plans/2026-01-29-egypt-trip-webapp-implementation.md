# Egypt Trip Web App - Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a Next.js web app to view Egypt trip itinerary, temples, map, and restaurants.

**Architecture:** Static Next.js 14 app with App Router. Data stored as JSON files, rendered at build time. Leaflet for maps, Wikimedia for images. Mobile-first responsive design.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Leaflet, react-leaflet

---

## Task 1: Initialize Next.js Project

**Files:**
- Create: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `next.config.js`
- Create: `app/layout.tsx`, `app/page.tsx`, `app/globals.css`

**Step 1: Create Next.js app with TypeScript and Tailwind**

Run:
```bash
cd /Users/romillyeveleigh/Code/github/holiday-planner
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --use-npm
```

When prompted, accept defaults. If directory not empty, say yes to continue.

**Step 2: Verify project created**

Run: `ls -la`
Expected: See `package.json`, `app/`, `tailwind.config.ts`, etc.

**Step 3: Start dev server to verify**

Run: `npm run dev`
Expected: Server starts on http://localhost:3000

**Step 4: Stop server and commit**

Press Ctrl+C to stop, then:
```bash
git add -A
git commit -m "Initialize Next.js 14 with TypeScript and Tailwind

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Task 2: Configure Tailwind Theme Colors

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`

**Step 1: Update Tailwind config with Egypt theme**

Replace `tailwind.config.ts`:
```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "#C9A227",
        navy: "#1A1A2E",
        cream: "#FDF5E6",
        "gold-dark": "#A68820",
      },
    },
  },
  plugins: [],
};
export default config;
```

**Step 2: Update globals.css**

Replace `app/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background-color: #FDF5E6;
  color: #1A1A2E;
}
```

**Step 3: Commit**

```bash
git add tailwind.config.ts app/globals.css
git commit -m "Configure Tailwind with Egypt theme colors

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Task 3: Create Data Types

**Files:**
- Create: `types/index.ts`

**Step 1: Create types directory and file**

Create `types/index.ts`:
```typescript
export interface Activity {
  time: string;
  description: string;
}

export interface Day {
  date: string;
  dayOfWeek: string;
  location: string;
  hotel?: string;
  activities: Activity[];
}

export interface Temple {
  id: string;
  name: string;
  visitDate: string;
  rating: number;
  reviews: string;
  address: string;
  hours: string;
  entry: string;
  mapUrl: string;
  description: string;
  region: "giza" | "aswan" | "luxor" | "daytrip";
  coordinates: [number, number]; // [lat, lng]
  imageUrl: string;
}

export interface Restaurant {
  name: string;
  rating: number;
  reviews?: number;
  price?: string;
  type: string;
  location: string;
}

export interface Hotel {
  name: string;
  location: string;
  dates: string;
  address: string;
  phone?: string;
  coordinates: [number, number];
}
```

**Step 2: Commit**

```bash
git add types/index.ts
git commit -m "Add TypeScript types for data models

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Task 4: Create Itinerary Data

**Files:**
- Create: `data/itinerary.json`

**Step 1: Create data directory and itinerary file**

Create `data/itinerary.json`:
```json
[
  {
    "date": "2026-01-30",
    "dayOfWeek": "Friday",
    "location": "Cairo/Giza",
    "hotel": "Great Pyramid Inn",
    "activities": [
      { "time": "09:40", "description": "Depart London Heathrow (EgyptAir MS784)" },
      { "time": "16:30", "description": "Arrive Cairo Airport" },
      { "time": "17:30-19:00", "description": "Transfer to hotel" },
      { "time": "Evening", "description": "Settle in, rooftop pyramid views, dinner" }
    ]
  },
  {
    "date": "2026-01-31",
    "dayOfWeek": "Saturday",
    "location": "Giza/Cairo",
    "hotel": "Great Pyramid Inn",
    "activities": [
      { "time": "08:00-12:00", "description": "Explore Giza Pyramids & Sphinx" },
      { "time": "Afternoon", "description": "Egyptian Museum (Grand Egyptian Museum)" },
      { "time": "Evening", "description": "Relax at hotel" }
    ]
  },
  {
    "date": "2026-02-01",
    "dayOfWeek": "Sunday",
    "location": "Aswan",
    "hotel": "Kana Kato",
    "activities": [
      { "time": "06:45", "description": "Domestic flight Cairo → Aswan" },
      { "time": "12:00-13:00", "description": "Transfer to hotel" },
      { "time": "14:00-18:00", "description": "Explore Elephantine Island, Nile views" },
      { "time": "Evening", "description": "Felucca sunset sail" }
    ]
  },
  {
    "date": "2026-02-02",
    "dayOfWeek": "Monday",
    "location": "Aswan/Abu Simbel",
    "hotel": "Kana Kato",
    "activities": [
      { "time": "04:00-08:00", "description": "Abu Simbel day trip (3h drive each way)" },
      { "time": "Afternoon", "description": "Temples of Ramses II & Nefertari" },
      { "time": "Late afternoon", "description": "Return to Aswan, optional Philae Temple" }
    ]
  },
  {
    "date": "2026-02-03",
    "dayOfWeek": "Tuesday",
    "location": "Luxor",
    "hotel": "Steigenberger Resort Achti",
    "activities": [
      { "time": "11:00", "description": "Check-out Kana Kato" },
      { "time": "11:00-14:00", "description": "Transfer to Luxor (optional Kom Ombo & Edfu stops)" },
      { "time": "15:00", "description": "Check-in Steigenberger Resort Achti" },
      { "time": "16:00-18:00", "description": "Walk to Luxor Temple" },
      { "time": "Evening", "description": "Nile-side dinner" }
    ]
  },
  {
    "date": "2026-02-04",
    "dayOfWeek": "Wednesday",
    "location": "Luxor",
    "hotel": "Steigenberger Resort Achti",
    "activities": [
      { "time": "06:00-12:00", "description": "West Bank: Valley of the Kings, Hatshepsut Temple" },
      { "time": "13:00-14:00", "description": "Lunch" },
      { "time": "15:00-18:00", "description": "Karnak Temple" },
      { "time": "Evening", "description": "Relax at resort" }
    ]
  },
  {
    "date": "2026-02-05",
    "dayOfWeek": "Thursday",
    "location": "Hurghada (Soma Bay)",
    "hotel": "Sharm El Naga Resort",
    "activities": [
      { "time": "12:00", "description": "Check-out Steigenberger Resort Achti" },
      { "time": "12:00-17:00", "description": "Transfer to Hurghada (4-5h drive)" },
      { "time": "Evening", "description": "Beach, house reef snorkelling" }
    ]
  },
  {
    "date": "2026-02-06",
    "dayOfWeek": "Friday",
    "location": "Hurghada",
    "hotel": "Iberotel Casa Del Mar",
    "activities": [
      { "time": "12:00", "description": "Check-out Sharm El Naga" },
      { "time": "12:00-13:30", "description": "Transfer to central Hurghada" },
      { "time": "14:00", "description": "Check-in Iberotel Casa Del Mar" },
      { "time": "Afternoon", "description": "Beach, pool, explore promenade" },
      { "time": "Evening", "description": "All-inclusive dining" }
    ]
  },
  {
    "date": "2026-02-07",
    "dayOfWeek": "Saturday",
    "location": "Hurghada",
    "hotel": "Iberotel Casa Del Mar",
    "activities": [
      { "time": "Morning/Afternoon", "description": "Horse ride (beach/desert, 1-3 hours)" },
      { "time": "Rest of day", "description": "Beach, pool, resort relaxation" }
    ]
  },
  {
    "date": "2026-02-08",
    "dayOfWeek": "Sunday",
    "location": "Return to London",
    "activities": [
      { "time": "12:00", "description": "Check-out Iberotel Casa Del Mar" },
      { "time": "12:00-14:00", "description": "Transfer to Hurghada Airport" },
      { "time": "17:45", "description": "Depart Hurghada (easyJet EZY8744)" },
      { "time": "21:45", "description": "Arrive London Gatwick" }
    ]
  }
]
```

**Step 2: Commit**

```bash
git add data/itinerary.json
git commit -m "Add itinerary data for 10-day Egypt trip

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Task 5: Create Temples Data

**Files:**
- Create: `data/temples.json`

**Step 1: Create temples data with coordinates and Wikimedia images**

Create `data/temples.json`:
```json
[
  {
    "id": "giza-necropolis",
    "name": "Giza Necropolis (Pyramids & Sphinx)",
    "visitDate": "Jan 30-31",
    "rating": 4.8,
    "reviews": "50,000+",
    "address": "Al Haram Street, Giza Plateau, Giza, Egypt",
    "hours": "8am-5pm (Winter); 7am-6pm (Summer)",
    "entry": "700 EGP (~£11); +1500 EGP Great Pyramid interior",
    "mapUrl": "https://maps.google.com/?q=Giza+Pyramids+Egypt",
    "description": "The last surviving Wonder of the Ancient World. Three pyramids (Khufu, Khafre, Menkaure), the Great Sphinx, and ancient tombs on a desert plateau.",
    "region": "giza",
    "coordinates": [29.9792, 31.1342],
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Kheops-Pyramid.jpg/1280px-Kheops-Pyramid.jpg"
  },
  {
    "id": "abu-simbel",
    "name": "Abu Simbel Temples",
    "visitDate": "Feb 2",
    "rating": 4.8,
    "reviews": "10,000+",
    "address": "Abu Simbel, Aswan Governorate, Egypt",
    "hours": "6am-4pm; Ramadan 7am-3pm",
    "entry": "750 EGP (~£12)",
    "mapUrl": "https://maps.google.com/?q=Abu+Simbel+Temple+Egypt",
    "description": "Two massive rock temples built by Ramses II, carved into a mountainside. Famously relocated by UNESCO in the 1960s to save them from flooding.",
    "region": "aswan",
    "coordinates": [22.3372, 31.6258],
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Abu_Simbel%2C_Ramesses_Temple%2C_front%2C_Egypt%2C_Oct_2004.jpg/1280px-Abu_Simbel%2C_Ramesses_Temple%2C_front%2C_Egypt%2C_Oct_2004.jpg"
  },
  {
    "id": "philae",
    "name": "Philae Temple (Temple of Isis)",
    "visitDate": "Feb 2 (optional)",
    "rating": 4.8,
    "reviews": "8,000+",
    "address": "Agilkia Island, 8km south of Aswan",
    "hours": "7am-4pm",
    "entry": "550 EGP (~£9) + 800 EGP boat (~£13)",
    "mapUrl": "https://maps.google.com/?q=Philae+Temple+Aswan",
    "description": "Beautiful island temple dedicated to goddess Isis. Relocated stone-by-stone by UNESCO after Aswan Dam construction.",
    "region": "aswan",
    "coordinates": [24.0262, 32.8841],
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Philae%2C_seen_from_the_water%2C_Aswan%2C_Egypt%2C_Oct_2004.jpg/1280px-Philae%2C_seen_from_the_water%2C_Aswan%2C_Egypt%2C_Oct_2004.jpg"
  },
  {
    "id": "kom-ombo",
    "name": "Kom Ombo Temple",
    "visitDate": "Feb 3 (en route)",
    "rating": 4.7,
    "reviews": "5,000",
    "address": "Kom Ombo, 45km north of Aswan",
    "hours": "7am-5pm (9pm for night visits)",
    "entry": "~300 EGP (~£5)",
    "mapUrl": "https://maps.google.com/?q=Kom+Ombo+Temple+Egypt",
    "description": "Unique double temple dedicated to Sobek (crocodile god) and Horus. Perfectly symmetrical with two of everything. Includes crocodile museum.",
    "region": "aswan",
    "coordinates": [24.4522, 32.9281],
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Kom_Ombo_Temple_R02.jpg/1280px-Kom_Ombo_Temple_R02.jpg"
  },
  {
    "id": "edfu",
    "name": "Edfu Temple (Temple of Horus)",
    "visitDate": "Feb 3 (en route)",
    "rating": 4.8,
    "reviews": "6,400",
    "address": "West bank of Nile, Edfu",
    "hours": "7am-4pm (Oct-May)",
    "entry": "550 EGP (~£9)",
    "mapUrl": "https://maps.google.com/?q=Edfu+Temple+Egypt",
    "description": "Best-preserved ancient temple in Egypt. Dedicated to Horus, the falcon god. Second largest temple after Karnak.",
    "region": "aswan",
    "coordinates": [24.9781, 32.8734],
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Edfu_Temple_032010_01.jpg/1280px-Edfu_Temple_032010_01.jpg"
  },
  {
    "id": "valley-of-kings",
    "name": "Valley of the Kings",
    "visitDate": "Feb 4",
    "rating": 4.7,
    "reviews": "20,000+",
    "address": "West Bank, Luxor",
    "hours": "6am-4pm (Winter)",
    "entry": "770 EGP (~£12) for 3 tombs; +700 EGP Tutankhamun",
    "mapUrl": "https://maps.google.com/?q=Valley+of+the+Kings+Luxor",
    "description": "Royal burial ground for 500 years. Contains 63 tombs including Tutankhamun. Vivid painted walls depicting the afterlife journey.",
    "region": "luxor",
    "coordinates": [25.7402, 32.6014],
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Valley_of_the_Kings_panorama.jpg/1280px-Valley_of_the_Kings_panorama.jpg"
  },
  {
    "id": "hatshepsut",
    "name": "Mortuary Temple of Hatshepsut",
    "visitDate": "Feb 4",
    "rating": 4.8,
    "reviews": "8,000+",
    "address": "Deir el-Bahari, West Bank, Luxor",
    "hours": "6am-4pm (Winter)",
    "entry": "300 EGP (~£5)",
    "mapUrl": "https://maps.google.com/?q=Hatshepsut+Temple+Luxor",
    "description": "Dramatic three-tiered temple built into cliffs for Egypt's female pharaoh. Unique colonnaded design.",
    "region": "luxor",
    "coordinates": [25.7381, 32.6066],
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/SFEC_EGYPT_HATSHEPSUT_2006-003.JPG/1280px-SFEC_EGYPT_HATSHEPSUT_2006-003.JPG"
  },
  {
    "id": "medinet-habu",
    "name": "Medinet Habu (Temple of Ramses III)",
    "visitDate": "Feb 4",
    "rating": 4.8,
    "reviews": "2,500",
    "address": "West Bank, Luxor",
    "hours": "6am-5pm",
    "entry": "~300 EGP (~£5)",
    "mapUrl": "https://maps.google.com/?q=Medinet+Habu+Luxor",
    "description": "Second largest temple in Egypt with best-preserved colour on reliefs. Often less crowded than Karnak—hidden gem.",
    "region": "luxor",
    "coordinates": [25.7194, 32.6011],
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Medinet_Habu_Ramses_III._Tempel_05.JPG/1280px-Medinet_Habu_Ramses_III._Tempel_05.JPG"
  },
  {
    "id": "karnak",
    "name": "Karnak Temple",
    "visitDate": "Feb 4",
    "rating": 4.8,
    "reviews": "15,000+",
    "address": "East Bank, 3km north of Luxor",
    "hours": "6am-5pm",
    "entry": "600 EGP (~£10)",
    "mapUrl": "https://maps.google.com/?q=Karnak+Temple+Luxor",
    "description": "Largest religious complex ever built. Massive Hypostyle Hall with 134 giant columns. Built over 2,000 years by 30 pharaohs.",
    "region": "luxor",
    "coordinates": [25.7188, 32.6573],
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Karnak_temple_-_panoramio.jpg/1280px-Karnak_temple_-_panoramio.jpg"
  },
  {
    "id": "luxor-temple",
    "name": "Luxor Temple",
    "visitDate": "Feb 3 or 4",
    "rating": 4.8,
    "reviews": "12,000+",
    "address": "East Bank, Luxor city centre",
    "hours": "6am-10pm (illuminated at night)",
    "entry": "450 EGP (~£7)",
    "mapUrl": "https://maps.google.com/?q=Luxor+Temple+Egypt",
    "description": "City centre temple connected to Karnak by Avenue of Sphinxes. Stunning when floodlit at night.",
    "region": "luxor",
    "coordinates": [25.6996, 32.6390],
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Luxor_Temple_R03.jpg/1280px-Luxor_Temple_R03.jpg"
  },
  {
    "id": "dendera",
    "name": "Dendera Temple (Temple of Hathor)",
    "visitDate": "Optional day trip",
    "rating": 4.9,
    "reviews": "3,600",
    "address": "Qena, 60km north of Luxor",
    "hours": "7am-5pm",
    "entry": "~400 EGP (~£6)",
    "mapUrl": "https://maps.google.com/?q=Dendera+Temple+Egypt",
    "description": "Best-preserved temple ceiling in Egypt with famous zodiac. Dedicated to Hathor, goddess of love. Rare rooftop access.",
    "region": "daytrip",
    "coordinates": [26.1418, 32.6700],
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Dendera_Temple_Complex_01.jpg/1280px-Dendera_Temple_Complex_01.jpg"
  },
  {
    "id": "abydos",
    "name": "Temple of Abydos & Osireion",
    "visitDate": "Optional day trip",
    "rating": 4.8,
    "reviews": "470",
    "address": "Abydos, 160km north of Luxor",
    "hours": "8am-5pm",
    "entry": "~300 EGP (~£5)",
    "mapUrl": "https://maps.google.com/?q=Abydos+Temple+Egypt",
    "description": "Sacred burial site of Osiris. Temple of Seti I has finest reliefs in Egypt—still retaining original colours.",
    "region": "daytrip",
    "coordinates": [26.1850, 31.9191],
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Abydos_Tempel_Sethos_I._26.JPG/1280px-Abydos_Tempel_Sethos_I._26.JPG"
  },
  {
    "id": "nubian-village",
    "name": "Nubian Village",
    "visitDate": "Feb 1 or 2",
    "rating": 4.2,
    "reviews": "174",
    "address": "West Bank, Aswan",
    "hours": "Daytime visits",
    "entry": "Free (tips expected)",
    "mapUrl": "https://maps.google.com/?q=Nubian+Village+Aswan",
    "description": "Colourful traditional Nubian community. Painted houses, friendly locals, henna tattoos, crocodile encounters.",
    "region": "aswan",
    "coordinates": [24.0889, 32.8899],
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Nubian_village_on_Elephantine_Island_-_panoramio.jpg/1280px-Nubian_village_on_Elephantine_Island_-_panoramio.jpg"
  }
]
```

**Step 2: Commit**

```bash
git add data/temples.json
git commit -m "Add temples data with coordinates and Wikimedia images

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Task 6: Create Restaurants and Hotels Data

**Files:**
- Create: `data/restaurants.json`
- Create: `data/hotels.json`

**Step 1: Create restaurants data**

Create `data/restaurants.json`:
```json
{
  "giza": [
    { "name": "9 Pyramids Lounge", "rating": 4.5, "type": "Egyptian", "notes": "On plateau with pyramid views" },
    { "name": "Khufu's", "rating": 4.5, "type": "Upscale Egyptian", "notes": "Pyramid views, reservations needed" },
    { "name": "Marriott Mena House", "rating": 4.5, "type": "Multiple", "notes": "Garden dining with pyramid backdrop" },
    { "name": "El Dar Darak", "rating": 4.5, "price": "E£400-600", "type": "Egyptian", "notes": "Traditional, 20+ years" },
    { "name": "Zeeyara", "rating": 4.5, "type": "Egyptian", "notes": "Rooftop, camel meatballs" },
    { "name": "Zaman Restaurant", "rating": 4.9, "reviews": 370, "price": "E£200-400", "type": "Arab/Grills" },
    { "name": "Boom Restaurant", "rating": 4.9, "reviews": 453, "price": "E£200-400", "type": "General" },
    { "name": "Farsha Pyramids Cafe", "rating": 4.8, "reviews": 422, "price": "E£400-600", "type": "Pyramid views" },
    { "name": "Royal Lotus Restaurant", "rating": 4.8, "reviews": 159, "price": "E£200-400", "type": "Family" },
    { "name": "Pyramids Cave Lounge", "rating": 4.8, "reviews": 232, "price": "E£400-600", "type": "Lounge" }
  ],
  "aswan": [
    { "name": "Bob Marley Moonlight Terrace", "rating": 4.8, "type": "Egyptian", "notes": "Best on Elephantine, tagines & koftas" },
    { "name": "Nubian Dreams Restaurant", "rating": 4.5, "type": "Egyptian/Nubian", "notes": "Stunning Nile views" },
    { "name": "Basmatic Nubian Restaurant", "rating": 4.5, "type": "Nubian", "notes": "Rooftop terrace" },
    { "name": "King Jamaica Restaurant", "rating": 4.5, "type": "Mixed", "notes": "Free ferry from mainland" },
    { "name": "Mövenpick Panoramic Restaurant", "rating": 4.5, "type": "International", "notes": "Tower restaurant" }
  ],
  "luxor": [
    { "name": "Sofra Restaurant", "rating": 4.8, "type": "Egyptian", "notes": "1930s house, cooking lessons" },
    { "name": "Al Sahaby Lane Restaurant", "rating": 4.7, "type": "Egyptian", "notes": "Rooftop, temple views" },
    { "name": "Restaurant El-Kababgy", "rating": 4.6, "type": "Egyptian", "notes": "Nile views, live guitar" },
    { "name": "The Lantern Room", "rating": 4.7, "type": "British/Egyptian", "notes": "Cozy, large portions" },
    { "name": "1886 Restaurant", "rating": 4.8, "type": "Fine Dining", "notes": "Winter Palace, formal" }
  ],
  "soma-bay": [
    { "name": "SOBAR Somabay", "rating": 4.5, "type": "Casual", "notes": "Marina views, great carrot cake" },
    { "name": "Maya Beach Restaurant", "rating": 4.5, "type": "Beach", "notes": "Steigenberger Ras Soma" },
    { "name": "Arabesque", "rating": 4.6, "type": "Lebanese", "notes": "Highly rated" },
    { "name": "Sheraton Soma Bay", "rating": 4.5, "type": "Multiple", "notes": "Italian, seafood, Asian" },
    { "name": "Kempinski Hotel Soma Bay", "rating": 4.7, "type": "Fine Dining", "notes": "Best in Soma Bay" }
  ],
  "hurghada": [
    { "name": "Mafia Pizzeria & Cafe", "rating": 4.8, "type": "Pizza", "notes": "Best pizza, stone oven, Siva Mall" },
    { "name": "Thai Garden", "rating": 4.7, "type": "Thai", "notes": "Authentic, next to Mafia" },
    { "name": "Mandarine Lebanese", "rating": 4.6, "type": "Lebanese", "notes": "At Siva Mall" },
    { "name": "Mainzer Restaurant & Cafe", "rating": 4.5, "type": "Egyptian", "notes": "Promenade location" },
    { "name": "Old School Bar & Restaurant", "rating": 4.6, "type": "Izakaya", "notes": "Modern ambiance" }
  ]
}
```

**Step 2: Create hotels data**

Create `data/hotels.json`:
```json
[
  {
    "name": "Great Pyramid Inn",
    "location": "Giza",
    "dates": "Jan 30 - Feb 1",
    "address": "14 Abou Al Hool Al Seiahi, Pyramids Plateau, Giza",
    "phone": "+201069987118",
    "coordinates": [29.9753, 31.1376]
  },
  {
    "name": "Kana Kato",
    "location": "Aswan",
    "dates": "Feb 1 - Feb 3",
    "address": "Elephantine Island, Aswan",
    "coordinates": [24.0850, 32.8870]
  },
  {
    "name": "Steigenberger Resort Achti",
    "location": "Luxor",
    "dates": "Feb 3 - Feb 5",
    "address": "Al Awameya, East Bank, Luxor",
    "phone": "+20952274544",
    "coordinates": [25.6970, 32.6450]
  },
  {
    "name": "Sharm El Naga Resort",
    "location": "Soma Bay",
    "dates": "Feb 5 - Feb 6",
    "address": "Soma Bay, Hurghada",
    "coordinates": [26.8500, 33.9700]
  },
  {
    "name": "Iberotel Casa Del Mar",
    "location": "Hurghada",
    "dates": "Feb 6 - Feb 8",
    "address": "Touristic Promenade, Hurghada",
    "phone": "+20 65 3465243",
    "coordinates": [27.2579, 33.8116]
  }
]
```

**Step 3: Commit**

```bash
git add data/restaurants.json data/hotels.json
git commit -m "Add restaurants and hotels data

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Task 7: Create Layout with Navigation

**Files:**
- Modify: `app/layout.tsx`
- Create: `components/Navigation.tsx`

**Step 1: Create Navigation component**

Create `components/Navigation.tsx`:
```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, Landmark, Map, Utensils } from "lucide-react";

const navItems = [
  { href: "/", label: "Itinerary", icon: Calendar },
  { href: "/temples", label: "Temples", icon: Landmark },
  { href: "/map", label: "Map", icon: Map },
  { href: "/restaurants", label: "Restaurants", icon: Utensils },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop nav */}
      <nav className="hidden md:flex bg-navy text-cream p-4 items-center justify-between">
        <h1 className="text-xl font-bold text-gold">Egypt Jan-Feb 2026</h1>
        <div className="flex gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 hover:text-gold transition-colors ${
                pathname === item.href ? "text-gold" : ""
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-navy text-cream p-2 flex justify-around z-50">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 p-2 ${
              pathname === item.href ? "text-gold" : ""
            }`}
          >
            <item.icon size={24} />
            <span className="text-xs">{item.label}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}
```

**Step 2: Install lucide-react icons**

Run: `npm install lucide-react`

**Step 3: Update layout.tsx**

Replace `app/layout.tsx`:
```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Egypt Trip 2026",
  description: "Lynn & Romilly's Egypt adventure - Jan 30 to Feb 8, 2026",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <main className="pb-20 md:pb-0">{children}</main>
      </body>
    </html>
  );
}
```

**Step 4: Commit**

```bash
git add components/Navigation.tsx app/layout.tsx package.json package-lock.json
git commit -m "Add responsive navigation with mobile bottom bar

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Task 8: Build Itinerary Page

**Files:**
- Modify: `app/page.tsx`
- Create: `components/DayCard.tsx`

**Step 1: Create DayCard component**

Create `components/DayCard.tsx`:
```tsx
"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, MapPin, Hotel } from "lucide-react";
import { Day } from "@/types";

interface DayCardProps {
  day: Day;
  isToday: boolean;
}

export default function DayCard({ day, isToday }: DayCardProps) {
  const [expanded, setExpanded] = useState(isToday);

  const date = new Date(day.date);
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });

  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden ${
        isToday ? "ring-2 ring-gold" : ""
      }`}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-4">
          <div
            className={`w-14 h-14 rounded-lg flex flex-col items-center justify-center ${
              isToday ? "bg-gold text-navy" : "bg-navy text-cream"
            }`}
          >
            <span className="text-xs">{day.dayOfWeek.slice(0, 3)}</span>
            <span className="text-lg font-bold">{formattedDate.split(" ")[0]}</span>
          </div>
          <div>
            <h3 className="font-semibold text-navy">{day.location}</h3>
            {day.hotel && (
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <Hotel size={14} />
                {day.hotel}
              </p>
            )}
          </div>
        </div>
        {expanded ? <ChevronUp /> : <ChevronDown />}
      </button>

      {expanded && (
        <div className="px-4 pb-4 border-t border-gray-100">
          <ul className="mt-3 space-y-2">
            {day.activities.map((activity, idx) => (
              <li key={idx} className="flex gap-3 text-sm">
                <span className="text-gold font-medium min-w-[80px]">
                  {activity.time}
                </span>
                <span>{activity.description}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
```

**Step 2: Update home page**

Replace `app/page.tsx`:
```tsx
import DayCard from "@/components/DayCard";
import itineraryData from "@/data/itinerary.json";
import { Day } from "@/types";

export default function Home() {
  const itinerary: Day[] = itineraryData;
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="max-w-2xl mx-auto p-4">
      <header className="mb-6 md:hidden">
        <h1 className="text-2xl font-bold text-navy">Egypt Trip 2026</h1>
        <p className="text-gray-600">Jan 30 - Feb 8</p>
      </header>

      <div className="space-y-4">
        {itinerary.map((day) => (
          <DayCard
            key={day.date}
            day={day}
            isToday={day.date === today}
          />
        ))}
      </div>
    </div>
  );
}
```

**Step 3: Verify dev server works**

Run: `npm run dev`
Visit http://localhost:3000 - should see itinerary

**Step 4: Commit**

```bash
git add app/page.tsx components/DayCard.tsx
git commit -m "Add itinerary page with expandable day cards

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Task 9: Build Temples Page

**Files:**
- Create: `app/temples/page.tsx`
- Create: `components/TempleCard.tsx`

**Step 1: Create TempleCard component**

Create `components/TempleCard.tsx`:
```tsx
"use client";

import { useState } from "react";
import { Star, Clock, Ticket, MapPin, ExternalLink } from "lucide-react";
import { Temple } from "@/types";
import Image from "next/image";

interface TempleCardProps {
  temple: Temple;
}

export default function TempleCard({ temple }: TempleCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div
        className="relative h-48 bg-gray-200 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        {!imageError ? (
          <Image
            src={temple.imageUrl}
            alt={temple.name}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-navy/10">
            <span className="text-gray-500">Image unavailable</span>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <h3 className="text-white font-semibold">{temple.name}</h3>
          <div className="flex items-center gap-2 text-white/90 text-sm">
            <Star size={14} className="fill-gold text-gold" />
            <span>{temple.rating}</span>
            <span className="text-white/70">({temple.reviews})</span>
          </div>
        </div>
      </div>

      <div className="p-3">
        <p className="text-sm text-gold font-medium">{temple.visitDate}</p>

        {expanded && (
          <div className="mt-3 space-y-3 text-sm">
            <p className="text-gray-700">{temple.description}</p>

            <div className="space-y-2 text-gray-600">
              <p className="flex items-center gap-2">
                <Clock size={16} className="text-gold" />
                {temple.hours}
              </p>
              <p className="flex items-center gap-2">
                <Ticket size={16} className="text-gold" />
                {temple.entry}
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={16} className="text-gold" />
                {temple.address}
              </p>
            </div>

            <a
              href={temple.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-gold hover:text-gold-dark"
            >
              Open in Google Maps <ExternalLink size={14} />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
```

**Step 2: Create temples page**

Create `app/temples/page.tsx`:
```tsx
"use client";

import { useState } from "react";
import TempleCard from "@/components/TempleCard";
import templesData from "@/data/temples.json";
import { Temple } from "@/types";

const filters = [
  { id: "all", label: "All" },
  { id: "giza", label: "Giza" },
  { id: "aswan", label: "Aswan" },
  { id: "luxor", label: "Luxor" },
  { id: "daytrip", label: "Day Trips" },
];

export default function TemplesPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const temples: Temple[] = templesData as Temple[];

  const filteredTemples =
    activeFilter === "all"
      ? temples
      : temples.filter((t) => t.region === activeFilter);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-navy mb-4 md:hidden">Temples</h1>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
              activeFilter === filter.id
                ? "bg-gold text-navy"
                : "bg-white text-navy border border-gray-200"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemples.map((temple) => (
          <TempleCard key={temple.id} temple={temple} />
        ))}
      </div>
    </div>
  );
}
```

**Step 3: Update next.config.js for external images**

Replace `next.config.ts` (or `next.config.js`):
```typescript
import type { NextConfig } from "next";

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

export default nextConfig;
```

**Step 4: Verify temples page works**

Visit http://localhost:3000/temples

**Step 5: Commit**

```bash
git add app/temples/page.tsx components/TempleCard.tsx next.config.ts
git commit -m "Add temples page with filterable grid and Wikimedia images

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Task 10: Build Map Page

**Files:**
- Create: `app/map/page.tsx`
- Create: `components/MapView.tsx`

**Step 1: Install Leaflet dependencies**

Run: `npm install leaflet react-leaflet && npm install -D @types/leaflet`

**Step 2: Create MapView component**

Create `components/MapView.tsx`:
```tsx
"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Temple, Hotel } from "@/types";

// Fix for default marker icons in Next.js
const templeIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const hotelIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

interface MapViewProps {
  temples: Temple[];
  hotels: Hotel[];
}

export default function MapView({ temples, hotels }: MapViewProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-[calc(100vh-120px)] bg-gray-200 flex items-center justify-center">
        Loading map...
      </div>
    );
  }

  // Route coordinates (hotels in order)
  const routeCoordinates: [number, number][] = hotels.map((h) => h.coordinates);

  return (
    <MapContainer
      center={[26.0, 32.5]}
      zoom={6}
      className="w-full h-[calc(100vh-120px)] md:h-[calc(100vh-64px)]"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Route line */}
      <Polyline
        positions={routeCoordinates}
        color="#C9A227"
        weight={3}
        dashArray="10, 10"
      />

      {/* Hotel markers */}
      {hotels.map((hotel) => (
        <Marker key={hotel.name} position={hotel.coordinates} icon={hotelIcon}>
          <Popup>
            <div className="text-sm">
              <h3 className="font-bold">{hotel.name}</h3>
              <p className="text-gray-600">{hotel.dates}</p>
              <p className="text-gray-600">{hotel.location}</p>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Temple markers */}
      {temples.map((temple) => (
        <Marker key={temple.id} position={temple.coordinates} icon={templeIcon}>
          <Popup>
            <div className="text-sm">
              <h3 className="font-bold">{temple.name}</h3>
              <p className="text-gold">{temple.visitDate}</p>
              <p className="text-gray-600">{temple.entry}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
```

**Step 3: Create map page**

Create `app/map/page.tsx`:
```tsx
import dynamic from "next/dynamic";
import templesData from "@/data/temples.json";
import hotelsData from "@/data/hotels.json";
import { Temple, Hotel } from "@/types";

const MapView = dynamic(() => import("@/components/MapView"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[calc(100vh-120px)] bg-gray-200 flex items-center justify-center">
      Loading map...
    </div>
  ),
});

export default function MapPage() {
  const temples: Temple[] = templesData as Temple[];
  const hotels: Hotel[] = hotelsData as Hotel[];

  return (
    <div>
      <div className="md:hidden p-4 bg-white border-b">
        <h1 className="text-xl font-bold text-navy">Journey Map</h1>
        <p className="text-sm text-gray-600">
          <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-1"></span> Hotels
          <span className="inline-block w-3 h-3 bg-gold rounded-full ml-3 mr-1"></span> Temples
        </p>
      </div>
      <MapView temples={temples} hotels={hotels} />
    </div>
  );
}
```

**Step 4: Verify map page works**

Visit http://localhost:3000/map

**Step 5: Commit**

```bash
git add app/map/page.tsx components/MapView.tsx package.json package-lock.json
git commit -m "Add interactive map page with Leaflet and route visualization

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Task 11: Build Restaurants Page

**Files:**
- Create: `app/restaurants/page.tsx`
- Create: `components/RestaurantList.tsx`

**Step 1: Create RestaurantList component**

Create `components/RestaurantList.tsx`:
```tsx
import { Star, ExternalLink } from "lucide-react";

interface Restaurant {
  name: string;
  rating: number;
  reviews?: number;
  price?: string;
  type: string;
  notes?: string;
}

interface RestaurantListProps {
  restaurants: Restaurant[];
  location: string;
}

export default function RestaurantList({ restaurants, location }: RestaurantListProps) {
  return (
    <div className="space-y-3">
      {restaurants.map((restaurant) => (
        <div
          key={restaurant.name}
          className="bg-white rounded-lg p-4 shadow-sm"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-navy">{restaurant.name}</h3>
              <p className="text-sm text-gray-600">{restaurant.type}</p>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Star size={14} className="fill-gold text-gold" />
              <span>{restaurant.rating}</span>
              {restaurant.reviews && (
                <span className="text-gray-400">({restaurant.reviews})</span>
              )}
            </div>
          </div>

          <div className="mt-2 flex items-center justify-between text-sm">
            <div className="flex gap-3">
              {restaurant.price && (
                <span className="text-gray-600">{restaurant.price}</span>
              )}
              {restaurant.notes && (
                <span className="text-gray-500 italic">{restaurant.notes}</span>
              )}
            </div>
            <a
              href={`https://www.google.com/maps/search/${encodeURIComponent(
                restaurant.name + " " + location + " Egypt"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-gold-dark flex items-center gap-1"
            >
              Map <ExternalLink size={12} />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
```

**Step 2: Create restaurants page**

Create `app/restaurants/page.tsx`:
```tsx
"use client";

import { useState } from "react";
import RestaurantList from "@/components/RestaurantList";
import restaurantsData from "@/data/restaurants.json";
import hotelsData from "@/data/hotels.json";
import { Hotel } from "lucide-react";

const locations = [
  { id: "giza", label: "Giza/Cairo", hotelIdx: 0 },
  { id: "aswan", label: "Aswan", hotelIdx: 1 },
  { id: "luxor", label: "Luxor", hotelIdx: 2 },
  { id: "soma-bay", label: "Soma Bay", hotelIdx: 3 },
  { id: "hurghada", label: "Hurghada", hotelIdx: 4 },
];

export default function RestaurantsPage() {
  const [activeLocation, setActiveLocation] = useState("giza");

  const restaurants = restaurantsData[activeLocation as keyof typeof restaurantsData] || [];
  const locationInfo = locations.find((l) => l.id === activeLocation);
  const hotel = hotelsData[locationInfo?.hotelIdx ?? 0];

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-navy mb-4 md:hidden">Restaurants</h1>

      {/* Location tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
        {locations.map((loc) => (
          <button
            key={loc.id}
            onClick={() => setActiveLocation(loc.id)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
              activeLocation === loc.id
                ? "bg-gold text-navy"
                : "bg-white text-navy border border-gray-200"
            }`}
          >
            {loc.label}
          </button>
        ))}
      </div>

      {/* Hotel info */}
      {hotel && (
        <div className="bg-navy/5 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2 text-navy">
            <Hotel size={18} />
            <span className="font-medium">Your hotel: {hotel.name}</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">{hotel.dates}</p>
        </div>
      )}

      {/* Restaurant list */}
      <RestaurantList
        restaurants={restaurants}
        location={locationInfo?.label || "Egypt"}
      />
    </div>
  );
}
```

**Step 3: Verify restaurants page works**

Visit http://localhost:3000/restaurants

**Step 4: Commit**

```bash
git add app/restaurants/page.tsx components/RestaurantList.tsx
git commit -m "Add restaurants page with location tabs and Google Maps links

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Task 12: Build and Test Production Build

**Step 1: Run production build**

Run: `npm run build`
Expected: Build succeeds with no errors

**Step 2: Test production build locally**

Run: `npm run start`
Visit http://localhost:3000 and test all pages

**Step 3: Commit any fixes if needed**

If build fails, fix issues and commit.

---

## Task 13: Deploy to Vercel

**Step 1: Install Vercel CLI**

Run: `npm install -g vercel`

**Step 2: Login to Vercel**

Run: `vercel login`
Follow prompts to authenticate

**Step 3: Deploy**

Run: `vercel --prod`

When prompted:
- Set up and deploy: Y
- Which scope: Select your account
- Link to existing project: N
- Project name: egypt-trip-2026 (or accept default)
- Directory: ./
- Override settings: N

**Step 4: Note the deployment URL**

Expected output includes: `Production: https://egypt-trip-2026.vercel.app` (or similar)

**Step 5: Add .vercel to gitignore and commit**

```bash
echo ".vercel" >> .gitignore
git add .gitignore
git commit -m "Add .vercel to gitignore

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Summary

After completing all tasks you will have:

1. A Next.js 14 app with TypeScript and Tailwind CSS
2. Four pages: Itinerary, Temples, Map, Restaurants
3. Mobile-first responsive design with bottom navigation
4. Interactive Leaflet map showing your journey
5. Temple photos from Wikimedia Commons
6. Deployed to Vercel

Total commits: ~12
