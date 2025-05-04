import React from "react";
import { useFullFocusSession } from "../../store/useFullFocusSession";
import { times } from "../../data/focusSessionTimes";
import { calculatePercentage } from "../../utils/calculatePercentage";
import { useSession } from "../../store/useSetSessionTimes";

const FocusSessionBar = ({ currentPeriod = 0 }) => {
  const { session } = useSession();
  const { focusSession } = useFullFocusSession();

  // Ensure session.focus is a valid index for times array
  const totalDuration = times[session.focus] !== undefined ? times[session.focus] : 1;

  return (
    <div className="flex w-full h-6 rounded-full overflow-hidden bg-gray-700 shadow-inner">
      {focusSession.map((fs, i) => {
        // Calculate percentage safely
        const percentage = calculatePercentage(fs, totalDuration);
        const showText = percentage > 5;
        
        // Highlight current period
        const isCurrentPeriod = i === currentPeriod;
        
        return (
          <div
            key={i}
            style={{ width: `${percentage}%` }}
            className={`flex items-center justify-center h-full ${
              i % 2 === 0 
                ? isCurrentPeriod ? "bg-[#14b891]" : "bg-[#16cca2]" 
                : isCurrentPeriod ? "bg-[#4a4a4a]" : "bg-[#5a5a5a]"
            } transition-all duration-300 ease-in-out text-[11px] font-semibold text-black overflow-hidden relative`}
            title={`${fs} min ${i % 2 === 0 ? 'Focus' : 'Break'}`}
          >
            {isCurrentPeriod && (
              <div className="absolute inset-0 bg-white opacity-10 animate-pulse"></div>
            )}
            
            {showText && (
              <span className="flex items-baseline">
                {fs}
                <span className="text-[8px] ml-0.5 mt-0.5">m</span>
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FocusSessionBar;