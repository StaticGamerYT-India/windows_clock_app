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
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-mica-dark shadow-md z-10"
      >
        <Navbar isMobile={isMobile} />
      </motion.header>
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="flex-1 overflow-y-auto overflow-x-hidden relative px-3 md:px-6"
      >
        {/* Background pattern to make the mica effect more visible */}
        <div className="fixed inset-0 opacity-5 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-purple-800 opacity-10"></div>
          <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-blue-500 to-transparent opacity-5"></div>
        </div>
        
        <div className="relative z-1 pb-16 md:pb-8">
          <Outlet />
        </div>
      </motion.main>
    </div>
  );
};

export default Layout;
