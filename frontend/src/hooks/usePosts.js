import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3000';

const getErrorMessage = (data, fallback) => {
  if (data?.message) {
    return Array.isArray(data.message)
      ? data.message.join(', ')
      : data.message;
  }
  if (data?.error) return data.error;
  return fallback;
};

export default function usePosts(user) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
      try {
        const res = await fetch(`${API_URL}/posts`);
        const data = await res.json().catch(() => null);
        if (res.ok && data) {
          setPosts(data);
        } else {
          setError(getErrorMessage(data, 'Failed to load posts'));
        }
      } catch (err) {
        setError(`Network error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchPosts();
  }, []);

  const createPost = async ({ text, file }) => {
    if (!user) return;
    const formData = new FormData();
    formData.append('userId', user.id);
    formData.append('text', text);
    if (file) formData.append('file', file);
      try {
        const res = await fetch(`${API_URL}/posts`, {
          method: 'POST',
          body: formData,
        });
        const data = await res.json().catch(() => null);
        if (res.ok && data) {
          setPosts((prev) => [data, ...prev]);
        } else {
          setError(getErrorMessage(data, 'Failed to create post'));
        }
      } catch (err) {
        setError(`Network error: ${err.message}`);
      }
    };

  const likePost = async (postId) => {
    if (!user) return;
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId && !p.likes.includes(user.id)
          ? { ...p, likes: [...p.likes, user.id] }
          : p
      )
    );
      try {
        const res = await fetch(`${API_URL}/posts/${postId}/like`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id }),
        });
        const data = await res.json().catch(() => null);
        if (!res.ok) {
          setError(getErrorMessage(data, 'Failed to like post'));
        }
      } catch (err) {
        setError(`Network error: ${err.message}`);
      }
    };

  const addComment = async (postId, text) => {
    if (!user) return;
    const comment = { userId: user.id, text };
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, comments: [...p.comments, comment] }
          : p
      )
    );
      try {
        const res = await fetch(`${API_URL}/posts/${postId}/comments`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(comment),
        });
        const data = await res.json().catch(() => null);
        if (!res.ok) {
          setError(getErrorMessage(data, 'Failed to add comment'));
        }
      } catch (err) {
        setError(`Network error: ${err.message}`);
      }
    };

  return { posts, loading, error, fetchPosts, createPost, likePost, addComment };
}

