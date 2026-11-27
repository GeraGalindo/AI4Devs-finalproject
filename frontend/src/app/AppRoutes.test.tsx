import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useLocation } from 'react-router';
import { I18nProvider } from '../i18n/I18nProvider';
import { App } from './App';
import { AppRoutes } from './AppRoutes';

const user = { id: 'u-1', email: 'ana@example.com', timezone: 'Europe/Madrid', availableWeekdays: null };

function Location() {
  return <output data-testid="location">{useLocation().pathname}</output>;
}

function json(status: number, body: unknown) {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
}
const health = () => json(200, { status: 'ok', database: 'up' });
const unauthenticated = () => json(401, { error: { code: 'UNAUTHENTICATED', message: 'x', requestId: 'r' } });

/** `fetch` simulado: `/api/health` siempre en verde y `/api/auth/me` con las respuestas dadas, en orden. */
function stubApi(me: (() => Response | Promise<Response>)[] = []) {
  const queue = [...me];
  const fetchMock = vi.fn(async (url: string) => {
    if (url === '/api/health') return health();
    if (url === '/api/auth/me') {
      const next = queue.shift();
      if (!next) throw new Error('unexpected /api/auth/me');
      return next();
    }
    throw new Error(`unexpected fetch ${url}`);
  });
  vi.stubGlobal('fetch', fetchMock);
  return { fetchMock, meCalls: () => fetchMock.mock.calls.filter((call) => call[0] === '/api/auth/me').length };
}

function renderAt(path: string) {
  render(
    <I18nProvider>
      <MemoryRouter initialEntries={[path]}>
        <AppRoutes />
        <Location />
      </MemoryRouter>
    </I18nProvider>,
  );
}

const location = () => screen.getByTestId('location');

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('AppRoutes (DEV-006 and DEV-007, partial)', () => {
  it('/diagnostics shows the diagnostics view and never restores the session', async () => {
    const { meCalls } = stubApi();
    renderAt('/diagnostics');
    expect(await screen.findByText('All systems operational.')).toBeInTheDocument();
    expect(location()).toHaveTextContent('/diagnostics');
    expect(meCalls()).toBe(0);
  });

  it('/ without a session → /signup, after a single GET /api/auth/me', async () => {
    const { meCalls } = stubApi([unauthenticated]);
    renderAt('/');
    expect(await screen.findByRole('heading', { name: 'Create your account' })).toBeInTheDocument();
    expect(location()).toHaveTextContent('/signup');
    expect(meCalls()).toBe(1);
  });

  it('/ with a session shows the provisional view with the email', async () => {
    stubApi([() => json(200, { user })]);
    renderAt('/');
    expect(await screen.findByTestId('signed-in-as')).toHaveTextContent('You are signed in as ana@example.com.');
    expect(location()).toHaveTextContent('/');
  });

  it('/signup with a session → /', async () => {
    stubApi([() => json(200, { user })]);
    renderAt('/signup');
    expect(await screen.findByTestId('signed-in-as')).toBeInTheDocument();
    expect(location()).toHaveTextContent('/');
  });

  it('/signup without a session shows the form', async () => {
    stubApi([unauthenticated]);
    renderAt('/signup');
    expect(await screen.findByRole('heading', { name: 'Create your account' })).toBeInTheDocument();
    expect(location()).toHaveTextContent('/signup');
  });

  it('shows the loading status while the session is being restored', async () => {
    let release!: (response: Response) => void;
    stubApi([() => new Promise<Response>((resolve) => (release = resolve))]);
    renderAt('/');
    expect(screen.getByText('Loading…')).toHaveAttribute('role', 'status');
    await act(async () => release(unauthenticated()));
    expect(await screen.findByRole('heading', { name: 'Create your account' })).toBeInTheDocument();
  });

  it.each(['/', '/signup'])('%s when the session is unavailable: translated message and retry', async (path) => {
    const u = userEvent.setup();
    const { meCalls } = stubApi([() => json(503, { error: { code: 'TEMPORARILY_UNAVAILABLE', message: 'x' } }), () => json(200, { user })]);
    renderAt(path);
    expect(await screen.findByRole('alert')).toHaveTextContent('We could not check your session.');
    await u.click(screen.getByRole('button', { name: 'Try again' }));
    expect(await screen.findByTestId('signed-in-as')).toBeInTheDocument();
    expect(meCalls()).toBe(2);
  });

  it.each(['/today', '/does/not/exist'])('%s → / → /signup without a session', async (path) => {
    stubApi([unauthenticated]);
    renderAt(path);
    expect(await screen.findByRole('heading', { name: 'Create your account' })).toBeInTheDocument();
    expect(location()).toHaveTextContent('/signup');
  });

  it('a successful registration leads to the provisional view; a reload restores it with GET /me', async () => {
    const u = userEvent.setup();
    const registered = { ...user, email: 'bea@example.com' };
    const fetchMock = vi.fn(async (url: string) => {
      if (url === '/api/auth/me') return unauthenticated();
      if (url === '/api/auth/register') return json(201, { user: registered });
      throw new Error(`unexpected fetch ${url}`);
    });
    vi.stubGlobal('fetch', fetchMock);
    renderAt('/signup');
    await u.type(await screen.findByLabelText('Email'), 'Bea@Example.com');
    await u.type(screen.getByLabelText('Password'), 'correct horse battery');
    await u.click(screen.getByRole('button', { name: 'Create account' }));
    expect(await screen.findByTestId('signed-in-as')).toHaveTextContent('bea@example.com');
    expect(location()).toHaveTextContent('/');
  });

  it('App mounts the browser router', async () => {
    stubApi();
    window.history.pushState({}, '', '/diagnostics');
    render(
      <I18nProvider>
        <App />
      </I18nProvider>,
    );
    expect(await screen.findByText('All systems operational.')).toBeInTheDocument();
    expect(window.location.pathname).toBe('/diagnostics');
  });
});
