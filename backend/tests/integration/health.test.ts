import request from 'supertest';
import { afterAll, describe, expect, it, vi } from 'vitest';
import { createApp } from '../../src/app.js';
import { createDatabaseCheck, createPool } from '../../src/shared/db.js';

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('Integration tests require DATABASE_URL (run `npm run db:up` and see backend/.env.example)');
}

describe('GET /api/health against a real PostgreSQL', () => {
  const pool = createPool(databaseUrl);
  // Puerto 1: siempre cerrado, simula una base de datos caída.
  const deadPool = createPool('postgres://calicoach:calicoach@127.0.0.1:1/calicoach');

  afterAll(async () => {
    await Promise.all([pool.end(), deadPool.end()]);
  });

  it('responds 200 when PostgreSQL is reachable', async () => {
    const app = createApp({ checkDatabase: createDatabaseCheck(pool) });

    const res = await request(app).get('/api/health');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok', database: 'up' });
  });

  it('responds 503 when PostgreSQL is unreachable', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const app = createApp({ checkDatabase: createDatabaseCheck(deadPool) });

    const res = await request(app).get('/api/health');

    expect(res.status).toBe(503);
    expect(res.body.error.code).toBe('TEMPORARILY_UNAVAILABLE');
  });
});
