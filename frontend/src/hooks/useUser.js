import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3000';

const getErrorMessage = (data, fallback) => {
  if (data?.message) {
    return Array.isArray(data.message)
      ? data.message.join(', ')
      : data.message;
  }
  if (data?.error) return data.error;
  return fallback;
};

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
          const res = await fetch(`${API_URL}/users/${userId}`);
          const data = await res.json().catch(() => null);
          if (res.ok && data) {
            setProfile(data);
          } else {
            setError(getErrorMessage(data, 'Failed to load profile'));
          }
        } catch (err) {
          setError(`Network error: ${err.message}`);
        } finally {
          setLoading(false);
        }
      };
    fetchProfile();
  }, [userId]);

  return { profile, loading, error };
}

