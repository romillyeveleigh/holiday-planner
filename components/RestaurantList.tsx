import { Star, ExternalLink } from "lucide-react";

interface Restaurant {
  name: string;
  rating: number;
  reviews?: number;
  price?: string;
  type: string;
  notes?: string;
}

interface RestaurantListProps {
  restaurants: Restaurant[];
  location: string;
}

export default function RestaurantList({ restaurants, location }: RestaurantListProps) {
  return (
    <div className="space-y-3">
      {restaurants.map((restaurant) => (
        <div
          key={restaurant.name}
          className="bg-white rounded-2xl p-4 border border-slate/10 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-slate">{restaurant.name}</h3>
              <p className="text-sm text-slate-light/70">{restaurant.type}</p>
            </div>
            <div className="flex items-center gap-1 text-sm bg-amber-50 px-2 py-1 rounded-full">
              <Star size={14} className="fill-amber-400 text-amber-400" />
              <span className="font-medium text-amber-700">{restaurant.rating}</span>
              {restaurant.reviews && (
                <span className="text-amber-600/70">({restaurant.reviews})</span>
              )}
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-sm">
            <div className="flex gap-3">
              {restaurant.price && (
                <span className="text-slate-light/70">{restaurant.price}</span>
              )}
              {restaurant.notes && (
                <span className="text-slate-light/60 italic">{restaurant.notes}</span>
              )}
            </div>
            <a
              href={`https://www.google.com/maps/search/${encodeURIComponent(
                restaurant.name + " " + location + " Egypt"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal hover:text-teal-dark font-medium flex items-center gap-1"
            >
              Map <ExternalLink size={12} />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
