import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import questions from "../data/questions";
import { shuffle } from "../utils/shuffle";
import QuestionPanel from "../components/QuestionPanel";
import CluePanel from "../components/CluePanel";
import { useGame } from "../context/GameContext";
import ProgressBar from "../components/ProgressBar";
import IceBreaker from "../components/IceBreaker";


/* -------------------------------
   LOCK QUESTION ORDER PER SESSION
-------------------------------- */
const storedQuestions = sessionStorage.getItem("questionOrder");

const shuffledQuestions = storedQuestions
  ? JSON.parse(storedQuestions)
  : shuffle(questions);

if (!storedQuestions) {
  sessionStorage.setItem(
    "questionOrder",
    JSON.stringify(shuffledQuestions)
  );
}

export default function Game() {
  const navigate = useNavigate();
  const { setCompleted, timeLeft, incrementCorrect, incrementIncorrect, setIsPaused } = useGame();

  /* -------------------------------
     RESTORE CURRENT QUESTION INDEX
  -------------------------------- */
  const [index, setIndex] = useState(
    Number(sessionStorage.getItem("currentIndex")) || 0
  );

  /* -------------------------------
     ICE BREAKER STATE
  -------------------------------- */
  const [showIceBreaker, setShowIceBreaker] = useState(
    sessionStorage.getItem("iceBreakerActive") === "true"
  );

  /* -------------------------------
     PERSIST STATE ON CHANGE
  -------------------------------- */
  useEffect(() => {
    sessionStorage.setItem("currentIndex", index);
    sessionStorage.setItem("iceBreakerActive", showIceBreaker);
  }, [index, showIceBreaker]);

  /* -------------------------------
     AUTO DISQUALIFY IF TIME UP
  -------------------------------- */
  useEffect(() => {
    if (showIceBreaker) {
      setIsPaused(true);
    }
  }, [showIceBreaker, setIsPaused]);

  useEffect(() => {
    if (timeLeft === 0) {
      setCompleted(true);
      navigate("/result");
    }
  }, [timeLeft, navigate, setCompleted]);

  /* -------------------------------
     HANDLE ANSWER (SCORE TRACKING)
  -------------------------------- */
  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      incrementCorrect();
    } else {
      incrementIncorrect();
    }
  };

  /* -------------------------------
     HANDLE CORRECT ANSWER
  -------------------------------- */
  const handleCorrect = () => {
    // Check if we just answered Question 4 (index 3)
    if (index === 3) {
      setShowIceBreaker(true);
      setIsPaused(true);
      return; 
    }

    if (index + 1 >= shuffledQuestions.length) {
      setCompleted(true);
      navigate("/result");
    } else {
      setIndex(index + 1);
    }
  };

  /* -------------------------------
     HANDLE ICE BREAKER COMPLETE
  -------------------------------- */
  const handleIceBreakerComplete = () => {
    setShowIceBreaker(false);
    setIsPaused(false);
    setIndex(index + 1); // Move to Question 5
  };

  /* -------------------------------
     SAFETY CHECK (EDGE CASE)
  -------------------------------- */
  if (!shuffledQuestions[index]) {
    navigate("/result");
    return null;
  }

  return (
    <>
      <ProgressBar
        current={index}
        total={shuffledQuestions.length}
      />

      {/* Question Counter */}
      <div className="question-counter">
        Question {index + 1} / {shuffledQuestions.length}
      </div>

      <div className="game-layout">
        {showIceBreaker ? (
          <IceBreaker onComplete={handleIceBreakerComplete} />
        ) : (
          <>
            <QuestionPanel
              key={shuffledQuestions[index].id}
              data={shuffledQuestions[index]}
              onCorrect={handleCorrect}
              onAnswer={handleAnswer}
            />
            <CluePanel 
              type={shuffledQuestions[index].type} 
              hints={shuffledQuestions[index].hints} 
            />
          </>
        )}
      </div>
    </>
  );
}




// import { useNavigate } from "react-router-dom";
// import { useGame } from "../context/GameContext";

// export default function Game() {
//   const navigate = useNavigate();
//   const { setCompleted } = useGame();
//   const [index, setIndex] = useState(0);

  

//   const handleCorrect = () => {
//     if (index + 1 >= shuffledQuestions.length) {
//       setCompleted(true);
//       navigate("/result");
//     } else {
//       setIndex(index + 1);
//     }
//   };

  

//   return (
//     <>
//       <Timer />
//       <div className="game-layout">
//         <QuestionPanel
//           data={shuffledQuestions[index]}
//           onCorrect={handleCorrect}
//         />
//         <CluePanel type={shuffledQuestions[index].type} />
//       </div>
//     </>
//   );
// }







// import { useState } from "react";
// import  questions  from "../data/questions";   //"../data/questions
// import { shuffle } from "../utils/shuffle";
// import QuestionPanel from "../components/QuestionPanel";
// import CluePanel from "../components/CluePanel";
// import Timer from "../components/Timer";

// const shuffledQuestions = shuffle(questions);

// export default function Game() {
//   const [index, setIndex] = useState(0);

//   return (
//     <>
//       <Timer />
//       <div className="game-layout">
//         <QuestionPanel
//           data={shuffledQuestions[index]}
//           onCorrect={() => setIndex(index + 1)}
//         />
//         <CluePanel type={shuffledQuestions[index].type} />
//       </div>
//     </>
//   );
// }
