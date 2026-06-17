import { useQuery } from "@tanstack/react-query";
import { fetchAllProducts } from "../api/ecommerce.api";

export const useProductsByCategory = (categoryId) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", "category",categoryId],
    queryFn: () => fetchAllProducts({ category: categoryId }),
    enabled: !!categoryId,
    staleTime: 5 * 60 * 1000,
  });
  return {
    products: data?.data?.data,
    isLoading,
    isError,
  };
};
