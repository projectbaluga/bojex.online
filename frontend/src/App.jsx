import { useState, useEffect } from 'react';

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
    const res = await fetch(`${API_URL}/posts`);
    const data = await res.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const register = async () => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(authForm),
    });
    const data = await res.json();
    if (data.token) {
      setUser(data.user);
      setToken(data.token);
    }
  };

  const login = async () => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(authForm),
    });
    const data = await res.json();
    if (data.token) {
      setUser(data.user);
      setToken(data.token);
    }
  };

  const submitPost = async (e) => {
    e.preventDefault();
    if (!user) return;
    const formData = new FormData();
    formData.append('text', postText);
    if (file) formData.append('file', file);
    await fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    setPostText('');
    setFile(null);
    await fetchPosts();
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">bojex.online</h1>
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
            <button className="px-2 py-1 bg-blue-500 text-white" onClick={register}>
              Register
            </button>
            <button className="px-2 py-1 bg-green-500 text-white" onClick={login}>
              Login
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
            >
              Post
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
