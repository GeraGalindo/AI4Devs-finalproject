import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router';
import { Card } from '../../shared/ui/Card';
import { useSession } from './session';
import { SessionStatus } from './SessionStatus';
import './AuthPage.css';

/**
 * `/` (DEV-007, parcial). Sin sesión → `/signup`. Con sesión, una vista **provisional** con el
 * email, hasta que exista *Today* (S-06): es una excepción temporal, aprobada por el autor, a la
 * regla de `docs/design-system.md` §9 contra los marcadores de posición.
 */
export function HomeRoute() {
  const { t } = useTranslation(['common', 'auth']);
  const { state } = useSession();

  if (state.status === 'unauthenticated') return <Navigate to="/signup" replace />;
  if (state.status !== 'authenticated') return <SessionStatus />;

  return (
    <main className="cc-auth-page">
      <Card className="cc-auth-page__card">
        <h1 className="cc-auth-page__title">{t('common:appName')}</h1>
        <p data-testid="signed-in-as">{t('auth:session.signedInAs', { email: state.user.email })}</p>
      </Card>
    </main>
  );
}
