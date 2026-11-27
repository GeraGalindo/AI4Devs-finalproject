import { Navigate, Route, Routes } from 'react-router';
import { HomeRoute } from '../features/auth/HomeRoute';
import { SessionBoundary } from '../features/auth/SessionBoundary';
import { SignUpRoute } from '../features/auth/SignUpRoute';
import { DiagnosticsPage } from '../features/diagnostics/DiagnosticsPage';

/**
 * Rutas de la SPA (DEV-006 y DEV-007, parciales):
 * - `/diagnostics`: la vista técnica de DEV-001, fuera de la sesión (no consulta `/api/auth/me`);
 * - `/` y `/signup`, dentro de `SessionBoundary`: sin sesión, `/` lleva a `/signup`; con sesión,
 *   `/signup` lleva a `/`, que muestra una vista provisional hasta *Today* (S-06);
 * - cualquier otra ruta: a `/`.
 */
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/diagnostics" element={<DiagnosticsPage />} />
      <Route element={<SessionBoundary />}>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/signup" element={<SignUpRoute />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
