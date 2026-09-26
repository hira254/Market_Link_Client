import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import logoImg from "../../assets/logo.png";

import {
  LayoutDashboard,
  Users,
  UserCheck,
  Store,
  Package,
  Star,
  FolderTree,
  BarChart3,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  LogOut,
  ShoppingBag,
  Clock,
  TrendingUp
} from "lucide-react";

function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchCustomers = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:4000/api/admin/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const customerUsers = (response.data.users || []).filter(
        (user) => user.role === "customer"
      );

      setCustomers(customerUsers);
    } catch (error) {
      console.log(
        "CUSTOMERS ERROR:",
        error.response?.data || error.message
      );

      setMessage(
        error.response?.data?.message ||
          "Failed to fetch customers."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const updateStatus = async (customerId, status) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `http://localhost:4000/api/admin/users/${customerId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(
        response.data.message ||
          "Customer status updated successfully."
      );

      fetchCustomers();
    } catch (error) {
      console.log(
        "STATUS ERROR:",
        error.response?.data || error.message
      );

      setMessage(
        error.response?.data?.message ||
          "Failed to update customer status."
      );
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">Active</span>;
      case "inactive":
        return <span className="bg-rose-100 text-rose-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">Inactive</span>;
      default:
        return <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">Active</span>;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#0F172A] flex font-sans">
      
      {/* Admin Sidebar */}
      <aside className="w-64 bg-[#1E56A0] text-white min-h-screen p-6 flex flex-col justify-between shrink-0 shadow-lg">
        <div>
          {/* Brand Header */}
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
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-blue-100 hover:bg-white/10 hover:text-white transition-all"
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
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#163172] text-white shadow-sm transition-all"
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

      {/* Main Workspace */}
      <main className="flex-1 p-8 lg:p-10 max-w-6xl mx-auto space-y-8 overflow-y-auto">
        
        {/* Top Section Banner */}
        <div className="bg-white border border-[#EFECE6] p-6 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-stone-400">
              ADMIN CONTROL
            </span>
            <h1 className="text-3xl font-black text-[#0F172A] tracking-tight">
              Manage Customers
            </h1>
            <p className="text-xs font-medium text-stone-500 mt-1">
              A polished working section for manage customers, ready for live API and database wiring.
            </p>
          </div>

          <Link
            to="/admin"
            className="px-4 py-2 bg-[#1E56A0] hover:bg-[#163172] text-white text-xs font-bold rounded-xl transition shadow-sm self-start md:self-auto"
          >
            ← Dashboard
          </Link>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-[#EFECE6] p-4 rounded-2xl shadow-sm space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-stone-400">Total Customers</span>
            <div className="text-2xl font-black text-[#0F172A]">{customers.length}</div>
            <p className="text-[11px] text-stone-400 font-medium">Registered buyers</p>
          </div>

          <div className="bg-white border border-[#EFECE6] p-4 rounded-2xl shadow-sm space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-stone-400">Active Status</span>
            <div className="text-2xl font-black text-emerald-600">
              {customers.filter((c) => (c.status || "active") === "active").length}
            </div>
            <p className="text-[11px] text-stone-400 font-medium">Verified accounts</p>
          </div>

          <div className="bg-white border border-[#EFECE6] p-4 rounded-2xl shadow-sm space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-stone-400">Inactive Status</span>
            <div className="text-2xl font-black text-rose-600">
              {customers.filter((c) => c.status === "inactive").length}
            </div>
            <p className="text-[11px] text-stone-400 font-medium">Deactivated accounts</p>
          </div>

          <div className="bg-white border border-[#EFECE6] p-4 rounded-2xl shadow-sm space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-stone-400">Platform Access</span>
            <div className="text-2xl font-black text-[#1E56A0]">100%</div>
            <p className="text-[11px] text-stone-400 font-medium">System uptime</p>
          </div>
        </div>

        {/* System Message */}
        {message && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{message}</span>
          </div>
        )}

        {/* Customer Feed */}
        {loading ? (
          <div className="bg-white border border-[#EFECE6] rounded-2xl p-10 text-center text-xs font-semibold text-stone-400">
            Loading customer accounts...
          </div>
        ) : customers.length === 0 ? (
          <div className="bg-white border border-[#EFECE6] rounded-2xl p-12 text-center space-y-2">
            <Users className="w-10 h-10 text-stone-300 mx-auto" />
            <p className="text-sm font-bold text-stone-700">No Customers Found</p>
            <p className="text-xs text-stone-400">Registered marketplace customer accounts will appear here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {customers.map((customer) => (
              <div
                key={customer._id}
                className="bg-white border border-[#EFECE6] rounded-2xl p-6 shadow-sm space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-[#1E56A0] font-black flex items-center justify-center text-sm border border-blue-100">
                      {customer.name ? customer.name.charAt(0).toUpperCase() : "U"}
                    </div>
                    <div>
                      <h2 className="text-base font-extrabold text-[#0F172A]">
                        {customer.name}
                      </h2>
                      <p className="text-xs text-stone-400 font-medium">Customer Account</p>
                    </div>
                  </div>

                  <div>{getStatusBadge(customer.status)}</div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="bg-[#FAF9F6] p-3 rounded-xl border border-stone-200/50 space-y-1">
                    <span className="text-[10px] font-bold text-stone-400 uppercase flex items-center gap-1">
                      <Mail className="w-3 h-3" /> Email Address
                    </span>
                    <p className="font-semibold text-stone-800 truncate">{customer.email}</p>
                  </div>

                  <div className="bg-[#FAF9F6] p-3 rounded-xl border border-stone-200/50 space-y-1">
                    <span className="text-[10px] font-bold text-stone-400 uppercase flex items-center gap-1">
                      <Phone className="w-3 h-3" /> Contact Phone
                    </span>
                    <p className="font-semibold text-stone-800">{customer.phone || "Not provided"}</p>
                  </div>

                  <div className="bg-[#FAF9F6] p-3 rounded-xl border border-stone-200/50 space-y-1">
                    <span className="text-[10px] font-bold text-stone-400 uppercase flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> Delivery Address
                    </span>
                    <p className="font-semibold text-stone-800 truncate">{customer.address || "Not provided"}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between flex-wrap gap-2">
                  <span className="text-xs text-stone-400 font-medium">
                    Modify account state:
                  </span>

                  <div className="flex items-center gap-2">
                    {customer.status !== "active" && (
                      <button
                        onClick={() => updateStatus(customer._id, "active")}
                        className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition inline-flex items-center gap-1.5 shadow-sm"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" /> Activate
                      </button>
                    )}

                    {customer.status !== "inactive" && (
                      <button
                        onClick={() => updateStatus(customer._id, "inactive")}
                        className="px-3.5 py-1.5 bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 text-xs font-bold rounded-xl transition inline-flex items-center gap-1.5"
                      >
                        <XCircle className="w-3.5 h-3.5" /> Deactivate
                      </button>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}

export default AdminCustomers;