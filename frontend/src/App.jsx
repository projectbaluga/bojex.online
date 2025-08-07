import useAuth from './hooks/useAuth';
import usePosts from './hooks/usePosts';
import useUser from './hooks/useUser';
import PostItem from './components/PostItem';
import AuthForm from './components/AuthForm';
import PostForm from './components/PostForm';

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
  const {
    posts,
    loading: postsLoading,
    error: postsError,
    createPost,
    likePost,
    addComment,
  } = usePosts(user);
  const { profile } = useUser(user?.id);

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">bojex.online</h1>
      {authError && <p className="text-red-500">{authError}</p>}
      {authLoading && <p>Loading...</p>}
      {!user ? (
        <AuthForm
          authForm={authForm}
          setAuthForm={setAuthForm}
          onRegister={register}
          onLogin={login}
        />
      ) : (
        <div className="space-y-2">
          <p>Logged in as {profile?.email || user.email}</p>
          <PostForm onSubmit={createPost} />
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

