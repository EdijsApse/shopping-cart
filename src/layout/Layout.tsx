import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen font-poppins text-gray-900">
      <Header />
      <main className="container py-10 flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
