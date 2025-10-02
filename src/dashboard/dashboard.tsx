import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { ShoppingCart, Eye, CircleDollarSign, Loader } from "lucide-react";
import { Notify } from "notiflix";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface RevenuePerDay { date: string; revenue: number; orders: number; }
interface TopCategory { categoryId: string; revenue: number; }
interface ActiveUser { country: string; percentage: number; }
interface ConversionStage { stage: string; users: number; }

interface DashboardData {
  totalSales: number;
  totalOrders: number;
  totalVisitors: number;
  monthlyTarget: number; // percentage
  revenue: RevenuePerDay[];
  topCategories: TopCategory[];
  conversion: ConversionStage[];
  activeUsers: ActiveUser[];
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getAuthToken = (): string | null => localStorage.getItem("token");
  const getRefreshToken = (): string | null => localStorage.getItem("refreshToken");

  const fetchDashboard = async () => {
    const token = getAuthToken();
    if (!token) {
      Notify.failure("You must be logged in.");
      navigate("/login");
      return;
    }

    try {
      const res = await axios.get<DashboardData>("http://localhost:5175/api/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(res.data);
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
            "http://localhost:5175/api/auth/refresh-token",
            { token: refreshToken }
          );
          localStorage.setItem("token", tokenRes.data.token);
          const retryRes = await axios.get<DashboardData>("http://localhost:5175/api/dashboard", {
            headers: { Authorization: `Bearer ${tokenRes.data.token}` },
          });
          setData(retryRes.data);
        } catch {
          Notify.failure("Failed to refresh token. Please log in again.");
          localStorage.clear();
          navigate("/login");
        }
      } else {
        Notify.failure(axiosErr.response?.data?.message || "Failed to fetch dashboard data.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
    const interval = setInterval(fetchDashboard, 15000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <Loader className="animate-spin m-auto mt-20" size={40} />;
  if (!data) return <p className="p-6 text-red-600 font-bold">No dashboard data found.</p>;

  // Chart data
  const revenueData = {
    labels: data.revenue.map(r => r.date),
    datasets: [
      {
        label: "Revenue",
        data: data.revenue.map(r => r.revenue),
        borderColor: "#FFD93D",
        backgroundColor: "rgba(255,157,49,0.2)",
        tension: 0.3,
      },
      {
        label: "Orders",
        data: data.revenue.map(r => r.orders),
        borderColor: "#000000",
        backgroundColor: "rgba(54,162,235,0.2)",
        tension: 0.3,
      },
    ],
  };

  const categoriesData = {
    labels: data.topCategories.map(c => c.categoryId),
    datasets: [
      {
        data: data.topCategories.map(c => c.revenue),
        backgroundColor: ["#D8CE88","#818980","#B5B093","#BBAD94","#FFD93D"],
        hoverOffset: 10,
      },
    ],
  };

  const conversionData = {
    labels: data.conversion.map(c => c.stage),
    datasets: [{ label: "Users", data: data.conversion.map(c => c.users), backgroundColor: "#000000" }],
  };

  const targetData = {
    labels: ["Achieved", "Remaining"],
    datasets: [
      {
        data: [data.monthlyTarget, 100 - data.monthlyTarget],
        backgroundColor: ["#FFD93D","#E5E7EB"],
        cutout: "70%",
        rotation: -90,
        circumference: 180,
      },
    ],
  };

  const chartOptions = { responsive: true, maintainAspectRatio: false };

  return (
    <div className="flex-1 p-4 sm:p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow p-4 sm:p-5 relative">
          <h2 className="text-black text-sm">Total Sales</h2>
          <CircleDollarSign size={50} className="absolute top-4 right-4 text-yellow-400 sm:top-5 sm:right-5" />
          <p className="text-3xl sm:text-4xl font-bold mt-12 sm:mt-16">{data.totalSales.toLocaleString()} Frw</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4 sm:p-5 relative">
          <h2 className="text-black text-sm">Total Orders</h2>
          <ShoppingCart size={50} className="absolute top-4 right-4 sm:top-5 sm:right-5 text-yellow-400" />
          <p className="text-3xl sm:text-4xl font-bold mt-12 sm:mt-16">{data.totalOrders.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4 sm:p-5 relative">
          <h2 className="text-black text-sm">Total Visitors</h2>
          <Eye size={50} className="absolute top-4 right-4 sm:top-5 sm:right-5 text-yellow-400" />
          <p className="text-3xl sm:text-4xl font-bold mt-12 sm:mt-16">{data.totalVisitors.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4 sm:p-5 flex flex-col items-center">
          <h2 className="text-black text-sm mb-2">Monthly Target</h2>
          <div className="w-full h-40 sm:h-48">
            <Doughnut data={targetData} options={chartOptions} />
          </div>
          <p className="mt-2 font-bold text-xl sm:text-2xl">{data.monthlyTarget}%</p>
        </div>
      </div>

      {/* Revenue & Categories */}
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow p-4 sm:p-6">
          <h2 className="text-lg font-bold mb-4">Revenue Analytics</h2>
          <div className="w-full h-64 sm:h-80">
            <Line data={revenueData} options={chartOptions} />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-4 sm:p-6">
          <h2 className="text-lg font-bold mb-4">Top Categories</h2>
          <div className="w-full h-64 sm:h-80">
            <Bar data={categoriesData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Active Users & Conversion */}
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow p-4 sm:p-6">
          <h2 className="text-lg font-bold mb-4">Active Users</h2>
          {data.activeUsers.map(user => (
            <div key={user.country} className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span>{user.country}</span>
                <span>{user.percentage}%</span>
              </div>
              <div className="w-full bg-gray-300 h-2 rounded">
                <div className="bg-yellow-400 h-2 rounded" style={{ width: `${user.percentage}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl shadow p-4 sm:p-6">
          <h2 className="text-lg font-bold mb-4">Conversion Rate</h2>
          <div className="w-full h-64 sm:h-80">
            <Bar data={conversionData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}
