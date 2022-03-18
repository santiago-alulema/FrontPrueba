import { CancelOrderDto } from "types/dtos/CancelOrderDto";
import { OrderDto } from "types/dtos/order";
import { SecurityParams } from "types/params";

export type CancelOrderParams = SecurityParams & {
  id: number;
  data: CancelOrderDto;
};

export type PlaceOrderParams = SecurityParams & {
  data: OrderDto;
};

export type GetPlacedOrdersParams = SecurityParams & {
};

export type GetPlacedOrderByIdParams = SecurityParams & {
  id: string;
};