import { endpoints } from 'constants/endpoints';
import { PostVerifyStockDto } from 'types/dtos/PostVerifyStockDto';
import { VerifyStockResultDto } from 'types/dtos/VerifyStockResultDto';
import { IHttpClientRequestParams } from 'types/interfaces';
import { PostVerifyStockParams } from 'types/params/query/api';
import { httpClient } from './repository';

export const stockRepository = {
  verifyStock: async ({ data }: PostVerifyStockParams) => {
    const parameters: IHttpClientRequestParams<PostVerifyStockDto[]> = {
      url: endpoints.verifyStock,
      requiresToken: false,
      payload: data,
    };
    return httpClient.post<PostVerifyStockDto[], VerifyStockResultDto[]>(
      parameters
    );
  },
};
