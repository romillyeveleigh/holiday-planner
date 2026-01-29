"use client";

import { useState } from "react";
import activitiesData from "@/data/activities.json";
import { Clock, PoundSterling, MapPin, CalendarClock } from "lucide-react";

const locations = [
  { id: "giza", label: "Giza/Cairo" },
  { id: "aswan", label: "Aswan" },
  { id: "luxor", label: "Luxor" },
  { id: "hurghada", label: "Hurghada" },
];

export default function ActivitiesPage() {
  const [activeLocation, setActiveLocation] = useState("giza");

  const data = activitiesData[activeLocation as keyof typeof activitiesData];

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

      {/* Excursion Costs */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-slate mb-3">Excursion Costs</h2>
        <div className="bg-white rounded-2xl border border-slate/10 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate/5">
                <tr>
                  <th className="text-left p-3 font-medium text-slate">Site / Activity</th>
                  <th className="text-right p-3 font-medium text-slate whitespace-nowrap">EGP</th>
                  <th className="text-right p-3 font-medium text-slate whitespace-nowrap">£ GBP</th>
                </tr>
              </thead>
              <tbody>
                {data.costs.map((cost, idx) => (
                  <tr key={idx} className="border-t border-slate/5">
                    <td className="p-3 text-slate-light">{cost.site}</td>
                    <td className="p-3 text-right text-slate-light/70 whitespace-nowrap">
                      {cost.egp === "-" ? "—" : cost.egp}
                    </td>
                    <td className="p-3 text-right text-slate-light/70 whitespace-nowrap">
                      ~£{cost.gbp}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-light/60 p-3 bg-slate/5 border-t border-slate/5">
            Card payment only at most sites. Prices approximate as of 2025/2026.
          </p>
        </div>
      </section>

      {/* Things to Do */}
      <section>
        <h2 className="text-lg font-semibold text-slate mb-3">Things to Do</h2>
        <div className="grid gap-3">
          {data.activities.map((activity, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate/10 shadow-sm p-4"
            >
              <h3 className="font-medium text-slate mb-1">{activity.name}</h3>
              <p className="text-sm text-slate-light/70 mb-3">{activity.description}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="flex items-center gap-1 text-slate-light/70">
                  <PoundSterling size={14} />
                  {activity.cost}
                </span>
                <span className="flex items-center gap-1 text-slate-light/70">
                  <Clock size={14} />
                  {activity.duration}
                </span>
                {"hours" in activity && activity.hours && (
                  <span className="flex items-center gap-1 text-slate-light/70">
                    <CalendarClock size={14} />
                    {activity.hours as string}
                  </span>
                )}
                {"mapUrl" in activity && activity.mapUrl && (
                  <a
                    href={activity.mapUrl as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-teal hover:text-teal-dark"
                  >
                    <MapPin size={14} />
                    Map
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
