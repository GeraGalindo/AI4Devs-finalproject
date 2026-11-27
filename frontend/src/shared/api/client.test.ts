import { ApiError, apiRequest, isApiPath } from './client';

type FetchArgs = [string, RequestInit];

function jsonResponse(status: number, body: unknown, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', ...headers } });
}

function errorBody(code: string, extra: Record<string, unknown> = {}) {
  return { error: { code, message: 'Technical server message that must never reach the UI.', requestId: 'req-1', ...extra } };
}

function stubFetch(...responses: (Response | Error)[]) {
  const fetchMock = vi.fn(async (..._args: FetchArgs): Promise<Response> => {
    const next = responses.shift();
    if (!next) throw new Error('unexpected fetch');
    if (next instanceof Error) throw next;
    return next;
  });
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}

async function failure(promise: Promise<unknown>): Promise<ApiError> {
  const err = await promise.then(
    () => {
      throw new Error('expected the request to fail');
    },
    (e: unknown) => e,
  );
  expect(err).toBeInstanceOf(ApiError);
  return err as ApiError;
}

const parseOk = (body: unknown) => {
  if (typeof body !== 'object' || body === null || !('ok' in body)) throw new TypeError('bad shape');
  return body as { ok: boolean };
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('apiRequest: request', () => {
  it('GET: same-origin credentials, Accept JSON, no CSRF header, no Content-Type and no body', async () => {
    const fetchMock = stubFetch(jsonResponse(200, { ok: true }));
    expect(await apiRequest('GET', '/api/thing', { parse: parseOk })).toEqual({ ok: true });

    const [url, init] = fetchMock.mock.calls[0] as FetchArgs;
    expect(url).toBe('/api/thing');
    expect(init.method).toBe('GET');
    expect(init.credentials).toBe('same-origin');
    expect(init.headers).toEqual({ Accept: 'application/json' });
    expect(init.body).toBeUndefined();
  });

  it('POST with a body: JSON body, Content-Type and X-CSRF-Protection', async () => {
    const fetchMock = stubFetch(jsonResponse(201, { ok: true }));
    await apiRequest('POST', '/api/auth/register', { body: { email: 'ana@example.com' }, parse: parseOk });

    const [, init] = fetchMock.mock.calls[0] as FetchArgs;
    expect(init.headers).toEqual({ Accept: 'application/json', 'X-CSRF-Protection': '1', 'Content-Type': 'application/json' });
    expect(init.body).toBe('{"email":"ana@example.com"}');
    expect(init.credentials).toBe('same-origin');
  });

  it('POST without a body (logout): CSRF header, no Content-Type and no body', async () => {
    const fetchMock = stubFetch(new Response(null, { status: 204 }));
    expect(await apiRequest('POST', '/api/auth/logout')).toBeUndefined();

    const [, init] = fetchMock.mock.calls[0] as FetchArgs;
    expect(init.headers).toEqual({ Accept: 'application/json', 'X-CSRF-Protection': '1' });
    expect(init).not.toHaveProperty('body');
  });

  it.each(['PUT', 'PATCH', 'DELETE'] as const)('%s sends the CSRF header', async (method) => {
    const fetchMock = stubFetch(new Response(null, { status: 204 }));
    await apiRequest(method, '/api/thing');
    expect((fetchMock.mock.calls[0] as FetchArgs)[1].headers).toMatchObject({ 'X-CSRF-Protection': '1' });
  });

  it('never sets Origin: the browser does', async () => {
    const fetchMock = stubFetch(new Response(null, { status: 204 }));
    await apiRequest('POST', '/api/auth/logout');
    expect(Object.keys((fetchMock.mock.calls[0] as FetchArgs)[1].headers as object)).not.toContain('Origin');
  });

  it.each([
    'https://evil.example/api/x',
    '//evil.example/api/x',
    'api/x',
    '/apiary',
    '/api',
    '/api/',
    '/api//x',
    '/api/a//b',
    '/api/../x',
    '/api/a/../../x',
    '/api\\x',
    '/other/api/x',
    'javascript:alert(1)',
  ])('rejects %s without calling fetch', async (path) => {
    const fetchMock = stubFetch();
    expect(isApiPath(path)).toBe(false);
    await expect(apiRequest('GET', path)).rejects.toThrow(TypeError);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('accepts relative /api/ paths with a query', () => {
    expect(isApiPath('/api/auth/me')).toBe(true);
    expect(isApiPath('/api/sessions/today?week=2')).toBe(true);
  });

  it('passes the AbortSignal to fetch', async () => {
    const fetchMock = stubFetch(jsonResponse(200, { ok: true }));
    const controller = new AbortController();
    await apiRequest('GET', '/api/thing', { parse: parseOk, signal: controller.signal });
    expect((fetchMock.mock.calls[0] as FetchArgs)[1].signal).toBe(controller.signal);
  });
});

describe('apiRequest: responses', () => {
  it('returns the parsed JSON of a 2xx response', async () => {
    stubFetch(jsonResponse(200, { ok: true }));
    expect(await apiRequest('GET', '/api/thing', { parse: parseOk })).toEqual({ ok: true });
  });

  it('returns undefined for a 204 without a body', async () => {
    stubFetch(new Response(null, { status: 204 }));
    expect(await apiRequest('POST', '/api/auth/logout')).toBeUndefined();
  });

  it('treats an unexpected empty body, an unexpected body or a wrong shape as invalid-response', async () => {
    stubFetch(new Response(null, { status: 204 }), jsonResponse(200, { ok: true }), jsonResponse(200, { nope: 1 }));
    expect((await failure(apiRequest('GET', '/api/thing', { parse: parseOk }))).kind).toBe('invalid-response');
    expect((await failure(apiRequest('GET', '/api/thing'))).kind).toBe('invalid-response');
    expect((await failure(apiRequest('GET', '/api/thing', { parse: parseOk }))).kind).toBe('invalid-response');
  });

  it('treats malformed JSON in a 2xx response as invalid-response', async () => {
    stubFetch(new Response('{"ok": tru', { status: 200, headers: { 'Content-Type': 'application/json' } }));
    const err = await failure(apiRequest('GET', '/api/thing', { parse: parseOk }));
    expect(err).toMatchObject({ kind: 'invalid-response', status: 200 });
  });

  it('treats an unexpected HTML response as invalid-response, also with a 2xx status, without keeping the HTML', async () => {
    stubFetch(
      new Response('<!doctype html><title>Bad gateway</title>', { status: 502, headers: { 'Content-Type': 'text/html' } }),
      new Response('<!doctype html>', { status: 200, headers: { 'Content-Type': 'text/html' } }),
    );
    const gateway = await failure(apiRequest('GET', '/api/thing', { parse: parseOk }));
    expect(gateway).toMatchObject({ kind: 'invalid-response', status: 502, code: undefined });
    expect(JSON.stringify({ ...gateway, message: gateway.message, stack: gateway.stack })).not.toMatch(/doctype|Bad gateway/i);
    expect((await failure(apiRequest('GET', '/api/thing', { parse: parseOk }))).kind).toBe('invalid-response');
  });
});

describe('apiRequest: errors', () => {
  const fieldMessages = {
    email: 'Invalid email address (technical backend text)',
    password: 'Too small: expected string to have >=12 characters (technical backend text)',
  };

  it('400: keeps status, code, requestId and only the invalid field names (body. prefix removed, no duplicates)', async () => {
    stubFetch(
      jsonResponse(
        400,
        errorBody('VALIDATION_ERROR', {
          details: {
            fields: [
              { path: 'body.email', message: fieldMessages.email },
              { path: 'body.password', message: fieldMessages.password },
              { path: 'body.password', message: 'Second password message' },
              { path: 'body.email', message: 'Second email message' },
            ],
          },
        }),
        { 'X-Request-Id': 'req-1' },
      ),
    );
    const err = await failure(apiRequest('POST', '/api/auth/register', { body: {}, parse: parseOk }));
    expect(err).toMatchObject({ kind: 'http', status: 400, code: 'VALIDATION_ERROR', requestId: 'req-1' });
    expect(err.invalidFields).toEqual(['email', 'password']);
    expect(err).not.toHaveProperty('fields');
  });

  it.each([
    ['an empty path', ''],
    ['the whole body (unknown keys)', 'body'],
    ['an empty field name', 'body.'],
    ['a nested path', 'body.address.city'],
    ['a route parameter', 'params.id'],
    ['a query parameter', 'query.week'],
    ['a field without the body. prefix', 'email'],
    ['an identifier with symbols', 'body.e-mail'],
    ['a name that does not start with a letter', 'body.1email'],
    ['a prototype key', 'body.__proto__'],
  ])('400: discards %s', async (_label, path) => {
    stubFetch(jsonResponse(400, errorBody('VALIDATION_ERROR', { details: { fields: [{ path, message: 'x' }] } })));
    const err = await failure(apiRequest('POST', '/api/x', { body: {}, parse: parseOk }));
    expect(err.invalidFields).toBeUndefined();
  });

  it('400: discards field entries that are not objects or have no string path', async () => {
    stubFetch(
      jsonResponse(
        400,
        errorBody('VALIDATION_ERROR', {
          details: { fields: ['body.email', null, { message: 'no path' }, { path: 42 }, { path: 'body.timezone' }] },
        }),
      ),
    );
    expect((await failure(apiRequest('POST', '/api/x', { body: {}, parse: parseOk }))).invalidFields).toEqual(['timezone']);
  });

  it('400: never stores details.fields[].message, not even in its serialized form', async () => {
    stubFetch(
      jsonResponse(
        400,
        errorBody('VALIDATION_ERROR', {
          details: { fields: [{ path: 'body.email', message: fieldMessages.email }, { path: 'body.password', message: fieldMessages.password }] },
        }),
      ),
    );
    const err = await failure(apiRequest('POST', '/api/auth/register', { body: {}, parse: parseOk }));
    const serialized = JSON.stringify({ ...err, message: err.message, stack: err.stack });
    for (const text of [...Object.values(fieldMessages), 'Technical server message', 'technical backend text']) {
      expect(serialized).not.toContain(text);
      expect(Object.values(err).flat().join(' ')).not.toContain(text);
    }
  });

  it('409: code without fields', async () => {
    stubFetch(jsonResponse(409, errorBody('EMAIL_ALREADY_REGISTERED')));
    const err = await failure(apiRequest('POST', '/api/auth/register', { body: {}, parse: parseOk }));
    expect(err).toMatchObject({ kind: 'http', status: 409, code: 'EMAIL_ALREADY_REGISTERED', invalidFields: undefined, requestId: 'req-1' });
  });

  it('429: Retry-After in seconds', async () => {
    stubFetch(jsonResponse(429, errorBody('RATE_LIMITED'), { 'Retry-After': '3600' }));
    const err = await failure(apiRequest('POST', '/api/auth/register', { body: {}, parse: parseOk }));
    expect(err).toMatchObject({ kind: 'http', status: 429, code: 'RATE_LIMITED', retryAfterSeconds: 3600 });
  });

  it('Retry-After as an HTTP date, and ignored when invalid', async () => {
    vi.useFakeTimers({ now: new Date('2026-11-27T12:00:00Z') });
    try {
      stubFetch(
        jsonResponse(503, errorBody('TEMPORARILY_UNAVAILABLE'), { 'Retry-After': 'Fri, 27 Nov 2026 12:01:30 GMT' }),
        jsonResponse(429, errorBody('RATE_LIMITED'), { 'Retry-After': 'soon' }),
      );
      expect((await failure(apiRequest('GET', '/api/thing'))).retryAfterSeconds).toBe(90);
      expect((await failure(apiRequest('GET', '/api/thing'))).retryAfterSeconds).toBeUndefined();
    } finally {
      vi.useRealTimers();
    }
  });

  it('uses the X-Request-Id header when the body has no requestId', async () => {
    stubFetch(jsonResponse(404, { error: { code: 'NOT_FOUND', message: 'x' } }, { 'X-Request-Id': 'from-header' }));
    expect((await failure(apiRequest('GET', '/api/thing'))).requestId).toBe('from-header');
  });

  it('a JSON error without the contract envelope is invalid-response', async () => {
    stubFetch(jsonResponse(500, { message: 'boom' }));
    expect(await failure(apiRequest('GET', '/api/thing'))).toMatchObject({ kind: 'invalid-response', status: 500 });
  });

  it('never keeps the server message: not in the error or its message', async () => {
    stubFetch(jsonResponse(409, errorBody('EMAIL_ALREADY_REGISTERED')));
    const err = await failure(apiRequest('POST', '/api/auth/register', { body: {}, parse: parseOk }));
    expect(JSON.stringify({ ...err, message: err.message })).not.toContain('Technical server message');
    expect(err.message).toBe('API request failed (http 409 EMAIL_ALREADY_REGISTERED)');
  });

  it('a network failure is network', async () => {
    stubFetch(new TypeError('Failed to fetch'));
    expect(await failure(apiRequest('GET', '/api/thing'))).toMatchObject({ kind: 'network', status: undefined });
  });

  it('an aborted request is aborted, not network', async () => {
    const controller = new AbortController();
    controller.abort();
    stubFetch(new DOMException('The operation was aborted.', 'AbortError'));
    expect((await failure(apiRequest('GET', '/api/thing', { signal: controller.signal }))).kind).toBe('aborted');
  });

  it('really aborts a pending request through the signal', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(
        (_url: string, init: RequestInit) =>
          new Promise<Response>((_resolve, reject) => {
            init.signal?.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')));
          }),
      ),
    );
    const controller = new AbortController();
    const pending = apiRequest('GET', '/api/thing', { parse: parseOk, signal: controller.signal });
    controller.abort();
    expect((await failure(pending)).kind).toBe('aborted');
  });
});
