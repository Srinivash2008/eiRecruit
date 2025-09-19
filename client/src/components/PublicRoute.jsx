import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function PublicRoute({ children }) {
  const token = Cookies.get("token"); 

  if (token) {
    return <Navigate to="/" replace />;
  }

  return children;
}
