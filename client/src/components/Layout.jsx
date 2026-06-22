import { Outlet } from "react-router-dom";


import Navbar from "../pages/Navbar";
import Footer from "../pages/Footer";

const Layout = () => {
  return (
    <div className="min-h-screen bg-[#0a0a14]"> {/* tera dark bg yahan parent me */}
   <Navbar />

      <main>
        <Outlet /> {/* yahan route ka content render hoga */}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;