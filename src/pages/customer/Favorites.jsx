import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { Heart, ShoppingBag, Store, Trash2, Eye } from "lucide-react";

function Favorites() {
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [favoriteFarmers, setFavoriteFarmers] = useState([]);

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem("favoriteProducts")) || [];
    const farmers = JSON.parse(localStorage.getItem("favoriteFarmers")) || [];

    setFavoriteProducts(products);
    setFavoriteFarmers(farmers);
  }, []);

  const removeProduct = (productId) => {
    const updatedProducts = favoriteProducts.filter((product) => product._id !== productId);
    setFavoriteProducts(updatedProducts);
    localStorage.setItem("favoriteProducts", JSON.stringify(updatedProducts));
  };

  const removeFarmer = (farmerId) => {
    const updatedFarmers = favoriteFarmers.filter((farmer) => farmer._id !== farmerId);
    setFavoriteFarmers(updatedFarmers);
    localStorage.setItem("favoriteFarmers", JSON.stringify(updatedFarmers));
  };

  return (
    // FIX 1: Flex row wrapper taaki sidebar left par ho aur main content right side par scroll ho sake
    <div className="flex min-h-screen bg-[#FBF9F5] text-[#12222E] font-sans">
      
      {/* SIDEBAR COMPONENT */}
      <Sidebar />

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 min-w-0 overflow-y-auto">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 w-full">
          
          {/* HEADER */}
          <div className="flex justify-between items-center border-b border-stone-200/80 pb-6">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#566E3D]">
                SAVED ITEMS
              </span>
              <h1 className="text-3xl font-black text-[#12222E] mt-1 flex items-center gap-2">
                My Favorites <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
              </h1>
            </div>
            <Link to="/dashboard">
              <button className="px-4 py-2 bg-white border border-stone-300 hover:border-stone-400 text-stone-700 text-xs font-bold rounded-xl transition shadow-sm">
                Back to Dashboard
              </button>
            </Link>
          </div>

          {/* FAVORITE PRODUCTS SECTION */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-[#12222E] flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#566E3D]" /> Favorite Products
            </h2>

            {favoriteProducts.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl border border-stone-200/80 text-center space-y-3 shadow-sm">
                <p className="text-xs text-stone-500">No favorite products saved yet.</p>
                <Link to="/products" className="inline-block">
                  <button className="px-5 py-2.5 bg-[#566E3D] hover:bg-[#455931] text-white text-xs font-bold rounded-xl shadow-sm transition">
                    Browse Products
                  </button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {favoriteProducts.map((product) => (
                  <div key={product._id} className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-sm flex flex-col justify-between space-y-3">
                    <div>
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="w-full h-36 object-cover rounded-xl mb-3 border border-stone-100" />
                      ) : (
                        <div className="w-full h-36 bg-stone-100 rounded-xl mb-3 flex items-center justify-center text-stone-400">
                          <ShoppingBag className="w-8 h-8" />
                        </div>
                      )}
                      <h3 className="font-bold text-[#12222E] text-base">{product.name}</h3>
                      <p className="text-xs text-stone-500">Category: {product.category}</p>
                      <p className="text-xs font-bold text-[#566E3D] mt-1">Price: Rs. {product.price} / {product.unit}</p>
                    </div>
                    <div className="flex gap-2 pt-2 border-t border-stone-100">
                      <Link to={`/products/${product._id}`} className="flex-1">
                        <button className="w-full py-2 bg-[#566E3D] text-white text-xs font-bold rounded-xl hover:bg-[#455931] transition flex items-center justify-center gap-1">
                          <Eye className="w-3.5 h-3.5" /> View
                        </button>
                      </Link>
                      <button
                        onClick={() => removeProduct(product._id)}
                        className="px-3 py-2 bg-rose-50 text-rose-600 text-xs font-bold rounded-xl hover:bg-rose-100 transition border border-rose-100"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* FAVORITE FARMERS SECTION */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-[#12222E] flex items-center gap-2">
              <Store className="w-5 h-5 text-[#566E3D]" /> Favorite Farmers
            </h2>

            {favoriteFarmers.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl border border-stone-200/80 text-center space-y-3 shadow-sm">
                <p className="text-xs text-stone-500">No favorite farmers saved yet.</p>
                <Link to="/farmers" className="inline-block">
                  <button className="px-5 py-2.5 bg-[#566E3D] hover:bg-[#455931] text-white text-xs font-bold rounded-xl shadow-sm transition">
                    Browse Farmers
                  </button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {favoriteFarmers.map((farmer) => (
                  <div key={farmer._id} className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-sm flex flex-col justify-between space-y-4">
                    <div className="space-y-1 text-xs text-stone-600">
                      <h3 className="font-extrabold text-base text-[#12222E]">{farmer.name}</h3>
                      {farmer.stallName && <p><strong>Stall:</strong> {farmer.stallName}</p>}
                      {farmer.address && <p><strong>Location:</strong> {farmer.address}</p>}
                      {farmer.phone && <p><strong>Phone:</strong> {farmer.phone}</p>}
                    </div>
                    <div className="pt-2 border-t border-stone-100">
                      <button
                        onClick={() => removeFarmer(farmer._id)}
                        className="w-full py-2 bg-rose-50 text-rose-600 text-xs font-bold rounded-xl hover:bg-rose-100 transition border border-rose-100 flex items-center justify-center gap-1.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remove Favorite
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </main>
      </div>

    </div>
  );
}

export default Favorites;