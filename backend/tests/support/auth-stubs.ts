import type { AuthRepository } from '../../src/modules/auth/auth.repository.js';

/**
 * Repositorio de autenticación para las pruebas que no tocan `/api/auth` (salud, contrato común
 * de DEV-003). Si alguna lo usara por error, la prueba falla con un mensaje claro.
 */
function unused(): never {
  throw new Error('This test does not expect the auth repository to be used');
}

export const unusedAuthRepository: AuthRepository = {
  findCredentialsByEmail: unused,
  findSessionUser: unused,
  create: unused,
  revokeSessions: unused,
};
