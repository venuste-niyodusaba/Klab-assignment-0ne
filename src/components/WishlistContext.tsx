import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import type { ReactNode } from "react";

// ✅ Expanded type so WishlistPage has access to product details
export type WishlistItem = {
  id: string;          // wishlist entry id
  productId: string;   // the actual product id
  name: string;        // product name
  image: string;       // product image url
  price: number;       // product price
  notes?: string;
};

type WishlistContextType = {
  wishlist: WishlistItem[];
  fetchWishlist: () => void;
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (id: string) => void;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const { token, isAuthenticated } = useAuth();
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  const API_URL = "https://kappee-backend-repo-11.onrender.com/api/wishlist"; 

  const fetchWishlist = async () => {
    if (!isAuthenticated) {
      setWishlist([]);
      return;
    }

    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // ✅ Ensure backend response is normalized to WishlistItem[]
      const data = Array.isArray(res.data) ? res.data : [];
      setWishlist(data);
    } catch (error) {
      console.error("Failed to fetch wishlist:", error);
      setWishlist([]);
    }
  };

  const addToWishlist = async (productId: string) => {
    if (!isAuthenticated) return;
    try {
      await axios.post(
        API_URL,
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchWishlist();
    } catch (error) {
      console.error("Failed to add to wishlist:", error);
    }
  };

  const removeFromWishlist = async (id: string) => {
    if (!isAuthenticated) return;
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchWishlist();
    } catch (error) {
      console.error("Failed to remove from wishlist:", error);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [token, isAuthenticated]);

  return (
    <WishlistContext.Provider
      value={{ wishlist, fetchWishlist, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within WishlistProvider");
  return context;
};
