import React from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import Chart from "./Chart";

const Stats = () => {
  const [sessionHistory] = useLocalStorage("focusSessionHistory", []);
  
  // Calculate total focus time
  const totalFocusTime = sessionHistory.reduce((total, session) => {
    return total + session.focusMinutes;
  }, 0);
  
  // Get completed sessions count
  const completedSessions = sessionHistory.length;
  
  // Calculate streak (consecutive days)
  const calculateStreak = () => {
    if (!sessionHistory.length) return 0;
    
    const today = new Date().setHours(0, 0, 0, 0);
    let currentStreak = 0;
    let lastDate = null;
    
    // Sort sessions by date (newest first)
    const sortedSessions = [...sessionHistory].sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    );
    
    for (const session of sortedSessions) {
      const sessionDate = new Date(session.date).setHours(0, 0, 0, 0);
      
      if (!lastDate) {
        // First iteration
        lastDate = sessionDate;
        currentStreak = 1;
        continue;
      }
      
      // Check if this session is one day before the last one
      const dayDiff = Math.floor((lastDate - sessionDate) / (1000 * 60 * 60 * 24));
      
      if (dayDiff === 1) {
        currentStreak++;
        lastDate = sessionDate;
      } else if (dayDiff > 1) {
        // Break in streak
        break;
      }
    }
    
    return currentStreak;
  };
  
  return (
    <div className="bg-[#2a2a2a] rounded-lg p-5 mb-6">
      <h2 className="text-xl font-medium mb-4">Your Focus Journey</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-[#333] p-4 rounded-md text-center">
          <p className="text-[#a0a0a0] text-sm">Total Focus Time</p>
          <p className="text-2xl font-semibold text-customColor-blue">
            {Math.floor(totalFocusTime / 60)}h {totalFocusTime % 60}m
          </p>
        </div>
        
        <div className="bg-[#333] p-4 rounded-md text-center">
          <p className="text-[#a0a0a0] text-sm">Completed Sessions</p>
          <p className="text-2xl font-semibold text-customColor-blue">{completedSessions}</p>
        </div>
        
        <div className="bg-[#333] p-4 rounded-md text-center">
          <p className="text-[#a0a0a0] text-sm">Current Streak</p>
          <p className="text-2xl font-semibold text-customColor-blue">{calculateStreak()} days</p>
        </div>
      </div>
      
      {sessionHistory.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">Weekly Focus Activity</h3>
          <Chart sessionHistory={sessionHistory} />
        </div>
      )}
      
      {sessionHistory.length === 0 && (
        <div className="text-center py-6 text-[#a0a0a0]">
          <p>Complete your first focus session to start tracking your progress!</p>
        </div>
      )}
    </div>
  );
};

export default Stats;
