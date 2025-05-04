import React, { useEffect, useState } from "react";
import { calculateBreaks } from "../../utils/calculateFocusSessionBreaks";
import CheckBox from "../../components/UI/CheckBox";
import { useSession } from "../../store/useSetSessionTimes";
import { mergeArrays } from "../../utils/mergeArrays";
import { useFullFocusSession } from "../../store/useFullFocusSession";
import FocusSessionBar from "./FocusSessionBar";
import { times } from "../../data/focusSessionTimes";

const CalculateBreaks = () => {
  const [check, setCheck] = useState(false);
  const [breaksAm, setBreaksAm] = useState(0);
  const { setFocusSession } = useFullFocusSession();
  const { session } = useSession();

  useEffect(() => {
    // Recalculate breaks whenever session times or the skip breaks checkbox changes
    const { focusAr, breakAr } = calculateBreaks(session, check);
    setBreaksAm(breakAr.length);
    setFocusSession(mergeArrays(focusAr, breakAr));
  }, [session, check, setFocusSession]);

  return (
    <div className="flex flex-col gap-5 items-center w-full max-w-[600px] mt-4 bg-[#2a2a2a] p-5 rounded-lg shadow-sm">
      <div className="text-center">
        <span className="text-xl font-medium">
          {!check && breaksAm > 0 ? (
            <>
              You'll have <span className="text-customColor-blue">{breaksAm}</span> break{breaksAm !== 1 && 's'}
            </>
          ) : (
            <span className="text-[#ff9898]">No breaks scheduled</span>
          )}
        </span>
        
        <div className="flex items-center justify-center gap-2 mt-3">
          <CheckBox check={check} setCheck={setCheck} />
          <span className="text-base">Skip breaks</span>
        </div>
      </div>
      
      <div className="w-full mt-2">
        <div className="mb-2 text-sm text-[#b0b0b0] flex justify-between">
          <span>Session breakdown:</span>
          <span>{times[session.focus]} minutes total</span>
        </div>
        <FocusSessionBar />
      </div>
    </div>
  );
};

export default CalculateBreaks;