import { endpoints } from 'constants/endpoints';
import { siteInfo } from 'site';
import useSWR from 'swr';
import { GetTransferAccountDto } from 'types/dtos';

export type UseTransferAccountsProps = {
  initialData?: GetTransferAccountDto[]
}

export function useTransferAccounts({ initialData }: UseTransferAccountsProps) {
  const { data, mutate, error } = useSWR<GetTransferAccountDto[]>(`${siteInfo.API_URL}${endpoints.transferAccounts}`, { fallbackData: initialData });

  const loading = data === undefined && !error;

  return {
    loading,
    error,
    data,
    mutate,
  };
}
