import { useEffect, useState } from "react";
import axiosInstance from "../../utils/BaseUrl";

import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

import {
  Star,
  MessageSquare,
  User,
  Send,
  ArrowLeft,
  CheckCircle2,
  X,
  MessageCircle,
  ShoppingBag
} from "lucide-react";

function FarmerReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [responses, setResponses] = useState({});
  const [message, setMessage] = useState("");

 const fetchReviews = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.get(
      "/api/reviews/reviews",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("FARMER REVIEWS:", response.data);

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

  const handleResponseChange = (reviewId, value) => {
    setResponses((prev) => ({
      ...prev,
      [reviewId]: value,
    }));
  };

  const submitResponse = async (reviewId) => {
    const responseText = responses[reviewId];

    if (!responseText?.trim()) {
      setMessage("Please write a response first.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await axiosInstance.put(
        `/api/reviews/${reviewId}/respond`,
        {
          response: responseText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(
        response.data.message ||
          "Response added successfully."
      );

      setResponses((prev) => ({
        ...prev,
        [reviewId]: "",
      }));

      fetchReviews();
    } catch (error) {
      console.log(
        "RESPONSE ERROR:",
        error.response?.data || error.message
      );

      setMessage(
        error.response?.data?.message ||
          "Failed to add response."
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1E293B] flex font-sans">
      <Sidebar />

      <main className="flex-1 p-6 sm:p-10 max-w-5xl mx-auto space-y-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200/60 pb-5">
          <div>
            <Link
              to="/farmer/dashboard"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-900 transition mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
            </Link>
            <p className="text-[11px] font-extrabold uppercase tracking-wider text-stone-400">
              REPUTATION & FEEDBACK
            </p>
            <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
              Customer Reviews
            </h1>
          </div>

          <div className="flex items-center gap-2 bg-white border border-[#EFECE6] px-4 py-2 rounded-xl shadow-sm text-xs font-semibold text-stone-600">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>Total Reviews: <strong>{reviews.length}</strong></span>
          </div>
        </div>

        {/* Feedback Alert */}
        {message && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl text-xs font-semibold flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{message}</span>
            </div>
            <button onClick={() => setMessage("")} className="text-emerald-700 hover:text-emerald-900">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Reviews Listing */}
        {loading ? (
          <div className="bg-white border border-[#EFECE6] rounded-2xl p-8 text-center text-xs font-semibold text-stone-400">
            Loading buyer feedback...
          </div>
        ) : reviews.length === 0 ? (
          <div className="bg-white border border-[#EFECE6] rounded-2xl p-12 text-center space-y-3">
            <MessageSquare className="w-10 h-10 text-stone-300 mx-auto" />
            <p className="text-sm font-bold text-stone-700">No Reviews Received Yet</p>
            <p className="text-xs text-stone-400">Buyer reviews for your farm produce will appear here.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="bg-white border border-[#EFECE6] rounded-2xl p-6 shadow-sm space-y-4"
              >
                {/* Product Name & Stars */}
                <div className="flex items-start justify-between gap-4 border-b border-stone-100 pb-3">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 block mb-0.5">
                      Item Reviewed
                    </span>
                    <h3 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4 text-stone-400" />
                      {review.product?.name || "Produce Item"}
                    </h3>
                  </div>

                  {/* Star Rating Rendering */}
                  <div className="flex items-center gap-1 bg-amber-50 border border-amber-200/60 px-3 py-1 rounded-xl">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`w-3.5 h-3.5 ${
                          index < review.rating
                            ? "text-amber-500 fill-amber-500"
                            : "text-stone-200"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Customer & Comment */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-stone-500">
                    <User className="w-3.5 h-3.5 text-stone-400" />
                    <span>Customer: <strong className="text-stone-800">{review.customer?.name || "Verified Buyer"}</strong></span>
                  </div>

                  <p className="text-xs text-stone-700 bg-[#FAF8F5] p-3.5 rounded-xl border border-stone-200/50 leading-relaxed italic">
                    "{review.comment || "No comment provided."}"
                  </p>
                </div>

                {/* Existing Response Block */}
                {review.response ? (
                  <div className="bg-emerald-50/70 border-l-4 border-emerald-600 p-4 rounded-r-xl space-y-1">
                    <p className="text-[11px] font-bold text-emerald-900 flex items-center gap-1.5">
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-700" /> Your Response
                    </p>
                    <p className="text-xs text-emerald-950 font-medium">{review.response}</p>
                  </div>
                ) : (
                  /* Form to Reply */
                  <div className="pt-2 space-y-2">
                    <label className="text-[11px] font-bold text-stone-600 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-stone-400" /> Reply to Customer
                    </label>
                    <textarea
                      rows="2"
                      placeholder="Write a warm response thanking the buyer or addressing their feedback..."
                      value={responses[review._id] || ""}
                      onChange={(e) =>
                        handleResponseChange(review._id, e.target.value)
                      }
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-stone-200 rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-emerald-600 transition resize-none"
                    />

                    <button
                      onClick={() => submitResponse(review._id)}
                      className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition shadow-sm inline-flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" /> Submit Response
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}

export default FarmerReviews;