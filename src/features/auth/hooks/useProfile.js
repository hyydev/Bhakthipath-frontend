import { useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getUserProfile } from "../api/user.api";
import { updateUserProfile } from "../api/user.api";



export const useProfile = (userId) => {

  const queryClient = useQueryClient()
  
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["profile", userId],
    queryFn: () => getUserProfile(),
    enabled: !!userId,
    staleTime: 2 * 60 * 1000,
  });

  const updateProfile = useMutation({
    mutationFn: ({  data }) => updateUserProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", userId] });
      toast.success("Profile updated");
    },
    onError: () => toast.error("Failed to update profile"),
  });

  return {
    profile: data?.data?.data,
    isLoading,
    isError,
    error,
    updateProfile: updateProfile.mutate,
    isUpdating: updateProfile.isPending,
  };
};
