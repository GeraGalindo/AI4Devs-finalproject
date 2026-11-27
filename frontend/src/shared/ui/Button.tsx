import type { ComponentPropsWithRef, MouseEvent } from 'react';
import { classNames } from './classNames';
import './Button.css';

export type ButtonVariant = 'primary' | 'secondary';

export type ButtonProps = Omit<ComponentPropsWithRef<'button'>, 'type'> & {
  /** Por defecto, `primary`. */
  variant?: ButtonVariant;
  /** Por defecto, `button`: un botón no envía un formulario salvo que se pida `submit`. */
  type?: 'button' | 'submit' | 'reset';
  /**
   * Acción en curso. El botón sigue enfocable (`aria-disabled`), pero no ejecuta `onClick` ni
   * envía el formulario, tampoco con un doble clic o con Enter desde un campo (CT-05). No
   * sustituye al bloqueo de peticiones duplicadas de quien hace la petición.
   */
  loading?: boolean;
};

/** Botón base (DEV-039). El texto llega ya traducido en `children`; no hay textos por defecto. */
export function Button({
  variant = 'primary',
  type = 'button',
  loading = false,
  disabled,
  className,
  onClick,
  children,
  ...props
}: ButtonProps) {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (loading) {
      // También bloquea el envío implícito: Enter en un campo pulsa el botón de envío.
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };

  return (
    <button
      {...props}
      type={type}
      disabled={disabled}
      aria-disabled={loading || undefined}
      aria-busy={loading || undefined}
      className={classNames('cc-button', `cc-button--${variant}`, className)}
      onClick={handleClick}
    >
      {loading && <span className="cc-button__spinner" aria-hidden="true" />}
      <span className="cc-button__label">{children}</span>
    </button>
  );
}
