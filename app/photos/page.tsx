"use client";

import { useState } from "react";
import photosData from "@/data/photos.json";
import { Clock, ExternalLink, Camera, Lightbulb } from "lucide-react";

const locations = [
  { id: "giza", label: "Giza/Cairo" },
  { id: "aswan", label: "Aswan" },
  { id: "luxor", label: "Luxor" },
  { id: "hurghada", label: "Hurghada" },
];

export default function PhotosPage() {
  const [activeLocation, setActiveLocation] = useState("giza");

  const locationData = photosData[activeLocation as keyof typeof photosData] as {
    label: string;
    dates: string;
    shots: Array<{
      name: string;
      bestTime: string;
      tips: string;
      image: string;
    }>;
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Location tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
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

      {/* Location header */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate">{locationData.label}</h2>
        <p className="text-sm text-slate-light/70">{locationData.dates}</p>
      </div>

      {/* Photo shots grid */}
      <div className="grid gap-3 mb-8">
        {locationData.shots.map((shot, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-slate/10 shadow-sm p-4"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-medium text-slate flex items-center gap-2">
                <Camera size={16} className="text-teal" />
                {shot.name}
              </h3>
              <a
                href={`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(shot.name + ' Egypt')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-teal hover:text-teal-dark flex items-center gap-1 shrink-0"
              >
                pics
                <ExternalLink size={12} />
              </a>
            </div>
            <div className="flex flex-wrap gap-4 text-sm">
              <span className="flex items-center gap-1 text-slate-light/70">
                <Clock size={14} />
                {shot.bestTime}
              </span>
              <span className="flex items-center gap-1 text-slate-light">
                <Lightbulb size={14} className="text-teal" />
                {shot.tips}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Pro Tips */}
      <section className="bg-slate/5 rounded-xl p-4">
        <h2 className="font-semibold text-slate mb-3 flex items-center gap-2">
          <Camera size={18} />
          Pro Tips for Egypt Photos
        </h2>
        <ul className="text-sm text-slate-light space-y-2">
          {photosData.proTips.map((tip, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-teal font-bold">•</span>
              {tip}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
