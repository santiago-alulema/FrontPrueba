import { TiposIdentificacionEnum } from "enums/TiposIdentificacionEnum";

export type Customer = {
  id?: string;
  identification: string;
  identificationType: TiposIdentificacionEnum;
  firstName: string;
  lastName: string;
  companyName?: string;
  email: string;
  areaCode: string;
  phone: string;
  address: string;
  zipCode: string;
};
