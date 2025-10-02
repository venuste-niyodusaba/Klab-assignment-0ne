import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { Notify } from "notiflix";

interface DiscountType {
  _id: string;
  name: string;
  percentage: number;
  active: boolean;
  startDate: string;
  endDate: string;
}

export default function AdminDiscount() {
  const [discounts, setDiscounts] = useState<DiscountType[]>([]);
  const [loading, setLoading] = useState(true);
  const [newDiscount, setNewDiscount] = useState({
    name: "",
    percentage: 0,
    startDate: "",
    endDate: "",
  });

  const token = localStorage.getItem("token"); // Admin JWT token

  // Fetch all discounts
  const fetchDiscounts = async () => {
    try {
      setLoading(true);
      const res = await axios.get<DiscountType[]>("http://localhost:5175/api/discounts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDiscounts(res.data);
    } catch (err) {
      const axiosErr = err as AxiosError<{ message?: string }>;
      Notify.failure(axiosErr.response?.data?.message || "Failed to fetch discounts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiscounts();
  }, [token]);

  // Create new discount
  const handleCreate = async () => {
    if (!newDiscount.name || !newDiscount.percentage || !newDiscount.startDate || !newDiscount.endDate) {
      Notify.failure("All fields are required!");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5175/api/discounts",
        newDiscount,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Notify.success("Discount created!");
      setNewDiscount({ name: "", percentage: 0, startDate: "", endDate: "" });
      fetchDiscounts();
    } catch (err) {
      const axiosErr = err as AxiosError<{ message?: string }>;
      Notify.failure(axiosErr.response?.data?.message || "Failed to create discount");
    }
  };

  // Toggle active/inactive discount
  const handleToggle = async (id: string) => {
    try {
      await axios.patch(
        `http://localhost:5175/api/discounts/${id}/toggle`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Notify.success("Discount status updated!");
      fetchDiscounts();
    } catch (err) {
      const axiosErr = err as AxiosError<{ message?: string }>;
      Notify.failure(axiosErr.response?.data?.message || "Failed to update status");
    }
  };

  if (loading) return <p className="p-6 text-gray-500">Loading discounts...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Discounts and promotions</h1>

      {/* Create new discount */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="font-bold mb-2">Create New Discount</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <input
            type="text"
            placeholder="Name"
            className="border p-2 rounded"
            value={newDiscount.name}
            onChange={(e) => setNewDiscount({ ...newDiscount, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Percentage"
            className="border p-2 rounded"
            value={newDiscount.percentage}
            onChange={(e) => setNewDiscount({ ...newDiscount, percentage: Number(e.target.value) })}
          />
          <input
            type="date"
            placeholder="Start Date"
            className="border p-2 rounded"
            value={newDiscount.startDate}
            onChange={(e) => setNewDiscount({ ...newDiscount, startDate: e.target.value })}
          />
          <input
            type="date"
            placeholder="End Date"
            className="border p-2 rounded"
            value={newDiscount.endDate}
            onChange={(e) => setNewDiscount({ ...newDiscount, endDate: e.target.value })}
          />
        </div>
        <button
          className="mt-2 bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500"
          onClick={handleCreate}
        >
          Create
        </button>
      </div>

      {/* List existing discounts */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-bold mb-2">Existing Discounts</h2>
        {discounts.length === 0 ? (
          <p>No discounts available.</p>
        ) : (
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Name</th>
                <th className="border p-2">Percentage</th>
                <th className="border p-2">Active</th>
                <th className="border p-2">Start Date</th>
                <th className="border p-2">End Date</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {discounts.map((d) => (
                <tr key={d._id}>
                  <td className="border p-2">{d.name}</td>
                  <td className="border p-2">{d.percentage}%</td>
                  <td className="border p-2">{d.active ? "Active" : "Inactive"}</td>
                  <td className="border p-2">{new Date(d.startDate).toLocaleDateString()}</td>
                  <td className="border p-2">{new Date(d.endDate).toLocaleDateString()}</td>
                  <td className="border p-2">
                    <button
                      className="bg-blue-400 text-white px-2 py-1 rounded hover:bg-blue-500"
                      onClick={() => handleToggle(d._id)}
                    >
                      {d.active ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
