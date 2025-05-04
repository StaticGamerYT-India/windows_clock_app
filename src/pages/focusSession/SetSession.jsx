import React from "react";
import SetTime from "./SetTime";
import CalculateBreaks from "./CalculateBreaks";
import { useFullFocusSession } from "../../store/useFullFocusSession";
import Play from "../../assets/icons/Play";

const SetSession = () => {
  const { toggleStartFocusSession } = useFullFocusSession();
  return (
    <div className="set-session">
      <header className="flex justify-center items-center w-full p-1 md:p-2">
        <h1 className="text-2xl md:text-3xl font-medium text-center">Get ready to focus</h1>
      </header>
      <div className="flex flex-col md:flex-row w-full justify-center items-center md:items-start gap-4 md:gap-5">
        <div className="flex flex-col items-center gap-1">
          <SetTime unit="focus" />
          <p className="text-[#c9c9c9] font-medium">Focus</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <SetTime unit="breaks" />
          <p className="text-[#c9c9c9] font-medium">Break</p>
        </div>
      </div>
      <CalculateBreaks />
      <div className="flex w-full items-center justify-center mt-2 md:mt-4">
        <button
          onClick={toggleStartFocusSession}
          type="button"
          className="flex justify-center items-center gap-2 md:gap-[10px] bg-customColor-blue px-5 py-2.5 md:px-3 md:py-[5px] rounded-[5px] text-black font-medium hover:bg-[#68a8d6] transition-colors duration-150 text-base md:text-sm"
        >
          <Play className="w-5 h-5 md:w-auto md:h-auto" />
          Start focus session
        </button>
      </div>
    </div>
  );
};

export default SetSession;