import { render, screen } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router';
import { App } from './App';
import { AppRoutes } from './AppRoutes';

function Location() {
  return <output data-testid="location">{useLocation().pathname}</output>;
}

function healthOk() {
  return vi.fn(async () =>
    new Response(JSON.stringify({ status: 'ok', database: 'up' }), { status: 200, headers: { 'Content-Type': 'application/json' } }),
  );
}

function renderAt(path: string) {
  const fetchMock = healthOk();
  vi.stubGlobal('fetch', fetchMock);
  render(
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
      <Location />
    </MemoryRouter>,
  );
  return fetchMock;
}

const calledUrls = (fetchMock: ReturnType<typeof healthOk>) => fetchMock.mock.calls.map((call) => (call as unknown[])[0]);

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('AppRoutes (DEV-006, partial)', () => {
  it('/diagnostics shows the diagnostics view', async () => {
    const fetchMock = renderAt('/diagnostics');
    expect(await screen.findByText('All systems operational.')).toBeInTheDocument();
    expect(screen.getByTestId('location')).toHaveTextContent('/diagnostics');
    expect(calledUrls(fetchMock)).toEqual(['/api/health']);
  });

  it('/ redirects to /diagnostics for now', async () => {
    renderAt('/');
    expect(await screen.findByText('All systems operational.')).toBeInTheDocument();
    expect(screen.getByTestId('location')).toHaveTextContent('/diagnostics');
  });

  it.each(['/today', '/signup', '/does/not/exist'])('%s (not registered yet) ends in /diagnostics through /', async (path) => {
    renderAt(path);
    expect(await screen.findByText('All systems operational.')).toBeInTheDocument();
    expect(screen.getByTestId('location')).toHaveTextContent('/diagnostics');
  });

  it('no active route calls GET /api/auth/me', async () => {
    for (const path of ['/', '/diagnostics', '/signup']) {
      const fetchMock = renderAt(path);
      await screen.findAllByText('All systems operational.');
      expect(calledUrls(fetchMock)).not.toContain('/api/auth/me');
    }
  });

  it('App mounts the browser router', async () => {
    vi.stubGlobal('fetch', healthOk());
    window.history.pushState({}, '', '/');
    render(<App />);
    expect(await screen.findByText('All systems operational.')).toBeInTheDocument();
    expect(window.location.pathname).toBe('/diagnostics');
  });
});
