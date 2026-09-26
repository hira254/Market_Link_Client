import { useEffect, useState } from "react";
import axiosInstance from "../../utils/BaseUrl";

import { toast } from "react-toastify";
import { Users, UserPlus, Trash2, Mail, Phone, Loader2 } from "lucide-react";

const API_URL = "/api/customer/family";

function CustomerFamilySharing() {
  const [familyMembers, setFamilyMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    relation: "Spouse",
    email: "",
    phone: "",
  });

  const getToken = () => localStorage.getItem("token");

  // Fetch Family Members
  const fetchFamilyMembers = async () => {
    try {
      setLoading(true);
      const token = getToken();

      if (!token) {
        toast.error("Please login first");
        return;
      }

      const response = await axiosInstance.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setFamilyMembers(response.data.familyMembers || []);
    } catch (error) {
      console.error("FETCH FAMILY ERROR:", error);
      toast.error(
        error.response?.data?.message || "Failed to load family members"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFamilyMembers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Add Family Member
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Family member name is required");
      return;
    }

    try {
      setAdding(true);
      const token = getToken();

      const response = await axiosInstance.post(API_URL, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      toast.success(response.data.message || "Family member added!");
      setFamilyMembers(response.data.familyMembers || []);
      setFormData({ name: "", relation: "Spouse", email: "", phone: "" });
    } catch (error) {
      console.error("ADD MEMBER ERROR:", error);
      toast.error(
        error.response?.data?.message || "Failed to add family member"
      );
    } finally {
      setAdding(false);
    }
  };

  // Delete Family Member
  const handleDelete = async (memberId) => {
    try {
      const token = getToken();

      const response = await axiosInstance.delete(`${API_URL}/${memberId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(response.data.message || "Family member removed");
      setFamilyMembers(response.data.familyMembers || []);
    } catch (error) {
      console.error("DELETE MEMBER ERROR:", error);
      toast.error(
        error.response?.data?.message || "Failed to remove family member"
      );
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#415A32] animate-spin mb-2" />
        <p className="text-xs font-semibold text-slate-500">Loading family members...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm max-w-4xl mx-auto">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
        <div className="p-2.5 rounded-xl bg-[#FAF9F5] text-[#415A32]">
          <Users className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-900">Family Account Sharing</h2>
          <p className="text-xs text-slate-500">
            Link family members so they can place orders using your shared account details
          </p>
        </div>
      </div>

      {/* ADD MEMBER FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-[#FAF9F5] p-5 rounded-2xl border border-slate-200/80 mb-8 space-y-4"
      >
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Add New Family Member
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Sarah Smith"
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-[#415A32]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Relationship
            </label>
            <select
              name="relation"
              value={formData.relation}
              onChange={handleChange}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-[#415A32]"
            >
              <option value="Spouse">Spouse</option>
              <option value="Parent">Parent</option>
              <option value="Child">Child</option>
              <option value="Sibling">Sibling</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Email (Optional)
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="sarah@example.com"
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-[#415A32]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Phone (Optional)
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 234 567 890"
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-[#415A32]"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={adding}
            className="inline-flex items-center gap-2 bg-[#415A32] hover:bg-[#334727] disabled:bg-slate-300 text-white font-bold px-6 py-2.5 rounded-xl transition-all shadow-sm text-xs"
          >
            {adding ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Adding...
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                Add Family Member
              </>
            )}
          </button>
        </div>
      </form>

      {/* FAMILY MEMBERS LIST */}
      <div>
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
          Saved Family Members ({familyMembers.length})
        </h3>

        {familyMembers.length > 0 ? (
          <div className="space-y-3">
            {familyMembers.map((member) => (
              <div
                key={member._id}
                className="flex items-center justify-between p-4 bg-white border border-slate-200/80 rounded-2xl hover:border-slate-300 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#EBF2E8] text-[#2D4222] font-black flex items-center justify-center text-sm">
                    {member.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      {member.name}{" "}
                      <span className="text-xs font-normal text-slate-500">
                        ({member.relation})
                      </span>
                    </h4>
                    <div className="flex items-center gap-4 text-xs text-slate-500 mt-0.5">
                      {member.email && (
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3 text-slate-400" />
                          {member.email}
                        </span>
                      )}
                      {member.phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-slate-400" />
                          {member.phone}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleDelete(member._id)}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                  title="Remove Family Member"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                
              </div>
            ))}
          </div>
        ) : (
          <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center bg-[#FAF9F5]/50">
            <p className="text-xs text-slate-500 font-medium">
              No family members added yet. Add family members above to share your account.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomerFamilySharing;