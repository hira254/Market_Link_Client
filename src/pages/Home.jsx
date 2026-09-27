import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import heroBanner from "../assets/hero-banner.jpg";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/BaseUrl";

import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Tag,
  Users,
  ShoppingBag,
  Store,
  Heart,
  Star,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import Footer from "../components/Footer";

function Home() {
  const categories = [
    { title: "Fresh Fruits", desc: "Picked daily", image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=300&q=80" },
    { title: "Vegetables", desc: "Healthy & organic", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&q=80" },
    { title: "Dairy Products", desc: "100% Farm fresh", image: "https://images.unsplash.com/photo-1528498033373-3c6c08e93d79?w=300&q=80" },
    { title: "Organic Honey", desc: "Pure & natural", image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=300&q=80" },
    { title: "Grains & Pulses", desc: "Nutritious & healthy", image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&q=80" },
    { title: "Spices & Herbs", desc: "Aromatic & natural", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&q=80" },
  ];

  const [featuredProducts, setFeaturedProducts] = useState([]);
const [loadingProducts, setLoadingProducts] = useState(true);

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get("/api/products");

      console.log("HOME PRODUCTS:", response.data);

      const products = response.data?.products || response.data || [];

      setFeaturedProducts(products);
    } catch (error) {
      console.error(
        "HOME PRODUCTS ERROR:",
        error.response?.data || error.message
      );
    } finally {
      setLoadingProducts(false);
    }
  };

  fetchProducts();
}, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-800 font-sans antialiased selection:bg-amber-400 selection:text-[#213218]">
      <Navbar />

      {/* ================= HERO SECTION ================= */}
     {/* ================= HERO SECTION ================= */}
<section className="relative bg-[#1E3016] text-white overflow-hidden shadow-2xl z-10">
  {/* Background Banner with Overlay & Multi-layered Shadows */}
  <div className="absolute inset-0 z-0">
    <img
      src={heroBanner}
      alt="Farm Banner"
      className="w-full h-full object-cover object-center opacity-35 mix-blend-overlay scale-105"
    />
    
    {/* Left-to-Right Shadow & Dark Overlay */}
    <div className="absolute inset-0 bg-gradient-to-r from-[#12200D] via-[#1C3014]/90 to-transparent" />
    
    {/* Top & Bottom Cinematic Shadow (Bottom Edge Fade) */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#12200D]" />
  </div>

  <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
    <div className="lg:col-span-8 space-y-6">
      <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3D5B2C]/80 backdrop-blur-md text-amber-300 text-xs font-bold uppercase tracking-widest border border-amber-400/20 shadow-md">
        <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
        Fresh • Organic • Local
      </span>

      <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.1] drop-shadow-md">
        Fresh Produce <br />
        <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
          Direct from Local Farmers
        </span>
      </h1>

      <p className="text-base md:text-lg text-slate-200 max-w-2xl leading-relaxed font-normal drop-shadow">
        Bring the farm closer to your table. Discover fresh vegetables, fruits, and everyday essentials sourced directly from local farmers near you.
      </p>

      <div className="flex flex-wrap items-center gap-4 pt-3">
        <Link
          to="/products"
          className="px-7 py-4 rounded-xl bg-[#4A6E35] hover:bg-[#3D5C2C] text-white font-bold text-sm flex items-center gap-2.5 shadow-xl shadow-black/40 hover:-translate-y-0.5 transition-all duration-200 border border-[#628F48]"
        >
          Shop Fresh Produce
          <ArrowRight className="w-4 h-4" />
        </Link>

        <Link
          to="/markets"
          className="px-7 py-4 rounded-xl bg-white/90 hover:bg-white text-[#1C2C14] font-bold text-sm transition-all duration-200 shadow-lg shadow-black/20 hover:-translate-y-0.5 backdrop-blur-sm"
        >
          Explore Markets
        </Link>
      </div>

      {/* Feature Badges with Floating Cards & Drop Shadow */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-8 max-w-3xl">
        {[
          { title: "Organic", sub: "Fresh & Natural", icon: CheckCircle2 },
          { title: "Local Farmers", sub: "Support Local", icon: Users },
          { title: "Fair Prices", sub: "Direct Sourcing", icon: Tag },
          { title: "Reliable", sub: "Fast Delivery", icon: ShieldCheck },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-black/30 backdrop-blur-md p-3.5 rounded-xl border border-white/20 shadow-lg flex items-center gap-3 transition-transform duration-200 hover:bg-black/40 hover:scale-[1.02]"
          >
            <item.icon className="w-5 h-5 text-amber-400 shrink-0 drop-shadow" />
            <div>
              <div className="text-xs font-bold text-white">{item.title}</div>
              <div className="text-[10px] text-slate-300">{item.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>

  {/* Smooth Curved Shadow Separator at Bottom */}
  <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-[#FAFAFA] to-transparent pointer-events-none" />
</section>

      {/* ================= CATEGORIES SECTION ================= */}
      <section className="py-14 max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#42612F]">
              Explore Categories
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mt-0.5">
              Shop by Freshness
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              <div className="h-32 overflow-hidden bg-slate-100 relative">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-3.5 text-center bg-white">
                <h4 className="text-xs font-bold text-slate-800 group-hover:text-[#42612F] transition-colors">
                  {cat.title}
                </h4>
                <p className="text-[10px] text-slate-500 mt-0.5 font-medium">{cat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FEATURED PRODUCTS ================= */}
 
<section className="py-16 bg-slate-100/70 border-y border-slate-200/80">
  <div className="max-w-7xl mx-auto px-6">

    <div className="flex items-end justify-between mb-10">
      <div>
        <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#42612F]">
          Featured Products
        </span>

        <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mt-0.5">
          Best-selling fresh picks
        </h2>
      </div>

      <Link
        to="/products"
        className="text-xs font-bold text-[#42612F] hover:text-[#2d4320] flex items-center gap-1 group transition-colors"
      >
        View All Products
        <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
      </Link>
    </div>

    {/* Loading */}
    {loadingProducts && (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-80 bg-white rounded-2xl animate-pulse border border-slate-200"
          />
        ))}
      </div>
    )}

    {/* Products */}
    {!loadingProducts && featuredProducts.length > 0 && (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

        {featuredProducts.map((prod) => (
          <div
            key={prod._id}
            className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
          >

            {/* Product Image */}
            <div className="relative h-48 bg-slate-100 overflow-hidden">

              <img
                src={prod.image}
                alt={prod.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />

              {/* Category */}
              <span className="absolute top-3 left-3 bg-[#324B25]/90 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-sm">
                {prod.category}
              </span>

              {/* Favorite */}
              <button
                aria-label="Add to favorites"
                className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-md rounded-full hover:bg-white text-slate-600 hover:text-red-500 transition-colors shadow-sm"
              >
                <Heart className="w-3.5 h-3.5" />
              </button>

            </div>

            {/* Product Info */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-4">

              <div>

                <div className="flex items-center justify-between">

                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-[#42612F] transition-colors">
                    {prod.name}
                  </h3>

                  <div className="flex items-center gap-1 text-[11px] font-bold text-slate-700">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />

                    {prod.rating || "New"}
                  </div>

                </div>

                {/* Farmer */}
                <p className="text-xs text-slate-500 mt-1">
                  {prod.farmer?.name || "Local Farmer"}
                </p>

              </div>

              {/* Price */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">

                <div>
                  <span className="text-lg font-black text-slate-900">
                    Rs. {prod.price}
                  </span>

                  <span className="text-[10px] text-slate-500 font-medium ml-1">
                    {prod.unit || "per unit"}
                  </span>
                </div>

                <button
                  className="px-3.5 py-2 rounded-lg bg-[#42612F] hover:bg-[#344E25] active:scale-95 text-white text-xs font-bold transition-all shadow-sm"
                >
                  Add to cart
                </button>

              </div>

            </div>

          </div>
        ))}

      </div>
    )}

    {/* No Products */}
    {!loadingProducts && featuredProducts.length === 0 && (
      <div className="text-center py-12">
        <ShoppingBag className="mx-auto w-10 h-10 text-slate-400 mb-3" />

        <p className="text-sm font-semibold text-slate-600">
          No products available yet.
        </p>

        <p className="text-xs text-slate-400 mt-1">
          Products added by farmers will appear here.
        </p>
      </div>
    )}

  </div>
</section>


      {/* ================= PANELS LINK SECTION ================= */}
      <section className="py-16 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/40 border border-emerald-200/60 p-6 rounded-2xl flex flex-col justify-between hover:shadow-lg transition-shadow">
            <div>
              <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-4 shadow-md shadow-emerald-600/20">
                <Store className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg">Admin Panel</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Complete platform control — products, orders, users, markets, and analytical insights.
              </p>
            </div>
            <Link to="/admin" className="mt-6 text-xs font-bold text-[#42612F] flex items-center gap-1 hover:gap-2 transition-all">
              Open Panel <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-amber-100/40 border border-amber-200/60 p-6 rounded-2xl flex flex-col justify-between hover:shadow-lg transition-shadow">
            <div>
              <div className="w-11 h-11 rounded-xl bg-amber-600 text-white flex items-center justify-center mb-4 shadow-md shadow-amber-600/20">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg">Farmer Panel</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                List produce, manage live stock, orders, payouts, and localized market listings.
              </p>
            </div>
            <Link to="/farmer" className="mt-6 text-xs font-bold text-amber-800 flex items-center gap-1 hover:gap-2 transition-all">
              Open Panel <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100/40 border border-blue-200/60 p-6 rounded-2xl flex flex-col justify-between hover:shadow-lg transition-shadow">
            <div>
              <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-4 shadow-md shadow-blue-600/20">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg">Customer Panel</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Explore local produce, manage cart, checkout, saved favorites, and order history.
              </p>
            </div>
            <Link to="/dashboard" className="mt-6 text-xs font-bold text-blue-800 flex items-center gap-1 hover:gap-2 transition-all">
              Open Panel <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-20 bg-[#1E2E16] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-400">
              How MarketLink Works
            </span>
            <h2 className="text-3xl md:text-4xl font-black leading-tight">
              From farm to basket, <br />
              <span className="text-slate-300">without the clutter.</span>
            </h2>

            <div className="space-y-3.5 pt-2">
              {[
                { num: "01", title: "Browse", desc: "Search local markets and fresh harvest listings." },
                { num: "02", title: "Add to cart", desc: "Choose quantities and build your basket." },
                { num: "03", title: "Checkout", desc: "Confirm pickup or direct local delivery." },
                { num: "04", title: "Enjoy", desc: "Savor local and honest fresh produce." },
              ].map((step, idx) => (
                <div key={idx} className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-xl flex items-center gap-4 transition-colors hover:bg-white/10">
                  <span className="text-base font-black text-amber-400">{step.num}</span>
                  <div>
                    <h4 className="text-sm font-bold text-white">{step.title}</h4>
                    <p className="text-xs text-slate-300">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 bg-[#14200E] p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl space-y-6">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Built for Market Day</span>
            <h3 className="text-2xl font-black">Clean e-commerce experience.</h3>
            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              Cart, favorites, and orders persist seamlessly. The structure is fully ready for MongoDB, live farmer inventory, and direct online payments.
            </p>
            <div className="pt-2">
              <Link to="/products" className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#42612F] hover:bg-[#344E25] text-white font-bold text-xs rounded-xl transition-all shadow-md">
                Start Shopping
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;