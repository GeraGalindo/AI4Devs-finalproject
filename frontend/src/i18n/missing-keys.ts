/**
 * Aviso de claves de traducción inexistentes (DEV-038).
 *
 * - En producción no se interrumpe la interfaz: i18next muestra la clave y no se registra nada.
 * - En desarrollo (`vite dev`) se avisa con `console.error`.
 * - En las pruebas, `src/test/setup.ts` sustituye el aviso por un registro que hace fallar la
 *   prueba (ver `src/test/missing-keys.ts`).
 *
 * Solo se informa del espacio de nombres y la clave, nunca de valores ni datos del usuario.
 */
export type MissingKeyReporter = (ns: string, key: string) => void;

const defaultReporter: MissingKeyReporter = (ns, key) => {
  if (import.meta.env.DEV) {
    console.error(`[i18n] Missing translation key: ${ns}:${key}`);
  }
};

let reporter: MissingKeyReporter = defaultReporter;

export function reportMissingKey(ns: string, key: string): void {
  reporter(ns, key);
}

/** Sustituye el aviso. Devuelve una función que restaura el anterior. */
export function setMissingKeyReporter(next: MissingKeyReporter): () => void {
  const previous = reporter;
  reporter = next;
  return () => {
    reporter = previous;
  };
}
