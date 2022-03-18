import { ShippingEnum } from "enums";
import { PaymentTypeEnum } from "enums/PaymentTypeEnum";

export type OrderResumeDto = {
  id: number;
  number: string;
  date: string;
  itemCount: number;
  paymentType: PaymentTypeEnum;
  total: number;
  shippingType: ShippingEnum
}