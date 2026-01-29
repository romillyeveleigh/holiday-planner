"use client";

import { useState } from "react";
import { Star, Clock, Ticket, MapPin, ExternalLink } from "lucide-react";
import { Temple } from "@/types";
import Image from "next/image";

interface TempleCardProps {
  temple: Temple;
}

export default function TempleCard({ temple }: TempleCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div
        className="relative h-48 bg-gray-200 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        {!imageError ? (
          <Image
            src={temple.imageUrl}
            alt={temple.name}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-navy/10">
            <span className="text-gray-500">Image unavailable</span>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <h3 className="text-white font-semibold">{temple.name}</h3>
          <div className="flex items-center gap-2 text-white/90 text-sm">
            <Star size={14} className="fill-gold text-gold" />
            <span>{temple.rating}</span>
            <span className="text-white/70">({temple.reviews})</span>
          </div>
        </div>
      </div>

      <div className="p-3">
        <p className="text-sm text-gold font-medium">{temple.visitDate}</p>

        {expanded && (
          <div className="mt-3 space-y-3 text-sm">
            <p className="text-gray-700">{temple.description}</p>

            <div className="space-y-2 text-gray-600">
              <p className="flex items-center gap-2">
                <Clock size={16} className="text-gold" />
                {temple.hours}
              </p>
              <p className="flex items-center gap-2">
                <Ticket size={16} className="text-gold" />
                {temple.entry}
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={16} className="text-gold" />
                {temple.address}
              </p>
            </div>

            <a
              href={temple.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-gold hover:text-gold-dark"
            >
              Open in Google Maps <ExternalLink size={14} />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
