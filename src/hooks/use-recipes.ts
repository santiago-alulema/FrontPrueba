import { endpoints } from 'constants/endpoints';
import { siteInfo } from 'site';
import useSWR from 'swr';
import { GetRecipeDto } from 'types/dtos';

export type UseRecipesProps = {
  initialData?: GetRecipeDto[]
}

export function useRecipes({ initialData }: UseRecipesProps) {
  const { data, mutate, error } = useSWR<GetRecipeDto[]>(`${siteInfo.API_URL}${endpoints.recipes}`, { fallbackData: initialData });

  const loading = data === undefined && !error;

  return {
    loading,
    error,
    data,
    mutate,
  };
}
