import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { motion, AnimatePresence } from "framer-motion";

const Layout = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();

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

  // Mark as loaded after initial animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#1a1a1a]">
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="bg-mica-dark shadow-md z-10 backdrop-blur-mica sticky top-0"
      >
        <Navbar />
      </motion.header>
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className={`flex-1 overflow-y-auto overflow-x-hidden relative px-3 md:px-6 ${
          isMobile ? "pb-20" : "pb-6"
        } scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
            className="relative z-1 py-4 md:py-6 max-w-6xl mx-auto"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
        
        {/* Background decorative elements - subtle UI enhancement */}
        {isLoaded && (
          <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.05 }}
              transition={{ delay: 1, duration: 2 }}
              className="absolute -top-[30%] -right-[20%] w-[80%] h-[80%] rounded-full bg-customColor-blue blur-[120px]"
            />
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.03 }}
              transition={{ delay: 1.5, duration: 2 }}
              className="absolute -bottom-[40%] -left-[30%] w-[90%] h-[90%] rounded-full bg-purple-500 blur-[150px]"
            />
          </div>
        )}
      </motion.main>
    </div>
  );
};

export default Layout;
