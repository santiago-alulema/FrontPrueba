import { ShippingEnum } from 'enums/ShippingEnum';
import { Address } from './Address';

export type Shipping = {
  estimatedDate?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  type: ShippingEnum;
  address?: Address;
};
