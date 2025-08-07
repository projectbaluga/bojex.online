import { XMarkIcon } from '@heroicons/react/24/outline';

export default function UploadPreview({ src, onRemove }) {
  if (!src) return null;
  return (
    <div className="relative mt-2 w-full">
      <img src={src} alt="preview" className="max-h-60 w-full rounded-md object-cover" />
      <button
        aria-label="Remove"
        onClick={onRemove}
        className="absolute top-2 right-2 rounded-full bg-black/50 p-1 text-white hover:bg-black/70"
      >
        <XMarkIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
