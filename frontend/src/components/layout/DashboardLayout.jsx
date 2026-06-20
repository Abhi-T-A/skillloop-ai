import { useState } from "react";
import { Outlet } from "react-router-dom";

import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "./DashboardLayout.css";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="dashboard-layout">
      <Sidebar open={sidebarOpen} onClose={closeSidebar} />
      {sidebarOpen && (
        <button
          type="button"
          className="sidebar-scrim"
          aria-label="Close navigation"
          onClick={closeSidebar}
        />
      )}

      <main className="dashboard-main">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        <div className="dashboard-content">
          <Outlet />
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
