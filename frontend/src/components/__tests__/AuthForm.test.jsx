import { render, screen, fireEvent } from '@testing-library/react';
import { vi, it, expect } from 'vitest';
import AuthForm from '../AuthForm';
import * as api from '../../api';

vi.mock('../../api');

it('submits credentials', async () => {
  api.login.mockResolvedValue({ access_token: 'token' });
  const onSuccess = vi.fn();
  render(<AuthForm onSuccess={onSuccess} />);
  fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'a@b.com' } });
  fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'secret' } });
  fireEvent.click(screen.getByText(/login/i));
  await vi.waitFor(() => expect(api.login).toHaveBeenCalledWith('a@b.com', 'secret'));
  await vi.waitFor(() => expect(onSuccess).toHaveBeenCalled());
});
