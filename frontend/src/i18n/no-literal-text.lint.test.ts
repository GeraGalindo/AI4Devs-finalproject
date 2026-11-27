// @vitest-environment node
/// <reference types="node" />
import { fileURLToPath } from 'node:url';
import { ESLint } from 'eslint';

/**
 * Regla de ESLint contra textos visibles escritos en JSX (DEV-038), comprobada con la
 * configuración real del repositorio (`eslint.config.js`). Los archivos no existen: solo se usa
 * su ruta para aplicar la configuración que les corresponde.
 */
const repoRoot = fileURLToPath(new URL('../../../', import.meta.url));
const eslint = new ESLint({ cwd: repoRoot });
const RULE = 'no-restricted-syntax';

async function literalTextErrors(code: string, file = 'frontend/src/features/fixture/Fixture.tsx'): Promise<number[]> {
  const [result] = await eslint.lintText(code, { filePath: `${repoRoot}${file}` });
  return (result?.messages ?? []).filter((m) => m.ruleId === RULE).map((m) => m.line);
}

const component = (jsx: string) => `export function Fixture({ n }: { n: number }) {\n  return (\n${jsx}\n  );\n}\n`;

describe('no literal text in JSX (ESLint)', () => {
  it.each([
    ['visible JSX text', '<p>Hello</p>'],
    ['a string literal child', "<p>{'Hello'}</p>"],
    ['a template literal child', '<p>{`Week ${n}`}</p>'],
    ['a literal aria-label', '<button aria-label="Close" type="button" />'],
    ['a literal placeholder', '<input placeholder="you@example.com" />'],
    ['a literal title', "<span title={'Info'} />"],
    ['a literal alt', '<img alt="Logo" src="/logo.png" />'],
    ['a template aria-label', '<button aria-label={`Close ${n}`} type="button" />'],
  ])('rejects %s', async (_label, jsx) => {
    expect(await literalTextErrors(component(jsx))).toHaveLength(1);
  });

  it('accepts translated text, expressions and non-visible attributes', async () => {
    const code = `import { useTranslation } from 'react-i18next';
export function Fixture({ n, label }: { n: number; label: string }) {
  const { t } = useTranslation('auth');
  return (
    <div className="card" data-testid="fixture" id={\`item-\${n}\`}>
      {t('signUp.title')} {n}
      {' '}
      {label}
      <input aria-label={t('signUp.title')} placeholder={label} type="email" />
      <img alt="" src="/decorative.png" />
    </div>
  );
}
`;
    expect(await literalTextErrors(code)).toEqual([]);
  });

  it('does not apply to tests or to the DEV-001 diagnostics view', async () => {
    const jsx = component('<p>Hello</p>');
    expect(await literalTextErrors(jsx, 'frontend/src/features/fixture/Fixture.test.tsx')).toEqual([]);
    expect(await literalTextErrors(jsx, 'frontend/src/features/diagnostics/Other.tsx')).toEqual([]);
  });
});
