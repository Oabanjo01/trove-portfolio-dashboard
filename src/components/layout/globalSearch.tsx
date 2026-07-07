import { useEffect, useRef, useState } from "react";
import type { Holding } from "../../types/portfolio";
import { IconSearch } from "../ui/icons";
import { sectorColor } from "../dashboard/sectorColors";

export function GlobalSearch({ holdings = [] }: { holdings?: Holding[] }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const q = query.trim().toLowerCase();
  const results =
    q === ""
      ? []
      : holdings.filter(
          (h) =>
            h.ticker.toLowerCase().includes(q) ||
            h.name.toLowerCase().includes(q)
        );

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function handleSelect() {
    setQuery("");
    setOpen(false);
  }

  const showDropdown = open && q !== "";

  return (
    <div ref={containerRef} className="relative flex-1 sm:max-w-xs">
      <label className="relative block">
        <span className="sr-only">Search stocks</span>
        <IconSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
        <input
          type="search"
          value={query}
          placeholder="Search stocks, crypto..."
          role="combobox"
          aria-expanded={showDropdown}
          aria-controls="search-results"
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          className="w-full rounded-full border border-transparent bg-fill py-2 pl-9 pr-4 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-primary focus:bg-surface"
        />
      </label>

      {showDropdown && (
        <div
          id="search-results"
          role="listbox"
          className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-xl border border-line bg-surface py-1 shadow-lg"
        >
          {results.length === 0 ? (
            <p className="px-4 py-3 text-xs text-muted">
              No stocks match "{query}"
            </p>
          ) : (
            results.map((holding) => (
              <button
                key={holding.id}
                type="button"
                role="option"
                aria-selected={false}
                onClick={handleSelect}
                className="flex w-full items-center gap-3 px-3 py-2 text-left transition-colors hover:bg-fill"
              >
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-fill text-[10px] font-bold text-muted"
                >
                  {holding.ticker.slice(0, 4)}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium text-ink">
                    {holding.ticker}
                  </span>
                  <span className="block truncate text-xs text-muted">
                    {holding.name}
                  </span>
                </span>
                <span className="flex items-center gap-1.5 text-[11px] text-faint">
                  <span
                    aria-hidden="true"
                    className={`h-1.5 w-1.5 rounded-full ${sectorColor(holding.sector)}`}
                  />
                  {holding.sector}
                </span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
