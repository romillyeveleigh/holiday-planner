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
