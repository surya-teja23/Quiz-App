import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useValues from "../Context/DataContext";
import Loader from "./Loader";

const QuestionsLoading = () => {
  const { questionsFetchUrl, setQuestions, setTime } = useValues();
  const [isLoading, setIsLoading] = useState(false);
  const [questionsFetchError, setQuestionsFetchError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    setQuestionsFetchError(false);
    let id = 0;
    async function apiFetch() {
      try {
        let response = await fetch(questionsFetchUrl);
        if (!response.ok) throw Error("Failed to fetch questions");

        let questionsData = await response.json();
        let questions = questionsData.results.map((question) => {
          let options = [
            question.correct_answer,
            ...question.incorrect_answers,
          ].sort(() => Math.random() - 0.5);
          let optionSelected = "";
          id += 1;
          return {
            ...question,
            id: id,
            optionSelected: optionSelected,
            options: options,
          };
        });
        console.log(questions);
        setQuestions(questions);
        setTime(300);
      } catch (err) {
        setQuestionsFetchError(true);
      } finally {
        setIsLoading(false);
        if (!questionsFetchError) navigate("/question/1");
      }
    }

    apiFetch();
  }, []);

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", minWidth: "100vw" }}
    >
      {isLoading && (
        <div className="border border-4 border-dark rounded-4 h1 p-3">
          <Loader />
        </div>
      )}
      {questionsFetchError && (
        <div className="border border-4 border-dark rounded-4 h1 p-3">
          Failed to fetch data
        </div>
      )}
    </div>
  );
};

export default QuestionsLoading;
