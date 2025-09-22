// src/layouts/DashboardLayout.jsx
import { Outlet } from "react-router-dom";
import DashBoardHeader from "../components/DashBoardHeader";
import DashBoardFooter from "../components/DashBoardFooter";
import Footer from "../components/Footer";

export default function AdminLayout() {
  return (
    <>
      <DashBoardHeader />
      <main style={{ minHeight: "80vh" }}>
        <Outlet />
      </main>
      <DashBoardFooter />
    </>
  );
}
