const REQUIRED_VITE_ENV = ["VITE_API_URL", "VITE_LINKEDIN_URI"] as const;

export function validateCriticalEnv(): void {
  const missing = REQUIRED_VITE_ENV.filter((key) => {
    const value = import.meta.env[key];
    return typeof value !== "string" || value.trim().length === 0;
  });

  if (missing.length > 0 && import.meta.env.DEV) {
    console.warn(
      `[env] Faltan variables críticas: ${missing.join(", ")}. Revisá tu .env local (ver .env.example).`
    );
  }
}
