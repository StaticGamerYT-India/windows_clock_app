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
  
  // Add a fade-in effect when component mounts
  useEffect(() => {
    document.querySelector('.focus-session-container')?.classList.add('fade-in');
  }, []);
  
  // Only show tabs when not in an active session
  const renderTabs = () => {
    if (startFocusSession) return null;
    
    return (
      <motion.div 
        className="border-b border-[#333] mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex">
          <button
            onClick={() => setActiveTab("setup")}
            className={`px-4 py-2 font-medium transition-all duration-200 relative ${
              activeTab === "setup" 
                ? "text-white" 
                : "text-[#a0a0a0] hover:text-white"
            }`}
          >
            Setup
            {activeTab === "setup" && (
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-customColor-blue"
                layoutId="activeTabIndicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab("tasks")}
            className={`px-4 py-2 font-medium transition-all duration-200 relative ${
              activeTab === "tasks" 
                ? "text-white" 
                : "text-[#a0a0a0] hover:text-white"
            }`}
          >
            Tasks
            {activeTab === "tasks" && (
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-customColor-blue"
                layoutId="activeTabIndicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab("environment")}
            className={`px-4 py-2 font-medium transition-all duration-200 relative ${
              activeTab === "environment" 
                ? "text-white" 
                : "text-[#a0a0a0] hover:text-white"
            }`}
          >
            Environment
            {activeTab === "environment" && (
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-customColor-blue"
                layoutId="activeTabIndicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab("stats")}
            className={`px-4 py-2 font-medium transition-all duration-200 relative ${
              activeTab === "stats" 
                ? "text-white" 
                : "text-[#a0a0a0] hover:text-white"
            }`}
          >
            Stats
            {activeTab === "stats" && (
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-customColor-blue"
                layoutId="activeTabIndicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </button>
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
    <div className="focus-session-container p-6 max-w-4xl mx-auto">
      {renderTabs()}
      {renderContent()}
    </div>
  );
};

export default FocusSession;
