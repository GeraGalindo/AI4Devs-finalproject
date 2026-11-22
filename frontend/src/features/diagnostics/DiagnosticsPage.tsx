import { useCallback, useEffect, useState } from 'react';
import { checkHealth, type HealthResult } from './checkHealth';

type State = { kind: 'loading' } | HealthResult;

/**
 * Vista técnica de diagnóstico (DEV-001). Solo verifica la integración
 * frontend → backend → PostgreSQL. Textos en inglés sin i18n ni design tokens
 * (decisión D7): se migrará o retirará en DEV-038/DEV-039.
 */
export function DiagnosticsPage({ fetchFn }: { fetchFn?: typeof fetch }) {
  const [state, setState] = useState<State>({ kind: 'loading' });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    void checkHealth(fetchFn).then((result) => {
      if (!cancelled) setState(result);
    });
    return () => {
      cancelled = true;
    };
  }, [fetchFn, attempt]);

  const run = useCallback(() => {
    setState({ kind: 'loading' });
    setAttempt((n) => n + 1);
  }, []);

  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: '16px', maxWidth: '480px', margin: '0 auto' }}>
      <h1>Cali Coach — System status</h1>
      <p role="status" aria-live="polite" data-testid="health-status">
        {describe(state)}
      </p>
      <dl>
        <dt>Backend</dt>
        <dd data-testid="backend-status">{backendLabel(state)}</dd>
        <dt>Database</dt>
        <dd data-testid="database-status">{databaseLabel(state)}</dd>
      </dl>
      <button type="button" onClick={run} disabled={state.kind === 'loading'}>
        Check again
      </button>
    </main>
  );
}

function describe(state: State): string {
  switch (state.kind) {
    case 'loading':
      return 'Checking…';
    case 'ok':
      return 'All systems operational.';
    case 'database-down':
      return 'The backend is running, but the database is unavailable.';
    case 'backend-unreachable':
      return `The backend is unreachable (${state.detail}).`;
  }
}

function backendLabel(state: State): string {
  if (state.kind === 'loading') return 'Checking…';
  return state.kind === 'backend-unreachable' ? 'Unreachable' : 'Up';
}

function databaseLabel(state: State): string {
  switch (state.kind) {
    case 'loading':
      return 'Checking…';
    case 'ok':
      return 'Up';
    case 'database-down':
      return 'Down';
    case 'backend-unreachable':
      return 'Unknown';
  }
}
