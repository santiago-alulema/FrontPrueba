export type StorageConfigType<T, U = T> = {
  key: string,
  version: number,
  migrate: (data: T) => U,
}