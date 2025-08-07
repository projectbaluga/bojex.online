import { useState } from 'react';

function PostForm({ onSubmit }) {
  const [postText, setPostText] = useState('');
  const [file, setFile] = useState(null);

  const submitPost = async (e) => {
    e.preventDefault();
    await onSubmit({ text: postText, file });
    setPostText('');
    setFile(null);
  };

  return (
    <form onSubmit={submitPost} className="space-y-2">
      <input
        className="border p-1 w-full"
        placeholder="What's on your mind?"
        value={postText}
        onChange={(e) => setPostText(e.target.value)}
      />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button type="submit" className="px-2 py-1 bg-purple-500 text-white">
        Post
      </button>
    </form>
  );
}

export default PostForm;
