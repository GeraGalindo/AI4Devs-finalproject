import { ApiError } from '../../shared/api/client';
import { getMe, parsePublicUser, parseUserResponse } from './api';

const user = { id: '7c6f1c2e-6d3b-4f0a-9b1e-2d3c4b5a6f70', email: 'ana@example.com', timezone: 'Europe/Madrid', availableWeekdays: null };

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('auth api', () => {
  it('parses a public user, with null or configured weekdays', () => {
    expect(parsePublicUser(user)).toEqual(user);
    expect(parsePublicUser({ ...user, availableWeekdays: [1, 3, 5] })).toEqual({ ...user, availableWeekdays: [1, 3, 5] });
  });

  it('keeps only the public fields', () => {
    expect(parsePublicUser({ ...user, passwordHash: 'x', tokenVersion: 0 })).toEqual(user);
  });

  it.each([
    ['no user', undefined],
    ['a missing field', { id: user.id, email: user.email, timezone: user.timezone }],
    ['a wrong type', { ...user, email: 1 }],
    ['non-integer weekdays', { ...user, availableWeekdays: ['mon'] }],
    ['an array', [user]],
  ])('rejects %s', (_label, value) => {
    expect(() => parseUserResponse({ user: value })).toThrow(TypeError);
  });

  it('getMe calls GET /api/auth/me and returns the user', async () => {
    const fetchMock = vi.fn(async () => new Response(JSON.stringify({ user }), { status: 200, headers: { 'Content-Type': 'application/json' } }));
    vi.stubGlobal('fetch', fetchMock);
    expect(await getMe()).toEqual(user);
    expect(fetchMock).toHaveBeenCalledWith('/api/auth/me', expect.objectContaining({ method: 'GET', credentials: 'same-origin' }));
  });

  it('getMe turns an invalid body into invalid-response', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify({ user: {} }), { status: 200, headers: { 'Content-Type': 'application/json' } })));
    await expect(getMe()).rejects.toMatchObject({ kind: 'invalid-response' });
    await expect(getMe()).rejects.toBeInstanceOf(ApiError);
  });
});
