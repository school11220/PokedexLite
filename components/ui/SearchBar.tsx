"use client";

import { Search, X } from "lucide-react";

type SearchBarProps = {
  value: string;
  isSearching: boolean;
  onChange: (value: string) => void;
};

export function SearchBar({ value, isSearching, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full">
      <label className="sr-only" htmlFor="pokemon-search">
        Search Pokémon
      </label>
      <Search
        aria-hidden="true"
        className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-on-surface-variant"
      />
      <input
        id="pokemon-search"
        className="control w-full border-0 border-b border-outline-variant pl-10 pr-12"
        value={value}
        type="search"
        autoComplete="off"
        placeholder="Search by name..."
        onChange={(event) => onChange(event.target.value)}
      />
      {value ? (
        <button
          type="button"
          className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-on-surface-variant transition hover:bg-white/5 hover:text-on-surface"
          onClick={() => onChange("")}
          aria-label="Clear search"
        >
          <X aria-hidden="true" className="h-4 w-4" />
        </button>
      ) : null}
      <span className="sr-only" aria-live="polite">
        {isSearching ? "Updating Pokémon results" : "Search ready"}
      </span>
    </div>
  );
}
