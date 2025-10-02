import { useCompare } from "./CompareContext";

export default function ComparePage() {
  const { compare, removeFromCompare } = useCompare();

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6">Compare Products</h2>

      {compare.length === 0 ? (
        <p className="text-gray-500">No products to compare.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">Image</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Price</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {compare.map((item) => (
                <tr key={item.id} className="text-center">
                  <td className="px-4 py-2 border">
                    <img
                      src={item.image || "/images/placeholder.png"}
                      alt={item.name}
                      className="h-20 mx-auto"
                    />
                  </td>
                  <td className="px-4 py-2 border">{item.name}</td>
                  <td className="px-4 py-2 border">${item.price}</td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => removeFromCompare(item.id)}
                      className="text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
