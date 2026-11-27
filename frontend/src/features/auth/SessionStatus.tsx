import { useTranslation } from 'react-i18next';
import { Button } from '../../shared/ui/Button';
import { Card } from '../../shared/ui/Card';
import { InlineAlert } from '../../shared/ui/InlineAlert';
import { useSession } from './session';
import './AuthPage.css';

/** Mientras se consulta la sesión, o si no se ha podido comprobar (`unavailable`), con reintento. */
export function SessionStatus() {
  const { t } = useTranslation(['common', 'auth']);
  const { state, restore } = useSession();

  return (
    <main className="cc-auth-page">
      <Card className="cc-auth-page__card">
        {state.status === 'unavailable' ? (
          <div className="cc-auth-status">
            <InlineAlert tone="error">{t('auth:session.unavailable')}</InlineAlert>
            <Button variant="secondary" onClick={restore}>
              {t('common:actions.retry')}
            </Button>
          </div>
        ) : (
          <p role="status">{t('common:status.loading')}</p>
        )}
      </Card>
    </main>
  );
}
