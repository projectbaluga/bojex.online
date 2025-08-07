import { useState, useEffect } from 'react';
import {
  fetchPosts as fetchPostsService,
  createPost as createPostService,
  likePost as likePostService,
  addComment as addCommentService,
} from '../services/posts';

export default function usePosts(user) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPostsService();
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
    try {
      const data = await createPostService(user.id, text, file);
      setPosts((prev) => [data, ...prev]);
    } catch (err) {
      setError(err.message);
    }
  };

  const likePost = async (postId) => {
    if (!user) return;
    setPosts((prev) =>
      prev.map((p) =>
        (p._id || p.id) === postId && !p.likes.includes(user.id)
          ? { ...p, likes: [...p.likes, user.id] }
          : p
      )
    );
    try {
      await likePostService(postId, user.id);
    } catch (err) {
      setError(err.message);
    }
  };

  const addComment = async (postId, text) => {
    if (!user) return;
    const comment = { userId: user.id, text };
    setPosts((prev) =>
      prev.map((p) =>
        (p._id || p.id) === postId
          ? { ...p, comments: [...p.comments, comment] }
          : p
      )
    );
    try {
      await addCommentService(postId, comment);
    } catch (err) {
      setError(err.message);
    }
  };

  return { posts, loading, error, fetchPosts, createPost, likePost, addComment };
}

