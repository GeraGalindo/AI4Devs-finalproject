import { Navigate, Route, Routes } from 'react-router';
import { DiagnosticsPage } from '../features/diagnostics/DiagnosticsPage';

/**
 * Rutas de la SPA (DEV-006, parcial; decisión M1):
 * - `/diagnostics`: la vista técnica de DEV-001, fuera de la sesión (no consulta `/api/auth/me`);
 * - `/`: redirección **temporal** a `/diagnostics` hasta que DEV-007 defina la entrada con sesión;
 * - cualquier otra ruta: a `/`.
 * `/signup` y el `SessionProvider` se conectan en DEV-007. No hay páginas de relleno.
 */
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/diagnostics" element={<DiagnosticsPage />} />
      <Route path="/" element={<Navigate to="/diagnostics" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
