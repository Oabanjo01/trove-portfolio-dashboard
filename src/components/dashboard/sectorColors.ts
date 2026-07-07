const sectorColorMap: Record<string, string> = {
  Technology: "bg-primary",
  Healthcare: "bg-accent",
  Finance: "bg-chart-lavender",
  Automotive: "bg-navy",
  Entertainment: "bg-chart-cream",
};

export function sectorColor(sector: string): string {
  return sectorColorMap[sector] ?? "bg-faint";
}
