import { connectE2eDatabase } from './e2e-database.ts';

/** Fila de `users` vista desde la base de E2E (comprobada con `current_database()`). */
export interface UserRow {
  email: string;
  password_hash: string;
  timezone: string;
  available_weekdays: number[] | null;
  token_version: number;
}

export async function findUsers(email: string): Promise<UserRow[]> {
  const client = await connectE2eDatabase();
  try {
    const { rows } = await client.query<UserRow>(
      'SELECT email, password_hash, timezone, available_weekdays, token_version FROM users WHERE email = $1',
      [email],
    );
    return rows;
  } finally {
    await client.end();
  }
}

/** Un email único por prueba: los E2E nunca borran datos. */
export function uniqueEmail(prefix: string): string {
  return `${prefix}.${Date.now()}.${Math.random().toString(36).slice(2, 8)}@Example.COM`;
}
