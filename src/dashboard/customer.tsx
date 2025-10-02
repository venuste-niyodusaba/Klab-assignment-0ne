// src/dashboard/customer.tsx
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { Notify } from "notiflix";

interface CustomerType {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt?: string;
}

export function Customer() {
  const [customers, setCustomers] = useState<CustomerType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getAuthToken = (): string | null => localStorage.getItem("token");
  const getRefreshToken = (): string | null => localStorage.getItem("refreshToken");

  const fetchCustomers = async () => {
    const token = getAuthToken();
    if (!token) {
      setError("You must be logged in to view customers.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get<CustomerType[]>("https://kappee-backend-repo-11.onrender.com/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCustomers(res.data || []);
    } catch (err) {
      const axiosErr = err as AxiosError<{ message?: string }>;

      if (axiosErr.response?.status === 403 || axiosErr.response?.status === 401) {
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
          Notify.failure("Session expired. Please log in again.");
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          setLoading(false);
          return;
        }

        try {
          const tokenRes = await axios.post<{ token: string }>(
            "https://kappee-backend-repo-11.onrender.com/api/auth/refresh-token",
            { token: refreshToken }
          );
          localStorage.setItem("token", tokenRes.data.token);

          const retryRes = await axios.get<CustomerType[]>("https://kappee-backend-repo-11.onrender.com/api/users", {
            headers: { Authorization: `Bearer ${tokenRes.data.token}` },
          });
          setCustomers(retryRes.data || []);
        } catch {
          Notify.failure("Failed to refresh token. Please log in again.");
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
        }
      } else {
        const msg = axiosErr.response?.data?.message || "Failed to fetch customers.";
        setError(msg);
        Notify.failure(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  if (loading) return <p className="p-4 text-green-400">Loading customers...</p>;
  if (error) return <p className="p-4 text-red-600 font-bold">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Customers</h1>

      {/* Desktop Table */}
      <div className="hidden md:block">
        {customers.length === 0 ? (
          <p>No customers found.</p>
        ) : (
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Role</th>
                <th className="border p-2">Registered</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c._id}>
                  <td className="border p-2">{c.name}</td>
                  <td className="border p-2">{c.email}</td>
                  <td className="border p-2">{c.role || "-"}</td>
                  <td className="border p-2">
                    {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden flex flex-col gap-4">
        {customers.map((c) => (
          <div key={c._id} className="bg-white shadow rounded-lg p-4 border">
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Name:</span>
              <span className="text-gray-700">{c.name}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Email:</span>
              <span className="text-gray-700">{c.email}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Role:</span>
              <span className="text-gray-700">{c.role || "-"}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Registered:</span>
              <span className="text-gray-700">
                {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "-"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Customer;
