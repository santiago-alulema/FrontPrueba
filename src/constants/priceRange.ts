import { PriceRangeParams } from "types/params/query/api";

export const priceRanges: Partial<PriceRangeParams>[] = [
  {
    priceMax: 1,
  },
  {
    priceMin: 1,
    priceMax: 5,
  },
  {
    priceMin: 5,
    priceMax: 10,
  },
  {
    priceMin: 10,
    priceMax: 20,
  },
  {
    priceMin: 20,
  },
]