import React from "react";
import { useFullFocusSession } from "../../store/useFullFocusSession";
import { times } from "../../data/focusSessionTimes";
import { calculatePercentage } from "../../utils/calculatePercentage";
import { useSession } from "../../store/useSetSessionTimes";

const FocusSessionBar = () => {
  const { session } = useSession();
  const { focusSession } = useFullFocusSession();

  // Ensure session.focus is a valid index for times array
  const totalDuration = times[session.focus] !== undefined ? times[session.focus] : 1; // Avoid division by zero

  return (
    // Added w-full to ensure it takes available width within its container
    <div className="flex max-w-[600px] items-center justify-start w-full h-5 rounded-full overflow-hidden bg-gray-700"> {/* Added a background color for empty state */}
      {focusSession.map((fs, i) => {
        // Calculate percentage safely
        const percentage = calculatePercentage(fs, totalDuration);
        // Determine if the segment is too small to display text
        const showText = percentage > 5; // Only show text if segment is > 5% wide

        return (
          <div
            key={i}
            style={{ width: `${percentage}%` }}
            className={`flex items-center justify-center h-full ${
              i % 2 === 0 ? "bg-[#16cca2]" : "bg-[#5a5a5a]" // Focus vs Break color
            } transition-all duration-300 ease-in-out text-[10px] md:text-[11px] font-semibold text-black overflow-hidden`} // Adjusted text size, added overflow hidden
            title={`${fs} min ${i % 2 === 0 ? 'Focus' : 'Break'}`} // Add a tooltip
          >
            {showText && ( // Conditionally render text
              <>
                {fs}
                {/* Simplified the 'm' display logic */}
                <span className="text-[8px] md:text-[8px] ml-px mt-px md:mt-[2px]">m</span>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FocusSessionBar;