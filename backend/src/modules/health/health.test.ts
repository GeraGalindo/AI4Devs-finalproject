import request from 'supertest';
import { describe, expect, it, vi } from 'vitest';
import { unusedAuthRepository } from '../../../tests/support/auth-stubs.js';
import { createApp } from '../../app.js';
import { DEV_JWT_SECRET } from '../../shared/config.js';

const config = { nodeEnv: 'test', appOrigin: 'http://localhost:5173', jwtSecret: DEV_JWT_SECRET } as const;
const authRepository = unusedAuthRepository;

describe('GET /api/health', () => {
  it('responds 200 when the database check succeeds', async () => {
    const app = createApp({ config, authRepository, checkDatabase: vi.fn().mockResolvedValue(undefined) });

    const res = await request(app).get('/api/health');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok', database: 'up' });
    expect(res.headers['cache-control']).toBe('no-store');
  });

  it('responds 503 TEMPORARILY_UNAVAILABLE without leaking internals when the database check fails', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const app = createApp({
      config,
      authRepository,
      checkDatabase: vi.fn().mockRejectedValue(new Error('connect ECONNREFUSED postgres://secret@db:5432')),
    });

    const res = await request(app).get('/api/health');

    expect(res.status).toBe(503);
    expect(res.body.error.code).toBe('TEMPORARILY_UNAVAILABLE');
    expect(res.body.error.details).toEqual({ database: 'down' });
    expect(JSON.stringify(res.body)).not.toMatch(/ECONNREFUSED|secret|postgres:\/\//);
  });
});
