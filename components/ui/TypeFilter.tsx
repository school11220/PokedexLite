"use client";

type TypeFilterProps = {
  types: string[];
  value: string;
  onChange: (value: string) => void;
};

export function TypeFilter({ types, value, onChange }: TypeFilterProps) {
  return (
    <label className="flex w-full items-center gap-2 text-xs font-bold uppercase tracking-wide text-on-surface-variant">
      <span className="shrink-0">Type</span>
      <select
        className="control min-h-9 w-full rounded-full py-0 text-xs"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label="Filter by type"
      >
        <option value="">All</option>
        {types.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </label>
  );
}
