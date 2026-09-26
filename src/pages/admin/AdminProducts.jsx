import { useEffect, useState } from "react";
import axiosInstance from "../../utils/BaseUrl";

import { Link } from "react-router-dom";
import logoImg from "../../assets/logo.png";

import {
  LayoutDashboard,
  Users,
  UserCheck,
  Store,
  Package,
  Star,
  FolderTree,
  BarChart3,
  CheckCircle2,
  Trash2,
  Tag,
  User,
  Mail,
  Layers,
  LogOut,
  AlertTriangle
} from "lucide-react";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axiosInstance.get(
        "/api/products",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProducts(response.data.products || []);
    } catch (error) {
      console.log(
        "PRODUCTS ERROR:",
        error.response?.data || error.message
      );

      setMessage(
        error.response?.data?.message ||
          "Failed to fetch products."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const removeProduct = async (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this product?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await axiosInstance.delete(
        `/api/products/admin/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(
        response.data.message ||
          "Product removed successfully."
      );

      fetchProducts();
    } catch (error) {
      console.log(
        "REMOVE PRODUCT ERROR:",
        error.response?.data || error.message
      );

      setMessage(
        error.response?.data?.message ||
          "Failed to remove product."
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#0F172A] flex font-sans">
      
      {/* Admin Sidebar Navigation */}
      <aside className="w-64 bg-[#1E56A0] text-white min-h-screen p-6 flex flex-col justify-between shrink-0 shadow-lg">
        <div>
          <div className="flex items-center gap-3 pb-6 mb-6 border-b border-white/10">
            {logoImg ? (
              <img src={logoImg} alt="MarketLink Logo" className="h-9 object-contain" />
            ) : (
              <div className="w-9 h-9 rounded-xl bg-white text-[#1E56A0] font-black flex items-center justify-center">
                ML
              </div>
            )}
            <div>
              <h2 className="text-lg font-black tracking-tight leading-none text-white">
                MarketLink
              </h2>
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-200">
                Admin Console
              </span>
            </div>
          </div>

          <nav className="space-y-1.5">
            <Link
              to="/admin"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-blue-100 hover:bg-white/10 hover:text-white transition-all"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>

            <Link
              to="/admin/farmers"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-blue-100 hover:bg-white/10 hover:text-white transition-all"
            >
              <UserCheck className="w-4 h-4" />
              <span>Farmers</span>
            </Link>

            <Link
              to="/admin/customers"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-blue-100 hover:bg-white/10 hover:text-white transition-all"
            >
              <Users className="w-4 h-4" />
              <span>Customers</span>
            </Link>

            <Link
              to="/admin/markets"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-blue-100 hover:bg-white/10 hover:text-white transition-all"
            >
              <Store className="w-4 h-4" />
              <span>Markets</span>
            </Link>

            <Link
              to="/admin/products"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#163172] text-white shadow-sm transition-all"
            >
              <Package className="w-4 h-4" />
              <span>Products</span>
            </Link>

            <Link
              to="/admin/reviews"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-blue-100 hover:bg-white/10 hover:text-white transition-all"
            >
              <Star className="w-4 h-4" />
              <span>Reviews</span>
            </Link>

            <Link
              to="/admin/categories"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-blue-100 hover:bg-white/10 hover:text-white transition-all"
            >
              <FolderTree className="w-4 h-4" />
              <span>Categories</span>
            </Link>

            <Link
              to="/admin/reports"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-blue-100 hover:bg-white/10 hover:text-white transition-all"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Reports</span>
            </Link>
          </nav>
        </div>

        <div className="pt-4 border-t border-white/10">
          <Link
            to="/"
            className="text-xs font-semibold text-blue-100 hover:text-white transition-all flex items-center justify-between"
          >
            <span>Exit Console</span>
            <LogOut className="w-3.5 h-3.5" />
          </Link>
        </div>
      </aside>

      {/* Main Content Workspace */}
      <main className="flex-1 p-8 lg:p-10 max-w-6xl mx-auto space-y-8 overflow-y-auto">
        
        {/* Header Card */}
        <div className="bg-white border border-[#EFECE6] p-6 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-stone-400">
              ADMIN CONTROL
            </span>
            <h1 className="text-3xl font-black text-[#0F172A] tracking-tight">
              Moderate Products
            </h1>
            <p className="text-xs font-medium text-stone-500 mt-1">
              A polished working section for moderate products, ready for live API and database wiring.
            </p>
          </div>

          <Link
            to="/admin"
            className="px-4 py-2 bg-[#1E56A0] hover:bg-[#163172] text-white text-xs font-bold rounded-xl transition shadow-sm self-start md:self-auto"
          >
            ← Dashboard
          </Link>
        </div>

        {/* Feedback Alert */}
        {message && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{message}</span>
          </div>
        )}

        {/* Products Grid */}
        {loading ? (
          <div className="bg-white border border-[#EFECE6] rounded-2xl p-10 text-center text-xs font-semibold text-stone-400">
            Loading products...
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white border border-[#EFECE6] rounded-2xl p-12 text-center space-y-2">
            <Package className="w-10 h-10 text-stone-300 mx-auto" />
            <p className="text-sm font-bold text-stone-700">No Products Listed</p>
            <p className="text-xs text-stone-400 font-medium">Marketplace listings from registered farmers will be shown here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-[#0F172A] tracking-tight">
                All Listings
              </h2>
              <span className="text-xs font-bold text-stone-400">
                Total Products: {products.length}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white border border-[#EFECE6] rounded-2xl p-5 shadow-sm flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2 border-b border-stone-100 pb-3">
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-stone-400">
                          {product.category || "General"}
                        </span>
                        <h3 className="text-base font-extrabold text-[#0F172A]">
                          {product.name}
                        </h3>
                      </div>

                      <div className="text-right">
                        <p className="text-base font-black text-[#1E56A0]">
                          Rs. {product.price}
                        </p>
                        <span className="text-[10px] font-bold text-stone-400 uppercase">
                          per {product.unit}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-stone-500 font-medium line-clamp-2">
                      {product.description || "No description provided."}
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-[#FAF9F6] p-2.5 rounded-xl border border-stone-100 space-y-0.5">
                        <span className="text-[10px] font-bold text-stone-400 uppercase">Stock & Status</span>
                        <p className="font-extrabold text-stone-800">
                          {product.stock ?? 0} {product.unit}
                        </p>
                        <span className={`text-[10px] font-bold ${product.isAvailable ? "text-emerald-600" : "text-rose-600"}`}>
                          {product.isAvailable ? "Available" : "Unavailable"}
                        </span>
                      </div>

                      <div className="bg-[#FAF9F6] p-2.5 rounded-xl border border-stone-100 space-y-0.5">
                        <span className="text-[10px] font-bold text-stone-400 uppercase">Farmer Info</span>
                        <p className="font-extrabold text-stone-800 truncate">
                          {product.farmer?.name || "Unknown"}
                        </p>
                        <p className="text-[10px] text-stone-400 truncate">
                          {product.farmer?.email || "No email"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-end">
                    <button
                      onClick={() => removeProduct(product._id)}
                      className="px-3.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold rounded-xl transition inline-flex items-center gap-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove Product
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default AdminProducts;