import {useQuery} from "@tanstack/react-query"
import { getUserProfile } from "../api/user.api"




export const useProfile = (userId) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['profile', userId],
    queryFn: () => getUserProfile(userId),
    enabled: !!userId,
    staleTime: 2 * 60 * 1000,
  })

  return {
    profile: data?.data?.data,  // response.data.data — Profile object
    isLoading,
    isError,
    error,
  }
}