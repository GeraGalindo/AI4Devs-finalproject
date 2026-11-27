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
  - Dependencias como la base de datos o el reloj se inyectan (ver `createApp({ config, checkDatabase, authRepository, clock })`) para poder probarlas. Un `Clock` propio solo se admite con `NODE_ENV=test`; los servicios toman de él el "ahora" de las reglas de negocio (2.2), no de `new Date()` ni de `now()` en SQL.
- **Frontend:** organizado por *features* (`src/features/<feature>/`). El backend es la fuente de verdad de estados y fechas: la SPA no los calcula.
- **Textos e i18n** (DEV-038, parcial; `src/i18n/`):
  - ningún texto visible va escrito en un componente: todo sale de `frontend/src/locales/en/<namespace>.json` con `useTranslation(ns)` y `t()`. La regla de ESLint lo comprueba en JSX y en `aria-label`, `placeholder`, `title` y `alt`, salvo en las pruebas y en `features/diagnostics/` (D7 de DEV-001);
  - las claves están tipadas desde los JSON: una clave nueva se añade primero al catálogo. Una clave inexistente hace fallar `typecheck` o la prueba que la use;
  - los errores de la API se muestran con `translateErrorCode(i18n, error.code)`, nunca con `error.message`. Un código nuevo necesita su clave en `errors.json`;
  - los componentes reciben la instancia por `I18nProvider`; las pruebas pueden pasar una aislada con `createI18n()`;
  - no se traducen los valores del contrato (estados, códigos, campos de la API, zonas IANA), solo sus etiquetas;
  - las claves con prefijo (`t('auth:…')`) exigen declarar sus espacios de nombres en el hook: `useTranslation(['auth', 'common'])`.
- **Componentes y estilos** (DEV-039, parcial; `src/shared/ui/` y `src/shared/styles/`):
  - usa `Card`, `Button`, `TextField` e `InlineAlert` antes de crear controles propios. Reciben los textos ya traducidos por props y **no tienen textos por defecto**; un componente nuevo tampoco puede tenerlos (la regla de ESLint no los detecta);
  - los colores, espacios, radios y tamaños salen de las variables de `tokens.css`; no se escriben valores sueltos. Un token nuevo se documenta en `docs/design-system.md` y se añade a la prueba de contraste si es un color;
  - estilos en hojas `.css` importadas desde el componente, con clases prefijadas `cc-` y estados por atributos (`[aria-invalid='true']`, `[aria-busy='true']`, `:disabled`). Nada de `style=` ni `<style>` (CSP);
  - `Button` es `type="button"` por defecto; en `loading` no ejecuta `onClick` ni envía el formulario, pero la pantalla debe evitar igualmente las peticiones duplicadas;
  - los errores de campo van en `TextField` (`error`), sin `role="alert"`; el resumen del formulario, en `InlineAlert`;
  - el botón primario lleva el borde `border-control` porque su fondo no llega a 3:1 sobre `surface-raised`: no lo quites. Un color de fondo nuevo para un control necesita su comprobación en `tokens.test.ts`.
- **Llamadas a la API y sesión** (DEV-006, parcial):
  - toda llamada pasa por `apiRequest` (`src/shared/api/client.ts`), nunca por `fetch` directo. La única excepción es `checkHealth` de DEV-001;
  - `apiRequest` ya pone `X-CSRF-Protection`, `Content-Type` solo con cuerpo y `credentials: 'same-origin'`; no fijes `Origin` ni otras cabeceras de seguridad a mano. Cada respuesta con cuerpo necesita su función `parse`, que comprueba la forma sin Zod;
  - los errores llegan como `ApiError`. En pantalla se muestra `translateErrorCode(i18n, error.code)`. El cliente HTTP solo expone identificadores de campos inválidos. Los mensajes visibles se obtienen de los catálogos i18n del frontend; nunca de `details.fields[].message` ni de `error.message` del backend. Cada pantalla marca con `TextField error` los campos de `error.invalidFields`, con mensajes de su propio catálogo (por ejemplo, `auth`);
  - el usuario y el estado de la sesión salen de `useSession()` (`src/features/auth/session.ts`), nunca de `localStorage` ni de las *cookies*. Solo un `401 UNAUTHENTICATED` significa "sin sesión"; `unavailable` es un fallo que se reintenta con `restore()`. Tras un registro correcto se llama a `signedIn(user)` con el `user` de la respuesta;
  - rutas en `src/app/AppRoutes.tsx`. Hasta DEV-007, `/` redirige a `/diagnostics` y el `SessionProvider` no está montado.
