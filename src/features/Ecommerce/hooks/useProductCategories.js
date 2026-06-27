import { useQuery } from "@tanstack/react-query";
import { fetchProductCategories } from "../api/ecommerce.api";

export const useProductCategories = () => {
  const { data,isLoading, isError, error } = useQuery({
    queryKey: ["category"],
    queryFn: () => fetchProductCategories(),
    staleTime: 5 * 60 * 1000,
  });
  return {
    categories: data?.data?.results,
    isLoading,
    isError,
    error,
  };
};
