import { endpoints } from "constants/endpoints";
import { CompanyInfoDto } from "types/dtos";
import { IHttpClientRequestParams } from "types/interfaces";
import { httpClient } from "./repository";

export const companyRepository = {
  getAboutUs: async () => {
    const parameters: IHttpClientRequestParams = {
      url: endpoints.companyAboutUs,
      requiresToken: false,
    }
    return httpClient.get<CompanyInfoDto>(parameters);
  },
  getFaqs: async () => {
    const parameters: IHttpClientRequestParams = {
      url: endpoints.companyFaqs,
      requiresToken: false,
    }
    return httpClient.get<CompanyInfoDto>(parameters);
  },
  getDevolutions: async () => {
    const parameters: IHttpClientRequestParams = {
      url: endpoints.companyDevolutions,
      requiresToken: false,
    }
    return httpClient.get<CompanyInfoDto>(parameters);
  },
  getPrivacyPolices: async () => {
    const parameters: IHttpClientRequestParams = {
      url: endpoints.companyPrivacyPolices,
      requiresToken: false,
    }
    return httpClient.get<CompanyInfoDto>(parameters);
  },
  getTermsConditions: async () => {
    const parameters: IHttpClientRequestParams = {
      url: endpoints.companyTermsConditions,
      requiresToken: false,
    }
    return httpClient.get<CompanyInfoDto>(parameters);
  },
}