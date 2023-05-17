import { Navigate } from "react-router-dom";
import useValues from "../Context/DataContext";

const ProtectedNameRoute = ({ children }) => {
  const { playerName } = useValues()
  if (playerName) return <Navigate to="/quiz" />;
  return children;
};

export default ProtectedNameRoute;