import { useState } from 'react';
import Navbar from './components/Navbar';
import PostCard from './components/PostCard';
import CommentBox from './components/CommentBox';

function App() {
  const [comments, setComments] = useState([]);
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-2xl space-y-4 p-4">
        <PostCard />
        <section>
          <h2 className="mb-2 text-h2 font-bold">Comments</h2>
          <CommentBox onSubmit={(c) => setComments([...comments, c])} />
          <ul className="mt-4 space-y-2">
            {comments.map((c, i) => (
              <li key={i} className="rounded-md bg-white p-2 shadow-card">
                {c}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
