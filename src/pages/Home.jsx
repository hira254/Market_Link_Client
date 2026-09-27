// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import axiosInstance from "../utils/BaseUrl";

// // Standard Fallback Assets
// import heroBanner from "../assets/hero-banner.jpg";

// export default function Home() {
//   const [featuredProducts, setFeaturedProducts] = useState([]);
//   const [loadingProducts, setLoadingProducts] = useState(true);

//   const categories = [
//     { id: "1", name: "Fresh Fruits", subtitle: "Picked daily", image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=300&q=80" },
//     { id: "2", name: "Vegetables", subtitle: "Healthy & organic", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&q=80" },
//     { id: "3", name: "Dairy Products", subtitle: "100% Farm fresh", image: "https://images.unsplash.com/photo-1528498033373-3c6c08e93d79?w=300&q=80" },
//     { id: "4", name: "Organic Honey", subtitle: "Pure & natural", image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=300&q=80" },
//     { id: "5", name: "Grains & Pulses", subtitle: "Nutritious & healthy", image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&q=80" },
//     { id: "6", name: "Spices & Herbs", subtitle: "Aromatic & natural", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&q=80" },
//   ];

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axiosInstance.get("/api/products");
//         const products = response.data?.products || response.data || [];
//         setFeaturedProducts(products);
//       } catch (error) {
//         console.error("HOME PRODUCTS ERROR:", error.response?.data || error.message);
//       } finally {
//         setLoadingProducts(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   return (
//     <div className="min-h-screen bg-white text-slate-800 font-sans antialiased">
//       <Navbar />

//       {/* Hero Section (Clean Light/White Background) */}
//       <section className="relative overflow-hidden bg-white py-12 lg:py-16 border-b border-slate-100">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
//             <div className="space-y-6">
//               <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">
//                 <span>🌿</span> Fresh • Organic • Local
//               </span>

//               <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-tight tracking-tight">
//                 Fresh Produce <br />
//                 <span className="text-slate-800">Direct from Local Farmers</span>
//               </h1>

//               <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl">
//                 Bring the farm closer to your table. Discover fresh vegetables, fruits, and everyday essentials sourced directly from local farmers near you.
//               </p>

//               <div className="flex flex-wrap gap-4 pt-2">
//                 <Link
//                   to="/products"
//                   className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-sm transition-all active:scale-95"
//                 >
//                   🛒 Shop Fresh Produce →
//                 </Link>
//                 <Link
//                   to="/markets"
//                   className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-900 font-bold text-sm shadow-sm transition-all active:scale-95"
//                 >
//                   🏪 Explore Markets →
//                 </Link>
//               </div>

//               {/* Feature Badges */}
//               <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6">
//                 {[
//                   ["🌱", "Organic", "Fresh & natural"],
//                   ["👨‍🌾", "Local Farmers", "Support local"],
//                   ["✓", "Fair Prices", "Best value"],
//                   ["📍", "Reliable", "Market pickup"],
//                 ].map(([icon, title, text]) => (
//                   <div key={title} className="rounded-xl border border-slate-200 bg-slate-50/50 p-3 flex items-center gap-2.5">
//                     <span className="text-xl">{icon}</span>
//                     <div>
//                       <h4 className="text-xs font-bold text-slate-900">{title}</h4>
//                       <p className="text-[10px] text-slate-500">{text}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Banner Image */}
//             <div className="relative h-72 sm:h-96 lg:h-[420px] rounded-3xl overflow-hidden border border-slate-200">
//               <img
//                 src={heroBanner}
//                 alt="Local farmer"
//                 className="w-full h-full object-cover"
//                 onError={(e) => {
//                   e.currentTarget.src = "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80";
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Categories Bar */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-xs">
//           {categories.map((c) => (
//             <Link
//               to={`/products?category=${c.name}`}
//               key={c.id}
//               className="group overflow-hidden rounded-xl border border-slate-100 bg-slate-50/50 p-2 text-center transition hover:-translate-y-1 hover:shadow-md hover:bg-white"
//             >
//               <div className="h-24 overflow-hidden rounded-lg bg-slate-200 mb-2">
//                 <img
//                   src={c.image}
//                   alt={c.name}
//                   className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
//                 />
//               </div>
//               <h3 className="text-xs font-bold text-slate-900">{c.name}</h3>
//               <p className="text-[10px] text-slate-500 mt-0.5">{c.subtitle}</p>
//             </Link>
//           ))}
//         </div>
//       </section>

