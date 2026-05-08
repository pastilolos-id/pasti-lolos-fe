import { baseApi } from "./baseApi";
import type {
  OrderHistoryDetailSuccessResponse,
  OrdersHistorySuccessResponse,
} from "./types/orders";

export const ordersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getOrdersHistory: build.query<OrdersHistorySuccessResponse, void>({
      query: () => ({
        url: "/orders/history",
      }),
    }),
    getOrderHistoryDetail: build.query<OrderHistoryDetailSuccessResponse, number>({
      query: (id) => ({
        url: `/orders/history/${id}`,
      }),
    }),
  }),
});

export const { useGetOrdersHistoryQuery, useGetOrderHistoryDetailQuery } =
  ordersApi;
