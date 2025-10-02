import { Outlet } from "react-router-dom";
import DashBoardNavbar from "./dashboardnav";
import Sidebar from "./sidebar";

function DashBoardLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <DashBoardNavbar />
        <main className="p-6 overflow-y-auto flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashBoardLayout;
