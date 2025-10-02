import { useWishlist } from "../components/WishlistContext";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  return (
    <div className="px-6 py-8 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Your Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div key={item.id} className="border rounded shadow p-4 text-center">
              <img src={item.image} alt={item.name} className="w-full h-32 object-contain" />
              <h2 className="mt-2 font-semibold">{item.name}</h2>
              <p className="text-red-500 font-bold">{item.price}</p>
              <button
                className="mt-2 px-3 py-1 bg-red-500 text-white rounded"
                onClick={() => removeFromWishlist(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
