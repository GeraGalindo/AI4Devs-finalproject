import { act, render, screen } from '@testing-library/react';
import { StrictMode, useEffect } from 'react';
import { ApiError } from '../../shared/api/client';
import { useSession, type Session } from './session';
import { SessionProvider, type FetchCurrentUser } from './SessionProvider';
import type { PublicUser } from './types';

const ana: PublicUser = { id: 'u-1', email: 'ana@example.com', timezone: 'Europe/Madrid', availableWeekdays: null };
const bea: PublicUser = { id: 'u-2', email: 'bea@example.com', timezone: 'UTC', availableWeekdays: [1, 3] };

/** Expone la sesión a la prueba y muestra su estado (sin textos de la app: solo datos de prueba). */
let session: Session | undefined;
function Probe() {
  const current = useSession();
  useEffect(() => {
    session = current;
  });
  const { state } = current;
  return <output data-testid="state">{state.status === 'authenticated' ? `${state.status}:${state.user.email}` : state.status}</output>;
}

function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

/** Cada llamada devuelve la siguiente promesa controlada y guarda su señal. */
function controlledFetch() {
  const calls: { signal: AbortSignal; result: ReturnType<typeof deferred<PublicUser>> }[] = [];
  const fetchUser = vi.fn<FetchCurrentUser>((signal) => {
    const result = deferred<PublicUser>();
    calls.push({ signal, result });
    return result.promise;
  });
  return { fetchUser, calls };
}

function renderSession(fetchUser: FetchCurrentUser, strict = false) {
  const tree = (
    <SessionProvider fetchUser={fetchUser}>
      <Probe />
    </SessionProvider>
  );
  return render(strict ? <StrictMode>{tree}</StrictMode> : tree);
}

const state = () => screen.getByTestId('state').textContent;
const httpError = (status: number, code?: string) => new ApiError('http', { status, ...(code ? { code } : {}) });

afterEach(() => {
  session = undefined;
  vi.unstubAllGlobals();
});

