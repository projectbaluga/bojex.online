import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import PostCard from './components/PostCard';
import AuthForm from './components/AuthForm';
import { getPosts, likePost, unlikePost } from './api';

function App() {
  const [posts, setPosts] = useState([]);
  const [auth, setAuth] = useState({ token: null, userId: null });

  const fetchPosts = () => {
    getPosts()
      .then((data) => {
        setPosts(
          data.map((p) => ({
            id: p.id,
            authorId: p.authorId,
            text: p.text,
            mediaUrl: p.mediaUrl,
            createdAt: p.createdAt,
            likesCount: p.likes.length,
            liked: auth.userId ? p.likes.includes(auth.userId) : false,
          })),
        );
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchPosts();
  }, [auth.userId]);

  const handleAuthSuccess = (res) => {
    const payload = JSON.parse(atob(res.access_token.split('.')[1]));
    setAuth({ token: res.access_token, userId: payload.sub });
  };

  const handleToggleLike = async (id, liked) => {
    if (!auth.token) return;
    try {
      if (liked) {
        await unlikePost(id, auth.token);
      } else {
        await likePost(id, auth.token);
      }
      setPosts((prev) =>
        prev.map((p) =>
          p.id === id
            ? {
                ...p,
                liked: !liked,
                likesCount: p.likesCount + (liked ? -1 : 1),
              }
            : p,
        ),
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-2xl space-y-4 p-4">
        <AuthForm onSuccess={handleAuthSuccess} />
        {posts.map((p) => (
          <PostCard
            key={p.id}
            id={p.id}
            author={p.authorId}
            content={p.text}
            media={p.mediaUrl}
            timestamp={p.createdAt}
            likesCount={p.likesCount}
            liked={p.liked}
            onToggleLike={handleToggleLike}
          />
        ))}
      </main>
    </div>
  );
}

export default App;
