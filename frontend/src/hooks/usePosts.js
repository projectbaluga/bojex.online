import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3000';

export default function usePosts(user) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/posts`);
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      setError(err.message);
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
      const newPost = await res.json();
      setPosts((prev) => [newPost, ...prev]);
    } catch (err) {
      setError(err.message);
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
      await fetch(`${API_URL}/posts/${postId}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id }),
      });
    } catch (err) {
      setError(err.message);
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
      await fetch(`${API_URL}/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment),
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return { posts, loading, error, fetchPosts, createPost, likePost, addComment };
}

