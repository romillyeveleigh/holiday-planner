"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, Landmark, Map, Utensils, Compass, Info, Camera, Hotel } from "lucide-react";

const navItems = [
  { href: "/", label: "Trip", icon: Calendar },
  { href: "/hotels", label: "Hotels", icon: Hotel },
  { href: "/temples", label: "Temples", icon: Landmark },
  { href: "/map", label: "Map", icon: Map },
  { href: "/restaurants", label: "Food", icon: Utensils },
  { href: "/activities", label: "Do", icon: Compass },
  { href: "/tips", label: "Tips", icon: Info },
  { href: "/photos", label: "Pics", icon: Camera },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop nav */}
      <nav className="hidden md:block bg-white border-b border-slate/10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-slate tracking-tight">
            Rom & Lynn's Amazing Egypt Trip
          </Link>
          <div className="flex gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? "bg-teal text-white"
                    : "text-slate-light hover:bg-slate/5"
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile header */}
      <header className="md:hidden bg-white border-b border-slate/10 px-4 py-4">
        <h1 className="text-xl font-bold text-slate tracking-tight">Rom & Lynn's Amazing Egypt Trip</h1>
        <p className="text-sm text-slate-light/70">Jan 30 – Feb 8, 2026</p>
      </header>

      {/* Mobile nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate/10 p-1 flex justify-around z-50">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-0.5 p-1.5 rounded-lg transition-colors ${
              pathname === item.href ? "text-teal" : "text-slate-light"
            }`}
          >
            <item.icon size={20} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}
