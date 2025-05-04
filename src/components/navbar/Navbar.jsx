import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Clock from "../../assets/icons/Clock";
import Timer from "../../assets/icons/Timer";
import Alarm from "../../assets/icons/Alarm";
import World from "../../assets/icons/World";
import Brain from "../../assets/icons/Brain";
import Menu from "../../assets/icons/Menu";

const Navbar = ({ isMobile }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;

  const getTitle = () => {
    if (pathname === "/") return "Stopwatch";
    if (pathname === "/timer") return "Timer";
    if (pathname === "/alarm") return "Alarm";
    if (pathname === "/world-time") return "World Clock";
    if (pathname === "/focus-session") return "Focus Session";
    return "Clock";
  };
  
  const navItems = [
    { path: "/", label: "Stopwatch", icon: <Clock className="w-5 h-5" /> },
    { path: "/timer", label: "Timer", icon: <Timer className="w-5 h-5" /> },
    { path: "/alarm", label: "Alarm", icon: <Alarm className="w-5 h-5" /> },
    { path: "/world-time", label: "World Clock", icon: <World className="w-5 h-5" /> },
    { path: "/focus-session", label: "Focus Session", icon: <Brain className="w-5 h-5" /> }
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="px-4 py-2 flex items-center justify-between">
      <div className="flex items-center">
        {isMobile && (
          <button 
            onClick={toggleMobileMenu} 
            className="mr-3 p-2 text-gray-300 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <h1 className="text-xl font-medium">{getTitle()}</h1>
      </div>
      
      {!isMobile ? (
        <div className="flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = item.path === "/" 
              ? pathname === "/" 
              : pathname.includes(item.path);
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-md flex items-center gap-2 transition-colors ${
                  isActive 
                    ? "bg-[#3a3a3a]" 
                    : "hover:bg-[#2a2a2a]"
                }`}
              >
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </Link>
            );
          })}
        </div>
      ) : (
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 bg-[#1a1a1a] z-50 shadow-lg border-t border-[#333]"
            >
              {navItems.map((item) => {
                const isActive = item.path === "/" 
                  ? pathname === "/" 
                  : pathname.includes(item.path);
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 flex items-center gap-3 ${
                      isActive 
                        ? "bg-[#2a2a2a]" 
                        : "hover:bg-[#222]"
                    } transition-colors`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </nav>
  );
};

export default Navbar;
