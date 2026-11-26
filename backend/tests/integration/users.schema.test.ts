import pg from 'pg';
import { afterAll, describe, expect, it } from 'vitest';
import { resolveTestDatabaseUrl } from '../support/test-database.js';

/**
 * Estructura de `users` leída del catálogo de PostgreSQL (readme.md 3.2). No sustituye a la
 * comprobación de drift de Prisma, que ignora los CHECK del SQL manual.
 */
describe('users schema in PostgreSQL', () => {
  const pool = new pg.Pool({ connectionString: resolveTestDatabaseUrl(process.env), max: 2 });

  afterAll(async () => {
    await pool.end();
  });

  it('has the columns, types, nullability and defaults of the contract', async () => {
    const { rows } = await pool.query(
      `SELECT column_name, data_type, udt_name, is_nullable, column_default
         FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = 'users'
        ORDER BY ordinal_position`,
    );
    expect(rows).toEqual([
      { column_name: 'id', data_type: 'uuid', udt_name: 'uuid', is_nullable: 'NO', column_default: 'gen_random_uuid()' },
      { column_name: 'email', data_type: 'text', udt_name: 'text', is_nullable: 'NO', column_default: null },
      { column_name: 'password_hash', data_type: 'text', udt_name: 'text', is_nullable: 'NO', column_default: null },
      { column_name: 'token_version', data_type: 'integer', udt_name: 'int4', is_nullable: 'NO', column_default: '0' },
      { column_name: 'timezone', data_type: 'text', udt_name: 'text', is_nullable: 'NO', column_default: null },
      { column_name: 'available_weekdays', data_type: 'ARRAY', udt_name: '_int2', is_nullable: 'YES', column_default: null },
      {
        column_name: 'created_at',
        data_type: 'timestamp with time zone',
        udt_name: 'timestamptz',
        is_nullable: 'NO',
        column_default: 'CURRENT_TIMESTAMP',
      },
      {
        column_name: 'updated_at',
        data_type: 'timestamp with time zone',
        udt_name: 'timestamptz',
        is_nullable: 'NO',
        column_default: 'CURRENT_TIMESTAMP',
      },
    ]);
  });

  it('has the primary key and the manual CHECK constraints in pg_constraint', async () => {
    const { rows } = await pool.query<{ conname: string; contype: string; def: string }>(
      `SELECT conname, contype, pg_get_constraintdef(oid) AS def
         FROM pg_constraint
        WHERE conrelid = 'public.users'::regclass
        ORDER BY conname`,
    );
    expect(rows.map((r) => [r.conname, r.contype])).toEqual([
      ['users_available_weekdays_chk', 'c'],
      ['users_email_normalized_chk', 'c'],
      ['users_pkey', 'p'],
      ['users_token_version_nonneg_chk', 'c'],
    ]);
    const def = Object.fromEntries(rows.map((r) => [r.conname, r.def]));
    expect(def.users_email_normalized_chk).toBe('CHECK ((email = lower(btrim(email))))');
    expect(def.users_token_version_nonneg_chk).toBe('CHECK ((token_version >= 0))');
    expect(def.users_available_weekdays_chk).toContain('cardinality(available_weekdays) >= 2');
    expect(def.users_available_weekdays_chk).toContain('cardinality(available_weekdays) <= 6');
    expect(def.users_available_weekdays_chk).toContain("'{0,1,2,3,4,5,6}'::smallint[]");
    expect(def.users_available_weekdays_chk).toContain('available_weekdays IS NULL');
  });

  it('has a unique index users_email_key on email in pg_index', async () => {
    const { rows } = await pool.query(
      `SELECT i.relname AS index_name, x.indisunique, x.indisprimary,
              array_agg(a.attname::text ORDER BY k.ord) AS columns
         FROM pg_index x
         JOIN pg_class i ON i.oid = x.indexrelid
         JOIN LATERAL unnest(x.indkey) WITH ORDINALITY AS k(attnum, ord) ON true
         JOIN pg_attribute a ON a.attrelid = x.indrelid AND a.attnum = k.attnum
        WHERE x.indrelid = 'public.users'::regclass AND i.relname = 'users_email_key'
        GROUP BY i.relname, x.indisunique, x.indisprimary`,
    );
    expect(rows).toEqual([{ index_name: 'users_email_key', indisunique: true, indisprimary: false, columns: ['email'] }]);
  });

  it('records the migration as applied and finished', async () => {
    const { rows } = await pool.query(
      `SELECT migration_name, finished_at IS NOT NULL AS finished, rolled_back_at IS NULL AS not_rolled_back
         FROM _prisma_migrations ORDER BY migration_name`,
    );
    expect(rows).toContainEqual({ migration_name: '20261126175055_create_users', finished: true, not_rolled_back: true });
  });
});
