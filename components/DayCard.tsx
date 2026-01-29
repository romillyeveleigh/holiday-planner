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
      className={`bg-white rounded-lg shadow-md overflow-hidden ${
        isToday ? "ring-2 ring-gold" : ""
      }`}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-4">
          <div
            className={`w-14 h-14 rounded-lg flex flex-col items-center justify-center ${
              isToday ? "bg-gold text-navy" : "bg-navy text-cream"
            }`}
          >
            <span className="text-xs">{day.dayOfWeek.slice(0, 3)}</span>
            <span className="text-lg font-bold">{formattedDate.split(" ")[0]}</span>
          </div>
          <div>
            <h3 className="font-semibold text-navy">{day.location}</h3>
            {day.hotel && (
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <Hotel size={14} />
                {day.hotel}
              </p>
            )}
          </div>
        </div>
        {expanded ? <ChevronUp /> : <ChevronDown />}
      </button>

      {expanded && (
        <div className="px-4 pb-4 border-t border-gray-100">
          <ul className="mt-3 space-y-2">
            {day.activities.map((activity, idx) => (
              <li key={idx} className="flex gap-3 text-sm">
                <span className="text-gold font-medium min-w-[80px]">
                  {activity.time}
                </span>
                <span>{activity.description}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
