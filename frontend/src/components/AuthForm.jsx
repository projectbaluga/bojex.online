import { useState } from 'react';
import { login, register } from '../api';

export default function AuthForm({ onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('login');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!import.meta.env.VITE_API_URL) {
      console.warn('API URL not configured');
      return;
    }
    const fn = mode === 'login' ? login : register;
    const res = await fn(email, password);
    onSuccess?.(res);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border p-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border p-2"
      />
      <div className="space-y-2">
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded w-full">
          {mode === 'login' ? 'Login' : 'Register'}
        </button>
        <button
          type="button"
          onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
          className="text-sm underline w-full"
        >
          {mode === 'login' ? 'Need an account? Register' : 'Have an account? Login'}
        </button>
      </div>
    </form>
  );
}
