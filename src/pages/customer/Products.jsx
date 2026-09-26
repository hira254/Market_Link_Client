import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [availability, setAvailability] = useState("");

  const categoriesList = [
    "All",
    "Vegetables",
    "Fruits",
    "Dairy",
    "Meat",
    "Eggs",
    "Grains",
    "Other",
  ];

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:4000/api/products",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProducts(response.data.products || response.data);
    } catch (error) {
      console.log(
        "PRODUCT ERROR:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const toggleFavorite = (product) => {
    const savedFavorites =
      JSON.parse(localStorage.getItem("favoriteProducts")) || [];

    const alreadyFavorite = savedFavorites.some(
      (item) => item._id === product._id
    );

    const updatedFavorites = alreadyFavorite
      ? savedFavorites.filter(
          (item) => item._id !== product._id
        )
      : [...savedFavorites, product];

    localStorage.setItem(
      "favoriteProducts",
      JSON.stringify(updatedFavorites)
    );

    setProducts([...products]);
  };

  const isFavorite = (productId) => {
    const savedFavorites =
      JSON.parse(localStorage.getItem("favoriteProducts")) || [];

    return savedFavorites.some(
      (item) => item._id === productId
    );
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      !category || category === "All" || product.category === category;

    const matchesPrice =
      !maxPrice ||
      Number(product.price) <= Number(maxPrice);

    let matchesAvailability = true;

    if (availability === "available") {
      matchesAvailability =
        product.isAvailable === true &&
        Number(product.stock) > 0;
    }

    if (availability === "unavailable") {
      matchesAvailability =
        product.isAvailable === false ||
        Number(product.stock) === 0;
    }

    return (
      matchesSearch &&
      matchesCategory &&
      matchesPrice &&
      matchesAvailability
    );
  });

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setMaxPrice("");
    setAvailability("");
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-stone-800 font-sans">
      <Navbar />

    <section className="bg-[#F2EFE9] border-b border-stone-200/60 pt-10 pb-8 px-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#566E3D] mb-1">
                CENTRAL MARKETPLACE
              </p>

              <h1 className="text-3xl md:text-5xl font-black text-[#1C2819] tracking-tight">
                Fresh from farms. Ready for everyday life.
              </h1>

              <p className="text-xs md:text-sm text-stone-600 mt-2 max-w-2xl leading-relaxed">
                Shop direct produce from local market sellers, reserve items for pickup, or browse what is in season today.
              </p>
            </div>

            <Link
              to="/favorites"
              className="self-start px-5 py-2.5 bg-white border border-stone-300 text-stone-700 rounded-xl text-xs font-bold hover:bg-stone-50 transition shadow-sm"
            >
              ❤️ My Favorites
            </Link>
          </div>

        
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/80 shadow-sm space-y-4">
        
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 text-sm">
                🔍
              </span>
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-xs text-stone-800 outline-none focus:bg-white focus:border-[#566E3D] focus:ring-1 focus:ring-[#566E3D]"
              />
            </div>

        
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {categoriesList.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat === "All" ? "" : cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    (cat === "All" && !category) || category === cat
                      ? "bg-[#566E3D] text-white shadow-sm"
                      : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

        
            <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-stone-100">
              <div className="w-full sm:w-auto flex items-center gap-2">
                <span className="text-xs font-bold text-stone-500 shrink-0">Max Price:</span>
                <input
                  type="number"
                  placeholder="Rs. 1000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-stone-200 bg-stone-50 text-xs outline-none focus:bg-white focus:border-[#566E3D] w-32"
                />
              </div>

              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-stone-200 bg-stone-50 text-xs outline-none focus:bg-white focus:border-[#566E3D]"
              >
                <option value="">All Products</option>
                <option value="available">Available</option>
                <option value="unavailable">Out of Stock</option>
              </select>

              {(search || category || maxPrice || availability) && (
                <button
                  onClick={clearFilters}
                  className="text-xs font-bold text-rose-600 hover:underline ml-auto"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

  
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
 
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500">
            CATALOG PRODUCTS
          </h2>

          <span className="text-xs font-semibold text-stone-500">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
          </span>
        </div>

     
        {loading ? (
          <div className="bg-white border border-stone-200/80 rounded-2xl p-12 text-center">
            <div className="text-4xl mb-3">🥬</div>
            <p className="text-xs font-bold text-stone-500">Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="bg-white border border-stone-200/80 rounded-2xl p-12 text-center">
            <div className="text-4xl mb-3">🔎</div>
            <h3 className="text-sm font-bold text-stone-800">No products found</h3>
            <p className="text-xs text-stone-500 mt-1">
              Try changing your search keywords or filter settings.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredProducts.map((product) => {
              const available =
                product.isAvailable === true && Number(product.stock) > 0;

              return (
                <div
                  key={product._id}
                  className="bg-white border border-stone-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between"
                >
                  <div>
                   
                    <div className="relative h-44 w-full bg-[#EAF2E1] flex items-center justify-center overflow-hidden">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-5xl">🥬</span>
                      )}

                   
                      <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-stone-800 text-[10px] font-bold px-2.5 py-1 rounded-md shadow-sm">
                        {product.category || "General"}
                      </span>

                  
                      <button
                        onClick={() => toggleFavorite(product)}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm text-xs hover:scale-105 transition"
                      >
                        {isFavorite(product._id) ? "❤️" : "🤍"}
                      </button>

                    
                      <span
                        className={`absolute bottom-3 left-3 text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          available
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-200/60"
                            : "bg-rose-100 text-rose-800 border border-rose-200/60"
                        }`}
                      >
                        {available ? "Available" : "Out of Stock"}
                      </span>
                    </div>

                  
                    <div className="p-4 space-y-2">
                      <h3 className="text-base font-bold text-[#1C2819] line-clamp-1">
                        {product.name}
                      </h3>

                      <p className="text-xs text-stone-500 font-medium">
                        Stock: {product.stock} {product.unit}
                      </p>

                      <div className="pt-2">
                        <p className="text-base font-black text-[#566E3D]">
                          Rs. {product.price}
                          <span className="text-xs text-stone-400 font-normal">
                            {" "}
                            / {product.unit}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 pt-0">
                    <Link
                      to={`/products/${product._id}`}
                      className="block w-full text-center py-2 bg-[#566E3D] hover:bg-[#455931] text-white rounded-xl text-xs font-bold transition"
                    >
                      View Product &rarr;
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>


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

export default Products;