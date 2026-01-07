import { useState } from "react";
import { getUserProfile } from "../../../services/authApi";

export function useUserProfile(userId) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProfile = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const res = await getUserProfile(userId);
      setProfile(res.data.data);
    } finally {
      setLoading(false);
    }
  };

  return { profile, loading, fetchProfile };
}