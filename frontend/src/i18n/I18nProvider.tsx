import type { i18n } from 'i18next';
import type { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { appI18n } from './app-i18n';

/** Proveedor de traducciones. Por defecto usa la instancia de la aplicación. */
export function I18nProvider({ children, instance = appI18n }: { children: ReactNode; instance?: i18n }) {
  return <I18nextProvider i18n={instance}>{children}</I18nextProvider>;
}
