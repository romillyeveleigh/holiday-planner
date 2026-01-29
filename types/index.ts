export interface Activity {
  time: string;
  description: string;
}

export interface Day {
  date: string;
  dayOfWeek: string;
  location: string;
  hotel?: string;
  activities: Activity[];
}

export interface Temple {
  id: string;
  name: string;
  visitDate: string;
  rating: number;
  reviews: string;
  address: string;
  hours: string;
  entry: string;
  mapUrl: string;
  description: string;
  region: "giza" | "aswan" | "luxor" | "daytrip";
  coordinates: [number, number];
  imageUrl: string;
}

export interface Restaurant {
  name: string;
  rating: number;
  reviews?: number;
  price?: string;
  type: string;
  notes?: string;
}

export interface Hotel {
  name: string;
  location: string;
  dates: string;
  address: string;
  phone?: string;
  coordinates: [number, number];
}
