import { useQuery } from "@tanstack/react-query";
import { fetchAllProducts } from "../api/ecommerce.api";

export const useProducts = (params = {}) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products", params],
    queryFn: () => fetchAllProducts(params),
    staleTime: 5 * 60 * 1000,
  });
  return {
    products: data?.data?.data,
    isLoading,
    isError,
    error,
  };
};
