import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";

function Farmers() {
  const [farmers, setFarmers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFarmers();
  }, []);

  const fetchFarmers = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:4000/api/farmers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFarmers(response.data.farmers || response.data);
    } catch (error) {
      console.log(
        "FARMER ERROR:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (farmer) => {
    const savedFavorites =
      JSON.parse(localStorage.getItem("favoriteFarmers")) || [];

    const alreadyFavorite = savedFavorites.some(
      (item) => item._id === farmer._id
    );

    let updatedFavorites;

    if (alreadyFavorite) {
      updatedFavorites = savedFavorites.filter(
        (item) => item._id !== farmer._id
      );
    } else {
      updatedFavorites = [...savedFavorites, farmer];
    }

    localStorage.setItem(
      "favoriteFarmers",
      JSON.stringify(updatedFavorites)
    );

    setFarmers([...farmers]);
  };

  const isFavorite = (farmerId) => {
    const savedFavorites =
      JSON.parse(localStorage.getItem("favoriteFarmers")) || [];

    return savedFavorites.some(
      (item) => item._id === farmerId
    );
  };

  const filteredFarmers = farmers.filter((farmer) => {
    const name =
      farmer.userId?.name?.toLowerCase() || "";

    const email =
      farmer.userId?.email?.toLowerCase() || "";

    const stallName =
      farmer.stallName?.toLowerCase() || "";

    const address =
      farmer.address?.toLowerCase() || "";

    const searchText = search.toLowerCase();

    return (
      name.includes(searchText) ||
      email.includes(searchText) ||
      stallName.includes(searchText) ||
      address.includes(searchText)
    );
  });

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-stone-800 font-sans">
      <Navbar />

      {/* ================= HERO / HEADER SECTION ================= */}
      <section className="bg-[#12222E] text-white pt-14 pb-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-[#7E9F54] mb-3">
              MEET THE SELLERS
            </p>

            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              Know who grows what goes into your basket.
            </h1>

            <p className="text-stone-300 text-sm md:text-base mt-4 leading-relaxed">
              Explore farmer profiles, specialties, market locations, and community reviews before you order.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                to="/register"
                className="px-5 py-2.5 bg-[#7E9F54] hover:bg-[#6b8945] text-white text-xs font-bold rounded-xl transition shadow-sm inline-block"
              >
                Become a seller
              </Link>
              <Link
                to="/favorites"
                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl transition border border-white/10"
              >
                ❤️ My Favorites
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <main className="max-w-7xl mx-auto px-6 py-10 space-y-8">
        
        {/* SEARCH BAR */}
        <div className="bg-white border border-stone-200/80 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-600">
              Search Farmers
            </h2>
            {!loading && (
              <span className="text-xs text-stone-500 font-medium">
                {filteredFarmers.length} farmer{filteredFarmers.length !== 1 ? "s" : ""} found
              </span>
            )}
          </div>

          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 text-sm">
              🔍
            </span>

            <input
              type="text"
              placeholder="Search farmer, stall name, address or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-stone-200 bg-stone-50/50 text-xs text-stone-800 outline-none focus:bg-white focus:border-[#566E3D] focus:ring-1 focus:ring-[#566E3D] transition"
            />
          </div>
        </div>

        {/* SECTION TITLE */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#566E3D] mb-1">
            FEATURED FARMERS
          </p>
          <h2 className="text-2xl font-black text-[#1C2819] tracking-tight">
            Local growers, real profiles.
          </h2>
        </div>

        {/* ================= LOADING ================= */}
        {loading ? (
          <div className="bg-white rounded-2xl border border-stone-200/80 p-12 text-center">
            <div className="text-4xl mb-3">🌾</div>
            <p className="text-xs font-bold text-stone-500">Loading farmers...</p>
          </div>
        ) : filteredFarmers.length === 0 ? (
          /* ================= EMPTY ================= */
          <div className="bg-white rounded-2xl border border-stone-200/80 p-12 text-center">
            <div className="text-4xl mb-3">🔎</div>
            <h3 className="text-sm font-bold text-stone-800">No farmers found</h3>
            <p className="text-xs text-stone-500 mt-1">
              Try searching with a different name, stall, or location.
            </p>
          </div>
        ) : (
          /* ================= FARMER GRID ================= */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFarmers.map((farmer) => (
              <div
                key={farmer._id}
                className="bg-white border border-stone-200/80 rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* CARD BANNER ARTWORK */}
                  <div className="h-40 w-full bg-[#EAF2E1] relative flex items-center justify-center border-b border-stone-100">
                    <div className="w-20 h-20 bg-[#7E9F54]/20 rounded-full flex items-center justify-center text-4xl">
                      🌾
                    </div>

                    {/* FAVORITE BUTTON */}
                    <button
                      onClick={() => toggleFavorite(farmer)}
                      className={`absolute top-3 right-3 px-3 py-1.5 rounded-full text-xs font-bold border transition ${
                        isFavorite(farmer._id)
                          ? "bg-rose-50 text-rose-600 border-rose-200"
                          : "bg-white text-stone-600 border-stone-200 hover:bg-stone-50"
                      }`}
                    >
                      {isFavorite(farmer._id) ? "❤️ Saved" : "🤍 Save"}
                    </button>
                  </div>

                  {/* CARD BODY */}
                  <div className="p-6 space-y-4">
                    <div>
                      <div className="w-6 h-6 rounded-full bg-[#EAF2E1] text-[#566E3D] flex items-center justify-center text-xs font-bold mb-2">
                        🌱
                      </div>

                      <h3 className="text-lg font-bold text-[#1C2819] leading-snug">
                        {farmer.stallName || "Farmer Stall"}
                      </h3>

                      {farmer.userId?.name && (
                        <p className="text-xs text-stone-500 mt-0.5">
                          By {farmer.userId.name}
                        </p>
                      )}
                    </div>

                    {/* DETAILS LIST */}
                    <div className="space-y-2 text-xs text-stone-600 border-t border-stone-100 pt-3">
                      {farmer.address && (
                        <p className="flex items-start gap-2">
                          <span>📍</span>
                          <span className="line-clamp-1">{farmer.address}</span>
                        </p>
                      )}

                      {farmer.contactPerson && (
                        <p className="flex items-center gap-2">
                          <span>📞</span>
                          <span>{farmer.contactPerson}</span>
                        </p>
                      )}

                      {farmer.userId?.email && (
                        <p className="flex items-center gap-2">
                          <span>✉️</span>
                          <span className="truncate">{farmer.userId.email}</span>
                        </p>
                      )}
                    </div>

                    {/* OPERATING DAYS */}
                    {farmer.operatingDays?.length > 0 && (
                      <div className="pt-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1.5">
                          Operating Days
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {farmer.operatingDays.map((day) => (
                            <span
                              key={day}
                              className="px-2 py-0.5 bg-stone-100 text-stone-700 rounded text-[10px] font-semibold"
                            >
                              {day}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* MARKETS */}
                    {farmer.markets?.length > 0 && (
                      <div className="pt-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1.5">
                          Markets
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {farmer.markets.map((market) => (
                            <span
                              key={market._id}
                              className="px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200/60 rounded text-[10px] font-semibold"
                            >
                              🛒 {market.name || market.marketName || "Market"}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* CARD FOOTER / VIEW PROFILE */}
                <div className="p-6 pt-0">
                  <Link
                    to={`/farmers/${farmer._id}`}
                    className="block w-full text-center py-2.5 bg-[#566E3D] hover:bg-[#455931] text-white rounded-xl text-xs font-bold transition shadow-sm"
                  >
                    View Farmer Profile &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-[#12222E] text-white mt-16 py-12 border-t border-slate-800">
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

export default Farmers;