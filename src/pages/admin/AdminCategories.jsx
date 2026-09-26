import React, { useEffect, useState } from "react";
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
  Plus,
  Pencil,
  Trash2,
  LogOut,
  X,
  Tag,
  AlertCircle
} from "lucide-react";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get(
        "/api/categories",
        config
      );

      setCategories(response.data.categories || []);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to load categories"
      );
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setMessage("");
      setError("");

      if (editingId) {
        await axiosInstance.put(
          `/api/categories/${editingId}`,
          form,
          config
        );

        setMessage("Category updated successfully");
      } else {
        await axiosInstance.post(
          "/api/categories",
          form,
          config
        );

        setMessage("Category added successfully");
      }

      setForm({
        name: "",
        description: "",
      });

      setEditingId(null);
      fetchCategories();
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong"
      );
    }
  };

  const handleEdit = (category) => {
    setEditingId(category._id);

    setForm({
      name: category.name,
      description: category.description || "",
    });

    setMessage("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(
        `/api/categories/${id}`,
        config
      );

      setMessage("Category deleted successfully");
      fetchCategories();
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to delete category"
      );
    }
  };

  const cancelEdit = () => {
    setEditingId(null);

    setForm({
      name: "",
      description: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#0F172A] flex font-sans">
      
      {/* Admin Sidebar */}
      <aside className="w-64 bg-[#1E56A0] text-white min-h-screen p-6 flex flex-col justify-between shrink-0 shadow-lg">
        <div>
          {/* Brand Logo Header */}
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

          {/* Navigation Links */}
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
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-blue-100 hover:bg-white/10 hover:text-white transition-all"
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
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#163172] text-white shadow-sm transition-all"
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

      {/* Main Workspace */}
      <main className="flex-1 p-8 lg:p-10 max-w-6xl mx-auto space-y-8 overflow-y-auto">
        
        {/* Top Header Card */}
        <div className="bg-white border border-[#EFECE6] p-6 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-stone-400">
              ADMIN CONTROL
            </span>
            <h1 className="text-3xl font-black text-[#0F172A] tracking-tight">
              Manage Categories
            </h1>
            <p className="text-xs font-medium text-stone-500 mt-1">
              A polished working section for categories, ready for live API and database wiring.
            </p>
          </div>

          <Link
            to="/admin"
            className="px-4 py-2 bg-[#1E56A0] hover:bg-[#163172] text-white text-xs font-bold rounded-xl transition shadow-sm self-start md:self-auto"
          >
            ← Dashboard
          </Link>
        </div>

        {/* Feedback Alerts */}
        {message && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{message}</span>
          </div>
        )}

        {error && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs font-semibold text-rose-800 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Create / Edit Form Card */}
        <div className="bg-white border border-[#EFECE6] p-6 rounded-2xl shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <h2 className="text-base font-extrabold text-[#0F172A] flex items-center gap-2">
              {editingId ? (
                <>
                  <Pencil className="w-4 h-4 text-[#1E56A0]" /> Edit Category
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 text-[#1E56A0]" /> Add New Category
                </>
              )}
            </h2>

            {editingId && (
              <button
                onClick={cancelEdit}
                className="text-xs font-semibold text-rose-600 hover:underline flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" /> Cancel Edit
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                Category Name *
              </label>
              <input
                type="text"
                name="name"
                placeholder="e.g. Organic Vegetables"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full bg-[#FAF9F6] border border-stone-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-[#0F172A] focus:outline-none focus:border-[#1E56A0]"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                Description
              </label>
              <textarea
                name="description"
                placeholder="Provide a brief description for this product category..."
                value={form.description}
                onChange={handleChange}
                rows="3"
                className="w-full bg-[#FAF9F6] border border-stone-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-[#0F172A] focus:outline-none focus:border-[#1E56A0]"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              {editingId && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="px-4 py-2 border border-stone-200 text-stone-600 text-xs font-bold rounded-xl hover:bg-stone-50 transition"
                >
                  Cancel
                </button>
              )}

              <button
                type="submit"
                className="px-5 py-2 bg-[#1E56A0] hover:bg-[#163172] text-white text-xs font-bold rounded-xl transition shadow-sm"
              >
                {editingId ? "Update Category" : "Add Category"}
              </button>
            </div>
          </form>
        </div>

        {/* All Categories Feed */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-[#0F172A] tracking-tight">
              All Categories
            </h2>
            <span className="text-xs font-bold text-stone-400">
              Total: {categories.length}
            </span>
          </div>

          {categories.length === 0 ? (
            <div className="bg-white border border-[#EFECE6] rounded-2xl p-12 text-center space-y-2">
              <FolderTree className="w-10 h-10 text-stone-300 mx-auto" />
              <p className="text-sm font-bold text-stone-700">No Categories Found</p>
              <p className="text-xs text-stone-400">Add your first category using the form above.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categories.map((category) => (
                <div
                  key={category._id}
                  className="bg-white border border-[#EFECE6] rounded-2xl p-5 shadow-sm flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2 border-b border-stone-100 pb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1E56A0] flex items-center justify-center font-bold text-xs shrink-0">
                          <Tag className="w-4 h-4" />
                        </div>
                        <h3 className="text-base font-extrabold text-[#0F172A]">
                          {category.name}
                        </h3>
                      </div>

                      {category.status && (
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                          {category.status}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-stone-500 font-medium">
                      {category.description || "No description provided."}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleEdit(category)}
                      className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-xl transition inline-flex items-center gap-1"
                    >
                      <Pencil className="w-3.5 h-3.5" /> Edit
                    </button>

                    <button
                      onClick={() => handleDelete(category._id)}
                      className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold rounded-xl transition inline-flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

      </main>
    </div>
  );
};

export default AdminCategories;