import { afterAll, beforeEach, describe, expect, it } from 'vitest';
import { createPool } from '../../src/shared/db.js';
import { createPrisma } from '../../src/shared/prisma.js';
import { resolveTestDatabaseUrl, truncateTables } from '../support/test-database.js';

/** Prisma Client sobre el pool compartido (DEV-002, D3) y su comportamiento con `available_weekdays`. */
describe('createPrisma against PostgreSQL', () => {
  const pool = createPool(resolveTestDatabaseUrl(process.env));
  const prisma = createPrisma(pool);
  const data = { email: 'athlete@example.com', passwordHash: 'not-a-real-hash', timezone: 'Europe/Madrid' };

  beforeEach(async () => {
    await truncateTables(pool, ['users']);
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await pool.end();
  });

  it('creates and reads a user with the database defaults', async () => {
    const created = await prisma.user.create({ data });
    expect(created).toMatchObject({ email: data.email, tokenVersion: 0, timezone: data.timezone });
    expect(created.createdAt).toBeInstanceOf(Date);

    const found = await prisma.user.findUnique({ where: { email: data.email } });
    expect(found?.id).toBe(created.id);
  });

  it('advances updatedAt on update (@updatedAt)', async () => {
    const created = await prisma.user.create({ data });
    await new Promise((resolve) => setTimeout(resolve, 10));
    const updated = await prisma.user.update({ where: { id: created.id }, data: { availableWeekdays: [1, 3, 5] } });
    expect(updated.availableWeekdays).toEqual([1, 3, 5]);
    expect(updated.updatedAt.getTime()).toBeGreaterThan(created.updatedAt.getTime());
  });

  it('surfaces the database constraints through Prisma', async () => {
    await prisma.user.create({ data });
    await expect(prisma.user.create({ data })).rejects.toMatchObject({ code: 'P2002' });
    await expect(prisma.user.create({ data: { ...data, email: 'Other@example.com' } })).rejects.toThrow(
      /users_email_normalized_chk/,
    );
    await expect(
      prisma.user.update({ where: { email: data.email }, data: { availableWeekdays: [7, 1] } }),
    ).rejects.toThrow(/users_available_weekdays_chk/);
  });

  /**
   * Canario de D1: PostgreSQL guarda NULL hasta que el usuario configura sus días, pero
   * Prisma 7.10.1 lo devuelve como []. Los repositorios de usuarios (DEV-004/DEV-005) deben
   * convertir [] en null; es seguro porque el CHECK impide guardar '{}'. Si Prisma cambia
   * este comportamiento al actualizarse, esta prueba falla y hay que revisar esa conversión.
   */
  describe('available_weekdays NULL handling (canary)', () => {
    it('stores NULL in PostgreSQL when the field is omitted, and Prisma reads it as []', async () => {
      const created = await prisma.user.create({ data });

      const { rows } = await pool.query('SELECT available_weekdays FROM users WHERE id = $1', [created.id]);
      expect(rows[0].available_weekdays).toBeNull();

      expect(created.availableWeekdays).toEqual([]);
      const found = await prisma.user.findUniqueOrThrow({ where: { id: created.id } });
      expect(found.availableWeekdays).toEqual([]);
    });

    it('reads a NULL written with SQL as []', async () => {
      const { rows } = await pool.query(
        `INSERT INTO users (email, password_hash, timezone) VALUES ($1, $2, $3) RETURNING id`,
        [data.email, data.passwordHash, data.timezone],
      );
      const found = await prisma.user.findUniqueOrThrow({ where: { id: rows[0].id } });
      expect(found.availableWeekdays).toEqual([]);
    });

    it('cannot store an empty array: [] is unambiguous and always means NULL', async () => {
      await expect(prisma.user.create({ data: { ...data, availableWeekdays: [] } })).rejects.toThrow(
        /users_available_weekdays_chk/,
      );
    });
  });

  it('does not end the shared pool on $disconnect', async () => {
    const ownPool = createPool(resolveTestDatabaseUrl(process.env));
    const client = createPrisma(ownPool);
    await client.user.count();
    await client.$disconnect();

    const { rows } = await ownPool.query('SELECT 1 AS ok');
    expect(rows[0].ok).toBe(1);
    await ownPool.end();
  });
});
