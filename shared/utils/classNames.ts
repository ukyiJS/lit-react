type ClassName = boolean | number | string;
type ClassNameObject = Record<string, ClassName>;
type ClassNameArray = (ClassName | ClassNameObject)[];

export const classNames = (...args: (ClassName | ClassNameArray | ClassNameObject)[]): string => {
  const result = args.reduce((acc, arg) => {
    if (!arg) return acc;

    if (typeof arg === 'string' || typeof arg === 'number') return `${acc} ${arg}`;
    if (Array.isArray(arg)) return `${acc} ${classNames(...arg)}`;
    if (typeof arg === 'object') return `${acc} ${Object.keys(arg).filter(key => arg[key]).join(' ')}`;

    return acc;
  }, '') as string;

  return result.trim();
};
