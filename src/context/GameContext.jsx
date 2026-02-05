import { createContext, useContext, useEffect, useState } from "react";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const MAX_TIME = 900;

  const [started, setStarted] = useState(
    sessionStorage.getItem("started") === "true"
  );

  const [timeLeft, setTimeLeft] = useState(
    Number(sessionStorage.getItem("timeLeft")) || MAX_TIME
  );

  const [completed, setCompleted] = useState(
    sessionStorage.getItem("completed") === "true"
  );

  // Persist state
  useEffect(() => {
    sessionStorage.setItem("started", started);
    sessionStorage.setItem("timeLeft", timeLeft);
    sessionStorage.setItem("completed", completed);
  }, [started, timeLeft, completed]);

  // Timer logic
  useEffect(() => {
    if (!started || completed) return;

    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [started, completed]);

  return (
    <GameContext.Provider value={{
      timeLeft,
      setTimeLeft,
      started,
      setStarted,
      completed,
      setCompleted,
      MAX_TIME
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);


