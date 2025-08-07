import api from './api';

export const fetchPosts = async () => {
  const res = await api.get('/posts');
  return res.data;
};

export const createPost = async (userId, text, file) => {
  const formData = new FormData();
  formData.append('userId', userId);
  formData.append('text', text);
  if (file) formData.append('file', file);
  const res = await api.post('/posts', formData);
  return res.data;
};

export const likePost = (postId, userId) =>
  api.post(`/posts/${postId}/like`, { userId });

export const addComment = (postId, comment) =>
  api.post(`/posts/${postId}/comments`, comment);
