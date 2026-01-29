import DayCard from "@/components/DayCard";
import itineraryData from "@/data/itinerary.json";
import { Day } from "@/types";

export default function Home() {
  const itinerary: Day[] = itineraryData;
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="space-y-4">
        {itinerary.map((day) => (
          <DayCard
            key={day.date}
            day={day}
            isToday={day.date === today}
          />
        ))}
      </div>
    </div>
  );
}
