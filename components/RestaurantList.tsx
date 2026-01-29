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
          className="bg-white rounded-lg p-4 shadow-sm"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-navy">{restaurant.name}</h3>
              <p className="text-sm text-gray-600">{restaurant.type}</p>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Star size={14} className="fill-gold text-gold" />
              <span>{restaurant.rating}</span>
              {restaurant.reviews && (
                <span className="text-gray-400">({restaurant.reviews})</span>
              )}
            </div>
          </div>

          <div className="mt-2 flex items-center justify-between text-sm">
            <div className="flex gap-3">
              {restaurant.price && (
                <span className="text-gray-600">{restaurant.price}</span>
              )}
              {restaurant.notes && (
                <span className="text-gray-500 italic">{restaurant.notes}</span>
              )}
            </div>
            <a
              href={`https://www.google.com/maps/search/${encodeURIComponent(
                restaurant.name + " " + location + " Egypt"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-gold-dark flex items-center gap-1"
            >
              Map <ExternalLink size={12} />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
