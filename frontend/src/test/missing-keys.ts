import { setMissingKeyReporter } from '../i18n/missing-keys';

/**
 * Detector de claves de traducción inexistentes en las pruebas (DEV-038). `setup.ts` lo instala
 * antes de cada prueba y lo comprueba después: una clave inexistente hace fallar la prueba.
 * El estado se vacía en cada prueba, así que no pasa de una prueba a otra.
 */
const missing: string[] = [];
let restore: (() => void) | undefined;

export function startMissingKeyDetection(): void {
  restore?.();
  missing.length = 0;
  restore = setMissingKeyReporter((ns, key) => {
    missing.push(`${ns}:${key}`);
  });
}

/** Devuelve las claves registradas y vacía el registro. */
export function takeMissingKeys(): string[] {
  return missing.splice(0, missing.length);
}

/** Restaura el aviso normal y lanza un error si alguna clave no existía. */
export function stopMissingKeyDetection(): void {
  restore?.();
  restore = undefined;
  const found = takeMissingKeys();
  if (found.length > 0) {
    throw new Error(`Missing translation keys: ${[...new Set(found)].join(', ')}`);
  }
}
