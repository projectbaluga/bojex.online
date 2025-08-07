import useAuth from '../hooks/useAuth';
import useUser from '../hooks/useUser';

export default function Profile() {
  const { user } = useAuth();
  const { profile } = useUser(user?.id);
  if (!user) return <p className="p-4">Not logged in</p>;
  return (
    <div className="p-4 space-y-2">
      <h2 className="text-xl">Profile</h2>
      <p>Email: {profile?.email}</p>
      <p>Followers: {profile?.followersCount}</p>
      <p>Following: {profile?.followingCount}</p>
    </div>
  );
}
