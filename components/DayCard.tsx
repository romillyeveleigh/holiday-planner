"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Hotel } from "lucide-react";
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
      className={`bg-white rounded-2xl overflow-hidden border transition-shadow hover:shadow-md ${
        isToday ? "ring-2 ring-teal border-teal/20 shadow-md" : "border-slate/10 shadow-sm"
      }`}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-4">
          <div
            className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center ${
              isToday ? "bg-teal text-white" : "bg-slate text-white"
            }`}
          >
            <span className="text-[10px] font-medium uppercase tracking-wide opacity-80">{day.dayOfWeek.slice(0, 3)}</span>
            <span className="text-lg font-bold">{formattedDate.split(" ")[0]}</span>
          </div>
          <div>
            <h3 className="font-semibold text-slate">{day.location}</h3>
            {day.hotel && (
              <p className="text-sm text-slate-light/70 flex items-center gap-1">
                <Hotel size={14} />
                {day.hotel}
              </p>
            )}
          </div>
        </div>
        <ChevronDown className={`text-slate-light/50 transition-transform ${expanded ? "rotate-180" : ""}`} size={20} />
      </button>

      {expanded && (
        <div className="px-4 pb-4 border-t border-slate/5">
          <ul className="mt-4 space-y-3">
            {day.activities.map((activity, idx) => (
              <li key={idx} className="flex gap-3 text-sm">
                <span className="text-teal font-medium min-w-[80px]">
                  {activity.time}
                </span>
                <span className="text-slate-light">{activity.description}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
