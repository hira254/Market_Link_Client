
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import axios from "axios";
import {
  ShoppingCart,
  Trash2,
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
} from "lucide-react";

function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // LOAD CART FROM BACKEND
  // ==========================================
  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:4000/api/cart",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCart(response.data.cart.items || []);
      setTotal(response.data.totalAmount || 0);
    } catch (error) {
      console.error(
        "LOAD CART ERROR:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // UPDATE QUANTITY
  // ==========================================
  const updateCart = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `http://localhost:4000/api/cart/update/${cartItemId}`,
        {
          quantity: newQuantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCart(response.data.cart.items || []);
      setTotal(response.data.totalAmount || 0);
    } catch (error) {
      console.error(
        "UPDATE CART ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to update cart"
      );
    }
  };

  // ==========================================
  // REMOVE ITEM
  // ==========================================
  const removeItem = async (cartItemId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.delete(
        `http://localhost:4000/api/cart/remove/${cartItemId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCart(response.data.cart.items || []);
      setTotal(response.data.totalAmount || 0);
    } catch (error) {
      console.error(
        "REMOVE CART ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to remove item"
      );
    }
  };

  // ==========================================
  // CLEAR CART
  // ==========================================
  const clearCart = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.delete(
        "http://localhost:4000/api/cart/clear",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCart([]);
      setTotal(response.data.totalAmount || 0);
    } catch (error) {
      console.error(
        "CLEAR CART ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to clear cart"
      );
    }
  };

  // ==========================================
  // LOADING
  // ==========================================
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBF9F5] text-[#12222E] font-sans">
        <Navbar />

        <div className="flex items-center justify-center py-32">
          <p className="text-sm font-semibold text-stone-500">
            Loading your cart...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // EMPTY CART
  // ==========================================
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#FBF9F5] text-[#12222E] font-sans flex flex-col justify-between">
        <Navbar />

        <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4 my-auto">
          <div className="w-16 h-16 rounded-full bg-[#EAF2E1] flex items-center justify-center mx-auto text-[#566E3D]">
            <ShoppingCart className="w-8 h-8" />
          </div>

          <h1 className="text-3xl font-black text-[#12222E]">
            Your cart is empty
          </h1>

          <p className="text-stone-500 text-xs sm:text-sm max-w-sm mx-auto">
            Explore seasonal produce from local growers
            near you and build your market order.
          </p>

          <div className="pt-2">
            <Link to="/products">
              <button className="px-6 py-3 bg-[#566E3D] hover:bg-[#455931] text-white text-xs font-bold rounded-xl shadow-sm transition">
                Browse Products
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // CART UI
  // ==========================================
  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#12222E] font-sans flex flex-col justify-between">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow w-full space-y-6">

        {/* HEADER */}
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#566E3D]">
            YOUR BASKET
          </span>

          <h1 className="text-3xl font-black text-[#12222E] mt-1">
            My Cart
          </h1>
        </div>

        {/* CART ITEMS */}
        <div className="space-y-4">
          {cart.map((item) => {
            const product = item.product;

            // Safety check
            if (!product) return null;

            return (
              <div
                key={item._id}
                className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/80 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >

                {/* PRODUCT INFO */}
                <div className="flex items-center space-x-4">

                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded-xl border border-stone-100 shrink-0"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-xl bg-stone-100 flex items-center justify-center text-stone-400 shrink-0">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                  )}

                  <div>
                    <h2 className="font-bold text-[#12222E] text-base">
                      {product.name}
                    </h2>

                    <p className="text-xs text-stone-500 mt-0.5">
                      Price: Rs. {product.price}
                    </p>

                   <p className="font-semibold text-marketlink-earth-deep">
  Subtotal: Rs.{" "}
  {Number(item.product?.price || 0) *
    Number(item.quantity || 0)}
</p>
                  </div>
                </div>

                {/* QUANTITY + REMOVE */}
                <div className="flex items-center justify-between w-full sm:w-auto gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">

                  <div className="flex items-center border border-stone-200 rounded-xl overflow-hidden bg-stone-50">

                    {/* MINUS */}
                    <button
                      onClick={() =>
                        updateCart(
                          item._id,
                          item.quantity - 1
                        )
                      }
                      disabled={item.quantity <= 1}
                      className="p-2 font-bold text-stone-600 hover:bg-stone-200 transition disabled:opacity-40"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>

                    {/* QUANTITY */}
                    <span className="px-3 text-xs font-bold text-[#12222E]">
                      {item.quantity}
                    </span>

                    {/* PLUS */}
                    <button
                      onClick={() =>
                        updateCart(
                          item._id,
                          item.quantity + 1
                        )
                      }
                      disabled={
                        product.stock <= item.quantity
                      }
                      className="p-2 font-bold text-stone-600 hover:bg-stone-200 transition disabled:opacity-40"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* REMOVE */}
                  <button
                    onClick={() => removeItem(item._id)}
                    className="p-2 text-xs font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition border border-transparent hover:border-rose-100 flex items-center gap-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* TOTAL SUMMARY */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">

          <div>
            <span className="text-xs text-stone-400 font-medium">
              Estimated Order Total
            </span>

            <h2 className="text-2xl font-black text-[#12222E]">
              Total: Rs. {total}
            </h2>
          </div>

          <div className="flex flex-wrap gap-2 w-full sm:w-auto">

            {/* CLEAR */}
            <button
              onClick={clearCart}
              className="flex-1 sm:flex-none px-4 py-2.5 text-xs font-bold text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-xl transition"
            >
              Clear Cart
            </button>

            {/* CONTINUE SHOPPING */}
            <Link
              to="/products"
              className="flex-1 sm:flex-none"
            >
              <button className="w-full px-4 py-2.5 text-xs font-bold text-[#12222E] bg-stone-100 hover:bg-stone-200 rounded-xl transition">
                Continue Shopping
              </button>
            </Link>

            {/* CHECKOUT */}
            <Link
              to="/checkout"
              className="flex-1 sm:flex-none"
            >
              <button className="w-full px-6 py-2.5 text-xs font-bold text-white bg-[#566E3D] hover:bg-[#455931] rounded-xl shadow-sm transition flex items-center justify-center gap-2">
                Proceed to Pre-Order
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>

          </div>
        </div>
      </main>
    </div>
  );
}

export default Cart;
