import { vi, beforeEach, it, expect } from 'vitest';
import { getPosts } from './api';

beforeEach(() => {
  global.fetch = vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve([]) });
});

it('calls posts endpoint', async () => {
  await getPosts();
  expect(fetch).toHaveBeenCalledWith(`${import.meta.env.VITE_API_URL}/posts`);
});
