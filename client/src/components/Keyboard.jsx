const KEYS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"],
];

export default function Keyboard({ onKeyPress }) {
  return (
    <div className="w-full flex-col items-center gap-2 hidden sm:flex select-none">
      <div className="w-full ml-2 max-w-sm px-2 py-4 rounded-2xl transition-all duration-300">
        {KEYS.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex ml-6 justify-center gap-1 sm:gap-2 mb-1 last:mb-0"
          >
            {row.map((key) => {
              const isSpecial = key === "ENTER" || key === "BACKSPACE";
              return (
                <button
                  key={key}
                  aria-label={key}
                  className={`
                    flex items-center justify-center
                    font-bold uppercase
                    rounded-lg shadow
                    transition-all duration-150
                    focus:outline-none focus:ring-2 focus:ring-indigo-400
                    ${
                      isSpecial
                        ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 sm:px-6 py-2 sm:py-2.5 text-base sm:text-lg"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-2.5 sm:px-4 py-2 sm:py-2.5 text-base sm:text-lg"
                    }
                    hover:scale-105 hover:brightness-110 active:scale-95
                  `}
                  style={{
                    minWidth: isSpecial ? "3.5rem" : "2.5rem",
                    minHeight: "2.5rem",
                  }}
                  onClick={() => onKeyPress(key)}
                >
                  {key === "BACKSPACE" ? (
                    <span className="text-xl" aria-label="Backspace">⌫</span>
                  ) : key === "ENTER" ? (
                    <span className="tracking-wide">⏎</span>
                  ) : (
                    key
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