//       {/* Quick Navigation Links */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
//         <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
//           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
//             <div>
//               <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Explore & Help</span>
//               <h2 className="text-xl font-extrabold text-slate-900">Everything important, right here.</h2>
//             </div>
//             <p className="text-xs text-slate-500 max-w-md">Use these quick links for support, guidance, and project details.</p>
//           </div>

//           <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
//             {[
//               ["✦", "MarketLink AI", "Ask about products, farmers, and markets.", "/assistant"],
//               ["🌱", "About MarketLink", "See the idea behind the workflow.", "/about"],
//               ["💬", "Contact & Support", "Find help for general questions.", "/contact"],
//               ["❓", "FAQ & Guide", "Quick answers for buying & selling.", "/faq"],
//             ].map(([icon, title, text, to]) => (
//               <Link
//                 key={title}
//                 to={to}
//                 className="group flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 transition hover:border-slate-400 hover:bg-white"
//               >
//                 <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white border border-slate-200 text-sm">{icon}</span>
//                 <div>
//                   <h4 className="text-xs font-bold text-slate-900">{title}</h4>
//                   <p className="text-[10px] text-slate-500 leading-tight mt-0.5">{text}</p>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Featured Products */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="flex items-end justify-between mb-6">
//           <div>
//             <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Featured Products</span>
//             <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Best-selling fresh picks</h2>
//           </div>
//           <Link to="/products" className="text-xs font-bold text-slate-900 hover:underline">
//             View All Products →
//           </Link>
//         </div>

//         {loadingProducts ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
//             {[1, 2, 3, 4].map((i) => (
//               <div key={i} className="h-64 rounded-2xl bg-slate-100 animate-pulse" />
//             ))}
//           </div>
//         ) : featuredProducts.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//             {featuredProducts.slice(0, 8).map((prod) => (
//               <div key={prod._id || prod.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition">
//                 <div className="h-44 bg-slate-100 relative">
//                   <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
//                   <span className="absolute top-2 left-2 bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
//                     {prod.category || "Produce"}
//                   </span>
//                 </div>
//                 <div className="p-4">
//                   <h3 className="font-bold text-slate-900 text-sm">{prod.name}</h3>
//                   <p className="text-xs text-slate-500 mt-1">{prod.farmer?.name || "Local Farmer"}</p>
//                   <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
//                     <span className="text-base font-black text-slate-900">Rs. {prod.price}</span>
//                     <button className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition">
//                       Add
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-xs text-slate-500">
//             No products available at the moment.
//           </div>
//         )}
//       </section>

//       {/* Role Workspaces */}
//       <section className="bg-slate-50 py-16 mt-12 border-t border-slate-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="mb-8">
//             <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Built for Market Day</span>
//             <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Use MarketLink the way you shop.</h2>
//           </div>
//           <div className="grid gap-6 md:grid-cols-3">
//             {[
//               ["🧑‍🌾", "Farmer Workspace", "List fresh produce, manage stock, orders, and pickup slots.", "/farmer"],
//               ["🛒", "Customer Workspace", "Shop produce, manage cart, choose pickup, and view order history.", "/dashboard"],
//               ["📅", "Market Day Toolkit", "See market timings, pickup info, and local profiles in one place.", "/markets"],
//             ].map(([icon, title, text, to]) => (
//               <div key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between">
//                 <div>
//                   <span className="text-3xl">{icon}</span>
//                   <h3 className="mt-3 text-lg font-extrabold text-slate-900">{title}</h3>
//                   <p className="mt-2 text-xs leading-relaxed text-slate-600">{text}</p>
//                 </div>
//                 <Link to={to} className="mt-6 inline-flex items-center text-xs font-bold text-slate-900 hover:underline">
//                   Explore →
//                 </Link>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/BaseUrl";

import ProductCard from "../../components/common/ProductCard";
import { marketSeed } from "../portal/shared";

const heroFarmer = "/images/marketlink-hero-farmer-v3.webp";

