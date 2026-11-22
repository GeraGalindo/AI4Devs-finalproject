import { describe, expect, it } from 'vitest';
import { ConfigError, loadConfig } from './config.js';

describe('loadConfig', () => {
  it('reads DATABASE_URL and defaults PORT to 3000', () => {
    expect(loadConfig({ DATABASE_URL: 'postgres://u:p@h:5432/d' })).toEqual({
      nodeEnv: 'development',
      port: 3000,
      databaseUrl: 'postgres://u:p@h:5432/d',
    });
  });

  it('fails explicitly when DATABASE_URL is missing', () => {
    expect(() => loadConfig({})).toThrow(ConfigError);
  });

  it('rejects an invalid PORT', () => {
    expect(() => loadConfig({ DATABASE_URL: 'x', PORT: 'abc' })).toThrow(/PORT/);
  });
});
