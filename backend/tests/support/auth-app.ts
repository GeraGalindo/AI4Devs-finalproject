import type { Express } from 'express';
import type pg from 'pg';
import type request from 'supertest';
import { expect } from 'vitest';
import { createApp } from '../../src/app.js';
import type { Clock } from '../../src/domain/clock.js';
import { createAuthRepository } from '../../src/modules/auth/auth.repository.js';
import { DEV_JWT_SECRET, type NodeEnv } from '../../src/shared/config.js';
import { createPool } from '../../src/shared/db.js';
import { createPrisma, type PrismaClient } from '../../src/shared/prisma.js';
import { resolveTestDatabaseUrl, truncateTables } from './test-database.js';

/**
 * Montaje de las pruebas de integración de autenticación (DEV-004): la app real, con Prisma
 * sobre la base `*_test` (salvaguardas de DEV-002). Cada `app()` es una aplicación nueva, con
 * sus propios contadores del límite de peticiones.
 */
export const ORIGIN = 'http://localhost:5173';
export const PROD_ORIGIN = 'https://cali-coach.example';
export const CSRF = { Origin: ORIGIN, 'X-CSRF-Protection': '1' } as const;
export const PROD_CSRF = { Origin: PROD_ORIGIN, 'X-CSRF-Protection': '1' } as const;
export const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

export const PASSWORD = 'correct horse battery staple';
export const registration = (email = 'ana@example.com', overrides: Record<string, unknown> = {}) => ({
  email,
  password: PASSWORD,
  timezone: 'Europe/Madrid',
  ...overrides,
});

export interface AuthTestContext {
  pool: pg.Pool;
  prisma: PrismaClient;
  app(options?: { clock?: Clock; nodeEnv?: NodeEnv }): Express;
  reset(): Promise<void>;
  close(): Promise<void>;
}

export function authTestContext(): AuthTestContext {
  const pool = createPool(resolveTestDatabaseUrl(process.env));
  const prisma = createPrisma(pool);
  const authRepository = createAuthRepository(prisma);

  return {
    pool,
    prisma,
    app: ({ clock, nodeEnv = 'test' } = {}) =>
      createApp({
        config: { nodeEnv, appOrigin: nodeEnv === 'production' ? PROD_ORIGIN : ORIGIN, jwtSecret: DEV_JWT_SECRET },
        checkDatabase: async () => undefined,
        authRepository,
        clock,
      }),
    reset: () => truncateTables(pool, ['users']),
    close: async () => {
      await prisma.$disconnect();
      await pool.end();
    },
  };
}

/** Cabeceras `Set-Cookie` de una respuesta (siempre como lista). */
export function setCookies(res: request.Response): string[] {
  const header = res.headers['set-cookie'] as string[] | string | undefined;
  if (!header) return [];
  return Array.isArray(header) ? header : [header];
}

/** `nombre=valor` de la cookie de sesión emitida, listo para enviarlo en `Cookie`. */
export function sessionCookie(res: request.Response, name = 'session'): string {
  const cookie = setCookies(res).find((c) => c.startsWith(`${name}=`));
  if (!cookie) throw new Error(`no ${name} cookie in the response`);
  return cookie.split(';')[0]!;
}

export function tokenOf(cookie: string): string {
  return cookie.slice(cookie.indexOf('=') + 1);
}

/** Formato de error de la sección 4, con el requestId igual a X-Request-Id. */
export function expectError(res: request.Response, status: number, code: string): void {
  expect(res.status).toBe(status);
  expect(res.headers['content-type']).toMatch(/^application\/json/);
  expect(res.body.error.code).toBe(code);
  expect(typeof res.body.error.message).toBe('string');
  expect(res.body.error.requestId).toMatch(UUID);
  expect(res.body.error.requestId).toBe(res.headers['x-request-id']);
}

export async function userRow(pool: pg.Pool, email: string) {
  const { rows } = await pool.query(
    'SELECT id, email, password_hash, token_version, timezone, available_weekdays, updated_at FROM users WHERE email = $1',
    [email],
  );
  return rows[0] as
    | {
        id: string;
        email: string;
        password_hash: string;
        token_version: number;
        timezone: string;
        available_weekdays: number[] | null;
        updated_at: Date;
      }
    | undefined;
}

export async function userCount(pool: pg.Pool): Promise<number> {
  const { rows } = await pool.query<{ n: number }>('SELECT count(*)::int AS n FROM users');
  return rows[0]!.n;
}
