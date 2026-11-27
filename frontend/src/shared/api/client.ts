/**
 * Cliente HTTP de la SPA (DEV-006, parcial), sobre `fetch` nativo. Contrato de readme.md,
 * sección 4:
 * - solo rutas relativas bajo `/api/`, del mismo origen, con `credentials: 'same-origin'` (M3);
 * - `X-CSRF-Protection: 1` en POST, PUT, PATCH y DELETE. `Origin` lo pone el navegador: es una
 *   cabecera prohibida para JavaScript;
 * - `Content-Type: application/json` solo cuando hay cuerpo (`logout` no lleva ninguno);
 * - errores normalizados en `ApiError` (M6). Ni el `message` del servidor ni los de
 *   `details.fields[].message` se guardan: son técnicos. El cliente solo expone el código y los
 *   identificadores de los campos no válidos; los textos visibles salen de los catálogos i18n.
 */
export type ApiErrorKind = 'http' | 'network' | 'invalid-response' | 'aborted';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface ApiErrorInit {
  status?: number;
  code?: string;
  requestId?: string;
  invalidFields?: string[];
  retryAfterSeconds?: number;
}

export class ApiError extends Error {
  override name = 'ApiError';
  readonly kind: ApiErrorKind;
  readonly status: number | undefined;
  readonly code: string | undefined;
  readonly requestId: string | undefined;
  /**
   * Campos del cuerpo no válidos en un `400 VALIDATION_ERROR` (`body.email` → `email`), sin
   * duplicados. Solo los identificadores: el mensaje visible sale del catálogo de la pantalla.
   */
  readonly invalidFields: string[] | undefined;
  readonly retryAfterSeconds: number | undefined;

  constructor(kind: ApiErrorKind, init: ApiErrorInit = {}) {
    // Mensaje solo para desarrollo y pruebas: nunca el del servidor.
    super(`API request failed (${[kind, init.status, init.code].filter((v) => v !== undefined).join(' ')})`);
    this.kind = kind;
    this.status = init.status;
    this.code = init.code;
    this.requestId = init.requestId;
    this.invalidFields = init.invalidFields;
    this.retryAfterSeconds = init.retryAfterSeconds;
  }
}

/** Comprueba la forma de un cuerpo 2xx. Devuelve el valor tipado o lanza un error. */
export type ResponseParser<T> = (body: unknown) => T;

export interface ApiRequestOptions<T> {
  /** Cuerpo JSON. Sin cuerpo no se envía `Content-Type`. */
  body?: unknown;
  signal?: AbortSignal;
  /** Obligatorio si la respuesta tiene cuerpo; sin él, la respuesta debe ser vacía (204). */
  parse?: ResponseParser<T>;
}

const UNSAFE_METHODS = new Set<HttpMethod>(['POST', 'PUT', 'PATCH', 'DELETE']);

/** Solo `/api/...` relativo: nada de `//host`, esquemas, `\` ni segmentos `..`. */
export function isApiPath(path: string): boolean {
  return /^\/api\/[^/\\]/.test(path) && !/[\\]|\/\/|(^|\/)\.\.(\/|$)|^[a-z][a-z0-9+.-]*:/i.test(path);
}

