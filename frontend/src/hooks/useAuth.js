import { useState } from 'react';

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

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [authForm, setAuthForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = async () => {
    setLoading(true);
    setError(null);
      try {
        const res = await fetch(`${API_URL}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(authForm),
        });
        const data = await res.json().catch(() => null);
        if (res.ok && data) {
          setUser(data);
        } else {
          setError(
            getErrorMessage(data, 'Registration failed')
          );
        }
      } catch (err) {
        setError(`Network error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

  const login = async () => {
    setLoading(true);
    setError(null);
      try {
        const res = await fetch(`${API_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(authForm),
        });
        const data = await res.json().catch(() => null);
        if (res.ok && data) {
          setUser(data);
        } else {
          setError(getErrorMessage(data, 'Login failed'));
        }
      } catch (err) {
        setError(`Network error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

  return { user, authForm, setAuthForm, loading, error, register, login };
}

