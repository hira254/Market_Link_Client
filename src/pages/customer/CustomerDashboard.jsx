import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import Sidebar from "../../components/Sidebar";

import {
  ShoppingBag,
  ShoppingCart,
  Package,
  Heart,
  User,
  Star,
  Store,
  MapPin,
  Clock,
  Navigation,
  Trash2,
  ChevronRight,
} from "lucide-react";

function CustomerDashboard() {
  const { user, token } = useAuth();

  const [preferredMarket, setPreferredMarket] = useState(null);

  // Dashboard counts
  const [orderCount, setOrderCount] = useState(0);
  const [favoriteCount, setFavoriteCount] = useState(0);
const [cartCount, setCartCount] = useState(0);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    const savedMarket =
      JSON.parse(localStorage.getItem("preferredMarket")) || null;

    setPreferredMarket(savedMarket);
  }, []);

  // Fetch Orders + Favorites count
 useEffect(() => {
  const fetchDashboardStats = async () => {
    if (!token) return;

    try {
      setLoadingStats(true);

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const [ordersResponse, favoritesResponse, cartResponse] =
        await Promise.all([
          axios.get(
            "http://localhost:4000/api/orders/my",
            { headers }
          ),

          axios.get(
            "http://localhost:4000/api/favorites/my",
            { headers }
          ),

          axios.get(
            "http://localhost:4000/api/cart",
            { headers }
          ),
        ]);
console.log(
  "CART RESPONSE JSON:",
  JSON.stringify(cartResponse.data, null, 2)
);
      setOrderCount(ordersResponse.data.count || 0);

      setFavoriteCount(
        favoritesResponse.data.count || 0
      );

      setCartCount(cartResponse.data.itemCount || 0);

    } catch (error) {
      console.error(
        "DASHBOARD STATS ERROR:",
        error.response?.data || error.message
      );
    } finally {
      setLoadingStats(false);
    }
  };

  fetchDashboardStats();
}, [token]);

  const removePreferredMarket = () => {
    localStorage.removeItem("preferredMarket");
    setPreferredMarket(null);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#12222E] font-sans flex">

      <Sidebar />

      <main className="flex-1 p-6 sm:p-10 max-w-7xl">

        {/* HEADER */}
        <div className="mb-8">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#566E3D]">
            CUSTOMER WORKSPACE
          </span>

          <h1 className="text-3xl sm:text-4xl font-black text-[#12222E] tracking-tight mt-1">
            Your MarketLink
          </h1>

          <p className="text-xs sm:text-sm text-stone-500 mt-1 font-medium">
            Shop fresh produce, manage your basket and track orders.
          </p>
        </div>

        {/* METRICS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">

          {/* CART */}
          <div className="bg-white border border-stone-200/80 rounded-2xl p-5 shadow-sm">
            <span className="text-xs font-medium text-stone-400 block mb-1">
              Cart items
            </span>

          <span className="text-3xl font-black text-[#12222E]">
  {loadingStats ? "..." : cartCount}
</span>
          </div>

          {/* ORDERS */}
          <div className="bg-white border border-stone-200/80 rounded-2xl p-5 shadow-sm">
            <span className="text-xs font-medium text-stone-400 block mb-1">
              Orders
            </span>

            <span className="text-3xl font-black text-[#12222E]">
              {loadingStats ? "..." : orderCount}
            </span>
          </div>

          {/* FAVORITES */}
          <div className="bg-white border border-stone-200/80 rounded-2xl p-5 shadow-sm">
            <span className="text-xs font-medium text-stone-400 block mb-1">
              Favorites
            </span>

            <span className="text-3xl font-black text-[#12222E]">
              {loadingStats ? "..." : favoriteCount}
            </span>
          </div>

        </div>

        {/* QUICK ACTIONS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">

          {/* PRODUCTS */}
          <Link
            to="/products"
            className="bg-white hover:bg-stone-50/80 border border-stone-200/80 rounded-2xl p-6 transition shadow-sm group flex flex-col justify-between min-h-[140px]"
          >
            <div className="w-10 h-10 rounded-xl bg-[#EAF2E1] flex items-center justify-center text-[#566E3D] group-hover:scale-105 transition-transform">
              <ShoppingBag className="w-5 h-5" />
            </div>

            <div>
              <h3 className="font-bold text-base text-[#12222E]">
                Browse Products
              </h3>

              <p className="text-xs text-stone-500 mt-0.5">
                Find fresh produce
              </p>
            </div>
          </Link>

          {/* CART */}
          <Link
            to="/cart"
            className="bg-white hover:bg-stone-50/80 border border-stone-200/80 rounded-2xl p-6 transition shadow-sm group flex flex-col justify-between min-h-[140px]"
          >
            <div className="w-10 h-10 rounded-xl bg-[#EAF2E1] flex items-center justify-center text-[#566E3D] group-hover:scale-105 transition-transform">
              <ShoppingCart className="w-5 h-5" />
            </div>

            <div>
              <h3 className="font-bold text-base text-[#12222E]">
                My Cart
              </h3>

              <p className="text-xs text-stone-500 mt-0.5">
                Review your basket
              </p>
            </div>
          </Link>

          {/* ORDERS */}
          <Link
            to="/orders"
            className="bg-white hover:bg-stone-50/80 border border-stone-200/80 rounded-2xl p-6 transition shadow-sm group flex flex-col justify-between min-h-[140px]"
          >
            <div className="w-10 h-10 rounded-xl bg-[#EAF2E1] flex items-center justify-center text-[#566E3D] group-hover:scale-105 transition-transform">
              <Package className="w-5 h-5" />
            </div>

            <div>
              <h3 className="font-bold text-base text-[#12222E]">
                My Orders
              </h3>

              <p className="text-xs text-stone-500 mt-0.5">
                Track previous orders
              </p>
            </div>
          </Link>

          {/* FAVORITES */}
          <Link
            to="/favorites"
            className="bg-white hover:bg-stone-50/80 border border-stone-200/80 rounded-2xl p-6 transition shadow-sm group flex flex-col justify-between min-h-[140px]"
          >
            <div className="w-10 h-10 rounded-xl bg-[#EAF2E1] flex items-center justify-center text-[#566E3D] group-hover:scale-105 transition-transform">
              <Heart className="w-5 h-5" />
            </div>

            <div>
              <h3 className="font-bold text-base text-[#12222E]">
                Favorites
              </h3>

              <p className="text-xs text-stone-500 mt-0.5">
                Saved products
              </p>
            </div>
          </Link>

          {/* PROFILE */}
          <Link
            to="/profile"
            className="bg-white hover:bg-stone-50/80 border border-stone-200/80 rounded-2xl p-6 transition shadow-sm group flex flex-col justify-between min-h-[140px]"
          >
            <div className="w-10 h-10 rounded-xl bg-[#EAF2E1] flex items-center justify-center text-[#566E3D] group-hover:scale-105 transition-transform">
              <User className="w-5 h-5" />
            </div>

            <div>
              <h3 className="font-bold text-base text-[#12222E]">
                Profile
              </h3>

              <p className="text-xs text-stone-500 mt-0.5">
                Your customer details
              </p>
            </div>
          </Link>

          {/* REVIEWS */}
          <Link
            to="/reviews"
            className="bg-white hover:bg-stone-50/80 border border-stone-200/80 rounded-2xl p-6 transition shadow-sm group flex flex-col justify-between min-h-[140px]"
          >
            <div className="w-10 h-10 rounded-xl bg-[#EAF2E1] flex items-center justify-center text-[#566E3D] group-hover:scale-105 transition-transform">
              <Star className="w-5 h-5" />
            </div>

            <div>
              <h3 className="font-bold text-base text-[#12222E]">
                Reviews
              </h3>

              <p className="text-xs text-stone-500 mt-0.5">
                Rate your purchases
              </p>
            </div>
          </Link>

        </div>

        {/* PREFERRED MARKET */}
        <section className="mt-10">

          <div className="mb-4">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#566E3D]">
              PRIMARY PICKUP LOCATION
            </span>

            <h3 className="text-xl font-bold text-[#12222E]">
              Preferred market
            </h3>
          </div>

          {preferredMarket ? (
            <div className="bg-white border border-stone-200/80 rounded-2xl p-6 shadow-sm max-w-3xl space-y-4">

              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="inline-block px-2.5 py-1 rounded-md bg-[#EAF2E1] text-[#566E3D] text-[10px] font-bold uppercase mb-1">
                    Primary Market
                  </span>

                  <h4 className="text-lg font-extrabold text-[#12222E]">
                    {preferredMarket.name}
                  </h4>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-600 bg-stone-50 p-3.5 rounded-xl border border-stone-100">

                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#566E3D] shrink-0" />

                  <span>
                    <strong>Location:</strong>{" "}
                    {preferredMarket.address},{" "}
                    {preferredMarket.city}
                  </span>
                </p>

                {preferredMarket.operatingDays?.length > 0 && (
                  <p className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#566E3D] shrink-0" />

                    <span>
                      <strong>Days:</strong>{" "}
                      {preferredMarket.operatingDays.join(", ")}
                    </span>
                  </p>
                )}

              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">

                <Link
                  to={`/markets/${preferredMarket._id}`}
                  className="px-4 py-2 bg-[#566E3D] hover:bg-[#455931] text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-sm"
                >
                  View Details
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>

                {preferredMarket.latitude != null &&
                  preferredMarket.longitude != null && (
                    <button
                      onClick={() => {
                        window.open(
                          `https://www.google.com/maps/dir/?api=1&destination=${preferredMarket.latitude},${preferredMarket.longitude}`,
                          "_blank"
                        );
                      }}
                      className="px-4 py-2 bg-white border border-stone-300 hover:border-stone-400 text-stone-700 text-xs font-bold rounded-xl transition flex items-center gap-1.5"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      Directions
                    </button>
                  )}

                <button
                  onClick={removePreferredMarket}
                  className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-xl transition flex items-center gap-1.5 ml-auto border border-rose-100"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Remove
                </button>

              </div>
            </div>
          ) : (
            <div className="bg-white border border-stone-200/80 rounded-2xl p-8 text-center max-w-3xl space-y-3 shadow-sm">

              <div className="w-12 h-12 rounded-2xl bg-[#EAF2E1] text-[#566E3D] flex items-center justify-center mx-auto">
                <Store className="w-6 h-6" />
              </div>

              <h4 className="text-base font-bold text-[#12222E]">
                No Preferred Market Selected
              </h4>

              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Select your preferred local market to easily inspect available produce and organize pickups.
              </p>

              <div className="pt-2">
                <Link
                  to="/markets"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#566E3D] hover:bg-[#455931] text-white text-xs font-bold rounded-xl transition shadow-sm"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  Select Preferred Market
                </Link>
              </div>

            </div>
          )}

        </section>

      </main>
    </div>
  );
}

export default CustomerDashboard;