const categories = [
  {
    id: "1",
    name: "Fresh Fruits",
    subtitle: "Picked daily",
    image:
      "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=300&q=80",
  },
  {
    id: "2",
    name: "Vegetables",
    subtitle: "Healthy & organic",
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&q=80",
  },
  {
    id: "3",
    name: "Dairy Products",
    subtitle: "100% Farm fresh",
    image:
      "https://images.unsplash.com/photo-1528498033373-3c6c08e93d79?w=300&q=80",
  },
  {
    id: "4",
    name: "Organic Honey",
    subtitle: "Pure & natural",
    image:
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=300&q=80",
  },
  {
    id: "5",
    name: "Grains & Pulses",
    subtitle: "Nutritious & healthy",
    image:
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&q=80",
  },
  {
    id: "6",
    name: "Spices & Herbs",
    subtitle: "Aromatic & natural",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&q=80",
  },
];

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const spotlight = marketSeed[0];

  // ============================
  // GET PRODUCTS FROM BACKEND
  // ============================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoadingProducts(true);

        const response = await axiosInstance.get("/api/products");

        console.log("HOME PRODUCTS RESPONSE:", response.data);

        const products =
          response.data?.products ||
          response.data?.data ||
          response.data ||
          [];

        setFeaturedProducts(Array.isArray(products) ? products : []);
      } catch (error) {
        console.error(
          "HOME PRODUCTS ERROR:",
          error.response?.data || error.message
        );

        setFeaturedProducts([]);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      {/* =========================
          HERO SECTION
      ========================= */}
      <section className="hero-wrap relative overflow-hidden bg-[#eaf3e4]">
        <div className="absolute inset-0">
          <img
            src={heroFarmer}
            alt="Local farmer holding fresh vegetables at a farm market"
            fetchPriority="high"
            className="h-full w-full object-cover object-center"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-white/92 via-white/52 to-transparent sm:from-white/88 sm:via-white/30" />

          <div className="absolute inset-0 bg-gradient-to-t from-[#102f26]/30 via-transparent to-transparent" />
        </div>

        <div className="shell relative flex min-h-[560px] items-center sm:min-h-[600px] lg:min-h-[650px]">
          <div className="max-w-2xl py-10 sm:py-12 lg:py-16 vip-reveal">
            <div className="inline-flex items-center gap-2 rounded-full border border-leaf-200 bg-white/90 px-4 py-2 text-xs font-extrabold uppercase tracking-[.12em] text-leaf-800 shadow-lg backdrop-blur">
              <span className="text-base">🌿</span>
              Fresh • Organic • Local
            </div>

            <h1 className="mt-5 max-w-2xl text-4xl font-black leading-[.98] tracking-[-.035em] text-navy-900 sm:text-5xl lg:text-6xl">
              Fresh Produce
              <br />
              <span className="text-leaf-600">
                Direct from Local Farmers
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base font-medium leading-7 text-navy-900/75 sm:text-lg">
              Bring the farm closer to your table. Discover fresh vegetables,
              fruits and everyday essentials sourced from local farmers.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/products"
                className="btn bg-leaf-600 px-7 py-3.5 text-white shadow-xl shadow-leaf-900/20 transition hover:-translate-y-1 hover:bg-leaf-500 active:scale-95"
              >
                🛒 Shop Fresh Produce{" "}
                <span aria-hidden="true">→</span>
              </Link>

              <Link
                to="/markets"
                className="btn border border-white/80 bg-white/90 px-7 py-3.5 text-navy-900 shadow-xl backdrop-blur transition hover:-translate-y-1 hover:bg-white active:scale-95"
              >
                🏪 Explore Markets{" "}
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="mt-7 grid max-w-2xl grid-cols-2 gap-2 sm:grid-cols-4">
              {[
                ["🌱", "Organic", "Fresh & natural"],
                ["👨‍🌾", "Local Farmers", "Support local"],
                ["✓", "Fair Prices", "Best value"],
                ["📍", "Reliable", "Market pickup"],
              ].map(([icon, title, text]) => (
                <div
                  key={title}
                  className="rounded-2xl border border-white/80 bg-white/78 px-3 py-3 shadow-md backdrop-blur transition hover:-translate-y-1 hover:bg-white/90"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{icon}</span>

                    <div>
                      <b className="block text-xs text-navy-900 sm:text-sm">
                        {title}
                      </b>

                      <span className="text-[10px] text-stone-500 sm:text-xs">
                        {text}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          CATEGORIES
      ========================= */}
      <section className="shell relative z-10 -mt-6">
        <div className="grid grid-cols-2 gap-3 rounded-3xl border border-white/60 bg-white/95 p-3 shadow-xl backdrop-blur md:grid-cols-3 xl:grid-cols-6">
          {categories.map((c) => (
            <Link
              to={`/products?category=${encodeURIComponent(c.name)}`}
              key={c.id}
              className="group overflow-hidden rounded-2xl border border-stone-100 bg-white transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="vip-shine aspect-[1.25] overflow-hidden">
                <img
                  src={c.image}
                  alt={c.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.src = "/images/greens.svg";
                  }}
                />
              </div>

              <div className="p-3">
                <b className="text-sm">{c.name}</b>

                <p className="mt-1 text-xs text-stone-500">
                  {c.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* =========================
          EXPLORE & HELP
      ========================= */}
      <section className="section-space pt-0 sm:pt-0">
        <div className="shell">
          <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="eyebrow">Explore &amp; help</p>

                <h2 className="mt-1 text-xl font-extrabold text-navy-900">
                  Everything important, right here.
                </h2>
              </div>

              <p className="max-w-xl text-xs leading-5 text-stone-500 sm:text-right">
                We keep the primary navigation focused. Use these body links
                for AI help, our story, support and common questions.
              </p>
            </div>

            <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {[
                [
                  "✦",
                  "MarketLink AI",
                  "Ask about products, farmers, markets and pickup.",
                  "/assistant",
                ],
                [
                  "🌱",
                  "About MarketLink",
                  "See the idea behind the local market workflow.",
                  "/about",
                ],
                [
                  "💬",
                  "Contact & Support",
                  "Find help for general questions and enquiries.",
                  "/contact",
                ],
                [
                  "❓",
                  "FAQ & Guide",
                  "Quick answers for shopping and selling on MarketLink.",
                  "/faq",
                ],
              ].map(([icon, title, text, to]) => (
                <Link
                  key={title}
                  to={to}
                  className="group rounded-xl border border-stone-200 bg-stone-50/70 px-3 py-2.5 transition hover:-translate-y-0.5 hover:border-leaf-200 hover:bg-leaf-50 hover:shadow-md"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white text-sm shadow-sm">
                      {icon}
                    </span>

                    <span className="min-w-0">
                      <b className="block text-xs text-navy-900 group-hover:text-leaf-800">
                        {title}
                      </b>

                      <span className="mt-0.5 block text-[10px] leading-4 text-stone-500">
                        {text}
                      </span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          FEATURED PRODUCTS
          BACKEND DATA
      ========================= */}
      <section className="section-space">
        <div className="shell">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Featured products</p>

              <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Best-selling fresh picks
              </h2>
            </div>

            <Link
              to="/products"
              className="btn-outline hidden sm:inline-flex"
            >
              View All Products →
            </Link>
          </div>

          {/* LOADING */}
          {loadingProducts ? (
            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="h-72 animate-pulse rounded-2xl bg-stone-100"
                />
              ))}
            </div>
          ) : featuredProducts.length > 0 ? (
            /* PRODUCTS FROM BACKEND */
            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
              {featuredProducts.slice(0, 6).map((product) => (
                <ProductCard
                  key={product._id || product.id}
                  product={product}
                />
              ))}
            </div>
          ) : (
            /* EMPTY STATE */
            <div className="mt-7 rounded-2xl border border-stone-200 bg-white p-8 text-center shadow-sm">
              <p className="font-bold text-navy-900">
                No products available at the moment.
              </p>

              <p className="mt-1 text-sm text-stone-500">
                Please check back soon for fresh products.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* =========================
          MARKET SPOTLIGHT
      ========================= */}
      <section className="shell pb-16">
        <div className="overflow-hidden rounded-[30px] border border-stone-200 bg-white shadow-[0_18px_55px_rgba(20,56,92,.08)]">
          <div className="grid lg:grid-cols-[.95fr_1.05fr]">
            <div className="vip-shine relative min-h-[260px] overflow-hidden">
              <img
                src={spotlight.image}
                alt="Karachi farmers market"
                className="h-full w-full object-cover transition duration-700 hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/65 via-transparent to-transparent" />

              <span className="absolute bottom-5 left-5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-extrabold text-navy-800 backdrop-blur">
                Karachi market day
              </span>
            </div>

            <div className="p-7 sm:p-9">
              <p className="eyebrow">Market day spotlight</p>

              <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
                {spotlight.name}
              </h2>

              <p className="mt-2 text-sm font-semibold text-leaf-700">
                {spotlight.area} · {spotlight.day} · {spotlight.time}
              </p>

              <p className="mt-4 max-w-xl text-sm leading-7 text-stone-600">
                {spotlight.description} Plan your basket ahead of time, then
                collect it at the market pickup window.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to={`/markets/${spotlight.id}`}
                  className="btn-primary"
                >
                  View market
                </Link>

                <Link to="/products" className="btn-outline">
                  Browse produce
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          ROLE WORKSPACES
      ========================= */}
      <section className="bg-gradient-to-br from-[#f5f8ea] via-white to-[#eef5fb] py-14 sm:py-16">
        <div className="shell">
          <div className="mb-8 max-w-2xl">
            <p className="eyebrow">Built for every side of market day</p>

            <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
              Use MarketLink the way you actually shop.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <RoleCard
              icon="🧑‍🌾"
              title="Farmer workspace"
              text="List fresh produce, manage stock, orders and pickup slots from one focused dashboard."
              to="/farmer/dashboard"
            />

            <RoleCard
              icon="🛒"
              title="Customer workspace"
              text="Shop produce, manage cart, choose pickup and keep your orders organised."
              to="/customer/dashboard"
            />

            <RoleCard
              icon="📅"
              title="Market day toolkit"
              text="See market timings, pickup information, farmer profiles and local produce in one place."
              to="/markets"
            />
          </div>
        </div>
      </section>

      {/* =========================
          HOW IT WORKS
      ========================= */}
      <section className="shell section-space">
        <div className="grid gap-7 lg:grid-cols-2">
          <div>
            <p className="eyebrow">How MarketLink works</p>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              From farm to basket, without the clutter.
            </h2>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                ["01", "Browse", "Find fresh products and nearby markets."],
                [
                  "02",
                  "Add to cart",
                  "Choose quantities and build your basket.",
                ],
                [
                  "03",
                  "Checkout",
                  "Confirm your market pickup slot.",
                ],
                [
                  "04",
                  "Enjoy",
                  "Track the order and collect fresh produce.",
                ],
              ].map((x) => (
                <div
                  className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  key={x[0]}
                >
                  <div className="flex gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-leaf-100 text-xs font-extrabold text-leaf-800">
                      {x[0]}
                    </span>

                    <div>
                      <b>{x[1]}</b>

                      <p className="mt-1 text-sm text-stone-500">
                        {x[2]}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[30px] bg-gradient-to-br from-navy-900 via-navy-800 to-[#244f45] p-8 text-white shadow-xl sm:p-9">
            <div className="absolute -right-16 -top-20 h-52 w-52 rounded-full bg-leaf-500/20 blur-3xl" />

            <p className="relative text-xs font-bold uppercase tracking-[.2em] text-leaf-200">
              A calmer market workflow
            </p>

            <h2 className="relative mt-3 text-3xl font-extrabold text-white">
              Fresh products, clear pickup and a better market-day rhythm.
            </h2>

            <p className="relative mt-4 leading-7 text-white/70">
              Browse local listings, choose your quantity, select a pickup slot
              and keep the handover simple at the market.
            </p>

            <div className="relative mt-7 flex flex-wrap gap-3">
              <Link
                to="/products"
                className="btn bg-leaf-500 text-white hover:bg-leaf-400"
              >
                Start Shopping
              </Link>

              <Link
                to="/how-it-works"
                className="btn border border-white/20 bg-white/10 text-white hover:bg-white/15"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function RoleCard({ icon, title, text, to }) {
  return (
    <div className="group rounded-3xl border border-stone-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-xl">
      <div className="text-3xl transition duration-300 group-hover:scale-110">
        {icon}
      </div>

      <h3 className="mt-4 text-xl font-extrabold tracking-tight">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-7 text-stone-500">
        {text}
      </p>

      <Link to={to} className="btn-primary mt-5">
        Explore →
      </Link>
    </div>
  );
}