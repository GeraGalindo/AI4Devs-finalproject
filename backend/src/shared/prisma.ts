import { PrismaPg } from '@prisma/adapter-pg';
import type pg from 'pg';
import { PrismaClient } from '../generated/prisma/client.js';

export type { PrismaClient };

/**
 * Crea un PrismaClient sobre un pool de `pg` existente (el mismo que usa /api/health),
 * para no abrir un segundo conjunto de conexiones.
 *
 * `prisma.$disconnect()` no cierra el pool: quien lo creó debe llamar a `pool.end()`
 * después. Esta factoría todavía no se conecta a las rutas (DEV-004 y siguientes).
 */
export function createPrisma(pool: pg.Pool): PrismaClient {
  return new PrismaClient({ adapter: new PrismaPg(pool) });
}
