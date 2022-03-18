import { ShippingEnum } from "enums";
import { FormattedMessage } from "react-intl";

export const shippingNamesIds = {
  [ShippingEnum.PICKUP_IN_PERSON]: "shipping.pickup.banner.title",
  [ShippingEnum.SHIPPING_NORMAL]: "shipping.normal.banner.title",
}

export const shippingNames = {
  [ShippingEnum.PICKUP_IN_PERSON]: (
    <FormattedMessage
      id={shippingNamesIds[ShippingEnum.PICKUP_IN_PERSON]}
      defaultMessage="Retira de nuestro local"
    />
  ),
  [ShippingEnum.SHIPPING_NORMAL]: (
    <FormattedMessage
      id={shippingNamesIds[ShippingEnum.SHIPPING_NORMAL]}
      defaultMessage="Recibir a domicilio"
    />
  ),
}