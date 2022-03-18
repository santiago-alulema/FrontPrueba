import { endpoints } from "constants/endpoints";
import queryString from 'query-string';
import { GetBudgetDto, PostBudgetDto } from "types/dtos";
import { IHttpClientRequestParams } from "types/interfaces";
import { GetBudgetParams, PostBudgetParams } from "types/params/query/api/BudgetParams";
import { httpClient } from "./repository";

export const budgetsRepository = {
  getBudget: async ({
    key,
    dateFrom,
    dateTo,
  }: GetBudgetParams) => {

    const params = {
      dateFrom,
      dateTo,
    }

    const parameters: IHttpClientRequestParams = {
      url: `${endpoints.budget}?${queryString.stringify(params)}`,
      requiresToken: true,
      customToken: key,
    }
    return httpClient.get<GetBudgetDto[]>(parameters);
  },
  getBudgetByType: async ({
    key,
    type,
    dateFrom,
    dateTo,
  }: GetBudgetParams) => {

    const params = {
      type,
      dateFrom,
      dateTo,
    }

    const parameters: IHttpClientRequestParams = {
      url: `${endpoints.budgetByType}?${queryString.stringify(params)}`,
      requiresToken: true,
      customToken: key,
    }
    return httpClient.get<GetBudgetDto[]>(parameters);
  },
  getBudgetByGroup: async ({
    key,
    group,
    dateFrom,
    dateTo,
  }: GetBudgetParams) => {

    const params = {
      group,
      dateFrom,
      dateTo,
    }

    const parameters: IHttpClientRequestParams = {
      url: `${endpoints.budgetByGroup}?${queryString.stringify(params)}`,
      requiresToken: true,
      customToken: key,
    }
    return httpClient.get<GetBudgetDto[]>(parameters);
  },
  sendBudget: async ({ data, key }: PostBudgetParams) => {
    const parameters: IHttpClientRequestParams<PostBudgetDto[]> = {
      url: endpoints.budget,
      requiresToken: true,
      payload: data,
      customToken: key,
    }
    return httpClient.put<PostBudgetDto[], any>(parameters);
  },
}