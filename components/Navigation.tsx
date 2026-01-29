"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, Landmark, Map, Utensils } from "lucide-react";

const navItems = [
  { href: "/", label: "Itinerary", icon: Calendar },
  { href: "/temples", label: "Temples", icon: Landmark },
  { href: "/map", label: "Map", icon: Map },
  { href: "/restaurants", label: "Restaurants", icon: Utensils },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop nav */}
      <nav className="hidden md:flex bg-navy text-cream p-4 items-center justify-between">
        <h1 className="text-xl font-bold text-gold">Egypt Jan-Feb 2026</h1>
        <div className="flex gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 hover:text-gold transition-colors ${
                pathname === item.href ? "text-gold" : ""
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-navy text-cream p-2 flex justify-around z-50">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 p-2 ${
              pathname === item.href ? "text-gold" : ""
            }`}
          >
            <item.icon size={24} />
            <span className="text-xs">{item.label}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}
