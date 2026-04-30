"use client";

import { Crosshair, Map, UserRound, UsersRound } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { label: "Dex", icon: Crosshair, active: true },
  { label: "Team", icon: UsersRound, active: false },
  { label: "Regions", icon: Map, active: false },
  { label: "Profile", icon: UserRound, active: false }
];

export function Footer() {
  return (
    <footer className="fixed inset-x-0 bottom-0 z-50 h-16 rounded-t-lg border-t border-white/10 bg-neutral-900/90 shadow-2xl shadow-red-900/20 backdrop-blur-lg md:hidden">
      <nav className="grid h-full grid-cols-4" aria-label="Mobile navigation">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <a
              key={item.label}
              href={`#${item.label.toLowerCase()}`}
              className={cn(
                "relative flex flex-col items-center justify-center gap-1 font-display text-[10px] font-bold transition active:scale-90",
                item.active
                  ? "text-red-600 after:absolute after:bottom-2 after:h-1 after:w-1 after:rounded-full after:bg-red-600 after:shadow-[0_0_8px_#dc2626]"
                  : "text-neutral-500 hover:text-neutral-200"
              )}
            >
              <Icon aria-hidden="true" className="h-5 w-5" />
              {item.label}
            </a>
          );
        })}
      </nav>
    </footer>
  );
}
