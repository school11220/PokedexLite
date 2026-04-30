"use client";

import { AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { useState } from "react";
import { Footer } from "@/components/layout/Footer";
import { Sidebar } from "@/components/layout/Sidebar";
import { PokemonGrid } from "@/components/pokemon/PokemonGrid";
import { PokemonModal } from "@/components/pokemon/PokemonModal";
import { EmptyState } from "@/components/states/EmptyState";
import { ErrorState } from "@/components/states/ErrorState";
import { LoadingGrid } from "@/components/states/LoadingGrid";
import { Button } from "@/components/ui/Button";
import { Pagination } from "@/components/ui/Pagination";
import { SearchBar } from "@/components/ui/SearchBar";
import { TypeFilter } from "@/components/ui/TypeFilter";
import { PAGE_SIZE_OPTIONS } from "@/lib/constants";
import type { PokemonDetail } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useFavorites } from "@/hooks/useFavorites";
import { usePokemons } from "@/hooks/usePokemons";

export default function Home() {
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetail | null>(null);
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const {
    pokemon,
    types,
    query,
    selectedType,
    page,
    pageSize,
    totalPages,
    totalCount,
    loading,
    error,
    isSearching,
    showFavoritesOnly,
    setQuery,
    setSelectedType,
    setPage,
    setPageSize,
    setShowFavoritesOnly,
    retry
  } = usePokemons({ favoriteNames: favorites });

  const hasActiveFilters = Boolean(query.trim() || selectedType || showFavoritesOnly);

  function resetFilters() {
    setQuery("");
    setSelectedType("");
    setShowFavoritesOnly(false);
  }

  return (
    <main className="min-h-screen pb-24 pt-6 text-on-background md:pb-8">
      <Sidebar favoritesCount={favorites.length} />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:pl-28 lg:pr-8">
        <span id="dex" className="sr-only" />

        <section className="glass-panel rim-light relative mb-10 overflow-hidden rounded-xl border border-white/5 p-4 shadow-lg md:p-5">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.035] to-transparent" />
          <div className="relative flex flex-col gap-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <div className="md:flex-1">
                <SearchBar value={query} isSearching={isSearching} onChange={setQuery} />
              </div>
              <div className="md:w-56">
                <TypeFilter types={types} value={selectedType} onChange={setSelectedType} />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant={showFavoritesOnly ? "primary" : "ghost"}
                  className={cn(
                    "justify-center whitespace-nowrap",
                    !showFavoritesOnly && "border border-white/10 bg-white/5"
                  )}
                  onClick={() => setShowFavoritesOnly((current) => !current)}
                  aria-pressed={showFavoritesOnly}
                >
                  <Heart
                    aria-hidden="true"
                    className={cn("h-4 w-4", showFavoritesOnly && "fill-current")}
                  />
                  Favorites
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px]">
                    {favorites.length}
                  </span>
                </Button>
                {hasActiveFilters ? (
                  <Button
                    variant="ghost"
                    className="min-h-10 border border-white/10 bg-white/5 px-4 text-[11px] font-bold uppercase tracking-wide"
                    onClick={resetFilters}
                  >
                    Clear
                  </Button>
                ) : null}
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-white/5 pt-4 text-sm text-on-surface-variant sm:flex-row sm:items-center sm:justify-between">
            <p aria-live="polite">
              {totalCount.toLocaleString()} {totalCount === 1 ? "entry" : "entries"}
              {selectedType ? ` / ${selectedType}` : ""}
              {showFavoritesOnly ? " / favorites" : ""}
            </p>

            <label className="flex items-center gap-2 font-display text-xs font-bold uppercase tracking-wide">
              Page size
              <select
                className="control min-h-9 rounded-full py-0 text-xs"
                value={pageSize}
                onChange={(event) => setPageSize(Number(event.target.value))}
                aria-label="Pokémon per page"
              >
                {PAGE_SIZE_OPTIONS.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </label>
          </div>
          </div>
        </section>

        {loading ? (
          <LoadingGrid count={pageSize} />
        ) : error ? (
          <ErrorState message={error} onRetry={retry} />
        ) : pokemon.length === 0 ? (
          <EmptyState hasActiveFilters={hasActiveFilters} onReset={resetFilters} />
        ) : (
          <>
            <PokemonGrid
              pokemon={pokemon}
              isFavorite={isFavorite}
              onToggleFavorite={toggleFavorite}
              onSelect={setSelectedPokemon}
            />
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              disabled={loading}
              onPageChange={setPage}
            />
          </>
        )}
      </div>

      <Footer />

      <AnimatePresence>
        {selectedPokemon ? (
          <PokemonModal
            pokemon={selectedPokemon}
            isFavorite={isFavorite(selectedPokemon.name)}
            onToggleFavorite={() => toggleFavorite(selectedPokemon.name)}
            onClose={() => setSelectedPokemon(null)}
          />
        ) : null}
      </AnimatePresence>
    </main>
  );
}
