import { once } from 'node:events';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import http from 'node:http';
import type { AddressInfo } from 'node:net';
import { tmpdir } from 'node:os';
import path from 'node:path';
import type { Router } from 'express';
import request from 'supertest';
import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { z } from 'zod';
import { unusedAuthRepository } from '../tests/support/auth-stubs.js';
import { createApp, type AppDeps } from './app.js';
import { fixedClock } from './domain/clock.js';
import { DEV_JWT_SECRET } from './shared/config.js';
import { jsonBody, noBody } from './shared/http/body.js';
import { validate } from './shared/http/validate.js';

/**
 * Contrato común de la API (DEV-003) sobre rutas de prueba inyectadas solo desde aquí (D6):
 * CSRF (API-01–API-05), cuerpo y tipo de contenido, formato de errores (API-36–API-38),
 * precedencia de los controles, X-Request-Id, cabeceras de helmet y servicio de la SPA.
 */
const ORIGIN = 'http://localhost:5173';
const CSRF_OK = { Origin: ORIGIN, 'X-CSRF-Protection': '1' };
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
const ITEM_ID = '3f1c2d4b-6a7e-4f0b-9c1d-2e3f4a5b6c7d';

const weekdays = z
  .array(z.int().min(0).max(6))
  .min(2)
  .max(6)
  .refine((days) => new Set(days).size === days.length, 'Days must be distinct');
const itemBody = z.strictObject({ name: z.string().min(1), availableWeekdays: weekdays.optional() });
const itemParams = z.strictObject({ id: z.uuid() });

let handled = 0;

function testRoutes(api: Router): void {
  api.post('/__test/items', jsonBody, validate({ body: itemBody }), (_req, res) => {
    handled++;
    res.status(201).json({ ok: true });
  });
  api.get('/__test/items/:id', validate({ params: itemParams }), (_req, res) => {
    res.json({ ok: true });
  });
  api.post('/__test/items/:id/complete', noBody, validate({ params: itemParams }), (_req, res) => {
    handled++;
    res.json({ ok: true });
  });
  api.delete('/__test/items/:id', noBody, (_req, res) => {
    handled++;
    res.status(204).end();
  });
  api.get('/__test/boom', () => {
    throw new Error('SELECT secret FROM users WHERE password_hash = $1');
  });
  api.get('/__test/boom-async', async () => {
    await Promise.reject(new Error('connect ECONNREFUSED postgres://calicoach:secret@db:5432'));
  });
}

function makeApp(overrides: Partial<AppDeps> = {}) {
  return createApp({
    config: { nodeEnv: 'test', appOrigin: ORIGIN, jwtSecret: DEV_JWT_SECRET },
    authRepository: unusedAuthRepository,
    checkDatabase: vi.fn().mockResolvedValue(undefined),
    extraApiRoutes: testRoutes,
    ...overrides,
  });
}

const app = makeApp();

/** Toda respuesta de error cumple el formato y su requestId coincide con X-Request-Id. */
function expectError(res: request.Response, status: number, code: string): void {
  expect(res.status).toBe(status);
  expect(res.headers['content-type']).toMatch(/^application\/json/);
  expect(res.body.error.code).toBe(code);
  expect(typeof res.body.error.message).toBe('string');
  expect(res.body.error.requestId).toMatch(UUID);
  expect(res.body.error.requestId).toBe(res.headers['x-request-id']);
}

beforeEach(() => {
  handled = 0;
  vi.restoreAllMocks();
});

