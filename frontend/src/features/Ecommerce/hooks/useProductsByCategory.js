import { useQuery } from "@tanstack/react-query";
import { fetchAllProducts } from "../api/ecommerce.api";

export const useProductsByCategory = (categoryId,page = 1, page_size = 12) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", "category",categoryId,page ],
    queryFn: () => fetchAllProducts({ category: categoryId ,page, page_size:page_size}),
    enabled: !!categoryId,
    staleTime: 5 * 60 * 1000,
  });
  return {
    products: data?.data?.data,
    pagination:data?.data?.pagination,
    isLoading,
    isError,
  };
};   
