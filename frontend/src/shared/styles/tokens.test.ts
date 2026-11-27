// @vitest-environment node
/// <reference types="node" />
import { readFileSync } from 'node:fs';

// Se leen los archivos reales: en Vitest, `?raw` no sirve con CSS.
const read = (path: string) => readFileSync(new URL(path, import.meta.url), 'utf8');
const tokensCss = read('./tokens.css');
const globalCss = read('./global.css');
const buttonCss = read('../ui/Button.css');
const cardCss = read('../ui/Card.css');
const alertCss = read('../ui/InlineAlert.css');
const fieldCss = read('../ui/TextField.css');

/**
 * Contraste WCAG 2.1 calculado con los valores reales de tokens.css (DEV-039). Si cambia un
 * valor, esta prueba dice qué combinación deja de cumplir. Umbrales: 4,5:1 para el texto y
 * 3:1 para los bordes de los controles y los indicadores visuales (WCAG 1.4.3 y 1.4.11).
 */
function readTokens(css: string): Map<string, string> {
  return new Map([...css.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map((m) => [m[1] as string, (m[2] as string).trim()]));
}

const tokens = readTokens(tokensCss);

function color(name: string): string {
  const value = tokens.get(`--color-${name}`);
  if (!value || !/^#[0-9a-f]{6}$/i.test(value)) throw new Error(`--color-${name} is not a #rrggbb color: ${value}`);
  return value;
}

function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  }) as [number, number, number];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(foreground: string, background: string): number {
  const [a, b] = [luminance(color(foreground)), luminance(color(background))];
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

const BACKGROUNDS = ['bg', 'surface', 'surface-raised'] as const;
const TEXT = 4.5;
const NON_TEXT = 3;

describe('design tokens', () => {
  it('match the values of docs/design-system.md (2.1)', () => {
    expect(Object.fromEntries([...tokens].filter(([name]) => name.startsWith('--color-')))).toEqual({
      '--color-bg': '#0b0f1a',
      '--color-surface': '#121829',
      '--color-surface-raised': '#1a2236',
      '--color-border': '#2a3350',
      '--color-border-control': '#6b7390',
      '--color-text': '#f3f5fa',
      '--color-text-muted': '#a9b1c7',
      '--color-text-disabled': '#6b7390',
      '--color-accent': '#a78bfa',
      '--color-primary': '#7c3aed',
      '--color-primary-pressed': '#6d28d9',
      '--color-on-primary': '#ffffff',
      '--color-focus': '#c4b5fd',
      '--color-success': '#34d399',
      '--color-warning': '#fbbf24',
      '--color-neutral': '#94a3b8',
      '--color-danger': '#f87171',
    });
    expect(tokens.get('--touch-min')).toBe('44px');
    expect(tokens.get('--focus-ring-width')).toBe('2px');
    expect(tokens.get('--focus-ring-offset')).toBe('2px');
  });

  it('reproduces the contrast ratios documented in 2.1', () => {
    const documented: [string, string, number][] = [
      ['text', 'bg', 17.54],
      ['text-muted', 'surface-raised', 7.39],
      ['border-control', 'surface-raised', 3.38],
      ['danger', 'bg', 6.92],
      ['on-primary', 'primary', 5.7],
      ['on-primary', 'primary-pressed', 7.1],
      ['primary', 'bg', 3.36],
    ];
    for (const [fg, bg, ratio] of documented) expect(Number(contrast(fg, bg).toFixed(2)), `${fg} on ${bg}`).toBe(ratio);
  });

  it.each(BACKGROUNDS)('text, secondary text and error text are readable on %s (≥ 4.5:1)', (background) => {
    for (const foreground of ['text', 'text-muted', 'danger']) {
      expect(contrast(foreground, background), `${foreground} on ${background}`).toBeGreaterThanOrEqual(TEXT);
    }
  });

  it('text on the primary button is readable in both states (≥ 4.5:1)', () => {
    expect(contrast('on-primary', 'primary')).toBeGreaterThanOrEqual(TEXT);
    expect(contrast('on-primary', 'primary-pressed')).toBeGreaterThanOrEqual(TEXT);
  });

  it.each(BACKGROUNDS)('control borders, error borders, the focus ring and alert accents stand out on %s (≥ 3:1)', (background) => {
    for (const foreground of ['border-control', 'danger', 'focus', 'accent']) {
      expect(contrast(foreground, background), `${foreground} on ${background}`).toBeGreaterThanOrEqual(NON_TEXT);
    }
  });

  describe('primary button boundary', () => {
    /** Declaraciones de una regla de Button.css, por su selector exacto. */
    function rule(selector: string): string {
      const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const match = buttonCss.match(new RegExp(`(?:^|\\n)${escaped}\\s*\\{([^}]*)\\}`));
      if (!match) throw new Error(`Button.css has no rule ${selector}`);
      return match[1] as string;
    }

    it('the primary fill alone does not reach 3:1 on surface-raised, which is why the button has a border', () => {
      expect(contrast('primary', 'bg')).toBeGreaterThanOrEqual(NON_TEXT);
      expect(contrast('primary', 'surface')).toBeGreaterThanOrEqual(NON_TEXT);
      expect(contrast('primary', 'surface-raised')).toBeLessThan(NON_TEXT);
    });

    it('Button.css gives the primary variant the border-control border', () => {
      expect(rule('.cc-button')).toMatch(/border:\s*var\(--border-width\)\s+solid\s+transparent;/);
      expect(rule('.cc-button--primary')).toMatch(/border-color:\s*var\(--color-border-control\);/);
      // El estado pulsado solo cambia el fondo: conserva el borde.
      expect(rule(".cc-button--primary:active:not(:disabled, [aria-disabled='true'])")).not.toMatch(/border/);
    });

    it.each(BACKGROUNDS)('the primary border stands out on %s (≥ 3:1), normal and pressed', (background) => {
      // El borde es el mismo en los dos estados; lo que separa el botón de la superficie es el borde.
      expect(contrast('border-control', background)).toBeGreaterThanOrEqual(NON_TEXT);
    });

    it('keeps the text contrast on the normal and pressed fills', () => {
      expect(Number(contrast('on-primary', 'primary').toFixed(2))).toBe(5.7);
      expect(Number(contrast('on-primary', 'primary-pressed').toFixed(2))).toBe(7.1);
    });
  });

  it('documents the disabled state as a WCAG exception (1.4.3 and 1.4.11 exclude inactive components)', () => {
    // text-disabled sobre surface-raised: 3,38:1, por debajo de 4,5 pero distinguible.
    expect(contrast('text-disabled', 'surface-raised')).toBeLessThan(TEXT);
    expect(contrast('text-disabled', 'surface-raised')).toBeGreaterThanOrEqual(NON_TEXT);
  });

  it('every custom property used by the styles is defined', () => {
    const local = new Set(['--cc-alert-color']);
    for (const [file, css] of Object.entries({ globalCss, buttonCss, cardCss, alertCss, fieldCss })) {
      for (const [, name] of css.matchAll(/var\((--[\w-]+)\)/g)) {
        expect(tokens.has(name as string) || local.has(name as string), `${file}: ${name}`).toBe(true);
      }
    }
  });

  it('no stylesheet loads external resources', () => {
    for (const css of [tokensCss, globalCss, buttonCss, cardCss, alertCss, fieldCss]) {
      expect(css).not.toMatch(/@import|url\(/);
    }
  });
});
