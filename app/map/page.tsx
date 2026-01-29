"use client";

import dynamic from "next/dynamic";
import templesData from "@/data/temples.json";
import hotelsData from "@/data/hotels.json";
import restaurantsData from "@/data/restaurants.json";
import { Temple, Hotel, Restaurant } from "@/types";

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

  // Flatten restaurants from grouped structure
  const restaurants: Restaurant[] = Object.values(restaurantsData).flat() as Restaurant[];

  return (
    <div>
      <div className="p-3 bg-white border-b border-slate/10 flex items-center gap-4 text-sm">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 bg-blue-500 rounded-full"></span> Hotels
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 bg-teal rounded-full"></span> Temples
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 bg-red-500 rounded-full"></span> Food
        </span>
      </div>
      <MapView temples={temples} hotels={hotels} restaurants={restaurants} />
    </div>
  );
}
