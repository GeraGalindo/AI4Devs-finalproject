import { detectTimeZone, isIanaTimeZone, listTimeZones, TIME_ZONE_MAX_LENGTH } from './timeZones';

function mockResolvedTimeZone(timeZone: unknown) {
  const real = Intl.DateTimeFormat.prototype.resolvedOptions;
  return vi.spyOn(Intl.DateTimeFormat.prototype, 'resolvedOptions').mockImplementation(function (this: Intl.DateTimeFormat) {
    return { ...real.call(this), timeZone } as Intl.ResolvedDateTimeFormatOptions;
  });
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe('isIanaTimeZone (same check as the backend)', () => {
  it.each(['UTC', 'Europe/Madrid', 'America/Argentina/Buenos_Aires', 'Etc/GMT+5', 'America/Port-au-Prince', 'Asia/Calcutta'])(
    'accepts %s',
    (zone) => {
      expect(isIanaTimeZone(zone)).toBe(true);
    },
  );

  it.each(['', '+01:00', '-05:00', 'UTC+1', 'GMT+01:00', 'Europe/Nowhere', 'Etc/Unknown', '/Europe/Madrid', 'Europe//Madrid', 'Europe/Madrid '])(
    'rejects %j',
    (zone) => {
      expect(isIanaTimeZone(zone)).toBe(false);
    },
  );

  it(`rejects identifiers longer than ${TIME_ZONE_MAX_LENGTH} characters`, () => {
    expect(isIanaTimeZone(`A${'/b'.repeat(40)}`)).toBe(false);
  });
});

describe('detectTimeZone', () => {
  it('returns the browser time zone when it is valid', () => {
    mockResolvedTimeZone('America/Bogota');
    expect(detectTimeZone()).toBe('America/Bogota');
  });

  it.each([undefined, '', 'Etc/Unknown', '+01:00', 42])('returns undefined for %j, never a default', (zone) => {
    mockResolvedTimeZone(zone);
    expect(detectTimeZone()).toBeUndefined();
  });

  it('returns undefined when Intl throws', () => {
    vi.spyOn(Intl.DateTimeFormat.prototype, 'resolvedOptions').mockImplementation(() => {
      throw new Error('no Intl');
    });
    expect(detectTimeZone()).toBeUndefined();
  });
});

describe('listTimeZones', () => {
  it('lists the supported zones plus UTC, all valid and sorted', () => {
    const zones = listTimeZones();
    expect(zones).toBeDefined();
    expect(zones).toContain('UTC');
    expect(zones).toContain('Europe/Madrid');
    expect(zones?.every(isIanaTimeZone)).toBe(true);
    expect(new Set(zones).size).toBe(zones?.length);
    expect([...(zones ?? [])].sort((a, b) => a.localeCompare(b, 'en'))).toEqual(zones);
  });

  it('returns undefined when the browser has no Intl.supportedValuesOf', () => {
    const original = Intl.supportedValuesOf;
    Object.defineProperty(Intl, 'supportedValuesOf', { value: undefined, configurable: true, writable: true });
    try {
      expect(listTimeZones()).toBeUndefined();
    } finally {
      Object.defineProperty(Intl, 'supportedValuesOf', { value: original, configurable: true, writable: true });
    }
  });
});
