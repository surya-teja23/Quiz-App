import { Navigate } from "react-router-dom";
import useValues from "../Context/DataContext";

const ProtectedQuestionsLoading = ( { children }) => {
  const { questions , questionsFetchUrl } = useValues();
  if (!questionsFetchUrl) return <Navigate to="/quiz" />;
  else if (questions.length) return <Navigate to="/question/1" />;
  return children;
}

export default ProtectedQuestionsLoading
