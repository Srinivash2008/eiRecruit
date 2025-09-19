// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function ProtectedRoute({ children }) {
  const token = Cookies.get("token"); 

  // If not logged in, redirect to login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children; // allow access
}