describe('CSRF protection', () => {
  it('API-01: rejects a POST without Origin, Sec-Fetch-Site or Referer, without running the handler', async () => {
    const res = await request(app).post('/api/__test/items').set('X-CSRF-Protection', '1').send({ name: 'a' });
    expectError(res, 403, 'CSRF_REJECTED');
    expect(handled).toBe(0);
  });

  it.each([['https://evil.example'], ['null'], ['http://localhost:5173.evil.example'], ['http://localhost:3000']])(
    'API-02: rejects Origin %s',
    async (origin) => {
      const res = await request(app)
        .post('/api/__test/items')
        .set({ Origin: origin, 'X-CSRF-Protection': '1' })
        .send({ name: 'a' });
      expectError(res, 403, 'CSRF_REJECTED');
      expect(handled).toBe(0);
    },
  );

  it.each([
    ['Sec-Fetch-Site: cross-site', { 'Sec-Fetch-Site': 'cross-site' }],
    ['Sec-Fetch-Site: same-site', { 'Sec-Fetch-Site': 'same-site' }],
    ['a Referer from another origin', { Referer: 'https://evil.example/page' }],
    ['an invalid Referer', { Referer: 'not a url' }],
  ])('API-03: without Origin, rejects %s', async (_label, headers) => {
    const res = await request(app)
      .post('/api/__test/items')
      .set({ ...headers, 'X-CSRF-Protection': '1' })
      .send({ name: 'a' });
    expectError(res, 403, 'CSRF_REJECTED');
  });

  it.each([
    ['Sec-Fetch-Site: same-origin', { 'Sec-Fetch-Site': 'same-origin' }],
    ['a same-origin Referer', { Referer: `${ORIGIN}/today` }],
  ])('without Origin, accepts %s with X-CSRF-Protection', async (_label, headers) => {
    const res = await request(app)
      .post('/api/__test/items')
      .set({ ...headers, 'X-CSRF-Protection': '1' })
      .send({ name: 'a' });
    expect(res.status).toBe(201);
  });

  it.each([['missing', undefined], ['not "1"', 'true']])(
    'API-04: rejects a valid Origin when X-CSRF-Protection is %s',
    async (_label, value) => {
      const req = request(app).post('/api/__test/items').set('Origin', ORIGIN);
      if (value) req.set('X-CSRF-Protection', value);
      const res = await req.send({ name: 'a' });
      expectError(res, 403, 'CSRF_REJECTED');
      expect(handled).toBe(0);
    },
  );

  it('applies to PUT, PATCH and DELETE, and to unknown /api routes', async () => {
    for (const method of ['put', 'patch', 'delete'] as const) {
      expectError(await request(app)[method]('/api/__test/items'), 403, 'CSRF_REJECTED');
    }
    expectError(await request(app).post('/api/does-not-exist'), 403, 'CSRF_REJECTED');
  });

  it('does not apply to GET', async () => {
    const res = await request(app).get(`/api/__test/items/${ITEM_ID}`);
    expect(res.status).toBe(200);
  });

  it('accepts a request with a valid Origin and X-CSRF-Protection: 1', async () => {
    const res = await request(app).post('/api/__test/items').set(CSRF_OK).send({ name: 'a' });
    expect(res.status).toBe(201);
    expect(handled).toBe(1);
  });
});

describe('body and content type', () => {
  it.each([
    ['text/plain', (r: request.Test) => r.set('Content-Type', 'text/plain').send('{"name":"a"}')],
    ['a form', (r: request.Test) => r.type('form').send('name=a')],
    ['multipart', (r: request.Test) => r.field('name', 'a')],
    ['no Content-Type', (r: request.Test) => r],
  ])('API-05: rejects %s with 415', async (_label, build) => {
    const res = await build(request(app).post('/api/__test/items').set(CSRF_OK));
    expectError(res, 415, 'UNSUPPORTED_MEDIA_TYPE');
    expect(handled).toBe(0);
  });

  it('accepts application/json with a charset parameter', async () => {
    const res = await request(app)
      .post('/api/__test/items')
      .set(CSRF_OK)
      .set('Content-Type', 'application/json; charset=utf-8')
      .send('{"name":"a"}');
    expect(res.status).toBe(201);
  });

  it('rejects an unsupported charset with 415', async () => {
    const res = await request(app)
      .post('/api/__test/items')
      .set(CSRF_OK)
      .set('Content-Type', 'application/json; charset=latin1')
      .send('{"name":"a"}');
    expectError(res, 415, 'UNSUPPORTED_MEDIA_TYPE');
  });

  it('rejects malformed JSON with 400 MALFORMED_JSON', async () => {
    const res = await request(app)
      .post('/api/__test/items')
      .set(CSRF_OK)
      .set('Content-Type', 'application/json')
      .send('{"name":');
    expectError(res, 400, 'MALFORMED_JSON');
  });

  it('rejects a JSON body larger than 16 KB with 413 PAYLOAD_TOO_LARGE (D7)', async () => {
    const res = await request(app)
      .post('/api/__test/items')
      .set(CSRF_OK)
      .send({ name: 'x'.repeat(17 * 1024) });
    expectError(res, 413, 'PAYLOAD_TOO_LARGE');
    expect(handled).toBe(0);
  });

  it('accepts a body just under 16 KB', async () => {
    const res = await request(app)
      .post('/api/__test/items')
      .set(CSRF_OK)
      .send({ name: 'x'.repeat(16 * 1024 - 20) });
    expect(res.status).toBe(201);
  });

  describe('operations without a body', () => {
    it('accept a POST without Content-Type or body', async () => {
      const res = await request(app).post(`/api/__test/items/${ITEM_ID}/complete`).set(CSRF_OK);
      expect(res.status).toBe(200);
      expect(handled).toBe(1);
    });

    it('accept a DELETE without body', async () => {
      const res = await request(app).delete(`/api/__test/items/${ITEM_ID}`).set(CSRF_OK);
      expect(res.status).toBe(204);
    });

    it.each([
      ['a JSON body', (r: request.Test) => r.send({ a: 1 })],
      ['a text body', (r: request.Test) => r.set('Content-Type', 'text/plain').send('x')],
      ['an empty JSON object', (r: request.Test) => r.send({})],
    ])('reject %s with 400 VALIDATION_ERROR, whatever its type', async (_label, build) => {
      const res = await build(request(app).post(`/api/__test/items/${ITEM_ID}/complete`).set(CSRF_OK));
      expectError(res, 400, 'VALIDATION_ERROR');
      expect(handled).toBe(0);
    });

    it('reject a chunked body with 400 VALIDATION_ERROR', async () => {
      const server = app.listen(0);
      await once(server, 'listening');
      try {
        const { port } = server.address() as AddressInfo;
        const { status, body } = await new Promise<{ status: number; body: string }>((resolve, reject) => {
          const req = http.request(
            {
              port,
              method: 'POST',
              path: `/api/__test/items/${ITEM_ID}/complete`,
              headers: { ...CSRF_OK, 'Transfer-Encoding': 'chunked' },
            },
            (res) => {
              let data = '';
              res.on('data', (c) => (data += c));
              res.on('end', () => resolve({ status: res.statusCode ?? 0, body: data }));
            },
          );
          req.on('error', reject);
          req.write('payload');
          req.end();
        });
        expect(status).toBe(400);
        expect(JSON.parse(body).error.code).toBe('VALIDATION_ERROR');
        expect(handled).toBe(0);
      } finally {
        server.close();
      }
    });
  });
});

