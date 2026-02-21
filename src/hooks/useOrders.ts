// src/hooks/useOrders.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  OrdersAPI,
  type CreateOrderRequest,
  type Order,
} from "@/lib/api/orders";

export function useOrders() {
  return useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: () => OrdersAPI.getOrders(),
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateOrderRequest) => OrdersAPI.createOrder(data),
    onSuccess: () => {
      // Invalidate orders query to refetch
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      // Invalidate products query to update stock
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      orderId,
      status,
    }: {
      orderId: string;
      status: "pending" | "completed" | "cancelled";
    }) => OrdersAPI.updateOrderStatus(orderId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}
