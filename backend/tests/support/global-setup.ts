import { prepareTestDatabase, resolveTestDatabaseUrl } from './test-database.js';

/** Se ejecuta una vez antes de las pruebas de integración: valida y migra la base de pruebas. */
export default async function setup(): Promise<void> {
  const testUrl = resolveTestDatabaseUrl(process.env);
  await prepareTestDatabase(testUrl);
}
