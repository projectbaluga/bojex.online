import AuthForm from '../components/AuthForm';
import useAuth from '../hooks/useAuth';

export default function Login() {
  const { authForm, setAuthForm, login, loading, error } = useAuth();
  return (
    <div className="p-4 space-y-2">
      <h2 className="text-xl">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <AuthForm authForm={authForm} setAuthForm={setAuthForm} onLogin={login} />
      )}
    </div>
  );
}
