import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

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
    { path: "/", label: "Stopwatch", icon: <ClockIcon className="w-5 h-5" /> },
    { path: "/timer", label: "Timer", icon: <TimerIcon className="w-5 h-5" /> },
    { path: "/alarm", label: "Alarm", icon: <AlarmIcon className="w-5 h-5" /> },
    { path: "/world-time", label: "World Clock", icon: <WorldIcon className="w-5 h-5" /> },
    { path: "/focus-session", label: "Focus Session", icon: <BrainIcon className="w-5 h-5" /> }
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
            <MenuIcon className="w-5 h-5" />
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
        <>
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
          
          <div className="mobile-nav fixed bottom-0 left-0 right-0 bg-[rgba(26,26,26,0.95)] backdrop-blur-md border-t border-[#333] z-50 hidden">
            {navItems.map((item) => {
              const isActive = item.path === "/" 
                ? pathname === "/" 
                : pathname.includes(item.path);
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`mobile-nav-item ${isActive ? 'active' : ''}`}
                >
                  {item.icon}
                  <span className="mobile-nav-label">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </>
      )}
    </nav>
  );
};

// Simple icon components to make the Navbar work
const MenuIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const ClockIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const TimerIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l-5-5" />
  </svg>
);

const AlarmIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

const WorldIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const BrainIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

export default Navbar;
