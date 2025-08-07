import AuthForm from '../components/AuthForm';
import useAuth from '../hooks/useAuth';

export default function Register() {
  const { authForm, setAuthForm, register, loading, error } = useAuth();
  return (
    <div className="p-4 space-y-2">
      <h2 className="text-xl">Register</h2>
      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <AuthForm authForm={authForm} setAuthForm={setAuthForm} onRegister={register} />
      )}
    </div>
  );
}
