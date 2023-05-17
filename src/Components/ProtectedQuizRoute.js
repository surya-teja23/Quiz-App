import { Navigate } from "react-router-dom";
import useValues from "../Context/DataContext";

const ProtectedQuizRoute = ({ children }) => {
  const { playerName , questionsFetchUrl } = useValues();
  if (!playerName) return <Navigate to="/" />;
  else if(questionsFetchUrl) return <Navigate to="/questionsloading" />;
  return children;
};

export default ProtectedQuizRoute;
