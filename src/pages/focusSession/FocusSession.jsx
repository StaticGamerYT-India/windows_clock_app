import React from "react";
import SetSession from "./SetSession";
import { useFullFocusSession } from "../../store/useFullFocusSession";
import FocusSection from "./FocusSection";
import DismissPopup from "../../components/DismissPopup";

const FocusSession = () => {
  const { startFocusSession } = useFullFocusSession();
  
  return (
    <div className="h-screen flex flex-col bg-mica-dark backdrop-blur-mica">
      <div className="flex-grow overflow-auto py-6 px-4 md:py-10 md:px-8 lg:px-12 
                     scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
        <div className="max-w-4xl mx-auto">
          {startFocusSession ? <FocusSection /> : <SetSession />}
        </div>
      </div>
      <DismissPopup />
    </div>
  );
};

export default FocusSession;
