import { Bars3Icon } from '@heroicons/react/24/outline';
import UserAvatar from './UserAvatar';
import Button from './Button';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 bg-background border-b border-border">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <Bars3Icon className="h-6 w-6 sm:hidden" />
          <span className="font-bold text-h2">bojex</span>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="primary">New Post</Button>
          <UserAvatar name="User" />
        </div>
      </div>
    </header>
  );
}
