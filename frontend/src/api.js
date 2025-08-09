function getApiUrl() {
  return import.meta.env.VITE_API_URL;
}

function ensureApiUrl() {
  if (!getApiUrl()) throw new Error('API URL not configured');
}

export async function login(email, password) {
  ensureApiUrl();
  const res = await fetch(`${getApiUrl()}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error('Login failed');
  return res.json();
}

export async function register(email, password) {
  ensureApiUrl();
  const res = await fetch(`${getApiUrl()}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error('Register failed');
  return res.json();
}

export async function getPosts() {
  ensureApiUrl();
  const res = await fetch(`${getApiUrl()}/posts`);
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}
