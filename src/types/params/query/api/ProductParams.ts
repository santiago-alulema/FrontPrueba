import { PagedParams, SearchParams } from ".";
import { PriceRangeParams } from "./PriceRangeParams";

export type GetProductBySlugParams = {
  idOrSlug: string;
};

export type GetProductParams = PagedParams & Partial<PriceRangeParams & SearchParams> & {
  subCategoryId?: number | number[];
}

export type GetOfferProductsParams = PagedParams & Partial<PriceRangeParams & SearchParams>;

export type GetBestSellerProductsParams = Partial<PriceRangeParams & SearchParams>;

export type GetNewProductsParams = PagedParams & Partial<PriceRangeParams & SearchParams>;

export type GetProductsByCategoryParams = PagedParams & Partial<PriceRangeParams & SearchParams> & {
  idOrSlug: string;
  subCategoryId?: number | number[];
};
