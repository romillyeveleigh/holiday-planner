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
      {/* Location tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
        {locations.map((loc) => (
          <button
            key={loc.id}
            onClick={() => setActiveLocation(loc.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeLocation === loc.id
                ? "bg-teal text-white"
                : "bg-white text-slate border border-slate/10 hover:border-slate/20"
            }`}
          >
            {loc.label}
          </button>
        ))}
      </div>

      {/* Hotel info */}
      {hotel && (
        <div className="bg-slate/5 rounded-xl p-4 mb-4">
          <div className="flex items-center gap-2 text-slate">
            <Hotel size={18} />
            <span className="font-medium">Your hotel: {hotel.name}</span>
          </div>
          <p className="text-sm text-slate-light/70 mt-1">{hotel.dates}</p>
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
