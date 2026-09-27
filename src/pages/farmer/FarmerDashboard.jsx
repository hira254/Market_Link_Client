import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Sidebar from "../../components/Sidebar";
import axiosInstance from "../../utils/BaseUrl";


import {
  Package,
  Star,
  ShoppingBasket,
  Calendar,
  BarChart3,
  User,
  CheckCircle2,
  ExternalLink,
  Plus,
} from "lucide-react";

function FarmerDashboard() {
  const { user, logout } = useAuth();

  const [stats, setStats] = useState({
    listings: 0,
    openOrders: 0,
    revenue: 0,
    reviews: 0,
    averageRating: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
  console.log("🔥 DASHBOARD FUNCTION CALLED");

  try {
    const token = localStorage.getItem("token");

    console.log("🔥 TOKEN:", token);

    if (!token) {
      setLoading(false);
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // =========================
    // 1. FARMER ORDERS
    // =========================
    const ordersResponse = await axiosInstance.get(
      "/api/orders/farmer/orders",
      { headers }
    );

    console.log("🔥 ORDERS RESPONSE:", ordersResponse.data);

    const orders = ordersResponse.data.orders || [];

    const openOrders = orders.filter((order) => {
      const status = order.status?.toLowerCase();

      return (
        status === "pending" ||
        status === "confirmed" ||
        status === "ready"
      );
    }).length;

    const revenue = orders.reduce((total, order) => {
      if (order.status?.toLowerCase() === "completed") {
        return total + Number(order.totalAmount || 0);
      }

      return total;
    }, 0);

    // =========================
    // 2. FARMER PRODUCTS
    // =========================
    const productsResponse = await axiosInstance.get(
      "/api/products/my",
      { headers }
    );

    console.log("🔥 PRODUCTS RESPONSE:", productsResponse.data);

    const products = productsResponse.data.products || [];

    // =========================
    // 3. FARMER REVIEWS
    // =========================
    const reviewsResponse = await axiosInstance.get(
      "/api/reviews/reviews",
      { headers }
    );

    console.log("🔥 REVIEWS RESPONSE:", reviewsResponse.data);

    const reviews = reviewsResponse.data.reviews || [];

    // =========================
    // 4. AVERAGE RATING
    // =========================
    const averageRating =
      reviews.length > 0
        ? (
            reviews.reduce(
              (sum, review) => sum + Number(review.rating || 0),
              0
            ) / reviews.length
          ).toFixed(1)
        : 0;

    // =========================
    // 5. SET DASHBOARD STATS
    // =========================
    setStats({
      listings: products.length,
      openOrders,
      revenue,
      reviews: reviews.length,
      averageRating,
    });

    console.log("🔥 FINAL STATS:", {
      listings: products.length,
      openOrders,
      revenue,
      reviews: reviews.length,
      averageRating,
    });

  } catch (error) {
    console.error(
      "🔥 DASHBOARD ERROR:",
      error.response?.data || error.message
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1E293B] flex font-sans">

      {/* ============================================================
          SIDEBAR
      ============================================================ */}

      <Sidebar />

      {/* ============================================================
          MAIN CONTENT
      ============================================================ */}

      <main className="flex-1 p-6 sm:p-10 max-w-7xl mx-auto space-y-8">

        {/* ============================================================
            TOP HEADER
        ============================================================ */}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200/60 pb-5">

          <div className="flex items-center gap-2 text-xs font-semibold text-stone-500">
            <span>Farmer</span>
          </div>

          <div className="flex items-center gap-3">

            <Link
              to="/"
              className="text-xs font-medium text-stone-600 hover:text-stone-900 transition flex items-center gap-1"
            >
              View site
              <ExternalLink className="w-3 h-3" />
            </Link>

            <span className="text-xs font-bold text-stone-800 bg-stone-100 px-2.5 py-1 rounded-md">
              Farmer
            </span>

            <span className="text-xs text-stone-500">
              {user?.name || "Farmer"}
            </span>

            <button
              onClick={logout}
              className="px-3.5 py-1.5 border border-stone-300 rounded-lg text-xs font-semibold hover:bg-stone-100 transition flex items-center gap-1.5 text-stone-700"
            >
              Logout
            </button>

          </div>
        </div>

        {/* ============================================================
            PAGE TITLE
        ============================================================ */}

        <div className="space-y-1">

          <p className="text-[11px] font-extrabold uppercase tracking-wider text-stone-400">
            SELLER WORKSPACE
          </p>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Farmer Dashboard
          </h1>

          <p className="text-xs text-stone-500 font-medium">
            Manage your produce, orders and market-day activity.
          </p>

        </div>

        {/* ============================================================
            REAL DASHBOARD STATS
        ============================================================ */}

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          {/* LISTINGS */}

          <div className="bg-white border border-[#EFECE6] p-5 rounded-2xl shadow-sm space-y-2">

            <p className="text-xs font-semibold text-stone-400">
              Listings
            </p>

            <p className="text-3xl font-extrabold text-[#0F172A]">
              {loading ? "..." : stats.listings}
            </p>

          </div>

          {/* OPEN ORDERS */}

          <div className="bg-white border border-[#EFECE6] p-5 rounded-2xl shadow-sm space-y-2">

            <p className="text-xs font-semibold text-stone-400">
              Open orders
            </p>

            <p className="text-3xl font-extrabold text-[#0F172A]">
              {loading ? "..." : stats.openOrders}
            </p>

          </div>

          {/* REVENUE */}

          <div className="bg-white border border-[#EFECE6] p-5 rounded-2xl shadow-sm space-y-2">

            <p className="text-xs font-semibold text-stone-400">
              Revenue
            </p>

            <p className="text-3xl font-extrabold text-[#0F172A]">
              {loading
                ? "..."
                : `Rs. ${stats.revenue.toLocaleString()}`
              }
            </p>

          </div>

          {/* REVIEWS */}

          <div className="bg-white border border-[#EFECE6] p-5 rounded-2xl shadow-sm space-y-2">

            <p className="text-xs font-semibold text-stone-400">
              Reviews
            </p>

            <div className="flex items-center gap-2">

              <p className="text-3xl font-extrabold text-[#0F172A]">
                {loading ? "..." : stats.reviews}
              </p>

              {!loading && stats.averageRating > 0 && (
                <div className="flex items-center gap-1">

                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />

                  <span className="text-sm font-bold text-stone-600">
                    {stats.averageRating}
                  </span>

                </div>
              )}

            </div>

          </div>

        </section>

        {/* ============================================================
            SHORTCUT CARDS
        ============================================================ */}

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

          {/* MY PRODUCTS */}

          <Link
            to="/farmer/products"
            className="bg-white border border-[#EFECE6] p-6 rounded-2xl shadow-sm hover:border-stone-400 transition group space-y-4"
          >

            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100/60">
              <ShoppingBasket className="w-5 h-5" />
            </div>

            <div>

              <h3 className="text-base font-bold text-[#0F172A] group-hover:text-emerald-800 transition">
                My Products
              </h3>

              <p className="text-xs text-stone-500 mt-0.5">
                Add, edit and manage stock
              </p>

            </div>

          </Link>

          {/* ORDERS */}

          <Link
            to="/farmer/orders"
            className="bg-white border border-[#EFECE6] p-6 rounded-2xl shadow-sm hover:border-stone-400 transition group space-y-4"
          >

            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-100/60">
              <Package className="w-5 h-5" />
            </div>

            <div>

              <h3 className="text-base font-bold text-[#0F172A] group-hover:text-amber-800 transition">
                Orders
              </h3>

              <p className="text-xs text-stone-500 mt-0.5">
                Prepare and fulfill customer orders
              </p>

            </div>

          </Link>

          {/* PICKUP SLOTS */}

          <Link
            to="/farmer/profile"
            className="bg-white border border-[#EFECE6] p-6 rounded-2xl shadow-sm hover:border-stone-400 transition group space-y-4"
          >

            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-100/60">
              <Calendar className="w-5 h-5" />
            </div>

            <div>

              <h3 className="text-base font-bold text-[#0F172A] group-hover:text-blue-800 transition">
                Pickup Slots
              </h3>

              <p className="text-xs text-stone-500 mt-0.5">
                Set your market-day availability
              </p>

            </div>

          </Link>

          {/* ANALYTICS */}

          <Link
            to="/farmer/history"
            className="bg-white border border-[#EFECE6] p-6 rounded-2xl shadow-sm hover:border-stone-400 transition group space-y-4"
          >

            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center border border-rose-100/60">
              <BarChart3 className="w-5 h-5" />
            </div>

            <div>

              <h3 className="text-base font-bold text-[#0F172A] group-hover:text-rose-800 transition">
                Analytics
              </h3>

              <p className="text-xs text-stone-500 mt-0.5">
                Track sales and popular products
              </p>

            </div>

          </Link>

          {/* REVIEWS */}

          <Link
            to="/farmer/reviews"
            className="bg-white border border-[#EFECE6] p-6 rounded-2xl shadow-sm hover:border-stone-400 transition group space-y-4"
          >

            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center border border-purple-100/60">
              <Star className="w-5 h-5" />
            </div>

            <div>

              <h3 className="text-base font-bold text-[#0F172A] group-hover:text-purple-800 transition">
                Reviews
              </h3>

              <p className="text-xs text-stone-500 mt-0.5">
                See customer feedback
              </p>

            </div>

          </Link>

          {/* PROFILE */}

          <Link
            to="/farmer/profile"
            className="bg-white border border-[#EFECE6] p-6 rounded-2xl shadow-sm hover:border-stone-400 transition group space-y-4"
          >

            <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center border border-stone-200/60">
              <User className="w-5 h-5" />
            </div>

            <div>

              <h3 className="text-base font-bold text-[#0F172A] group-hover:text-stone-900 transition">
                Profile
              </h3>

              <p className="text-xs text-stone-500 mt-0.5">
                Update stall information
              </p>

            </div>

          </Link>

        </section>

        {/* ============================================================
            FARMER FEATURES
        ============================================================ */}

        <section className="bg-white border border-[#EFECE6] rounded-2xl p-6 shadow-sm space-y-4">

          <div className="flex items-center justify-between">

            <h3 className="text-sm font-bold text-[#0F172A]">
              Farmer Features & Capabilities
            </h3>

            <Link
              to="/farmer/products"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold transition"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Product
            </Link>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-semibold text-stone-600">

            {[
              "Manage farmer profile and markets",
              "Add, edit and delete products",
              "Manage weekly stock and pricing",
              "Mark products as sold out",
              "Accept or decline pre-orders",
              "Manage pickup slots",
              "View order history and revenue",
              "View customer reviews",
            ].map((feature, idx) => (

              <div
                key={idx}
                className="flex items-center gap-2 bg-[#FAF8F5] p-3 rounded-xl border border-stone-200/60"
              >

                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />

                <span>{feature}</span>

              </div>

            ))}

          </div>

        </section>

      </main>

    </div>
  );
}

export default FarmerDashboard;