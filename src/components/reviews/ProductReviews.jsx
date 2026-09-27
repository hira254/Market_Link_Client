import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  getProductReviews,
  createReview,
} from "../../services/reviewService";

function ProductReviews({ productId, orderId }) {
  const { user, token } = useAuth();

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

const fetchReviews = async () => {
  try {
    const data = await getProductReviews(productId);
    setReviews(data.reviews || []);
  } catch (error) {
    console.error(
      "Failed to fetch reviews:",
      error.response?.data || error.message
    );
  }
};

useEffect(() => {
  if (productId) {
    fetchReviews();
  }
}, [productId]);

  useEffect(() => {
    if (productId && token) {
      fetchReviews();
    }
  }, [productId, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!orderId) {
      setMessage("You need a completed order to review this product.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      await createReview(
        {
          product: productId,
          order: orderId,
          rating,
          comment,
        },
        token
      );

      setComment("");
      setRating(5);

      setMessage("Review added successfully ⭐");

      await fetchReviews();
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Failed to add review"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8">

      <h2 className="text-2xl font-bold mb-5">
        Customer Reviews
      </h2>

      {/* ADD REVIEW */}

      {user?.role === "customer" && orderId && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-5 rounded-xl shadow mb-8"
        >
          <h3 className="text-lg font-semibold mb-4">
            Leave a Review
          </h3>

          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Rating
            </label>

            <select
              value={rating}
              onChange={(e) =>
                setRating(Number(e.target.value))
              }
              className="border rounded-lg px-3 py-2"
            >
              <option value={5}>⭐⭐⭐⭐⭐ - 5</option>
              <option value={4}>⭐⭐⭐⭐ - 4</option>
              <option value={3}>⭐⭐⭐ - 3</option>
              <option value={2}>⭐⭐ - 2</option>
              <option value={1}>⭐ - 1</option>
            </select>
          </div>

          <textarea
            value={comment}
            onChange={(e) =>
              setComment(e.target.value)
            }
            placeholder="Write your review..."
            maxLength={500}
            rows={4}
            className="w-full border rounded-lg p-3 mb-4"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>

          {message && (
            <p className="mt-3 text-sm">
              {message}
            </p>
          )}
        </form>
      )}

      {/* REVIEWS */}

      {reviews.length === 0 ? (
        <p className="text-gray-500">
          No reviews yet.
        </p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white border rounded-xl p-5"
            >
              <div className="flex justify-between items-center">

                <h3 className="font-semibold">
                  {review.customer?.name || "Customer"}
                </h3>

                <span className="text-yellow-500">
                  {"⭐".repeat(review.rating)}
                </span>

              </div>

              {review.comment && (
                <p className="text-gray-700 mt-3">
                  {review.comment}
                </p>
              )}

              <p className="text-xs text-gray-400 mt-3">
                {new Date(
                  review.createdAt
                ).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default ProductReviews;