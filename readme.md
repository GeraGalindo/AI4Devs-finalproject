## Índice

0. [Ficha del proyecto](#0-ficha-del-proyecto)
1. [Descripción general del producto](#1-descripción-general-del-producto)
2. [Arquitectura del sistema](#2-arquitectura-del-sistema)
3. [Modelo de datos](#3-modelo-de-datos)
4. [Especificación de la API](#4-especificación-de-la-api)
5. [Historias de usuario](#5-historias-de-usuario)
6. [Tickets de trabajo](#6-tickets-de-trabajo)
7. [Pull requests](#7-pull-requests)

---

## 0. Ficha del proyecto

### **0.1. Tu nombre completo:**

Gerardo Galindo. *Tomado de la configuración de Git del repositorio (`user.name`); pendiente de confirmar por el autor.*

### **0.2. Nombre del proyecto:**

Cali Coach

### **0.3. Descripción breve del proyecto:**

Aplicación web *mobile-first* para practicantes intermedios de calistenia. Asigna un programa de entrenamiento preconfigurado, lo distribuye en los días que el atleta puede entrenar (de 2 a 6), le muestra la sesión de cada día, registra las series realizadas y le enseña su progreso (sección 1). **Estado:** la especificación del MVP está documentada (Entrega 1). DEV-001 añade el andamiaje técnico: frontend, backend, PostgreSQL local, CI y una comprobación técnica de salud (`GET /api/health`). **Todavía no hay ninguna funcionalidad de negocio implementada.**

### **0.4. URL del proyecto:**

**Pendiente.** Todavía no hay ningún despliegue (DEV-036, sección 6; criterio de éxito CE6).

> Puede ser pública o privada, en cuyo caso deberás compartir los accesos de manera segura. Puedes enviarlos a [alvaro@lidr.co](mailto:alvaro@lidr.co) usando algún servicio como [onetimesecret](https://onetimesecret.com/).

### 0.5. URL o archivo comprimido del repositorio

> Puedes tenerlo alojado en público o en privado, en cuyo caso deberás compartir los accesos de manera segura. Puedes enviarlos a [alvaro@lidr.co](mailto:alvaro@lidr.co) usando algún servicio como [onetimesecret](https://onetimesecret.com/). También puedes compartir por correo un archivo zip con el contenido

Remoto `origin` configurado en el repositorio: `git@github.com:GeraGalindo/AI4Devs-finalproject.git` (https://github.com/GeraGalindo/AI4Devs-finalproject). **Pendiente** de confirmar su visibilidad y los accesos para la entrega.


---

## 1. Descripción general del producto

> Describe en detalle los siguientes aspectos del producto:

**Cali Coach** es una aplicación web *mobile-first* para practicantes intermedios de calistenia. Asigna al usuario un programa de entrenamiento estructurado, lo distribuye en los días que puede entrenar y le muestra cada semana cómo avanza hacia sus objetivos.

> **Estado de esta sección:** describe el **alcance planificado del MVP**. Ninguna funcionalidad se considera implementada hasta que aparezca en las secciones técnicas (2–4) y en las Pull Requests (sección 7). Los elementos marcados como *(supuesto)* están pendientes de validar, y los marcados como *(pendiente)* esperan una decisión del Product Owner.

### **1.1. Objetivo:**

> Propósito del producto. Qué valor aporta, qué soluciona, y para quién.

Ofrecer a practicantes intermedios de calistenia una **planificación de entrenamiento integrada y ajustada a su disponibilidad semanal**. Se entrega mediante programas preconfigurados con progresión semana a semana. El objetivo es que el usuario sepa en todo momento qué entrenar hoy, entrene con constancia y vea su progreso. En una fase posterior, las recomendaciones mediante IA se apoyarán sobre esta misma base.

#### Problema

| # | Problema | Cómo se manifiesta | Cómo lo aborda el MVP |
|---|----------|--------------------|-----------------------|
| P1 | Dificultad para progresar hacia habilidades de calistenia | El usuario no sabe qué ejercicios o progresiones le acercan a una habilidad concreta. | Programas preconfigurados con progresión definida semana a semana. |
| P2 | Falta de programación integrada | Rutinas sueltas (vídeos, notas, apps genéricas) sin orden ni calendario. | Un programa activo con sus sesiones asignadas a fechas concretas (un solo programa activo por usuario, DP-07). |
| P3 | Programas poco adaptados al nivel y la disponibilidad | Los planes asumen un número de días fijo que no encaja con la vida del usuario. | El usuario elige de 2 a 6 días fijos y el programa usa la distribución correspondiente. |
| P4 | Estancamientos | Repetir siempre el mismo estímulo sin una progresión planificada. | La progresión forma parte del diseño del programa, con variantes A/B distintas cuando un tipo de sesión se repite en la semana. El registro de series y repeticiones permite detectar estancamientos. La adaptación dinámica queda para la fase de IA. |
| P5 | Falta de reconocimiento del progreso | No hay un registro visible de lo conseguido, y eso desmotiva. | Historial de sesiones, desempeño registrado (series y repeticiones), porcentaje de adherencia, avance en el programa y, como deseable, hitos básicos. |

#### Público objetivo

- **Usuario principal:** practicante **intermedio** de calistenia que ya realiza los ejercicios básicos con buena técnica (dominadas, fondos, flexiones, sentadillas) y quiere estructurar su entrenamiento para seguir progresando. Entrena sin entrenador personal, normalmente en casa o en parques, y consulta la app desde el móvil durante la sesión. El nivel intermedio se describe con criterios orientativos de experiencia y capacidades, sin evaluación física obligatoria ni bloqueo del acceso por nivel (DP-03).
- **Fuera del público del MVP:** principiantes absolutos, atletas avanzados o de competición y entrenadores que gestionan a varios clientes.

#### Propuesta de valor

> *"Dime cuántos días puedes entrenar y Cali Coach te dice qué entrenar cada uno de ellos, semana a semana, hasta completar tu programa."*

- **Sin planificar por tu cuenta:** el calendario completo del programa se genera al empezar.
- **Ajustado a tu semana:** de 2 a 6 días, con una secuencia Push/Pull/Legs & Core coherente con ese número de días y variantes A/B distintas cuando un tipo se repite.
- **Progreso visible:** sabes en qué semana estás, cuántas sesiones has completado, qué series y repeticiones has hecho y, si se implementan, qué hitos has alcanzado.

#### Criterios de éxito del MVP

Son criterios de aceptación del producto. Se considerarán cumplidos solo cuando se verifiquen (tests o pruebas manuales documentadas en la sección 2.6). **Hasta ahora no se ha ejecutado ninguna prueba.**

| ID | Criterio | Cómo se verificará |
|----|----------|--------------------|
| CE1 | Un usuario nuevo puede registrarse, configurar sus días, elegir un programa y ver su primera sesión programada en una única sesión de uso y sin ayuda externa. | Prueba manual del flujo principal. |
| CE2 | Para cualquier combinación de días (2–6) y duración del programa, el calendario contiene exactamente `días × semanas` sesiones. Además, sigue la secuencia A/B correspondiente (RP3), empieza el próximo día disponible sin esperar al lunes y avanza en orden cronológico. | Tests unitarios de la lógica de planificación. |
| CE3 | Al terminar su fecha programada, según la zona horaria del usuario, una sesión que sigue `planned` pasa a `partial` si tiene al menos una serie registrada y a `skipped` si no tiene ninguna. Una sesión `completed` no cambia. Ninguna sesión se reprograma, y las posteriores conservan su fecha. | Tests unitarios, de integración y de concurrencia (2.6). |
| CE4 | El atleta puede registrar las series y repeticiones de cada ejercicio sin finalizar la sesión, y registrar no cambia el estado a `completed`. La vista de progreso refleja correctamente el desempeño registrado, los recuentos de `completed`, `partial` y `skipped` **por separado**, la adherencia y la semana actual. | Tests y prueba manual. |
| CE5 | El flujo principal funciona en navegadores móviles (Safari en iOS, Chrome en Android) y de escritorio, con anchos de pantalla desde **320 px** sin desplazamiento horizontal. | Prueba manual en dispositivos o emulación. |
| CE6 | La aplicación está desplegada y accesible mediante una URL. | Enlace en la sección 0.4. |

**Indicadores de producto** (se medirían tras el lanzamiento y no se usan para evaluar el MVP): porcentaje de usuarios que completan su primera semana, adherencia media (fórmula de DP-13) y tasa de finalización de programas.

### **1.2. Características y funcionalidades principales:**

> Enumera y describe las características y funcionalidades específicas que tiene el producto para satisfacer las necesidades identificadas.

#### Funcionalidades del MVP

Para que el alcance quepa en un proyecto académico de unas 30 horas, las funcionalidades se priorizan así: **Imprescindible**, sin la cual no hay MVP; **Deseable**, que se implementará si el tiempo lo permite.

| ID | Funcionalidad | Descripción | Problema | Prioridad |
|----|---------------|-------------|----------|-----------|
| F1 | Registro e inicio de sesión | Cuenta con email y contraseña para guardar el programa y el progreso de cada usuario. *(supuesto)* | — | Imprescindible |
| F2 | Configuración de disponibilidad | El usuario elige entre 2 y 6 **días fijos** de la semana (por ejemplo, lunes, miércoles y viernes). **No se pueden cambiar mientras haya un programa activo** (DP-06). | P3 | Imprescindible |
| F3 | Catálogo de programas preconfigurados | Programas con nivel, objetivo, **duración en semanas** y sesiones por tipo y variante (Push A/B, Pull A/B, Push-Pull A, Legs & Core A/B). Las variantes A y B de un mismo tipo son sesiones diferentes, que pueden variar en ejercicios, volumen, intensidad y objetivo; su contenido concreto se definirá más adelante. Cada sesión indica ejercicios, series, repeticiones o tiempo y descanso. Las repeticiones prescritas son **fijas**, sin rangos (DP-05). Los programas se cargan como datos semilla: el catálogo inicial tiene **3 programas de 6 semanas** (DP-02, DP-04), cuyo contenido está por definir. | P1, P2, P4 | Imprescindible |
| F4 | Inscripción y generación del calendario | Al inscribirse, el sistema genera todas las sesiones del programa y las asigna a fechas según las reglas de planificación (ver abajo). Solo hay **un programa activo** por usuario (DP-07). | P2, P3 | Imprescindible |
| F5 | Sesión del día y calendario | Vista de la sesión de hoy (o de la próxima) con sus ejercicios, más un listado de las sesiones con su estado: `planned`, `completed`, `partial` o `skipped`. | P2 | Imprescindible |
| F6 | Finalizar sesión | El atleta finaliza **explícitamente** la sesión del día, que pasa a `completed`. Es la única forma de llegar a ese estado: registrar series no completa la sesión. Para finalizar hace falta **al menos una serie registrada** (DP-09). | P5 | Imprescindible |
| F7 | Cierre automático del día | Al terminar su fecha programada, según la zona horaria del usuario, una sesión que sigue `planned` pasa a `partial` (si tiene al menos una serie registrada) o a `skipped` (si no tiene ninguna). No se recupera, y las sesiones posteriores conservan su fecha. | P2 | Imprescindible |
| F8 | Panel de progreso | Semana actual / total. Recuentos de `completed`, `partial` y `skipped`, mostrados **por separado**. Adherencia (%), con la fórmula de DP-13, o "sin datos" si no hay sesiones evaluables. Consulta del desempeño registrado en F9. | P5 | Imprescindible |
| F9 | Registro de ejecución | Anotar las series realmente hechas en cada ejercicio de la sesión del día (repeticiones o, en los ejercicios por tiempo, segundos; DP-11), sin necesidad de finalizarla. Solo en su fecha programada (DP-08) y como mucho tantas series como las prescritas (DP-10). Registrar no cambia el estado. Si la sesión termina como `partial`, sus registros se conservan. Sirve para consultar el desempeño del atleta, no solo su adherencia. | P4, P5 | Imprescindible |
| F10 | Hitos de reconocimiento | Hitos simples calculados a partir del historial (por ejemplo, primera sesión, primera semana completa, programa finalizado). | P5 | Deseable |

#### Capacidades principales del MVP

Para presentar el producto, las nueve funcionalidades imprescindibles se agrupan en cinco capacidades. **Es solo una forma de presentarlas, no una redefinición:** F1–F10, sus descripciones y sus prioridades no cambian, y la cobertura detallada sigue en las matrices de las secciones 5 y 6.

| Capacidad principal | Funcionalidades | Historias Must (sección 5) | Incrementos (sección 6) |
|---------------------|-----------------|----------------------------|-------------------------|
| Gestión de cuenta y disponibilidad | F1 + F2 | HU-04, HU-05, HU-06 y HU-07 | I1 |
| Programas y planificación | F3 + F4 | HU-08, HU-09, HU-10, HU-11 y HU-22 | I2, I3 (HU-22 en I5) |
| Consulta del entrenamiento | F5 | HU-12, HU-13 y HU-14 | I3, I4 (HU-14) |
| Ejecución y cierre de sesiones | F6 + F7 + F9 | HU-15, HU-16, HU-17 y HU-18 | I4, I5 (núcleo del cierre adelantado a I3) |
| Seguimiento del progreso | F8 | HU-19 y HU-20; HU-21 es Should (DP-16) | I6 |

- **F10 (hitos, Deseable)** queda fuera de las cinco capacidades y del alcance obligatorio del MVP (DP-17, HU-23).
- Algunas historias tocan más de una capacidad: HU-07 (zona horaria) se configura en el perfil, pero la matriz de la sección 5 la asocia a F7 porque decide cuándo vence una sesión; HU-11 cubre F4 y F5; HU-14 y HU-20 usan los registros de F9; HU-22 cubre F4, F8 y RP6. La tabla las coloca en la capacidad de su pantalla principal.

#### Reglas de planificación

| Días/semana | Secuencia de sesiones |
|-------------|-----------------------|
| 2 | Push A, Pull A |
| 3 | Push A, Pull A, Push-Pull A |
| 4 | Push A, Pull A, Push B, Pull B |
| 5 | Push A, Pull A, Legs & Core A, Push B, Pull B |
| 6 | Push A, Pull A, Legs & Core A, Push B, Pull B, Legs & Core B |

- **RP1.** Cada programa define su duración en semanas. El atleta elige entre 2 y 6 días fijos por semana. El total de sesiones es `días por semana × semanas`.
- **RP2.** El programa empieza el **próximo día disponible** de los que ha seleccionado el atleta, sin esperar necesariamente al lunes. El día de la activación queda excluido aunque sea un día elegido: la primera sesión es el siguiente día elegido **posterior** a la activación, según la zona horaria del perfil (DP-01).
- **RP3.** Las sesiones se asignan **en orden cronológico** a los días seleccionados, siguiendo la secuencia de la tabla. Cuando un tipo aparece dos veces por semana, sus variantes A y B son sesiones diferentes.
- **RP4.** Cada bloque de N sesiones consecutivas forma una semana del programa, donde N es el número de sesiones semanales. Esa semana no tiene por qué coincidir con la semana natural.
- **RP5.** Al terminar su fecha programada, según la zona horaria del usuario, una sesión que sigue `planned` se cierra automáticamente: pasa a `partial` si tiene al menos una serie registrada y a `skipped` si no tiene ninguna. Una sesión `completed` no cambia. Ninguna sesión se reprograma, y las posteriores conservan su fecha.
- **RP6.** El programa termina cuando ninguna de sus sesiones sigue `planned`, es decir, cuando todas están en un estado final (`completed`, `partial` o `skipped`).

#### Estados de una sesión

| Estado | Significado | ¿Final en el MVP? |
|--------|-------------|-------------------|
| `planned` | Sesión programada y abierta. Se pueden registrar series y finalizarla durante su fecha. | No |
| `completed` | Sesión finalizada explícitamente por el atleta, con al menos una serie registrada (F6, DP-09). | Sí |
| `partial` | Su fecha programada terminó con al menos una serie registrada, pero sin que el atleta la finalizara. Conserva sus registros. | Sí |
| `skipped` | Su fecha programada terminó sin ninguna serie registrada. | Sí |

`partial` y `skipped` son resultados distintos del cierre automático (F7, RP5). Registrar series no cambia el estado a `completed`.

#### Decisiones del Product Owner

Las decisiones que estaban abiertas, entre ellas el inicio el mismo día, el número de programas, el criterio de "intermedio", el cambio de disponibilidad, el programa activo único, la fórmula de adherencia y la duración de la sesión de autenticación, ya están **confirmadas**. Ver el registro DP-01 a DP-17 más abajo. Su impacto técnico se detalla en 2.1.

#### Registro de decisiones del Product Owner (DP-01 a DP-17)

El Product Owner ha resuelto las 17 decisiones que estaban abiertas. **Todas están [Confirmada].** Esta tabla es la referencia, y las demás secciones remiten a ella. "Dónde se aplica" indica las partes del README y los tickets afectados.

| ID | Decisión confirmada | Dónde se aplica | Tickets |
|----|---------------------|-----------------|---------|
| DP-01 | **Primera sesión:** el siguiente día de entrenamiento elegido **posterior** a la fecha de activación, calculada con la zona horaria IANA del perfil. El día de activación queda excluido aunque sea un día elegido. No cambia ni el total de sesiones ni su orden | RP2; 2.2 (flujo 1); 2.6; HU-01 y HU-10; sección 4 (activación) | DEV-015, DEV-016 |
| DP-02 | **Catálogo inicial:** exactamente **3 programas** preconfigurados. Sus nombres, objetivos, ejercicios y prescripciones todavía no están definidos | F3; HU-08; T-03; *seeds* | DEV-010, DEV-013 |
| DP-03 | **Nivel intermedio:** se describe con criterios orientativos de experiencia y capacidades. Sin evaluación física obligatoria ni bloqueo del acceso por nivel | Público objetivo (1.1); `programs.level` (3.2) | DEV-010, DEV-013 |
| DP-04 | **Duración:** cada programa inicial dura **6 semanas de programa**. Una semana de programa son N sesiones (RP4), no una semana natural. Total: `N × 6` sesiones | RP1, RP4; *seeds*; ejemplos de la sección 4 | DEV-010, DEV-015 |
| DP-05 | **Prescripción por repeticiones:** objetivos **fijos**, sin rangos (3 × 8, no 3 × 8–12). Los ejercicios por repeticiones y por tiempo se mantienen separados | `template_exercises` (3.2), que ya usa valores fijos: el esquema no cambia | DEV-009, DEV-010 |
| DP-06 | **Días de entrenamiento:** **no se pueden cambiar mientras haya un programa activo**. Lo aplica el backend (`409 AVAILABILITY_LOCKED`), no solo la interfaz. La zona horaria no queda afectada (ver la cuestión independiente más abajo) | F2; sección 4 (`PATCH /api/profile`); 2.2; HU-01 y HU-06 | DEV-005, DEV-008 |
| DP-07 | **Un solo programa activo por usuario**, garantizado en el backend con control de concurrencia (índice único parcial). La reconciliación previa identifica las inscripciones que ya terminaron | F4; 2.2; 3.2; sección 4 | DEV-014, DEV-016, DEV-017, DEV-018 |
| DP-08 | **Fecha de registro:** solo se pueden registrar, editar o borrar series de una sesión **en su fecha programada**, y solo se puede finalizar ese mismo día, según la zona horaria del perfil. No hay registros anticipados ni cambios retroactivos. Los estados `completed`, `partial` y `skipped` son inmutables | F7, F9; 2.2 (T-registro, T-finalizar); sección 4 | DEV-022, DEV-023 |
| DP-09 | **Finalizar exige al menos una serie registrada**, aunque no hace falta registrar todas las prescritas. Finalizar produce `completed`. Al vencer, una sesión con registros y sin finalizar pasa a `partial`, y una sin registros pasa a `skipped` | F6; estados de 1.2; 2.2; sección 4 (`409 NO_SETS_LOGGED`); HU-03 y HU-17 | DEV-023, DEV-025 |
| DP-10 | **Límite de series:** solo se pueden registrar las series prescritas para cada ejercicio (`setNumber` ≤ `targetSets`). No hay series adicionales en el MVP. Lo aplica el backend | F9; sección 4 (`422 SET_NUMBER_OUT_OF_RANGE`); HU-15 | DEV-022, DEV-025 |
| DP-11 | **Ejercicios por tiempo:** el MVP admite ejercicios medidos en repeticiones (`reps`) y en tiempo (`time`). En los de tiempo se registran los **segundos** realmente hechos, y en los de repeticiones, el número hecho. Sin conversiones entre unidades | F9; `set_logs.duration_seconds` (3.2); sección 4; HU-15 | DEV-020, DEV-022, DEV-025 |
| DP-12 | **Sesiones evaluables para la adherencia:** solo las cerradas o finalizadas (`completed`, `partial`, `skipped`), según el estado reconciliado. Las sesiones `planned`, incluida la de hoy, no cuentan | F8; 3.2 (consultas de progreso); sección 4 (`progress`) | DEV-031, DEV-032, DEV-033 |
| DP-13 | **Fórmula de adherencia:** `completed` vale 1, `partial` 0,5 y `skipped` 0. **Adherencia (%) = 100 × (completed + 0,5 × partial) / (completed + partial + skipped)**. Sin sesiones evaluables, la adherencia es "sin datos" (`null`), nunca 0 % ni una división entre cero. No es lo mismo que el porcentaje de series hechas ni que el desempeño por ejercicio | F8; sección 4; HU-03 y HU-19 | DEV-030–DEV-033 |
| DP-14 | **Abandonar o cancelar** un programa activo queda **fuera del MVP**: no hay endpoint, botón ni ticket. Un programa activo termina con el cierre ya definido (RP6) | Fuera de alcance (1.2); 2.1 | Ninguno |
| DP-15 | **Sesión de autenticación:** 7 días absolutos. Al caducar, hay que volver a iniciar sesión. Sin renovación automática. Se mantienen la cookie `HttpOnly`, `Secure` y `SameSite` y la protección CSRF | F1; 2.5; sección 4 | DEV-004 |
| DP-16 | **HU-21 sigue siendo Should.** La pantalla de historial completo no forma parte del recorrido obligatorio. Los datos históricos de inscripciones y sesiones se conservan, y los endpoints existentes no se eliminan | HU-21; S-16 (`docs/design-system.md`) | DEV-034 |
| DP-17 | **HU-23 (hitos) queda como mejora posterior.** No hay insignias, recompensas ni notificaciones en el MVP. La historia se conserva | F10; HU-23 | Ninguno |

**Contenido y cuestiones que siguen abiertos.** No forman parte del registro DP:
- **Contenido de los 3 programas** (DP-02): nombres, objetivos, ejercicios, prescripciones y para qué números de días (2 a 6) es compatible cada uno. Un programa solo se puede activar para un N si tiene plantilla para cada hueco de su secuencia (2.1).

  **Debe definirse antes de cerrar DEV-010 (I2).** Hasta entonces, las *seeds* llevan contenido provisional marcado como tal.
- **Zona horaria con un programa activo** (cuestión independiente de DP-06): DP-06 solo bloquea los días. Se mantiene el contrato actual: la zona se puede cambiar, las fechas no se recalculan y el riesgo está aceptado (2.1). Si el Product Owner quisiera bloquearla también, sería una decisión nueva.

**Decisiones técnicas abiertas.** No son del Product Owner; las resuelve el equipo técnico:
- la plataforma PaaS y el dominio (2.4, DEV-036);
- bcrypt o argon2 (DEV-004);
- la longitud mínima de la contraseña y los umbrales del límite de peticiones (DEV-004);
- TanStack Query (DEV-006);
- la comparación con el mockup visual, que no está en el repositorio (DEV-039);
- la estrategia futura para traducir el contenido guardado (DEV-038);
- el redondeo con que la API devuelve la adherencia (sección 4).

#### Fuera de alcance del MVP

- Recomendaciones, ajustes de carga o generación de programas mediante **IA** (fase posterior).
- Soporte **PWA** (instalación, modo sin conexión, notificaciones push) y empaquetado nativo con **Capacitor** (fase posterior).
- Recuperar, reprogramar o reabrir sesiones `partial` o `skipped`, y cambiar el estado de una sesión ya cerrada. Cambiar los días de entrenamiento con un programa activo (DP-06).
- Crear o editar programas propios y disponer de un panel de administración de contenidos (los programas llegan como datos semilla).
- Biblioteca multimedia propia (vídeos o animaciones de ejercicios), evaluación automática de la técnica y tests de nivel guiados.
- Funciones sociales, rankings, mensajería y perfiles de entrenador.
- Nutrición, integración con *wearables*, pagos, suscripciones y planes Free/Pro.
- **Idiomas adicionales al inglés y selector de idioma.** La interfaz del MVP es solo en inglés (`en`), y el contenido de programas y ejercicios también. Sí forma parte del MVP la **internacionalización técnica**, es decir, la preparación del frontend para añadir idiomas después (DEV-038, sección 6). Lo que queda fuera es la **localización**: traducir y adaptar a otros idiomas o regiones, incluido el contenido guardado en la base de datos. Ver `docs/design-system.md`, sección 8.
- Análisis de la técnica mediante IA, revisión de vídeos por entrenadores y funciones avanzadas de *Skills* y *Library*.
- Tener varios programas activos a la vez (DP-07).
- Abandonar o cancelar manualmente un programa activo (DP-14).
- Insignias, recompensas o notificaciones de hitos (DP-17; HU-23 queda como mejora posterior).

### **1.3. Diseño y experiencia de usuario:**

> Proporciona imágenes y/o videotutorial mostrando la experiencia del usuario desde que aterriza en la aplicación, pasando por todas las funcionalidades principales.

> **Pendiente:** las capturas y el videotutorial se añadirán cuando exista la implementación. Por ahora se describe el flujo principal previsto.

#### Flujo principal

1. **Llegada:** el usuario abre la app desde el navegador del móvil o del escritorio y se registra o inicia sesión.
2. **Disponibilidad:** elige sus días fijos de entrenamiento (de 2 a 6).
3. **Elección de programa:** consulta el catálogo y ve el nivel, el objetivo, la duración y la secuencia A/B de cada programa según sus días.
4. **Inscripción:** confirma el programa. El sistema genera el calendario, que empieza el próximo día disponible sin esperar al lunes.
5. **Entrenamiento:** en cada día de entrenamiento abre la sesión del día, sigue los ejercicios y registra las series y repeticiones hechas. Registrar **no** finaliza la sesión, que sigue `planned`. Cuando termina, la finaliza explícitamente y pasa a `completed`, siempre que haya registrado al menos una serie (DP-09).
6. **Cierre del día:** si no la finaliza antes de que termine su fecha programada (en su zona horaria), la sesión se cierra automáticamente. Pasa a `partial` si registró al menos una serie, y conserva esos registros, o a `skipped` si no registró ninguna. Las siguientes sesiones mantienen su fecha.
7. **Progreso:** consulta en el panel la semana actual, la adherencia, el desempeño registrado y, si se implementan, los hitos.
8. **Fin del programa:** después de la última sesión, ve un resumen del programa y puede inscribirse en otro.

```mermaid
flowchart TD
    A[Registro / inicio de sesión] --> B[Elegir días fijos 2–6]
    B --> C[Elegir programa del catálogo]
    C --> D[Generar calendario con secuencia A/B desde el próximo día disponible]
    D --> E{"¿Hoy hay una sesión planned?"}
    E -- No --> P["Ver próxima sesión y progreso"]
    E -- Sí --> F["Abrir sesión del día"]
    F --> L["Registrar series y repeticiones, opcional y sin cambiar el estado"]
    L --> G{"¿Con al menos una serie, el atleta la finaliza antes de que termine su fecha, en su zona horaria?"}
    G -- Sí --> H["completed"]
    G -- No --> X{"¿Tiene al menos una serie registrada al terminar el día?"}
    X -- Sí --> I1["partial, conserva sus registros"]
    X -- No --> I2["skipped"]
    H --> J{"¿Queda alguna sesión planned?"}
    I1 --> J
    I2 --> J
    J -- Sí --> E
    J -- No --> K["Resumen de programa finalizado"]
```

#### Principios de diseño

- **Mobile-first:** pensada para usarse con una mano durante el entrenamiento, con objetivos táctiles grandes y la sesión del día a un toque desde el inicio.
- **Compatibilidad:** navegadores de iOS, Android y escritorio con un diseño adaptable. Más adelante, PWA y Capacitor.
- **Claridad:** en cada momento, una acción principal: ver la sesión de hoy, registrar series o finalizarla.
- **Identidad y navegación [Confirmada]:**
  - estética *Performance / Athletic*, con fondo azul-negro, acentos violetas y tarjetas oscuras con bordes discretos;
  - navegación **Today · Program · Progress · Profile**. *Program* incluye el catálogo, el programa activo y el calendario;
  - interfaz solo en inglés.

  El detalle y los tokens, que son una propuesta, están en `docs/design-system.md`.

### **1.4. Instrucciones de instalación:**
> Documenta de manera precisa las instrucciones para instalar y poner en marcha el proyecto en local (librerías, backend, frontend, servidor, base de datos, migraciones y semillas de datos, etc.)

> **Borrador de DEV-001.** Cubre el arranque local del andamiaje técnico. Las migraciones y las *seeds* se añadirán con DEV-002 y DEV-010, y la versión definitiva de esta sección es de DEV-037.

#### Requisitos previos

| Herramienta | Versión | Uso |
|-------------|---------|-----|
| Node.js | 24 (`.nvmrc`) | Frontend, backend y herramientas. npm 11 viene incluido |
| Docker con Docker Compose v2 | Reciente | PostgreSQL 17 local (`docker-compose.yml`) |
| Git | Cualquiera reciente | — |

No hace falta instalar PostgreSQL en el sistema.

#### Puesta en marcha

```bash
npm install                              # instala los tres workspaces: backend, frontend y e2e
cp backend/.env.example backend/.env     # valores de desarrollo, sin secretos
npm run db:up                            # PostgreSQL 17 en localhost:5432 (espera al healthcheck)
npm run dev                              # backend en :3000 y Vite en :5173
```

Abre `http://localhost:5173`. La vista técnica *System status* llama a `GET /api/health` a través del *proxy* de Vite y muestra el estado del backend y de la base de datos. Para arrancar cada aplicación por separado: `npm run dev -w backend` y `npm run dev -w frontend`. `npm run db:down` detiene PostgreSQL y conserva los datos en el volumen `db-data`.

#### Variables de entorno

| Archivo | Variable | Valor por defecto | Descripción |
|---------|----------|-------------------|-------------|
| `backend/.env` | `NODE_ENV` | `development` | Entorno de ejecución |
| `backend/.env` | `PORT` | `3000` | Puerto del backend |
| `backend/.env` | `DATABASE_URL` | `postgres://calicoach:calicoach@localhost:5432/calicoach` | **Obligatoria.** Sin ella, el backend se niega a arrancar con un mensaje explícito |
| `frontend/.env` (opcional) | `VITE_API_PROXY_TARGET` | `http://localhost:3000` | Destino del *proxy* `/api` de Vite |

Solo se versionan los `.env.example`. Los `.env` están en `.gitignore`. Las credenciales de `docker-compose.yml` y de la CI son de desarrollo y no son secretos.

#### Comprobaciones y pruebas

| Comando | Qué hace | ¿Necesita PostgreSQL? |
|---------|----------|-----------------------|
| `npm run lint` | ESLint en todo el repositorio | No |
| `npm run typecheck` | `tsc` en backend, frontend y e2e | No |
| `npm test` | Unitarias del backend (Vitest + Supertest) y componentes del frontend (Vitest + React Testing Library) | No |
| `npm run test:integration` | Integración del backend contra PostgreSQL real | Sí (`npm run db:up`) |
| `npm run build` | Compila el backend (`backend/dist`) y el frontend (`frontend/dist`) | No |
| `npm run test:e2e` | *Smoke* de Playwright en Chromium. Arranca el backend y Vite si no están en marcha | Sí |

Antes de la primera ejecución E2E hay que descargar el navegador con `npx playwright install chromium`.

#### Limitaciones conocidas

- No hay migraciones, *seeds*, autenticación ni funcionalidades de negocio. La única ruta es `GET /api/health`.
- El backend todavía no sirve el *build* de la SPA, ni tiene `helmet`, CSRF, `X-Request-Id` ni el manejador de errores global. Todo eso es de DEV-003.
- La vista de diagnóstico es técnica, en inglés y sin i18n ni *tokens* de diseño (DEV-038 y DEV-039 la migrarán o retirarán).
- `npm run dev` lanza los dos procesos con la shell (`&`), así que está pensado para Linux y macOS. En Windows, arranca cada aplicación por separado.
- No hay despliegue (DEV-036).

---

## 2. Arquitectura del Sistema

> **Estado de esta sección:** describe la **arquitectura propuesta para el MVP**. Solo existe el andamiaje técnico de DEV-001 (estructura, entorno local, CI y `GET /api/health`; ver 2.3, 2.4 y 2.6). Ningún componente de negocio está implementado ni probado. Las etiquetas indican el origen de cada decisión:
> - **[Confirmada]:** decisión del equipo o del Product Owner.
> - **[Propuesta]:** recomendación técnica pendiente de validar al implementar.
> - **[Pendiente]:** necesita una decisión de producto.

### **2.1. Diagrama de arquitectura:**
> Usa el formato que consideres más adecuado para representar los componentes principales de la aplicación y las tecnologías utilizadas. Explica si sigue algún patrón predefinido, justifica por qué se ha elegido esta arquitectura, y destaca los beneficios principales que aportan al proyecto y justifican su uso, así como sacrificios o déficits que implica.

#### Decisiones de arquitectura

| Decisión | Estado |
|----------|--------|
| SPA con React + TypeScript + Vite | [Confirmada] |
| API REST con JSON en Node.js + Express + TypeScript | [Confirmada] |
| PostgreSQL como única base de datos | [Confirmada] |
| **Monolito modular** en el backend: un proceso y una base de datos, con módulos por dominio y capas (controlador → servicio → repositorio) | [Confirmada] |
| Herramientas de prueba: Vitest, Supertest, React Testing Library y Playwright | [Confirmada] |
| Reglas de planificación (RP1–RP6), secuencias A/B, cierre según la zona horaria del usuario y estados `planned` / `completed` / `partial` / `skipped` (los tres últimos, finales) | [Confirmada] |
| Primera sesión: el siguiente día elegido posterior a la activación; el día de activación queda excluido (DP-01) | [Confirmada] |
| Un solo programa activo por usuario, garantizado en el backend (DP-07) | [Confirmada] |
| Lógica de dominio (planificación y cierre de sesiones) en **funciones puras** con un reloj inyectable | [Propuesta] |
| Cierre automático mediante **reconciliación bajo demanda**, con una tarea programada opcional que reutiliza la misma operación | [Propuesta] |
| Concurrencia: `READ COMMITTED` con **bloqueo de la fila de la sesión** (`FOR UPDATE`) en toda escritura sobre una sesión o sus registros. Orden fijo de bloqueos: sesiones por `id` ascendente → inscripción | [Propuesta] |
| Autenticación: JWT en cookie `__Host-` (`httpOnly`, `Secure`, `SameSite=Lax`), con protección CSRF mediante comprobación de `Origin` y una cabecera personalizada obligatoria | [Propuesta] |
| Calendario **materializado**: todas las sesiones se insertan al activar el programa | [Propuesta] |
| El backend sirve también el *build* de la SPA, con un mismo origen | [Propuesta] |
| Acceso a datos con Prisma (migraciones y *seeds*) y SQL directo para la operación de cierre | [Propuesta] |
| Interfaz solo en inglés (`en`), preparada para otros idiomas y sin selector de idioma. El contenido persistido no se traduce en el MVP | [Confirmada] |
| Internacionalización con `i18next` y `react-i18next`, y formatos con `Intl` (DEV-038) | [Propuesta] |
| Identidad visual *Performance / Athletic* y navegación Today · Program · Progress · Profile (`docs/design-system.md`) | [Confirmada]. Los valores de los tokens son una [Propuesta] |

#### Diagrama de componentes

```mermaid
flowchart LR
    subgraph Cliente["Navegador · iOS / Android / escritorio"]
        SPA["SPA React + TS + Vite<br/>features: auth, perfil, programas,<br/>calendario, sesión, progreso"]
    end

    subgraph API["Backend Node.js + Express + TS · monolito modular"]
        MW["Middleware<br/>helmet · rate limit · auth · validación · errores"]
        subgraph Mod["Módulos de dominio"]
            AUTH[auth]
            PROF["profile<br/>disponibilidad + zona horaria"]
            PROG["programs<br/>catálogo de solo lectura"]
            ENR["enrollments<br/>activación + calendario"]
            SES["sessions<br/>registros, finalizar, cerrar"]
            PRG["progress<br/>métricas"]
        end
        DOM["domain<br/>scheduler · sessionLifecycle · clock<br/>funciones puras"]
        REPO["Repositorios<br/>Prisma / SQL"]
        JOB["Tarea programada opcional<br/>reconcileAll"]
    end

    DB[("PostgreSQL")]

    SPA -- "HTTPS · REST/JSON · cookie httpOnly" --> MW
    MW --> AUTH & PROF & PROG & ENR & SES & PRG
    ENR --> DOM
    SES --> DOM
    PRG --> SES
    AUTH & PROF & PROG & ENR & SES & PRG --> REPO
    JOB -.-> SES
    REPO --> DB
```

#### Patrón y justificación

- **Monolito modular por capas.** Cada módulo de dominio (`auth`, `profile`, `programs`, `enrollments`, `sessions`, `progress`) agrupa sus rutas, controlador, servicio y repositorio. Los módulos solo se comunican a través de sus servicios y nunca acceden a los repositorios de otro módulo.
- **Núcleo de dominio puro.** Las dos piezas con más reglas de negocio no dependen de Express ni de la base de datos:
  - generar el calendario (`scheduler`);
  - decidir el estado de cierre de una sesión (`sessionLifecycle`).

  Reciben la fecha actual como parámetro, lo que permite probarlas con tests unitarios deterministas.

**Beneficios**
- Un solo despliegue, una sola base de datos y transacciones ACID. Son suficientes para un MVP de unas 30 horas.
- Las reglas críticas (CE2, CE3) se prueban de forma aislada y rápida.
- Los límites entre módulos facilitan añadir más adelante el módulo de recomendaciones con IA sin reescribir el resto.

**Sacrificios y déficits**
- Escala solo verticalmente o replicando el proceso completo. Es aceptable para el volumen previsto.
- Con reconciliación bajo demanda, el estado de una sesión vencida no se actualiza en la base de datos hasta que alguien la consulta (ver 2.2). Para el MVP no importa, porque todas las lecturas pasan antes por la reconciliación.
- La disciplina entre módulos depende de convenciones y revisión de código, no de fronteras físicas.

#### Riesgos técnicos

| Riesgo | Impacto | Mitigación propuesta |
|--------|---------|----------------------|
| Carrera a medianoche: el atleta registra una serie mientras se cierra la sesión | Una serie queda en una sesión ya cerrada, o una sesión con actividad se cierra como `skipped` | Protocolo de bloqueo común a registro, finalización y cierre, con el cierre en dos sentencias (ver "Protocolo de concurrencia" en 2.2). No basta con una sola sentencia `UPDATE … EXISTS`. |
| El protocolo depende del nivel de aislamiento | Con otro nivel distinto de `READ COMMITTED`, el cierre podría fallar o clasificar mal | Fijar `READ COMMITTED` explícitamente en las transacciones de sesiones y cubrirlo con pruebas de concurrencia sobre PostgreSQL real (2.6). |
| *Deadlocks* o esperas largas por bloqueo | Peticiones abortadas (`40P01`, `55P03`) | Orden de bloqueos documentado, `lock_timeout` y reintento acotado de la transacción completa. Se reduce el riesgo, pero **no se garantiza que no haya *deadlocks***: el orden efectivo debe verificarse (2.2 y 2.6). |
| El dominio de la plataforma PaaS no figura en la *Public Suffix List* | Otras aplicaciones del mismo dominio padre serían *same-site*, y `SameSite=Lax` dejaría de proteger | La comprobación de `Origin` y de la cabecera personalizada no depende de `SameSite`. Usar un dominio propio o comprobar la lista (ver 2.5). |
| Errores de zona horaria o de cambio de horario (DST) | Sesiones cerradas un día antes o después | Guardar la fecha de cada sesión como `DATE` local, sin hora. Calcular "hoy" con la zona IANA del usuario y probar zonas extremas y cambios de horario. |
| El usuario cambia de zona horaria con un programa activo | Una sesión puede cerrarse antes o después de lo esperado | Riesgo aceptado en el MVP, documentado como pendiente. Las fechas planificadas no se recalculan. |
| El contenido de las variantes A/B y de los programas aún no está definido | Bloquea los datos semilla reales | *Seeds* con contenido provisional marcado como tal, sustituible sin cambiar código. |
| La autenticación por cookie no sirve tal cual en Capacitor | Retrabajo en la fase de app nativa | Aislar el transporte del token en el middleware `auth` y en el cliente HTTP. Fuera del MVP. |
| Alcance de unas 30 horas | No llegar a cerrar el MVP | Seis módulos pequeños, sin colas ni microservicios. La tarea programada es opcional. |

#### Decisiones del Product Owner que afectan a la arquitectura

Todas están **[Confirmada]** (registro DP-01 a DP-17 en 1.2). La tercera columna describe cómo se aplican [Propuesta].

| Tema | Por qué afecta | Decisión y aplicación |
|------|----------------|-------------------------------------|
| Primera sesión del programa (DP-01) | Cambia la fecha inicial del `scheduler`. | **[Confirmada]** El día de activación queda excluido: el `scheduler` empieza a buscar el día siguiente a `today` en la zona del perfil (`includeActivationDay = false`, fijo). |
| Cambio de días con un programa activo (DP-06) | La disponibilidad y la inscripción en curso deben ser coherentes. | **[Confirmada]** Prohibido mientras haya una inscripción activa: el backend responde `409 AVAILABILITY_LOCKED` después de reconciliar. La copia de `weekdays` en la inscripción se mantiene. La zona horaria no queda bloqueada. Ver "Carreras en la activación" en 2.2. |
| Abandonar un programa activo (DP-14) | Sin esta opción, el atleta no puede cambiar de programa hasta terminar el actual. | **[Confirmada]** Fuera del MVP: sin endpoint ni estado nuevo. El programa termina con el cierre ya definido (RP6). |
| Finalizar sin registros (DP-09) | Afecta a la validación de "finalizar" y a las métricas. | **[Confirmada]** No se permite: T-finalizar exige al menos una serie, comprobada con la sesión bloqueada (`409 NO_SETS_LOGGED`). |
| Registro o finalización fuera de la fecha (DP-08) | Afecta a la validación y a la carrera de medianoche. | **[Confirmada]** Solo en la fecha programada, en la zona del perfil, y en estado `planned`. Una sesión `partial` no puede pasar después a `completed`. |
| Adherencia y peso de `partial` (DP-12, DP-13) | Afecta a las métricas. | **[Confirmada]** `100 × (completed + 0,5 × partial) / (completed + partial + skipped)`, con los estados reconciliados. Sin sesiones evaluables, `null`. Los recuentos se siguen mostrando por separado. |
| Número de programas (DP-02) y días compatibles con cada uno | Afecta a la validación al activar. | **[Confirmada]** 3 programas de 6 semanas (DP-04). Qué N admite cada uno depende de su contenido, que aún no está definido (1.2). Al activar se comprueba que el programa tiene plantilla para cada hueco de la secuencia de N días; si falta alguna, `422`. |
| Criterio de atleta "intermedio" (DP-03) | Ninguno técnico en el MVP. | **[Confirmada]** Criterios orientativos y descriptivos del programa, sin evaluación ni bloqueo del acceso. |
| Duración de la sesión de autenticación (DP-15) | Afecta a la experiencia en el móvil y a la seguridad. | **[Confirmada]** 7 días de caducidad absoluta, sin renovación (ver 2.5). |

#### Coherencia con la sección 1

La sección 1 ya está alineada con el modelo de cuatro estados de esta sección: CE3, CE4, F5–F9, RP5, RP6, la tabla "Estados de una sesión", los pasos 5 y 6 del flujo principal y su diagrama. Estos dos puntos estaban abiertos cuando se redactó esta sección; ninguno es ya una decisión pendiente:

| Punto | Situación |
|-------|-----------|
| Un solo programa activo por usuario (F4) | **Confirmado** (DP-07) en las dos secciones. |
| Contenido del "perfil deportivo" | La sección 1 no lo define más allá de la disponibilidad (F2). La sección 3 no añade más datos: el MVP solo modela disponibilidad y zona horaria [Propuesta] (`users`, 3.2). |

### **2.2. Descripción de componentes principales:**

> Describe los componentes más importantes, incluyendo la tecnología utilizada

#### Responsabilidades por capa

| Capa | Tecnología | Responsabilidad | No debe |
|------|------------|-----------------|---------|
| **Frontend (SPA)** | React, TypeScript, Vite, React Router. [Propuesta] TanStack Query para el estado del servidor. | Pantallas *mobile-first* desde 320 px, formularios y presentación de estados y métricas. Llama a la API y la vuelve a consultar después de cada cambio. | Decidir estados de sesión ni calcular fechas del calendario: la fuente de verdad es el backend. |
| **Rutas y controladores** | Express. [Propuesta] Zod para validar. | Validar la entrada (cuerpo, parámetros), obtener el `userId` de la sesión autenticada, llamar al servicio y traducir el resultado o el error a HTTP. | Contener reglas de negocio ni SQL. |
| **Servicios** | TypeScript | Orquestar los casos de uso, aplicar reglas y permisos, definir los límites de las transacciones y llamar al dominio puro. | Depender de `req` o `res`. |
| **Dominio puro** | TypeScript sin dependencias | `scheduler.generate(...)`, `sessionLifecycle.resolveClosure(...)`, `WEEKLY_SEQUENCES`, interfaz `Clock`. | Hacer operaciones de entrada/salida. |
| **Repositorios** | [Propuesta] Prisma más SQL directo donde convenga | Hacer las consultas, filtrando **siempre** por el propietario (`user_id`), y ejecutar operaciones atómicas como el cierre. | Decidir reglas de negocio. |
| **PostgreSQL** | PostgreSQL | Persistencia y restricciones de integridad como red de seguridad: claves foráneas, `CHECK` de estados, índice único parcial "un programa activo por usuario", unicidad `(inscripción, orden de la sesión)`. | — |

El modelo de datos detallado se documentará en la sección 3.

#### Módulos del backend

| Módulo | Responsabilidad |
|--------|-----------------|
| `auth` | Registro, inicio y cierre de sesión. Contraseñas con *hash*. Emite y verifica el token. |
| `profile` | Perfil deportivo, días disponibles (2 a 6 días distintos de la semana) y zona horaria IANA. [Propuesta] Se toma del navegador (`Intl.DateTimeFormat().resolvedOptions().timeZone`) y el usuario puede editarla. |
| `programs` | Catálogo de solo lectura: programas, plantillas de sesión por hueco (`PUSH_A`, `PULL_B`, …) y prescripción de ejercicios. Se carga con *seeds*. |
| `enrollments` | Activa un programa, genera y guarda el calendario y detecta cuándo termina el programa. |
| `sessions` | Sesión del día y calendario. Registro de series y repeticiones. Finalización. Cierre automático (reconciliación). |
| `progress` | Métricas: semana actual de N, recuentos `completed` / `partial` / `skipped`, adherencia y desempeño por ejercicio. |

#### Ciclo de vida de una sesión

```mermaid
stateDiagram-v2
    [*] --> planned: activación del programa
    planned --> completed: el atleta la finaliza el día programado
    planned --> partial: cierre del día con ≥1 registro
    planned --> skipped: cierre del día sin registros
    completed --> [*]
    partial --> [*]
    skipped --> [*]
```

**Reglas de estado [Confirmada]:**
- Hay exactamente cuatro estados: `planned`, `completed`, `partial` y `skipped`.
- **Registrar series no completa la sesión.** Solo la acción explícita "finalizar" la pasa a `completed`. El atleta puede registrar series sin finalizarla.
- Al cerrar el día (en la zona horaria del usuario), una sesión `planned` **con** actividad pasa a `partial` y una **sin** actividad pasa a `skipped`. **`partial` y `skipped` son resultados distintos del cierre** y se cuentan por separado en las métricas.
- **Una sesión `partial` conserva todos sus registros**: el cierre no borra ni modifica ningún registro.
- Una sesión `completed` no cambia nunca automáticamente.
- **`completed`, `partial` y `skipped` son estados finales en el MVP**: ninguna transición sale de ellos.
- **Las sesiones posteriores conservan su fecha:** ni el cierre ni la finalización reprograman ni desplazan otras sesiones.

**Transiciones permitidas [Propuesta]**

| Desde | Hasta | Quién la provoca | Condiciones, comprobadas con la fila bloqueada |
|-------|-------|------------------|------------------------------------------------|
| `planned` | `completed` | El atleta (`POST /sessions/:id/complete`) | La sesión es suya, su fecha es hoy en su zona horaria (DP-08) y tiene **al menos una serie registrada** (DP-09). |
| `planned` | `partial` | Cierre (reconciliación) | La fecha ya pasó en la zona del usuario y la sesión tiene al menos un registro. |
| `planned` | `skipped` | Cierre (reconciliación) | La fecha ya pasó en la zona del usuario y la sesión no tiene registros. |
| `completed` / `partial` / `skipped` | — | — | Cualquier escritura (registrar, editar o borrar series, o finalizar) responde `409`. La excepción es finalizar una sesión ya `completed`: tras autorizar al propietario responde `200` sin modificarla, **aunque su fecha ya haya pasado**. |

- **Definición de "actividad" [Propuesta]:** la sesión tiene al menos un registro de serie **en el momento del cierre**, leído con la fila bloqueada. Si el atleta borra todos sus registros antes de que termine el día, la sesión se cierra como `skipped`.

#### Flujo 1: activación del programa y generación del calendario

1. `POST /api/enrollments { programId }`. El controlador valida la entrada y obtiene el `userId`.
2. **Reconciliación previa:** el servicio ejecuta T-cierre (`reconcile(userId, now)`) en **su propia transacción**, que se confirma antes de seguir. Sin este paso, una inscripción cuya última sesión venció ayer seguiría `active` en la base de datos y la activación respondería `409` por error. La reconciliación **no garantiza** que la inscripción anterior termine: solo pasa a `finished` si ya no le queda ninguna sesión `planned`. Si le quedan sesiones de hoy o futuras, sigue `active` y la activación responde `409`.
3. El `EnrollmentService` comprueba:
   - que el perfil tiene entre 2 y 6 días seleccionados y una zona horaria válida;
   - que no hay otra inscripción activa (lectura normal, sin bloqueo);
   - que el programa existe y tiene plantilla para cada hueco de `WEEKLY_SEQUENCES[N]`.

   Si algo falla, responde `409` o `422`.
4. Calcula `today = clock.todayIn(user.timezone)`.
5. Llama a `scheduler.generate({ today, weekdays, weeks, sequence, includeActivationDay })`, una función pura:
   - busca el primer día seleccionado **a partir de mañana**: el día de activación queda excluido aunque sea un día elegido (DP-01). "Mañana" se calcula con la zona horaria del perfil, y no se espera al lunes;
   - recorre el calendario día a día y asigna a cada día seleccionado la siguiente sesión de la secuencia, hasta generar `N × semanas` sesiones;
   - para cada sesión `i` (empezando en 0), calcula `weekNumber = floor(i / N) + 1` y el hueco `sequence[i mod N]`.
6. En **una sola transacción** (T-activación), que empieza bloqueando la fila del usuario (`SELECT … FROM users WHERE id = $user FOR UPDATE`) y vuelve a leer sus días con ese bloqueo, inserta la inscripción (con una copia de los días elegidos y del programa) y todas las sesiones en estado `planned`, cada una con su fecha local (`DATE`). Si el índice único parcial detecta otra inscripción activa, revierte la transacción y responde `409` sin reintentar.
7. Responde `201` con el resumen del calendario. La SPA vuelve a consultar el calendario y la sesión del día.

**Carreras en la activación [Propuesta].** La comprobación del paso 3 es una lectura sin bloqueo, así que puede quedarse obsoleta antes del paso 6. La garantía de "como mucho una inscripción `active`" la da el **índice único parcial**, no la comprobación previa ni la reconciliación:

| Carrera | Qué ocurre | Resultado |
|---------|------------|-----------|
| Dos activaciones simultáneas del mismo usuario | Las dos pasan el paso 3. En el paso 6, la segunda inserción espera en el índice único a que la primera confirme y recibe `23505`. | Una `201` y otra `409`. Nunca dos inscripciones `active`. |
| Activación mientras T-finalizar o T-cierre pasa a `finished` la inscripción anterior | Si el paso 3 aún ve la anterior `active`, la activación responde `409`. Si la ve ya `finished`, continúa: la inserción espera, si hace falta, a que la transacción que actualiza la fila anterior confirme. Si confirma, ya no hay conflicto; si se revierte, `23505`. Esta espera en el índice debe comprobarse con PostgreSQL real (API-40 en la sección 4). | `409` o `201`, nunca dos `active`. Tras un `409`, el cliente vuelve a leer la inscripción activa antes de reintentar (sección 4). |
| Reconciliación de otra petición del mismo usuario durante la activación | Bloquea las sesiones y las inscripciones existentes (2.2). La inscripción nueva aún no está confirmada y no es visible, así que no la bloquea ni la modifica. | Sin interferencia. El orden de bloqueos no cambia, porque T-activación solo inserta filas nuevas. |
| Cambio de días (`PATCH /api/profile`) durante la activación (DP-06) | Las dos operaciones bloquean la fila de `users` (`FOR UPDATE`) [Propuesta]. Si el cambio de días va primero, la activación espera y usa los días nuevos. Si la activación va primero, el cambio espera y, ya con el bloqueo, ve la inscripción activa. | El calendario usa siempre los días que hay en `users` cuando se activa. Un cambio de días nunca se confirma con una inscripción activa (`409 AVAILABILITY_LOCKED`). |

La reconciliación del paso 2 reduce los `409` injustificados, pero entre el paso 2 y el paso 6 no se mantiene ningún bloqueo. Por eso un `409` puede deberse a una carrera momentánea, y el cliente debe tratarlo como "vuelve a consultar" y no como un error definitivo.

#### Flujo 2: registro de series, finalización y cierre

Las tres operaciones siguen el **protocolo de concurrencia** descrito más abajo.

- **Registrar, editar o borrar una serie:** `POST/PATCH/DELETE /sessions/:id/sets…`, transacción **T-registro**. Solo se acepta si la sesión es del usuario (si no, `404`), está `planned` y su fecha es hoy en su zona horaria (si no, `409`). **No cambia el estado de la sesión.**
- **Finalizar:** `POST /api/sessions/:id/complete`, transacción **T-finalizar**. Es la **única** transición a `completed`. Primero autoriza al propietario (si no, `404`) y después decide según el estado leído con la fila bloqueada:
  - `completed`: responde `200` sin modificar nada, **aunque su fecha ya haya pasado**. Es idempotente;
  - `partial` o `skipped`: `409`. Nunca pueden finalizarse después;
  - `planned`: exige que su fecha sea hoy en la zona del usuario (si no, `409`) y que tenga **al menos una serie registrada** (si no, `409 NO_SETS_LOGGED`; DP-09). Después cambia `planned → completed`.
- **Cerrar automáticamente:** transacción **T-cierre**, a través de la reconciliación. Si después de cerrar la inscripción ya no tiene sesiones `planned`, pasa a `finished`.

#### Protocolo de concurrencia [Propuesta]

**Por qué no basta con una sola sentencia.** En `READ COMMITTED`, una sentencia del tipo `UPDATE … SET status = CASE WHEN EXISTS (registros) …` espera si otra transacción tiene bloqueada la fila de la sesión. Pero cuando consigue el bloqueo, la subconsulta `EXISTS` se evalúa con la **foto de datos (*snapshot*) tomada al empezar la sentencia**, que no incluye los registros confirmados mientras esperaba.

Ejemplo:
1. T-registro bloquea la sesión e inserta una serie.
2. Un `UPDATE` de cierre empieza y queda a la espera.
3. T-registro hace `COMMIT`.
4. El `UPDATE` continúa sin ver la serie y cierra la sesión como `skipped`, a pesar de tener actividad.

La clave foránea de `set_logs` tampoco basta. Insertar un registro bloquea la sesión en modo `FOR KEY SHARE`, pero después de esperar la inserción sigue adelante aunque la sesión ya esté cerrada.

**Invariante:** toda escritura sobre una sesión o sobre sus registros se hace **con la fila de esa sesión bloqueada (`FOR UPDATE`) y después de volver a comprobar su estado**. Así, mientras alguien tiene la fila bloqueada, nadie puede añadir ni quitar registros de esa sesión.

**Nivel de aislamiento:** `READ COMMITTED`, el predeterminado de PostgreSQL, fijado explícitamente. El protocolo se apoya en que cada sentencia toma una foto nueva de los datos. Con `REPEATABLE READ` o `SERIALIZABLE`, la espera terminaría en un error de serialización y habría que gestionar reintentos, lo que añade complejidad innecesaria al MVP.

**Orden previsto de adquisición de bloqueos:**
1. Filas de `scheduled_sessions`, en orden de `id` ascendente.
2. Fila de `enrollments`, bloqueada explícitamente (`FOR UPDATE`) antes de comprobar si quedan sesiones `planned`.

Aparte, la fila de `users` (`FOR UPDATE`) solo la bloquean T-activación y el cambio de días del perfil (DP-06). Las dos la bloquean al principio y ninguna bloquea después sesiones existentes, así que no forman un ciclo con las transacciones anteriores [Propuesta].

Las filas de `set_logs` no se bloquean explícitamente: quedan protegidas por el bloqueo de su sesión. Las transacciones del protocolo siguen este orden y ninguna bloquea una sesión después de una inscripción, lo que **reduce** el riesgo de esperas circulares. **No garantiza** que no vaya a haber *deadlocks*, por tres motivos:
- el orden efectivo depende de cómo ejecute PostgreSQL cada consulta;
- otras transacciones fuera del protocolo pueden tocar las mismas filas, como la activación, los cambios de perfil o futuras operaciones sobre inscripciones;
- las claves foráneas toman bloqueos implícitos.

**Puntos que hay que verificar al implementar:**
- **Orden efectivo.** Comprobar con `EXPLAIN` que el `SELECT … ORDER BY s.id FOR UPDATE` bloquea las filas en el orden de `id`, es decir, que el nodo `LockRows` está por encima del `Sort`. Hay que escribirlo en SQL directo, porque un ORM podría generar otra forma de consulta. Comprobarlo también en pruebas (C8 en 2.6).
- **Conflictos con la actualización de inscripciones.** Si T-finalizar (que cierra la última sesión de hoy) y T-cierre (que cierra una sesión vencida) comprueban a la vez si quedan sesiones `planned`, cada una puede ver la sesión de la otra todavía `planned`. Entonces ninguna marcaría la inscripción como `finished`. Para evitarlo, las dos bloquean la fila de la inscripción y comprueban las sesiones `planned` **en una sentencia posterior**, que ya ve lo que confirmó la otra. Además, cada reconciliación revisa todas las inscripciones activas del usuario, no solo las que acaba de tocar, así que una omisión se corregiría sola en la siguiente lectura. Las claves foráneas `scheduled_sessions → enrollments` y `set_logs → scheduled_sessions` toman bloqueos `FOR KEY SHARE`, que no entran en conflicto con actualizar columnas que no son clave (`status`). Aun así, debe comprobarse con PostgreSQL real.
- **Otras transacciones que tocan las mismas filas.** La activación (T-activación) inserta filas nuevas y no bloquea sesiones. Su única espera posible es la del índice único parcial, que se da en dos casos: otra activación simultánea (`23505` → `409`), o una T-finalizar o T-cierre que está pasando a `finished` la inscripción anterior (espera a que confirme; ver "Carreras en la activación"). Los cambios de zona horaria en `users` no bloquean sesiones. El cambio de días bloquea solo la fila de `users` (DP-06). T-cierre lee la zona horaria sin bloquearla; el riesgo ya está aceptado en 2.1.
- **Tratamiento de errores de bloqueo.** Cada transacción ejecuta `SET LOCAL lock_timeout = '5s'`.
  - Ante `40P01` (*deadlock* detectado) o `55P03` (tiempo de espera agotado), PostgreSQL anula la transacción entera, y se **reintenta la transacción completa** hasta 2 veces con una espera corta y aleatoria. Es seguro porque, al anularse, no queda nada guardado.
  - Si sigue fallando, la respuesta es `503`, sin servir datos a medio reconciliar, y se registra el error con el código SQLSTATE.
  - `23505` en la activación responde `409` y no se reintenta.
  - Si la conexión se pierde durante el `COMMIT` y no se sabe si se guardó, T-registro **no** se reintenta automáticamente, para no duplicar series. La SPA vuelve a consultar la sesión antes de decidir si reintenta, según la política de reintentos de la sección 4.

| Transacción | Pasos (cada uno es una sentencia) |
|-------------|-----------------------------------|
| **T-registro** | 1. `BEGIN` · 2. `SELECT … FROM scheduled_sessions s JOIN enrollments e … WHERE s.id = $id AND e.user_id = $user FOR UPDATE OF s` · 3. Tomar `now` del `Clock` **ya con el bloqueo**; si no existe → `404`, si no está `planned` o su fecha no es hoy en la zona del usuario → `409` · 4. `INSERT`, `UPDATE` o `DELETE` en `set_logs` · 5. `COMMIT` |
| **T-finalizar** | 1–2 igual que en T-registro · 3. Tomar `now` del `Clock` **ya con el bloqueo**. Si no existe → `404`. Si está `completed` → `COMMIT` sin escribir nada y `200`, sin comprobar la fecha. Si está `partial` o `skipped` → `409`. Si está `planned` y su fecha no es hoy en la zona del usuario → `409`. Si no existe ninguna serie (`NOT EXISTS (SELECT 1 FROM set_logs WHERE session_id = $id)`, ya con la sesión bloqueada) → `409 NO_SETS_LOGGED` (DP-09) · 4. `UPDATE scheduled_sessions SET status = 'completed', completed_at = $now WHERE id = $id AND status = 'planned'` · 5. `SELECT … FROM enrollments WHERE id = $enrollment FOR UPDATE` · 6. En otra sentencia, `UPDATE enrollments SET status = 'finished' WHERE id = $enrollment AND status = 'active' AND NOT EXISTS (sesiones planned)` · 7. `COMMIT` |
| **T-cierre** | 1. Tomar `now` del `Clock` **antes** de la consulta, porque forma parte del filtro de fechas · 2. `BEGIN` · 3. **Bloquear candidatas**: `SELECT s.id … WHERE e.user_id = $user AND s.status = 'planned' AND s.scheduled_date < ($now AT TIME ZONE u.timezone)::date ORDER BY s.id FOR UPDATE OF s` · 4. **Clasificar con una foto nueva**: `UPDATE scheduled_sessions s SET status = CASE WHEN EXISTS (SELECT 1 FROM set_logs l WHERE l.session_id = s.id) THEN 'partial' ELSE 'skipped' END, closed_at = $now WHERE s.id = ANY($ids) AND s.status = 'planned'` · 5. Bloquear las inscripciones activas del usuario (`FOR UPDATE`, ordenadas por `id`) · 6. En otra sentencia, marcar como `finished` las que no tengan sesiones `planned` · 7. `COMMIT` |

El SQL es ilustrativo; los nombres definitivos se fijarán en la sección 3. `$now` viene del `Clock` inyectado y no de `now()`, para que las pruebas puedan controlar el tiempo. Con varias instancias, todas usarían el reloj del sistema de su servidor; no se esperan desfases relevantes en un MVP con una sola instancia.

**Garantías del protocolo**

| Requisito | Cómo se garantiza |
|-----------|-------------------|
| No se registra una serie en una sesión ya cerrada | T-registro comprueba `status = 'planned'` **después** de bloquear la fila. Si T-cierre la tenía bloqueada, T-registro espera, lee la versión ya cerrada y responde `409`. Además, comprobar que la fecha sea hoy impide registrar en sesiones vencidas aunque la reconciliación aún no se haya ejecutado. |
| Una sesión con actividad no se cierra como `skipped` | El paso 3 de T-cierre (bloquear candidatas) solo termina cuando no queda ninguna T-registro en curso sobre esas sesiones. El paso 4 (clasificar) es otra sentencia, con una foto nueva que ya incluye esos registros confirmados. Mientras T-cierre tiene el bloqueo, nadie puede añadir ni borrar registros. |
| La clasificación `partial` / `skipped` usa información consistente | El estado de la sesión y la existencia de registros se leen dentro de la misma transacción, con la fila bloqueada y sin escrituras concurrentes posibles sobre esa sesión. |
| La reconciliación es idempotente | Tanto el `SELECT` como el `UPDATE` filtran por `status = 'planned'`. Una segunda ejecución, secuencial o simultánea, espera al bloqueo, vuelve a evaluar el filtro sobre la versión actual de la fila (que ya no es `planned`) y no modifica nada. `closed_at` se escribe una sola vez. |
| Una sesión `completed` nunca cambia | Ningún paso de T-cierre la selecciona, y T-finalizar y T-cierre se excluyen mutuamente por el bloqueo de la fila. |
| La inscripción pasa a `finished` cuando no quedan sesiones `planned` | Se bloquea la fila de la inscripción y la comprobación se hace en una sentencia posterior. La reconciliación revisa todas las inscripciones activas del usuario, lo que corrige cualquier omisión en la siguiente lectura. |
| *Deadlocks* y esperas | **No se garantiza que no haya *deadlocks*.** El orden de bloqueos los hace improbables, y `lock_timeout` más el reintento acotado los convierten en un error recuperable (ver "Puntos que hay que verificar"). Reintentar T-cierre es seguro porque es idempotente; reintentar T-registro y T-finalizar es seguro porque la transacción anulada no deja nada guardado. |

- **Tamaño de las transacciones:** la tarea programada opcional ejecuta T-cierre **por usuario**, en transacciones cortas, en lugar de una única transacción para todos.
- **Refuerzo opcional:** un *trigger* en `set_logs` que bloquee la sesión y rechace escrituras si no está `planned`. Haría cumplir la invariante aunque algún camino de código la olvidara. No es necesario para el MVP.
- **Verificabilidad:** el "ahora" se inyecta (`Clock`). La regla `partial` / `skipped` está también en `sessionLifecycle.resolveClosure`, probada por unidad, y el protocolo se prueba con PostgreSQL real (ver 2.6).

#### Estrategia de cierre automático

| Opción | Cómo funciona | Ventajas | Inconvenientes | Uso en el MVP |
|--------|---------------|----------|----------------|---------------|
| **Reconciliación bajo demanda** | Al principio de cada lectura del usuario (sesión de hoy, calendario, progreso), el servicio ejecuta T-cierre (`reconcile(userId, now)`) antes de leer. Aunque la lectura sea un `GET`, esta escritura es segura: es idempotente y solo aplica cambios que se producirían de todos modos con el paso del tiempo. | No necesita infraestructura. El usuario siempre ve el estado correcto. Es fácil de probar. | Las sesiones de quien no abre la app quedan `planned` en la base de datos hasta su siguiente visita. Hay una sentencia extra por lectura, barata gracias al índice. | **Mecanismo principal [Propuesta]** |
| **Tarea programada** | `node-cron` dentro del mismo proceso ejecuta cada hora `reconcile(all, now)`. Al ser cada hora, cubre la medianoche de todas las zonas horarias. | El estado guardado está al día aunque el usuario no entre, lo que sirve para métricas globales futuras. | Si el proceso se reinicia o hay varias instancias, puede saltarse o duplicar ejecuciones; la idempotencia neutraliza los duplicados. | **Opcional**: complemento, no requisito |

Las dos opciones llaman a la misma operación, así que la corrección del sistema no depende de la tarea programada.

#### Reconciliación en peticiones `GET` [Propuesta: compromiso aceptado para el MVP]

**El problema.** Con la reconciliación bajo demanda, algunos `GET` (sesión de hoy, detalle de una sesión, calendario, inscripciones y progreso) **escriben** en la base de datos antes de leer: `status`, `closed_at` y, en su caso, `enrollments.status`. Hay que distinguir dos propiedades:

| Propiedad | ¿La cumple la reconciliación? |
|-----------|-------------------------------|
| **Idempotencia interna** de la operación: ejecutarla una o varias veces deja el mismo estado | **Sí** (2.2, "Garantías del protocolo"). |
| **Método seguro** en HTTP (RFC 9110): el cliente no pide ni espera ningún cambio de estado con un `GET`. La norma no prohíbe efectos secundarios en el servidor, pero el cliente no es responsable de ellos | **En parte.** El cliente no pide el cambio, y el cambio no depende de la petición, sino del paso del tiempo: se habría producido igual con la tarea programada o con cualquier otra petición. Pero sí es una **escritura persistente** dentro de un `GET`, con bloqueos. |

**Por qué se acepta en el MVP**
- El **estado observable** a través de la API no depende de si una petición concreta escribió o no. Todas las lecturas de datos del usuario reconcilian antes de leer, así que dos clientes que lean en el mismo instante ven el mismo resultado, la haya materializado quien la haya materializado.
- La escritura es una función determinista del reloj y de los datos ya guardados. No usa ningún parámetro de la petición: no hay cuerpo, y la *query* solo filtra la lectura posterior.
- Los efectos de los `GET` que aprovechan los navegadores y los intermediarios siguen siendo inocuos:
  - **Reintentos automáticos:** la operación es idempotente.
  - **Precarga (*prefetch*):** solo adelanta un cierre que ya correspondía.
  - **`GET` provocado desde otro sitio** (sin CSRF, 2.5): tampoco tiene más efecto que adelantar ese cierre.
  - **Cachés:** las respuestas llevan `Cache-Control: no-store` (sección 4).
- Eliminarla del todo exigiría:
  - o bien **derivar el estado efectivo al leer**: tratar en cada consulta una sesión `planned` con fecha pasada como `partial` o `skipped`, y una inscripción sin sesiones efectivamente `planned` como `finished`, sin cambiar la fila;
  - o bien un **endpoint explícito** o una **tarea programada obligatoria**.

  Las dos cosas son un rediseño de todas las rutas de lectura o un cambio de infraestructura. Quedan como alternativas **[Pendiente]** (ver la tabla siguiente).

**Restricciones que mantienen el compromiso acotado [Propuesta]**
1. Un `GET` solo puede ejecutar `reconcile(userId, now)` para el usuario autenticado. Nunca otra escritura, y nunca a partir de datos de la petición.
2. La reconciliación va en **su propia transacción corta**, confirmada antes de la lectura, para que la lectura no mantenga bloqueos.
3. Si la reconciliación falla por bloqueo (`40P01`/`55P03`) tras el reintento acotado, el `GET` responde `503` y no sirve datos a medio reconciliar (2.2). El cliente trata ese `503` como reintentable.
4. `HEAD` se comporta como `GET` (Express lo encamina igual), lo que es aceptable por las mismas razones.
5. La documentación de la API (sección 4) indica explícitamente qué `GET` reconcilian. No es una escritura oculta, sino un efecto documentado.

**Costes que se aceptan:** los `GET` pueden esperar bloqueos (hasta `lock_timeout`) o responder `503`. No se pueden enviar a una réplica de solo lectura. Y cada lectura cuesta una transacción adicional, barata gracias a los índices parciales (3.2).

| Alternativa para no escribir en `GET` | Coste | Estado |
|---------------------------------------|-------|--------|
| Derivar el estado efectivo en cada lectura y persistirlo solo desde operaciones `POST` y la tarea opcional | Repetir la regla de cierre en todas las consultas de lectura. `enrollments.status` y `finished_at` quedarían desfasados respecto a lo que muestra la API. Un registro en curso a medianoche podría verse un instante como `skipped` y después como `partial` | [Pendiente] |
| Endpoint explícito `POST /api/sessions/reconcile`, llamado por la SPA antes de leer | Un endpoint nuevo, y la corrección de las lecturas dependería de que el cliente lo llame | [Pendiente] |
| Tarea programada obligatoria | Infraestructura y el riesgo de ejecuciones perdidas (tabla anterior), además de un desfase de hasta una hora | [Pendiente] |

#### Diagrama de secuencia: cierre de sesiones

```mermaid
sequenceDiagram
    autonumber
    actor A as Atleta
    participant SPA as SPA React
    participant C as SessionsController
    participant S as SessionService
    participant R as SessionRepository
    participant DB as PostgreSQL
    participant W as T-registro concurrente
    participant J as Tarea programada opcional

    Note over W,DB: T-registro previa: BEGIN, SELECT FOR UPDATE de la sesión, INSERT de la serie, aún sin COMMIT
    A->>SPA: Abre "Hoy" o "Progreso"
    SPA->>C: GET /api/sessions/today
    C->>S: getToday(userId)
    S->>S: now = clock.now()
    S->>R: closeExpired(userId, now)
    R->>DB: BEGIN READ COMMITTED
    R->>DB: SELECT sesiones planned con fecha anterior a hoy local ORDER BY id FOR UPDATE
    Note over R,DB: Espera mientras W tenga bloqueada alguna de esas sesiones
    W->>DB: COMMIT, libera el bloqueo
    DB-->>R: ids bloqueados
    R->>DB: UPDATE status partial o skipped WHERE id = ANY(ids) AND status = planned
    Note over R,DB: Sentencia nueva con foto nueva: ve la serie de W, así que la sesión queda partial
    R->>DB: SELECT inscripciones activas del usuario FOR UPDATE
    R->>DB: UPDATE enrollments SET finished si no quedan sesiones planned
    R->>DB: COMMIT
    Note over R,DB: Si aparece 40P01 o 55P03, ROLLBACK y reintento acotado, o 503
    R-->>S: n sesiones cerradas
    S->>R: findToday(userId, todayIn(tz))
    R-->>S: sesión de hoy con registros
    S-->>C: DTO
    C-->>SPA: 200 JSON
    SPA-->>A: Muestra completed, partial y skipped por separado

    Note over J,S: Alternativa: la misma T-cierre, ejecutada usuario por usuario
    J->>S: reconcile(all, now)
    S->>R: closeExpired(userId, now) para cada usuario con sesiones vencidas
```

La regla `partial` / `skipped` está en `sessionLifecycle.resolveClosure` y el repositorio la aplica en bloque con SQL. Los tests de integración comprueban que la sentencia y la función pura coinciden.

### **2.3. Descripción de alto nivel del proyecto y estructura de ficheros**

> Representa la estructura del proyecto y explica brevemente el propósito de las carpetas principales, así como si obedece a algún patrón o arquitectura específica.

[Propuesta] Un único repositorio con dos aplicaciones (`frontend`, `backend`) y pruebas E2E. El frontend se organiza por *features*; el backend, por módulos de dominio y capas.

```text
/
├── frontend/                  # SPA React + TS + Vite
│   └── src/
│       ├── app/               # router, providers, layout mobile-first
│       ├── features/          # auth, profile, programs, calendar, session, progress
│       │   └── <feature>/     # pages, components, hooks, api.ts
│       ├── locales/en/        # catálogos de traducción por funcionalidad (DEV-038)
│       └── shared/            # cliente HTTP, componentes UI, utilidades
├── backend/                   # API Express + TS (monolito modular)
│   ├── src/
│   │   ├── modules/
│   │   │   └── <módulo>/      # *.routes.ts, *.controller.ts, *.service.ts,
│   │   │                      # *.repository.ts, *.schemas.ts, *.test.ts
│   │   ├── domain/            # scheduler, sessionLifecycle, weeklySequences, clock (puro)
│   │   ├── shared/            # config, db, middleware (auth, errores, validación)
│   │   ├── jobs/              # reconcile job (opcional)
│   │   └── app.ts / server.ts # composición de la app / arranque
│   ├── prisma/                # schema, migrations, seed (programas preconfigurados)
│   └── tests/integration/     # Supertest + PostgreSQL de pruebas
├── e2e/                       # Playwright (móvil 320 px y escritorio)
├── docker-compose.yml         # PostgreSQL local
├── docs/                      # design-system.md (sistema de diseño del MVP)
├── readme.md
└── prompts.md
```

- `domain/` no importa nada de Express, Prisma ni `node-cron`, y solo importa de sí mismo.
- Cada módulo expone únicamente su servicio. Los demás módulos no importan sus repositorios.
- Los tests unitarios están junto al código (`*.test.ts`). Los de integración y E2E, en carpetas propias.

**Estado tras DEV-001.** Existe el subconjunto mínimo de esta estructura, sin carpetas vacías: cada ticket creará las suyas.
- **Raíz:** `package.json` con npm *workspaces* (`backend`, `frontend`, `e2e`), `tsconfig.base.json`, `eslint.config.js`, `docker-compose.yml`, `.github/workflows/ci.yml` y `CLAUDE.md`.
- **Backend:** `src/app.ts`, `src/server.ts`, `src/shared/config.ts`, `src/shared/db.ts` (con `pg`; Prisma llega con DEV-002), `src/modules/health/` y `tests/integration/`.
- **Frontend:** `src/app/App.tsx` y `src/features/diagnostics/`.
- **E2E:** `playwright.config.ts` y `tests/`.
- Todavía no existen `domain/`, `jobs/`, `prisma/`, `locales/` ni los módulos de negocio.

### **2.4. Infraestructura y despliegue**

> Detalla la infraestructura del proyecto, incluyendo un diagrama en el formato que creas conveniente, y explica el proceso de despliegue que se sigue

> Todavía no hay despliegue. El entorno local y la CI existen desde DEV-001 (ver 1.4). El resto es una propuesta mínima, alineada con CE6 (aplicación accesible mediante una URL).

```mermaid
flowchart LR
    Dev["Desarrollador"] -- push / PR --> GH["GitHub"]
    GH -- "CI: lint · typecheck · tests" --> CI["GitHub Actions"]
    GH -- "deploy rama main" --> PaaS
    subgraph PaaS["PaaS · un servicio web"]
        N["Node.js<br/>Express API + estáticos de la SPA"]
    end
    U["Navegador"] -- HTTPS --> N
    N --> PG[("PostgreSQL gestionado")]
```

- **Local [Implementado en DEV-001, salvo Prisma]:** PostgreSQL 17 con `docker-compose`, backend (`tsx watch`) y frontend (Vite) con sus servidores de desarrollo; el *proxy* de Vite redirige `/api` al backend. Las migraciones y la *seed* con Prisma llegarán con DEV-002 y DEV-010.
- **Despliegue [Propuesta]:** un único servicio web en una plataforma PaaS, todavía por elegir. Express sirve la API en `/api` y el *build* estático de la SPA, con un mismo origen y sin CORS. La base de datos es un PostgreSQL gestionado. Las migraciones se ejecutan en el paso de *release*, y los secretos se guardan en variables de entorno.
- **CI [Implementado en DEV-001]:** `.github/workflows/ci.yml` ejecuta en cada PR y en cada *push* a `main`: `npm ci`, *lint*, comprobación de tipos, tests unitarios y de componentes, tests de integración contra un PostgreSQL 17 de servicio y *build*. No usa secretos. El *smoke* E2E (Playwright, Chromium) solo se lanza manualmente con `workflow_dispatch`. Primera ejecución en GitHub: en verde en el PR #3, en `workflow_dispatch` (con E2E) y en `main` tras el merge (ver sección 7).
- **Sin** colas, *brokers*, cachés externas ni microservicios. La tarea programada opcional se ejecuta en el mismo proceso.

### **2.5. Seguridad**

> Enumera y describe las prácticas de seguridad principales que se han implementado en el proyecto, añadiendo ejemplos si procede

> Son medidas **previstas** y aún no implementadas.

| Área | Medida [Propuesta] |
|------|--------------------|
| Contraseñas | *Hash* con bcrypt o argon2, longitud mínima y nunca registrarlas en *logs*. |
| Autenticación | JWT en una cookie `__Host-session` (`httpOnly`, `Secure`, `SameSite=Lax`, `Path=/`, sin `Domain`). Caducidad y revocación más abajo. |
| CSRF | Comprobación de `Origin` y cabecera personalizada obligatoria en toda operación que modifica datos (más abajo). |
| Autorización | Restricción por usuario en todas las capas (más abajo). |
| Validación | Esquemas Zod en todas las entradas: días distintos entre 0 y 6 (de 2 a 6 días), zona horaria IANA válida, repeticiones enteras no negativas, etc. |
| Inyección SQL | Solo consultas parametrizadas (Prisma o `$1`), sin concatenar SQL. |
| Fuerza bruta | `express-rate-limit` en el inicio de sesión y el registro. |
| Cabeceras y errores | `helmet` y un manejador de errores central que no expone trazas en producción. |
| Integridad | Restricciones en PostgreSQL (`CHECK`, claves foráneas, índices únicos) como segunda línea de defensa. Transacciones en la activación y, con el protocolo de bloqueo de 2.2, en el registro, la finalización y el cierre. |
| Secretos | Variables de entorno, `.env` en `.gitignore` y un `.env.example` sin valores reales. |
| Datos personales | Se guarda lo mínimo: email, perfil deportivo y registros de entrenamiento. |

#### Sesión y caducidad [Propuesta; la duración está confirmada (DP-15)]

- **Contenido del JWT:** `sub` (id del usuario), `ver` (`token_version`), `iat` y `exp`, sin datos personales. Se firma con HS256 y un secreto de al menos 32 bytes leído de una variable de entorno. Al verificarlo se fija el algoritmo y se rechaza cualquier otro, incluido `none`.
- **Caducidad:** 7 días absolutos, sin renovación deslizante. La cookie tiene el mismo `Max-Age`. Al caducar, hay que volver a iniciar sesión. **La duración y la ausencia de renovación están confirmadas (DP-15).** No se añade ningún mecanismo de renovación automática.
- **Revocación:** en cada petición, el middleware `auth` carga el usuario y compara `ver` con `users.token_version`. **Cerrar sesión** borra la cookie e incrementa `token_version`. **Cambiar la contraseña** también lo incrementa. En el MVP, cerrar sesión desconecta todos los dispositivos; es una simplificación aceptada. Si el usuario no existe o la versión no coincide, la respuesta es `401`.

#### Protección CSRF [Propuesta]

Las cookies viajan solas en cada petición, así que cualquier operación que modifica datos necesita protección CSRF. El middleware `csrf` se aplica a todas las peticiones `POST`, `PUT`, `PATCH` y `DELETE` bajo `/api`, **incluidos registro, inicio y cierre de sesión**. Protegerlos evita también el *login CSRF*, en el que un atacante inicia sesión en el navegador de la víctima con su propia cuenta.

1. **`Origin`:** si llega la cabecera, debe coincidir exactamente con `APP_ORIGIN` (variable de entorno, por ejemplo `https://cali-coach.example`). Si no coincide, o vale `null`, la respuesta es `403`.
2. **Peticiones sin `Origin`:** los navegadores actuales envían `Origin` en toda petición `POST`, `PUT`, `PATCH` o `DELETE`, así que su ausencia se trata como sospechosa:
   - si llega `Sec-Fetch-Site`, debe valer `same-origin`;
   - si no, el origen de `Referer` debe coincidir con `APP_ORIGIN`;
   - si no llega ninguna de las dos cabeceras, la respuesta es `403`.

   Los clientes que no son navegadores (curl, Supertest) deben enviar `Origin` explícitamente. Así no hay excepciones que mantener.
3. **Cabecera personalizada obligatoria:** `X-CSRF-Protection: 1`. Si falta, la respuesta es `403`. Una página de otro origen no puede añadir cabeceras personalizadas sin pasar una comprobación CORS previa (*preflight*), y el servidor **no habilita CORS**, así que esa comprobación falla.
4. **Tipo de contenido:** los cuerpos deben ser `application/json`. Cualquier otro tipo, como formularios o `text/plain`, responde `415`, lo que cierra la vía de los formularios HTML de otros sitios.
5. **`GET` sin efectos para el atacante:** las peticiones `GET` no tienen efectos que un atacante pueda aprovechar. La única escritura que provocan es la reconciliación de 2.2, que es idempotente y solo adelanta lo que ocurriría de todos modos.

`SameSite=Lax` es una capa adicional y no la defensa principal. No protege frente a otros subdominios del mismo sitio, y los navegadores antiguos lo aplican de forma desigual.

#### Autorización por usuario [Propuesta]

- El `userId` sale **solo** del JWT verificado y nunca del cuerpo, la ruta o la *query*.
- Todas las funciones de repositorio que acceden a datos del atleta reciben `userId` como parámetro obligatorio. Las sesiones y sus registros se localizan siempre a través de `enrollments.user_id = $userId`.
- Un recurso de otro usuario o inexistente responde `404`, con el mismo mensaje en ambos casos, para no revelar si existe.
- El catálogo de programas es de solo lectura y requiere estar autenticado. **No hay rol de administrador ni rutas de escritura** del catálogo: el contenido se carga con *seeds* desde la línea de comandos.
- Hay tests de integración específicos para el acceso entre usuarios (2.6).

#### Despliegue bajo un mismo origen [Propuesta]

- Express sirve la API (`/api/*`) y la SPA (`/*`) desde el mismo dominio. **No se instala el middleware `cors`**, así que el navegador bloquea las peticiones de otros orígenes.
- En desarrollo, el *proxy* de Vite mantiene el mismo origen (`/api` → backend), así que las comprobaciones de `Origin` y de la cabecera personalizada funcionan igual que en producción, con `APP_ORIGIN=http://localhost:<puerto>`. **La cookie no es igual:**
  - en desarrollo se llama `session` y no lleva `Secure`, porque el prefijo `__Host-` exige `Secure` y no todos los navegadores aceptan cookies `Secure` en `http://localhost` (WebKit, que se usa en las pruebas E2E, entre ellos);
  - fuera de `NODE_ENV=development` o `test`, el servidor **se niega a arrancar** si la cookie no es `__Host-session` con `Secure` o si `APP_ORIGIN` no es `https`.

  El contrato detallado y las diferencias que deben cubrir las pruebas E2E están en la sección 4.
- **HTTPS obligatorio.** `helmet` añade HSTS y una CSP restrictiva (`default-src 'self'`). Detrás del *proxy* de la plataforma PaaS, se configura `app.set('trust proxy', 1)` para que funcionen las cookies `Secure` y el control de frecuencia por IP.
- El prefijo `__Host-` impide que otro subdominio sobrescriba o fije la cookie (*cookie tossing*).
- Si el dominio por defecto de la plataforma PaaS **no** está en la *Public Suffix List*, otras aplicaciones bajo el mismo dominio padre serían *same-site* y `SameSite=Lax` no protegería. Las comprobaciones de `Origin` y de la cabecera personalizada siguen protegiendo. Se recomienda un dominio propio.
- Capacitor (`capacitor://localhost`) tendrá otro origen. Su autenticación se rediseñará en esa fase y queda fuera del MVP.

### **2.6. Tests**

> Describe brevemente algunos de los tests realizados

> **Estado:** DEV-001 añade las primeras pruebas, solo técnicas (sin reglas de negocio). La tabla de niveles que sigue a los resultados de DEV-001 es la estrategia prevista para el MVP; ninguna de sus pruebas de negocio existe todavía.

**Pruebas de DEV-001 y resultados** (ejecución **local** del 2026-11-22, Node 24.13.0 y PostgreSQL 17 en Docker). **En GitHub Actions** se obtuvieron los mismos resultados en el PR #3 y en `main`, y el *smoke* E2E pasó con `workflow_dispatch` (sección 7):

| Suite | Comando | Qué comprueba | Resultado local |
|-------|---------|---------------|-----------------|
| Backend, unitarias | `npm test` | `GET /api/health`: `200` con la BD disponible; `503 TEMPORARILY_UNAVAILABLE` sin filtrar el error interno; configuración (`DATABASE_URL` obligatoria y `PORT` válido) | 5/5 |
| Frontend, componentes | `npm test` | Vista de diagnóstico: todo correcto, BD caída (`503`), error de red, error del *proxy* sin JSON y reintento | 5/5 |
| Backend, integración | `npm run test:integration` | `200` contra PostgreSQL real y `503` contra un puerto cerrado | 2/2 |
| E2E *smoke* | `npm run test:e2e` | La SPA llega al backend y a PostgreSQL a través del *proxy* de Vite (Chromium) | 1/1, también con `CI=1` |


| Nivel | Herramienta | Qué se prueba | Casos clave |
|-------|-------------|---------------|-------------|
| Unidad: `scheduler` | Vitest | Generación del calendario (CE2) | Tablas con N = 2…6 y varias duraciones: total `N × semanas`, secuencia A/B exacta de cada N, `weekNumber = floor(i/N)+1`, fechas en orden y solo en los días elegidos. Inicio a mitad de semana. Cambios de mes, de año y de horario. Política confirmada DP-01: una activación en un día elegido empieza el siguiente día elegido, nunca el mismo día. Con 6 semanas (DP-04), `N × 6` sesiones. |
| Unidad: `sessionLifecycle` y `clock` | Vitest | Reglas de cierre (CE3) | Una sesión `planned` con registros pasa a `partial`; sin registros, a `skipped`. Una `completed` no cambia. Aplicar el cierre dos veces da lo mismo. Sesión de hoy aún abierta. "Hoy" en zonas extremas (`Pacific/Kiritimati`, `Pacific/Pago_Pago`) alrededor de medianoche. |
| Integración: API + BD | Vitest + Supertest + PostgreSQL de pruebas | Flujos y restricciones | Activación transaccional y `409` si ya hay un programa activo. Registro rechazado fuera del día o con la sesión cerrada (`409`). Registrar series no cambia el estado. `reconcile` idempotente. El usuario B recibe `404` con recursos del usuario A. Finalización idempotente, `409` sobre `partial` o `skipped`, y `409 NO_SETS_LOGGED` sin series (DP-09). Cambio de días con un programa activo → `409 AVAILABILITY_LOCKED` (DP-06). Métricas con `partial` separado y adherencia según DP-13. |
| Integración: seguridad | Vitest + Supertest | CSRF y sesión | Petición que modifica datos sin `Origin` ni `Sec-Fetch-Site` ni `Referer` → `403`. Con `Origin` ajeno o `null` → `403`. Sin `X-CSRF-Protection` → `403`. `Content-Type` distinto de JSON → `415`. JWT caducado, con algoritmo distinto o con `token_version` antiguo (tras cerrar sesión) → `401`. |
| Concurrencia | Vitest + `pg`, dos conexiones a PostgreSQL real | Protocolo de 2.2 | Escenarios C1–C8 (más abajo). |
| Componentes | React Testing Library | UI de la sesión y del progreso | Registrar y editar series. Mostrar `completed`, `partial` y `skipped` de forma distinta. No permitir acciones sobre sesiones cerradas. |
| E2E | Playwright | Flujo principal (CE1, CE5) | Registro → disponibilidad → activación → registro de series → finalizar → progreso, con *viewport* de 320 px y de escritorio, en los motores Chromium y WebKit. WebKit en Playwright **no** sustituye a una prueba manual en Safari real de iOS. Dos perfiles: **desarrollo**, con el *proxy* de Vite y la cookie `session`, y **similar a producción**, con el *build* servido por Express sobre HTTPS y la cookie `__Host-session` (ver sección 4). |

**Control del tiempo [Propuesta]:**
- Los servicios reciben un `Clock` inyectado.
- En las pruebas unitarias y de integración se usa un reloj fijo.
- En E2E, el *frontend* usa la API de reloj de Playwright y el backend un reloj configurable **solo** cuando `NODE_ENV=test`. Ese reloj configurable no puede activarse en producción.

#### Pruebas de concurrencia propuestas

> Están pensadas para implementarse más adelante contra un **PostgreSQL real** (contenedor de pruebas), nunca contra *mocks*. Todavía no existen.

**Montaje:**
- Dos conexiones independientes (`pg.Client` A y B) y relojes fijos por transacción: `now` de registro = día D a las 23:59:59 y `now` de cierre = día D+1 a las 00:00:01, ambos en la zona horaria del usuario.
- Para comprobar que una transacción está **bloqueada esperando**, en vez de usar esperas fijas (`sleep`) se consulta `pg_stat_activity` hasta ver la conexión con `wait_event_type = 'Lock'`. Así la prueba es determinista.
- Las transacciones se controlan paso a paso con *hooks* de prueba en el repositorio, por ejemplo una pausa antes del `COMMIT`.

| ID | Escenario | Resultado esperado |
|----|-----------|--------------------|
| C1 | A (T-registro) bloquea la sesión e inserta una serie sin confirmar. B (T-cierre) empieza. Se comprueba que B está bloqueada. A hace `COMMIT`. | B termina. La sesión queda **`partial`** y la serie se conserva. Es la regresión del fallo de la sentencia única `UPDATE … EXISTS`. |
| C2 | B (T-cierre) bloquea la sesión sin confirmar. A (T-registro) empieza. Se comprueba que A está bloqueada. B hace `COMMIT`. | A recibe `409`. La sesión queda **`skipped`** y no tiene registros. |
| C3 | Dos T-cierre simultáneas sobre el mismo usuario, con varias sesiones vencidas. | Estado final idéntico al de una sola ejecución. La segunda actualiza 0 filas y `closed_at` no cambia. No se espera ningún *deadlock*. Si apareciera `40P01`, el reintento debe llevar al mismo estado final, y se registra como hallazgo que hay que analizar. |
| C4 | T-finalizar (A) y T-cierre (B) sobre la misma sesión S, con fecha D y al menos una serie registrada (DP-09), alrededor de la medianoche de D en la zona del usuario. | Ver el desglose de C4 más abajo. |
| C5 | A (T-registro) borra el único registro de la sesión justo antes de medianoche, mientras B (T-cierre) espera. | La sesión queda `skipped`, coherente con la definición de actividad en el momento del cierre. |
| C6 | Prueba de carga: N peticiones de registro en paralelo y K ejecuciones de reconciliación con relojes alrededor de medianoche, repetidas M veces. | Se cumplen las invariantes (más abajo). Los errores `40P01` y `55P03`, si aparecen, se cuentan y se resuelven con el reintento acotado, sin que se incumpla ninguna invariante. |
| C7 | Conflicto en la inscripción: A (T-finalizar) finaliza la última sesión de hoy mientras B (T-cierre) cierra la penúltima sesión vencida de la misma inscripción. | Al terminar las dos, la inscripción está `finished` (la ve la segunda en bloquearla). Sin el bloqueo de la inscripción, la prueba debe fallar, lo que demuestra que detecta el problema. |
| C8 | Orden efectivo de bloqueos: dos T-cierre sobre un usuario con sesiones S1 < S2 < S3, con S2 bloqueada previamente por una T-registro. | Con la extensión `pgrowlocks`, o comprobando qué filas espera cada conexión, se verifica que T-cierre bloquea S1 y espera en S2 sin haber tomado S3. El plan de ejecución (`EXPLAIN`) muestra `LockRows` sobre `Sort`. |

**Desglose de C4.** Instantes clave de cada transacción:

| Paso | A: T-finalizar | B: T-cierre |
|------|----------------|-------------|
| Toma del reloj | **Después** de obtener el bloqueo de S: `now_A` | **Antes** del `SELECT … FOR UPDATE`, porque forma parte del filtro de fechas: `now_B` |
| Obtención del bloqueo | `SELECT … FOR UPDATE OF s` sobre S | `SELECT … ORDER BY id FOR UPDATE OF s` sobre las sesiones vencidas según `now_B` |
| Comprobación de condiciones | Con el bloqueo: `status = 'planned'` y `scheduled_date = hoy(now_A, tz)` | El filtro `scheduled_date < hoy(now_B, tz)` se evalúa con `now_B`. `status = 'planned'` se vuelve a evaluar sobre la versión más reciente de la fila después de esperar, y otra vez en el `UPDATE` |

| Caso | Relojes y orden | Resultado esperado |
|------|-----------------|--------------------|
| C4a | A obtiene el bloqueo primero con `now_A` = D 23:59:59. B usa `now_B` = D+1 00:00:01 y espera. | A: `completed`. B, tras el `COMMIT` de A, vuelve a evaluar `status`, excluye S y actualiza 0 filas. Estado final: `completed`. |
| C4b | B obtiene el bloqueo primero con `now_B` = D+1 00:00:01 y cierra S. A espera. | A lee S ya cerrada y responde `409`. Estado final: `partial` o `skipped`, según los registros. |
| C4c | A envía la petición a las 23:59:59 de D, pero obtiene el bloqueo con `now_A` = D+1 00:00:00,5, sin que B se haya ejecutado. | A responde `409`, porque la fecha ya no es hoy. S sigue `planned` hasta la siguiente reconciliación, que la cierra como `partial` o `skipped`. El límite lo marca el momento en que se obtiene el bloqueo y se lee el reloj, no el envío de la petición. |
| C4d | B usa `now_B` = D 23:59:59, antes de medianoche. | S no está vencida y B no la selecciona. A finaliza con normalidad. |

En todos los casos: nunca `completed` después de cerrada, ni cerrada después de `completed`.

**Invariantes que se comprueban al final de cada escenario** (SQL ilustrativo):
- `SELECT count(*) FROM scheduled_sessions s WHERE s.status = 'skipped' AND EXISTS (SELECT 1 FROM set_logs l WHERE l.session_id = s.id)` debe ser 0.
- No hay registros con `created_at` posterior al `closed_at` de su sesión.
- Ninguna sesión `completed` tiene `closed_at`.
- Ninguna sesión `completed` deja de tener al menos un registro (DP-09). Mientras está `planned` no se puede finalizar sin series, y una vez `completed` sus series ya no se pueden borrar.
- Ninguna inscripción `active` deja de tener sesiones `planned` después de ejecutar `reconcile`.
- Volver a ejecutar `reconcile` no cambia ninguna fila.

---

## 3. Modelo de Datos

### **3.1. Diagrama del modelo de datos:**

> Recomendamos usar mermaid para el modelo de datos, y utilizar todos los parámetros que permite la sintaxis para dar el máximo detalle, por ejemplo las claves primarias y foráneas.

> **Estado de esta sección:** describe el **modelo de datos propuesto** para el MVP. No existen esquema Prisma, migraciones ni semillas, y nada de lo que sigue está implementado ni probado. Se usan las mismas etiquetas que en la sección 2:
> - **[Confirmada]:** reglas de producto que el modelo respeta (estados, secuencias A/B, RP1–RP6, cierre según la zona horaria del usuario).
> - **[Propuesta]:** tablas, tipos, restricciones e índices. Es el valor por defecto de toda la sección salvo que se indique otra cosa.
> - **[Pendiente]:** necesita una decisión del Product Owner.

#### Convenciones [Propuesta]

- **Nombres** en inglés y `snake_case`, coherentes con el SQL ilustrativo de 2.2: `users`, `enrollments`, `scheduled_sessions`, `set_logs`, `token_version`, `scheduled_date`, `completed_at`, `closed_at`, `set_logs.session_id`.
- **Claves primarias** `uuid` con `DEFAULT gen_random_uuid()` (incluido en PostgreSQL desde la versión 13). No revelan cuántos registros hay ni facilitan enumerar recursos. El orden de bloqueo "por `id` ascendente" de 2.2 sigue funcionando: solo necesita un orden total y estable, no cronológico.
- **Catálogo:** además del `uuid`, una columna `code` única que sirve de clave natural para que las *seeds* sean idempotentes.
- **Estados y valores cerrados:** `text` con `CHECK (… IN (…))`, como anticipa 2.2 ("`CHECK` de estados"). Añadir un valor en el futuro es cambiar un `CHECK`, sin `ALTER TYPE`.
- **Tiempo:** los instantes son `timestamptz`; las fechas del calendario, `date` sin hora. Los contadores pequeños usan `smallint`.
- **Días de la semana:** `smallint` de 0 a 6, con 0 = domingo, igual que `Date.prototype.getDay()` en JavaScript y `EXTRACT(DOW FROM …)` en PostgreSQL.

```mermaid
erDiagram
    users ||--o{ enrollments : "se inscribe"
    programs ||--o{ enrollments : "se activa en"
    programs ||--o{ session_templates : "una plantilla por hueco"
    session_templates ||--o{ template_exercises : "prescribe"
    exercises ||--o{ template_exercises : "aparece en"
    enrollments ||--|{ scheduled_sessions : "materializa"
    session_templates ||--o{ scheduled_sessions : "se instancia en"
    scheduled_sessions ||--o{ set_logs : "contiene"
    template_exercises ||--o{ set_logs : "se ejecuta en"

    users {
        uuid id PK
        text email UK "NOT NULL, normalizado en minúsculas"
        text password_hash "NOT NULL"
        integer token_version "NOT NULL, DEFAULT 0, >= 0"
        text timezone "NOT NULL, zona IANA"
        smallint[] available_weekdays "NULL hasta configurar, de 2 a 6 valores entre 0 y 6"
        timestamptz created_at "NOT NULL"
        timestamptz updated_at "NOT NULL"
    }

    programs {
        uuid id PK
        text code UK "NOT NULL, clave de seed"
        text name "NOT NULL"
        text description "NULL"
        text level "NOT NULL, descriptivo"
        text goal "NOT NULL"
        smallint duration_weeks "NOT NULL, > 0"
        timestamptz created_at "NOT NULL"
    }

    session_templates {
        uuid id PK
        uuid program_id FK "NOT NULL, UK con slot"
        text slot "NOT NULL, PUSH_A ... LEGS_CORE_B"
        text name "NOT NULL"
        text description "NULL"
    }

    exercises {
        uuid id PK
        text code UK "NOT NULL, clave de seed"
        text name "NOT NULL"
        text description "NULL"
        text measurement "NOT NULL, reps o time"
    }

    template_exercises {
        uuid id PK
        uuid session_template_id FK "NOT NULL"
        smallint week_number "NOT NULL, >= 1"
        smallint position "NOT NULL, >= 1"
        uuid exercise_id FK "NOT NULL, FK compuesta con measurement"
        text measurement FK "NOT NULL, reps o time"
        smallint target_sets "NOT NULL, > 0"
        smallint target_reps "NULL, > 0, solo si reps"
        smallint target_seconds "NULL, > 0, solo si time"
        smallint rest_seconds "NOT NULL, >= 0"
    }

    enrollments {
        uuid id PK
        uuid user_id FK "NOT NULL, único si active (DP-07)"
        uuid program_id FK "NOT NULL"
        text status "NOT NULL, active o finished"
        smallint[] weekdays "NOT NULL, copia de 2 a 6 días"
        smallint duration_weeks "NOT NULL, copia, > 0"
        timestamptz activated_at "NOT NULL"
        timestamptz finished_at "NULL salvo si finished"
    }

    scheduled_sessions {
        uuid id PK
        uuid enrollment_id FK "NOT NULL, FK compuesta con program_id"
        uuid program_id FK "NOT NULL, copia de la inscripción"
        uuid session_template_id FK "NOT NULL, FK compuesta con program_id"
        smallint sequence_index "NOT NULL, >= 0, UK con enrollment_id"
        smallint week_number "NOT NULL, >= 1"
        date scheduled_date "NOT NULL, fecha local, UK con enrollment_id"
        text status "NOT NULL, planned completed partial skipped"
        timestamptz completed_at "NULL salvo si completed"
        timestamptz closed_at "NULL salvo si partial o skipped"
        timestamptz created_at "NOT NULL"
    }

    set_logs {
        uuid id PK
        uuid session_id FK "NOT NULL"
        uuid template_exercise_id FK "NOT NULL, FK compuesta con measurement"
        text measurement FK "NOT NULL, reps o time"
        smallint set_number "NOT NULL, >= 1"
        smallint reps "NULL, >= 0, solo si reps"
        smallint duration_seconds "NULL, >= 0, solo si time"
        timestamptz created_at "NOT NULL, tomado del Clock"
        timestamptz updated_at "NOT NULL"
    }
```

**Cómo leer el diagrama**
- Las claves foráneas compuestas aparecen como dos columnas marcadas `FK`; el detalle está en 3.2.
- `enrollments ||--|{ scheduled_sessions` (al menos una sesión) lo garantiza la transacción de activación, no una restricción SQL.
- Los comentarios resumen los `CHECK`. Los índices parciales, como el de programa activo o los de reconciliación, no se pueden representar en Mermaid y se describen en 3.2.
- No hay tablas para el progreso, la adherencia ni los hitos (F10): se calculan a partir de `scheduled_sessions` y `set_logs` (ver "Consultas de progreso").

### **3.2. Descripción de entidades principales:**

> Recuerda incluir el máximo detalle de cada entidad, como el nombre y tipo de cada atributo, descripción breve si procede, claves primarias y foráneas, relaciones y tipo de relación, restricciones (unique, not null…), etc.

#### Resumen de entidades

| Entidad | Tipo de dato | Responsabilidad | Módulo (2.2) |
|---------|--------------|-----------------|--------------|
| `users` | Del usuario | Cuenta, credenciales, revocación de tokens, zona horaria y disponibilidad. | `auth`, `profile` |
| `programs` | Catálogo (*seed*) | Programa preconfigurado con nivel, objetivo y duración en semanas. | `programs` |
| `session_templates` | Catálogo (*seed*) | Plantilla de sesión de un programa para un hueco de la secuencia (`PUSH_A`, `PULL_B`, …). | `programs` |
| `exercises` | Catálogo (*seed*) | Ejercicio y su forma de medida (repeticiones o tiempo). | `programs` |
| `template_exercises` | Catálogo (*seed*) | **Prescripción**: qué ejercicio, en qué orden, cuántas series, repeticiones o tiempo y descanso, para cada semana de una plantilla. | `programs` |
| `enrollments` | Del usuario | Inscripción de un usuario en un programa, con copia de los días elegidos y de la duración. | `enrollments` |
| `scheduled_sessions` | Del usuario | Calendario materializado: una fila por sesión, con fecha local, orden, semana y estado. | `enrollments` (inserción), `sessions` (estado) |
| `set_logs` | Del usuario | **Registro real**: cada serie hecha por el atleta en una sesión. | `sessions` |

Relaciones principales:
- Un usuario tiene 0..N inscripciones, y como máximo una `active` (DP-07).
- Un programa tiene 0..N plantillas, una por hueco.
- Una plantilla tiene 0..N prescripciones, una por semana y posición.
- Una inscripción tiene 1..N sesiones (`días × semanas`).
- Una sesión tiene 0..N registros de series.
- Cada registro apunta a la prescripción que ejecuta.

#### `users`

Cuenta del atleta. Contiene también la zona horaria y la disponibilidad que gestiona el módulo `profile`, porque la sección 1 no define más datos de "perfil deportivo" (ver pendientes).

| Columna | Tipo | Restricciones | Descripción |
|---------|------|---------------|-------------|
| `id` | `uuid` | PK, `DEFAULT gen_random_uuid()` | Identificador. Es el `sub` del JWT (2.5). |
| `email` | `text` | NOT NULL, UNIQUE, `CHECK (email = lower(btrim(email)))` | Se guarda normalizado. Así la unicidad no depende de mayúsculas ni requiere la extensión `citext`. |
| `password_hash` | `text` | NOT NULL | *Hash* bcrypt o argon2 (2.5). La contraseña nunca se guarda. |
| `token_version` | `integer` | NOT NULL, `DEFAULT 0`, `CHECK (token_version >= 0)` | Revocación de tokens: se incrementa al cerrar sesión o cambiar la contraseña (2.5). |
| `timezone` | `text` | NOT NULL | Zona horaria IANA (por ejemplo, `Europe/Madrid`). Se toma del navegador al registrarse y es editable (2.2). Su validez se comprueba en la aplicación (ver "Reglas con validación transaccional"). |
| `available_weekdays` | `smallint[]` | NULL; `CHECK (available_weekdays IS NULL OR (cardinality(available_weekdays) BETWEEN 2 AND 6 AND available_weekdays <@ '{0,1,2,3,4,5,6}'::smallint[]))` | Días fijos elegidos (F2). Vale NULL hasta que el usuario los configura. |
| `created_at` / `updated_at` | `timestamptz` | NOT NULL, `DEFAULT now()` | Auditoría básica. |

- **Relaciones:** 1 → 0..N `enrollments`.
- **Índices:** el UNIQUE de `email`, que también sirve para el inicio de sesión.
- **Justificación:**
  - La disponibilidad es un *array* y no una tabla aparte. Se lee y se escribe siempre entera, se copia tal cual en la inscripción y tiene como mucho 6 valores.
  - El `CHECK` asegura el número de días y el rango, pero **no** que no se repitan. Eso lo valida Zod (ver "Reglas con validación transaccional").

#### `programs`

Programa preconfigurado del catálogo (F3). Es de solo lectura en tiempo de ejecución y se carga con *seeds*.

| Columna | Tipo | Restricciones | Descripción |
|---------|------|---------------|-------------|
| `id` | `uuid` | PK | Identificador. |
| `code` | `text` | NOT NULL, UNIQUE | Clave estable para las *seeds* (por ejemplo, `upper-body-8w`, valor ilustrativo). |
| `name` | `text` | NOT NULL | Nombre visible. |
| `description` | `text` | NULL | Texto descriptivo. |
| `level` | `text` | NOT NULL | Nivel **descriptivo**, con criterios orientativos. No se usa en ninguna regla ni restringe el acceso (DP-03). |
| `goal` | `text` | NOT NULL | Objetivo del programa (F3). |
| `duration_weeks` | `smallint` | NOT NULL, `CHECK (duration_weeks > 0)` | Duración en semanas (RP1). |
| `created_at` | `timestamptz` | NOT NULL, `DEFAULT now()` | — |

- **Relaciones:**
  - 1 → 0..N `session_templates`.
  - 1 → 0..N `enrollments`.
- **Justificación:** el catálogo inicial tiene 3 programas de 6 semanas (DP-02, DP-04). Su contenido todavía no está definido (1.2), y el modelo no depende de él.

#### `session_templates`

Plantilla de sesión de un programa para un **hueco** de la secuencia semanal. Las variantes A y B de un mismo tipo son plantillas distintas [Confirmada, F3].

| Columna | Tipo | Restricciones | Descripción |
|---------|------|---------------|-------------|
| `id` | `uuid` | PK | Identificador. |
| `program_id` | `uuid` | NOT NULL, FK → `programs(id)` `ON DELETE RESTRICT` | Programa al que pertenece. |
| `slot` | `text` | NOT NULL, `CHECK (slot IN ('PUSH_A','PUSH_B','PULL_A','PULL_B','PUSH_PULL_A','LEGS_CORE_A','LEGS_CORE_B'))` | Hueco de la secuencia. Son exactamente las siete variantes confirmadas en F3 y en la tabla de 1.2. |
| `name` | `text` | NOT NULL | Nombre visible (por ejemplo, "Push A"). |
| `description` | `text` | NULL | Objetivo o enfoque de la variante, cuyo contenido aún no está definido. |

- **Restricciones de tabla:**
  - `UNIQUE (program_id, slot)`: como mucho una plantilla por hueco en cada programa.
  - `UNIQUE (id, program_id)`: destino de una clave foránea compuesta de `scheduled_sessions`.
- **Relaciones:**
  - N → 1 `programs`.
  - 1 → 0..N `template_exercises`.
  - 1 → 0..N `scheduled_sessions`.
- **Índices:** `UNIQUE (program_id, slot)` cubre la comprobación de la activación: que haya una plantilla para cada hueco de `WEEKLY_SEQUENCES[N]`.
- **Justificación:**
  - La secuencia de cada N (2–6) es una constante del dominio (`WEEKLY_SEQUENCES`), no una tabla, porque es igual para todos los programas [Confirmada, tabla de 1.2].
  - Que un programa sea compatible con un N concreto se deduce de si tiene plantillas para todos sus huecos (2.1: `422` si falta alguna).

#### `exercises`

Ejercicio del catálogo. No tiene contenido multimedia, que está fuera del alcance del MVP.

| Columna | Tipo | Restricciones | Descripción |
|---------|------|---------------|-------------|
| `id` | `uuid` | PK | Identificador. |
| `code` | `text` | NOT NULL, UNIQUE | Clave estable para las *seeds*. |
| `name` | `text` | NOT NULL | Nombre visible. |
| `description` | `text` | NULL | Indicaciones breves. |
| `measurement` | `text` | NOT NULL, `CHECK (measurement IN ('reps','time'))` | Se mide en repeticiones o en tiempo (F3: "repeticiones o tiempo"). |

- **Restricciones de tabla:** `UNIQUE (id, measurement)`, destino de una clave foránea compuesta de `template_exercises`.
- **Relaciones:** 1 → 0..N `template_exercises`.
- **Justificación:** la forma de medida pertenece al ejercicio (por ejemplo, un *hold* se mide en tiempo). Se propaga con claves foráneas compuestas para que ni la prescripción ni el registro puedan usar otra.

#### `template_exercises` (prescripción)

Lo que el programa **prescribe** para una plantilla en una semana concreta: ejercicio, orden, series, repeticiones o tiempo y descanso (F3).

| Columna | Tipo | Restricciones | Descripción |
|---------|------|---------------|-------------|
| `id` | `uuid` | PK | Identificador. |
| `session_template_id` | `uuid` | NOT NULL, FK → `session_templates(id)` `ON DELETE RESTRICT` | Plantilla a la que pertenece. |
| `week_number` | `smallint` | NOT NULL, `CHECK (week_number >= 1)` | Semana del programa a la que se aplica. |
| `position` | `smallint` | NOT NULL, `CHECK (position >= 1)` | Orden del ejercicio dentro de la sesión. |
| `exercise_id` | `uuid` | NOT NULL | Ejercicio prescrito. |
| `measurement` | `text` | NOT NULL; FK compuesta `(exercise_id, measurement)` → `exercises(id, measurement)` `ON DELETE RESTRICT` | Copia de la forma de medida del ejercicio. La clave foránea impide que no coincida. |
| `target_sets` | `smallint` | NOT NULL, `CHECK (target_sets > 0)` | Series prescritas. |
| `target_reps` | `smallint` | NULL, `CHECK (target_reps > 0)` | Repeticiones por serie, si se mide en repeticiones. |
| `target_seconds` | `smallint` | NULL, `CHECK (target_seconds > 0)` | Segundos por serie, si se mide en tiempo. |
| `rest_seconds` | `smallint` | NOT NULL, `CHECK (rest_seconds >= 0)` | Descanso entre series. |

- **Restricciones de tabla:**
  - `CHECK ((measurement = 'reps' AND target_reps IS NOT NULL AND target_seconds IS NULL) OR (measurement = 'time' AND target_seconds IS NOT NULL AND target_reps IS NULL))`.
  - `UNIQUE (session_template_id, week_number, position)`.
  - `UNIQUE (id, measurement)`: destino de la clave foránea compuesta de `set_logs`.
- **Relaciones:**
  - N → 1 `session_templates`.
  - N → 1 `exercises`.
  - 1 → 0..N `set_logs`.
- **Índices:**
  - El UNIQUE anterior (por plantilla y semana) sirve para cargar la sesión del día.
  - `(exercise_id)`, para la clave foránea y para el desempeño por ejercicio.
- **Justificación:**
  - La prescripción depende de la semana porque la sección 1 define una "progresión definida semana a semana" (P1).
  - Indexar por `(plantilla, semana)` permite que cada semana cambie el ejercicio, el volumen o el descanso sin tablas adicionales.
  - Que `week_number` no supere la duración del programa, y que haya prescripción para todas las semanas, es una regla entre tablas. Se valida en las *seeds* y al activar (ver "Reglas con validación transaccional").
  - Las repeticiones prescritas son **fijas**, sin rangos (DP-05). Por ejemplo, 3 × 8 es `target_sets = 3` y `target_reps = 8`. El esquema no necesita columnas de rango.

#### `enrollments`

Inscripción de un usuario en un programa (F4). Guarda una **copia** de los datos que determinan el calendario, para que los cambios posteriores del perfil o del catálogo no alteren el programa en curso (2.1).

| Columna | Tipo | Restricciones | Descripción |
|---------|------|---------------|-------------|
| `id` | `uuid` | PK | Identificador. |
| `user_id` | `uuid` | NOT NULL, FK → `users(id)` `ON DELETE RESTRICT` | Propietario. Toda autorización pasa por esta columna (2.5). |
| `program_id` | `uuid` | NOT NULL, FK → `programs(id)` `ON DELETE RESTRICT` | Programa inscrito. |
| `status` | `text` | NOT NULL, `DEFAULT 'active'`, `CHECK (status IN ('active','finished'))` | `finished` cuando ninguna sesión sigue `planned` (RP6). |
| `weekdays` | `smallint[]` | NOT NULL, `CHECK (cardinality(weekdays) BETWEEN 2 AND 6 AND weekdays <@ '{0,1,2,3,4,5,6}'::smallint[])` | Copia de `users.available_weekdays` en el momento de activar. N = `cardinality(weekdays)`. |
| `duration_weeks` | `smallint` | NOT NULL, `CHECK (duration_weeks > 0)` | Copia de `programs.duration_weeks` en el momento de activar. |
| `activated_at` | `timestamptz` | NOT NULL | Instante de la activación, tomado del `Clock`. |
| `finished_at` | `timestamptz` | NULL | Instante en que la inscripción pasó a `finished`. |

- **Restricciones de tabla:**
  - `CHECK ((status = 'finished') = (finished_at IS NOT NULL))`.
  - `UNIQUE (id, program_id)`: destino de una clave foránea compuesta de `scheduled_sessions`.
- **Índices:**
  - `ux_enrollments_one_active`: `UNIQUE (user_id) WHERE status = 'active'`, para un solo programa activo **[Confirmada, DP-07]** (ver más abajo).
  - `ix_enrollments_user`: `(user_id, activated_at)`, para el historial de inscripciones y para la clave foránea.
- **Relaciones:**
  - N → 1 `users`.
  - N → 1 `programs`.
  - 1 → 1..N `scheduled_sessions`.
- **Justificación:**
  - No hay estado de abandono porque abandonar un programa queda fuera del MVP (DP-14).
  - La fecha de inicio y la de fin no se guardan: se obtienen de la primera y la última sesión, así que no hay que mantener ningún dato redundante.
  - La zona horaria **no** se copia. El cierre usa la zona actual de `users`, de acuerdo con el riesgo aceptado en 2.1.

#### `scheduled_sessions`

Calendario materializado (F4, F5). Se inserta completo en la activación, con todas las sesiones en `planned`. Cada fila es una sesión con su fecha local, su orden, su semana del programa y su estado.

| Columna | Tipo | Restricciones | Descripción |
|---------|------|---------------|-------------|
| `id` | `uuid` | PK | Identificador. Fija el orden de bloqueo (2.2). |
| `enrollment_id` | `uuid` | NOT NULL; FK compuesta `(enrollment_id, program_id)` → `enrollments(id, program_id)` `ON DELETE RESTRICT` | Inscripción a la que pertenece. |
| `program_id` | `uuid` | NOT NULL | Copia del programa de la inscripción. Solo existe para las dos claves foráneas compuestas. |
| `session_template_id` | `uuid` | NOT NULL; FK compuesta `(session_template_id, program_id)` → `session_templates(id, program_id)` `ON DELETE RESTRICT` | Plantilla del hueco `sequence[i mod N]`. La clave foránea compuesta garantiza que pertenece al mismo programa que la inscripción. |
| `sequence_index` | `smallint` | NOT NULL, `CHECK (sequence_index >= 0)` | Posición `i` en el calendario, empezando en 0 (2.2, flujo 1). |
| `week_number` | `smallint` | NOT NULL, `CHECK (week_number >= 1)` | Semana del programa: `floor(i / N) + 1` (RP4). No coincide necesariamente con la semana natural. |
| `scheduled_date` | `date` | NOT NULL | Fecha local de la sesión en la zona horaria del usuario. **No se recalcula nunca** [Confirmada, RP5]. |
| `status` | `text` | NOT NULL, `DEFAULT 'planned'`, `CHECK (status IN ('planned','completed','partial','skipped'))` | Los cuatro estados confirmados. `completed`, `partial` y `skipped` son finales [Confirmada]. |
| `completed_at` | `timestamptz` | NULL | Instante en que el atleta finalizó la sesión (T-finalizar). |
| `closed_at` | `timestamptz` | NULL | Instante del cierre automático (T-cierre). Se escribe una sola vez. |
| `created_at` | `timestamptz` | NOT NULL, `DEFAULT now()` | — |

- **Restricción de tabla** que hace coherentes el estado y los instantes:
  `CHECK ((status = 'planned' AND completed_at IS NULL AND closed_at IS NULL) OR (status = 'completed' AND completed_at IS NOT NULL AND closed_at IS NULL) OR (status IN ('partial','skipped') AND closed_at IS NOT NULL AND completed_at IS NULL))`.
  Hace cumplir en SQL la invariante de 2.6 "ninguna sesión `completed` tiene `closed_at`".
- **Unicidad:**
  - `UNIQUE (enrollment_id, sequence_index)`: la "unicidad (inscripción, orden de la sesión)" de 2.2.
  - `UNIQUE (enrollment_id, scheduled_date)`: como mucho una sesión por día en cada inscripción (RP3 asigna una sesión a cada día seleccionado).
- **Índices** (ver también "Índices para la reconciliación"):
  - Los dos UNIQUE anteriores, que cubren el calendario ordenado, la sesión de hoy (`enrollment_id`, `scheduled_date`) y la clave foránea `enrollment_id`.
  - `ix_sessions_planned_due`: `(enrollment_id, scheduled_date) WHERE status = 'planned'`.
  - `ix_sessions_planned_date`: `(scheduled_date) WHERE status = 'planned'`, solo si se activa la tarea programada opcional.
  - `(session_template_id)`, para la clave foránea hacia el catálogo.
- **Relaciones:**
  - N → 1 `enrollments`.
  - N → 1 `session_templates`.
  - 1 → 0..N `set_logs`.
- **Justificación:**
  - No hay columna `user_id`. La propiedad se resuelve siempre a través de `enrollments.user_id`, como en el SQL de 2.2 y en la regla de autorización de 2.5. Así se evita una copia que habría que mantener coherente.
  - El hueco (`PUSH_A`, …) no se copia, porque se obtiene de la plantilla.

#### `set_logs` (registro real)

Cada serie que el atleta **realmente** hizo (F9). Registrar series no cambia el estado de la sesión [Confirmada], y el cierre no borra ni modifica registros, así que una sesión `partial` los conserva [Confirmada].

| Columna | Tipo | Restricciones | Descripción |
|---------|------|---------------|-------------|
| `id` | `uuid` | PK | Identificador. |
| `session_id` | `uuid` | NOT NULL, FK → `scheduled_sessions(id)` `ON DELETE RESTRICT` | Sesión en la que se hizo la serie. Mismo nombre que en el SQL de 2.2. |
| `template_exercise_id` | `uuid` | NOT NULL; FK compuesta `(template_exercise_id, measurement)` → `template_exercises(id, measurement)` `ON DELETE RESTRICT` | Prescripción que se ejecutó. Da acceso al ejercicio y a los valores objetivo. |
| `measurement` | `text` | NOT NULL | Copia de la forma de medida. La clave foránea compuesta impide que no coincida. |
| `set_number` | `smallint` | NOT NULL, `CHECK (set_number >= 1)` | Número de serie dentro del ejercicio. |
| `reps` | `smallint` | NULL, `CHECK (reps >= 0)` | Repeticiones hechas: enteras y no negativas (2.5). |
| `duration_seconds` | `smallint` | NULL, `CHECK (duration_seconds >= 0)` | Segundos hechos, en ejercicios medidos por tiempo **[Confirmada, DP-11]**. Nunca se convierten en repeticiones. |
| `created_at` | `timestamptz` | NOT NULL | Lo escribe la aplicación con el `now` del `Clock`, no con `now()`, para la invariante de 2.6 sobre `closed_at`. |
| `updated_at` | `timestamptz` | NOT NULL | Última edición. |

- **Restricciones de tabla:**
  - `CHECK ((measurement = 'reps' AND reps IS NOT NULL AND duration_seconds IS NULL) OR (measurement = 'time' AND duration_seconds IS NOT NULL AND reps IS NULL))`.
  - `UNIQUE (session_id, template_exercise_id, set_number)`.
- **Índices:**
  - El UNIQUE anterior empieza por `session_id`. Sirve para el `EXISTS` de T-cierre, para cargar los registros de una sesión y para la clave foránea.
  - `(template_exercise_id)`, para el desempeño por ejercicio y para la clave foránea.
- **Relaciones:**
  - N → 1 `scheduled_sessions`.
  - N → 1 `template_exercises`.
- **Justificación:**
  - Borrar una serie es un `DELETE` físico. La "actividad" se evalúa en el momento del cierre (2.2), así que no hace falta borrado lógico.
  - Las filas de `set_logs` nunca se bloquean explícitamente: las protege el bloqueo de su sesión (2.2).

#### Prescripción frente a registro real

| Aspecto | Prescrito (`template_exercises`) | Realizado (`set_logs`) |
|---------|----------------------------------|------------------------|
| Origen | Catálogo cargado con *seeds*, igual para todos los usuarios | Lo escribe el atleta durante la sesión de hoy |
| Granularidad | Una fila por ejercicio, plantilla y semana, con `target_sets` series | Una fila por cada serie hecha (`set_number`) |
| Valores | `target_reps` o `target_seconds`, más `rest_seconds` | `reps` o `duration_seconds` reales. El descanso real no se registra |
| Cambios | Solo con *seeds*, sin rutas de escritura (2.5), y nunca en programas con inscripciones (ver "Inmutabilidad del catálogo") | `INSERT`, `UPDATE` y `DELETE` solo mientras la sesión está `planned` y su fecha es hoy |
| Uso | Mostrar qué hay que hacer | Desempeño, decidir entre `partial` y `skipped`, e historial |

Compararlos es una consulta que une `set_logs` con `template_exercises` (series hechas frente a `target_sets` y repeticiones frente a `target_reps`). No hay ningún campo calculado que guardar.

#### Inmutabilidad del catálogo [Propuesta]

**Regla técnica del MVP:** el contenido de un programa que ya tiene alguna inscripción (`enrollments.program_id`) **no se modifica**. Esto incluye:
- sus `session_templates`;
- sus `template_exercises` (ejercicio, posición, series, repeticiones o segundos y descanso);
- los datos de `programs` que determinan el calendario, como `duration_weeks`.

Si hay que cambiar ese contenido, se crea una **nueva versión del programa**: una fila nueva en `programs`, con un `code` nuevo, y sus propias plantillas y prescripciones. La versión anterior se conserva tal cual.

**Por qué protege el historial:**
- `set_logs.template_exercise_id` y `scheduled_sessions.session_template_id` apuntan a filas concretas del catálogo. Si esas filas cambiaran, los registros antiguos se compararían con objetivos que el atleta nunca tuvo. Por ejemplo, 3 × 8 hechas frente a un `target_reps` que después pasó a 10.
- Con la regla, cada registro sigue unido exactamente a la prescripción vigente cuando se entrenó. La comparación entre lo prescrito y lo realizado (desempeño, F8 y F9) da el mismo resultado hoy y dentro de un año.
- Las inscripciones en curso no cambian de contenido a mitad de programa. Es coherente con la copia de `weekdays` y `duration_weeks` en `enrollments`, que ya protege el calendario de cambios posteriores.
- `ON DELETE RESTRICT` ya impide **borrar** prescripciones con registros, pero no impide **modificarlas**. Esta regla cubre ese hueco.

**Alcance en el MVP:**
- Es una regla de proceso para quien prepara las *seeds*: el *upsert* por `code` solo puede crear programas nuevos o modificar programas sin inscripciones.
- No se implementa ningún mecanismo de versionado: ni columnas de versión, ni relación entre versiones, ni *triggers*, ni comprobaciones automáticas.
- Cómo se ofrecen las versiones en el catálogo, por ejemplo ocultando las antiguas a los usuarios nuevos, queda fuera de esta sección y pendiente de decidir.

#### Integridad referencial

- **`ON DELETE RESTRICT` en todas las claves foráneas [Propuesta].** El MVP no tiene ningún flujo que borre usuarios, inscripciones, sesiones ni contenido del catálogo. El único borrado es el de `set_logs`, que es una hoja. `RESTRICT` convierte cualquier borrado accidental en un error en lugar de una pérdida en cascada del historial. Si en el futuro se añade la eliminación de cuentas, se decidirá entonces su política (cascada o anonimización).
- **Claves foráneas compuestas** para reglas entre tablas que SQL sí puede garantizar:
  - `scheduled_sessions (enrollment_id, program_id)` → `enrollments (id, program_id)`.
  - `scheduled_sessions (session_template_id, program_id)` → `session_templates (id, program_id)`.

    Juntas impiden asignar a una sesión una plantilla de otro programa.
  - `template_exercises (exercise_id, measurement)` → `exercises (id, measurement)`.
  - `set_logs (template_exercise_id, measurement)` → `template_exercises (id, measurement)`.

    Juntas impiden registrar en tiempo un ejercicio prescrito en repeticiones, o al revés.
- **`CHECK`** para los dominios cerrados (estados, huecos, medidas), los rangos y la coherencia entre el estado y los instantes.
- **Lo que SQL no puede garantizar** se valida en las transacciones (ver más abajo). El *trigger* opcional de 2.2 sería el refuerzo, y no es necesario en el MVP.

#### Programa activo único [Confirmada, DP-07]

- **Decisión:** un solo programa activo por usuario (F4), garantizado en el backend teniendo en cuenta la concurrencia.
- **Índice:** `ux_enrollments_one_active`, `UNIQUE (user_id) WHERE status = 'active'`.
- **Papel:** es la garantía frente a la concurrencia. La comprobación previa la hace `EnrollmentService` después de reconciliar (2.2, flujo 1). Si dos activaciones simultáneas pasan esa comprobación, la segunda en confirmarse recibe `23505` y responde `409` sin reintentar (2.2).
- **Varios programas activos** quedan fuera del MVP. Permitirlos sería un cambio de alcance: habría que sustituir el índice y revisar la "sesión de hoy".
- **Implementación:** Prisma no expresa de forma nativa todos los índices parciales ni los `CHECK`. Se añadirían con SQL en la migración y habría que comprobar que las migraciones posteriores no los eliminan (ver riesgos).

#### Índices para la reconciliación

| Índice | Definición | Pensado para |
|--------|------------|--------------|
| `ix_sessions_planned_due` | `scheduled_sessions (enrollment_id, scheduled_date) WHERE status = 'planned'` | T-cierre, paso 3: candidatas vencidas (`scheduled_date < hoy`) de las inscripciones del usuario. Es también candidato para la comprobación "¿quedan sesiones `planned`?" de T-finalizar y T-cierre (`NOT EXISTS … WHERE enrollment_id = $e AND status = 'planned'`); hay que verificarlo con `EXPLAIN ANALYZE` (ver abajo). |
| `ux_enrollments_one_active` / `ix_enrollments_user` | Ver `enrollments` | Encontrar las inscripciones del usuario al principio de T-cierre, y las activas que hay que bloquear en el paso 5. |
| `UNIQUE (session_id, template_exercise_id, set_number)` en `set_logs` | Empieza por `session_id` | El `EXISTS` que decide entre `partial` y `skipped` en el paso 4 de T-cierre. |
| `ix_sessions_planned_date` (opcional) | `scheduled_sessions (scheduled_date) WHERE status = 'planned'` | Tarea programada opcional. Busca las sesiones `planned` cuya fecha ya es pasada en la zona horaria más adelantada y, a partir de ellas, los usuarios que hay que reconciliar uno a uno (2.2). |

- **Un índice no garantiza un plan de ejecución.** El planificador de PostgreSQL elige el plan según las estadísticas, el volumen de datos y los parámetros de cada consulta. Con tablas pequeñas, como las de un MVP, puede preferir un recorrido secuencial aunque exista el índice. La tabla anterior indica **para qué** se proponen los índices, no qué plan se obtendrá.
- **Verificación pendiente [Propuesta]:** al implementar, ejecutar `EXPLAIN ANALYZE` sobre PostgreSQL real, con un volumen de datos representativo, para:
  - el `SELECT … FOR UPDATE` de candidatas de T-cierre;
  - las consultas `NOT EXISTS` de T-finalizar y T-cierre;
  - el `EXISTS` de clasificación.

  Así se comprueba si usan `ix_sessions_planned_due` y el UNIQUE de `set_logs`. Si no los usan y el coste es relevante, se revisarán la definición de los índices o las consultas. Todavía no se ha ejecutado ningún `EXPLAIN`.
- Los índices parciales sobre `status = 'planned'` **se reducen solos** a medida que las sesiones se cierran, así que la consulta de reconciliación más frecuente, que no encuentra nada vencido, tiene pocas entradas candidatas.
- El filtro "fecha anterior a hoy" depende de la zona horaria de cada usuario, así que no se puede indexar como expresión. Se calcula "hoy" para el usuario y se usa como límite del rango sobre `scheduled_date`.
- El `ORDER BY s.id` de T-cierre obliga a ordenar las candidatas por `id`, porque el índice está ordenado por `(enrollment_id, scheduled_date)`. Que el nodo `LockRows` quede por encima del `Sort` es **lo que hay que comprobar** con `EXPLAIN` (2.2, C8); no lo garantiza la existencia del índice.

#### Fechas locales y zona horaria

- **`scheduled_date` es una fecha de calendario (`date`) en la zona horaria del usuario**, no un instante. El `scheduler` trabaja con fechas y nunca con horas, así que los cambios de horario no desplazan ninguna sesión.
- **"Hoy" para un usuario** es `($now AT TIME ZONE users.timezone)::date`, donde `$now` es un `timestamptz` del `Clock`:
  - una sesión está **vencida** si `scheduled_date < hoy`;
  - es **la de hoy** si `scheduled_date = hoy`.
- **Instantes** (`activated_at`, `completed_at`, `closed_at`, `finished_at`, `set_logs.created_at`): `timestamptz` con el `now` del `Clock`, para que las pruebas controlen el tiempo (2.6).
- **Cambio de zona horaria:** las fechas planificadas no se recalculan [Confirmada]. Afecta solo a cuándo se considera vencida una sesión, que es el riesgo aceptado en 2.1.
- **Fecha local en el código:** se recomienda tratar `date` como texto `YYYY-MM-DD` en el dominio y no convertirlo a la hora local del servidor (ver riesgos).

#### Prevención de duplicados

| Qué se podría duplicar | Cómo se evita |
|------------------------|---------------|
| Dos calendarios por una doble activación | `ux_enrollments_one_active` (DP-07) y la activación en una sola transacción (2.2): o se insertan la inscripción y todas sus sesiones, o nada. |
| Dos sesiones con el mismo orden o la misma fecha en una inscripción | `UNIQUE (enrollment_id, sequence_index)` y `UNIQUE (enrollment_id, scheduled_date)`. |
| La misma serie registrada dos veces (doble toque o reenvío tras perder la conexión) | `UNIQUE (session_id, template_exercise_id, set_number)`. Un segundo `INSERT` con la misma terna falla con `23505` en lugar de crear una fila duplicada (ver la aclaración debajo de la tabla). |
| Dos plantillas para el mismo hueco, o dos prescripciones en la misma posición | `UNIQUE (program_id, slot)` y `UNIQUE (session_template_id, week_number, position)`. |
| Contenido del catálogo duplicado al repetir las *seeds* | `code` único en `programs` y `exercises`, y *upsert* por clave natural, limitado por la "Inmutabilidad del catálogo". |
| Dos cuentas con el mismo email | `email` normalizado y `UNIQUE`. |
| Doble cierre o doble finalización | No es una cuestión de unicidad: ambos filtran por `status = 'planned'` con la fila bloqueada (2.2), y el `CHECK` de estado e instantes impide combinaciones incoherentes. |

**Duplicados frente a idempotencia.** `UNIQUE (session_id, template_exercise_id, set_number)` **evita filas duplicadas** con la misma terna, pero **no hace idempotente la API**:
- un reenvío que llegue con otro `set_number`, por ejemplo calculado de nuevo en el cliente, crea una serie distinta y válida;
- un reenvío con la misma terna falla con `23505`, y la base de datos no distingue si es el mismo intento repetido o un intento distinto con otros valores de `reps` o `duration_seconds`;
- una edición (`UPDATE`) o un borrado (`DELETE`) repetidos no quedan cubiertos por la restricción.

La política de reintentos y las respuestas HTTP quedan para la **sección 4**. Por ejemplo: cómo identifica el cliente cada serie, qué código devuelve un conflicto de unicidad y si se usa una clave de idempotencia. El modelo solo aporta la restricción de unicidad como red de seguridad.

#### Reglas con validación transaccional

Estas reglas **no** se pueden garantizar solo con restricciones SQL. Las hace cumplir la aplicación, normalmente dentro de las transacciones de 2.2:

1. **Solo se escriben registros en una sesión `planned` cuya fecha es hoy** en la zona del usuario. Lo garantiza T-registro, con `FOR UPDATE` sobre la sesión y la comprobación hecha después de obtener el bloqueo. Una clave foránea no puede depender del estado de la fila padre.
2. **Los estados finales son inmutables:** `completed`, `partial` y `skipped` no admiten nuevas escrituras ni cambios de estado [Confirmada]. Un `CHECK` no puede comparar el valor anterior con el nuevo, así que lo hace cumplir el filtro `status = 'planned'` de todos los `UPDATE`, y opcionalmente el *trigger* de 2.2.
3. **`scheduled_date`, `sequence_index`, `week_number` y `session_template_id` no cambian después de la activación.** El repositorio no expone ninguna actualización de esas columnas; un *trigger* opcional lo reforzaría.
4. **Clasificar entre `partial` y `skipped`** según haya o no registros en el momento del cierre. Lo hace T-cierre, en una sentencia posterior al bloqueo (2.2). Un `CHECK` no puede consultar otra tabla.
5. **La inscripción pasa a `finished` cuando, y solo cuando, no le quedan sesiones `planned`** (RP6). Lo hacen T-finalizar y T-cierre con la inscripción bloqueada.
6. **El calendario es correcto:** exactamente `N × duration_weeks` sesiones, el hueco `sequence[i mod N]`, `week_number = floor(i / N) + 1`, fechas solo en los días elegidos y en orden creciente según `sequence_index`. Lo garantizan el `scheduler` (probado por unidad, CE2) y la inserción en una sola transacción.
7. **El programa tiene contenido completo para el N del usuario:** una plantilla para cada hueco de `WEEKLY_SEQUENCES[N]` y prescripciones para cada semana entre 1 y `duration_weeks`. Se comprueba al activar (`422`, 2.1) y al validar las *seeds*.
8. **Cada registro corresponde a la sesión en la que se escribe:** la prescripción (`template_exercise_id`) debe pertenecer a la plantilla y a la semana de esa sesión. Lo comprueba T-registro con la sesión bloqueada. Hacerlo con SQL exigiría copiar en `set_logs` la plantilla y la semana para formar otra clave foránea compuesta; no compensa en el MVP.
   - **Prueba de integración propuesta** (Vitest + Supertest + PostgreSQL de pruebas, aún no escrita ni ejecutada): sobre una sesión `planned` de hoy, intentar registrar una serie con un `template_exercise_id` que pertenece a **otra plantilla** del mismo programa y, en un segundo caso, a la **misma plantilla pero otra semana**. En ambos casos debe verificarse que:
     - la petición se rechaza (el código HTTP concreto se fijará en la sección 4);
     - no se inserta ninguna fila en `set_logs`;
     - el estado de la sesión no cambia.

     Como la medida coincide en los dos casos, la clave foránea compuesta no los detecta. Solo pasan si funciona la validación transaccional.
9. **La disponibilidad tiene días distintos** y la zona horaria es una zona IANA válida. Lo comprueba Zod en la entrada. Un `CHECK` no puede consultar `pg_timezone_names`, porque no es inmutable.
10. **No hay registros posteriores al cierre de su sesión** (`created_at` ≤ `closed_at`), invariante de 2.6. Es una consecuencia del protocolo de bloqueo y de usar el mismo `Clock`.
11. **Un solo programa activo** (DP-07): lo comprueba el servicio después de reconciliar, y el índice parcial lo garantiza ante la concurrencia.
12. **Finalizar exige al menos una serie** (DP-09): T-finalizar comprueba `EXISTS` en `set_logs` con la sesión bloqueada, así que no puede borrarse la última serie en paralelo. Un `CHECK` no puede consultar otra tabla. Como los estados finales son inmutables, toda sesión `completed` conserva al menos una serie.
13. **No se pueden cambiar los días con un programa activo** (DP-06): el cambio de días reconcilia, bloquea la fila de `users` y comprueba que no hay ninguna inscripción `active` antes de actualizar. T-activación bloquea la misma fila (2.2, "Carreras en la activación").

#### Verificación de los flujos de la sección 2

| Flujo (2.2) | Lecturas y escrituras | Qué lo soporta en el modelo |
|-------------|-----------------------|-----------------------------|
| **Activación** | Leer `users.timezone` y `available_weekdays`. Comprobar que no hay inscripción `active`. Leer las plantillas del programa por hueco y sus prescripciones por semana. Insertar `enrollments` y `N × semanas` filas de `scheduled_sessions` en `planned`. | `UNIQUE (program_id, slot)` para comprobar los huecos. Copias `weekdays` y `duration_weeks`. Claves foráneas compuestas de programa. `UNIQUE (enrollment_id, sequence_index)` y `(enrollment_id, scheduled_date)`. `ux_enrollments_one_active`, que convierte una carrera en `23505` → `409`. |
| **Registro (T-registro)** | `SELECT` de la sesión unida a `enrollments` por `user_id`, con `FOR UPDATE OF s`. Comprobar estado y fecha. `INSERT`, `UPDATE` o `DELETE` en `set_logs`. | La PK de la sesión y `enrollments.user_id` para autorizar. `UNIQUE (session_id, template_exercise_id, set_number)`. Claves foráneas compuestas de medida. Regla transaccional 8. |
| **Finalización (T-finalizar)** | Igual que el registro, más la comprobación de que hay al menos una serie (regla 12), `UPDATE status = 'completed', completed_at`, bloquear la inscripción y comprobar `NOT EXISTS` de sesiones `planned`. | El `CHECK` de estado e instantes. `ix_sessions_planned_due` como índice candidato para el `NOT EXISTS`, pendiente de verificar con `EXPLAIN ANALYZE`. El `CHECK` de `status` y `finished_at` en `enrollments`. |
| **Reconciliación (T-cierre)** | Candidatas `planned` vencidas del usuario, ordenadas por `id` y bloqueadas. `UPDATE` a `partial` o `skipped` con `closed_at`. Bloquear las inscripciones activas y marcar `finished` las que no tengan sesiones `planned`. | `ix_sessions_planned_due`, `ix_enrollments_user` o `ux_enrollments_one_active`, y el UNIQUE de `set_logs` para el `EXISTS`. `ix_sessions_planned_date` para la tarea opcional. |
| **Progreso** | Ver "Consultas de progreso". | Índices UNIQUE por inscripción y los índices de `set_logs` y `template_exercises`. |

**Consultas de progreso** (F8; ninguna guarda datos calculados):
- **Semana actual / total:** el `week_number` de la sesión de hoy o de la próxima `planned` (si no queda ninguna, la última), sobre `duration_weeks` de la inscripción.
- **Recuentos de `completed`, `partial` y `skipped` por separado:** `GROUP BY status` sobre las sesiones de la inscripción, cerradas según `closed_at` o `completed_at`. Una inscripción tiene como mucho `6 × duration_weeks` filas.
- **Adherencia** (DP-12, DP-13): `100 × (completed + 0,5 × partial) / (completed + partial + skipped)`, sobre las sesiones ya reconciliadas. Las `planned`, incluida la de hoy, no cuentan. Si el denominador es 0, el resultado es `null` ("sin datos"). No se guarda en ninguna columna.
- **Desempeño por ejercicio:** `set_logs` → `template_exercises` → `exercises`, con la fecha de `scheduled_sessions`, comparado con los valores prescritos.
- **Historial:** `ix_enrollments_user` para las inscripciones, más el calendario y los registros de cada una, incluidas las `finished`.
- **Hitos (F10, deseable):** se calcularían con las mismas consultas, sin tablas nuevas.

#### Decisiones del Product Owner que afectan al modelo

Todas están **[Confirmada]** (registro DP-01 a DP-17 en 1.2). **Ninguna exige cambiar el esquema** de 3.1 y 3.2; algunas añaden validaciones en las transacciones (reglas 12 y 13).

| Decisión | Impacto en el modelo | Aplicación |
|----------|----------------------|------------|
| Un solo programa activo (DP-07) | Índice único parcial y una sola "sesión de hoy". | `ux_enrollments_one_active`, ya en el esquema. |
| Primera sesión al día siguiente de la activación (DP-01) | Ninguno: es una regla del `scheduler`. | No hay ningún `CHECK` que relacione `scheduled_date` con `activated_at`. |
| Días bloqueados con un programa activo (DP-06) | Ninguno en el esquema. | Regla transaccional 13. La copia de `enrollments.weekdays` se mantiene. |
| Abandonar un programa: fuera del MVP (DP-14) | Ninguno. | `enrollments.status` sigue siendo `active` o `finished`. |
| Adherencia y peso de `partial` (DP-12, DP-13) | Ninguno: se calcula. | Sin columnas calculadas (ver "Consultas de progreso"). |
| 3 programas de 6 semanas (DP-02, DP-04) | Solo valores de las *seeds* (`duration_weeks = 6`). | El esquema admite cualquier duración positiva. |
| Repeticiones fijas (DP-05) | **Ninguno:** `template_exercises.target_reps` ya es un valor fijo, y no existen columnas de rango. | Se mantiene el `CHECK` de forma de medida: `target_reps` solo con `reps` y `target_seconds` solo con `time`. |
| Solo las series prescritas (DP-10) | Ninguno en SQL: `set_number ≤ target_sets` es una regla entre tablas. | La valida T-registro (`422`); ver la regla 8. |
| Segundos en los ejercicios por tiempo (DP-11) | `set_logs.duration_seconds`, ya en el esquema. | `CHECK` de forma de medida y FK compuesta `(template_exercise_id, measurement)`. |
| Finalizar exige al menos una serie (DP-09) | Ninguno en el esquema. | Regla transaccional 12. |
| Datos del "perfil deportivo" además de la disponibilidad | No hay más columnas. | No forma parte del registro DP: el MVP no modela más datos de perfil [Propuesta]. |
| Eliminar la cuenta | Política de borrado. | Fuera del MVP. `RESTRICT` en todas las claves foráneas. |

#### Riesgos de integridad y concurrencia

| Riesgo | Impacto | Mitigación propuesta |
|--------|---------|----------------------|
| Los `CHECK`, los índices parciales y algunas claves foráneas compuestas se añaden con SQL manual, fuera del esquema de Prisma | Una migración generada después podría eliminarlos o no reflejarlos, y la integridad dependería solo de la aplicación | Revisar cada migración generada y añadir un test de integración que compruebe que existen los objetos (por ejemplo, insertar dos inscripciones `active` y esperar `23505`). |
| Prisma convierte `date` en un `Date` de JavaScript a medianoche UTC | Si se convierte a la hora local del servidor, una sesión puede aparecer en el día anterior o en el siguiente | Tratar las fechas como `YYYY-MM-DD` en el dominio, probar con zonas extremas (2.6) y no usar conversiones a hora local. |
| La base de datos de zonas horarias de Node (ICU) y la de PostgreSQL pueden tener versiones distintas | Raras veces, "hoy" calculado en T-registro (aplicación) y en T-cierre (SQL) podría no coincidir | Calcular "hoy" en un solo sitio, el `Clock` de la aplicación, y pasarlo como parámetro a T-cierre en lugar de usar `AT TIME ZONE` en SQL. Se puede ajustar al implementar, porque el SQL de 2.2 es ilustrativo. |
| Cambiar en las *seeds* una prescripción que ya tiene registros | Cambian a posteriori los valores objetivo con los que se compara el desempeño histórico, y `RESTRICT` impide borrarla | Regla de "Inmutabilidad del catálogo": no modificar programas con inscripciones; cualquier cambio crea una nueva versión con otro `code`. En el MVP no hay ningún mecanismo automático que lo impida, así que depende de revisar las *seeds*. |
| Bloqueos implícitos de las claves foráneas (`FOR KEY SHARE`) | Una inserción en `set_logs` toma `FOR KEY SHARE` sobre la sesión, que la misma T-registro ya tiene bloqueada, y sobre su prescripción del catálogo, que nadie modifica en ejecución | Es compatible con el protocolo de 2.2. Para bloquear la inscripción bastaría `FOR NO KEY UPDATE`, que no entra en conflicto con `FOR KEY SHARE`. Debe verificarse con PostgreSQL real (C7, C8). |
| Disponibilidad con días repetidos | `cardinality` contaría días duplicados y el calendario sería incorrecto | Validar con Zod. Opcionalmente, una función SQL inmutable dentro del `CHECK`. |
| Un camino de código que escriba en `set_logs` o en `scheduled_sessions` sin el protocolo | Registros en sesiones cerradas o estados finales modificados | Concentrar esas escrituras en el repositorio de `sessions`. El *trigger* de refuerzo de 2.2 es opcional. Pruebas C1–C8 e invariantes de 2.6. |

---

## 4. Especificación de la API

> Si tu backend se comunica a través de API, describe los endpoints principales (máximo 3) en formato OpenAPI. Opcionalmente puedes añadir un ejemplo de petición y de respuesta para mayor claridad

> **Estado de esta sección:** describe el **contrato REST propuesto** para el MVP. Ningún endpoint de negocio está implementado. Solo existe el endpoint técnico `GET /api/health` (DEV-001). Etiquetas, como en las secciones 2 y 3:
> - **[Confirmada]:** reglas de producto.
> - **[Propuesta]:** rutas, formatos y códigos HTTP. Es el valor por defecto de toda la sección.
> - **[Pendiente]:** necesita una decisión del Product Owner.
>
> Para cumplir la plantilla, los **tres endpoints principales** aparecen en formato OpenAPI al final de la sección. El resto del contrato se documenta en tablas y fichas.

#### Convenciones generales [Propuesta]

- **Base y formato:**
  - todas las rutas cuelgan de `/api` y usan el mismo origen que la SPA, sin CORS (2.5);
  - los cuerpos de petición y respuesta son `application/json` en UTF-8.
- **Nombres:** los campos JSON van en `camelCase` y corresponden uno a uno con las columnas de la sección 3 (`scheduled_date` → `scheduledDate`). Los campos **derivados** (calculados, sin columna propia) se marcan como tales en cada ficha. Ningún ejemplo usa atributos que no estén en el modelo, salvo esos derivados.
- **Tipos:**
  - identificadores: `uuid` en texto;
  - fechas de calendario: `"YYYY-MM-DD"`, la fecha local del usuario, sin hora;
  - instantes: ISO 8601 en UTC (`"2026-11-20T18:05:12.000Z"`);
  - días de la semana: enteros de 0 a 6, con 0 = domingo (3.1).
- **Autenticación:** todas las rutas requieren sesión salvo `POST /api/auth/register`, `POST /api/auth/login` y el endpoint técnico `GET /api/health`. Esta última excepción se aprobó en DEV-001 porque el endpoint no lee ni devuelve datos de usuario. El `userId` sale siempre del JWT (2.5).
- **Reconciliación previa** (2.2): antes de responder, ejecutan `reconcile(userId, now)` (T-cierre) en una transacción propia:
  - estas lecturas: `GET /api/enrollments`, `/api/enrollments/active`, `/api/enrollments/{id}`, `/api/enrollments/{id}/sessions`, `/api/sessions/today`, `/api/sessions/{id}`, `/api/enrollments/{id}/progress` y `/api/enrollments/{id}/progress/exercises`;
  - la activación (`POST /api/enrollments`);
  - el cambio de días (`PATCH /api/profile` con `availableWeekdays`), para que una inscripción ya vencida no bloquee el cambio sin motivo (DP-06).

  En los `GET` es una **escritura documentada**, no oculta. Se acepta como compromiso del MVP, con las restricciones de "Reconciliación en peticiones `GET`" (2.2). Los `GET` de autenticación, perfil y catálogo **no** escriben nada.
- **Paginación:** no la hay en el MVP. Una inscripción tiene como mucho `6 × duration_weeks` sesiones, y el historial de inscripciones de un usuario es corto.
- **Cabeceras de respuesta:**
  - `Cache-Control: no-store` en todas las respuestas con datos del usuario;
  - `X-Request-Id` para correlacionar con los *logs*. No se guarda en la base de datos.

#### Resumen de endpoints

| Grupo | Método y ruta | Propósito | Éxito |
|-------|---------------|-----------|-------|
| Autenticación | `POST /api/auth/register` | Crear cuenta e iniciar sesión | `201` |
| Autenticación | `POST /api/auth/login` | Iniciar sesión | `200` |
| Autenticación | `GET /api/auth/me` | Usuario de la sesión actual | `200` |
| Autenticación | `POST /api/auth/logout` | Cerrar sesión y revocar tokens | `204` |
| Perfil | `GET /api/profile` | Consultar disponibilidad y zona horaria | `200` |
| Perfil | `PATCH /api/profile` | Actualizar disponibilidad o zona horaria | `200` |
| Catálogo | `GET /api/programs` | Listar programas | `200` |
| Catálogo | `GET /api/programs/{programId}` | Detalle de un programa con sus plantillas | `200` |
| Catálogo | `GET /api/programs/{programId}/templates/{templateId}` | Plantilla con sus ejercicios prescritos | `200` |
| Inscripciones | `POST /api/enrollments` | Activar un programa y generar el calendario | `201` |
| Inscripciones | `GET /api/enrollments/active` | Inscripción activa, si existe | `200` |
| Inscripciones | `GET /api/enrollments` | Historial de inscripciones | `200` |
| Inscripciones | `GET /api/enrollments/{enrollmentId}` | Detalle de una inscripción | `200` |
| Sesiones | `GET /api/enrollments/{enrollmentId}/sessions` | Calendario de la inscripción | `200` |
| Sesiones | `GET /api/sessions/today` | Sesión de hoy y la próxima | `200` |
| Sesiones | `GET /api/sessions/{sessionId}` | Detalle de una sesión con prescripción y registros | `200` |
| Sesiones | `POST /api/sessions/{sessionId}/complete` | Finalizar explícitamente la sesión | `200` |
| Registros | `POST /api/sessions/{sessionId}/sets` | Registrar una serie realizada | `201` |
| Registros | `PATCH /api/sessions/{sessionId}/sets/{setId}` | Editar una serie | `200` |
| Registros | `DELETE /api/sessions/{sessionId}/sets/{setId}` | Borrar una serie | `204` |
| Progreso | `GET /api/enrollments/{enrollmentId}/progress` | Resumen: semana, recuentos por estado y adherencia | `200` |
| Progreso | `GET /api/enrollments/{enrollmentId}/progress/exercises` | Desempeño por ejercicio: prescrito frente a realizado | `200` |
| Técnico | `GET /api/health` | Comprobar que el backend responde y que PostgreSQL es accesible. Público, sin datos de usuario (DEV-001) | `200` |

No hay rutas de escritura del catálogo ni de administración (2.5). Tampoco hay rutas para reabrir, reprogramar o cambiar el estado de sesiones cerradas, porque están fuera del alcance del MVP (1.2).

#### Autenticación, cookies y CSRF [Propuesta, según 2.5]

**Cookie de sesión**

| Entorno | Cookie | Atributos |
|---------|--------|-----------|
| Producción | `__Host-session=<JWT>` | `HttpOnly; Secure; SameSite=Lax; Path=/`, sin `Domain`. `Max-Age=604800`, 7 días absolutos, sin renovación automática (**DP-15, confirmada**). Al caducar, hay que volver a iniciar sesión. |
| Desarrollo y E2E local (`http://localhost`, a través del *proxy* de Vite) | `session=<JWT>` | `HttpOnly; SameSite=Lax; Path=/`, sin `Secure` ni el prefijo `__Host-`, porque el prefijo exige `Secure` y no todos los navegadores aceptan cookies `Secure` en `http://localhost`; WebKit es uno de ellos. |
| E2E similar a producción (*build* servido por Express sobre HTTPS local o en el entorno desplegado) | `__Host-session=<JWT>` | Los mismos que en producción. |

- El nombre y los atributos se fijan en la configuración (`NODE_ENV`, `APP_ORIGIN`). La cookie relajada solo se permite con `NODE_ENV=development` o `test`. Con cualquier otro valor, el servidor **se niega a iniciar** si la cookie no es `__Host-session` con `Secure` o si `APP_ORIGIN` no es `https`.
- Al iniciar sesión, la cookie se envía con `Set-Cookie`. Al cerrarla, se envía la misma cookie vacía con `Max-Age=0`.
- El JWT contiene `sub`, `ver`, `iat` y `exp` y se firma con HS256. Se rechazan otros algoritmos, incluido `none`. En cada petición se compara `ver` con `users.token_version` (2.5).
- La API **nunca** devuelve el JWT en el cuerpo de una respuesta.

**Orden de los controles en cada petición** (los primeros responden antes):
1. `helmet` y `X-Request-Id`.
2. **CSRF** en **todas** las peticiones `POST`, `PUT`, `PATCH` y `DELETE` bajo `/api`, tengan cuerpo o no, **incluidos `register`, `login` y `logout`**:
   - si llega `Origin`, debe ser exactamente `APP_ORIGIN`; si no coincide, o vale `null` → `403`;
   - sin `Origin`: si llega `Sec-Fetch-Site`, debe valer `same-origin`; si no llega, el origen de `Referer` debe coincidir con `APP_ORIGIN`; sin ninguna de las dos cabeceras → `403`;
   - `X-CSRF-Protection: 1` es obligatoria; si falta → `403`.

   Los clientes que no son navegadores (curl, Supertest) envían `Origin` explícitamente. La comprobación CSRF **no depende del cuerpo**, así que protege igual las operaciones sin cuerpo.
3. **Cuerpo y tipo de contenido:**
   - **Operaciones con cuerpo** (`register`, `login`, `PATCH /api/profile`, `POST /api/enrollments` y `POST`/`PATCH` de series): `Content-Type: application/json` obligatorio; si no → `415`.
   - **Operaciones sin cuerpo** (`POST /api/auth/logout`, `POST /api/sessions/{id}/complete` y `DELETE /api/sessions/{id}/sets/{setId}`): **no** se exige `Content-Type`. Si llega un cuerpo no vacío → `400 VALIDATION_ERROR`, sea cual sea su tipo.

   Así no hace falta enviar un `{}` artificial, y la protección sigue siendo la del paso 2: una página de otro sitio puede enviar un `POST` sin cuerpo con un formulario, pero sin `X-CSRF-Protection` y con un `Origin` ajeno o `null`.
4. **Límite de peticiones** (`express-rate-limit`) en `register` y `login`: si se supera → `429` con `Retry-After`. Los umbrales concretos se fijarán al implementar.
5. **Autenticación:** sin cookie, JWT inválido, caducado, con otro algoritmo o con `ver` antiguo → `401`.
6. **Validación** con Zod de parámetros, *query* y cuerpo → `400`.
7. **Servicio:** reglas de negocio y transacciones (`404`, `409`, `422`, `503`).

Las peticiones `GET` no pasan por CSRF. Su única escritura es la reconciliación documentada en las convenciones, que es idempotente y no depende de ningún dato de la petición (2.2 y 2.5).

**Diferencias entre desarrollo y producción que deben cubrir las pruebas E2E [Propuesta]**

| Aspecto | Desarrollo (*proxy* de Vite) | Producción y E2E similar a producción | Prueba que lo cubre |
|---------|------------------------------|----------------------------------------|---------------------|
| Cookie | `session`, sin `Secure` | `__Host-session`, con `Secure` | E2E similar a producción: iniciar sesión, recargar la página y comprobar que se conserva la sesión. API-10 comprueba los atributos |
| Esquema y `APP_ORIGIN` | `http://localhost:<puerto>` | `https://…` | E2E similar a producción: `Origin` correcto aceptado y uno ajeno rechazado (API-02) |
| Origen de la SPA | Servidor de Vite, con `/api` redirigido al backend | Express sirve el *build* y `/api` | E2E similar a producción sobre el *build* |
| `helmet`: HSTS y CSP | La CSP puede relajarse por la recarga en caliente de Vite | HSTS y `default-src 'self'` | E2E similar a producción: sin errores de CSP en la consola del navegador |
| `trust proxy` y límite de peticiones por IP | Sin *proxy* inverso | Detrás del *proxy* de la plataforma PaaS | Comprobación manual en el entorno desplegado, que E2E local no reproduce |
| Reloj configurable | Disponible solo con `NODE_ENV=test` | No disponible | Las pruebas que dependen de la medianoche solo se ejecutan en el perfil de desarrollo o pruebas |

Los dos perfiles se complementan: el de desarrollo cubre los flujos y el control del tiempo, y el similar a producción cubre la cookie, HTTPS y las cabeceras.

**Autorización por propietario**
- Toda consulta sobre inscripciones, sesiones, registros y progreso filtra por `enrollments.user_id = userId` del JWT.
- Un recurso de otro usuario responde **igual** que uno inexistente: `404`, `NOT_FOUND`, mismo mensaje y mismo formato.
- Un `setId` que no pertenece al `sessionId` de la ruta también responde `404`.
- No hay roles. El catálogo es legible por cualquier usuario autenticado.

**Respuestas que no revelan información**
- `login`: el mismo `401 INVALID_CREDENTIALS` si el email no existe o la contraseña es incorrecta. Se calcula un *hash* de relleno cuando el usuario no existe, para que el tiempo de respuesta no lo delate.
- Ningún mensaje de error incluye datos de otros usuarios, identificadores internos que no sean del propio usuario, SQL ni trazas. En producción, un `500` solo devuelve `INTERNAL_ERROR` y el `requestId`.
- `register` con un email ya registrado responde `409 EMAIL_ALREADY_REGISTERED`, lo que **revela que la cuenta existe**. Es un riesgo aceptado provisionalmente (ver riesgos): evitarlo exigiría verificar el email, y eso está fuera del MVP.

**Validación de entradas** (Zod, en modo estricto: los campos desconocidos → `400`):
- Email con formato válido, normalizado con `trim` y minúsculas antes de buscarlo o guardarlo, tal como lo exige el `CHECK` de 3.2.
- Contraseña con longitud mínima (2.5); el valor exacto se fijará al implementar.
- `timezone`: debe ser una zona IANA aceptada por `Intl.DateTimeFormat`.
- `availableWeekdays`: de 2 a 6 enteros **distintos** entre 0 y 6.
- Identificadores de ruta: formato `uuid`; si no lo tienen → `400`.
- `setNumber`, `reps` y `durationSeconds`: enteros dentro del rango de `smallint`, con los mínimos de 3.2.
- Tamaño máximo del cuerpo JSON: unos pocos KB, con el valor exacto al implementar. Si se supera → `413`.

#### Formato de errores [Propuesta]

Todas las respuestas de error usan la misma estructura:

```json
{
  "error": {
    "code": "SESSION_NOT_OPEN",
    "message": "La sesión ya está cerrada y no admite cambios.",
    "details": {},
    "requestId": "b3f1c2d4-6a7e-4f0b-9c1d-2e3f4a5b6c7d"
  }
}
```

- `code` es estable y está pensado para la SPA. `message` es para personas y puede cambiar.
- **Idioma de los mensajes [Propuesta]:**
  - `message` es un texto **técnico**, para desarrollo y *logs*, y **la interfaz no lo muestra**. La SPA traduce cada error a partir de `code`, con las claves `errors.<CODE>` (DEV-038, `docs/design-system.md` sección 8). Por eso los ejemplos de `message` de esta sección pueden estar en español sin afectar a la interfaz, que es solo en inglés;
  - el contrato de la API **no se localiza**: rutas, campos JSON, estados, `code` del catálogo y códigos de error son iguales en cualquier idioma, y la API no usa `Accept-Language` en el MVP;
  - si se decide que los mensajes técnicos también se escriban en inglés, es un cambio de redacción y no del contrato.
- `details` es opcional. En los errores de validación contiene `fields`, por ejemplo `[{ "path": "availableWeekdays", "message": "Deben ser días distintos" }]`.

**Matriz de códigos HTTP**

| HTTP | Significado en esta API | Códigos de error |
|------|-------------------------|------------------|
| `400` | Petición mal formada: JSON inválido, tipos, rangos, campos desconocidos o que faltan, `uuid` mal formado | `MALFORMED_JSON`, `VALIDATION_ERROR` |
| `401` | No autenticado: falta la cookie o el JWT no es válido, está caducado o revocado. También credenciales incorrectas | `UNAUTHENTICATED`, `INVALID_CREDENTIALS` |
| `403` | Operación prohibida: comprobación CSRF fallida (`Origin`, `Sec-Fetch-Site`, `Referer` o `X-CSRF-Protection`). No se usa para recursos de otros usuarios | `CSRF_REJECTED` |
| `404` | Recurso inexistente **o** no visible para el usuario, o ruta desconocida | `NOT_FOUND` |
| `409` | Conflicto con el **estado actual** del recurso o con una restricción de unicidad | `EMAIL_ALREADY_REGISTERED`, `ACTIVE_ENROLLMENT_EXISTS`, `SESSION_NOT_OPEN`, `SESSION_NOT_TODAY`, `SET_ALREADY_EXISTS`, `NO_SETS_LOGGED` (DP-09), `AVAILABILITY_LOCKED` (DP-06) |
| `413` | Cuerpo demasiado grande | `PAYLOAD_TOO_LARGE` |
| `415` | El tipo de contenido no es `application/json` | `UNSUPPORTED_MEDIA_TYPE` |
| `422` | Petición bien formada pero **incompatible con las reglas de negocio** o con los datos a los que hace referencia | `PROFILE_INCOMPLETE`, `PROGRAM_NOT_FOUND`, `PROGRAM_INCOMPATIBLE`, `PRESCRIPTION_MISMATCH`, `MEASUREMENT_MISMATCH`, `SET_NUMBER_OUT_OF_RANGE` |
| `429` | Límite de peticiones superado, con `Retry-After` | `RATE_LIMITED` |
| `500` | Error no controlado, sin detalles en producción | `INTERNAL_ERROR` |
| `503` | Bloqueo no resuelto tras el reintento acotado (`40P01`/`55P03`, 2.2). La transacción se anuló y no se guardó nada. En `GET /api/health`, PostgreSQL no es accesible | `TEMPORARILY_UNAVAILABLE` |

**Criterio entre `409` y `422`:**
- `409` cuando el problema es el estado actual del recurso al que se dirige la petición: la sesión ya está cerrada o no es de hoy, ya hay un programa activo, la serie ya existe. Repetir la petición más tarde podría tener otro resultado. Es el criterio de 2.2 para "no `planned`" o "fecha distinta de hoy".
- `422` cuando el contenido de la petición no encaja con las reglas o con los datos que referencia: una prescripción de otra plantilla, un programa sin plantillas para el N del usuario, un perfil sin disponibilidad. Repetir la misma petición dará el mismo error mientras no cambien esos datos.
- Una referencia del **cuerpo** que no existe (`programId`, `templateExerciseId`) responde `422`. `404` se reserva para los recursos de la **ruta**.

#### Técnico

**`GET /api/health`** [Implementado en DEV-001]
- **Propósito:** comprobación técnica de integración, no funcionalidad de negocio. Lo usan la vista de diagnóstico y el *smoke* E2E.
- **Autenticación:** no requiere (excepción documentada en las convenciones generales). No pasa por CSRF porque es un `GET` sin efectos.
- **Comportamiento:** ejecuta `SELECT 1` con un tiempo máximo de 2 s. Responde con `Cache-Control: no-store`.
- **Respuesta `200`:** `{ "status": "ok", "database": "up" }`.
- **Respuesta `503`:** `{ "error": { "code": "TEMPORARILY_UNAVAILABLE", "message": "Database is unavailable.", "details": { "database": "down" } } }`. No incluye la causa interna ni la cadena de conexión, que solo van al *log*.
- **Pendiente:** el campo `requestId` del formato de errores se añadirá cuando exista `X-Request-Id` (DEV-003).

#### Autenticación

**`POST /api/auth/register`**
- **Propósito:** crear una cuenta (F1) e iniciar sesión en la misma respuesta.
- **Autenticación:** no requiere. Sí pasa por CSRF y por el límite de peticiones.
- **Cuerpo:** `{ "email": "ana@example.com", "password": "********", "timezone": "Europe/Madrid" }`. La SPA envía `timezone` a partir de `Intl.DateTimeFormat().resolvedOptions().timeZone`, porque `users.timezone` es NOT NULL (3.2).
- **Respuesta `201`:** `Set-Cookie` y `{ "user": { "id": "…", "email": "ana@example.com", "timezone": "Europe/Madrid", "availableWeekdays": null } }`.
- **Errores:** `400`, `403`, `409 EMAIL_ALREADY_REGISTERED`, `415`, `429`.
- **Reglas:** se guarda el *hash* de la contraseña, nunca la contraseña, y nunca se escribe en *logs*. `availableWeekdays` empieza en `null` hasta que se configura (flujo principal, paso 2).

**`POST /api/auth/login`**
- **Propósito:** iniciar sesión.
- **Cuerpo:** `{ "email": "…", "password": "…" }`.
- **Respuesta `200`:** `Set-Cookie` y `{ "user": { … } }`, con la misma forma que en el registro.
- **Errores:** `400`, `401 INVALID_CREDENTIALS` (mensaje genérico), `403`, `415`, `429`.

**`GET /api/auth/me`**
- **Propósito:** saber si hay sesión y quién es el usuario, al cargar la SPA.
- **Respuesta `200`:** `{ "user": { "id", "email", "timezone", "availableWeekdays" } }`.
- **Errores:** `401`.

**`POST /api/auth/logout`**
- **Propósito:** cerrar sesión.
- **Cuerpo:** ninguno. No necesita `Content-Type` (operación sin cuerpo). Sí exige la comprobación CSRF completa: `Origin` y `X-CSRF-Protection`.
- **Respuesta `204`:** incrementa `users.token_version` y borra la cookie con `Max-Age=0`. Cierra la sesión en todos los dispositivos (2.5).
- **Errores:**
  - `403` si falla la comprobación CSRF: un *logout CSRF* desde otro sitio no tiene efecto;
  - `400` si llega un cuerpo no vacío.

  Sin sesión válida responde también `204` y borra la cookie, así que es idempotente.

#### Perfil

**`GET /api/profile`**
- **Respuesta `200`:** `{ "timezone": "Europe/Madrid", "availableWeekdays": [1, 3, 5] }`.
- **Errores:** `401`.

**`PATCH /api/profile`**
- **Propósito:** configurar o cambiar los días fijos (F2) o la zona horaria.
- **Cuerpo:** al menos uno de estos campos: `{ "availableWeekdays": [1, 3, 5] }` o `{ "timezone": "America/Bogota" }`.
- **Respuesta `200`:** el perfil completo, con la misma forma que en `GET`.
- **Errores:** `400` (días repetidos, menos de 2 o más de 6, fuera de 0–6, zona no válida, cuerpo vacío), `401`, `403`, `409 AVAILABILITY_LOCKED`, `415`, `503`.
- **Reglas:**
  - **No se pueden cambiar los días mientras haya un programa activo** [Confirmada, DP-06]. Si el cuerpo incluye `availableWeekdays`:
    - el servidor reconcilia primero;
    - después, con la fila de `users` bloqueada, comprueba que no haya ninguna inscripción `active`;
    - si la hay, responde `409 AVAILABILITY_LOCKED` y no cambia nada, ni siquiera la zona horaria que llegue en la misma petición.

    La restricción la aplica el backend: desactivar el control en la interfaz no basta.
  - **Cambiar la zona horaria se permite**, también con un programa activo, y no recalcula fechas. Solo cambia cuándo vence una sesión (riesgo aceptado en 2.1). DP-06 no la bloquea; ver la cuestión independiente en 1.2.
  - La SPA desactiva el selector de días mientras hay un programa activo, explica por qué y avisa del efecto de cambiar la zona.

#### Catálogo

Lectura para cualquier usuario autenticado. No requiere reconciliación.

**`GET /api/programs`**
- **Respuesta `200`:**

  ```json
  {
    "programs": [
      {
        "id": "0b6a3c1e-2f4d-4e5a-9b7c-1d2e3f4a5b6c",
        "code": "upper-body-8w",
        "name": "Fuerza tren superior",
        "description": "Programa ilustrativo: el contenido real está pendiente.",
        "level": "intermedio",
        "goal": "Progresar en empujes y tracciones",
        "durationWeeks": 6,
        "slots": ["PUSH_A", "PULL_A", "PUSH_PULL_A", "PUSH_B", "PULL_B"]
      }
    ]
  }
  ```

  `slots` es **derivado**: los huecos que tienen plantilla (`session_templates.slot`). Sirve para que la SPA muestre con qué números de días es compatible el programa. Todos los valores son ilustrativos: el número de programas está confirmado (3, DP-02), pero su contenido sigue por definir (1.2).
- **Errores:** `401`.

**`GET /api/programs/{programId}`**
- **Respuesta `200`:** los campos del programa más:
  - `templates`: `[{ "id", "slot", "name", "description" }]`;
  - `weeklySequence` (**derivado**): la secuencia de huecos de `WEEKLY_SEQUENCES[N]` para el N del perfil del usuario, por ejemplo `["PUSH_A", "PULL_A", "PUSH_PULL_A"]`, o `null` si aún no ha configurado su disponibilidad (flujo principal, paso 3);
  - `compatible` (**derivado**): `true` si hay una plantilla para cada hueco de esa secuencia.
- **Errores:** `400` (`uuid` mal formado), `401`, `404`.

**`GET /api/programs/{programId}/templates/{templateId}`**
- **Parámetros de *query*:** `week` (opcional, entero ≥ 1). Sin `week` se devuelven todas las semanas.
- **Respuesta `200`:**

  ```json
  {
    "template": { "id": "5c1d…", "slot": "PUSH_A", "name": "Push A", "description": null },
    "prescriptions": [
      {
        "id": "9e8d7c6b-5a49-4382-a1b0-c9d8e7f6a5b4",
        "weekNumber": 1,
        "position": 1,
        "exercise": { "id": "…", "code": "pike-push-up", "name": "Pike push-up", "description": null, "measurement": "reps" },
        "measurement": "reps",
        "targetSets": 3,
        "targetReps": 8,
        "targetSeconds": null,
        "restSeconds": 120
      }
    ]
  }
  ```

- **Errores:** `400` (`week` no válido), `401`, `404` (el programa no existe, o la plantilla no existe o pertenece a otro programa).

#### Inscripciones

**`POST /api/enrollments`** (ver también OpenAPI)
- **Propósito:** activar un programa y generar su calendario materializado (F4, flujo 1 de 2.2).
- **Cuerpo:** `{ "programId": "0b6a3c1e-…" }`.
- **Pasos:**
  1. `reconcile(userId, now)`, en su propia transacción y **antes** de comprobar si hay un programa activo. Una inscripción cuya última sesión ya venció pasa así a `finished`. No garantiza que la anterior termine: si le quedan sesiones `planned` de hoy o futuras, sigue `active` y la respuesta es `409`.
  2. Comprobar el perfil, que no haya otra inscripción activa y que el programa sea compatible. Es una lectura sin bloqueo.
  3. `scheduler.generate(...)`.
  4. Una sola transacción (T-activación): la inscripción y sus `N × semanas` sesiones en `planned`. El índice único parcial es lo que garantiza que no haya dos activas ("Carreras en la activación", 2.2).
- **Respuesta `201`:** `Location: /api/enrollments/{id}` y

  ```json
  {
    "enrollment": {
      "id": "6f1c2d3e-4b5a-4c7d-8e9f-0a1b2c3d4e5f",
      "programId": "0b6a3c1e-2f4d-4e5a-9b7c-1d2e3f4a5b6c",
      "status": "active",
      "weekdays": [1, 3, 5],
      "durationWeeks": 6,
      "activatedAt": "2026-11-18T19:42:10.000Z",
      "finishedAt": null,
      "startDate": "2026-11-20",
      "endDate": "2026-12-30",
      "sessionCount": 18
    }
  }
  ```

  En el ejemplo, la activación es un miércoles y el calendario empieza el viernes 20, el siguiente día elegido. Si la activación fuera un lunes, día elegido, también quedaría excluido y el programa empezaría el miércoles (DP-01). Con 3 días y 6 semanas hay 18 sesiones (DP-04). `startDate`, `endDate` y `sessionCount` son **derivados**: se obtienen de la primera y la última sesión y del total.
- **Errores:**
  - `400`;
  - `401`;
  - `403`;
  - `409 ACTIVE_ENROLLMENT_EXISTS`: ya hay una activa, también si el índice parcial devuelve `23505` en una carrera. Puede deberse a una carrera momentánea con T-finalizar o T-cierre, así que el cliente vuelve a consultar antes de reintentar (ver "Reintentos e idempotencia");
  - `415`;
  - `422 PROFILE_INCOMPLETE`: sin `availableWeekdays`;
  - `422 PROGRAM_NOT_FOUND`;
  - `422 PROGRAM_INCOMPATIBLE`: falta la plantilla de algún hueco o la prescripción de alguna semana;
  - `503`.
- **Reglas:**
  - **Una sola inscripción activa por usuario** [Confirmada, DP-07], garantizada por el índice único parcial.
  - **El día de activación queda excluido** aunque sea un día elegido: la primera sesión es el siguiente día elegido posterior, según la zona del perfil [Confirmada, DP-01].
  - No hay forma de abandonar un programa (2.1).

**`GET /api/enrollments/active`**
- **Respuesta `200`:** `{ "enrollment": { … } }`, con la misma forma que en `201`, o `{ "enrollment": null }` si no hay ninguna activa. No tener programa activo es un estado normal y no un error, así que no se responde `404`.
- **Errores:** `401`, `503`.

**`GET /api/enrollments`**
- **Respuesta `200`:** `{ "enrollments": [ … ] }`, ordenadas por `activatedAt` de más reciente a más antigua, incluidas las `finished`. Cada una incluye `program: { "id", "code", "name" }`.
- **Errores:** `401`, `503`.

**`GET /api/enrollments/{enrollmentId}`**
- **Respuesta `200`:** la inscripción con `program`.
- **Errores:** `400`, `401`, `404` (no existe o es de otro usuario), `503`.

#### Sesiones

**Forma de una sesión.** El resumen se usa en el calendario; el detalle, en la sesión de hoy y en `GET /api/sessions/{id}`:

```json
{
  "id": "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
  "enrollmentId": "6f1c2d3e-4b5a-4c7d-8e9f-0a1b2c3d4e5f",
  "sequenceIndex": 0,
  "weekNumber": 1,
  "scheduledDate": "2026-11-20",
  "status": "planned",
  "completedAt": null,
  "closedAt": null,
  "template": { "id": "5c1d…", "slot": "PUSH_A", "name": "Push A" },
  "canLog": true,
  "prescriptions": [ { "id": "9e8d…", "position": 1, "exercise": { "…": "…" }, "measurement": "reps", "targetSets": 3, "targetReps": 8, "targetSeconds": null, "restSeconds": 120 } ],
  "sets": [ { "id": "c7d8…", "templateExerciseId": "9e8d…", "measurement": "reps", "setNumber": 1, "reps": 8, "durationSeconds": null, "createdAt": "2026-11-20T18:05:12.000Z", "updatedAt": "2026-11-20T18:05:12.000Z" } ]
}
```

- `canLog` es **derivado**: `true` si `status = 'planned'` y `scheduledDate` es hoy en la zona del usuario. Sirve para que la SPA desactive acciones; la API lo vuelve a comprobar en cada escritura.
- `prescriptions` son las de la plantilla **para la semana de la sesión** (`week_number`). `prescriptions` y `sets` solo aparecen en el detalle.

**`GET /api/enrollments/{enrollmentId}/sessions`**
- **Propósito:** el calendario (F5).
- **Parámetros de *query*:** `from` y `to` (fechas opcionales, con `from` ≤ `to`) y `status` (opcional: `planned`, `completed`, `partial` o `skipped`).
- **Respuesta `200`:** `{ "sessions": [ resumen… ] }`, ordenadas por `sequenceIndex`.
- **Errores:** `400`, `401`, `404`, `503`.

**`GET /api/sessions/today`**
- **Propósito:** la sesión de hoy o la próxima (F5).
- **Respuesta `200`:**
  - `today` (**derivado**): fecha local del usuario;
  - `timezone`;
  - `session`: detalle de la sesión con `scheduledDate = today` en la inscripción activa, o `null`. Puede estar ya `completed`, en cuyo caso `canLog` es `false`;
  - `nextSession`: resumen de la siguiente sesión `planned` posterior a hoy, o `null`.

  Sin inscripción activa, `session` y `nextSession` valen `null`.
- **Errores:** `401`, `503`.

**`GET /api/sessions/{sessionId}`**
- **Respuesta `200`:** el detalle de la sesión.
- **Errores:** `400`, `401`, `404`, `503`.

**`POST /api/sessions/{sessionId}/complete`** (ver también OpenAPI)
- **Propósito:** finalización explícita (F6). Es **la única forma** de llegar a `completed` [Confirmada].
- **Cuerpo:** ninguno. No necesita `Content-Type` (operación sin cuerpo; un cuerpo no vacío → `400`). Sí pasa por la comprobación CSRF completa.
- **Transacción:** T-finalizar (2.2), con la sesión bloqueada y `now` tomado después del bloqueo. El orden coincide con el paso 3 de T-finalizar en 2.2.
- **Orden de comprobación:**
  1. la sesión no existe o es de otro usuario → `404`. La autorización va siempre primero;
  2. ya está `completed` → `200` con la sesión sin cambios, **aunque su fecha ya haya pasado**. No escribe nada, es idempotente y `completedAt` no cambia;
  3. está `partial` o `skipped` → `409 SESSION_NOT_OPEN`;
  4. está `planned` pero su fecha no es hoy → `409 SESSION_NOT_TODAY`;
  5. está `planned`, es de hoy, pero no tiene ninguna serie registrada → `409 NO_SETS_LOGGED` (DP-09);
  6. si no, `planned → completed`.

  Si con ello no quedan sesiones `planned`, la inscripción pasa a `finished`.
- **Respuesta `200`:** `{ "session": { …detalle… }, "enrollmentStatus": "active" }`. `enrollmentStatus` vale `finished` si era la última sesión.
- **Errores:** `400`, `401`, `403`, `404`, `409`, `503`.
- **Reglas:** hace falta **al menos una serie registrada**, aunque no todas las prescritas [Confirmada, DP-09]. El botón "Finish" de la SPA está desactivado hasta entonces, pero la regla la aplica el backend.

#### Registros de series

Las tres operaciones siguen **T-registro** (2.2):
- bloquean la sesión con `FOR UPDATE`;
- toman `now` después del bloqueo;
- exigen que la sesión sea `planned` y de hoy en la zona del usuario.

**Nunca cambian el estado de la sesión** [Confirmada]. Los estados finales no admiten escrituras [Confirmada].

**Orden de comprobación común:**
1. `404`: la sesión, o la serie en `PATCH` y `DELETE`, no existe, es de otro usuario o la serie no pertenece a esa sesión.
2. `409 SESSION_NOT_OPEN`: la sesión es `completed`, `partial` o `skipped`.
3. `409 SESSION_NOT_TODAY`: la sesión es `planned` pero su fecha no es hoy. Pasa con las sesiones futuras y con las vencidas que aún no se han reconciliado (C4c en 2.6).
4. Reglas del contenido (`422`), solo en `POST`.

**`POST /api/sessions/{sessionId}/sets`** (ver también OpenAPI)
- **Cuerpo:** `{ "templateExerciseId": "9e8d…", "setNumber": 1, "reps": 8 }`, o con `"durationSeconds": 30` en lugar de `reps`. Debe llegar exactamente uno de los dos (`400` si llegan los dos o ninguno).
- **Reglas de contenido (`422`):**
  - `PRESCRIPTION_MISMATCH`: `templateExerciseId` no existe, o no pertenece a la plantilla **y** a la semana de la sesión (regla transaccional 8 de 3.2).
  - `MEASUREMENT_MISMATCH`: se envía `reps` para un ejercicio medido en tiempo, o al revés.
  - `SET_NUMBER_OUT_OF_RANGE`: `setNumber` es mayor que `targetSets`. **Solo se admiten las series prescritas** [Confirmada, DP-10]. El backend lo aplica aunque la interfaz ya limite las filas.
- **Unicidad:** si ya existe una serie con la misma `(session, templateExercise, setNumber)` → `409 SET_ALREADY_EXISTS`, con la serie guardada en `details.existingSet`. Esa serie es del propio usuario, así que no se revela información ajena.
- **Respuesta `201`:** `Location` y `{ "set": { … } }`.
- **Errores:** `400`, `401`, `403`, `404`, `409`, `415`, `422`, `503`.
- **Nota:** en los ejercicios `time` se registran los **segundos** hechos (`durationSeconds`), y en los `reps`, el número de repeticiones. Las unidades nunca se convierten ni se mezclan [Confirmada, DP-11].

**`PATCH /api/sessions/{sessionId}/sets/{setId}`**
- **Cuerpo:** `{ "reps": 7 }` o `{ "durationSeconds": 25 }`, según la forma de medida de la serie. `templateExerciseId`, `setNumber` y `measurement` no se pueden cambiar (`400` si se envían).
- **Respuesta `200`:** `{ "set": { … } }`, con `updatedAt` actualizado.
- **Errores:** `400`, `401`, `403`, `404`, `409`, `415`, `422 MEASUREMENT_MISMATCH`, `503`.

**`DELETE /api/sessions/{sessionId}/sets/{setId}`**
- **Respuesta `204`.** Es un borrado físico (3.2). Si se borran todos los registros antes de medianoche, la sesión se cerrará como `skipped` (2.2).
- **Errores:** `400`, `401`, `403`, `404` (también si la serie ya se había borrado), `409`, `503`.

#### Progreso

**`GET /api/enrollments/{enrollmentId}/progress`**
- **Propósito:** el panel de progreso (F8). Todos los valores son **derivados**; no hay columnas de progreso (3.2).
- **Respuesta `200`:**

  ```json
  {
    "enrollmentId": "6f1c2d3e-4b5a-4c7d-8e9f-0a1b2c3d4e5f",
    "status": "active",
    "currentWeek": 3,
    "totalWeeks": 6,
    "counts": { "planned": 11, "completed": 5, "partial": 1, "skipped": 1, "total": 18 },
    "adherence": 78.6
  }
  ```

  - `counts` muestra `completed`, `partial` y `skipped` **por separado** [Confirmada, CE4 y F8].
  - `currentWeek`: el `weekNumber` de la sesión de hoy o de la próxima `planned`; si no queda ninguna, la última.
  - `adherence`: porcentaje de 0 a 100 calculado como `100 × (completed + 0,5 × partial) / (completed + partial + skipped)` [Confirmada, DP-12 y DP-13], sobre los estados reconciliados. Las `planned`, incluida la de hoy, no cuentan. Vale `null` si no hay sesiones evaluables, nunca 0 ni una división entre cero.
    - En el ejemplo: 100 × (5 + 0,5) / 7 = 78,57.
    - El redondeo a un decimal es una [Propuesta] técnica.
    - No es el porcentaje de series hechas ni una medida del desempeño.
- **Errores:** `400`, `401`, `404`, `503`.

**`GET /api/enrollments/{enrollmentId}/progress/exercises`**
- **Parámetros de *query*:** `exerciseId` (opcional).
- **Respuesta `200`:** prescrito frente a realizado (F9):

  ```json
  {
    "exercises": [
      {
        "exercise": { "id": "…", "code": "pike-push-up", "name": "Pike push-up", "measurement": "reps" },
        "sessions": [
          {
            "sessionId": "a1b2…",
            "scheduledDate": "2026-11-20",
            "weekNumber": 1,
            "status": "completed",
            "prescribed": { "targetSets": 3, "targetReps": 8, "targetSeconds": null },
            "performed": [ { "setNumber": 1, "reps": 8, "durationSeconds": null }, { "setNumber": 2, "reps": 7, "durationSeconds": null } ]
          }
        ]
      }
    ]
  }
  ```

  Incluye las sesiones `partial` con sus registros. Las `skipped` y `planned` no tienen nada realizado y no aparecen.
- **Errores:** `400`, `401`, `404`, `503`.

#### Reintentos e idempotencia [Propuesta]

**Principio.** Una restricción `UNIQUE` **evita filas duplicadas**, pero **no hace idempotente un endpoint**. Un `POST` repetido no devuelve la misma respuesta que el primero: devuelve un conflicto. La recuperación tras un fallo de red es responsabilidad explícita del cliente, que sigue las reglas de esta tabla. No se usa una cabecera `Idempotency-Key`, porque exigiría guardar las claves y sus respuestas en una tabla que el modelo de 3.2 no tiene. Si se quiere, es una decisión pendiente para el modelo de datos.

| Situación | `POST /api/sessions/{id}/sets` | `POST /api/enrollments` |
|-----------|-------------------------------|-------------------------|
| El servidor responde `503` | La transacción se anuló y no se guardó nada. El cliente **puede reintentar** la misma petición, con una espera y un límite de intentos. | Igual: se puede reintentar. |
| El servidor responde `409` | **No reintentar.** Si es `SET_ALREADY_EXISTS`, el cliente consulta el registro actual con `GET /api/sessions/{id}`; `details.existingSet` es solo informativo y puede estar desfasado. Si la serie guardada tiene los valores enviados, lo trata como éxito. Si no, se la muestra al usuario, que decide si la edita con `PATCH`. **No se convierte automáticamente en un *upsert*.** Con `SESSION_NOT_OPEN` o `SESSION_NOT_TODAY`, la sesión ya no admite cambios: el cliente refresca la vista y no reintenta. | `ACTIVE_ENROLLMENT_EXISTS`: el cliente consulta `GET /api/enrollments/active`. Si la activa es del mismo `programId`, lo trata como éxito. Si es `null`, porque la anterior acaba de terminar en una carrera (2.2), puede reintentar una vez. Si es otra, informa al usuario. |
| Error de red o tiempo agotado: no se sabe si se guardó | **No reintentar a ciegas.** El cliente consulta `GET /api/sessions/{id}`. Si la serie existe con los mismos valores, terminado. Si no existe y `canLog` sigue en `true`, reintenta con el **mismo** `setNumber`; si el primer intento sí se guardó, recibirá `409` y no un duplicado. Si `canLog` es `false`, no reintenta. | Consultar `GET /api/enrollments/active` antes de reintentar. Como el índice parcial impide una segunda activa, un reintento no crea un segundo calendario (DP-07). |
| Reintentos en el servidor | Solo para `40P01`/`55P03`, como mucho 2 veces y antes de responder (2.2). Nunca ante un error de conexión durante el `COMMIT`. | Igual. `23505` **no** se reintenta: se responde `409`. |

- **`setNumber` lo asigna el cliente** a partir de la posición de la serie en la pantalla (serie 1, 2, 3 de ese ejercicio), no "el siguiente libre". Así, reenviar la misma petición choca con el `UNIQUE` en lugar de crear otra serie. Si el cliente calculara un `setNumber` nuevo en cada intento, el `UNIQUE` no evitaría la duplicación (3.2).
- **`setNumber` y el `UNIQUE` evitan duplicados, pero no hacen idempotente la API.** El segundo envío no recibe el `201` del primero, sino un `409`. Además, el servidor no distingue un reenvío de un intento distinto con otros valores. Por eso la decisión final siempre parte de **consultar el estado actual** (`GET /api/sessions/{id}`) y no de la respuesta de error.
- **Tras un fallo de red en `PATCH` o `DELETE`**, el cliente también consulta la sesión antes de repetir la operación.
- **`PATCH`** fija valores absolutos, así que repetirlo deja el mismo estado. Solo cambia `updatedAt`.
- **`DELETE`** repetido deja el mismo estado, pero responde `404` la segunda vez; el cliente lo trata como éxito.
- **`POST …/complete`** sí es idempotente: sobre una sesión `completed` responde `200` sin cambios.
- **`POST /api/auth/logout`** es idempotente (`204`).
- **El programa activo único** (DP-07, confirmado) es lo que protege la activación frente a los reintentos. Si en el futuro se permitieran varios programas activos, haría falta una clave de idempotencia, con su tabla.

#### Especificación OpenAPI de los endpoints principales

Siguiendo la plantilla, estos son los tres endpoints principales: activación, registro de una serie y finalización. Es documentación del contrato, no un fichero ejecutable.

```yaml
openapi: 3.0.3
info:
  title: Cali Coach API (MVP, propuesta)
  version: 0.1.0
servers:
  - url: /api
security:
  - sessionCookie: []
paths:
  /enrollments:
    post:
      summary: Activar un programa y generar el calendario materializado
      parameters:
        - $ref: '#/components/parameters/CsrfHeader'
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              additionalProperties: false
              required: [programId]
              properties:
                programId: { type: string, format: uuid }
      responses:
        '201':
          description: Inscripción activa con todas sus sesiones en planned
          headers:
            Location: { schema: { type: string } }
          content:
            application/json:
              schema:
                type: object
                properties:
                  enrollment: { $ref: '#/components/schemas/Enrollment' }
        '400': { $ref: '#/components/responses/Error' }
        '401': { $ref: '#/components/responses/Error' }
        '403': { $ref: '#/components/responses/Error' }
        '409':
          description: ACTIVE_ENROLLMENT_EXISTS (un solo programa activo, DP-07)
          content:
            application/json:
              schema: { $ref: '#/components/schemas/Error' }
        '415': { $ref: '#/components/responses/Error' }
        '422':
          description: PROFILE_INCOMPLETE, PROGRAM_NOT_FOUND o PROGRAM_INCOMPATIBLE
          content:
            application/json:
              schema: { $ref: '#/components/schemas/Error' }
        '503': { $ref: '#/components/responses/Error' }

  /sessions/{sessionId}/sets:
    post:
      summary: Registrar una serie realizada sin cambiar el estado de la sesión
      parameters:
        - $ref: '#/components/parameters/SessionId'
        - $ref: '#/components/parameters/CsrfHeader'
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              additionalProperties: false
              required: [templateExerciseId, setNumber]
              properties:
                templateExerciseId: { type: string, format: uuid }
                setNumber: { type: integer, minimum: 1, maximum: 32767 }
                reps: { type: integer, minimum: 0, maximum: 32767 }
                durationSeconds: { type: integer, minimum: 0, maximum: 32767 }
              oneOf:
                - required: [reps]
                  not: { required: [durationSeconds] }
                - required: [durationSeconds]
                  not: { required: [reps] }
      responses:
        '201':
          description: Serie registrada; la sesión sigue planned
          headers:
            Location: { schema: { type: string } }
          content:
            application/json:
              schema:
                type: object
                properties:
                  set: { $ref: '#/components/schemas/SetLog' }
        '400': { $ref: '#/components/responses/Error' }
        '401': { $ref: '#/components/responses/Error' }
        '403': { $ref: '#/components/responses/Error' }
        '404': { $ref: '#/components/responses/Error' }
        '409':
          description: SESSION_NOT_OPEN, SESSION_NOT_TODAY o SET_ALREADY_EXISTS (con details.existingSet)
          content:
            application/json:
              schema: { $ref: '#/components/schemas/Error' }
        '415': { $ref: '#/components/responses/Error' }
        '422':
          description: PRESCRIPTION_MISMATCH, MEASUREMENT_MISMATCH o SET_NUMBER_OUT_OF_RANGE
          content:
            application/json:
              schema: { $ref: '#/components/schemas/Error' }
        '503': { $ref: '#/components/responses/Error' }

  /sessions/{sessionId}/complete:
    post:
      summary: Finalizar explícitamente la sesión de hoy (planned a completed)
      parameters:
        - $ref: '#/components/parameters/SessionId'
        - $ref: '#/components/parameters/CsrfHeader'
      responses:
        '200':
          description: Sesión completed; idempotente si ya lo estaba
          content:
            application/json:
              schema:
                type: object
                properties:
                  session: { $ref: '#/components/schemas/Session' }
                  enrollmentStatus: { type: string, enum: [active, finished] }
        '400': { $ref: '#/components/responses/Error' }
        '401': { $ref: '#/components/responses/Error' }
        '403': { $ref: '#/components/responses/Error' }
        '404': { $ref: '#/components/responses/Error' }
        '409':
          description: SESSION_NOT_OPEN (partial o skipped), SESSION_NOT_TODAY o NO_SETS_LOGGED (sin series registradas, DP-09)
          content:
            application/json:
              schema: { $ref: '#/components/schemas/Error' }
        '503': { $ref: '#/components/responses/Error' }

components:
  securitySchemes:
    sessionCookie:
      type: apiKey
      in: cookie
      name: __Host-session
      description: JWT HS256 (sub, ver, iat, exp). En desarrollo, cookie session sin Secure.
  parameters:
    SessionId:
      name: sessionId
      in: path
      required: true
      schema: { type: string, format: uuid }
    CsrfHeader:
      name: X-CSRF-Protection
      in: header
      required: true
      description: Debe valer 1. Además se valida Origin (o Sec-Fetch-Site / Referer).
      schema: { type: string, enum: ['1'] }
  responses:
    Error:
      description: Error con formato uniforme
      content:
        application/json:
          schema: { $ref: '#/components/schemas/Error' }
  schemas:
    Error:
      type: object
      required: [error]
      properties:
        error:
          type: object
          required: [code, message, requestId]
          properties:
            code: { type: string }
            message: { type: string }
            details: { type: object }
            requestId: { type: string }
    Enrollment:
      type: object
      properties:
        id: { type: string, format: uuid }
        programId: { type: string, format: uuid }
        status: { type: string, enum: [active, finished] }
        weekdays: { type: array, items: { type: integer, minimum: 0, maximum: 6 }, minItems: 2, maxItems: 6 }
        durationWeeks: { type: integer, minimum: 1 }
        activatedAt: { type: string, format: date-time }
        finishedAt: { type: string, format: date-time, nullable: true }
        startDate: { type: string, format: date, description: Derivado }
        endDate: { type: string, format: date, description: Derivado }
        sessionCount: { type: integer, description: Derivado }
    Session:
      type: object
      properties:
        id: { type: string, format: uuid }
        enrollmentId: { type: string, format: uuid }
        sequenceIndex: { type: integer, minimum: 0 }
        weekNumber: { type: integer, minimum: 1 }
        scheduledDate: { type: string, format: date }
        status: { type: string, enum: [planned, completed, partial, skipped] }
        completedAt: { type: string, format: date-time, nullable: true }
        closedAt: { type: string, format: date-time, nullable: true }
        canLog: { type: boolean, description: Derivado }
        sets: { type: array, items: { $ref: '#/components/schemas/SetLog' } }
    SetLog:
      type: object
      properties:
        id: { type: string, format: uuid }
        templateExerciseId: { type: string, format: uuid }
        measurement: { type: string, enum: [reps, time] }
        setNumber: { type: integer, minimum: 1 }
        reps: { type: integer, minimum: 0, nullable: true }
        durationSeconds: { type: integer, minimum: 0, nullable: true }
        createdAt: { type: string, format: date-time }
        updatedAt: { type: string, format: date-time }
```

**Ejemplo de petición y respuestas:** registro de una serie y su reenvío.

```http
POST /api/sessions/a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d/sets HTTP/1.1
Origin: https://cali-coach.example
X-CSRF-Protection: 1
Content-Type: application/json
Cookie: __Host-session=<JWT>

{ "templateExerciseId": "9e8d7c6b-5a49-4382-a1b0-c9d8e7f6a5b4", "setNumber": 1, "reps": 8 }
```

```json
{
  "set": {
    "id": "c7d8e9f0-a1b2-4c3d-8e4f-5a6b7c8d9e0f",
    "templateExerciseId": "9e8d7c6b-5a49-4382-a1b0-c9d8e7f6a5b4",
    "measurement": "reps",
    "setNumber": 1,
    "reps": 8,
    "durationSeconds": null,
    "createdAt": "2026-11-20T18:05:12.000Z",
    "updatedAt": "2026-11-20T18:05:12.000Z"
  }
}
```

Si se reenvía la misma petición, la respuesta es `409`:

```json
{
  "error": {
    "code": "SET_ALREADY_EXISTS",
    "message": "Esa serie ya está registrada.",
    "details": { "existingSet": { "id": "c7d8e9f0-a1b2-4c3d-8e4f-5a6b7c8d9e0f", "setNumber": 1, "reps": 8, "durationSeconds": null } },
    "requestId": "e4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8"
  }
}
```

#### Matriz de pruebas de contrato y seguridad propuestas

> Son **propuestas**: no se ha escrito ni ejecutado ninguna. Se implementarían con Vitest y Supertest contra un PostgreSQL de pruebas y un `Clock` fijo (2.6). Las de concurrencia reutilizan el montaje de C1–C8, con dos conexiones y detección de esperas mediante `pg_stat_activity`.

| ID | Área | Escenario | Resultado esperado |
|----|------|-----------|--------------------|
| API-01 | CSRF | `POST /api/sessions/{id}/sets` sin `Origin`, sin `Sec-Fetch-Site` y sin `Referer` | `403 CSRF_REJECTED`. No se inserta nada |
| API-02 | CSRF | `Origin` de otro dominio, o `Origin: null` | `403` |
| API-03 | CSRF | Sin `Origin`, con `Sec-Fetch-Site: cross-site`; o con `Referer` de otro origen | `403` |
| API-04 | CSRF | `Origin` correcto pero sin `X-CSRF-Protection` | `403` |
| API-05 | CSRF | `Content-Type: text/plain` o un formulario | `415` |
| API-06 | CSRF | `POST /api/auth/login` desde otro origen (*login CSRF*) | `403`, sin `Set-Cookie` |
| API-07 | Autenticación | Login con un email que no existe y con una contraseña incorrecta | El mismo `401 INVALID_CREDENTIALS` y el mismo cuerpo |
| API-08 | Autenticación | JWT caducado, con `alg: none`, con otro algoritmo o con la firma alterada | `401` |
| API-09 | Autenticación | Usar la cookie anterior después de `logout` (`token_version` incrementado) | `401` |
| API-10 | Autenticación | Atributos de `Set-Cookie` con la configuración de producción | `__Host-session`, `HttpOnly`, `Secure`, `SameSite=Lax`, `Path=/`, sin `Domain` y nunca el JWT en el cuerpo |
| API-11 | Autenticación | Superar el límite de `login` | `429 RATE_LIMITED` con `Retry-After` |
| API-12 | Acceso cruzado | El usuario B pide `GET` de la sesión, la inscripción y el progreso del usuario A | `404 NOT_FOUND`, con un cuerpo idéntico al de un `uuid` inexistente |
| API-13 | Acceso cruzado | B intenta `POST`, `PATCH` y `DELETE` de series y `complete` en recursos de A | `404`. Los datos de A no cambian |
| API-14 | Acceso cruzado | `PATCH /api/sessions/{S1}/sets/{setDeS2}` con las dos sesiones del mismo usuario | `404` |
| API-15 | Activación concurrente | Dos `POST /api/enrollments` simultáneos del mismo usuario | Uno `201` y otro `409 ACTIVE_ENROLLMENT_EXISTS`. Una sola inscripción `active` con exactamente `N × semanas` sesiones |
| API-16 | Activación | Perfil sin `availableWeekdays`; programa sin plantilla para algún hueco del N del usuario | `422 PROFILE_INCOMPLETE` y `422 PROGRAM_INCOMPATIBLE`. No se inserta nada |
| API-17 | Activación | Inscripción activa cuya última sesión venció ayer, seguida de `POST /api/enrollments` | La reconciliación previa la pasa a `finished` y la nueva activación responde `201` |
| API-18 | Doble envío | El mismo `POST …/sets` dos veces | `201` y después `409 SET_ALREADY_EXISTS` con `details.existingSet`. Una sola fila |
| API-19 | Doble envío | Dos `POST …/sets` iguales en paralelo | Uno `201` y otro `409`. Una sola fila |
| API-20 | Duplicados frente a idempotencia | Dos `POST …/sets` con el mismo ejercicio y distinto `setNumber` | Dos `201` y dos filas. Documenta que el `UNIQUE` no hace idempotente la API |
| API-21 | Finalización | Registrar series y consultar la sesión | Sigue `planned`. Solo `complete` la pasa a `completed` |
| API-22 | Finalización | `complete` dos veces sobre una sesión con al menos una serie | `200` las dos veces, con el mismo `completedAt` |
| API-23 | Finalización | `complete` sobre una sesión `partial`, sobre una `skipped` y sobre una `planned` futura | `409 SESSION_NOT_OPEN`, `409 SESSION_NOT_OPEN` y `409 SESSION_NOT_TODAY` |
| API-24 | Finalización | `complete` de la última sesión `planned` | `enrollmentStatus: finished`, y `GET /api/enrollments/active` devuelve `null` |
| API-25 | Estados finales | `POST`, `PATCH` y `DELETE` de series en una sesión `completed`, `partial` o `skipped` | `409 SESSION_NOT_OPEN`. Ni los registros ni el estado cambian |
| API-26 | Registro y cierre concurrentes | El equivalente HTTP de C1: un `POST …/sets` con el reloj a las 23:59:59 se bloquea antes del `COMMIT` y un `GET /api/sessions/today` a las 00:00:01 espera | La sesión acaba `partial` y la serie se conserva |
| API-27 | Registro y cierre concurrentes | El equivalente de C2: la reconciliación bloquea primero y el `POST …/sets` espera | `409 SESSION_NOT_OPEN`. La sesión queda `skipped`, sin registros |
| API-28 | Registro tras medianoche | `POST …/sets` a las 00:00:01 sobre la sesión de ayer, aún `planned` y sin reconciliar | `409 SESSION_NOT_TODAY` |
| API-29 | Prescripción incorrecta | `templateExerciseId` de otra plantilla del mismo programa | `422 PRESCRIPTION_MISMATCH`. Ninguna fila nueva y el estado sin cambios (prueba de la regla 8 de 3.2) |
| API-30 | Prescripción incorrecta | `templateExerciseId` de la misma plantilla en otra semana | `422 PRESCRIPTION_MISMATCH`. Ninguna fila nueva |
| API-31 | Prescripción incorrecta | `templateExerciseId` inexistente; `reps` en un ejercicio por tiempo; `setNumber` mayor que `targetSets` | `422 PRESCRIPTION_MISMATCH`, `422 MEASUREMENT_MISMATCH` y `422 SET_NUMBER_OUT_OF_RANGE` |
| API-32 | Zona horaria | Usuario en `Pacific/Kiritimati` (UTC+14) y otro en `Pacific/Pago_Pago` (UTC−11), con el mismo instante UTC | Cada `GET /api/sessions/today` devuelve su `today` local. Solo se cierran las sesiones vencidas en la zona de cada uno |
| API-33 | Zona horaria | Usuario en `Europe/Madrid`: `GET /api/sessions/today` a las 23:30 y a las 00:01 locales | A las 23:30 la sesión sigue `planned` y `canLog` vale `true`. A las 00:01 pasa a `partial` o `skipped` y la siguiente conserva su fecha |
| API-34 | Zona horaria | `PATCH /api/profile` cambia la zona con un programa activo | Ningún `scheduledDate` cambia. Solo cambia cuándo vence cada sesión |
| API-35 | Zona horaria | Cierre durante un cambio de horario (DST) en `Europe/Madrid` | La sesión del día del cambio se cierra al terminar su fecha local |
| API-36 | Formato de errores | Todas las respuestas `4xx` y `5xx` | Cuerpo `{ error: { code, message, requestId } }` y `Content-Type: application/json` |
| API-37 | Formato de errores | JSON mal formado; campo desconocido; `uuid` de ruta mal formado; `availableWeekdays` con días repetidos | `400 MALFORMED_JSON` o `400 VALIDATION_ERROR` con `details.fields` |
| API-38 | Formato de errores | `GET /api/ruta-inexistente`, y un error interno forzado en producción | `404 NOT_FOUND` en JSON, y `500 INTERNAL_ERROR` sin traza ni SQL |
| API-39 | Formato de errores | Tiempo de espera de bloqueo forzado (`lock_timeout`) en `POST …/sets` | `503 TEMPORARILY_UNAVAILABLE` y ninguna fila nueva |
| API-40 | Activación concurrente | T-finalizar sobre la última sesión `planned` (sin `COMMIT`) mientras llega un `POST /api/enrollments` | Se comprueba que la inserción espera en el índice o que la activación responde `409`. Tras el `COMMIT`, una nueva consulta y un reintento dan `201`. Nunca hay dos `active` |
| API-41 | Activación | Inscripción `active` con su última sesión hoy y aún `planned`, seguida de `POST /api/enrollments` | `409 ACTIVE_ENROLLMENT_EXISTS`: la reconciliación previa no la pasa a `finished` |
| API-42 | Finalización | `complete` sobre una sesión `completed` cuya fecha ya pasó | `200`, sin cambios en `completedAt` ni en la inscripción |
| API-43 | Operaciones sin cuerpo | `POST /api/auth/logout` y `POST …/complete` con `Origin` correcto, `X-CSRF-Protection` y sin `Content-Type`; después, los mismos con un cuerpo no vacío; después, sin `X-CSRF-Protection` | `204` y `200`; después `400`; después `403` sin efecto (la sesión no se cierra, la sesión de entrenamiento no cambia) |
| API-44 | Reconciliación en `GET` | Dos `GET /api/sessions/today` simultáneos a las 00:00:01, con una sesión vencida | Las dos responden lo mismo. La sesión se cierra una sola vez y `closed_at` no cambia |
| API-45 | Reconciliación en `GET` | `GET /api/auth/me`, `GET /api/profile` y `GET /api/programs` con sesiones vencidas | No cambia ninguna fila: solo reconcilian los `GET` documentados |
| API-46 | Días bloqueados (DP-06) | `PATCH /api/profile` con `availableWeekdays` y una inscripción activa; la misma petición con solo `timezone`; la primera petición tras vencer la última sesión del programa | `409 AVAILABILITY_LOCKED` sin cambios; `200` con la zona cambiada; `200` tras la reconciliación previa |
| API-47 | Finalizar sin series (DP-09) | `complete` sobre una sesión `planned` de hoy sin series; después, con una serie | `409 NO_SETS_LOGGED` y la sesión sigue `planned`; después `200` y `completed` |

#### Decisiones del Product Owner y propuestas técnicas que afectan a la API

| Tema | Estado | Tratamiento en la API |
|------|--------|-----------------------|
| Un solo programa activo (DP-07) | [Confirmada] | `409 ACTIVE_ENROLLMENT_EXISTS` y `GET /api/enrollments/active`. |
| Primera sesión al día siguiente de la activación (DP-01) | [Confirmada] | El contrato no cambia; afecta a las fechas generadas. |
| Días bloqueados con un programa activo (DP-06) | [Confirmada] | `PATCH /api/profile` reconcilia y responde `409 AVAILABILITY_LOCKED`. La zona horaria sigue siendo editable. **Es un código de error nuevo.** |
| Abandonar un programa (DP-14) | [Confirmada]: fuera del MVP | Sin endpoint. |
| Finalizar exige al menos una serie (DP-09) | [Confirmada] | `409 NO_SETS_LOGGED`. **Es un código de error nuevo.** |
| Fórmula de adherencia (DP-12, DP-13) | [Confirmada] | `adherence` en %, o `null` sin sesiones evaluables. El redondeo a un decimal es una [Propuesta]. |
| Solo las series prescritas (DP-10) | [Confirmada] | `422 SET_NUMBER_OUT_OF_RANGE` si `setNumber > targetSets`. |
| Segundos en los ejercicios por tiempo (DP-11) | [Confirmada] | `durationSeconds` en las series `time` y `reps` en las `reps`, sin convertir. |
| Duración de la sesión de autenticación (DP-15) | [Confirmada] | `Max-Age` de 7 días, sin renovación. |
| Fecha de registro y finalización (DP-08) | [Confirmada] | `409 SESSION_NOT_TODAY` fuera de la fecha programada. |
| Cookie sin `Secure` ni `__Host-` en desarrollo | [Propuesta] | Solo con `NODE_ENV=development`. En producción, el servidor se niega a arrancar sin una cookie segura. |
| `setNumber` asignado por el cliente | [Propuesta] | Base de la política de reintentos. |
| Reconciliación dentro de `GET` | [Propuesta]: compromiso del MVP | Se mantiene, documentada y acotada (2.2). Las alternativas sin escrituras en `GET` (estado derivado al leer, `POST /api/sessions/reconcile`, tarea obligatoria) quedan [Pendiente] y no se añaden al contrato. |
| Operaciones sin cuerpo | [Propuesta] | Sin `Content-Type` obligatorio. Cualquier cuerpo → `400`. CSRF completo. |
| `Idempotency-Key` | No se incluye | Requeriría una tabla nueva: pendiente para el modelo de datos si se necesita. |
| Umbrales del límite de peticiones, longitud mínima de la contraseña y tamaño máximo del cuerpo | [Propuesta] | Se fijarán al implementar. |

#### Riesgos e inconsistencias detectadas respecto a las secciones 1–3

| Punto | Detalle | Tratamiento |
|-------|---------|-------------|
| Activación con una inscripción vencida sin reconciliar | El flujo 1 de 2.2 no mencionaba la reconciliación. | **Corregido en 2.2:** el paso 2 del flujo 1 reconcilia antes de comprobar, y se han añadido las "Carreras en la activación". API-17, API-40 y API-41. |
| `complete` sobre una sesión `completed` de otro día | 2.2 decía "`200` sin efecto", pero T-finalizar exigía que la fecha fuera hoy. | **Corregido en 2.2:** el paso 3 de T-finalizar comprueba el estado antes que la fecha. API-42. |
| Cambio de contraseña | 2.5 lo menciona como causa de revocación, pero F1 no incluye esa funcionalidad. | Sin endpoint en el MVP. La revocación por cambio de contraseña aplicará cuando exista. |
| Rutas de 2.2 sin el prefijo `/api` | 2.2 usa `POST /enrollments` y `POST /sessions/:id/complete`; el diagrama de secuencia sí usa `/api/sessions/today`. | Esta sección fija el prefijo `/api`. Las rutas de 2.2 se entienden como relativas. |
| Enumeración de cuentas al registrarse | `409 EMAIL_ALREADY_REGISTERED` revela que un email tiene cuenta. | Riesgo aceptado provisionalmente, con límite de peticiones. Evitarlo exigiría verificar el email, que está fuera del MVP. |
| Escrituras en peticiones `GET` | La reconciliación hace que algunos `GET` escriban, esperen bloqueos o respondan `503`. | Se documenta como compromiso del MVP en 2.2 ("Reconciliación en peticiones `GET`"), con sus restricciones y alternativas [Pendiente]. La lista de `GET` que reconcilian está en las convenciones. API-44 y API-45. |
| Cookie distinta en desarrollo | `__Host-session` en producción y `session` en desarrollo. 2.5 decía que la cookie funcionaba "igual que en producción". | **Corregido en 2.5.** Hay dos perfiles E2E y una tabla de diferencias ("Diferencias entre desarrollo y producción…"). API-10. |
| Operaciones sin cuerpo | El control de tipo de contenido iba antes que el CSRF y no decía nada de `logout`, `complete` ni `DELETE`. | El CSRF va primero y no depende del cuerpo. Las operaciones sin cuerpo no exigen `Content-Type` y rechazan cualquier cuerpo. API-43. |
| Valores derivados en las respuestas | `slots`, `weeklySequence`, `compatible`, `startDate`, `endDate`, `sessionCount`, `today`, `canLog` y las métricas no son columnas. | Están marcados como derivados. No requieren columnas nuevas en 3.2. |

---

## 5. Historias de Usuario

> Documenta 3 de las historias de usuario principales utilizadas durante el desarrollo, teniendo en cuenta las buenas prácticas de producto al respecto.

> **Estado de esta sección:** son las tres historias que cubren el **flujo principal del MVP** (1.3), redactadas a partir de las secciones 1–4. Todavía no hay implementación, así que ninguna está terminada. Las pruebas citadas son **propuestas** de 2.6 y de la sección 4: no se ha escrito ni ejecutado ninguna. Las decisiones del Product Owner que afectan a estas historias están **[Confirmada]** (DP-01 a DP-17, en 1.2); lo que sigue sin definir, como el contenido de los 3 programas, se indica en cada historia.

**Historia de Usuario 1**

**HU-01 — Activar un programa adaptado a mis días de entrenamiento**

> **Como** atleta intermedio de calistenia, **quiero** elegir mis días fijos de entrenamiento y un programa preconfigurado, **para** obtener un calendario completo que me diga qué entrenar cada día sin planificarlo yo.

- **Prioridad:** Imprescindible (F2, F3 y F4).
- **Contexto y valor:** resuelve la falta de programación integrada y de adaptación a la disponibilidad (P2, P3). Es la puerta de entrada al producto: sin calendario no hay sesión del día, ni registro, ni progreso. Cubre los pasos 2 a 4 del flujo principal y el criterio de éxito CE2. Junto con HU-02, también CE1.

**Criterios de aceptación**

1. **Disponibilidad válida.**
   - **Dado** un atleta autenticado,
   - **cuando** guarda entre 2 y 6 días distintos de la semana (`PATCH /api/profile`),
   - **entonces** el perfil los guarda y los devuelve.

   Con 1 o 7 días, con días repetidos o con valores fuera de 0–6, la respuesta es `400` y el perfil no cambia.
2. **Catálogo según los días.**
   - **Dado** un atleta con 3 días configurados,
   - **cuando** consulta el detalle de un programa,
   - **entonces** ve su nivel, objetivo y duración en semanas, la secuencia que le corresponde (Push A, Pull A, Push-Pull A) y si el programa es compatible con sus días.
3. **Calendario materializado.**
   - **Dado** un atleta con lunes, miércoles y viernes configurados y sin inscripción activa,
   - **cuando** activa un programa compatible de 6 semanas (DP-04),
   - **entonces** se crean de una vez exactamente 18 sesiones `planned`:
     - siguen en orden la secuencia de la tabla de 1.2, que se repite cada 3 sesiones;
     - solo caen en esos días;
     - están en orden cronológico;
     - cada una tiene `weekNumber = floor(i / 3) + 1`.
4. **Inicio sin esperar al lunes.**
   - **Dado** que el atleta activa el programa un miércoles,
   - **cuando** se genera el calendario,
   - **entonces** la primera sesión cae en el siguiente día elegido (el viernes), sin esperar al lunes.

   **El día de activación queda excluido aunque sea un día elegido** (DP-01). Si activa un lunes, día elegido, la primera sesión es el miércoles. El cálculo usa la zona horaria del perfil.
5. **Secuencias A/B.**
   - **Dado** cualquier número de días entre 2 y 6,
   - **cuando** se genera el calendario,
   - **entonces** cada bloque semanal sigue exactamente la secuencia de la tabla de 1.2. Por ejemplo, con 4 días: Push A, Pull A, Push B, Pull B.

   A y B son sesiones distintas.
6. **Un solo programa activo (DP-07).**
   - **Dado** un atleta con una inscripción que aún tiene sesiones `planned` hoy o en el futuro,
   - **cuando** intenta activar otro programa,
   - **entonces** recibe `409` y no se crea nada.
7. **Inscripción anterior vencida.**
   - **Dado** un atleta cuya inscripción tuvo su última sesión ayer, todavía sin reconciliar,
   - **cuando** activa un programa,
   - **entonces** la reconciliación previa cierra esa sesión y pasa la inscripción a `finished`, y la nueva activación responde `201`.
8. **Datos incompletos.**
   - **Dado** un atleta sin días configurados, o un programa sin plantilla para algún hueco de su secuencia,
   - **cuando** intenta activar,
   - **entonces** recibe `422` y no se crea nada.
9. **Los días no se pueden cambiar con un programa activo (DP-06).**
   - **Dado** un programa activo,
   - **cuando** el atleta intenta cambiar sus días,
   - **entonces** recibe `409` y el perfil no cambia.

   Si cambia su zona horaria, ninguna fecha del calendario activo cambia; solo cambia cuándo vence cada sesión (2.1).

**Reglas de negocio:** RP1–RP4, la tabla de secuencias de 1.2, el calendario materializado (2.1) y la copia de los días y de la duración en la inscripción (3.2).

**Endpoints:**
- `GET` y `PATCH /api/profile`;
- `GET /api/programs` y `GET /api/programs/{programId}`;
- `GET /api/programs/{programId}/templates/{templateId}`;
- `POST /api/enrollments`;
- `GET /api/enrollments/active`;
- `GET /api/enrollments/{enrollmentId}/sessions`.

**Entidades:** `users`, `programs`, `session_templates`, `template_exercises`, `exercises`, `enrollments` y `scheduled_sessions`.

**Dependencias y supuestos:**
- Necesita la autenticación (F1).
- Necesita *seeds* con los 3 programas iniciales, de 6 semanas (DP-02, DP-04). Su contenido todavía no está definido (1.2).
- Decisiones confirmadas que aplica (1.2):
  - DP-01: inicio el día elegido posterior a la activación;
  - DP-06: días bloqueados con un programa activo;
  - DP-07: un solo programa activo;
  - DP-03: "intermedio" como criterio orientativo;
  - DP-14: abandonar un programa queda fuera del MVP.

**Casos negativos y de concurrencia:**
- Dos activaciones simultáneas: una `201` y otra `409`, nunca dos inscripciones activas.
- Activación mientras se finaliza la última sesión de la inscripción anterior: `409` o `201`. Tras un `409`, el cliente vuelve a consultar.
- Activación sin `X-CSRF-Protection` o con un `Origin` ajeno: `403` y no se crea nada.
- Activación sin sesión: `401`.

**Historia de Usuario 2**

**HU-02 — Consultar la sesión del día y registrar mis series**

> **Como** atleta, **quiero** ver la sesión que me toca hoy y anotar las series y repeticiones que hago realmente, **para** conservar mi desempeño y poder comparar lo realizado con lo prescrito.

- **Prioridad:** Imprescindible (F5, F7 y F9).
- **Contexto y valor:** es el uso diario de la app, desde el móvil y durante el entrenamiento (1.1). Aporta el dato que distingue el desempeño de la simple asistencia (P4, P5). Cubre los pasos 5 y 6 del flujo principal y los criterios de éxito CE3, CE4 (registro) y CE5 (uso móvil).

**Criterios de aceptación**

1. **Sesión de hoy.**
   - **Dado** un atleta con programa activo y una sesión programada hoy en su zona horaria,
   - **cuando** abre "Hoy" (`GET /api/sessions/today`),
   - **entonces** ve la plantilla (por ejemplo, Push A) y, para la **semana del programa de esa sesión**, cada ejercicio con sus series, repeticiones o tiempo y descanso, además de las series ya registradas.

   Si hoy no tiene sesión, ve la próxima.
2. **Registrar no finaliza.**
   - **Dado** una sesión `planned` de hoy,
   - **cuando** registra una serie de un ejercicio prescrito,
   - **entonces** la serie se guarda (`201`) y la sesión **sigue `planned`**.
3. **Editar y borrar.**
   - **Dado** una sesión `planned` de hoy con series registradas,
   - **cuando** edita las repeticiones de una serie o la borra,
   - **entonces** el cambio se guarda y el estado de la sesión no cambia.
4. **Solo la sesión de hoy.**
   - **Dado** una sesión `planned` de otro día, sea futura o vencida y aún sin reconciliar,
   - **cuando** intenta registrar, editar o borrar una serie,
   - **entonces** recibe `409` y no cambia nada.
5. **Estados finales.**
   - **Dado** una sesión `completed`, `partial` o `skipped`,
   - **cuando** intenta registrar, editar o borrar una serie,
   - **entonces** recibe `409`, y los registros y el estado no cambian.
6. **Prescripción correcta.**
   - **Dado** una sesión de hoy,
   - **cuando** envía una serie con una prescripción de **otra plantilla**, o de la **misma plantilla en otra semana**,
   - **entonces** recibe `422` y no se guarda nada.

   Pasa lo mismo si envía repeticiones para un ejercicio medido en tiempo, o al revés.
7. **Sin duplicados.**
   - **Dado** una serie ya registrada con un número de serie,
   - **cuando** se reenvía la misma petición (doble toque o reintento),
   - **entonces** recibe `409` y solo existe una serie.

   El cliente consulta la sesión antes de decidir si reintenta (sección 4).
8. **Cierre con registros: `partial`.**
   - **Dado** una sesión `planned` con al menos una serie registrada y sin finalizar,
   - **cuando** termina su fecha en la zona horaria del atleta y se reconcilia,
   - **entonces** pasa a `partial`, conserva todas sus series y la sesión siguiente mantiene su fecha.
9. **Cierre sin registros: `skipped`.**
   - **Dado** una sesión `planned` sin series al terminar su fecha, porque no se registró ninguna o se borraron todas,
   - **cuando** se reconcilia,
   - **entonces** pasa a `skipped`, no se reprograma y la sesión siguiente mantiene su fecha.
10. **Zona horaria.**
    - **Dado** un atleta en `Europe/Madrid`,
    - **cuando** consulta "Hoy" a las 23:30 y a las 00:01 de su hora local,
    - **entonces** a las 23:30 la sesión sigue abierta y a las 00:01 aparece cerrada como `partial` o `skipped`.
11. **Pantalla estrecha.**
    - **Dado** un móvil de 320 px de ancho,
    - **cuando** el atleta registra series,
    - **entonces** el flujo se completa sin desplazamiento horizontal (CE5).

**Reglas de negocio:** F9, RP5, la tabla "Estados de una sesión" (1.2), las reglas de estado y la definición de actividad (2.2), y las reglas transaccionales 1, 2, 4 y 8 de 3.2.

**Endpoints:**
- `GET /api/sessions/today`;
- `GET /api/sessions/{sessionId}`;
- `POST /api/sessions/{sessionId}/sets`;
- `PATCH` y `DELETE /api/sessions/{sessionId}/sets/{setId}`.

**Entidades:** `scheduled_sessions`, `set_logs`, `template_exercises`, `exercises`, `enrollments` y `users` (por `timezone`).

**Dependencias y supuestos:**
- Necesita HU-01: un calendario activo.
- Decisiones confirmadas que aplica (1.2):
  - DP-10: solo las series prescritas; una de más → `422`;
  - DP-11: segundos en los ejercicios por tiempo y repeticiones en los de repeticiones;
  - DP-08: solo en la fecha programada.
- Riesgo aceptado: un cambio de zona horaria con un programa activo cambia cuándo vence cada sesión (2.1).

**Casos negativos y de concurrencia:**
- **Serie justo antes de medianoche mientras se cierra la sesión** (C1): la sesión acaba `partial` y conserva la serie.
- **Cierre que bloquea primero** (C2): el registro recibe `409` y la sesión queda `skipped`.
- **Borrar la única serie mientras el cierre espera** (C5): la sesión queda `skipped`.
- **Dos envíos iguales en paralelo:** una `201` y una `409`, con una sola fila.
- **Acceso a sesiones o series de otro atleta:** `404`, idéntico al de un recurso inexistente.
- **Escritura sin la protección CSRF:** `403`.
- **Bloqueo no resuelto:** `503` sin guardar nada. El cliente puede reintentar.

**Historia de Usuario 3**

**HU-03 — Finalizar mis sesiones y consultar mi progreso**

> **Como** atleta, **quiero** marcar explícitamente como terminada la sesión de hoy y consultar mi progreso en el programa, **para** conocer mis avances y mantener la constancia.

- **Prioridad:** Imprescindible (F6 y F8). Los hitos (F10) son deseables y **no** forman parte de esta historia.
- **Contexto y valor:** cierra el ciclo diario y hace visible el progreso, que motiva la constancia (P5). Distingue lo que el atleta completó de lo que solo empezó o no hizo. Cubre los pasos 5, 7 y 8 del flujo principal y el criterio de éxito CE4 (progreso).

**Criterios de aceptación**

1. **Finalización explícita.**
   - **Dado** una sesión `planned` de hoy con al menos una serie registrada (DP-09),
   - **cuando** el atleta pulsa "Finalizar" (`POST /api/sessions/{id}/complete`),
   - **entonces** la sesión pasa a `completed`.

   Es la única forma de llegar a ese estado. Sin ninguna serie, la finalización se rechaza (`409`) y la sesión sigue `planned`. No hace falta registrar todas las series prescritas.
2. **Finalización repetida.**
   - **Dado** una sesión ya `completed`, de hoy o de un día pasado,
   - **cuando** se vuelve a finalizar,
   - **entonces** la respuesta es `200` y la sesión no cambia.
3. **Sesiones cerradas.**
   - **Dado** una sesión `partial` o `skipped`,
   - **cuando** el atleta intenta finalizarla,
   - **entonces** recibe `409`.

   Una sesión cerrada no puede pasar después a `completed`.
4. **Solo hoy.**
   - **Dado** una sesión `planned` futura, o una de ayer aún sin reconciliar,
   - **cuando** el atleta intenta finalizarla,
   - **entonces** recibe `409`.

   El límite lo marca el momento en que se procesa la petición, no cuándo se envió (C4c).
5. **Fin del programa.**
   - **Dado** que solo queda una sesión `planned` en la inscripción,
   - **cuando** se finaliza, o cuando se cierra automáticamente,
   - **entonces** la inscripción pasa a `finished` (RP6).

   El atleta ve el resumen del programa y puede inscribirse en otro.
6. **Panel de progreso.**
   - **Dado** un programa con sesiones en distintos estados,
   - **cuando** el atleta abre el progreso,
   - **entonces** ve:
     - la semana actual sobre el total;
     - los recuentos `completed`, `partial` y `skipped` **por separado**;
     - la adherencia: `100 × (completed + 0,5 × partial) / (completed + partial + skipped)`, solo sobre sesiones evaluables, o "sin datos" si no hay ninguna (DP-12, DP-13).
7. **Desempeño.**
   - **Dado** sesiones `completed` y `partial` con series registradas,
   - **cuando** el atleta consulta el desempeño por ejercicio,
   - **entonces** ve, para cada sesión, lo prescrito (series y repeticiones o tiempo) junto a lo que realizó.

   Las sesiones `partial` aparecen con sus registros.
8. **Historial.**
   - **Dado** un atleta con programas terminados,
   - **cuando** consulta su historial,
   - **entonces** ve sus inscripciones `finished`, cada una con su calendario y su progreso.

**Reglas de negocio:** F6, F8, RP6, las transiciones permitidas y T-finalizar (2.2), y la regla 5 de 3.2 (la inscripción pasa a `finished` cuando no quedan sesiones `planned`). El progreso se calcula y no tiene columnas propias (3.2).

**Endpoints:**
- `POST /api/sessions/{sessionId}/complete`;
- `GET /api/enrollments/{enrollmentId}/progress`;
- `GET /api/enrollments/{enrollmentId}/progress/exercises`;
- `GET /api/enrollments`;
- `GET /api/enrollments/{enrollmentId}/sessions`.

**Entidades:** `scheduled_sessions`, `enrollments`, `set_logs`, `template_exercises` y `exercises`.

**Dependencias y supuestos:**
- Necesita HU-01 y, para el desempeño, HU-02.
- Decisiones confirmadas que aplica (1.2):
  - DP-12 y DP-13: fórmula de adherencia y peso de `partial`;
  - DP-09: finalizar exige al menos una serie;
  - DP-14: abandonar un programa queda fuera del MVP.

**Casos negativos y de concurrencia:**
- **Finalizar y cerrar a la vez alrededor de medianoche** (C4a–C4d): nunca queda `completed` una sesión ya cerrada, ni se cierra una ya `completed`.
- **Finalizar la última sesión de hoy mientras se cierra la penúltima vencida** (C7): la inscripción termina `finished`.
- **Finalizar sin `X-CSRF-Protection`:** `403` y la sesión no cambia.
- **Finalizar o consultar el progreso de otro atleta:** `404`.

#### Resumen de criterios de aceptación

| Historia | Criterios principales |
|----------|-----------------------|
| HU-01 | Días de 2 a 6, sin repetir. Calendario de `N × semanas` sesiones `planned`, con la secuencia A/B de 1.2 y empezando el siguiente día elegido. Día de activación excluido (DP-01). Un solo programa activo (DP-07). Días bloqueados con un programa activo (DP-06). Reconciliación previa a la activación. `422` con datos incompletos. El calendario activo no cambia al editar el perfil. |
| HU-02 | Sesión de hoy con la prescripción de su semana. Registrar, editar o borrar no cambia el estado. Solo en una sesión `planned` de hoy. `422` si la prescripción no corresponde. `409` si la serie está duplicada. Al cierre, `partial` con series o `skipped` sin ellas. Las fechas no se desplazan. |
| HU-03 | Única transición a `completed`, con al menos una serie (DP-09). Finalizar una sesión ya `completed` es idempotente. `409` sobre `partial` o `skipped` y fuera del día. La inscripción pasa a `finished` al no quedar sesiones `planned`. Progreso con recuentos separados, adherencia según DP-13 y comparación entre lo prescrito y lo realizado. |

#### Trazabilidad

| Historia | Sección 1 | Sección 2 | Sección 3 | Sección 4 | Pruebas propuestas |
|----------|-----------|-----------|-----------|-----------|--------------------|
| HU-01 | P2, P3; F2, F3, F4; RP1–RP4; CE1, CE2 | Módulos `profile`, `programs` y `enrollments`; `scheduler` y `WEEKLY_SEQUENCES`; flujo 1 y "Carreras en la activación" | `users`, `programs`, `session_templates`, `template_exercises`, `enrollments`, `scheduled_sessions`; `ux_enrollments_one_active` | `PATCH /api/profile`, `GET /api/programs/…`, `POST /api/enrollments`, `GET /api/enrollments/active` | Unidad del `scheduler` (2.6); API-01–06, API-15–17, API-34, API-40, API-41 |
| HU-02 | P4, P5; F5, F7, F9; RP5; CE3, CE4, CE5 | Módulo `sessions`; T-registro, T-cierre y protocolo de concurrencia; `sessionLifecycle`; reconciliación en `GET` | `scheduled_sessions`, `set_logs`, `template_exercises`, `exercises`; reglas 1, 2, 4 y 8 | `GET /api/sessions/today`, `GET /api/sessions/{id}`, `POST`, `PATCH` y `DELETE …/sets` | C1, C2, C5, C6; API-13, API-14, API-18–21, API-25–33, API-44; E2E con 320 px |
| HU-03 | P5; F6, F8; RP6; CE4 | T-finalizar y bloqueo de la inscripción; módulo `progress` | `scheduled_sessions`, `enrollments`, `set_logs`; regla 5; consultas de progreso | `POST …/complete`, `GET …/progress`, `GET …/progress/exercises`, `GET /api/enrollments` | C4a–C4d, C7; API-12, API-21–24, API-42, API-43; E2E del flujo principal |

#### Dependencias y decisiones

- **Orden de implementación:** primero HU-01, después HU-02 y por último HU-03. HU-03 necesita el registro de HU-02, porque finalizar exige al menos una serie (DP-09).
- **Fuera de estas historias**, aunque son Imprescindibles: el registro y el inicio de sesión (F1) son un requisito técnico de las tres, pero no tienen historia propia por el límite de tres que fija la plantilla. Lo mismo ocurre con el cierre automático (F7), que se reparte entre HU-02 (cierre de la sesión) y HU-03 (fin del programa).
- **Decisiones del Product Owner, todas [Confirmada]** (registro DP-01 a DP-17 en 1.2):
  - HU-01: DP-01, DP-02, DP-03, DP-04, DP-06, DP-07 y DP-14;
  - HU-02: DP-08, DP-10 y DP-11;
  - HU-03: DP-09, DP-12, DP-13 y DP-14;
  - las tres: DP-15.

  Queda por definir el **contenido** de los 3 programas (1.2), que no es una decisión DP.

#### Backlog ampliado del MVP [Propuesta]

> **Qué es este apartado.** Es una ampliación que **complementa** las tres historias oficiales de la plantilla, sin sustituirlas:
> - HU-01, HU-02 y HU-03 se mantienen como historias de **alto nivel**;
> - las historias HU-04 a HU-23 las descomponen en incrementos pequeños, verificables y entregables por separado.
>
> Igual que el resto de la sección:
> - no hay nada implementado;
> - las pruebas citadas son propuestas;
> - las decisiones del Product Owner están confirmadas y se citan por su identificador (DP-01 a DP-17, en 1.2). El campo "Pendiente" de cada historia recoge solo lo que todavía no está definido.
>
> Los criterios que ya están en HU-01 a HU-03 no se repiten: se citan como "HU-0X, criterio N".

**Prioridades.** La sección 1 solo distingue **Imprescindible** y **Deseable**. Aquí se traducen así:
- **Must Have** = Imprescindible.
- **Should Have** = Deseable, o algo que no está como funcionalidad propia en F1–F10 pero se deduce de la sección 1 (se indica en cada caso).
- **Could Have:** no se usa, porque la sección 1 no define nada de ese nivel.

Las prioridades marcadas como *(propuesta)* no vienen literalmente de la sección 1. La única que lo estaba, la de HU-21, la confirmó el Product Owner como Should (DP-16).

**Nombres de pantallas.** Las historias, tanto HU-01 a HU-03 como el backlog, nombran pantallas y botones en español ("Hoy", "Calendario", "Finalizar"). Son descripciones funcionales, no los textos de la interfaz. La interfaz del MVP es solo en inglés, y su navegación confirmada es **Today · Program · Progress · Profile**:
- "Hoy" corresponde a *Today*;
- el calendario, el catálogo y el programa activo están en *Program*.

Las etiquetas exactas están en `docs/design-system.md` (secciones 4–6). El calendario sigue siendo una funcionalidad del MVP (HU-12).

##### Criterios de aceptación comunes (CT)

Se aplican a **todas** las historias del backlog. No se repiten en cada una:

- **CT-01 · Diseño adaptable:**
  - **Dado** un *viewport* de entre 320 px y escritorio,
  - **cuando** se usa la pantalla de la historia,
  - **entonces** no hay desplazamiento horizontal y las acciones principales son accesibles con una mano (CE5, 1.3).
- **CT-02 · Carga y errores:**
  - **Dado** una petición en curso o fallida,
  - **cuando** se muestra la pantalla,
  - **entonces**:
    - se ve un estado de carga;
    - si la petición falla, se ve un mensaje comprensible según el `error.code` (sección 4);
    - ante un `503`, la pantalla ofrece reintentar;
    - las listas vacías tienen un estado vacío explícito.
- **CT-03 · Accesibilidad básica:**
  - **Dado** cualquier control,
  - **cuando** se usa con lector de pantalla o con teclado,
  - **entonces**:
    - tiene una etiqueta accesible;
    - el foco es visible;
    - los errores se anuncian (`aria-live`);
    - los objetivos táctiles miden al menos 44 × 44 px;
    - los estados de sesión no dependen solo del color (T-02).
- **CT-04 · Operaciones protegidas:**
  - **Dado** una operación sobre datos del atleta,
  - **cuando** se hace sin sesión válida, sin la protección CSRF o sobre un recurso de otro atleta,
  - **entonces**, respectivamente, la respuesta es `401`, `403` o el mismo `404` que para un recurso inexistente, y no cambia nada (2.5 y sección 4).
- **CT-05 · Sin envíos duplicados:**
  - **Dado** una acción que modifica datos,
  - **cuando** el usuario pulsa dos veces o falla la red,
  - **entonces** se envía una sola petición y, antes de reintentar, se consulta el estado actual (sección 4, "Reintentos e idempotencia").
- **CT-06 · Fechas locales:**
  - **Dado** una fecha de sesión,
  - **cuando** se muestra,
  - **entonces** se presenta tal como la devuelve la API, como fecha local del atleta (`YYYY-MM-DD`), sin convertirla con la zona del navegador (3.2).

##### A. Autenticación y perfil

**HU-04 — Crear mi cuenta**
> **Como** atleta nuevo, **quiero** registrarme con mi email y una contraseña, **para** guardar mi programa y mi progreso.

- **Valor:** es la puerta de entrada. Sin cuenta no se puede guardar nada (F1).
- **Prioridad:** Must Have.
- **Alto nivel:** requisito previo de HU-01 a HU-03.
- **Requisitos:** F1 y CE1.
- **Endpoints:** `POST /api/auth/register`.
- **Entidades:** `users`.
- **Dependencias:** ninguna.
- **Criterios:**
  1. **Dado** un email no registrado y una contraseña válida, **cuando** me registro, **entonces** se crea la cuenta, quedo con la sesión iniciada y mi zona horaria se toma del navegador.
  2. **Dado** un email ya registrado, **cuando** intento registrarme, **entonces** veo que ese email ya tiene cuenta (`409`) y no se crea otra.
  3. **Dado** un email mal formado o una contraseña más corta que el mínimo, **cuando** envío el formulario, **entonces** veo el error junto al campo (`400`).
- **Casos negativos:**
  - registro desde otro origen → `403`;
  - superar el límite de peticiones → `429` con un mensaje de espera.
- **Pendiente:**
  - la longitud mínima de la contraseña se fijará al implementar (2.5);
  - el `409` revela que la cuenta existe: es un riesgo aceptado provisionalmente (sección 4).

**HU-05 — Iniciar sesión, mantenerla y cerrarla**
> **Como** atleta registrado, **quiero** iniciar sesión, seguir conectado al volver a abrir la app y poder cerrar sesión, **para** acceder a mis datos de forma segura.

- **Valor:** acceso diario sin fricción y control sobre la sesión (F1).
- **Prioridad:** Must Have.
- **Alto nivel:** requisito previo de HU-01 a HU-03.
- **Requisitos:** F1.
- **Endpoints:** `POST /api/auth/login`, `GET /api/auth/me` y `POST /api/auth/logout`.
- **Entidades:** `users` (`token_version`).
- **Dependencias:** HU-04.
- **Criterios:**
  1. **Dado** unas credenciales correctas, **cuando** inicio sesión, **entonces** entro en la app y, al recargar la página, sigo dentro (`GET /api/auth/me`).
  2. **Dado** un email inexistente o una contraseña incorrecta, **cuando** inicio sesión, **entonces** veo el mismo mensaje genérico en los dos casos (`401`).
  3. **Dado** que tengo la sesión iniciada, **cuando** la cierro, **entonces** vuelvo a la pantalla de acceso, y la sesión queda cerrada en todos mis dispositivos (2.5).
  4. **Dado** que mi sesión ha caducado, **cuando** hago cualquier acción, **entonces** vuelvo a la pantalla de acceso (`401`).
- **Casos negativos:**
  - intento de *login CSRF* desde otro sitio → `403`;
  - usar la cookie anterior después de cerrar sesión → `401` (API-09).
- **Decisión:** la sesión dura 7 días, sin renovación automática (DP-15). **Pendiente:** ninguno propio.

**HU-06 — Configurar mis días de entrenamiento**
> **Como** atleta, **quiero** elegir entre 2 y 6 días fijos de la semana, **para** que el programa se ajuste a mi disponibilidad.

- **Valor:** adaptar el programa a la vida real del atleta (P3, F2).
- **Prioridad:** Must Have.
- **Alto nivel:** HU-01.
- **Requisitos:** F2.
- **Endpoints:** `GET` y `PATCH /api/profile`.
- **Entidades:** `users.available_weekdays`.
- **Dependencias:** HU-05.
- **Criterios:**
  - HU-01, criterio 1.
  - **Dado** que no he configurado mis días, **cuando** abro el perfil, **entonces** la app me pide elegirlos antes de activar un programa.
  - **Dado** un programa activo, **cuando** abro mis días, **entonces** el selector aparece desactivado y explica por qué. Si se intenta el cambio igualmente, la API responde `409` y el perfil no cambia (DP-06; HU-01, criterio 9).
- **Casos negativos:** 1 o 7 días, o días repetidos → `400`, y el perfil no cambia.
- **Decisión:** los días no se pueden cambiar con un programa activo (DP-06). La zona horaria sí (HU-07). **Pendiente:** ninguno propio.

**HU-07 — Revisar y ajustar mi zona horaria**
> **Como** atleta, **quiero** ver y, si hace falta, corregir la zona horaria con la que se calcula mi "hoy", **para** que mis sesiones se abran y cierren en mi día real.

- **Valor:** el cierre automático y la sesión del día dependen de la zona horaria del usuario (F7, RP5).
- **Prioridad:** Must Have. F1 y F2 no mencionan la zona horaria, pero el cierre según la zona del usuario está confirmado. Que sea editable es una [Propuesta] de 2.2.
- **Alto nivel:** HU-01 y HU-02.
- **Requisitos:** F7 (zona del usuario).
- **Endpoints:** `GET` y `PATCH /api/profile`.
- **Entidades:** `users.timezone`.
- **Dependencias:** HU-04, que la toma del navegador al registrarse.
- **Criterios:**
  1. **Dado** mi perfil, **cuando** lo abro, **entonces** veo la zona horaria detectada, por ejemplo `Europe/Madrid`.
  2. **Dado** una zona IANA válida, **cuando** la guardo, **entonces** el "hoy" de la app pasa a calcularse con ella.
  3. **Dado** un programa activo, **cuando** cambio de zona, **entonces** se me avisa de que las fechas no cambian y solo cambia cuándo vence cada sesión (riesgo aceptado en 2.1).
- **Casos negativos:** una zona que no es válida → `400`.
- **Pendiente:** ninguno propio. El riesgo de cambiar de zona con un programa activo está aceptado en 2.1.

##### B. Programas de entrenamiento

**HU-08 — Explorar el catálogo de programas**
> **Como** atleta, **quiero** ver los programas disponibles con su nivel, objetivo y duración, **para** elegir el que encaja conmigo.

- **Valor:** decidir con información (P1, F3).
- **Prioridad:** Must Have.
- **Alto nivel:** HU-01.
- **Requisitos:** F3.
- **Endpoints:** `GET /api/programs`.
- **Entidades:** `programs` y `session_templates` (para `slots`).
- **Dependencias:** HU-05 y las *seeds* de T-03.
- **Criterios:**
  1. **Dado** el catálogo cargado, **cuando** lo abro, **entonces** veo cada programa con su nombre, nivel, objetivo y duración en semanas.
  2. **Dado** mis días configurados, **cuando** veo el catálogo, **entonces** distingo qué programas son compatibles con mi número de días.
- **Casos negativos:** catálogo vacío → un estado vacío explícito (CT-02).
- **Decisiones:** 3 programas de 6 semanas (DP-02, DP-04), y "intermedio" como criterio orientativo, sin bloqueo del acceso (DP-03).
- **Pendiente:** el contenido de los 3 programas (1.2).

**HU-09 — Ver el detalle de un programa y sus prescripciones**
> **Como** atleta, **quiero** ver la secuencia semanal que me tocaría y los ejercicios prescritos de cada sesión, **para** saber qué voy a entrenar antes de inscribirme.

- **Valor:** transparencia sobre el plan antes de comprometerse (F3, paso 3 del flujo principal).
- **Prioridad:** Must Have.
- **Alto nivel:** HU-01.
- **Requisitos:** F3 y RP3.
- **Endpoints:** `GET /api/programs/{programId}` y `GET /api/programs/{programId}/templates/{templateId}`.
- **Entidades:** `programs`, `session_templates`, `template_exercises` y `exercises`.
- **Dependencias:** HU-08.
- **Criterios:**
  1. **Dado** mis días configurados, **cuando** abro un programa, **entonces** veo la secuencia que me corresponde según la tabla de 1.2 (HU-01, criterio 2).
  2. **Dado** una plantilla (por ejemplo, Push A), **cuando** la abro, **entonces** veo, para cada semana, sus ejercicios en orden con las series, las repeticiones o el tiempo, y el descanso.
  3. **Dado** que no he configurado mis días, **cuando** abro un programa, **entonces** veo sus plantillas y se me indica que configure mis días para ver mi secuencia.
- **Casos negativos:** una plantilla que no pertenece al programa → `404`.
- **Decisión:** repeticiones fijas, por ejemplo 3 × 8 (DP-05). **Pendiente:** el contenido de las prescripciones (1.2).

**HU-10 — Activar un programa**
> **Como** atleta, **quiero** confirmar un programa compatible, **para** que se genere mi calendario completo.

- **Valor:** convierte la elección en un plan con fechas (F4).
- **Prioridad:** Must Have.
- **Alto nivel:** HU-01, que es su desarrollo directo.
- **Requisitos:** F4 y RP1–RP4.
- **Endpoints:** `POST /api/enrollments`.
- **Entidades:** `enrollments` y `scheduled_sessions`.
- **Dependencias:** HU-06 y HU-09.
- **Criterios:** HU-01, criterios 3–8. Además:
  - **Dado** la pantalla de confirmación, **cuando** la reviso, **entonces** veo el día de inicio y el número total de sesiones antes de confirmar.
- **Casos negativos:**
  - dos activaciones simultáneas → solo una inscripción activa (API-15);
  - programa incompatible → `422`.
- **Decisiones:** un solo programa activo (DP-07), primera sesión el día elegido posterior a la activación (DP-01) y abandono fuera del MVP (DP-14).
- **Pendiente:** ninguno propio.

**HU-11 — Consultar mi programa activo**
> **Como** atleta, **quiero** ver qué programa tengo activo y en qué fechas empieza y termina, **para** orientarme en mi plan.

- **Valor:** contexto permanente del plan en curso (F4, F5).
- **Prioridad:** Must Have.
- **Alto nivel:** HU-01.
- **Requisitos:** F4 y F5.
- **Endpoints:** `GET /api/enrollments/active`.
- **Entidades:** `enrollments` y `programs`.
- **Dependencias:** HU-10.
- **Criterios:**
  1. **Dado** un programa activo, **cuando** abro la app, **entonces** veo su nombre, los días elegidos, la fecha de inicio y la de fin.
  2. **Dado** que no tengo ningún programa activo, **cuando** abro la app, **entonces** se me invita a elegir uno del catálogo.
- **Casos negativos:** un programa cuya última sesión ya venció aparece como terminado, no como activo, tras la reconciliación.
- **Decisión:** un solo programa activo (DP-07). **Pendiente:** ninguno propio.

##### C. Calendario y sesiones

**HU-12 — Ver mi calendario con el estado de cada sesión**
> **Como** atleta, **quiero** ver todas las sesiones de mi programa con su fecha y su estado, **para** saber qué he hecho y qué me queda.

- **Valor:** visión completa del plan y de la constancia (P2, P5, F5).
- **Prioridad:** Must Have.
- **Alto nivel:** HU-01 y HU-02.
- **Requisitos:** F5 y RP4.
- **Endpoints:** `GET /api/enrollments/{enrollmentId}/sessions`.
- **Entidades:** `scheduled_sessions` y `session_templates`.
- **Dependencias:** HU-10.
- **Criterios:**
  1. **Dado** un programa activo, **cuando** abro el calendario, **entonces** veo las sesiones en orden, cada una con su fecha local, su plantilla (por ejemplo, Push A), su semana del programa y su estado.
  2. **Dado** sesiones en los cuatro estados, **cuando** las veo, **entonces** distingo con texto e icono si están pendientes (`planned`), completadas (`completed`), parciales (`partial`) u omitidas (`skipped`) (CT-03).
  3. **Dado** una sesión omitida, **cuando** reviso las siguientes, **entonces** conservan su fecha original (RP5).
- **Casos negativos:** el calendario de otro atleta → `404`.
- **Pendiente:** ninguno propio.

**HU-13 — Ver la sesión de hoy o la próxima**
> **Como** atleta, **quiero** abrir la app y ver directamente la sesión que me toca hoy, o la próxima si hoy no entreno, **para** empezar a entrenar sin buscarla.

- **Valor:** es la acción principal del uso diario (1.3).
- **Prioridad:** Must Have.
- **Alto nivel:** HU-02.
- **Requisitos:** F5.
- **Endpoints:** `GET /api/sessions/today`.
- **Entidades:** `scheduled_sessions`, `template_exercises` y `set_logs`.
- **Dependencias:** HU-10.
- **Criterios:**
  - HU-02, criterio 1.
  - **Dado** que hoy ya finalicé mi sesión, **cuando** abro "Hoy", **entonces** la veo como completada y sin acciones de registro.
  - **Dado** que mi programa terminó, **cuando** abro "Hoy", **entonces** no veo ninguna sesión y se me dirige al resumen (HU-22).
- **Casos negativos:** sin programa activo → estado vacío con acceso al catálogo.
- **Decisión:** un solo programa activo (DP-07), así que hay una sola sesión "de hoy". **Pendiente:** ninguno propio.

**HU-14 — Consultar el detalle de cualquier sesión**
> **Como** atleta, **quiero** abrir una sesión pasada o futura y ver su prescripción y, si la hubo, mi ejecución, **para** prepararme o revisar lo que hice.

- **Valor:** revisar sesiones concretas, incluidas las `partial` con sus registros (F5, F9).
- **Prioridad:** Must Have.
- **Alto nivel:** HU-02 y HU-03.
- **Requisitos:** F5 y F9.
- **Endpoints:** `GET /api/sessions/{sessionId}`.
- **Entidades:** `scheduled_sessions`, `template_exercises`, `exercises` y `set_logs`.
- **Dependencias:** HU-12.
- **Criterios:**
  1. **Dado** una sesión futura, **cuando** la abro, **entonces** veo la prescripción de su semana sin poder registrar.
  2. **Dado** una sesión `partial` o `completed`, **cuando** la abro, **entonces** veo sus series registradas junto a la prescripción, en modo solo lectura.
  3. **Dado** una sesión `skipped`, **cuando** la abro, **entonces** veo que se omitió y que no tiene registros.
- **Casos negativos:** la sesión de otro atleta → `404`.
- **Pendiente:** ninguno propio.

##### D. Ejecución del entrenamiento

Las historias HU-15 a HU-17 comparten las **validaciones de estado y de fecha local** de HU-02 (criterios 4 y 5) y de HU-03 (criterios 3 y 4):
- solo se puede actuar sobre una sesión `planned` cuya fecha es hoy en la zona del atleta;
- los estados finales no admiten cambios (`409`).

**HU-15 — Registrar una serie realizada**
> **Como** atleta, **quiero** anotar las repeticiones o el tiempo de cada serie mientras entreno, **para** conservar mi desempeño real.

- **Valor:** el dato de desempeño que distingue a Cali Coach de un simple control de asistencia (P4, F9).
- **Prioridad:** Must Have.
- **Alto nivel:** HU-02.
- **Requisitos:** F9 y CE4.
- **Endpoints:** `POST /api/sessions/{sessionId}/sets`.
- **Entidades:** `set_logs` y `template_exercises`.
- **Dependencias:** HU-13.
- **Criterios:**
  - HU-02, criterios 2, 6 y 7.
  - **Dado** un ejercicio medido en repeticiones, **cuando** registro una serie, **entonces** el formulario me pide repeticiones. Si se mide en tiempo, me pide segundos.
  - **Dado** una serie guardada, **cuando** vuelvo a la sesión, **entonces** la veo en su posición (serie 1, 2, 3…).
- **Casos negativos:**
  - una prescripción de otra plantilla o semana → `422` (API-29, API-30);
  - doble envío → una sola serie (API-18, API-19);
  - una sesión que no es de hoy → `409`.
- **Decisiones:**
  - solo las series prescritas; una de más → `422` (DP-10);
  - segundos en los ejercicios por tiempo (DP-11);
  - solo en la fecha programada (DP-08).
- **Pendiente:** ninguno propio.

**HU-16 — Corregir o eliminar una serie registrada**
> **Como** atleta, **quiero** corregir una serie mal anotada o eliminarla, **para** que mi registro refleje lo que hice.

- **Valor:** fiabilidad del historial de desempeño (F9).
- **Prioridad:** Must Have.
- **Alto nivel:** HU-02.
- **Requisitos:** F9.
- **Endpoints:** `PATCH` y `DELETE /api/sessions/{sessionId}/sets/{setId}`.
- **Entidades:** `set_logs`.
- **Dependencias:** HU-15.
- **Criterios:**
  - HU-02, criterio 3.
  - **Dado** una serie, **cuando** cambio sus repeticiones, **entonces** se guarda el nuevo valor y la sesión sigue `planned`.
  - **Dado** que elimino todas las series de la sesión de hoy, **cuando** termina el día sin finalizarla, **entonces** la sesión se cierra como `skipped` (2.2).
- **Casos negativos:**
  - editar o eliminar en una sesión cerrada → `409` (API-25);
  - una serie que no pertenece a la sesión → `404` (API-14).
- **Pendiente:** ninguno propio.

**HU-17 — Finalizar explícitamente mi sesión**
> **Como** atleta, **quiero** marcar como terminada la sesión de hoy cuando acabo, **para** que cuente como completada.

- **Valor:** es la única forma de llegar a `completed`, y distingue lo terminado de lo empezado (F6).
- **Prioridad:** Must Have.
- **Alto nivel:** HU-03.
- **Requisitos:** F6.
- **Endpoints:** `POST /api/sessions/{sessionId}/complete`.
- **Entidades:** `scheduled_sessions` y `enrollments`.
- **Dependencias:** HU-13 y HU-15, porque finalizar exige al menos una serie registrada (DP-09).
- **Criterios:**
  - HU-03, criterios 1–5.
  - **Dado** el botón "Finalizar", **cuando** lo pulso, **entonces** se me pide confirmarlo y, tras confirmar, la sesión aparece completada y sin acciones de registro.
  - **Dado** una sesión de hoy sin ninguna serie, **cuando** la veo, **entonces** el botón "Finalizar" aparece desactivado y explica que hace falta al menos una serie. Si se intenta igualmente, la API responde `409` (DP-09; API-47).
- **Casos negativos:**
  - finalizar sin la protección CSRF → `403`;
  - finalizar una sesión de otro día → `409` (API-23).
- **Decisión:** finalizar exige al menos una serie, aunque no todas las prescritas (DP-09). **Pendiente:** ninguno propio.

**HU-18 — Ver cerradas automáticamente las sesiones que no finalicé**
> **Como** atleta, **quiero** que una sesión que no finalicé se cierre sola al terminar su día, como parcial si registré algo o como omitida si no, **para** que mi calendario y mi progreso reflejen lo que realmente pasó.

- **Valor:** un historial veraz sin intervención manual (F7, P2).
- **Prioridad:** Must Have.
- **Alto nivel:** HU-02 y HU-03.
- **Requisitos:** F7, RP5 y CE3.
- **Endpoints:** no tiene uno propio. Se observa en los `GET` que reconcilian (sección 4, convenciones).
- **Entidades:** `scheduled_sessions`, `set_logs` y `enrollments`.
- **Dependencias:** HU-12 o HU-13 para verlo, y HU-15 para el caso `partial`.
- **Criterios:**
  - HU-02, criterios 8–10.
  - **Dado** que la sesión vencida era la última `planned` del programa, **cuando** se cierra, **entonces** el programa aparece terminado (RP6).
- **Casos negativos:** una serie justo antes de medianoche mientras se cierra la sesión → `partial` y la serie se conserva (C1).
- **Pendiente:** ninguno propio. Mantener la reconciliación en los `GET` es un compromiso técnico [Propuesta] de 2.2, no una decisión del Product Owner.

##### E. Historial y progreso

**HU-19 — Consultar el resumen de progreso de mi programa**
> **Como** atleta, **quiero** ver en qué semana estoy y cuántas sesiones he completado, dejado a medias u omitido, **para** valorar mi constancia.

- **Valor:** el reconocimiento del progreso motiva (P5, F8).
- **Prioridad:** Must Have.
- **Alto nivel:** HU-03.
- **Requisitos:** F8 y CE4.
- **Endpoints:** `GET /api/enrollments/{enrollmentId}/progress`.
- **Entidades:** `scheduled_sessions` y `enrollments`.
- **Dependencias:** HU-10 y HU-18, para tener recuentos de sesiones cerradas.
- **Criterios:**
  - HU-03, criterio 6.
  - **Dado** que aún no hay ninguna sesión cerrada, **cuando** abro el progreso, **entonces** la adherencia aparece como "sin datos" y no como 0 %.
- **Casos negativos:** el progreso de otro atleta → `404`.
- **Decisión:** adherencia = `100 × (completed + 0,5 × partial) / (completed + partial + skipped)`, solo sobre las sesiones evaluables; "sin datos" si no hay ninguna (DP-12, DP-13). **Pendiente:** ninguno propio.

**HU-20 — Comparar lo prescrito con lo que realicé**
> **Como** atleta, **quiero** ver, por ejercicio, lo que me pedía el programa frente a lo que hice en cada sesión, **para** detectar avances o estancamientos.

- **Valor:** detectar estancamientos con datos (P4, F8, F9).
- **Prioridad:** Must Have.
- **Alto nivel:** HU-03.
- **Requisitos:** F8 y F9.
- **Endpoints:** `GET /api/enrollments/{enrollmentId}/progress/exercises`.
- **Entidades:** `set_logs`, `template_exercises`, `exercises` y `scheduled_sessions`.
- **Dependencias:** HU-15.
- **Criterios:**
  - HU-03, criterio 7.
  - **Dado** un ejercicio concreto, **cuando** filtro por él, **entonces** veo su evolución en orden de fecha.
- **Casos negativos:** un ejercicio sin registros → estado vacío. Las sesiones `skipped` no aparecen.
- **Decisión:** los ejercicios por tiempo se comparan en segundos, sin convertirlos en repeticiones (DP-11). **Pendiente:** ninguno propio.

**HU-21 — Consultar mis programas anteriores**
> **Como** atleta, **quiero** ver los programas que ya terminé, con su calendario y su progreso, **para** conservar mi historial.

- **Valor:** historial a largo plazo (P5).
- **Prioridad:** Should Have, confirmada por DP-16. No es una funcionalidad propia en F1–F10; se deduce del "historial de sesiones" de P5 y de HU-03 (criterio 8).
- **Alto nivel:** HU-03.
- **Requisitos:** F8 (P5).
- **Endpoints:**
  - `GET /api/enrollments`;
  - `GET /api/enrollments/{enrollmentId}`;
  - `GET /api/enrollments/{enrollmentId}/sessions`;
  - `GET /api/enrollments/{enrollmentId}/progress`.
- **Entidades:** `enrollments`, `programs` y `scheduled_sessions`.
- **Dependencias:** HU-19 y HU-22.
- **Criterios:**
  1. **Dado** varias inscripciones, **cuando** abro el historial, **entonces** las veo de la más reciente a la más antigua, con su estado.
  2. **Dado** una inscripción terminada, **cuando** la abro, **entonces** veo su calendario y su progreso en modo solo lectura.
- **Casos negativos:** la inscripción de otro atleta → `404`.
- **Decisión:** sigue siendo Should. No forma parte del recorrido obligatorio, y los datos y endpoints del historial se conservan (DP-16). **Pendiente:** ninguno propio.

**HU-22 — Ver el resumen al terminar el programa e inscribirme en otro**
> **Como** atleta, **quiero** ver un resumen cuando acabo un programa y poder elegir el siguiente, **para** continuar progresando.

- **Valor:** cierra el ciclo del programa y da continuidad (paso 8 del flujo principal, RP6).
- **Prioridad:** Must Have. Forma parte del flujo principal confirmado (1.3, paso 8).
- **Alto nivel:** HU-03.
- **Requisitos:** F4, F8 y RP6.
- **Endpoints:**
  - `GET /api/enrollments/active`, que devuelve `null`;
  - `GET /api/enrollments/{enrollmentId}/progress`;
  - `POST /api/enrollments`.
- **Entidades:** `enrollments` y `scheduled_sessions`.
- **Dependencias:** HU-17, HU-18 y HU-19.
- **Criterios:**
  1. **Dado** que mi última sesión `planned` se finaliza o se cierra, **cuando** abro la app, **entonces** veo el resumen del programa terminado: recuentos y adherencia.
  2. **Dado** el resumen, **cuando** elijo otro programa, **entonces** puedo activarlo (HU-01, criterio 7).
- **Casos negativos:** si quedan sesiones de hoy o futuras, el programa no se considera terminado y no se puede activar otro (`409`, API-41).
- **Decisiones:** un solo programa activo (DP-07) y abandono fuera del MVP (DP-14). **Pendiente:** ninguno propio.

##### Mejoras posteriores (no bloquean el recorrido principal)

**HU-23 — Ver hitos de reconocimiento**
> **Como** atleta, **quiero** ver hitos sencillos, como mi primera sesión, mi primera semana completa o mi programa terminado, **para** sentir reconocido mi progreso.

- **Valor:** motivación adicional (P5).
- **Prioridad:** Should Have (F10, Deseable).
- **Alto nivel:** HU-03, que lo deja fuera de su alcance.
- **Requisitos:** F10.
- **Endpoints:** **ninguno en la sección 4.** Habría que definirlo en el contrato antes de implementarlo; se calcularía a partir del historial, sin tablas nuevas (3.2).
- **Entidades:** `scheduled_sessions` y `enrollments`.
- **Dependencias:** HU-19 y HU-22.
- **Criterios:** se definirán cuando se especifique. Los ejemplos de hitos vienen de F10.
- **Decisión:** mejora posterior. Sin insignias, recompensas ni notificaciones en el MVP; la historia se conserva (DP-17). **Pendiente:** la definición de cada hito y su endpoint, cuando se planifique.

##### Fuera de alcance del MVP

No se crean historias para lo siguiente, porque está excluido en 1.2 o necesita decisiones o cambios de arquitectura:
- Recomendaciones o generación de programas mediante IA.
- PWA y Capacitor.
- Reabrir o reprogramar sesiones.
- Programas propios y panel de administración.
- Contenido multimedia, funciones sociales, nutrición, *wearables* y pagos.
- Gamificación más allá de F10.
- **Excluido por decisión del Product Owner:**
  - varios programas activos a la vez (DP-07);
  - abandonar o cancelar un programa (DP-14);
  - cambiar los días con un programa activo (DP-06).
- **No están en F1:** cambio de contraseña, verificación del email y eliminación de la cuenta.

##### Resumen del backlog y cobertura de requisitos

| Historia | Título | Prioridad | Alto nivel |
|----------|--------|-----------|------------|
| HU-04 | Crear mi cuenta | Must | Requisito previo |
| HU-05 | Iniciar sesión, mantenerla y cerrarla | Must | Requisito previo |
| HU-06 | Configurar mis días de entrenamiento | Must | HU-01 |
| HU-07 | Revisar y ajustar mi zona horaria | Must | HU-01, HU-02 |
| HU-08 | Explorar el catálogo | Must | HU-01 |
| HU-09 | Detalle del programa y prescripciones | Must | HU-01 |
| HU-10 | Activar un programa | Must | HU-01 |
| HU-11 | Consultar mi programa activo | Must | HU-01 |
| HU-12 | Calendario con estados | Must | HU-01, HU-02 |
| HU-13 | Sesión de hoy o la próxima | Must | HU-02 |
| HU-14 | Detalle de cualquier sesión | Must | HU-02, HU-03 |
| HU-15 | Registrar una serie | Must | HU-02 |
| HU-16 | Corregir o eliminar una serie | Must | HU-02 |
| HU-17 | Finalizar mi sesión | Must | HU-03 |
| HU-18 | Cierre automático visible | Must | HU-02, HU-03 |
| HU-19 | Resumen de progreso | Must | HU-03 |
| HU-20 | Prescrito frente a realizado | Must | HU-03 |
| HU-21 | Programas anteriores | Should (DP-16) | HU-03 |
| HU-22 | Resumen final e inscripción en otro programa | Must | HU-03 |
| HU-23 | Hitos de reconocimiento | Should | — |

| Requisito | Prioridad en la sección 1 | Historias que lo cubren |
|-----------|---------------------------|-------------------------|
| F1 Registro e inicio de sesión | Imprescindible | HU-04, HU-05 |
| F2 Disponibilidad | Imprescindible | HU-06, más la zona horaria de HU-07 |
| F3 Catálogo | Imprescindible | HU-08, HU-09 |
| F4 Inscripción y calendario | Imprescindible | HU-10, HU-11, HU-22 |
| F5 Sesión del día y calendario | Imprescindible | HU-12, HU-13, HU-14 |
| F6 Finalizar sesión | Imprescindible | HU-17 |
| F7 Cierre automático | Imprescindible | HU-18, más la zona horaria de HU-07 |
| F8 Panel de progreso | Imprescindible | HU-19, HU-20, HU-21 |
| F9 Registro de ejecución | Imprescindible | HU-15, HU-16, HU-14 |
| F10 Hitos | Deseable | HU-23 (mejora posterior) |

**Todos los requisitos Imprescindibles (F1–F9) tienen al menos una historia Must Have.** El único Deseable (F10) queda como mejora posterior.

##### Matriz de trazabilidad

| Historia | Requisito | Alto nivel | Endpoints (sección 4) | Entidades (3.2) | Ticket | Prioridad |
|----------|-----------|------------|-----------------------|-----------------|--------|-----------|
| HU-04 | F1 | — | `POST /api/auth/register` | `users` | T-01, T-02, T-03 | Must |
| HU-05 | F1 | — | `POST …/login`, `GET …/me`, `POST …/logout` | `users` | T-01, T-02 | Must |
| HU-06 | F2 | HU-01 | `GET` y `PATCH /api/profile` | `users` | T-01, T-02, T-03 | Must |
| HU-07 | F7 | HU-01, HU-02 | `GET` y `PATCH /api/profile` | `users` | T-01, T-02 | Must |
| HU-08 | F3 | HU-01 | `GET /api/programs` | `programs`, `session_templates` | T-01, T-02, T-03 (*seeds*) | Must |
| HU-09 | F3 | HU-01 | `GET /api/programs/{id}`, `GET …/templates/{id}` | `programs`, `session_templates`, `template_exercises`, `exercises` | T-01, T-02, T-03 | Must |
| HU-10 | F4 | HU-01 | `POST /api/enrollments` | `enrollments`, `scheduled_sessions` | T-01, T-02, T-03 | Must |
| HU-11 | F4, F5 | HU-01 | `GET /api/enrollments/active` | `enrollments`, `programs` | T-01, T-02 | Must |
| HU-12 | F5 | HU-01, HU-02 | `GET /api/enrollments/{id}/sessions` | `scheduled_sessions`, `session_templates` | T-01, T-02 | Must |
| HU-13 | F5 | HU-02 | `GET /api/sessions/today` | `scheduled_sessions`, `template_exercises`, `set_logs` | T-01, T-02 | Must |
| HU-14 | F5, F9 | HU-02, HU-03 | `GET /api/sessions/{id}` | `scheduled_sessions`, `template_exercises`, `set_logs` | T-01, T-02 | Must |
| HU-15 | F9 | HU-02 | `POST /api/sessions/{id}/sets` | `set_logs`, `template_exercises` | T-01, T-02, T-03 | Must |
| HU-16 | F9 | HU-02 | `PATCH` y `DELETE …/sets/{setId}` | `set_logs` | T-01, T-02 | Must |
| HU-17 | F6 | HU-03 | `POST /api/sessions/{id}/complete` | `scheduled_sessions`, `enrollments` | T-01, T-02 | Must |
| HU-18 | F7 | HU-02, HU-03 | Los `GET` que reconcilian | `scheduled_sessions`, `set_logs`, `enrollments` | T-01, T-03 (consultas) | Must |
| HU-19 | F8 | HU-03 | `GET /api/enrollments/{id}/progress` | `scheduled_sessions`, `enrollments` | T-01, T-02, T-03 (consultas) | Must |
| HU-20 | F8, F9 | HU-03 | `GET …/progress/exercises` | `set_logs`, `template_exercises`, `exercises` | T-01, T-02, T-03 (consultas) | Must |
| HU-21 | F8 (P5) | HU-03 | `GET /api/enrollments`, `GET …/{id}`, `GET …/{id}/sessions`, `GET …/{id}/progress` | `enrollments`, `programs`, `scheduled_sessions` | T-01, T-02 | Should (DP-16) |
| HU-22 | F4, F8, RP6 | HU-03 | `GET …/active`, `GET …/progress`, `POST /api/enrollments` | `enrollments`, `scheduled_sessions` | T-01, T-02 | Must |
| HU-23 | F10 | — | Ninguno (por definir) | `scheduled_sessions`, `enrollments` | Ninguno de los actuales | Should |

Los criterios comunes CT-01 a CT-06 corresponden a T-02, en la interfaz, y CT-04 también a T-01, en el *middleware* y la autorización.

##### Incrementos funcionales propuestos

| Incremento | Historias | Capacidad que se puede verificar al terminarlo |
|------------|-----------|------------------------------------------------|
| **I1 · Acceso y perfil** | HU-04, HU-05, HU-06, HU-07 | Un atleta se registra, inicia y cierra sesión, y configura sus días y su zona horaria. Requiere el esquema de `users` (T-03). |
| **I2 · Catálogo** | HU-08, HU-09 | Con las *seeds* provisionales cargadas, el atleta explora los programas y ve su secuencia y sus prescripciones. |
| **I3 · Activación y calendario** | HU-10, HU-11, HU-12, HU-13 | El atleta activa un programa y ve su calendario completo y la sesión de hoy o la próxima. |
| **I4 · Ejecución** | HU-15, HU-16, HU-17, HU-14 | El atleta registra, corrige y borra series y finaliza la sesión de hoy. Las sesiones se pueden consultar en detalle. |
| **I5 · Cierre y fin de programa** | HU-18, HU-22 | Las sesiones vencidas se cierran como `partial` o `skipped`, y al terminar el programa se puede activar otro. |
| **I6 · Progreso y validación E2E** | HU-19, HU-20, HU-21, más CT-01 a CT-06 | Panel de progreso, comparación entre lo prescrito y lo realizado, e historial. Pruebas E2E del flujo completo en los dos perfiles (2.6). |
| *Posterior* | HU-23 | Hitos, cuando se definan su contrato y sus criterios. |

**Relación con el backlog técnico:** la sección 6 adelanta a I3 el núcleo técnico de la reconciliación (DEV-027) y su uso en la activación y en las lecturas (DEV-016 y DEV-017), porque el contrato de la sección 4 lo exige desde que existe la activación. En I3 las sesiones vencidas ya se ven como `skipped`; con series registradas (desde I4), como `partial`. I5 conserva la validación ampliada y la interfaz específica del cierre (HU-18 y HU-22). La capacidad que debe verificarse al cerrar cada incremento no cambia.

**Ajustes respecto al orden propuesto en el prompt:**
- La finalización (HU-17) se adelanta a I4, porque es la única forma de llegar a `completed` y forma parte del **primer recorrido mínimo**.
- El cierre automático (HU-18) va en I5, porque necesita registros (HU-15) para comprobar el caso `partial`.
- El historial (HU-21) pasa a I6, porque reutiliza las vistas de progreso.

**Primer recorrido mínimo de extremo a extremo**, al terminar I4: HU-04 (registro) → HU-06 (días) → HU-08 y HU-10 (elegir y activar) → HU-13 (sesión de hoy) → HU-15 (registrar una serie) → HU-17 (finalizar) → HU-12 (verla `completed` en el calendario). Cubre CE1 y la parte de CE4 sobre el registro. Necesita al menos un programa completo en las *seeds* para el N elegido.

##### Decisiones del Product Owner que afectan al backlog

Todas están **[Confirmada]**. El detalle está en el registro DP-01 a DP-17 de 1.2.

| Decisión confirmada | Historias afectadas |
|---------------------|---------------------|
| DP-07 Un solo programa activo | HU-10, HU-11, HU-13, HU-22 |
| DP-01 Primera sesión al día siguiente de la activación | HU-10 |
| DP-06 Días bloqueados con un programa activo | HU-06 |
| DP-02, DP-04, DP-05: 3 programas de 6 semanas, con repeticiones fijas | HU-08, HU-09, HU-10 |
| DP-03 "Intermedio" como criterio orientativo | HU-08 |
| DP-08 Registro solo en la fecha programada | HU-15, HU-16, HU-17 |
| DP-10 Solo las series prescritas | HU-15 |
| DP-11 Segundos en los ejercicios por tiempo | HU-15, HU-20 |
| DP-09 Finalizar exige al menos una serie | HU-17 |
| DP-12, DP-13 Fórmula de adherencia | HU-19, HU-22 |
| DP-14 Abandonar un programa: fuera del MVP | HU-10, HU-22 |
| DP-15 Sesión de 7 días, sin renovación | HU-05 |
| DP-16 HU-21 sigue siendo Should | HU-21 |
| DP-17 Hitos como mejora posterior | HU-23 |

Queda por definir el **contenido** de los 3 programas (1.2), que afecta a HU-08 y HU-09.

##### Inconsistencias detectadas (no corregidas en otras secciones)

| Punto | Detalle |
|-------|---------|
| Los tickets solo citan HU-01 a HU-03 | **Resuelto:** el backlog técnico de la sección 6 (DEV-001 a DEV-039) relaciona HU-04 a HU-23 con sus tickets. T-01 a T-03 siguen citando solo HU-01 a HU-03, porque son de alto nivel. |
| La zona horaria no aparece en F1 ni en F2 | La sección 1 confirma el cierre según la zona del usuario (F7, RP5), pero ninguna funcionalidad recoge su configuración. Que sea editable es una [Propuesta] de 2.2. HU-07 se asocia a F7. |
| El historial de programas anteriores no tiene funcionalidad propia | P5 menciona el "historial de sesiones" y HU-03 lo incluye, pero F8 no lo detalla. Por eso HU-21 llevaba prioridad *(propuesta)*; el Product Owner la confirmó como Should (DP-16). |
| F10 no tiene endpoint | La sección 4 no define ningún contrato para los hitos. HU-23 no se puede implementar sin ampliarla. |
| Dos niveles de prioridad frente a MoSCoW | La sección 1 usa Imprescindible y Deseable. La equivalencia con Must y Should es una propuesta de este backlog. |
| Límite de tres historias de la plantilla | Las tres historias oficiales se mantienen bajo sus marcadores. El backlog es un apartado complementario y no sustituye a esos marcadores. |

---

## 6. Tickets de Trabajo

> Documenta 3 de los tickets de trabajo principales del desarrollo, uno de backend, uno de frontend, y uno de bases de datos. Da todo el detalle requerido para desarrollar la tarea de inicio a fin teniendo en cuenta las buenas prácticas al respecto.

> **Estado de esta sección:** son los **tres tickets técnicos previstos** para implementar las historias HU-01 a HU-03. Ninguno está empezado: solo existe el andamiaje técnico de DEV-001, sin migraciones ni pruebas de negocio. Las pruebas citadas son **propuestas** de 2.6, 3.2 y la sección 4. La "Definición de terminado" describe condiciones **futuras** para cerrar cada ticket, no condiciones ya cumplidas. Las especificaciones detalladas no se repiten aquí: cada ticket remite a la sección correspondiente.
>
> Los tickets se numeran según la plantilla (backend, frontend, base de datos). El **orden de implementación recomendado** es distinto: T-03 → T-01 → T-02 (ver "Dependencias y orden de implementación").

**Ticket 1**

**T-01 — Backend: API REST, reglas de negocio, seguridad y concurrencia**

**Identificación**
- **Área:** backend (Node.js, Express y TypeScript, en un monolito modular, 2.1).
- **Prioridad:** Imprescindible.
- **Historias:** HU-01, HU-02 y HU-03.
- **Requisitos:** F1–F9. F10 (hitos, deseable) queda fuera.

**Objetivo**
- **Problema:** la SPA necesita una API que sea la **única fuente de verdad** sobre calendario, estados y progreso (2.2), y que aplique las reglas de negocio, la autorización y el protocolo de concurrencia aunque el cliente falle o se manipule.
- **Resultado esperado:** los 22 endpoints de la sección 4 funcionan con el contrato documentado:
  - autenticación con cookie JWT y CSRF;
  - perfil y catálogo;
  - activación con calendario materializado;
  - registro de series;
  - finalización explícita;
  - reconciliación de sesiones vencidas;
  - progreso.

**Alcance**
- **Incluido:**
  - módulos `auth`, `profile`, `programs`, `enrollments`, `sessions` y `progress`, con capas controlador → servicio → repositorio (2.2 y 2.3);
  - dominio puro (`scheduler`, `sessionLifecycle`, `WEEKLY_SEQUENCES` y `Clock`);
  - cadena de *middleware*;
  - formato de errores uniforme.
- **Responsabilidades técnicas:**
  - las transacciones T-activación, T-registro, T-finalizar y T-cierre, siguiendo el protocolo de 2.2;
  - el reloj inyectable;
  - la traducción de los errores SQL (`23505`, `40P01`, `55P03`) a HTTP.
- **Excluido:**
  - cambio de contraseña, porque no está en F1 (riesgo detectado en la sección 4);
  - abandonar un programa;
  - administración del catálogo;
  - `Idempotency-Key`;
  - hitos (F10);
  - la tarea programada opcional de reconciliación (2.2), que no es necesaria para que el sistema funcione correctamente;
  - las alternativas pendientes a la reconciliación en `GET`.

**Tareas técnicas**
1. **Configuración y arranque** (`shared/config`):
   - variables `NODE_ENV`, `APP_ORIGIN` y el secreto JWT de al menos 32 bytes;
   - cookie `session` solo con `NODE_ENV=development` o `test`;
   - con cualquier otro entorno, **negarse a arrancar** si la cookie no es `__Host-session` con `Secure` o si `APP_ORIGIN` no es `https` (2.5 y sección 4);
   - `trust proxy` y `helmet` con HSTS y CSP.
2. **Cadena de *middleware*** en el orden de la sección 4:
   - `X-Request-Id`;
   - CSRF, que comprueba `Origin`, o en su defecto `Sec-Fetch-Site` o `Referer`, más `X-CSRF-Protection`, en todo `POST`, `PUT`, `PATCH` y `DELETE`;
   - regla de cuerpo y tipo de contenido, incluidas las operaciones sin cuerpo;
   - límite de peticiones en `register` y `login`;
   - autenticación con comprobación de `token_version`;
   - validación Zod en modo estricto;
   - manejador central de errores con `{ error: { code, message, details, requestId } }`.
3. **`auth`:**
   - `register`, `login`, `me` y `logout`, con un *hash* de contraseña bcrypt o argon2 (2.5; la elección se hará al implementar);
   - un *hash* de relleno cuando el email no existe, para que el tiempo de respuesta no lo revele;
   - `logout` incrementa `token_version`;
   - el JWT nunca va en el cuerpo de la respuesta.
4. **`profile`:** `GET` y `PATCH /api/profile`, con de 2 a 6 días distintos y una zona IANA válida. **Los días no se pueden cambiar con un programa activo** (DP-06): primero se reconcilia y después, con la fila de `users` bloqueada, se responde `409 AVAILABILITY_LOCKED` si hay una inscripción activa. La zona horaria sigue siendo editable.
5. **`programs`:** lectura del catálogo con los campos derivados `slots`, `weeklySequence` y `compatible`.
6. **Dominio puro:**
   - `WEEKLY_SEQUENCES` para N = 2…6 (tabla de 1.2);
   - `scheduler.generate({ today, weekdays, weeks, sequence, includeActivationDay })` con `includeActivationDay = false`, fijo (DP-01), determinista: `N × semanas` sesiones, hueco `sequence[i mod N]` y `weekNumber = floor(i / N) + 1`;
   - `sessionLifecycle.resolveClosure`;
   - `Clock`, configurable solo con `NODE_ENV=test`.
7. **`enrollments`:** el flujo 1 de 2.2:
   - reconciliación previa en su propia transacción;
   - comprobaciones, con `422` si falta algún dato;
   - `scheduler`;
   - T-activación en una sola transacción;
   - `23505` → `409`, sin reintentar.
8. **`sessions`:**
   - sesión de hoy, detalle y calendario;
   - T-registro para crear, editar y borrar series, con la regla 8 de 3.2 (la prescripción debe pertenecer a la plantilla y la semana de la sesión);
   - T-finalizar, con el orden de comprobación del paso 3 de 2.2;
   - T-cierre en SQL directo, con `READ COMMITTED`, `SELECT … ORDER BY id FOR UPDATE OF s`, la clasificación en una sentencia posterior y el bloqueo de la inscripción;
   - en todas: `SET LOCAL lock_timeout`, reintento acotado de la transacción completa ante `40P01` o `55P03`, y `503`.
9. **Reconciliación en `GET`:** solo en los `GET` que enumera la sección 4, en una transacción corta y separada de la lectura, y con las restricciones de 2.2.
10. **`progress`:** semana actual, recuentos por separado, adherencia con la fórmula de DP-13 sobre las sesiones evaluables de DP-12, y desempeño prescrito frente a realizado, con las consultas de T-03.
11. **Autorización:**
    - cada función de repositorio que toca datos del atleta recibe `userId` como parámetro obligatorio;
    - un recurso ajeno o inexistente responde el mismo `404`.
- **Integraciones:**
  - con T-03: el esquema, las *seeds* y las consultas SQL de reconciliación y progreso;
  - con T-02: el contrato de la sección 4.

**Criterios de aceptación**
1. Los 22 endpoints responden con las rutas, cuerpos, códigos y formato de error de la sección 4.
2. Ningún campo de las respuestas falta en el modelo de 3.2, salvo los marcados como derivados.
3. **Autenticación:**
   - `register` y `login` emiten la cookie con los atributos del entorno;
   - con JWT caducado, con `alg: none`, con la firma alterada o con `token_version` antiguo → `401` (API-07–API-11).
4. **CSRF:**
   - cualquier operación que modifica datos sin `Origin` válido, o sin `Sec-Fetch-Site` o `Referer` válidos, o sin `X-CSRF-Protection` → `403`, sin efectos;
   - un tipo de contenido no JSON en una operación con cuerpo → `415`;
   - un cuerpo no vacío en una operación sin cuerpo → `400` (API-01–API-06, API-43).
5. **Autorización:** todo acceso a recursos de otro usuario responde igual que a un recurso inexistente (`404`) y no modifica nada (API-12–API-14).
6. **Calendario:** para cualquier N entre 2 y 6 y cualquier duración, se generan exactamente `N × semanas` sesiones `planned`, con la secuencia de 1.2, solo en los días elegidos, en orden y empezando el siguiente día elegido **posterior** a la activación, aunque la activación caiga en un día elegido (DP-01). Con 6 semanas (DP-04), `N × 6` sesiones.
7. **Activación:**
   - un solo programa activo (DP-07);
   - reconciliación previa;
   - `422` con datos incompletos;
   - dos activaciones simultáneas → una `201` y otra `409` (API-15–API-17, API-40, API-41).
8. **Series:**
   - registrar, editar o borrar **no** cambia el estado;
   - una sesión que no es de hoy o está en un estado final → `409`;
   - una prescripción de otra plantilla o semana, o una forma de medida que no coincide → `422`;
   - una serie duplicada → `409` sin crear otra fila (API-18–API-21, API-25, API-28–API-31).
9. **Finalización:**
   - una sesión `planned` de hoy con al menos una serie pasa a `completed`, y sin series → `409 NO_SETS_LOGGED` (DP-09);
   - una ya `completed` devuelve `200` sin cambios, de cualquier fecha;
   - `partial`, `skipped` o fuera del día → `409`;
   - al no quedar sesiones `planned`, la inscripción pasa a `finished` (API-22–API-24, API-42).
10. **Cierre:** al vencer la fecha local, la sesión pasa a `partial` con registros y a `skipped` sin ellos. Nunca cambia una `completed` ni la fecha de otra sesión, y la reconciliación es idempotente (CE3, API-32–API-35, API-44).
11. **Concurrencia:** los escenarios C1–C8 de 2.6 producen los resultados esperados, y las invariantes de 2.6 se cumplen al final de cada uno.
12. **Errores:** no se exponen trazas ni SQL. Un fallo de bloqueo que persiste → `503` sin guardar nada (API-36–API-39).

**Pruebas propuestas**
- **Unitarias (Vitest):**
  - `scheduler`: N = 2…6, varias duraciones, inicio a mitad de semana, cambios de mes, de año y de horario;
  - `sessionLifecycle`;
  - `Clock` en `Pacific/Kiritimati` y `Pacific/Pago_Pago`;
  - validadores Zod.
- **Integración y contrato (Vitest y Supertest contra PostgreSQL de pruebas):** la matriz API-01 a API-45 de la sección 4.
- **Concurrencia (dos conexiones `pg`):** C1–C8 con detección de esperas mediante `pg_stat_activity`, API-26, API-27 y API-40.

**Dependencias**
- Requiere el esquema y las *seeds* de T-03 para las pruebas de integración. El dominio puro puede hacerse antes.
- T-02 depende de este ticket para la integración real.
- **Decisiones confirmadas del Product Owner que aplica** (registro de 1.2):
  - DP-07: un solo programa activo;
  - DP-01: excluir el día de activación;
  - DP-06: días bloqueados con un programa activo;
  - DP-08: registro solo en la fecha programada;
  - DP-09: finalizar con al menos una serie;
  - DP-10: solo las series prescritas;
  - DP-11: segundos en los ejercicios por tiempo;
  - DP-12 y DP-13: adherencia;
  - DP-15: 7 días sin renovación.

  Siguen abiertas solo las decisiones técnicas de 1.2: bcrypt o argon2, umbrales y redondeo.

**Definición de terminado** (condiciones para cerrarlo; aún no se cumplen)
- Endpoints, dominio y *middleware* implementados según las tareas 1–11.
- Pruebas unitarias, de integración y contrato, y de concurrencia **ejecutadas con resultado satisfactorio** en CI, incluidas C1–C8.
- Criterios de aceptación 1–12 comprobados.
- Se ha documentado en las secciones 1.4 y 2 cualquier desviación respecto a lo documentado.
- Los cambios se han revisado y fusionado mediante Pull Request.

**Ticket 2**

**T-02 — Frontend: experiencia mobile-first del flujo principal**

**Identificación**
- **Área:** frontend (React, TypeScript y Vite, 2.2). La librería TanStack Query es una [Propuesta].
- **Prioridad:** Imprescindible.
- **Historias:** HU-01, HU-02 y HU-03.
- **Requisitos:** F1–F6, F8 y F9, más la visualización del resultado de F7. Criterios de éxito CE1, CE4 y CE5.

**Objetivo**
- **Problema:** el atleta usa la app desde el móvil, a menudo con una mano y durante el entrenamiento (1.3). Necesita ver qué toca hoy, anotar series y finalizar sin errores ni envíos duplicados.
- **Resultado esperado:** la SPA cubre el flujo principal de 1.3, desde el registro hasta el fin del programa. Consume solo la API de la sección 4 y funciona desde 320 px.

**Alcance**
- **Incluido:**
  - pantallas de registro e inicio de sesión;
  - disponibilidad semanal y zona horaria;
  - catálogo y detalle de los programas;
  - confirmación de la activación;
  - calendario;
  - sesión de hoy, con registro, edición y borrado de series y finalización;
  - progreso, desempeño e historial;
  - cierre de sesión.
- **Responsabilidades:**
  - el cliente HTTP;
  - la gestión de errores por `code`;
  - los estados de carga, vacíos y de error;
  - la protección contra envíos duplicados;
  - la accesibilidad;
  - el diseño adaptable.
- **Excluido:**
  - **decidir estados o calcular fechas**, porque la fuente de verdad es el backend (2.2);
  - PWA, Capacitor y modo sin conexión;
  - **idiomas adicionales al inglés y selector de idioma** (localización). La internacionalización técnica, es decir, la preparación para añadir idiomas, sí forma parte del MVP (DEV-038). *(Antes decía "internacionalización"; se precisó para reflejar la decisión confirmada.)*;
  - hitos (F10).

**Tareas técnicas**
1. **Base** (`app/`): *router*, *providers* y un *layout* mobile-first con la navegación principal confirmada **Today · Program · Progress · Profile**. *Program* incluye el catálogo, el programa activo y el calendario (`docs/design-system.md`, sección 4). La sesión de hoy está a un toque desde el inicio (1.3). *(Antes decía "Hoy, Calendario, Progreso, Perfil"; se actualizó para reflejar la decisión confirmada.)*
2. **Cliente HTTP** (`shared/`):
   - rutas relativas `/api`, con el mismo origen y las cookies del mismo sitio;
   - `X-CSRF-Protection: 1` en todo `POST`, `PUT`, `PATCH` y `DELETE`;
   - `Content-Type: application/json` solo en las operaciones con cuerpo;
   - traducción de `error.code` a mensajes;
   - un `401` lleva al inicio de sesión;
   - un `503` muestra la opción de reintentar.

   El cliente **no** guarda el JWT, porque es `HttpOnly`.
3. **`auth`:**
   - formularios de registro e inicio de sesión;
   - el registro envía `timezone` a partir de `Intl.DateTimeFormat().resolvedOptions().timeZone`;
   - el `INVALID_CREDENTIALS` genérico se muestra sin dar pistas;
   - cerrar sesión.
4. **`profile`:**
   - selector de días, que permite elegir de 2 a 6 y lo indica en la interfaz;
   - zona horaria detectada y editable;
   - con un programa activo, el selector de días aparece **desactivado** y explica por qué (DP-06), y el `409 AVAILABILITY_LOCKED` se trata igualmente. La zona sigue siendo editable.
5. **`programs`:**
   - listado y detalle, con nivel, objetivo, duración, la secuencia según los días del usuario (`weeklySequence`) y si es compatible;
   - confirmación de la activación;
   - tratamiento de `409` (vuelve a consultar el programa activo) y de `422` (perfil incompleto o programa incompatible).
6. **`calendar`:** lista de sesiones con su fecha local y su estado. Los cuatro estados se distinguen **con texto e icono, no solo con color**.
7. **`session`, la sesión de hoy:**
   - prescripción de la semana;
   - formulario por serie, con repeticiones o segundos según `measurement` y un `setNumber` **derivado de la posición** de la serie en pantalla;
   - edición y borrado;
   - botón "Finalizar" con confirmación, **desactivado hasta que haya al menos una serie** (DP-09), con el `409 NO_SETS_LOGGED` tratado igualmente;
   - acciones desactivadas cuando `canLog` es `false`;
   - mensaje claro de que registrar no finaliza la sesión.
8. **`progress`:**
   - semana actual sobre el total;
   - recuentos `completed`, `partial` y `skipped` por separado;
   - adherencia;
   - prescrito frente a realizado por ejercicio;
   - historial de inscripciones;
   - resumen al terminar el programa.
9. **Envíos duplicados y reintentos**, según la política de la sección 4:
   - botón desactivado mientras la petición está en curso;
   - sin reintentos automáticos de `POST`;
   - tras un fallo de red o un `409 SET_ALREADY_EXISTS`, se consulta `GET /api/sessions/{id}` antes de decidir;
   - con `SESSION_NOT_OPEN` o `SESSION_NOT_TODAY`, se refresca la vista.
10. **Fechas:** `scheduledDate` y `today` se muestran tal como llegan (`YYYY-MM-DD`), **sin convertirlas** con la zona del navegador (3.2).
- **Integraciones:** con el contrato de la sección 4 y con T-01. Hasta que T-01 esté listo, se puede avanzar con datos simulados que sigan el contrato.

**Criterios de aceptación**
1. Un usuario nuevo completa, sin ayuda, el registro, la disponibilidad, la elección del programa, la activación y la consulta de su primera sesión (CE1).
2. El flujo principal funciona con anchos desde **320 px** sin desplazamiento horizontal, en Chromium y WebKit en móvil y escritorio (CE5).
3. **Accesibilidad:**
   - todos los controles tienen etiqueta accesible;
   - los objetivos táctiles miden al menos 44 × 44 px;
   - se puede usar con teclado y el foco es visible;
   - los errores se anuncian con `aria-live`;
   - el contraste mínimo es el de WCAG 2.1 AA [Propuesta];
   - los estados no dependen solo del color.
4. **Validaciones de la interfaz:** días de 2 a 6 sin repetir y valores numéricos no negativos. Los errores `400` y `422` del servidor se muestran junto al campo correspondiente. Las validaciones de la interfaz **no sustituyen** a las del backend.
5. **Sin envíos duplicados:**
   - un doble toque en "Guardar serie" o "Finalizar" envía una sola petición;
   - tras un fallo de red simulado, la interfaz consulta la sesión y no crea series duplicadas.
6. **Registrar no finaliza:** después de registrar, la sesión sigue `planned` y el botón "Finalizar" sigue visible.
7. **Sesiones cerradas:** las `completed`, `partial` y `skipped` se muestran de forma distinta y no permiten registrar, editar ni finalizar.
8. El progreso muestra los tres recuentos por separado y la semana actual, y coincide con la respuesta de la API.
9. Toda petición muestra un estado de carga y, si falla, un error comprensible con la opción de reintentar si procede. Cada lista tiene un estado vacío, por ejemplo cuando no hay programa activo o no hay sesión hoy.
10. El JWT no es accesible desde JavaScript, y ninguna petición que modifica datos sale sin `X-CSRF-Protection`.

**Pruebas propuestas**
- **Componentes (React Testing Library):**
  - formulario de series según `measurement`;
  - desactivación del botón durante el envío;
  - cómo se muestran los cuatro estados;
  - `canLog` igual a `false`;
  - selector de días;
  - tratamiento de errores por `code`.
- **E2E (Playwright):** el flujo principal con *viewport* de 320 px y de escritorio, en Chromium y WebKit, en **dos perfiles** (2.6 y la tabla de diferencias de la sección 4):
  - desarrollo, con reloj controlado para el cierre a medianoche;
  - similar a producción, con `__Host-session`, HTTPS y CSP.
- **Manual:** Safari en un iOS real (2.6) y comprobación de la accesibilidad con un lector de pantalla.

**Dependencias**
- Requiere T-01 para la integración, y T-03 (a través de T-01) para tener datos de catálogo.
- Puede empezar antes, con datos simulados que sigan la sección 4.
- **Decisiones confirmadas que aplica** (1.2):
  - **DP-13:** la adherencia se muestra en %, o como "sin datos";
  - **DP-10:** tantas filas como `targetSets`;
  - **DP-11:** un campo de segundos en los ejercicios por tiempo;
  - **DP-06:** el selector de días se bloquea;
  - **DP-07:** una sola sesión de hoy;
  - **DP-09:** "Finalizar" requiere al menos una serie.

  **Pendiente:** el contenido de los 3 programas, que afecta a los textos del catálogo.

**Definición de terminado** (condiciones para cerrarlo; aún no se cumplen)
- Pantallas y cliente HTTP implementados según las tareas 1–10.
- Pruebas de componentes y E2E, en los dos perfiles, **ejecutadas con resultado satisfactorio**.
- Prueba manual en Safari de iOS documentada en 2.6.
- Criterios 1–10 comprobados.
- Capturas o vídeo del flujo añadidos a 1.3.
- Revisado y fusionado mediante Pull Request.

**Ticket 3**

**T-03 — Base de datos: esquema, integridad, *seeds* y consultas**

**Identificación**
- **Área:** base de datos (PostgreSQL 13 o superior, por `gen_random_uuid()`; Prisma para migraciones y *seeds*, con SQL manual donde Prisma no llegue, 2.1 y 3.2).
- **Prioridad:** Imprescindible.
- **Historias:** HU-01, HU-02 y HU-03.
- **Requisitos:** F1–F9 en la parte de persistencia. F3 en el catálogo.

**Objetivo**
- **Problema:** las reglas de integridad que SQL sí puede garantizar deben estar en la base de datos como segunda línea de defensa (2.5). El catálogo tiene que cargarse de forma reproducible. Las consultas de reconciliación y progreso tienen que estar disponibles y su rendimiento, comprobado.
- **Resultado esperado:** el esquema de 3.1 y 3.2 está creado por migraciones, con todas sus restricciones e índices. Hay *seeds* idempotentes con contenido provisional y pruebas que demuestran que las restricciones funcionan.

**Alcance**
- **Incluido:**
  - las **ocho tablas** de 3.2 (`users`, `programs`, `session_templates`, `exercises`, `template_exercises`, `enrollments`, `scheduled_sessions` y `set_logs`), con sus columnas y tipos;
  - las restricciones;
  - los índices;
  - PostgreSQL local con `docker-compose` (2.4);
  - las *seeds*;
  - las consultas SQL de T-cierre y de progreso;
  - la revisión con `EXPLAIN ANALYZE`.
- **Excluido:**
  - tablas, columnas, *triggers* o mecanismos automáticos de versionado que no estén en 3.2;
  - el *trigger* de refuerzo de 2.2, que es opcional;
  - la tabla de idempotencia;
  - el contenido definitivo de los 3 programas, que todavía no está definido (1.2).

**Tareas técnicas**
1. **Esquema Prisma** con las ocho tablas, nombres en `snake_case`, PK `uuid` con `gen_random_uuid()`, `ON DELETE RESTRICT` en todas las claves foráneas, y las claves foráneas compuestas de 3.2:
   - `(enrollment_id, program_id)`;
   - `(session_template_id, program_id)`;
   - `(exercise_id, measurement)`;
   - `(template_exercise_id, measurement)`.
2. **SQL manual en la migración** para lo que Prisma no exprese:
   - los `CHECK`: estados, huecos, medidas, rangos, días de la semana, email normalizado, y coherencia del estado con `completed_at`/`closed_at` y con `finished_at`;
   - los índices parciales `ux_enrollments_one_active` (DP-07), `ix_sessions_planned_due` e `ix_sessions_planned_date` (este último solo si se activa la tarea opcional).
3. **Índices** de 3.2:
   - los `UNIQUE` del calendario `(enrollment_id, sequence_index)` y `(enrollment_id, scheduled_date)`;
   - el `UNIQUE` de las series `(session_id, template_exercise_id, set_number)`;
   - los `UNIQUE` del catálogo `(program_id, slot)` y `(session_template_id, week_number, position)`;
   - los destinos de las claves foráneas compuestas;
   - `ix_enrollments_user` y los índices de claves foráneas (`exercise_id`, `template_exercise_id`, `session_template_id`).
4. **Comprobación de las migraciones:** revisar cada migración generada después de la primera, para que no elimine ni deje fuera los objetos añadidos a mano (riesgo de 3.2).
5. ***Seeds* reproducibles:**
   - *upsert* por `code` en `programs` y `exercises`;
   - contenido **provisional**, marcado como tal;
   - **los 3 programas iniciales** (DP-02), cada uno con `duration_weeks = 6` (DP-04), una plantilla por hueco de las secuencias que admita y prescripciones con repeticiones **fijas** (DP-05) o segundos para todas las semanas;
   - un validador de las *seeds* que compruebe que cada programa está completo y que las formas de medida coinciden (regla 7 de 3.2).
6. **Inmutabilidad del catálogo** (3.2): la regla de proceso se aplica en la revisión de cada PR que toque las *seeds*. Un programa con inscripciones no se modifica, y un cambio de contenido crea un programa con otro `code`. **Sin** comprobaciones automáticas ni versionado, como fija 3.2.
7. **Consultas SQL:**
   - las sentencias de T-cierre: bloquear candidatas con `ORDER BY id FOR UPDATE OF s`, clasificar en una sentencia posterior con `EXISTS`, y bloquear y actualizar las inscripciones;
   - la comprobación de que no quedan sesiones `planned`;
   - las consultas de progreso: recuentos por estado, semana actual y desempeño prescrito frente a realizado.

   T-01 las usa desde sus repositorios.
8. **`EXPLAIN ANALYZE`** sobre PostgreSQL real con un volumen representativo, para:
   - el `SELECT … FOR UPDATE` de candidatas;
   - los `NOT EXISTS` y el `EXISTS` de clasificación;
   - las consultas de progreso.

   Se registra si usan `ix_sessions_planned_due` y el `UNIQUE` de `set_logs`, y se comprueba que `LockRows` está sobre `Sort` (C8). Si no los usan y el coste es relevante, se revisan los índices o las consultas (3.2).
- **Integraciones:**
  - con T-01: los repositorios y las pruebas de integración;
  - con CI: un PostgreSQL de servicio (2.4).

**Criterios de aceptación**
1. Las migraciones crean, sobre una base vacía, las ocho tablas con las columnas, tipos, `NULL`/`NOT NULL` y valores por defecto de 3.2, sin tablas ni columnas adicionales.
2. **Restricciones rechazadas por la base de datos** (se comprueba con inserciones directas):
   - un estado fuera de los cuatro;
   - `completed` con `closed_at`;
   - `partial` sin `closed_at`;
   - `finished` sin `finished_at`;
   - un hueco desconocido;
   - menos de 2 o más de 6 días, o días fuera de 0–6;
   - un email sin normalizar;
   - repeticiones negativas;
   - una serie con `reps` y `duration_seconds` a la vez.
3. **Consistencia de las claves foráneas compuestas:**
   - se rechaza una sesión con una plantilla de otro programa;
   - se rechaza una prescripción o una serie con una forma de medida distinta de la de su ejercicio.
4. **Unicidad:**
   - una segunda inscripción `active` del mismo usuario → `23505` (DP-07);
   - se rechazan las sesiones duplicadas por orden o por fecha en una inscripción;
   - se rechaza una serie duplicada `(session, prescripción, set_number)`.
5. **`ON DELETE RESTRICT`:** no se puede borrar un usuario, un programa, una plantilla, una prescripción ni una sesión que tengan filas dependientes.
6. Ejecutar las *seeds* dos veces deja la base en el mismo estado, sin duplicados. El validador detecta un programa sin plantilla para algún hueco, o sin prescripción para alguna semana.
7. Las consultas de T-cierre clasifican correctamente: `partial` con registros, `skipped` sin ellos. Una segunda ejecución no modifica ninguna fila.
8. Los resultados de `EXPLAIN ANALYZE` de la tarea 8 están **registrados**, con el plan obtenido y sin presuponerlo.

**Pruebas propuestas**
- **Integración contra PostgreSQL de pruebas:**
  - una prueba por cada restricción de los criterios 2–5, incluido el test de 3.2 que comprueba que existen los objetos añadidos con SQL manual;
  - la prueba de 3.2 de una prescripción de otra plantilla o semana, en la parte de base de datos: la clave foránea compuesta no la detecta, y eso documenta por qué T-01 la valida en la transacción;
  - la idempotencia de las *seeds*.
- **Concurrencia:**
  - C8 (orden efectivo de bloqueos);
  - la parte de base de datos de API-15 y API-40, con dos inserciones `active` simultáneas y la espera en el índice parcial.
- **Rendimiento:** `EXPLAIN ANALYZE` de la tarea 8. No es una prueba de aprobado o suspenso, sino una evidencia que se documenta.

**Dependencias**
- **Primer ticket que se implementa:** T-01 y T-02 dependen del esquema y de las *seeds*.
- **Decisiones que afectan al ticket:**
  - **confirmadas:**
    - DP-07: el índice único se mantiene;
    - DP-02 y DP-04: 3 programas de 6 semanas;
    - DP-05: repeticiones fijas, sin cambios en el esquema;
    - DP-11: se mantiene `duration_seconds`;
  - **pendiente:** el contenido de los 3 programas y los números de días que admite cada uno (1.2);
  - **técnica:** la política de versionado del catálogo, más allá de la regla de proceso.

**Definición de terminado** (condiciones para cerrarlo; aún no se cumplen)
- Migraciones y *seeds* implementadas.
- Pruebas de integración de las restricciones y de idempotencia de las *seeds* **ejecutadas con resultado satisfactorio** en CI.
- Los resultados de `EXPLAIN ANALYZE` documentados en 3.2.
- Las instrucciones de instalación, migración y *seed* documentadas en 1.4.
- Criterios 1–8 comprobados.
- Revisado y fusionado mediante Pull Request.

#### Trazabilidad

| Ticket | Historias | Requisitos | Componentes | Pruebas |
|--------|-----------|------------|-------------|---------|
| T-01 Backend | HU-01, HU-02, HU-03 | F1–F9; RP1–RP6; CE2, CE3, CE4 | Módulos `auth`, `profile`, `programs`, `enrollments`, `sessions`, `progress`; dominio (`scheduler`, `sessionLifecycle`, `Clock`); *middleware*; T-activación, T-registro, T-finalizar, T-cierre | Unitarias del dominio; API-01–API-45; C1–C8 |
| T-02 Frontend | HU-01, HU-02, HU-03 | F1–F6, F8, F9; visualización de F7; CE1, CE4, CE5 | SPA: `app`, `shared` (cliente HTTP) y las *features* `auth`, `profile`, `programs`, `calendar`, `session`, `progress` (2.3) | Componentes (RTL); E2E en dos perfiles con 320 px; Safari en iOS manual |
| T-03 Base de datos | HU-01, HU-02, HU-03 | Persistencia de F1–F9; F3 (catálogo); RP4–RP6 | PostgreSQL; esquema y migraciones de Prisma con SQL manual; *seeds*; consultas de T-cierre y de progreso | Integración de las restricciones; idempotencia de las *seeds*; C8; parte de base de datos de API-15 y API-40; `EXPLAIN ANALYZE` |

#### Dependencias y orden de implementación

1. **T-03 primero:** sin esquema, restricciones ni *seeds*, no se pueden ejecutar las pruebas de integración ni de concurrencia de T-01, y el catálogo está vacío.
2. **T-01 después.** Su dominio puro (`scheduler`, `sessionLifecycle`) no depende de la base de datos y puede empezar en paralelo con T-03.
3. **T-02 al final.** Las pantallas pueden adelantarse con datos simulados que sigan la sección 4, pero los criterios de aceptación y las pruebas E2E necesitan T-01 y T-03 integrados.

Las decisiones del Product Owner que afectan a cada ticket figuran en su apartado "Dependencias". Están todas **confirmadas** (DP-01 a DP-17, en 1.2). Solo siguen abiertos el contenido de los 3 programas, necesario para cerrar T-03 (DEV-010), y algunas decisiones técnicas.

#### Backlog técnico ampliado del MVP

> **Qué es este apartado.** Descompone los tickets de alto nivel T-01, T-02 y T-03, que se mantienen tal cual, en tickets pequeños y verificables. Están organizados por los incrementos I1–I6 de la sección 5.
> - Es un **plan [Propuesta]**: solo DEV-001 está terminado (PR #3, fusionado). Los demás tickets no están empezados y las pruebas citadas son propuestas.
> - No añade entidades, endpoints ni funcionalidades a lo documentado en las secciones 1–5.
> - No incluye estimaciones de esfuerzo.
>
> Cada ticket remite a las secciones del README en lugar de repetir sus especificaciones.

**Definición de terminado común** (condiciones futuras para cerrar cualquier ticket DEV; aún no se cumple ninguna):
1. El alcance del ticket está implementado.
2. Sus pruebas se han **ejecutado con resultado satisfactorio** en CI, y las suites de los tickets anteriores siguen pasando.
3. Sus criterios de aceptación se han comprobado.
4. Cualquier desviación respecto al README está documentada en la sección afectada.
5. Los cambios se han revisado y fusionado mediante Pull Request.

Cada ticket añade solo lo que le es propio.

**Calidad en cada incremento:**
- Cada ticket de backend incluye sus pruebas de integración y contrato (API-xx), contra un PostgreSQL real.
- Cada ticket de frontend incluye sus pruebas de componentes y cumple los criterios comunes CT-01 a CT-06 de la sección 5.
- Los tickets de pruebas (DEV-026, DEV-029 y DEV-035) **no concentran** la calidad al final: integran y amplían lo que ya existe.

##### I1 — Acceso y perfil

**DEV-001 — Estructura del repositorio, herramientas y CI**
- **Incremento:** I1 (base de todos).
- **Área:** integración.
- **Prioridad:** Must.
- **Historias:** todas (habilitante).
- **Objetivo:** que todos los tickets posteriores puedan compilar, probarse y revisarse.
- **Alcance:**
  - estructura `frontend/`, `backend/` y `e2e/` de 2.3, con TypeScript, *lint* y Vitest;
  - `docker-compose` con PostgreSQL 13 o superior (2.4);
  - GitHub Actions con *lint*, comprobación de tipos y pruebas, más un PostgreSQL de servicio.
- **Depende de:** nada.
- **Criterios:** un PR de prueba ejecuta *lint*, comprobación de tipos y una prueba de ejemplo de cada paquete contra PostgreSQL en CI, y el resultado se ve en el PR.
- **Pruebas:** la propia ejecución de CI.
- **Terminado:** además de la común, el arranque local está documentado en un borrador de 1.4.
- **Pendiente:** la plataforma PaaS (2.4), que no lo bloquea.
- **Estado:** **terminado.** Fusionado en `main` mediante el PR #3 (https://github.com/GeraGalindo/AI4Devs-finalproject/pull/3), con la CI en verde en el PR, en `workflow_dispatch` (con E2E) y en `main` (2.6 y sección 7). Decisiones técnicas aprobadas para este ticket: `pg` directo (Prisma en DEV-002), npm *workspaces*, Node 24, PostgreSQL 17, sin Prettier, *smoke* de Playwright solo en Chromium y `GET /api/health` público con `503 TEMPORARILY_UNAVAILABLE`.

**DEV-002 — Migración de `users`**
- **Incremento:** I1.
- **Área:** base de datos.
- **Prioridad:** Must.
- **Historias:** HU-04, HU-05, HU-06 y HU-07.
- **Objetivo:** persistir las cuentas con las restricciones de 3.2.
- **Alcance:**
  - la tabla `users` con PK `uuid`, `email` único y normalizado, `token_version`, `timezone` y `available_weekdays`, con los `CHECK` de cardinalidad y rango;
  - SQL manual en la migración para lo que Prisma no exprese.
- **Depende de:** DEV-001.
- **Criterios:**
  - se rechazan con un error de restricción: un email sin normalizar, 1 o 7 días, días fuera de 0–6 y un `token_version` negativo;
  - un email duplicado se rechaza.
- **Pruebas:**
  - integración de cada restricción (T-03, criterio 2);
  - un test de que existen los objetos añadidos con SQL manual (3.2).
- **Pendiente:** ninguno.

**DEV-003 — Base del backend: configuración, *middleware* y errores**
- **Incremento:** I1.
- **Área:** backend.
- **Prioridad:** Must.
- **Historias:** CT-04, habilitante para HU-04 a HU-22.
- **Objetivo:** la cadena común de seguridad y errores (T-01, tareas 1–2).
- **Alcance:**
  - configuración con arranque seguro, que se niega a arrancar fuera de `development` o `test` sin `__Host-session`, `Secure` y `https`;
  - `Clock` inyectable, configurable solo con `NODE_ENV=test`;
  - `helmet`, `X-Request-Id`, CSRF, regla de cuerpo y tipo de contenido, Zod estricto y manejador de errores uniforme;
  - `404` en JSON;
  - servir el *build* de la SPA.
- **Depende de:** DEV-001.
- **Criterios:**
  - sin `Origin` válido o sin `X-CSRF-Protection` → `403`;
  - tipo de contenido no JSON → `415`;
  - cuerpo en una operación sin cuerpo → `400`;
  - errores con el formato `{ error: { code, message, requestId } }`, sin trazas en producción;
  - el arranque inseguro en producción falla.
- **Pruebas:**
  - API-01–API-06 y API-36–API-38 sobre rutas de prueba;
  - unitarias de configuración.
- **Pendiente:** ninguno.

**DEV-004 — Autenticación: registro, inicio, sesión actual y cierre**
- **Incremento:** I1.
- **Área:** backend.
- **Prioridad:** Must.
- **Historias:** HU-04 y HU-05.
- **Objetivo:** F1 según la sección 4.
- **Alcance:**
  - `register`, `login`, `me` y `logout`;
  - *hash* bcrypt o argon2, con un *hash* de relleno cuando el usuario no existe;
  - JWT HS256 en cookie, con algoritmo fijo y comprobación de `token_version`;
  - `logout` incrementa `token_version`;
  - límite de peticiones en `register` y `login`;
  - `requireAuth` para el resto de rutas.
- **Depende de:** DEV-002 y DEV-003.
- **Criterios:**
  - los criterios de HU-04 y HU-05;
  - el JWT nunca va en el cuerpo de la respuesta;
  - el `401` de `login` es idéntico para un email inexistente y para una contraseña incorrecta.
- **Pruebas:** API-07–API-11 y CSRF en `login` y `logout` (API-06, API-43).
- **Decisión:** la sesión dura 7 días absolutos, sin renovación automática (DP-15).
- **Pendiente (técnico):** la longitud mínima de la contraseña y bcrypt o argon2.

**DEV-005 — API de perfil: disponibilidad y zona horaria**
- **Incremento:** I1.
- **Área:** backend.
- **Prioridad:** Must.
- **Historias:** HU-06 y HU-07.
- **Objetivo:** `GET` y `PATCH /api/profile`.
- **Alcance:**
  - validación de 2 a 6 días distintos y de una zona IANA, y actualización parcial;
  - transacción con la fila de `users` bloqueada (`FOR UPDATE`), preparada para el bloqueo de días de DP-06.

  **La comprobación de que no hay un programa activo** (reconciliación previa y `409 AVAILABILITY_LOCKED`) se conecta en I3, en DEV-016, cuando existen las inscripciones (DEV-014) y la reconciliación (DEV-027). En I1 nadie puede tener un programa activo, así que no hay ningún periodo de incoherencia.
- **Depende de:** DEV-004.
- **Criterios:** los criterios de HU-06 y HU-07, con `400` para valores no válidos. Con un programa activo, cambiar los días → `409 AVAILABILITY_LOCKED`; se comprueba en I3 con API-46.
- **Pruebas:**
  - integración de la validación, incluido API-37 con días repetidos;
  - acceso sin sesión → `401`.
- **Decisión:** los días no se pueden cambiar con un programa activo, y la zona horaria sí (DP-06). **Pendiente:** ninguno.

**DEV-038 — Infraestructura de internacionalización (`en`)**
- **Incremento:** I1. Va antes de DEV-006, aunque su número es posterior: los identificadores no se renumeran.
- **Área:** frontend.
- **Prioridad:** Must. Decisión [Confirmada]: interfaz solo en inglés, preparada para otros idiomas.
- **Historias:** CT-02 y CT-06. Afecta a todos los textos de HU-04 a HU-22.
- **Objetivo:** que ninguna pantalla tenga textos visibles escritos directamente en el código y que los formatos regionales estén centralizados (`docs/design-system.md`, sección 8).
- **Alcance:**
  - configuración de `i18next` y `react-i18next` [Propuesta], con idioma y respaldo `en`;
  - **sin** detector ni selector de idioma, y con `lang="en"` en el documento;
  - catálogo inicial en inglés, organizado por funcionalidad: `common`, `auth`, `profile`, `programs`, `calendar`, `session`, `progress` y `errors`;
  - claves `errors.<CODE>` para los códigos de error de la sección 4, con un mensaje genérico de respaldo;
  - claves `session.status.<valor>` para la etiqueta de cada estado;
  - utilidades de formato con `Intl`:
    - fechas de calendario (`YYYY-MM-DD`) **sin conversión de zona horaria** (CT-06);
    - instantes, con la zona horaria del perfil;
    - números;
  - la configuración regional de formato, separada del idioma y de la zona horaria;
  - **no** se traducen los valores que son contrato: estados, huecos, medidas, códigos de error, campos de la API, `code` del catálogo y zonas IANA.
- **Depende de:** DEV-001.
- **Criterios:**
  1. Un componente que usa una clave inexistente hace fallar una prueba.
  2. Ninguna pantalla muestra textos literales fuera del catálogo. Se comprueba con una prueba o una regla de *lint* [Propuesta].
  3. Una fecha `2026-11-20` se muestra como el 20 con el navegador en UTC−11 y en UTC+14.
  4. Un `error.code` desconocido muestra el mensaje genérico.
  5. Los valores de la API, como `planned`, llegan sin cambios al estado de la aplicación y solo se traduce su etiqueta.
- **Pruebas:**
  - unitarias de las utilidades de formato con zonas extremas;
  - una prueba de que el catálogo en inglés contiene todas las claves que usan los componentes;
  - componentes (RTL) con el proveedor de i18n.
- **Pendiente:**
  - la estrategia para traducir el contenido almacenado de programas y ejercicios, una decisión futura que no cambia el esquema (`docs/design-system.md`, sección 8.5);
  - las librerías son una [Propuesta].

**DEV-039 — Sistema de diseño y componentes base**
- **Incremento:** I1. Va antes de DEV-006.
- **Área:** frontend.
- **Prioridad:** Must.
- **Historias:** CT-01, CT-03 y CT-05. Es la base visual de HU-04 a HU-22.
- **Objetivo:** aplicar la identidad confirmada (*Performance / Athletic*, fondo azul-negro, acentos violetas, tarjetas con bordes discretos) con los tokens y componentes de `docs/design-system.md`, secciones 2 a 7.
- **Alcance:**
  - tokens como variables CSS: color, tipografía, espaciado, radios y `touch-min`;
  - **componentes necesarios en I1:**
    - `AppShell`, y `BottomNav`/`NavRail` con **Today · Program · Progress · Profile**, oculta sin sesión;
    - `TopBar`, `Card`, `Button` (con `loading` y `disabled`), `IconButton`, `TextField`;
    - `WeekdaySelector`, `TimezoneSelect`;
    - `InlineAlert`/`Toast`, `Skeleton`/`Spinner`, `EmptyState`, `ErrorState`, `ConfirmDialog`, `StatusBadge`;
  - el resto del inventario (`Stepper`, `SetRow`, `ExerciseCard`, `ProgressBar`, `StatTile`) se añade, con los mismos tokens, en el ticket de pantalla que lo necesite por primera vez;
  - estados `default`, `pressed`, `focus-visible`, `disabled`, `loading` y `error`;
  - `prefers-reduced-motion` y áreas seguras;
  - **ningún** elemento de funciones futuras: suscripciones, planes, IA, vídeo, Skills ni Library.
- **Depende de:** DEV-001 y DEV-038, porque las etiquetas de los componentes son claves de traducción.
- **Criterios:**
  1. Sin desplazamiento horizontal a 320 px. Barra inferior hasta 1023 px y rail lateral a partir de 1024 px.
  2. Todos los objetivos táctiles miden al menos 44 × 44 px.
  3. Contraste de los tokens: al menos 4,5:1 para el texto y 3:1 para los bordes de los controles, según la tabla de `docs/design-system.md`. El borde decorativo no delimita controles.
  4. Foco visible y `aria-current` en la pestaña activa.
  5. `ConfirmDialog` atrapa el foco y lo devuelve al cerrarse.
  6. `Button` en estado `loading` no permite un segundo envío.
  7. `StatusBadge` muestra icono y texto para cada uno de los cuatro estados.
  8. Ningún componente tiene textos literales.
- **Pruebas:**
  - componentes (RTL) de cada componente en sus estados, con sus roles y nombres accesibles;
  - comprobación automática de accesibilidad con una herramienta como axe [Propuesta: sería una dependencia nueva de desarrollo];
  - revisión visual a 320, 768 y 1024 px.
- **Pendiente:** la comparación exacta con el mockup de referencia, que no está en el repositorio. Los valores de los tokens pueden cambiar tras esa comparación sin cambiar los componentes.

**DEV-006 — Base del frontend: estructura de la app, cliente HTTP y componentes comunes**
- **Incremento:** I1.
- **Área:** frontend.
- **Prioridad:** Must.
- **Historias:** CT-01 a CT-06, habilitante.
- **Objetivo:** T-02, tareas 1–2.
- **Alcance:**
  - *router*, con el `AppShell` y la navegación de DEV-039;
  - cliente HTTP que envía `X-CSRF-Protection`, usa JSON solo cuando hay cuerpo, traduce `error.code` con las claves `errors.*` de DEV-038, redirige ante un `401` y ofrece reintentar ante un `503`;
  - conexión de los componentes de carga, error y vacío de DEV-039 con el estado de las peticiones;
  - conexión del estado `loading` del `Button` de DEV-039 con las peticiones en curso;
  - uso de las utilidades de formato de fecha de DEV-038, sin conversión de zona horaria.
- **Depende de:** DEV-001, DEV-038 (configuración y catálogo `common`/`errors`) y DEV-039 (`AppShell`, navegación y estados). Puede avanzar con datos simulados de la sección 4.
- **Criterios:**
  - ninguna petición que modifica datos sale sin la cabecera CSRF;
  - un doble clic sobre un botón protegido envía una sola petición;
  - sin desplazamiento horizontal a 320 px.
- **Pruebas:** componentes (RTL) del cliente HTTP, del botón protegido y de los estados de carga y error.
- **Pendiente:** TanStack Query es una [Propuesta] (2.2).

**DEV-007 — Pantallas de registro, inicio y cierre de sesión**
- **Incremento:** I1.
- **Área:** frontend.
- **Prioridad:** Must.
- **Historias:** HU-04 y HU-05.
- **Objetivo:** el acceso completo desde la interfaz.
- **Alcance:**
  - formularios de registro, que envía `timezone` del navegador, y de inicio de sesión;
  - cerrar sesión;
  - restaurar la sesión con `GET /api/auth/me`;
  - mensajes para `409`, `401` y `429`.
- **Depende de:** DEV-006, DEV-004 (o los datos simulados), DEV-038 (catálogo `auth`) y DEV-039 (`TextField`, `Button` e `InlineAlert`).
- **Criterios:** los criterios de HU-04 y HU-05, y CT-01 a CT-03.
- **Pruebas:** componentes de los formularios (validación y errores por `code`).
- **Pendiente:** ninguno.

**DEV-008 — Pantalla de perfil: días y zona horaria**
- **Incremento:** I1.
- **Área:** frontend.
- **Prioridad:** Must.
- **Historias:** HU-06 y HU-07.
- **Objetivo:** configurar la disponibilidad y la zona horaria.
- **Alcance:**
  - selector de días que impide guardar menos de 2 o más de 6;
  - zona detectada y editable;
  - con un programa activo, el selector de días aparece **desactivado** y explica por qué (DP-06), y el `409 AVAILABILITY_LOCKED` se trata igualmente. Ese estado se conecta cuando existe `GET /api/enrollments/active` (DEV-017, I3);
  - aviso de que cambiar la zona horaria con un programa activo no recalcula fechas.
- **Depende de:** DEV-006, DEV-005, DEV-038 (catálogo `profile`) y DEV-039 (`WeekdaySelector` y `TimezoneSelect`).
- **Criterios:** los criterios de HU-06 y HU-07, y CT-01 a CT-03. Los errores `400` del servidor aparecen junto al campo.
- **Pruebas:** componentes del selector y de los avisos.
- **Decisión:** DP-06. **Pendiente:** ninguno.

##### I2 — Catálogo

**DEV-009 — Migraciones del catálogo**
- **Incremento:** I2.
- **Área:** base de datos.
- **Prioridad:** Must.
- **Historias:** HU-08 y HU-09.
- **Objetivo:** `programs`, `session_templates`, `exercises` y `template_exercises` según 3.2.
- **Alcance:**
  - `code` únicos;
  - `CHECK` de `slot`, `measurement` y la forma de medida de la prescripción;
  - `UNIQUE (program_id, slot)` y `(session_template_id, week_number, position)`;
  - FK compuesta `(exercise_id, measurement)`;
  - los destinos `UNIQUE (id, program_id)` y `(id, measurement)`;
  - `ON DELETE RESTRICT` e índice sobre `exercise_id`.
- **Depende de:** DEV-002, por la cadena de migraciones.
- **Criterios:**
  - se rechaza una prescripción con una forma de medida distinta de la de su ejercicio;
  - se rechaza un hueco desconocido;
  - se rechazan los duplicados por hueco o posición;
  - no se puede borrar un ejercicio que se usa.
- **Pruebas:** integración de cada restricción (T-03, criterios 2–5).
- **Decisión:** repeticiones fijas (DP-05). El esquema de 3.2 no cambia. **Pendiente:** ninguno.

**DEV-010 — *Seeds* provisionales y validador del catálogo**
- **Incremento:** I2.
- **Área:** base de datos.
- **Prioridad:** Must.
- **Historias:** HU-08 y HU-09.
- **Objetivo:** un catálogo reproducible que permita recorrer el MVP.
- **Alcance:**
  - *upsert* por `code`;
  - los **3 programas iniciales** (DP-02), de **6 semanas** (`duration_weeks = 6`, DP-04), cada uno con una plantilla por hueco de las secuencias que admita y prescripciones fijas (DP-05) para todas las semanas. Mientras no se defina su contenido, contenido **provisional y marcado como tal**;
  - un validador de completitud y de las formas de medida (regla 7 de 3.2);
  - la regla de inmutabilidad del catálogo, aplicada **en la revisión del PR**, sin comprobación automática (3.2).
- **Depende de:** DEV-009.
- **Criterios:**
  - ejecutar las *seeds* dos veces no cambia nada;
  - el validador detecta un programa al que le falta un hueco o una semana, y que el catálogo no tiene exactamente 3 programas.
- **Pruebas:** idempotencia de las *seeds* y casos del validador.
- **Pendiente:** el **contenido** de los 3 programas (nombres, objetivos, ejercicios y prescripciones) y qué números de días admite cada uno (1.2). Es necesario para cerrar este ticket.

**DEV-011 — Dominio: secuencias semanales y compatibilidad**
- **Incremento:** I2.
- **Área:** backend.
- **Prioridad:** Must.
- **Historias:** HU-09 y HU-10.
- **Objetivo:** `WEEKLY_SEQUENCES` para N = 2…6 (tabla de 1.2) y una función pura de compatibilidad entre un programa y N.
- **Alcance:** solo dominio puro, sin entrada ni salida.
- **Depende de:** DEV-001. Se puede hacer en paralelo con la base de datos.
- **Criterios:** la secuencia de cada N coincide exactamente con la de 1.2. Un programa al que le falta un hueco de la secuencia es incompatible.
- **Pruebas:** unitarias con tablas para N = 2…6.
- **Pendiente:** ninguno.

**DEV-012 — API del catálogo**
- **Incremento:** I2.
- **Área:** backend.
- **Prioridad:** Must.
- **Historias:** HU-08 y HU-09.
- **Objetivo:** `GET /api/programs`, `GET /api/programs/{programId}` y `GET …/templates/{templateId}?week=`.
- **Alcance:** los campos derivados `slots`, `weeklySequence` y `compatible`. Una plantilla que no pertenece al programa → `404`.
- **Depende de:** DEV-004, DEV-010 y DEV-011.
- **Criterios:**
  - las respuestas siguen la sección 4;
  - `weeklySequence` es `null` sin disponibilidad configurada;
  - la prescripción se filtra por `week`.
- **Pruebas:**
  - contrato de las tres rutas;
  - `400` con un `week` no válido;
  - `401` sin sesión.
- **Pendiente:** ninguno.

**DEV-013 — Pantallas del catálogo y del detalle del programa**
- **Incremento:** I2.
- **Área:** frontend.
- **Prioridad:** Must.
- **Historias:** HU-08 y HU-09.
- **Objetivo:** explorar los programas y sus prescripciones por semana.
- **Alcance:**
  - listado con nivel, objetivo, duración y compatibilidad;
  - detalle con la secuencia del usuario;
  - vista de plantilla por semana;
  - estado vacío.
- **Depende de:** DEV-006 y DEV-012.
- **Criterios:** los criterios de HU-08 y HU-09, y CT-01 a CT-03.
- **Pruebas:** componentes del listado, del detalle y de la indicación de compatibilidad.
- **Pendiente:** el contenido de los 3 programas, que afecta a los textos. Nivel descriptivo según DP-03, sin bloquear el acceso.

##### I3 — Activación y calendario

> **Orden dentro de I3:** DEV-014 → DEV-020 → DEV-021 → DEV-027 → DEV-016 → DEV-017 → DEV-018 y DEV-019, con DEV-015 en paralelo. DEV-020, DEV-021 y DEV-027 se han adelantado desde I4 e I5, porque la activación reconcilia antes de comprobar si hay un programa activo, y los `GET` de inscripciones y sesiones antes de leer (sección 4). Los identificadores no se renumeran, para no romper las referencias.

**DEV-014 — Migraciones de `enrollments` y `scheduled_sessions`**
- **Incremento:** I3.
- **Área:** base de datos.
- **Prioridad:** Must.
- **Historias:** HU-10, HU-11 y HU-12.
- **Objetivo:** las inscripciones y el calendario materializado según 3.2.
- **Alcance:**
  - `CHECK` de estados y de coherencia entre el estado y los instantes (`completed_at`, `closed_at`, `finished_at`);
  - FK compuestas `(enrollment_id, program_id)` y `(session_template_id, program_id)`;
  - `UNIQUE (enrollment_id, sequence_index)` y `(enrollment_id, scheduled_date)`;
  - los índices parciales `ux_enrollments_one_active` (DP-07) e `ix_sessions_planned_due`;
  - `ix_enrollments_user`.
- **Depende de:** DEV-009.
- **Criterios:** se rechazan una segunda inscripción `active` (`23505`), una sesión con una plantilla de otro programa, combinaciones de estado e instantes que no son coherentes, y una fecha u orden duplicados.
- **Pruebas:**
  - integración de cada restricción;
  - un test de que existen los índices parciales.
- **Decisión:** un solo programa activo (DP-07). **Pendiente:** ninguno.

**DEV-015 — Dominio: `scheduler.generate`**
- **Incremento:** I3.
- **Área:** backend.
- **Prioridad:** Must.
- **Historias:** HU-10.
- **Objetivo:** generar el calendario de forma determinista (RP1–RP4, CE2).
- **Alcance:**
  - función pura que produce `N × semanas` sesiones con el hueco `sequence[i mod N]`, `weekNumber = floor(i / N) + 1` y fechas solo en los días elegidos;
  - inicio en el siguiente día elegido **posterior** a `today` (zona del perfil): el día de activación queda excluido aunque sea un día elegido (`includeActivationDay = false`, fijo; DP-01).
- **Depende de:** DEV-011. Se puede hacer en paralelo con DEV-014.
- **Criterios:** se cumple CE2 para cualquier N entre 2 y 6 y cualquier duración, incluido el ejemplo de HU-01, criterio 3.
- **Pruebas:** unitarias de 2.6 (inicio a mitad de semana, cambios de mes, de año y de horario, las dos políticas).
- **Decisión:** DP-01 y DP-04 (`N × 6` sesiones en los programas iniciales). **Pendiente:** ninguno.

**DEV-020 — Migración de `set_logs`**
- **Incremento:** I3, adelantado desde I4. La clasificación de T-cierre (DEV-027) consulta `set_logs` con `EXISTS`, así que la tabla debe existir antes de la primera activación que reconcilie. La escritura de series sigue llegando en I4 (DEV-022).
- **Área:** base de datos.
- **Prioridad:** Must.
- **Historias:** HU-15, HU-16 y HU-10 (indirectamente, por la reconciliación previa).
- **Objetivo:** el registro real según 3.2.
- **Alcance:**
  - FK a la sesión;
  - FK compuesta `(template_exercise_id, measurement)`;
  - `CHECK` de la forma de medida y de valores no negativos;
  - `UNIQUE (session_id, template_exercise_id, set_number)`;
  - índice sobre `template_exercise_id`.
- **Depende de:** DEV-014.
- **Criterios:** se rechazan una forma de medida distinta de la de la prescripción, `reps` y `duration_seconds` a la vez, valores negativos y una terna duplicada.
- **Pruebas:**
  - integración de cada restricción;
  - la parte de base de datos de la prueba de 3.2: la FK compuesta **no** detecta una prescripción de otra plantilla con la misma forma de medida.
- **Decisión:** segundos en los ejercicios por tiempo (DP-11). **Pendiente:** ninguno.

**DEV-021 — Infraestructura transaccional del protocolo de bloqueo**
- **Incremento:** I3, adelantado desde I4. Es un **riesgo temprano**.
- **Área:** backend.
- **Prioridad:** Must.
- **Historias:** HU-10, HU-15, HU-16, HU-17 y HU-18.
- **Objetivo:** las piezas comunes de 2.2 para T-cierre, T-registro y T-finalizar, y `lock_timeout` con reintento para T-activación.
- **Alcance:**
  - transacción `READ COMMITTED` explícita con `SET LOCAL lock_timeout`;
  - bloqueo de la sesión con propietario (`SELECT … JOIN enrollments … FOR UPDATE OF s`) en SQL directo;
  - `now` tomado **después** del bloqueo, en T-registro y T-finalizar;
  - reintento acotado de la transacción completa ante `40P01` o `55P03` (2 veces), y `503`;
  - sin reintento si se pierde la conexión durante el `COMMIT`.
- **Regla de dependencia:** **ninguna escritura sobre `scheduled_sessions`, `set_logs` o el estado de `enrollments` se implementa sin este ticket.**
  - Dependen de él DEV-027 (T-cierre), DEV-022 (T-registro), DEV-023 (T-finalizar) y DEV-016 (T-activación).
  - T-activación solo inserta filas nuevas y no bloquea sesiones (2.2), pero usa el mismo `lock_timeout`, porque puede esperar en el índice único parcial (API-40).
- **Depende de:** DEV-014 y DEV-003.
- **Criterios:**
  - un `lock_timeout` forzado → `503` sin datos guardados (API-39);
  - un *deadlock* simulado se reintenta y, si persiste, `503`.
- **Pruebas:**
  - unitarias de la política de reintento;
  - integración con un bloqueo forzado entre dos conexiones.
- **Pendiente:** ninguno.

**DEV-027 — Reconciliación mínima: `sessionLifecycle` y T-cierre por usuario**
- **Incremento:** I3, adelantado desde I5. Es el **prerrequisito mínimo** de la activación (sección 4 y paso 2 del flujo 1 de 2.2).
- **Área:** backend y base de datos.
- **Prioridad:** Must.
- **Historias:** HU-10, HU-18 y HU-22.
- **Objetivo:** `reconcile(userId, now)` según T-cierre (2.2), completo y correcto para un usuario.
- **Alcance mínimo** (no se puede recortar más sin romper las reglas):
  - `sessionLifecycle.resolveClosure`, como función pura;
  - SQL directo:
    - `now` tomado **antes**;
    - bloqueo de las candidatas con `ORDER BY id FOR UPDATE OF s`;
    - una sentencia posterior que clasifica `partial` o `skipped` con `EXISTS` sobre `set_logs`;
    - bloqueo de las inscripciones activas y paso a `finished` en otra sentencia;
  - la transacción de DEV-021.

  Recortar cualquiera de esos pasos rompería una regla:
  - sin el bloqueo, una sesión con actividad podría cerrarse como `skipped`;
  - sin la clasificación, no se distinguiría `partial` de `skipped`;
  - sin el paso a `finished`, la activación respondería un `409` erróneo.
- **Lo usan desde I3:** la activación (DEV-016) y los `GET` de inscripciones y sesiones (DEV-017).
- **Queda en I5:** las pruebas ampliadas de zona horaria y de los `GET` (DEV-028), C3, C8 y la comprobación con `EXPLAIN` (DEV-029), y la revisión con `EXPLAIN ANALYZE` (DEV-031, I6).
- **Depende de:** DEV-020 y DEV-021.
- **Criterios:**
  - HU-02, criterios 8 y 9;
  - es idempotente: una segunda ejecución no cambia ninguna fila y `closed_at` no cambia;
  - una `completed` nunca cambia;
  - la inscripción pasa a `finished` solo si no le quedan sesiones `planned`;
  - la sentencia SQL y la función pura coinciden.
- **Pruebas:**
  - unitarias de `resolveClosure`;
  - integración con un `Clock` fijo: `partial`, insertando registros directamente en la base de datos, porque la API de series llega en I4; `skipped`; `completed` sin cambios; idempotencia; y `finished` / sigue `active`.
- **Pendiente:** ninguno. La reconciliación en los `GET` es un compromiso técnico [Propuesta] de 2.2 y se conecta en I3 (DEV-017).

**DEV-016 — Servicio de activación transaccional**
- **Incremento:** I3.
- **Área:** backend.
- **Prioridad:** Must.
- **Historias:** HU-10.
- **Objetivo:** `POST /api/enrollments` (flujo 1 de 2.2).
- **Alcance:**
  - **reconciliación previa** con `reconcile(userId, now)` (DEV-027), en su propia transacción y **antes** de comprobar si hay un programa activo. No da por hecho que la inscripción anterior termine: solo pasa a `finished` si no le quedan sesiones `planned`;
  - comprobaciones previas, con `422 PROFILE_INCOMPLETE`, `PROGRAM_NOT_FOUND` o `PROGRAM_INCOMPATIBLE`;
  - el `scheduler`;
  - T-activación en una sola transacción, con el `lock_timeout` y el reintento de DEV-021;
  - `23505` → `409` sin reintentar.
- **Depende de:** DEV-005, DEV-012, DEV-014, DEV-015, DEV-021 y DEV-027.
- **Criterios:**
  - los criterios de HU-01, 3–8. El perfil se copia en `enrollments.weekdays` y `duration_weeks`;
  - una inscripción vencida se cierra antes de activar otra;
  - una con sesiones de hoy o futuras aún `planned` sigue activa → `409`.
- **Pruebas:**
  - API-15 (dos activaciones simultáneas), API-16, API-17, API-41 y API-46 (días bloqueados);
  - API-40 se ejecuta en I5 (DEV-029), porque necesita T-finalizar (DEV-023).
- **Además (DP-06):** conecta en `PATCH /api/profile` (DEV-005) el bloqueo de días: reconciliación previa, fila de `users` bloqueada y `409 AVAILABILITY_LOCKED` con un programa activo. T-activación también bloquea la fila de `users` (2.2, "Carreras en la activación"). Prueba: API-46.
- **Decisiones:** DP-07, DP-01 y DP-06. **Pendiente:** ninguno.

**DEV-017 — API de lectura: inscripciones, calendario y sesiones**
- **Incremento:** I3.
- **Área:** backend.
- **Prioridad:** Must.
- **Historias:** HU-11, HU-12, HU-13, HU-14 y HU-21 (en parte).
- **Objetivo:** las lecturas de la sección 4:
  - `GET /api/enrollments`, `/active` y `/{id}`;
  - `GET …/{id}/sessions`;
  - `GET /api/sessions/today` y `/{id}`.
- **Alcance:**
  - autorización a través de `enrollments.user_id`;
  - `canLog` calculado con `Clock` y la zona horaria;
  - la prescripción de la semana de cada sesión;
  - `Cache-Control: no-store`;
  - **reconciliación mínima en estos `GET`**, adelantada desde I5: antes de leer, `reconcile(userId, now)` (DEV-027) en una transacción propia y corta, ya confirmada cuando empieza la lectura; `503` si falla el bloqueo tras el reintento acotado; solo para el usuario autenticado y sin usar datos de la petición (restricciones de 2.2).
- **Depende de:** DEV-014, DEV-004 y DEV-027.
- **Criterios:**
  - las respuestas siguen la sección 4;
  - una sesión vencida aparece `partial` o `skipped` en la primera lectura posterior al final de su fecha local. En I3 solo puede ser `skipped`, porque las series llegan en I4;
  - `GET /active` devuelve `null` sin inscripción activa;
  - un recurso de otro usuario → `404` igual que uno inexistente.
- **Pruebas:**
  - contrato de las rutas;
  - API-12 (acceso cruzado);
  - `canLog` con un reloj fijo antes y después de medianoche en la zona del usuario.
- **Decisión:** un solo programa activo (DP-07), así que hay una sola sesión "de hoy". **Pendiente:** ninguno.

**DEV-018 — Pantallas de activación, programa activo y calendario**
- **Incremento:** I3.
- **Área:** frontend.
- **Prioridad:** Must.
- **Historias:** HU-10, HU-11 y HU-12.
- **Objetivo:** confirmar la activación y ver el plan.
- **Alcance:**
  - confirmación con la fecha de inicio y el total de sesiones;
  - `409` tratado como "volver a consultar" y `422` con su mensaje;
  - vista del programa activo;
  - calendario con los cuatro estados distinguibles por texto e icono.
- **Depende de:** DEV-013, DEV-016 y DEV-017.
- **Criterios:** los criterios de HU-10 a HU-12, y CT-01 a CT-06.
- **Pruebas:** componentes de la confirmación, del tratamiento de `409` y `422`, y de cómo se muestran los cuatro estados.
- **Decisión:** DP-07. **Pendiente:** ninguno.

**DEV-019 — Pantalla "Hoy" en modo lectura**
- **Incremento:** I3.
- **Área:** frontend.
- **Prioridad:** Must.
- **Historias:** HU-13.
- **Objetivo:** la sesión de hoy o la próxima, con la prescripción de su semana.
- **Alcance:**
  - acceso a un toque desde el inicio;
  - estados "sin programa", "sin sesión hoy" y "sesión completada";
  - sin acciones de registro, que llegan en DEV-025.
- **Depende de:** DEV-006 y DEV-017.
- **Criterios:** HU-02, criterio 1, más los criterios de HU-13, y CT-01 a CT-03.
- **Pruebas:** componentes de los distintos estados de la pantalla.
- **Pendiente:** ninguno.

##### I4 — Ejecución

DEV-020 y DEV-021 se han adelantado a I3 (ver allí): la reconciliación previa a la activación las necesita.

**DEV-022 — Registro, edición y borrado de series (T-registro)**
- **Incremento:** I4.
- **Área:** backend.
- **Prioridad:** Must.
- **Historias:** HU-15 y HU-16.
- **Objetivo:** `POST /api/sessions/{id}/sets`, y `PATCH` y `DELETE …/sets/{setId}`.
- **Alcance:**
  - **desde el primer día**, las validaciones de estado y de fecha local: `planned` y de hoy; si no, `409 SESSION_NOT_OPEN` o `SESSION_NOT_TODAY`;
  - la prescripción debe ser de la plantilla **y** la semana de la sesión (`422 PRESCRIPTION_MISMATCH`, regla 8 de 3.2);
  - `MEASUREMENT_MISMATCH`;
  - `SET_NUMBER_OUT_OF_RANGE`: solo las series prescritas (DP-10);
  - `23505` → `409 SET_ALREADY_EXISTS` con `details.existingSet`;
  - **nunca** cambia el estado de la sesión.
- **Depende de:** DEV-017, DEV-020 y DEV-021.
- **Criterios:** los criterios de HU-15 y HU-16, y HU-02, criterios 2–7.
- **Pruebas:**
  - API-13, API-14, API-18–API-21, API-25, API-28–API-31;
  - la prueba de integración de 3.2 con una prescripción de otra plantilla o semana.
- **Decisiones:**
  - DP-08: solo en la fecha programada;
  - DP-10: solo las series prescritas;
  - DP-11: segundos o repeticiones según `measurement`, sin convertir.
- **Pendiente:** ninguno.

**DEV-023 — Finalización explícita (T-finalizar)**
- **Incremento:** I4.
- **Área:** backend.
- **Prioridad:** Must.
- **Historias:** HU-17 y HU-22 (en parte).
- **Objetivo:** `POST /api/sessions/{id}/complete` con el orden del paso 3 de T-finalizar (2.2).
- **Alcance:**
  - primero `404`;
  - si está `completed` → `200` sin escribir, de cualquier fecha;
  - si está `partial` o `skipped` → `409`;
  - si está `planned` y no es de hoy → `409`;
  - si está `planned`, es de hoy y no tiene ninguna serie → `409 NO_SETS_LOGGED` (DP-09), con la sesión bloqueada;
  - después, el bloqueo de la inscripción y el paso a `finished` si no quedan sesiones `planned`.
- **Depende de:** DEV-020, DEV-021 y DEV-017.
- **Criterios:** HU-03, criterios 1–5, y HU-17.
- **Pruebas:** API-21–API-24, API-42, API-43 (operación sin cuerpo) y API-47 (sin series).
- **Decisión:** finalizar exige al menos una serie (DP-09). **Pendiente:** ninguno.

**DEV-024 — Vista del detalle de una sesión**
- **Incremento:** I4.
- **Área:** frontend.
- **Prioridad:** Must.
- **Historias:** HU-14.
- **Objetivo:** ver la prescripción y la ejecución de cualquier sesión.
- **Alcance:** solo lectura para las sesiones futuras, `completed`, `partial` y `skipped`. Se accede desde el calendario.
- **Depende de:** DEV-018.
- **Criterios:** los criterios de HU-14, y CT-01 a CT-03.
- **Pruebas:** componentes en cada estado.
- **Pendiente:** ninguno.

**DEV-025 — Pantalla de ejecución: series y finalización**
- **Incremento:** I4.
- **Área:** frontend.
- **Prioridad:** Must.
- **Historias:** HU-15, HU-16 y HU-17.
- **Objetivo:** T-02, tareas 7 y 9.
- **Alcance:**
  - formulario por serie, con repeticiones o segundos según `measurement` y `setNumber` según la posición;
  - edición y borrado;
  - "Finalizar" con confirmación, **desactivado hasta que haya al menos una serie** (DP-09);
  - tantas filas como `targetSets` (DP-10);
  - acciones desactivadas cuando `canLog` es `false`;
  - política de reintentos de la sección 4: consultar la sesión tras un fallo de red o un `409`, y no reintentar automáticamente los `POST`.
- **Depende de:** DEV-019, DEV-022 y DEV-023.
- **Criterios:**
  - los criterios de HU-15 a HU-17;
  - T-02, criterios 5–7;
  - CT-05: un doble toque produce una sola petición.
- **Pruebas:** componentes del formulario según la forma de medida, del bloqueo durante el envío, de la consulta tras un `409` simulado y de la confirmación de finalizar.
- **Decisiones:** DP-09, DP-10 y DP-11 (campo de segundos en los ejercicios `time`). **Pendiente:** ninguno.

**DEV-026 — E2E del primer recorrido mínimo**
- **Incremento:** cierre de I4.
- **Área:** pruebas.
- **Prioridad:** Must.
- **Historias:** HU-04, HU-06, HU-08, HU-10, HU-13, HU-15, HU-17 y HU-12.
- **Objetivo:** validar de extremo a extremo el recorrido mínimo de la sección 5.
- **Alcance:** Playwright en el perfil de desarrollo, con *viewport* de 320 px y de escritorio, en Chromium y WebKit, sobre las *seeds* provisionales.
- **Depende de:** DEV-007, DEV-008, DEV-013, DEV-018, DEV-019 y DEV-025.
- **Criterios:** registro → días → activación → sesión de hoy → una serie → finalizar → `completed` en el calendario, sin errores y sin desplazamiento horizontal (CE1, CE5).
- **Pruebas:** el propio E2E, que se mantiene en CI o se ejecuta antes de cada entrega (2.4).
- **Pendiente:** ninguno.

##### I5 — Reconciliación y cierre

El núcleo de la reconciliación (DEV-027) y su uso en la activación y en los `GET` (DEV-016 y DEV-017) se han adelantado a I3 (ver allí). En I5 quedan las pruebas ampliadas, el refuerzo de los `GET` (DEV-028) y la suite de concurrencia (DEV-029), que no bloquean I3.

**DEV-028 — Validación ampliada de la reconciliación en los `GET`**
- **Incremento:** I5.
- **Área:** pruebas y backend.
- **Prioridad:** Must.
- **Historias:** HU-11, HU-12, HU-13 y HU-18.
- **Objetivo:** ampliar las pruebas y reforzar la reconciliación que ya hacen desde I3 la activación (DEV-016) y los `GET` de inscripciones y sesiones (DEV-017). Ninguna de estas tareas bloquea I3.
- **Alcance:**
  - comprobar que se cumplen las cinco restricciones de "Reconciliación en peticiones `GET`" (2.2) en todos los `GET` de la lista de la sección 4, incluidos los de progreso cuando lleguen (DEV-032);
  - casos de zona horaria y de medianoche con series registradas (`partial`), que solo se pueden probar desde I4;
  - las optimizaciones que resulten de la revisión con `EXPLAIN ANALYZE` (DEV-031), si las hay.
- **Depende de:** DEV-017, DEV-022 y DEV-027.
- **Criterios:**
  - con series registradas, la sesión vencida aparece `partial` en la primera lectura;
  - dos lecturas simultáneas producen el mismo resultado;
  - los `GET` de autenticación, perfil y catálogo no escriben nada (API-45).
- **Pruebas:**
  - API-32–API-35: zonas horarias extremas, medianoche local, cambio de zona y cambio de horario;
  - API-44 y API-45.
- **Pendiente:** las alternativas para no escribir en los `GET` siguen [Pendiente] y no forman parte de este ticket.

**DEV-029 — Suite de concurrencia sobre PostgreSQL real**
- **Incremento:** I5.
- **Área:** pruebas.
- **Prioridad:** Must.
- **Historias:** HU-15, HU-17, HU-18 y HU-10.
- **Objetivo:** demostrar el protocolo de 2.2.
- **Alcance:**
  - dos conexiones `pg`;
  - detección de esperas con `pg_stat_activity`, sin esperas fijas;
  - *hooks* de pausa en los repositorios;
  - escenarios C1–C8 (incluidos los casos de C4), API-26, API-27 y API-40;
  - las invariantes de 2.6 al final de cada escenario;
  - la comprobación con `EXPLAIN` de que, en T-cierre, `LockRows` está por encima de `Sort` (parte de C8; se ha trasladado desde DEV-027).
- **Depende de:** DEV-016, DEV-022, DEV-023 y DEV-027.
- **Criterios:** cada escenario da el resultado esperado de 2.6, y C7 falla si se quita el bloqueo de la inscripción.
- **Pruebas:** la propia suite, ejecutada en CI.
- **Pendiente:** ninguno.

**DEV-030 — Interfaz del cierre y del fin de programa**
- **Incremento:** I5.
- **Área:** frontend.
- **Prioridad:** Must.
- **Historias:** HU-18 y HU-22.
- **Objetivo:** mostrar el resultado del cierre y el resumen al terminar el programa.
- **Alcance:**
  - las sesiones `partial` y `skipped` aparecen como tales en el calendario y en "Hoy";
  - pantalla de resumen al terminar, con acceso al catálogo para activar otro programa;
  - un `409` de activación se trata como "volver a consultar".
- **Depende de:** DEV-018, DEV-019 y DEV-023. La reconciliación en los `GET` ya está en DEV-017.
- **Criterios:** los criterios de HU-18 y HU-22, y CT-01 a CT-03.
- **Pruebas:** componentes del resumen y de los estados de cierre.
- **Decisiones:** adherencia según DP-13, o "sin datos"; sin abandono (DP-14). **Pendiente:** ninguno.

##### I6 — Progreso y validación

**DEV-031 — Consultas de progreso y revisión con `EXPLAIN ANALYZE`**
- **Incremento:** I6.
- **Área:** base de datos.
- **Prioridad:** Must.
- **Historias:** HU-19 y HU-20.
- **Objetivo:** T-03, tareas 7 y 8.
- **Alcance:**
  - SQL de los recuentos por estado, de la semana actual y del desempeño prescrito frente a realizado;
  - `EXPLAIN ANALYZE` con un volumen representativo de estas consultas y de las de T-cierre (DEV-027), registrando el plan obtenido.
- **Depende de:** DEV-020 y DEV-027.
- **Criterios:**
  - las consultas dan los resultados esperados sobre datos de prueba conocidos;
  - los planes quedan documentados en 3.2 sin presuponerlos (T-03, criterio 8).
- **Pruebas:** integración de las consultas con datos fijos.
- **Decisión:** DP-12 y DP-13: `completed` vale 1, `partial` 0,5 y `skipped` 0, solo sobre sesiones evaluables. **Pendiente:** ninguno.

**DEV-032 — API de progreso**
- **Incremento:** I6.
- **Área:** backend.
- **Prioridad:** Must.
- **Historias:** HU-19, HU-20 y HU-22.
- **Objetivo:** `GET …/progress` y `GET …/progress/exercises`.
- **Alcance:**
  - recuentos por separado;
  - `adherence` en %: `100 × (completed + 0,5 × partial) / (completed + partial + skipped)`, o `null` si no hay sesiones evaluables (DP-12, DP-13);
  - filtro `exerciseId`;
  - las sesiones `partial` se incluyen con sus registros;
  - reconciliación previa, con el mismo mecanismo que DEV-017.
- **Depende de:** DEV-017, DEV-027 y DEV-031.
- **Criterios:**
  - HU-03, criterios 6 y 7, y los criterios de HU-19 y HU-20;
  - el progreso de otro usuario → `404`.
- **Pruebas:** contrato de las dos rutas y API-12 sobre el progreso.
- **Pendiente (técnico):** el redondeo, propuesto a un decimal.

**DEV-033 — Pantallas de progreso y desempeño**
- **Incremento:** I6.
- **Área:** frontend.
- **Prioridad:** Must.
- **Historias:** HU-19 y HU-20.
- **Objetivo:** el panel de progreso (F8).
- **Alcance:**
  - semana actual sobre el total;
  - recuentos `completed`, `partial` y `skipped` por separado;
  - adherencia, presentada **sin darla por definitiva** y como "sin datos" cuando es `null`;
  - comparación por ejercicio y filtro.
- **Depende de:** DEV-032.
- **Criterios:** los criterios de HU-19 y HU-20, T-02 criterio 8, y CT-01 a CT-03.
- **Pruebas:** componentes de los recuentos, de la adherencia `null` y de la comparación.
- **Decisión:** DP-13. Se muestra en %, o como "No data yet" si es `null`. **Pendiente:** ninguno.

**DEV-034 — Historial de programas anteriores**
- **Incremento:** I6.
- **Área:** frontend.
- **Prioridad:** Should (DP-16).
- **Historias:** HU-21.
- **Objetivo:** consultar las inscripciones `finished`, con su calendario y su progreso.
- **Alcance:** listado desde la más reciente y detalle en modo solo lectura, reutilizando DEV-018, DEV-024 y DEV-033.
- **Depende de:** DEV-033.
- **Criterios:** los criterios de HU-21, y CT-01 a CT-03.
- **Pruebas:** componentes del listado.
- **Decisión:** Should (DP-16). No forma parte del recorrido obligatorio, y los datos y endpoints se conservan. **Pendiente:** ninguno.

**DEV-035 — E2E completo, diseño adaptable, accesibilidad y perfil similar a producción**
- **Incremento:** I6.
- **Área:** pruebas.
- **Prioridad:** Must.
- **Historias:** HU-04 a HU-22, y CT-01 a CT-06.
- **Objetivo:** validar el MVP completo.
- **Alcance:**
  - amplía DEV-026 con edición y borrado de series, cierre a medianoche (con reloj controlado, en el perfil de desarrollo), progreso y fin de programa;
  - **perfil similar a producción**, con `__Host-session`, HTTPS y CSP (tabla de diferencias de la sección 4);
  - 320 px y escritorio, en Chromium y WebKit;
  - comprobación manual en Safari de iOS y con un lector de pantalla (2.6).
- **Depende de:** DEV-026, DEV-030, DEV-033 y DEV-036 (para el perfil similar a producción en el entorno desplegado).
- **Criterios:**
  - el flujo principal de 1.3 se completa en los dos perfiles;
  - no hay errores de CSP;
  - se cumplen CE1, CE4 y CE5.
- **Pruebas:** la propia suite, y el registro de la prueba manual en 2.6.
- **Pendiente:** ninguno.

**DEV-036 — Despliegue en PaaS**
- **Incremento:** I6. Es **adelantable**: un despliegue del esqueleto tras I1 permite validar pronto la cookie `__Host-`, HTTPS y `trust proxy`.
- **Área:** integración.
- **Prioridad:** Must (CE6).
- **Historias:** todas (CE6).
- **Objetivo:** la aplicación accesible mediante una URL (2.4).
- **Alcance:**
  - un único servicio web con Express, la API y la SPA, y PostgreSQL gestionado;
  - migraciones en el paso de *release*;
  - secretos en variables de entorno;
  - `APP_ORIGIN` en `https`;
  - comprobar el dominio frente a la *Public Suffix List* (2.5).
- **Depende de:** DEV-001 y DEV-003.
- **Criterios:**
  - la URL responde por HTTPS;
  - el servidor arranca solo con la configuración segura;
  - la URL figura en 0.4, aunque esa sección se completa fuera de este backlog.
- **Pruebas:** una comprobación manual del entorno desplegado (`trust proxy` y límite de peticiones), y DEV-035 contra ese entorno.
- **Pendiente:** la plataforma PaaS y el dominio propio, que es una decisión técnica abierta en 2.4.

**DEV-037 — Documentación de instalación y cierre del README**
- **Incremento:** I6.
- **Área:** integración.
- **Prioridad:** Must.
- **Historias:** todas.
- **Objetivo:** que el proyecto se pueda reproducir (1.4).
- **Alcance:**
  - instrucciones de instalación, migración, *seeds* y ejecución de las pruebas en 1.4;
  - registrar en 2.6 y 3.2 los resultados reales de las pruebas y de `EXPLAIN`;
  - capturas del flujo en 1.3.
- **Depende de:** DEV-035 y DEV-036.
- **Criterios:** una persona sin contexto previo levanta el proyecto en local siguiendo 1.4, y los resultados documentados coinciden con los de CI.
- **Pruebas:** una ejecución en limpio de las instrucciones de 1.4.
- **Pendiente:** ninguno.

##### Mejora posterior: sin ticket en el MVP inicial

- **HU-23 (hitos, F10)** no tiene ticket. Antes habría que definir su contrato en la sección 4 y sus criterios. No exige trabajo obligatorio en el MVP inicial.
- **Opcionales de 2.2:** la tarea programada de reconciliación y el *trigger* de refuerzo no tienen ticket, porque la corrección del sistema no depende de ellos.

##### Tickets por incremento y área

| Incremento | Base de datos | Backend | Frontend | Pruebas o integración |
|------------|---------------|---------|----------|------------------------|
| I1 · Acceso y perfil | DEV-002 | DEV-003, DEV-004, DEV-005 | DEV-038, DEV-039, DEV-006, DEV-007, DEV-008 | DEV-001 |
| I2 · Catálogo | DEV-009, DEV-010 | DEV-011, DEV-012 | DEV-013 | — |
| I3 · Activación y calendario | DEV-014, DEV-020 (adelantado), DEV-027 (compartido) | DEV-015, DEV-021 (adelantado), DEV-027 (adelantado), DEV-016, DEV-017 | DEV-018, DEV-019 | — |
| I4 · Ejecución | — | DEV-022, DEV-023 | DEV-024, DEV-025 | DEV-026 |
| I5 · Reconciliación y cierre | — | — | DEV-030 | DEV-028, DEV-029 |
| I6 · Progreso y validación | DEV-031 | DEV-032 | DEV-033, DEV-034 | DEV-035, DEV-036, DEV-037 |

##### Trazabilidad entre historias y tickets

| Historia | Tickets DEV | Ticket de alto nivel |
|----------|-------------|----------------------|
| HU-04 | 002, 003, 004, 007, 038, 039 | T-01, T-02, T-03 |
| HU-05 | 004, 006, 007, 038, 039 | T-01, T-02 |
| HU-06 | 002, 005, 008, 016, 038, 039 | T-01, T-02, T-03 |
| HU-07 | 005, 008, 038, 039 | T-01, T-02 |
| HU-08 | 009, 010, 012, 013 | T-01, T-02, T-03 |
| HU-09 | 009, 010, 011, 012, 013 | T-01, T-02, T-03 |
| HU-10 | 011, 014, 015, 016, 018, 020, 021, 027 | T-01, T-02, T-03 |
| HU-11 | 017, 018, 027, 028 | T-01, T-02 |
| HU-12 | 014, 017, 018, 027, 028 | T-01, T-02, T-03 |
| HU-13 | 017, 019, 027, 028 | T-01, T-02 |
| HU-14 | 017, 024 | T-01, T-02 |
| HU-15 | 020, 021, 022, 025, 029 | T-01, T-02, T-03 |
| HU-16 | 020, 022, 025 | T-01, T-02, T-03 |
| HU-17 | 021, 023, 025, 029 | T-01, T-02 |
| HU-18 | 020, 021, 027, 028, 029, 030 | T-01, T-02, T-03 |
| HU-19 | 031, 032, 033 | T-01, T-02, T-03 |
| HU-20 | 031, 032, 033 | T-01, T-02, T-03 |
| HU-21 | 017, 032, 034 | T-01, T-02 |
| HU-22 | 023, 027, 030, 032 | T-01, T-02 |
| HU-23 | Ninguno (mejora posterior) | — |
| CT-01 a CT-06 | 003 (CT-04), 038 (CT-02, CT-06), 039 (CT-01, CT-03, CT-05), 006, todos los de frontend, 026, 035 | T-01, T-02 |
| CE6 (URL) y 1.4 | 036, 037 | Ninguno: es un hueco de T-01–T-03 |

##### Estrategia de calidad por tipo de prueba

| Tipo | Dónde se incorpora |
|------|--------------------|
| Unitarias (Vitest) | DEV-003 (configuración), DEV-011 y DEV-015 (dominio), DEV-021 (reintento), DEV-027 (`resolveClosure`), DEV-038 (formatos y catálogo sin claves que falten) |
| Integración con PostgreSQL real | Restricciones en DEV-002, DEV-009, DEV-014 y DEV-020. Servicios en cada ticket de backend. Consultas en DEV-031 |
| Contrato API (Supertest) | Cada ticket de backend con sus API-xx: DEV-003–DEV-005, DEV-012, DEV-016, DEV-017, DEV-022, DEV-023, DEV-028 y DEV-032 |
| Autenticación, autorización y CSRF | DEV-003 y DEV-004 (API-01–API-11, API-43), y acceso cruzado (API-12–API-14) en DEV-017, DEV-022 y DEV-032 |
| Concurrencia y transacciones | DEV-021 (I3), API-15 en DEV-016 (I3), API-19 en DEV-022 (I4), y la suite DEV-029 (C1–C8, `EXPLAIN` de C8, API-26, API-27 y API-40) |
| Manejo de errores | DEV-003 (formato, `404`, `500`), DEV-021 (`503`) y DEV-006 (presentación por `code`) |
| Componentes (RTL) | Cada ticket de frontend: DEV-038, DEV-039 (con una comprobación de accesibilidad), DEV-006–DEV-008, DEV-013, DEV-018, DEV-019, DEV-024, DEV-025, DEV-030, DEV-033 y DEV-034 |
| E2E y diseño adaptable desde 320 px | DEV-026 al cerrar I4 y DEV-035 en I6. CT-01 se comprueba en cada ticket de frontend |

##### Dependencias, paralelismo y orden recomendado

**Tickets bloqueantes:**
- **DEV-001**, base de todos;
- **DEV-003**, cadena de seguridad;
- las migraciones DEV-002 → DEV-009 → DEV-014 → DEV-020, en cadena, ya **todas antes de terminar I3**;
- **DEV-021**, de la que dependen **todas** las escrituras sobre sesiones, registros o estado de inscripciones: DEV-016, DEV-022, DEV-023 y DEV-027;
- **DEV-027**, de la que dependen la activación (DEV-016), la reconciliación en los `GET` (DEV-017), el cierre y el progreso;
- **DEV-038 y DEV-039**, base de todas las pantallas: DEV-006 depende de ellos, y el resto de tickets de frontend dependen de DEV-006.

**Se pueden hacer en paralelo:**
- el dominio puro (DEV-011, DEV-015) con las migraciones;
- la base del frontend (DEV-006) y sus pantallas, con datos simulados de la sección 4, con el backend del mismo incremento;
- DEV-036 (despliegue del esqueleto) en cuanto existan DEV-001 y DEV-003.

**Dependencias que obligan a adelantar trabajo:**
- **Validaciones de estado y fecha local:** forman parte de DEV-022 y DEV-023 desde el primer día (I4). Antes de I5, una sesión vencida sigue `planned` en la base de datos, pero se rechaza cualquier escritura sobre ella con `409 SESSION_NOT_TODAY` y se muestra con `canLog = false`.
- **Activación con reconciliación previa:** la sección 4 exige reconciliar antes de comprobar si hay un programa activo. Por eso **DEV-020, DEV-021 y DEV-027 se adelantan a I3**, y DEV-016 depende de ellos. El mínimo imprescindible es T-cierre completo para un usuario: bloqueo de las candidatas, clasificación `partial`/`skipped` en una sentencia posterior y paso a `finished` (ver DEV-027). API-17 y API-41 se ejecutan ya en I3.
- **Reconciliación en los `GET` desde I3:** en cuanto existe T-cierre (DEV-027), los `GET` de inscripciones y sesiones (DEV-017) reconcilian antes de leer, como exige el contrato de la sección 4. Así, I3 e I4 nunca muestran como `planned` una sesión vencida.
- **Lo que se queda en I5:** las pruebas ampliadas y el refuerzo de los `GET` (DEV-028), la suite de concurrencia con C3, C8 y `EXPLAIN` (DEV-029) y la interfaz del cierre (DEV-030). La revisión con `EXPLAIN ANALYZE` está en DEV-031 (I6).
- **El protocolo de concurrencia** es el riesgo técnico mayor. Al adelantar DEV-021 y DEV-027 a I3, C2, C3 y C8 se pueden probar desde I3, y C1 y C5 en cuanto exista DEV-022 (I4). La suite completa se consolida en DEV-029.

**Orden recomendado:**
1. I1: DEV-001 → DEV-002 y DEV-003 → DEV-004 → DEV-005; DEV-038 → DEV-039 → DEV-006 → DEV-007 y DEV-008.
2. I2: DEV-009 → DEV-010; DEV-011; DEV-012 → DEV-013.
3. I3: DEV-014 → DEV-020 → DEV-021 → DEV-027 → DEV-016 → DEV-017 → DEV-018 y DEV-019. DEV-015 va en paralelo y es necesario antes de DEV-016.
4. I4: DEV-022 → DEV-023; DEV-024 → DEV-025 → **DEV-026**.
5. I5: DEV-028 → DEV-029; DEV-030.
6. I6: DEV-031 → DEV-032 → DEV-033 → DEV-034; DEV-036 → DEV-035 → DEV-037.

**Primer recorrido de extremo a extremo:** **DEV-026**, al cerrar I4. Corresponde al recorrido mínimo de la sección 5:
- registro → días → catálogo y activación → sesión de hoy → una serie → finalizar → `completed` en el calendario;
- requiere DEV-001–DEV-023, DEV-025, DEV-027, DEV-038 y DEV-039. DEV-024 no es imprescindible para el recorrido;
- requiere al menos un programa completo en las *seeds* para el N elegido.

**Riesgos que conviene resolver pronto:**
- **Protocolo de bloqueo y concurrencia:** DEV-021, DEV-027 y DEV-029.
- **Objetos de base de datos añadidos con SQL manual**, que Prisma podría eliminar: los tests de existencia de DEV-002, DEV-014 y DEV-020.
- **Cookie `__Host-`, HTTPS, *Public Suffix List* y `trust proxy`**, que solo se ven al desplegar: adelantar DEV-036.
- **Fechas `date` mal convertidas** por Prisma o por el navegador: DEV-017 y CT-06.
- **Contenido real de los programas sin definir:** las *seeds* de DEV-010 son provisionales.

**Decisiones del Product Owner que afectan a los tickets.** Todas están **confirmadas** (DP-01 a DP-17, en 1.2):

| Decisión | Tickets |
|----------|---------|
| DP-07 Un solo programa activo | DEV-014, DEV-016, DEV-017, DEV-018 |
| DP-01 Primera sesión al día siguiente de la activación | DEV-015, DEV-016 |
| DP-06 Días bloqueados con un programa activo | DEV-005, DEV-008, DEV-016 |
| DP-02, DP-04, DP-05: 3 programas de 6 semanas, con repeticiones fijas | DEV-009, DEV-010, DEV-013 |
| DP-10 Solo las series prescritas | DEV-022, DEV-025 |
| DP-11 Segundos en los ejercicios por tiempo | DEV-020, DEV-022, DEV-025 |
| DP-09 Finalizar exige al menos una serie | DEV-023, DEV-025 |
| DP-12, DP-13 Adherencia | DEV-030, DEV-031, DEV-032, DEV-033 |
| DP-15 Sesión de 7 días | DEV-004 |
| DP-16 HU-21 Should | DEV-034 |

**Lo que sigue abierto**, sin decisiones DP:

| Tema | Tickets |
|------|---------|
| Contenido de los 3 programas y números de días que admite cada uno (insumo del Product Owner, 1.2) | DEV-010, DEV-013 |
| Plataforma PaaS y dominio (decisión técnica, 2.4) | DEV-036 |
| Comparación con el mockup de referencia, que no está en el repositorio | DEV-039 |
| bcrypt o argon2 y longitud mínima de la contraseña (técnico) | DEV-004 |
| Estrategia para traducir el contenido almacenado (decisión futura) | DEV-038 |

**Huecos detectados respecto a T-01–T-03** (documentados, no corregidos):
- El **despliegue** (CE6, 2.4) y la **documentación de instalación** (1.4) no forman parte del alcance de ninguno de los tres tickets originales; T-01 y T-03 solo citan 1.4 en su definición de terminado. Los cubren DEV-036 y DEV-037.
- T-01 agrupa en un solo ticket lo que aquí son 15 tickets de backend: confirma el riesgo de tamaño ya señalado.
- **Diferencias con los incrementos de la sección 5** (sin corregir allí):
  - la sección 5 sitúa el cierre automático (HU-18) en I5. Aquí se ve desde I3 en la activación y en los `GET` (DEV-016, DEV-017 y DEV-027), con `skipped` en I3 y también `partial` desde I4. I5 conserva la validación ampliada (DEV-028 y DEV-029) y la interfaz específica del cierre (DEV-030);
  - la navegación de T-02 (tarea 1) y su exclusión de la "internacionalización" **se han corregido en T-02** para reflejar las decisiones confirmadas: **Today · Program · Progress · Profile**, y excluir solo los idiomas adicionales (DEV-038 y DEV-039). Su identificador y su alcance funcional no cambian.

##### Plan de las tres entregas académicas [Propuesta]

> **Qué es este apartado.** Organiza el backlog anterior en las tres entregas del proyecto, **sin añadir tickets ni cambiar su orden**. No incluye fechas ni porcentajes de avance.
>
> **[Pendiente de verificación]:** las instrucciones oficiales de las entregas de AI4Devs **no están en el repositorio**. Los objetivos de cada entrega son los de trabajo fijados por el autor, y no se ha comprobado que cumplan los requisitos oficiales: contenido exigido, formato, rama o Pull Request de entrega y fechas.

**Entrega 1: documentación y diseño.** Objetivo: una especificación coherente y trazable del MVP.

| Evidencia prevista | Dónde está | Estado en el repositorio |
|--------------------|------------|--------------------------|
| Producto y funcionalidades | Sección 1: F1–F10, capacidades principales, RP1–RP6 y registro DP-01 a DP-17 | Documentado. Faltan las capturas y el vídeo de 1.3, que necesitan la implementación |
| Arquitectura técnica | Sección 2 | Documentada como [Propuesta]; nada está implementado |
| Modelo de datos | Sección 3 | Documentado; no existen esquema, migraciones ni *seeds* |
| Especificación de la API | Sección 4, con OpenAPI de los endpoints principales | Documentada |
| Historias de usuario | Sección 5: HU-01 a HU-03 y backlog HU-04 a HU-23 | Documentadas |
| Tickets de desarrollo | Sección 6: T-01 a T-03 y DEV-001 a DEV-039 | Documentados. DEV-001 terminado (PR #3); los demás sin empezar |
| Prompts y decisiones humanas | `prompts.md` y registro DP de 1.2 | Documentados. El Prompt 17 está como referencia pendiente de registrar |
| Sistema de diseño | `docs/design-system.md` | Documentado. Los tokens son una [Propuesta] y falta la comparación con el mockup |

Los documentos existen en `main` (Pull Request #1, ya fusionada). **No se ha verificado su entrega formal**, ni que la ficha de la sección 0 esté completa: el nombre del autor y la visibilidad del repositorio están pendientes de confirmar.

**Entrega 2: primer flujo funcional.** Objetivo: demostrar una integración real entre frontend, backend y base de datos. Flujo propuesto: **registro de usuario desde la interfaz (HU-04, pantalla S-01), validación en la API (`POST /api/auth/register`) y persistencia en PostgreSQL (`users`)**.

- **Coherencia con el backlog:** el flujo es coherente con I1 y no depende de ningún ticket de I2 o posteriores. Cubre HU-04, no todo I1: el perfil (DEV-005 y DEV-008) y el cierre de sesión de HU-05 no son necesarios para este flujo.
- **Tickets necesarios:** DEV-001, DEV-002, DEV-003, DEV-004, DEV-038, DEV-039, DEV-006 y DEV-007.
- **Dependencias técnicas,** según el orden recomendado:
  - backend: DEV-001 → DEV-002 y DEV-003 → DEV-004;
  - frontend: DEV-001 → DEV-038 → DEV-039 → DEV-006 → DEV-007;
  - DEV-007 puede empezar con datos simulados, pero la demostración exige DEV-004 real.
- **Pruebas de integración ya previstas en esos tickets** (ninguna escrita ni ejecutada):
  - restricciones de `users` contra PostgreSQL: email normalizado y único (DEV-002);
  - cadena de seguridad: API-01–API-06 y API-36–API-38 (DEV-003);
  - autenticación: API-07–API-11, API-43 y los criterios de HU-04, con `409` por email duplicado y `400` por datos no válidos (DEV-004);
  - componentes del formulario de registro (DEV-007) y CI con PostgreSQL de servicio (DEV-001).
- **Evidencias necesarias para demostrar el flujo:**
  - las Pull Requests de esos tickets, con la ejecución de CI visible (sección 7);
  - los resultados reales de las pruebas de integración contra PostgreSQL;
  - una demostración del registro desde la interfaz que muestre la fila creada en `users`, con la contraseña solo como *hash*;
  - el borrador de 1.4 con el arranque local (definición de terminado de DEV-001) y el registro de los prompts.
- **Huecos detectados** (no se corrigen aquí):
  - **[Pendiente de decisión]:** ningún ticket prevé una prueba automatizada que recorra interfaz → API → base de datos antes de DEV-026, al cerrar I4. Para la Entrega 2, las opciones son una demostración manual documentada o adelantar un E2E reducido del registro; cualquiera de las dos cambia el alcance de un ticket y la decide el autor;
  - el criterio 3 de HU-04 necesita la longitud mínima de la contraseña, una decisión técnica abierta de DEV-004 (1.2);
  - el flujo no necesita un despliegue. DEV-036 se puede adelantar, pero no se sabe si la Entrega 2 lo exige (ver la nota de verificación).

**Entrega 3: MVP integrado.** Objetivo: el recorrido principal del usuario con las historias Must implementadas y verificadas.

| Evidencia prevista | Incrementos y tickets | Criterios de la sección 1 |
|--------------------|-----------------------|---------------------------|
| Aplicación funcional | I1–I6: todas las historias Must (HU-04 a HU-20 y HU-22) | CE1–CE4 |
| Flujos principales integrados | DEV-026 (recorrido mínimo, I4) y DEV-035 (flujo completo de 1.3, I6) | CE1, CE4 |
| Pruebas automatizadas | "Estrategia de calidad por tipo de prueba": unitarias, integración y contrato (API-01–API-47), y concurrencia (DEV-029, C1–C8) | CE2, CE3 |
| Diseño adaptable y accesibilidad | CT-01 a CT-06, DEV-039 y DEV-035: 320 px y escritorio, Chromium y WebKit, y prueba manual en Safari de iOS y con lector de pantalla | CE5 |
| Despliegue | DEV-036, con la URL en 0.4 | CE6 |
| Documentación y prompts actualizados | DEV-037 (1.3, 1.4 y resultados reales en 2.6 y 3.2), sección 7 y `prompts.md` | — |

- **Fuera del recorrido obligatorio:** HU-21 (Should, DP-16; DEV-034) y HU-23 (F10, mejora posterior, DP-17).
- **Requisito previo de producto:** el contenido de los 3 programas debe estar definido antes de cerrar DEV-010 (1.2). Sin él, la Entrega 3 solo podría mostrar contenido provisional.

---

## 7. Pull Requests

> Documenta 3 de las Pull Requests realizadas durante la ejecución del proyecto

> **Estado de esta sección:** la primera Pull Request de implementación es la **#3** (DEV-001). Antes se fusionaron dos Pull Requests solo de documentación: la **#1** (`docs: consolidate Cali Coach MVP product decisions`) y la **#2** (`docs: prepare Cali Coach academic delivery 1`). **Pendiente** de que el autor decida qué tres Pull Requests se documentan finalmente aquí; la #3 ocupa provisionalmente el primer hueco.

**Pull Request 1**

**#3 — `feat: initialize Cali Coach scaffolding and Claude harness (DEV-001)`** (https://github.com/GeraGalindo/AI4Devs-finalproject/pull/3)

- **Rama:** `feature/dev-001-scaffolding` → `main`. Un commit (`de54a70`), fusionado el 2026-11-22 con *merge commit* (`4a885e9`), la estrategia habitual del repositorio.
- **Ticket:** DEV-001 (sección 6), primer incremento técnico de la Entrega 2. Sin funcionalidades de negocio.
- **Contenido:**
  - npm *workspaces* `backend`, `frontend` y `e2e`, con TypeScript y ESLint;
  - PostgreSQL 17 con `docker-compose`;
  - `GET /api/health` (sección 4) y la vista técnica de diagnóstico;
  - pruebas unitarias, de componentes, de integración y E2E;
  - GitHub Actions y `CLAUDE.md`.
- **Evidencia de CI (GitHub Actions):**

| Ejecución | Evento | Resultado |
|-----------|--------|-----------|
| [45019867500](https://github.com/GeraGalindo/AI4Devs-finalproject/actions/runs/45019867500) | `pull_request` | Lint, tipos, tests (backend 5/5 y frontend 5/5), integración con PostgreSQL 17 (2/2) y *build*: en verde. E2E omitido por diseño |
| [45019946259](https://github.com/GeraGalindo/AI4Devs-finalproject/actions/runs/45019946259) | `workflow_dispatch` | Las mismas comprobaciones más el *smoke* E2E en Chromium (1/1): en verde |
| [45020562284](https://github.com/GeraGalindo/AI4Devs-finalproject/actions/runs/45020562284) | `push` a `main` tras el merge | Lint, tipos, tests, integración y *build*: en verde |

- **Avisos no bloqueantes:**
  - `actions/checkout@v4` y `actions/setup-node@v4` están pensadas para Node 20, que está obsoleto, y GitHub las ejecuta forzadas en Node 24;
  - hay avisos de obsolescencia (`DEP0040`, `DEP0169`) que vienen de dependencias de terceros.
- **Revisión:** el autor revisó los resultados locales y de CI antes de autorizar el commit, el push y el merge. No hubo revisión formal en GitHub: el campo *review* del PR está vacío.

**Pull Request 2**

Pendiente.

**Pull Request 3**

Pendiente.

