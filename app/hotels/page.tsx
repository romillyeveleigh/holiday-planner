"use client";

import { useState } from "react";
import hotelsData from "@/data/hotels.json";
import tripData from "@/data/trip.json";
import { MapPin, Phone, Calendar, CreditCard, Key, Bed, Clock, AlertCircle, AlertTriangle } from "lucide-react";

export default function HotelsPage() {
  const [expandedHotel, setExpandedHotel] = useState<number | null>(0);

  return (
    <div className="max-w-2xl mx-auto p-4">

      {/* Pending Requests Alert */}
      {tripData.pendingRequests && tripData.pendingRequests.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={18} className="text-amber-600" />
            <h2 className="font-semibold text-amber-800">Pending Requests</h2>
          </div>
          <div className="space-y-2">
            {tripData.pendingRequests.map((request, idx) => (
              <div key={idx} className="text-sm">
                <span className="font-medium text-amber-700">{request.hotel}:</span>{" "}
                <span className="text-amber-600">{request.items.join(", ")}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        {hotelsData.map((hotel, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-slate/10 shadow-sm overflow-hidden"
          >
            <button
              onClick={() => setExpandedHotel(expandedHotel === idx ? null : idx)}
              className="w-full p-4 text-left"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-semibold text-slate">{hotel.name}</h2>
                  <p className="text-sm text-gray-500">{hotel.location}</p>
                </div>
                <span className="text-sm text-teal font-medium">{hotel.dates}</span>
              </div>
            </button>

            {expandedHotel === idx && (
              <div className="px-4 pb-4 border-t border-gray-100 pt-3 space-y-3">
                {/* Address */}
                <div className="flex items-start gap-2 text-sm">
                  <MapPin size={16} className="text-gray-400 shrink-0 mt-0.5" />
                  <span className="text-gray-700">{hotel.address}</span>
                </div>

                {/* Phone */}
                {hotel.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone size={16} className="text-gray-400" />
                    <a href={`tel:${hotel.phone}`} className="text-blue-600 hover:underline">
                      {hotel.phone}
                    </a>
                  </div>
                )}

                {/* Room type */}
                {"room" in hotel && hotel.room && (
                  <div className="flex items-center gap-2 text-sm">
                    <Bed size={16} className="text-gray-400" />
                    <span className="text-gray-700">{hotel.room}</span>
                  </div>
                )}

                {/* Check-in/out */}
                <div className="flex items-center gap-2 text-sm">
                  <Clock size={16} className="text-gray-400" />
                  <span className="text-gray-700">
                    Check-in: {hotel.checkIn} | Check-out: {hotel.checkOut}
                  </span>
                </div>

                {/* Price */}
                {"price" in hotel && hotel.price && (
                  <div className="flex items-center gap-2 text-sm">
                    <CreditCard size={16} className="text-gray-400" />
                    <span className="text-gray-700">{hotel.price}</span>
                    {"payment" in hotel && hotel.payment && (
                      <span className="text-gray-500">({hotel.payment})</span>
                    )}
                  </div>
                )}

                {/* Confirmation & PIN */}
                {"confirmation" in hotel && hotel.confirmation && (
                  <div className="bg-gray-50 rounded p-3 space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <Key size={16} className="text-slate" />
                      <span className="font-medium text-slate">Booking Details</span>
                    </div>
                    <div className="text-sm text-gray-700 pl-6">
                      <div>Confirmation: <span className="font-mono">{hotel.confirmation}</span></div>
                      {"pin" in hotel && hotel.pin && (
                        <div>PIN: <span className="font-mono">{hotel.pin}</span></div>
                      )}
                    </div>
                  </div>
                )}

                {/* Special request */}
                {"specialRequest" in hotel && hotel.specialRequest && (
                  <div className="flex items-center gap-2 text-sm">
                    <AlertCircle size={16} className="text-amber-500" />
                    <span className="text-gray-700">Request: {hotel.specialRequest}</span>
                  </div>
                )}

                {/* Cancellation */}
                {"cancellation" in hotel && hotel.cancellation && (
                  <div className="text-xs text-gray-500 pt-2 border-t border-gray-100">
                    {hotel.cancellation}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
