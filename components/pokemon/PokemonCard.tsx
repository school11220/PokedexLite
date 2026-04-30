"use client";

import { motion } from "framer-motion";
import { Heart, ImageOff } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { TypeBadge } from "@/components/pokemon/TypeBadge";
import type { PokemonDetail, PokemonStat } from "@/lib/types";
import {
  cn,
  formatDexNumber,
  formatPokemonName,
  getPrimaryType,
  getStatLabel,
  getStatPercent,
  getTypeBorderClass,
  getTypeGlowClass
} from "@/lib/utils";

type PokemonCardProps = {
  pokemon: PokemonDetail;
  isFavorite: boolean;
  onToggleFavorite: (name: string) => void;
  onSelect: (pokemon: PokemonDetail) => void;
};

function getFeaturedStat(stats: PokemonStat[]) {
  return stats.reduce((best, stat) => (stat.value > best.value ? stat : best), stats[0]);
}

export function PokemonCard({
  pokemon,
  isFavorite,
  onToggleFavorite,
  onSelect
}: PokemonCardProps) {
  const primaryType = getPrimaryType(pokemon.types);
  const featuredStat = getFeaturedStat(pokemon.stats);
  const featuredWidth = getStatPercent(featuredStat);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (!isFavorite) {
      return;
    }

    setIsFlipping(true);
    const timeout = setTimeout(() => setIsFlipping(false), 650);
    return () => clearTimeout(timeout);
  }, [isFavorite]);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 14 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.22 }}
      className="group relative"
      style={{ perspective: 1200 }}
    >
      <motion.button
        type="button"
        className={cn(
          "glass-panel rim-light relative flex h-full min-h-[250px] w-full cursor-pointer flex-col items-center overflow-hidden rounded-lg border p-3 pb-4 text-center transition duration-300 hover:shadow-[0_0_22px_rgba(220,38,38,0.14)] md:min-h-[300px] md:p-4",
          getTypeBorderClass(primaryType),
          isFavorite &&
            "border-primary-container/70 shadow-[0_0_26px_rgba(220,38,38,0.25)] ring-1 ring-primary-container/50"
        )}
        onClick={() => onSelect(pokemon)}
        aria-label={`Open details for ${formatPokemonName(pokemon.name)}`}
      >
        <motion.div
          className="relative h-full w-full"
          animate={{ rotateY: isFlipping ? [0, 180, 0] : 0 }}
          whileHover={{ rotateX: 8, rotateY: -8 }}
          transition={{ duration: 1.50, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className="absolute inset-0 flex flex-col items-center"
            style={{ backfaceVisibility: "hidden" }}
          >
            {isFavorite ? (
              <span className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-primary-container/60 animate-[pulse_2s_ease-in-out_infinite]" />
            ) : null}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-transparent to-surface-dim/70 opacity-70" />

            <div className="relative z-10 flex w-full items-start justify-between">
              <span className="font-display text-xs font-black text-primary-container md:text-sm">
                {formatDexNumber(pokemon.id)}
              </span>
            </div>

            <div className="-mt-3 mb-3 flex h-28 w-28 items-center justify-center md:mb-4 md:h-36 md:w-36">
              <div
                className={cn(
                  "absolute h-24 w-24 rounded-full blur-3xl opacity-20",
                  getTypeGlowClass(primaryType)
                )}
              />
              {pokemon.image ? (
                <Image
                  src={pokemon.image}
                  alt={formatPokemonName(pokemon.name)}
                  width={180}
                  height={180}
                  sizes="(max-width: 768px) 45vw, (max-width: 1280px) 25vw, 220px"
                  className="relative z-10 h-full w-full object-contain drop-shadow-2xl transition duration-300 group-hover:scale-110"
                  priority={pokemon.id <= 12}
                />
              ) : (
                <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-white/5 text-on-surface-variant">
                  <ImageOff aria-hidden="true" className="h-8 w-8" />
                </div>
              )}
            </div>

            <div className="relative z-10 flex w-full flex-1 flex-col items-center">
              <h2 className="font-display text-base font-bold text-on-surface md:text-2xl">
                {formatPokemonName(pokemon.name)}
              </h2>

              <div className="mt-2 flex flex-wrap justify-center gap-1.5 md:gap-2">
                {pokemon.types.map((type) => (
                  <TypeBadge key={type.name} type={type.name} compact />
                ))}
              </div>

              <div className="mt-auto w-full pt-4">
                <div className="flex items-center gap-2">
                  <span className="w-10 text-left font-display text-[10px] font-bold text-on-surface-variant">
                    {getStatLabel(featuredStat)}
                  </span>
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-dex-black">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary-container to-primary"
                      style={{ width: featuredWidth }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-primary-container/60 bg-primary-container/20 text-primary-container">
              <Heart aria-hidden="true" className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-primary-container">
                Favorited
              </p>
              <p className="text-sm text-on-surface-variant">
                {formatPokemonName(pokemon.name)} is now in your team.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.button>

      <button
        type="button"
        className={cn(
          "absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border transition active:scale-90",
          isFavorite
            ? "border-primary-container/50 bg-primary-container text-white shadow-[0_0_14px_rgba(220,38,38,0.3)]"
            : "border-white/10 bg-black/35 text-on-surface-variant hover:text-primary"
        )}
        onClick={(event) => {
          event.stopPropagation();
          onToggleFavorite(pokemon.name);
        }}
        aria-label={
          isFavorite
            ? `Remove ${formatPokemonName(pokemon.name)} from favorites`
            : `Add ${formatPokemonName(pokemon.name)} to favorites`
        }
        aria-pressed={isFavorite}
      >
        <Heart aria-hidden="true" className={cn("h-4 w-4", isFavorite && "fill-current")} />
      </button>
    </motion.article>
  );
}
