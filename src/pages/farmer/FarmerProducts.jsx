import { useEffect, useState } from "react";
import axiosInstance from "../../utils/BaseUrl";

import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

import {
  Plus,
  Pencil,
  Trash2,
  Package,
  CheckCircle2,
  XCircle,
  Tag,
  DollarSign,
  Layers,
  Image as ImageIcon,
  ArrowLeft,
  ShoppingBasket,
  X,
  AlertCircle
} from "lucide-react";

function FarmerProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    category: "Vegetables",
    description: "",
    price: "",
    unit: "",
    stock: "",
    image: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const categories = [
    "Vegetables",
    "Fruits",
    "Dairy",
    "Meat",
    "Eggs",
    "Grains",
    "Other",
  ];

  // =========================
  // FETCH MY PRODUCTS
  // =========================

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axiosInstance.get(
        "/api/products/my",
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

  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // =========================
  // ADD / UPDATE PRODUCT
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const data = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
      };

      let response;

      if (editingId) {
        response = await axiosInstance.put(
          `/api/products/${editingId}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMessage("Product updated successfully! ✅");
      } else {
        response = await axiosInstance.post(
          "/api/products",
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMessage("Product added successfully! ✅");
      }

      setFormData({
        name: "",
        category: "Vegetables",
        description: "",
        price: "",
        unit: "",
        stock: "",
        image: "",
      });

      setEditingId(null);

      fetchProducts();
    } catch (error) {
      console.log(
        "SAVE PRODUCT ERROR:",
        error.response?.data || error.message
      );

      setMessage(
        error.response?.data?.message ||
          "Failed to save product."
      );
    }
  };

  // =========================
  // EDIT PRODUCT
  // =========================

  const handleEdit = (product) => {
    setEditingId(product._id);

    setFormData({
      name: product.name || "",
      category: product.category || "Vegetables",
      description: product.description || "",
      price: product.price ?? "",
      unit: product.unit || "",
      stock: product.stock ?? "",
      image: product.image || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // DELETE PRODUCT
  // =========================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await axiosInstance.delete(
        `/api/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Product deleted successfully! 🗑️");

      fetchProducts();
    } catch (error) {
      console.log(
        "DELETE ERROR:",
        error.response?.data || error.message
      );

      setMessage(
        error.response?.data?.message ||
          "Failed to delete product."
      );
    }
  };

  // =========================
  // TOGGLE AVAILABILITY
  // =========================

  const toggleAvailability = async (product) => {
    try {
      const token = localStorage.getItem("token");

      await axiosInstance.put(
        `/api/products/${product._id}`,
        {
          isAvailable: !product.isAvailable,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Availability updated! ✅");

      fetchProducts();
    } catch (error) {
      console.log(
        "AVAILABILITY ERROR:",
        error.response?.data || error.message
      );

      setMessage(
        error.response?.data?.message ||
          "Failed to update availability."
      );
    }
  };

  // =========================
  // CANCEL EDIT
  // =========================

  const cancelEdit = () => {
    setEditingId(null);

    setFormData({
      name: "",
      category: "Vegetables",
      description: "",
      price: "",
      unit: "",
      stock: "",
      image: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1E293B] flex font-sans">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Container */}
      <main className="flex-1 p-6 sm:p-10 max-w-7xl mx-auto space-y-8">
        
        {/* Top Navigation / Breadcrumb Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200/60 pb-5">
          <div>
            <Link
              to="/farmer/dashboard"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-900 transition mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
            </Link>
            <p className="text-[11px] font-extrabold uppercase tracking-wider text-stone-400">
              INVENTORY MANAGEMENT
            </p>
            <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
              My Products
            </h1>
          </div>

          <div className="flex items-center gap-2 bg-white border border-[#EFECE6] px-4 py-2 rounded-xl shadow-sm text-xs font-semibold text-stone-600">
            <ShoppingBasket className="w-4 h-4 text-emerald-700" />
            <span>Total Listings: <strong>{products.length}</strong></span>
          </div>
        </div>

        {/* Feedback Alert Message */}
        {message && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl text-xs font-semibold flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{message}</span>
            </div>
            <button onClick={() => setMessage("")} className="text-emerald-700 hover:text-emerald-900">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* =========================
            PRODUCT FORM CARD
        ========================= */}
        <section className="bg-white border border-[#EFECE6] rounded-2xl p-6 shadow-sm space-y-6">
          <div className="border-b border-stone-100 pb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
                {editingId ? (
                  <>
                    <Pencil className="w-4 h-4 text-amber-600" /> Edit Product
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 text-emerald-600" /> Add New Product
                  </>
                )}
              </h2>
              <p className="text-xs text-stone-500 font-medium mt-0.5">
                {editingId
                  ? "Update product pricing, stock quantity, or details."
                  : "List fresh produce available for community buyers."}
              </p>
            </div>

            {editingId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="px-3 py-1.5 border border-stone-200 hover:bg-stone-50 text-stone-600 rounded-lg text-xs font-semibold transition"
              >
                Cancel Edit
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              
              {/* Product Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-stone-400" /> Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Fresh Tomatoes"
                  required
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-stone-200 rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-emerald-600 transition"
                />
              </div>

              {/* Category Dropdown */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-stone-400" /> Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-stone-200 rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-emerald-600 transition"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-stone-400" /> Price (Rs) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  placeholder="180"
                  required
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-stone-200 rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-emerald-600 transition"
                />
              </div>

              {/* Unit */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                  Unit Type *
                </label>
                <input
                  type="text"
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  placeholder="kg / dozen / liter"
                  required
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-stone-200 rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-emerald-600 transition"
                />
              </div>

              {/* Stock */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                  <Package className="w-3.5 h-3.5 text-stone-400" /> Initial Stock *
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  min="0"
                  placeholder="20"
                  required
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-stone-200 rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-emerald-600 transition"
                />
              </div>

              {/* Image URL */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-stone-400" /> Image URL
                </label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-stone-200 rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-emerald-600 transition"
                />
              </div>

            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-700">Description</label>
              <textarea
                name="description"
                rows="2"
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide details about freshness, organic status, or harvesting time..."
                className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-stone-200 rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-emerald-600 transition resize-none"
              />
            </div>

            {/* Form Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition shadow-sm inline-flex items-center gap-2"
              >
                {editingId ? (
                  <>
                    <Pencil className="w-3.5 h-3.5" /> Update Product
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5" /> Save Product
                  </>
                )}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="px-4 py-2.5 border border-stone-200 hover:bg-stone-50 text-stone-600 rounded-xl text-xs font-semibold transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        {/* =========================
            MY PRODUCTS GRID
        ========================= */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#0F172A]">Listing Catalog</h2>
              <p className="text-xs text-stone-500">Your current items active on the marketplace</p>
            </div>
          </div>

          {loading ? (
            <div className="bg-white border border-[#EFECE6] rounded-2xl p-8 text-center text-xs font-semibold text-stone-400">
              Loading active produce listings...
            </div>
          ) : products.length === 0 ? (
            <div className="bg-white border border-[#EFECE6] rounded-2xl p-10 text-center space-y-2">
              <AlertCircle className="w-8 h-8 text-stone-300 mx-auto" />
              <p className="text-xs font-bold text-stone-600">No products listed yet</p>
              <p className="text-xs text-stone-400">Fill out the form above to post your first farm produce.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white border border-[#EFECE6] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
                >
                  {/* Top Image & Badge Container */}
                  <div>
                    <div className="h-44 bg-[#FAF8F5] relative overflow-hidden flex items-center justify-center border-b border-stone-100">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center gap-1 text-stone-300">
                          <ImageIcon className="w-8 h-8" />
                          <span className="text-[10px] font-semibold">No Image</span>
                        </div>
                      )}

                      {/* Status Overlay Badge */}
                      <span
                        className={`absolute top-2.5 right-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm ${
                          product.isAvailable
                            ? "bg-emerald-500 text-white"
                            : "bg-rose-500 text-white"
                        }`}
                      >
                        {product.isAvailable ? "Available" : "Sold Out"}
                      </span>

                      {/* Category Tag */}
                      <span className="absolute bottom-2.5 left-2.5 text-[10px] font-semibold bg-black/60 backdrop-blur-sm text-white px-2 py-0.5 rounded-md">
                        {product.category}
                      </span>
                    </div>

                    {/* Content Section */}
                    <div className="p-4 space-y-2">
                      <h3 className="font-bold text-sm text-[#0F172A] leading-tight truncate">
                        {product.name}
                      </h3>

                      {product.description && (
                        <p className="text-[11px] text-stone-500 line-clamp-2 leading-relaxed">
                          {product.description}
                        </p>
                      )}

                      <div className="pt-2 flex items-center justify-between border-t border-stone-100 text-xs">
                        <div>
                          <span className="text-[10px] text-stone-400 uppercase font-bold block">Price</span>
                          <span className="font-extrabold text-[#0F172A]">
                            Rs. {product.price} <span className="text-[10px] font-normal text-stone-500">/ {product.unit}</span>
                          </span>
                        </div>

                        <div className="text-right">
                          <span className="text-[10px] text-stone-400 uppercase font-bold block">Stock</span>
                          <span className="font-extrabold text-stone-700">{product.stock} left</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Controls Footer */}
                  <div className="p-4 pt-0 space-y-2">
                    <button
                      onClick={() => toggleAvailability(product)}
                      className={`w-full py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 border ${
                        product.isAvailable
                          ? "border-rose-200 text-rose-700 bg-rose-50 hover:bg-rose-100"
                          : "border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100"
                      }`}
                    >
                      {product.isAvailable ? (
                        <>
                          <XCircle className="w-3.5 h-3.5" /> Mark Sold Out
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" /> Mark Available
                        </>
                      )}
                    </button>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="py-1.5 border border-stone-200 hover:bg-stone-50 text-stone-700 rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1"
                      >
                        <Pencil className="w-3 h-3 text-stone-500" /> Edit
                      </button>

                      <button
                        onClick={() => handleDelete(product._id)}
                        className="py-1.5 border border-rose-200 hover:bg-rose-50 text-rose-600 rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1"
                      >
                        <Trash2 className="w-3 h-3 text-rose-500" /> Delete
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </section>

      </main>
    </div>
  );
}

export default FarmerProducts;