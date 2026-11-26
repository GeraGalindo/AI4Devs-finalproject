/**
 * Reloj inyectable (readme.md 2.2 y 2.6). Los servicios toman "ahora" de un `Clock` y nunca
 * de `new Date()` ni de `now()` en SQL, para que las pruebas controlen el tiempo.
 * Dominio puro: no importa Express, `pg`, Prisma ni ningún otro módulo.
 */
export interface Clock {
  now(): Date;
}

export const systemClock: Clock = {
  now: () => new Date(),
};

/** Reloj fijo para pruebas. Devuelve una copia en cada llamada, para que nadie lo mute. */
export function fixedClock(instant: Date | string): Clock {
  const time = new Date(instant).getTime();
  if (Number.isNaN(time)) {
    throw new RangeError(`fixedClock: invalid instant "${String(instant)}"`);
  }
  return { now: () => new Date(time) };
}
