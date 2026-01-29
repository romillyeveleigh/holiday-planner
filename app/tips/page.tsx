"use client";

import { useState } from "react";
import tipsData from "@/data/tips.json";
import tripData from "@/data/trip.json";
import { ChevronDown, ChevronUp, Phone, Users, Luggage, Clock } from "lucide-react";

type SectionKey = keyof typeof tipsData;

const sectionOrder: SectionKey[] = [
  "visa",
  "money",
  "tipping",
  "weather",
  "scams",
  "phrases",
  "connectivity",
  "electrical",
  "health",
  "emergency",
  "etiquette",
  "photography",
];

export default function TipsPage() {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(["visa", "money"]));

  const toggleSection = (key: string) => {
    const newOpen = new Set(openSections);
    if (newOpen.has(key)) {
      newOpen.delete(key);
    } else {
      newOpen.add(key);
    }
    setOpenSections(newOpen);
  };

  const renderSection = (key: SectionKey) => {
    const section = tipsData[key];
    const isOpen = openSections.has(key);

    return (
      <div key={key} className="bg-white rounded-2xl border border-slate/10 shadow-sm overflow-hidden">
        <button
          onClick={() => toggleSection(key)}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
        >
          <h2 className="font-semibold text-slate">{section.title}</h2>
          {isOpen ? (
            <ChevronUp size={20} className="text-gray-400" />
          ) : (
            <ChevronDown size={20} className="text-gray-400" />
          )}
        </button>

        {isOpen && (
          <div className="px-4 pb-4 border-t border-gray-100">
            {renderSectionContent(key, section)}
          </div>
        )}
      </div>
    );
  };

  const renderSectionContent = (key: string, section: any) => {
    switch (key) {
      case "tipping":
        return (
          <div className="pt-3">
            <p className="text-sm text-gray-600 mb-3">{section.note}</p>
            <table className="w-full text-sm">
              <tbody>
                {section.items.map((item: any, idx: number) => (
                  <tr key={idx} className="border-b border-gray-100 last:border-0">
                    <td className="py-2 text-gray-700">{item.who}</td>
                    <td className="py-2 text-right text-gray-600 font-medium">{item.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "weather":
        return (
          <div className="pt-3">
            <p className="text-sm text-gray-500 mb-3">{section.note}</p>
            <table className="w-full text-sm mb-4">
              <thead>
                <tr className="text-gray-500">
                  <th className="text-left py-1">Location</th>
                  <th className="text-right py-1">Day</th>
                  <th className="text-right py-1">Night</th>
                </tr>
              </thead>
              <tbody>
                {section.temperatures.map((temp: any, idx: number) => (
                  <tr key={idx} className="border-t border-gray-100">
                    <td className="py-2 text-gray-700">{temp.location}</td>
                    <td className="py-2 text-right text-gray-600">{temp.day}</td>
                    <td className="py-2 text-right text-gray-600">{temp.night}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h3 className="font-medium text-slate text-sm mb-2">What to Pack</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              {section.packing.map((item: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-teal">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        );

      case "scams":
        return (
          <div className="pt-3">
            <div className="space-y-3 mb-4">
              {section.items.map((item: any, idx: number) => (
                <div key={idx} className="text-sm">
                  <span className="font-medium text-red-600">{item.scam}:</span>{" "}
                  <span className="text-gray-600">{item.avoid}</span>
                </div>
              ))}
            </div>
            <h3 className="font-medium text-slate text-sm mb-2">Haggling Tips</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              {section.haggling.map((tip: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-teal">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        );

      case "phrases":
        return (
          <div className="pt-3">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-500">
                  <th className="text-left py-1">English</th>
                  <th className="text-center py-1">Arabic</th>
                  <th className="text-right py-1">Say</th>
                </tr>
              </thead>
              <tbody>
                {section.items.map((phrase: any, idx: number) => (
                  <tr key={idx} className="border-t border-gray-100">
                    <td className="py-2 text-gray-700">{phrase.english}</td>
                    <td className="py-2 text-center text-xl" dir="rtl">{phrase.arabic}</td>
                    <td className="py-2 text-right text-gray-500 italic">{phrase.pronunciation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "emergency":
        return (
          <div className="pt-3">
            <div className="grid grid-cols-2 gap-2 mb-3">
              {section.contacts.map((contact: any, idx: number) => (
                <a
                  key={idx}
                  href={`tel:${contact.number}`}
                  className="flex items-center gap-2 bg-gray-50 rounded-lg p-3 text-sm hover:bg-gray-100 transition-colors"
                >
                  <Phone size={16} className="text-slate" />
                  <div>
                    <div className="font-medium text-slate">{contact.service}</div>
                    <div className="text-gray-600">{contact.number}</div>
                  </div>
                </a>
              ))}
            </div>
            <p className="text-sm text-gray-600">
              <span className="font-medium">UK Embassy:</span> {section.embassy}
            </p>
          </div>
        );

      case "electrical":
        return (
          <div className="pt-3 space-y-2">
            {section.items.map((item: any, idx: number) => (
              <div key={idx} className="text-sm">
                <span className="font-medium text-slate">{item.label}:</span>{" "}
                <span className="text-gray-600">{item.value}</span>
              </div>
            ))}
          </div>
        );

      case "visa":
      case "money":
        return (
          <div className="pt-3 space-y-2">
            {section.items.map((item: any, idx: number) => (
              <div key={idx} className="text-sm">
                <span className="font-medium text-slate">{item.label}:</span>{" "}
                <span className="text-gray-600">{item.value}</span>
              </div>
            ))}
          </div>
        );

      case "connectivity":
      case "health":
      case "etiquette":
      case "photography":
        return (
          <ul className="pt-3 text-sm text-gray-600 space-y-1">
            {section.items.map((item: string, idx: number) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-teal">•</span>
                {item}
              </li>
            ))}
          </ul>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Trip Overview */}
      <div className="bg-slate/5 rounded-xl p-4 mb-4 space-y-3">
        <h2 className="font-semibold text-slate text-sm">Trip Details</h2>
        <div className="flex items-center gap-2 text-sm">
          <Users size={16} className="text-slate" />
          <span className="text-gray-700">{tripData.travelers.join(" & ")}</span>
        </div>
        <div className="flex items-start gap-2 text-sm">
          <Luggage size={16} className="text-slate shrink-0 mt-0.5" />
          <div className="text-gray-700">
            <span className="font-medium">{tripData.baggage.airline}:</span>{" "}
            {tripData.baggage.allowance.join(" + ")}
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock size={16} className="text-slate" />
          <span className="text-gray-700">{tripData.timezone.note} ({tripData.timezone.local})</span>
        </div>
      </div>

      <div className="space-y-3">
        {sectionOrder.map((key) => renderSection(key))}
      </div>
    </div>
  );
}
