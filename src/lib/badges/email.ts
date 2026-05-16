export const BLOCKED_PUBLIC_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "yahoo.com",
  "outlook.com",
  "hotmail.com",
  "icloud.com",
  "proton.me",
  "protonmail.com",
  "live.com",
  "aol.com",
  "msn.com",
  "gmx.com",
  "mail.com",
  "yandex.com",
  "zoho.com",
]);

export function isBlockedPublicEmail(email: string) {
  const domain = email.trim().toLowerCase().split("@")[1] ?? "";
  return BLOCKED_PUBLIC_EMAIL_DOMAINS.has(domain);
}