export async function apiRequest<T = undefined>(
  method: HttpMethod,
  path: string,
  { body, signal, parse }: ApiRequestOptions<T> = {},
): Promise<T> {
  if (!isApiPath(path)) throw new TypeError(`Refusing to call a non-API path: ${path}`);

  const headers: Record<string, string> = { Accept: 'application/json' };
  if (UNSAFE_METHODS.has(method)) headers['X-CSRF-Protection'] = '1';
  const hasBody = body !== undefined;
  if (hasBody) headers['Content-Type'] = 'application/json';

  let response: Response;
  try {
    response = await fetch(path, {
      method,
      headers,
      credentials: 'same-origin',
      ...(hasBody ? { body: JSON.stringify(body) } : {}),
      ...(signal ? { signal } : {}),
    });
  } catch (err) {
    if (isAbort(err, signal)) throw new ApiError('aborted');
    throw new ApiError('network');
  }

  let text: string;
  try {
    text = await response.text();
  } catch (err) {
    if (isAbort(err, signal)) throw new ApiError('aborted');
    throw new ApiError('network', { status: response.status });
  }

  const requestId = response.headers.get('X-Request-Id') ?? undefined;
  if (!response.ok) throw httpError(response, text, requestId);

  if (text === '') {
    if (parse) throw new ApiError('invalid-response', { status: response.status, ...(requestId ? { requestId } : {}) });
    return undefined as T;
  }
  if (!parse) throw new ApiError('invalid-response', { status: response.status, ...(requestId ? { requestId } : {}) });

  try {
    if (!isJson(response)) throw new Error('not JSON');
    return parse(JSON.parse(text));
  } catch {
    throw new ApiError('invalid-response', { status: response.status, ...(requestId ? { requestId } : {}) });
  }
}

function isAbort(err: unknown, signal: AbortSignal | undefined): boolean {
  return (err instanceof DOMException && err.name === 'AbortError') || signal?.aborted === true;
}

function isJson(response: Response): boolean {
  return /^application\/(?:[\w.+-]+\+)?json\b/i.test(response.headers.get('Content-Type') ?? '');
}

/** Error con el sobre del contrato → `http`; cualquier otra cosa (HTML de un proxy…) → `invalid-response`. */
function httpError(response: Response, text: string, headerRequestId: string | undefined): ApiError {
  const status = response.status;
  const retryAfterSeconds = parseRetryAfter(response.headers.get('Retry-After'));
  const common = { status, ...(retryAfterSeconds !== undefined ? { retryAfterSeconds } : {}) };

  let envelope: unknown;
  try {
    envelope = isJson(response) ? JSON.parse(text) : undefined;
  } catch {
    envelope = undefined;
  }
  const error = isRecord(envelope) && isRecord(envelope.error) ? envelope.error : undefined;
  if (!error || typeof error.code !== 'string') {
    return new ApiError('invalid-response', { ...common, ...(headerRequestId ? { requestId: headerRequestId } : {}) });
  }

  const requestId = typeof error.requestId === 'string' ? error.requestId : headerRequestId;
  const invalidFields = parseInvalidFields(error.details);
  return new ApiError('http', {
    ...common,
    code: error.code,
    ...(requestId ? { requestId } : {}),
    ...(invalidFields ? { invalidFields } : {}),
  });
}

/** Un campo del cuerpo: `body.<identificador>`. Otras rutas (`body`, `params.id`, `body.a.b`…) se descartan. */
const BODY_FIELD_PATH = /^body\.([A-Za-z][A-Za-z0-9_]*)$/;

/**
 * `details.fields: [{ path: 'body.email', message }]` → `['email']`, en orden y sin duplicados.
 * Solo se lee `path`: `message` es un texto técnico del servidor y nunca se guarda.
 */
function parseInvalidFields(details: unknown): string[] | undefined {
  if (!isRecord(details) || !Array.isArray(details.fields)) return undefined;
  const names = new Set<string>();
  for (const item of details.fields) {
    const path = isRecord(item) ? item.path : undefined;
    const match = typeof path === 'string' ? BODY_FIELD_PATH.exec(path) : null;
    if (match?.[1]) names.add(match[1]);
  }
  return names.size > 0 ? [...names] : undefined;
}

/** `Retry-After` en segundos (lo que envía el backend) o como fecha HTTP. */
function parseRetryAfter(value: string | null): number | undefined {
  if (value === null || value.trim() === '') return undefined;
  if (/^\d+$/.test(value.trim())) return Number(value.trim());
  const date = Date.parse(value);
  return Number.isNaN(date) ? undefined : Math.max(0, Math.ceil((date - Date.now()) / 1000));
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
