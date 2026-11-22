import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DiagnosticsPage } from './DiagnosticsPage';

function jsonResponse(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
}

describe('DiagnosticsPage', () => {
  it('shows all systems up when the API responds 200', async () => {
    const fetchFn = vi.fn().mockResolvedValue(jsonResponse(200, { status: 'ok', database: 'up' }));

    render(<DiagnosticsPage fetchFn={fetchFn} />);

    expect(await screen.findByText('All systems operational.')).toBeInTheDocument();
    expect(screen.getByTestId('backend-status')).toHaveTextContent('Up');
    expect(screen.getByTestId('database-status')).toHaveTextContent('Up');
    expect(fetchFn).toHaveBeenCalledWith('/api/health', expect.anything());
  });

  it('shows the database as down when the API responds 503 TEMPORARILY_UNAVAILABLE', async () => {
    const fetchFn = vi
      .fn()
      .mockResolvedValue(jsonResponse(503, { error: { code: 'TEMPORARILY_UNAVAILABLE', message: 'x' } }));

    render(<DiagnosticsPage fetchFn={fetchFn} />);

    expect(await screen.findByText(/database is unavailable/i)).toBeInTheDocument();
    expect(screen.getByTestId('backend-status')).toHaveTextContent('Up');
    expect(screen.getByTestId('database-status')).toHaveTextContent('Down');
  });

  it('shows the backend as unreachable on a network error', async () => {
    const fetchFn = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'));

    render(<DiagnosticsPage fetchFn={fetchFn} />);

    expect(await screen.findByText(/backend is unreachable/i)).toBeInTheDocument();
    expect(screen.getByTestId('database-status')).toHaveTextContent('Unknown');
  });

  it('treats a non-JSON proxy error (backend stopped) as backend unreachable', async () => {
    const fetchFn = vi.fn().mockResolvedValue(new Response('proxy error', { status: 500 }));

    render(<DiagnosticsPage fetchFn={fetchFn} />);

    expect(await screen.findByText(/backend is unreachable \(HTTP 500\)/i)).toBeInTheDocument();
  });

  it('re-runs the check on demand', async () => {
    const fetchFn = vi
      .fn()
      .mockRejectedValueOnce(new TypeError('Failed to fetch'))
      .mockResolvedValueOnce(jsonResponse(200, { status: 'ok', database: 'up' }));

    render(<DiagnosticsPage fetchFn={fetchFn} />);
    await screen.findByText(/backend is unreachable/i);

    await userEvent.click(screen.getByRole('button', { name: 'Check again' }));

    expect(await screen.findByText('All systems operational.')).toBeInTheDocument();
    expect(fetchFn).toHaveBeenCalledTimes(2);
  });
});
