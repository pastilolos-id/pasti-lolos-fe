import { baseApi } from "./baseApi";
import type { OrdersHistorySuccessResponse } from "./types/orders";

export const ordersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getOrdersHistory: build.query<OrdersHistorySuccessResponse, void>({
      query: () => ({
        url: "/orders/history",
      }),
    }),
  }),
});

export const { useGetOrdersHistoryQuery } = ordersApi;
