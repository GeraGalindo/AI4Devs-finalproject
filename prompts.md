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

**Notas:**
- **Numeración:** los prompts 01–05 y 11–15 llevan el número que les dio el autor. Los números 06–10 los asignó la IA al documentarlos, siguiendo la secuencia.
- **Prompts de documentación:** los prompts que solo pedían documentar otros prompts en este archivo ("Documenta en prompts.md…") no se registran como prompts propios.
- **Prompts 16, 17 y 18:** son transversales y se registran en el **Anexo** del final de este archivo. El 17 queda como referencia pendiente hasta conocer su resultado.

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

**Prompt 2:**

**Prompt 3:**

### **2.4. Infraestructura y despliegue**

**Prompt 1:** ver 2.1, Prompt 1 (Prompt 03). Propuesta de entorno local, despliegue en un único servicio PaaS (aún por elegir) y CI con GitHub Actions. No hay infraestructura creada.

**Prompt 2:**

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

> Los dos prompts de esta sección modificaron solo la sección 3 de `readme.md` (3.1 y 3.2). El hueco del Prompt 3 queda libre.

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

---

### 4. Especificación de la API

> Los dos prompts de esta sección definieron y revisaron el contrato REST. El Prompt 2 modificó también la sección 2 de `readme.md` (2.2, 2.5 y 2.6) para alinearla con el contrato. Se documenta solo aquí, porque los huecos de la sección 2 ya están ocupados por los prompts 03–05. El hueco del Prompt 3 queda libre.

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
