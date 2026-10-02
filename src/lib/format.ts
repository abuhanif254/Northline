const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const compactUsd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 0,
});

const dateFmt = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export function formatSalary(min: number, max: number, compact = false) {
  const fmt = compact ? compactUsd : usd;
  return `${fmt.format(min)} – ${fmt.format(max)}`;
}

export function formatDate(iso: string) {
  return dateFmt.format(new Date(iso));
}

export function daysAgo(iso: string) {
  const ms = Date.now() - new Date(iso).getTime();
  const days = Math.max(0, Math.floor(ms / 86_400_000));
  if (days === 0) return "Today";
  if (days === 1) return "1 day ago";
  if (days < 14) return `${days} days ago`;
  if (days < 45) {
    const weeks = Math.round(days / 7);
    return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
  }
  return formatDate(iso);
}

export function formatLocation(city: string, region: string, country: string) {
  if (city.toLowerCase() === "remote") return "Remote";
  if (country === "United States") return `${city}, ${region}`;
  return `${city}, ${country}`;
}
