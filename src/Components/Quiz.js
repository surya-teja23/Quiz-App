import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useValues from "../Context/DataContext";
import Loader from "./Loader";

const Quiz = () => {
  const { playerName , categories , setCategories , setQuestionsFetchUrl } = useValues()
  const [isLoading, setIsLoading] = useState(false);
  const [categoriesFetchError, setCategoriesFetchError] = useState(false);

  const questions = useRef();
  const category = useRef();
  const difficulty = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    setCategoriesFetchError(null);
    async function apiFetch() {
      try {
        let response = await fetch("https://opentdb.com/api_category.php");
        if (!response.ok) throw Error("Failed to fetch data...");

        let categoriesData = await response.json();
        setCategories(categoriesData.trivia_categories);
      } catch (err) {
        setCategoriesFetchError(true);
      } finally {
        setIsLoading(false);
      }
    }

    apiFetch();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let noOfQuestions =
      questions.current.value === ""
        ? "amount=5"
        : `amount=${questions.current.value}`;
    let categorySelected =
      category.current.value === ""
        ? ""
        : `&category=${category.current.value}`;
    let difficultySelected =
      difficulty.current.value === ""
        ? ""
        : `&difficulty=${difficulty.current.value}`;

    setQuestionsFetchUrl(
      `https://opentdb.com/api.php?${noOfQuestions}${categorySelected}${difficultySelected}&type=multiple`
    );
    navigate("/questionsloading");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", minWidth: "100vw" }}
    >
      {isLoading && (
        <div className="text-center border border-4 border-dark h1 rounded-4 p-3">
          <Loader />
        </div>
      )}
      {categoriesFetchError && (
        <div className="border border-4 border-dark h1 rounded-4 p-3">
          Failed to fetch data ... &nbsp;
        </div>
      )}
      {!isLoading && !categoriesFetchError && (
        <div
          style={{ width: "min(80vw,500px)" }}
          className="border border-4 border-dark rounded-4 p-3"
        >
          <form onSubmit={handleSubmit}>
            <h1 className="text-center mb-4 text-decoration-underline">
              Welcome, {playerName}
            </h1>
            <div className="input-group mb-4">
              <div className="input-group-text">Enter No. of questions : </div>
              <input
                ref={questions}
                placeholder="Min : 5 & Max : 10   (Default : 5)"
                className="form-control"
                type="number"
                min={5}
                max={10}
              />
            </div>
            <div className="input-group mb-4">
              <div className="input-group-text">Select Category : </div>
              <select ref={category} className="form-select">
                <option value="">Any Category</option>
                {categories.map((category) => {
                  return (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="input-group mb-4">
              <div className="input-group-text">Select Difficulty : </div>
              <select ref={difficulty} className="form-select">
                <option value="">Any Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <button
              type="submit"
              className="btn btn-lg btn-danger d-block mx-auto px-4"
            >
              Start Quiz
            </button>
          </form>
          <div>
            <div className="fs-5 text-decoration-underline">Note :</div>
            <div>
              &#x2022; Timer of 5 minutes starts when you start your Quiz.
            </div>
            <div>
              &#x2022; Quiz will be automatically submitted once timer runs out.
            </div>
            <div>
              &#x2022; All questions must be answered ( No negative marks ).
            </div>
            <div>
              &#x2022; You cannot move back to previous question.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
