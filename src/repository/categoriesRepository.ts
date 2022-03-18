import { endpoints } from "constants/endpoints";
import { GetSubcategoriesDto } from "types/dtos";
import { IHttpClientRequestParams } from "types/interfaces";
import { GetSubcategoriesParams } from "types/params/query/api";
import { httpClient } from "./repository";

export const categoriesRepository = {
  getAllSubcategories: async () => {
    const parameters: IHttpClientRequestParams<GetSubcategoriesDto[]> = {
      url: endpoints.subcategories,
      requiresToken: false,
    }
    return httpClient.get<GetSubcategoriesDto[]>(parameters);
  },
  getSubcategories: async ({
    idOrSlug,
  }: GetSubcategoriesParams) => {
    const parameters: IHttpClientRequestParams<GetSubcategoriesDto[]> = {
      url: `${endpoints.subcategories}/${idOrSlug}`,
      requiresToken: false,
    }
    return httpClient.get<GetSubcategoriesDto[]>(parameters);
  },
}