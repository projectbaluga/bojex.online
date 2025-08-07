const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function register(payload) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function login(payload) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function fetchPosts() {
  const res = await fetch(`${API_URL}/posts`);
  return res.json();
}

export async function createPost(token, text, file) {
  const formData = new FormData();
  formData.append('text', text);
  if (file) formData.append('file', file);
  await fetch(`${API_URL}/posts`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
}

export async function likePost(token, id) {
  await fetch(`${API_URL}/posts/${id}/like`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
}
