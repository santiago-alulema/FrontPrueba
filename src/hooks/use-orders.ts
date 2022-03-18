import { endpoints } from 'constants/endpoints';
import { siteInfo } from 'site';
import useSWR from 'swr';
import { OrderResumeDto, PlacedOrderDto } from 'types/dtos';
import { fetcher } from 'utils';

export type UseOrdersProps = {
  key: string;
}

export function useOrders({ key, }: UseOrdersProps) {
  const { data, mutate, error } = useSWR<OrderResumeDto[]>(`${siteInfo.API_URL}${endpoints.placedOrders}`,
    {
      fetcher: (url: string) => fetcher(url, { Authorization: `${siteInfo.API_AUTHORIZATION_PREFIX} ${key}` })
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

export type UseOrderByIdProps = {
  id: number;
  key: string;
}

export function useOrderById({ id, key, }: UseOrderByIdProps) {
  const { data, mutate, error } = useSWR<PlacedOrderDto>(`${siteInfo.API_URL}${endpoints.placedOrders}/${id}`,
    {
      fetcher: (url: string) => fetcher(url, { Authorization: `${siteInfo.API_AUTHORIZATION_PREFIX} ${key}` })
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
