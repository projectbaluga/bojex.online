import { vi, beforeEach, it, expect } from 'vitest';
import { getPosts, likePost, unlikePost, getComments, addComment } from './api';

beforeEach(() => {
  global.fetch = vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve([]) });
});

it('calls posts endpoint', async () => {
  await getPosts();
  expect(fetch).toHaveBeenCalledWith(`${import.meta.env.VITE_API_URL}/posts`);
});

it('likes a post', async () => {
  await likePost('1', 'token');
  expect(fetch).toHaveBeenCalledWith(
    `${import.meta.env.VITE_API_URL}/posts/1/like`,
    { method: 'POST', headers: { Authorization: 'Bearer token' } },
  );
});

it('unlikes a post', async () => {
  await unlikePost('1', 'token');
  expect(fetch).toHaveBeenCalledWith(
    `${import.meta.env.VITE_API_URL}/posts/1/like`,
    { method: 'DELETE', headers: { Authorization: 'Bearer token' } },
  );
});

it('fetches comments', async () => {
  await getComments('1');
  expect(fetch).toHaveBeenCalledWith(
    `${import.meta.env.VITE_API_URL}/posts/1/comments`,
  );
});

it('adds a comment', async () => {
  await addComment('1', 'hi', 'token');
  expect(fetch).toHaveBeenCalledWith(
    `${import.meta.env.VITE_API_URL}/posts/1/comments`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer token',
      },
      body: JSON.stringify({ content: 'hi' }),
    },
  );
});
