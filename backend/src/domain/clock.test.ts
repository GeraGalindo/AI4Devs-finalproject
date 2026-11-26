import { describe, expect, it } from 'vitest';
import { fixedClock, systemClock } from './clock.js';

describe('Clock', () => {
  it('systemClock returns the current time', () => {
    const before = Date.now();
    const now = systemClock.now().getTime();
    expect(now).toBeGreaterThanOrEqual(before);
    expect(now).toBeLessThanOrEqual(Date.now());
  });

  it('fixedClock always returns the same instant', () => {
    const clock = fixedClock('2026-11-20T23:59:59.000Z');
    expect(clock.now().toISOString()).toBe('2026-11-20T23:59:59.000Z');
    expect(clock.now().toISOString()).toBe('2026-11-20T23:59:59.000Z');
  });

  it('fixedClock cannot be mutated through the returned Date', () => {
    const clock = fixedClock(new Date('2026-11-20T00:00:00.000Z'));
    clock.now().setUTCFullYear(2000);
    expect(clock.now().toISOString()).toBe('2026-11-20T00:00:00.000Z');
  });

  it('fixedClock rejects an invalid instant', () => {
    expect(() => fixedClock('not a date')).toThrow(RangeError);
  });
});
