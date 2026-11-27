/**
 * Configuración del backend (DEV-001, ampliada en DEV-003).
 *
 * Arranque seguro (readme.md 2.5 y sección 4): fuera de `development` o `test` el servidor
 * se niega a arrancar si `APP_ORIGIN` no es `https`, y la cookie de sesión es siempre
 * `__Host-session` con `Secure`. DEV-004 emite la cookie y añade `JWT_SECRET`: en `production`
 * es obligatorio y debe parecer un secreto aleatorio de al menos 32 bytes, o el servidor no arranca.
 */
export const NODE_ENVS = ['development', 'test', 'production'] as const;
export type NodeEnv = (typeof NODE_ENVS)[number];

export type SessionCookieName = 'session' | '__Host-session';

export interface SessionCookieConfig {
  name: SessionCookieName;
  secure: boolean;
}

export interface Config {
  nodeEnv: NodeEnv;
  port: number;
  databaseUrl: string;
  /** Origen exacto de la SPA (esquema, host y puerto), usado por la comprobación CSRF. */
  appOrigin: string;
  sessionCookie: SessionCookieConfig;
  /** Secreto HS256 de los JWT de sesión (DEV-004, D4). Nunca se imprime ni se registra. */
  jwtSecret: string;
}

export class ConfigError extends Error {
  override name = 'ConfigError';
}

/** Origen del proxy de Vite: valor por defecto de APP_ORIGIN solo en development y test. */
export const DEV_APP_ORIGIN = 'http://localhost:5173';

/**
 * Secreto fijo solo para desarrollo local y pruebas (D4). Es público (está en el repositorio),
 * así que `production` lo rechaza. No hay ningún otro entorno con esta excepción.
 */
export const DEV_JWT_SECRET = 'cali-coach-development-and-test-only-jwt-secret-never-use-in-production';

/** Longitud mínima del secreto, en bytes UTF-8 (readme.md 2.5: "al menos 32 bytes"). */
export const JWT_SECRET_MIN_BYTES = 32;

/** Mínimo de caracteres distintos en producción: descarta valores como `aaaa…` o `abab…`. */
const JWT_SECRET_MIN_DISTINCT_CHARS = 10;

/** Valores de ejemplo conocidos que nunca son un secreto, comparados sin mayúsculas. */
const KNOWN_PLACEHOLDER_SECRET = /(change[-_ ]?me|replace[-_ ]?me|your[-_ ]?secret|example|placeholder|development|dev[-_]?only|not[-_ ]?a[-_ ]?secret)/i;

export function isRelaxedEnv(nodeEnv: NodeEnv): boolean {
  return nodeEnv === 'development' || nodeEnv === 'test';
}

export function loadConfig(env: NodeJS.ProcessEnv = process.env): Config {
  const nodeEnv = parseNodeEnv(env.NODE_ENV);

  const databaseUrl = env.DATABASE_URL?.trim();
  if (!databaseUrl) {
    throw new ConfigError('DATABASE_URL is required (see backend/.env.example)');
  }

  const rawPort = env.PORT?.trim() || '3000';
  const port = Number(rawPort);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new ConfigError(`PORT must be an integer between 1 and 65535, got "${rawPort}"`);
  }

  return {
    nodeEnv,
    port,
    databaseUrl,
    appOrigin: parseAppOrigin(env.APP_ORIGIN, nodeEnv),
    sessionCookie: sessionCookieFor(nodeEnv),
    jwtSecret: parseJwtSecret(env.JWT_SECRET, nodeEnv),
  };
}

function parseNodeEnv(raw: string | undefined): NodeEnv {
  const value = raw?.trim();
  if (!value) {
    throw new ConfigError(`NODE_ENV is required: one of ${NODE_ENVS.join(', ')}`);
  }
  if (!(NODE_ENVS as readonly string[]).includes(value)) {
    throw new ConfigError(`NODE_ENV must be one of ${NODE_ENVS.join(', ')}, got "${value}"`);
  }
  return value as NodeEnv;
}

function parseAppOrigin(raw: string | undefined, nodeEnv: NodeEnv): string {
  const value = raw?.trim();
  if (!value) {
    if (isRelaxedEnv(nodeEnv)) return DEV_APP_ORIGIN;
    throw new ConfigError(`APP_ORIGIN is required when NODE_ENV=${nodeEnv}`);
  }

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new ConfigError('APP_ORIGIN must be a valid origin such as https://cali-coach.example');
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') {
    throw new ConfigError('APP_ORIGIN must use http or https');
  }
  if (url.username || url.password) {
    throw new ConfigError('APP_ORIGIN must not contain credentials');
  }
  if (url.pathname !== '/' || url.search || url.hash || /[?#]/.test(value)) {
    throw new ConfigError('APP_ORIGIN must be an origin without path, query or fragment');
  }
  if (!isRelaxedEnv(nodeEnv) && url.protocol !== 'https:') {
    throw new ConfigError(`APP_ORIGIN must use https when NODE_ENV=${nodeEnv}`);
  }
  return url.origin;
}

/**
 * `JWT_SECRET` (D4). Los mensajes de error nunca incluyen el valor.
 * - `development` y `test`: si falta, se usa `DEV_JWT_SECRET`; si se define, debe tener 32 bytes.
 * - `production`: obligatorio, sin espacios alrededor, de al menos 32 bytes, con variedad de
 *   caracteres y distinto de `DEV_JWT_SECRET` o de un valor de ejemplo. Estas comprobaciones no
 *   miden la entropía real: el secreto debe generarse al azar (`openssl rand -base64 48`).
 */
function parseJwtSecret(raw: string | undefined, nodeEnv: NodeEnv): string {
  if (raw === undefined || raw === '') {
    if (isRelaxedEnv(nodeEnv)) return DEV_JWT_SECRET;
    throw new ConfigError(`JWT_SECRET is required when NODE_ENV=${nodeEnv}`);
  }
  if (raw !== raw.trim()) {
    throw new ConfigError('JWT_SECRET must not start or end with whitespace');
  }
  if (Buffer.byteLength(raw, 'utf8') < JWT_SECRET_MIN_BYTES) {
    throw new ConfigError(`JWT_SECRET must be at least ${JWT_SECRET_MIN_BYTES} bytes long`);
  }
  if (!isRelaxedEnv(nodeEnv)) {
    if (raw === DEV_JWT_SECRET || KNOWN_PLACEHOLDER_SECRET.test(raw)) {
      throw new ConfigError(`JWT_SECRET must not be a development or example value when NODE_ENV=${nodeEnv}`);
    }
    if (new Set(raw).size < JWT_SECRET_MIN_DISTINCT_CHARS) {
      throw new ConfigError(`JWT_SECRET does not look random enough for NODE_ENV=${nodeEnv}`);
    }
  }
  return raw;
}

/**
 * La cookie es fija por entorno (sección 4: "el nombre y los atributos se fijan en la
 * configuración (NODE_ENV, APP_ORIGIN)"): `session` sin `Secure` en development/test y
 * `__Host-session` con `Secure` en production. No hay variables para cambiarla, así que la
 * configuración de producción no se puede relajar.
 */
export function sessionCookieFor(nodeEnv: NodeEnv): SessionCookieConfig {
  return isRelaxedEnv(nodeEnv) ? { name: 'session', secure: false } : { name: '__Host-session', secure: true };
}
