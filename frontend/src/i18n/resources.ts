import auth from '../locales/en/auth.json';
import common from '../locales/en/common.json';
import errors from '../locales/en/errors.json';

/**
 * Catálogos de la interfaz (DEV-038, parcial). Solo existe `en`: no hay detector ni selector de
 * idioma, y los JSON se empaquetan con el build (sin peticiones ni servicios externos).
 * Los tipos de las claves salen directamente de estos JSON (ver `i18next.d.ts`).
 */
export const LANGUAGE = 'en';
export const defaultNS = 'common';

export const resources = {
  en: { common, auth, errors },
} as const;

export type Namespace = keyof (typeof resources)['en'];
export const namespaces = Object.keys(resources.en) as Namespace[];
