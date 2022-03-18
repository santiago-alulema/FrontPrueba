import { endpoints } from "constants/endpoints";
import { PlacedOrderDto } from "types/dtos";
import { CancelOrderDto } from "types/dtos/CancelOrderDto";
import { OrderDto } from "types/dtos/order";
import { OrderResumeDto } from "types/dtos/OrderResumeDto";
import { IHttpClientRequestParams } from "types/interfaces";
import { CancelOrderParams, GetPlacedOrderByIdParams, GetPlacedOrdersParams, PlaceOrderParams } from "types/params/query/api/OrdersParams";
import { httpClient } from "./repository";

export const ordersRepository = {
  cancel: async ({
    id,
    data,
    key,
  }: CancelOrderParams) => {
    const parameters: IHttpClientRequestParams<CancelOrderDto> = {
      url: `${endpoints.cancelOrder}/${id}`,
      requiresToken: true,
      customToken: key,
      payload: data,
    }
    return httpClient.delete(parameters);
  },
  placeOrder: async ({
    data,
    key,
  }: PlaceOrderParams) => {
    const parameters: IHttpClientRequestParams<OrderDto> = {
      url: endpoints.placeOrder,
      requiresToken: true,
      customToken: key,
      payload: data,
    }
    return httpClient.post<OrderDto, PlacedOrderDto>(parameters);
  },
  getPlacedOrders: async ({
    key,
  }: GetPlacedOrdersParams) => {
    const parameters: IHttpClientRequestParams = {
      url: endpoints.placeOrder,
      requiresToken: true,
      customToken: key,
    }
    return httpClient.get<OrderResumeDto[]>(parameters);
  },
  getOrderById: async ({
    key,
    id,
  }: GetPlacedOrderByIdParams) => {
    const parameters: IHttpClientRequestParams = {
      url: `${endpoints.placedOrders}/${id}`,
      requiresToken: true,
      customToken: key,
    }
    return httpClient.get<PlacedOrderDto>(parameters);
  },
}