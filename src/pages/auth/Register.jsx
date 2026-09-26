
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar";
import { toast } from "react-toastify";

import marketBanner from "../../assets/market-banner.jpg";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState("customer");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    stallName: "",
    phone: "",
    email: "",
    address: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRoleChange = (newRole) => {
    setRole(newRole);

    // Clear farmer-specific fields when switching back to customer
    if (newRole === "customer") {
      setFormData((prev) => ({
        ...prev,
        stallName: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password confirmation
    if (formData.password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    // Common required fields
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Name, email and password are required.");
      return;
    }

    // Farmer-specific validation
    if (role === "farmer") {
      if (
        !formData.stallName ||
        !formData.phone ||
        !formData.address
      ) {
        toast.error(
          "Farmers must provide stall name, contact number and address."
        );
        return;
      }
    }

    try {
      const response = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        address: formData.address,
        role: role,

        // Only send stallName for farmer
        ...(role === "farmer" && {
          stallName: formData.stallName,
        }),
      });

      console.log("REGISTER:", response);

      toast.success("Registration successful! Please login.");

      navigate("/login");
    } catch (error) {
      console.log("REGISTER ERROR:", error.response?.data);

      toast.error(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-stone-800 font-sans flex flex-col justify-between">
      <Navbar />

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-grow flex items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full max-w-5xl">

          {/* LEFT SIDE */}
          <div className="hidden lg:flex flex-col items-center justify-center bg-[#EAF2E1] border border-stone-200/80 rounded-3xl overflow-hidden shadow-sm h-full min-h-[560px]">
            <img
              src={marketBanner}
              alt="Farm Fresh Market"
              className="w-full h-full object-cover rounded-3xl"
            />
          </div>

          {/* RIGHT SIDE */}
          <div className="bg-white border border-stone-200/80 rounded-3xl p-6 sm:p-8 shadow-sm max-w-lg mx-auto w-full">

            <div className="mb-5">
              <h1 className="text-3xl font-black text-[#1C2819] tracking-tight">
                Create your account
              </h1>

              <p className="text-xs text-stone-500 mt-1">
                Join MarketLink as a customer or list your stall as a farmer.
              </p>
            </div>

            {/* ROLE SELECTOR */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-stone-100 rounded-xl mb-5">

              <button
                type="button"
                onClick={() => handleRoleChange("customer")}
                className={`py-2 text-xs font-bold rounded-lg transition ${
                  role === "customer"
                    ? "bg-[#566E3D] text-white shadow-sm"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                I'm a Customer
              </button>

              <button
                type="button"
                onClick={() => handleRoleChange("farmer")}
                className={`py-2 text-xs font-bold rounded-lg transition ${
                  role === "farmer"
                    ? "bg-[#566E3D] text-white shadow-sm"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                I'm a Farmer
              </button>

            </div>

            <form
              className="space-y-3.5"
              onSubmit={handleSubmit}
            >

              {/* FARMER STALL NAME */}
              {role === "farmer" && (
                <div>
                  <label className="block text-xs font-bold text-stone-600 mb-1">
                    Stall / Business Name *
                  </label>

                  <input
                    type="text"
                    name="stallName"
                    placeholder="Green Fresh Farm"
                    value={formData.stallName}
                    onChange={handleChange}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-xs text-stone-800 outline-none focus:bg-white focus:border-[#566E3D] focus:ring-1 focus:ring-[#566E3D] transition"
                  />
                </div>
              )}

              {/* NAME + PHONE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                <div>
                  <label className="block text-xs font-bold text-stone-600 mb-1">
                    {role === "farmer"
                      ? "Contact Person *"
                      : "Full Name *"}
                  </label>

                  <input
                    type="text"
                    name="name"
                    placeholder={
                      role === "farmer"
                        ? "Ali Ahmed"
                        : "John Doe"
                    }
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-xs text-stone-800 outline-none focus:bg-white focus:border-[#566E3D] focus:ring-1 focus:ring-[#566E3D] transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-600 mb-1">
                    {role === "farmer"
                      ? "Contact Number *"
                      : "Phone (optional)"}
                  </label>

                  <input
                    type="text"
                    name="phone"
                    placeholder="+92 300 1234567"
                    value={formData.phone}
                    onChange={handleChange}
                    required={role === "farmer"}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-xs text-stone-800 outline-none focus:bg-white focus:border-[#566E3D] focus:ring-1 focus:ring-[#566E3D] transition"
                  />
                </div>

              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-xs font-bold text-stone-600 mb-1">
                  Email *
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-xs text-stone-800 outline-none focus:bg-white focus:border-[#566E3D] focus:ring-1 focus:ring-[#566E3D] transition"
                />
              </div>

              {/* ADDRESS */}
              <div>
                <label className="block text-xs font-bold text-stone-600 mb-1">
                  {role === "farmer"
                    ? "Address *"
                    : "Address (optional)"}
                </label>

                <input
                  type="text"
                  name="address"
                  placeholder="Street address, city"
                  value={formData.address}
                  onChange={handleChange}
                  required={role === "farmer"}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-xs text-stone-800 outline-none focus:bg-white focus:border-[#566E3D] focus:ring-1 focus:ring-[#566E3D] transition"
                />
              </div>

              {/* PASSWORDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                <div>
                  <label className="block text-xs font-bold text-stone-600 mb-1">
                    Password *
                  </label>

                  <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-xs text-stone-800 outline-none focus:bg-white focus:border-[#566E3D] focus:ring-1 focus:ring-[#566E3D] transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-600 mb-1">
                    Confirm Password *
                  </label>

                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                    placeholder="••••••••"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-xs text-stone-800 outline-none focus:bg-white focus:border-[#566E3D] focus:ring-1 focus:ring-[#566E3D] transition"
                  />
                </div>

              </div>

              {/* REGISTER BUTTON */}
              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#566E3D] hover:bg-[#455931] text-white rounded-xl text-xs font-bold transition shadow-sm mt-2"
              >
                Create account
              </button>

            </form>

            {/* LOGIN */}
            <div className="mt-6 border-t border-stone-100 pt-5 text-center">
              <p className="text-xs text-stone-500 font-medium">
                Already have an account?{" "}

                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="font-bold text-[#566E3D] hover:underline ml-1"
                >
                  Login
                </button>
              </p>
            </div>

          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#12222E] text-white mt-12 py-12 border-t border-slate-800">

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-xs text-slate-300">

          <div>
            <h4 className="font-extrabold text-white text-base mb-2">
              MarketLink
            </h4>

            <p className="leading-relaxed text-slate-400">
              Connecting local farmers with customers directly.
              Browse fresh produce, pre-order, and pick up at your chosen market.
            </p>
          </div>

          <div>
            <h5 className="font-bold text-white uppercase tracking-wider mb-3">
              Explore
            </h5>

            <ul className="space-y-2">
              <li>
                <Link to="/markets" className="hover:underline">
                  Markets
                </Link>
              </li>

              <li>
                <Link to="/farmers" className="hover:underline">
                  Farmers
                </Link>
              </li>

              <li>
                <Link to="/products" className="hover:underline">
                  Products
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white uppercase tracking-wider mb-3">
              Company
            </h5>

            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:underline">
                  About
                </Link>
              </li>

              <li>
                <Link to="/contact" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-6 mt-8 pt-6 border-t border-slate-800/80 text-center text-[11px] text-slate-500">
          © 2026 MarketLink. All rights reserved.
        </div>

      </footer>
    </div>
  );
}

export default Register;
