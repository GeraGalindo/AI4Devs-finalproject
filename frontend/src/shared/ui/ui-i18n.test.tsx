import { render, screen } from '@testing-library/react';
import { useTranslation } from 'react-i18next';
import { createI18n } from '../../i18n/config';
import { translateErrorCode } from '../../i18n/errors';
import { I18nProvider } from '../../i18n/I18nProvider';
import { takeMissingKeys } from '../../test/missing-keys';
import { Button } from './Button';
import { Card } from './Card';
import { InlineAlert } from './InlineAlert';
import { TextField } from './TextField';

/**
 * Los componentes no traducen: reciben textos ya traducidos por props. Este formulario de
 * prueba (no es una pantalla de la app) los usa como lo hará DEV-007.
 */
function Sample({ code, fieldKey }: { code?: string; fieldKey?: 'auth:signUp.title' }) {
  // Las claves con prefijo (`auth:…`) exigen declarar sus espacios de nombres en el hook.
  const { t, i18n } = useTranslation(['auth', 'common']);
  return (
    <Card>
      <h1>{t('auth:signUp.title')}</h1>
      {code && <InlineAlert tone="error">{translateErrorCode(i18n, code)}</InlineAlert>}
      <TextField label={t(fieldKey ?? 'common:appName')} error={code ? translateErrorCode(i18n, code) : undefined} />
      <Button loading>{t('common:actions.retry')}</Button>
    </Card>
  );
}

describe('UI components with i18n', () => {
  it('render translated texts and translated API errors', () => {
    render(
      <I18nProvider>
        <Sample code="EMAIL_ALREADY_REGISTERED" />
      </I18nProvider>,
    );
    expect(screen.getByRole('heading', { name: 'Create your account' })).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('This email already has an account.');
    expect(screen.getByLabelText('Cali Coach')).toHaveAccessibleDescription('This email already has an account.');
    expect(screen.getByRole('button', { name: 'Try again' })).toHaveAttribute('aria-busy', 'true');
  });

  it('show the generic message for an unknown error code', () => {
    render(
      <I18nProvider>
        <Sample code="SOMETHING_NEW" />
      </I18nProvider>,
    );
    expect(screen.getByRole('alert')).toHaveTextContent('Something went wrong. Please try again.');
  });

  it('still fail the test when the consumer uses a missing key', () => {
    render(
      <I18nProvider instance={createI18n()}>
        <Sample fieldKey={'auth:signUp.nope' as 'auth:signUp.title'} />
      </I18nProvider>,
    );
    expect(takeMissingKeys()).toEqual(['auth:signUp.nope']);
  });
});
