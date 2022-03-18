import { CategorySlugType } from 'types';

export type GetProductDto = {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  discount: number;
  taxPercent: number;
  images: string[];
  categories: CategorySlugType[];
};
