import { useEffect, useState, useRef } from "react";
import { shuffle } from "../utils/shuffle";

export default function QuestionPanel({ data, onCorrect, onAnswer }) {
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null); // 'correct' or 'wrong'
  const [isAnswering, setIsAnswering] = useState(false); // prevent double clicks
  const answerTimeoutRef = useRef(null); // Track timeout for cleanup
  /* --------------------------------
     SHUFFLE OPTIONS ONCE PER QUESTION
  --------------------------------- */
  // Initialize with shuffled options immediately to prevent layout shift (empty options -> filled)
  const [shuffledOptions, setShuffledOptions] = useState(() => shuffle(data.options));

  // If data changes (though key prop usually handles this), update options
  useEffect(() => {
    // When data updates (if component is recycled), update options immediately or keep them if intended.
    // Since we use a key prop in Game.jsx, this component usually Remounts, so the useState initializer handles it.
    // But safely:
    setShuffledOptions(shuffle(data.options));
  }, [data]);

  useEffect(() => {
    setSelected(null);
    setFeedback(null);
    setIsAnswering(false);

    return () => {
      // Clear any pending answer timeout when question changes
      if (answerTimeoutRef.current) {
        clearTimeout(answerTimeoutRef.current);
        answerTimeoutRef.current = null;
      }
    };
  }, [data]);

  /* --------------------------------
     HANDLE OPTION CLICK
  --------------------------------- */
  const handleOptionClick = (option) => {
    if (isAnswering) return; // Prevent selecting while answer is being processed
    setSelected(option);
  };

  /* --------------------------------
     HANDLE SUBMIT
  --------------------------------- */
  const handleSubmit = () => {
    if (!selected || isAnswering) return; // Can't submit without selection
    setIsAnswering(true);

    const isCorrect = selected === data.correct;

    if (isCorrect) {
      setFeedback("correct");
    } else {
      setFeedback("wrong");
    }

    // Delay to show feedback before moving on
    answerTimeoutRef.current = setTimeout(() => {
      // Report answer correctness to parent for score tracking
      if (onAnswer) {
        onAnswer(isCorrect);
      }
      // Always advance to next question
      onCorrect();
      answerTimeoutRef.current = null;
    }, 800); // 0.8s delay
  };

  const getButtonClass = (option) => {
    // If not answering yet, show selected state
    if (!isAnswering) {
      return selected === option ? "active" : "";
    }

    // Always highlight the correct answer in green
    if (option === data.correct) {
      return "correct";
    }

    // Checking if this specific option was the one selected by the user
    // If it was selected AND it wasn't the correct one (which we covered above), mark it wrong
    if (selected === option) {
      return "wrong";
    }

    return "";
  };

  return (
    <div className="question-panel">
      <h3 className="panel-label">Question</h3>
      <h2>{data.question}</h2>

      {shuffledOptions.map((option) => (
        <button
          key={option}
          onClick={() => handleOptionClick(option)}
          className={getButtonClass(option)}
          disabled={isAnswering}
        >
          {option}
        </button>
      ))}

      <button
        onClick={handleSubmit}
        className="submit-btn"
        style={{ marginTop: "40px" }}
        disabled={!selected || isAnswering}
      >
        Submit
      </button>
    </div>
  );
}

// import { useState } from "react";
// import { shuffle } from "../utils/shuffle";

// export default function QuestionPanel({ data, onCorrect }) {
//   const [selected, setSelected] = useState(null);
//   const options = shuffle(data.options);

//   const submit = () => {
//     if (selected === data.correct) {
//       onCorrect();
//     } else {
//       alert("Incorrect... 👀 Somewhere on the screen another hint is provided.");
//     }
//   };

//   return (
//     <div className="question-panel">
//       <h2>{data.question}</h2>

//       {options.map((opt) => (
//         <button
//           key={opt}
//           onClick={() => setSelected(opt)}
//           className={selected === opt ? "active" : ""}
//         >
//           {opt}
//         </button>
//       ))}

//       <button onClick={submit} className="submit-btn">Submit</button>
//     </div>
//   );
// }
