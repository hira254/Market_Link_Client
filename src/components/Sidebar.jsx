import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import {
  LayoutDashboard,
  Users,
  UserCheck,
  Store,
  Package,
  ClipboardList,
  History,
  Star,
  ShoppingBag,
  Heart,
  User,
  LogOut,
  Sprout,
  Bell,
} from "lucide-react";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navConfigs = {
    admin: {
      portalTitle: "ADMIN",
      subtitle: "Platform administrator",

      links: [
        {
          path: "/admin",
          label: "Dashboard",
          icon: LayoutDashboard,
        },
        {
          path: "/admin/farmers",
          label: "Farmers",
          icon: UserCheck,
        },
        {
          path: "/admin/customers",
          label: "Customers",
          icon: Users,
        },
        {
          path: "/admin/markets",
          label: "Markets",
          icon: Store,
        },
        {
          path: "/admin/products",
          label: "Products",
          icon: Package,
        },
        {
          path: "/admin/orders",
          label: "Orders",
          icon: ClipboardList,
        },
        {
          path: "/admin/reviews",
          label: "Reviews",
          icon: Star,
        },
      ],
    },

    farmer: {
      portalTitle: "FARMER",
      subtitle: user?.farmName || "Registered Farm",

      links: [
        {
          path: "/farmer",
          label: "Dashboard",
          icon: LayoutDashboard,
        },
        {
  path: "/farmer/profile",
  label: "My Profile",
  icon: User,
},
        {
          path: "/farmer/products",
          label: "My Products",
          icon: Package,
        },
        {
          path: "/farmer/orders",
          label: "Orders",
          icon: ClipboardList,
        },
        {
          path: "/farmer/history",
          label: "Order History",
          icon: History,
        },
        {
          path: "/farmer/reviews",
          label: "Customer Reviews",
          icon: Star,
        },
      ],
    },

    customer: {
      portalTitle: "CUSTOMER",
      subtitle: "MarketLink Shopper",

      links: [
        {
          path: "/dashboard",
          label: "Dashboard",
          icon: LayoutDashboard,
        },
        {
          path: "/products",
          label: "Browse Products",
          icon: Package,
        },
        {
          path: "/farmers",
          label: "Find Markets",
          icon: Store,
        },
        {
          path: "/cart",
          label: "My Cart",
          icon: ShoppingBag,
        },
        {
          path: "/orders",
          label: "My Orders",
          icon: ClipboardList,
        },
        {
          path: "/favorites",
          label: "Favorites",
          icon: Heart,
        },
       
        {
          path: "/notifications",
          label: "Notifications",
          icon: Bell,
        },
        {
          path: "/profile",
          label: "Profile",
          icon: User,
        },
      ],
    },
  };

  const currentRole = user?.role?.toLowerCase() || "customer";

  const config =
    navConfigs[currentRole] || navConfigs.customer;

  return (
    <aside className="w-56 bg-[#FBF9F5] border-r border-stone-200/80 min-h-screen p-5 flex flex-col justify-between shrink-0 font-sans">

      <div>

        {/* LOGO BRANDING */}
        <div className="flex items-center gap-2.5 px-1 py-1 mb-8">
          <div className="w-8 h-8 rounded-lg bg-[#566E3D] text-white flex items-center justify-center shrink-0">
            <Sprout className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight text-[#12222E] leading-none">
              Market<span className="text-[#566E3D]">Link</span>
            </span>
          </div>
        </div>

        {/* ROLE SECTION HEADER */}
        <div className="px-2 mb-3">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#8A9B75]">
            {config.portalTitle}
          </span>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="space-y-1">

          {config.links.map((link) => {

            const isActive = location.pathname === link.path;

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-[#E3E8CD] text-[#12222E] font-bold"
                    : "text-stone-600 hover:bg-stone-100/70 hover:text-[#12222E]"
                }`}
              >
                <span>
                  {link.label}
                </span>

              </Link>
            );
          })}

        </nav>

      </div>

      {/* USER PROFILE & LOGOUT */}
      <div className="pt-4 border-t border-stone-200/80 space-y-3">
        <div className="px-2">
          <p className="text-xs font-bold text-[#12222E] truncate">
            {user?.name || "Customer Account"}
          </p>
          <p className="text-[10px] text-stone-400 truncate">
            {config.subtitle}
          </p>
        </div>

        <button
          onClick={logout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-stone-500 hover:bg-rose-50 hover:text-rose-600 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5 shrink-0" />
          <span>Logout</span>
        </button>
      </div>

    </aside>
  );
};

export default Sidebar;