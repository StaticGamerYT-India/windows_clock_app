import React, { useState, useEffect } from "react";
import { useFullFocusSession } from "../../store/useFullFocusSession";
import SetSession from "./SetSession";
import FocusSection from "./FocusSection";
import TasksList from "./TasksList";
import EnvironmentSettings from "./EnvironmentSettings";
import Stats from "./Stats";
import FocusPresets from "./FocusPresets";
import { motion, AnimatePresence } from "framer-motion";

const FocusSession = () => {
  const [activeTab, setActiveTab] = useState("setup");
  const { startFocusSession } = useFullFocusSession();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  // Handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Add a fade-in effect when component mounts
  useEffect(() => {
    document.querySelector('.focus-session-container')?.classList.add('fade-in');
  }, []);
  
  // Only show tabs when not in an active session
  const renderTabs = () => {
    if (startFocusSession) return null;
    
    return (
      <motion.div 
        className="border-b border-[#333] mb-4 md:mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className={`flex ${isMobile ? 'overflow-x-auto' : ''}`}>
          {/* Use overflow-x-auto for mobile to allow horizontal scrolling */}
          {['setup', 'tasks', 'environment', 'stats'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium transition-all duration-200 relative whitespace-nowrap ${
                activeTab === tab 
                  ? "text-white" 
                  : "text-[#a0a0a0] hover:text-white"
              }`}
              style={{ touchAction: "manipulation", minHeight: "44px" }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {activeTab === tab && (
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-customColor-blue"
                  layoutId="activeTabIndicator"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </button>
          ))}
        </div>
      </motion.div>
    );
  };

  const renderContent = () => {
    if (startFocusSession) {
      return <FocusSection />;
    }

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "setup" && (
            <div>
              <FocusPresets />
              <SetSession />
            </div>
          )}
          {activeTab === "tasks" && <TasksList />}
          {activeTab === "environment" && <EnvironmentSettings />}
          {activeTab === "stats" && <Stats />}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className="focus-session-container py-3 md:py-4 md:p-6 max-w-4xl mx-auto">
      {renderTabs()}
      {renderContent()}
    </div>
  );
};

export default FocusSession;
