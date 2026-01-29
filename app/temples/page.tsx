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
