"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Temple, Hotel, Restaurant } from "@/types";

const templeIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const hotelIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const restaurantIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

interface MapViewProps {
  temples: Temple[];
  hotels: Hotel[];
  restaurants: Restaurant[];
}

export default function MapView({ temples, hotels, restaurants }: MapViewProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full bg-slate/5 flex items-center justify-center text-slate-light">
        Loading map...
      </div>
    );
  }

  const routeCoordinates: [number, number][] = hotels.map((h) => h.coordinates);

  return (
    <MapContainer
      center={[26.0, 32.5]}
      zoom={6}
      className="w-full h-full"
    >
      <TileLayer
        attribution='Tiles &copy; Esri'
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
      />

      <Polyline
        positions={routeCoordinates}
        color="#0D9488"
        weight={3}
        dashArray="10, 10"
      />

      {hotels.map((hotel) => (
        <Marker key={hotel.name} position={hotel.coordinates} icon={hotelIcon}>
          <Popup>
            <div className="text-sm">
              <h3 className="font-bold">{hotel.name}</h3>
              <p className="text-gray-600">{hotel.dates}</p>
              <p className="text-gray-600">{hotel.location}</p>
            </div>
          </Popup>
        </Marker>
      ))}

      {temples.map((temple) => (
        <Marker key={temple.id} position={temple.coordinates} icon={templeIcon}>
          <Popup>
            <div className="text-sm">
              <h3 className="font-bold">{temple.name}</h3>
              <p className="text-teal">{temple.visitDate}</p>
              <p className="text-gray-600">{temple.entry}</p>
            </div>
          </Popup>
        </Marker>
      ))}

      {restaurants.filter(r => r.coordinates).map((restaurant, idx) => (
        <Marker key={`restaurant-${idx}`} position={restaurant.coordinates!} icon={restaurantIcon}>
          <Popup>
            <div className="text-sm">
              <h3 className="font-bold">{restaurant.name}</h3>
              <p className="text-gray-600">{restaurant.type}</p>
              <p className="text-amber-600">{restaurant.rating} stars</p>
              {restaurant.notes && <p className="text-gray-500 text-xs">{restaurant.notes}</p>}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
