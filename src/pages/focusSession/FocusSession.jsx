import React, { useState } from "react";
import SetSession from "./SetSession";
import { useFullFocusSession } from "../../store/useFullFocusSession";
import FocusSection from "./FocusSection";
import DismissPopup from "../../components/DismissPopup";
import Stats from "./Stats";
import TasksList from "./TasksList";
import EnvironmentSettings from "./EnvironmentSettings";
import FocusPresets from "./FocusPresets";

const FocusSession = () => {
  const { startFocusSession } = useFullFocusSession();
  const [activeTab, setActiveTab] = useState("setup");
  
  // Only show tabs when not in an active session
  const renderTabs = () => {
    if (startFocusSession) return null;
    
    return (
      <div className="border-b border-[#333] mb-6">
        <div className="flex">
          <button
            onClick={() => setActiveTab("setup")}
            className={`px-4 py-2 font-medium ${
              activeTab === "setup" 
                ? "border-b-2 border-customColor-blue text-white" 
                : "text-[#a0a0a0] hover:text-white"
            }`}
          >
            Setup
          </button>
          <button
            onClick={() => setActiveTab("tasks")}
            className={`px-4 py-2 font-medium ${
              activeTab === "tasks" 
                ? "border-b-2 border-customColor-blue text-white" 
                : "text-[#a0a0a0] hover:text-white"
            }`}
          >
            Tasks
          </button>
          <button
            onClick={() => setActiveTab("environment")}
            className={`px-4 py-2 font-medium ${
              activeTab === "environment" 
                ? "border-b-2 border-customColor-blue text-white" 
                : "text-[#a0a0a0] hover:text-white"
            }`}
          >
            Environment
          </button>
          <button
            onClick={() => setActiveTab("stats")}
            className={`px-4 py-2 font-medium ${
              activeTab === "stats" 
                ? "border-b-2 border-customColor-blue text-white" 
                : "text-[#a0a0a0] hover:text-white"
            }`}
          >
            Stats
          </button>
        </div>
      </div>
    );
  };
  
  const renderContent = () => {
    if (startFocusSession) {
      return <FocusSection />;
    }
    
    switch (activeTab) {
      case "setup":
        return (
          <>
            <FocusPresets />
            <SetSession />
          </>
        );
      case "tasks":
        return <TasksList />;
      case "environment":
        return <EnvironmentSettings />;
      case "stats":
        return <Stats />;
      default:
        return <SetSession />;
    }
  };
  
  return (
    <div className="h-screen flex flex-col bg-mica-dark">
      <div className="flex-grow overflow-auto py-6 px-4 md:py-10 md:px-8 lg:px-12 
                     scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
        <div className="max-w-4xl mx-auto">
          {renderTabs()}
          {renderContent()}
        </div>
      </div>
      <DismissPopup />
    </div>
  );
};

export default FocusSession;
