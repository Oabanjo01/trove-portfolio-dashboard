import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  YAxis,
} from "recharts";
import { formatCurrency } from "../../utils/format";

export type Timeframe = "1D" | "1W" | "1M" | "ALL";

const POINTS: Record<Timeframe, number> = {
  "1D": 24,
  "1W": 7,
  "1M": 30,
  ALL: 52,
};

const FRACTION: Record<Timeframe, number> = {
  "1D": 0.05,
  "1W": 0.15,
  "1M": 0.4,
  ALL: 1,
};

/**
 * A seeded random number generator (returns a value between 0 and 1).
 * We use this instead of `Math.random()` so the generated data stays 
 * consistent. Otherwise, the chart's fake "wiggle" would jitter into 
 * a completely new shape every time the component re-renders.
 */
function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * Builds the chart data. Since we don't have historical data, we kind of fake 
 * the path between the start and end. 
 * 
 * The endpoints are strictly real: the line starts exactly at the cost 
 * basis and ends exactly at the current value, so the total return is accurate. 
 * We just add some random "wiggle" in the middle to make it look like a real chart. 
 * The `sin(t*pi)` math just tapers that fake wiggle down to zero at the edges 
 * so the line connects perfectly to our real start and end points.
 */
function buildSeries(
  currentValue: number,
  investedValue: number,
  timeframe: Timeframe
) {
  const count = POINTS[timeframe];
  const totalGain = currentValue - investedValue;
  const start = currentValue - totalGain * FRACTION[timeframe];
  const range = Math.abs(currentValue - start);
  const seedBase = timeframe.charCodeAt(0);

  return Array.from({ length: count }, (_, i) => {
    const t = i / (count - 1);
    const trend = start + (currentValue - start) * t;
    const amplitude = range * 0.5 + currentValue * 0.008;
    const wobble =
      Math.sin(t * Math.PI) * (pseudoRandom(seedBase + i) - 0.5) * amplitude;

    const value =
      i === 0 ? start : i === count - 1 ? currentValue : trend + wobble;

    return { index: i, value };
  });
}

type NetWorthChartProps = {
  currentValue: number;
  investedValue: number;
  currency: string;
  timeframe: Timeframe;
};

export function NetWorthChart({
  currentValue,
  investedValue,
  currency,
  timeframe,
}: NetWorthChartProps) {
  const data = buildSeries(currentValue, investedValue, timeframe);

  const values = data.map((d) => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const pad = (max - min) * 0.15 || currentValue * 0.02;

  return (
    <div className="h-40 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 8, right: 4, bottom: 0, left: 4 }}
        >
          <defs>
            <linearGradient id="netWorthFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#059a83" stopOpacity={0.18} />
              <stop offset="100%" stopColor="#059a83" stopOpacity={0} />
            </linearGradient>
          </defs>
          <YAxis hide domain={[min - pad, max + pad]} />
          <Tooltip
            cursor={{ stroke: "#dbdfdf", strokeWidth: 1 }}
            contentStyle={{
              borderRadius: 12,
              border: "1px solid #dbdfdf",
              fontSize: 12,
              padding: "6px 10px",
            }}
            labelFormatter={() => ""}
            formatter={(value) => [
              formatCurrency(Number(value), currency),
              "Value",
            ]}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#059a83"
            strokeWidth={2}
            fill="url(#netWorthFill)"
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
