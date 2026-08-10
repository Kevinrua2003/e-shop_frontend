/**
 * URL base de la API, normalizada SIN barras finales.
 *
 * Evita URLs con doble barra (p. ej. "http://localhost:5000//product"),
 * que Express/Next no matchean y devuelven 404. Funciona aunque
 * NEXT_PUBLIC_API_URL se configure con "/" al final.
 */
export const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? '').replace(
  /\/+$/,
  '',
);
