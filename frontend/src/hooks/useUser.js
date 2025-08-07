import { useState, useEffect } from 'react';
import api from '../services/api';

export default function useUser(userId) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get(`/users/${userId}`);
        setProfile(res.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userId]);

  return { profile, loading, error };
}
