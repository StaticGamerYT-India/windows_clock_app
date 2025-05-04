import React, { useEffect, useState } from "react";
import { calculateBreaks } from "../../utils/calculateFocusSessionBreaks";
import CheckBox from "../../components/UI/CheckBox";
import { useSession } from "../../store/useSetSessionTimes";
import { mergeArrays } from "../../utils/mergeArrays";
import { useFullFocusSession } from "../../store/useFullFocusSession";
import FocusSessionBar from "./FocusSessionBar";

const CalculateBreaks = () => {
  const [check, setCheck] = useState(false); // State for "Skip breaks" checkbox
  const [breaksAm, setBreaksAm] = useState(0);
  const { setFocusSession } = useFullFocusSession();
  const { session } = useSession();

  useEffect(() => {
    // Recalculate breaks whenever session times or the skip breaks checkbox changes
    const { focusAr, breakAr } = calculateBreaks(session, check);
    setBreaksAm(breakAr.length);
    setFocusSession(mergeArrays(focusAr, breakAr));
  }, [session, check, setFocusSession]); // Added setFocusSession to dependency array

  return (
    // Adjusted gap and width
    <div className="flex flex-col gap-3 md:gap-4 items-center justify-center w-full mt-2 md:mt-0">
      {/* Adjusted text size */}
      <span className="text-lg md:text-xl">
        You'll have {!check && breaksAm > 0 ? breaksAm : "no"} break{(!check && breaksAm === 1) ? '' : 's'} {/* Correct pluralization */}
      </span>
      {/* Adjusted gap and text size */}
      <div className="flex items-center gap-2 mb-1 md:mb-2">
        <CheckBox check={check} setCheck={setCheck} />
        <span className="flex items-center justify-center text-sm md:text-base">Skip breaks</span>
      </div>
      {/* Ensure FocusSessionBar is also responsive if needed (it seems okay based on its code) */}
      <FocusSessionBar/>
    </div>
  );
};

export default CalculateBreaks;