import { endpoints } from 'constants/endpoints';
import { siteInfo } from 'site';
import useSWR from 'swr';
import {
  CompanyContactInfoDto,
  CompanyInfoDto,
  CompanySocialNetworksDto,
} from 'types/dtos';

export type UseCompanyAboutUsProps = {
  initialData?: CompanyInfoDto | null;
};

export function useCompanyAboutUs({ initialData }: UseCompanyAboutUsProps) {
  const { data, mutate, error } = useSWR<CompanyInfoDto | null>(
    `${siteInfo.API_URL}${endpoints.companyAboutUs}`,
    { fallbackData: initialData }
  );

  const loading = data === undefined && !error;

  return {
    loading,
    error,
    data,
    mutate,
  };
}

export type UseCompanyFaqsProps = {
  initialData?: CompanyInfoDto | null;
};

export function useCompanyFaqs({ initialData }: UseCompanyFaqsProps) {
  const { data, mutate, error } = useSWR<CompanyInfoDto | null>(
    `${siteInfo.API_URL}${endpoints.companyFaqs}`,
    { fallbackData: initialData }
  );

  const loading = data === undefined && !error;

  return {
    loading,
    error,
    data,
    mutate,
  };
}

export type UseCompanyDevolutionsProps = {
  initialData?: CompanyInfoDto | null;
};

export function useCompanyDevolutions({
  initialData,
}: UseCompanyDevolutionsProps) {
  const { data, mutate, error } = useSWR<CompanyInfoDto | null>(
    `${siteInfo.API_URL}${endpoints.companyDevolutions}`,
    { fallbackData: initialData }
  );

  const loading = data === undefined && !error;

  return {
    loading,
    error,
    data,
    mutate,
  };
}

export type UseCompanyPrivacyPolicyProps = {
  initialData?: CompanyInfoDto | null;
};

export function useCompanyPrivacyPolicy({
  initialData,
}: UseCompanyPrivacyPolicyProps) {
  const { data, mutate, error } = useSWR<CompanyInfoDto | null>(
    `${siteInfo.API_URL}${endpoints.companyPrivacyPolices}`,
    { fallbackData: initialData }
  );

  const loading = data === undefined && !error;

  return {
    loading,
    error,
    data,
    mutate,
  };
}

export type UseCompanyTermsConditionsProps = {
  initialData?: CompanyInfoDto | null;
};

export function useCompanyTermsConditions({
  initialData,
}: UseCompanyTermsConditionsProps) {
  const { data, mutate, error } = useSWR<CompanyInfoDto | null>(
    `${siteInfo.API_URL}${endpoints.companyTermsConditions}`,
    { fallbackData: initialData }
  );

  const loading = data === undefined && !error;

  return {
    loading,
    error,
    data,
    mutate,
  };
}

export type UseCompanySocialNetworksProps = {
  initialData?: CompanySocialNetworksDto | null;
};

export function useCompanySocialNetworks({
  initialData,
}: UseCompanySocialNetworksProps) {
  const { data, mutate, error } = useSWR<CompanySocialNetworksDto | null>(
    `${siteInfo.API_URL}${endpoints.socialNetworks}`,
    { fallbackData: initialData }
  );

  const loading = data === undefined && !error;

  return {
    loading,
    error,
    data,
    mutate,
  };
}

export type UseCompanyContactInfoProps = {
  initialData?: CompanyContactInfoDto | null;
};

export function useCompanyContactInfo({
  initialData,
}: UseCompanyContactInfoProps) {
  const { data, mutate, error } = useSWR<CompanyContactInfoDto | null>(
    `${siteInfo.API_URL}${endpoints.companyContact}`,
    { fallbackData: initialData }
  );

  const loading = data === undefined && !error;

  return {
    loading,
    error,
    data,
    mutate,
  };
}
