import React, { useState , createContext, useContext } from 'react'

export default function useValues() {
  return useContext(DataContext)
}

const DataContext = createContext()

export function ContextProvider( { children } ) {
  const [playerName, setPlayerName] = useState("");
  const [categories, setCategories] = useState([]);
  const [questionsFetchUrl, setQuestionsFetchUrl] = useState("");
  const [questions, setQuestions] = useState([]);
  const [time, setTime] = useState(0)

  return (
  <DataContext.Provider value={ {
    playerName , setPlayerName ,
    categories , setCategories ,
    questionsFetchUrl , setQuestionsFetchUrl ,
    questions , setQuestions ,
    time , setTime
  }}>
    { children }
  </DataContext.Provider>
  )
}
