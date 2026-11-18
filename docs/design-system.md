# Cali Coach — Sistema de diseño del MVP

> **Estado del documento:** describe el **sistema de diseño propuesto** para el MVP. No hay pantallas ni componentes implementados. Se usan las etiquetas del README:
> - **[Confirmada]:** decisión del Product Owner;
> - **[Propuesta]:** recomendación de diseño o técnica pendiente de validar al implementar;
> - **[Pendiente]:** necesita una decisión.
>
> **Mockup de referencia:** el Product Owner indicó como referencia un mockup existente de Cali Coach (una pantalla móvil oscura de entrenamiento). **El mockup no está en el repositorio y no se ha inspeccionado.** Este documento parte de las decisiones visuales descritas por el Product Owner. La comparación exacta con el mockup, en colores, tipografía, proporciones y componentes, queda **[Pendiente]** hasta que el archivo se incorpore, por ejemplo en `docs/assets/`.

## Índice

1. [Principios UX](#1-principios-ux)
2. [Identidad visual y tokens](#2-identidad-visual-y-tokens)
3. [Tipografía, colores, espaciado y componentes](#3-tipografía-colores-espaciado-y-componentes)
4. [Navegación mobile-first](#4-navegación-mobile-first)
5. [Inventario de pantallas del MVP](#5-inventario-de-pantallas-del-mvp)
6. [Estados de interfaz](#6-estados-de-interfaz)
7. [Accesibilidad](#7-accesibilidad)
8. [Internacionalización](#8-internacionalización)
9. [MVP frente a visión futura](#9-mvp-frente-a-visión-futura)
10. [Relación con historias y tickets](#10-relación-con-historias-y-tickets)

---

## 1. Principios UX

Los principios parten de la sección 1.3 del README y de las decisiones del Product Owner.

| Principio | Qué significa en Cali Coach | Origen |
|-----------|-----------------------------|--------|
| **Usable durante el entrenamiento** | Pensado para usarse con una mano, con el móvil apoyado y entre series: objetivos táctiles grandes, poco texto y la acción principal siempre visible. | [Confirmada], 1.3 |
| **Una acción principal por pantalla** | En "Today": registrar la serie siguiente o finalizar la sesión. Las acciones secundarias quedan en menús o en segundo plano. | [Confirmada], 1.3 |
| **La sesión de hoy a un toque** | "Today" es la pestaña inicial y es accesible desde cualquier pantalla. | [Confirmada], 1.3 |
| **El estado siempre explícito** | Cada sesión muestra su estado con texto e icono, nunca solo con color. Registrar una serie no finaliza la sesión, y la interfaz lo dice. | [Confirmada], F6 y F9 |
| **Sin sorpresas destructivas** | Finalizar una sesión y borrar una serie piden confirmación. Los estados finales no ofrecen acciones de edición. | [Propuesta] |
| **El backend es la fuente de verdad** | La interfaz no decide estados ni calcula fechas: muestra lo que devuelve la API (2.2 del README). | [Confirmada], 2.2 |
| **Mobile-first desde 320 px** | Se diseña primero para 320 px y luego se amplía, sin desplazamiento horizontal. | [Confirmada], CE5 |

## 2. Identidad visual y tokens

**Identidad [Confirmada]:**
- estética *Performance / Athletic*;
- fondo oscuro azul-negro y acentos violetas;
- tarjetas oscuras con bordes discretos;
- tipografía clara y legible, con una jerarquía visual clara;
- mobile-first desde 320 px, adaptado también a escritorio;
- la accesibilidad es un requisito transversal.

**Tokens [Propuesta]:** los valores concretos son una propuesta inicial que habrá que contrastar con el mockup. Los nombres son semánticos, para poder cambiar el valor sin tocar los componentes. Se implementarían como variables CSS (DEV-039).

### 2.1. Color

Contraste calculado con la fórmula de luminancia relativa de WCAG 2.1 sobre los tres fondos. Es un cálculo de los valores propuestos, no una auditoría de pantallas implementadas.

| Token | Valor | Uso | Contraste sobre `bg` / `surface` / `surface-raised` |
|-------|-------|-----|------------------------------------------------------|
| `color-bg` | `#0B0F1A` | Fondo de la aplicación (azul-negro) | — |
| `color-surface` | `#121829` | Tarjetas | — |
| `color-surface-raised` | `#1A2236` | Tarjetas elevadas, hojas y diálogos | — |
| `color-border` | `#2A3350` | Borde **decorativo** discreto de las tarjetas | 1,54 / 1,42 / 1,27 (solo decorativo: no comunica información ni delimita controles) |
| `color-border-control` | `#6B7390` | Borde de los campos y controles interactivos | 4,08 / 3,77 / 3,38 (≥ 3:1, WCAG 1.4.11) |
| `color-text` | `#F3F5FA` | Texto principal | 17,54 / 16,20 / 14,52 |
| `color-text-muted` | `#A9B1C7` | Texto secundario y etiquetas | 8,93 / 8,25 / 7,39 |
| `color-text-disabled` | `#6B7390` | Texto deshabilitado (exento de contraste mínimo en WCAG) | 4,08 / 3,77 / 3,38 |
| `color-accent` | `#A78BFA` | Acento violeta sobre fondo oscuro: enlaces, iconos activos, estado `planned` | 7,03 / 6,49 / 5,82 |
| `color-primary` | `#7C3AED` | Fondo del botón principal | Texto blanco sobre él: 5,70. Frente a `bg`: 3,36 |
| `color-primary-pressed` | `#6D28D9` | Botón principal pulsado | Texto blanco sobre él: 7,10 |
| `color-focus` | `#C4B5FD` | Anillo de foco | 10,36 / 9,57 / — |
| `color-success` | `#34D399` | Estado `completed` y mensajes de éxito | 9,95 / 9,19 / 8,24 |
| `color-warning` | `#FBBF24` | Estado `partial` | 11,46 / 10,59 / 9,49 |
| `color-neutral` | `#94A3B8` | Estado `skipped` (neutro: omitir no es un error) | 7,46 / 6,89 / 6,18 |
| `color-danger` | `#F87171` | Errores y acciones destructivas | 6,92 / 6,39 / 5,73 |

Los cuatro estados de sesión usan **color + icono + texto** (sección 7). El color solo refuerza.

### 2.2. Espaciado, radios y elevación

| Token | Valor | Uso |
|-------|-------|-----|
| `space-1`…`space-8` | 4, 8, 12, 16, 20, 24, 32, 40 px | Escala con base 4 px. El margen lateral de la página es de 16 px (`space-4`) |
| `radius-sm` / `radius-md` / `radius-lg` | 8 / 12 / 16 px | Campos y chips / tarjetas / hojas y diálogos |
| `elevation-0` / `elevation-1` | Sin sombra / borde y fondo `surface-raised` | Sobre fondo oscuro, la elevación se expresa con el color de la superficie y no con sombras |
| `touch-min` | 44 px | Tamaño mínimo de cualquier objetivo táctil (T-02 del README) |
| `nav-height` | 56 px, más el área segura inferior | Barra de navegación inferior |

## 3. Tipografía, colores, espaciado y componentes

### 3.1. Tipografía [Propuesta]

- **Familia:** la pila del sistema (`system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`). No necesita cargar fuentes externas y se lee bien en iOS y Android. Si el mockup usa otra familia, se valorará en la comparación pendiente.
- **Cifras tabulares** (`font-variant-numeric: tabular-nums`) en repeticiones, segundos, recuentos y semanas, para que los números no "bailen" al cambiar.

| Token | Tamaño / interlineado | Peso | Uso |
|-------|-----------------------|------|-----|
| `text-display` | 32 / 40 | 700 | Cifra destacada: repeticiones en curso, semana actual |
| `text-title` | 24 / 32 | 700 | Título de la pantalla |
| `text-heading` | 20 / 28 | 600 | Título de una tarjeta, por ejemplo el nombre del ejercicio |
| `text-body` | 16 / 24 | 400 | Texto general. **Mínimo para el contenido** |
| `text-label` | 14 / 20 | 500 | Etiquetas, chips y navegación |
| `text-caption` | 13 / 18 | 400 | Metadatos secundarios: descanso, fecha |

Los tamaños se definen en `rem` para respetar el zoom y el tamaño de texto del sistema.

### 3.2. Componentes base [Propuesta]

Inventario mínimo para las pantallas del MVP. Cada componente define los estados `default`, `hover`/`pressed`, `focus-visible`, `disabled` y, cuando corresponde, `loading` y `error`.

> **El inventario no se implementa entero en I1.** DEV-039 implementa solo los componentes que necesitan las pantallas de I1 (acceso y perfil), más la navegación y los estados comunes:
> - `AppShell`, `BottomNav`/`NavRail`, `TopBar`, `Card`, `Button` e `IconButton`;
> - `TextField`, `WeekdaySelector` y `TimezoneSelect`;
> - `InlineAlert`/`Toast`, `Skeleton`/`Spinner`, `EmptyState`, `ErrorState`, `ConfirmDialog` y `StatusBadge`.
>
> El resto (`Stepper`, `NumberField`, `SetRow`, `ExerciseCard`, `ProgressBar` y `StatTile`) se añade, con los mismos tokens, en el ticket de pantalla del incremento que lo necesite por primera vez: DEV-025 en I4 y DEV-033 en I6.

| Componente | Uso principal | Notas |
|------------|---------------|-------|
| `AppShell` | Estructura: barra superior, contenido y navegación | Respeta las áreas seguras (`env(safe-area-inset-*)`) |
| `BottomNav` / `NavRail` | Navegación principal (sección 4) | Barra inferior en móvil y rail lateral a partir de 1024 px |
| `TopBar` | Título y acción contextual | Sin más de una acción principal |
| `Card` | Contenedor de ejercicio, sesión o métrica | Borde `color-border` y `radius-md` |
| `Button` | Variantes `primary`, `secondary`, `ghost` y `danger` | `loading` impide un segundo envío (CT-05); `disabled` se comunica también a la tecnología de asistencia |
| `IconButton` | Acciones compactas: editar y borrar una serie | Etiqueta accesible obligatoria y 44 × 44 px |
| `StatusBadge` | Estado de la sesión | Icono + texto traducido; **el valor interno (`planned`, …) no se traduce** |
| `TextField` / `NumberField` | Formularios y repeticiones o segundos | Teclado numérico (`inputmode="numeric"`) y error vinculado (`aria-describedby`) |
| `Stepper` | Ajustar repeticiones o segundos con una mano | Botones de −/+ de 44 px |
| `WeekdaySelector` | Elegir de 2 a 6 días | Chips conmutables con `aria-pressed`; indica cuántos hay elegidos y el rango permitido |
| `TimezoneSelect` | Zona IANA | Valor técnico (`Europe/Madrid`) con una etiqueta legible |
| `SetRow` | Una serie: número, valor objetivo, valor realizado y acciones | `setNumber` según la posición (sección 4). Solo tantas filas como series prescritas (DP-10). Los ejercicios `reps` muestran repeticiones y los `time`, segundos, sin convertir (DP-11). El objetivo es un valor fijo, por ejemplo "3 × 8" (DP-05) |
| `ExerciseCard` | Ejercicio prescrito con sus series | Muestra series, repeticiones o tiempo y descanso |
| `ConfirmDialog` | Finalizar la sesión o borrar una serie | Foco atrapado dentro del diálogo y cierre con `Esc` |
| `InlineAlert` / `Toast` | Errores, avisos y confirmaciones | `aria-live="polite"`, o `assertive` para errores bloqueantes |
| `Skeleton` / `Spinner` | Carga | Respeta `prefers-reduced-motion` |
| `EmptyState` | Listas vacías, sin programa o sin sesión hoy | Siempre con una acción siguiente |
| `ErrorState` | Fallo al cargar | Reintento si el error es reintentable (`503`, red) |
| `ProgressBar` | Semana actual sobre el total | Con valor textual ("Week 3 of 6": los programas iniciales duran 6 semanas de programa, DP-04) |
| `StatTile` | Recuentos `completed`, `partial` y `skipped`, y adherencia | Recuentos **por separado** (F8). Adherencia en %, según DP-13 (`completed` = 1, `partial` = 0,5, `skipped` = 0), o "No data yet" si no hay sesiones evaluables, nunca "0 %" |

## 4. Navegación mobile-first

**Navegación principal [Confirmada]: Today · Program · Progress · Profile.** Hay cuatro pestañas en una barra inferior fija. "Today" es la pestaña inicial.

| Pestaña | Contenido | Pantallas (sección 5) |
|---------|-----------|-----------------------|
| **Today** | Sesión de hoy o la próxima; ejecución y finalización | S-06, S-07, S-08 |
| **Program** | Programa activo y calendario. Sin programa activo, el catálogo y la activación | S-09, S-10, S-11, S-12, S-13 |
| **Progress** | Resumen, desempeño por ejercicio, historial y resumen de fin de programa | S-14, S-15, S-16, S-17 |
| **Profile** | Días de entrenamiento, zona horaria y cerrar sesión | S-04, S-05 |

- **Sin sesión iniciada:** no se muestra la navegación. Solo se ven las pantallas de acceso (S-01 a S-03).
- **Diseño adaptable [Propuesta]:**
  - de 320 a 767 px, barra inferior y una columna;
  - de 768 a 1023 px, barra inferior y contenido de hasta 640 px, centrado;
  - a partir de 1024 px, rail lateral y contenido de hasta 720 px.
- **Coherencia con el README:** la tarea 1 de T-02 (sección 6) ya refleja esta navegación. El calendario no desaparece: es parte de **Program** (S-13, HU-12).

## 5. Inventario de pantallas del MVP

Los títulos son orientativos y se mostrarán mediante claves de traducción (sección 8).

| ID | Pantalla (UI en inglés) | Pestaña | Endpoints (sección 4 del README) | Historias |
|----|-------------------------|---------|----------------------------------|-----------|
| S-01 | Sign up | — | `POST /api/auth/register` | HU-04 |
| S-02 | Sign in | — | `POST /api/auth/login` | HU-05 |
| S-03 | Restaurar la sesión (carga inicial) | — | `GET /api/auth/me` | HU-05 |
| S-04 | Training days. Con un programa activo, el selector está **desactivado** y explica por qué (DP-06) | Profile | `GET` y `PATCH /api/profile` | HU-06 |
| S-05 | Profile: zona horaria, editable también con un programa activo, y *Sign out* | Profile | `PATCH /api/profile`, `POST /api/auth/logout` | HU-07, HU-05 |
| S-06 | Today: sesión de hoy o la próxima | Today | `GET /api/sessions/today` | HU-13 |
| S-07 | Workout: registrar, editar y borrar series | Today | `POST`, `PATCH` y `DELETE …/sets` | HU-15, HU-16 |
| S-08 | Finish session (confirmación). "Finish" está desactivado hasta que haya al menos una serie (DP-09) | Today | `POST …/complete` | HU-17 |
| S-09 | Programs: catálogo | Program | `GET /api/programs` | HU-08 |
| S-10 | Program detail | Program | `GET /api/programs/{id}` | HU-09 |
| S-11 | Session template: prescripción por semana | Program | `GET …/templates/{id}?week=` | HU-09 |
| S-12 | Start program (confirmación de la activación) | Program | `POST /api/enrollments` | HU-10 |
| S-13 | My program: programa activo y calendario; detalle de una sesión | Program | `GET /api/enrollments/active`, `GET …/sessions`, `GET /api/sessions/{id}` | HU-11, HU-12, HU-14, HU-18 |
| S-14 | Progress summary | Progress | `GET …/progress` | HU-19 |
| S-15 | Exercise performance | Progress | `GET …/progress/exercises` | HU-20 |
| S-16 | Program history | Progress | `GET /api/enrollments` y detalle | HU-21 (**Should**: no bloquea el recorrido principal ni el cierre de ningún incremento Must) |
| S-17 | Program completed | Progress / Today | `GET …/progress`, `GET …/active` | HU-22 |

HU-23 (hitos) no tiene pantalla en el MVP (sección 9).

## 6. Estados de interfaz

Se aplican a todas las pantallas y corresponden a los criterios comunes CT-01 a CT-06 de la sección 5 del README.

| Estado | Cuándo | Presentación [Propuesta] |
|--------|--------|--------------------------|
| **Carga** | Petición en curso | `Skeleton` con la forma del contenido. `Spinner` solo en acciones cortas. El botón que la originó queda en `loading` |
| **Vacío** | Lista sin elementos, sin programa activo, sin sesión hoy, sin datos de progreso | `EmptyState` con explicación y una acción siguiente (por ejemplo, "Browse programs") |
| **Error** | Fallo de red o respuesta `4xx`/`5xx` | Mensaje según `error.code`, nunca el `message` técnico del servidor. Ante `503` o un fallo de red, ofrece reintentar. Ante `401`, lleva a *Sign in* |
| **Error de campo** | `400`/`422` con `details.fields` | Mensaje bajo el campo, vinculado con `aria-describedby` |
| **Éxito** | Serie guardada, sesión finalizada, perfil guardado | Confirmación breve (`Toast` o cambio visible en la tarjeta), anunciada con `aria-live` |
| **Deshabilitado** | `canLog = false` (fuera de la fecha programada, DP-08), envío en curso, menos de 2 días elegidos, **días con un programa activo (DP-06)**, **"Finish" sin ninguna serie (DP-09)**, **una serie más allá de las prescritas (DP-10)**, sesiones `completed`, `partial` o `skipped` | Control visualmente atenuado **y** con `disabled`/`aria-disabled`, con el motivo explicado cuando no es evidente |
| **Conflicto** | `409` (la sesión ya no admite cambios, serie duplicada, ya hay un programa activo) | Se refresca el dato desde la API y se explica qué cambió (política de reintentos, sección 4) |

**Estados de sesión.** El valor de la API se mantiene y la etiqueta se traduce:

| Valor (contrato) | Etiqueta en `en` [Propuesta] | Icono [Propuesta] | Color |
|------------------|------------------------------|-------------------|-------|
| `planned` | Planned | Calendario o círculo vacío | `color-accent` |
| `completed` | Completed | Marca de verificación | `color-success` |
| `partial` | Partial | Círculo a medias | `color-warning` |
| `skipped` | Skipped | Guion o salto | `color-neutral` |

## 7. Accesibilidad

**La accesibilidad es un requisito transversal [Confirmada]. El nivel objetivo, WCAG 2.1 AA, es una [Propuesta]**, como en T-02.

- **Contraste:** al menos 4,5:1 para el texto y 3:1 para los bordes de los controles y los componentes gráficos. Los valores propuestos cumplen sobre los tres fondos (tabla de la sección 2.1). El borde decorativo no se usa para delimitar controles.
- **Color:** nunca es el único medio para transmitir un estado (estados de sesión, errores y elementos seleccionados).
- **Objetivos táctiles:** al menos 44 × 44 px, con separación suficiente entre acciones contiguas (editar y borrar).
- **Teclado y foco:**
  - todo es operable con teclado y el orden de foco es lógico;
  - `:focus-visible` con un anillo de `color-focus` de 2 px;
  - los diálogos atrapan el foco y, al cerrarse, lo devuelven al elemento que los abrió.
- **Lectores de pantalla:**
  - etiquetas accesibles en todos los controles, incluidos los `IconButton`;
  - regiones `aria-live` para errores y confirmaciones;
  - `aria-current="page"` en la pestaña activa;
  - `lang="en"` en el documento.
- **Movimiento:** se respeta `prefers-reduced-motion`.
- **Zoom:** se usan `rem` y el diseño admite un zoom del 200 % sin perder contenido.
- **Verificación prevista:**
  - pruebas de componentes (DEV-039 y las de cada pantalla);
  - E2E (DEV-035);
  - una comprobación manual con lector de pantalla y en Safari de iOS (2.6 del README).

  Ninguna está ejecutada.

## 8. Internacionalización

### 8.0. Conceptos

| Concepto | Qué es | En el MVP |
|----------|--------|-----------|
| **Internacionalización (i18n)** | La preparación técnica para varios idiomas: catálogos, claves y formatos centralizados | **Sí** (DEV-038) |
| **Localización (l10n)** | Traducir y adaptar la interfaz o el contenido a un idioma o región concretos | **No.** Solo existe `en`, sin idiomas adicionales |
| **Zona horaria IANA** | Una **regla de negocio**: decide cuándo es "hoy" y cuándo vence una sesión (RP5) | Sí, con independencia del idioma (sección 8.4) |

### 8.1. Decisiones

| Decisión | Estado |
|----------|--------|
| La interfaz del MVP está **solo en inglés** (`en`) | [Confirmada] |
| El frontend se prepara para añadir otros idiomas después | [Confirmada] |
| **No hay selector de idioma** en el MVP | [Confirmada] |
| El contenido de programas y ejercicios se muestra en inglés | [Confirmada] |
| El contenido guardado en la base de datos no se traduce en el MVP | [Confirmada] |
| `i18next` + `react-i18next` | [Propuesta] del Product Owner, pendiente de validar al implementar |
| La estrategia para traducir el contenido almacenado | [Pendiente]: decisión futura (sección 8.5) |

### 8.2. Organización de los catálogos [Propuesta]

- **Un espacio de nombres por funcionalidad**, alineado con las *features* de la SPA (2.3 del README): `common`, `auth`, `profile`, `programs`, `calendar`, `session`, `progress` y `errors`.
- **Estructura:** `frontend/src/locales/en/<namespace>.json`. El idioma por defecto y el de respaldo son `en`.
- **Claves semánticas** con puntos, por ejemplo `session.finish.confirmTitle` o `profile.weekdays.rangeHint`. Ningún texto visible queda escrito directamente en los componentes.
- **Pluralización y variables** con las reglas de i18next, por ejemplo `progress.weekOf` con `{ current, total }`.
- **Errores de la API:** se traducen a partir de `error.code`, con claves `errors.<CODE>` (por ejemplo, `errors.SESSION_NOT_OPEN`), más un mensaje genérico de respaldo. El campo `message` del servidor no se muestra a la persona usuaria.

### 8.3. Lo que no se traduce

Son contratos técnicos y se usan siempre tal cual:
- los estados (`planned`, `completed`, `partial`, `skipped`, `active`, `finished`);
- los huecos (`PUSH_A`, …) y las formas de medida (`reps`, `time`);
- los códigos de error (`SESSION_NOT_OPEN`, …);
- las rutas y los campos JSON de la API;
- los `code` del catálogo;
- los identificadores y las zonas IANA.

La interfaz **traduce solo su etiqueta visible**, con claves como `session.status.<valor>`.

### 8.4. Idioma, configuración regional y zona horaria

Son tres conceptos independientes:

| Concepto | Qué decide | En el MVP |
|----------|------------|-----------|
| **Idioma de la interfaz** | Textos (i18next) | `en`, fijo |
| **Configuración regional de formato** | Formato de fechas y números (`Intl.DateTimeFormat`, `Intl.NumberFormat`) | `en`, separada en la configuración para poder cambiarla después sin cambiar el idioma [Propuesta] |
| **Zona horaria** | Cuándo es "hoy" y cuándo vence una sesión | La zona IANA del perfil (`users.timezone`), **nunca** la del navegador ni la del idioma |

**Formato de fechas [Propuesta]:**
- **fechas de calendario** (`scheduledDate`, `today`, con forma `YYYY-MM-DD`): se formatean como fecha **sin convertir de zona horaria**. Por ejemplo, se construyen en UTC y se formatean con `timeZone: "UTC"`, para que un `2026-11-20` nunca se muestre como el 19 (CT-06);
- **instantes** (`completedAt`, `closedAt`, `activatedAt`): se formatean con la zona horaria del perfil.

### 8.5. Contenido almacenado: decisión futura [Pendiente]

El nombre, la descripción y el objetivo de los programas, plantillas y ejercicios están en la base de datos, en inglés. **El esquema de la sección 3 no cambia en el MVP.** Opciones que habrá que evaluar cuando se decida añadir idiomas:

| Opción | Idea | Coste |
|--------|------|-------|
| Claves de traducción a partir del `code` | La SPA traduce `programs.<code>.name` con los catálogos del frontend | Sin cambios en la base de datos, pero el contenido y su traducción quedan en sitios distintos |
| Tablas de traducción por entidad e idioma | Una fila por entidad e idioma | Cambia el modelo de datos (sección 3) y la API |
| Columnas con mapas de idioma | Columnas `jsonb` con un valor por idioma | Cambia el modelo y la validación |

Cualquiera de ellas tendría que respetar la **inmutabilidad del catálogo** (3.2 del README): una traducción no puede cambiar el significado de una prescripción ya usada.

## 9. MVP frente a visión futura

| Elemento | En el MVP | Visión futura |
|----------|-----------|---------------|
| Interfaz en inglés, preparada para otros idiomas | **Sí** | Selector de idioma y nuevos catálogos |
| Navegación Today · Program · Progress · Profile | **Sí** | Posibles secciones nuevas |
| Suscripciones y planes Free/Pro | **No** | Se evaluarían más adelante |
| Pagos | **No** (excluido en 1.2) | — |
| Análisis de la técnica con IA y revisión de vídeos por entrenadores | **No** (excluido en 1.2) | Fase de IA |
| Skills y Library avanzadas | **No** | Posible evolución del catálogo |
| Hitos de reconocimiento (F10) | No, es una mejora posterior (HU-23) | Si se definen su contrato y sus criterios |
| PWA y Capacitor | **No** (excluido en 1.2) | Fase posterior |

**Regla de diseño:** las funciones futuras **no aparecen** en la interfaz del MVP. No hay pestañas bloqueadas, avisos de "próximamente", botones de mejora de plan ni marcadores de posición.

## 10. Relación con historias y tickets

| Parte del sistema de diseño | Historias (sección 5) | Tickets (sección 6) |
|-----------------------------|-----------------------|---------------------|
| Tokens, componentes base, navegación, estados y accesibilidad | CT-01 a CT-06; base de HU-04 a HU-22 | **DEV-039**; lo usan DEV-006, DEV-007, DEV-008, DEV-013, DEV-018, DEV-019, DEV-024, DEV-025, DEV-030 y DEV-033 |
| Internacionalización (`en`) y formatos regionales | CT-02, CT-06; todos los textos de HU-04 a HU-22 | **DEV-038**; lo usan DEV-006 y todas las pantallas |
| Pantallas S-01 a S-05 | HU-04 a HU-07 | DEV-007, DEV-008 |
| Pantallas S-06 a S-08 | HU-13, HU-15 a HU-17 | DEV-019, DEV-025 |
| Pantallas S-09 a S-13 | HU-08 a HU-12, HU-14, HU-18 | DEV-013, DEV-018, DEV-024, DEV-030 |
| Pantallas S-14 a S-17 | HU-19 a HU-22 | DEV-030, DEV-033, DEV-034 |
| Verificación E2E, 320 px, lector de pantalla | CT-01 a CT-06 | DEV-026, DEV-035 |

**Coherencia con el README.** Estas diferencias se detectaron al crear este documento y ya se han resuelto:
- **Sección 1.2:** precisa que lo excluido son los **idiomas adicionales** (la localización), no la internacionalización técnica.
- **T-02 (sección 6):** su tarea 1 usa la navegación Today · Program · Progress · Profile, y su exclusión se limita a los idiomas adicionales.
- **Sección 4:** documenta que `message` es un texto técnico que la interfaz no muestra, así que sus ejemplos pueden seguir en español. Escribirlos en inglés sería un cambio de redacción, no del contrato.
- **Sección 5:** una nota indica que los nombres de pantallas y botones de las historias ("Hoy", "Finalizar") son descripciones funcionales, y que las etiquetas de la interfaz son las de este documento.
