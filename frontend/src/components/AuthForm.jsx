import { useState } from 'react';
import { login } from '../api';

export default function AuthForm({ onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(email, password);
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
      <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
        Login
      </button>
    </form>
  );
}
