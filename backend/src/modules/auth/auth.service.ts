import type { Clock } from '../../domain/clock.js';
import { AppError } from '../../shared/http/errors.js';
import type { Identity } from '../../shared/http/require-auth.js';
import type { PasswordHasher } from './auth.password.js';
import {
  EmailAlreadyRegisteredError,
  type AuthRepository,
  type PublicUser,
  type SessionUser,
} from './auth.repository.js';
import type { LoginInput, RegisterInput } from './auth.schemas.js';
import type { SessionTokens } from './auth.token.js';

/**
 * Servicio de autenticación (DEV-004): registro, login, verificación de la sesión y logout.
 * Es lo único que expone el módulo `auth` a los demás (junto con su router).
 */
export interface AuthenticatedUser extends Identity {
  tokenVersion: number;
  user: PublicUser;
}

export interface SessionResult {
  user: PublicUser;
  /** JWT para la cookie. Nunca se devuelve en el cuerpo de la respuesta. */
  token: string;
}

export interface AuthService {
  register(input: RegisterInput): Promise<SessionResult>;
  login(input: LoginInput): Promise<SessionResult>;
  authenticate(token: string): Promise<AuthenticatedUser | null>;
  /** Revoca todas las sesiones del usuario si `token` es válido. Sin token válido, no hace nada. */
  logout(token: string | undefined): Promise<void>;
}

export interface AuthServiceDeps {
  repository: AuthRepository;
  passwords: PasswordHasher;
  tokens: SessionTokens;
  clock: Clock;
}

/** D9: el mismo error, con el mismo código y mensaje, para email inexistente y contraseña incorrecta. */
function invalidCredentials(): AppError {
  return new AppError(401, 'INVALID_CREDENTIALS', 'Invalid email or password.');
}

function toPublicUser({ id, email, timezone, availableWeekdays }: SessionUser): PublicUser {
  return { id, email, timezone, availableWeekdays };
}

export function createAuthService({ repository, passwords, tokens, clock }: AuthServiceDeps): AuthService {
  async function startSession(user: SessionUser): Promise<SessionResult> {
    const token = await tokens.issue({ sub: user.id, ver: user.tokenVersion }, clock.now());
    return { user: toPublicUser(user), token };
  }

  const authenticate: AuthService['authenticate'] = async (token) => {
    const claims = await tokens.verify(token, clock.now());
    if (!claims) return null;
    const user = await repository.findSessionUser(claims.sub);
    if (!user || user.tokenVersion !== claims.ver) return null;
    return { userId: user.id, tokenVersion: user.tokenVersion, user: toPublicUser(user) };
  };

  return {
    async register({ email, password, timezone }) {
      const passwordHash = await passwords.hash(password);
      let user: SessionUser;
      try {
        user = await repository.create({ email, passwordHash, timezone });
      } catch (err) {
        if (err instanceof EmailAlreadyRegisteredError) {
          throw new AppError(409, 'EMAIL_ALREADY_REGISTERED', 'This email is already registered.');
        }
        throw err;
      }
      return startSession(user);
    },

    async login({ email, password }) {
      const credentials = await repository.findCredentialsByEmail(email);
      // Con un email inexistente se verifica contra el hash de relleno: el mismo trabajo y la
      // misma respuesta que con una contraseña incorrecta.
      const valid = credentials
        ? await passwords.verify(credentials.passwordHash, password)
        : await passwords.verifyDummy(password);
      if (!credentials || !valid) throw invalidCredentials();
      return startSession(credentials);
    },

    authenticate,

    async logout(token) {
      if (!token) return;
      const identity = await authenticate(token);
      if (!identity) return;
      await repository.revokeSessions(identity.userId, identity.tokenVersion);
    },
  };
}
