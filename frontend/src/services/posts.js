const API_URL = 'http://localhost:3000';

const getErrorMessage = (data, fallback) => {
  if (data?.message) {
    return Array.isArray(data.message) ? data.message.join(', ') : data.message;
  }
  if (data?.error) return data.error;
  return fallback;
};

export async function fetchPosts() {
  const res = await fetch(`${API_URL}/posts`);
  const data = await res.json().catch(() => null);
  if (res.ok && data) {
    return data;
  }
  throw new Error(getErrorMessage(data, 'Failed to load posts'));
}

export async function createPost(userId, text, file) {
  const formData = new FormData();
  formData.append('userId', userId);
  formData.append('text', text);
  if (file) formData.append('file', file);
  const res = await fetch(`${API_URL}/posts`, {
    method: 'POST',
    body: formData,
  });
  const data = await res.json().catch(() => null);
  if (res.ok && data) {
    return data;
  }
  throw new Error(getErrorMessage(data, 'Failed to create post'));
}

export async function likePost(postId, userId) {
  const res = await fetch(`${API_URL}/posts/${postId}/like`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId }),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(getErrorMessage(data, 'Failed to like post'));
  }
}

export async function addComment(postId, comment) {
  const res = await fetch(`${API_URL}/posts/${postId}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(comment),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(getErrorMessage(data, 'Failed to add comment'));
  }
}
