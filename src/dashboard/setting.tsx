// src/dashboard/settings.tsx
import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { Notify } from "notiflix";
import { useNavigate } from "react-router-dom";

interface UserSettings {
  name: string;
  email: string;
  password?: string;
  notifications: boolean;
  darkMode: boolean;
  themeColor: string;
  fontSize: "small" | "medium" | "large";
  layout: "compact" | "comfortable";
  sidebarVisible: boolean;
  animations: boolean;
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState<"profile" | "security" | "preferences" | "customization">("profile");
  const [settings, setSettings] = useState<UserSettings>({
    name: "",
    email: "",
    password: "",
    notifications: true,
    darkMode: false,
    themeColor: "#3B82F6",
    fontSize: "medium",
    layout: "comfortable",
    sidebarVisible: true,
    animations: true,
  });
  const [originalSettings, setOriginalSettings] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const getAuthToken = (): string | null => localStorage.getItem("token");
  const getRefreshToken = (): string | null => localStorage.getItem("refreshToken");

  // Fetch user settings from API
  const fetchSettings = async () => {
    const token = getAuthToken();
    if (!token) {
      Notify.failure("You must be logged in to view settings.");
      navigate("/login");
      return;
    }

    try {
      const res = await axios.get<UserSettings>("https://kappee-backend-repo-11.onrender.com/api/user/settings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSettings(res.data);
      setOriginalSettings(res.data);
    } catch (err) {
      const axiosErr = err as AxiosError<{ message?: string }>;
      if (axiosErr.response?.status === 403 || axiosErr.response?.status === 401) {
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

          const retryRes = await axios.get<UserSettings>("https://kappee-backend-repo-11.onrender.com/api/user/settings", {
            headers: { Authorization: `Bearer ${tokenRes.data.token}` },
          });
          setSettings(retryRes.data);
          setOriginalSettings(retryRes.data);
        } catch {
          Notify.failure("Failed to refresh token. Please log in again.");
          localStorage.clear();
          navigate("/login");
        }
      } else {
        const msg = axiosErr.response?.data?.message || "Failed to fetch settings.";
        Notify.failure(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  // Live preview updates
  useEffect(() => {
    document.documentElement.style.setProperty("--primary-color", settings.themeColor);
    document.documentElement.style.fontSize =
      settings.fontSize === "small" ? "14px" : settings.fontSize === "medium" ? "16px" : "18px";
    document.body.classList.toggle("dark", settings.darkMode);
    document.body.classList.toggle("sidebar-hidden", !settings.sidebarVisible);
    document.body.classList.toggle("compact-layout", settings.layout === "compact");
  }, [settings.themeColor, settings.fontSize, settings.darkMode, settings.sidebarVisible, settings.layout]);

  const handleChange = (field: keyof UserSettings, value: any) => {
    setSettings({ ...settings, [field]: value });
  };

  const handleSave = async () => {
    if (!originalSettings) return;
    setSaving(true);
    const token = getAuthToken();
    if (!token) {
      Notify.failure("You must be logged in to save settings.");
      setSaving(false);
      navigate("/login");
      return;
    }

    try {
      await axios.put("http://localhost:5175/api/user/settings", settings, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Notify.success("Settings saved successfully!");
      setOriginalSettings(settings);
    } catch (err) {
      const axiosErr = err as AxiosError<{ message?: string }>;
      const msg = axiosErr.response?.data?.message || "Failed to save settings.";
      Notify.failure(msg);
    } finally {
      setSaving(false);
    }
  };

  const isChanged = originalSettings && JSON.stringify(settings) !== JSON.stringify(originalSettings);

  if (loading) return <p className="p-6 text-center">Loading settings...</p>;

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center mb-6">Settings & Customization</h1>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-8 flex-wrap">
        {["profile", "security", "preferences", "customization"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as typeof activeTab)}
            className={`px-4 py-2 rounded-t-lg font-medium ${
              activeTab === tab
                ? "bg-white border-t border-x border-blue-600 text-blue-600 shadow"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {capitalize(tab)}
          </button>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
        className="bg-white p-6 rounded-lg shadow space-y-6 border"
      >
        {/* Profile */}
        {activeTab === "profile" && (
          <>
            <div>
              <label className="block font-medium mb-1">Name</label>
              <input
                type="text"
                value={settings.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Email</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          </>
        )}

        {/* Security */}
        {activeTab === "security" && (
          <div>
            <label className="block font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Leave blank to keep current password"
              value={settings.password}
              onChange={(e) => handleChange("password", e.target.value)}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400"
            />
            <small className="text-gray-500">Leave blank to keep your current password</small>
          </div>
        )}

        {/* Preferences */}
        {activeTab === "preferences" && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => handleChange("notifications", e.target.checked)}
                className="h-4 w-4 accent-yellow-400"
              />
              <label className="font-medium">Email Notifications</label>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={settings.darkMode}
                onChange={(e) => handleChange("darkMode", e.target.checked)}
                className="h-4 w-4 accent-yellow-400"
              />
              <label className="font-medium">Enable Dark Mode</label>
            </div>
          </div>
        )}

        {/* Customization */}
        {activeTab === "customization" && (
          <div className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Theme Color</label>
              <input
                type="color"
                value={settings.themeColor}
                onChange={(e) => handleChange("themeColor", e.target.value)}
                className="w-16 h-10 border rounded"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Font Size</label>
              <select
                value={settings.fontSize}
                onChange={(e) => handleChange("fontSize", e.target.value as UserSettings["fontSize"])}
                className="w-full border p-2 rounded"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>

            <div>
              <label className="block font-medium mb-1">Layout Style</label>
              <select
                value={settings.layout}
                onChange={(e) => handleChange("layout", e.target.value as UserSettings["layout"])}
                className="w-full border p-2 rounded"
              >
                <option value="comfortable">Comfortable</option>
                <option value="compact">Compact</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={settings.sidebarVisible}
                onChange={(e) => handleChange("sidebarVisible", e.target.checked)}
                className="h-4 w-4 accent-black"
              />
              <label className="font-medium">Show Sidebar</label>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={settings.animations}
                onChange={(e) => handleChange("animations", e.target.checked)}
                className="h-4 w-4 accent-black"
              />
              <label className="font-medium">Enable Animations</label>
            </div>

            <div className="mt-2 p-4 border rounded bg-gray-50">
              <p className="text-gray-700">Preview: The app reflects your color, font, and layout choices immediately.</p>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={saving || !isChanged}
          className="w-full bg-yellow-400 text-white py-2 rounded hover:bg-black disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </form>
    </div>
  );
}
