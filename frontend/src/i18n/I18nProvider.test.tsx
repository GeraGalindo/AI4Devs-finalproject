import { render, screen } from '@testing-library/react';
import { useTranslation } from 'react-i18next';
import { App } from '../app/App';
import { takeMissingKeys } from '../test/missing-keys';
import { createI18n } from './config';
import { translateErrorCode } from './errors';
import { I18nProvider } from './I18nProvider';

function Title() {
  const { t } = useTranslation('auth');
  return <h1>{t('signUp.title')}</h1>;
}

function ErrorMessage({ code }: { code: string }) {
  const { i18n } = useTranslation();
  return <p role="alert">{translateErrorCode(i18n, code)}</p>;
}

function Broken() {
  const { t } = useTranslation();
  return <p>{t('missing.key' as 'appName')}</p>;
}

describe('I18nProvider', () => {
  it('provides translations to components with the application instance', () => {
    render(
      <I18nProvider>
        <Title />
      </I18nProvider>,
    );
    expect(screen.getByRole('heading', { name: 'Create your account' })).toBeInTheDocument();
  });

  it('accepts an isolated instance', () => {
    const instance = createI18n();
    instance.addResource('en', 'auth', 'signUp.title', 'Isolated title');
    render(
      <I18nProvider instance={instance}>
        <Title />
      </I18nProvider>,
    );
    expect(screen.getByRole('heading', { name: 'Isolated title' })).toBeInTheDocument();
  });

  it('shows translated error codes, never the server message', () => {
    render(
      <I18nProvider>
        <ErrorMessage code="EMAIL_ALREADY_REGISTERED" />
      </I18nProvider>,
    );
    expect(screen.getByRole('alert')).toHaveTextContent('This email already has an account.');
  });

  it('reports a missing key used by a component', () => {
    render(
      <I18nProvider>
        <Broken />
      </I18nProvider>,
    );
    expect(screen.getByText('missing.key')).toBeInTheDocument();
    expect(takeMissingKeys()).toEqual(['common:missing.key']);
  });

  it('mounts the App inside the provider without breaking the diagnostics view', async () => {
    const fetchFn = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ status: 'ok', database: 'up' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );
    vi.stubGlobal('fetch', fetchFn);
    // Desde DEV-007, `/` restaura la sesión: la vista de diagnóstico está en `/diagnostics`.
    window.history.pushState({}, '', '/diagnostics');
    try {
      render(
        <I18nProvider>
          <App />
        </I18nProvider>,
      );
      expect(screen.getByRole('heading', { name: 'Cali Coach — System status' })).toBeInTheDocument();
      expect(await screen.findByText('All systems operational.')).toBeInTheDocument();
      expect(fetchFn).toHaveBeenCalledWith('/api/health', expect.anything());
    } finally {
      vi.unstubAllGlobals();
    }
  });
});
