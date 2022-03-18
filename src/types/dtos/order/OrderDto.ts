import { AmountWithBreakDown, Customer, OrderItem, OrderPayment, Shipping } from "."

export type OrderDto = {
  customer: Customer;
  amount: AmountWithBreakDown;
  items: OrderItem[];
  shipping: Shipping;
  payment: OrderPayment;
}