import '@testing-library/jest-dom/vitest';
import { startMissingKeyDetection, stopMissingKeyDetection } from './missing-keys';

// Una clave de traducción inexistente hace fallar la prueba que la usó (DEV-038).
beforeEach(() => {
  startMissingKeyDetection();
});

afterEach(() => {
  stopMissingKeyDetection();
});
