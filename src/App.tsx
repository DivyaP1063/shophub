import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from '@/store';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { closeAuthModal } from '@/store/authModalSlice';
import { AuthProvider } from "@/contexts/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/Cart";
import WishlistPage from "./pages/Wishlist";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import NotFound from "./pages/NotFound";
import SellerProducts from "./pages/seller/SellerProducts";
import SellerSales from "./pages/seller/SellerSales";
import SellerAnalytics from "./pages/seller/SellerAnalytics";
import SellerProfile from "./pages/seller/SellerProfile";
import BuyerOrders from "./pages/buyer/BuyerOrders";
import BuyerProfile from "./pages/buyer/BuyerProfile";
import Layout from "./pages/Layout";
import Admin from "./pages/Admin";
import AdminRegister from "./pages/AdminRegister";
import { GoogleOAuthProvider } from '@react-oauth/google';
import SellerOrders from "./pages/seller/SellerOrders";
import AuthModal from "./components/Authmodal";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import ScrollToTop from "./lib/ScrollToTop";

const queryClient = new QueryClient();
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// App Content Component to access Redux state
const AppContent = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector(state => state.authModal);

  return (
    <>
    <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="aboutus" element={<AboutUs />} />
          <Route path="contactus" element={<ContactUs />} />
          <Route path="login" element={<Login />} />
          <Route path="Admin" element={<Admin />} />
          <Route path="register" element={<Register />} />
          <Route path="Adminregister" element={<AdminRegister />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="wishlist" element={<WishlistPage />} />
          <Route path="seller/products/new" element={<AddProduct />} />
          <Route path="seller/products/:id/edit" element={<EditProduct />} />
          <Route path="seller/products" element={<SellerProducts />} />
          <Route path="seller/sales" element={<SellerSales />} />
          <Route path="seller/orders" element={<SellerOrders />} />
          {/* <Route path="seller/analytics" element={<SellerAnalytics />} /> */}
          <Route path="seller/profile" element={<SellerProfile />} />
          {/* Buyer Routes */}
          <Route path="buyer/orders" element={<BuyerOrders />} />
          <Route path="buyer/profile" element={<BuyerProfile />} />
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      
      {/* Global Auth Modal */}
      <AuthModal
        isOpen={isOpen}
        onClose={() => dispatch(closeAuthModal())}
      />
    </>
  );
};

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <GoogleOAuthProvider clientId={clientId}>
            <BrowserRouter>
              <AppContent />
            </BrowserRouter>
          </GoogleOAuthProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;