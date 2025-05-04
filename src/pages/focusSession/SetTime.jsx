import React from "react";
import ArrowUp from "../../assets/icons/ArrowUp";
import ArrowDown from "../../assets/icons/ArrowDown";
import { useSession } from "../../store/useSetSessionTimes";
import { times } from "../../data/focusSessionTimes";

const SetTime = ({ unit }) => {
  const { session, setSession } = useSession();
  const handleValidation = (inc) => {
    const currentValue = session[unit];
    // Ensure times[currentValue] exists before accessing properties
    if (times[currentValue] === undefined) return false;

    // Simplified validation logic slightly
    const nextValue = inc ? times[currentValue] + 1 : times[currentValue] - 1;
    const minTime = 5; // Assuming 5 is the minimum for both
    const maxTime = unit === "focus" ? 240 : 15; // Max focus 240, max break 15

    // Check if the *index* change is valid based on the *time value* limits
    const currentIndex = session[unit];
    if (inc) {
      // Check if there's a next index and if its time value is within limits
      return currentIndex + 1 < times.length && times[currentIndex + 1] <= maxTime;
    } else {
      // Check if there's a previous index and if its time value is within limits
      return currentIndex - 1 >= 0 && times[currentIndex - 1] >= minTime;
    }
  };


  // Get the display time, handling potential undefined index
  const displayTime = times[session[unit]] !== undefined
    ? (unit === "breaks" && session["focus"] <= 4 ? 0 : times[session[unit]])
    : 0; // Default to 0 if index is out of bounds


  return (
    // Adjusted height, width, padding for responsiveness
    <div className="flex bg-[#3c3c3c] h-24 md:h-20 w-40 md:w-auto rounded-[5px] border-b border-[#8a8a8a]">
      {/* Adjusted width, padding, font size */}
      <div className="flex items-center justify-center flex-col w-28 md:w-32 p-2 hover:bg-[#414141]">
        <h1 className="text-5xl md:text-4xl">{displayTime}</h1>
        <p className="text-[#9b9b9b] text-sm md:text-[12px]">mins</p>
      </div>
      <div className="flex flex-col flex-grow"> {/* Made button container grow */}
        <button
          onClick={() => {
            // Find the index corresponding to the next valid time
            const currentIndex = session[unit];
            let nextIndex = currentIndex + 1;
            while (nextIndex < times.length && times[nextIndex] > (unit === 'focus' ? 240 : 15)) {
              nextIndex++; // Should not happen with current validation, but safe check
            }
            if (nextIndex < times.length && times[nextIndex] >= 5) {
               setSession(unit, nextIndex);
            }
          }}
          // Adjusted padding, ensure full height
          className="border-l border-b border-[#5e5e5e] h-1/2 px-3 md:px-3 flex items-center justify-center hover:bg-[#444444]" // Centered icon
        >
          <ArrowUp className="w-4 h-4 md:w-auto md:h-auto"/> {/* Scaled icon */}
        </button>
        <button
          onClick={() => {
             // Find the index corresponding to the previous valid time
            const currentIndex = session[unit];
            let prevIndex = currentIndex - 1;
             while (prevIndex >= 0 && times[prevIndex] < 5) {
               prevIndex--; // Should not happen with current validation, but safe check
             }
            if (prevIndex >= 0 && times[prevIndex] <= (unit === 'focus' ? 240: 15)) {
               setSession(unit, prevIndex);
            }
          }}
          // Adjusted padding, ensure full height
          className="border-l border-[#5e5e5e] h-1/2 px-3 md:px-3 flex items-center justify-center hover:bg-[#444444]" // Centered icon
        >
          <ArrowDown className="w-4 h-4 md:w-auto md:h-auto"/> {/* Scaled icon */}
        </button>
      </div>
    </div>
  );
};

export default SetTime;