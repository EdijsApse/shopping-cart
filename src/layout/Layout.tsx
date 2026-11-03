import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="font-poppins text-gray-900">
      <Header />
      <main className="container py-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
