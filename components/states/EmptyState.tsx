import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/Button";

type EmptyStateProps = {
  hasActiveFilters: boolean;
  onReset?: () => void;
};

export function EmptyState({ hasActiveFilters, onReset }: EmptyStateProps) {
  return (
    <section className="glass-panel rim-light flex min-h-[380px] flex-col items-center justify-center rounded-xl border border-white/5 p-10 text-center">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white/5 text-on-surface opacity-40">
        <SearchX aria-hidden="true" className="h-12 w-12" />
      </div>
      <h2 className="font-display text-2xl font-bold text-on-surface">No Results Found</h2>
      <p className="mt-3 max-w-md text-sm leading-6 text-on-surface-variant">
        {hasActiveFilters
          ? "The requested data parameters did not match any known subjects. Adjust your filters to resume the search."
          : "The Pokédex database returned no entries for this page."}
      </p>
      {hasActiveFilters && onReset ? (
        <Button className="mt-6" onClick={onReset}>
          Reset Filters
        </Button>
      ) : null}
    </section>
  );
}
