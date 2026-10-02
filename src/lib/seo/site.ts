export const SITE_NAME = "Northline";
export const SITE_TAGLINE = "Find work worth doing.";
export const SITE_DESCRIPTION =
  "Northline is a curated job marketplace for ambitious professionals. Search roles in engineering, design, product, data, and operations from companies that take the work seriously.";

export function pageTitle(parts?: string | string[]) {
  if (!parts) return `${SITE_NAME} — ${SITE_TAGLINE}`;
  const list = Array.isArray(parts) ? parts : [parts];
  return [...list, SITE_NAME].join(" | ");
}

export function pageDescription(text: string, max = 158) {
  const trimmed = text.replace(/\s+/g, " ").trim();
  if (trimmed.length <= max) return trimmed;
  return `${trimmed.slice(0, max - 1).trimEnd()}…`;
}
