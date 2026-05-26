export const USER_COUNTRY_STORAGE_KEY = "user_country";

const BRAZIL_LABELS = new Set(["brazil", "brasil"]);

export function isBrazilCountry(country?: string | null): boolean {
  const normalized = country?.trim().toLowerCase();
  if (!normalized) return false;

  if (normalized === "br") return true;
  return BRAZIL_LABELS.has(normalized);
}

export function getStoredCountry(): string {
  return localStorage.getItem(USER_COUNTRY_STORAGE_KEY) ?? "";
}

export function getStoredBrazilBranding(): boolean {
  return isBrazilCountry(getStoredCountry());
}
