function AuthForm({ authForm, setAuthForm, onRegister, onLogin }) {
  return (
    <div className="space-y-2">
      <input
        className="border p-1"
        placeholder="email"
        value={authForm.email}
        onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
      />
      <input
        className="border p-1"
        type="password"
        placeholder="password"
        value={authForm.password}
        onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
      />
      <div className="space-x-2">
        <button className="px-2 py-1 bg-blue-500 text-white" onClick={onRegister}>
          Register
        </button>
        <button className="px-2 py-1 bg-green-500 text-white" onClick={onLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default AuthForm;
