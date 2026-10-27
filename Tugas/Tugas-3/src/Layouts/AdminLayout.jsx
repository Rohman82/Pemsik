import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "@/Components/organisms/Sidebar";
import Header from "@/Components/organisms/Header";
import Footer from "@/Components/organisms/Footer";

const titles = {
  "/admin/dashboard": "Dashboard",
  "/admin/mahasiswa": "Mahasiswa",
};

const AdminLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const title = titles[pathname] ?? "Detail Mahasiswa";

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header title={title} onLogout={handleLogout} />
        <main className="flex-1 p-6 overflow-x-auto">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;
