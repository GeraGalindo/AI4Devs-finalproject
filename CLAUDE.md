# CLAUDE.md — Cali Coach

Instrucciones para Claude Code en este repositorio. Si algo de este archivo contradice `readme.md`, manda `readme.md` y hay que avisar de la contradicción.

## 1. Proyecto y límites del MVP

Cali Coach es una aplicación web *mobile-first* para practicantes intermedios de calistenia: asigna un programa preconfigurado, lo reparte en 2–6 días fijos por semana, muestra la sesión del día, registra series y enseña el progreso. Es el proyecto final de AI4Devs.

- **Alcance:** las funcionalidades F1–F9 (Imprescindible) de `readme.md` 1.2. F10 (hitos) es Deseable y no se implementa sin indicación expresa (DP-17).
- **Fuera de alcance:** la lista "Fuera de alcance del MVP" de 1.2. En particular: IA, PWA o Capacitor, abandonar un programa (DP-14), varios programas activos (DP-07), idiomas distintos del inglés y panel de administración.
- **Interfaz:** solo en inglés. La documentación del repositorio, en español.

## 2. Fuentes de verdad

| Tema | Documento |
|------|-----------|
| Producto, reglas RP1–RP6 y decisiones DP-01 a DP-17 | `readme.md` 1.2 |
| Arquitectura, estructura de carpetas, seguridad y pruebas | `readme.md` 2.1–2.6 |
| Modelo de datos | `readme.md` 3 |
| Contrato REST y formato de errores | `readme.md` 4 |
| Historias y criterios de aceptación | `readme.md` 5 |
| Tickets DEV-001 a DEV-039, dependencias y orden | `readme.md` 6 |
| Diseño, navegación, accesibilidad e i18n | `docs/design-system.md` |
| Historial de prompts | `prompts.md` |

**Precedencia:** las decisiones DP confirmadas van primero, después lo marcado [Confirmada] y por último lo marcado [Propuesta]. Lo [Pendiente] o lo que no esté documentado **no se decide**: se pregunta al autor.

## 3. Rol de Claude

- Actúas como desarrollador del equipo. **No tomas decisiones de producto** ni cambias prioridades, criterios de aceptación o contratos por tu cuenta.
- Trabajas sobre **un ticket DEV-xxx cada vez** y solo sobre su alcance. Si una tarea exige algo de otro ticket, lo indicas y no lo implementas.
- Si una decisión técnica relevante no está documentada (una dependencia nueva, un endpoint, un cambio de contrato), propones opciones y esperas aprobación.

## 4. Análisis antes de modificar

Antes de editar código o documentación:
1. Comprueba la rama y el estado de Git (`git status`, `git fetch`).
2. Lee el ticket, sus dependencias y las secciones del README que cita.
3. Revisa el código existente afectado.
4. Presenta un plan con archivos, dependencias, pruebas y riesgos. Si el usuario pide una fase de análisis, **detente** hasta recibir aprobación.

## 5. Estructura y calidad del código

- **Monorepo con npm workspaces:** `backend/`, `frontend/` y `e2e/`. Node 24 (`.nvmrc`), TypeScript en modo `strict` y ESM.
- **Backend** (`readme.md` 2.3): monolito modular con `src/modules/<módulo>/` (`*.routes.ts`, `*.controller.ts`, `*.service.ts`, `*.repository.ts`, `*.schemas.ts`), `src/domain/` puro y `src/shared/`.
  - `domain/` no importa Express, `pg`, Prisma ni ningún otro módulo.
  - Un módulo solo expone su servicio; nadie importa repositorios ajenos.
  - Los repositorios filtran **siempre** por `user_id`, con SQL parametrizado.
  - Dependencias como la base de datos o el reloj se inyectan (ver `createApp({ checkDatabase })`) para poder probarlas.
- **Frontend:** organizado por *features* (`src/features/<feature>/`). El backend es la fuente de verdad de estados y fechas: la SPA no los calcula.
- **Tests:** las unitarias van junto al código (`*.test.ts(x)`), las de integración en `backend/tests/integration/` y las E2E en `e2e/tests/`.
- **Dependencias:** exactas (`.npmrc` con `save-exact`). No añadas librerías sin necesidad concreta ni sin aprobación si no están en la sección 2.
- No crees carpetas vacías "para más adelante". Cada ticket crea las suyas.

## 6. Git y ramas

- No trabajes directamente en `main`. Usa `feature/dev-xxx-<slug>` para tickets y `docs/<slug>` para cambios solo documentales, siempre desde `origin/main` actualizado.
- Mensajes con *Conventional Commits* (`feat:`, `fix:`, `docs:`, `test:`, `chore:`, `ci:`), en inglés.
- **No hagas commit, push ni Pull Request sin autorización explícita** del usuario en esa tarea.
- Nunca uses `--force` sobre `main`, `--no-verify` ni reescribas historial publicado.
- No versiones `.env`, `node_modules/`, `dist/` ni los informes de Playwright.

## 7. Pruebas y validación

Comandos (desde la raíz):

| Comando | Necesita PostgreSQL |
|---------|---------------------|
| `npm run lint` | No |
| `npm run typecheck` | No |
| `npm test` (unitarias y componentes) | No |
| `npm run test:integration` | Sí: `npm run db:up` y `backend/.env` con `TEST_DATABASE_URL` |
| `npm run build` | No |
| `npm run test:e2e` (Chromium; requiere `npx playwright install chromium`) | Sí |
| `npm run db:migrate`, `db:status`, `db:drift` | Sí (sobre `DATABASE_URL`) |

