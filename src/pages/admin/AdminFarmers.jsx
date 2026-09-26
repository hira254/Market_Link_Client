import { useEffect, useState } from "react";
import axiosInstance from "../../utils/BaseUrl";

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
  Clock,
  ArrowLeft,
  Mail,
  MapPin,
  Phone,
  ShieldAlert,
  LogOut,
  ShoppingBag
} from "lucide-react";

function AdminFarmers() {
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchFarmers = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axiosInstance.get(
        "/api/admin/farmers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFarmers(response.data.farmers || []);
    } catch (error) {
      console.log(
        "FARMERS ERROR:",
        error.response?.data || error.message
      );

      setMessage(
        error.response?.data?.message ||
          "Failed to fetch farmers."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFarmers();
  }, []);

  const updateStatus = async (farmerId, status) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axiosInstance.put(
        `/api/admin/farmers/${farmerId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(
        response.data.message ||
          "Farmer status updated successfully."
      );

      fetchFarmers();
    } catch (error) {
      console.log(
        "STATUS ERROR:",
        error.response?.data || error.message
      );

      setMessage(
        error.response?.data?.message ||
          "Failed to update farmer status."
      );
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">Approved</span>;
      case "suspended":
        return <span className="bg-rose-100 text-rose-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">Suspended</span>;
      case "pending":
      default:
        return <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">Pending</span>;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#0F172A] flex font-sans">
      
      {/* Blue Sidebar */}
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

          {/* Navigation */}
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
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#163172] text-white shadow-sm transition-all"
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
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200/80 pb-5">
          <div>
            <Link
              to="/admin"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-900 transition mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
            </Link>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-stone-400 block">
              ADMIN CONTROL
            </span>
            <h1 className="text-3xl font-black text-[#0F172A] tracking-tight">
              Manage Farmers
            </h1>
          </div>

          <div className="bg-white border border-[#EFECE6] px-4 py-2 rounded-xl shadow-sm text-xs font-semibold text-stone-600">
            Total Growers: <strong>{farmers.length}</strong>
          </div>
        </div>

        {/* Feedback Message */}
        {message && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{message}</span>
          </div>
        )}

        {/* Farmers Feed */}
        {loading ? (
          <div className="bg-white border border-[#EFECE6] rounded-2xl p-10 text-center text-xs font-semibold text-stone-400">
            Loading registered farmers...
          </div>
        ) : farmers.length === 0 ? (
          <div className="bg-white border border-[#EFECE6] rounded-2xl p-12 text-center space-y-2">
            <UserCheck className="w-10 h-10 text-stone-300 mx-auto" />
            <p className="text-sm font-bold text-stone-700">No Farmers Found</p>
            <p className="text-xs text-stone-400">Registered grower applications will be displayed here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {farmers.map((farmer) => (
              <div
                key={farmer._id}
                className="bg-white border border-[#EFECE6] rounded-2xl p-6 shadow-sm space-y-4"
              >
                {/* Card Title & Status */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-4">
                  <div>
                    <h2 className="text-base font-extrabold text-[#0F172A]">
                      {farmer.stallName || "Unnamed Stall"}
                    </h2>
                    <p className="text-xs text-stone-400">
                      Primary Contact: <span className="text-stone-700 font-semibold">{farmer.contactPerson || "N/A"}</span>
                    </p>
                  </div>

                  <div>{getStatusBadge(farmer.approvalStatus)}</div>
                </div>

                {/* Details Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  
                  <div className="bg-[#FAF9F6] p-3 rounded-xl border border-stone-200/50 space-y-1">
                    <span className="text-[10px] font-bold text-stone-400 uppercase flex items-center gap-1">
                      <Mail className="w-3 h-3" /> User Account
                    </span>
                    <p className="font-bold text-[#0F172A]">{farmer.userId?.name || "N/A"}</p>
                    <p className="text-stone-500 font-medium truncate">{farmer.userId?.email || "N/A"}</p>
                  </div>

                  <div className="bg-[#FAF9F6] p-3 rounded-xl border border-stone-200/50 space-y-1">
                    <span className="text-[10px] font-bold text-stone-400 uppercase flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> Location & Address
                    </span>
                    <p className="font-semibold text-stone-800">{farmer.address || "No address provided"}</p>
                  </div>

                  <div className="bg-[#FAF9F6] p-3 rounded-xl border border-stone-200/50 space-y-1">
                    <span className="text-[10px] font-bold text-stone-400 uppercase flex items-center gap-1">
                      <Store className="w-3 h-3" /> Markets Assigned
                    </span>
                    <p className="font-extrabold text-blue-800">{farmer.markets?.length || 0} Registered Locations</p>
                  </div>

                </div>

                {/* Status Update Actions */}
                <div className="pt-2 border-t border-stone-100 flex items-center justify-between flex-wrap gap-2">
                  <span className="text-xs text-stone-400 font-medium">
                    Select action to update farmer account approval status:
                  </span>

                  <div className="flex items-center gap-2">
                    {farmer.approvalStatus !== "approved" && (
                      <button
                        onClick={() => updateStatus(farmer._id, "approved")}
                        className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition inline-flex items-center gap-1.5 shadow-sm"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                      </button>
                    )}

                    {farmer.approvalStatus !== "suspended" && (
                      <button
                        onClick={() => updateStatus(farmer._id, "suspended")}
                        className="px-3.5 py-1.5 bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 text-xs font-bold rounded-xl transition inline-flex items-center gap-1.5"
                      >
                        <XCircle className="w-3.5 h-3.5" /> Suspend
                      </button>
                    )}

                    {farmer.approvalStatus !== "pending" && (
                      <button
                        onClick={() => updateStatus(farmer._id, "pending")}
                        className="px-3.5 py-1.5 bg-amber-50 border border-amber-200 text-amber-800 hover:bg-amber-100 text-xs font-bold rounded-xl transition inline-flex items-center gap-1.5"
                      >
                        <Clock className="w-3.5 h-3.5" /> Set Pending
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

export default AdminFarmers;