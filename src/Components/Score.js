import React, { useEffect, useState } from "react";
import useValues from "../Context/DataContext";
import { useNavigate } from "react-router-dom";

const Score = () => {
  const { questions , playerName , setPlayerName , setCategories , setQuestionsFetchUrl , setQuestions , setTime} = useValues()
  let [score, setScore] = useState(0);

  const navigate = useNavigate()

  function restart() {
    setPlayerName('')
    setCategories([])
    setQuestionsFetchUrl('')
    setQuestions([])
    setTime(0)

    navigate('/')
  }

  useEffect(() => {
    let scored = 0;
    questions.map((question) => {
      if (question.optionSelected == question.correct_answer) scored += 1;
    });

    setScore(scored);
  }, []);
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", minWidth: "100vw" }}
    >
      <div className="border border-4 border-dark rounded rounded-4 p-3">
        {score > questions.length / 2 ? (
          <div>
            <p className="text-center h1 mt-3">
              🎉 Congratulations {playerName} 🎉
            </p>
            <p className="text-center fs-5">
              You have passed the quiz with a score of {score} out of{" "}
              {questions.length}
            </p>
          </div>
        ) : (
          <div>
            <p className="text-center h1 mt-3">
              😞Better Luck Next Time , {playerName}
            </p>
            <p className="text-center fs-5">
              You failed the quiz with a score of {score} out of{" "}
              {questions.length}
            </p>
          </div>
        )}
        <button onClick={restart} className="btn btn-danger btn-lg d-block mx-auto">
          Restart
        </button>
      </div>
    </div>
  );
};

export default Score;
