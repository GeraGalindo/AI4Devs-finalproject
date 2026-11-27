import { classNames, idList } from './classNames';

describe('classNames', () => {
  it('joins classes and skips empty values', () => {
    expect(classNames('a', false, undefined, null, '', 'b')).toBe('a b');
  });
});

describe('idList', () => {
  it('joins id lists keeping the order and without duplicates or empty values', () => {
    expect(idList(' a  b ', undefined, 'b', 'c', '', false)).toBe('a b c');
  });

  it('returns undefined when there are no ids', () => {
    expect(idList(undefined, '', '  ')).toBeUndefined();
  });
});
