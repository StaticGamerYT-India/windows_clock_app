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
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44"></path>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44"></path>
    <path d="M4.5 7h2a2.5 2.5 0 0 1 0 5h-2"></path>
    <path d="M19.5 7h-2a2.5 2.5 0 0 0 0 5h2"></path>
    <path d="M4.5 12h2a2.5 2.5 0 0 1 0 5h-2"></path>
    <path d="M19.5 12h-2a2.5 2.5 0 0 0 0 5h2"></path>
  </svg>
);

const Navbar = () => {
  const location = useLocation();
  const [time, setTime] = useState(new Date());
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Format time
  const formattedTime = time.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });

  // Navigation items
  const navItems = [
    { path: "/", icon: ClockIcon, label: "Stopwatch" },
    { path: "/timer", icon: TimerIcon, label: "Timer" },
    { path: "/alarm", icon: AlarmIcon, label: "Alarm" },
    { path: "/world-time", icon: WorldIcon, label: "World" },
    { path: "/focus-session", icon: BrainIcon, label: "Focus" }
  ];

  return (
    <>
      {/* Top navbar for desktop */}
      <div className="hidden md:flex justify-between items-center px-6 py-3">
        <div className="text-lg font-medium">Windows Clock</div>
        <div className="text-xl font-light">{formattedTime}</div>
      </div>
      
      {/* Bottom navbar for mobile */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#202020] shadow-lg border-t border-[#333] z-40">
          <div className="flex justify-around py-2">
            {navItems.map((item) => {
              const isActive = item.path === "/" 
                ? location.pathname === "/" 
                : location.pathname.includes(item.path);
              
              return (
                <Link 
                  key={item.path}
                  to={item.path} 
                  className="flex flex-col items-center p-2"
                >
                  <item.icon className={`w-6 h-6 ${isActive ? 'text-customColor-blue' : 'text-gray-400'}`} />
                  <span className={`text-xs mt-1 ${isActive ? 'text-white' : 'text-gray-400'}`}>
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div 
                      layoutId="nav-indicator"
                      className="absolute bottom-0 h-0.5 w-12 bg-customColor-blue"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
