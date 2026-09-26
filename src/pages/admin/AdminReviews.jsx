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
  Trash2,
  CheckCircle2,
  LogOut,
  MessageSquare,
  User,
  Tag,
  Mail
} from "lucide-react";

function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchReviews = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axiosInstance.get(
        "/api/reviews/admin",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setReviews(response.data.reviews || []);
    } catch (error) {
      console.log(
        "REVIEWS ERROR:",
        error.response?.data || error.message
      );

      setMessage(
        error.response?.data?.message ||
          "Failed to fetch reviews."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const removeReview = async (reviewId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this review?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await axiosInstance.delete(
        `/api/reviews/admin/${reviewId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(
        response.data.message ||
          "Review removed successfully."
      );

      fetchReviews();
    } catch (error) {
      console.log(
        "REMOVE REVIEW ERROR:",
        error.response?.data || error.message
      );

      setMessage(
        error.response?.data?.message ||
          "Failed to remove review."
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
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#163172] text-white shadow-sm transition-all"
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

      {/* Main Content Workspace */}
      <main className="flex-1 p-8 lg:p-10 max-w-6xl mx-auto space-y-8 overflow-y-auto">
        
        {/* Header Section */}
        <div className="bg-white border border-[#EFECE6] p-6 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-stone-400">
              ADMIN CONTROL
            </span>
            <h1 className="text-3xl font-black text-[#0F172A] tracking-tight">
              Moderate Reviews
            </h1>
            <p className="text-xs font-medium text-stone-500 mt-1">
              A polished working section for moderate reviews, ready for live API and database wiring.
            </p>
          </div>

          <Link
            to="/admin"
            className="px-4 py-2 bg-[#1E56A0] hover:bg-[#163172] text-white text-xs font-bold rounded-xl transition shadow-sm self-start md:self-auto"
          >
            ← Dashboard
          </Link>
        </div>

        {/* System Message */}
        {message && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{message}</span>
          </div>
        )}

        {/* Reviews List */}
        {loading ? (
          <div className="bg-white border border-[#EFECE6] rounded-2xl p-10 text-center text-xs font-semibold text-stone-400">
            Loading reviews...
          </div>
        ) : reviews.length === 0 ? (
          <div className="bg-white border border-[#EFECE6] rounded-2xl p-12 text-center space-y-2">
            <Star className="w-10 h-10 text-stone-300 mx-auto" />
            <p className="text-sm font-bold text-stone-700">No Reviews Found</p>
            <p className="text-xs text-stone-400">Customer product reviews will appear here for moderation.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-[#0F172A] tracking-tight">
                Customer Feedback Moderation
              </h2>
              <span className="text-xs font-bold text-stone-400">
                Total Reviews: {reviews.length}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-white border border-[#EFECE6] rounded-2xl p-5 shadow-sm flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2 border-b border-stone-100 pb-3">
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-stone-400">
                          {review.product?.category || "General"}
                        </span>
                        <h3 className="text-base font-extrabold text-[#0F172A]">
                          {review.product?.name || "Unknown Product"}
                        </h3>
                      </div>

                      <div className="flex items-center gap-0.5 text-amber-400 text-xs">
                        {"★".repeat(review.rating || 0)}
                        {"☆".repeat(5 - (review.rating || 0))}
                      </div>
                    </div>

                    <div className="bg-[#FAF9F6] p-3 rounded-xl border border-stone-100 space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-extrabold text-stone-800">
                          {review.customer?.name || "Unknown Customer"}
                        </span>
                        <span className="text-stone-400 font-medium">
                          {review.customer?.email || "No email"}
                        </span>
                      </div>
                      <p className="text-xs text-stone-600 italic">
                        "{review.comment || "No comment content."}"
                      </p>
                    </div>

                    {review.response && (
                      <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-xl space-y-1">
                        <span className="text-[10px] font-bold text-[#1E56A0] uppercase block">
                          Farmer Response
                        </span>
                        <p className="text-xs text-stone-700 font-medium">
                          {review.response}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-end">
                    <button
                      onClick={() => removeReview(review._id)}
                      className="px-3.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold rounded-xl transition inline-flex items-center gap-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove Review
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default AdminReviews;