import { Routes, Route } from "react-router-dom";
import SinglePage from "../pages/SinglePage";
import Login from "../pages/Authentication/Login";
import Signup from "../pages/Authentication/Signup";
import DummyComponent from "../pages/dummy";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "../components/ProtectedRoute";
import PublicRoute from "../components/PublicRoute";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/DashBoard";
import CurrentOpenings from "../pages/CurrentOpenings";
import  SubmittedQuery from "../pages/SubmittedQuery";


export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
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

      {/* Protected routes with shared AdminLayout */}
      <Route
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        {/* 👇 everything here will have Header + Footer */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/CurrentOpenings" element={<CurrentOpenings />} />
         <Route path="/submittedquery" element={<SubmittedQuery />} />
      </Route>

      {/* Catch all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

