import { useState } from "react";
import { Home, ShoppingCart, Users, BarChart, Percent, Settings, LogOut, HelpCircle, IceCreamCone, Menu, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { Notify } from "notiflix";
import axios from "axios";

const menu = [
  { name: "Dashboard", icon: Home, path: "/dashboard" },
  { name: "Orders", icon: ShoppingCart, path: "/dashboard/orders" },
  { name: "Customers", icon: Users, path: "/dashboard/customers" },
  { name: "Reports", icon: BarChart, path: "/dashboard/reports" },
  { name: "Discounts", icon: Percent, path: "/dashboard/discounts" },
  { name: "Settings", icon: Settings, path: "/dashboard/settings" },
  { name: "Products", icon: IceCreamCone, path: "/dashboard/products" },
  { name: "Help", icon: HelpCircle, path: "/dashboard/help" },
  { name: "Logout", icon: LogOut, path: "/logout" },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false); // For mobile menu toggle

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        await axios.post("http://localhost:5175/api/auth/logout", { refreshToken });
      }
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      Notify.success("Logged out successfully");
      navigate("/login");
    }
  };

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden flex justify-center bg-white border-b px-4 py-3 pb-[37rem] align-top">
        <div className="font-bold text-2xl"></div>
        <button onClick={() => setOpen(!open)} aria-label="Toggle Menu">
          {open ? <X size={28} /> : <Menu size={28}  className=" text-yellow-400"/>}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static top-0 left-0 h-full md:h-auto w-64 bg-white border-r z-50
          transform ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
          transition-transform duration-300 ease-in-out
        `}
      >
        <div className="px-6 py-4 hidden md:block font-bold text-3xl text-black">kapee.</div>
        <nav className="flex flex-col space-y-2 px-2 font-thin text-black pt-4 md:pt-0">
          {menu.map(({ name, icon: Icon, path }) =>
            name === "Logout" ? (
              <button
                key={name}
                onClick={handleLogout}
                className="flex items-center px-4 py-2 rounded hover:bg-black hover:text-white text-gray-950 text-lg"
              >
                <Icon size={20} className="mr-3" />
                {name}
              </button>
            ) : (
              <NavLink
                key={name}
                to={path}
                onClick={() => setOpen(false)} // Close mobile menu when clicked
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded hover:bg-black hover:text-white ${
                    isActive ? "bg-yellow-400 text-black font-bold" : "text-gray-950 text-lg"
                  }`
                }
              >
                <Icon size={20} className="mr-3" />
                {name}
              </NavLink>
            )
          )}
        </nav>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {open && <div className="fixed inset-0 bg-black opacity-30 z-40 md:hidden" onClick={() => setOpen(false)} />}
    </>
  );
}
