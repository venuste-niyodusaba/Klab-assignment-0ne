import { useState, useEffect } from "react";
import { Heart, ShoppingCart, Eye, Shuffle } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../components/CartContext";

// ✅ Images
import phone from "../assets/images/phone.png";
import slider2 from "../assets/images/slider2.png";
import banner3 from "../assets/images/banner3.jpg";
import banner4 from "../assets/images/banner4.jpg";
import watch from "../assets/images/watch.jpg";
import watchBack from "../assets/images/watchback.jpg";
import iphone from "../assets/images/iphone.jpg";
import iphoneBack from "../assets/images/iphoneback.jpg";
import jblFront from "../assets/images/jblFront.jpg";
import jblBack from "../assets/images/jblback.jpg";
import airpods from "../assets/images/AirPodsfront.jpg";
import airpodsBack from "../assets/images/AirPodsback.jpg";
import camera from "../assets/images/camerafront.jpg";
import cameraBack from "../assets/images/cameraback.jpg";
import controller from "../assets/images/Controllerfront.jpg";
import controllerBack from "../assets/images/Controllerback.jpg";
import vr from "../assets/images/VirtualRealityfront.jpg";
import vrBack from "../assets/images/VirtualRealityback.jpg";

function Home() {
  const { addToCart } = useCart();
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // ✅ Categories
  const categories = [
    { name: "Men’s Clothing", sub: ["T-Shirts", "Shirts", "Jeans", "Jackets"] },
    { name: "Women’s Clothing", sub: ["Dresses", "Tops", "Skirts", "Shoes"] },
    { name: "Accessories", sub: ["Bags", "Watches", "Sunglasses"] },
    { name: "Shoes" },
    { name: "Jewellery", sub: ["Rings", "Necklaces", "Bracelets"] },
    { name: "Bags & Backpacks" },
    { name: "Watches" },
    { name: "Dresses" },
    { name: "Shirts" },
  ];

  // ✅ Slides
  const slides = [
    { id: 1, title: "WIRELESS CHARGER STAND", subtitle: "BEST SMARTPHONE", desc: "Up To 70% Off", img: phone },
    { id: 2, title: "PERSONALIZED HEADPHONES", subtitle: "BEATS EP ON-EAR", desc: "Min 40-80% Off", img: slider2 },
    { id: 3, title: "WIRELESS SPEAKER", subtitle: "DIGITAL SMART", desc: "Min 30-75% Off", img: banner3 },
    { id: 4, title: "WATCH CHARGER", subtitle: "DIGITAL SMART", desc: "Up To 70% Off", img: banner4 },
  ];

  // ✅ Products
  const products = [
    { id: 1, title: "Apple iPhone", category: "ELECTRONICS", price: "$199.00", oldPrice: "$254.00", front: iphone, back: iphoneBack, tags: ["recent", "sale"] },
    { id: 2, title: "Apple Watch Series 5", category: "ELECTRONICS", price: "$499.00", oldPrice: "$599.00", front: watch, back: watchBack, badge: "17% OFF", tags: ["featured", "sale", "recent"] },
    { id: 3, title: "JBL Wireless Speaker", category: "ELECTRONICS", price: "$96.00", front: jblFront, back: jblBack, badge: "FEATURED", tags: ["featured"] },
    { id: 4, title: "AirPods", category: "ELECTRONICS", price: "$149.00", front: airpods, back: airpodsBack, badge: "FEATURED", tags: ["featured", "recent"] },
    { id: 5, title: "Digital Camera", category: "ELECTRONICS", price: "$299.00", oldPrice: "$399.00", front: camera, back: cameraBack, tags: ["sale"] },
    { id: 6, title: "Game Controller", category: "ELECTRONICS", price: "$89.00", front: controller, back: controllerBack, tags: ["topRated"] },
    { id: 7, title: "Virtual Reality Headset", category: "ELECTRONICS", price: "$249.00", front: vr, back: vrBack, tags: ["topRated"] },
  ];

  // ✅ Filters
  const featuredProducts = products.filter((p) => p.tags.includes("featured"));
  const saleProducts = products.filter((p) => p.tags.includes("sale"));
  const topRatedProducts = products.filter((p) => p.tags.includes("topRated"));

  // ✅ Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Reusable Product Card
  const ProductCard = ({ product }: { product: any }) => (
    <div
      key={product.id}
      className="relative border rounded shadow-md bg-white p-4 flex flex-col items-center text-center transition-transform duration-300 hover:scale-105"
      onMouseEnter={() => setHoveredId(product.id)}
      onMouseLeave={() => setHoveredId(null)}
    >
      {product.badge && (
        <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
          {product.badge}
        </span>
      )}
      <button className="absolute top-2 right-2 text-gray-500 hover:text-red-500">
        <Heart size={16} />
      </button>

      <div className="relative w-full h-40 flex items-center justify-center">
        <img
          src={hoveredId === product.id && product.back ? product.back : product.front}
          alt={product.title}
          className="object-contain max-h-full transition-all duration-500"
        />
      </div>

      <p className="text-xs text-gray-500 mt-2">{product.category}</p>
      <h3 className="font-semibold text-sm truncate">{product.title}</h3>
      <p className="mt-1">
        <span className="text-red-500 font-bold">{product.price}</span>{" "}
        {product.oldPrice && <span className="text-gray-400 line-through">{product.oldPrice}</span>}
      </p>

      <div className="flex justify-between gap-2 mt-3 w-full">
        <button className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black p-2 rounded flex justify-center">
          <Shuffle size={16} />
        </button>
        <button
          onClick={() => addToCart(product)}
          className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black p-2 rounded flex justify-center"
        >
          <ShoppingCart size={16} />
        </button>
        <button className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black p-2 rounded flex justify-center">
          <Eye size={16} />
        </button>
      </div>
    </div>
  );

  // ✅ Reusable Product Section
  const ProductSection = ({ title, products }: { title: string; products: any[] }) => (
    <div className="border shadow rounded p-4">
      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <h2 className="text-lg font-bold">{title}</h2>
        <button className="text-sm font-semibold px-4 py-1 bg-black text-white rounded">VIEW ALL</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="px-6 py-8 space-y-10">
      {/* ✅ Hero + Sidebar */}
      <div className="relative">
        <main className="w-full relative overflow-hidden lg:pl-72 h-[30rem]">
          <div className="bg-gray-50 border shadow-md rounded flex items-center justify-between px-10 py-12 min-h-[280px] transition-all duration-700 ease-in-out">
            <div>
              <p className="text-yellow-500 font-bold">{slides[currentSlide].subtitle}</p>
              <h1 className="text-3xl font-extrabold mt-2">{slides[currentSlide].title}</h1>
              <p className="text-xl mt-2">{slides[currentSlide].desc}</p>
              <Link to="/shopping">
                <button className="mt-6 bg-yellow-400 px-6 py-3 rounded text-white font-semibold">BUY NOW</button>
              </Link>
            </div>
            <img src={slides[currentSlide].img} alt={slides[currentSlide].title} className="w-80 h-auto object-contain" />
          </div>
          {/* Dots */}
          <div className="flex justify-center mt-4 gap-2">
            {slides.map((_, i) => (
              <span
                key={i}
                className={`w-3 h-3 rounded-full cursor-pointer ${i === currentSlide ? "bg-yellow-400" : "bg-gray-300"}`}
                onClick={() => setCurrentSlide(i)}
              ></span>
            ))}
          </div>
          {/* Arrows */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-100 hover:bg-yellow-400 text-black text-2xl w-10 h-10 flex items-center justify-center rounded-full shadow-lg"
          >
            ‹
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-100 hover:bg-yellow-400 text-black text-2xl w-10 h-10 flex items-center justify-center rounded-full shadow-lg"
          >
            ›
          </button>
        </main>

        {/* ✅ Sidebar */}
        <aside className="absolute top-0 left-0 w-64 bg-white shadow border rounded z-20 hidden lg:block">
          <h2 className="bg-yellow-400 px-4 py-3 font-bold text-black flex justify-between items-center">
            SHOP BY CATEGORIES <span className="cursor-pointer">☰</span>
          </h2>
          <ul>
            {categories.map((cat, i) => (
              <li key={i} className="group relative px-4 py-3 border-b hover:bg-gray-100 cursor-pointer">
                {cat.name}
                {cat.sub && (
                  <ul className="absolute left-full top-0 hidden group-hover:block bg-white shadow-lg border rounded w-48">
                    {cat.sub.map((sub, j) => (
                      <li key={j} className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm">{sub}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </aside>
      </div>

      {/* ✅ Sections */}
      <ProductSection title="Featured Products" products={featuredProducts} />
      <ProductSection title="Best Selling Products" products={topRatedProducts} />
      <ProductSection title="On Sale" products={saleProducts} />
    </div>
  );
}

export default Home;
