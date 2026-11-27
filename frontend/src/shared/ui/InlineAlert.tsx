import type { ComponentPropsWithRef, ReactNode } from 'react';
import { classNames } from './classNames';
import './InlineAlert.css';

export type InlineAlertTone = 'error' | 'info';

export type InlineAlertProps = Omit<ComponentPropsWithRef<'div'>, 'role' | 'title'> & {
  tone: InlineAlertTone;
  /** Título, ya traducido. */
  title?: string;
  /** Mensaje, ya traducido (por ejemplo, con `translateErrorCode`). */
  children: ReactNode;
};

const ROLE: Record<InlineAlertTone, 'alert' | 'status'> = { error: 'alert', info: 'status' };

/**
 * Aviso dentro de la página (DEV-039). `error` se anuncia de inmediato (`role="alert"`) e `info`
 * de forma educada (`role="status"`). Icono, borde y texto: el color nunca es el único indicador.
 */
export function InlineAlert({ tone, title, children, className, ...props }: InlineAlertProps) {
  return (
    <div {...props} role={ROLE[tone]} className={classNames('cc-alert', `cc-alert--${tone}`, className)}>
      <svg className="cc-alert__icon" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
        {tone === 'error' ? (
          <path d="M10 2 19 18H1Z M10 8v4 M10 14.5v.5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" strokeLinecap="round" />
        ) : (
          <>
            <circle cx="10" cy="10" r="8.25" fill="none" stroke="currentColor" strokeWidth="1.75" />
            <path d="M10 9v5 M10 6v.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          </>
        )}
      </svg>
      <div className="cc-alert__content">
        {title && <p className="cc-alert__title">{title}</p>}
        <div className="cc-alert__message">{children}</div>
      </div>
    </div>
  );
}
