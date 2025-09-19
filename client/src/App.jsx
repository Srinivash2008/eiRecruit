import Header from './components/Header';
import AppRoutes from './routes/AppRoutes';
import Footer from './components/Footer';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <AppRoutes />
      <Footer />
         <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  );
}
