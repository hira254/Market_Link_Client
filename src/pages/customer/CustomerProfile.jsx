import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import Sidebar from "../../components/Sidebar";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Pencil,
  Save,
  X,
  ShieldCheck,
} from "lucide-react";

function CustomerProfile() {
  const { user, token } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // =========================
  // GET CUSTOMER PROFILE
  // =========================
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          "http://localhost:4000/api/customer/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const profile = response.data.user;

        setFormData({
          name: profile.name || "",
          email: profile.email || "",
          phone: profile.phone || "",
          address: profile.address || "",
        });
      } catch (err) {
        console.error("PROFILE ERROR:", err);

        setError(
          err.response?.data?.message ||
            "Failed to load profile"
        );
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchProfile();
    } else {
      setError("Please login to view your profile.");
      setLoading(false);
    }
  }, [token]);

  // =========================
  // INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // EDIT PROFILE
  // =========================
  const handleEdit = () => {
    setIsEditing(true);
  };

  // =========================
  // CANCEL EDIT
  // =========================
  const handleCancel = () => {
    setIsEditing(false);

    // Reload original profile data
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/customer/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const profile = response.data.user;

        setFormData({
          name: profile.name || "",
          email: profile.email || "",
          phone: profile.phone || "",
          address: profile.address || "",
        });
      } catch (err) {
        console.error("PROFILE ERROR:", err);
      }
    };

    fetchProfile();
  };

  // =========================
  // SAVE PROFILE
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");

      const response = await axios.put(
        "http://localhost:4000/api/customer/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedUser = response.data.user;

      setFormData({
        name: updatedUser.name || "",
        email: updatedUser.email || "",
        phone: updatedUser.phone || "",
        address: updatedUser.address || "",
      });

      setIsEditing(false);

      console.log("PROFILE UPDATED:", updatedUser);
    } catch (err) {
      console.error("UPDATE PROFILE ERROR:", err);

      setError(
        err.response?.data?.message ||
          "Failed to update profile"
      );
    }
  };

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBF9F5] text-[#12222E] font-sans flex">
        <Sidebar />

        <main className="flex-1 p-6 sm:p-10">
          <div className="flex items-center justify-center min-h-[60vh]">
            <p className="text-sm font-semibold text-stone-500">
              Loading your profile...
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#12222E] font-sans flex">
      <Sidebar />

      <main className="flex-1 p-6 sm:p-10 max-w-7xl">

        {/* =========================
            HEADER
        ========================= */}
        <div className="mb-8">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#566E3D]">
            CUSTOMER PROFILE
          </span>

          <h1 className="text-3xl sm:text-4xl font-black text-[#12222E] tracking-tight mt-1">
            My Profile
          </h1>

          <p className="text-xs sm:text-sm text-stone-500 mt-1 font-medium">
            Manage your personal information and customer details.
          </p>
        </div>

        {/* =========================
            ERROR MESSAGE
        ========================= */}
        {error && (
          <div className="max-w-4xl mb-5 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-medium">
            {error}
          </div>
        )}

        {/* =========================
            PROFILE CARD
        ========================= */}
        <div className="max-w-4xl">

          <div className="bg-white border border-stone-200/80 rounded-2xl shadow-sm overflow-hidden">

            {/* =========================
                PROFILE HEADER
            ========================= */}
            <div className="bg-[#EAF2E1] px-6 sm:px-8 py-7">

              <div className="flex flex-col sm:flex-row sm:items-center gap-5">

                {/* AVATAR */}
                <div className="w-20 h-20 rounded-2xl bg-[#566E3D] text-white flex items-center justify-center shadow-sm">
                  <User className="w-9 h-9" />
                </div>

                {/* USER INFO */}
                <div className="flex-1">

                  <p className="text-xs font-bold uppercase tracking-wider text-[#566E3D]">
                    Customer Account
                  </p>

                  <h2 className="text-2xl font-black text-[#12222E] mt-1">
                    {formData.name || user?.name || "Customer"}
                  </h2>

                  <p className="text-sm text-stone-600 mt-1">
                    {formData.email || user?.email || "No email available"}
                  </p>

                </div>

                {/* EDIT BUTTON */}
                {!isEditing && (
                  <button
                    type="button"
                    onClick={handleEdit}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#566E3D] hover:bg-[#455931] text-white text-xs font-bold rounded-xl transition shadow-sm"
                  >
                    <Pencil className="w-4 h-4" />
                    Edit Profile
                  </button>
                )}

              </div>
            </div>

            {/* =========================
                PROFILE CONTENT
            ========================= */}
            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-8"
            >

              {/* SECTION TITLE */}
              <div className="flex items-center gap-2 mb-6">

                <ShieldCheck className="w-5 h-5 text-[#566E3D]" />

                <div>
                  <h3 className="font-bold text-[#12222E]">
                    Personal Information
                  </h3>

                  <p className="text-xs text-stone-500">
                    Your account and contact details
                  </p>
                </div>

              </div>

              {/* =========================
                  FIELDS
              ========================= */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* NAME */}
                <div>

                  <label className="block text-xs font-bold text-stone-600 mb-2">
                    Full Name
                  </label>

                  <div className="relative">

                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none transition ${
                        isEditing
                          ? "bg-white border-stone-300 focus:border-[#566E3D]"
                          : "bg-stone-50 border-stone-200 text-stone-600"
                      }`}
                      placeholder="Enter your name"
                    />

                  </div>

                </div>

                {/* EMAIL */}
                <div>

                  <label className="block text-xs font-bold text-stone-600 mb-2">
                    Email Address
                  </label>

                  <div className="relative">

                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none transition ${
                        isEditing
                          ? "bg-white border-stone-300 focus:border-[#566E3D]"
                          : "bg-stone-50 border-stone-200 text-stone-600"
                      }`}
                      placeholder="Enter your email"
                    />

                  </div>

                </div>

                {/* PHONE */}
                <div>

                  <label className="block text-xs font-bold text-stone-600 mb-2">
                    Contact Number
                  </label>

                  <div className="relative">

                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />

                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none transition ${
                        isEditing
                          ? "bg-white border-stone-300 focus:border-[#566E3D]"
                          : "bg-stone-50 border-stone-200 text-stone-600"
                      }`}
                      placeholder="Enter your contact number"
                    />

                  </div>

                </div>

                {/* ADDRESS */}
                <div>

                  <label className="block text-xs font-bold text-stone-600 mb-2">
                    Address
                  </label>

                  <div className="relative">

                    <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-stone-400" />

                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      disabled={!isEditing}
                      rows="3"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none transition resize-none ${
                        isEditing
                          ? "bg-white border-stone-300 focus:border-[#566E3D]"
                          : "bg-stone-50 border-stone-200 text-stone-600"
                      }`}
                      placeholder="Enter your address"
                    />

                  </div>

                </div>

              </div>

              {/* =========================
                  ACTION BUTTONS
              ========================= */}
              {isEditing && (
                <div className="flex flex-wrap justify-end gap-3 mt-8 pt-6 border-t border-stone-100">

                  {/* CANCEL */}
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-stone-300 hover:border-stone-400 text-stone-700 text-xs font-bold rounded-xl transition"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>

                  {/* SAVE */}
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#566E3D] hover:bg-[#455931] text-white text-xs font-bold rounded-xl transition shadow-sm"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>

                </div>
              )}

            </form>

          </div>

        </div>

      </main>
    </div>
  );
}

export default CustomerProfile;