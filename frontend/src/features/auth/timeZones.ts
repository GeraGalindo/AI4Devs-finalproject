/**
 * Zonas horarias del registro (DEV-007, parcial). La validación es la del backend
 * (`isIanaTimeZone` de `auth.schemas.ts`): forma IANA, 64 caracteres como máximo y aceptada por
 * `Intl.DateTimeFormat`. Así se rechazan los desfases (`+01:00`, `UTC+1`), que PostgreSQL
 * interpretaría con el signo invertido.
 */
const IANA_TIME_ZONE_SHAPE = /^[A-Za-z][A-Za-z0-9_]*(\/[A-Za-z0-9_+-]+)*$/;
export const TIME_ZONE_MAX_LENGTH = 64;

export function isIanaTimeZone(value: string): boolean {
  if (value.length > TIME_ZONE_MAX_LENGTH || !IANA_TIME_ZONE_SHAPE.test(value)) return false;
  try {
    new Intl.DateTimeFormat('en-US', { timeZone: value });
    return true;
  } catch {
    return false;
  }
}

/** La zona del navegador, o `undefined` si no hay ninguna válida. Nunca inventa un valor. */
export function detectTimeZone(): string | undefined {
  try {
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return typeof zone === 'string' && isIanaTimeZone(zone) ? zone : undefined;
  } catch {
    return undefined;
  }
}

/**
 * Opciones del selector manual: `Intl.supportedValuesOf('timeZone')` más `UTC` (que no incluye),
 * validadas y ordenadas. `undefined` si el navegador no ofrece la lista: entonces la zona se
 * escribe a mano y se valida igual.
 */
export function listTimeZones(): string[] | undefined {
  const supportedValuesOf = (Intl as { supportedValuesOf?: (key: 'timeZone') => string[] }).supportedValuesOf;
  if (typeof supportedValuesOf !== 'function') return undefined;
  try {
    const zones = new Set(supportedValuesOf.call(Intl, 'timeZone'));
    zones.add('UTC');
    return [...zones].filter(isIanaTimeZone).sort((a, b) => a.localeCompare(b, 'en'));
  } catch {
    return undefined;
  }
}
