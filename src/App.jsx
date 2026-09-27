import { Routes, Route, Navigate } from "react-router-dom";

// Auth
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";

// Common
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
function App() {
  return (
     <>
    <Routes>



<Route path="/customer/family" element={<CustomerFamilySharing />} />
      {/* ================= PUBLIC ================= */}
<Route
  path="/notifications"
  element={<CustomerNotifications />}
/>
      <Route path="/" element={<Home />} />
 <Route path="/product/review" element={<ProductReviews />} />
      <Route path="/about" element={<About />} />

      <Route path="/contact" element={<Contact />} />

      <Route path="/register" element={<Register />} />

      <Route path="/login" element={<Login />} />


      {/* ================= PUBLIC CUSTOMER BROWSING ================= */}
<Route path="/profile" element={<CustomerProfile />} />
      {/* Products */}
      <Route
        path="/products"
        element={<Products />}
      />

      {/* Product Details */}
      <Route
        path="/products/:id"
        element={<ProductDetails />}
      />

      {/* Farmers */}
      <Route
        path="/farmers"
        element={<Farmers />}
      />

      {/* Farmer Details */}
      <Route
        path="/farmers/:id"
        element={<FarmerDetails />}
      />

      {/* Markets */}
      <Route
        path="/markets"
        element={<Markets />}
      />

      {/* Market Details */}
      <Route
        path="/markets/:id"
        element={<MarketDetails />}
      />


      {/* ================= CUSTOMER PROTECTED ================= */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <CustomerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />

      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />

      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        }
      />

      <Route
        path="/favorites"
        element={
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        }
      />


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

  element={ <ProtectedRoute><FarmerProfile /></ProtectedRoute>}
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

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
    <ToastContainer
      position="top-right"
      autoClose={3000}
    />
    <> <AIChatbot /> </>
   </>
  );
}

export default App;