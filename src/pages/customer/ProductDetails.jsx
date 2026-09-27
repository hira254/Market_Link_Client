import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../utils/BaseUrl";
import Navbar from "../../components/Navbar";
import ProductReviews from "../../components/reviews/ProductReviews";

import {
  ArrowLeft,
  ShoppingCart,
  Star,
  CheckCircle,
  XCircle,
  Minus,
  Plus,
  ShoppingBag,
} from "lucide-react";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [orderId, setOrderId] = useState(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [quantity, setQuantity] = useState(1);

  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  // =========================
  // FETCH PRODUCT + REVIEWS + ORDER
  // =========================
  useEffect(() => {
    fetchProduct();
    fetchReviews();
    findCompletedOrder();
  }, [id]);

  // =========================
  // FIND COMPLETED ORDER
  // =========================
  const findCompletedOrder = () => {
    try {
      const savedOrders =
        JSON.parse(localStorage.getItem("orders")) || [];

      console.log("SAVED ORDERS:", savedOrders);
      console.log("CURRENT PRODUCT ID:", id);

      const completedOrder = savedOrders.find(
        (order) =>
          order.status === "completed" &&
          order.items?.some(
            (item) =>
              item.product === id ||
              item.product?._id === id
          )
      );

      console.log("COMPLETED ORDER:", completedOrder);

      if (completedOrder) {
        const foundOrderId =
          completedOrder._id ||
          completedOrder.id;

        console.log("FOUND ORDER ID:", foundOrderId);

        setOrderId(foundOrderId);
      } else {
        console.log(
          "NO COMPLETED ORDER FOUND FOR THIS PRODUCT"
        );

        setOrderId(null);
      }
    } catch (error) {
      console.error(
        "ORDER ID ERROR:",
        error
      );

      setOrderId(null);
    }
  };

  // =========================
  // FETCH PRODUCT
  // =========================
  const fetchProduct = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const response =
        await axiosInstance.get(
          `/api/products/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      console.log(
        "PRODUCT RESPONSE:",
        response.data
      );

      setProduct(
        response.data.product ||
          response.data
      );
    } catch (error) {
      console.log(
        "PRODUCT DETAILS ERROR:",
        error.response?.data ||
          error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // FETCH REVIEWS
  // =========================

const fetchReviews = async () => { try { const response = await axiosInstance.get( `/api/reviews/product/${id}` ); console.log("REVIEWS RESPONSE:", response.data); setReviews(response.data.reviews || []); setTotalReviews(response.data.count || 0); if (response.data.reviews?.length > 0) { const totalRating = response.data.reviews.reduce( (sum, review) => sum + Number(review.rating || 0), 0 ); const average = totalRating / response.data.reviews.length; setAverageRating(average.toFixed(1)); } else { setAverageRating(0); } } catch (error) { console.error( "Failed to fetch reviews:", error.response?.data || error.message ); setReviews([]); setTotalReviews(0); setAverageRating(0); } };
  // =========================
  // QUANTITY
  // =========================
  const increaseQuantity = () => {
    if (
      product &&
      quantity <
        Number(product.stock)
    ) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // =========================
  // ADD TO CART
  // =========================
  const handleAddToCart = async () => {
    if (!product) return;

    try {
      const token =
        localStorage.getItem("token");

      if (!token) {
        alert("Please login first.");
        navigate("/login");
        return;
      }

      const response =
        await axiosInstance.post(
          "/api/cart/add",
          {
            product: product._id,
            quantity: quantity,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      console.log(
        "ADD TO CART RESPONSE:",
        response.data
      );

      alert(
        response.data.message ||
          "Product added to cart!"
      );

      navigate("/cart");
    } catch (error) {
      console.log(
        "ADD TO CART ERROR:",
        error.response?.data ||
          error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to add product to cart"
      );
    }
  };

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBF9F5]">
        <Navbar />

        <div className="max-w-7xl mx-auto py-16 text-center text-xs font-bold text-stone-500">
          Loading product...
        </div>
      </div>
    );
  }

  // =========================
  // PRODUCT NOT FOUND
  // =========================
  if (!product) {
    return (
      <div className="min-h-screen bg-[#FBF9F5] text-[#12222E]">
        <Navbar />

        <div className="max-w-lg mx-auto px-4 py-16 text-center">
          <div className="bg-white border border-stone-200/80 rounded-2xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-[#12222E]">
              Product not found
            </h2>

            <Link
              to="/products"
              className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 bg-[#566E3D] hover:bg-[#455931] text-white rounded-xl text-xs font-bold transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const available =
    product.isAvailable === true &&
    Number(product.stock) > 0;

  // =========================
  // UI
  // =========================
  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#12222E] font-sans flex flex-col justify-between">
      <Navbar />

      {/* BACK BUTTON */}
      <div className="border-b border-stone-200/60 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/products"
            className="text-xs font-bold text-[#566E3D] hover:underline flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Products
          </Link>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-grow w-full">

        {/* =========================
            PRODUCT SECTION
        ========================= */}
        <section className="bg-white rounded-3xl border border-stone-200/80 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* IMAGE */}
            <div className="bg-[#EAF2E1]/40 min-h-[350px] lg:min-h-[500px] flex items-center justify-center p-6">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full max-h-[480px] object-cover rounded-2xl"
                />
              ) : (
                <div className="text-stone-300 flex flex-col items-center">
                  <ShoppingBag className="w-20 h-20" />

                  <span className="text-xs mt-2 font-medium">
                    No Image Available
                  </span>
                </div>
              )}
            </div>

            {/* DETAILS */}
            <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
              <div>

                {/* CATEGORY */}
                <span className="inline-block px-3 py-1 bg-[#EAF2E1] text-[#566E3D] rounded-lg text-[10px] font-bold uppercase tracking-wider">
                  {product.category}
                </span>

                {/* NAME */}
                <h1 className="text-3xl sm:text-4xl font-black text-[#12222E] mt-3">
                  {product.name}
                </h1>

                {/* PRICE */}
                <p className="text-3xl font-black text-[#566E3D] mt-4">
                  Rs. {product.price}

                  <span className="text-sm text-stone-400 font-normal">
                    {" "}
                    / {product.unit}
                  </span>
                </p>

                {/* AVAILABILITY */}
                <div className="mt-4 flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
                      available
                        ? "bg-[#EAF2E1] text-[#566E3D]"
                        : "bg-rose-50 text-rose-600"
                    }`}
                  >
                    {available ? (
                      <CheckCircle className="w-3.5 h-3.5" />
                    ) : (
                      <XCircle className="w-3.5 h-3.5" />
                    )}

                    {available
                      ? "Available"
                      : "Out of Stock"}
                  </span>

                  <span className="text-xs text-stone-500 font-medium">
                    {product.stock}{" "}
                    {product.unit} available
                  </span>
                </div>

                {/* DESCRIPTION */}
                {product.description && (
                  <div className="mt-6">
                    <h3 className="font-bold text-[#12222E] text-xs uppercase tracking-wider">
                      About this product
                    </h3>

                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mt-1.5 font-medium">
                      {product.description}
                    </p>
                  </div>
                )}
              </div>

              {/* =========================
                  QUANTITY + REVIEW + CART
              ========================= */}
              <div className="mt-8 pt-6 border-t border-stone-100 space-y-6">

                {/* QUANTITY */}
                {available && (
                  <div>
                    <p className="text-xs font-bold text-[#12222E] mb-2">
                      Quantity
                    </p>

                    <div className="flex items-center gap-3">

                      <div className="flex items-center border border-stone-200 rounded-xl overflow-hidden bg-stone-50">

                        <button
                          onClick={
                            decreaseQuantity
                          }
                          className="p-2.5 font-bold text-stone-600 hover:bg-stone-200 transition"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>

                        <span className="px-4 text-xs font-bold text-[#12222E]">
                          {quantity}
                        </span>

                        <button
                          onClick={
                            increaseQuantity
                          }
                          disabled={
                            quantity >=
                            Number(
                              product.stock
                            )
                          }
                          className="p-2.5 font-bold text-stone-600 hover:bg-stone-200 transition disabled:opacity-30"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>

                      </div>

                      <span className="text-xs text-stone-500 font-medium">
                        {product.unit}
                      </span>
                    </div>
                  </div>
                )}

                {/* REVIEW FORM */}
                <ProductReviews
                  productId={product._id}
                  orderId={orderId}
                />

                {/* ADD TO CART */}
                <button
                  onClick={
                    handleAddToCart
                  }
                  disabled={!available}
                  className="w-full py-3.5 bg-[#566E3D] hover:bg-[#455931] text-white rounded-xl font-bold text-xs disabled:bg-stone-200 disabled:text-stone-400 disabled:cursor-not-allowed transition shadow-sm flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />

                  {available
                    ? "Add to Cart"
                    : "Out of Stock"}
                </button>

              </div>
            </div>
          </div>
        </section>

        {/* =========================
            CUSTOMER REVIEWS
        ========================= */}
        <section className="bg-white rounded-3xl border border-stone-200/80 shadow-sm overflow-hidden">

          {/* HEADER */}
          <div className="p-6 sm:p-8 border-b border-stone-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

              <div>
                <h2 className="text-xl font-bold text-[#12222E] flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-500 fill-amber-500" />

                  Customer Reviews
                </h2>

                <p className="text-xs text-stone-500 mt-0.5">
                  What customers say about this product.
                </p>
              </div>

              {totalReviews > 0 && (
                <div className="text-center bg-amber-50 px-4 py-2.5 rounded-xl border border-amber-100">

                  <p className="text-xl font-extrabold text-amber-700 flex items-center justify-center gap-1">
                    <Star className="w-4 h-4 fill-amber-500" />

                    {averageRating}
                  </p>

                  <p className="text-[10px] font-bold text-amber-800">
                    {totalReviews} review
                    {totalReviews !== 1
                      ? "s"
                      : ""}
                  </p>

                </div>
              )}

            </div>
          </div>

          {/* REVIEWS LIST */}
          <div className="p-6 sm:p-8">

            {reviews.length === 0 ? (
              <div className="py-8 text-center bg-stone-50 rounded-2xl border border-stone-100">

                <h3 className="font-bold text-xs text-[#12222E]">
                  No reviews yet
                </h3>

                <p className="text-xs text-stone-500 mt-1">
                  Customers haven't reviewed this product yet.
                </p>

              </div>
            ) : (
              <div className="space-y-4">

                {reviews.map(
                  (review) => (
                    <div
                      key={review._id}
                      className="border border-stone-200/80 rounded-2xl p-5 space-y-2"
                    >

                      <div className="flex justify-between items-start">

                        <div>

                          <h3 className="font-bold text-xs text-[#12222E]">
                            {review.customer
                              ?.name ||
                              "Customer"}
                          </h3>

                          <div className="flex items-center gap-0.5 mt-1">

                            {Array.from({
                              length: Math.min(
                                Number(
                                  review.rating
                                ) || 0,
                                5
                              ),
                            }).map(
                              (_, i) => (
                                <Star
                                  key={i}
                                  className="w-3.5 h-3.5 text-amber-500 fill-amber-500"
                                />
                              )
                            )}

                          </div>
                        </div>

                        <span className="text-[10px] text-stone-400 font-medium">
                          {review.createdAt
                            ? new Date(
                                review.createdAt
                              ).toLocaleDateString()
                            : ""}
                        </span>

                      </div>

                      {review.comment && (
                        <p className="text-xs text-stone-600 leading-relaxed pt-1">
                          "{review.comment}"
                        </p>
                      )}

                      {review.response && (
                        <div className="mt-4 ml-4 bg-emerald-50 border-l-4 border-emerald-600 rounded-r-xl p-4">

                          <p className="text-[11px] font-bold text-emerald-800 mb-1">
                            Farmer Response
                          </p>

                          <p className="text-xs text-emerald-900 leading-relaxed">
                            {review.response}
                          </p>

                        </div>
                      )}

                    </div>
                  )
                )}

              </div>
            )}

          </div>
        </section>
      </main>
    </div>
  );
}

export default ProductDetails;