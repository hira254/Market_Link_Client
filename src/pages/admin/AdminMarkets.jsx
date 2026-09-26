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
  Plus,
  Pencil,
  Trash2,
  Calendar,
  Clock,
  MapPin,
  LogOut,
  X
} from "lucide-react";

function AdminMarkets() {
  const [markets, setMarkets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    operatingDays: "",
    openingTime: "",
    closingTime: "",
    latitude: "",
    longitude: "",
  });

  const [editingId, setEditingId] = useState(null);

  const fetchMarkets = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axiosInstance.get(
        "/api/markets",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMarkets(response.data.markets || []);
    } catch (error) {
      console.log(
        "MARKETS ERROR:",
        error.response?.data || error.message
      );

      setMessage(
        error.response?.data?.message ||
          "Failed to fetch markets."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarkets();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      address: "",
      city: "",
      operatingDays: "",
      openingTime: "",
      closingTime: "",
      latitude: "",
      longitude: "",
    });

    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const data = {
        ...formData,
        operatingDays: formData.operatingDays
          .split(",")
          .map((day) => day.trim())
          .filter(Boolean),
      };

      if (editingId) {
        const response = await axiosInstance.put(
          `/api/markets/${editingId}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMessage(
          response.data.message ||
            "Market updated successfully."
        );
      } else {
        const response = await axiosInstance.post(
          "/api/markets",
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMessage(
          response.data.message ||
            "Market created successfully."
        );
      }

      resetForm();
      fetchMarkets();
    } catch (error) {
      console.log(
        "MARKET SAVE ERROR:",
        error.response?.data || error.message
      );

      setMessage(
        error.response?.data?.message ||
          "Failed to save market."
      );
    }
  };

  const handleEdit = (market) => {
    setEditingId(market._id);

    setFormData({
      name: market.name || "",
      address: market.address || "",
      city: market.city || "",
      operatingDays: Array.isArray(market.operatingDays)
        ? market.operatingDays.join(", ")
        : "",
      openingTime: market.openingTime || "",
      closingTime: market.closingTime || "",
      latitude: market.latitude || "",
      longitude: market.longitude || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (marketId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this market?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await axiosInstance.delete(
        `/api/markets/${marketId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(
        response.data.message ||
          "Market deleted successfully."
      );

      fetchMarkets();
    } catch (error) {
      console.log(
        "DELETE MARKET ERROR:",
        error.response?.data || error.message
      );

      setMessage(
        error.response?.data?.message ||
          "Failed to delete market."
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#0F172A] flex font-sans">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-[#1E56A0] text-white min-h-screen p-6 flex flex-col justify-between shrink-0 shadow-lg">
        <div>
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
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-blue-100 hover:bg-white/10 hover:text-white transition-all"
            >
              <Users className="w-4 h-4" />
              <span>Customers</span>
            </Link>

            <Link
              to="/admin/markets"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#163172] text-white shadow-sm transition-all"
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
        
        {/* Top Header Card */}
        <div className="bg-white border border-[#EFECE6] p-6 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-stone-400">
              ADMIN CONTROL
            </span>
            <h1 className="text-3xl font-black text-[#0F172A] tracking-tight">
              Manage Markets
            </h1>
            <p className="text-xs font-medium text-stone-500 mt-1">
              A polished working section for manage markets, ready for live API and database wiring.
            </p>
          </div>

          <Link
            to="/admin"
            className="px-4 py-2 bg-[#1E56A0] hover:bg-[#163172] text-white text-xs font-bold rounded-xl transition shadow-sm self-start md:self-auto"
          >
            ← Dashboard
          </Link>
        </div>

        {/* Feedback Alert */}
        {message && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{message}</span>
          </div>
        )}

        {/* Create / Edit Form Card */}
        <div className="bg-white border border-[#EFECE6] p-6 rounded-2xl shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <h2 className="text-base font-extrabold text-[#0F172A] flex items-center gap-2">
              {editingId ? (
                <>
                  <Pencil className="w-4 h-4 text-[#1E56A0]" /> Edit Market Location
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 text-[#1E56A0]" /> Create New Market Location
                </>
              )}
            </h2>
            {editingId && (
              <button
                onClick={resetForm}
                className="text-xs font-semibold text-rose-600 hover:underline flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" /> Cancel Edit
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                  Market Name *
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. City Farmers Market"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#FAF9F6] border border-stone-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-[#0F172A] focus:outline-none focus:border-[#1E56A0]"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                  Street Address *
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="e.g. 123 Main Street"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#FAF9F6] border border-stone-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-[#0F172A] focus:outline-none focus:border-[#1E56A0]"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  placeholder="e.g. Springfield"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#FAF9F6] border border-stone-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-[#0F172A] focus:outline-none focus:border-[#1E56A0]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                  Operating Days
                </label>
                <input
                  type="text"
                  name="operatingDays"
                  placeholder="Mon, Wed, Sat"
                  value={formData.operatingDays}
                  onChange={handleChange}
                  className="w-full bg-[#FAF9F6] border border-stone-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-[#0F172A] focus:outline-none focus:border-[#1E56A0]"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                  Opening Time *
                </label>
                <input
                  type="time"
                  name="openingTime"
                  value={formData.openingTime}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#FAF9F6] border border-stone-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-[#0F172A] focus:outline-none focus:border-[#1E56A0]"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                  Closing Time *
                </label>
                <input
                  type="time"
                  name="closingTime"
                  value={formData.closingTime}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#FAF9F6] border border-stone-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-[#0F172A] focus:outline-none focus:border-[#1E56A0]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                  Latitude (Optional)
                </label>
                <input
                  type="number"
                  step="any"
                  name="latitude"
                  placeholder="e.g. 40.7128"
                  value={formData.latitude}
                  onChange={handleChange}
                  className="w-full bg-[#FAF9F6] border border-stone-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-[#0F172A] focus:outline-none focus:border-[#1E56A0]"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                  Longitude (Optional)
                </label>
                <input
                  type="number"
                  step="any"
                  name="longitude"
                  placeholder="e.g. -74.0060"
                  value={formData.longitude}
                  onChange={handleChange}
                  className="w-full bg-[#FAF9F6] border border-stone-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-[#0F172A] focus:outline-none focus:border-[#1E56A0]"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border border-stone-200 text-stone-600 text-xs font-bold rounded-xl hover:bg-stone-50 transition"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className="px-5 py-2 bg-[#1E56A0] hover:bg-[#163172] text-white text-xs font-bold rounded-xl transition shadow-sm"
              >
                {editingId ? "Update Market" : "Create Market"}
              </button>
            </div>
          </form>
        </div>

        {/* All Markets List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-[#0F172A] tracking-tight">
              Registered Locations
            </h2>
            <span className="text-xs font-bold text-stone-400">
              Total: {markets.length}
            </span>
          </div>

          {loading ? (
            <div className="bg-white border border-[#EFECE6] rounded-2xl p-10 text-center text-xs font-semibold text-stone-400">
              Loading market locations...
            </div>
          ) : markets.length === 0 ? (
            <div className="bg-white border border-[#EFECE6] rounded-2xl p-12 text-center space-y-2">
              <Store className="w-10 h-10 text-stone-300 mx-auto" />
              <p className="text-sm font-bold text-stone-700">No Markets Registered</p>
              <p className="text-xs text-stone-400">Use the form above to add your first market location.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {markets.map((market) => (
                <div
                  key={market._id}
                  className="bg-white border border-[#EFECE6] rounded-2xl p-5 shadow-sm space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-base font-extrabold text-[#0F172A]">
                        {market.name}
                      </h3>
                      <span className="bg-blue-50 text-[#1E56A0] text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                        {market.city}
                      </span>
                    </div>

                    <p className="text-xs text-stone-500 font-medium flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span>{market.address}</span>
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-xs pt-2">
                      <div className="bg-[#FAF9F6] p-2.5 rounded-xl border border-stone-100">
                        <span className="text-[10px] font-bold text-stone-400 uppercase block mb-0.5">Days</span>
                        <p className="font-semibold text-stone-700">
                          {Array.isArray(market.operatingDays)
                            ? market.operatingDays.join(", ")
                            : "Not set"}
                        </p>
                      </div>

                      <div className="bg-[#FAF9F6] p-2.5 rounded-xl border border-stone-100">
                        <span className="text-[10px] font-bold text-stone-400 uppercase block mb-0.5">Hours</span>
                        <p className="font-semibold text-stone-700">
                          {market.openingTime || "--:--"} - {market.closingTime || "--:--"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleEdit(market)}
                      className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-xl transition inline-flex items-center gap-1"
                    >
                      <Pencil className="w-3.5 h-3.5" /> Edit
                    </button>

                    <button
                      onClick={() => handleDelete(market._id)}
                      className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold rounded-xl transition inline-flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

      </main>
    </div>
  );
}

export default AdminMarkets;