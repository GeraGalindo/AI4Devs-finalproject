import { characters, EMAIL_MAX_LENGTH, emailProblem, normalizeEmail, passwordProblem } from './signUpValidation';

describe('emailProblem (same rules as the backend emailSchema)', () => {
  it('normalizes like the backend: trim and lowercase', () => {
    expect(normalizeEmail('  Ana.Garcia@Example.COM ')).toBe('ana.garcia@example.com');
    expect(emailProblem('  Ana.Garcia@Example.COM ')).toBeUndefined();
  });

  it.each(['ana@example.com', "o'brien+tag@sub.example.co", 'a_b-c@x-y.io', 'x@example.museum', '1@example.com'])('accepts %s', (email) => {
    expect(emailProblem(email)).toBeUndefined();
  });

  it.each(['', '   '])('requires a value (%j)', (email) => {
    expect(emailProblem(email)).toBe('required');
  });

  it.each([
    'plainaddress',
    'ana@',
    '@example.com',
    'ana@example',
    'ana@example.c',
    'ana..garcia@example.com',
    '.ana@example.com',
    'ana.@example.com',
    'ana@-example.com',
    'ana garcia@example.com',
    'ñandú@example.com',
    'ana@exámple.com',
  ])('rejects %s', (email) => {
    expect(emailProblem(email)).toBe('invalid');
  });

  it('accepts 254 characters and rejects 255, counted after trimming', () => {
    const at254 = `${'a'.repeat(EMAIL_MAX_LENGTH - '@example.com'.length)}@example.com`;
    expect(at254).toHaveLength(254);
    expect(emailProblem(`  ${at254}  `)).toBeUndefined();
    expect(emailProblem(`a${at254}`)).toBe('invalid');
  });
});

describe('passwordProblem (12 to 128 code points, not trimmed)', () => {
  it('counts code points, not UTF-16 units', () => {
    expect(characters('😀'.repeat(12))).toBe(12);
    expect('😀'.repeat(12)).toHaveLength(24);
  });

  it.each([
    ['empty', '', 'required'],
    ['11 characters', 'a'.repeat(11), 'tooShort'],
    ['12 characters', 'a'.repeat(12), undefined],
    ['128 characters', 'a'.repeat(128), undefined],
    ['129 characters', 'a'.repeat(129), 'tooLong'],
    ['11 emojis', '😀'.repeat(11), 'tooShort'],
    ['12 emojis', '😀'.repeat(12), undefined],
    ['128 emojis', '😀'.repeat(128), undefined],
    ['129 emojis', '😀'.repeat(129), 'tooLong'],
    ['spaces count and are not trimmed', ' '.repeat(12), undefined],
    ['11 characters plus surrounding spaces', ` ${'a'.repeat(10)} `, undefined],
  ])('%s', (_label, password, problem) => {
    expect(passwordProblem(password)).toBe(problem);
  });
});
