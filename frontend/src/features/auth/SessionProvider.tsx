import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { ApiError } from '../../shared/api/client';
import { getMe } from './api';
import { SessionContext, type SessionState } from './session';
import type { PublicUser } from './types';

export type FetchCurrentUser = (signal: AbortSignal) => Promise<PublicUser>;

/**
 * Sesión de la SPA (DEV-006, parcial). La cookie es `HttpOnly`: JavaScript no la lee, y la
 * única fuente de verdad es `GET /api/auth/me`. No se guarda nada en `localStorage`.
 *
 * Cada consulta tiene su `AbortController` y un número de generación: una respuesta de una
 * consulta anterior, o que llega después de `signedIn`/`signedOut`, se descarta. En StrictMode,
 * el primer montaje se aborta al desmontarse y solo cuenta la segunda consulta.
 * Se conecta a las rutas de la app en DEV-007.
 */
export function SessionProvider({ children, fetchUser = getMe }: { children: ReactNode; fetchUser?: FetchCurrentUser }) {
  const [state, setState] = useState<SessionState>({ status: 'loading' });
  const generation = useRef(0);
  const inFlight = useRef<AbortController | null>(null);

  /** Invalida la consulta en curso y devuelve la generación nueva. */
  const supersede = useCallback(() => {
    generation.current += 1;
    inFlight.current?.abort();
    inFlight.current = null;
    return generation.current;
  }, []);

  /** Lanza `GET /api/auth/me`. Solo cambia el estado cuando llega la respuesta. */
  const fetchSession = useCallback(() => {
    const current = supersede();
    const controller = new AbortController();
    inFlight.current = controller;

    fetchUser(controller.signal).then(
      (user) => {
        if (generation.current === current) setState({ status: 'authenticated', user });
      },
      (err: unknown) => {
        if (generation.current !== current || controller.signal.aborted) return;
        const error = err instanceof ApiError ? err : new ApiError('invalid-response');
        if (error.kind === 'aborted') return;
        setState(
          error.kind === 'http' && error.status === 401 && error.code === 'UNAUTHENTICATED'
            ? { status: 'unauthenticated' }
            : { status: 'unavailable', error },
        );
      },
    );
  }, [fetchUser, supersede]);

  const restore = useCallback(() => {
    setState({ status: 'loading' });
    fetchSession();
  }, [fetchSession]);

  const signedIn = useCallback(
    (user: PublicUser) => {
      supersede();
      setState({ status: 'authenticated', user });
    },
    [supersede],
  );

  const signedOut = useCallback(() => {
    supersede();
    setState({ status: 'unauthenticated' });
  }, [supersede]);

  useEffect(() => {
    // El estado inicial ya es `loading`: el efecto solo lanza la consulta.
    fetchSession();
    return () => {
      supersede();
    };
  }, [fetchSession, supersede]);

  const value = useMemo(() => ({ state, restore, signedIn, signedOut }), [state, restore, signedIn, signedOut]);
  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}
