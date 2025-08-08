import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import PostCard from './components/PostCard';
import AuthForm from './components/AuthForm';
import { getPosts } from './api';
function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then(setPosts).catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-2xl space-y-4 p-4">
        <AuthForm />
        {posts.map((p) => (
          <PostCard
            key={p.id}
            author={p.authorId}
            content={p.text}
            media={p.mediaUrl}
            timestamp={p.createdAt}
          />
        ))}
      </main>
    </div>
  );
}

export default App;
