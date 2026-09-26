import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logoImg from "../../assets/logo.png";

import {
  LayoutDashboard,
  Users,
  UserCheck,
  Store,
  Package,
  ShoppingBag,
  Star,
  FolderTree,
  BarChart3,
  Bell,
  Clock,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Megaphone,
  ArrowUpRight,
  LogOut,
  TrendingUp
} from "lucide-react";

function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:4000/api/admin/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStats(response.data);
    } catch (error) {
      console.log(
        "ADMIN DASHBOARD ERROR:",
        error.response?.data || error.message
      );

      setMessage(
        error.response?.data?.message || "Failed to load dashboard."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#0F172A] flex font-sans">
      
      {/* Blue Admin Sidebar */}
      <aside className="w-64 bg-[#1E56A0] text-white min-h-screen p-6 flex flex-col justify-between shrink-0 shadow-lg">
        <div>
          {/* Logo Brand Header */}
          <div className="flex items-center gap-3 pb-6 mb-6 border-b border-white/10">
            {logoImg ? (
              <img src={logoImg} alt="MarketLink Logo" className="h-9 object-contain" />
            ) : (
              <div className="w-9 h-9 rounded-xl bg-white text-[#1E56A0] font-black flex items-center justify-center">
                ML
              </div>
            )}
            <div>
              <h2 className="text-lg font-black tracking-tight leading-none text-white">
                MarketLink
              </h2>
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-200">
                Admin Console
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            <Link
              to="/admin"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#163172] text-white shadow-sm transition-all"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>

            <Link
              to="/admin/farmers"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-blue-100 hover:bg-white/10 hover:text-white transition-all"
            >
              <UserCheck className="w-4 h-4" />
              <span>Farmers</span>
            </Link>

            <Link
              to="/admin/customers"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-blue-100 hover:bg-white/10 hover:text-white transition-all"
            >
              <Users className="w-4 h-4" />
              <span>Customers</span>
            </Link>

            <Link
              to="/admin/markets"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-blue-100 hover:bg-white/10 hover:text-white transition-all"
            >
              <Store className="w-4 h-4" />
              <span>Markets</span>
            </Link>

            <Link
              to="/admin/products"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-blue-100 hover:bg-white/10 hover:text-white transition-all"
            >
              <Package className="w-4 h-4" />
              <span>Products</span>
            </Link>

            <Link
              to="/admin/reviews"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-blue-100 hover:bg-white/10 hover:text-white transition-all"
            >
              <Star className="w-4 h-4" />
              <span>Reviews</span>
            </Link>

            <Link
              to="/admin/categories"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-blue-100 hover:bg-white/10 hover:text-white transition-all"
            >
              <FolderTree className="w-4 h-4" />
              <span>Categories</span>
            </Link>

            <Link
              to="/admin/reports"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-blue-100 hover:bg-white/10 hover:text-white transition-all"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Reports</span>
            </Link>
          </nav>
        </div>

        {/* Sidebar Footer Link */}
        <div className="pt-4 border-t border-white/10">
          <Link
            to="/"
            className="text-xs font-semibold text-blue-100 hover:text-white transition-all flex items-center justify-between"
          >
            <span>Exit Console</span>
            <LogOut className="w-3.5 h-3.5" />
          </Link>
        </div>
      </aside>

      {/* Main Content Workspace */}
      <main className="flex-1 p-8 lg:p-10 max-w-7xl mx-auto space-y-8 overflow-y-auto">
        
        {/* Top App Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200/80 pb-5">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-stone-400">
              PLATFORM CONTROL
            </span>
            <h1 className="text-3xl font-black text-[#0F172A] tracking-tight">
              Admin Dashboard
            </h1>
            <p className="text-xs font-medium text-stone-500 mt-0.5">
              Manage the entire MarketLink marketplace from one place.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="px-5 py-2.5 bg-[#1E56A0] hover:bg-[#163172] text-white font-bold text-xs rounded-xl shadow-sm transition-all"
            >
              Preview Store
            </button>
          </div>
        </div>

        {/* System Error Message */}
        {message && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs font-semibold text-rose-800">
            <strong>Notification:</strong> {message}
          </div>
        )}

        {loading ? (
          <div className="bg-white border border-[#EFECE6] rounded-2xl p-10 text-center text-xs font-semibold text-stone-400">
            Loading platform statistics...
          </div>
        ) : stats ? (
          <>
            {/* Core KPI Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="bg-white border border-[#EFECE6] p-5 rounded-2xl shadow-sm space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-stone-400">
                  Total Customers
                </span>
                <div className="flex items-baseline justify-between">
                  <h2 className="text-3xl font-black text-[#0F172A]">
                    {stats.users?.customers || 0}
                  </h2>
                  <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Active
                  </span>
                </div>
                <p className="text-xs text-stone-400 font-medium">Registered buyers</p>
              </div>

              <div className="bg-white border border-[#EFECE6] p-5 rounded-2xl shadow-sm space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-stone-400">
                  Total Farmers
                </span>
                <div className="flex items-baseline justify-between">
                  <h2 className="text-3xl font-black text-[#0F172A]">
                    {stats.users?.farmers || 0}
                  </h2>
                  <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                    Growers
                  </span>
                </div>
                <p className="text-xs text-stone-400 font-medium">Verified local producers</p>
              </div>

              <div className="bg-white border border-[#EFECE6] p-5 rounded-2xl shadow-sm space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-stone-400">
                  Active Products
                </span>
                <div className="flex items-baseline justify-between">
                  <h2 className="text-3xl font-black text-[#0F172A]">
                    {stats.products?.total || 0}
                  </h2>
                  <span className="text-[11px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                    Listings
                  </span>
                </div>
                <p className="text-xs text-stone-400 font-medium">Produce items in market</p>
              </div>

              <div className="bg-white border border-[#EFECE6] p-5 rounded-2xl shadow-sm space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-stone-400">
                  Total Orders
                </span>
                <div className="flex items-baseline justify-between">
                  <h2 className="text-3xl font-black text-[#0F172A]">
                    {stats.orders?.total || 0}
                  </h2>
                  <span className="text-[11px] font-semibold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                    All-time
                  </span>
                </div>
                <p className="text-xs text-stone-400 font-medium">Completed & pending orders</p>
              </div>

            </div>

            {/* Marketplace Section Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <Link
                to="/admin/farmers"
                className="bg-white border border-[#EFECE6] hover:border-blue-300 p-6 rounded-2xl shadow-sm transition group space-y-3 block"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1E56A0] flex items-center justify-center font-bold">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#0F172A] group-hover:text-[#1E56A0] transition">
                    Farmers
                  </h3>
                  <p className="text-xs text-stone-500 font-medium">
                    Approve profiles & manage sellers
                  </p>
                </div>
                <span className="text-xs font-bold text-[#1E56A0] inline-flex items-center gap-1">
                  Open <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </Link>

              <Link
                to="/admin/customers"
                className="bg-white border border-[#EFECE6] hover:border-blue-300 p-6 rounded-2xl shadow-sm transition group space-y-3 block"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#0F172A] group-hover:text-emerald-700 transition">
                    Customers
                  </h3>
                  <p className="text-xs text-stone-500 font-medium">
                    Manage buyer accounts & access
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-700 inline-flex items-center gap-1">
                  Open <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </Link>

              <Link
                to="/admin/products"
                className="bg-white border border-[#EFECE6] hover:border-blue-300 p-6 rounded-2xl shadow-sm transition group space-y-3 block"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#0F172A] group-hover:text-amber-700 transition">
                    Products
                  </h3>
                  <p className="text-xs text-stone-500 font-medium">
                    Moderate listings & inventory
                  </p>
                </div>
                <span className="text-xs font-bold text-amber-700 inline-flex items-center gap-1">
                  Open <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </Link>

              <Link
                to="/admin/reports"
                className="bg-white border border-[#EFECE6] hover:border-blue-300 p-6 rounded-2xl shadow-sm transition group space-y-3 block"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#0F172A] group-hover:text-purple-700 transition">
                    Orders & Reports
                  </h3>
                  <p className="text-xs text-stone-500 font-medium">
                    Monitor sales activity & statistics
                  </p>
                </div>
                <span className="text-xs font-bold text-purple-700 inline-flex items-center gap-1">
                  Open <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </Link>

              <Link
                to="/admin/markets"
                className="bg-white border border-[#EFECE6] hover:border-blue-300 p-6 rounded-2xl shadow-sm transition group space-y-3 block"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
                  <Store className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#0F172A] group-hover:text-indigo-700 transition">
                    Markets
                  </h3>
                  <p className="text-xs text-stone-500 font-medium">
                    Create & edit market locations
                  </p>
                </div>
                <span className="text-xs font-bold text-indigo-700 inline-flex items-center gap-1">
                  Open <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </Link>

              <Link
                to="/admin/reviews"
                className="bg-white border border-[#EFECE6] hover:border-blue-300 p-6 rounded-2xl shadow-sm transition group space-y-3 block"
              >
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center font-bold">
                  <Star className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#0F172A] group-hover:text-rose-700 transition">
                    Reviews
                  </h3>
                  <p className="text-xs text-stone-500 font-medium">
                    Moderate customer ratings
                  </p>
                </div>
                <span className="text-xs font-bold text-rose-700 inline-flex items-center gap-1">
                  Open <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </Link>

              <Link
                to="/admin/categories"
                className="bg-white border border-[#EFECE6] hover:border-blue-300 p-6 rounded-2xl shadow-sm transition group space-y-3 block"
              >
                <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center font-bold">
                  <FolderTree className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#0F172A] group-hover:text-stone-900 transition">
                    Categories
                  </h3>
                  <p className="text-xs text-stone-500 font-medium">
                    Organize product taxonomy
                  </p>
                </div>
                <span className="text-xs font-bold text-stone-700 inline-flex items-center gap-1">
                  Open <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </Link>

            </div>
          </>
        ) : null}

      </main>
    </div>
  );
}

export default AdminDashboard;