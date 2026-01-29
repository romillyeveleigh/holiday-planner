#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const API_KEY = process.env.GOOGLE_PLACES_API_KEY;

if (!API_KEY) {
  console.error("Error: Set GOOGLE_PLACES_API_KEY environment variable");
  console.error("Usage: GOOGLE_PLACES_API_KEY=your_key node scripts/fetch-restaurant-coords.js");
  process.exit(1);
}

const RESTAURANTS_PATH = path.join(__dirname, "../data/restaurants.json");

async function searchPlace(name, city) {
  const query = encodeURIComponent(`${name} ${city} Egypt restaurant`);
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${API_KEY}`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.status === "OK" && data.results.length > 0) {
    const place = data.results[0];
    return {
      lat: place.geometry.location.lat,
      lng: place.geometry.location.lng,
      formattedAddress: place.formatted_address,
      placeId: place.place_id,
    };
  }
  return null;
}

async function main() {
  const restaurants = JSON.parse(fs.readFileSync(RESTAURANTS_PATH, "utf-8"));

  let updated = 0;
  let notFound = [];

  for (const [city, list] of Object.entries(restaurants)) {
    console.log(`\n📍 Processing ${city}...`);

    for (const restaurant of list) {
      if (restaurant.coordinates) {
        console.log(`  ✓ ${restaurant.name} (already has coordinates)`);
        continue;
      }

      const result = await searchPlace(restaurant.name, city);

      if (result) {
        restaurant.coordinates = [result.lat, result.lng];
        console.log(`  ✓ ${restaurant.name} → [${result.lat}, ${result.lng}]`);
        updated++;
      } else {
        console.log(`  ✗ ${restaurant.name} (not found)`);
        notFound.push({ city, name: restaurant.name });
      }

      // Rate limit: 100ms between requests
      await new Promise((r) => setTimeout(r, 100));
    }
  }

  fs.writeFileSync(RESTAURANTS_PATH, JSON.stringify(restaurants, null, 2) + "\n");

  console.log(`\n✅ Done! Updated ${updated} restaurants.`);
  if (notFound.length > 0) {
    console.log(`\n⚠️  Not found (${notFound.length}):`);
    notFound.forEach((r) => console.log(`   - ${r.name} (${r.city})`));
  }
}

main().catch(console.error);
