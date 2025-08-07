import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="p-2 flex gap-2 bg-gray-200">
      <Link to="/">Home</Link>
      {user ? (
        <>
          <Link to="/profile">Profile</Link>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}
