export type HealthResult =
  | { kind: 'ok' }
  | { kind: 'database-down' }
  | { kind: 'backend-unreachable'; detail: string };

/**
 * Llama a GET /api/health y clasifica el resultado.
 * - 200 → todo conectado.
 * - 503 con TEMPORARILY_UNAVAILABLE → el backend responde pero la base de datos no.
 * - error de red, otro estado o respuesta no JSON (p. ej., el proxy de Vite sin backend) → backend inaccesible.
 */
export async function checkHealth(fetchFn: typeof fetch = fetch): Promise<HealthResult> {
  let res: Response;
  try {
    res = await fetchFn('/api/health', { headers: { Accept: 'application/json' } });
  } catch (err) {
    return { kind: 'backend-unreachable', detail: err instanceof Error ? err.message : 'Network error' };
  }

  if (res.status === 200) {
    return { kind: 'ok' };
  }

  if (res.status === 503) {
    const body: unknown = await res.json().catch(() => null);
    if (isUnavailableError(body)) {
      return { kind: 'database-down' };
    }
  }

  return { kind: 'backend-unreachable', detail: `HTTP ${res.status}` };
}

function isUnavailableError(body: unknown): boolean {
  if (typeof body !== 'object' || body === null || !('error' in body)) return false;
  const error = (body as { error: unknown }).error;
  return typeof error === 'object' && error !== null && (error as { code?: unknown }).code === 'TEMPORARILY_UNAVAILABLE';
}
