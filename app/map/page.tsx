"use client";

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
