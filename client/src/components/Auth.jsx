import { useState } from "react";

export default function Auth({ onAuth }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const endpoint = isLogin ? "login" : "signup";

    try {
      const res = await fetch(`http://localhost:5000/api/auth/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      if (isLogin) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        onAuth(data.username);
      } else {
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900">
      {/* Welcome Message */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent tracking-tight animate-gradient drop-shadow">
          Welcome to Wordle Clone!
        </h1>
        <p className="mt-2 text-lg sm:text-xl text-gray-200 font-medium">
          Log in or sign up to play, track your streak, and climb the leaderboard.
        </p>
      </div>

      {/* Auth Card */}
      <div className="w-full max-w-sm mx-auto p-6 sm:p-8 bg-white/10 dark:bg-black/30 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 dark:border-black/30 transition-all duration-300 overflow-hidden">
        <h2 className="text-3xl font-extrabold mb-4 text-center bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent tracking-tight animate-gradient">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        {error && (
          <p className="text-center text-red-500 font-semibold mb-2">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className="border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-900/60 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-150"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoFocus
            autoComplete="username"
          />
          <input
            className="border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-900/60 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-150"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete={isLogin ? "current-password" : "new-password"}
          />
          <button
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold py-2 rounded-lg shadow hover:from-indigo-400 hover:to-purple-400 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            type="submit"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <p className="text-sm mt-4 text-center text-gray-300">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-1 text-yellow-400 underline font-semibold hover:text-pink-400 transition-colors duration-150"
            type="button"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
        {/* Custom animation for gradient text */}
        <style>
          {`
            @keyframes gradient {
              0%,100% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
            }
            .animate-gradient {
              background-size: 200% 200%;
              animation: gradient 3s ease infinite;
            }
          `}
        </style>
      </div>
    </div>
  );
}