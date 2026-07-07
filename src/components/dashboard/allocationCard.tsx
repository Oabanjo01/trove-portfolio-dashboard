import type { Holding } from "../../types/portfolio";
import { getSectorAllocation } from "../../utils/sectors";
import { formatPercent } from "../../utils/format";
import { Card } from "../ui/card";
import { sectorColor } from "./sectorColors";

export function AllocationCard({ holdings }: { holdings: Holding[] }) {
  const allocation = getSectorAllocation(holdings).sort(
    (a, b) => b.value - a.value
  );

  return (
    <Card className="p-6">
      <h2 className="text-xs font-medium uppercase tracking-wide text-muted">
        Asset Allocation
      </h2>

      <div
        role="img"
        aria-label={`Portfolio allocation: ${allocation
          .map((s) => `${s.sector} ${formatPercent(s.percentage, false)}`)
          .join(", ")}`}
        className="mt-4 flex h-3 overflow-hidden rounded-full bg-fill"
      >
        {allocation.map((slice) => (
          <div
            key={slice.sector}
            className={sectorColor(slice.sector)}
            style={{ width: `${slice.percentage}%` }}
          />
        ))}
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5">
        {allocation.map((slice) => (
          <div key={slice.sector} className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className={`h-2.5 w-2.5 shrink-0 rounded-full ${sectorColor(slice.sector)}`}
            />
            <dt className="truncate text-xs text-muted">{slice.sector}</dt>
            <dd className="ml-auto text-xs font-semibold text-ink">
              {formatPercent(slice.percentage, false)}
            </dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}
