import { useMemo, useState } from "react";
import type { Holding } from "../../types/portfolio";
import { EmptyState } from "../ui/emptyState";
import { FilterPills } from "../ui/filterPills";
import { IconSearch } from "../ui/icons";
import { HoldingCard } from "./holdingCard";

export function HoldingsPanel({
  holdings,
  currency,
}: {
  holdings: Holding[];
  currency: string;
}) {
  const [query, setQuery] = useState("");
  const [sector, setSector] = useState("All");

  const sectors = useMemo(
    () => ["All", ...new Set(holdings.map((h) => h.sector))],
    [holdings]
  );

  const filtered = holdings.filter((holding) => {
    const q = query.trim().toLowerCase();
    const matchesQuery =
      q === "" ||
      holding.ticker.toLowerCase().includes(q) ||
      holding.name.toLowerCase().includes(q);
    const matchesSector = sector === "All" || holding.sector === sector;

    return matchesQuery && matchesSector;
  });

  return (
    <div className="space-y-4">
      <label className="relative block">
        <span className="sr-only">Search by ticker or company name</span>
        <IconSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by ticker or company name"
          className="w-full rounded-xl border border-transparent bg-fill py-2.5 pl-9 pr-4 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-primary focus:bg-surface"
        />
      </label>

      <FilterPills
        label="Filter by sector"
        options={sectors}
        selected={sector}
        onSelect={setSector}
      />

      {filtered.length === 0 ? (
        <EmptyState
          title="No holdings match your search"
          hint="Try a different ticker, company name, or sector filter."
        />
      ) : (
        <ul className="space-y-3">
          {filtered.map((holding) => (
            <HoldingCard
              key={holding.id}
              holding={holding}
              currency={currency}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
