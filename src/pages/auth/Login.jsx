import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar";
import { toast } from "react-toastify";
import marketBanner from "../../assets/market-banner.jpg";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(formData);

      console.log("LOGIN:", response);

   toast.success("Login successful!");

      if (response.user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (response.user.role === "farmer") {
        navigate("/farmer/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log("LOGIN ERROR:", error.response?.data);
toast.error(
        error.response?.data?.message || "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-stone-800 font-sans flex flex-col justify-between">
      <Navbar />

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-grow flex items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full max-w-5xl">
          
          {/* LEFT SIDE: MARKET ILLUSTRATION BANNER */}
          <div className="hidden lg:flex flex-col items-center justify-center bg-[#EAF2E1] border border-stone-200/80 rounded-3xl overflow-hidden shadow-sm h-full min-h-[500px]">
            <img 
              src={marketBanner} 
              alt="Farm Fresh Market" 
              className="w-full h-full object-cover rounded-3xl"
            />
          </div>

          {/* RIGHT SIDE: LOGIN FORM CARD */}
          <div className="bg-white border border-stone-200/80 rounded-3xl p-6 sm:p-10 shadow-sm max-w-md mx-auto w-full">
            <div className="mb-6">
              <h1 className="text-3xl font-black text-[#1C2819] tracking-tight">
                Welcome back
              </h1>
              <p className="text-xs text-stone-500 mt-1">
                Log in to manage your orders, stall and favourites.
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-xs font-bold text-stone-600 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50/50 text-xs text-stone-800 outline-none focus:bg-white focus:border-[#566E3D] focus:ring-1 focus:ring-[#566E3D] transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-600 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50/50 text-xs text-stone-800 outline-none focus:bg-white focus:border-[#566E3D] focus:ring-1 focus:ring-[#566E3D] transition"
                />
              </div>

              <div className="text-right">
                <a href="#forgot" className="text-xs font-semibold text-stone-500 hover:text-stone-800 hover:underline">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-[#566E3D] hover:bg-[#455931] text-white rounded-xl text-xs font-bold transition shadow-sm"
              >
                Login
              </button>
            </form>

            <div className="mt-8 border-t border-stone-100 pt-6 text-center">
              <p className="text-xs text-stone-500 font-medium">
                New to MarketLink?{" "}
                <button
                  onClick={() => navigate("/register")}
                  className="font-bold text-[#566E3D] hover:underline ml-1"
                >
                  Create an account
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
            <h4 className="font-extrabold text-white text-base mb-2">MarketLink</h4>
            <p className="leading-relaxed text-slate-400">
              Connecting local farmers with customers directly. Browse fresh produce, pre-order, and pick up at your chosen market.
            </p>
          </div>
          <div>
            <h5 className="font-bold text-white uppercase tracking-wider mb-3">Explore</h5>
            <ul className="space-y-2">
              <li><Link to="/markets" className="hover:underline">Markets</Link></li>
              <li><Link to="/farmers" className="hover:underline">Farmers</Link></li>
              <li><Link to="/products" className="hover:underline">Products</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-white uppercase tracking-wider mb-3">Company</h5>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:underline">About</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact</Link></li>
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

export default Login;