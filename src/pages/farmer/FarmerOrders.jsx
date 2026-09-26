import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

import {
  Package,
  Clock,
  User,
  Calendar,
  CreditCard,
  FileText,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  AlertCircle,
  X,
  ShoppingBag,
  ChevronRight
} from "lucide-react";

function FarmerOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:4000/api/orders/farmer/orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(response.data.orders || []);
    } catch (error) {
      console.log(
        "ORDERS ERROR:",
        error.response?.data || error.message
      );

      setMessage(
        error.response?.data?.message ||
          "Failed to fetch orders."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // =========================
  // UPDATE STATUS
  // =========================

  const updateStatus = async (orderId, status) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `http://localhost:4000/api/orders/${orderId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(
        response.data.message ||
          "Order status updated successfully!"
      );

      fetchOrders();
    } catch (error) {
      console.log(
        "STATUS ERROR:",
        error.response?.data || error.message
      );

      setMessage(
        error.response?.data?.message ||
          "Failed to update order status."
      );
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Pending</span>;
      case "confirmed":
        return <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Confirmed</span>;
      case "ready":
        return <span className="bg-purple-100 text-purple-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Ready for Pickup</span>;
      case "completed":
        return <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Completed</span>;
      case "cancelled":
        return <span className="bg-rose-100 text-rose-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Cancelled</span>;
      default:
        return <span className="bg-stone-100 text-stone-700 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">{status}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1E293B] flex font-sans">
      <Sidebar />

      <main className="flex-1 p-6 sm:p-10 max-w-6xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200/60 pb-5">
          <div>
            <Link
              to="/farmer/dashboard"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-900 transition mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
            </Link>
            <p className="text-[11px] font-extrabold uppercase tracking-wider text-stone-400">
              FULFILLMENT WORKSPACE
            </p>
            <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
              Customer Orders
            </h1>
          </div>

          <div className="flex items-center gap-2 bg-white border border-[#EFECE6] px-4 py-2 rounded-xl shadow-sm text-xs font-semibold text-stone-600">
            <Package className="w-4 h-4 text-emerald-700" />
            <span>Active Queue: <strong>{orders.length}</strong></span>
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

        {/* Orders Feed */}
        {loading ? (
          <div className="bg-white border border-[#EFECE6] rounded-2xl p-8 text-center text-xs font-semibold text-stone-400">
            Loading order fulfillment queue...
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white border border-[#EFECE6] rounded-2xl p-12 text-center space-y-3">
            <ShoppingBag className="w-10 h-10 text-stone-300 mx-auto" />
            <p className="text-sm font-bold text-stone-700">No Orders Received Yet</p>
            <p className="text-xs text-stone-400">When local buyers order your produce, they will show up here.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white border border-[#EFECE6] rounded-2xl p-6 shadow-sm space-y-5"
              >
                {/* Order Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="p-2 bg-stone-100 rounded-xl text-stone-600 font-bold text-xs">
                      #{order._id.slice(-6)}
                    </span>
                    <div>
                      <h2 className="font-bold text-sm text-[#0F172A]">Order #{order._id.slice(-6)}</h2>
                      <p className="text-[11px] text-stone-400">Manage pickup and update status</p>
                    </div>
                  </div>

                  <div>{getStatusBadge(order.status)}</div>
                </div>

                {/* Main Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Customer Info */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-stone-400 flex items-center gap-1">
                      <User className="w-3 h-3" /> Customer Details
                    </span>
                    <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-stone-200/50 space-y-1">
                      <p className="text-xs font-bold text-[#0F172A]">{order.customer?.name || "N/A"}</p>
                      <p className="text-xs text-stone-500 font-medium truncate">{order.customer?.email || "N/A"}</p>
                    </div>
                  </div>

                  {/* Pickup Window */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-stone-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> Pickup Schedule
                    </span>
                    <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-stone-200/50 space-y-1">
                      <p className="text-xs font-semibold text-[#0F172A]">
                        {new Date(order.pickupDate).toLocaleDateString(undefined, {
                          weekday: 'short', month: 'short', day: 'numeric'
                        })}
                      </p>
                      <p className="text-xs text-stone-500 font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {order.pickupWindow}
                      </p>
                    </div>
                  </div>

                  {/* Payment & Total */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-stone-400 flex items-center gap-1">
                      <CreditCard className="w-3 h-3" /> Billing & Payment
                    </span>
                    <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-stone-200/50 space-y-1">
                      <p className="text-xs text-stone-500">
                        Status: <strong className="text-stone-800 capitalize">{order.paymentStatus}</strong>
                      </p>
                      <p className="text-sm font-extrabold text-emerald-800">
                        Rs. {order.totalAmount}
                      </p>
                    </div>
                  </div>

                </div>

                {/* Items Breakdown */}
                <div className="space-y-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-stone-400">
                    Ordered Produce Items
                  </span>
                  <div className="divide-y divide-stone-100 border border-stone-100 rounded-xl overflow-hidden">
                    {order.items?.map((item, index) => (
                      <div key={index} className="p-3 bg-[#FAF8F5] flex items-center justify-between text-xs">
                        <div>
                          <p className="font-bold text-[#0F172A]">{item.product?.name}</p>
                          <p className="text-[11px] text-stone-500">Category: {item.product?.category}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-stone-700">{item.quantity} x Rs. {item.price}</p>
                          <p className="font-bold text-emerald-700">Rs. {item.subtotal}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Optional Order Notes */}
                {order.notes && (
                  <div className="bg-amber-50/60 border border-amber-200/60 p-3 rounded-xl text-xs space-y-0.5">
                    <p className="font-bold text-amber-900 flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5" /> Special Instructions:
                    </p>
                    <p className="text-amber-800 font-medium">{order.notes}</p>
                  </div>
                )}

                {/* Action Controls */}
                <div className="pt-2 border-t border-stone-100 flex items-center justify-between flex-wrap gap-3">
                  <div className="text-xs text-stone-500">
                    Current Status: <span className="font-bold text-[#0F172A] capitalize">{order.status}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {order.status === "pending" && (
                      <>
                        <button
                          onClick={() => updateStatus(order._id, "confirmed")}
                          className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition inline-flex items-center gap-1.5 shadow-sm"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" /> Confirm Order
                        </button>
                        <button
                          onClick={() => updateStatus(order._id, "cancelled")}
                          className="px-4 py-2 border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-bold rounded-xl transition inline-flex items-center gap-1.5"
                        >
                          <XCircle className="w-3.5 h-3.5" /> Cancel Order
                        </button>
                      </>
                    )}

                    {order.status === "confirmed" && (
                      <button
                        onClick={() => updateStatus(order._id, "ready")}
                        className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold rounded-xl transition inline-flex items-center gap-1.5 shadow-sm"
                      >
                        <Package className="w-3.5 h-3.5" /> Mark Ready for Pickup
                      </button>
                    )}

                    {order.status === "ready" && (
                      <button
                        onClick={() => updateStatus(order._id, "completed")}
                        className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition inline-flex items-center gap-1.5 shadow-sm"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" /> Mark Completed
                      </button>
                    )}

                    {order.status === "completed" && (
                      <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Fulfilled Successfully
                      </span>
                    )}

                    {order.status === "cancelled" && (
                      <span className="text-xs font-bold text-rose-600 flex items-center gap-1">
                        <XCircle className="w-4 h-4" /> Order Cancelled
                      </span>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}

export default FarmerOrders;