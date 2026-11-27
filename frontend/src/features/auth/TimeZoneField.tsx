import { useId, type Ref } from 'react';
import { useTranslation } from 'react-i18next';
import { TextField } from '../../shared/ui/TextField';
import { classNames, idList } from '../../shared/ui/classNames';
import './TimeZoneField.css';

export interface TimeZoneFieldProps {
  value: string;
  onChange(value: string): void;
  /** Opciones de `listTimeZones()`; sin ellas, la zona se escribe a mano. */
  options: string[] | undefined;
  /** Error ya traducido. */
  error?: string;
  ref?: Ref<HTMLSelectElement | HTMLInputElement>;
}

/**
 * Selección manual de la zona horaria (DEV-007, parcial; T6), solo cuando el navegador no da
 * una zona válida. Un `<select>` nativo, sin zona elegida de antemano; si el navegador no tiene
 * `Intl.supportedValuesOf`, un campo de texto. Las zonas IANA no se traducen.
 */
export function TimeZoneField({ value, onChange, options, error, ref }: TimeZoneFieldProps) {
  const { t } = useTranslation('auth');
  const id = useId();

  if (!options) {
    return (
      <TextField
        ref={ref as Ref<HTMLInputElement>}
        label={t('signUp.timezone.label')}
        hint={t('signUp.timezone.manualHint')}
        error={error}
        name="timezone"
        autoComplete="off"
        spellCheck={false}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    );
  }

  const hintId = `${id}-hint`;
  const errorId = error ? `${id}-error` : undefined;
  return (
    <div className="cc-field">
      <label className="cc-field__label" htmlFor={id}>
        {t('signUp.timezone.label')}
      </label>
      <p className="cc-field__hint" id={hintId}>
        {t('signUp.timezone.hint')}
      </p>
      <select
        ref={ref as Ref<HTMLSelectElement>}
        id={id}
        name="timezone"
        className={classNames('cc-select')}
        value={value}
        aria-invalid={error ? true : undefined}
        aria-describedby={idList(hintId, errorId)}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="" disabled>
          {t('signUp.timezone.placeholder')}
        </option>
        {options.map((zone) => (
          <option key={zone} value={zone}>
            {zone}
          </option>
        ))}
      </select>
      {error && (
        <p className="cc-field__error" id={errorId}>
          {error}
        </p>
      )}
    </div>
  );
}
