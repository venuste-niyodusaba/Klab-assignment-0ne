import { useState, useEffect } from "react";
import { Heart, ShoppingCart, Eye, Shuffle, Plus } from "lucide-react";

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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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

  const slides = [
    {
      id: 1,
      title: "WIRELESS CHARGER STAND",
      subtitle: "BEST SMARTPHONE",
      desc: "Up To 70% Off",
      img: phone,
    },
    {
      id: 2,
      title: "PERSONALIZED HEADPHONES",
      subtitle: "BEATS EP ON-EAR",
      desc: "Min 40-80% Off",
      img: slider2,
    },
    {
      id: 3,
      title: "WIRELESS SPEAKER",
      subtitle: "DIGITAL SMART",
      desc: "Min 30-75% Off",
      img: banner3,
    },
    {
      id: 4,
      title: "WATCH CHARGER",
      subtitle: "DIGITAL SMART",
      desc: "Up To 70% Off",
      img: banner4,
    },
  ];

  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  const products = [
    {
      id: 1,
      title: "Apple iPhone",
      category: "ELECTRONICS",
      price: "$199.00",
      oldPrice: "$254.00",
      front: iphone,
      back: iphoneBack,
      tags: ["recent", "sale"],
    },
    {
      id: 2,
      title: "Apple Watch Series 5",
      category: "ELECTRONICS",
      price: "$499.00",
      oldPrice: "$599.00",
      front: watch,
      back: watchBack,
      badge: "17% OFF",
      tags: ["featured", "sale", "recent"],
    },
    {
      id: 3,
      title: "JBL Wireless Speaker",
      category: "ELECTRONICS",
      price: "$96.00",
      front: jblFront,
      back: jblBack,
      badge: "FEATURED",
      tags: ["featured"],
    },
    {
      id: 4,
      title: "AirPods",
      category: "ELECTRONICS",
      price: "$149.00",
      front: airpods,
      back: airpodsBack,
      badge: "FEATURED",
      tags: ["featured", "recent"],
    },
    {
      id: 5,
      title: "Digital Camera",
      category: "ELECTRONICS",
      price: "$299.00",
      oldPrice: "$399.00",
      front: camera,
      back: cameraBack,
      tags: ["sale"],
    },
    {
      id: 6,
      title: "Game Controller",
      category: "ELECTRONICS",
      price: "$89.00",
      front: controller,
      back: controllerBack,
      tags: ["topRated"],
    },
    {
      id: 7,
      title: "Virtual Reality Headset",
      category: "ELECTRONICS",
      price: "$249.00",
      front: vr,
      back: vrBack,
      tags: ["topRated"],
    },
  ];

  const featuredProducts = products.filter((p) => p.tags.includes("featured"));
  const recentProducts = products.filter((p) => p.tags.includes("recent"));
  const saleProducts = products.filter((p) => p.tags.includes("sale"));
  const topRatedProducts = products.filter((p) => p.tags.includes("topRated"));

  return (
    <div className="px-6 py-8 space-y-10">
      <div className="relative">
        <main className="w-full relative overflow-hidden pl-72 h-[30rem] ">
          <div className="bg-gray-50 border shadow-md rounded flex items-center justify-between px-10 py-12 transition-all duration-700 ease-in-out min-h-[280px]">
            <div>
              <p className="text-yellow-500 font-bold">
                {slides[current].subtitle}
              </p>
              <h1 className="text-3xl font-extrabold mt-2">
                {slides[current].title}
              </h1>
              <p className="text-xl mt-2">{slides[current].desc}</p>
              <button className="mt-6 bg-yellow-400 px-6 py-3 rounded text-white font-semibold">
                BUY NOW
              </button>
            </div>
            <img
              src={slides[current].img}
              alt={slides[current].title}
              className="w-80 h-auto object-contain"
            />
          </div>
          <div className="flex justify-center mt-4 gap-2">
            {slides.map((_, i) => (
              <span
                key={i}
                className={`w-3 h-3 rounded-full cursor-pointer ${
                  i === current ? "bg-yellow-400" : "bg-gray-300"
                }`}
                onClick={() => setCurrent(i)}
              ></span>
            ))}
          </div>
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-100 hover:bg-yellow-400 text-black text-2xl w-10 h-10 flex items-center justify-center rounded-full shadow-lg"
          >
            ‹
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-100 hover:bg-yellow-400 text-black text-2xl w-10 h-10 flex items-center justify-center rounded-full shadow-lg"
          >
            ›
          </button>
        </main>
        <aside className="absolute top-0 left-0 w-64 bg-white shadow border rounded z-20">
          <h2 className="bg-yellow-400 px-4 py-3 font-bold text-black flex justify-between items-center">
            SHOP BY CATEGORIES <span className="cursor-pointer">☰</span>
          </h2>
          <ul>
            {categories.map((cat, i) => (
              <li
                key={i}
                className="group relative px-4 py-3 border-b hover:bg-gray-100 cursor-pointer"
              >
                {cat.name}
                {cat.sub && (
                  <ul className="absolute left-full top-0 hidden group-hover:block bg-white shadow-lg border rounded w-48">
                    {cat.sub.map((sub, j) => (
                      <li
                        key={j}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                      >
                        {sub}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </aside>
      </div>
      <div className="flex gap-6">
        <div className="w-1/3 border shadow rounded p-4">
          <h2 className="text-lg font-bold border-b pb-2 mb-4">HOT DEALS</h2>
          <div className="relative border rounded p-4 flex flex-col items-center">
            <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
              17% OFF
            </span>
            <img src={watch} alt="Apple Watch" className="w-48" />
            <div className="bg-yellow-300 flex flex-row px-14 py-3 justify-between gap-12">
              <div className="relative group/cart">
                    <ShoppingCart
                      size={20}
                      className="cursor-pointer hover:text-green-600"
                    />
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 group-hover/cart:scale-100 transition-transform bg-black text-white text-xs px-2 py-1 ">
                      Add to Cart
                    </span>
                  </div>
                  <div className="relative group/compare">
                    <h5 className="text-stone-50">SELECTION OPTION</h5>
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 group-hover/compare:scale-100 transition-transform bg-black text-white text-xs px-2 py-1 ">
                      select option
                    </span>
                  </div>
                  <div className="relative group/view">
                    <Plus
                      size={20}
                      className="cursor-pointer hover:text-purple-600"
                    />
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 group-hover/view:scale-100 transition-transform bg-black text-white text-xs px-2 py-1 pr-8">
                      Quick View
                    </span>
                  </div>
            </div>
            <h3 className="mt-2 font-semibold">Apple Watch Series 5</h3>
            <p className="text-gray-600 text-sm">ELECTRONICS</p>
            <p className="mt-2">
              <span className="text-red-500 font-bold">$499.00</span> –{" "}
              <span className="text-gray-500 line-through">$599.00</span>
            </p>
            <div className="w-full mt-3">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Already Sold: 50</span>
                <span>Available: 75</span>
              </div>
              <div className="w-full bg-gray-200 h-2 mt-1 rounded">
                <div
                  className="bg-yellow-400 h-2 rounded"
                  style={{ width: "70%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 border shadow rounded p-4">
          <div className="flex justify-between items-center border-b pb-2 mb-4">
            <h2 className="text-lg font-bold">FEATURED PRODUCTS</h2>
            <button className="text-sm font-semibold px-5 py-1 bg-black text-white rounded">
              VIEW ALL
            </button>
          </div>
          <div className="grid grid-cols-4 gap-6 w-[50rem]">
            {featuredProducts.map((product, i) => (
              <div
                key={product.id}
                className="relative border rounded shadow-md overflow-hidden cursor-pointer group transition-transform duration-300 hover:scale-105"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {product.badge && (
                  <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-4 py-1 rounded">
                    {product.badge}
                  </span>
                )}
                <div className="relative w-full h-40 bg-white flex items-center justify-center">
                  <img
                    src={
                      hoveredIndex === i && product.back
                        ? product.back
                        : product.front
                    }
                    alt={product.title}
                    className="object-contain w-full h-full transition-all duration-500"
                  />
                </div>
                <div className="bg-yellow-300 hidden group-hover:flex flex-row px-2 py-1 justify-between gap-10 transition-transform duration-300 hover:scale-105 ">
                  <div className="relative group/cart">
                    <ShoppingCart
                      size={20}
                      className="cursor-pointer hover:text-green-600"
                    />
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 group-hover/cart:scale-100 transition-transform bg-black text-white text-xs px-2 py-1 ">
                      Add to Cart
                    </span>
                  </div>
                  <div className="relative group/compare">
                    <Shuffle
                      size={20}
                      className="cursor-pointer hover:text-blue-600"
                    />
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 group-hover/compare:scale-100 transition-transform bg-black text-white text-xs px-2 py-1 ">
                      Compare
                    </span>
                  </div>
                  <div className="relative group/view">
                    <Plus
                      size={20}
                      className="cursor-pointer hover:text-purple-600"
                    />
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 group-hover/view:scale-100 transition-transform bg-black text-white text-xs px-2 py-1 pr-8">
                      Quick View
                    </span>
                  </div>
                </div>

                <div className="p-3 text-center">
                  <p className="text-xs text-gray-500">{product.category}</p>
                  <h3 className="font-semibold text-sm">{product.title}</h3>
                  <p className="mt-1">
                    <span className="text-red-500 font-bold">
                      {product.price}
                    </span>{" "}
                    {product.oldPrice && (
                      <span className="text-gray-400 line-through">
                        {product.oldPrice}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="border shadow rounded p-4">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-lg font-bold">BEST SELLING PRODUCTS</h2>
          <button className="text-sm font-semibold px-4 py-1 bg-black text-white rounded">
            VIEW ALL
          </button>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {products.map((product, i) => (
            <div
              key={product.id}
              className="relative border rounded shadow-md bg-white p-4 flex flex-col items-center text-center transition-transform duration-300 hover:scale-105"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {product.badge && (
                <span
                  className={`absolute top-2 left-2 text-white text-xs px-2 py-1 rounded ${
                    product.badge.includes("%")
                      ? "bg-green-600"
                      : "bg-orange-500"
                  }`}
                >
                  {product.badge}
                </span>
              )}
              <button className="absolute top-2 right-2 text-gray-500 hover:text-red-500">
                <Heart size={16} />
              </button>
              <div className="relative w-full h-36 flex items-center justify-center">
                <img
                  src={
                    hoveredIndex === i && product.back
                      ? product.back
                      : product.front
                  }
                  alt={product.title}
                  className="object-contain max-h-full transition-all duration-500"
                />
                <div> </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">{product.category}</p>
              <h3 className="font-semibold text-sm truncate">
                {product.title}
              </h3>
              <p className="mt-1">
                <span className="text-red-500 font-bold">{product.price}</span>{" "}
                {product.oldPrice && (
                  <span className="text-gray-400 line-through">
                    {product.oldPrice}
                  </span>
                )}
              </p>
              <div className="flex justify-between gap-2 mt-3 w-full">
                <button className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black p-2 rounded flex justify-center">
                  <Shuffle size={16} />
                </button>
                <button className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black p-2 rounded flex justify-center">
                  <ShoppingCart size={16} />
                </button>
                <button className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black p-2 rounded flex justify-center">
                  <Eye size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-12">
        <div className="grid grid-cols-4 gap-6 text-center mb-10">
          <div>
            <p className="font-bold text-sm">FREE SHIPPING</p>
            <p className="text-gray-500 text-xs">On All Orders Over $99</p>
          </div>
          <div>
            <p className="font-bold text-sm">EASY RETURNS</p>
            <p className="text-gray-500 text-xs">30 Days Return Policy</p>
          </div>
          <div>
            <p className="font-bold text-sm">SECURE PAYMENT</p>
            <p className="text-gray-500 text-xs">100% Secure Payment</p>
          </div>
          <div>
            <p className="font-bold text-sm">24/7 SUPPORT</p>
            <p className="text-gray-500 text-xs">Dedicated Support</p>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-6">
          <div>
            <h3 className="font-bold border-b-2 border-yellow-400 inline-block mb-4">
              FEATURED
            </h3>
            <div className="space-y-4">
              {featuredProducts.map((p) => (
                <div key={p.id} className="flex gap-3 items-center">
                  <img
                    src={p.front}
                    alt={p.title}
                    className="w-16 h-16 object-contain"
                  />
                  <div>
                    <p className="text-sm font-medium truncate">{p.title}</p>
                    <p className="text-red-500 font-bold">{p.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-bold border-b-2 border-yellow-400 inline-block mb-4">
              RECENT
            </h3>
            <div className="space-y-4">
              {recentProducts.map((p) => (
                <div key={p.id} className="flex gap-3 items-center">
                  <img
                    src={p.front}
                    alt={p.title}
                    className="w-16 h-16 object-contain"
                  />
                  <div>
                    <p className="text-sm font-medium truncate">{p.title}</p>
                    <p>
                      <span className="text-red-500 font-bold">{p.price}</span>{" "}
                      {p.oldPrice && (
                        <span className="text-gray-400 line-through">
                          {p.oldPrice}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-bold border-b-2 border-yellow-400 inline-block mb-4">
              ON SALE
            </h3>
            <div className="space-y-4">
              {saleProducts.map((p) => (
                <div key={p.id} className="flex gap-3 items-center">
                  <img
                    src={p.front}
                    alt={p.title}
                    className="w-16 h-16 object-contain"
                  />
                  <div>
                    <p className="text-sm font-medium truncate">{p.title}</p>
                    <p>
                      <span className="text-red-500 font-bold">{p.price}</span>{" "}
                      {p.oldPrice && (
                        <span className="text-gray-400 line-through">
                          {p.oldPrice}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-bold border-b-2 border-yellow-400 inline-block mb-4">
              TOP RATED
            </h3>
            <div className="space-y-4">
              {topRatedProducts.map((p) => (
                <div key={p.id} className="flex gap-3 items-center">
                  <img
                    src={p.front}
                    alt={p.title}
                    className="w-16 h-16 object-contain"
                  />
                  <div>
                    <p className="text-sm font-medium truncate">{p.title}</p>
                    <p className="text-red-500 font-bold">{p.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
