/** Usuario público de la API (readme.md, sección 4, "Autenticación"). */
export interface PublicUser {
  id: string;
  email: string;
  timezone: string;
  /** `null` hasta que el usuario configura sus días (DEV-005). */
  availableWeekdays: number[] | null;
}
