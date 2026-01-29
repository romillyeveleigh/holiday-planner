"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Temple, Hotel } from "@/types";

const templeIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png",
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

interface MapViewProps {
  temples: Temple[];
  hotels: Hotel[];
}

export default function MapView({ temples, hotels }: MapViewProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-[calc(100vh-120px)] bg-gray-200 flex items-center justify-center">
        Loading map...
      </div>
    );
  }

  const routeCoordinates: [number, number][] = hotels.map((h) => h.coordinates);

  return (
    <MapContainer
      center={[26.0, 32.5]}
      zoom={6}
      className="w-full h-[calc(100vh-120px)] md:h-[calc(100vh-64px)]"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Polyline
        positions={routeCoordinates}
        color="#C9A227"
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
              <p className="text-gold">{temple.visitDate}</p>
              <p className="text-gray-600">{temple.entry}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
