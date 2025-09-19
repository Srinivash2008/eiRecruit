import { Routes, Route } from 'react-router-dom';
import SinglePage from '../pages/SinglePage';
import About from '../pages/About';
import Services from '../pages/Services';
import Careers from '../pages/Careers';
import Contact from '../pages/Contact';
import CurrentOpenings from '../pages/CurrentOpenings';
import Dashboard from '../pages/DashBoard';
import NotFound from '../pages/NotFound';
import Login from '../pages/Authentication/Login';
import Signup from '../pages/Authentication/Signup';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SinglePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/CurrentOpenings" element={<CurrentOpenings />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
} 