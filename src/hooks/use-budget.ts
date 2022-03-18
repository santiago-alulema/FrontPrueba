import { endpoints } from 'constants/endpoints';
import queryString from 'query-string';
import { siteInfo } from 'site';
import useSWR from 'swr';
import { GetBudgetDto } from 'types/dtos';
import { GetBudgetParams } from 'types/params/query/api/BudgetParams';
import { fetcher } from 'utils';

export function useBudget({
  key,
  type,
  group,
  dateFrom,
  dateTo,
}: GetBudgetParams) {

  let endpoint = endpoints.budget;

  if (type) {
    endpoint = endpoints.budgetByType;
  } else if (group) {
    endpoint = endpoints.budgetByGroup;
  }

  const params = {
    type,
    group,
    dateFrom,
    dateTo,
  }

  const { data, mutate, error } = useSWR<GetBudgetDto[]>(`${siteInfo.API_URL}${endpoint}?${queryString.stringify(params)}`,
    {
      fetcher: (url: string) => fetcher(url, { Authorization: `${siteInfo.API_AUTHORIZATION_PREFIX} ${key}` }),
      errorRetryCount: 3,
    }
  );

  const loading = data === undefined && !error;

  return {
    loading,
    error,
    data,
    mutate,
  };
}
