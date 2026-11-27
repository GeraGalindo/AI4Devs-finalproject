import type { PrismaClient } from '../../shared/prisma.js';

/**
 * Acceso a `users` para la autenticación (DEV-004), con Prisma sobre el pool compartido.
 * Solo lo usa el servicio de este módulo.
 *
 * - `available_weekdays`: Prisma 7 lee como `[]` un `NULL` de PostgreSQL; aquí se convierte en
 *   `null` (3.2 y D1 de DEV-002). El registro no escribe la columna, así que queda `NULL`.
 * - Errores: los de Prisma pueden llevar en el mensaje los argumentos de la consulta (email,
 *   hash). Nunca salen de aquí: se sustituyen por `UserRepositoryError`, que solo dice qué
 *   operación falló y el código de Prisma, sin causa encadenada.
 */
export interface PublicUser {
  id: string;
  email: string;
  timezone: string;
  availableWeekdays: number[] | null;
}

/** Usuario de la sesión: datos públicos y `token_version` para comprobar la revocación. */
export interface SessionUser extends PublicUser {
  tokenVersion: number;
}

export interface UserCredentials extends SessionUser {
  passwordHash: string;
}

export interface NewUser {
  email: string;
  passwordHash: string;
  timezone: string;
}

export interface AuthRepository {
  findCredentialsByEmail(email: string): Promise<UserCredentials | null>;
  findSessionUser(id: string): Promise<SessionUser | null>;
  /** Lanza `EmailAlreadyRegisteredError` si el email ya existe (índice `users_email_key`). */
  create(user: NewUser): Promise<SessionUser>;
  /**
   * Incrementa `token_version` solo si sigue valiendo `tokenVersion` (un único `UPDATE`, atómico).
   * Devuelve `false` si otra petición ya lo había incrementado.
   */
  revokeSessions(id: string, tokenVersion: number): Promise<boolean>;
}

export class EmailAlreadyRegisteredError extends Error {
  override name = 'EmailAlreadyRegisteredError';
  constructor() {
    super('Email already registered');
  }
}

export class UserRepositoryError extends Error {
  override name = 'UserRepositoryError';
}

const sessionUserSelect = {
  id: true,
  email: true,
  timezone: true,
  availableWeekdays: true,
  tokenVersion: true,
} as const;

type SessionUserRow = {
  id: string;
  email: string;
  timezone: string;
  availableWeekdays: number[];
  tokenVersion: number;
};

function toSessionUser(row: SessionUserRow): SessionUser {
  return {
    id: row.id,
    email: row.email,
    timezone: row.timezone,
    // El CHECK impide guardar '{}', así que [] leído por Prisma siempre es NULL.
    availableWeekdays: row.availableWeekdays.length === 0 ? null : row.availableWeekdays,
    tokenVersion: row.tokenVersion,
  };
}

function prismaCode(err: unknown): string | undefined {
  if (typeof err === 'object' && err !== null && 'code' in err && typeof err.code === 'string') return err.code;
  return undefined;
}

/** Sustituye un error de Prisma por otro sin datos de la consulta. */
function sanitized(operation: string, err: unknown): UserRepositoryError {
  const name = err instanceof Error ? err.name : typeof err;
  const code = prismaCode(err);
  return new UserRepositoryError(`users.${operation} failed (${name}${code ? ` ${code}` : ''})`);
}

export function createAuthRepository(prisma: PrismaClient): AuthRepository {
  return {
    async findCredentialsByEmail(email) {
      try {
        const row = await prisma.user.findUnique({
          where: { email },
          select: { ...sessionUserSelect, passwordHash: true },
        });
        return row ? { ...toSessionUser(row), passwordHash: row.passwordHash } : null;
      } catch (err) {
        throw sanitized('findCredentialsByEmail', err);
      }
    },

    async findSessionUser(id) {
      try {
        const row = await prisma.user.findUnique({ where: { id }, select: sessionUserSelect });
        return row ? toSessionUser(row) : null;
      } catch (err) {
        throw sanitized('findSessionUser', err);
      }
    },

    async create({ email, passwordHash, timezone }) {
      try {
        const row = await prisma.user.create({ data: { email, passwordHash, timezone }, select: sessionUserSelect });
        return toSessionUser(row);
      } catch (err) {
        // P2002: violación de unicidad. En `users` solo es único `email` (el id lo genera la base).
        if (prismaCode(err) === 'P2002') throw new EmailAlreadyRegisteredError();
        throw sanitized('create', err);
      }
    },

    async revokeSessions(id, tokenVersion) {
      try {
        const { count } = await prisma.user.updateMany({
          where: { id, tokenVersion },
          data: { tokenVersion: { increment: 1 } },
        });
        return count === 1;
      } catch (err) {
        throw sanitized('revokeSessions', err);
      }
    },
  };
}
