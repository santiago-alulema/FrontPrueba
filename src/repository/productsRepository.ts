import { endpoints } from "constants/endpoints";
import queryString from 'query-string';
import { GetProductDto, PagedDto } from "types/dtos";
import { IHttpClientRequestParams } from "types/interfaces";
import { GetBestSellerProductsParams, GetNewProductsParams, GetOfferProductsParams, GetProductBySlugParams, GetProductParams, GetProductsByCategoryParams } from "types/params/query/api";
import { httpClient } from "./repository";

export const productsRepository = {
  getProductBySlug: async ({
    idOrSlug,
  }: GetProductBySlugParams) => {
    const parameters: IHttpClientRequestParams<GetProductDto> = {
      url: `${endpoints.singleProduct}/${idOrSlug}`,
      requiresToken: false,
    }
    return httpClient.get<GetProductDto>(parameters);
  },
  getProducts: async ({
    page,
    pageSize,
    priceMax,
    priceMin,
    search,
  }: GetProductParams) => {

    const params = {
      page,
      pageSize,
      priceMax,
      priceMin,
      search,
    }

    const parameters: IHttpClientRequestParams<PagedDto<GetProductDto>> = {
      url: `${endpoints.products}?${queryString.stringify(params)}`,
      requiresToken: false,
    }
    return httpClient.get<PagedDto<GetProductDto>>(parameters);
  },
  getBestSellerProducts: async ({
    priceMax,
    priceMin,
    search,
  }: GetBestSellerProductsParams) => {

    const params = {
      priceMax,
      priceMin,
      search,
    }

    const parameters: IHttpClientRequestParams<GetProductDto[]> = {
      url: `${endpoints.bestSellerProducts}?${queryString.stringify(params)}`,
      requiresToken: false,
    }
    return httpClient.get<GetProductDto[]>(parameters);
  },
  getOfferProducts: async ({
    page,
    pageSize,
    priceMax,
    priceMin,
    search,
  }: GetOfferProductsParams) => {

    const params = {
      page,
      pageSize,
      priceMax,
      priceMin,
      search,
    }

    const parameters: IHttpClientRequestParams<PagedDto<GetProductDto>> = {
      url: `${endpoints.offerProducts}?${queryString.stringify(params)}`,
      requiresToken: false,
    }
    return httpClient.get<PagedDto<GetProductDto>>(parameters);
  },
  getNewProducts: async ({
    page,
    pageSize,
    priceMax,
    priceMin,
    search,
  }: GetNewProductsParams) => {

    const params = {
      page,
      pageSize,
      priceMax,
      priceMin,
      search,
    }

    const parameters: IHttpClientRequestParams<PagedDto<GetProductDto>> = {
      url: `${endpoints.newProducts}?${queryString.stringify(params)}`,
      requiresToken: false,
    }
    return httpClient.get<PagedDto<GetProductDto>>(parameters);
  },
  getProductsByCategory: async ({
    page,
    pageSize,
    priceMax,
    priceMin,
    idOrSlug,
  }: GetProductsByCategoryParams) => {

    const qParams = {
      page,
      pageSize,
      priceMax,
      priceMin,
    }

    const parameters: IHttpClientRequestParams<PagedDto<GetProductDto>> = {
      url: `${endpoints.productsByCategory}/${idOrSlug}?${queryString.stringify(qParams)}`,
      requiresToken: false,
    }
    return httpClient.get<PagedDto<GetProductDto>>(parameters);
  },
}