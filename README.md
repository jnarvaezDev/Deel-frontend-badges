# Deel frontend-badges

## Setup rápido

1. Copiá el archivo de ejemplo:
   - `cp .env.example .env`
2. Completá tus valores locales en `.env`.
3. Corré el proyecto:
   - `npm run dev`

## Variables de entorno

Variables `VITE_*` esperadas:

- `VITE_API_URL`
- `VITE_LINKEDIN_URI`
- `VITE_WEBHOOK_URL`
- `VITE_VALIDATION_URL`
- `VITE_APP_URL`

> En desarrollo, la app muestra un warning claro si faltan variables críticas.

## Seguridad

- `.env` está ignorado por git.
- **No versionar secretos** (tokens, keys, credenciales, URLs privadas reales).
- Usar `.env.example` solo con placeholders seguros.
