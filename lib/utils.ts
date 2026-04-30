import {
  MAX_STAT_VALUE,
  STAT_LABELS,
  TYPE_BORDER_COLORS,
  TYPE_COLORS,
  TYPE_GLOW_COLORS
} from "@/lib/constants";
import type { PokemonStat, PokemonType } from "@/lib/types";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatPokemonName(name: string) {
  return name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function formatDexNumber(id: number) {
  return `#${String(id).padStart(3, "0")}`;
}

export function formatMetric(value: number, unit: "height" | "weight") {
  const divisor = unit === "height" ? 10 : 10;
  const suffix = unit === "height" ? "m" : "kg";
  return `${value / divisor} ${suffix}`;
}

export function getTypeClass(type: string) {
  return TYPE_COLORS[type] ?? "bg-white/10 text-on-surface border-white/10";
}

export function getTypeGlowClass(type: string) {
  return TYPE_GLOW_COLORS[type] ?? "bg-white";
}

export function getTypeBorderClass(type: string) {
  return TYPE_BORDER_COLORS[type] ?? "hover:border-white/20";
}

export function getPrimaryType(types: PokemonType[]) {
  return types[0]?.name ?? "normal";
}

export function getStatLabel(stat: PokemonStat) {
  return STAT_LABELS[stat.name] ?? stat.name;
}

export function getStatPercent(stat: PokemonStat) {
  return `${Math.min(100, Math.round((stat.value / MAX_STAT_VALUE) * 100))}%`;
}
