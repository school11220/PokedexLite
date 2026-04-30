"use client";

import { Crosshair, Filter } from "lucide-react";
import { Button } from "@/components/ui/Button";

type HeaderProps = {
  totalCount: number;
  favoritesCount: number;
};

export function Header({ totalCount, favoritesCount }: HeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between border-b border-white/5 border-t-2 border-t-primary-container bg-neutral-950/85 px-4 shadow-[0_-10px_20px_rgba(220,38,38,0.2)] backdrop-blur-xl sm:px-6">
      <div className="flex items-center gap-2 text-primary-container">
        <Crosshair aria-hidden="true" className="h-6 w-6" />
        <span className="font-display text-sm font-black uppercase tracking-wide">
          Pokedex Lite
        </span>
      </div>

      <nav className="hidden items-center gap-8 font-display text-sm font-bold uppercase tracking-wide md:flex">
        <a className="relative text-red-500 after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-red-500" href="#dex">
          Dex
        </a>
        <a className="text-neutral-400 transition hover:text-red-500" href="#favorites">
          Team
        </a>
        <a className="text-neutral-400 transition hover:text-red-500" href="#regions">
          Regions
        </a>
        <a className="text-neutral-400 transition hover:text-red-500" href="#profile">
          Profile
        </a>
      </nav>

      <div className="flex items-center gap-3 text-xs font-semibold text-on-surface-variant">
        <span className="hidden sm:inline">{totalCount.toLocaleString()} entries</span>
        <span className="hidden sm:inline">{favoritesCount} saved</span>
        <Button variant="ghost" className="min-h-10 px-2" aria-label="Filters">
          <Filter aria-hidden="true" className="h-5 w-5 text-primary-container" />
        </Button>
      </div>
    </header>
  );
}