describe('precedence of the controls (section 4 order)', () => {
  it('CSRF is evaluated before the body: invalid Origin + malformed JSON → 403', async () => {
    const res = await request(app)
      .post('/api/__test/items')
      .set({ Origin: 'https://evil.example', 'X-CSRF-Protection': '1', 'Content-Type': 'application/json' })
      .send('{"name":');
    expectError(res, 403, 'CSRF_REJECTED');
  });

  it('CSRF before content type: missing X-CSRF-Protection + text/plain → 403', async () => {
    const res = await request(app)
      .post('/api/__test/items')
      .set('Origin', ORIGIN)
      .set('Content-Type', 'text/plain')
      .send('x');
    expectError(res, 403, 'CSRF_REJECTED');
  });

  it('CSRF before size: invalid Origin + oversized body → 403', async () => {
    const res = await request(app)
      .post('/api/__test/items')
      .set({ Origin: 'null', 'X-CSRF-Protection': '1' })
      .send({ name: 'x'.repeat(17 * 1024) });
    expectError(res, 403, 'CSRF_REJECTED');
  });

  it('CSRF before the no-body rule: body on a no-body operation without the header → 403', async () => {
    const res = await request(app).post(`/api/__test/items/${ITEM_ID}/complete`).set('Origin', ORIGIN).send({ a: 1 });
    expectError(res, 403, 'CSRF_REJECTED');
  });

  it('content type before JSON parsing: text/plain with invalid JSON → 415', async () => {
    const res = await request(app)
      .post('/api/__test/items')
      .set(CSRF_OK)
      .set('Content-Type', 'text/plain')
      .send('{"name":');
    expectError(res, 415, 'UNSUPPORTED_MEDIA_TYPE');
  });

  it('JSON parsing before validation: malformed JSON → 400 MALFORMED_JSON, not VALIDATION_ERROR', async () => {
    const res = await request(app)
      .post('/api/__test/items')
      .set(CSRF_OK)
      .set('Content-Type', 'application/json')
      .send('{"unknown": ');
    expectError(res, 400, 'MALFORMED_JSON');
  });
});

