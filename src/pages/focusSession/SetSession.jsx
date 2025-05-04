import React from "react";
import SetTime from "./SetTime";
import CalculateBreaks from "./CalculateBreaks";
import { useFullFocusSession } from "../../store/useFullFocusSession";
import Play from "../../assets/icons/Play";

const SetSession = () => {
  const { toggleStartFocusSession } = useFullFocusSession();
  return (
    // Adjusted padding and gap for responsiveness, added max-width and centering
    <div className="flex flex-col gap-4 md:gap-5 bg-[#323232] rounded-[6px] p-4 md:px-5 md:pt-3 md:pb-7 border border-[#252525] shadow select-none w-full max-w-md mx-auto"> {/* Adjusted max-width */}
      <header className="flex justify-center items-center w-full p-1 md:p-2">
        {/* Adjusted font size */}
        <h1 className="text-2xl md:text-3xl font-medium text-center">Get ready to focus</h1>
      </header>
      {/* Stack vertically on small screens, horizontally on medium+ */}
      <div className="flex flex-col md:flex-row w-full justify-center items-center md:items-start gap-4 md:gap-5">
        <div className="flex flex-col items-center gap-1">
          <SetTime unit="focus" />
          <p className="text-[#c9c9c9] font-medium">Focus</p> {/* Capitalized */}
        </div>
        <div className="flex flex-col items-center gap-1">
          <SetTime unit="breaks" />
          <p className="text-[#c9c9c9] font-medium">Break</p> {/* Capitalized */}
        </div>
      </div>
      <CalculateBreaks />
      <div className="flex w-full items-center justify-center mt-2 md:mt-4"> {/* Adjusted margin */}
        <button
          onClick={toggleStartFocusSession}
          type="button"
          // Adjusted padding and text size for better touch targets
          className="flex justify-center items-center gap-2 md:gap-[10px] bg-customColor-blue px-5 py-2.5 md:px-3 md:py-[5px] rounded-[5px] text-black font-medium hover:bg-[#68a8d6] transition-colors duration-150 text-base md:text-sm" // Added base text size
        >
          <Play className="w-5 h-5 md:w-auto md:h-auto" /> {/* Ensure icon scales if needed */}
          Start focus session
        </button>
      </div>
    </div>
  );
};

export default SetSession;