import { useState, useCallback } from "react";
import {
  getUserAddresses,
  addUserAddress,
  updateUserAddress,
  deleteUserAddress,
  setDefaultAddress,
} from "../../../services/authApi";

export function useUserAddresses() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAddresses = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getUserAddresses();
      setAddresses(res.data.data);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAddAddress = async (data) => {
    await addUserAddress(data);
    fetchAddresses();
  };

  const handleUpdateAddress = async (id, data) => {
    await updateUserAddress(id, data);
    fetchAddresses();
  };

  const handleDeleteAddress = async (id) => {
    await deleteUserAddress(id);
    fetchAddresses();
  };

  const handleSetDefault = async (id) => {
    await setDefaultAddress(id);
    fetchAddresses();
  };

  return {
    addresses,
    loading,
    fetchAddresses,
    handleAddAddress,
    handleUpdateAddress,
    handleDeleteAddress,
    handleSetDefault,
  };
}