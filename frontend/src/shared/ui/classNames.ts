/** Une clases CSS e ignora los valores vacíos. */
export function classNames(...names: (string | false | null | undefined)[]): string {
  return names.filter(Boolean).join(' ');
}

/** Une listas de identificadores (`aria-describedby`), sin vacíos ni duplicados y conservando el orden. */
export function idList(...lists: (string | false | null | undefined)[]): string | undefined {
  const ids = lists.flatMap((list) => (list ? list.split(/\s+/) : [])).filter(Boolean);
  const unique = [...new Set(ids)];
  return unique.length > 0 ? unique.join(' ') : undefined;
}
