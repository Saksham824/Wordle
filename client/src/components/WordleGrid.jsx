import React from "react";

export default function WordleGrid({ guesses, currentGuess, target }) {
  const getColor = (letter, index) => {
    if (!target) return "bg-gray-300 dark:bg-gray-700";
    if (letter === target[index]) return "bg-green-500 text-white";
    else if (target.includes(letter)) return "bg-yellow-400 text-gray-900";
    else return "bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100";
  };

  const maxRows = 6;
  let rows = [];

  if (guesses.length < maxRows) {
    rows = [
      ...guesses,
      currentGuess,
      ...Array(Math.max(0, maxRows - guesses.length - 1)).fill(""),
    ];
  } else {
    rows = guesses.slice(0, maxRows);
  }

  return (
    <div className="flex justify-center items-center min-h-[50vh] w-full">
      <div className="w-full max-w-md px-1 sm:px-2 py-4 rounded-2xl bg-white/10 dark:bg-black/30 backdrop-blur-md shadow-xl border border-white/20 dark:border-black/30 transition-all duration-300">
        <div className="grid grid-rows-6 gap-2 w-full">
          {rows.map((word, rowIndex) => (
            <div key={rowIndex} className="flex gap-2 justify-center">
              {Array.from({ length: 5 }).map((_, i) => {
                const char = word[i] || "";
                
                const isSubmitted = rowIndex < guesses.length;
                const color = isSubmitted
                  ? getColor(char, i)
                  : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100";
                return (
                  <div
                    key={i}
                    aria-label={char ? `Letter ${char}` : "Empty"}
                    className={`
                      w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14
                      text-lg sm:text-xl md:text-2xl
                      font-extrabold uppercase flex items-center justify-center
                      border border-gray-300 dark:border-gray-700
                      rounded-xl shadow-md
                      transition-all duration-300
                      ${color}
                      ${isSubmitted ? "animate-flip" : ""}
                      focus:outline-none focus:ring-2 focus:ring-indigo-400
                    `}
                    tabIndex={0}
                  >
                    {char}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      {/* Custom animation for flip effect */}
      <style>
        {`
          @keyframes flip {
            0% { transform: rotateX(0deg);}
            50% { transform: rotateX(90deg);}
            100% { transform: rotateX(0deg);}
          }
          .animate-flip {
            animation: flip 0.5s cubic-bezier(.68,-0.55,.27,1.55);
          }
        `}
      </style>
    </div>
  );
}