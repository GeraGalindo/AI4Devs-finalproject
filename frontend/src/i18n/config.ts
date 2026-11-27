import { createInstance, type i18n } from 'i18next';
import { reportMissingKey } from './missing-keys';
import { defaultNS, LANGUAGE, namespaces, resources } from './resources';

/**
 * Fábrica de instancias de i18next (DEV-038). Cada llamada devuelve una instancia nueva e
 * independiente, ya inicializada de forma síncrona:
 * - idioma fijo `en`, también como respaldo; sin detector, sin selector y sin `localStorage`;
 * - recursos empaquetados, sin backend HTTP ni servicios externos (la CSP no cambia);
 * - claves inexistentes → `reportMissingKey` (ver `missing-keys.ts`).
 *
 * No usa `initReactI18next`: los componentes reciben la instancia por `I18nextProvider`, así
 * que no hay una instancia global compartida entre pruebas.
 */
export function createI18n(): i18n {
  const instance = createInstance();
  void instance.init({
    lng: LANGUAGE,
    fallbackLng: LANGUAGE,
    supportedLngs: [LANGUAGE],
    ns: namespaces,
    defaultNS,
    // Copia por instancia: i18next guarda los recursos por referencia, y sin copia un
    // `addResource` en una instancia cambiaría los catálogos de todas.
    resources: structuredClone(resources),
    initAsync: false,
    // React ya escapa el texto que renderiza.
    interpolation: { escapeValue: false },
    returnNull: false,
    returnEmptyString: false,
    // Necesario para que i18next llame a `missingKeyHandler`; no hay backend al que enviar nada.
    saveMissing: true,
    missingKeyHandler: (_lngs, ns, key) => reportMissingKey(ns, key),
    react: { useSuspense: false },
  });
  return instance;
}
