import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { Notify } from "notiflix";
import { useNavigate } from "react-router-dom";

interface OrderItem {
  product?: { name?: string };
  quantity: number;
}

interface OrderType {
  _id: string;
  user?: { name?: string };
  items: OrderItem[];
  totalAmount: number;
  status: string;
}

export default function Orders() {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getAuthToken = (): string | null => localStorage.getItem("token");
  const getRefreshToken = (): string | null => localStorage.getItem("refreshToken");

  const fetchOrders = async () => {
    const token = getAuthToken();
    if (!token) {
      Notify.failure("You must be logged in to view orders.");
      navigate("/login");
      return;
    }

    try {
      const res = await axios.get<OrderType[]>("https://kappee-backend-repo-11.onrender.com/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (err) {
      const axiosErr = err as AxiosError<{ message?: string }>;

      if (axiosErr.response?.status === 403) {
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
          Notify.failure("Session expired. Please log in again.");
          localStorage.clear();
          navigate("/login");
          return;
        }
        try {
          const tokenRes = await axios.post<{ token: string }>(
            "https://kappee-backend-repo-11.onrender.com/api/auth/refresh-token",
            { token: refreshToken }
          );
          localStorage.setItem("token", tokenRes.data.token);

          const retryRes = await axios.get<OrderType[]>("https://kappee-backend-repo-11.onrender.com/api/orders", {
            headers: { Authorization: `Bearer ${tokenRes.data.token}` },
          });
          setOrders(retryRes.data);
        } catch {
          Notify.failure("Failed to refresh token. Please log in again.");
          localStorage.clear();
          navigate("/login");
        }
      } else {
        Notify.failure(axiosErr.response?.data?.message || "Failed to fetch orders.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p className="p-6 text-center text-green-500">Loading orders...</p>;
  if (orders.length === 0) return <p className="p-6 text-center text-red-400">No orders found.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Orders</h1>

      {/* Desktop Table */}
      <div className="hidden md:block">
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Order ID</th>
              <th className="border p-2">Customer</th>
              <th className="border p-2">Items</th>
              <th className="border p-2">Total Amount</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td className="border p-2">{order._id}</td>
                <td className="border p-2">{order.user?.name || "N/A"}</td>
                <td className="border p-2">
                  {order.items.map((item, idx) => (
                    <div key={idx}>
                      {item.product?.name || "Unknown Product"} x {item.quantity}
                    </div>
                  ))}
                </td>
                <td className="border p-2">{order.totalAmount.toLocaleString()} Frw</td>
                <td className="border p-2 capitalize">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden flex flex-col gap-4">
        {orders.map(order => (
          <div key={order._id} className="bg-white shadow rounded-lg p-4 border">
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Order ID:</span>
              <span className="text-gray-700">{order._id}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Customer:</span>
              <span className="text-gray-700">{order.user?.name || "N/A"}</span>
            </div>
            <div className="mb-2">
              <span className="font-semibold">Items:</span>
              <div className="ml-2">
                {order.items.map((item, idx) => (
                  <div key={idx}>
                    {item.product?.name || "Unknown Product"} x {item.quantity}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Total:</span>
              <span className="text-gray-700">{order.totalAmount.toLocaleString()} Frw</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Status:</span>
              <span className="capitalize text-gray-700">{order.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
