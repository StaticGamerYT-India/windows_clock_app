import React from "react";
import SetTime from "./SetTime";
import CalculateBreaks from "./CalculateBreaks";
import { useFullFocusSession } from "../../store/useFullFocusSession";
import Play from "../../assets/icons/Play";

const SetSession = () => {
  const { toggleStartFocusSession } = useFullFocusSession();
  
  return (
    <div className="set-session flex flex-col items-center gap-8 py-6">
      <header className="w-full text-center mb-2">
        <h1 className="text-3xl font-medium mb-2">Get ready to focus</h1>
        <p className="text-[#a0a0a0]">Set your focus and break durations</p>
      </header>
      
      <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-8 w-full">
        <div className="flex flex-col items-center gap-3">
          <SetTime unit="focus" />
          <p className="text-[#c9c9c9] font-medium">Focus time</p>
        </div>
        
        <div className="flex flex-col items-center gap-3">
          <SetTime unit="breaks" />
          <p className="text-[#c9c9c9] font-medium">Break time</p>
        </div>
      </div>
      
      <CalculateBreaks />
      
      <div className="w-full flex justify-center mt-4">
        <button
          onClick={toggleStartFocusSession}
          type="button"
          className="flex justify-center items-center gap-3 bg-customColor-blue px-6 py-3 rounded-md text-black font-medium hover:bg-[#68a8d6] transition-all duration-200 transform hover:scale-105 shadow-md"
        >
          <Play className="w-5 h-5" />
          Start focus session
        </button>
      </div>
    </div>
  );
};

export default SetSession;