import { Amount } from "./Amount";

export type Breakdown = {

  /**
   * The subtotal for all items. Must equal the sum of `quantity * unit_amount` for all items in `items`
   */
  itemTotal: Amount;

  /**
   * original shipping value
   */
  shipping: Amount;

  /**
   * discount value applied to shipping
   */
  shippingDiscount: Amount;

  /**
   * tax value applied to shipping
   */
  shippingTax: Amount;

  /**
   * The total tax for all items. Must equal the sum of `quantity * tax` for all items in `items`
   */
  itemTax: Amount;

  /**
   * The discount for all items. Must equal the sum of `quantity * discount` for all items in `items`
   */
  itemDiscount: Amount;
};
