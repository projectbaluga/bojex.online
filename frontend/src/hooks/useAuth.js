import { useState } from 'react';

const API_URL = 'http://localhost:3000';

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
      const data = await res.json();
      if (res.ok && !data.error) {
        setUser(data);
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (err) {
      setError(err.message);
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
      const data = await res.json();
      if (res.ok && !data.error) {
        setUser(data);
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { user, authForm, setAuthForm, loading, error, register, login };
}

