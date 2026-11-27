import { createContext, useContext } from 'react';
import type { ApiError } from '../../shared/api/client';
import type { PublicUser } from './types';

/**
 * Estado de la sesión (DEV-006, parcial; decisión M2):
 * - `unauthenticated` solo con `401 UNAUTHENTICATED`;
 * - `unavailable` con cualquier otro error (red, respuesta no válida, 403, 429, 5xx…), para no
 *   confundir un fallo con "no hay sesión". `restore()` reintenta.
 */
export type SessionState =
  | { status: 'loading' }
  | { status: 'authenticated'; user: PublicUser }
  | { status: 'unauthenticated' }
  | { status: 'unavailable'; error: ApiError };

export interface Session {
  state: SessionState;
  /** Vuelve a consultar `GET /api/auth/me` (por ejemplo, el botón de reintentar). */
  restore(): void;
  /** Tras un registro correcto (DEV-007), con el `user` de la respuesta `201`. */
  signedIn(user: PublicUser): void;
  /** Tras cerrar sesión (fuera de la Entrega 2). */
  signedOut(): void;
}

export const SessionContext = createContext<Session | undefined>(undefined);

export function useSession(): Session {
  const session = useContext(SessionContext);
  if (!session) throw new Error('useSession() must be used inside <SessionProvider>');
  return session;
}
