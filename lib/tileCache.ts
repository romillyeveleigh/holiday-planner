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
