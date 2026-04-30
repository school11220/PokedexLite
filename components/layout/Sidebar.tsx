"use client";

import { Crosshair, Heart, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dex", icon: Crosshair, href: "#dex" },
  { label: "Profile", icon: UserRound, href: "/profile" }
];

type SidebarProps = {
  favoritesCount: number;
};

export function Sidebar({ favoritesCount }: SidebarProps) {
  const pathname = usePathname();
  const isProfileRoute = pathname === "/profile";

  return (
    <aside className="fixed bottom-0 left-0 top-0 z-40 hidden w-20 border-r border-white/5 bg-neutral-950/55 pt-6 backdrop-blur-xl lg:flex lg:flex-col lg:items-center lg:justify-between lg:pb-6">
      <nav className="flex flex-col gap-4" aria-label="Primary">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isProfileItem = item.label === "Profile";
          const isActive = isProfileItem ? isProfileRoute : !isProfileRoute && item.label === "Dex";
          const classes = cn(
            "flex h-14 w-14 flex-col items-center justify-center gap-1 rounded-lg text-[10px] font-bold uppercase transition active:scale-95",
            isActive
              ? "bg-primary-container/15 text-red-500 shadow-[0_0_18px_rgba(220,38,38,0.22)]"
              : "text-neutral-500 hover:bg-white/5 hover:text-neutral-200"
          );

          if (item.href.startsWith("#")) {
            return (
              <a
                key={item.label}
                href={item.href}
                className={classes}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon aria-hidden="true" className="h-5 w-5" />
                {item.label}
              </a>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className={classes}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon aria-hidden="true" className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col items-center gap-2 text-red-500">
        <Heart aria-hidden="true" className="h-5 w-5" />
        <span className="font-display text-xs font-black">{favoritesCount}</span>
      </div>
    </aside>
  );
}
