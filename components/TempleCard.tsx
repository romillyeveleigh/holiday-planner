"use client";

import { useState } from "react";
import { Star, Clock, Ticket, MapPin, ExternalLink, History, ChevronLeft, ChevronRight, Sparkles, Lightbulb, Sun, BookOpen } from "lucide-react";
import { Temple } from "@/types";
import Image from "next/image";

interface TempleCardProps {
  temple: Temple;
}

export default function TempleCard({ temple }: TempleCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Combine main image with additional images
  const allImages = [temple.imageUrl, ...(temple.images || [])];
  const hasMultipleImages = allImages.length > 1;

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate/10 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div
        className="relative h-48 bg-gray-200 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        {!imageError ? (
          <Image
            src={allImages[currentImageIndex]}
            alt={temple.name}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate/10">
            <span className="text-gray-500">Image unavailable</span>
          </div>
        )}

        {/* Navigation arrows for multiple images */}
        {hasMultipleImages && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>

            {/* Image dots indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-1">
              {allImages.map((_, index) => (
                <span
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <h3 className="text-white font-semibold">{temple.name}</h3>
          <div className="flex items-center gap-2 text-white/90 text-sm">
            <Star size={14} className="fill-amber-400 text-amber-400" />
            <span>{temple.rating}</span>
            <span className="text-white/70">({temple.reviews})</span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <p className="text-sm text-teal font-medium">{temple.visitDate}</p>

        {expanded && (
          <div className="mt-3 space-y-3 text-sm">
            <p className="text-gray-700">{temple.description}</p>

            <div className="space-y-2 text-gray-600">
              {temple.built && (
                <p className="flex items-center gap-2">
                  <History size={16} className="text-teal" />
                  Built: {temple.built}
                </p>
              )}
              <p className="flex items-center gap-2">
                <Clock size={16} className="text-teal" />
                {temple.hours}
              </p>
              <p className="flex items-center gap-2">
                <Ticket size={16} className="text-teal" />
                {temple.entry}
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={16} className="text-teal" />
                {temple.address}
              </p>
            </div>

            {temple.bestTime && (
              <div className="bg-amber-50 rounded-xl p-3 mt-3">
                <div className="flex items-center gap-2 text-amber-700 font-medium text-sm mb-1">
                  <Sun size={16} />
                  Best Time to Visit
                </div>
                <p className="text-amber-600 text-sm">{temple.bestTime}</p>
              </div>
            )}

            {temple.highlights && temple.highlights.length > 0 && (
              <div className="mt-3">
                <div className="flex items-center gap-2 text-slate font-medium text-sm mb-2">
                  <Sparkles size={16} className="text-teal" />
                  Don't Miss
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  {temple.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-teal">•</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {temple.tips && temple.tips.length > 0 && (
              <div className="mt-3">
                <div className="flex items-center gap-2 text-slate font-medium text-sm mb-2">
                  <Lightbulb size={16} className="text-teal" />
                  Visitor Tips
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  {temple.tips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-teal">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-wrap gap-4 mt-3">
              <a
                href={temple.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-teal hover:text-teal-dark"
              >
                <MapPin size={14} /> Google Maps <ExternalLink size={12} />
              </a>
              {temple.officialUrl && (
                <a
                  href={temple.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-amber-600 hover:text-amber-800"
                >
                  <Ticket size={14} /> Official Site <ExternalLink size={12} />
                </a>
              )}
              {temple.wikipedia && (
                <a
                  href={temple.wikipedia}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800"
                >
                  <BookOpen size={14} /> Wikipedia <ExternalLink size={12} />
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
