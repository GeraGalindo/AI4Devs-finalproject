import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router';
import { I18nProvider } from '../../i18n/I18nProvider';
import { SessionContext, type Session } from './session';
import { SignUpPage } from './SignUpPage';
import type { PublicUser } from './types';

const user: PublicUser = { id: 'u-1', email: 'ana@example.com', timezone: 'America/Bogota', availableWeekdays: null };
const PASSWORD = 'correct horse battery';
const TECHNICAL = 'Technical backend text that must never be shown';

type Reply = Response | Error | (() => Promise<Response>);

function json(status: number, body: unknown, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', ...headers } });
}
const apiError = (status: number, code: string, extra: Record<string, unknown> = {}, headers: Record<string, string> = {}) =>
  json(status, { error: { code, message: TECHNICAL, requestId: 'r-1', ...extra } }, headers);

/** `fetch` simulado por ruta: cada llamada consume la siguiente respuesta de su lista. */
function stubApi(routes: { register?: Reply[]; me?: Reply[] }) {
  const queues = { register: [...(routes.register ?? [])], me: [...(routes.me ?? [])] };
  const fetchMock = vi.fn(async (url: string, _init?: RequestInit) => {
    const queue = url === '/api/auth/register' ? queues.register : url === '/api/auth/me' ? queues.me : undefined;
    const next = queue?.shift();
    if (!next) throw new Error(`unexpected fetch ${url}`);
    if (next instanceof Error) throw next;
    return typeof next === 'function' ? next() : next;
  });
  vi.stubGlobal('fetch', fetchMock);
  const calls = (url: string) => fetchMock.mock.calls.filter((call) => call[0] === url);
  return { fetchMock, calls };
}

function mockTimeZone(timeZone: unknown) {
  const real = Intl.DateTimeFormat.prototype.resolvedOptions;
  vi.spyOn(Intl.DateTimeFormat.prototype, 'resolvedOptions').mockImplementation(function (this: Intl.DateTimeFormat) {
    return { ...real.call(this), timeZone } as Intl.ResolvedDateTimeFormatOptions;
  });
}

function renderPage() {
  const session: Session = { state: { status: 'unauthenticated' }, restore: vi.fn(), signedIn: vi.fn(), signedOut: vi.fn() };
  render(
    <I18nProvider>
      <SessionContext.Provider value={session}>
        <MemoryRouter initialEntries={['/signup']}>
          <Routes>
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/" element={<p>home</p>} />
          </Routes>
        </MemoryRouter>
      </SessionContext.Provider>
    </I18nProvider>,
  );
  return session;
}

const email = () => screen.getByLabelText('Email');
const password = () => screen.getByLabelText('Password');
const submit = () => screen.getByRole('button', { name: 'Create account' });

async function fill(u: ReturnType<typeof userEvent.setup>, values: { email?: string; password?: string } = {}) {
  await u.type(email(), values.email ?? 'Ana@Example.com');
  await u.type(password(), values.password ?? PASSWORD);
}

function bodyOf(call: unknown[]) {
  return JSON.parse(String((call[1] as RequestInit).body)) as Record<string, unknown>;
}

