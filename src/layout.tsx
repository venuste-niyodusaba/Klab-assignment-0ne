import { Outlet } from "react-router-dom";
import NavbarPage from "./components/navbar";
import Footer from "./components/footer";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
  
      <NavbarPage />
     
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
