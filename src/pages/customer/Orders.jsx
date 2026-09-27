import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import axiosInstance from "../../utils/BaseUrl";
import { ShoppingBag, Star, Calendar, Clock, RefreshCw, XCircle, Edit3 } from "lucide-react";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [reviewProduct, setReviewProduct] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const [editDate, setEditDate] = useState("");
  const [editTime, setEditTime] = useState("");

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const response = await axiosInstance.get("/api/orders/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("MY ORDERS:", response.data);
      setOrders(response.data.orders || []);
    } catch (error) {
      console.error("LOAD ORDERS ERROR:", error.response?.data || error.message);
      setOrders([]);
    }
  };

  const submitReview = async (orderId) => {
    try {
      const token = localStorage.getItem("token");

      await axiosInstance.post(
        "/api/reviews",
        {
          product: reviewProduct.product,
          order: orderId,
          rating: Number(rating),
          comment,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Review submitted successfully!");
      setReviewProduct(null);
      setRating(5);
      setComment("");
    } catch (error) {
      console.log("REVIEW ERROR:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to submit review");
    }
  };

  const cancelOrder = (orderId) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this order?");
    if (!confirmCancel) return;

    const updatedOrders = orders.map((order) =>
      (order._id || order.id) === orderId ? { ...order, status: "Cancelled" } : order
    );

    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    if ((selectedOrder?._id || selectedOrder?.id) === orderId) {
      setSelectedOrder({ ...selectedOrder, status: "Cancelled" });
    }
  };

  const openModify = (order) => {
    if (order.status === "Completed" || order.status === "Cancelled") {
      alert("This order cannot be modified.");
      return;
    }

    setSelectedOrder(order);
    setEditDate(order.pickupDate ? new Date(order.pickupDate).toISOString().split("T")[0] : "");
    setEditTime(order.pickupWindow || order.pickupTime || "");
  };

  const saveModification = () => {
    if (!editDate || !editTime) {
      alert("Please select pickup date and time.");
      return;
    }

    const updatedOrders = orders.map((order) =>
      (order._id || order.id) === (selectedOrder._id || selectedOrder.id)
        ? { ...order, pickupDate: editDate, pickupWindow: editTime }
        : order
    );

    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    setSelectedOrder({ ...selectedOrder, pickupDate: editDate, pickupWindow: editTime });
    alert("Order updated successfully!");
  };

  const reorder = (order) => {
    if (!order.items || order.items.length === 0) {
      alert("No products available for reorder.");
      return;
    }

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    order.items.forEach((orderItem) => {
      const existingItem = existingCart.find((item) => item.product === orderItem.product);
      if (existingItem) {
        existingItem.quantity += orderItem.quantity;
      } else {
        existingCart.push({ ...orderItem });
      }
    });

    localStorage.setItem("cart", JSON.stringify(existingCart));
    alert("Products added to cart!");
    window.location.href = "/cart";
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Placed":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Accepted":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Ready":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Completed":
      case "completed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Cancelled":
      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="flex min-h-screen bg-[#FBF9F5] text-[#12222E] font-sans">
      <Sidebar />

      <div className="flex-1 min-w-0 overflow-y-auto">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 w-full">
          {/* HEADER */}
          <div className="flex justify-between items-center border-b border-stone-200/80 pb-6">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#566E3D]">
                PURCHASE HISTORY
              </span>
              <h1 className="text-3xl font-black text-[#12222E] mt-1">My Orders</h1>
              <p className="text-xs text-stone-500 mt-1">
                View your current orders, order history and manage your pre-orders.
              </p>
            </div>
            <Link to="/dashboard">
              <button className="px-4 py-2 bg-white border border-stone-300 hover:border-stone-400 text-stone-700 text-xs font-bold rounded-xl transition shadow-sm">
                Back to Dashboard
              </button>
            </Link>
          </div>

          {/* ORDERS LIST */}
          {orders.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl border border-stone-200/80 text-center space-y-4 shadow-sm">
              <div className="w-16 h-16 bg-[#EAF2E1] rounded-full flex items-center justify-center mx-auto text-[#566E3D]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-[#12222E]">No Orders Yet</h2>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                You haven't placed any pre-orders yet. Explore seasonal produce from local growers!
              </p>
              <Link to="/products" className="inline-block">
                <button className="px-6 py-2.5 bg-[#566E3D] hover:bg-[#455931] text-white text-xs font-bold rounded-xl shadow-sm transition">
                  Browse Products
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {orders.map((order) => (
                <div
                  key={order._id || order.id}
                  className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-sm space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="font-bold text-sm text-[#12222E]">Order #{order._id || order.id}</h2>
                      </div>
                      <span
                        className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full border ${getStatusBadge(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </div>

                    <div className="text-xs space-y-1.5 text-stone-600 pt-3 border-t border-stone-100">
                      <p className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-stone-400" />
                        <strong>Pickup Date:</strong>{" "}
                        {order.pickupDate ? new Date(order.pickupDate).toLocaleDateString() : "N/A"}
                      </p>

                      <p className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-stone-400" />
                        <strong>Pickup Time:</strong> {order.pickupWindow || order.pickupTime || "N/A"}
                      </p>

                      <p className="font-bold text-[#566E3D] text-sm pt-1">
                        Total: Rs. {order.totalAmount || order.total || 0}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-stone-100 space-y-2">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="flex-1 py-2 bg-[#566E3D] text-white text-xs font-bold rounded-xl hover:bg-[#455931] transition"
                      >
                        View Details
                      </button>

                      {order.status !== "Completed" &&
                        order.status !== "completed" &&
                        order.status !== "Cancelled" &&
                        order.status !== "cancelled" && (
                          <>
                            <button
                              onClick={() => openModify(order)}
                              className="px-3 py-2 bg-stone-100 text-stone-700 text-xs font-bold rounded-xl hover:bg-stone-200 transition flex items-center gap-1"
                            >
                              <Edit3 className="w-3.5 h-3.5" /> Modify
                            </button>
                            <button
                              onClick={() => cancelOrder(order._id || order.id)}
                              className="px-3 py-2 bg-rose-50 text-rose-600 text-xs font-bold rounded-xl border border-rose-100 hover:bg-rose-100 transition flex items-center gap-1"
                            >
                              <XCircle className="w-3.5 h-3.5" /> Cancel
                            </button>
                          </>
                        )}

                      {(order.status === "Completed" || order.status === "completed") && (
                        <button
                          onClick={() => reorder(order)}
                          className="px-3 py-2 bg-[#EAF2E1] text-[#566E3D] border border-[#566E3D]/20 text-xs font-bold rounded-xl hover:bg-[#d9e8cb] transition flex items-center gap-1"
                        >
                          <RefreshCw className="w-3.5 h-3.5" /> Reorder
                        </button>
                      )}
                    </div>

                    {(order.status === "Completed" || order.status === "completed") && (
                      <div className="pt-2 border-t border-stone-100">
                        <span className="text-[10px] font-extrabold text-stone-400 uppercase tracking-wider">
                          Review Products:
                        </span>

                        <div className="flex flex-wrap gap-1.5 mt-1.5">
                          {order.items?.map((item, idx) => (
                            <button
                              key={item.product?._id || item.product || idx}
                              onClick={() =>
                                setReviewProduct({
                                  product: item.product?._id || item.product,
                                  name: item.product?.name || item.name || "Product",
                                  orderId: order._id || order.id,
                                })
                              }
                              className="px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200/80 text-[10px] font-bold rounded-lg hover:bg-amber-100 transition flex items-center gap-1"
                            >
                              <Star className="w-3 h-3 text-amber-500 fill-amber-500" /> Review{" "}
                              {item.product?.name || item.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* REVIEW MODAL */}
          {reviewProduct && (
            <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-lg max-w-xl mx-auto space-y-4">
              <h2 className="text-lg font-bold text-[#12222E] flex items-center gap-1.5">
                <Star className="w-5 h-5 text-amber-500 fill-amber-500" /> Write Review
              </h2>
              <h3 className="text-sm font-bold text-stone-700">{reviewProduct.name}</h3>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-stone-600 mb-1">Rating</label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs outline-none bg-white font-medium"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ - Excellent (5)</option>
                    <option value={4}>⭐⭐⭐⭐ - Good (4)</option>
                    <option value={3}>⭐⭐⭐ - Average (3)</option>
                    <option value={2}>⭐⭐ - Poor (2)</option>
                    <option value={1}>⭐ - Terrible (1)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-600 mb-1">Comment</label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write your review here..."
                    rows="3"
                    maxLength="500"
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs outline-none resize-none font-medium"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() =>
                      submitReview(
                        reviewProduct.orderId ||
                          orders.find((o) =>
                            o.items?.some((i) => (i.product?._id || i.product) === reviewProduct.product)
                          )?._id
                      )
                    }
                    className="px-4 py-2 bg-[#566E3D] text-white text-xs font-bold rounded-xl hover:bg-[#455931] transition"
                  >
                    Submit Review
                  </button>
                  <button
                    onClick={() => setReviewProduct(null)}
                    className="px-4 py-2 bg-stone-100 text-stone-700 text-xs font-bold rounded-xl hover:bg-stone-200 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ORDER DETAILS MODAL */}
          {selectedOrder && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/80 shadow-lg space-y-6">
              <div className="flex justify-between items-center border-b border-stone-100 pb-4">
                <h2 className="text-xl font-bold text-[#12222E]">Order Details</h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-xl transition"
                >
                  Close Details
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs text-stone-700 bg-stone-50 p-4 rounded-xl">
                <p>
                  <strong>Order ID:</strong> {selectedOrder._id || selectedOrder.id}
                </p>
                <p>
                  <strong>Status:</strong> {selectedOrder.status}
                </p>
                <p>
                  <strong>Pickup Date:</strong>{" "}
                  {selectedOrder.pickupDate
                    ? new Date(selectedOrder.pickupDate).toLocaleDateString()
                    : "N/A"}
                </p>
                <p>
                  <strong>Pickup Time:</strong>{" "}
                  {selectedOrder.pickupWindow || selectedOrder.pickupTime || "N/A"}
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-bold text-sm text-[#12222E]">Items Ordered</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {selectedOrder.items?.map((item, idx) => (
                    <div
                      key={item.product?._id || item.product || idx}
                      className="p-3 bg-stone-50/60 rounded-xl border border-stone-200/70 text-xs space-y-1"
                    >
                      <p className="font-bold text-[#12222E]">
                        {item.product?.name || item.name || "Product"}
                      </p>
                      <p className="text-stone-500">Quantity: {item.quantity}</p>
                      <p className="text-stone-500">
                        Price: Rs. {item.product?.price || item.price || 0}
                      </p>
                      <p className="font-bold text-[#566E3D] pt-1">
                        Subtotal: Rs.{" "}
                        {(item.product?.price || item.price || 0) * (item.quantity || 0)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100 flex justify-between items-center">
                <h3 className="text-lg font-black text-[#12222E]">
                  Total: Rs. {selectedOrder.totalAmount || selectedOrder.total || 0}
                </h3>
                {selectedOrder.notes && (
                  <p className="text-xs text-stone-600">
                    <strong>Notes:</strong> {selectedOrder.notes}
                  </p>
                )}
              </div>

              {selectedOrder.status !== "Completed" &&
                selectedOrder.status !== "completed" &&
                selectedOrder.status !== "Cancelled" &&
                selectedOrder.status !== "cancelled" && (
                  <div className="pt-4 border-t border-stone-100 space-y-3">
                    <h2 className="text-base font-bold text-[#12222E]">Modify Pickup</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-stone-600 mb-1">Pickup Date</label>
                        <input
                          type="date"
                          value={editDate}
                          min={new Date().toISOString().split("T")[0]}
                          onChange={(e) => setEditDate(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs outline-none bg-white font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-stone-600 mb-1">Pickup Time</label>
                        <select
                          value={editTime}
                          onChange={(e) => setEditTime(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs outline-none bg-white font-medium"
                        >
                          <option value="">Select pickup time</option>
                          <option value="09:00 AM">09:00 AM</option>
                          <option value="10:00 AM">10:00 AM</option>
                          <option value="11:00 AM">11:00 AM</option>
                          <option value="12:00 PM">12:00 PM</option>
                          <option value="01:00 PM">01:00 PM</option>
                          <option value="02:00 PM">02:00 PM</option>
                          <option value="03:00 PM">03:00 PM</option>
                          <option value="04:00 PM">04:00 PM</option>
                          <option value="05:00 PM">05:00 PM</option>
                          <option value="06:00 PM">06:00 PM</option>
                        </select>
                      </div>
                    </div>
                    <button
                      onClick={saveModification}
                      className="px-4 py-2 bg-[#566E3D] text-white text-xs font-bold rounded-xl hover:bg-[#455931] transition"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Orders;