import { endpoints } from 'constants/endpoints';
import { siteInfo } from 'site';
import useSWR from 'swr';
import { GetBannerDto } from 'types/dtos';

export function useHomeBanner() {
  const { data, mutate, error } = useSWR<GetBannerDto>(
    `${siteInfo.API_URL}${endpoints.homeBanner}`
  );

  const loading = data === undefined && !error;

  return {
    loading,
    error,
    data,
    mutate,
  };
}
