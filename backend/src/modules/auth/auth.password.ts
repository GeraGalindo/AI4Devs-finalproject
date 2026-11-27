import { randomBytes } from 'node:crypto';
import argon2 from 'argon2';

/**
 * Hash de contraseñas (DEV-004, D1): Argon2id con la librería `argon2` y los parámetros mínimos
 * de OWASP. La verificación la hace la librería (comparación en tiempo constante); nunca se
 * comparan hashes a mano. Ni la contraseña ni el hash se registran en logs.
 */
export const ARGON2_OPTIONS = {
  type: argon2.argon2id,
  memoryCost: 19456, // KiB
  timeCost: 2,
  parallelism: 1,
} as const;

export interface PasswordHasher {
  hash(password: string): Promise<string>;
  verify(hash: string, password: string): Promise<boolean>;
  /** Verificación contra un hash de relleno, para un email inexistente. Siempre `false`. */
  verifyDummy(password: string): Promise<false>;
}

let dummyHash: Promise<string> | undefined;

/**
 * Hash de relleno válido, calculado una sola vez por proceso con una contraseña aleatoria
 * que nadie conoce. Se calcula al crear el servicio, para que el primer login con un email
 * inexistente no tarde más que los siguientes.
 */
function getDummyHash(): Promise<string> {
  if (!dummyHash) {
    dummyHash = argon2.hash(randomBytes(32).toString('base64url'), ARGON2_OPTIONS);
    // Si fallara, el error se propaga en el primer login que lo use; aquí solo evitamos el
    // aviso de promesa rechazada sin manejar.
    dummyHash.catch(() => undefined);
  }
  return dummyHash;
}

export function createPasswordHasher(): PasswordHasher {
  void getDummyHash();
  return {
    hash: (password) => argon2.hash(password, ARGON2_OPTIONS),
    verify: (hash, password) => argon2.verify(hash, password),
    verifyDummy: async (password) => {
      await argon2.verify(await getDummyHash(), password);
      return false;
    },
  };
}
