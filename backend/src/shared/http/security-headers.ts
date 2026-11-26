import helmet from 'helmet';
import type { RequestHandler } from 'express';
import { isRelaxedEnv, type NodeEnv } from '../config.js';

/**
 * `helmet` con una CSP estricta (D8): `default-src 'self'` y sin `'unsafe-inline'`, tampoco
 * en estilos. HSTS y `upgrade-insecure-requests` solo fuera de development/test, porque en
 * local se sirve por http://localhost. `trust proxy` queda para DEV-036 (D11).
 */
export function securityHeaders(nodeEnv: NodeEnv): RequestHandler {
  const relaxed = isRelaxedEnv(nodeEnv);
  return helmet({
    contentSecurityPolicy: {
      useDefaults: false,
      directives: {
        defaultSrc: ["'self'"],
        baseUri: ["'self'"],
        connectSrc: ["'self'"],
        fontSrc: ["'self'"],
        formAction: ["'self'"],
        frameAncestors: ["'none'"],
        imgSrc: ["'self'", 'data:'],
        objectSrc: ["'none'"],
        scriptSrc: ["'self'"],
        scriptSrcAttr: ["'none'"],
        styleSrc: ["'self'"],
        ...(relaxed ? {} : { upgradeInsecureRequests: [] }),
      },
    },
    strictTransportSecurity: relaxed ? false : { maxAge: 31_536_000, includeSubDomains: true },
  });
}
