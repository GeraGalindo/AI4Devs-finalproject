import { Outlet } from 'react-router';
import { SessionProvider } from './SessionProvider';

/**
 * Rutas con sesión (DEV-007, parcial): el `SessionProvider` restaura la sesión con
 * `GET /api/auth/me` al entrar y al recargar. `/diagnostics` queda fuera y no la consulta.
 */
export function SessionBoundary() {
  return (
    <SessionProvider>
      <Outlet />
    </SessionProvider>
  );
}
