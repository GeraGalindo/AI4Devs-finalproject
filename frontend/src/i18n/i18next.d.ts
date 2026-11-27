import 'i18next';
import type { defaultNS, resources } from './resources';

/**
 * Claves tipadas a partir de los catálogos JSON: `t('auth:noExiste')` no compila.
 * Sin lista manual de claves: si cambia un JSON, cambian los tipos.
 */
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: (typeof resources)['en'];
  }
}
