import { endpoints } from "constants/endpoints";
import { ContactDto } from "types/dtos/ContactDto";
import { IHttpClientRequestParams } from "types/interfaces";
import { SendContactParams } from "types/params/query/api/contactParams";
import { httpClient } from "./repository";

export const contactRepository = {
  sendContact: async ({ data }: SendContactParams) => {
    const parameters: IHttpClientRequestParams<ContactDto> = {
      url: endpoints.contact,
      requiresToken: false,
      payload: data,
    }
    return httpClient.post<ContactDto, any>(parameters);
  },
}