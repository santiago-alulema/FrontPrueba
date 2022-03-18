import { endpoints } from "constants/endpoints";
import { GetTransferAccountDto } from "types/dtos";
import { IHttpClientRequestParams } from "types/interfaces";
import { httpClient } from "./repository";

export const transferAccountsRepository = {
  getAll: async () => {
    const parameters: IHttpClientRequestParams<GetTransferAccountDto[]> = {
      url: `${endpoints.transferAccounts}`,
      requiresToken: false,
    }
    return httpClient.get<GetTransferAccountDto[]>(parameters);
  },
}