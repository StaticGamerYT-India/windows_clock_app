import React from "react";
import ArrowUp from "../../assets/icons/ArrowUp";
import ArrowDown from "../../assets/icons/ArrowDown";
import { useSession } from "../../store/useSetSessionTimes";
import { times } from "../../data/focusSessionTimes";

const SetTime = ({ unit }) => {
  const { session, setSession } = useSession();
  
  const handleIncrement = () => {
    const currentIndex = session[unit];
    // Find the next valid index within the acceptable range
    const nextIndex = currentIndex + 1;
    const maxTime = unit === "focus" ? 240 : 15;
    
    // Check if next index exists and its value is within limits
    if (nextIndex < times.length && times[nextIndex] <= maxTime) {
      setSession(unit, nextIndex);
    }
  };
  
  const handleDecrement = () => {
    const currentIndex = session[unit];
    // Find the previous valid index within the acceptable range
    const prevIndex = currentIndex - 1;
    const minTime = 5;
    
    // Check if previous index exists and its value is within limits
    if (prevIndex >= 0 && times[prevIndex] >= minTime) {
      setSession(unit, prevIndex);
    }
  };

  // Get the display time with proper handling for undefined values
  const displayTime = times[session[unit]] !== undefined
    ? (unit === "breaks" && times[session.focus] <= 4 ? 0 : times[session[unit]])
    : 0;

  return (
    <div className="flex bg-[#3c3c3c] h-auto rounded-[5px] border-b border-[#8a8a8a] shadow-sm overflow-hidden">
      <div className="flex items-center justify-center flex-col py-4 px-6 hover:bg-[#414141] transition-colors">
        <h1 className="text-4xl font-medium">{displayTime}</h1>
        <p className="text-[#9b9b9b] text-sm">mins</p>
      </div>
      <div className="flex flex-col border-l border-[#5e5e5e]">
        <button
          onClick={handleIncrement}
          disabled={session[unit] + 1 >= times.length || times[session[unit] + 1] > (unit === "focus" ? 240 : 15)}
          className="flex items-center justify-center h-1/2 px-3 border-b border-[#5e5e5e] hover:bg-[#444444] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label={`Increase ${unit} time`}
        >
          <ArrowUp className="w-4 h-4"/>
        </button>
        <button
          onClick={handleDecrement}
          disabled={session[unit] - 1 < 0 || times[session[unit] - 1] < 5}
          className="flex items-center justify-center h-1/2 px-3 hover:bg-[#444444] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label={`Decrease ${unit} time`}
        >
          <ArrowDown className="w-4 h-4"/>
        </button>
      </div>
    </div>
  );
};

export default SetTime;