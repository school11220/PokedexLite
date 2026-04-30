import { cn, getTypeClass } from "@/lib/utils";

type TypeBadgeProps = {
  type: string;
  compact?: boolean;
};

export function TypeBadge({ type, compact = false }: TypeBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-bold uppercase tracking-wider",
        compact ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs",
        getTypeClass(type)
      )}
    >
      {type}
    </span>
  );
}
