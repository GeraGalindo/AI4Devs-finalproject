/**
 * Configuración mínima del backend (DEV-001).
 * La configuración segura completa (cookies, APP_ORIGIN, arranque seguro) es de DEV-003.
 */
export interface Config {
  nodeEnv: string;
  port: number;
  databaseUrl: string;
}

export class ConfigError extends Error {
  override name = 'ConfigError';
}

export function loadConfig(env: NodeJS.ProcessEnv = process.env): Config {
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
    nodeEnv: env.NODE_ENV?.trim() || 'development',
    port,
    databaseUrl,
  };
}
