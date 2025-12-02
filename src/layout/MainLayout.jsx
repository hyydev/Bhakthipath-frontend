import Header from "./Header";
import Navbar from "../features/home/components/Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <Header />
      <Navbar />

      <main className="min-h-screen pt-20">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
