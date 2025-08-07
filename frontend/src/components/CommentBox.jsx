import { useState } from 'react';
import UserAvatar from './UserAvatar';
import Button from './Button';

export default function CommentBox({ onSubmit }) {
  const [value, setValue] = useState('');
  return (
    <div className="flex items-start space-x-3">
      <UserAvatar name="You" />
      <div className="flex-1 space-y-2">
        <textarea
          className="w-full resize-none rounded-md border border-border p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          rows={3}
          value={value}
          placeholder="Write a comment..."
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="flex justify-end">
          <Button
            variant="primary"
            disabled={!value.trim()}
            onClick={() => {
              onSubmit?.(value);
              setValue('');
            }}
          >
            Post
          </Button>
        </div>
      </div>
    </div>
  );
}
