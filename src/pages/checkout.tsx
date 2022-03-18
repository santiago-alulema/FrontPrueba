import { SEO } from "components";
import { useCart } from "context/cart";
import CheckoutContent from "features/checkout-content/checkout-content";
import ShippingWays from "features/shipping-ways/shipping-ways";
import React, { Fragment } from "react";

export default function CheckoutPage() {
  const { shipping } = useCart();
  return (
    <Fragment>
      <SEO title="Finalizar la compra" description="" />
      {
        shipping ?
          <CheckoutContent />
          :
          <ShippingWays />
      }
    </Fragment>
  )
}
