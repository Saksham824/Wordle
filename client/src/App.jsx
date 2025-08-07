import { useState, useEffect } from "react";
import WordleGrid from "./components/WordleGrid";
import Keyboard from "./components/Keyboard";
import Leaderboard from "./components/Leaderboard";
import { getRandomWord } from "./words";
import Auth from "./components/Auth";
import axios from "axios";

function App() {
  const [targetWord, setTargetWord] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [message, setMessage] = useState("");
  const [streak, setStreak] = useState(0);
  const [scores, setScores] = useState([]);
  const [username, setUsername] = useState(
    localStorage.getItem("username") || null
  );

  useEffect(() => {
    setTargetWord(getRandomWord());

    axios
      .get("http://localhost:5000/api/scores/top")
      .then((res) => setScores(res.data))
      .catch((err) => console.error("Leaderboard error:", err));
  }, [username]);

  const handleKey = (key) => {
    if (isGameOver) return;

    if (key === "ENTER") {
      if (currentGuess.length !== 5) return;
      const newGuesses = [...guesses, currentGuess];
      setGuesses(newGuesses);

      if (currentGuess === targetWord) {
        setMessage("🎉 You won!");
        setStreak((prev) => prev + 1);
        setIsGameOver(true);

        const token = localStorage.getItem("token");

        axios
          .post(
            "http://localhost:5000/api/scores",
            {
              username,
              score: guesses.length + 1,
              streak: streak + 1,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then(() => axios.get("http://localhost:5000/api/scores/top"))
          .then((res) => setScores(res.data))
          .catch((err) => console.error("Score submit error:", err));
      } else if (newGuesses.length === 6) {
        setMessage(`❌ Game Over. Word was ${targetWord}`);
        setStreak(0);
        setIsGameOver(true);
      }

      setCurrentGuess("");
    } else if (key === "BACKSPACE") {
      setCurrentGuess(currentGuess.slice(0, -1));
    } else if (/^[A-Z]$/.test(key) && currentGuess.length < 5) {
      setCurrentGuess(currentGuess + key);
    }
  };

  const restartGame = () => {
    setGuesses([]);
    setCurrentGuess("");
    setIsGameOver(false);
    setMessage("");
    setTargetWord(getRandomWord());
  };

  useEffect(() => {
    const listener = (e) => {
      const key = e.key.toUpperCase();
      if (key === "ENTER" || key === "BACKSPACE" || /^[A-Z]$/.test(key)) {
        handleKey(key);
      }
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  });

  if (!username) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900">
        <Auth onAuth={(user) => setUsername(user)} />
      </div>
    );
  }

  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  setUsername(null);
  setScores([]);
  setGuesses([]);
  setCurrentGuess("");
  setIsGameOver(false);
  setMessage("");
  setStreak(0);
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 text-white flex flex-col items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-5xl bg-black/60 rounded-xl shadow-xl p-4 sm:p-8 flex flex-col items-center">
        <div className="w-full flex flex-col sm:flex-row items-center justify-between mb-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2 sm:mb-0 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent animate-gradient">
            Wordle Clone
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded text-sm font-semibold transition-colors duration-200 shadow"
          >
            🚪 Logout
          </button>
        </div>
        <div className="w-full flex flex-col sm:flex-row items-center justify-between mb-2">
          <p className="text-sm mb-1 sm:mb-0">
            👤 <span className="font-semibold">{username}</span>
          </p>
          <p className="text-yellow-400 font-semibold text-base">
            🔥 Streak: <span className="animate-pulse">{streak}</span>
          </p>
        </div>

        <div className="w-full flex flex-col sm:flex-row gap-6 mt-4">
          <div className="flex-1 flex flex-col items-center">
            <WordleGrid
              guesses={guesses}
              currentGuess={currentGuess}
              target={targetWord}
            />
            <p
              className={`mt-4 text-lg min-h-[2.5rem] transition-all duration-300 ${
                message.includes("won")
                  ? "text-green-400 animate-bounce"
                  : message.includes("Game Over")
                  ? "text-red-400 animate-shake"
                  : ""
              }`}
            >
              {message}
            </p>
            {isGameOver && (
              <button
                onClick={restartGame}
                className="mt-4 bg-gradient-to-r from-green-500 to-lime-500 px-6 py-2 rounded-lg font-bold shadow hover:from-green-400 hover:to-lime-400 transition-all duration-200"
              >
                🔄 Play Again
              </button>
            )}
            <div className="mt-6 w-full">
              <Keyboard onKeyPress={handleKey} />
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center mt-8 sm:mt-0">
            <Leaderboard scores={scores} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;