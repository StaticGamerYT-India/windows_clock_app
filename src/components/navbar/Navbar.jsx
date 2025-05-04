import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Import icons directly in the component for simplicity
const ClockIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const TimerIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const AlarmIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
  </svg>
);

const WorldIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);

const BrainIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"></path>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"></path>
  </svg>
);

const MenuIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();
  const pathname = location.pathname;

  // Handle responsive state changes
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setIsMobileMenuOpen(false);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Navigation items
  const navItems = [
    { path: "/", label: "Stopwatch", icon: (props) => <ClockIcon {...props} /> },
    { path: "/timer", label: "Timer", icon: (props) => <TimerIcon {...props} /> },
    { path: "/alarm", label: "Alarm", icon: (props) => <AlarmIcon {...props} /> },
    { path: "/world-time", label: "World Clock", icon: (props) => <WorldIcon {...props} /> },
    { path: "/focus-session", label: "Focus Session", icon: (props) => <BrainIcon {...props} /> }
  ];

  // Get the title for the current page
  const getPageTitle = () => {
    const currentItem = navItems.find(item => {
      if (item.path === '/') return pathname === '/';
      return pathname.includes(item.path);
    });
    return currentItem?.label || 'Clock';
  };

  return (
    <>
      {/* Main navbar */}
      <nav className="px-4 py-2 flex items-center justify-between relative z-20">
        <div className="flex items-center">
          {isMobile && (
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="touch-manipulation mr-3 p-2 -ml-2 rounded-full hover:bg-[#3a3a3a] transition-colors active:bg-[#4a4a4a]"
              aria-label="Toggle menu"
            >
              <MenuIcon className="w-5 h-5" />
            </button>
          )}
          <h1 className="text-xl font-medium">{getPageTitle()}</h1>
        </div>
        
        {!isMobile && (
          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = item.path === "/" 
                ? pathname === "/" 
                : pathname.includes(item.path);
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-md flex items-center gap-2 transition-colors duration-200 ${
                    isActive 
                      ? "bg-[#3a3a3a]" 
                      : "hover:bg-[#2a2a2a]"
                  }`}
                >
                  {item.icon({ className: "w-5 h-5" })}
                  <span className="text-sm">{item.label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </nav>
      
      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-10"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
      
      {/* Mobile slide-in menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 h-full w-[75%] max-w-[280px] bg-[#1e1e1e] z-30 shadow-lg"
          >
            <div className="flex flex-col h-full">
              <div className="p-4 border-b border-[#333]">
                <h2 className="text-xl font-medium">Windows Clock</h2>
              </div>
              
              <nav className="flex-1 p-2">
                {navItems.map((item) => {
                  const isActive = item.path === "/" 
                    ? pathname === "/" 
                    : pathname.includes(item.path);
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`touch-manipulation flex items-center gap-3 px-4 py-3 mb-1 rounded-md transition-colors ${
                        isActive 
                          ? "bg-[#2a2a2a] text-customColor-blue" 
                          : "hover:bg-[#232323]"
                      }`}
                    >
                      {item.icon({ className: "w-6 h-6" })}
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Mobile bottom navigation - an alternative way to navigate */}
      {isMobile && (
        <motion.div 
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.5, duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 h-14 bg-[#1a1a1a]/95 backdrop-blur-md border-t border-[#333] flex justify-around items-center px-1 z-10"
        >
          {navItems.map((item) => {
            const isActive = item.path === "/" 
              ? pathname === "/" 
              : pathname.includes(item.path);
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className="touch-manipulation flex flex-col items-center justify-center text-center w-full h-full"
              >
                <div className={`flex flex-col items-center transition-all ${isActive ? "text-customColor-blue" : "text-[#aaa]"}`}>
                  {item.icon({ className: "w-5 h-5 mb-1" })}
                  <span className="text-[10px]">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </motion.div>
      )}
    </>
  );
};

export default Navbar;
