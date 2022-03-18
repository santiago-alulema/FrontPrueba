import { endpoints } from 'constants/endpoints';
import { siteInfo } from 'site';
import useSWR from 'swr';
import { GetSubcategoriesDto } from 'types/dtos';

export type UseSubcategoriesProps = {
  idOrSlug: string;
  initialData?: GetSubcategoriesDto[]
}

export function useSubcategories({ idOrSlug, initialData }: UseSubcategoriesProps) {
  const { data, mutate, error } = useSWR<GetSubcategoriesDto[]>(`${siteInfo.API_URL}${endpoints.subcategories}/${idOrSlug}`, { fallbackData: initialData });

  const loading = data === undefined && !error;

  return {
    loading,
    error,
    data,
    mutate,
  };
}

export type UseAllSubcategoriesProps = {
  initialData?: GetSubcategoriesDto[]
}

export function useAllSubcategories({ initialData }: UseAllSubcategoriesProps) {
  const { data, mutate, error } = useSWR<GetSubcategoriesDto[]>(`${siteInfo.API_URL}${endpoints.subcategories}`, { fallbackData: initialData });

  const loading = data === undefined && !error;

  return {
    loading,
    error,
    data,
    mutate,
  };
}
