import React from "react";

const medalColors = [
  "bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-200 text-yellow-900 shadow-lg", // 1st
  "bg-gradient-to-r from-gray-300 via-gray-400 to-gray-200 text-gray-900 shadow-md",         // 2nd
  "bg-gradient-to-r from-orange-300 via-orange-400 to-orange-200 text-orange-900 shadow-md", // 3rd
];

const medals = ["🥇", "🥈", "🥉"];

export default function Leaderboard({ scores }) {
  const currentUser = localStorage.getItem("username");

  return (
    <section
      className="mt-8 w-full max-w-md mx-auto bg-white/10 dark:bg-black/30 backdrop-blur-md p-4 sm:p-6 rounded-2xl shadow-2xl border border-white/20 dark:border-black/30 transition-all duration-300"
      aria-labelledby="leaderboard-heading"
      role="region"
    >
      <h2
        id="leaderboard-heading"
        className="text-2xl font-extrabold mb-4 text-center bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent tracking-tight drop-shadow animate-gradient"
      >
        🏆 Leaderboard
      </h2>

      <div className="hidden sm:grid grid-cols-3 font-semibold border-b border-gray-700 pb-2 mb-2 text-gray-300 text-center">
        <span>Name</span>
        <span>Score</span>
        <span>Streak</span>
      </div>

      {scores.length === 0 ? (
        <p className="text-center text-gray-400 py-6">No scores yet</p>
      ) : (
        <div className="flex flex-col gap-2">
          {scores.map((s, i) => {
            const isCurrentUser = currentUser === s.username;
            return (
              <div
                key={i}
                className={`
                  group flex flex-col sm:grid sm:grid-cols-3 items-center
                  px-3 py-2 border border-gray-700 rounded-xl
                  transition-all duration-200
                  hover:scale-[1.025] hover:brightness-110
                  focus-within:ring-2 focus-within:ring-indigo-400
                  ${
                    i < 3
                      ? `${medalColors[i]} font-bold`
                      : isCurrentUser
                      ? "bg-gradient-to-r from-green-500/80 to-lime-400/80 text-white font-semibold border-green-400 shadow"
                      : "bg-gray-100/60 dark:bg-gray-800/70 text-gray-900 dark:text-gray-100"
                  }
                `}
                tabIndex={0}
                aria-label={
                  isCurrentUser
                    ? `Your score: ${s.score}, streak: ${s.streak}`
                    : `${s.username}, score: ${s.score}, streak: ${s.streak}`
                }
              >
                <span className="flex items-center gap-2 w-full sm:justify-start">
                  {i < 3 && (
                    <span className="text-xl" aria-label={`Rank ${i + 1}`}>
                      {medals[i]}
                    </span>
                  )}
                  <span className="truncate font-semibold">
                    {s.username}
                    {isCurrentUser && (
                      <span className="ml-1 text-green-700 dark:text-green-300 font-bold animate-pulse">
                        (You)
                      </span>
                    )}
                  </span>
                </span>
                <span className="sm:text-center w-full font-mono">{s.score}</span>
                <span className="sm:text-center w-full font-mono">{s.streak}</span>
              </div>
            );
          })}
        </div>
      )}

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
    </section>
  );
}