"use client";

import { motion } from "framer-motion";
import { Heart, ImageOff, Ruler, Sparkles, Volume2, Weight, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { TypeBadge } from "@/components/pokemon/TypeBadge";
import { Button } from "@/components/ui/Button";
import type { PokemonDetail } from "@/lib/types";
import {
  cn,
  formatDexNumber,
  formatMetric,
  formatPokemonName,
  getPrimaryType,
  getStatLabel,
  getStatPercent,
  getTypeGlowClass
} from "@/lib/utils";

type PokemonModalProps = {
  pokemon: PokemonDetail;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onClose: () => void;
};

export function PokemonModal({
  pokemon,
  isFavorite,
  onToggleFavorite,
  onClose
}: PokemonModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isShiny, setIsShiny] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const primaryType = getPrimaryType(pokemon.types);

  useEffect(() => {
    closeButtonRef.current?.focus();

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const playCry = () => {
    if (!pokemon.cries?.latest) return;
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const audio = new Audio(pokemon.cries.latest);
    audioRef.current = audio;
    setIsPlaying(true);
    
    audio.play().catch(console.error);
    audio.onended = () => setIsPlaying(false);
  };

  const displayImage = isShiny ? (pokemon.shinyArtwork || pokemon.image) : pokemon.image;
  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/80 p-0 backdrop-blur-sm md:items-center md:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={onClose}
    >
      <motion.section
        role="dialog"
        aria-modal="true"
        aria-labelledby="pokemon-detail-title"
        className="relative flex max-h-[92dvh] w-full max-w-5xl flex-col overflow-y-auto rounded-t-xl border border-white/5 bg-dex-panel shadow-2xl md:flex-row md:rounded-xl"
        initial={{ opacity: 0, y: 26, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.98 }}
        transition={{ duration: 0.22 }}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="absolute right-4 top-4 z-20 flex gap-2">
          {pokemon.cries?.latest && (
            <button
              type="button"
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/50 text-neutral-400 transition hover:bg-black/80 hover:text-white",
                isPlaying && "border-primary text-primary shadow-[0_0_12px_rgba(255,180,171,0.4)]"
              )}
              onClick={playCry}
              aria-label="Play Pokemon cry"
            >
              <Volume2 aria-hidden="true" className={cn("h-5 w-5", isPlaying && "animate-pulse")} />
            </button>
          )}

          {pokemon.shinyArtwork && (
            <button
              type="button"
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/50 text-neutral-400 transition hover:bg-black/80 hover:text-white",
                isShiny && "border-yellow-400/50 text-yellow-400 shadow-[0_0_12px_rgba(250,204,21,0.3)]"
              )}
              onClick={() => setIsShiny((current) => !current)}
              aria-label="Toggle shiny version"
            >
              <Sparkles aria-hidden="true" className="h-5 w-5" />
            </button>
          )}

          <button
            ref={closeButtonRef}
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/50 text-neutral-400 transition hover:bg-black/80 hover:text-white"
            onClick={onClose}
            aria-label="Close Pokemon details"
          >
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>

        <div className="relative flex min-h-[360px] w-full items-center justify-center overflow-hidden border-b border-white/5 bg-gradient-to-br from-red-950/40 to-dex-black p-6 md:w-1/2 md:border-b-0 md:border-r">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={cn("h-64 w-64 rounded-full blur-[80px] opacity-30", getTypeGlowClass(primaryType))} />
          </div>

          <div className="relative z-10 flex h-full w-full items-center justify-center">
            {displayImage ? (
              <motion.div
                key={isShiny ? "shiny" : "normal"}
                initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <Image
                  src={displayImage}
                  alt={formatPokemonName(pokemon.name)}
                  width={360}
                  height={360}
                  sizes="(max-width: 768px) 82vw, 420px"
                  className="max-h-80 w-auto object-contain drop-shadow-[0_20px_40px_rgba(220,38,38,0.32)]"
                  priority
                />
              </motion.div>
            ) : (
              <div className="flex h-40 w-40 items-center justify-center rounded-full bg-white/5 text-on-surface-variant">
                <ImageOff aria-hidden="true" className="h-14 w-14" />
              </div>
            )}
          </div>

          <div className="pointer-events-none absolute bottom-3 left-5 select-none font-display text-[72px] font-black tracking-tighter text-white/5 md:text-[86px]">
            {formatDexNumber(pokemon.id)}
          </div>
        </div>

        <div className="flex w-full flex-col bg-dex-panel/95 p-6 backdrop-blur-xl md:w-1/2 md:p-10">
          <div className="mb-6">
            <div className="flex items-start justify-between gap-12">
              <h2
                id="pokemon-detail-title"
                className="font-display text-3xl font-black text-white md:text-4xl"
              >
                {formatPokemonName(pokemon.name)}
                {isShiny ? <Sparkles className="ml-2 inline-block h-6 w-6 text-yellow-400" /> : null}
              </h2>
              <span className="mt-1 font-display text-sm font-bold text-neutral-400">
                {formatDexNumber(pokemon.id)}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {pokemon.types.map((type) => (
                <TypeBadge key={type.name} type={type.name} />
              ))}
            </div>
          </div>

          <div className="mb-8 grid grid-cols-2 gap-3 border-l-2 border-primary-container/30 pl-4">
            <div className="flex items-center gap-2 text-neutral-400">
              <Ruler aria-hidden="true" className="h-4 w-4 text-primary" />
              <span className="text-sm">{formatMetric(pokemon.height, "height")}</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-400">
              <Weight aria-hidden="true" className="h-4 w-4 text-primary" />
              <span className="text-sm">{formatMetric(pokemon.weight, "weight")}</span>
            </div>
          </div>

          <section className="mb-8">
            <h3 className="mb-3 font-display text-sm font-bold uppercase tracking-[0.18em] text-neutral-500">
              Abilities
            </h3>
            <div className="flex flex-wrap gap-2">
              {pokemon.abilities.map((ability) => (
                <span
                  key={`${ability.name}-${ability.isHidden}`}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold uppercase tracking-wide text-on-surface-variant"
                >
                  {ability.name}
                  {ability.isHidden ? <span className="ml-1 text-primary">(hidden)</span> : null}
                </span>
              ))}
            </div>
          </section>

          <section className="flex-grow">
            <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-[0.18em] text-neutral-500">
              Base Stats
            </h3>
            <div className="space-y-4">
              {pokemon.stats.map((stat) => (
                <div key={stat.name} className="grid grid-cols-[48px_1fr_36px] items-center gap-4">
                  <span className="text-right font-display text-xs font-bold text-neutral-400">
                    {getStatLabel(stat)}
                  </span>
                  <div className="h-2 overflow-hidden rounded-full border border-white/5 bg-dex-black">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-primary-container to-primary shadow-[0_0_10px_rgba(255,180,171,0.45)]"
                      initial={{ width: 0 }}
                      animate={{ width: getStatPercent(stat) }}
                      transition={{ duration: 0.45 }}
                    />
                  </div>
                  <span className="text-right font-display text-xs font-bold text-white">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-8 border-t border-white/5 pt-6">
            <Button className="w-full" onClick={onToggleFavorite}>
              <Heart aria-hidden="true" className={cn("h-5 w-5", isFavorite && "fill-current")} />
              {isFavorite ? "Remove Favorite" : "Add to Favorites"}
            </Button>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}
