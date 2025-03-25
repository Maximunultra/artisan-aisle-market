
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IndexPage from './pages/Index';
import AboutPage from './pages/About';
import ProductsPage from './pages/Products';
import CartPage from './pages/Cart';
import CheckoutPage from './pages/Checkout';
import SignInPage from './pages/SignIn';
import SignUpPage from './pages/SignUp';
import ForgotPasswordPage from './pages/ForgotPassword';
import NotFoundPage from './pages/NotFound';
import DashboardPage from './pages/Dashboard';
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    // Any global app initialization can go here
  }, []);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
