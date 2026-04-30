"use client";

import { AnimatePresence } from "framer-motion";
import { PokemonCard } from "@/components/pokemon/PokemonCard";
import type { PokemonDetail } from "@/lib/types";

type PokemonGridProps = {
  pokemon: PokemonDetail[];
  isFavorite: (name: string) => boolean;
  onToggleFavorite: (name: string) => void;
  onSelect: (pokemon: PokemonDetail) => void;
};

export function PokemonGrid({
  pokemon,
  isFavorite,
  onToggleFavorite,
  onSelect
}: PokemonGridProps) {
  return (
    <section id="dex" aria-label="Pokémon results">
      <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:grid-cols-2 md:grid-cols-3 md:gap-x-5 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        <AnimatePresence mode="popLayout">
          {pokemon.map((item) => (
            <PokemonCard
              key={item.name}
              pokemon={item}
              isFavorite={isFavorite(item.name)}
              onToggleFavorite={onToggleFavorite}
              onSelect={onSelect}
            />
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
