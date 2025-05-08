import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { motion } from "framer-motion";

const Layout = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle responsive layout changes
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Set initial value
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#1a1a1a]">
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-mica-dark shadow-md z-10"
      >
        <Navbar />
      </motion.header>
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className={`flex-1 overflow-y-auto overflow-x-hidden relative px-3 md:px-6 ${
          isMobile ? "pb-16" : "pb-4"
        }`} // Adjusted padding for mobile
      >
        <div className="relative z-1 py-4 max-w-6xl mx-auto">
          <Outlet />
        </div>
      </motion.main>
    </div>
  );
};

export default Layout;
