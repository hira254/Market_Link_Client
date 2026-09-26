import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Sprout, ShoppingBag, ShieldCheck } from "lucide-react";

function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#12222E] font-sans flex flex-col justify-between">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-grow w-full">
        {/* SUBHEADER / CATEGORY */}
        <div className="mb-3">
          <span className="text-xs font-bold tracking-widest uppercase text-[#566E3D]">
            ABOUT MARKETLINK
          </span>
        </div>

        {/* HERO TITLE & DESCRIPTION */}
        <div className="max-w-4xl mb-14">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#12222E] tracking-tight leading-tight mb-6">
            Bringing the farmers market online
          </h1>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-medium">
            MarketLink is part of the eGreen Basket theme: helping local farmers reach their neighbourhood and helping neighbours eat fresher. Customers pre-order and pay at pickup. There is no online payment and no delivery, just a simple hand-over at the market.
          </p>
        </div>

        {/* 3 FEATURE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* CARD 1 */}
          <div className="bg-white rounded-3xl p-8 border border-stone-200/70 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#EAF2E1] flex items-center justify-center mb-6">
                <Sprout className="w-5 h-5 text-[#566E3D]" />
              </div>
              <h3 className="text-lg font-bold text-[#12222E] mb-3">
                For local farmers
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
                A simple way to publish weekly stock, set pickup windows and receive pre-orders without building a shop of their own.
              </p>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="bg-white rounded-3xl p-8 border border-stone-200/70 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#EAF2E1] flex items-center justify-center mb-6">
                <ShoppingBag className="w-5 h-5 text-[#566E3D]" />
              </div>
              <h3 className="text-lg font-bold text-[#12222E] mb-3">
                For customers
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
                Find markets and farmers near you, reserve fresh produce and pick it up at a time that suits you.
              </p>
            </div>
          </div>

          {/* CARD 3 */}
          <div className="bg-white rounded-3xl p-8 border border-stone-200/70 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#EAF2E1] flex items-center justify-center mb-6">
                <ShieldCheck className="w-5 h-5 text-[#566E3D]" />
              </div>
              <h3 className="text-lg font-bold text-[#12222E] mb-3">
                Trusted & moderated
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
                Farmers are approved before they can list products, and reviews are moderated to keep the community fair.
              </p>
            </div>
          </div>

        </div>

        {/* CALL TO ACTION BUTTONS */}
        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={() => navigate("/register")}
            className="px-6 py-3 bg-[#566E3D] hover:bg-[#455931] text-white text-xs font-bold rounded-xl shadow-sm transition"
          >
            Join MarketLink
          </button>
          <button
            onClick={() => navigate("/markets")}
            className="px-6 py-3 bg-white border border-stone-300 hover:border-stone-400 text-stone-700 text-xs font-bold rounded-xl transition shadow-sm"
          >
            See how it works
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default About;