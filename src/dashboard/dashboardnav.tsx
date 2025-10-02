import { useEffect, useState } from "react";
import { Bell, Search, MessageCircleMore } from "lucide-react";
import defaultProfile from "../assets/images/women-150x150.jpg";
import axios from "axios";

interface User {
  name: string;
  role: string;
  avatar?: string;
}

interface Notification {
  _id: string;
  message: string;
  read: boolean;
}

interface Message {
  _id: string;
  text: string;
  read: boolean;
}

export default function DashboardNav() {
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const fetchNotifications = async () => {
      try {
        const res = await axios.get("/api/notifications");
        const data = Array.isArray(res.data) ? res.data : res.data?.data || [];
        setNotifications(data);
      } catch (error) {
        console.error("Failed to fetch notifications", error);
        setNotifications([]);
      }
    };

    const fetchMessages = async () => {
      try {
        const res = await axios.get("/api/messages");
        const data = Array.isArray(res.data) ? res.data : res.data?.data || [];
        setMessages(data);
      } catch (error) {
        console.error("Failed to fetch messages", error);
        setMessages([]);
      }
    };

    fetchNotifications();
    fetchMessages();

    // Optional: poll every 30s
    const interval = setInterval(() => {
      fetchNotifications();
      fetchMessages();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Always safe: notifications & messages are arrays
  const unreadNotifications = notifications.filter((n) => !n.read).length;
  const unreadMessages = messages.filter((m) => !m.read).length;

  return (
    <header className="flex items-center justify-between px-4 sm:px-6 py-4 bg-gray-200 border-b">
      {/* Search bar */}
      <div className="flex w-full max-w-2xl">
        <input
          type="text"
          placeholder="Search for products, categories, brands, sku..."
          className="flex-1 py-2 px-3 border border-gray-300 rounded-l-md focus:outline-none text-sm sm:text-base"
        />
        <button className="bg-yellow-400 px-4 py-2 rounded-r-md text-black font-bold hover:bg-black hover:text-white flex items-center justify-center">
          <Search size={18} />
        </button>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-6 ml-4">
        {/* Messages */}
        <div className="relative">
          <MessageCircleMore
            size={26}
            strokeWidth={1.5}
            className="text-gray-600 cursor-pointer"
          />
          {unreadMessages > 0 && (
            <span className="absolute -top-1 -right-2 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full">
              {unreadMessages}
            </span>
          )}
        </div>

        {/* Notifications */}
        <div className="relative">
          <Bell
            size={26}
            strokeWidth={1.5}
            className="text-gray-600 cursor-pointer"
          />
          {unreadNotifications > 0 && (
            <span className="absolute -top-1 -right-2 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full">
              {unreadNotifications}
            </span>
          )}
        </div>

        {/* Profile */}
        <div className="flex items-center space-x-2">
          <img
            src={user?.avatar || defaultProfile}
            alt="profile"
            className="w-8 h-8 rounded-full"
          />
          <div className="hidden sm:block">
            <p className="text-sm font-semibold">{user?.name || "Guest"}</p>
            <p className="text-xs text-gray-500">{user?.role || "User"}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
