// src/hooks/useProducts.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ProductsAPI,
  type Product,
  type CreateProductRequest,
} from "@/lib/api/products";

export function useProducts() {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () => ProductsAPI.getProducts(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProductRequest) => ProductsAPI.createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<CreateProductRequest>;
    }) => ProductsAPI.updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => ProductsAPI.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
