import { describe, expect, it } from 'vitest';
import { createPasswordHasher } from './auth.password.js';

const hasher = createPasswordHasher();
const password = 'correct horse battery staple';

describe('password hasher (D1)', () => {
  it('hashes with Argon2id, m=19456 KiB, t=2, p=1, and a random salt', async () => {
    const hash = await hasher.hash(password);
    expect(hash).toMatch(/^\$argon2id\$v=19\$m=19456,t=2,p=1\$[A-Za-z0-9+/]+\$[A-Za-z0-9+/]+$/);
    expect(hash).not.toContain(password);
    expect(await hasher.hash(password)).not.toBe(hash);
  });

  it('verifies the right password and rejects a wrong one', async () => {
    const hash = await hasher.hash(password);
    expect(await hasher.verify(hash, password)).toBe(true);
    expect(await hasher.verify(hash, `${password} `)).toBe(false);
    expect(await hasher.verify(hash, 'Correct horse battery staple')).toBe(false);
  });

  it('verifies against a dummy hash for unknown users and always returns false', async () => {
    expect(await hasher.verifyDummy(password)).toBe(false);
    expect(await hasher.verifyDummy('')).toBe(false);
  });
});
