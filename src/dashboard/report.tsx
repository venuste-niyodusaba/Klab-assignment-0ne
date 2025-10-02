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
  createdAt?: string;
}

export default function Report() {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getAuthToken = (): string | null => localStorage.getItem("token");
  const getRefreshToken = (): string | null => localStorage.getItem("refreshToken");

  const fetchOrders = async () => {
    const token = getAuthToken();
    if (!token) {
      Notify.failure("You must be logged in to view reports.");
      navigate("/login");
      return;
    }

    try {
      const res = await axios.get<OrderType[]>(
        "https://kappee-backend-repo-11.onrender.com/api/orders",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders(res.data);
    } catch (err) {
      const axiosErr = err as AxiosError<{ message?: string }>;

      if (axiosErr.response?.status === 403) {
        // Token expired, attempt refresh
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

          // Retry original request with new token
          const retryRes = await axios.get<OrderType[]>(
            "https://kappee-backend-repo-11.onrender.com/api/orders",
            { headers: { Authorization: `Bearer ${tokenRes.data.token}` } }
          );
          setOrders(retryRes.data);
        } catch {
          Notify.failure("Failed to refresh token. Please log in again.");
          localStorage.clear();
          navigate("/login");
        }
      } else {
        const msg = axiosErr.response?.data?.message || "Failed to fetch report data.";
        Notify.failure(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p className="p-6 text-center text-green-500">Loading report...</p>;
  if (orders.length === 0) return <p className="p-6 text-center text-red-600">No orders found.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Report Page</h1>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Order ID</th>
            <th className="border p-2">Customer</th>
            <th className="border p-2">Items</th>
            <th className="border p-2">Total Amount</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Created At</th>
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
              <td className="border p-2">
                {order.createdAt ? new Date(order.createdAt).toLocaleString() : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
