import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { vi, it, expect, afterEach } from 'vitest';
import AuthForm from '../AuthForm';
import * as api from '../../api';

vi.mock('../../api');

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

it('logs in with credentials', async () => {
  api.login.mockResolvedValue({ access_token: 'token' });
  const onSuccess = vi.fn();
  render(<AuthForm onSuccess={onSuccess} />);
  fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'a@b.com' } });
  fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'secret' } });
  fireEvent.click(screen.getByRole('button', { name: /login/i }));
  await vi.waitFor(() => expect(api.login).toHaveBeenCalledWith('a@b.com', 'secret'));
  await vi.waitFor(() => expect(onSuccess).toHaveBeenCalled());
});

it('registers a new user', async () => {
  api.register.mockResolvedValue({ id: '1' });
  const onSuccess = vi.fn();
  render(<AuthForm onSuccess={onSuccess} />);
  fireEvent.click(screen.getByRole('button', { name: /need an account/i }));
  fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'a@b.com' } });
  fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'secret' } });
  fireEvent.click(screen.getByRole('button', { name: /register/i }));
  await vi.waitFor(() => expect(api.register).toHaveBeenCalledWith('a@b.com', 'secret'));
  await vi.waitFor(() => expect(onSuccess).toHaveBeenCalled());
});
