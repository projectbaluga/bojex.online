import { useState } from 'react';
import UserAvatar from './UserAvatar';
import Button from './Button';
import CommentBox from './CommentBox';
import { getComments, addComment } from '../api';

export default function PostCard({
  id,
  author,
  avatar,
  timestamp,
  content,
  media,
  likesCount = 0,
  liked = false,
  commentsCount = 0,
  onToggleLike,
  authToken,
}) {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [count, setCount] = useState(commentsCount);

  const toggleComments = () => {
    setShowComments((prev) => {
      const next = !prev;
      if (next && comments.length === 0) {
        getComments(id)
          .then((res) => setComments(res.comments))
          .catch(console.error);
      }
      return next;
    });
  };

  const handleAddComment = async (text) => {
    if (!authToken) return;
    try {
      const comment = await addComment(id, text, authToken);
      setComments((prev) => [...prev, comment]);
      setCount((c) => c + 1);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <article className="bg-white shadow-card rounded-md p-4 space-y-4">
      <header className="flex items-center space-x-3">
        <UserAvatar src={avatar} name={author} size={40} />
        <div>
          <p className="font-semibold">{author}</p>
          <p className="text-xs text-neutral">{timestamp}</p>
        </div>
      </header>
      <div className="space-y-2">
        <p>{content}</p>
        {media && <img src={media} alt="" className="max-h-60 w-full object-cover rounded-md" />}
      </div>
      <footer className="flex space-x-4">
        <Button variant="ghost" onClick={() => onToggleLike?.(id, liked)}>
          {liked ? 'Unlike' : 'Like'} ({likesCount})
        </Button>
        <Button variant="ghost" onClick={toggleComments}>
          Comment ({count})
        </Button>
      </footer>
      {showComments && (
        <div className="space-y-4">
          {comments.map((c) => (
            <div key={c.id} className="flex items-start space-x-2">
              <UserAvatar name={c.authorId} size={32} />
              <p className="text-sm">
                <span className="font-semibold mr-1">{c.authorId}</span>
                {c.content}
              </p>
            </div>
          ))}
          <CommentBox onSubmit={handleAddComment} />
        </div>
      )}
    </article>
  );
}
