/**
 * Configuración del backend (DEV-001, ampliada en DEV-003).
 *
 * Arranque seguro (readme.md 2.5 y sección 4): fuera de `development` o `test` el servidor
 * se niega a arrancar si `APP_ORIGIN` no es `https`, y la cookie de sesión es siempre
 * `__Host-session` con `Secure`. La cookie todavía no se emite: lo hará DEV-004.
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
}

export class ConfigError extends Error {
  override name = 'ConfigError';
}

/** Origen del proxy de Vite: valor por defecto de APP_ORIGIN solo en development y test. */
export const DEV_APP_ORIGIN = 'http://localhost:5173';

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
 * La cookie es fija por entorno (sección 4: "el nombre y los atributos se fijan en la
 * configuración (NODE_ENV, APP_ORIGIN)"): `session` sin `Secure` en development/test y
 * `__Host-session` con `Secure` en production. No hay variables para cambiarla, así que la
 * configuración de producción no se puede relajar.
 */
export function sessionCookieFor(nodeEnv: NodeEnv): SessionCookieConfig {
  return isRelaxedEnv(nodeEnv) ? { name: 'session', secure: false } : { name: '__Host-session', secure: true };
}
