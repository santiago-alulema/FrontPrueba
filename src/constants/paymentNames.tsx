import { PaymentTypeEnum } from "enums/PaymentTypeEnum";
import { FormattedMessage } from "react-intl";

export const paymentNames = {
  [PaymentTypeEnum.CARD]: (
    <FormattedMessage
      id="paymentWay.card.text"
      defaultMessage="Tarjeta de crédito"
    />
  ),
  [PaymentTypeEnum.TRANSFER]: (
    <FormattedMessage
      id="paymentWay.transfer.text"
      defaultMessage="Transferencia bancaria"
    />
  ),
  [PaymentTypeEnum.CASH]: (
    <FormattedMessage
      id="paymentWay.cash.text"
      defaultMessage="Pago en efectivo"
    />
  ),
}