describe('error format (API-36 to API-38)', () => {
  it.each([
    ['an unknown field', { name: 'a', extra: true }, 'body.extra'],
    ['a missing field', {}, 'body.name'],
    ['repeated weekdays', { name: 'a', availableWeekdays: [1, 1] }, 'body.availableWeekdays'],
    ['out-of-range weekdays', { name: 'a', availableWeekdays: [1, 7] }, 'body.availableWeekdays.1'],
  ])('API-37: rejects %s with 400 VALIDATION_ERROR and details.fields', async (_label, body, fieldPath) => {
    const res = await request(app).post('/api/__test/items').set(CSRF_OK).send(body);
    expectError(res, 400, 'VALIDATION_ERROR');
    const fields = res.body.error.details.fields as { path: string; message: string }[];
    expect(fields.length).toBeGreaterThan(0);
    // Un campo desconocido lo informa Zod en el objeto, con la clave en el mensaje.
    expect(fields.some((f) => f.path === fieldPath || (f.path === 'body' && f.message.includes('extra')))).toBe(true);
    expect(handled).toBe(0);
  });

  it('API-37: rejects a malformed uuid in the route with 400 VALIDATION_ERROR', async () => {
    const res = await request(app).get('/api/__test/items/not-a-uuid');
    expectError(res, 400, 'VALIDATION_ERROR');
    expect(res.body.error.details.fields[0].path).toBe('params.id');
  });

  it.each([['GET', '/api/ruta-inexistente'], ['GET', '/api'], ['HEAD', '/api/ruta-inexistente']])(
    'API-38: %s %s → 404 NOT_FOUND in JSON',
    async (method, url) => {
      const res = await request(app)[method === 'HEAD' ? 'head' : 'get'](url);
      expect(res.status).toBe(404);
      if (method === 'GET') expectError(res, 404, 'NOT_FOUND');
    },
  );

  describe('API-38: internal errors in production', () => {
    const prodApp = makeApp({ config: { nodeEnv: 'production', appOrigin: 'https://cali-coach.example', jwtSecret: DEV_JWT_SECRET } });

    it.each(['/api/__test/boom', '/api/__test/boom-async'])('%s → 500 INTERNAL_ERROR without trace or SQL', async (url) => {
      const log = vi.spyOn(console, 'error').mockImplementation(() => {});
      const res = await request(prodApp).get(url);

      expectError(res, 500, 'INTERNAL_ERROR');
      expect(Object.keys(res.body.error).sort()).toEqual(['code', 'message', 'requestId']);
      expect(JSON.stringify(res.body)).not.toMatch(/SELECT|password|ECONNREFUSED|postgres:|secret|\bat\s|\.ts:/);
      // La causa solo va al log del servidor, con el mismo requestId.
      expect(log).toHaveBeenCalledWith(expect.stringContaining(res.body.error.requestId), expect.any(Error));
    });
  });

  it('API-36: every 4xx and 5xx response uses the common format', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const cases: [request.Test, number][] = [
      [request(app).post('/api/__test/items'), 403],
      [request(app).post('/api/__test/items').set(CSRF_OK).type('text/plain').send('x'), 415],
      [request(app).post('/api/__test/items').set(CSRF_OK).set('Content-Type', 'application/json').send('{'), 400],
      [request(app).post('/api/__test/items').set(CSRF_OK).send({ name: 'x'.repeat(17 * 1024) }), 413],
      [request(app).post('/api/__test/items').set(CSRF_OK).send({}), 400],
      [request(app).get('/api/nope'), 404],
      [request(app).get('/api/__test/boom'), 500],
    ];
    for (const [req, status] of cases) {
      const res = await req;
      expect(res.status).toBe(status);
      expect(res.headers['content-type']).toMatch(/^application\/json/);
      expect(Object.keys(res.body)).toEqual(['error']);
      expect(res.body.error).toEqual(
        expect.objectContaining({
          code: expect.any(String),
          message: expect.any(String),
          requestId: res.headers['x-request-id'],
        }),
      );
    }
  });
});

describe('X-Request-Id (D10)', () => {
  it('is a new UUID on every response, including /api/health', async () => {
    const a = await request(app).get('/api/health');
    const b = await request(app).get('/api/health');
    expect(a.headers['x-request-id']).toMatch(UUID);
    expect(b.headers['x-request-id']).toMatch(UUID);
    expect(a.headers['x-request-id']).not.toBe(b.headers['x-request-id']);
  });

  it('ignores the value sent by the client', async () => {
    const res = await request(app).get('/api/nope').set('X-Request-Id', 'client-chosen-id');
    expect(res.headers['x-request-id']).toMatch(UUID);
    expect(res.body.error.requestId).toBe(res.headers['x-request-id']);
  });

  it('is included in the /api/health 503 error, consistent with the header', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const res = await request(makeApp({ checkDatabase: vi.fn().mockRejectedValue(new Error('down')) })).get(
      '/api/health',
    );
    expectError(res, 503, 'TEMPORARILY_UNAVAILABLE');
    expect(res.body.error.details).toEqual({ database: 'down' });
  });
});

