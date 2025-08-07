import { useState } from 'react';

function PostItem({ post, user, onLike, onComment }) {
  const [comment, setComment] = useState('');

  const submitComment = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    onComment(post.id, comment);
    setComment('');
  };

  return (
    <div className="border p-2">
      <p>{post.text}</p>
      {post.media && (
        <img
          src={`http://localhost:3000/${post.media}`}
          alt="media"
          className="max-w-xs"
        />
      )}
      <p>Likes: {post.likes.length}</p>
      {user && (
        <button
          className="px-2 py-1 bg-pink-500 text-white mr-2"
          onClick={() => onLike(post.id)}
        >
          Like
        </button>
      )}
      <div className="mt-2 space-y-1">
        {post.comments.map((c, idx) => (
          <p key={idx} className="text-sm">
            <span className="font-bold">{c.userId}:</span> {c.text}
          </p>
        ))}
      </div>
      {user && (
        <form onSubmit={submitComment} className="mt-2">
          <input
            className="border p-1 mr-2"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add comment"
          />
          <button type="submit" className="px-2 py-1 bg-gray-500 text-white">
            Comment
          </button>
        </form>
      )}
    </div>
  );
}

export default PostItem;

