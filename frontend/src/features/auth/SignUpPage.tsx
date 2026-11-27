import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { translateErrorCode } from '../../i18n/errors';
import { ApiError } from '../../shared/api/client';
import { Button } from '../../shared/ui/Button';
import { Card } from '../../shared/ui/Card';
import { InlineAlert } from '../../shared/ui/InlineAlert';
import { TextField } from '../../shared/ui/TextField';
import { getMe, register } from './api';
import { useSession } from './session';
import { emailProblem, passwordProblem } from './signUpValidation';
import { TimeZoneField } from './TimeZoneField';
import { detectTimeZone, isIanaTimeZone, listTimeZones } from './timeZones';
import './AuthPage.css';

type Field = 'email' | 'password' | 'timezone';
type FieldErrors = Partial<Record<Field, string>>;
type FormError =
  | { kind: 'fields' }
  | { kind: 'text'; message: string }
  | { kind: 'uncertain' };

const FIELD_ORDER: Field[] = ['email', 'password', 'timezone'];

/**
 * S-01, registro (DEV-007, parcial; HU-04). Los textos salen de `auth.json` y los errores de la
 * API de `translateErrorCode`: nunca se muestra `error.message` ni `details.fields[].message`.
 * Un envío en curso bloquea cualquier otro (doble clic, Enter repetido) y, tras un fallo de red,
 * se comprueba la sesión con `GET /api/auth/me` en lugar de repetir el registro.
 */
