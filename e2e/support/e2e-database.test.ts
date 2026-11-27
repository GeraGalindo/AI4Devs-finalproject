import assert from 'node:assert/strict';
import { test } from 'node:test';
import { DEFAULT_E2E_DATABASE_URL, E2eDatabaseGuardError, resolveE2eDatabaseUrl } from './e2e-database.ts';

/** Salvaguardas de la base de E2E (node --test, sin PostgreSQL). */
const DEV = 'postgres://calicoach:calicoach@localhost:5432/calicoach';
const TEST = 'postgres://calicoach:calicoach@localhost:5432/calicoach_test';

const refuses = (env: Record<string, string>, backendEnv: Record<string, string> = {}, message?: RegExp) =>
  assert.throws(() => resolveE2eDatabaseUrl(env, backendEnv), (err: unknown) => {
    assert.ok(err instanceof E2eDatabaseGuardError);
    if (message) assert.match(err.message, message);
    assert.doesNotMatch(err.message, /calicoach:calicoach/);
    return true;
  });

test('uses the local calicoach_e2e by default', () => {
  assert.equal(resolveE2eDatabaseUrl({}, {}), DEFAULT_E2E_DATABASE_URL);
});

test('accepts another local *_e2e database', () => {
  const url = 'postgresql://u:p@127.0.0.1:5433/other_e2e';
  assert.equal(resolveE2eDatabaseUrl({ E2E_DATABASE_URL: url }, {}), url);
});

for (const url of [DEV, TEST, 'postgres://u:p@localhost/calicoach_e2e_copy', 'postgres://u:p@localhost/e2e', 'postgres://u:p@localhost/']) {
  test(`refuses a database whose name does not end with _e2e: ${new URL(url).pathname}`, () => {
    refuses({ E2E_DATABASE_URL: url }, {}, /must end with _e2e/);
  });
}

test('refuses a remote host', () => {
  refuses({ E2E_DATABASE_URL: 'postgres://u:p@db.example.com:5432/calicoach_e2e' }, {}, /only a local PostgreSQL/);
});

test('refuses something that is not a postgres URL', () => {
  refuses({ E2E_DATABASE_URL: 'not a url' }, {}, /not a valid URL/);
  refuses({ E2E_DATABASE_URL: 'mysql://u:p@localhost/calicoach_e2e' }, {}, /postgres:\/\//);
});

for (const name of ['DATABASE_URL', 'TEST_DATABASE_URL']) {
  test(`refuses the same database as ${name}, from the environment or backend/.env`, () => {
    const e2e = 'postgres://u:p@localhost:5432/shared_e2e';
    refuses({ E2E_DATABASE_URL: e2e, [name]: 'postgres://x:y@127.0.0.1:5432/shared_e2e' }, {}, new RegExp(name));
    refuses({ E2E_DATABASE_URL: e2e }, { [name]: 'postgres://x:y@localhost/shared_e2e' }, new RegExp(name));
  });
}

test('the development and test databases do not block calicoach_e2e', () => {
  assert.equal(resolveE2eDatabaseUrl({ DATABASE_URL: DEV, TEST_DATABASE_URL: TEST }, { DATABASE_URL: DEV, TEST_DATABASE_URL: TEST }), DEFAULT_E2E_DATABASE_URL);
});
