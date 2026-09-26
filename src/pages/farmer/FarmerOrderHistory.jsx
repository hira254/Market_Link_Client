import { useEffect, useState } from "react";
import axiosInstance from "../../utils/BaseUrl";

import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

import {
  CheckCircle2,
  XCircle,
  DollarSign,
  Package,
  Calendar,
  User,
  ArrowLeft,
  AlertCircle,
  Clock,
  ShoppingBag
} from "lucide-react";

function FarmerOrderHistory() {
  const [history, setHistory] = useState({
    orders: [],
    completedOrders: 0,
    cancelledOrders: 0,
    totalRevenue: 0,
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axiosInstance.get(
          "/api/orders/farmer/history",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setHistory({
          orders: Array.isArray(response.data?.orders) ? response.data.orders : [],
          completedOrders: response.data?.completedOrders || 0,
          cancelledOrders: response.data?.cancelledOrders || 0,
          totalRevenue: response.data?.totalRevenue || 0,
        });
      } catch (error) {
        console.error(
          "HISTORY ERROR:",
          error.response?.data || error.message
        );

        setMessage(
          error.response?.data?.message ||
            "Failed to fetch order history."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const { orders = [], completedOrders = 0, cancelledOrders = 0, totalRevenue = 0 } = history;

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1E293B] flex font-sans">
      <Sidebar />

      <main className="flex-1 p-6 sm:p-10 max-w-6xl mx-auto space-y-8">
        
        {/* Navigation Breadcrumb */}
        <div className="border-b border-stone-200/60 pb-5">
          <Link
            to="/farmer/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-900 transition mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
          </Link>
          <p className="text-[11px] font-extrabold uppercase tracking-wider text-stone-400">
            FINANCIALS & RECORDS
          </p>
          <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Order History & Revenue
          </h1>
        </div>

        {/* Error Notification */}
        {message && (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{message}</span>
          </div>
        )}

        {loading ? (
          <div className="bg-white border border-[#EFECE6] rounded-2xl p-8 text-center text-xs font-semibold text-stone-400">
            Loading sales statistics...
          </div>
        ) : (
          <>
            {/* KPI Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              
              {/* Completed Count */}
              <div className="bg-white border border-[#EFECE6] rounded-2xl p-5 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-500">Completed Orders</span>
                  <div className="p-2 bg-emerald-50 rounded-xl">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                </div>
                <h2 className="text-2xl font-extrabold text-[#0F172A]">{completedOrders}</h2>
              </div>

              {/* Cancelled Count */}
              <div className="bg-white border border-[#EFECE6] rounded-2xl p-5 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-500">Cancelled Orders</span>
                  <div className="p-2 bg-rose-50 rounded-xl">
                    <XCircle className="w-4 h-4 text-rose-600" />
                  </div>
                </div>
                <h2 className="text-2xl font-extrabold text-[#0F172A]">{cancelledOrders}</h2>
              </div>

              {/* Total Revenue */}
              <div className="bg-white border border-[#EFECE6] rounded-2xl p-5 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-500">Total Revenue</span>
                  <div className="p-2 bg-amber-50 rounded-xl">
                    <DollarSign className="w-4 h-4 text-amber-600" />
                  </div>
                </div>
                <h2 className="text-2xl font-extrabold text-emerald-800">Rs. {totalRevenue}</h2>
              </div>

            </div>

            {/* Historical Log */}
            <section className="space-y-4 pt-2">
              <h2 className="text-lg font-bold text-[#0F172A]">Past Transactions</h2>

              {orders.length === 0 ? (
                <div className="bg-white border border-[#EFECE6] rounded-2xl p-10 text-center space-y-2">
                  <ShoppingBag className="w-8 h-8 text-stone-300 mx-auto" />
                  <p className="text-xs font-bold text-stone-600">No Historical Records Found</p>
                  <p className="text-xs text-stone-400">Completed or cancelled orders will be archived here.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order._id}
                      className="bg-white border border-[#EFECE6] rounded-2xl p-5 shadow-sm space-y-4"
                    >
                      {/* Top Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-stone-700 bg-stone-100 px-2.5 py-1 rounded-lg">
                            #{order._id?.slice(-6) || "N/A"}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                              order.status === "completed"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-rose-100 text-rose-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>

                        <div className="text-right">
                          <span className="text-[10px] text-stone-400 font-bold block uppercase">Total Amount</span>
                          <span className="text-sm font-extrabold text-emerald-800">
                            Rs. {order.totalAmount || 0}
                          </span>
                        </div>
                      </div>

                      {/* Info Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                        
                        <div>
                          <span className="text-[10px] font-bold text-stone-400 uppercase block">Customer</span>
                          <p className="font-bold text-[#0F172A]">{order.customer?.name || "N/A"}</p>
                          <p className="text-stone-500 truncate">{order.customer?.email || "N/A"}</p>
                        </div>

                        <div>
                          <span className="text-[10px] font-bold text-stone-400 uppercase block">Pickup Date</span>
                          <p className="font-semibold text-stone-800">
                            {order.pickupDate
                              ? new Date(order.pickupDate).toLocaleDateString(undefined, {
                                  weekday: 'short', month: 'short', day: 'numeric'
                                })
                              : "N/A"}
                          </p>
                        </div>

                        <div>
                          <span className="text-[10px] font-bold text-stone-400 uppercase block">Payment Status</span>
                          <p className="font-bold text-stone-700 capitalize">{order.paymentStatus || "N/A"}</p>
                        </div>

                      </div>

                      {/* Items List */}
                      <div className="bg-[#FAF8F5] p-3 rounded-xl border border-stone-200/50 space-y-1.5">
                        <span className="text-[10px] font-bold text-stone-400 uppercase block">Purchased Products</span>
                        <div className="space-y-1">
                          {order.items?.map((item, index) => (
                            <div key={item.product?._id || index} className="flex justify-between text-xs">
                              <span className="font-semibold text-stone-700">
                                {item.product?.name || "Product"} × {item.quantity}
                              </span>
                              <span className="font-bold text-stone-800">
                                Rs. {(item.quantity || 1) * (item.price || 0)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        )}

      </main>
    </div>
  );
}

export default FarmerOrderHistory;