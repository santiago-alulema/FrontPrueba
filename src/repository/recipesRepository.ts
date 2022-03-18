import { endpoints } from "constants/endpoints";
import { GetRecipeDto } from "types/dtos";
import { IHttpClientRequestParams } from "types/interfaces";
import { httpClient } from "./repository";

export const recipesRepository = {
  getAll: async () => {
    const parameters: IHttpClientRequestParams<GetRecipeDto[]> = {
      url: `${endpoints.recipes}`,
      requiresToken: false,
    }
    return httpClient.get<GetRecipeDto[]>(parameters);
  },
}