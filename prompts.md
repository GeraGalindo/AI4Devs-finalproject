> Detalla en esta sección los prompts principales utilizados durante la creación del proyecto, que justifiquen el uso de asistentes de código en todas las fases del ciclo de vida del desarrollo. Esperamos un máximo de 3 por sección, principalmente los de creación inicial o  los de corrección o adición de funcionalidades que consideres más relevantes.
Puedes añadir adicionalmente la conversación completa como link o archivo adjunto si así lo consideras


## Índice

1. [Descripción general del producto](#1-descripción-general-del-producto)
2. [Arquitectura del sistema](#2-arquitectura-del-sistema)
3. [Modelo de datos](#3-modelo-de-datos)
4. [Especificación de la API](#4-especificación-de-la-api)
5. [Historias de usuario](#5-historias-de-usuario)
6. [Tickets de trabajo](#6-tickets-de-trabajo)
7. [Pull requests](#7-pull-requests)
8. [Prompts de implementación de la Entrega 2](#prompts-de-implementación-de-la-entrega-2)

### Mapa de prompts registrados

Los prompts se registran por la sección del README a la que se refieren, con un máximo de tres por sección. Algunos están en una sección distinta de la que modificaron: esta tabla indica dónde encontrar cada uno. El historial no se ha movido ni reescrito.

| Prompt | Tema | Dónde está registrado | Qué modificó |
|--------|------|-----------------------|--------------|
| 01 | Descripción general del producto | Sección 1, Prompt 1 | `readme.md`, sección 1 |
| 02 | Corrección de requisitos (decisiones del Product Owner) | Sección 1, Prompt 2 | `readme.md`, sección 1 |
| 03 | Diseño de la arquitectura | Sección 2.1, Prompt 1 | `readme.md`, sección 2 |
| 04 | Concurrencia, autenticación y estados | Sección 2.1, Prompt 2 | `readme.md`, sección 2 |
| 05 | Coherencia entre las secciones 1 y 2 | Sección 2.1, Prompt 3 | `readme.md`, secciones 1 y 2 |
| 06 | Modelo de datos | Sección 3, Prompt 1 | `readme.md`, sección 3 |
| 07 | Precisión técnica del modelo de datos | Sección 3, Prompt 2 | `readme.md`, sección 3 |
| 08 | Contrato REST | Sección 4, Prompt 1 | `readme.md`, sección 4 |
| 09 | Coherencia entre la arquitectura y la API | Sección 4, Prompt 2 | `readme.md`, secciones 2 (2.2, 2.5 y 2.6) y 4 |
| 10 | Historias de usuario HU-01 a HU-03 | Sección 5, Prompt 1 | `readme.md`, sección 5 |
| 11 | Tickets T-01 a T-03 | Sección 6, Prompt 1 | `readme.md`, sección 6 |
| 12 | Backlog de historias HU-04 a HU-23 | Sección 5, Prompt 2 | `readme.md`, sección 5 |
| 13 | Backlog técnico DEV-001 a DEV-037 | Sección 6, Prompt 2 | `readme.md`, sección 6 |
| 14 | Corrección de dependencias críticas | Sección 6, Prompt 3 | `readme.md`, sección 6 |
| 15 | Sistema de diseño, i18n y reconciliación en I3 | **Sección 1, Prompt 3**, porque la sección 6 ya estaba completa | `docs/design-system.md` (nuevo) y `readme.md`, sección 6 |
| 16 | Consolidación documental antes de implementar | **Anexo**, porque es transversal | `readme.md` (secciones 0–7), `prompts.md` y `docs/design-system.md` |
| 17 | Consolidación de las decisiones DP-01 a DP-17 | **Anexo**, como referencia pendiente | `readme.md` (secciones 1–6), `prompts.md` y `docs/design-system.md` |
| 18 | Alineación documental con las entregas de AI4Devs | **Anexo**, porque es transversal | `readme.md` (secciones 1, 2, 4, 5, 6 y 7) y `prompts.md` |
| 19 | DEV-001: *scaffolding* técnico, CI y *harness* inicial | Sección 2.4, Prompt 2 | Código nuevo (`backend/`, `frontend/`, `e2e/`, CI y configuración), `CLAUDE.md` (nuevo), `readme.md` (0.3, 1.4, 2.1, 2.3, 2.4, 2.6, 4 y 6) y `prompts.md` |
| 20 | DEV-002: persistencia de `users` con Prisma 7 | Sección 3, Prompt 3 | Código nuevo (`backend/prisma/`, `prisma.config.ts`, `src/shared/prisma.ts`, pruebas de integración y de soporte), `package.json`, `package-lock.json`, CI, `CLAUDE.md`, `readme.md` (0.3, 1.4, 2, 2.3, 2.4, 2.6, 3.1, 3.2, 6 y 7) y `prompts.md` |
| 21 | DEV-003: base del backend (configuración segura, *middleware* y errores) | Sección 4, Prompt 3 | Código nuevo (`backend/src/domain/clock.ts`, `backend/src/shared/http/`, pruebas), `backend/src/app.ts`, `server.ts`, `config.ts`, `/api/health`, la vista de diagnóstico (CSS), dependencias, CI, `CLAUDE.md`, `readme.md` (0.3, 1.4, 2.3, 2.5, 2.6, 4, 6 y 7) y `prompts.md` |
| 22 | DEV-004: autenticación (registro, inicio, sesión actual y cierre) | Sección 5, Prompt 3 | Código nuevo (`backend/src/modules/auth/`, `src/shared/http/session-cookie.ts`, `rate-limit.ts` y `require-auth.ts`, pruebas unitarias y de integración), `backend/src/app.ts`, `server.ts`, `config.ts`, dependencias, `.env.example`, `CLAUDE.md`, `readme.md` (0.3, 1.2, 1.4, 2.5, 2.6, 4, 5 y 6) y `prompts.md` |
| 23 | DEV-038 (parcial): base de internacionalización del frontend | Sección 2.3, Prompt 3 | Código nuevo (`frontend/src/i18n/`, `frontend/src/locales/en/`, `frontend/src/test/missing-keys.ts` y pruebas), `frontend/src/main.tsx`, `src/test/setup.ts`, `eslint.config.js`, dependencias, `CLAUDE.md`, `readme.md` (0.3, 2.2, 2.6 y 6), `docs/design-system.md` (8.1 y 8.2) y `prompts.md` |
| 24 | DEV-039 (parcial): tokens y componentes base del sistema de diseño | **Prompts de implementación de la Entrega 2** | Código nuevo (`frontend/src/shared/styles/` y `frontend/src/shared/ui/`, con sus pruebas), `frontend/src/main.tsx`, `frontend/index.html`, `CLAUDE.md`, `readme.md` (0.3, 2.6 y 6), `docs/design-system.md` (2, 2.1, 2.2 y 3.2) y `prompts.md` |
| 25 | DEV-006 (parcial): cliente HTTP, sesión y router | **Prompts de implementación de la Entrega 2** | Código nuevo (`frontend/src/shared/api/`, `frontend/src/features/auth/` y `frontend/src/app/AppRoutes.tsx`, con sus pruebas), `frontend/src/app/App.tsx`, dependencias, `CLAUDE.md`, `readme.md` (0.3, 1.2, 1.4, 2.2, 2.6 y 6) y `prompts.md` |
| 26 | DEV-007 (parcial): registro de extremo a extremo y E2E en cada PR | **Prompts de implementación de la Entrega 2** | Código nuevo (`frontend/src/features/auth/`, `e2e/support/`, `e2e/scripts/` y `e2e/tests/spa-build.signup.spec.ts`, con sus pruebas), rutas, catálogo `auth`, E2E existentes, Playwright, CI, dependencias de `e2e`, `CLAUDE.md`, `readme.md` (0.3, 1.4, 2.4, 2.6 y 6), `docs/design-system.md` (5 y 9) y `prompts.md` |

**Notas:**
- **Numeración:** los prompts 01–05 y 11–15 llevan el número que les dio el autor. Los números 06–10 los asignó la IA al documentarlos, siguiendo la secuencia.
- **Prompts de documentación:** los prompts que solo pedían documentar otros prompts en este archivo ("Documenta en prompts.md…") no se registran como prompts propios.
- **Prompts 16, 17 y 18:** son transversales y se registran en el **Anexo** del final de este archivo. El 17 queda como referencia pendiente hasta conocer su resultado.
- **Prompt 19:** es el primero de implementación. Se registra en 2.4 (Infraestructura y despliegue), cuyo hueco estaba libre, e incluye el prompt de la Fase A y la aprobación de la Fase B, que forman un único encargo.
- **Prompt 20:** DEV-002 se registra en la sección 3 (Modelo de datos), cuyo hueco del Prompt 3 estaba libre. Incluye el prompt de la Fase A y las dos aprobaciones (antes de B1 y antes de B2), que forman un único encargo.
- **Prompt 21:** DEV-003 se registra en la sección 4 (Especificación de la API), cuyo hueco del Prompt 3 estaba libre, porque implementa las convenciones comunes del contrato. Incluye el prompt de análisis (que también verificó el merge del PR #6) y la aprobación de la implementación.
- **Prompt 22:** DEV-004 se registra en la sección 5 (Historias de usuario), cuyo hueco del Prompt 3 estaba libre, porque implementa HU-04 y HU-05 en el backend. Incluye el prompt de análisis (que también verificó el merge del PR #8), el de entrega del análisis y el de implementación.
- **Prompt 23:** DEV-038 (parcial) se registra en 2.3 (estructura del proyecto), cuyo hueco del Prompt 3 estaba libre, porque crea la estructura de internacionalización del frontend (decisión D9). Incluye el prompt que fusionó el PR #10 y analizó el incremento de la Entrega 2, el análisis de DEV-038 y la implementación. Tras este, solo queda libre el hueco 2.4, Prompt 3.
- **Prompt 24:** DEV-039 (parcial) inaugura la sección «Prompts de implementación de la Entrega 2», antes del Anexo, por decisión del autor (L9): los huecos de tres prompts por sección ya estaban ocupados salvo 2.4, Prompt 3, que no corresponde a este ticket. Incluye el análisis y la implementación.
- **Prompt 25:** DEV-006 (parcial) se registra después del Prompt 24, en la misma sección (decisión M8). Incluye el análisis y la implementación.
- **Prompt 26:** DEV-007 (parcial) se registra después del Prompt 25, en la misma sección (decisión T10). Incluye el análisis y la implementación.

---

## 1. Descripción general del producto

**Prompt 1:**

*Prompt 01 — Descripción general del producto*

- **Herramienta:** Claude Code (modelo `claude-opus-5-5`).
- **Objetivo:** documentar la sección 1 de `readme.md` para Cali Coach.
- **Archivo afectado:** `readme.md`.

Texto literal del prompt:

```text
Actúa como analista de producto senior especializado en aplicaciones deportivas.

Estamos desarrollando Cali Coach como proyecto final del Máster AI4Devs.

Contexto:
- Aplicación web mobile-first para practicantes intermedios de calistenia.
- React + TypeScript + Vite, Node.js + Express y PostgreSQL.
- Compatible con navegadores de iOS, Android y escritorio.
- Futuro soporte PWA y empaquetado con Capacitor.
- Modelo híbrido: programas preconfigurados en el MVP y recomendaciones mediante IA en una fase posterior.
- El usuario elige entre 2 y 6 días fijos de entrenamiento por semana.
- Distribuciones: 2 días Push/Pull; 3 Push/Pull/Push-Pull; 4 Push x2/Pull x2; 5 Push x2/Pull x2/Legs & Core; 6 Push x2/Pull x2/Legs & Core x2.
- Cada programa define su duración en semanas.
- El programa comienza en el próximo día disponible y las sesiones se asignan cronológicamente.
- Una sesión no completada al finalizar su día se marca como omitida y no se recupera automáticamente.

Problemas que buscamos resolver:
1. Dificultad para progresar hacia habilidades de calistenia.
2. Falta de programación integrada.
3. Programas poco adaptados al nivel y disponibilidad.
4. Estancamientos.
5. Falta de reconocimiento del progreso.

Tarea:
1. Inspecciona primero la estructura y documentación existente del repositorio.
2. Identifica los documentos y convenciones que exige la plantilla oficial.
3. Redacta o mejora únicamente la sección de descripción general del producto en el documento correspondiente.
4. Incluye problema, público objetivo, propuesta de valor, funcionalidades MVP, exclusiones, flujo principal y criterios de éxito.
5. Mantén el alcance viable para un proyecto académico de unas 30 horas.
6. No inventes funcionalidades confirmadas ni resultados de pruebas.
7. No modifiques prompts.md todavía.
8. No implementes código ni crees commits.

Antes de editar, indica qué archivo modificarás y por qué. Después, muestra un resumen de los cambios, supuestos y dudas pendientes.
```

**Resultado generado por la IA:**
- La IA inspeccionó el repositorio (solo `readme.md` y `prompts.md`, con la plantilla sin rellenar) y escribió las subsecciones 1.1–1.4 de `readme.md`.
- Contenido: descripción del producto, problemas P1–P5, público objetivo, propuesta de valor, funcionalidades F1–F10 priorizadas, reglas de planificación, exclusiones del MVP, criterios CE1–CE6, flujo principal con diagrama Mermaid, y 1.4 marcada como pendiente.
- La IA marcó sus propios supuestos *(supuesto)* y dejó una lista de dudas abiertas.
- Resultado: 126 líneas añadidas a `readme.md` (`git diff --stat`). No se ejecutaron pruebas.

**Revisión y decisiones humanas:**
- Al revisar el resultado, el equipo vio que había que ajustar F9 (registro de ejecución), CE5 (ancho mínimo) y las variantes de entrenamiento A/B. Esos ajustes se aplicaron en el Prompt 2.

**Prompt 2:**

*Prompt 02 — Corrección de requisitos*

- **Herramienta:** Claude Code (modelo `claude-opus-5-5`), en la misma sesión que el Prompt 1.
- **Objetivo:** aplicar las decisiones del Product Owner a la sección 1 de `readme.md`.
- **Archivo afectado:** `readme.md`.

Texto literal del prompt:

```text
Actúa como analista de producto y arquitecto de software senior.

Estamos desarrollando **Cali Coach**, proyecto final del Máster AI4Devs.

Ya ejecutamos un primer prompt que documentó la sección 1 de `readme.md`. Ahora necesitamos revisar y corregir ese resultado utilizando las decisiones confirmadas por el Product Owner.

### Objetivo

Actualizar únicamente la sección 1 de `readme.md`, manteniendo la estructura oficial del repositorio y evitando cambios innecesarios.

### Decisiones confirmadas

**1. Variantes de entrenamiento A/B**

Cuando un tipo de entrenamiento aparece dos veces por semana, sus sesiones deben ser diferentes.

Distribución:

| Días por semana | Secuencia de sesiones |
|---|---|
| 2 | Push A, Pull A |
| 3 | Push A, Pull A, Push-Pull A |
| 4 | Push A, Pull A, Push B, Pull B |
| 5 | Push A, Pull A, Legs & Core A, Push B, Pull B |
| 6 | Push A, Pull A, Legs & Core A, Push B, Pull B, Legs & Core B |

Las variantes A/B pueden tener ejercicios, volumen, intensidad y objetivos distintos. Su contenido específico se definirá posteriormente.

**2. Registro de ejecución**

La funcionalidad F9, registro de series y repeticiones realizadas, pasa de "Deseable" a **"Imprescindible"**.

El registro permitirá consultar el desempeño del atleta, además de su adherencia al programa.

**3. Compatibilidad responsive**

Actualizar CE5 para establecer un ancho mínimo objetivo de **320 px**, manteniendo compatibilidad con navegadores móviles y de escritorio.

**4. Zona horaria**

La evaluación de las sesiones omitidas utilizará la zona horaria del usuario.

Una sesión no completada al terminar su fecha programada se marca automáticamente como `skipped`. No se reprograma y no altera las sesiones posteriores.

**5. Gamificación**

F10, hitos de reconocimiento, permanece como funcionalidad deseable.

**6. Duración e inicio**

Cada programa define su duración en semanas.

El atleta elige entre 2 y 6 días fijos por semana.

El programa comienza en el próximo día disponible, sin esperar necesariamente al lunes.

Cada bloque de N sesiones constituye una semana del programa, donde N es el número de sesiones semanales.

### Decisiones pendientes

No inventes respuestas definitivas para estos puntos:

- Si una activación realizada en un día seleccionado puede iniciar el programa ese mismo día.
- Cantidad exacta de programas preconfigurados que tendrá el MVP.
- Criterios precisos para clasificar a un atleta como intermedio.
- Posibilidad de modificar la disponibilidad durante un programa activo.

Conserva estos asuntos como pendientes cuando corresponda.

### Instrucciones de ejecución

1. Inspecciona el estado actual de `readme.md` y las convenciones del repositorio.
2. Identifica los apartados de la sección 1 afectados por estas decisiones.
3. Modifica exclusivamente esos apartados, conservando el resto del contenido.
4. Mantén consistencia entre tablas, reglas de negocio, criterios de éxito y flujo principal.
5. No modifiques otras secciones de `readme.md`.
6. No modifiques `prompts.md`.
7. No implementes código ni crees commits.
8. No afirmes que se han ejecutado pruebas si no se han ejecutado.

### Entregable

Al finalizar, proporciona:

- Resumen de los cambios realizados.
- Lista de subsecciones modificadas.
- Confirmación de que F9 es imprescindible.
- Confirmación de la secuencia A/B para las cinco disponibilidades.
- Supuestos o inconsistencias que permanezcan pendientes.
- Resultado de `git diff --check` y `git diff --stat`.

No realices modificaciones adicionales fuera de este alcance.
```

**Decisiones humanas (Product Owner)**, que se aportaron en el prompt:
- Variantes A/B distintas para los tipos de sesión que se repiten en la semana.
- F9 pasa a imprescindible; F10 sigue como deseable.
- CE5 con un ancho mínimo de 320 px.
- Las omisiones (`skipped`) se evalúan en la zona horaria del usuario, sin reprogramar.
- El programa empieza el próximo día disponible y cada bloque de N sesiones forma una semana del programa.
- Cuatro puntos quedan expresamente pendientes: inicio el mismo día de la activación, número de programas, criterio de "intermedio" y cambio de disponibilidad con un programa activo.

**Resultado generado por la IA:**
- La IA aplicó estas decisiones en 1.1 (problema, público objetivo, propuesta de valor, criterios de éxito), 1.2 (F3, F5–F9, reglas de planificación RP1–RP6, la nueva lista de decisiones pendientes, exclusiones) y 1.3 (flujo principal y diagrama), y unificó el estado de omisión como `skipped`.
- La IA señaló otra cuestión abierta: si se pueden registrar series y repeticiones sin completar la sesión.
- Validación: `git diff --check` sin errores; `git diff --stat` con 134 inserciones acumuladas en `readme.md` (sumando los Prompts 1 y 2, sin commit intermedio).
- **No se ejecutaron pruebas funcionales.**

**Prompt 3:**

*Prompt 15 — Sistema de diseño, internacionalización y reconciliación en I3*

> **Por qué está aquí.** Este prompt modificó la sección 6 de `readme.md` y creó `docs/design-system.md`. Los tres huecos de la sección 6 de este archivo los ocupan los prompts 11, 13 y 14. Por decisión del equipo, se documenta en este hueco libre de la sección 1, porque su contenido principal es el diseño y la experiencia de usuario (1.3). **No modificó la sección 1 de `readme.md`.**

- **Herramienta:** Claude Code (modelo `claude-opus-5-5`), en la misma sesión que los prompts anteriores.
- **Objetivo:** incorporar decisiones nuevas del Product Owner sobre el diseño visual y el idioma, y adelantar a I3 la reconciliación en los `GET`.
- **Archivos afectados:** `docs/design-system.md` (nuevo) y `readme.md` (backlog técnico de la sección 6).

Texto literal del prompt:

```text
# Prompt 15 — Cali Coach: diseño visual, i18n y cierre de dependencias

Actúa como Tech Lead y diseñador UX/UI senior de Cali Coach.

El proyecto tiene un backlog de 37 tickets técnicos y seis incrementos de implementación. Antes de comenzar a programar, necesitamos incorporar decisiones recientes del Product Owner y resolver una dependencia funcional pendiente.

## 1. Decisiones confirmadas

### Diseño visual

Utilizaremos como referencia el mockup existente de Cali Coach, que muestra una pantalla móvil oscura de entrenamiento.

La identidad visual inicial será:
- Estética Performance / Athletic.
- Fondo oscuro azul-negro.
- Acentos violetas.
- Tarjetas con bordes discretos.
- Tipografía legible y jerarquía visual clara.
- Prioridad a la usabilidad durante el entrenamiento.
- Diseño mobile-first desde 320 px.

La navegación principal propuesta para el MVP es:
- Today.
- Program.
- Progress.
- Profile.

El diseño debe incluir estados de carga, vacío, error, éxito y acciones deshabilitadas.

### Idioma

El MVP tendrá exclusivamente interfaz en inglés (`en`).

Prepararemos el frontend para incorporar otros idiomas posteriormente.

Utiliza como propuesta:
- `react-i18next` e `i18next`.
- Catálogos de traducción organizados por funcionalidades.
- Claves de traducción en los componentes, evitando textos visibles hardcodeados.
- `Intl` para formatos regionales.
- Separación entre idioma, configuración regional y zona horaria IANA.

No implementes selector de idioma en el MVP.

No traduzcas ni alteres los códigos internos de estado, identificadores de API ni valores persistidos que funcionen como contratos técnicos.

El contenido de programas y ejercicios se mostrará en inglés. Documenta como decisión futura la estrategia para traducir contenido almacenado en la base de datos, sin modificar el esquema actual.

### Fuera del MVP

No implementar:
- Suscripciones.
- Planes Free/Pro.
- Pagos.
- Análisis de técnica mediante IA.
- Revisiones de vídeo.
- Funcionalidades avanzadas de Skills y Library.

Estos elementos pueden mantenerse en un apartado de visión futura, pero no deben aparecer como funciones activas del MVP.

## 2. Diseño documental

Crea `docs/design-system.md` con:

1. Principios UX.
2. Identidad visual y tokens propuestos.
3. Tipografía, colores, espaciados y componentes.
4. Navegación mobile-first.
5. Inventario de pantallas del MVP.
6. Estados de interfaz.
7. Accesibilidad.
8. Internacionalización.
9. Diferencias entre MVP y visión futura.
10. Relación con historias HU y tickets DEV.

Si el mockup original no está disponible en el repositorio, no afirmes haberlo inspeccionado. Utiliza las decisiones visuales descritas en este prompt y deja la comparación exacta con el mockup pendiente.

No generes pantallas ni código React todavía.

## 3. Backlog técnico

Añade dos tickets a la sección 6 del README:

**DEV-038 — Infraestructura de internacionalización**
- Incremento I1.
- Configuración de i18next.
- Catálogo inicial en inglés.
- Integración con React.
- Formatos de fechas y números.
- Pruebas de traducciones y claves faltantes.

**DEV-039 — Sistema de diseño y componentes base**
- Incremento I1.
- Tokens visuales.
- Componentes reutilizables.
- Navegación responsive.
- Accesibilidad.
- Estados visuales.
- Preparación para las pantallas de autenticación y perfil.

Haz que DEV-006, DEV-007 y DEV-008 dependan de las partes necesarias de DEV-038 y DEV-039.

No modifiques ni renumeres los tickets existentes salvo referencias y dependencias estrictamente necesarias.

## 4. Reconciliación en I3

Revisa DEV-027 y DEV-028.

Una vez disponible T-cierre, las consultas de inscripciones y sesiones deben reconciliar los estados vencidos antes de devolver información que dependa de ellos, conforme al contrato de la sección 4.

Adelanta a I3 la integración mínima de reconciliación en los GET disponibles.

Conserva en I5 las pruebas adicionales, automatización y optimización que no bloqueen I3.

Actualiza únicamente las dependencias y referencias necesarias.

## 5. Restricciones

- No implementar código.
- No instalar dependencias.
- No crear migraciones.
- No ejecutar pruebas de aplicación.
- No crear commits.
- No modificar `prompts.md`.
- Conservar las historias HU-01 a HU-23.
- Conservar T-01 a T-03.
- No ampliar el alcance funcional del MVP.
- No introducir suscripciones ni funciones de IA.

## 6. Validación y entregable

Presenta:
1. Resumen de `docs/design-system.md`.
2. DEV-038 y DEV-039 con dependencias.
3. Cambios mínimos en DEV-027 y DEV-028.
4. Confirmación de que el MVP es English-first.
5. Funcionalidades explícitamente excluidas.
6. Archivos modificados.
7. Resultado de `git diff --check`, distinguiendo cualquier problema preexistente de whitespace.
8. Resultado de `git diff --stat`.

Detente al completar la documentación. No comiences todavía la implementación.
```

**Decisiones humanas** (del Product Owner, aportadas en el prompt):
- **Identidad visual:** estética *Performance / Athletic*, fondo azul-negro, acentos violetas, tarjetas con bordes discretos y diseño mobile-first desde 320 px.
- **Navegación:** Today · Program · Progress · Profile.
- **Idioma:**
  - interfaz **solo en inglés**, preparada para otros idiomas;
  - sin selector de idioma;
  - el contenido del catálogo, en inglés;
  - los contratos técnicos no se traducen.
- **Exclusiones del MVP:** suscripciones, planes Free/Pro, pagos, análisis de técnica con IA, revisiones de vídeo y las funciones avanzadas de Skills y Library.
- **Backlog:** los tickets DEV-038 y DEV-039 y sus dependencias.
- **Reconciliación:** adelantarla a los `GET` de I3.

**Resultado generado por la IA:**
- **El mockup no estaba en el repositorio.** La IA lo comprobó, no afirmó haberlo inspeccionado y dejó la comparación como [Pendiente].
- **`docs/design-system.md`** (311 líneas, los 10 apartados pedidos):
  - **tokens propuestos por la IA**, con valores de color concretos;
  - un **cálculo** del contraste WCAG de esos valores, hecho en la sesión. No es una auditoría de pantallas. El borde discreto de las tarjetas da 1,5:1 y quedó marcado como decorativo, con un token aparte para los bordes de los controles;
  - escala tipográfica, 20 componentes base, 17 pantallas (S-01 a S-17) y 7 estados de interfaz;
  - accesibilidad con objetivo WCAG 2.1 AA;
  - separación entre idioma, configuración regional y zona horaria, y formato de fechas sin conversión de zona horaria;
  - tres opciones futuras para traducir el contenido almacenado, sin cambiar el esquema.
- **Sección 6:**
  - DEV-038 y DEV-039 en I1, sin renumerar;
  - DEV-006, DEV-007 y DEV-008 pasan a depender de ellos. La IA ajustó también el alcance de DEV-006 para que no duplique los componentes de DEV-039;
  - DEV-017 reconcilia en los `GET` desde I3 y depende de DEV-027;
  - DEV-028 pasa a "Validación ampliada", en I5;
  - se actualizaron las referencias de DEV-027, DEV-030 y DEV-032, las tablas y el orden de trabajo.
- **Inconsistencias que detectó la IA**, documentadas sin corregirlas en su sección:
  - la sección 1.2 y T-02 excluyen la "internacionalización";
  - T-02 cita la navegación "Hoy, Calendario, Progreso, Perfil";
  - los mensajes `message` de la sección 4 están en español;
  - los nombres de pantallas y botones de la sección 5 están en español.
- **Validación:**
  - las secciones 0–5 y 7, la plantilla y T-01 a T-03 son idénticas a la copia guardada antes de este paso;
  - hay 39 tickets DEV, sin duplicados, y el script revisó 59 tablas sin errores;
  - `git diff --check` sale con exit 2 por un único aviso, que ya existía: la línea de cita de la plantilla de la sección 6 termina con un espacio en HEAD, y `--check` la marca por cómo alinea el diff;
  - `docs/design-system.md` todavía no tiene seguimiento en git. Se comprobó con `git diff --no-index --check`: sin avisos ni espacios al final de línea;
  - `git diff --stat`: 4239 inserciones en `readme.md` con el algoritmo por defecto, y 5398 inserciones y 11 borradas en total con `--patience`. En este paso, 113 líneas añadidas y 41 borradas en `readme.md`;
  - no se generó código y no se ejecutaron pruebas.

---

## 2. Arquitectura del Sistema

> Los tres prompts de esta sección afectaron a varias subsecciones a la vez (2.1–2.6). Su texto literal está una sola vez, en 2.1. Las subsecciones 2.2–2.6 remiten a él y resumen qué cambió en cada una.

### **2.1. Diagrama de arquitectura:**

**Prompt 1:**

*Prompt 03 — Diseño de la arquitectura del MVP*

- **Herramienta:** Claude Code (modelo `claude-opus-5-5`), en la misma sesión que los prompts de la sección 1.
- **Objetivo:** diseñar la arquitectura técnica del MVP en la sección 2 de `readme.md`.
- **Archivo afectado:** `readme.md` (sección 2, subsecciones 2.1–2.6).

Texto literal del prompt:

```text
Actúa como arquitecto de software senior especializado en aplicaciones web con React, Node.js y PostgreSQL.

Estamos desarrollando **Cali Coach**, proyecto final del Máster AI4Devs.

Ya documentamos la sección 1 de `readme.md`. Ahora necesitamos diseñar la arquitectura técnica del MVP, manteniendo la estructura de la plantilla oficial.

## Contexto

Cali Coach es una aplicación web mobile-first para atletas intermedios de calistenia.

Stack previsto:
- Frontend: React + TypeScript + Vite.
- Backend: Node.js + Express + TypeScript.
- Base de datos: PostgreSQL.
- Comunicación: API REST con JSON.
- Pruebas previstas: Vitest, Supertest, React Testing Library y Playwright.

El MVP incluye autenticación, perfil deportivo, programas preconfigurados, calendario, registro de series y repeticiones, historial y progreso.

## Reglas de entrenamiento confirmadas

1. El atleta selecciona entre 2 y 6 días fijos por semana.
2. Cada programa define su duración en semanas.
3. El programa comienza en el próximo día disponible, sin esperar necesariamente al lunes.
4. Las sesiones se asignan cronológicamente a los días elegidos.
5. Cada bloque de N sesiones constituye una semana del programa, donde N es el número de sesiones semanales.
6. Las sesiones omitidas no se recuperan ni desplazan el calendario.
7. La zona horaria del usuario determina el cierre del día.
8. Solo puede haber un programa activo por usuario, como supuesto de diseño pendiente de ratificación.

Secuencias semanales:

- 2 días: Push A, Pull A.
- 3 días: Push A, Pull A, Push-Pull A.
- 4 días: Push A, Pull A, Push B, Pull B.
- 5 días: Push A, Pull A, Legs & Core A, Push B, Pull B.
- 6 días: Push A, Pull A, Legs & Core A, Push B, Pull B, Legs & Core B.

Las variantes A y B son entrenamientos diferentes.

## Nueva decisión: sesiones parcialmente realizadas

Las sesiones tienen cuatro estados:

- `planned`: sesión programada.
- `completed`: sesión finalizada por el atleta.
- `partial`: hubo actividad registrada, pero la sesión no se completó.
- `skipped`: terminó el día sin actividad registrada.

Reglas propuestas para validar arquitectónicamente:

- El atleta puede registrar series y repeticiones sin finalizar la sesión.
- Al terminar el día, una sesión `planned` con actividad pasa a `partial`.
- Al terminar el día, una sesión `planned` sin actividad pasa a `skipped`.
- Una sesión `completed` no cambia automáticamente de estado.
- Los registros de una sesión `partial` se conservan.
- Las sesiones posteriores no se reprograman.
- Las operaciones de cierre deben ser idempotentes.
- Las sesiones `partial` se muestran separadamente de las completadas en las métricas.

## Tarea

1. Inspecciona `readme.md`, `prompts.md` y la estructura existente del repositorio.
2. Identifica las subsecciones de arquitectura exigidas por la plantilla oficial.
3. Diseña una arquitectura monolítica modular, adecuada para un MVP académico de unas 30 horas.
4. Define las responsabilidades de frontend, controladores, servicios, repositorios y PostgreSQL.
5. Describe el flujo de activación de un programa y generación del calendario.
6. Describe el flujo de registro de series, finalización y cierre automático de sesiones.
7. Propón cómo implementar el cierre automático de forma sencilla y verificable, distinguiendo reconciliación bajo demanda y tareas programadas.
8. Incluye un diagrama Mermaid de componentes y otro de secuencia para el cierre de sesiones.
9. Identifica riesgos técnicos, decisiones pendientes y medidas básicas de seguridad.
10. Explica cómo probar los componentes críticos.

## Restricciones

- Modifica únicamente la sección 2 de `readme.md`.
- No modifiques la sección 1, aunque detectes inconsistencias: repórtalas.
- No modifiques `prompts.md`.
- No implementes código.
- No crees commits.
- No añadas microservicios, colas ni infraestructura innecesaria.
- No inventes resultados de pruebas ni decisiones de producto.
- Distingue decisiones confirmadas de propuestas técnicas.
- Conserva los encabezados de la plantilla oficial.

## Entregable

Antes de editar, indica qué subsecciones modificarás.

Después de editar, entrega:
- Resumen de arquitectura.
- Responsabilidades por componente.
- Flujos principales.
- Riesgos y supuestos pendientes.
- Resultado de `git diff --check`.
- Resultado de `git diff --stat`.

No continúes con otras secciones del proyecto.
```

**Decisiones humanas** aportadas en el prompt:
- Stack, API REST y herramientas de prueba.
- Arquitectura monolítica modular.
- Reglas de entrenamiento y secuencias A/B.
- **Nueva decisión de producto:** los cuatro estados de sesión (`planned`, `completed`, `partial`, `skipped`), con sus reglas de cierre como propuesta que había que validar técnicamente.
- Un solo programa activo como supuesto pendiente de ratificar.

**Resultado generado por la IA:**
- Escribió 2.1–2.6:
  - tabla de decisiones etiquetadas como [Confirmada], [Propuesta] o [Pendiente];
  - diagrama de componentes;
  - responsabilidades por capa y módulo;
  - ciclo de vida de una sesión;
  - flujos de activación y de registro, finalización y cierre;
  - reconciliación bajo demanda como mecanismo principal, con una tarea programada opcional;
  - diagrama de secuencia del cierre;
  - estructura de ficheros, despliegue, seguridad y estrategia de pruebas.
- Propuso por su cuenta varias opciones técnicas que **no** son decisiones del equipo: Prisma, TanStack Query, JWT en cookie y un único servicio en una plataforma PaaS.
- Informó de las inconsistencias con la sección 1 sin modificarla.
- **Defecto que luego corrigió la revisión humana:** el cierre se resolvía con una única sentencia `UPDATE … EXISTS` presentada como "atómica e idempotente", y no tenía en cuenta la carrera con el registro de series.
- **Validación:** la primera ejecución de `git diff --check` encontró espacios al final de 3 líneas; se corrigieron y la segunda salió sin errores. `git diff --stat`: 454 inserciones acumuladas en `readme.md`. No se ejecutaron pruebas.

**Prompt 2:**

*Prompt 04 — Corrección de concurrencia, autenticación y estados*

- **Herramienta:** Claude Code (modelo `claude-opus-5-5`), en la misma sesión.
- **Objetivo:** corregir tres aspectos de la arquitectura detectados al revisarla.
- **Archivo afectado:** `readme.md` (sección 2).

Texto literal del prompt:

```text
Actúa como arquitecto de software senior y revisor de seguridad.

Estamos desarrollando Cali Coach, proyecto final del Máster AI4Devs.

La sección 2 de `readme.md` ya contiene una propuesta de arquitectura. Necesitamos corregir tres aspectos sin ampliar el alcance del MVP.

### 1. Concurrencia en el cierre de sesiones

Revisa el diseño de registro de series, finalización y reconciliación automática.

Asegura que:
- Las operaciones que registran series y las que cierran sesiones utilizan una estrategia de bloqueo compatible.
- No se puede registrar una serie en una sesión ya cerrada.
- Una sesión con actividad registrada no puede cerrarse erróneamente como `skipped`.
- La clasificación `partial` / `skipped` se realiza con información consistente.
- La reconciliación sigue siendo idempotente.
- Se documentan las transacciones y el orden de adquisición de bloqueos.

No afirmes que un simple `UPDATE` con `EXISTS` resuelve por sí solo todas las condiciones de carrera.

Incluye una prueba de concurrencia propuesta que pueda implementarse posteriormente con PostgreSQL real.

### 2. Seguridad de autenticación

La arquitectura propone JWT en cookies `httpOnly`, `Secure` y `SameSite=Lax`.

Complementa esta decisión con:
- Protección CSRF para operaciones que modifican datos.
- Validación del encabezado `Origin` y tratamiento de solicitudes sin `Origin`.
- Política de expiración de sesión.
- Restricciones de autorización por usuario.
- Consideraciones para despliegue bajo un mismo origen.

No implementes autenticación todavía.

### 3. Consistencia de estados

Mantén los cuatro estados confirmados:
- `planned`
- `completed`
- `partial`
- `skipped`

Documenta explícitamente que:
- Registrar series no completa automáticamente una sesión.
- `partial` conserva los registros realizados.
- `partial` y `skipped` son resultados distintos del cierre.
- `completed`, `partial` y `skipped` son estados finales en el MVP.
- Las sesiones posteriores conservan su fecha.

Identifica las inconsistencias con la sección 1, pero no la modifiques todavía.

### Restricciones

1. Inspecciona el contenido actual antes de editar.
2. Modifica únicamente la sección 2 de `readme.md`.
3. Conserva los encabezados de la plantilla oficial.
4. No modifiques `prompts.md`.
5. No implementes código.
6. No crees commits.
7. Mantén el diseño simple y adecuado para un MVP académico.
8. Distingue decisiones confirmadas de propuestas técnicas.

### Entregable

Muestra:
- Resumen de cambios.
- Estrategia transaccional elegida y sus garantías.
- Estrategia de protección CSRF.
- Pruebas propuestas para concurrencia.
- Inconsistencias documentales pendientes.
- Resultado de `git diff --check` y `git diff --stat`.
```

**Revisión y decisiones humanas:**
- Al revisar el Prompt 03, el equipo vio que el cierre con un único `UPDATE … EXISTS` no resolvía la carrera con el registro de series, y que la autenticación por cookie no tenía protección CSRF.
- Confirmó como finales los estados `completed`, `partial` y `skipped`, y que registrar series no completa la sesión.

**Resultado generado por la IA:**
- **Concurrencia:**
  - Explicó por qué falla la sentencia única: en `READ COMMITTED`, la subconsulta `EXISTS` usa la foto de datos tomada al empezar la sentencia, y la clave foránea por sí sola no impide el problema.
  - Sustituyó la sentencia única por un protocolo con transacciones T-registro, T-finalizar y T-cierre, basado en el bloqueo de la fila de la sesión (`FOR UPDATE`). El cierre se hace en dos sentencias: primero bloquea y después clasifica con una foto nueva.
  - Añadió una tabla de garantías.
- **Seguridad:** comprobación de `Origin` (con alternativas cuando falta), cabecera `X-CSRF-Protection`, exigencia de `application/json`, cookie `__Host-`, caducidad de 7 días como propuesta, revocación con `token_version`, autorización por usuario y despliegue bajo un mismo origen.
- **Pruebas:** escenarios de concurrencia C1–C6 sobre PostgreSQL real y tests de seguridad.
- Documentó en 2.1 las inconsistencias con la sección 1, sin modificarla.
- **Lo que se corrigió después (Prompt 05):** la IA afirmó que el orden de bloqueos impedía cualquier *deadlock*, y C4 no precisaba cuándo se tomaba el reloj.
- **Validación:** la primera ejecución de `git diff --check` encontró espacios al final de 1 línea; se corrigió y la segunda salió sin errores. `git diff --stat`: 578 inserciones acumuladas en `readme.md`. No se ejecutaron pruebas.

**Prompt 3:**

*Prompt 05 — Revisión de coherencia entre las secciones 1 y 2*

- **Herramienta:** Claude Code (modelo `claude-opus-5-5`), en la misma sesión.
- **Objetivo:** corregir las inconsistencias entre la descripción del producto y la arquitectura antes de empezar el modelo de datos.
- **Archivo afectado:** `readme.md` (secciones 1 y 2). Es el único prompt de esta sección que modificó también la sección 1.

Texto literal del prompt:

```text
Actúa como arquitecto de software senior y analista funcional del proyecto Cali Coach.

Antes de comenzar el modelo de datos, necesitamos una revisión final de coherencia entre las secciones 1 y 2 del archivo `readme.md`.

Lee ambas secciones completas antes de modificar nada.

### Objetivo

Corregir las inconsistencias documentales existentes y dejar la descripción del producto alineada con la arquitectura.

### 1. Estados de las sesiones

Mantén exactamente estos cuatro estados:

- `planned`: sesión programada y abierta.
- `completed`: sesión finalizada explícitamente por el atleta.
- `partial`: sesión que terminó su día programado con al menos una serie registrada, pero sin finalización explícita.
- `skipped`: sesión que terminó su día programado sin series registradas.

Los estados `completed`, `partial` y `skipped` son finales en el MVP.

Registrar series no cambia automáticamente el estado a `completed`. Las sesiones posteriores conservan su fecha.

Actualiza en la sección 1:

- CE3 y CE4.
- F5, F6, F7 y F8.
- RP5 y RP6.
- Flujo principal, especialmente pasos 5 y 6.
- Diagrama Mermaid del flujo principal.

Mantén F9 como imprescindible y F10 como deseable.

### 2. Consistencia de decisiones

Revisa las etiquetas `[Confirmada]`, `[Propuesta]` y `[Pendiente]`.

No marques como confirmadas decisiones que todavía se describen como supuestos.

Mantén como pendientes, salvo evidencia explícita en el documento:

- Inicio del programa el mismo día de activación.
- Número exacto de programas.
- Modificación de disponibilidad con programa activo.
- Duración de la sesión de autenticación.

No inventes decisiones del Product Owner.

### 3. Concurrencia

Revisa las afirmaciones de la sección 2.2 sobre ausencia de deadlocks.

Mantén el protocolo de bloqueo de sesiones y las transacciones bajo `READ COMMITTED`, pero evita garantizar que nunca habrá deadlocks.

Documenta que deben verificarse el orden efectivo de adquisición de bloqueos, los posibles conflictos con actualizaciones de inscripciones y el tratamiento de errores de bloqueo.

Revisa el escenario C4 de la sección 2.6 para que especifique cuándo se toma el reloj, cuándo se adquiere el bloqueo y cuándo se evalúan las condiciones de fecha y estado.

### 4. Validación documental

Verifica:

- Tablas Markdown.
- Bloques Mermaid.
- Referencias cruzadas entre secciones.
- Terminología de los cuatro estados.
- Consistencia de criterios de éxito, funcionalidades y reglas de planificación.

### Restricciones

1. Modifica únicamente las secciones 1 y 2 de `readme.md`.
2. No modifiques `prompts.md`.
3. No modifiques las secciones 0 ni 3–7.
4. No generes código de aplicación.
5. No ejecutes migraciones.
6. No crees commits.
7. Conserva los encabezados de la plantilla oficial.
8. No amplíes el alcance del MVP.

### Entregable

Presenta:

1. Resumen de los cambios realizados.
2. Inconsistencias corregidas.
3. Decisiones que siguen pendientes.
4. Resultado de `git diff --check`.
5. Resultado de `git diff --stat`.
6. Confirmación de los archivos modificados.

No declares pruebas funcionales ejecutadas: esta tarea es exclusivamente documental.
```

**Revisión y decisiones humanas:**
- El equipo fijó la definición exacta de los cuatro estados y su carácter final.
- Pidió no garantizar la ausencia de *deadlocks* y precisar el escenario C4.
- Exigió mantener como pendientes cuatro decisiones: inicio el mismo día de la activación, número de programas, cambio de disponibilidad con un programa activo y duración de la sesión de autenticación.

**Resultado generado por la IA:**
- **Sección 1:** reescribió CE3, CE4, F5–F9, RP5 y RP6, los pasos 5 y 6 del flujo y su diagrama. Añadió la tabla "Estados de una sesión" y amplió las decisiones pendientes. Detectó y corrigió una contradicción adicional: la fórmula de adherencia de los indicadores de producto.
- **Etiquetas:** "un programa activo" pasó de [Confirmada] a [Pendiente]. El inicio el mismo día de la activación y la duración de la sesión de autenticación quedaron como [Pendiente].
- **Concurrencia:**
  - Retiró la garantía de que no habría *deadlocks*.
  - Documentó cómo verificar el orden efectivo de bloqueos (`EXPLAIN`, `LockRows` sobre `Sort`).
  - Documentó el tratamiento de los errores `40P01` y `55P03`: reintento acotado o `503`.
  - Identificó por su cuenta un conflicto con las inscripciones: T-finalizar y T-cierre podían dejar sin marcar como `finished` una inscripción. Lo mitigó bloqueando la fila de la inscripción.
- **Pruebas:** C4 desglosado en cuatro casos, con el momento en que se toma el reloj, se obtiene el bloqueo y se evalúan las condiciones. Nuevos escenarios C7 (inscripción) y C8 (orden efectivo de bloqueos).
- **Validación:**
  - Un script revisó 20 tablas, sin filas con errores de columnas, y comprobó que las vallas de código estaban balanceadas, sin términos obsoletos y solo con los cuatro estados.
  - Los 5 bloques Mermaid se revisaron a mano, **sin pasarlos por un renderizador**.
  - Comparadas con HEAD, la sección 0 y las secciones 3–7 eran idénticas.
  - `git diff --check` sin errores. `git diff --stat`: 631 inserciones acumuladas en `readme.md`.
  - No se ejecutaron pruebas funcionales.

### **2.2. Descripción de componentes principales:**

**Prompt 1:** ver 2.1, Prompt 1 (Prompt 03). Responsabilidades por capa y módulo, ciclo de vida de una sesión, flujos de activación y de registro, finalización y cierre, estrategia de cierre automático y diagrama de secuencia.

**Prompt 2:** ver 2.1, Prompt 2 (Prompt 04). Reglas de estado y transiciones permitidas, protocolo de concurrencia (T-registro, T-finalizar, T-cierre), garantías y diagrama de secuencia con un registro concurrente.

**Prompt 3:** ver 2.1, Prompt 3 (Prompt 05). Retirada de la garantía de que no habría *deadlocks*, puntos que hay que verificar, bloqueo de la inscripción y tratamiento de errores de bloqueo.

### **2.3. Descripción de alto nivel del proyecto y estructura de ficheros**

**Prompt 1:** ver 2.1, Prompt 1 (Prompt 03). Estructura de repositorio propuesta, con el frontend organizado por *features* y el backend por módulos y capas.

**Prompt 2:** ver 2.4, Prompt 2 (Prompt 19). Primer subconjunto real de la estructura: npm *workspaces* `backend`, `frontend` y `e2e`, sin carpetas vacías.

**Prompt 3:**

*Prompt 23 — DEV-038 (parcial): base de internacionalización del frontend*

- **Herramienta:** Claude Code (modelo `claude-opus-5-5`), en la misma sesión que DEV-001 a DEV-004. Roles indicados por el autor: el usuario es el Product Owner; ChatGPT, analista y revisor; Claude Code, desarrollador.
- **Objetivo:** fusionar el cierre documental de DEV-004 (PR #10), analizar el incremento vertical de la Entrega 2 (registro React → Express → PostgreSQL), analizar DEV-038 parcial sin modificar archivos y, tras la aprobación de D1–D9, implementarlo en una rama y validarlo en local, sin commit, push ni PR.
- **Archivos afectados:**
  - **nuevos:**
    - `frontend/src/i18n/`: `config.ts` (fábrica `createI18n`), `resources.ts`, `i18next.d.ts`, `missing-keys.ts`, `errors.ts` (`translateErrorCode`), `app-i18n.ts` e `I18nProvider.tsx`, con las pruebas `i18n.test.ts`, `I18nProvider.test.tsx` y `no-literal-text.lint.test.ts`;
    - `frontend/src/locales/en/`: `common.json`, `auth.json` y `errors.json`;
    - `frontend/src/test/missing-keys.ts`;
  - **modificados:** `frontend/src/main.tsx`, `frontend/src/test/setup.ts`, `eslint.config.js`, `frontend/package.json`, `package-lock.json`, `CLAUDE.md`, `readme.md` (0.3, 2.2, 2.6 y 6), `docs/design-system.md` (8.1 y 8.2) y `prompts.md`;
  - **sin cambios:** el backend, el esquema, las migraciones, la CI, los E2E y la vista de diagnóstico.

Texto literal del prompt (merge del PR #10 y análisis del incremento):

```text
# Cali Coach — Merge del PR #10 y análisis del siguiente incremento

Como Product Owner, autorizo explícitamente realizar el merge del PR #10:

https://github.com/GeraGalindo/AI4Devs-finalproject/pull/10

Commit aprobado:
1566989a6068373630c8de97b00fec1abaa46688

## Fase 1 — Verificación y merge

1. Confirma que PR #10 sigue abierto contra main.
2. Confirma que HEAD coincide exactamente con el commit aprobado.
3. Comprueba que no hay conflictos.
4. Confirma que la CI 45989394190 terminó en success.
5. Realiza el merge protegido por SHA, conservando el merge commit.
6. No hagas squash, rebase ni force push.

Si alguna condición falla, detente y consulta.

## Fase 2 — Verificación posterior

1. Confirma que PR #10 está MERGED.
2. Registra el SHA y fecha del merge.
3. Actualiza main local por fast-forward.
4. Confirma que main coincide con origin/main y que el árbol está limpio.
5. Espera la CI de main y comprueba su resultado.
6. Confirma el cierre completo de DEV-004, incluyendo documentación.

## Fase 3 — Análisis del siguiente incremento para Entrega 2

Una vez completado DEV-004, realiza un análisis exclusivamente de lectura para conseguir una funcionalidad operativa de extremo a extremo:

React → Express → PostgreSQL

El flujo elegido es el registro de usuario.

Revisa el backlog y los contratos existentes, especialmente:

- DEV-038: internacionalización.
- DEV-039: sistema de diseño.
- DEV-006: cliente HTTP y navegación.
- DEV-007: pantallas de autenticación.
- HU-04: registro de usuario.
- Contrato POST /api/auth/register.
- Diseño mobile-first y tema oscuro.

Determina:

1. Qué dependencias son realmente obligatorias para implementar el registro.
2. Si podemos entregar un incremento vertical mínimo sin completar anticipadamente todos los tickets.
3. Qué componentes de React, cliente HTTP y navegación son necesarios.
4. Cómo obtener la zona horaria del navegador.
5. Cómo gestionar CSRF, cookies y errores 400, 403, 409 y 429.
6. Cómo comprobar que el registro inicia una sesión y que GET /api/auth/me la restaura.
7. Cómo demostrar persistencia en PostgreSQL.
8. Qué prueba E2E nueva debe incorporarse.
9. Qué archivos habría que crear o modificar.
10. Qué decisiones técnicas necesitan aprobación del Product Owner.

No asumas que todos los tickets deben implementarse completamente. Propón el incremento más pequeño que respete la arquitectura y el diseño existentes.

## Fase 4 — Informe

Entrega:

- Resultado del merge y CI de main.
- Confirmación del cierre de DEV-004.
- Propuesta de alcance del incremento vertical.
- Dependencias.
- Criterios de aceptación.
- Estrategia de pruebas.
- Riesgos.
- Decisiones pendientes.

## Restricciones

- No implementes el incremento todavía.
- No modifiques archivos.
- No crees ramas ni commits adicionales.
- No abras otro PR.
- No comiences DEV-005 ni otros tickets.
- No modifiques los Prompts 16–18.

Detente después del análisis y espera mi revisión.
```

Texto literal del prompt (análisis de DEV-038 parcial):

```text
# Cali Coach — DEV-038 parcial: análisis técnico previo

## Contexto

Actúas como desarrollador de Cali Coach. El Product Owner ha aprobado el siguiente enfoque para la Entrega 2:

- Objetivo: registro funcional React → Express → PostgreSQL.
- Registro con sesión automática y restauración mediante GET /api/auth/me.
- Login y logout quedan fuera del incremento.
- Cuatro PR secuenciales: DEV-038 parcial → DEV-039 parcial → DEV-006 parcial → DEV-007 parcial.
- Los tickets se mantendrán parcialmente implementados hasta completar su alcance original.
- Zona horaria: utilizar la del navegador; si no está disponible o es rechazada, ofrecer selección manual de una zona válida.
- E2E: el escenario crítico de registro deberá ejecutarse automáticamente en CI antes de cerrar la Entrega 2.

DEV-004 ya está terminado, incluyendo documentación:
- PR #9: implementación.
- PR #10: cierre documental.
- HEAD esperado de main: 9936fcc6f9e6ff91754ee02062c4ce9414dc3524.
- CI de main: 45990003521, success.

## Objetivo de esta tarea

Realiza exclusivamente el ANÁLISIS de DEV-038 parcial.

No tienes autorización para modificar archivos, instalar dependencias, crear ramas, hacer commits, push o abrir PR.

## Fase 1 — Verificar estado del repositorio

1. Confirma que main coincide con origin/main.
2. Confirma que HEAD corresponde al merge del PR #10.
3. Comprueba que el árbol de trabajo está limpio.
4. Lee CLAUDE.md, readme.md, prompts.md y docs/design-system.md.
5. Localiza el alcance exacto de DEV-038, sus dependencias y criterios de aceptación.
6. Inspecciona la estructura real del frontend, su configuración de TypeScript, Vite, Vitest y React.

Si main ha avanzado, informa de ello y utiliza el estado real como referencia. No modifiques nada.

## Fase 2 — Analizar el alcance mínimo

Propón una implementación parcial de DEV-038 que incluya únicamente:

1. Configuración de i18next y react-i18next.
2. Inglés como idioma único y explícito.
3. Catálogos organizados por namespaces:
   - common
   - auth
   - errors
4. Integración del proveedor de traducciones con React.
5. Política para claves inexistentes.
6. Pruebas automatizadas de internacionalización.
7. Documentación del estado parcial del ticket.

No implementes:
- Registro ni login.
- Router.
- Cliente HTTP.
- Gestión de sesión.
- Sistema de diseño completo.
- Selector de idioma.
- Traducciones de pantallas futuras.
- Formateadores de fechas y números.
- Cambios en backend, PostgreSQL, migraciones o E2E.

## Fase 3 — Contratos y compatibilidad

Investiga y documenta:

A. Las versiones exactas de i18next y react-i18next propuestas y su compatibilidad con React 19.3.1, TypeScript y el entorno de pruebas.

B. La estructura de archivos recomendada, por ejemplo:

frontend/src/i18n/
frontend/src/locales/en/common.json
frontend/src/locales/en/auth.json
frontend/src/locales/en/errors.json

Adáptala a la estructura real del repositorio.

C. Cómo inicializar i18next sin depender de detección automática del idioma ni de servicios externos.

D. Cómo utilizar las traducciones desde componentes React.

E. Cómo gestionar claves desconocidas y errores del backend que todavía no tienen traducción.

F. Cómo evitar textos visibles escritos directamente en los componentes futuros.

G. Cómo verificar que una clave faltante provoca un fallo detectable en pruebas o CI, sin depender únicamente de un fallback silencioso en producción.

H. Cómo evitar que la inicialización de i18n rompa la vista de diagnóstico existente o sus cinco pruebas de frontend.

I. Cómo mantener una CSP estricta, sin introducir estilos inline ni dependencias externas de traducción.

## Fase 4 — Estrategia de pruebas

Define pruebas para:

1. Inicialización en inglés.
2. Traducción de una clave existente en cada namespace.
3. Detección de claves inexistentes.
4. Comportamiento ante códigos de error desconocidos.
5. Integración con un componente React.
6. Regresión de las pruebas actuales.

Distingue claramente entre:
- Comprobaciones automáticas.
- Comprobaciones manuales.
- Pruebas que pertenecen a DEV-038 parcial.
- Pruebas que deben esperar a DEV-006 o DEV-007.

No añadas pruebas todavía.

## Fase 5 — Plan de implementación

Entrega:

1. Estado inicial del repositorio.
2. Alcance exacto de DEV-038 según la documentación.
3. Alcance parcial recomendado.
4. Dependencias y versiones.
5. Lista de archivos nuevos y modificados.
6. Diseño de configuración i18n.
7. Estrategia para detectar claves faltantes.
8. Criterios de aceptación verificables.
9. Plan de pruebas.
10. Riesgos y alternativas.
11. Decisiones técnicas que necesitan aprobación.
12. Secuencia de implementación propuesta.

Incluye también cómo documentarás DEV-038 como PARCIAL, sin marcarlo como terminado.

## Restricciones obligatorias

- Solo lectura y análisis.
- No modificar archivos.
- No instalar paquetes.
- No crear ramas.
- No hacer commit, push ni PR.
- No comenzar DEV-039, DEV-006 o DEV-007.
- No modificar los Prompts 16–18.
- No reinterpretar las decisiones de producto DP-01 a DP-17.

Detente al terminar el informe y espera la aprobación explícita del Product Owner para implementar DEV-038 parcial.
```

Texto literal del prompt (implementación):

```text
# Cali Coach — DEV-038 parcial: implementación local autorizada

Como Product Owner, apruebo las decisiones D1–D9 del análisis técnico de DEV-038 parcial, con las precisiones indicadas a continuación.

Autorizo crear una rama e implementar DEV-038 parcial localmente.

NO autorizo commit, push, creación de Pull Request ni merge.

## Contexto

- Proyecto: Cali Coach.
- Base esperada de main: 9936fcc6f9e6ff91754ee02062c4ce9414dc3524.
- DEV-004: terminado.
- Objetivo de Entrega 2: registro React → Express → PostgreSQL.
- Orden aprobado: DEV-038 parcial → DEV-039 parcial → DEV-006 parcial → DEV-007 parcial.
- DEV-038 debe permanecer marcado como PARCIAL.

## Fase 1 — Preparación

1. Confirma que main coincide con origin/main.
2. Confirma que el árbol está limpio.
3. Crea feature/dev-038-i18n-foundation desde main.
4. Revisa las notas de versión de i18next 27.1.1 y react-i18next 18.0.1.
5. Comprueba compatibilidad con React 19.3.1 y TypeScript 6.0.3.

Si encuentras incompatibilidades, detente y consulta. No cambies de versión por iniciativa propia.

## Fase 2 — Dependencias y configuración

Instala con versiones exactas:

- i18next@27.1.1
- react-i18next@18.0.1

Implementa:

- Inglés fijo.
- Sin detector de idioma.
- Sin selector.
- Sin backend HTTP de traducciones.
- Sin localStorage.
- Recursos JSON empaquetados.
- Inicialización síncrona.
- I18nextProvider integrado en React.

Utiliza una fábrica de instancias para facilitar el aislamiento de las pruebas.

## Fase 3 — Catálogos

Crea:

- frontend/src/locales/en/common.json
- frontend/src/locales/en/auth.json
- frontend/src/locales/en/errors.json

Incluye únicamente textos comunes, marcadores mínimos de autenticación y códigos de error necesarios para el registro y las respuestas transversales.

No añadas traducciones de pantallas futuras.

Implementa translateErrorCode(code), con un mensaje genérico para códigos desconocidos.

Nunca muestres directamente error.message recibido del backend.

## Fase 4 — Detección de errores de traducción

Implementa las siguientes capas:

1. Tipado de claves basado directamente en los recursos JSON.
2. Detección de claves faltantes durante las pruebas.
3. Prueba que demuestre que el detector realmente falla cuando falta una clave.
4. Aislamiento del estado del detector entre pruebas.
5. Comportamiento seguro en producción sin interrumpir la interfaz.
6. Regla ESLint contra textos visibles escritos directamente en JSX.

No mantengas una lista manual duplicada de claves.

Comprueba que ESLint detecta:
- Texto visible en JSX.
- aria-label literal.
- placeholder literal.
- title literal.
- alt literal.

Comprueba también que no bloquea expresiones válidas ni los tests.

Mantén una excepción limitada y documentada para DiagnosticsPage.

Si alguna capa no puede funcionar de forma fiable, informa antes de reemplazarla por una alternativa.

## Fase 5 — Pruebas

Implementa las pruebas propuestas en el análisis:

- Inicialización en inglés.
- Claves existentes en los tres namespaces.
- Claves inexistentes.
- Tipado de claves.
- Error conocido y desconocido.
- Cobertura de los códigos de error incluidos.
- Componente React con proveedor.
- Regresión de DiagnosticsPage.
- Regresión del montaje de App.

Ejecuta:

- npm ci
- npm run lint
- npm run typecheck
- npm test
- npm run test:integration
- npm run build
- npm audit --audit-level=high
- git diff --check

Ejecuta también los E2E existentes localmente, incluidos los escenarios de CSP.

No modifiques la CI para este ticket.

## Fase 6 — Documentación

Actualiza únicamente lo necesario en:

- readme.md
- docs/design-system.md
- CLAUDE.md
- prompts.md

Registra:

- Las librerías confirmadas.
- La convención de traducciones.
- Las pruebas y sus resultados.
- El estado PARCIAL de DEV-038.
- Las funcionalidades pendientes para completar DEV-038.
- El Prompt 23 y la revisión humana todavía pendiente.

No declares DEV-038 terminado.

No modifiques los Prompts 16–18.

## Fase 7 — Informe previo a publicación

Entrega:

1. Rama y commit base.
2. Lista exacta de archivos creados y modificados.
3. Resumen del diff.
4. Versiones instaladas y resultado de npm audit.
5. Evidencia de detección de claves faltantes.
6. Evidencia de la regla ESLint.
7. Resultado de cada suite de pruebas.
8. Resultado E2E y CSP.
9. Tamaño del bundle antes y después, si puede medirse.
10. Riesgos y limitaciones.
11. Confirmación de que DEV-038 sigue PARCIAL.
12. Confirmación de que no hay commits, push ni PR.

## Restricciones

- No implementar DEV-039, DEV-006 ni DEV-007.
- No modificar backend, esquema ni migraciones.
- No añadir router, cliente HTTP o gestión de sesión.
- No alterar las pruebas E2E existentes.
- No cambiar de dependencias sin aprobación.
- No hacer commit, push, PR ni merge.
- No modificar los Prompts 16–18.

Detente al terminar el informe y espera mi revisión.
```

**Decisiones humanas:**
- **Incremento de la Entrega 2:** el autor eligió cuatro PR secuenciales (DEV-038 → DEV-039 → DEV-006 → DEV-007), cada uno con su parte mínima y el ticket marcado como parcial; dejó el inicio y el cierre de sesión fuera del incremento; decidió que, si el navegador no da una zona horaria válida, la interfaz ofrezca elegir una a mano; y exigió que el E2E del registro se ejecute automáticamente en CI antes de cerrar la Entrega 2.
- **DEV-038:** aprobó D1–D9 del análisis:
  - D1: `i18next` 27.1.1 y `react-i18next` 18.0.1, sin cambiar de versión por iniciativa propia;
  - D2: recursos empaquetados e inicialización síncrona, sin detector ni *backend* HTTP;
  - D3: claves faltantes en cuatro capas (tipos, fallo en pruebas, aviso sin interrumpir en producción y *lint*);
  - D4: regla nativa `no-restricted-syntax`, sin dependencia nueva;
  - D5: solo los códigos de error del registro y los transversales;
  - D6: la vista de diagnóstico se queda como está, con una excepción de *lint* documentada;
  - D7: los textos en inglés se revisan en el diff;
  - D8: las librerías pasan a [Confirmada];
  - D9: el Prompt 23 va en el hueco 2.3, Prompt 3.
- **Precisiones de la implementación:** una fábrica de instancias; sin lista manual duplicada de claves; una prueba que demuestre que el detector falla; aislamiento del detector entre pruebas; comprobar la regla en texto, `aria-label`, `placeholder`, `title` y `alt`, sin bloquear expresiones válidas ni las pruebas.

**Resultado generado por la IA:**
- **Merge del PR #10:** comprobado que seguía abierto hacia `main`, con el commit `1566989` y la CI 45989394190 en verde. Fusionado con `--match-head-commit` el 2026-11-27 (`9936fcc`). CI de `main` 45990003521 en verde. DEV-004 queda cerrado también en la documentación.
- **Análisis del incremento** (sin modificar archivos): el backend no necesita cambios; propuso la parte mínima de DEV-038, DEV-039, DEV-006 y DEV-007, el E2E de registro en `spa-build` con comprobación de la fila en PostgreSQL y diez decisiones (P1–P10). Detectó que el job de E2E de la CI no aplica migraciones y que el E2E local usa la base de desarrollo.
- **Análisis de DEV-038** (sin modificar archivos): alcance parcial, versiones con más de dos semanas, diseño de la configuración, las cuatro capas de detección y nueve decisiones (D1–D9).
- **Implementación:**
  - revisó las notas de versión de `i18next` 27 y `react-i18next` 18 sin encontrar incompatibilidades con React 19.3.1 ni con TypeScript 6.0.3;
  - `createI18n()` crea instancias independientes, inicializadas de forma síncrona en `en`, sin `initReactI18next`: los componentes reciben la instancia por `I18nProvider`;
  - las claves se tipan desde los JSON (`CustomTypeOptions`);
  - `missingKeyHandler` avisa por `reportMissingKey`; `src/test/setup.ts` lo sustituye en cada prueba por un registro que la hace fallar;
  - `translateErrorCode` traduce `error.code` y devuelve el mensaje genérico para códigos desconocidos o con otra forma, sin usar `error.message`;
  - la regla de ESLint, con la excepción de las pruebas y de `features/diagnostics/`.
- **Correcciones durante la implementación:**
  - la regla rechazaba `alt=""`, que es correcto en imágenes decorativas: ahora solo cuenta el texto no vacío;
  - una prueba de aislamiento reveló que i18next guarda los recursos por referencia, así que un `addResource` en una instancia cambiaba los catálogos de todas: cada instancia recibe ahora una copia (`structuredClone`);
  - `startMissingKeyDetection` no era idempotente y, llamada dos veces, perdía el aviso original: ahora restaura el anterior antes de instalarse.
- **Validación (local, 2026-11-27; detalle en el README, 2.6):**
  - `npm ci`, `lint`, `typecheck`, `build`, `git diff --check`: sin errores;
  - `npm test`: 201/201 del backend y 41/41 del frontend (36 nuevas; las 5 de diagnóstico sin cambios);
  - `npm run test:integration`: 104/104;
  - `CI=1 npm run test:e2e`: 6/6, incluidas las 4 pruebas de CSP sobre el *build* real;
  - `npm audit --audit-level=high`: 0 vulnerabilidades; `effect` sigue en 3.22.1;
  - comprobaciones manuales: una prueba temporal con una clave mal escrita falla con `Missing translation keys: auth:signUp.tittle`; añadir al catálogo una clave que las pruebas esperan inexistente rompe `typecheck` (`TS2578`); la regla, sobre un componente con los cinco tipos de texto, da 8 errores, y 0 sobre uno con expresiones válidas;
  - *bundle* JS: de 221,40 kB (69,33 kB gzip) a 272,14 kB (85,36 kB gzip).
  - **la ejecución en GitHub Actions estaba pendiente del PR** cuando se cerró la implementación. Ahora está en verde: ver la revisión humana.

**Revisión humana:**
- **Análisis:** el autor aprobó el enfoque del incremento (P1–P10, con la zona horaria elegida a mano como respaldo y el E2E de registro obligatorio en CI antes de cerrar la Entrega 2) y, para DEV-038, D1–D9 con las precisiones de "Decisiones humanas".
- **Implementación:** el autor aprobó el informe local sin pedir cambios y autorizó el commit, el push, el PR y el E2E manual. Pidió conservar la lista de códigos de error del contrato de registro, porque es una comprobación de requisitos y no una copia del catálogo. Antes de publicar, la IA corrigió un error de su propio informe: había contado 15 archivos nuevos cuando eran 14; la lista detallada y el diff ya coincidían.
- **Publicación:** commit `7fef8ca` (`7fef8ca13631bd207fb8e08e6a3f1386958eaa31`) sobre `9936fcc`, con 23 archivos (14 nuevos y 9 modificados, +1144 y −7), y PR #11 (https://github.com/GeraGalindo/AI4Devs-finalproject/pull/11) hacia `main`. Su descripción indica "DEV-038 STATUS: PARTIAL — NOT COMPLETED".
- **CI en GitHub Actions** (sección 7 del README):
  - ejecución `pull_request` 45994498785, en verde: auditoría sin vulnerabilidades altas, lint, tipos, tests 201/201 y 41/41, migraciones, *drift*, salvaguarda, integración 104/104, fila centinela intacta y *build*. E2E omitido por diseño;
  - ejecución `workflow_dispatch` 45994674766 sobre el mismo commit `7fef8ca`, en verde, con el E2E 6/6 (el *smoke* de DEV-001 y las 5 pruebas de `spa-build`, 4 de ellas de la CSP);
  - ejecución `push` a `main` 45995796937, en verde, tras el merge: las mismas comprobaciones que en el PR.
- **Aprobación final:** el autor revisó los resultados del PR #11 y autorizó el merge. Antes se comprobó que el PR seguía abierto hacia `main`, que su último commit seguía siendo `7fef8ca`, que no había conflictos, que las dos ejecuciones habían pasado sobre ese commit, que el diff tenía los 23 archivos previstos y que los Prompts 16–18 no habían cambiado. El merge se hizo con *merge commit* y `--match-head-commit 7fef8ca` el 2026-11-27 (`79d8d4c`, `79d8d4c9ad6a9573f7272dcd5c909e4d12602b58`), sin *rebase*, *squash* ni *force push*. `main` local se actualizó por *fast-forward*.
- **Estado:** DEV-038 sigue **parcial**, no terminado. La parte implementada está integrada en `main`. Falta, para completarlo:
  - los catálogos `profile`, `programs`, `calendar`, `session` y `progress`, y `session.status.<valor>`;
  - las claves del resto de los códigos de error de la sección 4;
  - las utilidades de formato con `Intl` y la configuración regional de formato (criterio 3);
  - el criterio 5, cuando una pantalla muestre valores de la API;
  - migrar o retirar la vista de diagnóstico.

  Limitaciones abiertas: la regla de ESLint no detecta textos visibles guardados en variables; `i18next` 27 es una versión mayor reciente; el JS del *build* crece 50,7 kB (16,0 kB gzip); y en `prompts.md` solo queda libre el hueco 2.4, Prompt 3. Lo siguiente, según el orden aprobado, es DEV-039 parcial, que no se ha empezado.

### **2.4. Infraestructura y despliegue**

**Prompt 1:** ver 2.1, Prompt 1 (Prompt 03). Propuesta de entorno local, despliegue en un único servicio PaaS (aún por elegir) y CI con GitHub Actions. En ese momento no había infraestructura creada.

**Prompt 2:**

*Prompt 19 — DEV-001: scaffolding técnico, herramientas, CI y harness inicial*

- **Herramienta:** Claude Code (modelo `claude-opus-5-5`), en una sesión nueva.
- **Objetivo:** implementar DEV-001 en dos fases: un análisis con plan (Fase A) y, tras la aprobación del autor, la implementación (Fase B). Es el primer incremento técnico de la Entrega 2 y no incluye ninguna funcionalidad de negocio.
- **Archivos afectados:** nuevos `package.json`, `package-lock.json`, `.npmrc`, `.nvmrc`, `.editorconfig`, `.gitignore`, `tsconfig.base.json`, `eslint.config.js`, `docker-compose.yml`, `.github/workflows/ci.yml`, `CLAUDE.md`, `backend/`, `frontend/` y `e2e/`. Modificados: `readme.md` (0.3, 1.4, 2.1, 2.3, 2.4, 2.6, 4 y 6) y `prompts.md` (este registro y el mapa).

Texto literal del prompt (Fase A):

```text
# DEV-001 — Scaffolding técnico, herramientas, CI y harness inicial

## Rol

Actúa como **Senior Full-Stack Developer** del proyecto **Cali Coach**, desarrollado como proyecto final del programa AI4Devs.

Tu responsabilidad es analizar, proponer, implementar y verificar soluciones técnicas, respetando las decisiones del Product Owner y la documentación aprobada.

No tomes decisiones de producto por tu cuenta.

## 1. Contexto del proyecto

**Repositorio:** `GeraGalindo/AI4Devs-finalproject`

**Rama base:** `main`

La Entrega 1 ya fue fusionada en `main` y contiene la definición del producto, requisitos, decisiones y arquitectura aprobadas.

El objetivo de la Entrega 2 es:

> Archivos actualizados, scaffolds de arquitectura conectados y al menos una funcionalidad real de extremo a extremo, aunque el flujo principal todavía esté incompleto.

DEV-001 es el primer incremento técnico de esta entrega. Su propósito es establecer la infraestructura necesaria para implementar posteriormente las funcionalidades del MVP.

**DEV-001 no debe implementar todavía una funcionalidad de negocio E2E.**

## 2. Fase A — Análisis obligatorio

Antes de modificar cualquier archivo:

1. Comprueba la rama actual, el estado de Git y la sincronización con `origin/main`.
2. Inspecciona todos los archivos relevantes del repositorio.
3. Lee `readme.md`, `prompts.md` y cualquier documentación de requisitos o arquitectura.
4. Identifica las tecnologías y convenciones aprobadas.
5. Determina qué componentes técnicos ya existen y cuáles faltan.
6. Identifica dependencias, riesgos, decisiones pendientes y posibles conflictos con el alcance del MVP.

No presupongas que el repositorio está vacío ni que una tecnología está aprobada si la documentación no lo confirma.

### Entregable de la Fase A

Presenta un plan que incluya:

- Estado actual del repositorio.
- Arquitectura técnica identificada.
- Estructura de carpetas propuesta.
- Dependencias necesarias y su justificación.
- Configuración de desarrollo local.
- Estrategia de pruebas y CI.
- Contenido propuesto para `CLAUDE.md`.
- Criterios de aceptación verificables.
- Riesgos, dudas o decisiones que requieran aprobación.

**Detente al terminar la Fase A. No modifiques archivos, instales dependencias, crees ramas ni ejecutes acciones que alteren el repositorio hasta recibir aprobación explícita.**

## 3. Fase B — Implementación, previa aprobación

Una vez aprobado el plan, implementa exclusivamente el alcance siguiente.

### 3.1 Estructura técnica

Prepara los componentes de la arquitectura aprobada:

- Frontend con React, TypeScript y Vite.
- Backend con Node.js, Express y TypeScript.
- PostgreSQL como base de datos.
- Configuración de desarrollo local reproducible.
- Gestión de variables de entorno mediante archivos de ejemplo sin secretos.

Organiza el código con una estructura sencilla y mantenible. No añadas capas, servicios o herramientas sin una necesidad concreta.

### 3.2 Conexión entre componentes

Implementa una comprobación técnica mínima que permita verificar:

1. Que el frontend puede comunicarse con el backend.
2. Que el backend puede establecer conexión con PostgreSQL.
3. Que los errores de conexión se gestionan de forma explícita.

Puede utilizarse un endpoint técnico de estado y una vista mínima de diagnóstico.

Esto constituye una verificación de integración técnica, **no una funcionalidad de negocio E2E**.

### 3.3 Harness inicial de Claude Code

Crea un archivo `CLAUDE.md` con instrucciones específicas del proyecto.

Debe cubrir:

- Propósito de Cali Coach y límites del MVP.
- Referencias a la documentación aprobada como fuente de verdad.
- Rol y responsabilidades de Claude.
- Convenciones de estructura y calidad del código.
- Reglas para trabajar con Git y ramas.
- Política de análisis antes de modificar código.
- Estrategia de pruebas y validación.
- Reglas básicas de seguridad, privacidad y gestión de secretos.
- Registro de decisiones y trazabilidad de prompts.
- Condiciones para considerar una tarea terminada.

Las instrucciones deben ser concretas, verificables y evitar contradicciones con el repositorio.

No crees agentes, skills, hooks o evals solamente para completar una estructura visual.

Si detectas un caso que justifique alguno de estos componentes, documéntalo como propuesta para un incremento posterior.

### 3.4 Calidad y CI

Configura los mecanismos necesarios para:

- Ejecutar lint.
- Comprobar tipos de TypeScript.
- Ejecutar pruebas automatizadas.
- Compilar frontend y backend.
- Verificar la integración del backend con PostgreSQL.
- Ejecutar las comprobaciones relevantes mediante GitHub Actions.

La configuración de CI debe ser reproducible y no depender de secretos locales.

### 3.5 Documentación

Actualiza los archivos correspondientes con:

- Requisitos previos de instalación.
- Comandos para iniciar frontend, backend y base de datos.
- Variables de entorno necesarias.
- Procedimiento para ejecutar las pruebas.
- Explicación de la estructura técnica.
- Limitaciones conocidas.

Actualiza `prompts.md` respetando las convenciones existentes y registrando la asistencia de IA utilizada durante DEV-001.

## 4. Restricciones de alcance

No implementes en DEV-001:

- Registro o inicio de sesión de usuarios.
- Autenticación o autorización.
- Migraciones de tablas de negocio.
- Catálogo de programas.
- Sesiones de entrenamiento.
- Registro de series o repeticiones.
- Cálculo de adherencia.
- Gamificación.
- Agentes o skills especializados sin justificación.

Respeta todas las decisiones de producto aprobadas en la Entrega 1.

Si una decisión técnica relevante no está documentada, solicita aprobación antes de introducirla.

## 5. Validación y criterios de aceptación

DEV-001 podrá considerarse terminado cuando se demuestre que:

- [ ] La estructura técnica corresponde a la arquitectura aprobada.
- [ ] El frontend inicia correctamente.
- [ ] El backend inicia correctamente.
- [ ] El frontend puede comunicarse con el backend.
- [ ] El backend puede conectarse a PostgreSQL.
- [ ] Los errores de conexión se gestionan correctamente.
- [ ] Lint y comprobación de tipos pasan.
- [ ] Las pruebas automatizadas pasan.
- [ ] Frontend y backend compilan correctamente.
- [ ] GitHub Actions ejecuta las verificaciones configuradas.
- [ ] `CLAUDE.md` contiene instrucciones útiles y coherentes.
- [ ] La documentación permite reproducir el entorno.
- [ ] `prompts.md` registra el trabajo realizado.

No marques un criterio como cumplido sin evidencia de verificación.

Distingue claramente entre comprobaciones locales y resultados de CI.

## 6. Entrega de resultados

Al finalizar la implementación, presenta:

1. Resumen de los cambios realizados.
2. Lista de archivos creados y modificados.
3. Comandos de verificación ejecutados y sus resultados.
4. Criterios de aceptación cumplidos y pendientes.
5. Riesgos o limitaciones.
6. Recomendaciones para DEV-002.

No realices commit, push ni crees un Pull Request sin autorización explícita.

## Instrucción inmediata

**Ejecuta únicamente la Fase A: analiza el repositorio y presenta el plan de implementación de DEV-001. Espera mi aprobación antes de continuar.**
```

Texto literal de la aprobación (Fase B):

```text
He revisado tu análisis de DEV-001 y **apruebo comenzar la Fase B**, con las siguientes decisiones:

- **D1 — Aprobado con modificación:** crear `GET /api/health` como endpoint técnico público. Para el error 503 reutilizar `TEMPORARILY_UNAVAILABLE` conforme al contrato existente. Documentar la excepción de autenticación.
- **D2 — Aprobado:** utilizar `pg` directamente. Prisma se incorporará en DEV-002.
- **D3 — Aprobado:** utilizar npm workspaces.
- **D4 — Aprobado:** configurar Playwright con una prueba smoke en Chromium, ejecutable manualmente y mediante `workflow_dispatch`.
- **D5 — Aprobado:** no incorporar Prettier.
- **D6 — Aprobado:** Node 24 y PostgreSQL 17.
- **D7 — Aprobado:** vista técnica de diagnóstico en inglés, sin introducir todavía i18n ni design tokens.
- **D8 — Aprobado con modificación:** registrar el trabajo en `prompts.md` utilizando el siguiente identificador disponible, sin duplicar numeración. Mantener el Prompt 17 pendiente sin inventar contenido.
- **D9 — Aprobado:** actualizar puntualmente las secciones relevantes del README y documentar los resultados reales.
- **D10 — Aprobado:** crear la rama `feature/dev-001-scaffolding` desde `main` actualizado.

Implementa exclusivamente DEV-001 conforme al plan presentado.

Al finalizar:

1. Ejecuta las verificaciones locales.
2. Presenta los resultados y cualquier prueba pendiente.
3. Comprueba los criterios de aceptación.
4. Actualiza la documentación y la trazabilidad.
5. Presenta un resumen de archivos modificados y riesgos pendientes.

**No hagas commit, push ni crees un Pull Request todavía.** Espera mi autorización después de revisar los resultados.

No amplíes el alcance hacia DEV-002, DEV-003 ni otros tickets.
```

**Decisiones humanas** (respuesta del autor a las decisiones D1–D10 que planteó la IA en la Fase A):
- **D1, con modificación:** `GET /api/health` es público y técnico. La IA había propuesto un código nuevo, `DATABASE_UNAVAILABLE`; el autor decidió reutilizar `503 TEMPORARILY_UNAVAILABLE` del contrato existente y documentar la excepción de autenticación.
- **D2–D7:** `pg` directo (Prisma en DEV-002), npm *workspaces*, *smoke* de Playwright solo en Chromium con ejecución manual o `workflow_dispatch`, sin Prettier, Node 24 y PostgreSQL 17, y una vista de diagnóstico en inglés sin i18n ni *tokens*.
- **D8, con modificación:** usar el siguiente identificador libre (19) sin duplicar numeración y mantener el Prompt 17 pendiente sin inventar su contenido.
- **D9 y D10:** actualizaciones puntuales del README con resultados reales, y la rama `feature/dev-001-scaffolding` desde `main` actualizado.
- No hacer commit, push ni PR hasta revisar los resultados.

**Resultado generado por la IA:**
- **Fase A:**
  - el repositorio solo tenía documentación: ni código, ni CI, ni `.gitignore`;
  - la IA detectó que `GET /api/health` no figuraba en la sección 4, donde todas las rutas requieren sesión salvo `register` y `login`. Detectó también el solapamiento con DEV-003 (errores, `helmet`, configuración segura) y que el criterio de CI de DEV-001 solo se puede verificar con un PR.
- **Fase B:**
  - **raíz:** npm *workspaces* (`backend`, `frontend`, `e2e`), TypeScript `strict` compartido, ESLint (*flat config* con `typescript-eslint` y las reglas de React Hooks), `docker-compose.yml` con PostgreSQL 17 y *healthcheck*, y versiones exactas (`.npmrc`);
  - **backend:** Express 5 con `createApp({ checkDatabase })`, `pg` con un `SELECT 1` limitado a 2 s y `GET /api/health`, que responde `200` o `503 TEMPORARILY_UNAVAILABLE` sin filtrar la causa. Configuración mínima que se niega a arrancar sin `DATABASE_URL` y cierre ordenado con `SIGINT`/`SIGTERM`;
  - **frontend:** React 19 y Vite 8, con el *proxy* `/api` y una vista *System status* que distingue tres casos: todo correcto, base de datos caída y backend inaccesible;
  - **pruebas:** unitarias del backend (Supertest), componentes (React Testing Library), integración contra PostgreSQL real y un *smoke* de Playwright;
  - **CI:** `.github/workflows/ci.yml` con un PostgreSQL 17 de servicio, sin secretos, y un job E2E solo con `workflow_dispatch`;
  - **`CLAUDE.md`:** el *harness* del proyecto. Un *hook* contra el `push` a `main` y una *skill* para registrar prompts quedan como propuestas, sin implementar;
  - **README:** borrador de 1.4, estado en 0.3, 2.1, 2.3, 2.4 y 2.6, ficha de `GET /api/health` y su excepción en la sección 4, y el estado de DEV-001 en la sección 6.
- **Correcciones durante la implementación:**
  - `npm` no tiene `--parallel`, así que `npm run dev` lanza los dos procesos con la shell;
  - `npm test` dejó de incluir el *workspace* `e2e`;
  - `@types/node` se alineó con Node 24;
  - la vista de diagnóstico se reescribió para no llamar a `setState` de forma síncrona dentro de un efecto (regla `react-hooks/set-state-in-effect`).
- **Validación (local, 2026-11-22):**
  - `lint`, `typecheck` y `build`, sin errores;
  - `npm test`: 5/5 del backend y 5/5 del frontend;
  - `npm run test:integration`: 2/2;
  - `npm run test:e2e`: 1/1, también con `CI=1` y los servidores arrancados desde cero;
  - `npm ci`, sin errores;
  - YAML del *workflow* validado con un *parser*;
  - pruebas manuales con `curl`: `200` directo y a través del *proxy*, `503` con la base de datos parada, `502` del *proxy* con el backend parado y salida con código 1 sin `DATABASE_URL`;
  - **la ejecución en GitHub Actions estaba pendiente del PR** cuando se cerró la Fase B. Ahora está en verde: ver la revisión humana.

**Revisión humana:**
- **Fase A:** el autor revisó el plan y respondió a las decisiones D1–D10. Cambió dos (D1 y D8) y aprobó las demás, como se detalla en "Decisiones humanas".
- **Fase B:** el autor aprobó los resultados de las verificaciones locales. Después autorizó, en este orden: el commit, el push y la creación del PR #3; la ejecución del E2E manual; y, tras revisar los resultados de CI, el merge en `main`.
- **CI en GitHub Actions** (sección 7 del README):
  - ejecución `pull_request` 45019867500, en verde;
  - ejecución `workflow_dispatch` 45019946259, en verde, con el *smoke* E2E 1/1;
  - ejecución `push` a `main` 45020562284, en verde, tras el merge (`4a885e9`).
- **Lo que el autor no hizo:** no pidió cambios de código a lo implementado y no dejó una revisión formal en GitHub.
- **Pendiente:** el Prompt 17 sigue pendiente de registrar, y DEV-002 no se ha empezado.

**Prompt 3:**

### **2.5. Seguridad**

**Prompt 1:** ver 2.1, Prompt 1 (Prompt 03). Medidas básicas previstas: *hash* de contraseñas, JWT en cookie, validación, consultas parametrizadas, control de frecuencia y cabeceras.

**Prompt 2:** ver 2.1, Prompt 2 (Prompt 04). Protección CSRF (`Origin`, alternativas cuando falta, cabecera personalizada y `application/json`), caducidad y revocación de la sesión, autorización por usuario y despliegue bajo un mismo origen.

**Prompt 3:** ver 2.1, Prompt 3 (Prompt 05). La duración de la sesión de autenticación queda marcada como [Pendiente].

### **2.6. Tests**

**Prompt 1:** ver 2.1, Prompt 1 (Prompt 03). Estrategia de pruebas por niveles (unidad, integración, componentes, E2E) y control del tiempo. Solo es un plan: no se escribió ni ejecutó ningún test.

**Prompt 2:** ver 2.1, Prompt 2 (Prompt 04). Tests de seguridad (CSRF y sesión) y escenarios de concurrencia C1–C6 sobre PostgreSQL real, con sus invariantes.

**Prompt 3:** ver 2.1, Prompt 3 (Prompt 05). Desglose de C4, nuevos escenarios C7 y C8 y una invariante más sobre las inscripciones.

---

### 3. Modelo de Datos

> Los Prompts 1 y 2 de esta sección modificaron solo la sección 3 de `readme.md` (3.1 y 3.2). El Prompt 3 es el Prompt 20 (DEV-002), la primera implementación del modelo de datos.

**Prompt 1:**

*Prompt 06 — Diseño del modelo de datos*

- **Herramienta:** Claude Code (modelo `claude-opus-5-5`), en la misma sesión que los prompts de las secciones 1 y 2.
- **Objetivo:** documentar el modelo relacional PostgreSQL del MVP: diagrama entidad-relación y descripción de entidades.
- **Archivo afectado:** `readme.md` (sección 3, subsecciones 3.1 y 3.2).

Texto literal del prompt:

```text
Actúa como arquitecto de datos senior especializado en PostgreSQL y Prisma.

Estamos desarrollando Cali Coach, una aplicación web mobile-first para practicantes intermedios de calistenia, como proyecto final de AI4Devs.

Lee íntegramente las secciones 1 y 2 del archivo `readme.md` antes de proponer el modelo de datos.

## Objetivo

Documentar exclusivamente la sección 3, «Modelo de Datos», manteniendo la estructura oficial:

- 3.1. Diagrama del modelo de datos.
- 3.2. Descripción de entidades principales.

## Requisitos del modelo

Diseña un modelo relacional PostgreSQL que soporte:

1. Usuarios autenticados, zona horaria IANA y disponibilidad de 2 a 6 días.
2. Catálogo de programas preconfigurados con duración en semanas.
3. Plantillas de entrenamiento con variantes Push A/B, Pull A/B, Push-Pull A y Legs & Core A/B.
4. Ejercicios y prescripción de series, repeticiones o tiempo y descanso.
5. Inscripciones a programas y calendario materializado.
6. Sesiones programadas con fecha local, orden, semana del programa y estados `planned`, `completed`, `partial` y `skipped`.
7. Registro de las series y repeticiones realmente realizadas.
8. Historial y consultas de progreso.

## Restricciones

- Mantén la coherencia con las secciones 1 y 2.
- No introduzcas funcionalidades fuera del MVP.
- No inventes decisiones de producto.
- Distingue claramente decisiones confirmadas, propuestas y pendientes.
- Conserva el supuesto provisional de un único programa activo por usuario.
- Las sesiones `partial` conservan sus registros.
- Registrar series no cambia automáticamente una sesión a `completed`.
- Los estados finales no admiten nuevas escrituras en el MVP.
- Las fechas programadas no se recalculan al cerrar sesiones.

## 3.1. Diagrama

Genera un diagrama entidad-relación Mermaid con:

- Entidades principales.
- Claves primarias y foráneas.
- Relaciones y cardinalidades.
- Tipos de datos.
- Restricciones relevantes cuando la sintaxis lo permita.

## 3.2. Descripción de entidades

Para cada entidad, documenta:

- Nombre y responsabilidad.
- Columnas y tipos PostgreSQL.
- PK, FK, UNIQUE, NOT NULL y CHECK.
- Relaciones y cardinalidades.
- Índices necesarios.
- Justificación de las decisiones importantes.

Incluye también:

- Estrategia de integridad referencial.
- Índice único parcial para el programa activo, identificado como propuesta pendiente de ratificación.
- Índices para la reconciliación de sesiones vencidas.
- Diferencia entre ejercicios prescritos y registros reales.
- Tratamiento de fechas locales y zona horaria.
- Estrategia para evitar duplicados en registros y calendarios.
- Reglas que necesitan validación transaccional y no pueden garantizarse únicamente con restricciones SQL.

Comprueba que el modelo permite ejecutar los flujos de activación, registro, finalización, reconciliación y progreso de la sección 2.

## Restricciones de ejecución

1. Modifica únicamente la sección 3 de `readme.md`.
2. No modifiques `prompts.md`.
3. No modifiques las demás secciones.
4. No generes código, migraciones ni semillas.
5. No ejecutes pruebas ni migraciones.
6. No crees commits.
7. Mantén los encabezados de la plantilla oficial.

## Entregable

Presenta:
1. Resumen de entidades y relaciones.
2. Diagrama Mermaid.
3. Restricciones e índices principales.
4. Decisiones pendientes.
5. Riesgos de integridad y concurrencia.
6. Resultado de `git diff --check`.
7. Resultado de `git diff --stat`.
8. Archivos y secciones modificadas.
```

**Decisiones humanas** aportadas en el prompt:
- Los requisitos del modelo: zona horaria IANA, de 2 a 6 días, catálogo con duración en semanas, las siete variantes, prescripción de series, repeticiones o tiempo y descanso, calendario materializado, cuatro estados y registro de lo realmente hecho.
- Las reglas que había que respetar: las sesiones `partial` conservan sus registros, registrar no completa la sesión, los estados finales no admiten escrituras y las fechas no se recalculan.
- Mantener un único programa activo por usuario como supuesto provisional, con su índice único parcial como propuesta pendiente de ratificar.

**Resultado generado por la IA:**
- **3.1:**
  - convenciones;
  - diagrama `erDiagram` con ocho entidades: `users`, `programs`, `session_templates`, `exercises`, `template_exercises`, `enrollments`, `scheduled_sessions` y `set_logs`;
  - notas de lectura.
- **3.2:**
  - resumen de entidades;
  - una ficha por entidad con columnas, tipos, restricciones, relaciones, índices y justificación;
  - subsecciones sobre prescripción frente a registro real, integridad referencial, programa activo único, índices de reconciliación, fechas y zona horaria, prevención de duplicados, once reglas de validación transaccional, verificación de los cinco flujos de la sección 2, consultas de progreso, decisiones pendientes y riesgos.
- **Opciones técnicas propuestas por la IA**, que **no** son decisiones del equipo y figuran como [Propuesta]:
  - claves `uuid` y `code` único en el catálogo;
  - estados como `text` con `CHECK`;
  - días de la semana de 0 a 6, con 0 = domingo;
  - disponibilidad en un *array* `smallint[]` dentro de `users`;
  - prescripción por semana (`template_exercises.week_number`), basada en la "progresión semana a semana" de P1;
  - claves foráneas compuestas para el programa y la forma de medida;
  - `ON DELETE RESTRICT` en todas las claves foráneas;
  - columna `set_logs.duration_seconds` para los ejercicios medidos por tiempo.
- **Nuevas cuestiones abiertas** que planteó la IA:
  - si se pueden registrar más series que las prescritas;
  - si se registran segundos, porque F9 habla solo de repeticiones;
  - cómo versionar el catálogo cuando cambia una prescripción con registros.
- **Defectos que luego corrigió la revisión humana** (Prompt 2):
  - presentó como seguro el plan de ejecución ("El plan tendrá `LockRows` sobre `Sort`") y el uso de `ix_sessions_planned_due` en los `NOT EXISTS`;
  - dejó sin decidir la inmutabilidad del catálogo;
  - vinculó el `UNIQUE` de `set_logs` con el tratamiento de los reenvíos, como si resolviera la idempotencia.
- **Validación:**
  - el script de comprobación revisó 35 tablas, sin filas con errores de columnas, y confirmó las vallas de código balanceadas y que solo aparecen los cuatro estados;
  - el diagrama Mermaid se revisó a mano, **sin pasarlo por un renderizador**. El tipo `smallint[]` queda pendiente de comprobar en GitHub;
  - las secciones 0–2 y 4–7 no cambiaron;
  - `git diff --check` salió sin errores. `git diff --stat`: 1114 inserciones acumuladas en `readme.md`;
  - no se generó código y no se ejecutaron pruebas ni migraciones.

**Prompt 2:**

*Prompt 07 — Revisión de precisión técnica del modelo de datos*

- **Herramienta:** Claude Code (modelo `claude-opus-5-5`), en la misma sesión.
- **Objetivo:** corregir cuatro puntos concretos de la sección 3 antes de empezar la sección 4.
- **Archivo afectado:** `readme.md` (sección 3.2).

Texto literal del prompt:

```text
La sección 3 de readme.md ya contiene el modelo de datos propuesto. Necesitamos realizar una revisión final de precisión técnica antes de comenzar la sección 4 (API).

Tarea

Lee las secciones 2 y 3 de readme.md y realiza únicamente los siguientes ajustes en la sección 3:

Índices de reconciliación

Mantén ix_sessions_planned_due.

Aclara que su utilidad para las consultas NOT EXISTS debe verificarse con EXPLAIN ANALYZE sobre PostgreSQL real.

No afirmes que un índice garantiza por sí solo un plan de ejecución determinado.

Inmutabilidad del catálogo

Documenta como regla técnica propuesta del MVP que las prescripciones de programas con inscripciones existentes no se modifican.

Los cambios de contenido deben crear una nueva versión del programa, con un nuevo code.

Explica cómo esta regla protege el historial y las comparaciones entre objetivos prescritos y resultados reales.

No implementes todavía mecanismos de versionado.

Duplicados frente a idempotencia

Aclara que UNIQUE (session_id, template_exercise_id, set_number) evita duplicados, pero no garantiza idempotencia de la API.

Deja la política de reintentos y las respuestas HTTP para la sección 4.

Integridad de los registros

Conserva la validación transaccional que comprueba que cada template_exercise_id pertenece a la plantilla y semana de la sesión.

Añade explícitamente una prueba de integración que intente registrar una serie utilizando una prescripción de otra plantilla o semana, y verifique que se rechaza.

Restricciones

Modifica exclusivamente la sección 3 de readme.md.

No cambies entidades, relaciones ni nombres de columnas.

No modifiques las secciones 1, 2 ni 4–7.

No modifiques prompts.md.

No implementes código ni migraciones.

No crees commits.

No inventes resultados de pruebas.

Mantén los encabezados oficiales y el diagrama Mermaid.

Entregable

Resumen de las correcciones realizadas.

Fragmentos exactos modificados.

Resultado de git diff --check.

Resultado de git diff --stat.

Confirmación de los archivos modificados en este paso.

No continúes con la sección 4.
```

**Revisión y decisiones humanas:**
- El equipo detectó que la sección 3 afirmaba planes de ejecución que no se habían comprobado, y exigió verificarlos con `EXPLAIN ANALYZE` sobre PostgreSQL real.
- Decidió como **regla técnica propuesta** del MVP que las prescripciones de programas con inscripciones no se modifican, y que los cambios crean una nueva versión con otro `code`, sin implementar ningún mecanismo de versionado. Esto resuelve la cuestión abierta que la IA había dejado pendiente en el Prompt 1.
- Separó la prevención de duplicados de la idempotencia de la API, y aplazó a la sección 4 los reintentos y las respuestas HTTP.
- Pidió una prueba de integración explícita para la regla de que cada registro corresponde a la plantilla y la semana de su sesión.

**Resultado generado por la IA:**
- **Índices de reconciliación:** se mantiene `ix_sessions_planned_due`. Para los `NOT EXISTS` pasa a ser un índice "candidato". Se añaden dos viñetas: "un índice no garantiza un plan de ejecución" y "verificación pendiente con `EXPLAIN ANALYZE`", con las tres consultas que hay que comprobar. La afirmación sobre `LockRows` y `Sort` pasa a ser algo que hay que comprobar. Se aplica el mismo matiz en la tabla de verificación de flujos.
- **Nueva subsección "Inmutabilidad del catálogo [Propuesta]":** la regla, la nueva versión con otro `code`, por qué protege el historial y la comparación entre lo prescrito y lo realizado (incluido que `RESTRICT` impide borrar pero no modificar), y el alcance en el MVP, sin mecanismo de versionado. Se actualizan las filas relacionadas de la tabla de prescripción, de la de duplicados y de la de riesgos.
- **Duplicados frente a idempotencia:** párrafo nuevo con tres casos que el `UNIQUE` no cubre y la remisión a la sección 4. Se retira la frase que adelantaba "`409` o actualización idempotente".
- **Regla transaccional 8:** se conserva. Se añade la prueba de integración propuesta, con dos casos (otra plantilla y otra semana de la misma plantilla) y tres verificaciones: rechazo, ninguna fila nueva en `set_logs` y estado de la sesión sin cambios. Se explica que la clave foránea compuesta no detecta estos casos porque la forma de medida coincide.
- **Validación:**
  - el script de comprobación revisó 35 tablas, sin filas con errores de columnas;
  - no cambiaron entidades, columnas, relaciones ni el diagrama Mermaid;
  - las secciones 1, 2 y 4–7 no cambiaron;
  - `git diff --check` salió sin errores. `git diff --stat`: 1154 inserciones acumuladas en `readme.md`;
  - la prueba de integración y los `EXPLAIN` solo están propuestos: **no se han escrito ni ejecutado**.

**Prompt 3:**

*Prompt 20 — DEV-002: persistencia de `users` con Prisma 7*

- **Herramienta:** Claude Code (modelo `claude-opus-5-5`), en la misma sesión que DEV-001.
- **Objetivo:** implementar DEV-002 por fases: análisis con plan (Fase A); tras la aprobación, una validación técnica (B1) con parada obligatoria si había incompatibilidades o riesgos; y, tras una segunda aprobación, la implementación (B2) y la validación (B3). Sin registro, login, *hashing* ni otros tickets.
- **Archivos afectados:** nuevos `backend/prisma.config.ts`, `backend/prisma/schema.prisma`, `backend/prisma/migrations/` (`migration_lock.toml` y `20261126175055_create_users`), `backend/src/shared/prisma.ts`, `backend/tests/support/` (`test-database.ts`, `global-setup.ts` y `pg-error.ts`) y `backend/tests/integration/` (`test-database-guard.test.ts`, `users.schema.test.ts`, `users.constraints.test.ts` y `prisma.test.ts`). Modificados: `package.json` (scripts `db:*` y *override* de `effect`), `package-lock.json`, `backend/package.json`, `backend/tsconfig.json`, `backend/vitest.config.ts`, `backend/.env.example`, `.gitignore`, `eslint.config.js`, `.github/workflows/ci.yml`, `CLAUDE.md` (nueva sección 8), `readme.md` (0.3, 1.4, 2, 2.3, 2.4, 2.6, 3.1, 3.2, 6 y 7) y `prompts.md` (este registro y el mapa).

Texto literal del prompt (Fase A):

```text
# DEV-002 — Persistencia de usuarios
## Fase A: Análisis técnico y propuesta de implementación

### Rol

Actúa como **Senior Backend Developer especializado en PostgreSQL, Prisma, TypeScript y migraciones de bases de datos** para el proyecto Cali Coach.

Debes respetar las instrucciones del archivo `CLAUDE.md`, la arquitectura aprobada y las decisiones de producto documentadas.

Tu responsabilidad en esta fase es investigar, identificar riesgos y preparar un plan de implementación verificable.

**No implementes código hasta recibir aprobación explícita.**

## 1. Contexto

**Proyecto:** Cali Coach
**Repositorio:** `GeraGalindo/AI4Devs-finalproject`
**Rama base:** `main`
**Ticket:** DEV-002 — Persistencia de usuarios

DEV-001 está terminado y fusionado en `main`.

La infraestructura existente incluye:

- Frontend React + TypeScript + Vite.
- Backend Express + TypeScript.
- PostgreSQL 17 mediante Docker Compose.
- npm workspaces.
- Vitest, Supertest, React Testing Library y Playwright.
- GitHub Actions para lint, typecheck, tests, integración y build.
- `CLAUDE.md` como harness inicial.

El objetivo de DEV-002 es introducir la persistencia de usuarios conforme al alcance exacto del ticket y la arquitectura aprobada.

## 2. Fase A — Inspección obligatoria

Antes de proponer cambios:

1. Comprueba la rama actual, el estado del repositorio y su sincronización con `origin/main`.
2. Lee `CLAUDE.md` y las secciones relevantes de `readme.md`.
3. Localiza la definición exacta de DEV-002, sus criterios de aceptación y dependencias.
4. Revisa el modelo de datos aprobado, especialmente la entidad `users`.
5. Identifica las restricciones, índices, tipos de datos y reglas de integridad documentadas.
6. Inspecciona la configuración actual de PostgreSQL, el acceso mediante `pg` y las pruebas de integración existentes.
7. Comprueba si ya existe alguna configuración, esquema o migración de Prisma.
8. Identifica las convenciones de `prompts.md` para registrar el trabajo.

Distingue expresamente entre:

- **[Confirmado]:** definido y aprobado en la documentación.
- **[Propuesto]:** solución técnica todavía no aprobada.
- **[Pendiente]:** información ausente o que requiere decisión.

No inventes columnas, restricciones, índices ni relaciones.

## 3. Análisis del modelo de usuarios

A partir de la documentación aprobada, presenta una tabla con:

- Nombre exacto de cada columna.
- Tipo de dato propuesto en PostgreSQL.
- Representación correspondiente en Prisma.
- Nulabilidad.
- Valor por defecto, si aplica.
- Restricciones e índices.
- Justificación y referencia documental.

Analiza específicamente:

- Identificador primario.
- Unicidad y normalización del correo electrónico.
- Almacenamiento seguro de credenciales, si corresponde al ticket.
- Campos obligatorios y opcionales.
- Fechas de creación y actualización.
- Restricciones `CHECK`, `UNIQUE` y `NOT NULL`.
- Posibles dependencias con tablas futuras.

Si algún campo o regla no está documentado, identifícalo como decisión pendiente en lugar de asumirlo.

## 4. Estrategia de Prisma y migraciones

Propón cómo incorporar Prisma al backend existente.

Incluye:

1. Dependencias necesarias y versiones compatibles.
2. Ubicación del esquema Prisma.
3. Configuración de `DATABASE_URL`.
4. Generación y uso de Prisma Client.
5. Estrategia de migraciones versionadas.
6. Comandos para crear, aplicar y verificar migraciones.
7. Procedimiento para reconstruir una base de datos de desarrollo desde cero.
8. Estrategia para conservar las restricciones SQL que Prisma no pueda representar directamente.
9. Procedimiento para detectar diferencias entre el esquema esperado y el real.

**No utilices `prisma db push` como sustituto de las migraciones versionadas.**

No modifiques todavía la base de datos.

## 5. Integración con la arquitectura existente

Analiza cómo incorporar Prisma sin romper DEV-001.

Explica:

- Cómo convivirá Prisma con el pool `pg` existente.
- Qué responsabilidades tendrá cada mecanismo de acceso a datos.
- Cómo se gestionarán las conexiones y el cierre ordenado.
- Qué cambios serían necesarios en los scripts del backend.
- Qué modificaciones necesitaría GitHub Actions para aplicar migraciones antes de las pruebas.
- Qué elementos pertenecen a DEV-002 y cuáles deben reservarse para tickets posteriores.

No implementes todavía endpoints de registro, login ni autenticación.

## 6. Estrategia de pruebas

Diseña pruebas que verifiquen el comportamiento real de PostgreSQL, no solamente los modelos de Prisma.

Considera:

- Aplicación correcta de la migración en una base limpia.
- Existencia de la tabla y sus columnas.
- Tipos de datos y nulabilidad.
- Restricciones `UNIQUE`, `NOT NULL` y `CHECK` aprobadas.
- Inserción de registros válidos.
- Rechazo de registros inválidos.
- Funcionamiento de Prisma Client.
- Compatibilidad con el endpoint `/api/health`.
- Ejecución de las pruebas en GitHub Actions.
- Aislamiento y limpieza de datos entre pruebas.

Distingue entre pruebas unitarias, de integración y verificaciones de migración.

Para cada prueba, indica qué evidencia demostraría que el criterio se cumple.

## 7. Seguridad y privacidad

Analiza los riesgos relevantes:

- Almacenamiento de contraseñas.
- Exposición de datos personales en logs.
- Manejo de errores de base de datos.
- Gestión de credenciales y secretos.
- Acceso a datos mediante consultas parametrizadas.
- Privilegios de la cuenta de PostgreSQL.
- Tratamiento de información sensible en datos de prueba.

No implementes autenticación ni decisiones de seguridad que correspondan a otros tickets.

## 8. Harness y trazabilidad

Revisa si `CLAUDE.md` contiene instrucciones suficientes para desarrollar y verificar migraciones.

Identifica si conviene incorporar alguna instrucción adicional.

Evalúa también si este ticket justifica crear una skill reutilizable para migraciones PostgreSQL/Prisma.

Si propones una skill, explica:

- Qué problema repetitivo resolvería.
- Cuándo debería utilizarse.
- Qué comprobaciones obligatorias incluiría.
- Qué ventajas tendría frente a instrucciones generales en `CLAUDE.md`.

No crees la skill todavía.

## 9. Entregable obligatorio — Plan de implementación

Presenta tu análisis con la siguiente estructura:

1. Estado actual del repositorio.
2. Alcance exacto y criterios de aceptación de DEV-002.
3. Modelo `users` documentado.
4. Propuesta de esquema PostgreSQL y Prisma.
5. Estrategia de migraciones.
6. Integración con backend y CI existentes.
7. Plan de pruebas y validaciones.
8. Seguridad y riesgos.
9. Evaluación de posibles mejoras del harness.
10. Archivos que crearías o modificarías.
11. Dependencias con otros tickets.
12. Decisiones que requieren aprobación del Product Owner.

Para cada decisión pendiente, utiliza un identificador D1, D2, D3, etc., e incluye:

- Problema o decisión.
- Opciones posibles.
- Ventajas y riesgos.
- Recomendación técnica.
- Impacto en el MVP.

No presentes una recomendación como si ya estuviera aprobada.

## 10. Restricciones

- No modificar archivos.
- No instalar dependencias.
- No crear ramas.
- No generar migraciones.
- No ejecutar comandos que alteren datos o el esquema.
- No realizar commits, push ni Pull Requests.
- No implementar endpoints ni funcionalidades de negocio.
- No ampliar el alcance de DEV-002.
- No modificar `CLAUDE.md` ni `prompts.md` durante esta fase.

Puedes ejecutar comandos de inspección y consultas de solo lectura.

## Instrucción inmediata

**Ejecuta únicamente la Fase A.**

Inspecciona el repositorio, identifica el contrato de datos real y presenta el plan de implementación de DEV-002.

Detente después de presentar el análisis y espera mi aprobación explícita antes de comenzar la Fase B.
```

Texto literal de la primera aprobación (antes de B1):

```text
He revisado tu análisis de DEV-002 y apruebo el plan con las siguientes decisiones y condiciones.

### Decisiones D1–D7

- **D1 — Aprobada con condición:** conservar `available_weekdays` nullable en PostgreSQL. Antes de completar la implementación, verifica experimentalmente la compatibilidad de Prisma con valores NULL en arrays PostgreSQL. No cambies el contrato a NOT NULL ni utilices valores sustitutos sin aprobación.
- **D2 — Aprobada:** utilizar `@updatedAt` y documentar que las actualizaciones mediante SQL directo deberán gestionar explícitamente `updated_at`.
- **D3 — Aprobada:** crear la factory `createPrisma(pool)` y sus pruebas. No integrarla todavía en las rutas de la aplicación.
- **D4 — Aprobada con condiciones:** utilizar una base `calicoach_test` separada, con `TEST_DATABASE_URL`. El setup debe impedir que operaciones destructivas afecten a la base de desarrollo. Verifica también que el aislamiento funciona en CI.
- **D5 — Aprobada:** utilizar nombres explícitos para las restricciones SQL manuales.
- **D6 — Aprobada:** añadir reglas de migraciones a `CLAUDE.md`. Crear la skill reutilizable después de validar el procedimiento en DEV-002.
- **D7 — Aprobada:** utilizar `feature/dev-002-users-persistence` desde `main` actualizado.

### Condiciones adicionales

1. Confirma las versiones y compatibilidad de Prisma, Prisma Client y `@prisma/adapter-pg`.
2. No utilices `prisma db push` para gestionar el esquema.
3. Conserva las migraciones versionadas y el SQL manual.
4. Verifica las restricciones directamente en PostgreSQL, incluyendo su existencia en `pg_constraint`.
5. Ejecuta pruebas de migración desde cero únicamente sobre una base desechable.
6. Conserva el comportamiento de `/api/health` y todas las pruebas de DEV-001.
7. No implementes registro, login, hashing ni funcionalidades de otros tickets.
8. Registra el trabajo como Prompt 20 siguiendo las convenciones existentes, sin modificar los Prompts 17 y 18.

### Secuencia de implementación

**Etapa B1 — Validación técnica**

Prepara un experimento aislado y reproducible para comprobar la representación y lectura de `available_weekdays = NULL` con Prisma 7.

Comprueba también el diseño de aislamiento de las pruebas.

Presenta los resultados y cualquier limitación antes de continuar.

**Detente después de B1 si existe una incompatibilidad, una modificación necesaria del contrato o un riesgo no resuelto. Solicita mi aprobación antes de decidir una alternativa.**

**Etapa B2 — Implementación**

Si B1 confirma que el diseño aprobado es viable, implementa el esquema, las migraciones, las restricciones, la factory de Prisma, las pruebas y los cambios de CI.

**Etapa B3 — Validación**

Ejecuta lint, typecheck, pruebas unitarias, integración real, verificaciones de migración, comprobación de restricciones y build.

Presenta evidencias y criterios de aceptación.

No hagas commit, push ni crees un Pull Request sin mi autorización explícita.

### Instrucción inmediata

Comienza con la Etapa B1. No continúes a B2 si la compatibilidad de Prisma o el aislamiento de las pruebas no están resueltos.
```

Texto literal de la segunda aprobación (resultados de B1 y autorización de B2):

```text
# DEV-002 — Aprobación de decisiones B1 y autorización condicionada de B2

He revisado los resultados de la Etapa B1 y apruebo las siguientes decisiones.

## D1 — available_weekdays

Apruebo la opción A:

- Mantener `available_weekdays` nullable en PostgreSQL.
- Conservar el CHECK de cardinalidad y rango.
- Documentar que Prisma 7 devuelve `[]` cuando PostgreSQL contiene NULL.
- Añadir una prueba de integración que detecte cambios en este comportamiento.
- Establecer que los futuros repositorios de usuarios deberán convertir `[]` en `null` antes de devolver datos al dominio o la API.
- No implementar todavía los repositorios de DEV-004 o DEV-005.
- No modificar el contrato de datos aprobado.

## Seguridad de dependencias

Autorizo evaluar el override de `effect`, pero su incorporación queda condicionada a la validación.

Antes de aplicarlo:

1. Verifica la versión corregida utilizando la información de la advisory de seguridad y el árbol real de dependencias.
2. Confirma que el override es compatible con Prisma 7.10.1.
3. Comprueba que elimina las vulnerabilidades reportadas sin introducir otras nuevas.
4. Ejecuta las operaciones relevantes de Prisma: generate, migrate deploy, migrate status y migrate diff.
5. Documenta el resultado y la justificación.

Si no se confirma la compatibilidad o la corrección de la vulnerabilidad, detente y presenta alternativas. No aceptes automáticamente vulnerabilidades altas ni cambies a Prisma 6 sin autorización.

## UNIQUE de email

Apruebo verificar el índice único mediante `pg_index`.

La prueba debe comprobar:

- Nombre y existencia del índice.
- Que realmente es único.
- Que un segundo registro con el mismo email se rechaza.
- Que el error corresponde a SQLSTATE 23505.

## Autorización de implementación B2

Puedes continuar con la implementación de DEV-002 en la rama `feature/dev-002-users-persistence`, respetando el plan aprobado y las salvaguardas de aislamiento de pruebas.

Implementa:

- Prisma y su configuración.
- Modelo `users` conforme al contrato aprobado.
- Migración versionada con SQL manual.
- Factory de Prisma compartiendo el pool existente.
- Base de pruebas independiente y protegida.
- Tests de esquema, restricciones y comportamiento de Prisma.
- Scripts de migraciones y validaciones.
- Integración de migraciones y pruebas en CI.
- Reglas de migración en `CLAUDE.md`.
- Documentación y Prompt 20.

No implementes endpoints de registro, login, hashing ni otros tickets.

## Validación B3

Cuando termines, ejecuta las verificaciones acordadas, incluyendo:

- Lint, typecheck y build.
- Pruebas existentes de DEV-001.
- Pruebas nuevas de DEV-002 contra PostgreSQL real.
- Migración reproducible desde una base desechable.
- Verificación de CHECK mediante `pg_constraint`.
- Verificación de UNIQUE mediante `pg_index`.
- Verificación de drift, sin considerarla sustituto de las pruebas de restricciones.
- Comprobación de aislamiento entre desarrollo y pruebas.
- Auditoría de dependencias.

Presenta el resultado, los archivos modificados, los criterios de aceptación y cualquier desviación del plan.

**No hagas commit, push ni crees un PR hasta que revise los resultados y lo autorice expresamente.**

Si aparece un problema que requiera cambiar el contrato de datos, introducir una vulnerabilidad conocida o ampliar el alcance, detente y consúltame.
```

**Decisiones humanas:**
- **Primera aprobación (D1–D7):**
  - D1, con condición: `available_weekdays` sigue nullable y había que comprobar con un experimento cómo trata Prisma los `NULL`, sin pasar a NOT NULL ni usar valores sustitutos sin aprobación;
  - D2 (`@updatedAt`), D3 (`createPrisma(pool)` sin conectarla a las rutas), D5 (nombres explícitos), D6 (reglas en `CLAUDE.md`, *skill* después) y D7 (rama `feature/dev-002-users-persistence`) aprobadas;
  - D4, con condiciones: base `calicoach_test` con `TEST_DATABASE_URL`, protegida frente a la de desarrollo, también en CI;
  - secuencia B1 → parada → B2 → B3, y las condiciones adicionales 1–8.
- **Segunda aprobación (tras B1):**
  - D1: opción A. Prisma lee `NULL` como `[]`; se documenta, se vigila con una prueba y los futuros repositorios convertirán `[]` en `null`. Rechazadas, de momento, la lectura con SQL directo (B) y el cambio de contrato (C);
  - seguridad: evaluar el *override* de `effect`, aplicándolo solo si se comprueban la versión corregida, la compatibilidad con Prisma 7.10.1 y la desaparición de las vulnerabilidades; sin aceptar vulnerabilidades altas ni pasar a Prisma 6;
  - UNIQUE de `email`: comprobarlo en `pg_index` (nombre, unicidad, rechazo del duplicado y SQLSTATE `23505`).

**Resultado generado por la IA:**
- **Fase A:** plan con la tabla de columnas, la estrategia de migraciones sin `db push`, la integración con el pool de `pg`, las pruebas y las decisiones D1–D7. Detectó la duda de cómo trata Prisma 7 los *arrays* `NULL` y la necesidad de aislar las pruebas destructivas de la base de desarrollo.
- **Etapa B1** (experimento aislado en bases desechables, fuera del repositorio):
  - versiones: `prisma`, `@prisma/client` y `@prisma/adapter-pg` 7.10.1, compatibles con Node 24.13 y `pg` 8.23.1. La etiqueta `latest` de `prisma` apuntaba a una 8.0.0-rc, así que la versión se fija a mano;
  - PostgreSQL guarda `NULL`, pero Prisma lo devuelve como `[]`, no permite filtrar por `null` y no permite escribir `null`;
  - el UNIQUE de `email` es un índice único (`pg_index`), no una restricción de `pg_constraint`;
  - prototipo de las salvaguardas de la base de pruebas: rechazó todos los casos inseguros;
  - `npm audit`: 3 vulnerabilidades altas nuevas (GHSA-7589-6fvf-x4pw en `effect`, solo en el CLI de Prisma);
  - la IA se detuvo y pidió decisión sobre los tres puntos.
- **Etapa B2:**
  - esquema `users` y migración generada con `migrate dev --create-only` sobre una base desechable, con el bloque de SQL manual de los tres `CHECK` con nombre;
  - `prisma.config.ts` que funciona sin `DATABASE_URL` para `generate` (necesario en el `postinstall` de `npm ci`);
  - `createPrisma(pool)` sobre el pool existente;
  - salvaguardas (`TEST_DATABASE_URL` con sufijo `_test`, distinta de `DATABASE_URL`; `TRUNCATE` solo si `current_database()` termina en `_test`) y un `globalSetup` que crea y migra la base de pruebas;
  - 34 pruebas nuevas de integración (salvaguardas, catálogo, restricciones con SQLSTATE, Prisma y el canario de `NULL` → `[]`);
  - CI: migraciones, estado, *drift*, rechazo de la base de desarrollo como base de pruebas y fila centinela;
  - sección 8 de `CLAUDE.md` y documentación del README.
- **Correcciones durante la implementación:**
  - npm no aplicaba el *override* sobre la entrada ya existente del *lockfile*, y al borrarla eliminó `effect` sin avisar (un "0 vulnerabilidades" engañoso). Regenerar el *lockfile* entero habría cambiado 15 dependencias transitivas (entre ellas `vite`), así que solo se sustituyó la entrada de `effect` por la que resuelve npm con el *override* (3.22.1, *integrity* comprobada en el registro). El resto del *lockfile* no cambió de versión;
  - con `env('DATABASE_URL')`, `prisma generate` fallaba sin `.env`; el *datasource* se omite cuando falta la variable;
  - la consulta de `pg_index` devolvía `name[]` como texto; se convierte a `text[]`;
  - la comprobación de CI "base de desarrollo intacta" contaba 0 filas, lo que no detectaría un `TRUNCATE`; se cambió por una fila centinela.
- **Validación (local, 2026-11-26; detalle en el README, 2.6):**
  - `npm ci` desde cero, `lint`, `typecheck` y `build`, sin errores;
  - `npm test`: 5/5 del backend y 5/5 del frontend (DEV-001, sin cambios);
  - `npm run test:integration`: 36/36 (2 de DEV-001 y 34 nuevas), en `calicoach_test`;
  - `npm run test:e2e`: 1/1;
  - migración desde cero en una base desechable, idempotente, con `migrate status` al día y *drift* 0; `CHECK` en `pg_constraint` y `users_email_key` en `pg_index`;
  - aislamiento comprobado con una fila centinela en una base "de desarrollo" desechable; la base local `calicoach` no se modificó;
  - `npm audit`: 0 vulnerabilidades con el *override*;
  - **la ejecución en GitHub Actions estaba pendiente del PR** cuando se cerró B3. Ahora está en verde: ver la revisión humana.

**Revisión humana:**
- **Fase A:** el autor aprobó el plan con condiciones en D1 y D4 y añadió la secuencia B1 → B2 → B3 con parada obligatoria.
- **Etapa B1:** el autor revisó los resultados y decidió la opción A para D1, el *override* condicionado de `effect` y la comprobación del UNIQUE en `pg_index`.
- **Etapas B2 y B3:** el autor aprobó **provisionalmente** la implementación y las pruebas, y pidió antes del commit una revisión de reproducibilidad y trazabilidad: el `invalid` de `npm ls`, el *lockfile*, la ubicación del Prompt 20 y el diff final.
  - **Resultado de esa revisión (IA):** npm con *workspaces* ignora el *override* si existe un *lockfile*, así que la entrada de `effect` se ajustó a mano; `npm ci` es reproducible; `npm ls` marca `invalid` aunque `npm ci`, `npm audit` y Prisma funcionan; no hay versión de `effect` corregida dentro del rango exacto que declara `@prisma/config`. Alternativas: A (mantener el *override* y auditar en CI), B (regenerar el *lockfile* entero) y C (Prisma `7.11.0-dev.4`).
  - **Decisión del autor:** alternativa **A**. Mantener Prisma 7.10.1 y `effect` 3.22.1 con el *override* y el *lockfile* validado, sin regenerarlo ni usar versiones de desarrollo; añadir `npm audit --audit-level=high` a GitHub Actions; documentar el ajuste manual del *lockfile* y el `invalid` de `npm ls` (README, 2.6); y retirar el *override* en un ticket de mantenimiento cuando una versión estable de Prisma incorpore la corrección.
  - **Limitaciones conocidas del *override*:** el *lockfile* no se puede reproducir solo con comandos de npm sin regenerarlo entero, `npm ls` termina con código 1 y npm no hace cumplir el *override* (lo que fija la versión es el *lockfile*). La auditoría de la CI detecta una vuelta a una versión vulnerable.
  - El autor autorizó después el commit, el push y el PR, sin merge.
- **Aprobación final:** el autor revisó los resultados del PR #5, aprobó DEV-002 y autorizó el merge. Antes del merge se comprobó que el PR apuntaba a `main`, que el commit era el revisado (`0adbbdc`) y que la CI seguía en verde. El merge se hizo con `--match-head-commit` (`44e228f`).
- **CI en GitHub Actions** (sección 7 del README):
  - ejecución `pull_request` 45876701111, en verde: auditoría sin vulnerabilidades altas, migraciones, *drift*, salvaguarda, integración 36/36 y fila centinela intacta;
  - ejecución `push` a `main` 45877301836, en verde, tras el merge.
- **Cierre:** DEV-002 queda **terminado**. El *override* de `effect` se mantiene hasta un ticket de mantenimiento. DEV-003 y DEV-004 no se han empezado.

---

### 4. Especificación de la API

> Los dos prompts de esta sección definieron y revisaron el contrato REST. El Prompt 2 modificó también la sección 2 de `readme.md` (2.2, 2.5 y 2.6) para alinearla con el contrato. Se documenta solo aquí, porque los huecos de la sección 2 ya están ocupados por los prompts 03–05. El Prompt 3 es el Prompt 21 (DEV-003), que implementa las convenciones comunes del contrato.

**Prompt 1:**

*Prompt 08 — Diseño del contrato REST del MVP*

- **Herramienta:** Claude Code (modelo `claude-opus-5-5`), en la misma sesión que los prompts de las secciones 1–3.
- **Objetivo:** especificar la API del MVP a partir de las secciones 1, 2 y 3.
- **Archivo afectado:** `readme.md` (sección 4).

Texto literal del prompt:

```text
Actúa como arquitecto backend senior especializado en APIs REST, Node.js, Express, TypeScript y PostgreSQL.

Estamos desarrollando Cali Coach, una aplicación web mobile-first para practicantes intermedios de calistenia, como proyecto final de AI4Devs.

## Objetivo

Diseñar la sección 4, «Especificación de la API», de `readme.md`, utilizando como fuente de verdad las secciones 1, 2 y 3 existentes.

Antes de editar:
1. Lee íntegramente las secciones 1, 2 y 3.
2. Revisa los encabezados y las instrucciones de la sección 4 de la plantilla oficial.
3. No inventes decisiones del Product Owner.

## Contrato REST

Documenta los endpoints necesarios para el MVP, agrupados por responsabilidad:

- Autenticación: registro, inicio de sesión, sesión actual y cierre de sesión.
- Perfil: consulta y actualización de disponibilidad semanal y zona horaria.
- Catálogo: listado y detalle de programas, plantillas y ejercicios prescritos.
- Inscripciones: activación de programa, consulta de inscripción activa e historial.
- Sesiones: calendario, sesión de hoy, detalle de sesión y finalización explícita.
- Registros: creación, edición y eliminación de series realizadas.
- Progreso: resumen por inscripción, estados y desempeño por ejercicio.

Para cada endpoint incluye:
- Método HTTP y ruta.
- Propósito.
- Autenticación y autorización.
- Parámetros de ruta y consulta.
- Cuerpo de petición cuando corresponda.
- Respuesta exitosa y código HTTP.
- Errores relevantes.
- Reglas de negocio y validaciones.

Incluye ejemplos JSON representativos, sin introducir atributos inexistentes en el modelo de datos.

## Reglas obligatorias

1. Mantén los estados `planned`, `completed`, `partial` y `skipped`.
2. Registrar series no completa automáticamente una sesión.
3. `completed` requiere finalización explícita.
4. El cierre automático produce `partial` si existen registros y `skipped` si no existen.
5. Los estados finales son inmutables en el MVP.
6. Solo se pueden modificar registros de una sesión `planned` programada para el día local actual del usuario.
7. Las fechas futuras no se reprograman por sesiones omitidas.
8. Una inscripción activa por usuario es un supuesto provisional pendiente de ratificación.
9. Todas las operaciones sobre sesiones y registros deben respetar el protocolo transaccional de la sección 2.
10. Los registros deben corresponder a una prescripción de la plantilla y semana correctas.

## Seguridad

Documenta el contrato de autenticación con JWT en cookies `HttpOnly`, `Secure` y `SameSite=Lax`, respetando la propuesta de la sección 2.

Incluye:
- Protección CSRF y validación de `Origin`.
- Comportamiento para solicitudes sin `Origin`.
- Autorización por propietario.
- Validación de entradas.
- Tratamiento de cookies en desarrollo y producción.
- Respuestas que no revelen información de otros usuarios.

## Errores e idempotencia

Define una estructura JSON uniforme para los errores.

Distingue correctamente:
- `400`: solicitud mal formada.
- `401`: no autenticado.
- `403`: operación prohibida, cuando corresponda.
- `404`: recurso inexistente o no visible para el usuario.
- `409`: conflicto de estado o unicidad.
- `422`: solicitud válida sintácticamente, pero incompatible con reglas de negocio.
- `429`: límite de solicitudes.

Define una política explícita para reintentos de creación de series y activación de programas. No confundas restricciones UNIQUE con idempotencia HTTP.

No agregues nuevas tablas ni columnas sin identificarlo como decisión pendiente para el modelo de datos.

## Pruebas propuestas

Incluye una matriz de pruebas de contrato y seguridad para:
- Autenticación y CSRF.
- Acceso cruzado entre usuarios.
- Activaciones concurrentes.
- Doble envío de registros.
- Finalización explícita.
- Registro y cierre concurrentes.
- Prescripciones de otra plantilla o semana.
- Reconciliación según zona horaria.
- Errores HTTP y formato de respuesta.

Estas pruebas deben quedar documentadas como propuestas, no como ejecutadas.

## Restricciones

- Modifica exclusivamente la sección 4 de `readme.md`.
- No modifiques las secciones 0–3 ni 5–7.
- No modifiques `prompts.md`.
- No generes código, migraciones ni pruebas ejecutables.
- No ejecutes comandos de instalación.
- No crees commits.
- Conserva los encabezados oficiales de la plantilla.

## Entregable

1. Resumen de endpoints.
2. Decisiones propuestas y pendientes.
3. Ejemplos de peticiones y respuestas.
4. Matriz de errores y pruebas.
5. Riesgos o inconsistencias detectadas respecto a las secciones 1–3.
6. Resultado de `git diff --check`.
7. Resultado de `git diff --stat`.
8. Confirmación de archivos y secciones modificados.

No continúes con la sección 5.
```

**Decisiones humanas** aportadas en el prompt:
- Los grupos de endpoints del MVP y la información obligatoria de cada uno.
- Las diez reglas obligatorias, entre ellas un único programa activo como supuesto provisional y que cada registro corresponda a la plantilla y la semana de su sesión.
- El contrato de seguridad: JWT en una cookie `HttpOnly`, `Secure` y `SameSite=Lax`, CSRF con `Origin` y autorización por propietario.
- El significado de cada código HTTP de error.
- Exigir una política de reintentos sin confundir `UNIQUE` con idempotencia, y prohibir tablas o columnas nuevas que no se marquen como pendientes.

**Resultado generado por la IA:**
- **Contrato:** 22 endpoints bajo `/api`, con una ficha para cada uno (propósito, parámetros, cuerpo, respuesta, errores y reglas). La plantilla limita OpenAPI a tres endpoints, así que la IA puso en OpenAPI 3.0.3 solo la activación, el registro de una serie y la finalización.
- **Contenido añadido:**
  - convenciones;
  - cookies de desarrollo y producción;
  - orden de los controles por petición;
  - formato de error uniforme;
  - matriz de códigos HTTP;
  - política de reintentos e idempotencia;
  - ejemplos JSON y HTTP;
  - 39 pruebas propuestas (API-01 a API-39);
  - tabla de pendientes;
  - tabla de inconsistencias con las secciones 1–3.
- **Opciones técnicas propuestas por la IA**, que **no** son decisiones del equipo:
  - el criterio entre `409` y `422`;
  - el código `422` para referencias inexistentes en el cuerpo;
  - la cookie `session` sin `Secure` en desarrollo;
  - que el cliente asigne el `setNumber`;
  - `422 SET_NUMBER_OUT_OF_RANGE` provisional;
  - los campos derivados (`slots`, `weeklySequence`, `canLog`, `startDate`, …);
  - aceptar el riesgo de enumeración de cuentas en el registro.
- **Inconsistencias que detectó la IA:**
  - la activación sin reconciliación previa en 2.2;
  - la contradicción de `complete` sobre una sesión ya `completed`;
  - el cambio de contraseña, que 2.5 cita pero no es una funcionalidad del MVP;
  - el prefijo `/api`;
  - la escritura en los `GET`;
  - la cookie distinta en desarrollo.

  No corrigió la sección 2 porque el prompt no lo permitía.
- **Defectos que luego corrigió la revisión humana** (Prompt 2):
  - aceptó la escritura en los `GET` como "coherente con 2.2 y 2.5", sin analizar la semántica de los métodos seguros;
  - el control del tipo de contenido iba antes que el CSRF y no definía las operaciones sin cuerpo;
  - ante un `409`, la política de reintentos se apoyaba en `details.existingSet`, en lugar de en consultar el estado actual;
  - dejó en 2.2 y 2.5 las inconsistencias detectadas sin proponer su corrección.
- **Validación:**
  - el script de comprobación revisó 42 tablas, sin filas con errores de columnas;
  - un parser confirmó que el YAML de OpenAPI y los 9 bloques JSON son sintácticamente válidos;
  - las secciones 0–3 y 5–7 no cambiaron;
  - `git diff --check` salió sin errores. `git diff --stat`: 1950 inserciones acumuladas en `readme.md`;
  - no se generó código y no se ejecutaron pruebas.

**Prompt 2:**

*Prompt 09 — Coherencia entre la arquitectura y el contrato de API*

- **Herramienta:** Claude Code (modelo `claude-opus-5-5`), en la misma sesión.
- **Objetivo:** corregir las inconsistencias entre las secciones 2 y 4 sin añadir funcionalidades.
- **Archivo afectado:** `readme.md` (secciones 2.2, 2.5, 2.6 y 4).

Texto literal del prompt:

```text
Actúa como arquitecto backend senior especializado en REST, PostgreSQL y concurrencia.

Estamos revisando el diseño documental de Cali Coach.

Lee las secciones 2, 3 y 4 de `readme.md` antes de editar. El objetivo es corregir inconsistencias entre la arquitectura y el contrato de API, sin introducir nuevas funcionalidades.

### 1. Activación y reconciliación

- Revisa el flujo de activación de la sección 2.2.
- Asegura que la reconciliación de sesiones vencidas ocurra antes de comprobar si existe un programa activo.
- Conserva la transacción de activación y el índice único parcial.
- Analiza las carreras entre reconciliación, finalización y activación concurrente.
- No afirmes que la reconciliación garantiza automáticamente que una inscripción ha terminado.

### 2. Finalización repetida

- Alinea T-finalizar con el contrato de la sección 4.
- Para una sesión ya `completed`, permite devolver `200` sin modificarla, incluso si la fecha programada ya pasó, siempre después de autorizar al propietario.
- Para una sesión `planned`, conserva la comprobación de que corresponde al día local actual.
- Las sesiones `partial` y `skipped` no pueden finalizarse posteriormente.
- Conserva la finalización explícita como única transición a `completed`.

### 3. Reintentos de series

- Aclara que `setNumber` y UNIQUE evitan duplicados, pero no garantizan idempotencia HTTP.
- Documenta cómo debe actuar el cliente tras un fallo de red o un `409`: consultar el registro actual antes de decidir si reintenta.
- No agregues `Idempotency-Key` ni tablas nuevas.

### 4. Autenticación y CSRF

- Revisa la política de cookies de desarrollo y producción.
- Especifica el tratamiento de operaciones sin cuerpo, especialmente `logout`.
- Conserva la protección CSRF sin exigir un cuerpo JSON donde no sea necesario.
- Identifica las diferencias que deben cubrir las pruebas E2E en desarrollo y producción.

### 5. Reconciliación desde GET

- Evalúa explícitamente la implicación de modificar datos durante una petición GET.
- Distingue entre reconciliación interna idempotente y semántica HTTP de métodos seguros.
- Propón el ajuste mínimo que permita mantener el comportamiento del MVP sin depender de escrituras ocultas en GET, o documenta claramente el compromiso si no puede resolverse sin rediseño.
- No implementes trabajos programados ni nuevos endpoints salvo que sea estrictamente necesario; si los propones, identifícalos como decisiones pendientes.

### Restricciones

- Modifica únicamente las secciones 2 y 4 de `readme.md`, y solo donde sea necesario para corregir estas inconsistencias.
- No modifiques las secciones 0, 1, 3 ni 5–7.
- No modifiques `prompts.md`.
- No cambies el modelo de datos.
- No generes código, migraciones ni pruebas ejecutables.
- No ejecutes pruebas ni crees commits.
- Conserva la plantilla oficial y el máximo de tres endpoints en OpenAPI.

### Entregable

1. Resumen de cambios por sección.
2. Decisiones propuestas y pendientes.
3. Explicación del tratamiento de GET y reconciliación.
4. Riesgos de concurrencia restantes.
5. Resultado de `git diff --check`.
6. Resultado de `git diff --stat`.
7. Confirmación de los archivos y secciones modificados.

No avances a la sección 5.
```

**Revisión y decisiones humanas:**
- El equipo exigió reconciliar antes de comprobar si hay un programa activo, conservando la transacción de activación y el índice parcial, y sin afirmar que la reconciliación termina la inscripción.
- Fijó el comportamiento de la finalización repetida: primero se autoriza al propietario, una sesión `completed` responde `200` aunque su fecha haya pasado, una `planned` debe ser de hoy, y `partial` y `skipped` nunca pueden finalizarse.
- Pidió que, tras un fallo de red o un `409`, el cliente consulte el estado actual antes de reintentar, sin `Idempotency-Key` ni tablas nuevas.
- Pidió definir las operaciones sin cuerpo y las diferencias de las pruebas E2E entre desarrollo y producción.
- Pidió evaluar la escritura en los `GET` frente a la semántica de los métodos seguros, y aceptó que se resolviera documentando el compromiso si no había otra forma sin rediseñar.

**Resultado generado por la IA:**
- **Sección 2.2:**
  - el flujo 1 añade la reconciliación previa en una transacción propia;
  - nueva tabla "Carreras en la activación" con cuatro casos. La garantía de que no haya dos inscripciones activas la da el índice único parcial, y la espera en el índice queda pendiente de verificar con PostgreSQL real;
  - T-finalizar comprueba el estado antes que la fecha;
  - nueva subsección "Reconciliación en peticiones `GET`": distingue idempotencia y método seguro, explica por qué se acepta, sus cinco restricciones, los costes y tres alternativas [Pendiente];
  - la nota sobre la pérdida de conexión durante el `COMMIT` remite a la sección 4.
- **Sección 2.5:** corrige la afirmación de que la cookie de desarrollo funcionaba "igual que en producción".
- **Sección 2.6:** añade dos perfiles E2E, de desarrollo y similar a producción.
- **Sección 4:**
  - lista explícita de los `GET` que reconcilian;
  - fila de cookie para el perfil E2E similar a producción;
  - el CSRF pasa a comprobarse antes que el tipo de contenido;
  - regla para las operaciones sin cuerpo;
  - tabla de diferencias entre desarrollo y producción;
  - política de reintentos basada en consultar `GET /api/sessions/{id}`;
  - pruebas nuevas API-40 a API-45;
  - tablas de pendientes e inconsistencias actualizadas.
- **Decisión de la IA, que el equipo debe validar:** mantener la reconciliación en los `GET` como compromiso documentado del MVP, en lugar de derivar el estado al leer.
- **Validación:**
  - el script de comprobación revisó 46 tablas, sin filas con errores de columnas;
  - el YAML de OpenAPI es válido y sigue teniendo exactamente 3 rutas;
  - las secciones 0 y 5–7 son idénticas a HEAD;
  - `git diff --check` salió sin errores. `git diff --stat`: 2042 inserciones acumuladas en `readme.md`;
  - no se generó código y no se ejecutaron pruebas.

**Prompt 3:**

*Prompt 21 — DEV-003: base del backend (configuración segura, middleware y errores)*

- **Herramienta:** Claude Code (modelo `claude-opus-5-5`), en la misma sesión que DEV-001 y DEV-002.
- **Objetivo:** verificar el merge del PR #6 (cierre de DEV-002), analizar DEV-003 sin modificar archivos y, tras la aprobación de las decisiones D1–D11, implementarlo en cuatro etapas: configuración segura y `Clock`; *middleware*, Zod, CSRF, reglas de contenido, `requestId` y errores; `helmet`, CSP y la SPA; CI, documentación y este registro. Sin autenticación, límite de peticiones ni otros tickets.
- **Archivos afectados:** nuevos `backend/src/domain/clock.ts` y su prueba, `backend/src/shared/http/` (`errors.ts`, `request-id.ts`, `csrf.ts`, `body.ts`, `validate.ts`, `security-headers.ts`, `spa.ts` y `error-handler.ts`), `backend/src/app.contract.test.ts`, `frontend/src/features/diagnostics/DiagnosticsPage.css` y `e2e/tests/spa-build.csp.spec.ts`. Modificados: `e2e/playwright.config.ts` (proyecto `spa-build`), `e2e/tsconfig.json` (tipos DOM), `backend/src/app.ts`, `server.ts`, `shared/config.ts` y su prueba, `modules/health/health.routes.ts`, las dos pruebas de salud (solo para pasar la configuración), `DiagnosticsPage.tsx`, `backend/package.json` (`helmet`, `zod` y `NODE_ENV` en los scripts), `package-lock.json`, `backend/.env.example`, `.github/workflows/ci.yml`, `CLAUDE.md`, `readme.md` (0.3, 1.4, 2.3, 2.5, 2.6, 4, 6 y 7) y `prompts.md` (este registro y el mapa).

Texto literal del prompt (análisis):

```text
# Cali Coach — Verificación del PR #6 y análisis de DEV-003

El Product Owner ya realizó manualmente el merge del PR #6 en GitHub:

https://github.com/GeraGalindo/AI4Devs-finalproject/pull/6

**No debes intentar hacer nuevamente el merge.**

## Fase 1 — Verificación y sincronización

1. Confirma que el PR #6 aparece como MERGED en GitHub.
2. Identifica el merge commit y verifica que incluye el commit aprobado `574e73e`.
3. Ejecuta `git fetch origin` y actualiza la rama local `main` mediante fast-forward, sin sobrescribir cambios locales.
4. Confirma que `main` coincide con `origin/main`.
5. Verifica que el árbol de trabajo está limpio.
6. Comprueba el resultado de GitHub Actions sobre `main` después del merge.
7. Confirma que DEV-002 está completamente cerrado, incluyendo su documentación.

Si encuentras conflictos, cambios inesperados o una CI fallida, detente y consulta antes de continuar.

## Fase 2 — Análisis técnico de DEV-003 (solo lectura)

Una vez confirmado el merge y la CI de `main`, comienza exclusivamente el análisis de DEV-003.

Consulta el backlog y la arquitectura existentes para identificar:

- Alcance y criterios de aceptación exactos de DEV-003.
- Dependencias con DEV-001 y DEV-002.
- Estado actual del backend Express.
- Requisitos de seguridad, manejo de errores y configuración.
- Archivos que sería necesario modificar.
- Pruebas necesarias y riesgos de regresión.
- Decisiones técnicas que requieren aprobación del Product Owner.
- Propuesta de implementación por etapas.

Prioriza mantener el alcance del ticket y reutilizar las convenciones del proyecto.

## Restricciones

- No implementes DEV-003 todavía.
- No modifiques archivos durante el análisis.
- No crees una rama de implementación sin autorización.
- No comiences DEV-004.
- No hagas commits ni crees Pull Requests.
- No ejecutes operaciones destructivas sobre las bases de datos.

## Entregable

Presenta:

1. Estado del PR #6 y hash del merge.
2. Hash actualizado de `main` y resultado de su CI.
3. Confirmación del cierre de DEV-002.
4. Informe de análisis técnico de DEV-003.
5. Decisiones que requieren aprobación antes de implementar.

Detente después del informe y espera mi revisión.
```

Texto literal de la aprobación (implementación):

```text
# Cali Coach — DEV-003: aprobación de decisiones e implementación

He revisado tu análisis técnico de DEV-003.

Apruebo continuar con la implementación de **DEV-003 — Seguridad y manejo de errores del backend**, con las decisiones y condiciones siguientes.

## Decisiones D1–D11

- **D1:** aprobar helmet 8.3.0 y zod 4.6.7, fijados a versiones exactas y sujetos a npm audit. No añadir cors.
- **D2:** aprobar APP_ORIGIN obligatorio fuera de development/test. En producción debe ser HTTPS y representar un origen válido, sin ruta ni credenciales. En development/test puede usarse http://localhost:5173 por defecto.
- **D3:** aprobar configuración de cookie según entorno: session en development/test y __Host-session con Secure en producción. Rechazar cualquier override inseguro fuera de development/test. No emitir todavía cookies.
- **D4:** NODE_ENV obligatorio, limitado a development, test y production. Actualizar explícitamente scripts, tests y CI.
- **D5:** implementar Clock mediante inyección programática. No añadir CLOCK_FIXED_NOW ni endpoints de control del reloj.
- **D6:** inyectar rutas de prueba exclusivamente desde los tests. Cubrir API-01–05 y posponer API-06 a DEV-004.
- **D7:** limitar cuerpos JSON a 16 KB y responder 413 cuando corresponda.
- **D8:** utilizar CSP estricta, sin unsafe-inline para estilos. Mover los estilos inline de la vista de diagnóstico a CSS. Desactivar HSTS y upgrade-insecure-requests en development/test. Verificar que la SPA funciona con la CSP aplicada.
- **D9:** servir frontend/dist si existe y devolver index.html para rutas GET de la SPA, sin interceptar /api ni ocultar errores de recursos estáticos.
- **D10:** generar siempre un UUID nuevo como X-Request-Id, ignorando cualquier valor proporcionado por el cliente.
- **D11:** posponer trust proxy a DEV-036. Mantenerlo desactivado y no introducir variables adicionales en DEV-003.

## Condiciones de seguridad

1. Mantener el contrato de errores `{ error: { code, message, requestId } }`, con details cuando corresponda.
2. No exponer trazas, SQL ni información sensible en respuestas de producción.
3. Aplicar los controles CSRF y de contenido en el orden establecido en el contrato.
4. Verificar que las peticiones con Origin inválido y JSON malformado reciben el rechazo CSRF previsto.
5. Verificar el comportamiento de peticiones sin cuerpo, con cuerpo inesperado, JSON malformado y contenido demasiado grande.
6. Comprobar que todas las respuestas de API, incluidos errores y /api/health, tienen un requestId coherente con la cabecera.
7. No relajar los controles para hacer pasar las pruebas.
8. Preservar el aislamiento de bases de datos establecido en DEV-002.

## Implementación autorizada

Puedes crear la rama:

`feature/dev-003-backend-foundation`

Desde `main` en `fc95091`, después de comprobar que continúa sincronizada con origin/main.

Implementa las cuatro etapas propuestas:

1. Configuración segura y Clock.
2. Middleware, validación Zod, CSRF, reglas de contenido, requestId y errores.
3. Helmet, CSP y servicio de SPA.
4. CI, documentación y Prompt 21.

Registra también el PR #6 en la sección 7 del README, como parte de la actualización documental de DEV-003.

No alteres los Prompts 17 y 18.

## Validación

Ejecuta:

- Lint, typecheck y build.
- Pruebas unitarias de configuración y Clock.
- Pruebas API-01–05 y API-36–38.
- Pruebas de precedencia de errores y seguridad.
- Regresión de DEV-001 y DEV-002.
- Integración con PostgreSQL real.
- E2E smoke.
- npm audit --audit-level=high.
- git diff --check.

Si aparecen incompatibilidades que exijan cambiar contratos, reducir controles de seguridad o ampliar el alcance, detente y consulta.

## Entregable

Al terminar presenta:

1. Archivos creados y modificados.
2. Decisiones implementadas.
3. Resultados de pruebas y criterios de aceptación.
4. Riesgos o limitaciones restantes.
5. Resumen del diff.
6. Estado de Git.

**No hagas commit, push ni crees un PR todavía.**

Espera mi revisión y autorización antes de publicar.
```

**Decisiones humanas** (respuesta del autor a las decisiones D1–D11 que planteó la IA en el análisis):
- **D1:** `helmet` 8.3.0 y `zod` 4.6.7 con versión exacta y sujetos a `npm audit`; sin `cors`.
- **D2:** `APP_ORIGIN` obligatorio fuera de `development`/`test`; en producción, `https` y un origen válido sin ruta ni credenciales; `http://localhost:5173` por defecto en `development`/`test`.
- **D3:** cookie `session` en `development`/`test` y `__Host-session` con `Secure` en producción, rechazando cualquier valor inseguro fuera de `development`/`test`; sin emitir cookies todavía.
- **D4:** `NODE_ENV` obligatorio y limitado a `development`, `test` y `production`, actualizando scripts, pruebas y CI.
- **D5, con modificación:** `Clock` solo por inyección programática. La IA había propuesto además, como opción, una variable `CLOCK_FIXED_NOW`; el autor la descartó, igual que los endpoints de control del reloj.
- **D6:** rutas de prueba inyectadas solo desde los tests; API-01–05 en DEV-003 y API-06 en DEV-004.
- **D7:** 16 KB como máximo y `413`.
- **D8:** de las dos opciones planteadas, la CSP estricta sin `'unsafe-inline'`, moviendo los estilos de la vista de diagnóstico a CSS; sin HSTS ni `upgrade-insecure-requests` en `development`/`test`, y comprobando la SPA con la CSP aplicada.
- **D9:** servir `frontend/dist` con *fallback* a `index.html`, sin interceptar `/api` ni ocultar errores de recursos estáticos.
- **D10:** `X-Request-Id` siempre nuevo, ignorando el del cliente.
- **D11:** `trust proxy` pospuesto a DEV-036, sin variables nuevas.
- Condiciones adicionales: mantener el contrato de errores, no exponer trazas ni SQL, respetar el orden de los controles, verificar la precedencia (un `Origin` inválido con JSON mal formado recibe `403`), comprobar el `requestId` en todas las respuestas, no relajar controles para pasar pruebas, preservar el aislamiento de DEV-002 y registrar el PR #6 en la sección 7.

**Resultado generado por la IA:**
- **Verificación del PR #6:** fusionado manualmente por el autor (`fc95091`, que incluye `574e73e`), `main` sincronizada por *fast-forward* y CI de `main` en verde. Detectó que el PR #6 faltaba en la sección 7.
- **Análisis:** alcance y criterios de DEV-003; frontera con DEV-004 (límite de peticiones, autenticación y JWT); el riesgo de que `NODE_ENV` tomara `development` por defecto, lo que habría activado la cookie relajada en un despliegue mal configurado; el `requestId` pendiente en `/api/health`; los estilos en línea de la vista de diagnóstico frente a la CSP; y once decisiones.
- **Etapa 1:** `loadConfig` con `NODE_ENV` obligatorio, `APP_ORIGIN` validado y normalizado, configuración de la cookie y arranque seguro; `domain/clock.ts` con `systemClock` y `fixedClock`.
- **Etapa 2:** `requestId`, CSRF, `jsonBody` y `noBody` (incluidos los cuerpos por fragmentos), `validate` con Zod, `AppError` y `sendError`, `404` en JSON y un manejador central que traduce los errores de `express.json` y nunca expone trazas. `createApp({ config, checkDatabase, clock, spaDir, extraApiRoutes })`, que rechaza un `Clock` propio fuera de `NODE_ENV=test`.
- **Etapa 3:** `helmet` con CSP explícita y estricta, HSTS solo en producción, el servicio de la SPA y la vista de diagnóstico con una hoja de estilos.
- **Etapa 4:** `NODE_ENV` explícito en la CI, documentación y este registro.
- **Correcciones durante la implementación:**
  - `jsonBody` era un *array* de *middleware* y TypeScript no infería los tipos de los manejadores siguientes; pasó a ser un único *middleware*;
  - una prueba enviaba un `X-Request-Id` con salto de línea, que Node rechaza antes de enviarlo; se cambió el valor de prueba, sin tocar el control;
  - ESLint pidió `import type` para `zod` en `validate.ts`;
  - una frase de `CLAUDE.md` sobre el reloj se matizó para no contradecir el `DEFAULT now()` de `users`.
- **Validación (local, 2026-11-26; detalle en el README, 2.6):**
  - `lint`, `typecheck` y `build`, sin errores;
  - primera entrega: `npm test` 102/102 del backend y 5/5 del frontend, integración 36/36, E2E 1/1, la SPA con la CSP comprobada a mano en Chromium y el arranque inseguro rechazado en seis casos;
  - tras la revisión (ver "Revisión humana"): `npm test` 100/100 del backend (95 nuevas) y 5/5 del frontend; `npm run test:integration` 36/36 en `calicoach_test`, con la base de desarrollo sin tocar; `npm run test:e2e` 6/6 con `CI=1` (el *smoke* de DEV-001 y 5 pruebas automatizadas de la SPA con la CSP); el arranque inseguro con el servidor compilado termina con código 1 en los cuatro casos que quedan;
  - `npm audit --audit-level=high`: 0 vulnerabilidades;
  - **la ejecución en GitHub Actions estaba pendiente del PR** cuando se cerró la implementación. Ahora está en verde: ver la revisión humana.

**Revisión humana:**
- **Análisis:** el autor aprobó D1–D4 y D6–D11 y aprobó D5 con modificación (sin `CLOCK_FIXED_NOW`), y añadió condiciones de seguridad y de verificación.
- **Implementación (primera revisión):** el autor aprobó provisionalmente D1–D11 y los resultados locales, y pidió tres ajustes antes del commit:
  - **cookie:** quitar `SESSION_COOKIE_NAME` y `SESSION_COOKIE_SECURE` salvo que el contrato las exigiera. La IA comprobó que la sección 4 fija la cookie solo con `NODE_ENV` y `APP_ORIGIN`, así que no había conflicto; la cookie pasó a ser fija por entorno, y una prueba comprueba que esas variables no relajan la configuración de producción;
  - **CSP:** convertir la comprobación manual en una prueba automatizada. La IA añadió el proyecto Playwright `spa-build`, que compila y sirve el *build* real con Express, sin dependencias nuevas; incluye un control positivo que demuestra que el detector de violaciones funciona;
  - **scripts:** documentar que `NODE_ENV=…` en los scripts es de Linux y macOS, sin añadir `cross-env`.
- **Implementación (tras los ajustes):** el autor aprobó la validación final y autorizó el commit (`b8887cd`), el push y el PR #7, y pidió ejecutar el E2E manual sobre la rama del PR.
- **CI en GitHub Actions** (sección 7 del README):
  - ejecución `pull_request` 45883952528, en verde: auditoría sin vulnerabilidades altas, lint, tipos, tests 100/100 y 5/5, migraciones, *drift*, salvaguarda, integración 36/36, fila centinela intacta y *build*;
  - ejecución `workflow_dispatch` 45884075772 sobre el mismo commit `b8887cd`, en verde, con el E2E 6/6 (el *smoke* de DEV-001 y las 5 pruebas de la SPA real con la CSP);
  - ejecución `push` a `main` 45885000728, en verde, tras el merge.
- **Aprobación final:** el autor revisó los resultados del PR #7, aprobó DEV-003 y autorizó el merge. Antes del merge se comprobó que el PR apuntaba a `main`, que su último commit seguía siendo `b8887cd`, que las dos ejecuciones habían pasado sobre ese commit y que no había conflictos. El merge se hizo con `--match-head-commit` (`f5b5e56`).
- **Cierre:** DEV-003 queda **terminado**. Limitaciones conocidas: el E2E, incluida la comprobación de la CSP, solo se ejecuta en CI con `workflow_dispatch`; `spa-build` sirve por http con `NODE_ENV=development`, así que `upgrade-insecure-requests` solo lo cubre la prueba de contrato; y los scripts con `NODE_ENV=…` son de Linux y macOS. Pendiente para **DEV-004**: autenticación, JWT, emisión de la cookie, límite de peticiones y API-06 (*login CSRF*). Pendiente para **DEV-036**: `trust proxy` y el despliegue. El *override* de `effect` se mantiene. DEV-004 no se ha empezado.

---

### 5. Historias de Usuario

> Esta sección tiene dos prompts, y los dos modificaron solo la sección 5 de `readme.md`: el Prompt 10 (las tres historias oficiales) y el Prompt 12 (el backlog ampliado). El hueco del Prompt 3 queda libre.

**Prompt 1:**

*Prompt 10 — Historias de usuario del flujo principal*

- **Herramienta:** Claude Code (modelo `claude-opus-5-5`), en la misma sesión que los prompts de las secciones 1–4.
- **Objetivo:** documentar las tres historias de usuario del flujo principal del MVP, con su trazabilidad respecto a las secciones 1–4.
- **Archivo afectado:** `readme.md` (sección 5).

Texto literal del prompt:

```text
Actúa como Product Owner técnico y analista funcional senior.

Estamos desarrollando Cali Coach, proyecto final de AI4Devs.

Lee íntegramente las secciones 1, 2, 3 y 4 de `readme.md`, así como las instrucciones originales de la sección 5.

## Objetivo

Completar exclusivamente la sección 5, «Historias de usuario», respetando la plantilla oficial y su límite de tres historias.

## Historias propuestas

Selecciona tres historias que representen el flujo principal del MVP:

1. **HU-01 — Activación de un programa:** como atleta, quiero seleccionar un programa preconfigurado y mis días de entrenamiento para obtener un calendario personalizado.

2. **HU-02 — Registro de entrenamiento:** como atleta, quiero consultar mi sesión del día y registrar las series realizadas para conservar mi desempeño.

3. **HU-03 — Finalización e historial:** como atleta, quiero finalizar explícitamente una sesión y consultar mi progreso para conocer mis avances y mantener la consistencia.

Puedes ajustar los títulos y la redacción para respetar la plantilla, sin cambiar el alcance funcional.

## Para cada historia

Documenta:

- Identificador y título.
- Formato «Como [rol], quiero [acción], para [beneficio]».
- Contexto y valor de negocio.
- Criterios de aceptación verificables, preferentemente Given/When/Then.
- Reglas de negocio relacionadas.
- Endpoints implicados.
- Entidades del modelo de datos.
- Dependencias y supuestos pendientes.
- Casos negativos y de concurrencia relevantes.

## Reglas de coherencia

- Respeta las secuencias Push/Pull y variantes A/B de 2 a 6 días.
- El calendario se materializa al activar y no se desplaza por sesiones omitidas.
- Solo existe un programa activo por usuario como supuesto provisional.
- Los registros se realizan en sesiones `planned` del día local actual.
- Registrar una serie no finaliza automáticamente la sesión.
- La finalización es explícita.
- `completed`, `partial` y `skipped` son estados finales.
- La reconciliación produce `partial` cuando existen series y `skipped` cuando no existen.
- Conserva los controles de autorización, CSRF y concurrencia.
- No presentes como aprobadas las decisiones pendientes del Product Owner.

## Trazabilidad

Incluye una tabla compacta que relacione cada historia con:
- Requisitos y funcionalidades de la sección 1.
- Componentes de la sección 2.
- Entidades de la sección 3.
- Endpoints de la sección 4.
- Pruebas propuestas que la verificarían.

## Restricciones

1. Modifica únicamente la sección 5 de `readme.md`.
2. No modifiques las secciones 0–4 ni 6–7.
3. No modifiques `prompts.md`.
4. No generes código ni pruebas ejecutables.
5. No ejecutes pruebas.
6. No crees commits.
7. Conserva los encabezados y el formato de la plantilla oficial.

## Entregable

1. Las tres historias de usuario.
2. Resumen de criterios de aceptación.
3. Tabla de trazabilidad.
4. Dependencias y decisiones pendientes.
5. Resultado de `git diff --check`.
6. Resultado de `git diff --stat`.
7. Confirmación de archivos y secciones modificados.

No avances a la sección 6.
```

**Decisiones humanas** aportadas en el prompt:
- La selección de las tres historias (activación, registro y finalización con progreso) y su alcance funcional.
- Los elementos obligatorios de cada historia, con criterios de aceptación preferentemente en formato Given/When/Then.
- Las diez reglas de coherencia, entre ellas no presentar como aprobadas las decisiones pendientes del Product Owner.
- La tabla de trazabilidad con las secciones 1–4 y las pruebas propuestas.

**Resultado generado por la IA:**
- **Tres historias** bajo los marcadores `**Historia de Usuario 1–3**` de la plantilla:
  - HU-01: activar un programa adaptado a mis días;
  - HU-02: consultar la sesión del día y registrar mis series;
  - HU-03: finalizar mis sesiones y consultar mi progreso.

  Cada una incluye prioridad (tomada de la sección 1), contexto y valor, criterios de aceptación (9, 11 y 8), reglas de negocio, endpoints, entidades, dependencias y supuestos, y casos negativos y de concurrencia.
- **Ajustes de redacción propuestos por la IA**, sin cambiar el alcance:
  - títulos en primera persona;
  - la "consistencia" del prompt se traduce como "constancia" del atleta;
  - los criterios usan "Dado/Cuando/Entonces" en lugar de "Given/When/Then".
- **Decisiones de alcance de la IA**, que el equipo debe validar:
  - los hitos (F10, deseables) quedan fuera de HU-03;
  - el registro y el inicio de sesión (F1) no tienen historia propia, por el límite de tres;
  - el cierre automático (F7) se reparte entre HU-02 y HU-03;
  - el criterio de 320 px (CE5) se incluye en HU-02.
- **Tablas añadidas:** resumen de criterios de aceptación y trazabilidad con las secciones 1–4 y con las pruebas propuestas (unitarias del `scheduler`, C1–C8, API-xx y E2E).
- **Decisiones pendientes:** las once decisiones abiertas del Product Owner aparecen como [Pendiente], cada una con su tratamiento provisional. Ninguna se presenta como aprobada.
- **Validación:**
  - la primera ejecución de `git diff --check` encontró espacios al final de 12 líneas en blanco dentro de las listas. Se limpiaron solo en la sección 5 y la segunda salió sin errores;
  - el script de comprobación revisó 48 tablas, sin filas con errores de columnas;
  - las secciones 0, 6 y 7 son idénticas a HEAD, y las secciones 1–4 no cambiaron;
  - `git diff --stat`: 2330 inserciones acumuladas en `readme.md`;
  - no se generó código y no se ejecutaron pruebas.

**Prompt 2:**

*Prompt 12 — Backlog ampliado de historias de usuario*

- **Herramienta:** Claude Code (modelo `claude-opus-5-5`), en la misma sesión.
- **Objetivo:** ampliar la sección 5 con historias pequeñas y verificables que cubran el MVP, conservando HU-01 a HU-03.
- **Archivo afectado:** `readme.md` (sección 5, nuevo apartado "Backlog ampliado del MVP").

Texto literal del prompt:

```text
# Prompt 12 — Cali Coach: ampliar las historias de usuario del MVP

Actúa como **Product Owner técnico, Business Analyst y especialista en desarrollo ágil**.

Estamos desarrollando Cali Coach, una aplicación mobile-first para atletas intermedios de calistenia, como proyecto final de AI4Devs.

Ya hemos documentado la arquitectura, el modelo de datos, la API, tres historias de usuario iniciales y tres tickets técnicos generales.

Ahora queremos evolucionar esta documentación hacia un **backlog completo, coherente y ejecutable para construir el MVP funcional**.

## 1. Objetivo

Ampliar la sección 5 de `readme.md` con historias de usuario más pequeñas y específicas, cubriendo las funcionalidades imprescindibles del MVP.

**No sustituyas ni elimines las tres historias existentes HU-01, HU-02 y HU-03.**

Consérvalas como historias de alto nivel y crea historias derivadas con identificadores nuevos, por ejemplo `HU-04`, `HU-05`, etc.

## 2. Análisis previo obligatorio

Antes de editar:

1. Lee íntegramente las secciones 1–6 de `readme.md`.
2. Identifica los requisitos funcionales F1–F10 y sus prioridades.
3. Identifica las reglas de negocio confirmadas.
4. Revisa las entidades y relaciones de la sección 3.
5. Revisa los endpoints de la sección 4.
6. Revisa las tres historias existentes de la sección 5.
7. Revisa los tres tickets de la sección 6.
8. Identifica funcionalidades imprescindibles que todavía no tienen una historia de usuario específica.

No inventes nuevas funcionalidades como si ya hubieran sido aprobadas.

## 3. Funcionalidades que debe cubrir el backlog

Analiza y descompón las siguientes áreas:

### A. Autenticación y perfil
- Registro de usuario.
- Inicio y cierre de sesión.
- Consulta de sesión autenticada.
- Configuración de disponibilidad semanal.
- Configuración de zona horaria.

### B. Programas de entrenamiento
- Consulta del catálogo.
- Visualización de detalles del programa.
- Consulta de ejercicios y prescripciones.
- Selección y activación de un programa.
- Consulta del programa activo.

### C. Calendario y sesiones
- Visualización del calendario.
- Consulta de la sesión del día.
- Consulta del detalle de una sesión.
- Identificación de sesiones completadas, parciales, omitidas y pendientes.

### D. Ejecución del entrenamiento
- Visualización de ejercicios prescritos.
- Registro de series realizadas.
- Modificación de registros.
- Eliminación de registros.
- Finalización explícita de una sesión.
- Validaciones de estado y fecha local.

### E. Historial y progreso
- Consulta del historial de sesiones.
- Consulta de inscripciones anteriores.
- Resumen de progreso.
- Comparación de resultados prescritos y realizados.
- Visualización de adherencia, respetando las decisiones pendientes.

### F. Experiencia transversal
- Interfaz responsive desde 320 px.
- Estados de carga y error.
- Accesibilidad básica.
- Protección de operaciones autenticadas.

Las funcionalidades transversales pueden documentarse como criterios de aceptación comunes cuando no justifiquen una historia independiente.

## 4. Para cada historia nueva

Incluye:

- Identificador único.
- Título.
- Historia en formato «Como / quiero / para».
- Valor para el usuario.
- Prioridad: Must Have, Should Have o Could Have, alineada con la sección 1.
- Historia de alto nivel relacionada, cuando corresponda.
- Requisitos funcionales relacionados.
- Criterios de aceptación verificables en formato Dado/Cuando/Entonces.
- Endpoints existentes relacionados.
- Entidades relacionadas.
- Dependencias.
- Casos negativos relevantes.
- Decisiones pendientes del PO.

No dupliques los criterios completos de las historias originales. Utiliza referencias cuando sea apropiado.

## 5. Granularidad

Las historias nuevas deben ser lo suficientemente pequeñas para:

1. Tener un resultado observable para el usuario.
2. Poder implementarse y verificarse de forma relativamente independiente.
3. Tener criterios de aceptación claros.
4. Permitir entregas incrementales.
5. Evitar historias excesivamente grandes que agrupen funcionalidades distintas.

No establezcas un número artificial de historias.

Genera tantas como sean necesarias para cubrir el MVP, pero evita historias redundantes.

No conviertas cada endpoint o cada tarea técnica en una historia de usuario.

## 6. Clasificación del alcance

Separa claramente:

**MVP imprescindible**
- Funcionalidades necesarias para que un atleta pueda utilizar Cali Coach de principio a fin.

**Mejoras posteriores**
- Funcionalidades deseables que no bloquean el recorrido principal.

**Fuera de alcance**
- Funcionalidades que requieren nuevas decisiones, cambios importantes de arquitectura o una fase posterior.

No introduzcas recomendaciones inteligentes, generación de programas mediante IA, gamificación avanzada o nuevas integraciones como funcionalidades confirmadas del MVP.

## 7. Trazabilidad

Incluye una matriz que relacione:

- Historia nueva.
- Requisito funcional.
- Historia original HU-01, HU-02 o HU-03, cuando corresponda.
- Endpoint.
- Entidad.
- Ticket técnico T-01, T-02 o T-03.
- Prioridad.

Identifica explícitamente cualquier requisito imprescindible sin cobertura.

## 8. Orden de implementación

Propón una secuencia de incrementos funcionales que permita construir el MVP gradualmente.

Cada incremento debe producir una capacidad verificable.

Considera este orden inicial, ajustándolo según las dependencias reales:

1. Autenticación y perfil.
2. Catálogo de programas.
3. Activación y calendario.
4. Ejecución y registro de entrenamiento.
5. Finalización e historial.
6. Progreso y validación end-to-end.

Identifica el primer recorrido mínimo que debería funcionar de extremo a extremo.

## 9. Restricciones

1. Modifica únicamente la sección 5 de `readme.md`.
2. Conserva íntegramente las tres historias originales.
3. Añade el backlog ampliado en una subsección nueva, sin alterar los encabezados oficiales existentes.
4. No modifiques las secciones 0–4 ni 6–7.
5. No modifiques `prompts.md`.
6. No implementes código.
7. No generes migraciones ni pruebas ejecutables.
8. No ejecutes pruebas de aplicación.
9. No instales dependencias.
10. No crees commits.
11. No cambies las decisiones de arquitectura o modelo de datos existentes.
12. Si detectas inconsistencias, documéntalas sin corregir otras secciones.

## 10. Entregable

Al finalizar, presenta:

1. Número total de historias nuevas.
2. Tabla resumen de las historias y prioridades.
3. Cobertura de los requisitos imprescindibles F1–F10, distinguiendo los deseables.
4. Matriz de trazabilidad.
5. Propuesta de incrementos funcionales.
6. Decisiones pendientes del PO.
7. Inconsistencias detectadas con las secciones anteriores.
8. Resultado de `git diff --check`.
9. Resultado de `git diff --stat`.
10. Confirmación de los archivos y secciones modificados.

**No avances a modificar los tickets técnicos. Esa será nuestra siguiente tarea.**
```

**Decisiones humanas** aportadas en el prompt:
- Conservar HU-01 a HU-03 como historias de alto nivel y crear historias derivadas con identificadores nuevos.
- Las áreas funcionales A a F que había que descomponer, y la posibilidad de tratar lo transversal como criterios comunes.
- Usar prioridades MoSCoW alineadas con la sección 1, separar el MVP, las mejoras posteriores y lo que queda fuera de alcance, y excluir la IA y la gamificación avanzada.
- Un orden inicial de incrementos, que se podía ajustar.

**Resultado generado por la IA:**
- **20 historias nuevas** (HU-04 a HU-23) en el apartado "Backlog ampliado del MVP". HU-01 a HU-03 y los marcadores de la plantilla no cambiaron.
- **Seis criterios comunes** (CT-01 a CT-06): diseño adaptable, carga y errores, accesibilidad, operaciones protegidas, envíos duplicados y fechas locales.
- **Equivalencia de prioridades propuesta por la IA:** Imprescindible = Must Have y Deseable = Should Have. Could Have no se usa. HU-21 (programas anteriores) lleva una prioridad Should *(propuesta)*, porque no es una funcionalidad propia de F1–F10.
- **Decisiones de alcance de la IA:**
  - HU-07 (zona horaria) se asoció a F7;
  - HU-23 (hitos) quedó como mejora posterior, sin endpoint;
  - el registro y el inicio de sesión se dividieron en HU-04 y HU-05.
- **Cobertura:** F1–F9 con al menos una historia Must; F10 como mejora posterior.
- **Matriz de trazabilidad, incrementos y decisiones:**
  - incrementos I1–I6, con tres ajustes respecto al orden del prompt: la finalización pasa a I4, el cierre automático a I5 y el historial a I6;
  - el primer recorrido mínimo de extremo a extremo;
  - 13 decisiones pendientes relacionadas con sus historias;
  - 6 inconsistencias documentadas.
- **Más adelante cambió:** el backlog técnico de la sección 6 (Prompts 14 y 15) adelantó a I3 el núcleo de la reconciliación que la tabla de incrementos sitúa en I5 (HU-18). La sección 5 no se modificó y la diferencia está anotada en la sección 6.
- **Validación:**
  - `git diff --check` salió sin errores;
  - el script de comprobación revisó 55 tablas, sin filas con errores de columnas;
  - las secciones 0 y 7 son idénticas a HEAD, y las secciones 1–4 y 6 no cambiaron;
  - `git diff --stat`: 3311 inserciones acumuladas en `readme.md`;
  - no se generó código y no se ejecutaron pruebas.

**Prompt 3:**

*Prompt 22 — DEV-004: autenticación (registro, inicio, sesión actual y cierre)*

- **Herramienta:** Claude Code (modelo `claude-opus-5-5`), en la misma sesión que DEV-001 a DEV-003. Roles indicados por el autor en la implementación: el usuario es el Product Owner; ChatGPT, analista y revisor; Claude Code, desarrollador.
- **Objetivo:** verificar el cierre de DEV-003 (merge del PR #8, hecho a mano por el autor), analizar DEV-004 sin modificar archivos y, tras la aprobación de D1–D10, implementarlo en una rama y validarlo en local, sin commit, push ni PR.
- **Archivos afectados:**
  - **nuevos:**
    - `backend/src/modules/auth/`: `auth.routes.ts`, `auth.controller.ts`, `auth.service.ts`, `auth.repository.ts`, `auth.schemas.ts`, `auth.password.ts` y `auth.token.ts`, con sus pruebas;
    - `backend/src/shared/http/`: `session-cookie.ts` (con prueba), `rate-limit.ts` y `require-auth.ts`;
    - `backend/tests/integration/`: `auth.register.test.ts`, `auth.session.test.ts`, `auth.security.test.ts` y `auth.repository.test.ts`;
    - `backend/tests/support/`: `auth-app.ts` y `auth-stubs.ts`;
  - **modificados:**
    - `backend/src/app.ts`, `server.ts`, `shared/config.ts` (`JWT_SECRET`) y `shared/prisma.ts` (comentario);
    - las pruebas existentes de contrato, de salud y de configuración, solo por la nueva firma de `createApp` y el secreto de producción de prueba;
    - `backend/.env.example`, `backend/package.json` y `package-lock.json`;
    - `CLAUDE.md`, `readme.md` (0.3, 1.2, 1.4, 2.5, 2.6, 4, 5 y 6) y `prompts.md`.
  - **sin cambios:** el esquema, las migraciones, la CI, el frontend y el E2E.

Texto literal del prompt (cierre de DEV-003 y análisis):

```text
# Cali Coach — Cierre de DEV-003 y análisis técnico de DEV-004

El Product Owner ha aprobado el merge del PR #8:

https://github.com/GeraGalindo/AI4Devs-finalproject/pull/8

El merge será realizado manualmente en GitHub por el Product Owner.

**No intentes realizar el merge.**

## Fase 1 — Verificación del cierre de DEV-003

Una vez que el PR #8 aparezca como MERGED:

1. Confirma que el PR #8 fue integrado en main.
2. Verifica que el commit aprobado `90bd46a971e6469fc20b340a5495e021de005cc6` está incluido.
3. Identifica el merge commit.
4. Ejecuta git fetch origin y actualiza main local mediante fast-forward.
5. Confirma que main coincide con origin/main.
6. Verifica que el árbol de trabajo está limpio.
7. Espera y comprueba la CI de main posterior al merge.
8. Confirma que DEV-003 queda completamente cerrado, incluyendo su documentación.

Si el PR no está integrado, hay conflictos, cambios inesperados o falla la CI, detente y consulta.

## Fase 2 — Análisis técnico de DEV-004 (solo lectura)

Después de confirmar el cierre de DEV-003, analiza DEV-004 conforme al backlog, la arquitectura y los contratos existentes.

Investiga:

1. Alcance y criterios de aceptación exactos de DEV-004.
2. Dependencias con DEV-002 y DEV-003.
3. Estado actual del modelo users, Prisma y las migraciones.
4. Requisitos de registro, login, logout y consulta de sesión, según el alcance real del ticket.
5. Hashing de contraseñas y almacenamiento seguro.
6. JWT, cookies HttpOnly, Secure y SameSite.
7. Protección CSRF para endpoints de autenticación.
8. Rate limiting y manejo de errores de autenticación.
9. Validación estricta de entradas con Zod.
10. Pruebas unitarias, de integración y de contrato necesarias.
11. Archivos que habría que crear o modificar.
12. Riesgos de seguridad, regresión y compatibilidad.

Distingue los requisitos explícitos del contrato de las propuestas técnicas nuevas. No amplíes el alcance del ticket sin aprobación.

## Fase 3 — Propuesta de implementación

Prepara:

- Diseño técnico propuesto.
- Etapas de implementación.
- Estrategia de pruebas.
- Decisiones técnicas pendientes de aprobación del Product Owner.
- Dependencias para conseguir el primer flujo funcional React → Express → PostgreSQL de la Entrega 2.

## Restricciones

- No implementes DEV-004 todavía.
- No modifiques archivos.
- No crees ramas, commits ni Pull Requests.
- No ejecutes migraciones destructivas.
- No modifiques los Prompts 16–18.
- Mantén el override de effect.

## Entregable

Presenta:

1. Resultado del merge del PR #8 y CI de main.
2. Confirmación del cierre de DEV-003.
3. Informe técnico de DEV-004.
4. Decisiones que requieren aprobación.
5. Propuesta de implementación por etapas.

Detente después del análisis y espera mi revisión.
```

Texto literal del prompt (entrega del análisis, mientras el PR #8 seguía abierto):

```text
# Cali Coach — DEV-004: entregar análisis técnico

Gracias por la revisión preliminar.

El merge del PR #8 lo realizaré manualmente en GitHub. No necesitas mantener procesos de comprobación en segundo plano.

1. Detén cualquier proceso de vigilancia que hayas iniciado para el PR #8.
2. No intentes hacer el merge.
3. No actualices main hasta que te confirme que el PR está integrado.

Mientras tanto, entrega el análisis técnico de DEV-004 que ya has preparado.

Incluye:

- Alcance y criterios de aceptación exactos según README y las historias HU-04/HU-05.
- Contrato de autenticación y pruebas API aplicables.
- Diseño propuesto para registro, login, logout y sesión, únicamente donde corresponda al ticket.
- Hashing, JWT, cookies, CSRF y rate limiting.
- Integración con Prisma y el modelo users existente.
- Dependencias y riesgos.
- Archivos previstos.
- Propuesta de implementación por etapas.
- Decisiones técnicas que necesitan aprobación del Product Owner, con alternativas y tu recomendación.

Distingue claramente los requisitos existentes de las decisiones técnicas nuevas.

No implementes nada, no modifiques archivos y no crees ramas ni commits.

Presenta el informe completo y espera mi revisión.
```

Texto literal del prompt (implementación):

```text
# Cali Coach — DEV-004: implementación de autenticación

## Contexto y roles

- Product Owner: usuario. Aprueba decisiones y autoriza publicación.
- Analista y revisor: ChatGPT.
- Desarrollador: Claude Code.

DEV-001 y DEV-002 están terminados. DEV-003 está implementado en main mediante PR #7 y tiene un PR documental #8 pendiente de confirmación de merge.

Este encargo autoriza implementar DEV-004 en una rama de trabajo, pero NO autoriza commit, push, Pull Request ni merge.

## Fase 0 — Verificar dependencias

Antes de implementar:

1. Comprueba el estado del PR #8.
2. Si está MERGED, confirma que incluye el commit `90bd46a971e6469fc20b340a5495e021de005cc6`.
3. Confirma la CI posterior al merge.
4. Actualiza main local por fast-forward y verifica que coincide con origin/main.
5. Comprueba que el árbol está limpio.
6. Revisa el alcance exacto de DEV-004 en readme.md, las historias HU-04/HU-05, la sección 4, los casos API-06–11 y la parte aplicable de API-43.
7. Revisa CLAUDE.md y las convenciones existentes.

Si PR #8 sigue abierto, la CI falla o existen diferencias inesperadas, detente antes de modificar archivos y presenta el bloqueo. No hagas el merge de PR #8.

## Fase 1 — Crear rama

Desde main actualizado, crea:

`feature/dev-004-authentication`

No modifiques migraciones ni el esquema users.

## Fase 2 — Decisiones técnicas aprobadas

Implementa las siguientes decisiones.

### D1 — Hash de contraseñas

- Usar Argon2id mediante la librería argon2.
- Parámetros: memoryCost=19456 KiB, timeCost=2, parallelism=1.
- Guardar únicamente el hash en password_hash.
- Verificar las contraseñas mediante la librería, sin comparaciones manuales.
- Para un email inexistente, ejecutar una verificación contra un hash de relleno válido para reducir diferencias temporales.
- No registrar contraseñas ni hashes en logs.

### D2 — Validación de contraseñas

- Mínimo 12 y máximo 128 caracteres.
- Sin reglas adicionales de composición.
- No aplicar trim ni transformar contraseñas.
- Usar Zod estricto para validar los cuerpos.
- Errores de validación según el contrato existente.

### D3 — JWT

- Usar jose.
- Algoritmo exclusivamente HS256.
- Claims requeridos: sub, ver, iat y exp.
- Sesión de 7 días, según DP-15.
- Verificar firma, algoritmo, expiración y estructura de claims.
- Usar el Clock inyectable de DEV-003 para pruebas deterministas.
- Nunca devolver el JWT en JSON ni en URLs.

### D4 — JWT_SECRET

- En producción, JWT_SECRET es obligatorio y debe tener al menos 32 bytes de entropía adecuada.
- Rechazar valores ausentes, cortos, conocidos o de desarrollo en producción.
- Permitir un valor fijo exclusivamente para desarrollo local y pruebas.
- No imprimir ni registrar el secreto.
- Documentar la configuración en .env.example sin incluir secretos reales.
- Si no puede garantizarse que el secreto sea seguro, fallar al arrancar en producción.

No ampliar esta excepción a staging ni a otros entornos compartidos.

### D5 — Cookie de sesión

- Usar la librería cookie.
- Mantener la configuración fija de DEV-003:
  - production: __Host-session, HttpOnly, Secure, SameSite=Lax, Path=/, sin Domain.
  - development/test: session, sin Secure.
- Max-Age=604800 segundos.
- La cookie se emite únicamente después de autenticación correcta.
- Logout elimina la cookie con atributos compatibles.
- No utilizar cookie-parser ni crear un parser propio.

### D6 — Rate limiting

Usar express-rate-limit.

- Login: máximo 10 solicitudes por 15 minutos e IP.
- Registro: máximo 5 solicitudes por hora e IP.
- Contabilizar todos los intentos, incluidos los exitosos.
- Mantener contadores independientes por endpoint.
- Implementar inicialmente en memoria.
- Devolver 429 RATE_LIMITED y Retry-After.
- Respetar el orden de middleware establecido en la sección 4.
- No confiar en X-Forwarded-For ni habilitar trust proxy.
- No considerar este limitador suficiente para un despliegue con proxy o múltiples instancias.

Si la implementación propuesta altera el orden de controles de seguridad existente, detenerse y solicitar revisión.

### D7 — Timezone

- Aceptar identificadores IANA válidos reconocidos por Intl.DateTimeFormat, incluyendo UTC.
- Rechazar offsets como +01:00 y -05:00.
- No normalizar arbitrariamente identificadores IANA válidos.
- Guardar la zona horaria recibida después de validarla.
- Documentar y probar el comportamiento.

### D8 — Organización

Crear el módulo backend/src/modules/auth/ con separación de:

- Rutas.
- Controladores.
- Servicio.
- Repositorio.
- Esquemas Zod.

Reutilizar las primitivas de DEV-003 y mantener la separación entre módulos.

### D9 — Credenciales incorrectas

El login con email inexistente y el login con contraseña incorrecta deben producir:

- HTTP 401.
- Mismo código INVALID_CREDENTIALS.
- Mismo mensaje genérico.
- Misma estructura JSON.

El requestId puede ser diferente.

No revelar si una cuenta existe mediante mensajes específicos de login.

### D10 — Sesión existente

Register y login pueden reemplazar una cookie de sesión existente después de autenticación correcta.

No confiar en la sesión previa para identificar al nuevo usuario.

## Fase 3 — Funcionalidades

### POST /api/auth/register

- Validar email, password y timezone.
- Normalizar email con trim y minúsculas.
- Comprobar unicidad mediante PostgreSQL.
- Crear usuario con password_hash Argon2id.
- Dejar available_weekdays como NULL.
- Emitir cookie de sesión.
- Responder 201 con el usuario público.
- Responder 409 EMAIL_ALREADY_REGISTERED ante duplicados.
- Proteger contra CSRF y rate limiting.

Cubrir también registros concurrentes con el mismo email.

### POST /api/auth/login

- Normalizar email.
- Buscar usuario.
- Verificar contraseña o hash de relleno.
- Emitir cookie válida.
- Responder 200 con usuario público.
- Devolver 401 genérico para credenciales incorrectas.
- Aplicar CSRF y rate limiting.

### GET /api/auth/me

- Verificar cookie y JWT.
- Consultar usuario y comprobar token_version.
- Responder con usuario público.
- No modificar updated_at.
- Responder 401 UNAUTHENTICATED cuando corresponda.

### POST /api/auth/logout

- Exigir las protecciones CSRF y noBody.
- Si existe una sesión válida, incrementar token_version atómicamente.
- Invalidar todas las sesiones anteriores del usuario.
- Eliminar la cookie.
- Responder 204, también cuando no exista sesión válida.
- No modificar la base de datos si la cookie es inválida.

Probar solicitudes concurrentes y garantizar que ninguna permite reutilizar una sesión revocada.

### requireAuth

- Leer exclusivamente la cookie de sesión.
- Validar JWT con jose.
- Verificar sub, ver, iat y exp.
- Consultar token_version en PostgreSQL.
- Establecer la identidad autenticada para los siguientes middlewares.
- Rechazar cookies manipuladas, caducadas o revocadas.

No aceptar identidades provenientes del cuerpo, parámetros o cabeceras arbitrarias.

## Fase 4 — Salvaguardas

1. Mantener el orden de middleware aprobado en DEV-003.
2. Preservar el formato {error:{code,message,requestId}}.
3. No incluir trazas, secretos, contraseñas ni hashes en respuestas o logs.
4. Aplicar Cache-Control: no-store a las respuestas con información de usuario.
5. Evitar errores de Prisma que filtren argumentos de consultas.
6. Convertir available_weekdays=[] de Prisma a null en la respuesta pública, preservando el NULL real en PostgreSQL.
7. Mantener las salvaguardas de calicoach_test.
8. No modificar Prisma, migraciones ni restricciones SQL.
9. Mantener el override de effect.
10. No implementar frontend, perfil ni endpoints adicionales.

## Fase 5 — Pruebas

Incluir pruebas unitarias, de contrato e integración real con PostgreSQL.

Como mínimo:

- HU-04 y HU-05.
- API-06 a API-11.
- Parte aplicable de API-43.
- Contraseña correcta, incorrecta y usuario inexistente.
- Registro correcto, duplicado y concurrente.
- Hash Argon2id persistido.
- Normalización de email.
- Zona horaria válida, UTC y offsets rechazados.
- Contraseña de 11, 12, 128 y 129 caracteres.
- Campos desconocidos rechazados.
- JWT válido, caducado, manipulado, alg:none y algoritmo distinto de HS256.
- Cookie segura en producción.
- Ausencia de JWT en el cuerpo.
- GET /me sin escritura.
- Logout idempotente y revocación en todos los dispositivos.
- CSRF en login, registro y logout.
- 429 y Retry-After para ambos limitadores.
- Sin filtraciones de credenciales en logs.
- Regresión completa de DEV-001, DEV-002 y DEV-003.

Ejecutar:

- npm ci
- npm run lint
- npm run typecheck
- npm test
- npm run test:integration
- npm run build
- npm run test:e2e
- npm audit --audit-level=high
- git diff --check

Verificar además la versión efectiva de effect y la ausencia de cambios en migraciones.

## Fase 6 — Documentación

Actualizar:

- readme.md: estado, diseño, contratos, pruebas y limitaciones de DEV-004.
- CLAUDE.md: convenciones de autenticación.
- prompts.md: Prompt 22, con decisiones, implementación, verificaciones y revisión pendiente.

No modificar los Prompts 16–18.

No declarar DEV-004 terminado antes del merge y la CI correspondiente.

## Fase 7 — Informe para revisión

Presenta:

1. Estado de PR #8 y main.
2. Rama de trabajo y archivos modificados.
3. Decisiones D1–D10 implementadas.
4. Resultados de pruebas con cantidades exactas.
5. Evidencia de los criterios de aceptación.
6. Riesgos y limitaciones restantes.
7. Diferencias respecto al diseño aprobado.
8. Resultado de npm audit y estado del override effect.
9. Confirmación de que no hay commits, push ni PR.

## Restricciones finales

- No hacer commit.
- No hacer push.
- No abrir Pull Request.
- No hacer merge.
- No comenzar DEV-005, DEV-006 ni DEV-007.
- No modificar frontend.
- No ejecutar migraciones destructivas.
- No cambiar el contrato sin aprobación.

Detente después de implementar y validar localmente. Espera la revisión del Product Owner antes de publicar.
```

**Decisiones humanas:**
- **Antes del análisis:** el autor fusionó a mano el PR #8 (cierre documental de DEV-003) y pidió no intentar el merge. Durante el análisis, el PR seguía abierto. El autor pidió detener la comprobación en segundo plano que la IA había lanzado, no actualizar `main` y entregar el análisis.
- **Sobre el análisis:** el autor aprobó D1–D10 con estas precisiones:
  - D2: mínimo de 12 caracteres, la recomendación de la IA;
  - D4: excepción de desarrollo solo para `development` y `test`, nunca para *staging* ni otros entornos compartidos, y fallo al arrancar si no puede garantizarse un secreto seguro;
  - D5: sin `cookie-parser` ni un *parser* propio;
  - D6: contar todos los intentos, incluidos los correctos. La IA había propuesto contar solo los fallidos en `login`.
- **Condiciones añadidas:**
  - concurrencia en el registro y en el `logout`;
  - `Cache-Control: no-store`;
  - errores de Prisma sin argumentos;
  - `[]` → `null` preservando el `NULL` real;
  - no tocar Prisma, las migraciones ni la CI;
  - detenerse si el orden de los controles cambiaba;
  - no declarar DEV-004 terminado antes del merge y la CI.

**Resultado generado por la IA:**
- **Verificación del PR #8:** fusionado por el autor (`bf95b10`, que contiene `90bd46a` sin otros cambios). CI de `main` 45965749772 en verde. `main` actualizada por *fast-forward* y árbol limpio. DEV-003 queda cerrado también en la documentación.
- **Análisis** (sin modificar archivos):
  - alcance, criterios y pruebas aplicables;
  - el modelo `users` ya cubría DEV-004 sin migraciones;
  - diez decisiones con alternativas y recomendación;
  - riesgos: *logs* de Prisma con argumentos, coste de argon2, límite por IP sin `trust proxy`, binario nativo y el *override* de `effect`.
  - Con dos consultas de solo lectura, comprobó que `Intl` acepta `+01:00` y PostgreSQL lo interpreta con el signo invertido, de ahí D7.
  - Propuso versiones publicadas hace más de dos semanas.
- **Implementación:**
  - `JWT_SECRET` en `loadConfig`;
  - cookie, límite de peticiones y `requireAuth` en `src/shared/http/`;
  - el módulo `auth`: Argon2id con *hash* de relleno, JWT con `jose` y `Clock`, esquemas Zod, repositorio con Prisma y errores saneados, servicio, controlador y rutas en el orden de la sección 4;
  - en `createApp`, la nueva dependencia `authRepository`, y `extraApiRoutes(api, { requireAuth })`;
  - en `server.ts`, Prisma sobre el pool, con cierre ordenado.
- **Correcciones durante la implementación:**
  - una prueba del JWT intentaba leer la firma como JSON, y se corrigió la prueba;
  - ESLint señaló dos variables sin usar en una prueba;
  - `backend/.env` local no tenía `TEST_DATABASE_URL`: la IA no lo modificó y pasó la variable en la línea de órdenes, con la base `calicoach_test` de `.env.example`;
  - las pruebas de mutación manuales revelaron dos pruebas débiles (la concurrencia del `logout` por HTTP y los *logs* con la base caída), y se añadieron pruebas deterministas que sí detectan los fallos.
- **Validación (local, 2026-11-27; detalle en el README, 2.6):**
  - `npm ci`, `lint`, `typecheck`, `build` y `git diff --check`, sin errores;
  - `npm test`: 201/201 del backend (101 nuevas) y 5/5 del frontend;
  - `npm run test:integration`: 104/104 (68 nuevas) en `calicoach_test`, con la base de desarrollo sin tocar;
  - `npm run test:e2e`: 6/6 con `CI=1`;
  - `npm audit --audit-level=high`: 0 vulnerabilidades. `effect` 3.22.1;
  - sin cambios en el esquema, las migraciones, la CI ni el frontend;
  - el arranque en producción con un `JWT_SECRET` ausente, de desarrollo, corto o de ejemplo termina con código 1;
  - **la ejecución en GitHub Actions estaba pendiente del PR** cuando se cerró la implementación. Ahora está en verde: ver la revisión humana.
- **Diferencias respecto al diseño aprobado:**
  - el límite de peticiones no cuenta las peticiones rechazadas antes de él (CSRF y cuerpo), por el orden de la sección 4. La IA lo documentó y lo probó, porque D6 pide a la vez contar todos los intentos y respetar ese orden;
  - el limitador usa el reloj del sistema, no el `Clock`;
  - además de lo pedido, el JWT rechaza un `iat` futuro y una vida de más de 7 días, y la contraseña tiene un máximo de 128 caracteres también en el `login`, sin mínimo.

**Revisión humana:**
- **Análisis:** el autor aprobó D1–D10 con las precisiones de "Decisiones humanas" (D2, D4, D5 y D6) y las condiciones añadidas.
- **Implementación:** el autor revisó el informe de la fase 7 (resultados locales, diferencias respecto al diseño y riesgos) sin pedir cambios, y autorizó el commit, el push y el PR. Su primera autorización llegó dentro de un bloque pegado de la terminal y el modo automático de Claude Code bloqueó el commit; el autor la repitió como instrucción directa, con el alcance (un único commit con el mensaje indicado, solo los archivos de DEV-004, sin secretos ni archivos generados) y sin autorizar el merge.
- **Publicación:** commit `89674bc` (`89674bcdc44f9391d3838d20ce39005d9f5de0bf`) sobre `bf95b10`, con 36 archivos (+2789 y −54), y PR #9 (https://github.com/GeraGalindo/AI4Devs-finalproject/pull/9) hacia `main`. Después el autor autorizó el E2E manual sobre la rama del PR.
- **CI en GitHub Actions** (sección 7 del README):
  - ejecución `pull_request` 45982582015, en verde: auditoría sin vulnerabilidades altas, lint, tipos, tests 201/201 y 5/5, migraciones, *drift*, salvaguarda, integración 104/104, fila centinela intacta y *build*. E2E omitido por diseño;
  - ejecución `workflow_dispatch` 45983125193 sobre el mismo commit `89674bc`, en verde, con el E2E 6/6 (el *smoke* de DEV-001 y las 5 pruebas de la SPA real con la CSP);
  - ejecución `push` a `main` 45985439338, en verde, tras el merge: las mismas comprobaciones que en el PR (201/201, 5/5 y 104/104, 0 vulnerabilidades).
- **Aprobación final:** el autor revisó los resultados del PR #9 y autorizó el merge. Antes del merge se comprobó que el PR seguía abierto hacia `main`, que su último commit seguía siendo `89674bc`, que no había conflictos y que las dos ejecuciones habían pasado sobre ese commit. El merge se hizo con *merge commit* y `--match-head-commit 89674bc` el 2026-11-27 (`4525dc5`, `4525dc56360a81634d9cbcd9eb3be15be9650548`), sin *rebase*, *squash* ni *force push*. `main` local se actualizó por *fast-forward*.
- **Cierre:** DEV-004 queda **terminado**. Limitaciones conocidas, que siguen abiertas:
  - el límite de peticiones vive en memoria y usa la IP del socket: no sirve detrás de un *proxy* ni con varias instancias (pendiente de **DEV-036**, con `trust proxy` y el despliegue);
  - por el orden de la sección 4, el limitador no cuenta las peticiones que el CSRF o la regla de cuerpo rechazan antes que él;
  - el `409` del registro permite saber si un email tiene cuenta (riesgo aceptado);
  - la comprobación de `JWT_SECRET` es heurística: no mide la entropía real;
  - `argon2` es una dependencia nativa;
  - el *override* de `effect` se mantiene, pendiente de su ticket de mantenimiento.

  Pendiente para **DEV-005**: el repositorio de perfil también debe convertir `[]` en `null`. DEV-005, DEV-006 y DEV-007 no se han empezado.

---

### 6. Tickets de Trabajo

> La sección 6 de `readme.md` recibió cuatro prompts. Por el límite de tres por sección, aquí se documentan los prompts 11, 13 y 14, que solo trataron los tickets. El Prompt 15, que creó `docs/design-system.md` y añadió DEV-038 y DEV-039, está en la sección 1, hueco del Prompt 3, por decisión del equipo.

**Prompt 1:**

*Prompt 11 — Tickets de trabajo de alto nivel*

- **Herramienta:** Claude Code (modelo `claude-opus-5-5`), en la misma sesión.
- **Objetivo:** definir exactamente tres tickets técnicos (backend, frontend y base de datos) derivados de HU-01 a HU-03.
- **Archivo afectado:** `readme.md` (sección 6).

Texto literal del prompt:

```text
# Prompt 11 — Cali Coach: Sección 6, Tickets de Trabajo

Actúa como **Tech Lead y arquitecto de software senior**, con experiencia en planificación de proyectos ágiles, diseño de sistemas y desarrollo full-stack con TypeScript, React, Express y PostgreSQL.

Estamos desarrollando **Cali Coach**, una aplicación web mobile-first para practicantes intermedios de calistenia, como proyecto final de AI4Devs.

## 1. Objetivo

Completar exclusivamente la **sección 6 — Tickets de Trabajo** del archivo `readme.md`.

Debes definir exactamente **tres tickets técnicos**, uno de backend, uno de frontend y uno de base de datos, derivados de las historias de usuario existentes.

El resultado debe ser una especificación de trabajo suficientemente concreta para que un desarrollador pueda implementar cada ticket y otro pueda verificar sus criterios de aceptación.

**No debes implementar código en esta tarea.**

## 2. Análisis obligatorio antes de editar

Lee y utiliza como fuente de verdad:

1. Sección 0 — Ficha del proyecto.
2. Sección 1 — Descripción general.
3. Sección 2 — Arquitectura del sistema.
4. Sección 3 — Modelo de datos.
5. Sección 4 — Especificación de la API.
6. Sección 5 — Historias de Usuario.
7. Encabezados e instrucciones oficiales de la sección 6.

Identifica las relaciones entre:

- Requisitos funcionales F1–F10.
- Historias HU-01, HU-02 y HU-03.
- Endpoints REST.
- Entidades y restricciones del modelo de datos.
- Componentes de arquitectura.
- Casos de prueba propuestos.

No inventes decisiones del Product Owner ni contradigas las secciones aprobadas.

## 3. Tickets obligatorios

### T-01 — Backend: API y lógica de negocio

Documenta el trabajo necesario para implementar:

- Autenticación y autorización, incluyendo el requisito imprescindible F1.
- Gestión de perfiles, disponibilidad semanal y zona horaria.
- Consulta del catálogo de programas.
- Activación de inscripciones.
- Generación determinista de sesiones.
- Registro, modificación y eliminación de series.
- Finalización explícita de sesiones.
- Reconciliación de sesiones vencidas.
- Cálculo y consulta de progreso.
- Validación de reglas de negocio.
- Seguridad de las operaciones.
- Manejo consistente de errores HTTP.

Respeta las decisiones existentes sobre:

- Arquitectura de monolito modular.
- Node.js, Express y TypeScript.
- PostgreSQL y Prisma con SQL específico cuando sea necesario.
- Transacciones y bloqueos de concurrencia.
- Estados `planned`, `completed`, `partial` y `skipped`.
- Inmutabilidad de los estados finales.
- Fechas locales y zonas horarias IANA.
- Cookies JWT y protección CSRF.

No presentes como definitiva ninguna política que siga pendiente de aprobación.

### T-02 — Frontend: Experiencia mobile-first

Documenta el trabajo necesario para implementar:

- Registro e inicio de sesión.
- Configuración de disponibilidad semanal.
- Consulta y selección de programas.
- Activación de programas.
- Visualización del calendario de sesiones.
- Consulta de la sesión del día.
- Registro y edición de series realizadas.
- Finalización explícita.
- Visualización de estados y progreso.
- Manejo de errores y estados de carga.
- Navegación y diseño responsive desde 320 px.

Utiliza:

- React.
- TypeScript.
- Vite.
- Consumo de la API REST documentada.

Incluye requisitos de accesibilidad, validaciones de interfaz y protección frente a envíos duplicados, sin asumir que las protecciones del frontend sustituyen las del backend.

### T-03 — Base de datos: Esquema, integridad y datos iniciales

Documenta el trabajo necesario para implementar:

- Migraciones de las ocho tablas de la sección 3.
- Relaciones y claves foráneas.
- Restricciones UNIQUE y CHECK.
- Índices parciales y compuestos.
- Consistencia entre programas, plantillas y sesiones.
- Consistencia entre prescripciones y registros.
- Datos iniciales de programas, ejercicios y plantillas.
- Estrategia de seeds reproducibles.
- Validación de restricciones mediante pruebas de integración.
- Consultas necesarias para reconciliación y progreso.
- Revisión del rendimiento de índices mediante `EXPLAIN ANALYZE`.

Respeta las reglas documentadas para preservar el historial y las prescripciones utilizadas por inscripciones existentes.

No introduzcas tablas, columnas o mecanismos automáticos de versionado que no estén definidos en la sección 3.

## 4. Estructura de cada ticket

Utiliza los encabezados y campos oficiales de la plantilla cuando existan.

Para cada ticket incluye:

**Identificación**
- ID y título.
- Área técnica.
- Prioridad.
- Historias de usuario relacionadas.
- Requisitos funcionales relacionados.

**Objetivo**
- Problema que resuelve.
- Resultado funcional esperado.

**Alcance**
- Funcionalidades incluidas.
- Responsabilidades técnicas.
- Exclusiones explícitas cuando sean necesarias.

**Tareas técnicas**
- Pasos de implementación verificables.
- Componentes o módulos afectados.
- Integraciones y dependencias.

**Criterios de aceptación**
- Condiciones objetivas y comprobables.
- Casos positivos y negativos.
- Validaciones de seguridad e integridad relevantes.

**Pruebas propuestas**
- Unitarias.
- Integración.
- Contrato API, cuando corresponda.
- Interfaz y end-to-end, cuando corresponda.
- Concurrencia, cuando corresponda.

**Dependencias**
- Relación con los otros dos tickets.
- Orden lógico de implementación.
- Decisiones del PO que puedan bloquear partes del trabajo.

**Definición de terminado**
- Código implementado.
- Pruebas correspondientes ejecutadas satisfactoriamente.
- Documentación actualizada.
- Criterios de aceptación comprobados.
- Cambios revisados mediante Pull Request.

La definición de terminado describe las condiciones futuras para cerrar el ticket. **No declares que ya se han cumplido.**

## 5. Reglas de consistencia

### Programación de sesiones

- Una inscripción genera `días_por_semana × duración_en_semanas` sesiones.
- La secuencia semanal depende de los días seleccionados.
- Las variantes A/B son sesiones diferentes.
- Una semana del programa representa N sesiones programadas, no necesariamente una semana del calendario.
- Las sesiones omitidas no provocan reprogramación de las futuras.

### Estados

- `planned`: sesión abierta.
- `completed`: finalizada explícitamente.
- `partial`: fecha local vencida con al menos una serie registrada y sin finalización explícita.
- `skipped`: fecha local vencida sin registros.

Los estados finales son inmutables.

Registrar series no completa automáticamente una sesión.

### Integridad

- Una serie debe corresponder a una prescripción válida de la plantilla y semana de la sesión.
- No se pueden registrar ni modificar series fuera de las condiciones temporales y de estado documentadas.
- La activación y las operaciones concurrentes deben respetar las transacciones y bloqueos de la arquitectura.
- Una restricción UNIQUE no equivale a idempotencia HTTP.

### Seguridad

- Autenticación mediante el contrato existente de la sección 4.
- Autorización por propietario.
- Protección CSRF.
- Validación de entradas.
- No exposición de recursos pertenecientes a otros usuarios.

## 6. Trazabilidad y planificación

Incluye una tabla compacta que permita comprobar:

| Ticket | Historias | Requisitos | Componentes | Pruebas |
|---|---|---|---|---|

Identifica las dependencias entre los tres tickets.

Si propones un orden de implementación, explica brevemente por qué.

No añadas estimaciones de esfuerzo arbitrarias. Si la plantilla exige una estimación, indícala como **propuesta pendiente de validación**.

## 7. Decisiones pendientes

Revisa las decisiones abiertas de las secciones anteriores.

Cuando afecten a un ticket:

- Identifica la decisión.
- Explica qué parte del ticket depende de ella.
- Conserva el comportamiento provisional documentado, si existe.
- No presentes la decisión como aprobada.

Evita repetir extensamente el registro de decisiones del README; utiliza referencias a las secciones existentes.

## 8. Restricciones de edición

1. Modifica exclusivamente la sección 6 de `readme.md`.
2. No modifiques las secciones 0–5 ni la sección 7.
3. No modifiques `prompts.md`.
4. No generes código de aplicación.
5. No generes migraciones.
6. No crees pruebas ejecutables.
7. No instales dependencias.
8. No crees commits.
9. Conserva la estructura y encabezados oficiales de la plantilla.
10. Define exactamente tres tickets.
11. No continúes con la sección 7.
12. Evita duplicar innecesariamente especificaciones completas ya documentadas en otras secciones.

## 9. Validación final

Antes de terminar:

1. Comprueba que existen exactamente tres tickets.
2. Verifica que cada ticket corresponde al área solicitada.
3. Comprueba que HU-01, HU-02 y HU-03 tienen cobertura.
4. Comprueba que el requisito imprescindible de autenticación no queda omitido.
5. Verifica la consistencia con las secciones 2, 3, 4 y 5.
6. Comprueba que los criterios de aceptación son verificables.
7. Confirma que no se presentan pruebas propuestas como ejecutadas.
8. Ejecuta `git diff --check`.
9. Ejecuta `git diff --stat`.
10. Comprueba que únicamente se ha editado la sección 6 durante esta tarea.

## 10. Entregable

Al finalizar, presenta:

1. Resumen de los tres tickets.
2. Tabla de trazabilidad.
3. Dependencias y orden de implementación recomendado.
4. Decisiones pendientes que afectan a los tickets.
5. Riesgos o inconsistencias detectadas.
6. Resultado de `git diff --check`.
7. Resultado de `git diff --stat`.
8. Archivos y secciones modificados.
9. Confirmación de que no se implementó código ni se ejecutaron pruebas de aplicación.

**Detente al terminar la sección 6. No avances a Pull Requests.**
```

**Decisiones humanas** aportadas en el prompt:
- Exactamente tres tickets, uno por área, con la estructura de campos indicada y una definición de terminado que no se puede dar por cumplida.
- Las responsabilidades de cada ticket, incluida F1 en el backend.
- Las reglas de consistencia de sesiones, estados, integridad y seguridad.
- No incluir estimaciones arbitrarias ni mecanismos automáticos de versionado.

**Resultado generado por la IA:**
- **T-01 Backend** (11 tareas y 12 criterios), **T-02 Frontend** (10 tareas y 10 criterios) y **T-03 Base de datos** (8 tareas y 8 criterios), bajo los marcadores `**Ticket 1–3**` de la plantilla.
- **Decisiones de la IA:**
  - el orden de implementación T-03 → T-01 → T-02, distinto de la numeración de la plantilla;
  - las exclusiones explícitas: cambio de contraseña, tarea programada, *trigger* de refuerzo e `Idempotency-Key`;
  - la inmutabilidad del catálogo como regla de revisión de PR, sin comprobación automática, tal como fija 3.2.
- **Riesgos que detectó la IA:**
  - la sección 0 está vacía, así que falta la URL que pide CE6;
  - la sección 1.4 sigue pendiente;
  - T-01 es demasiado grande;
  - las *seeds* son provisionales.
- **Más adelante cambió:**
  - ningún ticket incluía en su alcance el **despliegue** ni la **documentación de instalación**; lo detectó la IA en el Prompt 13 (DEV-036 y DEV-037);
  - la navegación de T-02 y su exclusión de la "internacionalización" quedaron sustituidas por decisiones posteriores del Product Owner (Prompt 15). T-02 no se modificó.
- **Validación:**
  - `git diff --check` salió sin errores;
  - el script de comprobación revisó 49 tablas, sin filas con errores;
  - la sección 0 y la 7 son idénticas a HEAD, y la cita de la plantilla de la sección 6 quedó intacta, incluido su espacio final original;
  - `git diff --stat`: 2749 inserciones acumuladas en `readme.md`;
  - no se generó código y no se ejecutaron pruebas.

**Prompt 2:**

*Prompt 13 — Backlog técnico ampliado del MVP*

- **Herramienta:** Claude Code (modelo `claude-opus-5-5`), en la misma sesión.
- **Objetivo:** descomponer T-01 a T-03 en tickets pequeños y verificables, organizados por los incrementos I1–I6.
- **Archivo afectado:** `readme.md` (sección 6, nuevo apartado "Backlog técnico ampliado del MVP").

Texto literal del prompt:

```text
# Prompt 13 — Cali Coach: backlog técnico para implementar el MVP

Actúa como Tech Lead y Engineering Manager senior, especializado en desarrollo ágil de aplicaciones full-stack con React, TypeScript, Express, PostgreSQL y Prisma.

Estamos desarrollando Cali Coach como proyecto final de AI4Devs.

La documentación ya contiene:
- Requisitos funcionales F1–F10.
- Arquitectura del sistema.
- Modelo de datos.
- Contrato REST.
- Historias de alto nivel HU-01 a HU-03.
- Backlog ampliado HU-04 a HU-23.
- Tres tickets técnicos generales T-01, T-02 y T-03.

Queremos transformar esta documentación en un plan de trabajo que permita construir un MVP realmente funcional.

## 1. Objetivo

Ampliar exclusivamente la sección 6 de `readme.md` con un backlog de tickets técnicos pequeños, verificables y organizados por incrementos funcionales.

Conserva íntegramente los tres tickets originales T-01, T-02 y T-03 como tickets de alto nivel.

Añade una subsección nueva titulada:

**Backlog técnico ampliado del MVP**

Utiliza identificadores nuevos y únicos, por ejemplo `DEV-001`, `DEV-002`, etc.

No establezcas un número artificial de tickets.

## 2. Análisis obligatorio

Lee íntegramente las secciones 1–6 del README.

Presta especial atención a:
- Historias HU-04 a HU-23.
- Criterios transversales CT-01 a CT-06.
- Incrementos I1–I6.
- Endpoints y contratos HTTP.
- Modelo de datos y restricciones.
- Reglas de concurrencia y reconciliación.
- Seguridad y autenticación.
- Pruebas propuestas.
- Decisiones pendientes del Product Owner.

No inventes funcionalidades ni modifiques decisiones existentes.

## 3. Organización por incrementos

Organiza los tickets siguiendo los incrementos funcionales definidos en la sección 5.

### I1 — Acceso y perfil
Registro, inicio y cierre de sesión, autenticación, disponibilidad semanal y zona horaria.

### I2 — Catálogo
Programas, plantillas, ejercicios y prescripciones.

### I3 — Activación y calendario
Inscripciones, generación de sesiones, calendario y programa activo.

### I4 — Ejecución
Detalle de sesión, registro y modificación de series, finalización explícita.

### I5 — Reconciliación y cierre
Clasificación `partial`/`skipped`, cierre de inscripciones y consistencia temporal.

### I6 — Progreso y validación
Historial, resumen de progreso, desempeño por ejercicio y pruebas end-to-end.

Identifica cualquier dependencia que obligue a adelantar parte de un incremento.

En particular, las validaciones temporales y de estado deben existir desde que se habiliten operaciones sobre sesiones, aunque la reconciliación completa se entregue en I5.

## 4. Granularidad de los tickets

Cada ticket debe representar una unidad de trabajo concreta.

Evita tickets genéricos como:
- Implementar todo el backend.
- Construir toda la interfaz.
- Crear todas las pruebas.

Prefiere tickets que produzcan un resultado verificable, por ejemplo:
- Crear migraciones para autenticación y perfiles.
- Implementar registro e inicio de sesión.
- Construir pantalla de configuración de disponibilidad.
- Implementar servicio de activación transaccional.
- Construir calendario de sesiones.
- Implementar registro de series con validación de prescripción.

No conviertas automáticamente cada endpoint en un ticket.

## 5. Información obligatoria por ticket

Incluye:

1. ID y título.
2. Incremento funcional.
3. Área: backend, frontend, base de datos, integración o pruebas.
4. Prioridad.
5. Historias relacionadas.
6. Objetivo.
7. Alcance técnico concreto.
8. Dependencias.
9. Criterios de aceptación verificables.
10. Pruebas necesarias.
11. Definición de terminado.
12. Decisiones pendientes que puedan bloquearlo.

Mantén cada ticket conciso y evita repetir especificaciones completas del README.

## 6. Dependencias y orden de trabajo

Propón un orden de implementación que permita validar el sistema progresivamente.

Identifica:
- Tickets bloqueantes.
- Tickets que pueden desarrollarse en paralelo.
- Dependencias entre base de datos, backend y frontend.
- Primer recorrido end-to-end funcional.
- Riesgos técnicos que deben resolverse temprano.

No inventes estimaciones de esfuerzo.

## 7. Estrategia de calidad

Incluye tickets o criterios explícitos para:

- Pruebas unitarias.
- Pruebas de integración con PostgreSQL real.
- Pruebas de contrato API.
- Pruebas de componentes React.
- Pruebas end-to-end.
- Autenticación, autorización y CSRF.
- Concurrencia y transacciones.
- Manejo de errores.
- Compatibilidad responsive desde 320 px.

Las pruebas deben formar parte del desarrollo de cada incremento; no deben concentrarse exclusivamente al final.

## 8. Alcance

Prioriza HU-04 a HU-22 según las prioridades y dependencias documentadas.

HU-23, correspondiente a hitos, debe quedar identificada como mejora posterior, sin introducir trabajo obligatorio de implementación para el MVP inicial.

Conserva las decisiones pendientes y los supuestos provisionales.

No agregues nuevas entidades, endpoints ni funcionalidades sin señalar explícitamente que requieren una decisión previa.

## 9. Restricciones

1. Modifica únicamente la sección 6 de `readme.md`.
2. Conserva los tres tickets originales.
3. No modifiques las secciones 0–5 ni la sección 7.
4. No modifiques `prompts.md`.
5. No generes código.
6. No generes migraciones.
7. No implementes pruebas.
8. No instales dependencias.
9. No crees commits.
10. No cambies la arquitectura.
11. No presentes propuestas como funcionalidades implementadas.

## 10. Entregable

Presenta:

1. Número total de tickets nuevos.
2. Tabla de tickets por incremento y área.
3. Matriz de trazabilidad entre historias y tickets.
4. Dependencias y orden recomendado.
5. Identificación del primer recorrido end-to-end.
6. Riesgos y decisiones pendientes.
7. Resultado de `git diff --check`.
8. Resultado de `git diff --stat`.
9. Confirmación de archivos y secciones modificados.

No avances a la sección 7 ni implementes código.
```

**Decisiones humanas** aportadas en el prompt:
- Conservar T-01 a T-03, usar identificadores `DEV-xxx` y organizar los tickets por los incrementos I1–I6 de la sección 5.
- Los doce campos obligatorios de cada ticket y la granularidad: ni tickets genéricos ni un ticket por endpoint.
- Que las validaciones temporales y de estado existan desde que se habilitan las operaciones sobre sesiones.
- La estrategia de calidad repartida por incremento, y HU-23 sin trabajo obligatorio.
- Sin estimaciones de esfuerzo.

**Resultado generado por la IA:**
- **37 tickets** (DEV-001 a DEV-037), con una definición de terminado común y una regla de calidad por incremento.
- **Tablas añadidas:** tickets por incremento y área, trazabilidad entre historias y tickets, estrategia de calidad por tipo de prueba, dependencias y paralelismo, orden recomendado, primer recorrido E2E (DEV-026, al cerrar I4), riesgos tempranos y decisiones pendientes por ticket.
- **Huecos que detectó la IA en T-01 a T-03:** el despliegue (CE6) y la documentación de instalación (1.4). Los cubren DEV-036 y DEV-037.
- **Defecto que luego corrigió la revisión humana** (Prompt 14): la reconciliación previa a la activación se dejó en I5, como un punto de extensión en DEV-016 que se conectaba en DEV-028. Esto se apartaba del contrato de la sección 4, y la IA lo justificó diciendo que "en I3 no hay riesgo práctico".
- **Validación:**
  - el script de comprobación revisó 59 tablas, sin filas con errores;
  - `git diff --check` salió con exit 2 por la línea de cita de la plantilla de la sección 6. Esa línea ya terminaba con un espacio en HEAD y es idéntica: el algoritmo por defecto la presentó como borrada y añadida al reordenar el diff tras un inserto grande. Se comprobó que las 10 líneas de la plantilla que aparecían como borradas seguían en el archivo, y la IA no modificó ese espacio;
  - `git diff --stat`: 4142 inserciones y 23 borradas con el algoritmo por defecto, y 11 borradas con `--patience`;
  - no se generó código y no se ejecutaron pruebas.

**Prompt 3:**

*Prompt 14 — Corrección de dependencias críticas*

- **Herramienta:** Claude Code (modelo `claude-opus-5-5`), en la misma sesión.
- **Objetivo:** corregir las dependencias del backlog técnico que impedían entregar incrementos coherentes, en especial la reconciliación previa a la activación.
- **Archivo afectado:** `readme.md` (backlog técnico de la sección 6).

Texto literal del prompt:

```text
# Prompt 14 — Cali Coach: corregir dependencias críticas antes de implementar

Actúa como Tech Lead de Cali Coach.

Revisa las secciones 2, 4, 5 y 6 de `readme.md`, especialmente los tickets DEV-015 a DEV-028.

Objetivo: corregir exclusivamente las dependencias técnicas que impedirían entregar incrementos funcionalmente coherentes.

1. Garantiza que la activación de programas en I3 reconcilia previamente las inscripciones vencidas, tal como exige el contrato de la sección 4.
2. Identifica qué parte mínima del protocolo de reconciliación debe implementarse antes de habilitar esa activación.
3. Conserva en I5 las tareas de reconciliación completa, automatización y pruebas adicionales que no sean prerrequisitos.
4. Revisa las dependencias de DEV-021 para asegurar que ninguna operación de escritura sobre sesiones se implemente sin el protocolo transaccional requerido.
5. Actualiza solamente las referencias y dependencias afectadas dentro del backlog técnico ampliado de la sección 6.
6. No modifiques las historias de usuario ni los tickets T-01 a T-03.
7. No implementes código, migraciones ni pruebas.
8. No crees commits.

Valida los cambios mediante:

- `git diff --patience --check -- readme.md`
- `git diff --patience --stat`
- Comparación de las secciones afectadas antes y después.

Explica cualquier error de whitespace sin modificar contenido original de la plantilla innecesariamente.

Entrega un resumen de los cambios y confirma que el recorrido funcional I3 e I4 mantiene las reglas de negocio documentadas.
```

**Revisión y decisiones humanas:**
- El equipo detectó que la activación de I3 no cumplía el contrato de la sección 4, porque la reconciliación se aplazaba a I5. Exigió corregirlo con el mínimo trabajo adelantado.
- Pidió revisar que ninguna escritura sobre sesiones se implementara sin el protocolo de DEV-021.
- Fijó el método de validación: `--patience`, comparación antes y después, y explicación del aviso de espacios sin tocar la plantilla.

**Resultado generado por la IA:**
- **DEV-020, DEV-021 y DEV-027 adelantados a I3**, sin renumerar. DEV-027 se convirtió en "Reconciliación mínima", con la justificación de por qué no se puede recortar más:
  - sin el bloqueo, una sesión con actividad podría cerrarse como `skipped`;
  - sin la clasificación, no se distingue `partial` de `skipped`;
  - sin el paso a `finished`, la activación devolvería un `409` erróneo.
- **DEV-021:** se añadió una regla explícita: ninguna escritura sobre sesiones, registros o estado de las inscripciones se hace sin ese ticket.
- **DEV-016:** reconcilia antes de comprobar si hay un programa activo. API-17 y API-41 pasan a I3.
- **DEV-028 y DEV-029:** DEV-028 se limitó a los `GET`, y DEV-029 recibió C3, C8 y la comprobación con `EXPLAIN`. Se actualizaron las tablas y el orden de trabajo.
- **Limitación que la IA documentó y que luego se resolvió:** entre I3 e I4, los `GET` seguían mostrando como `planned` las sesiones vencidas, lo que se apartaba del contrato de la sección 4. La IA la dejó documentada y propuso adelantar también esa parte. El equipo lo decidió en el Prompt 15.
- **Validación:**
  - `git diff --patience --check -- readme.md` salió con exit 2 por la misma línea de la plantilla. La salida de `git diff --patience` mostraba esa línea como contexto, sin ninguna línea borrada en `readme.md` y sin ninguna línea añadida con espacio final. Se comprobó que `--check` ignora `--patience` y `diff.algorithm=patience` en git 2.53.0;
  - `git diff --patience --stat`: 5326 inserciones y 11 borradas;
  - frente a una copia guardada antes de este paso, las secciones 0–5 y 7, la plantilla y T-01 a T-03 son idénticas, y hay 37 tickets sin duplicados;
  - no se generó código y no se ejecutaron pruebas.

---

### 7. Pull Requests

**Prompt 1:**

**Prompt 2:**

**Prompt 3:**

---

## Prompts de implementación de la Entrega 2

> Los huecos de tres prompts por sección ya están ocupados, salvo 2.4, Prompt 3. Por decisión del autor (L9 de DEV-039), los prompts de implementación de la Entrega 2 a partir del 24 se registran en esta sección, con las mismas convenciones y en orden. No cambia ninguna entrada anterior.

**Prompt 24 — DEV-039 (parcial): tokens y componentes base del sistema de diseño**

- **Herramienta:** Claude Code (modelo `claude-opus-5-5`), en la misma sesión que DEV-001 a DEV-004 y DEV-038. Roles indicados por el autor: el usuario es el Product Owner; ChatGPT, analista y revisor; Claude Code, implementador.
- **Objetivo:** analizar DEV-039 parcial sin modificar archivos y, tras la aprobación de L1–L9, implementar los tokens, los estilos globales y los componentes `Card`, `Button`, `TextField` e `InlineAlert` en una rama, y validarlos en local, sin commit, push ni PR.
- **Archivos afectados:**
  - **nuevos:**
    - `frontend/src/shared/styles/`: `tokens.css`, `global.css` y `tokens.test.ts`;
    - `frontend/src/shared/ui/`: `Card`, `Button`, `TextField` e `InlineAlert` (cada uno con `.tsx`, `.css` y `.test.tsx`), `classNames.ts` con su prueba y `ui-i18n.test.tsx`;
  - **modificados:** `frontend/src/main.tsx`, `frontend/index.html` (`color-scheme`), `CLAUDE.md`, `readme.md` (0.3, 2.6 y 6), `docs/design-system.md` (2, 2.1, 2.2 y 3.2) y `prompts.md`;
  - **sin cambios:** el backend, la base de datos, las dependencias, la CI, los E2E, la configuración de i18n, la regla de ESLint y la vista de diagnóstico.

Texto literal del prompt (análisis):

```text
# Cali Coach — DEV-039 parcial: análisis técnico

Actúa como arquitecto frontend y desarrollador de Cali Coach.

Necesito un análisis técnico de DEV-039 parcial para la Entrega 2.

IMPORTANTE: esta solicitud es exclusivamente de análisis y planificación.

NO modifiques archivos, instales dependencias, crees ramas, commits, pushes ni Pull Requests.

## 1. Contexto

- Proyecto: Cali Coach.
- Product Owner: usuario.
- Analista y revisor: ChatGPT.
- Implementador: Claude Code.
- Rama esperada: main.
- HEAD esperado: 3d1ec298d3ccd15800715b6d38246eaeffc074b2.
- DEV-001, DEV-002, DEV-003 y DEV-004: terminados.
- DEV-038: incremento parcial integrado, ticket completo todavía pendiente.
- Próximos incrementos: DEV-039 parcial → DEV-006 parcial → DEV-007 parcial.

Objetivo de Entrega 2:

Conseguir una funcionalidad real de extremo a extremo:

Formulario de registro React → POST /api/auth/register → PostgreSQL → sesión autenticada.

DEV-039 únicamente prepara los componentes visuales que necesitará ese flujo.

## 2. Verificación inicial

Antes de proponer cambios:

1. Confirma HEAD, rama y estado limpio.
2. Lee CLAUDE.md.
3. Lee readme.md, especialmente DEV-039 y sus criterios de aceptación.
4. Lee docs/design-system.md completo.
5. Revisa prompts.md para conocer las convenciones del proyecto.
6. Inspecciona la estructura real del frontend.
7. Revisa la configuración actual de CSS, React, TypeScript, Vitest y ESLint.
8. Examina los componentes y estilos existentes de DiagnosticsPage.
9. Comprueba cómo funciona la infraestructura i18n integrada en DEV-038.

No asumas que los componentes o tokens ya existen.

## 3. Alcance propuesto

Analiza la implementación mínima de:

### A. Design tokens

- Colores para el tema oscuro.
- Tipografía.
- Espaciado.
- Radios.
- Bordes.
- Estados de foco.
- Estados de error.
- Estados deshabilitados.

Los valores deben derivarse de docs/design-system.md.

No inventes una segunda identidad visual.

### B. Estilos globales

- Reset o normalización mínima.
- Fondo y color de texto.
- Tipografía base.
- Box sizing.
- Comportamiento responsive.
- Compatibilidad con 320 px.
- Accesibilidad y foco visible.

### C. Componentes reutilizables

Analiza los contratos mínimos de:

1. Card
2. Button
3. TextField
4. InlineAlert

Para cada componente, define:

- Props y tipos TypeScript.
- Variantes necesarias.
- Estados.
- Comportamiento accesible.
- Integración con formularios.
- Integración con i18n.
- Estrategia de estilos.
- Pruebas necesarias.

Prefiere componentes nativos de React/HTML con props estándar, evitando abstracciones innecesarias.

## 4. Restricciones

Quedan fuera de DEV-039 parcial:

- Pantalla de registro S-01.
- Login y logout.
- Router.
- Cliente HTTP.
- SessionProvider.
- Formularios conectados al backend.
- TanStack Query.
- Librerías de componentes externas.
- Bibliotecas de formularios.
- Nuevas traducciones de pantallas.
- Cambios en backend o base de datos.
- Cambios en los criterios de producto DP-01 a DP-17.

No propongas instalar dependencias si CSS y React nativos resuelven el problema.

## 5. Integración con DEV-038

Analiza:

1. Cómo los componentes recibirán textos ya traducidos mediante props.
2. Cómo evitar textos visibles escritos directamente en JSX.
3. Cómo utilizar los mensajes de errors.json sin acoplar los componentes al backend.
4. Cómo mantener la regla ESLint de DEV-038.
5. Cómo preservar la excepción temporal de DiagnosticsPage o retirarla de forma controlada.

No modifiques la infraestructura de i18n salvo que identifiques un bloqueo real.

## 6. Seguridad y accesibilidad

Comprueba especialmente:

- Compatibilidad con la CSP estricta de DEV-003.
- Ausencia de estilos inline y de dependencias que los inyecten.
- Navegación con teclado.
- Foco visible.
- Etiquetas accesibles en TextField.
- Asociación de errores con aria-describedby.
- aria-invalid.
- Estados loading y disabled en Button.
- role="alert" cuando corresponda.
- Contraste suficiente según el diseño.
- Responsive desde 320 px.

Distingue los requisitos obligatorios de las mejoras posteriores.

## 7. Plan de pruebas

Propón pruebas con Vitest y React Testing Library para:

- Renderizado de los cuatro componentes.
- Props y variantes.
- Accesibilidad básica.
- Interacción por teclado.
- Estados disabled y loading.
- Asociación de label, input y error.
- Alertas.
- Ausencia de regresiones en DiagnosticsPage.
- Compatibilidad con ESLint e i18n.

Evalúa si hace falta alguna prueba E2E nueva o si bastan las seis existentes para este incremento.

## 8. Documentación

Indica qué cambios serían necesarios en:

- readme.md.
- docs/design-system.md.
- CLAUDE.md.
- prompts.md.

Mantén DEV-039 como PARCIAL.

No marques completados criterios que todavía no se implementen.

No modifiques los Prompts 16–18.

Propón una ubicación para el próximo prompt sin sobrescribir entradas existentes.

## 9. Entregable del análisis

Entrega un informe estructurado con:

A. Estado inicial del repositorio.

B. Alcance exacto de DEV-039 según la documentación.

C. Alcance parcial recomendado y trabajo diferido.

D. Propuesta de tokens CSS y correspondencia con el diseño existente.

E. Contratos TypeScript de Card, Button, TextField e InlineAlert.

F. Estructura de archivos propuesta.

G. Integración con i18n, CSP y DiagnosticsPage.

H. Estrategia de accesibilidad y responsive.

I. Plan de pruebas.

J. Criterios de aceptación verificables.

K. Riesgos y alternativas.

L. Decisiones técnicas que requieren aprobación del Product Owner.

M. Secuencia de implementación propuesta.

## 10. Condición de parada

No implementes nada todavía.

Espera la aprobación explícita del Product Owner antes de crear una rama o modificar código.
```

Texto literal del prompt (implementación):

```text
# Cali Coach — DEV-039 parcial: implementación local autorizada

Como Product Owner, apruebo las decisiones L1–L9 del análisis técnico de DEV-039 parcial, con los ajustes descritos a continuación.

Autorizo crear una rama e implementar DEV-039 parcial localmente.

NO autorizo commit, push, Pull Request ni merge.

## Contexto

- Proyecto: Cali Coach.
- Base esperada de main: 3d1ec298d3ccd15800715b6d38246eaeffc074b2.
- DEV-038 parcial: integrado y documentado.
- Objetivo de Entrega 2: registro React → Express → PostgreSQL.
- Orden aprobado: DEV-039 parcial → DEV-006 parcial → DEV-007 parcial.

## Fase 1 — Preparación

1. Confirma que main coincide con origin/main.
2. Confirma que el árbol está limpio.
3. Lee CLAUDE.md, readme.md y docs/design-system.md.
4. Crea feature/dev-039-design-foundation desde main.
5. Comprueba los contratos y restricciones existentes.

Si main ha avanzado de forma incompatible, detente y consulta.

## Fase 2 — Tokens y estilos globales

Implementa:

- frontend/src/shared/styles/tokens.css
- frontend/src/shared/styles/global.css

Utiliza los tokens de docs/design-system.md.

Apruebo los tres detalles de L2:

- --color-on-primary: #FFFFFF.
- Separación de 2 px para el anillo de foco.
- Estado deshabilitado con surface-raised, text-disabled y border-control.

Documéntalos como propuestas donde corresponda.

Mantén exclusivamente el tema oscuro.

Añade el metadato color-scheme dark a index.html.

No añadas fuentes externas, temas alternativos ni dependencias.

## Fase 3 — Componentes

Implementa con React, TypeScript y CSS nativos:

1. Card
2. Button
3. TextField
4. InlineAlert

Utiliza clases CSS prefijadas con cc-.

Los componentes deben recibir los textos mediante props. No incluyas textos visibles escritos directamente en JSX ni mensajes por defecto en inglés.

### Button

- Variantes primary y secondary.
- type="button" por defecto.
- Estados disabled y loading.
- Tamaño táctil mínimo de 44 × 44 px.
- Durante loading, mantener el foco cuando sea posible.
- Impedir la ejecución de onClick y el envío del formulario desde el botón durante loading.
- Probar clic, doble clic, Enter y Espacio.
- Utilizar un indicador visual decorativo sin texto por defecto.
- No utilizar estilos inline.

La protección del componente no sustituye al bloqueo de solicitudes duplicadas que deberá implementar DEV-007.

### TextField

- Label obligatorio.
- Hint y error opcionales.
- Asociación correcta mediante htmlFor e id.
- aria-invalid cuando existe error.
- aria-describedby debe conservar los identificadores proporcionados por el consumidor y añadir los de hint/error sin duplicados.
- Propagación de ref, name, autoComplete, required, value y onChange.
- Compatibilidad con formularios controlados y no controlados.
- Altura mínima de 44 px.

### InlineAlert

- Error: role="alert".
- Info: role="status".
- Icono decorativo y texto.
- El color no debe ser el único indicador.
- Mensajes proporcionados por el consumidor.

### Card

- Contenedor neutro.
- Variante raised.
- Propagación de className y atributos nativos.
- Sin introducir semántica incorrecta.

## Fase 4 — Contraste y accesibilidad

Implementa pruebas automáticas de contraste basadas en los valores reales de tokens.css.

Verifica las combinaciones utilizadas:

- Texto principal y secundario sobre sus fondos.
- Texto sobre primary y primary-pressed.
- Bordes de controles sobre sus superficies.
- Texto y bordes de error sobre los fondos correspondientes.
- Estados deshabilitados, documentando las excepciones WCAG que correspondan.

Utiliza los umbrales del análisis:

- Texto normal: 4,5:1.
- Controles y componentes visuales relevantes: 3:1.

No ajustes silenciosamente los valores del diseño si encuentras un contraste insuficiente. Informa del problema y propón una corrección.

Implementa foco visible, soporte para prefers-reduced-motion y estilos fluidos compatibles con 320 px.

## Fase 5 — Integración

1. Importa los estilos globales desde main.tsx.
2. Conserva I18nProvider y la configuración de DEV-038.
3. No cambies la regla ESLint de internacionalización.
4. Mantén DiagnosticsPage sin modificar.
5. Comprueba que sus estilos siguen respetando max-width: 480px.
6. No introduzcas estilos inline ni violaciones de CSP.

## Fase 6 — Pruebas

Implementa las pruebas propuestas en el análisis:

- Tokens y contraste.
- Card.
- Button.
- TextField.
- InlineAlert.
- Integración de los componentes con i18n.

Comprueba especialmente los tres ajustes aprobados:

1. Bloqueo de interacción y envío durante loading.
2. Conservación y combinación de aria-describedby.
3. Contraste de combinaciones reales.

Ejecuta:

- npm ci
- npm run lint
- npm run typecheck
- npm test
- npm run test:integration
- npm run build
- npm audit --audit-level=high
- git diff --check
- CI=1 npm run test:e2e

Los seis E2E existentes deben pasar, incluidos los de CSP.

No añadas una pantalla de demostración únicamente para probar los componentes.

## Fase 7 — Documentación

Actualiza:

- readme.md.
- docs/design-system.md.
- CLAUDE.md.
- prompts.md.

Registra las decisiones L1–L9 y los ajustes aprobados.

Marca DEV-039 como PARCIAL, indicando lo implementado y lo pendiente.

Para Prompt 24, utiliza una sección nueva titulada "Prompts de implementación de la Entrega 2", antes del Anexo.

No sobrescribas entradas existentes ni modifiques los Prompts 16–18.

## Fase 8 — Informe

Entrega:

1. Rama y commit base.
2. Lista de archivos creados y modificados.
3. Resumen del diff.
4. Contratos TypeScript implementados.
5. Evidencia del comportamiento de Button en loading.
6. Evidencia de accesibilidad de TextField.
7. Resultados de contraste.
8. Resultados de todas las pruebas.
9. Resultado E2E y CSP.
10. Riesgos y limitaciones.
11. Confirmación de que DEV-039 sigue PARCIAL.
12. Confirmación de que no hiciste commit, push ni PR.

## Restricciones

- No implementar DEV-006 ni DEV-007.
- No crear pantallas de registro.
- No introducir router, cliente HTTP ni SessionProvider.
- No modificar backend ni base de datos.
- No instalar dependencias nuevas.
- No modificar los Prompts 16–18.
- No hacer commit, push, PR ni merge.

Detente después del informe y espera mi revisión.
```

**Decisiones humanas:**
- **Sobre el análisis:** el autor aprobó L1–L9:
  - L1: tokens, estilos globales y `Card`, `Button` (`primary` y `secondary`), `TextField` e `InlineAlert` (`error` e `info`); el resto, diferido;
  - L2: `--color-on-primary` `#FFFFFF`, una separación de 2 px del anillo de foco y el estado deshabilitado con `surface-raised`, `text-disabled` y `border-control`, documentados como [Propuesta];
  - L3: solo tema oscuro, con `color-scheme: dark`;
  - L4: CSS normal con prefijo `cc-` y estados por atributos ARIA;
  - L5: errores de campo sin `role="alert"`; el resumen del formulario va en `InlineAlert`;
  - L6: `DiagnosticsPage` sin cambios, con su excepción de *lint* hasta DEV-006;
  - L7: sin axe ni dependencias nuevas, con una prueba de contraste propia;
  - L8: `TimezoneSelect`, diferido a DEV-007;
  - L9: una sección nueva para el Prompt 24 y los siguientes.
- **Ajustes de la implementación:**
  - en `loading`, `Button` mantiene el foco y no ejecuta `onClick` ni envía el formulario, probado con clic, doble clic, Enter y Espacio. No sustituye al bloqueo de peticiones duplicadas de DEV-007;
  - `aria-describedby` conserva los identificadores de quien usa `TextField` y añade los de la ayuda y el error, sin duplicados;
  - el contraste se comprueba con las combinaciones reales, sin ajustar el diseño en silencio si alguna no cumple.

**Resultado generado por la IA:**
- **Análisis** (sin modificar archivos): alcance parcial, tokens de §2.1, §2.2 y §3.1, contratos TypeScript, estructura de archivos, integración con i18n, CSP y `DiagnosticsPage`, plan de pruebas y nueve decisiones (L1–L9).
- **Implementación:**
  - `tokens.css` con los valores literales de `docs/design-system.md` y tres [Propuesta] (L2); `global.css` con *box-sizing*, fondo y texto, tipografía base, `:focus-visible` y `prefers-reduced-motion`;
  - `Button`, `TextField`, `InlineAlert` y `Card` con elementos nativos, props estándar y `ref` como prop (React 19). Los textos llegan por props, sin textos por defecto; los iconos son SVG decorativos (`aria-hidden`);
  - `idList` combina los `aria-describedby` sin duplicados.
- **Correcciones durante la implementación:**
  - en Vitest, `?raw` devuelve vacío para los CSS, así que la prueba de contraste lee los archivos con `node:fs`;
  - la prueba de integración con i18n no compilaba: con los tipos de DEV-038, las claves con prefijo (`auth:…`) exigen declarar sus espacios de nombres en `useTranslation`. Se ajustó la prueba, sin tocar la infraestructura de i18n.
- **Hallazgo de contraste:** el fondo del botón primario sobre `surface-raised` da 2,78:1, por debajo de 3:1 (sobre `bg`, 3,36; sobre `surface`, 3,10). La IA no cambió el valor y lo presentó en su informe. El autor pidió resolverlo antes de publicar con un borde visible, preferiblemente `border-control`, sin cambiar `#7C3AED` ni el texto blanco. La IA comprobó que `border-control` supera 3:1 sobre los tres fondos (4,08, 3,77 y 3,38) y lo aplicó solo a la variante `primary`; `tokens.test.ts` comprueba el borde en la regla real de `Button.css`, el estado pulsado y el contraste del texto.
- **Validación (local, 2026-11-27; detalle en el README, 2.6):**
  - `npm ci`, `lint`, `typecheck`, `build`, `git diff --check`: sin errores;
  - `npm test`: 201/201 del backend y 94/94 del frontend (53 nuevas, 5 de ellas tras la corrección de contraste; las 41 anteriores sin cambios);
  - `npm run test:integration`: 104/104;
  - `CI=1 npm run test:e2e`: 6/6, incluidas las 4 pruebas de CSP sobre el *build* real; `main.diagnostics` mantiene su `max-width: 480px`;
  - `npm audit --audit-level=high`: 0 vulnerabilidades; sin dependencias nuevas;
  - mutaciones temporales: quitar el `preventDefault` de `loading`, dejar que `loading` ejecute `onClick`, descartar el `aria-describedby` de quien usa el campo y quitar el borde del botón primario. Las pruebas detectaron las cuatro;
  - *build*: el JS no cambia (272,14 kB), porque ninguna pantalla usa aún los componentes; el CSS pasa de 0,09 kB a 2,14 kB (tokens y estilos globales).
  - **la ejecución en GitHub Actions estaba pendiente del PR** cuando se cerró la implementación. Ahora está en verde: ver la revisión humana.

**Revisión humana:**
- **Análisis:** el autor aprobó L1–L9 con los ajustes de "Decisiones humanas".
- **Implementación:** el autor aprobó el informe local en términos generales, pero pidió resolver antes de publicar el contraste del fondo primario sobre `surface-raised` (2,78:1) con un borde visible, preferiblemente `border-control`, sin cambiar `#7C3AED` ni el texto blanco y sin tocar `loading`, `disabled` ni `:focus-visible`. Pidió además que la prueba comprobara el borde en el CSS real de `Button`. La IA aplicó el borde solo a la variante `primary` (4,08, 3,77 y 3,38:1 sobre `bg`, `surface` y `surface-raised`) y retiró la recomendación de no usar botones primarios sobre `surface-raised`. El autor aprobó la corrección y autorizó el commit, el push, el PR y el E2E manual.
- **Publicación:** commit `3302d87` (`3302d87b3769c89bb3d9e2eb14bf888edffbec86`) sobre `3d1ec29`, con 24 archivos (18 nuevos y 6 modificados, +1650 y −3), y PR #13 (https://github.com/GeraGalindo/AI4Devs-finalproject/pull/13) hacia `main`. Su descripción indica "DEV-039 STATUS: PARTIAL — NOT COMPLETED".
- **CI en GitHub Actions** (sección 7 del README):
  - ejecución `pull_request` 46002169027, en verde: auditoría sin vulnerabilidades altas, lint, tipos, tests 201/201 y 94/94, migraciones, *drift*, salvaguarda, integración 104/104, fila centinela intacta y *build*. E2E omitido por diseño;
  - ejecución `workflow_dispatch` 46002362163 sobre el mismo commit `3302d87`, en verde, con el E2E 6/6 (el *smoke* de DEV-001 y las 5 pruebas de `spa-build`, 4 de ellas de la CSP);
  - ejecución `push` a `main` 46004162469, en verde, tras el merge: las mismas comprobaciones que en el PR.
- **Aprobación final:** el autor revisó los resultados del PR #13 y autorizó el merge. Antes se comprobó que el PR seguía abierto hacia `main`, que su último commit seguía siendo `3302d87`, que no había conflictos, que las dos ejecuciones habían pasado sobre ese commit, que el diff tenía los 24 archivos previstos sin cambios en backend, base de datos, CI, E2E ni dependencias, y que los Prompts 16–18 no habían cambiado. El merge se hizo con *merge commit* y `--match-head-commit 3302d87` el 2026-11-27 a las 13:05:50 UTC (`af52d36`, `af52d36c576e3b122a317dd05de5a477a5bcccdb`), sin *rebase*, *squash* ni *force push*. `main` local se actualizó por *fast-forward*.
- **Estado:** DEV-039 sigue **parcial**, no terminado. La parte implementada está integrada en `main`. Falta, para completarlo:
  - `AppShell`, `BottomNav`/`NavRail`, `TopBar` y las áreas seguras (criterios 1 y 4);
  - `IconButton`, `WeekdaySelector` y `TimezoneSelect`;
  - `Toast`, `Skeleton`/`Spinner`, `EmptyState`, `ErrorState`, `ConfirmDialog` (criterio 5), `StatusBadge` (criterio 7) y las variantes `ghost` y `danger`;
  - la medición en navegador de los 44 px y de los 320 px, axe, la revisión visual a 320, 768 y 1024 px y la comparación con el mockup.

  Pendiente para **DEV-007**: medir en el navegador los 44 px, los 320 px y el foco; bloquear las peticiones duplicadas en el formulario; el respaldo manual de la zona horaria (L8); y cubrir con el E2E de la CSP el CSS de los componentes, que aún no entra en el *build*. Lo siguiente, según el orden aprobado, es DEV-006 parcial, que no se ha empezado.

---

**Prompt 25 — DEV-006 (parcial): cliente HTTP, sesión y router**

- **Herramienta:** Claude Code (modelo `claude-opus-5-5`), en la misma sesión que DEV-001 a DEV-004, DEV-038 y DEV-039. Roles indicados por el autor: el usuario es el Product Owner; ChatGPT, analista y revisor; Claude Code, implementador.
- **Objetivo:** analizar DEV-006 parcial sin modificar archivos y, tras la aprobación de M1–M8, implementar el cliente HTTP, la API de sesión, el `SessionProvider` y el *router* mínimo en una rama, y validarlos en local, sin commit, push ni PR.
- **Archivos afectados:**
  - **nuevos:**
    - `frontend/src/shared/api/`: `client.ts` y `client.test.ts`;
    - `frontend/src/features/auth/`: `types.ts`, `api.ts`, `session.ts`, `SessionProvider.tsx` y las pruebas `api.test.ts` y `SessionProvider.test.tsx`;
    - `frontend/src/app/`: `AppRoutes.tsx` y `AppRoutes.test.tsx`;
  - **modificados:** `frontend/src/app/App.tsx`, `frontend/package.json`, `package-lock.json`, `CLAUDE.md`, `readme.md` (0.3, 1.2, 1.4, 2.2, 2.6 y 6) y `prompts.md`;
  - **sin cambios:** el backend, la base de datos, la CI, los E2E, `DiagnosticsPage` y `checkHealth`, la configuración de i18n y los componentes de DEV-039.

Texto literal del prompt (análisis):

```text
# Cali Coach — DEV-006 parcial: análisis técnico previo

Actúa como arquitecto frontend y analista técnico del proyecto Cali Coach.

Necesito un análisis de DEV-006 parcial para preparar la infraestructura del registro de usuarios de la Entrega 2.

IMPORTANTE: SOLO LECTURA.

NO modifiques archivos, instales dependencias, crees ramas, commits, pushes ni Pull Requests.

## 1. Estado inicial

Comprueba:

- main y origin/main en 09453150434f85d04f4d0ca95479eca5e2cff71c.
- Árbol limpio.
- DEV-004 completado.
- DEV-038 parcial integrado.
- DEV-039 parcial integrado y documentado.

Lee los archivos reales:

- CLAUDE.md.
- readme.md, especialmente DEV-006, DEV-007 y los contratos API.
- docs/design-system.md.
- prompts.md.
- frontend/package.json.
- frontend/src/main.tsx.
- frontend/src/App.tsx y la estructura de features.
- Configuración de Vite, TypeScript, ESLint y Vitest.
- Infraestructura i18n y componentes UI existentes.
- Backend: rutas, esquemas, middlewares y pruebas de autenticación de DEV-004.
- Backend: políticas de CSRF, Origin, cookies, errores y manejo de sesiones de DEV-003.

No presupongas contratos: compruébalos en el código.

## 2. Alcance de DEV-006 completo

Extrae del README:

- Descripción.
- Dependencias.
- Criterios de aceptación.
- Pruebas.
- Contratos relacionados.

Distingue claramente lo que pertenece a DEV-006 completo de lo que necesitamos para la Entrega 2.

## 3. Alcance parcial propuesto

Propón implementar exclusivamente:

1. React Router.
2. Cliente HTTP tipado.
3. Envío correcto de cookies y cabeceras CSRF.
4. Normalización de respuestas y errores.
5. SessionProvider con restauración mediante GET /api/auth/me.
6. Estados explícitos de sesión: loading, authenticated y unauthenticated.
7. Rutas mínimas necesarias para el registro posterior.

Rutas previstas:

- /signup: reservada para DEV-007.
- /: punto de entrada, todavía sin página de usuario definitiva.
- /diagnostics: conservar la pantalla existente.

No construyas la pantalla de registro ni una página provisional con datos de usuario en este incremento.

## 4. Contratos reales del backend

Inspecciona y documenta:

- POST /api/auth/register.
- POST /api/auth/login.
- GET /api/auth/me.
- POST /api/auth/logout.

Para cada uno:

- Método y ruta.
- Cuerpo esperado.
- Respuesta exitosa.
- Códigos HTTP.
- Cookie y sesión.
- Requisitos de Origin y CSRF.
- Errores relevantes.

Aunque el frontend solo necesite registro y restauración en esta Entrega 2, debemos conocer los contratos existentes.

## 5. Cliente HTTP

Analiza y propone:

- Uso de fetch nativo.
- Base URL relativa /api.
- credentials: include.
- Cabeceras Origin y X-CSRF-Protection según el contrato real.
- Restricciones del navegador para configurar Origin.
- Content-Type solo cuando corresponda.
- Parseo de JSON y respuestas sin cuerpo.
- Respuestas no JSON o malformadas.
- Errores de red.
- AbortController.
- Tipos de respuesta.
- Mapeo de códigos de error para i18n.
- Prohibición de confiar en error.message del servidor como texto visible.

Determina si hace falta una dependencia nueva. Preferencia: ninguna salvo React Router.

## 6. SessionProvider

Propón un diseño que contemple:

- Restauración de sesión al iniciar la aplicación.
- GET /api/auth/me.
- Cookie HttpOnly, sin acceso desde JavaScript.
- Estados loading/authenticated/unauthenticated.
- Tratamiento de 401.
- Tratamiento de errores de red o 5xx sin confundirlos con 401.
- Cancelación de solicitudes obsoletas.
- Evitar carreras entre restauración y registro.
- Exposición de acciones para que DEV-007 pueda actualizar la sesión tras un registro exitoso.
- Comportamiento al recargar la página.
- React StrictMode y posibles solicitudes duplicadas.

No implementes login/logout UI.

## 7. Router y DiagnosticsPage

Propón cómo integrar:

- /signup.
- /.
- /diagnostics.

Conserva el diagnóstico existente y sus pruebas.

Analiza cómo evitar páginas de relleno y qué comportamiento mínimo corresponde a las rutas todavía no implementadas.

Evalúa qué cambios necesitará el smoke E2E actual.

No construyas AppShell, BottomNav/NavRail ni TopBar.

## 8. i18n y diseño

Confirma compatibilidad con:

- I18nProvider de DEV-038.
- Catálogos en inglés.
- translateErrorCode.
- Regla ESLint sin textos literales.
- Tokens y componentes de DEV-039.
- CSP estricta.
- Diseño responsive desde 320 px.

Identifica cualquier clave nueva necesaria, sin implementarla.

## 9. Pruebas y CI

Propón pruebas de:

- Cliente HTTP: cookies, CSRF, errores, 204, JSON malformado y abort.
- SessionProvider: 200, 401, error de red, 5xx, restauración, cancelación y carreras.
- Router: rutas mínimas y diagnóstico.
- Regresión de las pruebas existentes.
- E2E de diagnóstico y CSP.

Identifica si DEV-006 necesita E2E nuevos.

Recuerda que en DEV-007 el registro E2E debe ejecutarse automáticamente en la CI del PR, no solo manualmente.

## 10. Documentación

Identifica actualizaciones necesarias en:

- readme.md.
- CLAUDE.md.
- prompts.md.

DEV-006 debe quedar PARCIAL.

Conserva los Prompts 16–18 intactos.

Propón la ubicación del Prompt 25 siguiendo la estructura creada para el Prompt 24.

## 11. Decisiones para el Product Owner

Presenta las decisiones técnicas que necesiten aprobación.

Para cada decisión incluye:

- Alternativas.
- Recomendación.
- Consecuencias.
- Riesgos.

No cambies decisiones de producto ya aprobadas.

## 12. Formato del informe

Organiza la respuesta en:

A. Estado inicial.
B. DEV-006 completo según documentación.
C. Alcance parcial y exclusiones.
D. Contratos backend verificados.
E. Diseño del cliente HTTP.
F. Diseño del SessionProvider.
G. Diseño del router.
H. Integración con i18n, CSS y CSP.
I. Estructura de archivos propuesta.
J. Plan de pruebas y CI.
K. Criterios de aceptación verificables.
L. Riesgos y alternativas.
M. Decisiones para aprobación del Product Owner.
N. Secuencia de implementación propuesta.

Detente al terminar el análisis.

No implementes nada hasta recibir autorización explícita.
```

Texto literal del prompt (implementación):

```text
# Cali Coach — DEV-006 parcial: implementación local autorizada

Como Product Owner, apruebo las decisiones M1–M8 del análisis técnico de DEV-006 parcial, con los ajustes descritos a continuación.

Autorizo crear una rama e implementar DEV-006 parcial localmente.

NO autorizo commit, push, Pull Request ni merge.

## Contexto

- Proyecto: Cali Coach.
- Base esperada de main: 09453150434f85d04f4d0ca95479eca5e2cff71c.
- DEV-004 completado.
- DEV-038 parcial integrado.
- DEV-039 parcial integrado y documentado.
- Objetivo de Entrega 2: registro React → Express → PostgreSQL.
- Siguiente incremento después de DEV-006: DEV-007 parcial.

## Fase 1 — Preparación

1. Confirma que main coincide con origin/main.
2. Confirma que el árbol está limpio.
3. Lee CLAUDE.md, readme.md y los contratos reales del backend.
4. Crea feature/dev-006-frontend-foundation desde main.
5. Comprueba los contratos de CSRF, cookies, errores y autenticación.

Si main ha avanzado de forma incompatible, detente y consulta.

## Fase 2 — Dependencia

Instala react-router@8.5.1 con versión exacta.

Comprueba:

- Compatibilidad con React 19 y Node.
- Dependencias transitivas.
- npm ls.
- npm audit --audit-level=high.
- Cambios del lockfile.

No instales TanStack Query ni otras dependencias.

Si aparecen vulnerabilidades o incompatibilidades, detente y consulta antes de cambiar versiones.

## Fase 3 — Cliente HTTP

Implementa un cliente tipado sobre fetch nativo en shared/api/.

Requisitos:

1. Solo acepta rutas relativas que comienzan con /api/.
2. Rechaza URLs absolutas, protocolos y rutas //host.
3. Utiliza credentials: 'same-origin'.
4. Envía Accept: application/json.
5. Envía X-CSRF-Protection: 1 en POST, PUT, PATCH y DELETE.
6. No intenta establecer manualmente Origin: el navegador controla esa cabecera.
7. Envía Content-Type: application/json únicamente cuando existe cuerpo.
8. Soporta respuestas JSON y 204 sin cuerpo.
9. Normaliza errores HTTP, de red, respuesta inválida y cancelación.
10. Conserva status, code, requestId, fields y Retry-After cuando estén disponibles.
11. Nunca muestra ni utiliza error.message del servidor como texto visible.
12. Soporta AbortSignal.
13. Utiliza validación ligera de la forma de las respuestas, sin añadir Zod al frontend.

No modifiques checkHealth de DEV-001, que queda como excepción documentada.

## Fase 4 — API de autenticación

Implementa:

- PublicUser.
- getMe().
- Validación de la forma de { user }.

No implementes todavía el formulario ni las acciones de registro, login o logout.

## Fase 5 — SessionProvider

Implementa SessionProvider y useSession() con los estados:

- loading.
- authenticated.
- unauthenticated.
- unavailable.

Reglas:

1. Al montarse, GET /api/auth/me.
2. Un 200 válido produce authenticated.
3. Únicamente un 401 con código UNAUTHENTICATED produce unauthenticated.
4. Cualquier otro error HTTP, incluido 403, 429, 500 o 503, produce unavailable.
5. Errores de red y respuestas inválidas producen unavailable.
6. Una petición abortada no debe convertirse en unavailable.
7. restore() permite reintentar.
8. signedIn(user) actualiza el estado después del registro de DEV-007.
9. signedOut() prepara el cierre de sesión futuro.
10. No guardar tokens ni información de sesión en localStorage.
11. No leer cookies HttpOnly desde JavaScript.
12. Usar AbortController y un mecanismo de generación para impedir respuestas obsoletas.
13. Si signedIn ocurre durante restore(), una respuesta anterior no puede sobrescribir al usuario.
14. Soportar correctamente React StrictMode.
15. useSession() fuera del provider debe fallar de manera explícita.

No montes todavía SessionProvider en las rutas activas de la aplicación. Se conectará en DEV-007.

## Fase 6 — Router

Integra React Router en modo declarativo.

Rutas:

- /diagnostics → DiagnosticsPage.
- / → redirección temporal a /diagnostics.
- * → redirección temporal a /.

No registres todavía /signup: pertenece a DEV-007.

Conserva DiagnosticsPage y sus pruebas.

No crees páginas de relleno, AppShell, BottomNav/NavRail ni TopBar.

Comprueba que el smoke E2E y las pruebas de CSP siguen funcionando con las redirecciones.

## Fase 7 — i18n, CSS y CSP

1. Conserva I18nProvider.
2. Conserva los catálogos en inglés.
3. Usa translateErrorCode para la futura presentación de errores.
4. No introduzcas textos literales en JSX.
5. Conserva los tokens y componentes de DEV-039.
6. No uses estilos inline.
7. No modifiques la política CSP.
8. No añadas claves de traducción innecesarias.

## Fase 8 — Pruebas

Implementa pruebas del cliente HTTP:

- GET sin CSRF ni Content-Type.
- POST con cuerpo y CSRF.
- POST sin cuerpo y sin Content-Type.
- Rechazo de rutas externas.
- JSON válido.
- 204.
- Errores 400, 409, 429.
- Retry-After.
- Respuesta HTML inesperada.
- JSON malformado.
- Error de red.
- AbortSignal.
- Ausencia de mensajes del servidor en la interfaz.

Implementa pruebas de SessionProvider:

- 200 → authenticated.
- 401 UNAUTHENTICATED → unauthenticated.
- 401 con otro código → unavailable.
- 403, 429, 500 y 503 → unavailable.
- Error de red → unavailable.
- Respuesta inválida → unavailable.
- restore() y reintento.
- Cancelación al desmontar.
- Carrera entre restore() y signedIn().
- signedOut().
- React StrictMode.
- Error al usar useSession fuera del provider.

Implementa pruebas de rutas:

- /diagnostics.
- /.
- Ruta desconocida.
- Ausencia de llamadas a /api/auth/me en las rutas activas de DEV-006.

Ejecuta:

- npm ci
- npm run lint
- npm run typecheck
- npm test
- npm run test:integration
- npm run build
- npm audit --audit-level=high
- git diff --check
- CI=1 npm run test:e2e

Los seis E2E existentes deben pasar sin modificar sus archivos.

## Fase 9 — Documentación

Actualiza:

- readme.md.
- CLAUDE.md.
- prompts.md.

Registra las decisiones M1–M8 y los dos ajustes aprobados.

Marca DEV-006 como PARCIAL — NO TERMINADO.

Documenta que:

- SessionProvider se conecta en DEV-007.
- / redirige temporalmente a /diagnostics.
- La política de tolerancia del 401 en E2E pertenece a DEV-007.
- El E2E de registro deberá ejecutarse automáticamente en la CI del PR.
- TanStack Query sigue diferido.

Ubica el Prompt 25 después del Prompt 24 en la sección de implementación de Entrega 2.

No alteres los Prompts 16–18.

## Fase 10 — Informe

Entrega:

1. Rama y commit base.
2. Archivos creados y modificados.
3. Resumen del diff.
4. Dependencias y tamaño del bundle.
5. Contratos TypeScript.
6. Evidencia del cliente HTTP y CSRF.
7. Evidencia de SessionProvider y carreras.
8. Resultados de pruebas.
9. Resultados E2E y CSP.
10. Riesgos y limitaciones.
11. Confirmación de que DEV-006 sigue PARCIAL.
12. Confirmación de que no hiciste commit, push ni PR.

## Restricciones

- No implementar DEV-007.
- No construir pantallas de registro.
- No modificar backend ni base de datos.
- No modificar CI ni E2E.
- No añadir dependencias fuera de react-router.
- No modificar los Prompts 16–18.
- No hacer commit, push, PR ni merge.

Detente después del informe y espera mi revisión.
```

**Decisiones humanas:**
- **Sobre el análisis:** el autor aprobó M1–M8:
  - M1: `/` redirige temporalmente a `/diagnostics` y el `SessionProvider` se conecta en DEV-007, sin páginas de relleno;
  - M2: cuatro estados de sesión, con `unavailable` para los fallos que no son "sin sesión";
  - M3: `credentials: 'same-origin'`;
  - M4: `react-router` 8.5.1;
  - M5: para DEV-007, la prueba de CSP abrirá `/diagnostics` y el E2E de registro tolerará solo el 401 esperado de `/api/auth/me`;
  - M6: los errores se lanzan como `ApiError`;
  - M7: TanStack Query, diferido;
  - M8: el Prompt 25 va después del 24, en la sección de implementación de la Entrega 2.
- **Ajustes de la implementación:**
  - solo un `401` con código `UNAUTHENTICATED` produce `unauthenticated`; cualquier otro error HTTP (también un `401` con otro código, `403`, `429` o `5xx`), los errores de red y las respuestas no válidas producen `unavailable`, y una petición abortada no cambia el estado;
  - el `SessionProvider` no se monta todavía en las rutas activas.

**Resultado generado por la IA:**
- **Análisis** (sin modificar archivos): contratos verificados en el código de `register`, `login`, `me` y `logout`; diseño del cliente, de la sesión y del *router*; ocho decisiones (M1–M8). Con un servidor temporal en el *scratchpad* comprobó que Chromium registra como error de consola el `401` de un `fetch`, lo que habría roto el E2E de la CSP si `/` restauraba la sesión: de ahí M1 y M5.
- **Implementación:**
  - `apiRequest` sobre `fetch`: solo rutas relativas bajo `/api/`, `credentials: 'same-origin'`, `Accept`, `X-CSRF-Protection: 1` en los métodos que modifican datos, `Content-Type` solo con cuerpo, sin tocar `Origin`; `ApiError` con `kind`, `status`, `code`, `requestId`, `invalidFields` y `retryAfterSeconds`, y sin el `message` del servidor;
  - `parsePublicUser`, `parseUserResponse` y `getMe()`;
  - `SessionProvider` con `AbortController` y número de generación, `restore`, `signedIn` y `signedOut`, y `useSession` en un módulo aparte;
  - `AppRoutes` declarativo (`/diagnostics`, `/` → `/diagnostics`, `*` → `/`) y `BrowserRouter` en `App`.
- **Correcciones durante la implementación:**
  - la regla `react-hooks/set-state-in-effect` rechazaba el `setState` síncrono del efecto: el efecto solo lanza la consulta (el estado inicial ya es `loading`) y `restore()` pasa a `loading` antes de consultar;
  - el aviso de *fast refresh* llevó el contexto y `useSession` a `session.ts`;
  - la regla `react-hooks/globals` rechazaba que la prueba guardara la sesión durante el render: ahora lo hace en un efecto;
  - una mutación reveló que el rechazo de `//` estaba cubierto por otras condiciones; se añadió `/api/a//b`, que solo detecta esa comprobación.
- **Corrección pedida por el autor antes de publicar:** en la revisión de seguridad previa al commit, la IA detectó que `ApiError.fields` guardaba los mensajes técnicos de `details.fields[].message` y que `CLAUDE.md` indicaba llevarlos a los `TextField`. Se detuvo y propuso la corrección; el autor la aprobó. `fields` pasó a ser `invalidFields: string[]`, con solo los identificadores de `details.fields[].path` (`body.email` → `email`, sin duplicados y descartando rutas vacías, anidadas, de `params` o `query` o mal formadas). Convención: El cliente HTTP solo expone identificadores de campos inválidos. Los mensajes visibles se obtienen de los catálogos i18n del frontend; nunca de `details.fields[].message` ni de `error.message` del backend.
- **Validación (local, 2026-11-27; detalle en el README, 2.6):**
  - `npm ci`, `lint`, `typecheck`, `build`, `git diff --check`: sin errores;
  - `npm test`: 201/201 del backend y 180/180 del frontend (86 nuevas, 12 de ellas tras la corrección de `invalidFields`; las 94 anteriores sin cambios);
  - `npm run test:integration`: 104/104;
  - `CI=1 npm run test:e2e`: 6/6 sin modificar sus archivos, incluidas las 4 pruebas de CSP;
  - `npm audit --audit-level=high`: 0 vulnerabilidades. `react-router` 8.5.1 trae `cookie-es` 3.1.1 y `@remix-run/route-pattern` 0.22.1; `@types/react-dom` pasa de `dev` a `devOptional` en el *lockfile*;
  - mutaciones temporales detectadas: sin cabecera CSRF, `Content-Type` siempre, aceptar `//`, `credentials: 'include'`, cualquier `401` como `unauthenticated`, no descartar respuestas obsoletas, convertir la cancelación en `unavailable` y no abortar al sustituir una consulta; y, tras la corrección, volver a guardar `details.fields[].message`, recuperar `fields`, aceptar cualquier ruta y conservar duplicados;
  - *bundle* JS: de 272,14 kB (85,36 kB gzip) a 309,05 kB (97,90 kB gzip), por React Router. El cliente y la sesión aún no entran en el *build*, porque ninguna ruta los usa.
  - **la ejecución en GitHub Actions estaba pendiente del PR** cuando se cerró la implementación. Ahora está en verde: ver la revisión humana.

**Revisión humana:**
- **Análisis:** el autor aprobó M1–M8 con los dos ajustes de "Decisiones humanas".
- **Implementación:** el autor aprobó el informe local y autorizó publicar, pidiendo antes una revisión de seguridad del código real. En ella, la IA detectó que `ApiError.fields` guardaba los mensajes técnicos de `details.fields[].message` y que `CLAUDE.md` indicaba llevarlos a los `TextField`; se detuvo sin publicar y propuso la corrección. El autor la aprobó: `invalidFields: string[]` con solo los identificadores de `details.fields[].path`, sin guardar ningún texto del servidor, con una prueba que falla si se vuelve a guardar `details.fields[].message`, y la convención de que los mensajes visibles salen solo de los catálogos i18n del frontend. Repetidas las validaciones, autorizó el commit, el push, el PR y el E2E manual.
- **Publicación:** commit `201ded5` (`201ded5f1508e383d551e7c44f5be5c330a4390e`, "feat: add DEV-006 partial frontend routing and session foundation") sobre `0945315`, con 16 archivos (10 nuevos y 6 modificados, +1631 y −15), y PR #15 (https://github.com/GeraGalindo/AI4Devs-finalproject/pull/15), "feat: DEV-006 partial HTTP client, session and routing", hacia `main`. Su descripción indica "DEV-006 STATUS: PARTIAL — NOT COMPLETED".
- **CI en GitHub Actions** (sección 7 del README):
  - ejecución `pull_request` 46008523664, en verde: auditoría sin vulnerabilidades altas, lint, tipos, tests 201/201 y 180/180, migraciones, *drift*, salvaguarda, integración 104/104, fila centinela intacta y *build*. E2E omitido por diseño;
  - ejecución `workflow_dispatch` 46008736203 sobre el mismo commit `201ded5`, en verde, con el E2E 6/6 (el *smoke* de DEV-001 y las 5 pruebas de `spa-build`, 4 de ellas de la CSP), sin cambiar los archivos de E2E;
  - ejecución `push` a `main` 46009443145, en verde, tras el merge: las mismas comprobaciones que en el PR.
- **Aprobación final:** el autor revisó los resultados del PR #15 y autorizó el merge. Antes se comprobó que el PR seguía abierto hacia `main`, que su último commit seguía siendo `201ded5`, que `main` no había avanzado, que no había conflictos, que las dos ejecuciones habían pasado sobre ese commit, que el diff tenía los 16 archivos previstos sin cambios en backend, base de datos, CI ni E2E, y que los Prompts 16–18 no habían cambiado. El merge se hizo con *merge commit* y `--match-head-commit 201ded5` el 2026-11-27 a las 13:42:32 UTC (`05794c7`, `05794c7e19c55ce7c18b1cc07ef2bf4fe651f29d`), sin *rebase*, *squash* ni *force push*; su árbol es idéntico al de `201ded5`. `main` local se actualizó por *fast-forward*.
- **Estado:** DEV-006 sigue **parcial**, no terminado. La parte implementada está integrada en `main`. Falta, para completarlo:
  - `AppShell` y la navegación, y el criterio 3 (320 px);
  - la redirección ante un `401` en rutas protegidas y el reintento ante un `503` con `ErrorState`;
  - conectar el `loading` de `Button` con la petición en curso (criterio 2);
  - el formato de fechas de DEV-038 y TanStack Query, si se adopta.

  Pendiente para **DEV-007**: montar el `SessionProvider`, registrar `/signup` y definir `/` con y sin sesión; aplicar M5 (la prueba de CSP abrirá `/diagnostics` y el E2E de registro tolerará solo el `401` de `/api/auth/me`); y ejecutar el E2E de registro automáticamente en la CI de cada PR, lo que exige cambiar el job de E2E (hoy solo corre con `workflow_dispatch` y no aplica migraciones). DEV-007 no se ha empezado.

---

**Prompt 26 — DEV-007 (parcial): registro de extremo a extremo y E2E en cada PR**

- **Herramienta:** Claude Code (modelo `claude-opus-5-5`), en la misma sesión que DEV-001 a DEV-004, DEV-038, DEV-039 y DEV-006. Roles indicados por el autor: el usuario es el Product Owner; ChatGPT, analista y revisor; Claude Code, implementador.
- **Objetivo:** analizar DEV-007 parcial sin modificar archivos y, tras la aprobación de P1–P6 y T1–T10, implementar el registro de extremo a extremo (React → Express → PostgreSQL → sesión → restauración al recargar) con un E2E real que corre en la CI de cada PR, y validarlo en local, sin commit, push ni PR.
- **Archivos afectados:**
  - **nuevos:**
    - `frontend/src/features/auth/`: `SignUpPage.tsx`, `TimeZoneField.tsx`, `SessionBoundary.tsx`, `SessionStatus.tsx`, `HomeRoute.tsx`, `SignUpRoute.tsx`, `signUpValidation.ts`, `timeZones.ts`, `AuthPage.css` y `TimeZoneField.css`, con las pruebas `SignUpPage.test.tsx`, `signUpValidation.test.ts` y `timeZones.test.ts`;
    - `e2e/support/`: `e2e-database.ts` (salvaguardas y preparación de `calicoach_e2e`) con `e2e-database.test.ts`, `page-problems.ts` y `db.ts`;
    - `e2e/scripts/prepare-e2e-db.ts` y `e2e/tests/spa-build.signup.spec.ts`;
  - **modificados:** `frontend/src/app/AppRoutes.tsx` y su prueba, `frontend/src/features/auth/api.ts` (`register`), `frontend/src/locales/en/auth.json`, `frontend/src/i18n/I18nProvider.test.tsx`, `e2e/playwright.config.ts`, `e2e/tests/diagnostics.smoke.spec.ts`, `e2e/tests/spa-build.csp.spec.ts`, `e2e/package.json`, `e2e/tsconfig.json`, `package.json` (raíz), `package-lock.json`, `.github/workflows/ci.yml`, `CLAUDE.md`, `readme.md`, `docs/design-system.md` y `prompts.md`;
  - **sin cambios:** el backend, el esquema y las migraciones.

Texto literal del prompt (análisis):

```text
# Cali Coach — DEV-007 parcial: análisis técnico previo

Actúa como arquitecto y desarrollador de Cali Coach.

Como Product Owner, autorizo exclusivamente el análisis técnico de DEV-007 parcial.

NO autorizo modificar archivos, instalar dependencias, crear ramas, commits, PR ni hacer merge.

## 1. Estado inicial

Confirma:

- main = origin/main = facfad9d372fecf36db355c979cecaf4855ec8e3.
- Árbol de trabajo limpio.
- DEV-004 completado.
- DEV-038 parcial integrado.
- DEV-039 parcial integrado.
- DEV-006 parcial integrado y documentado.

Lee:

- CLAUDE.md.
- readme.md, especialmente DEV-007 y los criterios de Entrega 2.
- docs/design-system.md.
- prompts.md, especialmente Prompt 25.
- Componentes de frontend/src/shared/ui/.
- Cliente HTTP y SessionProvider.
- Catálogos i18n.
- Backend auth y sus contratos.
- Migraciones de Prisma.
- Configuración de Playwright y GitHub Actions.

## 2. Objetivo

Diseñar el menor incremento que permita demostrar:

React → Express → PostgreSQL → sesión autenticada → restauración después de recargar.

Incluye:

- S-01: registro.
- S-03: restauración de sesión.
- Vista provisional autenticada mostrando el correo del usuario.
- Mensajes traducidos al inglés.
- Validación del formulario.
- Manejo de errores.
- Pruebas unitarias, integración y E2E.

No incluye:

- Pantalla de login.
- Pantalla de logout.
- Perfil completo.
- Programas de entrenamiento.
- AppShell o navegación definitiva.
- Suscripciones.
- TanStack Query.
- Cambios de reglas de producto.

## 3. Contratos reales

Inspecciona el código y confirma:

- POST /api/auth/register.
- GET /api/auth/me.
- Cookies HttpOnly.
- Protección CSRF.
- Validación Zod del backend.
- Códigos de error.
- Rate limiting.
- Respuestas 201, 200 y 401.
- Forma exacta de PublicUser.
- Normalización de email.
- Validación de timezone.

No inventes contratos ni cambies el backend sin aprobación.

## 4. Registro y formulario

Propón:

- Campos necesarios.
- Validación local compatible con el backend.
- Uso de Button, Card, TextField e InlineAlert.
- Prevención de doble clic, Enter repetido y envíos concurrentes.
- Estados loading, success y error.
- Tratamiento de 400, 409, 429, 503 y errores de red.
- Mapeo de invalidFields a mensajes propios de i18n.
- Protección contra mostrar mensajes técnicos del servidor.
- Accesibilidad con teclado y lectores de pantalla.
- Comportamiento a 320 px.

## 5. Zona horaria

La detección inicial debe utilizar:

Intl.DateTimeFormat().resolvedOptions().timeZone

Si falla o devuelve una zona no válida:

- Ofrecer selección manual accesible de una zona IANA válida.
- No inventar un valor predeterminado.
- No enviar una zona inválida al backend.

Propón cómo construir y validar la lista de zonas sin introducir dependencias innecesarias.

## 6. Sesión y rutas

Propón:

- Conexión de SessionProvider a la aplicación.
- /signup.
- / para usuarios autenticados.
- / para usuarios no autenticados.
- Restauración después de recargar.
- Manejo de unavailable con reintento.
- Protección contra carreras de sesión.
- Conservación de /diagnostics sin restauración.
- Tratamiento del 401 esperado en Playwright sin ocultar errores de consola inesperados.

## 7. i18n y diseño

Identifica:

- Nuevas claves necesarias en auth.json y common.json.
- Mensajes de validación.
- Mensajes de errores de API.
- Etiquetas accesibles.
- Reutilización de componentes DEV-039.
- Reglas CSP.
- Ajustes necesarios para 320 px.

Evita textos literales en JSX.

## 8. E2E real y CI

Diseña un escenario Playwright que:

1. Abra /signup.
2. Complete el formulario.
3. Envíe el registro.
4. Compruebe la respuesta y la sesión.
5. Compruebe la persistencia en PostgreSQL.
6. Recargue la página.
7. Compruebe GET /api/auth/me y la restauración.
8. Verifique la ausencia de errores inesperados de consola y violaciones CSP.

Condiciones:

- Base E2E aislada, por ejemplo calicoach_e2e.
- No utilizar calicoach ni calicoach_test.
- Aplicar migraciones antes de ejecutar el E2E.
- Añadir salvaguardas contra bases incorrectas.
- Ejecutar automáticamente el E2E de registro en la CI de cada PR.
- Mantener los E2E actuales.
- No introducir credenciales reales ni secretos en el repositorio.

Analiza si es necesario añadir pg como dependencia de desarrollo en e2e.

## 9. Documentación

Propón actualizaciones para:

- readme.md.
- CLAUDE.md.
- docs/design-system.md, solo si corresponde.
- prompts.md, Prompt 26 después del 25.

Mantén DEV-007 como PARCIAL si quedan funcionalidades pendientes del ticket completo.

No alteres los Prompts 16–18.

## 10. Decisiones para el Product Owner

Presenta las decisiones técnicas pendientes con:

- Alternativas.
- Recomendación.
- Consecuencias.
- Riesgos.

Distingue claramente entre decisiones de producto y decisiones técnicas.

## 11. Informe final

Entrega:

A. Estado inicial.

B. Alcance completo de DEV-007 según el README.

C. Alcance parcial recomendado para Entrega 2.

D. Contratos backend verificados.

E. Diseño de formulario y validación.

F. Diseño de sesión y rutas.

G. Estrategia de timezone.

H. i18n, diseño y accesibilidad.

I. Arquitectura E2E y cambios de CI.

J. Archivos previstos.

K. Plan de pruebas.

L. Criterios de aceptación verificables.

M. Riesgos y alternativas.

N. Decisiones que requieren aprobación del Product Owner.

O. Secuencia de implementación.

Solo análisis. No modifiques nada y espera mi aprobación.
```

Texto literal del prompt (implementación):

```text
# Cali Coach — DEV-007 parcial: implementación local autorizada

Como Product Owner, apruebo las decisiones P1–P6 y T1–T10 del análisis técnico de DEV-007 parcial, con los ajustes A1–A5 indicados a continuación.

Autorizo implementar localmente el flujo de registro de usuarios de extremo a extremo.

NO autorizo commit, push, Pull Request ni merge.

## Contexto

- Proyecto: Cali Coach.
- Base esperada de main: facfad9d372fecf36db355c979cecaf4855ec8e3.
- DEV-004 completado.
- DEV-038, DEV-039 y DEV-006 integrados como parciales.
- Objetivo: cumplir la Entrega 2 con una funcionalidad real React → Express → PostgreSQL.
- Rama propuesta: feature/dev-007-signup-flow.

## Fase 1 — Preparación

1. Confirma que main coincide con origin/main.
2. Confirma que el árbol está limpio.
3. Revisa CLAUDE.md, readme.md, docs/design-system.md y Prompt 25.
4. Verifica los contratos reales de auth y el cliente HTTP.
5. Crea feature/dev-007-signup-flow desde main.

Si la base ha cambiado de forma incompatible, detente y consulta.

## Fase 2 — Registro

Implementa S-01 con:

- Email.
- Contraseña.
- Zona horaria detectada o seleccionada manualmente.
- Button, Card, TextField e InlineAlert de DEV-039.
- Textos en inglés desde auth.json.
- Validación local.
- Prevención de doble clic, Enter repetido y envíos concurrentes.
- Estados de carga y error.
- Foco en el primer campo inválido.
- Mensajes de error junto al campo.
- Diseño responsive desde 320 px.
- Accesibilidad con teclado y lectores de pantalla.

No añadas confirmación de contraseña ni botón para mostrarla.

No implementes login ni logout.

## Fase 3 — Validación

- Email: normalización compatible con backend y máximo 254 caracteres.
- Contraseña: 12–128 caracteres Unicode según el contrato.
- Timezone: identificador IANA válido, sin offsets.
- Backend como autoridad definitiva.

Incluye pruebas de límites, Unicode y casos inválidos.

Si el regex de Zod no puede reproducirse de forma fiable, utiliza una comprobación local conservadora que no rechace emails que el backend aceptaría.

## Fase 4 — Zona horaria

1. Detecta mediante Intl.DateTimeFormat().resolvedOptions().timeZone.
2. Muestra la zona detectada como información visible.
3. Si no es válida, ofrece un select nativo accesible.
4. Obtén las opciones mediante Intl.supportedValuesOf('timeZone') cuando esté disponible.
5. Añade UTC.
6. No selecciones una zona por defecto cuando falle la detección.
7. Si supportedValuesOf no existe, ofrece entrada manual validada.
8. No envíes zonas inválidas.
9. Si el backend rechaza timezone, permite corregirla manualmente.

No añadas dependencias.

## Fase 5 — API y sesión

Implementa register() utilizando apiRequest.

Al recibir 201:

- Valida { user }.
- Actualiza SessionProvider mediante signedIn(user).
- Navega a / con replace.

Conecta SessionProvider a las rutas que requieren sesión.

Rutas:

- /diagnostics: sin restauración.
- /: sin sesión → /signup; con sesión → vista provisional.
- /signup: sin sesión → formulario; con sesión → /.
- *: redirección a /.

La vista provisional muestra el email del usuario y se documenta como temporal hasta Today (S-06).

Al recargar, GET /api/auth/me debe restaurar la sesión.

El estado unavailable muestra un mensaje traducido y un botón para reintentar.

## Fase 6 — Errores

- 400 VALIDATION_ERROR: invalidFields y mensajes propios de auth.json.
- 409 EMAIL_ALREADY_REGISTERED: error en email.
- 429 RATE_LIMITED: mensaje traducido con minutos redondeados hacia arriba.
- 403, 413, 415, 500 y 503: mensajes traducidos por code.
- Nunca mostrar error.message ni details.fields[].message del backend.

Después de un error de red o respuesta inválida durante POST /register:

1. Consultar GET /api/auth/me.
2. Si responde 200, signedIn(user) y navegar a /.
3. Si responde 401 UNAUTHENTICATED, conservar el formulario y mostrar un error traducido.
4. Si falla la comprobación, conservar el formulario, mostrar que el resultado es incierto y permitir reintentar la comprobación.
5. Nunca repetir automáticamente POST /register.

No limpiar el formulario después de un error.

## Fase 7 — E2E y PostgreSQL

Preparar calicoach_e2e como base aislada.

Salvaguardas:

- Nombre terminado en _e2e.
- Distinta de DATABASE_URL y TEST_DATABASE_URL.
- Host local.
- Comprobación de current_database() tras conectar.
- No tocar calicoach ni calicoach_test.
- Aplicar migraciones antes de las pruebas.
- No borrar datos de otras bases.
- No reutilizar servidores que apunten a una base diferente.

Usa pg y @types/pg en e2e para comprobar persistencia.

Implementa un E2E en spa-build que verifique:

1. / redirige a /signup sin sesión.
2. Registro con email en mayúsculas.
3. POST /api/auth/register devuelve 201.
4. Se recibe cookie HttpOnly.
5. Se muestra el email normalizado.
6. PostgreSQL contiene la fila correcta.
7. El hash es Argon2id y no contiene la contraseña.
8. Timezone y available_weekdays son correctos.
9. Al recargar, GET /api/auth/me devuelve 200.
10. Se mantiene la sesión.
11. No hay errores inesperados ni violaciones CSP.
12. No hay desplazamiento horizontal a 320 px.
13. Los controles interactivos cumplen al menos 44 px.

Añade escenarios de email duplicado y selección manual de timezone.

No fuerces un 429 real con múltiples registros: pruébalo con mocks en RTL.

## Fase 8 — E2E existentes y CI

Adapta los E2E existentes al nuevo enrutamiento:

- Smoke y CSP abren /diagnostics.
- /today conserva las comprobaciones pertinentes.
- Los errores HTTP esperados se declaran por escenario.
- No silenciar globalmente errores de consola.
- Cualquier error JavaScript, violación CSP o respuesta HTTP inesperada debe fallar.

Actualiza Playwright para utilizar E2E_DATABASE_URL.

Configura el job E2E de GitHub Actions para ejecutarse:

- Automáticamente en cada pull_request.
- Manualmente mediante workflow_dispatch.

No es necesario duplicarlo en cada push a main.

El job debe crear/preparar calicoach_e2e, aplicar migraciones y ejecutar toda la suite.

## Fase 9 — Pruebas

Incluye pruebas de:

- Validación.
- Zonas horarias.
- Componentes.
- i18n.
- Doble envío.
- Errores 400, 409, 429 y 503.
- Recuperación tras error de red.
- Rutas y restauración.
- Salvaguardas de base de datos.
- E2E real.

Ejecuta:

- npm ci
- npm run lint
- npm run typecheck
- npm test
- npm run test:integration
- npm run build
- npm audit --audit-level=high
- git diff --check
- CI=1 npm run test:e2e

Comprueba que calicoach y calicoach_test no se modificaron.

## Fase 10 — Documentación

Actualiza:

- readme.md.
- CLAUDE.md.
- docs/design-system.md.
- prompts.md, Prompt 26 después del 25.

Documenta:

- P1–P6 y T1–T10.
- Ajustes A1–A5.
- Registro real y restauración.
- Base E2E aislada.
- E2E automático en PR.
- Vista provisional como excepción temporal.
- Funcionalidades pendientes de DEV-007.

Mantén DEV-007 como PARCIAL — NO TERMINADO.

No modifiques los Prompts 16–18.

## Fase 11 — Informe

Entrega:

1. Rama y base.
2. Archivos nuevos y modificados.
3. Contratos y arquitectura implementados.
4. Diseño del formulario.
5. Validación y timezone.
6. Sesión y rutas.
7. Errores y recuperación.
8. E2E y aislamiento de PostgreSQL.
9. Cambios de CI.
10. Resultados de pruebas.
11. Riesgos y limitaciones.
12. Estado de DEV-007.
13. Confirmación de que no hiciste commit, push ni PR.

## Restricciones

- No implementar login ni logout.
- No modificar backend ni migraciones.
- No añadir TanStack Query.
- No crear AppShell ni navegación definitiva.
- No hacer commit, push, PR ni merge.
- No alterar Prompts 16–18.
- Detente después del informe y espera mi revisión.
```

**Decisiones humanas:**
- **Producto (P1–P6):** vista provisional en `/` con el email, como excepción temporal a `docs/design-system.md` §9 hasta *Today* (S-06); la zona detectada se muestra en el formulario; el `429` indica la espera en minutos; sin confirmación de contraseña ni botón para mostrarla; los textos en inglés se revisan en el diff; DEV-007 sigue parcial (inicio y cierre de sesión pendientes).
- **Técnicas (T1–T10):** base `calicoach_e2e` con salvaguardas; `pg` y `@types/pg` en `e2e`; E2E en cada PR y con `workflow_dispatch`; el *smoke* y la prueba de CSP abren `/diagnostics`, con las respuestas de error esperadas declaradas por escenario; el E2E de registro en `spa-build`; `<select>` nativo con `Intl` y `UTC` (texto como respaldo); el mismo patrón de email que Zod; comprobar `GET /me` tras un error de red; `/signup` con sesión → `/`; el Prompt 26 tras el 25.
- **Ajustes de la implementación (A1–A5).** La orden de implementación los citó sin detallarlos; la IA los interpretó primero con otra correspondencia, y en su revisión el autor los definió así:
  - A1, aislamiento real de `calicoach_e2e`: verificar `current_database()` tras conectar, evitar reutilizar servidores conectados a otra base y fallar claramente si los puertos están ocupados;
  - A2, límite de peticiones: no provocar un `429` real mediante múltiples registros, probarlo con *mocks* y redondear los minutos de espera hacia arriba;
  - A3, recuperación tras un error de red: consultar `GET /api/auth/me`; con `200`, restaurar la sesión; con `401`, conservar el formulario; si `/me` falla, mostrar un resultado incierto y permitir repetir únicamente `/me`; nunca reenviar automáticamente `POST /register`;
  - A4, validación local: mantener el backend como autoridad, probar límites y Unicode y evitar rechazar emails válidos para Zod;
  - A5, política de E2E: declarar los errores HTTP esperados por método, ruta y estado, no silenciar errores inesperados y comprobar la CSP, los 320 px y los objetivos táctiles de 44 px.

**Resultado generado por la IA:**
- **Análisis** (sin modificar archivos): contratos verificados en el código, diseño del formulario, de la zona horaria, de la sesión y de las rutas, la arquitectura del E2E con base aislada y los cambios de CI, con seis decisiones de producto y diez técnicas.
- **Implementación:**
  - S-01 (`SignUpPage`): `Card`, dos `TextField`, la zona detectada como texto o el `TimeZoneField` manual, `InlineAlert` para el resumen y los errores generales y `Button` en `loading`. `noValidate`, validación local, foco en el primer campo con error y un bloqueo propio (`useRef`) además del de `Button` contra los envíos duplicados;
  - `signUpValidation.ts` con el patrón de email de Zod 4.6.7 copiado literalmente (comparado con el instalado, para no rechazar emails que Zod acepta: A4) y el recuento de la contraseña en puntos de código; `timeZones.ts` con la misma validación que el backend, la detección y la lista de zonas;
  - `register()` con `apiRequest`; `SessionBoundary` monta el `SessionProvider` en `/` y `/signup`; `HomeRoute` (vista provisional), `SignUpRoute` y `SessionStatus` (carga y `unavailable` con reintento); `/diagnostics` fuera de la sesión;
  - E2E: `support/e2e-database.ts` (salvaguardas, `current_database()` y preparación con `prisma migrate deploy`), `scripts/prepare-e2e-db.ts` antes de `playwright test`, `support/page-problems.ts` (respuestas esperadas por escenario, consola, excepciones, CSP, 320 px y 44 px) y el E2E de registro con tres escenarios; el *smoke* y la prueba de CSP pasan a `/diagnostics`;
  - Playwright usa `E2E_DATABASE_URL` y puertos propios (backend `:3001`, Vite `:5174` y `spa-build` `:3100`) sin reutilizar servidores; la CI ejecuta el E2E en cada PR, prepara `calicoach_e2e` y comprueba que `calicoach` sigue sin tablas.
- **Correcciones durante la implementación:**
  - la regla `react-hooks/refs` rechazaba un objeto con las *refs* de los campos: se separaron en variables;
  - el patrón de Zod tiene escapes `\-` innecesarios para ESLint; se conservó la copia literal con una excepción comentada;
  - con los tipos de DEV-038, la prueba de rutas necesitó `useTranslation` con sus espacios de nombres; varias pruebas de DEV-006 describían la redirección temporal de `/` y se reescribieron para el comportamiento nuevo, y la prueba de montaje de `App` de DEV-038 abre ahora `/diagnostics`.
- **Validación (local, 2026-11-27; detalle en el README, 2.6):**
  - `npm ci`, `lint`, `typecheck`, `build`, `git diff --check`: sin errores;
  - `npm test`: 201/201 del backend, 270/270 del frontend (90 nuevas) y 12/12 de las salvaguardas de E2E (`node --test`);
  - `npm run test:integration`: 104/104;
  - `CI=1 npm run test:e2e`: 13/13 (el *smoke*, 9 de `spa-build.csp` y 3 de registro) sobre `calicoach_e2e`;
  - `npm audit --audit-level=high`: 0 vulnerabilidades; `pg` y `@types/pg` ya estaban en el *lockfile*;
  - `calicoach` sigue con 0 tablas y la suma MD5 de `users` en `calicoach_test` es la misma antes y después; la preparación rechaza `calicoach`, `calicoach_test` y un host remoto;
  - mutación temporal: sin declarar el `401` esperado, el E2E de registro falla con `unexpected HTTP error responses`;
  - **revisión del autor antes de publicar:** pidió comprobar la implementación contra las definiciones exactas de A1–A5 y la estabilidad del E2E frente al límite de peticiones. La implementación ya las cumplía, y solo cambió la documentación de A1–A5. Para que el presupuesto del limitador quede comprobado, cada escenario de registro cuenta ahora sus `POST /api/auth/register` (1, 1 más el de la API y 1: 4 por ejecución, máximo 5 por hora) y el archivo fija `retries: 0`. Dos ejecuciones seguidas dieron 13/13 sin `429`; con `--repeat-each=2` aparece el `429` a partir del sexto registro, como era de esperar; un puerto ocupado hace fallar Playwright de inmediato;
  - *build*: JS 329,24 kB (104,70 kB gzip) y CSS 6,61 kB, porque el formulario y los componentes entran por fin en el *build*.
  - **La ejecución en GitHub Actions queda pendiente del PR.**

**Revisión humana:** pendiente. El autor revisará la implementación antes de autorizar el commit, el push y el PR. DEV-007 **no** está terminado: es parcial por decisión del autor y, además, falta la revisión, el PR y la CI.

---

## Anexo — Prompts transversales

> **Por qué hay un anexo.** Las secciones 1–7 de la plantilla admiten como máximo tres prompts cada una. Los prompts de esta parte afectan a varias secciones y a varios archivos a la vez, así que no tienen un hueco natural. Se registran aquí para no romper la plantilla ni sustituir prompts históricos. El mapa del principio de este archivo los incluye.

**Prompt 16 — Consolidación documental antes de implementar**

- **Herramienta:** Claude Code (modelo `claude-opus-5-5`), en la misma sesión que los prompts anteriores.
- **Objetivo:** consolidar `readme.md`, `prompts.md` y `docs/design-system.md` antes de DEV-001: eliminar contradicciones, alinear las decisiones confirmadas y registrar las decisiones pendientes.
- **Archivos afectados:** `readme.md` (secciones 0–7), `prompts.md` (mapa de prompts) y `docs/design-system.md`.

Texto literal del prompt:

```text
# Prompt 16 — Cali Coach: consolidación documental antes de implementar

Actúa como **Tech Lead, Product Owner técnico y auditor de documentación de software**, con experiencia en proyectos full-stack, metodologías ágiles y desarrollo asistido por IA.

Estamos desarrollando **Cali Coach**, proyecto final de AI4Devs.

Hemos completado la planificación funcional, la arquitectura, el backlog de historias de usuario, el backlog técnico y el sistema de diseño.

**Antes de comenzar DEV-001, necesitamos consolidar la documentación y eliminar contradicciones.**

Este prompt es exclusivamente documental. No debes implementar código.

## 1. Archivos que debes revisar

Lee completamente:

- `readme.md`
- `prompts.md`
- `docs/design-system.md`

Analiza especialmente:

- README, sección 0: información del proyecto.
- README, sección 1: alcance y requisitos.
- README, sección 2: arquitectura.
- README, sección 3: modelo de datos.
- README, sección 4: API.
- README, sección 5: historias de usuario.
- README, sección 6: tickets técnicos.
- README, sección 7: Pull Requests.
- Historial y estructura de `prompts.md`.
- Las diez secciones del sistema de diseño.

No presupongas que los documentos son coherentes: comprueba las referencias cruzadas.

## 2. Decisiones definitivas del Product Owner

Las siguientes decisiones están aprobadas y deben reflejarse de manera consistente.

### 2.1. Identidad visual

El MVP utilizará:

- Estética **Performance / Athletic**.
- Fondo azul-negro.
- Acentos violetas.
- Tarjetas oscuras con bordes discretos.
- Tipografía clara y legible.
- Diseño mobile-first desde 320 px.
- Adaptación a pantallas de escritorio.
- Accesibilidad como requisito transversal.

Los tokens existentes de `docs/design-system.md` se conservan como propuesta técnica inicial.

No cambies arbitrariamente sus valores.

La comparación exacta con el mockup original sigue pendiente porque el archivo no está disponible en el repositorio.

### 2.2. Navegación

La navegación definitiva del MVP es:

1. Today.
2. Program.
3. Progress.
4. Profile.

La sección Program incluye el catálogo, el programa activo y el calendario.

Actualiza referencias antiguas como «Hoy, Calendario, Progreso, Perfil» cuando describan la navegación vigente.

No elimines el calendario como funcionalidad.

### 2.3. Idiomas

El MVP tendrá:

- Interfaz exclusivamente en inglés (`en`).
- Contenido inicial de programas y ejercicios en inglés.
- Infraestructura preparada para futuros idiomas.
- Sin selector de idioma.
- Sin traducción del contenido persistido durante el MVP.

La internacionalización técnica se implementará mediante DEV-038.

Distingue claramente entre:

- Internacionalización: preparación técnica para múltiples idiomas.
- Localización: traducción y adaptación a idiomas o regiones.
- Zona horaria IANA: regla de negocio independiente del idioma.

Corrige cualquier contradicción que excluya toda internacionalización del MVP.

La exclusión correcta es **no ofrecer idiomas adicionales en el MVP**.

No cambies contratos técnicos, nombres de campos, códigos de error ni estados persistidos para traducirlos.

### 2.4. Funcionalidades excluidas

No forman parte del MVP:

- Suscripciones.
- Planes Free/Pro.
- Pagos.
- Análisis de técnica mediante IA.
- Revisión de vídeos por entrenadores.
- Funciones avanzadas de Skills y Library.
- PWA y Capacitor.

Pueden mencionarse como visión futura, pero no como funcionalidades activas ni como tickets obligatorios del MVP.

### 2.5. Alcance funcional existente

Conserva las reglas funcionales ya documentadas:

- Registro y autenticación.
- Configuración de días y zona horaria.
- Catálogo de programas.
- Activación de un programa.
- Generación del calendario.
- Consulta de la sesión del día.
- Registro de series.
- Finalización explícita de sesiones.
- Clasificación `planned`, `completed`, `partial`, `skipped`.
- Reconciliación de sesiones vencidas.
- Progreso y desempeño por ejercicio.

No introduzcas nuevas reglas de negocio.

## 3. Auditoría del README

Revisa las ocho secciones.

### 3.1. Coherencia funcional

Comprueba que:

- El alcance coincide con las historias.
- Las historias coinciden con los tickets.
- Los tickets coinciden con la arquitectura.
- Los endpoints soportan los recorridos de usuario.
- Las reglas de estados y concurrencia son consistentes.
- Los incrementos respetan las dependencias técnicas.
- Los criterios de aceptación no contradicen las reglas de negocio.

No amplíes el MVP para resolver inconsistencias.

### 3.2. Información del proyecto

Revisa los campos pendientes de la sección 0.

Completa únicamente información verificable en el repositorio.

No inventes:
- URL de despliegue.
- Pull Requests.
- Fechas de finalización.
- Resultados de pruebas.
- Funcionalidades implementadas.

Si falta información, utiliza un marcador explícito `Pendiente`.

### 3.3. Backlog

Conserva:

- HU-01 a HU-23.
- T-01 a T-03.
- DEV-001 a DEV-039.
- Los seis incrementos.
- Las prioridades Must y Should existentes.

No renumeres identificadores.

Puedes corregir textos, dependencias y referencias cuando sea necesario para reflejar decisiones confirmadas.

No conviertas funcionalidades Should en Must sin autorización.

### 3.4. Contrato API

Comprueba la consistencia de:

- Rutas.
- Métodos HTTP.
- Estados.
- Códigos de error.
- Formatos de fecha.
- Zona horaria.
- Reconciliación.
- Autenticación y seguridad.

Los ejemplos de mensajes técnicos pueden permanecer en español si no se muestran directamente en la interfaz, pero documenta explícitamente esta distinción.

No cambies el contrato API únicamente por razones de idioma.

## 4. Auditoría de prompts.md

Este archivo es evidencia del proceso de desarrollo asistido por IA.

### Objetivos

1. Comprobar que los prompts están correctamente registrados.
2. Identificar entradas duplicadas o mal ubicadas.
3. Revisar que las respuestas y revisiones humanas estén claramente diferenciadas.
4. Verificar la correspondencia entre prompts y secciones del README.
5. Comprobar que los prompts no atribuyen implementaciones, pruebas o resultados que todavía no existen.

### Restricciones

**No elimines ni reescribas el historial de prompts ejecutados.**

Si un prompt está ubicado en una sección poco intuitiva, puedes añadir una referencia o nota explicativa.

No muevas grandes bloques de contenido sin necesidad.

Conserva la estructura académica existente y los espacios reservados para prompts representativos.

No inventes respuestas de Claude Code ni revisiones humanas.

Si un prompt futuro todavía no se ha ejecutado, no lo registres como completado.

## 5. Auditoría de docs/design-system.md

Comprueba que el documento refleje las decisiones aprobadas.

Verifica:

- Identidad visual.
- Tokens semánticos.
- Navegación.
- Inventario de pantallas.
- Relación con historias y endpoints.
- Estados de interfaz.
- Accesibilidad.
- Internacionalización.
- Funcionalidades futuras excluidas.

Actualiza las etiquetas `[Propuesta]`, `[Confirmada]` y `[Pendiente]` únicamente cuando exista una decisión explícita del Product Owner.

La identidad visual y la navegación ya están confirmadas.

Los valores concretos de los tokens siguen siendo propuestas técnicas hasta compararlos con el mockup.

### Control del alcance de DEV-039

El inventario de componentes no significa que todos deban implementarse en I1.

Aclara que DEV-039 implementará solamente los componentes necesarios para I1.

Los demás componentes se incorporarán durante sus incrementos correspondientes.

### Pantallas Should

La pantalla S-16, correspondiente a HU-21, no debe bloquear el recorrido funcional principal.

Mantén su prioridad Should.

## 6. Decisiones funcionales pendientes

Identifica todas las decisiones del Product Owner que permanezcan abiertas.

Presta especial atención a:

- Inicio de programas el mismo día de activación.
- Número de programas iniciales.
- Definición del nivel intermedio.
- Duración de los programas.
- Cambios de disponibilidad durante una inscripción.
- Finalización de sesiones sin registros.
- Registro de series fuera del día correspondiente.
- Número máximo de series.
- Fórmula de adherencia.
- Tratamiento de sesiones parciales.
- Cancelación de programas.
- Registro de ejercicios basados en tiempo.

Crea una tabla de decisiones pendientes con:

- Identificador.
- Pregunta.
- Opciones existentes, si están documentadas.
- Recomendación técnica, claramente marcada como propuesta.
- Impacto.
- Tickets afectados.
- Momento límite para resolverla.

**No tomes decisiones por el Product Owner.**

No cambies el comportamiento funcional hasta recibir aprobación.

## 7. Clasificación de hallazgos

Clasifica los problemas detectados en:

- **Bloqueante:** impide implementar correctamente DEV-001 o compromete un contrato imprescindible.
- **Importante:** debe resolverse antes del ticket o incremento afectado.
- **Menor:** documentación, estilo, referencias o claridad.

No clasifiques como bloqueante una decisión que puede resolverse en un incremento posterior.

Distingue claramente entre:

- Contradicción real.
- Decisión pendiente.
- Diferencia de nivel de detalle.
- Funcionalidad futura deliberadamente excluida.

## 8. Cambios permitidos

Puedes modificar:

- `readme.md`
- `prompts.md`
- `docs/design-system.md`

Pero solo para:

- Corregir contradicciones verificadas.
- Alinear decisiones confirmadas.
- Mejorar trazabilidad.
- Aclarar exclusiones.
- Documentar decisiones pendientes.
- Corregir referencias incorrectas.

Conserva el contenido académico y el historial.

No reformatees archivos completos.

## 9. Cambios prohibidos

No debes:

- Implementar código.
- Crear migraciones.
- Instalar dependencias.
- Ejecutar pruebas de aplicación.
- Crear commits.
- Crear Pull Requests.
- Modificar reglas funcionales no aprobadas.
- Añadir nuevos tickets sin justificación.
- Renumerar historias o tickets.
- Marcar trabajo futuro como completado.
- Inventar evidencia de ejecución.

## 10. Validación

Después de editar:

1. Verifica que las ocho secciones del README siguen presentes.
2. Verifica que `prompts.md` conserva el historial.
3. Verifica que `docs/design-system.md` conserva sus diez secciones.
4. Comprueba la unicidad de HU, T y DEV.
5. Revisa las referencias cruzadas.
6. Ejecuta `git status --short`.
7. Ejecuta `git diff --check`.
8. Ejecuta `git diff --stat`.

Ten en cuenta que existe un aviso histórico de whitespace en una línea de la plantilla del README.

Distingue los errores preexistentes de los introducidos por este trabajo.

Si un archivo es nuevo y no está bajo seguimiento de Git, compruébalo por separado.

No corrijas masivamente whitespace histórico para silenciar advertencias.

## 11. Entregable final

Presenta un reporte con:

### A. Resumen ejecutivo
Estado general de la documentación.

### B. Correcciones realizadas
Archivo, sección y motivo de cada cambio.

### C. Matriz de consistencia
Relación entre requisitos, historias, tickets, API y diseño.

### D. Decisiones pendientes
Tabla priorizada para revisión con el Product Owner.

### E. Problemas no resueltos
Contradicciones o riesgos que requieran intervención humana.

### F. Validaciones
Comandos ejecutados y resultados reales.

### G. Archivos modificados
Lista de archivos y estadísticas del diff.

### H. Preparación para DEV-001
Indica si la documentación permite iniciar DEV-001 sin resolver decisiones funcionales posteriores.

Finaliza con una recomendación explícita:

- **READY:** se puede comenzar DEV-001.
- **READY WITH CONDITIONS:** se puede comenzar DEV-001, pero quedan decisiones para incrementos posteriores.
- **NOT READY:** existe un bloqueo concreto que impide DEV-001.

Justifica la clasificación.

**Detente al terminar. No comiences la implementación.**
```

**Decisiones humanas** aportadas en el prompt:
- Confirmó la identidad visual, la navegación Today · Program · Progress · Profile y la estrategia de idioma: solo inglés, con infraestructura para otros idiomas y sin traducir el contenido guardado.
- Fijó las exclusiones del MVP y pidió distinguir internacionalización, localización y zona horaria.
- Exigió no tomar decisiones por el Product Owner y clasificar los hallazgos.

**Resultado generado por la IA:**
- **Recomendación final: READY WITH CONDITIONS.** Se podía empezar DEV-001, porque ninguna decisión pendiente lo bloqueaba.
- **Contradicciones reales corregidas:**
  - la exclusión de "internacionalización" en 1.2 y en T-02, que pasa a ser la exclusión de los idiomas adicionales;
  - la navegación antigua de T-02 ("Hoy, Calendario, Progreso, Perfil"), sustituida por Today · Program · Progress · Profile;
  - referencias desactualizadas en la sección 5 y en `docs/design-system.md`.
- **Completado:**
  - la sección 0, solo con datos que se pueden comprobar (nombre según `git config`, remoto `origin`), y "Pendiente" en la URL de despliegue;
  - "Pendiente" en las tres Pull Requests de la sección 7;
  - el mapa de prompts al principio de este archivo.
- **Registro de 17 decisiones pendientes** (DP-01 a DP-17) en la sección 1.2, con una recomendación técnica marcada como propuesta y un momento límite para cada una. Una de ellas (DP-08) tenía un estado contradictorio entre 2.1 y las secciones 4–6.
- **Validación:**
  - secciones, identificadores y referencias cruzadas comprobados con un script;
  - `git diff --check` con un único aviso, que ya existía (la línea de cita de la plantilla de la sección 6);
  - no se generó código y no se ejecutaron pruebas.

**Revisión humana:** el Product Owner revisó el resultado y resolvió las 17 decisiones. Se consolidaron en el Prompt 17.

**Prompt 17 — Consolidación definitiva de decisiones del Product Owner**

**Pendiente de registrar.** Su resultado no se conoce hasta terminar la ejecución, así que se registrará cuando el autor lo pida, como los anteriores, con su texto literal y su resultado real.

**Prompt 18 — Alineación documental con las entregas de AI4Devs**

- **Herramienta:** Claude Code (modelo `claude-opus-5-5`), en la misma sesión que los prompts anteriores, después de fusionar la Pull Request #1 en `main`.
- **Objetivo:** antes de DEV-001, alinear la documentación con las tres entregas académicas sin ampliar el alcance del MVP:
  - agrupar F1–F9 en cinco capacidades principales;
  - documentar un plan de las tres entregas;
  - corregir solo las referencias obsoletas inequívocas tras DP-01 a DP-17.
- **Archivos afectados:** `readme.md` y `prompts.md`. `docs/design-system.md` solo se consultó.

Texto literal del prompt:

```text
# Prompt 18 — Cali Coach: alineación documental con las entregas de AI4Devs

## Rol

Actúa como **Tech Lead, Product Owner técnico y revisor de documentación académica**.

Estamos desarrollando **Cali Coach**, proyecto final de AI4Devs: una aplicación web mobile-first para practicantes intermedios de calistenia.

La fase de diseño y especificación está avanzada. Antes de iniciar el desarrollo con **DEV-001**, necesitamos revisar la documentación existente y alinearla con las tres entregas académicas, sin ampliar el alcance del MVP.

## 1. Inspección inicial obligatoria

Antes de modificar cualquier archivo:

1. Lee completamente `readme.md`, `prompts.md` y `docs/design-system.md`.
2. Revisa la estructura actual del repositorio y el estado de Git.
3. Identifica los requisitos de las entregas académicas que estén explícitamente documentados.
4. Localiza las funcionalidades F1–F10, las historias HU, los tickets DEV y las decisiones DP.
5. Comprueba si ya existe información equivalente a la que se propone añadir.

**No dupliques contenido ni inventes requisitos académicos.**

Si las instrucciones oficiales de las tres entregas no están presentes en el repositorio, utiliza únicamente los objetivos de trabajo indicados aquí y marca como pendientes de verificación los requisitos oficiales que no puedas comprobar.

## 2. Agrupación de funcionalidades principales

El MVP tiene nueve funcionalidades imprescindibles (F1–F9) y una mejora posterior (F10).

Queremos presentar las funcionalidades imprescindibles mediante cinco capacidades principales:

| Capacidad principal | Funcionalidades |
|---|---|
| Gestión de cuenta y disponibilidad | F1 + F2 |
| Programas y planificación | F3 + F4 |
| Consulta del entrenamiento | F5 |
| Ejecución y cierre de sesiones | F6 + F7 + F9 |
| Seguimiento del progreso | F8 |

### Tareas

- Comprueba que la agrupación representa correctamente las definiciones actuales de F1–F9.
- Si detectas una asociación incorrecta, explícala antes de modificarla.
- Añade una tabla breve de agrupación y trazabilidad en la sección apropiada de `readme.md`.
- Conserva los identificadores F1–F10 y sus prioridades originales.
- No elimines historias, tickets ni criterios de aceptación.
- Mantén F10 fuera del alcance obligatorio del MVP.

Esta agrupación es una forma de presentar el producto, **no una redefinición funcional**.

## 3. Plan de las tres entregas

Documenta una propuesta de organización del trabajo basada en las siguientes etapas.

### Entrega 1 — Documentación y diseño

Objetivo: disponer de una especificación coherente y trazable del MVP.

Evidencias previstas:
- Descripción del producto y funcionalidades.
- Arquitectura técnica.
- Modelo de datos.
- Especificación de API.
- Historias de usuario.
- Tickets de desarrollo.
- Registro de prompts y decisiones humanas.
- Sistema de diseño.

Distingue los documentos existentes de las evidencias cuya entrega formal todavía no se haya verificado.

### Entrega 2 — Primer flujo funcional

Objetivo: demostrar una integración real entre frontend, backend y base de datos.

**Flujo propuesto:** registro de usuario desde la interfaz, validación mediante API y persistencia en PostgreSQL.

Revisa si esta propuesta es coherente con los tickets DEV existentes y sus dependencias.

Identifica:
- Tickets necesarios.
- Dependencias técnicas.
- Pruebas de integración.
- Evidencias necesarias para demostrar el flujo.

No implementes este flujo todavía.

Si los requisitos oficiales de la Entrega 2 exigen algo diferente, señala la diferencia. No afirmes que el flujo propuesto satisface requisitos académicos que no hayas podido verificar.

### Entrega 3 — MVP integrado

Objetivo: entregar el recorrido principal del usuario con las funcionalidades Must implementadas y verificadas.

Evidencias previstas:
- Aplicación funcional.
- Flujos principales integrados.
- Pruebas automatizadas.
- Verificación responsive y de accesibilidad.
- Despliegue.
- Documentación y registro de prompts actualizados.

Relaciona estas evidencias con los incrementos y tickets existentes, sin inventar fechas ni porcentajes de avance.

## 4. Revisión de consistencia documental

Busca referencias que hayan quedado obsoletas después de confirmar las decisiones DP-01 a DP-17.

Presta especial atención a:
- Decisiones descritas como pendientes cuando ya están confirmadas.
- Referencias a supuestos antiguos sobre programas activos, calendario y disponibilidad.
- Diferencias entre las prioridades de funcionalidades e historias.
- Diferencias entre los contratos de API, las reglas de negocio y el sistema de diseño.
- Dependencias de tickets y secuencia de implementación.

Corrige únicamente contradicciones documentales **inequívocas**.

Cuando una diferencia requiera una nueva decisión de producto, no la resuelvas por tu cuenta: regístrala como pendiente.

No modifiques las 17 decisiones confirmadas ni cambies silenciosamente las reglas de negocio.

## 5. Restricciones

1. Modifica únicamente `readme.md` y, si es necesario para registrar este trabajo, `prompts.md`.
2. Consulta `docs/design-system.md`, pero no lo modifiques.
3. Conserva los encabezados y marcadores de la plantilla académica.
4. Prefiere pequeñas adiciones o correcciones en secciones existentes.
5. No reestructures el README completo.
6. No cambies la arquitectura, el modelo de datos ni los contratos de API.
7. No modifiques los criterios de aceptación ni las prioridades aprobadas.
8. No instales dependencias.
9. No implementes frontend, backend ni base de datos.
10. No ejecutes DEV-001.
11. No crees commits ni Pull Requests.
12. No afirmes que una prueba se ejecutó si no ocurrió.

## 6. Registro de uso de IA

Registra este trabajo en `prompts.md` respetando su organización actual y el límite de prompts principales por sección de la plantilla.

Incluye:
- Objetivo del Prompt 18.
- Herramienta y modelo utilizados, si pueden verificarse.
- Texto del prompt o referencia inequívoca a él.
- Cambios realizados.
- Decisiones humanas que se conservaron.
- Cuestiones pendientes.
- Validaciones realmente ejecutadas.

No sustituyas ni borres registros anteriores.

## 7. Validación

Al terminar:

1. Ejecuta `git diff --check`.
2. Ejecuta `git diff --stat`.
3. Muestra `git status --short`.
4. Comprueba que F1–F10, HU, DEV y DP conservan sus identificadores.
5. Comprueba que los cambios se limitan a los archivos autorizados.
6. Confirma que no se implementó código.
7. Comprueba que la documentación no presenta como implementado lo que sigue siendo una propuesta.

## 8. Informe final

Entrega un informe con esta estructura:

### A. Estado inicial
Archivos revisados y estado de Git.

### B. Cambios documentales
Tabla con archivo, sección y modificación.

### C. Trazabilidad
Agrupación de las cinco capacidades y relación con F1–F9.

### D. Plan de entregas
Objetivo, evidencias y dependencias de cada entrega.

### E. Inconsistencias
Diferencia entre inconsistencias corregidas y pendientes de decisión.

### F. Validaciones
Resultados reales de los comandos y verificaciones.

### G. Preparación para DEV-001
Clasifica el resultado como:
- **READY:** documentación coherente y sin bloqueos para DEV-001.
- **READY WITH CONDITIONS:** puede comenzar DEV-001, pero existen pendientes no bloqueantes.
- **BLOCKED:** hay una contradicción o dependencia que impide comenzar.

Explica la clasificación y el siguiente paso recomendado.

**Importante: esta tarea termina con el informe. No comiences DEV-001.**
```

**Decisiones humanas** aportadas en el prompt y conservadas:
- La agrupación en cinco capacidades, como forma de presentar el producto y no como redefinición funcional.
- Los objetivos de trabajo de las tres entregas, incluido el flujo propuesto para la Entrega 2: registro desde la interfaz, validación en la API y persistencia en PostgreSQL.
- Las 17 decisiones DP, las prioridades, los criterios de aceptación y los contratos, que no se modifican.

**Resultado generado por la IA:**
- **Inspección:**
  - el repositorio solo contiene `readme.md`, `prompts.md` y `docs/design-system.md`, sin las instrucciones oficiales de las entregas, así que los requisitos oficiales quedan **[Pendiente de verificación]**;
  - la agrupación propuesta coincide con las definiciones de F1–F9, sin asociaciones incorrectas. Se anotan las historias que tocan varias capacidades, como HU-07, que la matriz asocia a F7.
- **Cambios en `readme.md`:**
  - 1.2: tabla "Capacidades principales del MVP" con su trazabilidad a historias e incrementos;
  - sección 6: "Plan de las tres entregas académicas [Propuesta]", con evidencias, tickets, dependencias, pruebas previstas y huecos de cada entrega;
  - correcciones de referencias obsoletas: el número de programas como [Pendiente] en la sección 4 (ya confirmado por DP-02); la nota de la sección 5 sobre decisiones [Pendiente]; el "perfil deportivo" que "se decidirá antes de la sección 3" en 2.1; la prioridad "Should *(propuesta)*" de HU-21, ya confirmada por DP-16 (resumen, matriz, historia, DEV-034 e inconsistencias); y la sección 7, que decía que no existía ninguna Pull Request.
- **Pendiente:**
  - verificar los requisitos oficiales de las tres entregas;
  - decidir cómo demostrar la Entrega 2 de forma integrada, porque ningún ticket prevé un E2E del registro antes de DEV-026;
  - decidir si la Pull Request #1, solo documental, cuenta en la sección 7;
  - confirmar el autor de 0.1 y validar el *(supuesto)* de F1 (email y contraseña);
  - registrar el Prompt 17.
- **Validación:**
  - identificadores F1–F10, HU-01–HU-23, DEV-001–DEV-039, DP-01–DP-17, T-01–T-03 y API-01–API-47 comparados con `HEAD`: los mismos conjuntos;
  - tablas y bloques de código comprobados con un script, sin problemas;
  - `git diff --check`, `git diff --stat` y `git status --short` ejecutados al terminar;
  - no se escribió código y no se ejecutó ninguna prueba de aplicación.

**Revisión humana:** pendiente.
