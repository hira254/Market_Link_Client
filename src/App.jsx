import { Routes, Route, Navigate, Outlet } from "react-router-dom";

// Auth
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";

// Common Components / Layouts
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import CustomerNotifications from "./pages/customer/CustomerNotifications";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

// Customer - PUBLIC browsing
import CustomerProfile from "./pages/customer/CustomerProfile";
import Products from "./pages/customer/Products";
import ProductDetails from "./pages/customer/ProductDetails";
import Farmers from "./pages/customer/Farmers";
import FarmerDetails from "./pages/customer/FarmerDetails";
import Markets from "./pages/customer/Markets";
import MarketDetails from "./pages/customer/MarketDetails";

// Customer - PROTECTED
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import Cart from "./pages/customer/Cart";
import Checkout from "./pages/customer/Checkout";
import Orders from "./pages/customer/Orders";
import Favorites from "./pages/customer/Favorites";
import AIChatbot from "./components/AIChatbot";

// Farmer
import FarmerDashboard from "./pages/farmer/FarmerDashboard";
import FarmerProducts from "./pages/farmer/FarmerProducts";
import FarmerProfile from "./pages/farmer/FarmerProfile";
import FarmerOrders from "./pages/farmer/FarmerOrders";
import FarmerOrderHistory from "./pages/farmer/FarmerOrderHistory";
import FarmerReviews from "./pages/farmer/FarmerReviews";

// Admin
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminFarmers from "./pages/admin/AdminFarmers";
import AdminCustomers from "./pages/admin/AdminCustomers";
import AdminMarkets from "./pages/admin/AdminMarkets";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminReviews from "./pages/admin/AdminReviews";

import ProtectedRoute from "./components/ProtectedRoute";

import "./index.css";
import AdminReports from "./pages/admin/AdminReports";
import AdminCategories from "./pages/admin/AdminCategories";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomerFamilySharing from "./pages/customer/CustomerFamilySharing";

import ProductReviews from "./components/reviews/ProductReviews";

// 1. PUBLIC LAYOUT (Navbar top par hoga)
const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5]">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

// 2. CUSTOMER DASHBOARD LAYOUT (Sidebar left par hoga)
const CustomerLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#FBF9F5]">
      <Sidebar />
      <main className="flex-1 min-w-0 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

function App() {
  return (
    <>
      <Routes>
        {/* ================= PUBLIC ROUTES WITH NAVBAR ================= */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/review" element={<ProductReviews />} />

          {/* Public Customer Browsing */}
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/farmers" element={<Farmers />} />
          <Route path="/farmers/:id" element={<FarmerDetails />} />
          <Route path="/markets" element={<Markets />} />
          <Route path="/markets/:id" element={<MarketDetails />} />
        </Route>

        {/* Auth Pages (Without Navbar/Sidebar) */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* ================= CUSTOMER PROTECTED ROUTES WITH SIDEBAR ================= */}
        <Route
          element={
            <ProtectedRoute>
              <CustomerLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<CustomerDashboard />} />
          <Route path="/profile" element={<CustomerProfile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/notifications" element={<CustomerNotifications />} />
          <Route path="/customer/family" element={<CustomerFamilySharing />} />
        </Route>

        {/* ================= FARMER PROTECTED ================= */}
        <Route
          path="/farmer"
          element={
            <ProtectedRoute>
              <FarmerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/farmer/dashboard"
          element={
            <ProtectedRoute>
              <FarmerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/farmer/profile"
          element={
            <ProtectedRoute>
              <FarmerProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/farmer/products"
          element={
            <ProtectedRoute>
              <FarmerProducts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/farmer/orders"
          element={
            <ProtectedRoute>
              <FarmerOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/farmer/history"
          element={
            <ProtectedRoute>
              <FarmerOrderHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/farmer/reviews"
          element={
            <ProtectedRoute>
              <FarmerReviews />
            </ProtectedRoute>
          }
        />

        {/* ================= ADMIN PROTECTED ================= */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/farmers"
          element={
            <ProtectedRoute>
              <AdminFarmers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/customers"
          element={
            <ProtectedRoute>
              <AdminCustomers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/markets"
          element={
            <ProtectedRoute>
              <AdminMarkets />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute>
              <AdminProducts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reviews"
          element={
            <ProtectedRoute>
              <AdminReviews />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute>
              <AdminReports />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <ProtectedRoute>
              <AdminCategories />
            </ProtectedRoute>
          }
        />

        {/* ================= FALLBACK ================= */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
      <AIChatbot />
    </>
  );
}

export default App;