import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  getUserAddresses,
  addUserAddress,
  updateUserAddress,
  deleteUserAddress,
  setDefaultAddress,
} from "../api/user.api";

export const useAddresses = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["addresses"],
    queryFn: getUserAddresses,
    staleTime: 2 * 60 * 1000,
  });

  const addMutation = useMutation({
    mutationFn: addUserAddress,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      toast.success("Address added");
    },

    onError: () => toast.error("Failed to add address"),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateUserAddress(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      toast.success("Address updated");
    },

    onError: () => toast.error("Failed to update address"),
  });

  const deleteMutation = useMutation({
    mutationFn: ({ id }) => deleteUserAddress(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      toast.success("Address deleted");
    },

    onError: () => toast.error("Failed to delete address"),
  });

  const setDefaultMutation = useMutation({
    mutationFn: ({ id }) => setDefaultAddress(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      toast.success("Address set to default");
    },

    onError: () => toast.error("Failed to set it default address"),
  });

  return {
    addresses: data?.data?.data,
    isLoading,
    isError,
    addAddress: addMutation.mutate,
    updateAddress: updateMutation.mutate,
    deleteAddress: deleteMutation.mutate,
    setDefaultAddress: setDefaultMutation.mutate,
  };
};
