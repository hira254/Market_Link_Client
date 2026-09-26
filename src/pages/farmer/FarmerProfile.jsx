import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { toast } from "react-toastify";
import { 
  Store, 
  MapPin, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  ArrowLeft, 
  Building2, 
  Save, 
  Loader2 
} from "lucide-react";

const API_URL = "http://localhost:4000/api/farmers";

function FarmerProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    stallName: "",
    contactPerson: "",
    markets: [],
    operatingDays: [],
    pickupWindows: "",
    address: "",
    latitude: "",
    longitude: "",
  });

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const updateFormState = (data) => {
    if (!data) return;
    setFormData({
      stallName: data.stallName || "",
      contactPerson: data.contactPerson || "",
      markets: Array.isArray(data.markets) ? data.markets : [],
      operatingDays: Array.isArray(data.operatingDays) ? data.operatingDays : [],
      pickupWindows: data.pickupWindows || "",
      address: data.address || "",
      latitude: data.latitude !== null && data.latitude !== undefined ? data.latitude : "",
      longitude: data.longitude !== null && data.longitude !== undefined ? data.longitude : "",
    });
  };

  const getToken = () => localStorage.getItem("token");

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const token = getToken();

      if (!token) {
        toast.error("Please login first");
        setLoading(false);
        return;
      }

      const response = await axios.get(`${API_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const rawData = response.data;
      const profileData = rawData?.profile || rawData?.data || rawData;

      if (profileData && (profileData.stallName || profileData._id)) {
        setProfile(profileData);
        updateFormState(profileData);
      } else {
        setProfile(null);
      }
    } catch (error) {
      if (error.response?.status === 404) {
        setProfile(null);
        setFormData({
          stallName: "",
          contactPerson: "",
          markets: [],
          operatingDays: [],
          pickupWindows: "",
          address: "",
          latitude: "",
          longitude: "",
        });
      } else {
        console.error("PROFILE ERROR:", error.response?.data || error);
        toast.error(error.response?.data?.message || "Failed to load farmer profile");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDayChange = (day) => {
    setFormData((prev) => {
      const alreadySelected = prev.operatingDays.includes(day);
      return {
        ...prev,
        operatingDays: alreadySelected
          ? prev.operatingDays.filter((item) => item !== day)
          : [...prev.operatingDays, day],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.stallName.trim() || !formData.contactPerson.trim() || !formData.address.trim()) {
      toast.error("Please fill in all required fields (*)");
      return;
    }

    try {
      setSaving(true);
      const token = getToken();

      const payload = {
        ...formData,
        latitude: formData.latitude !== "" ? Number(formData.latitude) : null,
        longitude: formData.longitude !== "" ? Number(formData.longitude) : null,
      };

      let response;
      if (profile) {
        response = await axios.put(`${API_URL}/profile`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success(response.data?.message || "Profile updated successfully");
      } else {
        response = await axios.post(`${API_URL}/profile`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success(response.data?.message || "Profile created successfully");
      }

      const updatedProfile = response.data?.profile || response.data?.data || response.data;
      if (updatedProfile) {
        setProfile(updatedProfile);
        updateFormState(updatedProfile);
      }
    } catch (error) {
      console.error("SAVE PROFILE ERROR:", error);
      toast.error(error.response?.data?.message || "Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF9F5] flex">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center flex flex-col items-center">
            <Loader2 className="w-10 h-10 text-[#415A32] animate-spin mb-3" />
            <p className="text-sm font-medium text-slate-600">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    // FIX 1: Flex layout taaki Sidebar left par fixed/fit rahe aur main content right side par shift ho jaye
    <div className="flex min-h-screen bg-[#FAF9F5] text-slate-800 font-sans">
      <Sidebar />

      {/* FIX 2: Main Area container width fix and padding adjust */}
      <div className="flex-1 min-w-0 pb-16 px-4 sm:px-8 pt-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          
          {/* HERO BANNER */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <span className="text-[11px] font-extrabold tracking-widest text-[#415A32] uppercase">
                Farmer Workspace
              </span>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mt-1">
                Stall Profile
              </h1>
              <p className="text-xs md:text-sm text-slate-500 mt-1 max-w-xl">
                Configure your stall details, operating hours, pickup windows, and location settings.
              </p>
            </div>

            <Link
              to="/farmer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#415A32] hover:bg-[#334727] text-white text-xs font-bold transition-all shadow-sm shrink-0 self-start md:self-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              Dashboard
            </Link>
          </div>

          {/* STATUS BADGE */}
          {profile && (
            <div className="mb-8 bg-[#EBF2E8] border border-[#C5DCBD] rounded-2xl p-4 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#415A32] shrink-0" />
              <p className="text-xs md:text-sm font-semibold text-[#2D4222]">
                Your farmer profile is active and saved across the market network.
              </p>
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* BASIC INFO */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <div className="p-2.5 rounded-xl bg-[#FAF9F5] text-[#415A32]">
                  <Store className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Basic Information</h2>
                  <p className="text-xs text-slate-500">Your stall brand and main representative details</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Stall / Business Name *
                  </label>
                  <input
                    type="text"
                    name="stallName"
                    value={formData.stallName}
                    onChange={handleChange}
                    placeholder="e.g. Green Fresh Farm"
                    className="w-full bg-[#FAF9F5] border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:ring-2 focus:ring-[#415A32] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Contact Person *
                  </label>
                  <input
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    placeholder="e.g. Ali Farmer"
                    className="w-full bg-[#FAF9F5] border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:ring-2 focus:ring-[#415A32] outline-none"
                  />
                </div>
              </div>
            </div>

            {/* OPERATING DAYS */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <div className="p-2.5 rounded-xl bg-[#FAF9F5] text-[#415A32]">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Operating Days</h2>
                  <p className="text-xs text-slate-500">Select the days your stall is open for orders and pickup</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {days.map((day) => {
                  const isSelected = formData.operatingDays.includes(day);
                  return (
                    <label
                      key={day}
                      className={`flex items-center gap-3 border rounded-2xl px-4 py-3.5 cursor-pointer transition-all ${
                        isSelected
                          ? "bg-[#EBF2E8] border-[#415A32] text-[#2D4222] font-bold"
                          : "bg-[#FAF9F5] border-slate-200 text-slate-600 font-medium"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleDayChange(day)}
                        className="w-4 h-4 accent-[#415A32]"
                      />
                      <span className="text-xs md:text-sm">{day}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* PICKUP INFO */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <div className="p-2.5 rounded-xl bg-[#FAF9F5] text-[#415A32]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Pickup Information</h2>
                  <p className="text-xs text-slate-500">Specify hours when customers can collect orders</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Pickup Window
                </label>
                <input
                  type="text"
                  name="pickupWindows"
                  value={formData.pickupWindows}
                  onChange={handleChange}
                  placeholder="e.g. 09:00 AM - 01:00 PM"
                  className="w-full bg-[#FAF9F5] border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:ring-2 focus:ring-[#415A32] outline-none"
                />
              </div>
            </div>

            {/* LOCATION */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <div className="p-2.5 rounded-xl bg-[#FAF9F5] text-[#415A32]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Location Details</h2>
                  <p className="text-xs text-slate-500">Physical address and geo-coordinates for mapping</p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Address *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    className="w-full bg-[#FAF9F5] border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:ring-2 focus:ring-[#415A32] outline-none resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Latitude</label>
                    <input
                      type="number"
                      step="any"
                      name="latitude"
                      value={formData.latitude}
                      onChange={handleChange}
                      className="w-full bg-[#FAF9F5] border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:ring-2 focus:ring-[#415A32] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Longitude</label>
                    <input
                      type="number"
                      step="any"
                      name="longitude"
                      value={formData.longitude}
                      onChange={handleChange}
                      className="w-full bg-[#FAF9F5] border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:ring-2 focus:ring-[#415A32] outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* MARKETS */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100">
                <div className="p-2.5 rounded-xl bg-[#FAF9F5] text-[#415A32]">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Associated Markets</h2>
                  <p className="text-xs text-slate-500">Markets connected through the market management panel</p>
                </div>
              </div>

              {formData.markets && formData.markets.length > 0 ? (
                <div className="flex flex-wrap gap-2 pt-2">
                  {formData.markets.map((market, index) => {
                    const displayName = typeof market === "object" ? (market.name || market.marketName || "Market") : market;
                    return (
                      <span
                        key={typeof market === "object" ? market._id || index : index}
                        className="px-4 py-2 bg-[#EBF2E8] border border-[#C5DCBD] text-[#2D4222] rounded-full text-xs font-bold"
                      >
                        {displayName}
                      </span>
                    );
                  })}
                </div>
              ) : (
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center bg-[#FAF9F5]/50">
                  <p className="text-slate-500 text-xs font-medium">No markets linked to your profile yet.</p>
                </div>
              )}
            </div>

            {/* SUBMIT BUTTON */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={saving}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#415A32] hover:bg-[#334727] disabled:bg-slate-300 text-white font-bold px-8 py-3.5 rounded-2xl shadow-md transition-all text-sm"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    {profile ? "Update Profile" : "Create Profile"}
                  </>
                )}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div> 
  );
}

export default FarmerProfile;