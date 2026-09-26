import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logoImg from "../assets/logo.png"; // Reference logo image

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="w-full bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
        {/* Brand Logo Header */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logoImg} alt="MarketLink Logo" className="h-10 w-auto object-contain" />
          <span className="text-xl font-black text-[#2D4222] hidden sm:inline">
            Market<span className="text-[#42612F]">Link</span>
          </span>
        </Link>

        {/* Public Navigation Links */}
        <div className="flex items-center gap-6 text-xs font-semibold text-slate-700">
          <Link to="/" className="hover:text-[#42612F] transition-colors">
            Home
          </Link>
          <Link to="/markets" className="hover:text-[#42612F] transition-colors">
            Markets
          </Link>
          <Link to="/farmers" className="hover:text-[#42612F] transition-colors">
            Farmers
          </Link>
          <Link to="/products" className="hover:text-[#42612F] transition-colors">
            Products
          </Link>
          <Link to="/about" className="hover:text-[#42612F] transition-colors">
            About
          </Link>
          <Link to="/contact" className="hover:text-[#42612F] transition-colors">
            Contact
          </Link>

          {/* User Auth Action Links */}
          {!isAuthenticated ? (
            <div className="flex items-center gap-2 pl-4 border-l border-slate-200">
              <Link
                to="/login"
                className="px-4 py-2 text-xs font-bold text-slate-700 hover:text-[#42612F]"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-lg bg-[#42612F] hover:bg-[#344E25] text-white text-xs font-bold transition-all shadow-sm"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4 pl-4 border-l border-slate-200">
              {user?.role === "customer" && (
                <>
                  <Link to="/dashboard" className="hover:text-[#42612F]">Dashboard</Link>
                  <Link to="/cart" className="hover:text-[#42612F]">Cart</Link>
                  <Link to="/orders" className="hover:text-[#42612F]">Orders</Link>
                </>
              )}

              {user?.role === "farmer" && (
                <>
                  <Link to="/farmer" className="hover:text-[#42612F]">Farmer Dashboard</Link>
                  <Link to="/farmer/products" className="hover:text-[#42612F]">My Products</Link>
                </>
              )}

              {user?.role === "admin" && (
                <Link to="/admin" className="hover:text-[#42612F]">Admin</Link>
              )}

              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;