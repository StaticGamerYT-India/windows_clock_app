import React, { useState, useEffect } from "react";

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Chart = ({ sessionHistory }) => {
  const [weeklyData, setWeeklyData] = useState([]);
  
  useEffect(() => {
    const today = new Date();
    const lastWeekData = [];
    
    // Initialize data for the last 7 days
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      
      lastWeekData.push({
        date: date,
        dayOfWeek: DAYS_OF_WEEK[date.getDay()],
        minutes: 0,
        sessions: 0
      });
    }
    
    // Populate data with actual sessions
    sessionHistory.forEach(session => {
      const sessionDate = new Date(session.date);
      
      // Only include sessions from the last 7 days
      for (let i = 0; i < lastWeekData.length; i++) {
        const dataDay = lastWeekData[i].date;
        
        if (sessionDate.getDate() === dataDay.getDate() && 
            sessionDate.getMonth() === dataDay.getMonth() && 
            sessionDate.getFullYear() === dataDay.getFullYear()) {
          
          lastWeekData[i].minutes += session.focusMinutes;
          lastWeekData[i].sessions += 1;
          break;
        }
      }
    });
    
    setWeeklyData(lastWeekData);
  }, [sessionHistory]);

  // Find the max value to normalize the chart
  const maxValue = Math.max(...weeklyData.map(d => d.minutes), 60); // Minimum of 60 for scaling

  return (
    <div className="bg-[#262626] rounded-lg p-4">
      <div className="flex h-[180px] items-end justify-between">
        {weeklyData.map((day, index) => {
          const barHeight = day.minutes > 0 
            ? Math.max(20, (day.minutes / maxValue) * 150) 
            : 0;
            
          const isToday = index === weeklyData.length - 1;
          
          return (
            <div 
              key={index} 
              className="flex flex-col items-center justify-end"
              style={{ width: `${100 / 7}%` }}
            >
              {barHeight > 0 ? (
                <div 
                  className={`w-9 relative flex flex-col items-center justify-end ${
                    isToday ? 'group' : ''
                  }`}
                >
                  {/* Tooltip */}
                  {day.minutes > 0 && (
                    <div className={`absolute bottom-full mb-2 bg-[#444] px-2 py-1 rounded text-xs whitespace-nowrap ${
                      isToday ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    } transition-opacity`}>
                      {day.minutes} min ({day.sessions} session{day.sessions !== 1 ? 's' : ''})
                    </div>
                  )}
                  
                  <div 
                    className={`w-full rounded-t-sm ${
                      isToday ? 'bg-customColor-blue' : 'bg-[#444]'
                    }`}
                    style={{ height: `${barHeight}px` }}
                  ></div>
                </div>
              ) : (
                <div className="w-9 h-3 border-t border-[#333]"></div>
              )}
              
              <div className={`mt-2 text-xs ${isToday ? 'text-white font-medium' : 'text-[#a0a0a0]'}`}>
                {day.dayOfWeek}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Chart;
