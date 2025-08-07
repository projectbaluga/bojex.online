import useAuth from '../hooks/useAuth';
import usePosts from '../hooks/usePosts';
import PostItem from '../components/PostItem';
import PostForm from '../components/PostForm';

export default function Home() {
  const { user } = useAuth();
  const { posts, loading, error, createPost, likePost, addComment } = usePosts(user);

  return (
    <div className="p-4 space-y-4">
      {user && <PostForm onSubmit={createPost} />}
      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        posts.map((p) => (
          <PostItem
            key={p._id || p.id}
            post={p}
            user={user}
            onLike={likePost}
            onComment={addComment}
          />
        ))
      )}
    </div>
  );
}
