import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axiosInstance from "../utils/BaseUrl";

// Standard Fallback Assets
import heroBanner from "../assets/hero-banner.jpg";

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const categories = [
    { id: "1", name: "Fresh Fruits", subtitle: "Picked daily", image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=300&q=80" },
    { id: "2", name: "Vegetables", subtitle: "Healthy & organic", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&q=80" },
    { id: "3", name: "Dairy Products", subtitle: "100% Farm fresh", image: "https://images.unsplash.com/photo-1528498033373-3c6c08e93d79?w=300&q=80" },
    { id: "4", name: "Organic Honey", subtitle: "Pure & natural", image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=300&q=80" },
    { id: "5", name: "Grains & Pulses", subtitle: "Nutritious & healthy", image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&q=80" },
    { id: "6", name: "Spices & Herbs", subtitle: "Aromatic & natural", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&q=80" },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get("/api/products");
        const products = response.data?.products || response.data || [];
        setFeaturedProducts(products);
      } catch (error) {
        console.error("HOME PRODUCTS ERROR:", error.response?.data || error.message);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans antialiased">
      <Navbar />

      {/* Hero Section (Clean Light/White Background) */}
      <section className="relative overflow-hidden bg-white py-12 lg:py-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">
                <span>🌿</span> Fresh • Organic • Local
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-tight tracking-tight">
                Fresh Produce <br />
                <span className="text-slate-800">Direct from Local Farmers</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl">
                Bring the farm closer to your table. Discover fresh vegetables, fruits, and everyday essentials sourced directly from local farmers near you.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/products"
                  className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-sm transition-all active:scale-95"
                >
                  🛒 Shop Fresh Produce →
                </Link>
                <Link
                  to="/markets"
                  className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-900 font-bold text-sm shadow-sm transition-all active:scale-95"
                >
                  🏪 Explore Markets →
                </Link>
              </div>

              {/* Feature Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6">
                {[
                  ["🌱", "Organic", "Fresh & natural"],
                  ["👨‍🌾", "Local Farmers", "Support local"],
                  ["✓", "Fair Prices", "Best value"],
                  ["📍", "Reliable", "Market pickup"],
                ].map(([icon, title, text]) => (
                  <div key={title} className="rounded-xl border border-slate-200 bg-slate-50/50 p-3 flex items-center gap-2.5">
                    <span className="text-xl">{icon}</span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{title}</h4>
                      <p className="text-[10px] text-slate-500">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Banner Image */}
            <div className="relative h-72 sm:h-96 lg:h-[420px] rounded-3xl overflow-hidden border border-slate-200">
              <img
                src={heroBanner}
                alt="Local farmer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80";
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-xs">
          {categories.map((c) => (
            <Link
              to={`/products?category=${c.name}`}
              key={c.id}
              className="group overflow-hidden rounded-xl border border-slate-100 bg-slate-50/50 p-2 text-center transition hover:-translate-y-1 hover:shadow-md hover:bg-white"
            >
              <div className="h-24 overflow-hidden rounded-lg bg-slate-200 mb-2">
                <img
                  src={c.image}
                  alt={c.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-xs font-bold text-slate-900">{c.name}</h3>
              <p className="text-[10px] text-slate-500 mt-0.5">{c.subtitle}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Navigation Links */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Explore & Help</span>
              <h2 className="text-xl font-extrabold text-slate-900">Everything important, right here.</h2>
            </div>
            <p className="text-xs text-slate-500 max-w-md">Use these quick links for support, guidance, and project details.</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["✦", "MarketLink AI", "Ask about products, farmers, and markets.", "/assistant"],
              ["🌱", "About MarketLink", "See the idea behind the workflow.", "/about"],
              ["💬", "Contact & Support", "Find help for general questions.", "/contact"],
              ["❓", "FAQ & Guide", "Quick answers for buying & selling.", "/faq"],
            ].map(([icon, title, text, to]) => (
              <Link
                key={title}
                to={to}
                className="group flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 transition hover:border-slate-400 hover:bg-white"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white border border-slate-200 text-sm">{icon}</span>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{title}</h4>
                  <p className="text-[10px] text-slate-500 leading-tight mt-0.5">{text}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Featured Products</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Best-selling fresh picks</h2>
          </div>
          <Link to="/products" className="text-xs font-bold text-slate-900 hover:underline">
            View All Products →
          </Link>
        </div>

        {loadingProducts ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-64 rounded-2xl bg-slate-100 animate-pulse" />
            ))}
          </div>
        ) : featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 8).map((prod) => (
              <div key={prod._id || prod.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition">
                <div className="h-44 bg-slate-100 relative">
                  <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                    {prod.category || "Produce"}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-slate-900 text-sm">{prod.name}</h3>
                  <p className="text-xs text-slate-500 mt-1">{prod.farmer?.name || "Local Farmer"}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                    <span className="text-base font-black text-slate-900">Rs. {prod.price}</span>
                    <button className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition">
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-xs text-slate-500">
            No products available at the moment.
          </div>
        )}
      </section>

      {/* Role Workspaces */}
      <section className="bg-slate-50 py-16 mt-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Built for Market Day</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Use MarketLink the way you shop.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              ["🧑‍🌾", "Farmer Workspace", "List fresh produce, manage stock, orders, and pickup slots.", "/farmer"],
              ["🛒", "Customer Workspace", "Shop produce, manage cart, choose pickup, and view order history.", "/dashboard"],
              ["📅", "Market Day Toolkit", "See market timings, pickup info, and local profiles in one place.", "/markets"],
            ].map(([icon, title, text, to]) => (
              <div key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-3xl">{icon}</span>
                  <h3 className="mt-3 text-lg font-extrabold text-slate-900">{title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">{text}</p>
                </div>
                <Link to={to} className="mt-6 inline-flex items-center text-xs font-bold text-slate-900 hover:underline">
                  Explore →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}