- **Pantallas de acceso** (DEV-007, parcial; `src/features/auth/`):
  - las rutas con sesión van dentro de `SessionBoundary`; `/diagnostics` queda fuera y no consulta `/me`;
  - un formulario valida en local con las mismas reglas que el backend (`signUpValidation.ts`, `timeZones.ts`), pero el backend manda: los campos de `error.invalidFields` reciben mensajes del catálogo de la pantalla;
  - un envío en curso bloquea cualquier otro (`useRef` además del `loading` de `Button`). Tras un error de red o una respuesta no válida al crear algo, se consulta el estado (`GET /me`) y **nunca** se repite la petición automáticamente.
- **E2E** (DEV-007): cada escenario declara con `watchPage(page, [{ method, path, status }])` las respuestas de error que espera (por ejemplo, el `401` de `/me` sin sesión) y termina con `expectNoUnexpectedProblems()`: cualquier otra respuesta de error, error de consola, excepción o violación de la CSP hace fallar la prueba. No silencies la consola. Los E2E nunca borran datos: usan emails únicos (`uniqueEmail`), y la fila se comprueba en `calicoach_e2e` con `findUsers`. El backend admite 5 registros por hora por proceso: la suite hace 4 por ejecución y cada escenario cuenta los suyos; un escenario nuevo que registre usuarios debe caber en ese presupuesto, y el `429` se prueba con *mocks* en RTL.
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
| `npm run test:integration` | Sí: `npm run db:up` y `TEST_DATABASE_URL` en `backend/.env` o en el entorno |
| `npm run build` | No |
| `npm run test:e2e` (Chromium: *smoke* por Vite y `spa-build`, el *build* real con la CSP; requiere `npx playwright install chromium`). Usa `calicoach_e2e` (`E2E_DATABASE_URL`), que prepara y migra antes de las pruebas, y sus propios servidores en `:3001`, `:5174` y `:3100` | Sí |
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
- Medidas de 2.5 (CSRF, cookie `__Host-session`, `helmet` con CSP estricta, límites de peticiones): no las relajes ni las desactives "temporalmente", tampoco para que pase una prueba.
- **Rutas nuevas** (implementado en DEV-003, `src/shared/http/`): el CSRF ya se aplica a todo `POST`, `PUT`, `PATCH` y `DELETE` bajo `/api`. Cada ruta declara su cuerpo con `jsonBody` (operaciones con cuerpo) o `noBody` (sin cuerpo) y valida con `validate({ params, query, body })` usando esquemas `z.strictObject`. Los errores esperados se lanzan como `AppError(status, code, message, details?)` con un código de la matriz de la sección 4; nunca se construye una respuesta de error a mano fuera de `sendError`.
- La CSP no admite `'unsafe-inline'`: en el frontend, nada de estilos ni *scripts* en línea en el HTML; usa hojas de estilos.
- Las rutas de prueba solo se inyectan desde los tests (`createApp({ extraApiRoutes })`); el servidor nunca las registra.
- **Autenticación** (implementada en DEV-004, `src/modules/auth/`):
  - Toda ruta nueva, salvo las excepciones documentadas en la sección 4 (`register`, `login` y `/api/health`), lleva `requireAuth` delante de `validate`. Las rutas de prueba lo reciben en `extraApiRoutes(api, { requireAuth })`.
  - El usuario sale **solo** de `authenticatedIdentity(res).userId`, que deja `requireAuth` a partir de la cookie de sesión. Nunca del cuerpo, la ruta, la *query* ni otras cabeceras.
  - El JWT solo viaja en `Set-Cookie` (`setSessionCookie` y `clearSessionCookie` de `src/shared/http/session-cookie.ts`). Nunca en un cuerpo JSON ni en una URL.
  - Contraseñas: siempre con `createPasswordHasher()` (Argon2id). Nunca se comparan *hashes* a mano ni se registran contraseñas, *hashes*, tokens ni `JWT_SECRET`.
  - Los repositorios sustituyen los errores de Prisma por errores propios sin el mensaje original ni la causa, porque pueden llevar los argumentos de la consulta (ver `auth.repository.ts`).
  - El límite de peticiones (`createRateLimiter`) va entre el cuerpo y la validación. Sin `trust proxy` (DEV-036) usa la IP del socket y vive en memoria.
  - Las zonas horarias se validan con `timeZoneSchema` (`auth.schemas.ts`), que rechaza los desfases como `+01:00`.
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
