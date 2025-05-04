import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="flex h-screen bg-mica-dark overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-hidden backdrop-blur-mica">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
