export const parseQueryToNumber = (value: string | string[]): number[] => {
  if (value) {
    if (typeof value === 'string') {
      return [Number(value)];
    }
    return value.map(v => Number(v));
  }
  return [];
};