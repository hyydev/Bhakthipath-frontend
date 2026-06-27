import { useQuery } from "@tanstack/react-query";
import { fetchProductDetail } from "../api/ecommerce.api";

export const useProductDetail = (id) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductDetail(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
  return {
    product:data?.data?.data,
    isLoading,
    isError,
    error
  }
};
