import { Routes, Route } from "react-router-dom";
import SinglePage from "../pages/SinglePage";  
import Login from "../pages/Authentication/Login"; 
import Signup from "../pages/Authentication/Signup"
import Dashboard from "../pages/Dashboard"; 
import NotFound from "../pages/NotFound";
import ProtectedRoute from "../components/ProtectedRoute";
import PublicRoute from "../components/PublicRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes (only when NOT logged in) */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
       <Route
        path="/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />

      {/* Always public */}
      <Route path="/" element={<SinglePage />} />

      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Catch all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