describe('SessionProvider', () => {
  it('starts loading and restores with GET /api/auth/me: 200 → authenticated', async () => {
    const fetchMock = vi.fn(async () => new Response(JSON.stringify({ user: ana }), { status: 200, headers: { 'Content-Type': 'application/json' } }));
    vi.stubGlobal('fetch', fetchMock);
    render(
      <SessionProvider>
        <Probe />
      </SessionProvider>,
    );
    expect(state()).toBe('loading');
    expect(await screen.findByText('authenticated:ana@example.com')).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith('/api/auth/me', expect.objectContaining({ method: 'GET' }));
  });

  it('401 UNAUTHENTICATED from the real API → unauthenticated', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () =>
        new Response(JSON.stringify({ error: { code: 'UNAUTHENTICATED', message: 'x', requestId: 'r' } }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        }),
      ),
    );
    render(
      <SessionProvider>
        <Probe />
      </SessionProvider>,
    );
    expect(await screen.findByText('unauthenticated')).toBeInTheDocument();
  });

  it.each([
    ['401 with another code', httpError(401, 'INVALID_CREDENTIALS')],
    ['401 without a code', new ApiError('invalid-response', { status: 401 })],
    ['403', httpError(403, 'CSRF_REJECTED')],
    ['429', httpError(429, 'RATE_LIMITED')],
    ['500', httpError(500, 'INTERNAL_ERROR')],
    ['503', httpError(503, 'TEMPORARILY_UNAVAILABLE')],
    ['a network error', new ApiError('network')],
    ['an invalid response', new ApiError('invalid-response', { status: 200 })],
    ['an unexpected exception', new TypeError('boom')],
  ])('%s → unavailable, keeping the error', async (_label, error) => {
    const { fetchUser, calls } = controlledFetch();
    renderSession(fetchUser);
    await act(async () => calls[0]?.result.reject(error));
    expect(state()).toBe('unavailable');
    const current = session?.state;
    expect(current?.status === 'unavailable' && current.error).toBeInstanceOf(ApiError);
  });

  it('an aborted request does not become unavailable', async () => {
    const { fetchUser, calls } = controlledFetch();
    renderSession(fetchUser);
    await act(async () => calls[0]?.result.reject(new ApiError('aborted')));
    expect(state()).toBe('loading');
  });

  it('restore() retries after unavailable and can authenticate', async () => {
    const { fetchUser, calls } = controlledFetch();
    renderSession(fetchUser);
    await act(async () => calls[0]?.result.reject(new ApiError('network')));
    expect(state()).toBe('unavailable');

    act(() => session?.restore());
    expect(state()).toBe('loading');
    expect(fetchUser).toHaveBeenCalledTimes(2);
    await act(async () => calls[1]?.result.resolve(ana));
    expect(state()).toBe('authenticated:ana@example.com');
  });

  it('restore() during a restore aborts and ignores the previous request', async () => {
    const { fetchUser, calls } = controlledFetch();
    renderSession(fetchUser);
    act(() => session?.restore());
    expect(calls[0]?.signal.aborted).toBe(true);

    await act(async () => calls[1]?.result.resolve(bea));
    await act(async () => calls[0]?.result.resolve(ana));
    expect(state()).toBe('authenticated:bea@example.com');
  });

  it('aborts the pending request on unmount', () => {
    const { fetchUser, calls } = controlledFetch();
    const { unmount } = renderSession(fetchUser);
    expect(calls[0]?.signal.aborted).toBe(false);
    unmount();
    expect(calls[0]?.signal.aborted).toBe(true);
  });

  it('signedIn during a restore wins: a late 401 or a late user cannot overwrite it', async () => {
    const { fetchUser, calls } = controlledFetch();
    renderSession(fetchUser);
    act(() => session?.signedIn(bea));
    expect(state()).toBe('authenticated:bea@example.com');
    expect(calls[0]?.signal.aborted).toBe(true);

    await act(async () => calls[0]?.result.reject(httpError(401, 'UNAUTHENTICATED')));
    expect(state()).toBe('authenticated:bea@example.com');
    await act(async () => calls[0]?.result.resolve(ana));
    expect(state()).toBe('authenticated:bea@example.com');
  });

  it('signedIn during an explicit restore() also wins', async () => {
    const { fetchUser, calls } = controlledFetch();
    renderSession(fetchUser);
    await act(async () => calls[0]?.result.reject(new ApiError('network')));
    act(() => session?.restore());
    act(() => session?.signedIn(bea));
    await act(async () => calls[1]?.result.resolve(ana));
    expect(state()).toBe('authenticated:bea@example.com');
  });

  it('signedOut() → unauthenticated, and a pending restore cannot undo it', async () => {
    const { fetchUser, calls } = controlledFetch();
    renderSession(fetchUser);
    await act(async () => calls[0]?.result.resolve(ana));
    act(() => session?.restore());
    act(() => session?.signedOut());
    expect(state()).toBe('unauthenticated');
    await act(async () => calls[1]?.result.resolve(ana));
    expect(state()).toBe('unauthenticated');
  });

  it('StrictMode: the first mount is aborted and only the last request counts', async () => {
    const { fetchUser, calls } = controlledFetch();
    renderSession(fetchUser, true);
    expect(calls).toHaveLength(2);
    expect(calls[0]?.signal.aborted).toBe(true);
    expect(calls[1]?.signal.aborted).toBe(false);

    await act(async () => calls[0]?.result.resolve(bea));
    expect(state()).toBe('loading');
    await act(async () => calls[1]?.result.resolve(ana));
    expect(state()).toBe('authenticated:ana@example.com');
  });

  it('does not use localStorage or read cookies', async () => {
    const setItem = vi.spyOn(Storage.prototype, 'setItem');
    const getItem = vi.spyOn(Storage.prototype, 'getItem');
    const cookie = vi.spyOn(document, 'cookie', 'get');
    try {
      const { fetchUser, calls } = controlledFetch();
      renderSession(fetchUser);
      await act(async () => calls[0]?.result.resolve(ana));
      act(() => session?.signedOut());
      expect(setItem).not.toHaveBeenCalled();
      expect(getItem).not.toHaveBeenCalled();
      expect(cookie).not.toHaveBeenCalled();
    } finally {
      setItem.mockRestore();
      getItem.mockRestore();
      cookie.mockRestore();
    }
  });

  it('useSession() outside the provider fails explicitly', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    try {
      expect(() => render(<Probe />)).toThrow('useSession() must be used inside <SessionProvider>');
    } finally {
      error.mockRestore();
    }
  });
});
