import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage";
import Quiz from "./Components/Quiz";
import Question from "./Components/Question";
import Score from "./Components/Score";
import MissingPage from "./Components/MissingPage";
import QuestionsLoading from "./Components/QuestionsLoading";
import ProtectedNameRoute from "./Components/ProtectedNameRoute";
import ProtectedQuizRoute from "./Components/ProtectedQuizRoute";
import ProtectedQuestionsLoading from "./Components/ProtectedQuestionsLoading";

const App = () => {

  return (
    <Routes>
      <Route path="/" element={
        <ProtectedNameRoute>
          <HomePage />
        </ProtectedNameRoute>
      } />
      <Route path="/quiz" element={
        <ProtectedQuizRoute>
          <Quiz/>
        </ProtectedQuizRoute>          
      } />
      <Route path="/questionsloading" element={
        <ProtectedQuestionsLoading>
          <QuestionsLoading />
        </ProtectedQuestionsLoading>
      } />
      <Route
        path="/question/:id"
        element={
          // <ProtectedQuestionRoute 
            // questions={questions}
            // >
            <Question 
              // questions={questions} 
              />
          // </ProtectedQuestionRoute>
        }
      />
      <Route
        path="/score"
        element={<Score 
          // questions={questions} playerName={playerName} 
          />}
      />
      <Route path="/*" element={<MissingPage />} />
    </Routes>
  );
};

export default App;
