import { OrderDto, OrderItem } from "./order";

export type PlacedOrderItem = OrderItem & {
  url: string;
}

export type PlacedOrderDto = Omit<OrderDto, 'items'> & {
  id: string;
  number: string;
  date: string;
  items: PlacedOrderItem[]
}