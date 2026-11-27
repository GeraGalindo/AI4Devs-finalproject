import { useId, type ComponentPropsWithRef } from 'react';
import { classNames, idList } from './classNames';
import './TextField.css';

export type TextFieldProps = Omit<ComponentPropsWithRef<'input'>, 'type' | 'children'> & {
  /** Etiqueta visible, ya traducida. Obligatoria. */
  label: string;
  /** Ayuda, ya traducida. */
  hint?: string;
  /** Error, ya traducido. Con error, el campo queda `aria-invalid`. */
  error?: string;
  type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url';
};

/**
 * Campo de texto con etiqueta, ayuda y error asociados (DEV-039). Las props nativas (`ref`,
 * `name`, `autoComplete`, `required`, `value`, `onChange`…) llegan al `<input>`, así que sirve
 * en formularios controlados y no controlados. `aria-describedby` conserva los identificadores
 * de quien lo usa y añade los de la ayuda y el error, sin duplicados.
 *
 * El error no es una alerta (`role="alert"`): el formulario lleva el foco al primer campo con
 * error y anuncia un resumen con `InlineAlert` (decisión L5).
 */
export function TextField({
  label,
  hint,
  error,
  type = 'text',
  id,
  className,
  'aria-describedby': describedBy,
  ...props
}: TextFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;

  return (
    <div className={classNames('cc-field', className)}>
      <label className="cc-field__label" htmlFor={inputId}>
        {label}
      </label>
      {hint && (
        <p className="cc-field__hint" id={hintId}>
          {hint}
        </p>
      )}
      <input
        {...props}
        id={inputId}
        type={type}
        className="cc-field__input"
        aria-invalid={error ? true : undefined}
        aria-describedby={idList(describedBy, hintId, errorId)}
      />
      {error && (
        <p className="cc-field__error" id={errorId}>
          <svg className="cc-field__error-icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
            <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M8 4.5v4.5M8 11v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
