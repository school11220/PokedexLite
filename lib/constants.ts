export const POKEAPI_BASE_URL = "https://pokeapi.co/api/v2";

export const DEFAULT_PAGE_SIZE = 20;

export const PAGE_SIZE_OPTIONS = [12, 20, 32] as const;

export const FAVORITES_STORAGE_KEY = "pokedex-lite:favorites";

export const OFFICIAL_TYPE_ORDER = [
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy"
] as const;

export const TYPE_COLORS: Record<string, string> = {
  normal: "bg-stone-400/15 text-stone-300 border-stone-300/20",
  fire: "bg-orange-500/15 text-orange-400 border-orange-500/25",
  water: "bg-blue-500/15 text-blue-400 border-blue-500/25",
  electric: "bg-yellow-400/15 text-yellow-300 border-yellow-400/25",
  grass: "bg-green-500/15 text-green-400 border-green-500/25",
  ice: "bg-cyan-400/15 text-cyan-300 border-cyan-400/25",
  fighting: "bg-red-500/15 text-red-400 border-red-500/25",
  poison: "bg-purple-500/15 text-purple-400 border-purple-500/25",
  ground: "bg-amber-500/15 text-amber-300 border-amber-500/25",
  flying: "bg-sky-400/15 text-sky-300 border-sky-400/25",
  psychic: "bg-fuchsia-500/15 text-fuchsia-400 border-fuchsia-500/25",
  bug: "bg-lime-500/15 text-lime-400 border-lime-500/25",
  rock: "bg-yellow-700/20 text-yellow-500 border-yellow-700/30",
  ghost: "bg-violet-500/15 text-violet-400 border-violet-500/25",
  dragon: "bg-orange-500/15 text-orange-400 border-orange-500/25",
  dark: "bg-neutral-500/15 text-neutral-300 border-neutral-500/25",
  steel: "bg-zinc-400/15 text-zinc-300 border-zinc-400/25",
  fairy: "bg-rose-400/15 text-rose-300 border-rose-400/25"
};

export const TYPE_GLOW_COLORS: Record<string, string> = {
  normal: "bg-stone-400",
  fire: "bg-orange-500",
  water: "bg-blue-500",
  electric: "bg-yellow-400",
  grass: "bg-green-500",
  ice: "bg-cyan-400",
  fighting: "bg-red-500",
  poison: "bg-purple-500",
  ground: "bg-amber-500",
  flying: "bg-sky-400",
  psychic: "bg-fuchsia-500",
  bug: "bg-lime-500",
  rock: "bg-yellow-700",
  ghost: "bg-violet-500",
  dragon: "bg-orange-500",
  dark: "bg-neutral-500",
  steel: "bg-zinc-400",
  fairy: "bg-rose-400"
};

export const TYPE_BORDER_COLORS: Record<string, string> = {
  normal: "hover:border-stone-400/40",
  fire: "hover:border-orange-500/45",
  water: "hover:border-blue-500/45",
  electric: "hover:border-yellow-400/45",
  grass: "hover:border-green-500/45",
  ice: "hover:border-cyan-400/45",
  fighting: "hover:border-red-500/45",
  poison: "hover:border-purple-500/45",
  ground: "hover:border-amber-500/45",
  flying: "hover:border-sky-400/45",
  psychic: "hover:border-fuchsia-500/45",
  bug: "hover:border-lime-500/45",
  rock: "hover:border-yellow-700/45",
  ghost: "hover:border-violet-500/45",
  dragon: "hover:border-orange-500/45",
  dark: "hover:border-neutral-500/45",
  steel: "hover:border-zinc-400/45",
  fairy: "hover:border-rose-400/45"
};

export const MAX_STAT_VALUE = 255;

export const STAT_LABELS: Record<string, string> = {
  HP: "HP",
  Attack: "ATK",
  Defense: "DEF",
  "Special Attack": "SP.A",
  "Special Defense": "SP.D",
  Speed: "SPD"
};
