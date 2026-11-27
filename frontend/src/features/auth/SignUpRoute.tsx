import { Navigate } from 'react-router';
import { useSession } from './session';
import { SessionStatus } from './SessionStatus';
import { SignUpPage } from './SignUpPage';

/** `/signup` (DEV-007, parcial): con sesión → `/`; sin sesión, el formulario. */
export function SignUpRoute() {
  const { state } = useSession();
  if (state.status === 'authenticated') return <Navigate to="/" replace />;
  if (state.status === 'unauthenticated') return <SignUpPage />;
  return <SessionStatus />;
}
