import React, { useState, useEffect } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { motion } from "framer-motion";
import Clock from "../../assets/icons/Clock";
import Timer from "../../assets/icons/Timer";
import Alarm from "../../assets/icons/Alarm";
import World from "../../assets/icons/World";
import Brain from "../../assets/icons/Brain";

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

  // Navigation items for sidebar
  const navItems = [
    { path: "/", icon: <Clock className="w-6 h-6" />, label: "Stopwatch" },
    { path: "/timer", icon: <Timer className="w-6 h-6" />, label: "Timer" },
    { path: "/alarm", icon: <Alarm className="w-6 h-6" />, label: "Alarm" },
    { path: "/world-time", icon: <World className="w-6 h-6" />, label: "World" },
    { path: "/focus-session", icon: <Brain className="w-6 h-6" />, label: "Focus" }
  ];

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
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar for larger screens */}
        {!isMobile && (
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-20 border-r border-[#333] bg-[#202020] shrink-0"
          >
            <div className="flex flex-col gap-1 p-2 mt-2">
              {navItems.map(item => {
                const isActive = item.path === "/" 
                  ? location.pathname === "/" 
                  : location.pathname.includes(item.path);
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex flex-col items-center justify-center gap-1 p-3 rounded-md transition-colors ${
                      isActive ? "bg-[#3a3a3a]" : "hover:bg-[#2a2a2a]"
                    }`}
                  >
                    <div className={isActive ? "text-customColor-blue" : "text-gray-400"}>
                      {item.icon}
                    </div>
                    <span className="text-xs font-medium text-[#c9c9c9]">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className={`flex-1 overflow-y-auto overflow-x-hidden relative px-3 md:px-6 ${
            isMobile ? "pb-20" : "pb-6"
          } scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent`}
        >
          <div className="relative z-1 py-4 md:py-6 max-w-6xl mx-auto">
            <Outlet />
          </div>
          
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
    </div>
  );
};

export default Layout;
