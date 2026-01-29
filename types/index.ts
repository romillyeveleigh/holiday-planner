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
  summary?: string;
  tips?: string[];
  notes?: string;
}

export interface Temple {
  id: string;
  name: string;
  visitDate: string;
  built?: string;
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
  images?: string[];
  highlights?: string[];
  tips?: string[];
  bestTime?: string;
  wikipedia?: string;
  officialUrl?: string;
}

export interface Restaurant {
  name: string;
  rating: number;
  reviews?: number;
  price?: string;
  type: string;
  notes?: string;
  coordinates?: [number, number];
}

export interface Hotel {
  name: string;
  location: string;
  dates: string;
  address: string;
  phone?: string;
  confirmation?: string;
  pin?: string;
  room?: string;
  checkIn?: string;
  checkOut?: string;
  price?: string;
  payment?: string;
  cancellation?: string;
  specialRequest?: string;
  coordinates: [number, number];
}
