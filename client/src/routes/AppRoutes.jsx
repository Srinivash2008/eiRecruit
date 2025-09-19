import { Routes, Route } from "react-router-dom";
import SinglePage from "../pages/SinglePage";  // Public landing
import Login from "../pages/Authentication/Login"; // Public login
import Dashboard from "../pages/Dashboard"; // Protected
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
