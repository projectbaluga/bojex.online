import { UserCircleIcon } from '@heroicons/react/24/solid';

export default function UserAvatar({ src, name, size = 40 }) {
  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : null;
  const dimension = `${size}px`;
  return (
    <div
      className="flex items-center justify-center rounded-full bg-border text-neutral overflow-hidden"
      style={{ width: dimension, height: dimension }}
    >
      {src ? (
        <img src={src} alt={name} className="w-full h-full object-cover" />
      ) : initials ? (
        <span className="font-medium" aria-hidden="true">
          {initials}
        </span>
      ) : (
        <UserCircleIcon className="w-full h-full text-neutral" />
      )}
    </div>
  );
}
