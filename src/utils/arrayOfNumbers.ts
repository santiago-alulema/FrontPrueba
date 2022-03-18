export const createArrayFilled = (length: number) => {
  return Array.from({ length }, (_, i) => ++i);
}

export type CreateArrayFilledWithValueProps = {
  length: number,
  value: string,
}

export const createArrayFilledWithValue = ({ length, value }: CreateArrayFilledWithValueProps) => {
  return new Array(length).fill(value);
}