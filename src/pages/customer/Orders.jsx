import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import axios from "axios";

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

    if (!token) {
      return;
    }

    const response = await axios.get(
      "http://localhost:4000/api/orders/my",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("MY ORDERS:", response.data);

    setOrders(response.data.orders || []);
  } catch (error) {
    console.error(
      "LOAD ORDERS ERROR:",
      error.response?.data || error.message
    );

    setOrders([]);
  }
};

  const submitReview = async (orderId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:4000/api/reviews",
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
      order.id === orderId ? { ...order, status: "Cancelled" } : order
    );

    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    if (selectedOrder?.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: "cancelled" });
    }
  };

  const openModify = (order) => {
    if (order.status === "completed" || order.status === "cancelled") {
      alert("This order cannot be modified.");
      return;
    }

    setSelectedOrder(order);
    setEditDate(order.pickupDate);
    setEditTime(order.pickupTime);
  };

  const saveModification = () => {
    if (!editDate || !editTime) {
      alert("Please select pickup date and time.");
      return;
    }

    const updatedOrders = orders.map((order) =>
      order.id === selectedOrder.id
        ? { ...order, pickupDate: editDate, pickupTime: editTime }
        : order
    );

    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    setSelectedOrder({ ...selectedOrder, pickupDate: editDate, pickupTime: editTime });
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
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Cancelled":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF5]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="flex justify-between items-center border-b border-marketlink-beige-warm/50 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-marketlink-olive-dark">My Orders</h1>
            <p className="text-xs text-marketlink-earth-deep/70 mt-1">
              View your current orders, order history and manage your pre-orders.
            </p>
          </div>
          <Link to="/dashboard">
            <button className="px-4 py-2 bg-marketlink-olive-deep text-white hover:bg-marketlink-olive-dark text-xs font-bold rounded-xl">
              Back to Dashboard
            </button>
          </Link>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-marketlink-beige-warm/40 text-center space-y-4">
            <h2 className="text-xl font-bold text-marketlink-olive-dark">No Orders Yet</h2>
            <p className="text-xs text-slate-500">You haven't placed any pre-orders yet.</p>
            <Link to="/products">
              <button className="px-6 py-2.5 bg-marketlink-gold-harvest hover:bg-marketlink-gold-brown text-marketlink-olive-dark text-xs font-bold rounded-xl">
                Browse Products
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white p-6 rounded-2xl border border-marketlink-beige-warm/40 shadow-sm space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h2 className="font-bold text-base text-marketlink-olive-dark">Order #{order._id}</h2>
                    <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full border ${getStatusBadge(order.status)}`}>
                      {order.status}
                    </span>
                  </div>

                  <div className="text-xs space-y-1 text-slate-700 pt-2 border-t border-slate-100">
                    <p>
  <strong>Pickup Date:</strong>{" "}
  {new Date(order.pickupDate).toLocaleDateString()}
</p>

<p>
  <strong>Pickup Time:</strong>{" "}
  {order.pickupWindow}
</p>

<p className="font-bold text-marketlink-earth-deep">
  <strong>Total:</strong> Rs. {order.totalAmount}
</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="flex-1 py-2 bg-marketlink-olive-deep text-white text-xs font-bold rounded-lg hover:bg-marketlink-olive-dark"
                    >
                      View Details
                    </button>

                    {order.status !== "Completed" && order.status !== "Cancelled" && (
                      <>
                        <button
                          onClick={() => openModify(order)}
                          className="px-3 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-200"
                        >
                          Modify
                        </button>
                        <button
                          onClick={() => cancelOrder(order.id)}
                          className="px-3 py-2 bg-red-50 text-red-600 text-xs font-bold rounded-lg border border-red-200 hover:bg-red-100"
                        >
                          Cancel
                        </button>
                      </>
                    )}

                    {order.status === "Completed" && (
                      <button
                        onClick={() => reorder(order)}
                        className="px-3 py-2 bg-marketlink-gold-harvest text-marketlink-olive-dark text-xs font-bold rounded-lg hover:bg-marketlink-gold-brown"
                      >
                        Reorder
                      </button>
                    )}
                  </div>

                 {order.status === "completed" && (
  <div className="pt-2 border-t border-slate-100">
    <span className="text-[10px] font-bold text-slate-500 uppercase">
      Review Products:
    </span>

    <div className="flex flex-wrap gap-1 mt-1">
      {order.items?.map((item) => (
        <button
          key={item.product?._id}
          onClick={() =>
            setReviewProduct({
              product: item.product?._id,
              name: item.product?.name,
              orderId: order._id,
            })
          }
          className="px-2 py-1 bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold rounded hover:bg-amber-100"
        >
          ⭐ Review {item.product?.name}
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

    
        {reviewProduct && (
          <div className="bg-white p-6 rounded-2xl border border-marketlink-beige-warm/40 shadow-lg max-w-xl mx-auto space-y-4">
            <h2 className="text-lg font-bold text-marketlink-olive-dark">⭐ Write Review</h2>
            <h3 className="text-sm font-semibold text-slate-700">{reviewProduct.name}</h3>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Rating</label>
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none bg-white"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ - 5</option>
                  <option value={4}>⭐⭐⭐⭐ - 4</option>
                  <option value={3}>⭐⭐⭐ - 3</option>
                  <option value={2}>⭐⭐ - 2</option>
                  <option value={1}>⭐ - 1</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Comment</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write your review..."
                  rows="3"
                  maxLength="500"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none resize-none"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => submitReview(reviewProduct.orderId || orders.find((o) => o.items?.some((i) => i.product === reviewProduct.product))?.id)}
                  className="px-4 py-2 bg-marketlink-olive-deep text-white text-xs font-bold rounded-xl hover:bg-marketlink-olive-dark"
                >
                  Submit Review
                </button>
                <button
                  onClick={() => setReviewProduct(null)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

  
        {selectedOrder && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-marketlink-beige-warm/40 shadow-lg space-y-6">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-marketlink-olive-dark">Order Details</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-bold rounded-lg"
              >
                Close Details
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs text-slate-700">
              <p><strong>Order ID:</strong> {selectedOrder.id}</p>
              <p><strong>Status:</strong> {selectedOrder.status}</p>
              <p><strong>Pickup Date:</strong> {selectedOrder.pickupDate}</p>
              <p><strong>Pickup Time:</strong> {selectedOrder.pickupTime}</p>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-sm text-marketlink-olive-dark">Products</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {selectedOrder.items?.map((item) => (
                  <div key={item.product} className="p-3 bg-[#FAFAF5] rounded-xl border border-slate-200 text-xs space-y-1">
                    <p className="font-bold text-slate-800">{item.name}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: Rs. {item.price}</p>
                    <p className="font-semibold text-marketlink-earth-deep">Subtotal: Rs. {item.price * item.quantity}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-marketlink-olive-dark">Total: Rs. {selectedOrder.total}</h3>
              {selectedOrder.notes && <p className="text-xs text-slate-600"><strong>Notes:</strong> {selectedOrder.notes}</p>}
            </div>

         
            {selectedOrder.status !== "Completed" && selectedOrder.status !== "Cancelled" && (
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <h2 className="text-base font-bold text-marketlink-olive-dark">Modify Pickup</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Pickup Date</label>
                    <input
                      type="date"
                      value={editDate}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setEditDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Pickup Time</label>
                    <select
                      value={editTime}
                      onChange={(e) => setEditTime(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none bg-white"
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
                  className="px-4 py-2 bg-marketlink-olive-deep text-white text-xs font-bold rounded-xl hover:bg-marketlink-olive-dark"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;