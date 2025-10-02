import { Link } from "react-router-dom";

const Shop = () => {
  const products = [
    { id: 1, name: "Hilfiger Watch", price: 350000 },
    { id: 2, name: "iPhone 11", price: 199000 },
    { id: 3, name: "Smartphone", price: 120000},
  ];

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Shop</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded p-4 shadow hover:shadow-lg transition">
            <h2 className="font-semibold">{product.name}</h2>
            <p className="mt-2 font-bold">{product.price} Frw</p>
            <Link to="/shopping">
              <button className="mt-4 bg-yellow-400 hover:bg-black text-white px-4 py-2 rounded">
                Buy Now
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
