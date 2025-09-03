import Header from './components/Header';
import AppRoutes from './routes/AppRoutes';
import Footer from './components/Footer';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <AppRoutes />
      <Footer />
    </BrowserRouter>
  );
}
