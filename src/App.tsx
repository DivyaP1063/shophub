import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from '@/store';
import { AuthProvider } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/Cart";
import WishlistPage from "./pages/Wishlist";
import SellerDashboard from "./pages/SellerDashboard";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import NotFound from "./pages/NotFound";
import SellerProducts from "./pages/seller/SellerProducts";
import SellerSales from "./pages/seller/SellerSales";
import SellerAnalytics from "./pages/seller/SellerAnalytics";
import SellerProfile from "./pages/seller/SellerProfile";
import BuyerOrders from "./pages/buyer/BuyerOrders";
import BuyerProfile from "./pages/buyer/BuyerProfile";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/seller/dashboard" element={<SellerDashboard />} />
              <Route path="/seller/products/new" element={<AddProduct />} />
              <Route path="/seller/products/:id/edit" element={<EditProduct />} />
              <Route path="/seller/products" element={<SellerProducts />} />
              <Route path="/seller/sales" element={<SellerSales />} />
              <Route path="/seller/analytics" element={<SellerAnalytics />} />
              <Route path="/seller/profile" element={<SellerProfile />} />
              
              {/* Buyer Routes */}
              <Route path="/buyer/orders" element={<BuyerOrders />} />
              <Route path="/buyer/profile" element={<BuyerProfile />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;