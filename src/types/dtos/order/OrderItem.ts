import { AmountWithPercent } from "./AmountWithPercent";

export type OrderItem = {

  /**
   * 
   */
  id: number;

  /**
   * 
   */
  name: string;

  /**
   * Original price per unit
   */
  unitAmount: number;

  /**
   * discount value per unit
   */
  discount: AmountWithPercent;

  /**
   * tax value per unit
   */
  tax: AmountWithPercent;

  /**
   * 
   */
  quantity: number;
};
