import { useState, useEffect } from 'react';
import {
  register as apiRegister,
  login as apiLogin,
  fetchPosts as apiFetchPosts,
  createPost as apiCreatePost,
  likePost as apiLikePost,
} from './api';

function App() {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [posts, setPosts] = useState([]);
  const [authForm, setAuthForm] = useState({ email: '', password: '' });
  const [postText, setPostText] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const fetchPosts = async () => {
    const data = await apiFetchPosts();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const register = async () => {
    setLoading(true);
    setError('');
    const data = await apiRegister(authForm);
    setLoading(false);
    if (data.token) {
      setUser(data.user);
      setToken(data.token);
    } else if (data.error) {
      setError(data.error);
    }
  };

  const login = async () => {
    setLoading(true);
    setError('');
    const data = await apiLogin(authForm);
    setLoading(false);
    if (data.token) {
      setUser(data.user);
      setToken(data.token);
    } else if (data.error) {
      setError(data.error);
    }
  };

  const submitPost = async (e) => {
    e.preventDefault();
    if (!user) return;
    await apiCreatePost(token, postText, file);
    setPostText('');
    setFile(null);
    await fetchPosts();
  };

  const like = async (id) => {
    if (!user) return;
    await apiLikePost(token, id);
    await fetchPosts();
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">bojex.online</h1>
      {error && <p className="text-red-500">{error}</p>}
      {!user ? (
        <div className="space-y-2">
          <input
            className="border p-1"
            placeholder="email"
            value={authForm.email}
            onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
          />
          <input
            className="border p-1"
            type="password"
            placeholder="password"
            value={authForm.password}
            onChange={(e) =>
              setAuthForm({ ...authForm, password: e.target.value })
            }
          />
          <div className="space-x-2">
            <button
              className="px-2 py-1 bg-blue-500 text-white"
              onClick={register}
              disabled={loading}
            >
              {loading ? '...' : 'Register'}
            </button>
            <button
              className="px-2 py-1 bg-green-500 text-white"
              onClick={login}
              disabled={loading}
            >
              {loading ? '...' : 'Login'}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <p>Logged in as {user.email}</p>
          <form onSubmit={submitPost} className="space-y-2">
            <input
              className="border p-1 w-full"
              placeholder="What's on your mind?"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
            />
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button
              type="submit"
              className="px-2 py-1 bg-purple-500 text-white"
              disabled={loading}
            >
              {loading ? 'Posting...' : 'Post'}
            </button>
          </form>
        </div>
      )}
      <div className="space-y-4">
        {posts.map((p) => (
          <div key={p.id} className="border p-2">
            <p>{p.text}</p>
            {p.media && (
              <img
                src={`${API_URL}/${p.media}`}
                alt="media"
                className="max-w-xs"
              />
            )}
            <p>Likes: {p.likes.length}</p>
            {user && (
              <button
                className="mt-1 px-2 py-1 bg-pink-500 text-white"
                onClick={() => like(p.id)}
              >
                Like
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
