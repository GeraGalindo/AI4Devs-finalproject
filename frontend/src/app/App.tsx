import { BrowserRouter } from 'react-router';
import { AppRoutes } from './AppRoutes';

/** Raíz de la SPA: el router (DEV-006). `main.tsx` la envuelve con `I18nProvider` y los estilos. */
export function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
