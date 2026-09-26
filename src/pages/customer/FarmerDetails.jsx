import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { 
  ArrowLeft, 
  Sprout, 
  CheckCircle, 
  Star, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Clock, 
  Store, 
  ShoppingBag, 
  MessageSquare,
  Package
} from "lucide-react";

function FarmerDetails() {
  const { id } = useParams();

  const [farmer, setFarmer] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [stockProducts, setStockProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loadingStock, setLoadingStock] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    fetchFarmer();
    fetchFarmerReviews();
    fetchFarmerStock();
  }, [id]);

  // =========================
  // FETCH FARMER
  // =========================
  const fetchFarmer = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:4000/api/farmers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const farmers = response.data.farmers || response.data || [];

      const selectedFarmer = farmers.find(
        (item) => item._id === id
      );

      if (!selectedFarmer) {
        setError("Farmer not found.");
        return;
      }

      setFarmer(selectedFarmer);
    } catch (error) {
      console.log(
        "FARMER DETAILS ERROR:",
        error.response?.data || error.message
      );

      setError(
        error.response?.data?.message ||
          "Failed to load farmer profile."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // FETCH STOCK
  // =========================
  const fetchFarmerStock = async () => {
    try {
      setLoadingStock(true);

      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:4000/api/farmers/${id}/stock`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStockProducts(response.data.products || []);
    } catch (error) {
      console.log(
        "STOCK ERROR:",
        error.response?.data || error.message
      );

      setStockProducts([]);
    } finally {
      setLoadingStock(false);
    }
  };

  // =========================
  // FETCH REVIEWS
  // =========================
  const fetchFarmerReviews = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:4000/api/farmers/${id}/reviews`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setReviews(response.data.reviews || []);
      setAverageRating(response.data.averageRating || 0);
      setTotalReviews(response.data.totalReviews || 0);
    } catch (error) {
      console.log(
        "FARMER REVIEWS ERROR:",
        error.response?.data || error.message
      );

      setReviews([]);
      setAverageRating(0);
      setTotalReviews(0);
    }
  };

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBF9F5] text-[#12222E]">
        <Navbar />

        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="w-12 h-12 rounded-2xl bg-[#EAF2E1] flex items-center justify-center text-[#566E3D] mx-auto mb-4">
            <Sprout className="w-6 h-6 animate-pulse" />
          </div>

          <h2 className="text-lg font-bold text-[#12222E]">
            Loading farmer profile...
          </h2>

          <p className="text-xs text-stone-500 mt-1">
            Please wait a moment.
          </p>
        </div>
      </div>
    );
  }

  // =========================
  // ERROR
  // =========================
  if (error) {
    return (
      <div className="min-h-screen bg-[#FBF9F5] text-[#12222E]">
        <Navbar />

        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="max-w-lg mx-auto bg-white border border-stone-200/80 rounded-2xl p-8 text-center shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-[#12222E]">
              Unable to load farmer
            </h2>

            <p className="text-xs text-rose-600 font-medium">
              {error}
            </p>

            <div>
              <Link
                to="/farmers"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#566E3D] text-white rounded-xl text-xs font-bold hover:bg-[#455931] transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Farmers
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!farmer) return null;

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#12222E] font-sans flex flex-col justify-between">
      <Navbar />

      {/* =========================
          PAGE HEADER
      ========================= */}
      <div className="bg-white border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          <Link
            to="/farmers"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#566E3D] hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Farmers
          </Link>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-2xl bg-[#EAF2E1] flex items-center justify-center text-[#566E3D] shrink-0 border border-stone-100">
                <Sprout className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-[#12222E]">
                    {farmer.userId?.name || "Farmer"}
                  </h1>

                  <span className="px-2.5 py-0.5 bg-[#EAF2E1] text-[#566E3D] rounded-full text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Verified
                  </span>
                </div>

                <p className="text-xs text-stone-500 font-medium flex items-center gap-1.5">
                  <Store className="w-3.5 h-3.5 text-[#566E3D]" /> {farmer.stallName || "Farmer Stall"}
                </p>

                {farmer.address && (
                  <p className="text-xs text-stone-500 font-medium flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#566E3D]" /> {farmer.address}
                  </p>
                )}
              </div>
            </div>

            {/* Rating */}
            <div className="bg-[#FBF9F5] border border-stone-200/80 rounded-2xl px-6 py-3.5 text-center shrink-0">
              <div className="text-2xl font-black text-amber-600 flex items-center justify-center gap-1">
                <Star className="w-5 h-5 fill-amber-500 text-amber-500" /> {averageRating ? Number(averageRating).toFixed(1) : "0.0"}
              </div>

              <p className="text-[11px] font-bold text-stone-500 mt-0.5">
                {totalReviews} review{totalReviews !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================
          MAIN CONTENT
      ========================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-grow w-full">

        {/* =========================
            FARMER INFORMATION
        ========================= */}
        <section className="bg-white rounded-3xl border border-stone-200/80 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-stone-100">
            <h2 className="text-lg font-bold text-[#12222E]">
              Farmer Information
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Contact and location details
            </p>
          </div>

          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <InfoCard
              icon={<User className="w-4 h-4 text-[#566E3D]" />}
              label="Contact Person"
              value={farmer.contactPerson || "Not available"}
            />

            <InfoCard
              icon={<Mail className="w-4 h-4 text-[#566E3D]" />}
              label="Email"
              value={farmer.userId?.email || "Not available"}
            />

            <InfoCard
              icon={<Phone className="w-4 h-4 text-[#566E3D]" />}
              label="Phone"
              value={farmer.userId?.phone || "Not available"}
            />

            <InfoCard
              icon={<MapPin className="w-4 h-4 text-[#566E3D]" />}
              label="Address"
              value={farmer.address || "Not available"}
            />
          </div>
        </section>

        {/* =========================
            WEEKLY STOCK
        ========================= */}
        <section className="bg-white rounded-3xl border border-stone-200/80 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-stone-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h2 className="text-lg font-bold text-[#12222E] flex items-center gap-2">
                <Sprout className="w-5 h-5 text-[#566E3D]" /> Current Weekly Stock
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Products currently available from this farmer
              </p>
            </div>

            <span className="text-xs font-bold px-3 py-1 bg-[#EAF2E1] text-[#566E3D] rounded-full self-start sm:self-auto">
              {stockProducts.length} product{stockProducts.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="p-6">
            {loadingStock ? (
              <div className="py-10 text-center">
                <p className="text-xs font-bold text-stone-500">
                  Loading stock...
                </p>
              </div>
            ) : stockProducts.length === 0 ? (
              <div className="py-10 text-center bg-[#FBF9F5] rounded-2xl border border-stone-100">
                <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mx-auto mb-2">
                  <Package className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-xs text-[#12222E]">
                  No products available
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  This farmer has no current stock listed.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {stockProducts.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white border border-stone-200/80 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-40 object-cover border-b border-stone-100"
                        />
                      ) : (
                        <div className="w-full h-40 bg-[#EAF2E1]/40 flex items-center justify-center text-stone-400 border-b border-stone-100">
                          <ShoppingBag className="w-8 h-8" />
                        </div>
                      )}

                      <div className="p-5 space-y-3">
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="font-bold text-base text-[#12222E]">
                            {product.name}
                          </h3>

                          <span className="text-[10px] px-2 py-0.5 bg-[#EAF2E1] text-[#566E3D] rounded-full font-extrabold uppercase">
                            Available
                          </span>
                        </div>

                        <p className="text-xs text-stone-500 font-medium">
                          Category: {product.category}
                        </p>

                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="bg-[#FBF9F5] rounded-xl p-2.5 border border-stone-100">
                            <p className="text-stone-400 font-medium">Price</p>
                            <p className="font-extrabold text-[#566E3D] mt-0.5">
                              Rs. {product.price}
                            </p>
                          </div>

                          <div className="bg-[#FBF9F5] rounded-xl p-2.5 border border-stone-100">
                            <p className="text-stone-400 font-medium">Stock</p>
                            <p className="font-extrabold text-[#12222E] mt-0.5">
                              {product.stock} {product.unit}
                            </p>
                          </div>
                        </div>

                        {product.description && (
                          <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed pt-1">
                            {product.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* =========================
            OPERATING DETAILS
        ========================= */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl border border-stone-200/80 shadow-sm p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#EAF2E1] text-[#566E3D] rounded-2xl flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-[#12222E] text-sm">
                  Operating Days
                </h3>
                <p className="text-xs text-stone-500">
                  When this farmer operates
                </p>
              </div>
            </div>

            {farmer.operatingDays?.length > 0 ? (
              <div className="flex flex-wrap gap-2 pt-1">
                {farmer.operatingDays.map((day, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-[#FBF9F5] text-[#12222E] border border-stone-200/80 rounded-xl text-xs font-bold"
                  >
                    {day}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-stone-500 pt-1">
                No operating days provided.
              </p>
            )}
          </div>

          <div className="bg-white rounded-3xl border border-stone-200/80 shadow-sm p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-50 text-amber-700 rounded-2xl flex items-center justify-center shrink-0 border border-amber-100">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-[#12222E] text-sm">
                  Pickup Windows
                </h3>
                <p className="text-xs text-stone-500">
                  Available pickup times
                </p>
              </div>
            </div>

            {farmer.pickupWindows?.length > 0 ? (
              <div className="space-y-2 pt-1">
                {farmer.pickupWindows.map((window, index) => (
                  <div
                    key={index}
                    className="px-3.5 py-2 bg-amber-50/60 border border-amber-100 text-amber-900 rounded-xl text-xs font-bold flex items-center gap-2"
                  >
                    <Clock className="w-3.5 h-3.5 text-amber-600" /> {window}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-stone-500 pt-1">
                No pickup windows provided.
              </p>
            )}
          </div>
        </section>

        {/* =========================
            MARKETS
        ========================= */}
        {farmer.markets?.length > 0 && (
          <section className="bg-white rounded-3xl border border-stone-200/80 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-stone-100">
              <h2 className="text-lg font-bold text-[#12222E] flex items-center gap-2">
                <Store className="w-5 h-5 text-[#566E3D]" /> Available Markets
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Markets where this farmer is active
              </p>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
              {farmer.markets.map((market) => (
                <div
                  key={market._id}
                  className="border border-stone-200/80 rounded-2xl p-5 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-base text-[#12222E]">
                        {market.name || "Market"}
                      </h3>
                      <Store className="w-5 h-5 text-stone-400 shrink-0" />
                    </div>

                    <p className="text-xs text-stone-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#566E3D]" />
                      {market.address || "Address not available"}
                      {market.city ? `, ${market.city}` : ""}
                    </p>

                    {(market.openingTime || market.closingTime) && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#EAF2E1] rounded-xl text-xs text-[#566E3D] font-bold mt-2">
                        <Clock className="w-3.5 h-3.5" />
                        {market.openingTime || "--"} – {market.closingTime || "--"}
                      </div>
                    )}
                  </div>

                  <div>
                    <Link
                      to={`/markets/${market._id}`}
                      className="inline-block w-full text-center py-2.5 bg-[#566E3D] hover:bg-[#455931] text-white rounded-xl text-xs font-bold transition shadow-sm"
                    >
                      View Market
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* =========================
            REVIEWS
        ========================= */}
        <section className="bg-white rounded-3xl border border-stone-200/80 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-stone-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-[#12222E] flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#566E3D]" /> Customer Reviews
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Feedback from buyers
              </p>
            </div>

            {totalReviews > 0 && (
              <div className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-100 flex items-center gap-1 self-start sm:self-auto">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                {Number(averageRating).toFixed(1)} / 5
              </div>
            )}
          </div>

          <div className="p-6">
            {reviews.length === 0 ? (
              <div className="py-8 text-center bg-[#FBF9F5] rounded-2xl border border-stone-100">
                <h3 className="font-bold text-xs text-[#12222E]">
                  No reviews yet
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Customers haven't reviewed this farmer yet.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div
                    key={review._id}
                    className="border border-stone-200/80 rounded-2xl p-4 space-y-2"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-xs text-[#12222E]">
                          {review.customer?.name || "Customer"}
                        </h3>
                        <div className="flex items-center gap-0.5 mt-1">
                          {Array.from({ length: Math.min(review.rating || 0, 5) }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                          ))}
                        </div>
                      </div>

                      <span className="text-[10px] text-stone-400 font-medium">
                        {review.createdAt
                          ? new Date(review.createdAt).toLocaleDateString()
                          : ""}
                      </span>
                    </div>

                    {review.product?.name && (
                      <p className="text-xs text-stone-500">
                        <span className="font-bold text-[#12222E]">Product:</span> {review.product.name}
                      </p>
                    )}

                    {review.comment && (
                      <p className="text-xs text-stone-600 leading-relaxed pt-1">
                        "{review.comment}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

      </main>
    </div>
  );
}

// =========================
// REUSABLE INFO CARD
// =========================
function InfoCard({ icon, label, value }) {
  return (
    <div className="bg-[#FBF9F5] rounded-2xl p-4 border border-stone-200/60">
      <div className="flex items-center gap-2 mb-1.5">
        <span>{icon}</span>
        <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
          {label}
        </p>
      </div>

      <p className="text-xs font-bold text-[#12222E] break-words">
        {value}
      </p>
    </div>
  );
}

export default FarmerDetails;