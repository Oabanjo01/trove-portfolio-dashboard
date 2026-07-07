const locale = "en-US";

export function formatCurrency(value: number, currency = "USD"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);
}

/** 
 * Always forces a `+` or `-` prefix so gains and losses are obvious at a glance. 
 */
export function formatSignedCurrency(value: number, currency = "USD"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    signDisplay: "exceptZero",
  }).format(value);
}

/** 
 * Formats a percentage. Expects a standard 0-100 value 
 * (e.g., passing `4.2` returns "+4.2%"). 
 */
export function formatPercent(value: number, signed = true): string {
  const formatted = new Intl.NumberFormat(locale, {
    maximumFractionDigits: 1,
    signDisplay: signed ? "exceptZero" : "auto",
  }).format(value);

  return `${formatted}%`;
}

export function formatDate(isoDate: string): string {
  return new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(isoDate));
}

export function formatShares(shares: number): string {
  return new Intl.NumberFormat(locale).format(shares);
}
