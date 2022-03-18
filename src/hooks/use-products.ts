import { endpoints } from 'constants/endpoints';
import queryString from 'query-string';
import { siteInfo } from 'site';
import useSWR from 'swr';
import { GetProductDto, PagedDto } from 'types/dtos';
import { GetNewProductsParams, GetOfferProductsParams, GetProductBySlugParams, GetProductParams, GetProductsByCategoryParams } from 'types/params/query/api';

export type useProductBySlugProps = GetProductBySlugParams & {
  initialData?: GetProductDto | null
}

export function useProductBySlug({ idOrSlug, initialData }: useProductBySlugProps) {
  const { data, mutate, error } = useSWR<GetProductDto | null>(`${siteInfo.API_URL}${endpoints.singleProduct}/${idOrSlug}`, { fallbackData: initialData });

  const loading = data === undefined && !error;

  return {
    loading,
    error,
    data,
    mutate,
  };
}

export type UseProductsProps = GetProductParams & {
  initialData?: PagedDto<GetProductDto> | null;
}

export function useProducts({
  page,
  pageSize,
  priceMax,
  priceMin,
  search,
  subCategoryId,
  initialData,
}: UseProductsProps) {

  const params = {
    page,
    pageSize,
    priceMax,
    priceMin,
    search,
    subCategoryId,
  }

  const { data, mutate, error } = useSWR<PagedDto<GetProductDto> | null>(`${siteInfo.API_URL}${endpoints.products}?${queryString.stringify(params)}`, { fallbackData: initialData });

  const loading = data === undefined && !error;

  return {
    loading,
    error,
    data,
    mutate,
  };
}

export type UseOfferProductsProps = GetOfferProductsParams & {
  initialData?: PagedDto<GetProductDto> | null;
}

export function useOfferProducts({
  page,
  pageSize,
  priceMax,
  priceMin,
  search,
  initialData,
}: UseOfferProductsProps) {

  const params = {
    page,
    pageSize,
    priceMax,
    priceMin,
    search,
  }

  const { data, mutate, error } = useSWR<PagedDto<GetProductDto> | null>(`${siteInfo.API_URL}${endpoints.offerProducts}?${queryString.stringify(params)}`, { fallbackData: initialData });

  const loading = data === undefined && !error;

  return {
    loading,
    error,
    data,
    mutate,
  };
}

export type UseNewProductsProps = GetNewProductsParams & {
  initialData?: PagedDto<GetProductDto> | null;
}

export function useNewProducts({
  page,
  pageSize,
  priceMax,
  priceMin,
  search,
  initialData,
}: UseNewProductsProps) {

  const params = {
    page,
    pageSize,
    priceMax,
    priceMin,
    search,
  }

  const { data, mutate, error } = useSWR<PagedDto<GetProductDto> | null>(`${siteInfo.API_URL}${endpoints.newProducts}?${queryString.stringify(params)}`, { fallbackData: initialData });

  const loading = data === undefined && !error;

  return {
    loading,
    error,
    data,
    mutate,
  };
}

export type UseProductsByCategoryProps = GetProductsByCategoryParams & {
  initialData?: PagedDto<GetProductDto> | null;
}

export function useProductsByCategory({
  page,
  pageSize,
  priceMax,
  priceMin,
  search,
  initialData,
  idOrSlug,
  subCategoryId,
}: UseProductsByCategoryProps) {

  const params = {
    page,
    pageSize,
    priceMax,
    priceMin,
    subCategoryId,
    search,
  }

  const { data, mutate, error } = useSWR<PagedDto<GetProductDto> | null>(`${siteInfo.API_URL}${endpoints.productsByCategory}/${idOrSlug}?${queryString.stringify(params)}`, { fallbackData: initialData });

  const loading = data === undefined && !error;

  return {
    loading,
    error,
    data,
    mutate,
  };
}