- Antes de dar algo por terminado, ejecuta como mínimo `lint`, `typecheck`, `test`, `test:integration` y `build`, y muestra el resultado real.
- Las pruebas de integración y de concurrencia van **siempre contra PostgreSQL real**, nunca contra *mocks* de la base de datos (2.6).
- Cada ticket añade sus propias pruebas (sección 6, "Calidad en cada incremento").
- En los informes, **distingue lo verificado en local de lo verificado en CI**. No marques un criterio como cumplido sin evidencia.

## 8. Base de datos y migraciones (Prisma 7)

- El esquema está en `backend/prisma/schema.prisma` y la configuración en `backend/prisma.config.ts`. El cliente se genera en `backend/src/generated/prisma` (no se versiona; `npm install` ejecuta `prisma generate`).
- **Nunca uses `prisma db push`** ni edites una migración ya aplicada o publicada: cada cambio es una migración nueva y versionada.
- Procedimiento para una migración:
  1. Cambia el esquema y crea la migración **sin aplicarla**, contra una base desechable: `DATABASE_URL=<base desechable> npm run db:migrate:create --workspace backend -- --name <nombre>`.
  2. Revisa el SQL generado y añade al final el bloque `-- >>> SQL manual … -- <<< SQL manual` con lo que Prisma no expresa (`CHECK`, índices parciales, claves compuestas especiales), con **nombres explícitos** (`<tabla>_<regla>_chk`, `ux_…`).
  3. Aplícala y comprueba: `npm run db:migrate`, `npm run db:status` y `npm run db:drift` (código 0 = sin diferencias).
  4. Añade pruebas de integración que comprueben los objetos en el catálogo (`information_schema`, `pg_constraint`, `pg_index`) y que cada restricción rechaza datos con su SQLSTATE (`23514`, `23505`, `23502`).
- `db:drift` **no** detecta los `CHECK` ni el SQL manual: no sustituye a las pruebas de restricciones.
- Las migraciones desde cero solo se prueban sobre bases desechables. Las pruebas de integración usan `TEST_DATABASE_URL` (base `*_test`, distinta de `DATABASE_URL`); `tests/support/test-database.ts` la crea, la migra y se niega a vaciar tablas fuera de una base `*_test`. No relajes esas salvaguardas.
- `@updatedAt` lo gestiona Prisma: un `UPDATE` en SQL directo debe fijar `updated_at = now()` a mano.
- Prisma 7 devuelve `[]` cuando un *array* de PostgreSQL es `NULL` (`users.available_weekdays`). Los repositorios convierten `[]` en `null` antes de devolver datos al dominio o la API; las consultas "sin configurar" usan `IS NULL` en SQL. La prueba canario de `tests/integration/prisma.test.ts` avisa si ese comportamiento cambia.
- `createPrisma(pool)` (`src/shared/prisma.ts`) reutiliza el pool de `pg`. Al cerrar: `prisma.$disconnect()` y después `pool.end()`.
- El *override* de `effect` en el `package.json` raíz corrige GHSA-7589-6fvf-x4pw en el CLI de Prisma 7.10.1. Su entrada del *lockfile* se ajustó a mano (npm con *workspaces* no aplica el *override* sobre un *lockfile* existente) y `npm ls` la marca como `invalid`: ver `readme.md` 2.6. No regeneres el *lockfile* entero. El *override* se retira en un ticket de mantenimiento cuando una versión estable de Prisma incluya la corrección. La CI ejecuta `npm audit --audit-level=high`.

## 9. Seguridad, privacidad y secretos

- Sin secretos en el repositorio: solo `.env.example` con valores de desarrollo.
- No registres contraseñas, *hashes*, tokens, cadenas de conexión ni datos personales en *logs* ni en respuestas de error.
- Los errores siguen el formato `{ error: { code, message, details?, requestId } }` de la sección 4, sin trazas ni SQL.
- Medidas previstas en 2.5 (CSRF, cookie `__Host-session`, `helmet`, límites de peticiones): no las relajes ni las desactives "temporalmente".
- No envíes datos del usuario ni del proyecto a servicios externos.

## 10. Trazabilidad

- Registra en `prompts.md` cada prompt relevante, con sus convenciones: herramienta y modelo, objetivo, archivos afectados, texto literal, decisiones humanas, resultado de la IA, validación y revisión humana. Usa el **siguiente número libre** sin renumerar el historial y actualiza el "Mapa de prompts registrados".
- No inventes contenido de prompts que no tengas (el Prompt 17 sigue pendiente).
- Las desviaciones respecto al README se documentan en la sección afectada. Las decisiones técnicas aprobadas se anotan en el ticket correspondiente de la sección 6.

## 11. Definición de terminado

Una tarea está terminada cuando:
1. el alcance del ticket está implementado, y nada más;
2. `lint`, `typecheck`, `test`, `test:integration` y `build` pasan en local, con la salida mostrada;
3. sus criterios de aceptación están comprobados con evidencia;
4. el README (1.4, 2.6 o la sección afectada) y `prompts.md` están actualizados;
5. tras la autorización del usuario, el PR se ha creado y la CI de GitHub Actions ha pasado (definición común de terminado, sección 6).

## 12. Propuestas para incrementos posteriores (no implementadas)

- **Hook `PreToolUse`** que bloquee `git push` a `main` y `git commit` sin autorización, si aparecen errores de este tipo.
- **Skill "registrar prompt"** para `prompts.md`, si esa tarea se repite en cada ticket.
- **Skill `prisma-migration`** con el procedimiento de la sección 8, una vez validado en DEV-002 (decisión D6).