describe('security headers (helmet, D8)', () => {
  function csp(res: request.Response): string {
    return String(res.headers['content-security-policy']);
  }

  it('sends a strict CSP without unsafe-inline', async () => {
    const res = await request(app).get('/api/health');
    const policy = csp(res);
    expect(policy).toContain("default-src 'self'");
    expect(policy).toContain("style-src 'self'");
    expect(policy).toContain("script-src 'self'");
    expect(policy).toContain("object-src 'none'");
    expect(policy).toContain("frame-ancestors 'none'");
    expect(policy).not.toContain('unsafe-inline');
    expect(policy).not.toContain('unsafe-eval');
    expect(res.headers['x-content-type-options']).toBe('nosniff');
    expect(res.headers['x-powered-by']).toBeUndefined();
  });

  it('omits HSTS and upgrade-insecure-requests in development and test', async () => {
    for (const nodeEnv of ['development', 'test'] as const) {
      const res = await request(makeApp({ config: { nodeEnv, appOrigin: ORIGIN, jwtSecret: DEV_JWT_SECRET } })).get('/api/health');
      expect(res.headers['strict-transport-security']).toBeUndefined();
      expect(csp(res)).not.toContain('upgrade-insecure-requests');
    }
  });

  it('sends HSTS and upgrade-insecure-requests in production', async () => {
    const res = await request(makeApp({ config: { nodeEnv: 'production', appOrigin: 'https://cali-coach.example', jwtSecret: DEV_JWT_SECRET } })).get(
      '/api/health',
    );
    expect(res.headers['strict-transport-security']).toMatch(/max-age=31536000/);
    expect(csp(res)).toContain('upgrade-insecure-requests');
  });
});

describe('Clock injection (D5)', () => {
  it('accepts a fixed Clock with NODE_ENV=test', () => {
    expect(() => makeApp({ clock: fixedClock('2026-11-20T00:00:00Z') })).not.toThrow();
  });

  it.each(['development', 'production'] as const)('refuses a custom Clock with NODE_ENV=%s', (nodeEnv) => {
    expect(() =>
      makeApp({ config: { nodeEnv, appOrigin: 'https://cali-coach.example', jwtSecret: DEV_JWT_SECRET }, clock: fixedClock('2026-11-20T00:00:00Z') }),
    ).toThrow(/NODE_ENV=test/);
  });
});

describe('SPA build (D9)', () => {
  const dir = mkdtempSync(path.join(tmpdir(), 'cali-spa-'));
  mkdirSync(path.join(dir, 'assets'));
  writeFileSync(path.join(dir, 'index.html'), '<!doctype html><title>Cali Coach</title>');
  writeFileSync(path.join(dir, 'assets', 'app.js'), 'console.log(1);');
  const spaApp = makeApp({ spaDir: dir });

  afterAll(() => rmSync(dir, { recursive: true, force: true }));

  it.each(['/', '/today', '/program/sessions/123'])('serves index.html with the CSP for GET %s', async (url) => {
    const res = await request(spaApp).get(url);
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/text\/html/);
    expect(res.text).toContain('<title>Cali Coach</title>');
    expect(String(res.headers['content-security-policy'])).toContain("default-src 'self'");
    expect(res.headers['x-request-id']).toMatch(UUID);
  });

  it('serves static assets as they are', async () => {
    const res = await request(spaApp).get('/assets/app.js');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/javascript/);
  });

  it('does not hide a missing static asset behind index.html', async () => {
    const res = await request(spaApp).get('/assets/missing.js');
    expectError(res, 404, 'NOT_FOUND');
  });

  it.each(['/api/nope', '/api', '/api/__test/unknown/deep'])('never intercepts %s', async (url) => {
    const res = await request(spaApp).get(url);
    expectError(res, 404, 'NOT_FOUND');
  });

  it('does not answer non-GET methods outside /api with index.html', async () => {
    const res = await request(spaApp).post('/today');
    expectError(res, 404, 'NOT_FOUND');
  });

  it('without a build, routes outside /api answer 404 JSON', async () => {
    const res = await request(makeApp({ spaDir: path.join(dir, 'missing') })).get('/');
    expectError(res, 404, 'NOT_FOUND');
  });
});
