import { useState } from 'react';
import useAuth from './hooks/useAuth';
import usePosts from './hooks/usePosts';
import useUser from './hooks/useUser';
import PostItem from './components/PostItem';

function App() {
  const {
    user,
    authForm,
    setAuthForm,
    loading: authLoading,
    error: authError,
    register,
    login,
  } = useAuth();
  const [postText, setPostText] = useState('');
  const [file, setFile] = useState(null);
  const {
    posts,
    loading: postsLoading,
    error: postsError,
    createPost,
    likePost,
    addComment,
  } = usePosts(user);
  const { profile } = useUser(user?.id);

  const submitPost = async (e) => {
    e.preventDefault();
    await createPost({ text: postText, file });
    setPostText('');
    setFile(null);
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">bojex.online</h1>
      {authError && <p className="text-red-500">{authError}</p>}
      {authLoading && <p>Loading...</p>}
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
          <p>Logged in as {profile?.email || user.email}</p>
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
      {postsError && <p className="text-red-500">{postsError}</p>}
      {postsLoading ? (
        <p>Loading posts...</p>
      ) : (
        <div className="space-y-4">
          {posts.map((p) => (
            <PostItem
              key={p.id}
              post={p}
              user={user}
              onLike={likePost}
              onComment={addComment}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;

