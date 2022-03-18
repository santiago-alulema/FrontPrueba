import { PaymentTypeEnum } from "enums/PaymentTypeEnum";
import { XpropsSuccessResponseDto } from "types/cuaierPay/button";

export type OrderPayment = {
  type: PaymentTypeEnum;
  result?: XpropsSuccessResponseDto;
};