beforeEach(() => {
  mockTimeZone('America/Bogota');
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('SignUpPage: form', () => {
  it('shows the fields, the detected time zone and the submit button, with labels and hints', () => {
    renderPage();
    expect(screen.getByRole('heading', { level: 1, name: 'Create your account' })).toBeInTheDocument();
    expect(email()).toHaveAttribute('type', 'email');
    expect(email()).toHaveAttribute('autocomplete', 'email');
    expect(password()).toHaveAttribute('type', 'password');
    expect(password()).toHaveAttribute('autocomplete', 'new-password');
    expect(password()).toHaveAccessibleDescription('Use 12 to 128 characters.');
    expect(screen.getByText('Time zone: America/Bogota')).toBeInTheDocument();
    expect(screen.queryByLabelText('Time zone')).not.toBeInTheDocument();
    expect(submit()).toHaveAttribute('type', 'submit');
    expect(screen.queryByLabelText(/confirm/i)).not.toBeInTheDocument();
  });

  it('registers with the typed email, the password and the detected time zone, then signs in and goes to /', async () => {
    const u = userEvent.setup();
    const { calls } = stubApi({ register: [json(201, { user })] });
    const session = renderPage();
    await fill(u);
    await u.click(submit());

    expect(await screen.findByText('home')).toBeInTheDocument();
    expect(session.signedIn).toHaveBeenCalledWith(user);
    const [call] = calls('/api/auth/register');
    expect(bodyOf(call as unknown[])).toEqual({ email: 'Ana@Example.com', password: PASSWORD, timezone: 'America/Bogota' });
    expect((call?.[1] as RequestInit).headers).toMatchObject({ 'X-CSRF-Protection': '1', 'Content-Type': 'application/json' });
  });

  it('validates locally, shows the errors next to the fields with a summary and focuses the first one', async () => {
    const u = userEvent.setup();
    const { fetchMock } = stubApi({});
    renderPage();
    await u.type(email(), 'not-an-email');
    await u.type(password(), 'short');
    await u.click(submit());

    expect(screen.getByRole('alert')).toHaveTextContent('Check the highlighted fields.');
    expect(email()).toHaveAttribute('aria-invalid', 'true');
    expect(email()).toHaveAccessibleDescription('Enter a valid email address, such as name@example.com.');
    expect(password()).toHaveAttribute('aria-invalid', 'true');
    expect(password()).toHaveAccessibleDescription('Use 12 to 128 characters. Use at least 12 characters.');
    expect(email()).toHaveFocus();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('asks for the missing values', async () => {
    const u = userEvent.setup();
    stubApi({});
    renderPage();
    await u.click(submit());
    expect(email()).toHaveAccessibleDescription('Enter your email.');
    expect(password()).toHaveAccessibleDescription('Use 12 to 128 characters. Enter a password.');
  });

  it('keeps what was typed after an error', async () => {
    const u = userEvent.setup();
    stubApi({ register: [apiError(409, 'EMAIL_ALREADY_REGISTERED')] });
    renderPage();
    await fill(u);
    await u.click(submit());
    await screen.findByRole('alert');
    expect(email()).toHaveValue('Ana@Example.com');
    expect(password()).toHaveValue(PASSWORD);
  });
});

describe('SignUpPage: duplicate submissions', () => {
  it('sends a single request on double click, repeated Enter and clicks while it is pending', async () => {
    const u = userEvent.setup();
    let release!: () => void;
    const pending = new Promise<void>((resolve) => {
      release = resolve;
    });
    const { calls } = stubApi({
      register: [
        async () => {
          await pending;
          return json(201, { user });
        },
      ],
    });
    renderPage();
    await fill(u);
    await u.dblClick(submit());
    await u.type(password(), '{Enter}{Enter}');
    await u.click(submit());
    expect(submit()).toHaveAttribute('aria-busy', 'true');
    expect(calls('/api/auth/register')).toHaveLength(1);

    await act(async () => release());
    expect(await screen.findByText('home')).toBeInTheDocument();
    expect(calls('/api/auth/register')).toHaveLength(1);
  });
});

describe('SignUpPage: API errors (never the server text)', () => {
  it('400 VALIDATION_ERROR: marks the invalid fields with frontend messages and focuses the first one', async () => {
    const u = userEvent.setup();
    stubApi({
      register: [
        apiError(400, 'VALIDATION_ERROR', {
          details: { fields: [{ path: 'body.password', message: TECHNICAL }, { path: 'body.email', message: TECHNICAL }] },
        }),
      ],
    });
    renderPage();
    await fill(u);
    await u.click(submit());

    expect(await screen.findByRole('alert')).toHaveTextContent('Check the highlighted fields.');
    expect(email()).toHaveAccessibleDescription('Enter a valid email address, such as name@example.com.');
    expect(password()).toHaveAttribute('aria-invalid', 'true');
    expect(email()).toHaveFocus();
    expect(document.body).not.toHaveTextContent(TECHNICAL);
  });

  it('400 on timezone: switches to manual selection so it can be corrected', async () => {
    const u = userEvent.setup();
    stubApi({ register: [apiError(400, 'VALIDATION_ERROR', { details: { fields: [{ path: 'body.timezone', message: TECHNICAL }] } })] });
    renderPage();
    await fill(u);
    await u.click(submit());

    const select = await screen.findByRole('combobox', { name: 'Time zone' });
    expect(select).toHaveAttribute('aria-invalid', 'true');
    expect(select).toHaveFocus();
    expect(document.body).not.toHaveTextContent(TECHNICAL);
  });

  it('400 without known fields: the translated code', async () => {
    const u = userEvent.setup();
    stubApi({ register: [apiError(400, 'VALIDATION_ERROR')] });
    renderPage();
    await fill(u);
    await u.click(submit());
    expect(await screen.findByRole('alert')).toHaveTextContent('Some fields are not valid. Check them and try again.');
  });

  it('409 EMAIL_ALREADY_REGISTERED: error on the email field', async () => {
    const u = userEvent.setup();
    const session = renderPage();
    stubApi({ register: [apiError(409, 'EMAIL_ALREADY_REGISTERED')] });
    await fill(u);
    await u.click(submit());

    await screen.findByRole('alert');
    expect(email()).toHaveAttribute('aria-invalid', 'true');
    expect(email()).toHaveAccessibleDescription('This email already has an account.');
    expect(email()).toHaveFocus();
    expect(session.signedIn).not.toHaveBeenCalled();
  });

  it.each([
    [3600, 'Too many attempts. Try again in 60 minutes.'],
    [61, 'Too many attempts. Try again in 2 minutes.'],
    [30, 'Too many attempts. Try again in 1 minute.'],
  ])('429 with Retry-After %i s: minutes rounded up', async (seconds, message) => {
    const u = userEvent.setup();
    stubApi({ register: [apiError(429, 'RATE_LIMITED', {}, { 'Retry-After': String(seconds) })] });
    renderPage();
    await fill(u);
    await u.click(submit());
    expect(await screen.findByRole('alert')).toHaveTextContent(message);
  });

  it('429 without Retry-After: the translated code', async () => {
    const u = userEvent.setup();
    stubApi({ register: [apiError(429, 'RATE_LIMITED')] });
    renderPage();
    await fill(u);
    await u.click(submit());
    expect(await screen.findByRole('alert')).toHaveTextContent('Too many attempts. Please wait and try again later.');
  });

  it.each([
    [403, 'CSRF_REJECTED', 'The request was blocked for security reasons. Reload the page and try again.'],
    [413, 'PAYLOAD_TOO_LARGE', 'The request is too large.'],
    [415, 'UNSUPPORTED_MEDIA_TYPE', 'The request could not be processed. Please try again.'],
    [500, 'INTERNAL_ERROR', 'Something went wrong on our side. Please try again.'],
    [503, 'TEMPORARILY_UNAVAILABLE', 'The service is temporarily unavailable. Please try again.'],
    [500, 'SOMETHING_NEW', 'Something went wrong. Please try again.'],
  ])('%i %s: translated by code', async (status, code, message) => {
    const u = userEvent.setup();
    stubApi({ register: [apiError(status, code)] });
    renderPage();
    await fill(u);
    await u.click(submit());
    expect(await screen.findByRole('alert')).toHaveTextContent(message);
    expect(document.body).not.toHaveTextContent(TECHNICAL);
  });
});

describe('SignUpPage: recovery after a network error or an invalid response', () => {
  it.each([
    ['a network error', new TypeError('Failed to fetch')],
    ['an invalid response', new Response('<html>gateway</html>', { status: 502, headers: { 'Content-Type': 'text/html' } })],
  ])('after %s, GET /me 200 signs in and goes to /, without repeating the registration', async (_label, failure) => {
    const u = userEvent.setup();
    const { calls } = stubApi({ register: [failure], me: [json(200, { user })] });
    const session = renderPage();
    await fill(u);
    await u.click(submit());

    expect(await screen.findByText('home')).toBeInTheDocument();
    expect(session.signedIn).toHaveBeenCalledWith(user);
    expect(calls('/api/auth/register')).toHaveLength(1);
    expect(calls('/api/auth/me')).toHaveLength(1);
  });

  it('GET /me 401 UNAUTHENTICATED: keeps the form and says the account was not created', async () => {
    const u = userEvent.setup();
    const { calls } = stubApi({ register: [new TypeError('Failed to fetch')], me: [apiError(401, 'UNAUTHENTICATED')] });
    const session = renderPage();
    await fill(u);
    await u.click(submit());

    expect(await screen.findByRole('alert')).toHaveTextContent('We could not create your account. Check your connection and try again.');
    expect(email()).toHaveValue('Ana@Example.com');
    expect(session.signedIn).not.toHaveBeenCalled();
    expect(calls('/api/auth/register')).toHaveLength(1);
  });

  it('GET /me fails too: the result is uncertain and "Check again" only repeats GET /me', async () => {
    const u = userEvent.setup();
    const { calls } = stubApi({
      register: [new TypeError('Failed to fetch')],
      me: [new TypeError('Failed to fetch'), apiError(503, 'TEMPORARILY_UNAVAILABLE'), json(200, { user })],
    });
    const session = renderPage();
    await fill(u);
    await u.click(submit());

    expect(await screen.findByRole('alert')).toHaveTextContent('We could not confirm whether your account was created.');
    await u.click(screen.getByRole('button', { name: 'Check again' }));
    await waitFor(() => expect(calls('/api/auth/me')).toHaveLength(2));
    expect(await screen.findByRole('button', { name: 'Check again' })).toBeInTheDocument();

    await u.click(screen.getByRole('button', { name: 'Check again' }));
    expect(await screen.findByText('home')).toBeInTheDocument();
    expect(session.signedIn).toHaveBeenCalledWith(user);
    expect(calls('/api/auth/register')).toHaveLength(1);
    expect(calls('/api/auth/me')).toHaveLength(3);
  });
});

describe('SignUpPage: manual time zone', () => {
  it('without a valid detected zone: a select with no zone chosen, and nothing is sent until one is chosen', async () => {
    mockTimeZone('Etc/Unknown');
    const u = userEvent.setup();
    const { calls } = stubApi({ register: [json(201, { user: { ...user, timezone: 'Asia/Tokyo' } })] });
    renderPage();

    const select = screen.getByRole('combobox', { name: 'Time zone' });
    expect(select).toHaveValue('');
    expect(select).toHaveAccessibleDescription('We could not detect your time zone. It decides which day counts as today.');
    expect(screen.getByRole('option', { name: 'UTC' })).toBeInTheDocument();
    expect(screen.queryByText(/^Time zone: /)).not.toBeInTheDocument();

    await fill(u);
    await u.click(submit());
    expect(select).toHaveAttribute('aria-invalid', 'true');
    expect(select).toHaveFocus();
    expect(calls('/api/auth/register')).toHaveLength(0);

    await u.selectOptions(select, 'Asia/Tokyo');
    await u.click(submit());
    await screen.findByText('home');
    expect(bodyOf(calls('/api/auth/register')[0] as unknown[]).timezone).toBe('Asia/Tokyo');
  });

  it('without Intl.supportedValuesOf: a validated text field', async () => {
    mockTimeZone(undefined);
    const original = Intl.supportedValuesOf;
    Object.defineProperty(Intl, 'supportedValuesOf', { value: undefined, configurable: true, writable: true });
    try {
      const u = userEvent.setup();
      const { calls } = stubApi({ register: [json(201, { user: { ...user, timezone: 'Europe/Madrid' } })] });
      renderPage();
      const field = screen.getByRole('textbox', { name: 'Time zone' });

      await fill(u);
      await u.type(field, '+01:00');
      await u.click(submit());
      expect(field).toHaveAccessibleDescription('Enter an IANA time zone, such as Europe/Madrid. Choose a valid time zone.');
      expect(calls('/api/auth/register')).toHaveLength(0);

      await u.clear(field);
      await u.type(field, 'Europe/Madrid');
      await u.click(submit());
      await screen.findByText('home');
      expect(bodyOf(calls('/api/auth/register')[0] as unknown[]).timezone).toBe('Europe/Madrid');
    } finally {
      Object.defineProperty(Intl, 'supportedValuesOf', { value: original, configurable: true, writable: true });
    }
  });
});
