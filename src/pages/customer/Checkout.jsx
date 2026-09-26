import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../utils/BaseUrl";

import Navbar from "../../components/Navbar";

function Checkout() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [notes, setNotes] = useState("");
  const [success, setSuccess] = useState(false);
  const [order, setOrder] = useState(null);

  // FAMILY SHARING
  const [familyMembers, setFamilyMembers] = useState([]);
  const [orderedFor, setOrderedFor] = useState(
    "Myself (Account Owner)"
  );

  // ==========================================
  // LOAD CART + FAMILY MEMBERS
  // ==========================================
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axiosInstance.get(
          "/api/cart",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("CHECKOUT CART:", response.data);

        const backendCart = response.data.cart;

        setCart(backendCart?.items || []);
      } catch (error) {
        console.error(
          "CHECKOUT CART ERROR:",
          error.response?.data || error.message
        );

        setCart([]);
      }
    };

    const fetchFamilyMembers = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) return;

        const response = await axiosInstance.get(
          "/api/customer/family",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setFamilyMembers(
          response.data.familyMembers || []
        );
      } catch (error) {
        console.error(
          "FAILED TO LOAD FAMILY MEMBERS:",
          error.response?.data || error.message
        );
      }
    };

    fetchCart();
    fetchFamilyMembers();
  }, [navigate]);

  // ==========================================
  // TOTAL
  // ==========================================
  const total = cart.reduce(
    (sum, item) =>
      sum +
      Number(item.product?.price || 0) *
        Number(item.quantity || 0),
    0
  );

  // ==========================================
  // PLACE ORDER
  // ==========================================
  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!pickupDate || !pickupTime) {
      alert("Please select pickup date and time.");
      return;
    }

    if (!cart.length) {
      alert("Your cart is empty.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first.");
        navigate("/login");
        return;
      }

      // Convert cart items to order items
      const orderItems = cart.map((item) => ({
        product: item.product?._id,
        quantity: Number(item.quantity),
      }));

      console.log("ORDER ITEMS:", orderItems);

      // CREATE ORDER
      const response = await axiosInstance.post(
        "/api/orders",
        {
          items: orderItems,
          pickupDate,
          pickupWindow: pickupTime,
          notes: `${notes || ""}${
            orderedFor
              ? ` Ordered For: ${orderedFor}`
              : ""
          }`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("ORDER CREATED:", response.data);

      const createdOrder = response.data.order;

      // ==========================================
      // SAVE ORDER LOCALLY
      // ==========================================
      const existingOrders =
        JSON.parse(localStorage.getItem("orders")) || [];

      localStorage.setItem(
        "orders",
        JSON.stringify([
          ...existingOrders,
          createdOrder,
        ])
      );

      // ==========================================
      // CLEAR BACKEND CART
      // ==========================================
      await axiosInstance.delete(
        "/api/cart/clear",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Clear old local cart too
      localStorage.removeItem("cart");

      // ==========================================
      // SHOW SUCCESS
      // ==========================================
      setOrder(createdOrder);
      setCart([]);
      setSuccess(true);
    } catch (error) {
      console.error(
        "CREATE ORDER ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to place order."
      );
    }
  };

  // ==========================================
  // SUCCESS SCREEN
  // ==========================================
  if (success && order) {
    return (
      <div className="min-h-screen bg-[#FAFAF5]">
        <Navbar />

        <div className="max-w-2xl mx-auto px-4 py-12">
          <div className="bg-white p-8 rounded-2xl border border-marketlink-beige-warm/40 shadow-lg text-center space-y-6">

            <div className="text-5xl">🎉</div>

            <h1 className="text-3xl font-extrabold text-marketlink-olive-dark">
              Pre-Order Confirmed!
            </h1>

            <p className="text-sm text-slate-600">
              Your order has been placed successfully.
            </p>

            {/* ORDER DETAILS */}
            <div className="bg-[#FAFAF5] p-6 rounded-xl border border-marketlink-beige-warm/60 text-left space-y-3 text-xs text-slate-700">

              <h2 className="font-bold text-sm text-marketlink-olive-dark border-b border-slate-200 pb-2 mb-3">
                Order Details
              </h2>

              <p>
                <strong>Order ID:</strong>{" "}
                {order._id}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span className="font-bold text-marketlink-harvest-brown">
                  {order.status}
                </span>
              </p>

              <p>
                <strong>Ordered For:</strong>{" "}
                <span className="font-semibold text-marketlink-olive-dark">
                  {orderedFor}
                </span>
              </p>

              <p>
                <strong>Pickup Date:</strong>{" "}
                {order.pickupDate
                  ? new Date(
                      order.pickupDate
                    ).toLocaleDateString()
                  : ""}
              </p>

              <p>
                <strong>Pickup Time:</strong>{" "}
                {order.pickupWindow}
              </p>

              <p>
                <strong>Total:</strong>{" "}
                Rs. {order.totalAmount}
              </p>

              {order.notes && (
                <p>
                  <strong>Notes:</strong>{" "}
                  {order.notes}
                </p>
              )}

            </div>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">

              <Link to="/orders">
                <button className="w-full sm:w-auto px-6 py-3 bg-marketlink-olive-deep hover:bg-marketlink-olive-dark text-white text-xs font-bold rounded-xl transition-all shadow-sm">
                  View My Orders
                </button>
              </Link>

              <Link to="/products">
                <button className="w-full sm:w-auto px-6 py-3 bg-marketlink-sage/30 hover:bg-marketlink-sage/50 text-marketlink-olive-dark text-xs font-bold rounded-xl transition-all border border-marketlink-sage/40">
                  Continue Shopping
                </button>
              </Link>

            </div>

          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // EMPTY CART
  // ==========================================
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAFAF5]">
        <Navbar />

        <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">

          <h1 className="text-3xl font-extrabold text-marketlink-olive-dark">
            Checkout
          </h1>

          <p className="text-sm text-slate-600">
            Your cart is empty.
          </p>

          <Link to="/products">
            <button className="px-6 py-3 bg-marketlink-olive-deep text-white text-xs font-bold rounded-xl">
              Browse Products
            </button>
          </Link>

        </div>
      </div>
    );
  }

  // ==========================================
  // CHECKOUT PAGE
  // ==========================================
  return (
    <div className="min-h-screen bg-[#FAFAF5]">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-extrabold text-marketlink-olive-dark">
            Pre-Order / Checkout
          </h1>

          <p className="text-xs text-marketlink-earth-deep/80 mt-1">
            Select your pickup date and time. Payment will be made at pickup.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* ==========================================
              ORDER SUMMARY
          ========================================== */}
          <div className="bg-white p-6 rounded-2xl border border-marketlink-beige-warm/40 shadow-sm space-y-4">

            <h2 className="text-lg font-bold text-marketlink-olive-dark border-b border-slate-100 pb-3">
              Order Summary
            </h2>

            <div className="space-y-3 max-h-80 overflow-y-auto">

              {cart.map((item) => (
                <div
                  key={item._id || item.product?._id}
                  className="text-xs space-y-1 pb-3 border-b border-slate-100 last:border-0"
                >

                  <h3 className="font-bold text-slate-800">
                    {item.product?.name}
                  </h3>

                  <p className="text-slate-500">
                    {item.quantity} × Rs.{" "}
                    {item.product?.price}
                  </p>

                  <p className="font-semibold text-marketlink-earth-deep">
                    Subtotal: Rs.{" "}
                    {Number(
                      item.product?.price || 0
                    ) *
                      Number(
                        item.quantity || 0
                      )}
                  </p>

                </div>
              ))}

            </div>

            <div className="pt-3 border-t border-slate-200">

              <h2 className="text-xl font-extrabold text-marketlink-olive-dark">
                Total: Rs. {total}
              </h2>

            </div>

          </div>

          {/* ==========================================
              PICKUP + FAMILY FORM
          ========================================== */}
          <div className="bg-white p-6 rounded-2xl border border-marketlink-beige-warm/40 shadow-sm space-y-4">

            <h2 className="text-lg font-bold text-marketlink-olive-dark border-b border-slate-100 pb-3">
              Pickup Details
            </h2>

            <form
              onSubmit={handlePlaceOrder}
              className="space-y-4"
            >

              {/* FAMILY MEMBER */}
              <div className="bg-[#FAFAF5] p-3.5 rounded-xl border border-marketlink-beige-warm/60">

                <label className="block text-xs font-semibold text-marketlink-olive-dark uppercase tracking-wider mb-1">
                  Who is placing / picking up this order?
                </label>

                <select
                  value={orderedFor}
                  onChange={(e) =>
                    setOrderedFor(e.target.value)
                  }
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-marketlink-gold-harvest text-xs outline-none bg-white font-medium text-slate-800"
                >

                  <option value="Myself (Account Owner)">
                    Myself (Account Owner)
                  </option>

                  {familyMembers.map((member) => (
                    <option
                      key={member._id}
                      value={`${member.name} (${member.relation})`}
                    >
                      {member.name} —{" "}
                      {member.relation}
                    </option>
                  ))}

                </select>

              </div>

              {/* PICKUP DATE */}
              <div>

                <label className="block text-xs font-semibold text-marketlink-olive-dark uppercase tracking-wider mb-1">
                  Pickup Date
                </label>

                <input
                  type="date"
                  value={pickupDate}
                  min={
                    new Date()
                      .toISOString()
                      .split("T")[0]
                  }
                  onChange={(e) =>
                    setPickupDate(e.target.value)
                  }
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-marketlink-beige-warm/60 focus:ring-2 focus:ring-marketlink-gold-harvest text-xs outline-none"
                />

              </div>

              {/* PICKUP TIME */}
              <div>

                <label className="block text-xs font-semibold text-marketlink-olive-dark uppercase tracking-wider mb-1">
                  Pickup Time
                </label>

                <select
                  value={pickupTime}
                  onChange={(e) =>
                    setPickupTime(e.target.value)
                  }
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-marketlink-beige-warm/60 focus:ring-2 focus:ring-marketlink-gold-harvest text-xs outline-none bg-white"
                >

                  <option value="">
                    Select pickup time
                  </option>

                  <option value="09:00 AM">
                    09:00 AM
                  </option>

                  <option value="10:00 AM">
                    10:00 AM
                  </option>

                  <option value="11:00 AM">
                    11:00 AM
                  </option>

                  <option value="12:00 PM">
                    12:00 PM
                  </option>

                  <option value="01:00 PM">
                    01:00 PM
                  </option>

                  <option value="02:00 PM">
                    02:00 PM
                  </option>

                  <option value="03:00 PM">
                    03:00 PM
                  </option>

                  <option value="04:00 PM">
                    04:00 PM
                  </option>

                  <option value="05:00 PM">
                    05:00 PM
                  </option>

                  <option value="06:00 PM">
                    06:00 PM
                  </option>

                </select>

              </div>

              {/* NOTES */}
              <div>

                <label className="block text-xs font-semibold text-marketlink-olive-dark uppercase tracking-wider mb-1">
                  Pickup Notes (Optional)
                </label>

                <textarea
                  placeholder="Any special instructions..."
                  value={notes}
                  onChange={(e) =>
                    setNotes(e.target.value)
                  }
                  rows="3"
                  className="w-full px-4 py-2.5 rounded-xl border border-marketlink-beige-warm/60 focus:ring-2 focus:ring-marketlink-gold-harvest text-xs outline-none resize-none"
                />

              </div>

              {/* PLACE ORDER */}
              <button
                type="submit"
                className="w-full py-3.5 bg-marketlink-olive-deep hover:bg-marketlink-olive-dark text-white font-bold text-xs rounded-xl shadow-md transition-all"
              >
                Place Pre-Order
              </button>

            </form>

            {/* BACK TO CART */}
            <div className="pt-2">

              <Link to="/cart">
                <button className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors">
                  Back to Cart
                </button>
              </Link>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Checkout;