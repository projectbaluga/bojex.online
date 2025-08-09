import UserAvatar from './UserAvatar';
import Button from './Button';

export default function PostCard({
  id,
  author,
  avatar,
  timestamp,
  content,
  media,
  likesCount = 0,
  liked = false,
  onToggleLike,
}) {
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
        <Button variant="ghost">Comment</Button>
      </footer>
    </article>
  );
}
