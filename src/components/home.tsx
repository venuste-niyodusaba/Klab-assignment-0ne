import { useState, useEffect } from "react";
import axios from "axios";
import { ShoppingCart, Heart, Shuffle, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";

// Images
import phoneImg from "../assets/images/banner4.jpg";
import slider2Img from "../assets/images/Bags-150x150.png";
import banner4Img from "../assets/images/Shoes-150x150.jpg";
import banner5Img from "../assets/images/banner3.jpg";
import banner2Img from "../assets/images/Controllerfront.jpg";
import banner1Img from "../assets/images/JBL-Wireless-Bluetooth-Speaker-2-300x350.jpg";

interface Product {
  _id: string;
  name: string;
  category: { _id: string; name: string } | null;
  price: number;
  oldPrice?: number;
  images: string[];
  stock: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  desc: string;
  img: string;
}

interface Category {
  name: string;
  sub?: string[];
}

function Home() {
  const { addToCart } = useCart();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const categories: Category[] = [
    { name: "Men's Clothing", sub: ["T-Shirts", "Shirts", "Jeans", "Jackets"] },
    { name: "Women's Clothing", sub: ["Dresses", "Tops", "Skirts", "Shoes"] },
    { name: "Accessories", sub: ["Bags", "Watches", "Sunglasses"] },
    { name: "Shoes" },
    { name: "Jewellery", sub: ["Rings", "Necklaces", "Bracelets"] },
    { name: "Bags & Backpacks", sub: ["Side Bag", "Back Bags"] },
    { name: "Watches" },
    { name: "Electronics" },
    { name: "Home & Garden" },
  ];

  const slides: Slide[] = [
    { id: 1, title: "WIRELESS CHARGING STAND", subtitle: "BEST SMARTPHONE", desc: "Up To 70% Off", img: phoneImg }, 
    { id: 2, title: "DIGITAL SMARTWATCH", subtitle: "TRENDY & STYLISH", desc: "Limited Time Offer", img: banner5Img },
    { id: 3, title: "HOME DECOR COLLECTION", subtitle: "BEAUTIFY YOUR HOME", desc: "Sale Up To 50% Off", img: slider2Img },
  ];

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => setCurrentSlide((prev) => (prev + 1) % slides.length), 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get<Product[]>("https://kappee-backend-repo-10.onrender.com/api/products");
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  const featuredProducts = products.filter((p) => p.isActive);
  const hotDealsProducts = products.filter((p) => p.oldPrice && p.price < p.oldPrice);
  const bestSellingProducts = products.filter((p) => p.stock > 50);

  return (
    <div className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row gap-6">
        {/* Sidebar (desktop) */}
        <aside className="hidden md:block w-64 bg-white shadow border rounded">
          <h2 className="bg-yellow-400 px-4 py-3 font-bold text-black flex justify-between items-center">
            SHOP BY CATEGORIES
          </h2>
          <ul>
            {categories.map((cat, i) => (
              <li
                key={i}
                className="group relative px-4 py-3 border-b hover:bg-gray-100 cursor-pointer"
              >
                {cat.name}
                {cat.sub && (
                  <ul className="absolute left-full top-0 hidden group-hover:block bg-gray-100 shadow-lg border rounded w-48">
                    {cat.sub.map((sub, j) => (
                      <li key={j} className="px-4 py-2 hover:bg-yellow-400 cursor-pointer text-sm">
                        {sub}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </aside>

        {/* Hamburger Menu (mobile) */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center bg-yellow-400 text-white px-4 py-2 rounded font-semibold"
          >
            {isMenuOpen ? <X size={20} className="mr-2" /> : <Menu size={20} className="mr-2" />}
            Categories
          </button>
          {isMenuOpen && (
            <div className="mt-2 bg-white border rounded shadow-lg">
              <ul>
                {categories.map((cat, i) => (
                  <li
                    key={i}
                    className="px-4 py-3 border-b hover:bg-gray-100 cursor-pointer"
                  >
                    {cat.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Main Slider */}
        <div className="flex-1 bg-gray-50 border shadow-md rounded flex flex-col md:flex-row items-center justify-between px-6 md:px-10 py-6 md:py-12">
          <div className="text-center md:text-left">
            <p className="text-yellow-400 font-bold">{slides[currentSlide].subtitle}</p>
            <h1 className="text-2xl md:text-3xl font-extrabold mt-2">{slides[currentSlide].title}</h1>
            <p className="text-lg md:text-xl mt-2">{slides[currentSlide].desc}</p>
            <Link to="/shopping">
              <button className="mt-4 md:mt-6 bg-yellow-400 px-4 md:px-6 py-2 md:py-3 rounded text-white font-semibold">
                BUY NOW
              </button>
            </Link>
          </div>
          <img
            src={slides[currentSlide].img}
            alt={slides[currentSlide].title}
            className="w-48 md:w-80 h-auto object-contain mt-4 md:mt-0"
          />
        </div>
      </div>

      {/* MINI PROMO BANNERS */}
      <div className="container mx-auto px-4 py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <PromoBanner title="WIRELESS SPEAKER" subtitle="DIGITAL SMART" desc="Min 30-75% Off" img={banner1Img} />
        <PromoBanner title="MENS HOT DEAL" subtitle="TIMBER LAND" desc="Up To 70% Off" img={banner4Img} />
        <PromoBanner title="GAMING HEADSET" subtitle="TRENDY TECH" desc="Flat 50% Off" img={banner2Img} />
      </div>

      {/* HOT DEALS */}
      <div className="container mx-auto px-4 py-6">
        <SectionTitle title="HOT DEALS" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-2 sm:px-5 py-10 border border-cyan-300">
          {hotDealsProducts.slice(0, 4).map((product) => (
            <HotDealCard key={product._id} product={product} addToCart={addToCart} />
          ))}
        </div>
      </div>

      {/* FEATURED PRODUCTS */}
      <div className="container mx-auto px-4 py-6">
        <SectionTitle title="FEATURED PRODUCTS" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {featuredProducts.slice(0, 8).map((p, i) => (
            <CompactProductCard
              key={p._id}
              product={p}
              addToCart={addToCart}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
              index={i}
            />
          ))}
        </div>
      </div>

      {/* BEST SELLING PRODUCTS */}
      {bestSellingProducts.length > 0 && (
        <div className="container mx-auto px-4 py-6">
          <SectionTitle title="BEST SELLING PRODUCTS" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {bestSellingProducts.slice(0, 8).map((p, i) => (
              <CompactProductCard
                key={p._id}
                product={p}
                addToCart={addToCart}
                hoveredIndex={hoveredIndex}
                setHoveredIndex={setHoveredIndex}
                index={i}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------- Reusable Components ------------------------- */

function PromoBanner({ title, subtitle, desc, img }: { title: string; subtitle: string; desc: string; img: string }) {
  return (
    <div className="bg-white shadow p-6 flex items-center justify-between rounded">
      <div>
        <p className="text-yellow-400 font-bold">{subtitle}</p>
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-gray-600">{desc}</p>
        <button className="mt-3 bg-yellow-400 text-white px-4 py-2 rounded">SHOP NOW</button>
      </div>
      <img src={img} alt={title} className="w-24 sm:w-32 h-24 sm:h-32 object-contain" />
    </div>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{title}</h2>
      <button className="bg-gray-800 text-white px-3 sm:px-4 py-1 sm:py-2 rounded text-sm font-bold hover:bg-gray-700">
        VIEW ALL
      </button>
    </div>
  );
}

/* ------------------------- Cards ------------------------- */
function HotDealCard({ product, addToCart }: any) {
  const discount =
    product.oldPrice && product.price < product.oldPrice
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : null;

  const [timeLeft, setTimeLeft] = useState({ days: 5, hrs: 12, mins: 30, secs: 45 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hrs, mins, secs } = prev;
        if (secs > 0) secs--;
        else if (mins > 0) {
          secs = 59;
          mins--;
        } else if (hrs > 0) {
          mins = 59;
          hrs--;
        } else if (days > 0) {
          hrs = 23;
          mins = 59;
          secs = 59;
          days--;
        }
        return { days, hrs, mins, secs };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative bg-white border rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
      {discount && (
        <span className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded z-10">
          {discount}% OFF
        </span>
      )}
      <div className="bg-gray-50 h-40 flex items-center justify-center p-3 overflow-hidden">
        <img src={product.images?.[0] || "/images/placeholder.png"} alt={product.name} className="w-full h-full object-contain" />
      </div>
      <div className="p-3">
        <p className="text-xs text-gray-500 uppercase">{product.category?.name || "ELECTRONICS"}</p>
        <h3 className="text-sm font-semibold leading-snug mb-2 line-clamp-2">{product.name}</h3>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-base font-bold text-red-600">${product.price}</span>
          {product.oldPrice && <span className="text-xs text-gray-400 line-through">${product.oldPrice}</span>}
        </div>
        <div className="flex justify-between text-xs font-semibold text-yellow-600 mb-2">
          <span>{timeLeft.days}d</span>
          <span>{timeLeft.hrs}h</span>
          <span>{timeLeft.mins}m</span>
          <span>{timeLeft.secs}s</span>
        </div>
        <button
          onClick={() =>
            addToCart({ id: product._id, name: product.name, price: product.price, image: product.images?.[0] || "" })
          }
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-white py-2 rounded font-semibold text-sm"
        >
          SELECT OPTIONS
        </button>
      </div>
    </div>
  );
}

function CompactProductCard({ product, addToCart, index, setHoveredIndex }: any) {
  return (
    <div
      className="bg-white border rounded-lg shadow-sm hover:shadow-lg transition-all duration-200 relative group"
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <div className="bg-gray-50 h-40 flex items-center justify-center p-3 relative overflow-hidden rounded-t-lg">
        <img
          src={product.images?.[0] || "/images/placeholder.png"}
          alt={product.name}
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-3 flex flex-col">
        <p className="text-xs text-gray-500 uppercase mb-1 tracking-wide">{product.category?.name || "CATEGORY"}</p>
        <h3 className="text-sm font-semibold leading-snug mb-2 line-clamp-2">{product.name}</h3>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-base font-bold text-red-600">{product.price} Frw</span>
          {product.oldPrice && <span className="text-xs text-gray-400 line-through">{product.oldPrice} Frw</span>}
        </div>
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart({ id: product._id, name: product.name, price: product.price, image: product.images?.[0] || "" });
            }}
            className="flex-1 flex items-center justify-center bg-gray-100 hover:bg-yellow-400 transition-colors rounded-md p-2"
          >
            <ShoppingCart size={18} className="text-black" />
          </button>
          <button className="flex-1 flex items-center justify-center bg-gray-100 hover:bg-yellow-400 transition-colors rounded-md p-2">
            <Shuffle size={18} className="text-black" />
          </button>
          <button className="flex-1 flex items-center justify-center bg-gray-100 hover:bg-yellow-400 transition-colors rounded-md p-2">
            <Heart size={18} className="text-black" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
