import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import Sidebar from "../../components/Sidebar";
import { toast } from "react-toastify";
import {
  Bell,
  Check,
  CheckCheck,
  Trash2,
  Package,
  ShoppingBag,
  Info,
  RefreshCw,
} from "lucide-react";

function CustomerNotifications() {
  const { token } = useAuth();

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================
  // GET NOTIFICATIONS
  // =========================
  const fetchNotifications = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "http://localhost:4000/api/notifications/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotifications(response.data.notifications || []);
    } catch (error) {
      console.error("NOTIFICATION ERROR:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load notifications"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // LOAD ON PAGE OPEN
  // =========================
  useEffect(() => {
    if (token) {
      fetchNotifications();
    }
  }, [token]);

  // =========================
  // MARK ONE AS READ
  // =========================
  const handleMarkAsRead = async (id) => {
    try {
      await axios.put(
        `http://localhost:4000/api/notifications/${id}/read`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === id
            ? { ...notification, isRead: true }
            : notification
        )
      );

      toast.success("Notification marked as read");
    } catch (error) {
      console.error("MARK READ ERROR:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to mark notification as read"
      );
    }
  };

  // =========================
  // MARK ALL AS READ
  // =========================
  const handleMarkAllAsRead = async () => {
    try {
      await axios.put(
        "http://localhost:4000/api/notifications/read-all",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          isRead: true,
        }))
      );

      toast.success("All notifications marked as read");
    } catch (error) {
      console.error("MARK ALL READ ERROR:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to mark notifications"
      );
    }
  };

  // =========================
  // DELETE NOTIFICATION
  // =========================
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:4000/api/notifications/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotifications((prev) =>
        prev.filter(
          (notification) => notification._id !== id
        )
      );

      toast.success("Notification deleted");
    } catch (error) {
      console.error("DELETE NOTIFICATION ERROR:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to delete notification"
      );
    }
  };

  // =========================
  // NOTIFICATION ICON
  // =========================
  const getNotificationIcon = (type) => {
    if (type === "order") {
      return <ShoppingBag className="w-5 h-5" />;
    }

    if (type === "product") {
      return <Package className="w-5 h-5" />;
    }

    return <Info className="w-5 h-5" />;
  };

  // =========================
  // NOTIFICATION COUNTS
  // =========================
  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBF9F5] flex text-[#12222E]">
        <Sidebar />

        <main className="flex-1 p-6 sm:p-10">
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="flex items-center gap-2 text-sm font-semibold text-stone-500">
              <RefreshCw className="w-4 h-4 animate-spin" />
              Loading notifications...
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#12222E] flex font-sans">

      <Sidebar />

      <main className="flex-1 p-6 sm:p-10 max-w-7xl">

        {/* =========================
            HEADER
        ========================= */}
        <div className="mb-8">

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">

            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#566E3D]">
                CUSTOMER NOTIFICATIONS
              </span>

              <h1 className="text-3xl sm:text-4xl font-black text-[#12222E] tracking-tight mt-1">
                Notifications
              </h1>

              <p className="text-xs sm:text-sm text-stone-500 mt-1 font-medium">
                Stay updated with your orders and MarketLink activity.
              </p>
            </div>

            {/* MARK ALL */}
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#566E3D] hover:bg-[#455931] text-white text-xs font-bold rounded-xl transition shadow-sm"
              >
                <CheckCheck className="w-4 h-4" />
                Mark All as Read
              </button>
            )}

          </div>
        </div>

        {/* =========================
            SUMMARY
        ========================= */}
        <div className="max-w-4xl mb-6">

          <div className="bg-white border border-stone-200/80 rounded-2xl p-5 shadow-sm">

            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-xl bg-[#EAF2E1] text-[#566E3D] flex items-center justify-center">
                <Bell className="w-6 h-6" />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-stone-400">
                  Notification Center
                </p>

                <p className="text-lg font-black text-[#12222E]">
                  {notifications.length}{" "}
                  {notifications.length === 1
                    ? "Notification"
                    : "Notifications"}
                </p>
              </div>

              {unreadCount > 0 && (
                <div className="ml-auto">
                  <span className="px-3 py-1.5 rounded-full bg-[#EAF2E1] text-[#566E3D] text-xs font-bold">
                    {unreadCount} Unread
                  </span>
                </div>
              )}

            </div>
          </div>

        </div>

        {/* =========================
            NOTIFICATIONS
        ========================= */}
        <div className="max-w-4xl space-y-3">

          {notifications.length === 0 ? (

            /* EMPTY STATE */
            <div className="bg-white border border-stone-200/80 rounded-2xl p-12 text-center shadow-sm">

              <div className="w-16 h-16 mx-auto rounded-2xl bg-[#EAF2E1] text-[#566E3D] flex items-center justify-center">
                <Bell className="w-7 h-7" />
              </div>

              <h3 className="text-lg font-black text-[#12222E] mt-5">
                No Notifications
              </h3>

              <p className="text-sm text-stone-500 mt-1">
                You're all caught up. New updates will appear here.
              </p>

            </div>

          ) : (

            notifications.map((notification) => (

              <div
                key={notification._id}
                className={`bg-white border rounded-2xl p-5 shadow-sm transition ${
                  notification.isRead
                    ? "border-stone-200"
                    : "border-[#B8C99E] bg-[#FCFDF9]"
                }`}
              >

                <div className="flex gap-4">

                  {/* ICON */}
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                      notification.isRead
                        ? "bg-stone-100 text-stone-500"
                        : "bg-[#EAF2E1] text-[#566E3D]"
                    }`}
                  >
                    {getNotificationIcon(notification.type)}
                  </div>

                  {/* CONTENT */}
                  <div className="flex-1 min-w-0">

                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">

                      <div>

                        <div className="flex items-center gap-2">

                          <h3 className="font-bold text-[#12222E]">
                            {notification.title}
                          </h3>

                          {!notification.isRead && (
                            <span className="w-2 h-2 rounded-full bg-[#566E3D]" />
                          )}

                        </div>

                        <p className="text-sm text-stone-600 mt-1 leading-relaxed">
                          {notification.message}
                        </p>

                      </div>

                      <span className="text-[11px] text-stone-400 shrink-0">
                        {new Date(
                          notification.createdAt
                        ).toLocaleString()}
                      </span>

                    </div>

                    {/* ACTIONS */}
                    <div className="flex flex-wrap items-center gap-2 mt-4">

                      {!notification.isRead && (
                        <button
                          onClick={() =>
                            handleMarkAsRead(
                              notification._id
                            )
                          }
                          className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#EAF2E1] hover:bg-[#DDE9D0] text-[#566E3D] text-xs font-bold rounded-lg transition"
                        >
                          <Check className="w-3.5 h-3.5" />
                          Mark as Read
                        </button>
                      )}

                      <button
                        onClick={() =>
                          handleDelete(notification._id)
                        }
                        className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-red-50 border border-stone-200 hover:border-red-200 text-stone-500 hover:text-red-600 text-xs font-bold rounded-lg transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete
                      </button>

                    </div>

                  </div>

                </div>

              </div>

            ))

          )}

        </div>

      </main>
    </div>
  );
}

export default CustomerNotifications;