export function SignUpPage() {
  const { t, i18n } = useTranslation(['auth', 'errors']);
  const { signedIn } = useSession();
  const navigate = useNavigate();

  const detected = useMemo(() => detectTimeZone(), []);
  const options = useMemo(() => listTimeZones(), []);
  const [manualTimeZone, setManualTimeZone] = useState(detected === undefined);
  const [timezone, setTimezone] = useState(detected ?? '');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<FormError | undefined>();
  const [busy, setBusy] = useState(false);

  const inFlight = useRef(false);
  const controller = useRef<AbortController | null>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const timezoneRef = useRef<HTMLSelectElement | HTMLInputElement>(null);
  /** Campo que debe recibir el foco tras mostrar errores; se aplica después de renderizar. */
  const [focusTarget, setFocusTarget] = useState<{ field: Field } | undefined>();

  useEffect(() => () => controller.current?.abort(), []);
  useEffect(() => {
    if (!focusTarget) return;
    const target = { email: emailRef, password: passwordRef, timezone: timezoneRef }[focusTarget.field];
    target.current?.focus();
  }, [focusTarget]);

  function localErrors(): FieldErrors {
    const errors: FieldErrors = {};
    const emailIssue = emailProblem(email);
    if (emailIssue) errors.email = t(`auth:signUp.email.${emailIssue}`);
    const passwordIssue = passwordProblem(password);
    if (passwordIssue) errors.password = t(`auth:signUp.password.${passwordIssue}`);
    if (timezone === '') errors.timezone = t('auth:signUp.timezone.required');
    else if (!isIanaTimeZone(timezone)) errors.timezone = t('auth:signUp.timezone.invalid');
    return errors;
  }

  function showFieldErrors(errors: FieldErrors) {
    setFieldErrors(errors);
    setFormError({ kind: 'fields' });
    if (errors.timezone) setManualTimeZone(true);
    const first = FIELD_ORDER.find((field) => errors[field]);
    if (first) setFocusTarget({ field: first });
  }

  function complete(user: Parameters<typeof signedIn>[0]) {
    signedIn(user);
    navigate('/', { replace: true });
  }

  async function run(task: (signal: AbortSignal) => Promise<void>) {
    if (inFlight.current) return;
    inFlight.current = true;
    setBusy(true);
    const current = new AbortController();
    controller.current = current;
    try {
      await task(current.signal);
    } finally {
      if (!current.signal.aborted) {
        inFlight.current = false;
        setBusy(false);
      }
    }
  }

  /** Tras un fallo de red o una respuesta no válida: ¿se creó la cuenta? Nunca repite el registro. */
  async function checkSession(signal: AbortSignal) {
    try {
      complete(await getMe(signal));
    } catch (err) {
      if (signal.aborted) return;
      if (err instanceof ApiError && err.kind === 'http' && err.status === 401 && err.code === 'UNAUTHENTICATED') {
        setFormError({ kind: 'text', message: t('auth:signUp.notCreated') });
      } else {
        setFormError({ kind: 'uncertain' });
      }
    }
  }

  function apiErrorFor(err: ApiError): void {
    if (err.code === 'VALIDATION_ERROR' && err.invalidFields?.length) {
      const errors: FieldErrors = {};
      for (const field of err.invalidFields) {
        if (field === 'email') errors.email = t('auth:signUp.email.invalid');
        if (field === 'password') errors.password = t(`auth:signUp.password.${passwordProblem(password) ?? 'tooShort'}`);
        if (field === 'timezone') errors.timezone = t('auth:signUp.timezone.invalid');
      }
      if (Object.keys(errors).length > 0) return showFieldErrors(errors);
    }
    if (err.code === 'EMAIL_ALREADY_REGISTERED') {
      return showFieldErrors({ email: translateErrorCode(i18n, err.code) });
    }
    if (err.code === 'RATE_LIMITED' && err.retryAfterSeconds !== undefined) {
      const count = Math.max(1, Math.ceil(err.retryAfterSeconds / 60));
      return setFormError({ kind: 'text', message: t('auth:signUp.rateLimited', { count }) });
    }
    setFormError({ kind: 'text', message: translateErrorCode(i18n, err.code) });
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    const errors = localErrors();
    if (Object.keys(errors).length > 0) return showFieldErrors(errors);

    setFieldErrors({});
    setFormError(undefined);
    void run(async (signal) => {
      try {
        complete(await register({ email, password, timezone }, signal));
      } catch (err) {
        if (signal.aborted) return;
        const error = err instanceof ApiError ? err : new ApiError('invalid-response');
        if (error.kind === 'aborted') return;
        if (error.kind === 'network' || error.kind === 'invalid-response') return checkSession(signal);
        apiErrorFor(error);
      }
    });
  }

  function onCheckAgain() {
    void run(async (signal) => {
      setFormError(undefined);
      await checkSession(signal);
    });
  }

  return (
    <main className="cc-auth-page">
      <Card className="cc-auth-page__card">
        <h1 className="cc-auth-page__title">{t('auth:signUp.title')}</h1>
        <p className="cc-auth-page__intro">{t('auth:signUp.intro')}</p>
        <form className="cc-auth-form" noValidate onSubmit={onSubmit}>
          {formError && (
            <InlineAlert tone="error">
              {formError.kind === 'fields' && t('auth:signUp.errorSummary')}
              {formError.kind === 'text' && formError.message}
              {formError.kind === 'uncertain' && (
                <>
                  <p>{t('auth:signUp.uncertain')}</p>
                  <Button variant="secondary" loading={busy} onClick={onCheckAgain}>
                    {t('auth:signUp.checkAgain')}
                  </Button>
                </>
              )}
            </InlineAlert>
          )}
          <TextField
            ref={emailRef}
            label={t('auth:signUp.email.label')}
            error={fieldErrors.email}
            type="email"
            name="email"
            autoComplete="email"
            inputMode="email"
            autoCapitalize="none"
            spellCheck={false}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            ref={passwordRef}
            label={t('auth:signUp.password.label')}
            hint={t('auth:signUp.password.hint')}
            error={fieldErrors.password}
            type="password"
            name="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {manualTimeZone ? (
            <TimeZoneField
              ref={timezoneRef}
              value={timezone}
              onChange={setTimezone}
              options={options}
              error={fieldErrors.timezone}
            />
          ) : (
            <p className="cc-auth-form__detected">{t('auth:signUp.timezone.detected', { timezone })}</p>
          )}
          <Button type="submit" className="cc-auth-form__submit" loading={busy}>
            {t('auth:signUp.submit')}
          </Button>
        </form>
      </Card>
    </main>
  );
}
