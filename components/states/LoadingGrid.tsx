type LoadingGridProps = {
  count?: number;
};

export function LoadingGrid({ count = 12 }: LoadingGridProps) {
  return (
    <section
      className="grid grid-cols-2 gap-x-4 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
      aria-label="Loading Pokémon"
      aria-busy="true"
    >
      {Array.from({ length: Math.min(count, 12) }).map((_, index) => (
        <div
          key={index}
          className="glass-panel rim-light relative flex min-h-[250px] flex-col justify-end overflow-hidden rounded-lg border border-white/5 p-4 md:min-h-[300px]"
        >
          <div className="shimmer absolute inset-2 rounded-lg bg-dex-black opacity-60" />
          <div className="relative z-10 mb-14 flex justify-center">
            <div className="shimmer h-24 w-24 rounded-full md:h-32 md:w-32" />
          </div>
          <div className="relative z-10 space-y-3">
            <div className="shimmer h-6 w-3/4 rounded" />
            <div className="flex gap-2">
              <div className="shimmer h-5 w-14 rounded-full" />
              <div className="shimmer h-5 w-16 rounded-full" />
            </div>
            <div className="shimmer h-2 w-full rounded-full" />
          </div>
        </div>
      ))}
    </section>
  );
}
